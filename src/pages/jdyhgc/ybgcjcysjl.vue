/**
* ----隐蔽工程检查验收记录
*/
<template>
  <div id="lkpdlmsh" style="height: 100%" v-loading="loading">
    <div class="header">
      <span class="headerTit">隐蔽工程检查验收记录</span>
      <div class="header_option">
        <!--<div class="jianlimb" @click="showAdd()"><i class="el-icon-download"> 填写验收记录</i></div>-->
        <ul>
          <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
          <li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table">
      <div class="chaxun">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="合同编号" prop="lxbh">
              <!--<el-input v-model="searchForm.lxcode" size="mini" placeholder="请输入合同编号"></el-input>-->
              <el-select size="mini"  class="" placeholder="请选择合同编号" v-model="searchForm.htbh" filterable>
                <el-option v-for="(item,index) in htbhlist" :key="index" :label="item.HTBH" :value="item.HTBH"></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="管理单位" prop="" class="">
            <el-select size="mini"  class="" placeholder="请选择管理单位" v-model="searchForm.gldw" filterable>
              <el-option v-for="(item,index) in gldwlist" :key="index" :label="item.GLDW" :value="item.GLDW"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="日期选择" prop="" class="">
            <el-date-picker
              v-model="searchForm.selectDate"
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
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label=" "
          width="25">
        </el-table-column>
        <el-table-column type="expand">
          <template scope="scope">
            <el-table class="demo-table-expand"
                      :data="scope.row.ybgcmxList"
                      border>
              <el-table-column prop="zmh" label="子目号"></el-table-column>
              <el-table-column prop="zmmc" label="子目名称"></el-table-column>
              <el-table-column prop="dw" label="单位"></el-table-column>
              <el-table-column prop="sl" label="数量"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="80">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="80">
          <template scope="scope">
            <span style="color:#D34C42;cursor: pointer;text-align: center" v-if="scope.row.spzt==='未处理'||scope.row.spzt===null" @click="shenhe(scope.row, scope.$index)">未处理</span>
            <span style="color:#00a2fd;text-align: center" v-if="scope.row.spzt==='已下发'">{{scope.row.spzt}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="yjrq" label="隐检日期" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="htmc" label="工程名称" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="htbh" label="合同编号" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="yjxm" label="隐检项目" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="yjbw" label="隐检部位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="gldw" label="管理单位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="cbdw" label="承包单位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="ybgcnr" label="隐蔽工程内容" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="bzdw" label="编制单位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="bzrq" label="编制日期" show-overflow-tooltip></el-table-column>
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
    <div class="tabArea"  v-if="showDetail"  @close="resetForm">
      <div style="position:relative;">
        <p class="tabAreaTit" v-if="!addzb">
          <span class="titleclasschild"  @click="showDetail = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>隐蔽工程检查验收记录</span>
        </p>
        <p class="tabAreaTit" v-if="addzb">
          <span class="titleclasschild"  @click="addzb = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>添加计划</span>
        </p>
        <div class="SPState">
          <el-button size="mini" v-if="!addzb" @click="addzb = true"><i class="el-icon-edit-outline" title="添加"></i>添加子目</el-button>
          <el-button size="mini" v-if="addzb" @click="addzibiao"><i class="el-icon-edit-outline" title="添加"></i>添加</el-button>
        </div>
      </div>
      <!--<div class="closeBTN" @click="showDetail = false"><i class="icon iconfont icon-down"></i></div>-->
      <div class="dialog_warp">
        <ul class="zhubnr"  v-if="!addzb">
          <li>
            <span>单据编号</span>
            <p>
              <el-input size="mini" type="text" :value="lmshForm.djbh"></el-input>
            </p>
          </li>
          <li>
            <span>隐检日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.yjrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>工程名称</span>
            <p>
              <el-select clearable size="mini" :disabled="showxq" style="width: 100%" v-model="lmshForm.htmc" value-key="htbh" placeholder="" @change="selectHt">
                <el-option v-for="item in htList" :key="item.htbh" :label="item.gj_cgxmmc" :value="item"></el-option>
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
            <span>隐检项目</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.yjxm"></el-input>
            </p>
          </li>
          <li>
            <span>隐检部位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.yjbw"></el-input>
            </p>
          </li>
          <li>
            <span>管理单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.gldw"></el-input>
            </p>
          </li>
          <li>
            <span>承包单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.cbdw"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>隐蔽工程内容</span>
            <p>
              <el-input class="gjzjje" size="mini" type="text" v-model="lmshForm.ybgcnr"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>附件(含工程量计算简图)</span>
            <p>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :limit="3">
                <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
            </p>
          </li>
          <li class="text_line">
            <span>检查结论</span>
            <p>
              <el-input class="gjzjje" size="mini" type="text" v-model="lmshForm.jcjl"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>质量问题</span>
            <p>
              <el-input class="gjzjje" size="mini" type="text" v-model="lmshForm.zlwt"></el-input>
            </p>
          </li>
          <li>
            <span>编制单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.bzdw"></el-input>
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

        <ul class="zibnr" style="padding-top: 20px;" v-if="addzb">
          <li>
            <span>操作</span><span>子目号</span><span>子目名称</span><span>单位</span><span>数量</span>
          </li>
          <li v-for="(item, index) in lmshForm.ybgcmxList" :key="index">
            <p>
              <i class="el-icon-delete" title="删除" @click="deletezibiao(index)"></i>
            </p>
            <p>
              <el-select clearable size="mini" @focus="fuzhi(item, index)" :disabled="showxq" v-model="item.zmh" value-key="zmh" placeholder="" @change="selectZmht">
                <el-option v-for="items in ybmxList" :key="items.zmid" :label="items.zmh" :value="items"></el-option>
              </el-select>
            </p>
            <p>
              <el-input size="mini" type="text" v-model="item.zmmc"></el-input>
            </p>
            <p>
              <el-input size="mini" type="text" v-model="item.dw"></el-input>
            </p>
            <p>
              <el-input size="mini" type="text" v-model="item.sl"></el-input>
            </p>
          </li>
          <li style="clear: both"></li>
        </ul>
        <div class="dialog_footer" v-if="!showxq">
          <el-button size="mini" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="mini" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>
    </div>
<!--    <el-dialog class="data-dialog el-updata-div" title="添加" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" @close="resetForm">
      <div class="dialog_warp">
        <ul class="zhubnr">
          <li>
            <span>单据编号</span>
            <p>
              <el-input size="mini" type="text" :value="lmshForm.djbh"></el-input>
            </p>
          </li>
          <li>
            <span>隐检日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.yjrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>工程名称</span>
            <p>
              <el-select clearable size="mini" :disabled="showxq" style="width: 148px;" v-model="lmshForm.htmc" value-key="htbh" placeholder="" @change="selectHt">
                <el-option v-for="item in htList" :key="item.htbh" :label="item.gj_cgxmmc" :value="item"></el-option>
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
            <span>隐检项目</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.yjxm"></el-input>
            </p>
          </li>
          <li>
            <span>隐检部位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.yjbw"></el-input>
            </p>
          </li>
          <li>
            <span>管理单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.gldw"></el-input>
            </p>
          </li>
          <li>
            <span>承包单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.cbdw"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>隐蔽工程内容</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.ybgcnr"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>附件(含工程量计算简图)</span>
            <p>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :limit="3">
                <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
            </p>
          </li>
          <li class="text_line">
            <span>检查结论</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.jcjl"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>质量问题</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.zlwt"></el-input>
            </p>
          </li>
          <li>
            <span>编制单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.bzdw"></el-input>
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
        <ul class="zibnr" v-if="addzb">
          <el-upload
            class="upload-demo"
            action=""
            style="display: inline-block;font-size: 12px"
            multiple
            :limit="3"
            :on-change="ceshi">
            <i class="el-icon-download" title="导入"></i>
          </el-upload>
          <i class="el-icon-edit-outline" title="添加" @click="addzibiao"></i>
          <li>
            <span>操作</span><span>子目号</span><span>子目名称</span><span>单位</span><span>数量</span>
          </li>
          <li v-for="(item, index) in lmshForm.ybgcmxList" :key="index">
            <p>
              <i class="el-icon-delete" title="删除" @click="deletezibiao(index)"></i>
            </p>
            <p>
              <el-select clearable size="mini" @focus="fuzhi(item, index)" :disabled="showxq" v-model="item.zmh" value-key="zmh" placeholder="" @change="selectZmht">
                <el-option v-for="items in ybmxList" :key="items.zmid" :label="items.zmh" :value="items"></el-option>
              </el-select>
            </p>
            <p>
              <el-input size="mini" type="text" v-model="item.zmmc"></el-input>
            </p>
            <p>
              <el-input size="mini" type="text" v-model="item.dw"></el-input>
            </p>
            <p>
              <el-input size="mini" type="text" v-model="item.sl"></el-input>
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
      gldwlist: [],
      htbhlist: [],
      lmshForm: {
        ybgcmxList: [{htlynr: {}}]
      },
      index: '',
      isadd: false,
      addzb: false,
      submitLoading: false,
      showxq: false,
      showSearch: false,
      loading: false,
      tableHeight: 300,
      tableData: [],
      total: 10,
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      roadOptions: [],
      searchForm: {
        htbh: undefined,
        gldw: undefined,
        selectDate: null,
        pageNum:1,
        pageSize:10
      },
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      multipleSelection: [],
      htList: [],
      ybmxList: [],
      ybgcindex: 1
    }
  },
  methods: {
    // zll
    resizeSearch(){
      this.searchForm.htbh = undefined
      this.searchForm.gldw = undefined
      this.searchForm.selectDate = undefined
      this.searchForm.pageNum = 1
    },
    // 合同编号list
    getYbgcHtbhArr () {
      this.$api.getYbgcHtbhList().then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {
          this.htbhlist = res.data.data
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 管理单位list
    getYbgcGldwArr () {
      this.$api.getYbgcGldwList().then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {
          this.gldwlist = res.data.data
        }
      }).catch(e => {
        console.log(e)
      })
    },
    showAdd () {
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      this.formId = 'ybgc' + new Date().getTime()
      this.lmshForm.djbh = this.formId
    },
    updateFormDia (row, index) {
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.index = index
    },
    showBhFormDia (row) {
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
    },
    search () {
      this.showSearch = false
      let {htbh, gldw, selectDate, pageNum, pageSize} = this.searchForm
      let ksrq, jsrq
      if (selectDate && selectDate.length) {
        ksrq = selectDate[0]
        jsrq = selectDate[1]
      }
      this.$api.ybgcgetYbgc({
        htbh: htbh ? htbh.trim() : undefined,
        gldw: gldw ? gldw.trim() : undefined,
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
      console.log(JSON.stringify(this.lmshForm));
      this.$api.ybgcaddYbgc(this.lmshForm).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.search(this.currentPage, this.pageSize)
          this.resetForm()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    updateSubmit () {
      this.$api.ybgcupdateYbgc(this.lmshForm).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          this.search(this.currentPage, this.pageSize)
          this.resetForm()
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
            djbharr = djbharr + item.id + ','
          })
          djbharr = djbharr.slice(0, djbharr.length - 1)
          this.$api.ybgcdeleteYbgc('?ids=' + djbharr).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
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
        this.$api.ybgcspYbgc('?spzt=已下发&ids=' + form.id).then(res => {
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
    selectHt (value) {
      this.lmshForm.htbh = value.htbh
      this.lmshForm.htmc = value.htmc
      this.lmshForm.cbdw = value.yh_cbdw
      this.lmshForm.gldw = value.yh_gldw
      this.ybmxList = value.zmhts
    },
    selectZmht (value) {
      if (value === null || value === '') {
        this.$message({
          type: 'warning',
          message: '请先选择合同信息'
        })
        return
      }
      this.lmshForm.ybgcmxList[this.ybgcindex].zmh = value.zmh
      this.lmshForm.ybgcmxList[this.ybgcindex].zmmc = value.zmmc
      this.lmshForm.ybgcmxList[this.ybgcindex].sl = value.sl
      this.lmshForm.ybgcmxList[this.ybgcindex].dw = value.jldw
    },
    fuzhi (item, index) {
      console.log(index, 888)
      this.ybgcindex = index
    },
    addzibiao () {
      this.lmshForm.ybgcmxList.push({htlynr: {}})
    },
    deletezibiao (index) {
      this.lmshForm.ybgcmxList.splice(index, 1)
    },
    daoru () {
      for (var i = 0; i < 4; i++) {
        this.tableData.push({
          lxcode: 'G15',
          qdzh: 'K16+700',
          zdzh: 'K16+800',
          xcfx: '上行',
          jcrq: '2018/12/11',
          jcsb: 'XX设备',
          jlry: '张三',
          jckd: '3',
          qljszk1: '2',
          qljszk2: '3',
          qljszk3: '4',
          qljszk4: '5',
          sd1: '1',
          sd2: '2',
          sd3: '3',
          hd1: '1',
          hd2: '2',
          hd3: '3',
          hd4: '4'
        })
      }
      this.$message({
        type: 'success',
        message: '导入成功!'
      })
    },
    daochu () {
    },
    ceshi () {
      this.$message({
        type: 'error',
        message: '内容格式不符合要求'
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
        ybgcmxList: [{htlynr: {}}]
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
    }
  },
  mounted () {
    this.$api.getHtxxRelatedAll('').then(res => {
      this.htList = res.data.data
    })
    this.search()
    this.tableHeight = $('#lkpdlmsh')[0].offsetHeight
    this.getYbgcHtbhArr()
    this.getYbgcGldwArr()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #lkpdlmsh{
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
      .zibnr,.zibiaonr{
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        text-align: center;
        li{
          width: 100%;
          height: 32px;
          float: left;
          border: 1px solid #D5D6D7;
          color: #52575D!important;
          font-size: 12px;
          border-right: none;
          border-bottom: none;
          &:nth-last-of-type(1){
            border-bottom: 1px solid #D5D6D7;
          }
          >span{
            width: 20%;
            display: inline-block;
            height: 100%;
            float: left;
            line-height: 31px;
            text-align: center;
            background: #F7F8F9;
            border-right: 1px solid #D5D6D7;
          }
          p{
            width: calc(20%);
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
