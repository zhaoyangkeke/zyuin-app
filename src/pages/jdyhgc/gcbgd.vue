/**
* ----工程变更单
*/
<template>
  <div id="gcbgd" style="height: 100%" v-loading="loading">
    <div class="header" v-show="!showDetail">
      <span class="headerTit">工程变更单</span>
      <div class="header_option">
        <!--<div class="jianlimb" @click="showAdd()"><i class="el-icon-download"> 填写变更单</i></div>-->
        <ul>
          <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
          <li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table" v-show="!showDetail">
      <div class="chaxun">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="单据编号" prop="lxbh">
              <el-input v-model="searchForm.lxcode" size="mini" placeholder="请输入单据编号"></el-input>
              <!--<selectTree class="selectTree" v-model="searchForm.bmname" :isDefaultselect="true" :urlFunc="$api.requestBmtreeAll" :dataKey="{name: 'bmname'}" placeholder="请选择部门" @treeSelect="selecttreeBm"></selectTree>-->
            </el-form-item>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="管理单位" prop="" class="">
            <el-select size="mini"  class="" placeholder="请选择管理单位" v-model="searchForm.xcfx">
              <!--<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>-->
              <el-option label="甬台温公司" value="甬台温公司"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="日期选择" prop="" class="">
            <el-date-picker
              v-model="searchForm.jcrq"
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
            <el-button size="mini" @click="search(1, 10)" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
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
        <el-table-column type="expand">
          <template scope="scope">
            <el-table class="demo-table-expand"
                      :data="scope.row.tableData1"
                      border>
              <el-table-column prop="date" label="子目号"></el-table-column>
              <el-table-column prop="date" label="子目名称"></el-table-column>
              <el-table-column prop="date" label="单位"></el-table-column>
              <el-table-column prop="date" label="单价"></el-table-column>
              <el-table-column prop="date" label="工程量">
                <el-table-column prop="date" label="变更前"></el-table-column>
                <el-table-column prop="date" label="变更后"></el-table-column>
              </el-table-column>
              <el-table-column prop="date" label="金额">
                <el-table-column prop="date" label="变更前"></el-table-column>
                <el-table-column prop="date" label="变更后"></el-table-column>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="80">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="djbh" label="单据编号"  show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="qdzh" label="起点桩号"></el-table-column>
        <el-table-column align="center" prop="zdzh" label="止点桩号"></el-table-column>
        <el-table-column align="center" prop="gcmc" label="工程名称" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="sqrq" label="申请日期" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="bw" label="部位"></el-table-column>
        <el-table-column align="center" prop="htbh" label="合同编号"></el-table-column>
        <el-table-column align="center" prop="gldw" label="管理单位"></el-table-column>
        <el-table-column align="center" prop="bz" label="备注" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <footer class="footer" v-show="!showDetail">
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
          <span>工程变更单</span>
        </p>
      </div>


      <div class="dialog_warp">
        <ul class="zhubnr">
          <li>
            <span>单据编号</span>
            <p>
              <el-input size="mini" type="text" :value="lmshForm.djbh"></el-input>
            </p>
          </li>
          <li>
            <span>工程名称</span>
            <p>
              <el-select clearable size="mini" :disabled="showxq" style="width: 100%;" v-model="htbh" value-key="htbh" placeholder="请选择" @change="selectHt">
                <el-option v-for="item in htList" :key="item.htbh" :label="item.gcmc" :value="item"></el-option>
              </el-select>
              <!--<el-input size="mini" type="text" v-model="lmshForm.gcmc"></el-input>-->
            </p>
          </li>
          <li>
            <span>申请日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.sqrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>部位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.bw"></el-input>
            </p>
          </li>
          <li>
            <span>合同编号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.htbh"></el-input>
            </p>
          </li>
          <li>
            <span>管理单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.gldw"></el-input>
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
            <span>工程变更申请表编号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.sqbbh"></el-input>
            </p>
          </li>
          <li>
            <span>变更令编号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.bglbh"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>变更理由</span>
            <p>
              <el-input class="gjzjje" size="mini" type="text" v-model="lmshForm.bgly"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>变更内容</span>
            <p>
              <el-input class="gjzjje" size="mini" type="text" v-model="lmshForm.bgnr"></el-input>
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
            <span>估计增(减)金额</span>
            <p>
              <el-input size="mini"  class="gjzjje" type="text" v-model="lmshForm.gjzjje"></el-input>
            </p>
          </li>
          <li>
            <span>承包单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.cbdw"></el-input>
            </p>
          </li>
          <li>
            <span>编制日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.bzrq"
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
        <div class="addzbsj">
          <i @click="addzb=!addzb" :class="addzb?'el-icon-remove-outline':'el-icon-circle-plus-outline'"></i>
        </div>
        <div class="zibnr" v-if="addzb" style="overflow-x: auto;overflow-y: hidden;">
          <div class="iconwarp">
          </div>
          <ul>
            <li>
              <span>子目号</span>
              <span>子目名称</span>
              <span>单位</span>
              <span>单价</span>
              <span>
                <div>工程量</div>
                <span>变更前</span>
                <span>变更后</span>
              </span>
              <span>
                <div>金额</div>
                <span>变更前</span>
                <span>变更后</span>
              </span>
            </li>
            <li v-for="(item, index) in lmshForm.mx" :key="index">
              <p>
                <el-input size="mini" type="text" v-model="item.zmh"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.zmmc"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.dw"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.dj"></el-input>
              </p>
              <p class="tow_linep">
                <el-input size="mini" type="text" v-model="item.gclbgq"></el-input>
                <el-input size="mini" type="text" v-model="item.gclbgh"></el-input>
              </p>
              <p class="tow_linep">
                <el-input size="mini" type="text" v-model="item.jebgq"></el-input>
                <el-input size="mini" type="text" v-model="item.jebgh"></el-input>
              </p>
            </li>
            <div style="clear: both"></div>
          </ul>
        </div>
        <div class="dialog_footer" v-if="!showxq">
          <el-button size="mini" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="mini" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>
    </div>
<!--    <el-dialog class="data-dialog el-updata-div" title="工程变更单" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" @close="resetForm">
      <div class="dialog_warp">
        <ul class="zhubnr">
          <li>
            <span>单据编号</span>
            <p>
              <el-input size="mini" type="text" :value="lmshForm.djbh"></el-input>
            </p>
          </li>
          <li>
            <span>工程名称</span>
            <p>
              <el-select clearable size="mini" :disabled="showxq" style="width: 148px;" v-model="htbh" value-key="htbh" placeholder="请选择" @change="selectHt">
                <el-option v-for="item in htList" :key="item.htbh" :label="item.gcmc" :value="item"></el-option>
              </el-select>
              &lt;!&ndash;<el-input size="mini" type="text" v-model="lmshForm.gcmc"></el-input>&ndash;&gt;
            </p>
          </li>
          <li>
            <span>申请日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.sqrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>部位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.bw"></el-input>
            </p>
          </li>
          <li>
            <span>合同编号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.htbh"></el-input>
            </p>
          </li>
          <li>
            <span>管理单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.gldw"></el-input>
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
            <span>工程变更申请表编号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.sqbbh"></el-input>
            </p>
          </li>
          <li>
            <span>变更令编号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.bglbh"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>变更理由</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.bgly"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>变更内容</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.bgnr"></el-input>
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
            <span>估计增(减)金额</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.gjzjje"></el-input>
            </p>
          </li>
          <li>
            <span>承包单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.cbdw"></el-input>
            </p>
          </li>
          <li>
            <span>编制日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.bzrq"
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
        <div class="addzbsj">
          <i @click="addzb=!addzb" :class="addzb?'el-icon-remove-outline':'el-icon-circle-plus-outline'"></i>
        </div>
        <div class="zibnr" v-if="addzb" style="overflow-x: auto;overflow-y: hidden;">
          <div class="iconwarp">
          </div>
          <ul>
            <li>
              <span>子目号</span>
              <span>子目名称</span>
              <span>单位</span>
              <span>单价</span>
              <span>
                <div>工程量</div>
                <span>变更前</span>
                <span>变更后</span>
              </span>
              <span>
                <div>金额</div>
                <span>变更前</span>
                <span>变更后</span>
              </span>
            </li>
            <li v-for="(item, index) in lmshForm.mx" :key="index">
              <p>
                <el-input size="mini" type="text" v-model="item.zmh"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.zmmc"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.dw"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.dj"></el-input>
              </p>
              <p class="tow_linep">
                <el-input size="mini" type="text" v-model="item.gclbgq"></el-input>
                <el-input size="mini" type="text" v-model="item.gclbgh"></el-input>
              </p>
              <p class="tow_linep">
                <el-input size="mini" type="text" v-model="item.jebgq"></el-input>
                <el-input size="mini" type="text" v-model="item.jebgh"></el-input>
              </p>
            </li>
            <div style="clear: both"></div>
          </ul>
        </div>
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
      lmshForm: {
        mx: [{}]
      },
      index: '',
      isadd: false,
      addzb: true,
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
      searchForm: {},
      currentPage: 1,
      pageSize: 10,
      total: 10,
      personelForm: {},
      showDetail: false,
      formId: '',
      htList: [],
      htbh: {},
      sqbList: [],
      sqbbh: {},
      fileList: [],
      multipleSelection: []
    }
  },
  methods: {
    showAdd () {
      this.$api.zxyhbgglgcbggetHtBgdInfoByBm('').then(res => {
        this.htList = res.data.data

      })
      this.isadd = true
      this.showDetail = true
      this.inuptloading = true
      this.showxq = false
      this.formId = 'gcbgd' + new Date().getTime()
      this.lmshForm.djbh = this.formId
    },
    updateFormDia (row, index) {
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.index = index
      this.htbh = {
        htbh: row.htbh
      }
      this.sqbbh = {
        sqbbh: row.sqbbh
      }
      this.getfilebyid()
    },
    getfilebyid () {
      this.$api.getFilesDataById('?id=' + this.lmshForm.djbh).then(res => {
        this.fileList = res.data.data
        this.fileList.map(item => {
          item.name = item.file_yname
        })
      })
    },
    handleRemove (fileid) {
      this.$api.deleteFilesById('?ids=' + fileid).then(res => {})
    },
    rukufile () {
      let uploadFiles = []
      console.log(this.$refs.uploada.uploadFiles, 6666)
      if (this.$refs.uploada.uploadFiles.length > 0) {
        this.$refs.uploada.uploadFiles.map(item => {
          if (item.response) {
            item.response.data.file_id = this.lmshForm.djbh
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
      this.search(this.currentPage, this.pageSize)
      this.resetForm()
    },
    showBhFormDia (row) {
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.htbh = {
        htbh: row.htbh
      }
      this.sqbbh = {
        sqbbh: row.sqbbh
      }
      this.getfilebyid()
    },
    search (currentPage, pageSize) {
      this.showSearch = false
      if (this.searchForm.jcrq) {
        this.searchForm.ksrq = this.searchForm.jcrq[0]
        this.searchForm.jsrq = this.searchForm.jcrq[1]
      }
      this.$api.getBgdList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
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
      this.handleRemove(this.lmshForm.djbh)
      console.log(this.lmshForm)
      this.$api.addBgdForBggl(this.lmshForm).then(res => {
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
      this.handleRemove(this.lmshForm.djbh)
      this.$api.editBgdForBggl(this.lmshForm).then(res => {
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
          this.$api.delBgdForBggl('?djbhs=' + djbharr).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.handleRemove(this.lmshForm.bglbhs)
              this.search(this.currentPage, this.pageSize)
              // this.resetForm()
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
        form.spzt = '已下发'
        this.$api.spBglForBggl('?spzt=' + form.spzt + '&bglbhs=' + form.bglbh).then(res => {
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
    daochu () {
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
        mx: [{}]
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
      this.lmshForm.gcmc = value.gcmc
      this.lmshForm.bw = value.bw
      this.lmshForm.cbdw = value.cbdw
      this.lmshForm.gldw = value.gldw
      this.lmshForm.qdzh = value.qdzh
      this.lmshForm.zdzh = value.zdzh
      this.lmshForm.sqbbh = value.sqbbh
      this.lmshForm.bglbh = value.bglbh
      this.lmshForm.bgly = value.bgly
      this.lmshForm.bgnr = value.bgnr
      this.lmshForm.gjzjje = value.gjzjje
      this.lmshForm.bzrq = value.bzrq
      if(value.mx.length){
      this.lmshForm.mx = value.mx
      }else{
      this.lmshForm.mx=[{}]
      }
    },
    selectSqb (value) {
      this.lmshForm.sqbbh = value.sqbbh
      this.lmshForm.bgnr = value.bgnr
    }
  },
  mounted () {
    this.$api.zxyhbgglgcbggetHtBgdInfoByBm('').then(res => {
      this.htList = res.data.data
    })
    this.$api.getBglBgsqbInfo().then(res => {
      this.sqbList = res.data.data
    })
    this.search(1, 10)
    this.tableHeight = $('#gcbgd')[0].offsetHeight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">


  #gcbgd{

    position: relative;
    /*padding: 10px 15px 0 15px;*/
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
      /*padding: 20px 40px;*/
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
      .zibnr,.zibiaonr{
        width: 100%;
        position: relative;
        padding: 15px 0 0 0;
        overflow: hidden;
        text-align: center;
        box-sizing: border-box;
        ul{
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 15px;
          li{
            width: 100%;
            /*width: 600px;*/
            height: 32px;
            float: left;
            box-sizing: border-box;
            border: 1px solid #D5D6D7;
            color: #52575D!important;
            font-size: 12px;
            border-right: none;
            border-bottom: none;
            &:nth-of-type(1){
              height: 60px;
            }
            &:nth-last-of-type(1){
              border-bottom: 1px solid #D5D6D7;
            }
            >span{
              width: calc(100%/6);
              display: inline-block;
              height: 100%;
              float: left;
              line-height: 31px;
              text-align: center;
              background: #F7F8F9;
              border-right: 1px solid #D5D6D7;
              div{
                height: 50%;
              }
              span{
                width: 50%;
                height: 50%;
                display: inline-block;
                float: left;
                border-top: 1px solid #D5D6D7;
                border-right: 1px solid #D5D6D7;
                &:nth-last-of-type(1){
                  border-right: none;
                }
              }
            }
            p{
              width: calc(100%/6);
              height: 100%;
              line-height: 32px;
              float: left;
              border-right: 1px solid #D5D6D7;
              .el-input__inner{
                border: none;
                text-align: center;
              }
              i{
                color: #00a2fd;
                margin:0 5px;
              }
            }
            .tow_linep{
              .el-input{
                width: 50%!important;
                float: left;
                &:nth-of-type(1){
                  border-right: 1px solid #D5D6D7;
                }
                .el-input__inner{
                  padding: 0!important;
                }
              }
            }
          }
        }
        .gchzb{
          li{
            width: 600px;
            >span,p{
              width: calc(100%/6);
            }
          }
        }
      }
      .zibiaonr{
        margin-top: 20px;
        li{
          width: calc(100%/6);
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
            i{
              color: #00a2fd;
              margin:0 5px;
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
