/**
* ----工程验收申请单
*/
<template>
  <div id="gcyssqd" style="height: 100%" v-loading="loading">
    <div class="header" v-show="!showDetail">>
      <span class="headerTit">工程验收申请单</span>
      <div class="header_option">
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
            <el-form-item class="" label="路线名称" prop="lxbh">
              <el-input v-model="searchForm.lxcode" size="mini" placeholder="请输入编号"></el-input>
              <!--<selectTree class="selectTree" v-model="searchForm.bmname" :isDefaultselect="true" :urlFunc="$api.requestBmtreeAll" :dataKey="{name: 'bmname'}" placeholder="请选择部门" @treeSelect="selecttreeBm"></selectTree>-->
            </el-form-item>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="行车方向" prop="" class="">
            <el-select size="mini"  class="" placeholder="请选择方向" v-model="searchForm.xcfx">
              <!--<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>-->
              <el-option label="上行" value="上行"></el-option>
              <el-option label="下行" value="下行"></el-option>
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
        <el-table-column align="center" prop="sqbh" label="申请编号"  show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="sqsj" label="申请时间" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="htbh" label="合同编号" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="sgdw" label="施工单位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="gldw" label="管理单位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="htksgq" label="合同开工工期" show-overflow-tooltip></el-table-column>
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
          <span class="titleclasschild" @click="showDetail = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span >工程验收申请单</span>
        </p>

      </div>


      <div class="dialog_warp">
        <ul class="zhubnr">
          <li>
            <span>申请编号</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" :value="lmshForm.sqbh"></el-input>
            </p>
          </li>
          <li>
            <span>合同编号</span>
            <p>
              <!--<el-input size="mini" type="text" v-model="lmshForm.htbh"></el-input>-->
              <el-select clearable :disabled="showxq" size="mini" style="width: 100%;" v-model="htbh" value-key="htbh" placeholder="" @change="selectHt">
                <el-option v-for="item in htlist" :key="item.htbh" :label="item.htbh" :value="item"></el-option>
              </el-select>
            </p>
          </li>
          <li>
            <span>申请时间</span>
            <p>
              <el-date-picker
                style="width:100%"
                :disabled="showxq"
                v-model="lmshForm.sqsj"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>项目名称</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.xmmc"></el-input>
            </p>
          </li>
          <li>
            <span>施工单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.sgdw"></el-input>
            </p>
          </li>
          <li>
            <span>管理单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.gldw"></el-input>
            </p>
          </li>
          <li>
            <span>合同开始工期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.htksgq"
                size="mini"
                type="date"
                :disabled="showxq"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>合同结束工期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.htjsgq"
                size="mini"
                type="date"
                :disabled="showxq"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li class="text_line">
            <span>验收类型</span>
            <p class="radio_line">
              <el-radio style="height: 100%;line-height: 31px" :disabled="showxq" v-model="lmshForm.yslx" label="交工验收">交工验收</el-radio>
              <el-radio style="height: 100%;line-height: 31px" :disabled="showxq" v-model="lmshForm.yslx" label="竣工验收">竣工验收</el-radio>
            </p>
          </li>
          <li class="text_line">
            <span>施工方意见</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.sgfyj"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>监理单位意见</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.jldwyj"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>工程技术部意见</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.gcjsbyj"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>经营发展部意见</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.jyfzbyj"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>附件</span>
            <p>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :disabled="showxq"
                :limit="3">
                <i style="color: #00a2fd;" v-if="!showxq" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
            </p>
          </li>
          <li>
            <span>填报人</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.tbr"></el-input>
            </p>
          </li>
          <li>
            <span>填报日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.tbrq"
                size="mini"
                :disabled="showxq"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>填报单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.tbdw"></el-input>
            </p>
          </li>
          <li>
            <span>填报部门</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.tbbm"></el-input>
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
<!--    <el-dialog class="data-dialog el-updata-div" title="验收申请单" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" @close="resetForm">
      <div class="dialog_warp">
        <ul class="zhubnr">
          <li>
            <span>申请编号</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" :value="lmshForm.sqbh"></el-input>
            </p>
          </li>
          <li>
            <span>合同编号</span>
            <p>
              &lt;!&ndash;<el-input size="mini" type="text" v-model="lmshForm.htbh"></el-input>&ndash;&gt;
              <el-select clearable :disabled="showxq" size="mini" style="width: 148px;" v-model="htbh" value-key="htbh" placeholder="" @change="selectHt">
                <el-option v-for="item in htlist" :key="item.htbh" :label="item.htbh" :value="item"></el-option>
              </el-select>
            </p>
          </li>
          <li>
            <span>申请时间</span>
            <p>
              <el-date-picker
                style="width:100%"
                :disabled="showxq"
                v-model="lmshForm.sqsj"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>项目名称</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.xmmc"></el-input>
            </p>
          </li>
          <li>
            <span>施工单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.sgdw"></el-input>
            </p>
          </li>
          <li>
            <span>管理单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.gldw"></el-input>
            </p>
          </li>
          <li>
            <span>合同开始工期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.htksgq"
                size="mini"
                type="date"
                :disabled="showxq"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>合同结束工期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.htjsgq"
                size="mini"
                type="date"
                :disabled="showxq"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li class="text_line">
            <span>验收类型</span>
            <p class="radio_line">
              <el-radio style="height: 100%;line-height: 31px" :disabled="showxq" v-model="lmshForm.yslx" label="交工验收">交工验收</el-radio>
              <el-radio style="height: 100%;line-height: 31px" :disabled="showxq" v-model="lmshForm.yslx" label="竣工验收">竣工验收</el-radio>
            </p>
          </li>
          <li class="text_line">
            <span>施工方意见</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.sgfyj"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>监理单位意见</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.jldwyj"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>工程技术部意见</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.gcjsbyj"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>经营发展部意见</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.jyfzbyj"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>附件</span>
            <p>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :disabled="showxq"
                :limit="3">
                <i style="color: #00a2fd;" v-if="!showxq" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
            </p>
          </li>
          <li>
            <span>填报人</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.tbr"></el-input>
            </p>
          </li>
          <li>
            <span>填报日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.tbrq"
                size="mini"
                :disabled="showxq"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>填报单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.tbdw"></el-input>
            </p>
          </li>
          <li>
            <span>填报部门</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.tbbm"></el-input>
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
      lmshForm: {
      },
      index: '',
      isadd: false,
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
      htbh: {},
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      multipleSelection: [],
      fromId: '',
      htlist: [],
      total:0
    }
  },
  methods: {
    showAdd () {
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      this.formId = 'gcys' + new Date().getTime()
      this.lmshForm.sqbh = this.formId
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
    search (currentPage, pageSize) {
      this.showSearch = false
      if (this.searchForm.jcrq) {
        this.searchForm.ksrq = this.searchForm.jcrq[0]
        this.searchForm.jsrq = this.searchForm.jcrq[1]
      }
      this.$api.getGcyssqdList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          if(resp.data){
            if(resp.data.data){
              if(resp.data.data.list){
                this.tableData = resp.data.data.list
              }
              if(resp.data.data.total){
                this.total = resp.data.data.total
              }
            }
          }

        }
      }).catch(e => {
        this.loading = false
      })
    },
    addSubmit () {
      this.$api.addGcyssqdForGcys(this.lmshForm).then(res => {
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
      this.$api.editGcyssqdForGcys(this.lmshForm).then(res => {
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
            djbharr = djbharr + item.sqbh + ','
          })
          djbharr = djbharr.slice(0, djbharr.length - 1)

          this.$api.delGcyssqdForGcys('?sqbhs=' + djbharr).then(res => {
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
        this.$api.spGcyssqdForGcys('?spzt=已下发&sqbhs=' + form.sqbh).then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: '审核成功!'
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消审核'
        })
      })
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
          if(resp.data){
            this.total = resp.data.totalElements
          }

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
    getHtxxRelatedAll () {
      this.$api.getHtxxRelatedAll('').then(resp => {
        if (resp.data.code === 1) {

          this.htlist = resp.data.data
        }
      })
    },
    selectHt (value) {
      this.lmshForm.htbh = value.gj_htbh
      this.lmshForm.xmmc = value.htmc
      this.lmshForm.htje = value.gj_htje
      this.lmshForm.sgdw = value.yh_cbdw
      this.lmshForm.gldw = value.yh_gldw
      this.lmshForm.htksgq = value.yh_htkgrq
      this.lmshForm.htjsgq = value.yh_htwgrq
    }
  },
  mounted () {
    this.search(1, 10)
    this.getHtxxRelatedAll()
    this.tableHeight = $('#gcyssqd')[0].offsetHeight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  #gcyssqd{
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
      ul{
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
    }
  }
</style>
