/**
* ----开工申请单
*/
<template>
  <div id="kgsqd" style="height: 100%" v-loading="loading">
    <div class="header">
      <span class="headerTit">开工申请单</span>
      <div class="header_option">
        <!--<div class="jianlimb" @click="showAdd()"><i class="el-icon-download"> 开工申请</i></div>-->
        <ul>
          <li><i class="iconfont icon-export" style="font-size:8px;"> 导出</i></li>
          <li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table">
      <div class="chaxun" style="">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="合同编号" prop="htbh">
              <el-select size="mini"  class="" placeholder="请输入合同编号" v-model="searchForm.htbh" filterable>
                <el-option v-for="(item,index) in htbharr" :key="index" :label="item.HTBH" :value="item.HTBH"></el-option>
              </el-select>
              <!--<el-input v-model="searchForm.htbh" size="mini" placeholder="请输入合同编号"></el-input>-->
              <!--<selectTree class="selectTree" v-model="searchForm.bmname" :isDefaultselect="true" :urlFunc="$api.requestBmtreeAll" :dataKey="{name: 'bmname'}" placeholder="请选择部门" @treeSelect="selecttreeBm"></selectTree>-->
            </el-form-item>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="填报单位" prop="" class="">
            <el-select size="mini"  class="" placeholder="请填报单位" v-model="searchForm.tbdw">
              <el-option v-for="(item,index) in tbdwarr" :key="index" :label="item.TBDW" :value="item.TBDW"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="日期选择" prop="" class="">
            <el-date-picker
              v-model="searchForm.datearr"
              type="daterange"
              size="mini"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <!--<el-select size="mini"  class="" placeholder="请选择日期" v-model="searchForm.jcrq">
              <el-option v-for="(item,index) in qmbbOptions" :key="index" :label="item.bbmc" :value="item.bbid"></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button size="mini" @click="search(1, 10)"  style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button @click.native="resizeSearch" size="mini">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                style="width: 100%;"
                row-class-name="row_class"
                border
                :height="showSearch?'calc(100% - 59px)':'calc(100% - 18px)'"
                :row-style="{fontFamily: '宋体', fontSize: '12px'}"
                @selection-change="handleSelectionChange">
        <el-table-column
          type="index"
          label=" "
          width="25">
        </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="80">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态"  show-overflow-tooltip>
          <template scope="scope">
            <span style="color:#3EC481;text-align: center;cursor: pointer;" @click="scope.row.zt==='未开工'?shenhe(scope.row, scope.$index):''">{{scope.row.zt}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="djbh" label="单据编号" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="htbh" label="合同编号" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="gcxm" label="工程项目" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="cbdw" label="承包单位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="gldw" label="管理单位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="htmc" label="合同名称" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="tbdw" label="填报单位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="tbrq" label="填报日期" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <footer class="footer">
      <div style="float: right;padding: 6px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </footer>

    <div class="tabArea" v-if="showDetail"  @close="resetForm">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild"  @click="showDetail = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>开工申请</span>
        </p>
      </div>
      <div class="dialog_warp">
        <ul class="zhubnr">
          <li>
            <span>单据编号</span>
            <p>
              <el-input size="mini" type="text"  :value="lmshForm.djbh"></el-input>
            </p>
          </li>
          <li>
            <span>工程项目</span>
            <p>
              <el-select clearable size="mini" :disabled="showxq" style="width: 148px;" v-model="htbh" value-key="htbh" placeholder="" @change="selectHt">
                <el-option v-for="item in htList" :key="item.htbh" :label="item.htmc" :value="item"></el-option>
              </el-select>
            </p>
          </li>
          <li>
            <span>合同编号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.htbh"></el-input>
            </p>
          </li>
          <li>
            <span>承包单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.cbdw"></el-input>
            </p>
          </li>
          <li>
            <span>管理单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.gldw"></el-input>
            </p>
          </li>
          <li>
            <span>合同名称</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.htmc"></el-input>
            </p>
          </li>
          <li>
            <span>路线名称</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.lxmc"></el-input>
            </p>
          </li>
          <li>
            <span>方向</span>
            <p class="radio_line">
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.fx" label="上行">上行</el-radio>
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.fx" label="下行">下行</el-radio>
            </p>
          </li>
          <li>
            <span>起点桩号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.qdzh"></el-input>
            </p>
          </li>
          <li>
            <span>止点桩号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.zdzh"></el-input>
            </p>
          </li>
          <li>
            <span>爆破阻断位置</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.bpzdwz"></el-input>
            </p>
          </li>
          <li>
            <span>主线卡口方向</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.zxkfx"></el-input>
            </p>
          </li>
          <li>
            <span>是否限流</span>
            <p class="radio_line">
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.isxl" label="是">是</el-radio>
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.isxl" label="否">否</el-radio>
            </p>
          </li>
          <li>
            <span>是否封道</span>
            <p class="radio_line">
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.isfd" label="是">是</el-radio>
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.isfd" label="否">否</el-radio>
            </p>
          </li>
          <li>
            <span>申请开工日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.sqkgrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>预期完工日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.yjwgrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>现场负责人</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.xcfzr"></el-input>
            </p>
          </li>
          <li>
            <span>联系电话</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.lxdh"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>工程主要内容</span>
            <p>
              <el-input class="gjzjje" size="mini" type="text" v-model="lmshForm.gczynr"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>施工准备情况说明(工、料、机准备情况)</span>
            <p>
              <el-input class="gjzjje" size="mini" type="text" v-model="lmshForm.sgzbqksm"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>附件</span>
            <p>
              <el-upload
                class="upload-demo"
                :action="$api.uploadFiles"
                multiple
                ref="uploada"
                :disabled="showxq"
                :file-list="fileList"
                :limit="2">
                <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
            </p>
          </li>
          <li class="text_line">
            <span>审批意见</span>
            <p class="radio_line">
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.spyj" label="0">同意开工</el-radio>
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.spyj" label="1">不具备开工条件，请完善后再行申请</el-radio>
            </p>
          </li>
          <li>
            <span>填报单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.tbdw"></el-input>
            </p>
          </li>
          <li>
            <span>填报日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.tbrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <div style="clear: both"></div>
        </ul>
        <div class="dialog_footer" v-if="!showxq">
          <el-button size="mini" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="mini" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>
    </div>


   <!-- <el-dialog class="data-dialog el-updata-div" title="开工申请" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" @close="resetForm">
      <div class="dialog_warp">
        <ul class="zhubnr">
          <li>
            <span>单据编号</span>
            <p>
              <el-input size="mini" type="text"  :value="lmshForm.djbh"></el-input>
            </p>
          </li>
          <li>
            <span>工程项目</span>
            <p>
              <el-select clearable size="mini" :disabled="showxq" style="width: 148px;" v-model="htbh" value-key="htbh" placeholder="" @change="selectHt">
                <el-option v-for="item in htList" :key="item.htbh" :label="item.htmc" :value="item"></el-option>
              </el-select>
            </p>
          </li>
          <li>
            <span>合同编号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.htbh"></el-input>
            </p>
          </li>
          <li>
            <span>承包单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.cbdw"></el-input>
            </p>
          </li>
          <li>
            <span>管理单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.gldw"></el-input>
            </p>
          </li>
          <li>
            <span>合同名称</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.htmc"></el-input>
            </p>
          </li>
          <li>
            <span>路线名称</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.lxmc"></el-input>
            </p>
          </li>
          <li>
            <span>方向</span>
            <p class="radio_line">
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.fx" label="上行">上行</el-radio>
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.fx" label="下行">下行</el-radio>
            </p>
          </li>
          <li>
            <span>起点桩号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.qdzh"></el-input>
            </p>
          </li>
          <li>
            <span>止点桩号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.zdzh"></el-input>
            </p>
          </li>
          <li>
            <span>爆破阻断位置</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.bpzdwz"></el-input>
            </p>
          </li>
          <li>
            <span>主线卡口方向</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.zxkfx"></el-input>
            </p>
          </li>
          <li>
            <span>是否限流</span>
            <p class="radio_line">
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.isxl" label="是">是</el-radio>
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.isxl" label="否">否</el-radio>
            </p>
          </li>
          <li>
            <span>是否封道</span>
            <p class="radio_line">
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.isfd" label="是">是</el-radio>
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.isfd" label="否">否</el-radio>
            </p>
          </li>
          <li>
            <span>申请开工日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.sqkgrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>预期完工日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.yjwgrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>现场负责人</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.xcfzr"></el-input>
            </p>
          </li>
          <li>
            <span>联系电话</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.lxdh"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>工程主要内容</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.gczynr"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>施工准备情况说明(工、料、机准备情况)</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.sgzbqksm"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>附件</span>
            <p>
              <el-upload
                class="upload-demo"
                :action="$api.uploadFiles"
                multiple
                ref="uploada"
                :disabled="showxq"
                :file-list="fileList"
                :limit="2">
                <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
            </p>
          </li>
          <li class="text_line">
            <span>审批意见</span>
            <p class="radio_line">
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.spyj" label="0">同意开工</el-radio>
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.spyj" label="1">不具备开工条件，请完善后再行申请</el-radio>
            </p>
          </li>
          <li>
            <span>填报单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.tbdw"></el-input>
            </p>
          </li>
          <li>
            <span>填报日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.tbrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <div style="clear: both"></div>
        </ul>
        <div class="dialog_footer" v-if="!showxq">
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="small" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    hasMenu: {
      type: Boolean,
      default: false
    },
    clickHide: {
      type: Function
    }
  },
  data () {
    return {
      // zll
      htbharr: [],
      tbdwarr: [],
      datearr: [],
      lmshForm: {
      },
      index: '',
      isadd: false,
      addzb: true,
      total: 0,
      submitLoading: false,
      showxq: false,
      showSearch: false,
      loading: false,
      tableHeight: 300,
      tableData: [],
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      roadOptions: [],
      searchForm: {
        htbh: undefined,
        tbdw: undefined,
        datearr: null,
        pageNum: 1,
        pageSize: 10
      },
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      htList: [],
      htbh: {},
      fileList: [],
      multipleSelection: []
    }
  },
  methods: {
    resizeSearch(){
      this.searchForm.htbh = undefined
      this.searchForm.tbdw = undefined
      this.searchForm.datearr = undefined
      this.searchForm.pageNum = 1
    },
    // 合同编号list
    getHtbhListarr () {
      this.$api.getHtbhList().then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {
          // console.log(res.data, 7979)
          this.htbharr = res.data.data
          console.log(this.htbharr, 700770)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 填报单位
    getTBdwarr () {
      this.$api.getTBdwList().then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {
          this.tbdwarr = res.data.data
        }
      }).catch(e => {
        console.log(e)
      })
    },
    getfilebyid () {
      this.$api.getFilesDataById('?id=' + this.lmshForm.id).then(res => {
        this.fileList = res.data.data
        this.fileList.map(item => {
          item.name = item.file_yname
        })
      })
    },
    // doubleclick () {
    //   // this.showDetail = !this.showDetail
    // },
    handleRemove (fileid) {
      this.$api.deleteFilesById('?ids=' + fileid).then(res => {})
    },
    rukufile () {
      let uploadFiles = []

      if (this.$refs.uploada.uploadFiles.length > 0) {
        this.$refs.uploada.uploadFiles.map(item => {
          if (item.response) {
            item.response.data.file_id = this.lmshForm.id
            uploadFiles.push(item.response.data)
          } else {
            uploadFiles.push(item)
          }
        })
        this.$api.addFileData({dataList: uploadFiles}).then(resp => {
          if (resp.data.code === 1) {
          }
        })
      }
      this.search()
      this.resetForm()
    },
    changeFile (file, fileList) {},
    showAdd () {
      this.showDetail = !this.showDetail
      this.showxq = false
      this.isadd = true
      this.formId = 'kgsqd' + new Date().getTime()
      this.lmshForm.djbh = this.formId
      this.lmshForm.tbrq = this.formatDate(new Date())
    },
    updateFormDia (row, index) {
      this.showDetail = !this.showDetail
      this.isadd = false
      this.showxq = false
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.index = index
      this.htbh = {
        htbh: row.htbh
      }
      this.getfilebyid()
      // this.doubleclick()

    },
    showBhFormDia (row) {
      this.showDetail = !this.showDetail
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.htbh = {
        htbh: row.htbh
      }
      this.getfilebyid()
    },
    search () {
      this.showSearch = false
      // debugger
      // console.log(this.searchForm.jcrq)
      let {htbh,tbdw,datearr,pageNum,pageSize} = this.searchForm;
      let ksrq,jsrq;
      if(datearr&&datearr.length){
        ksrq = datearr[0]
        jsrq = datearr[1]
      }
      console.log(this.searchForm)
      this.$api.kgsqdgetAll({
        htbh:htbh?htbh.trim():undefined,
        tbdw:tbdw?tbdw.trim():undefined,
        ksrq,
        jsrq,
        pageNum,
        pageSize
      }).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.tableData = resp.data.data.list
          this.total = resp.data.data.total
        }
      }).catch(e => {
        this.loading = false
      })
    },
    addSubmit () {
      console.log(this.lmshForm)
      this.handleRemove(this.lmshForm.id)
      this.lmshForm.zt = '未开工'
      console.log(this.lmshForm)
      this.$api.addKgsqd(this.lmshForm).then(res => {
        if (res.data.code === 1) {
          this.rukufile()
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    updateSubmit () {
      console.log(this.lmshForm)
      console.log(this.lmshForm.id)
      this.handleRemove(this.lmshForm.id)
      this.$api.updateKgsqd(this.lmshForm).then(res => {
        if (res.data.code === 1) {
          this.rukufile()
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    deleteData () {
      if (this.multipleSelection.length > 0) {
        this.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let djbharr = ''
          this.multipleSelection.map((item, index) => {
            djbharr = djbharr + item.djbh + ','
          })
          djbharr = djbharr.slice(0, djbharr.length - 1)
          this.$api.deleteKgsqd('?djbhs=' + djbharr).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.handleRemove(this.lmshForm.djbh)
              this.search(this.currentPage, this.pageSize)
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({type: 'error', message: '请选选择要删除的数据'})
      }
    },
    shenhe (row, index) {
      this.$confirm('是否通过审核？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let form = JSON.parse(JSON.stringify(row))
        form.zt = '在建'
        this.$api.updateKgsqd(form).then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: '审核通过!'
            })
            this.search(this.currentPage, this.pageSize)
            this.resetForm()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消审核'
        })
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.search(this.currentPage, this.pageSize)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.search(this.currentPage, this.pageSize)
    },
    getPage (currentPage, pageSize) {
      this.loading = true
      this.$api.requestLkpdLkdcQueryPage('/' + currentPage + '/' + pageSize).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.tableData = resp.data.content
          this.total = resp.data.totalElements
        }
      }).catch(e => {
        this.loading = false
      })
    },
    resetForm () {
      this.showDetail = false
      this.lmshForm = {
        xcfx: '上行'
      }
    },
    submitAddForm () {
    },
    getXcRoadOptions () {
      this.$api.requestLdbqueryCombos().then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.roadOptions = resp.data
        }
      }).catch(e => {
      })
    },
    selecttreeBm (node) {
      this.searchForm.bmid = node.bmcode
      this.searchForm.bmname = node.bmname
      if (!this.searchForm.qmbbid) {
        // return
      } else {
        this.search(this.currentPage, this.pageSize)
      }
    },
    getQmldbb () {
      if (this.qmbbOptions.length > 0) { return }
      this.$api.requestLkpdbbkQueryQmldbb('0201').then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.qmbbOptions = resp.data
          this.searchForm.qmbbid = this.qmbbOptions[0].bbid
          if (!this.searchForm.bmid) {
            // return
          } else {
            this.search(this.currentPage, this.pageSize)
          }
        }
      }).catch(e => {
      })
    },
    selectHt (value) {
      this.lmshForm.htbh = value.htbh
      this.lmshForm.htmc = value.htmc
      this.lmshForm.gcxm = value.gj_cgxmmc
      this.lmshForm.cbdw = value.yh_cbdw
      this.lmshForm.gldw = value.yh_gldw
    }
  },
  mounted () {
    // zll
    this.getHtbhListarr()
    this.getTBdwarr()
    this.$api.getHtxxRelatedAll('').then(res => {
      this.htList = res.data.data

    })
    this.search(1, 10)
    this.tableHeight = $('#kgsqd')[0].offsetHeight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #kgsqd{
    /*padding: 10px 15px 0 15px;*/
    position: relative;
    font-size: 12px;
    height: 100%;
    overflow: auto;
    .gjzjje{
      input{
        height: 55px;
      }
    }
    .header{}
    .conter_table{
      height: calc(100% - 91px);
      min-height: 300px;
      padding: 0 15px;
    }
    .footer{
      height: 45px;
      background: #fff;
      position: relative;
      z-index: 100;
    }
    .dialog_warp{
      background: #fff;
      padding: 20px 40px;
      .zhubnr{
        li{
          width: 50%;
          height: 32px;
          float: left;
          border: 1px solid #D5D6D7;
          border-bottom: none;
          color: #52575D!important;
          font-size: 12px;
          &:nth-of-type(2n+1){
            border-right: none;
          }
          &:nth-last-of-type(1),&:nth-last-of-type(2){
            border-bottom: 1px solid #D5D6D7;
          }
          >span{
            width: 100px;
            display: inline-block;
            height: 100%;
            line-height: 31px;
            text-indent: 1em;
            border-right: 1px solid #D5D6D7;
            background: #F7F8F9;
            float: left;
          }
          p{
            width: calc(100% - 100px);
            height: 100%;
            float: left;
            .el-input__inner{
              border: none;
              text-align: center;
            }
          }
          .radio_line{
            /*span{
              display: inline-block;
              width: 50%;
            }*/
            padding: 0 5px;
            .el-radio__label{
              font-size: 12px;
            }
          }
          /*.tow_line,.three_line{
            >span{
              display: inline-block;
              text-indent: 5px;
              float: left;
              width: 50%;
              height: 100%;
              line-height: 31px;
              .el-input--mini{
                width: calc(100% - 25px);
                .el-input__inner{
                  padding: 0;
                }
              }
            }
          }
          .three_line{
            >span{
              width: calc(100%/3);
            }
          }*/
        }
        .tow_line,.three_line,.four_line{
          width: 100%;
          border-right: 1px solid #D5D6D7!important;
          .el-input--mini{
            width: calc(100% - 60px);
          }
          p{
            >span{
              border-bottom: 1px solid #D5D6D7;
              &:last-child{
                border-bottom: none;
              }
              i{
                display: inline-block;
                width: 60px;
                height: 100%;
                font-style: normal;
                background: #F7F8F9;
                float: left;
                line-height: 32px;
                text-align: center;
              }
            }
          }
        }
        .text_line{
          width: 100%;
          border-right: 1px solid #D5D6D7!important;
          min-height: 64px;
          height: auto;
          >span{
            min-height: 64px;
            height: 100% !important;
          }
          p{
            min-height: 64px;
          }
          .el-upload-list__item{
            border: none;
          }
        }
      }
      .zibnr{
        li{
          width: 25%;
          height: 64px;
          float: left;
          border: 1px solid #D5D6D7;
          color: #52575D!important;
          font-size: 12px;
          border-right: none;
          &:nth-last-of-type(1){
            border-right: 1px solid #D5D6D7;
          }
          >span{
            width: 100%;
            display: inline-block;
            height: 50%;
            line-height: 31px;
            text-align: center;
            background: #F7F8F9;
            border-bottom: 1px solid #D5D6D7;
          }
          p{
            width: calc(100%);
            height: 50%;
            float: left;
            .el-input__inner{
              border: none;
              text-align: center;
            }
          }
        }
      }
      .addzbsj{
        text-align: center;
        color: #1CA4FA;
        padding: 10px 0;
      }
    }
  }
</style>
