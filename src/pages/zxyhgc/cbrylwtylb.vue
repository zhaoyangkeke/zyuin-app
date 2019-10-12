/**
* 专项养护----承包人遗留问题一览表
*/
<template>
  <div id="gcbgd" style="height: 100%" v-loading="loading">
    <div class="header" v-show="!showDetail">
      <span class="headerTit">承包人遗留问题一览表</span>
      <div class="header_option">
        <ul>
          <li @click="showAdd()" v-if="outside"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()" v-if="outside"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table" v-show="!showDetail">
      <div class="chaxun">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">

          <el-form-item class="autocomplete" label="项目名称" prop="htbh">
            <el-autocomplete
              class="inline-input"
              size="mini"
              v-model="searchForm.gcmc"
              :fetch-suggestions="querySearchMC"
              @select="handleSelectMC($event, 1)"
              placeholder="请输入项目名称"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.XMMC }}</div>
              </template>
              <i slot="suffix" @click="showDialog('mc')" class="icon iconfont icon-xiangqing1"></i>
            </el-autocomplete>
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
            <el-button size="mini" @click="search(1, 10,searchForm)"
                       style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询
            </el-button>
            <el-button size="mini" @click="resizeDate">重置</el-button>
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
          align="center"
          :selectable="selectables"
          width="60">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column align="left" prop="gcmc" label="项目名称" sortable show-overflow-tooltip></el-table-column>
        <!-- <el-table-column align="left" prop="htbh" label="项目编号" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="djbh" label="单据编号"  sortable show-overflow-tooltip></el-table-column> -->
        <el-table-column align="left" prop="cbdw" label="承包单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="bzdw" label="编制单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="bzrq" label="编制日期" width="100" sortable
                         show-overflow-tooltip></el-table-column>
        <el-table-column align="left" label="状态" sortable width="80">
          <template scope="scope">
            <span style="color:#D34C42;text-align: left"
                  v-if="scope.row.spzt ==='4001'">自由</span>
            <span style="color:#00a2fd;text-align: left" v-if="scope.row.spzt==='4002'">审批中</span>
            <span style="color:#00a2fd;text-align: left" v-if="scope.row.spzt==='4003'">已审批</span>
          </template>
        </el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="120">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center"
                  v-if="scope.row.spzt==='4001' && outside" @click="shenhe(scope.row, scope.$index)">提交</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center"
                  v-if="scope.row.spzt==='4001' && outside" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="left" prop="ramark" label="备注" sortable show-overflow-tooltip></el-table-column> -->
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

    <Dialog :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :dialogVisible="dialogVisible"
            @searchXMMC="searchXMMC"
            @searchXMBH="searchXMBH"
            @closeDialog="closeDialog">
    </Dialog>
    <div class="tabArea" v-if="showDetail" @close="resetForm">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild" @click="showDetail = false"><i
            class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>承包人遗留问题一览表</span>
        </p>
        <div v-show="!showxq" class="SPState">
          <el-button
            size="mini"
            v-if="issave === '添加'"
            type="primary"
            :loading="submitLoading"
            @click="addSubmit('jldModel');isxmmcOfadd = 0">
            保存
          </el-button>
          <el-button
            size="mini"
            v-if="issave === '编辑'"
            type="primary"
            :loading="submitLoading"
            @click="updateSubmit('jldModel');isxmmcOfadd = 0">
            保存
          </el-button>
          <el-button
            size="mini"
            v-if="issave!== '详情'"
            @click="resetForm"
            style="margin-right: 20px">
            取消
          </el-button>
        </div>
      </div>
      <div>
        <!-- 添加编辑 -->
        <div style="padding-left: 15px;" v-show="isseedetail === 0">

          <el-form :model="jldModel" ref="jldModel" :rules="jldModelRules" label-width="120px">
            <el-form-item class="addJLD" label="单据编号 : ">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.djbh}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="项目名称 : " prop="gcmc">
              <label v-if="issave === '详情'" style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.gcmc}}</label>
              <el-autocomplete
                v-else
                class="inline-input"
                size="mini"
                v-model="jldModel.gcmc"
                :disabled="showxq"
                :fetch-suggestions="querySearchMC"
                @select="handleSelectMC($event, 0)"
                placeholder="请输入项目名称">
                <template slot-scope="{ item }">
                  <div class="name">{{ item.XMMC }}</div>
                </template>
                <i slot="suffix" @click="showDialog('mc')" class="icon iconfont icon-xiangqing1"></i>
              </el-autocomplete>
            </el-form-item>
            <el-form-item class="addJLD" label="项目编号 : ">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.htbh}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="承包单位 : ">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.cbdw}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="编制单位 : ">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.bzdw}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="编制日期 : ">
              <label v-if="issave === '详情'" style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.bzrq}}</label>
              <el-date-picker
                v-else
                v-model="jldModel.bzrq"
                required
                size="mini"
                type="date"
                placeholder="选择日期"
                :disabled="showxq"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>

            <div style="width: 75.5%;">
              <el-form-item class="addJLD-textarea" label="备注 : ">
                <label v-if="issave === '详情'" style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.ramark}}</label>
                <el-input v-else type="textarea" v-model="jldModel.ramark" :disabled="showxq"></el-input>
              </el-form-item>
            </div>

            <el-form-item class="addJLD" label="附件 : ">
              <ul v-if="issave === '详情'" class="fjlist" style="margin-top: 3px;padding-left: 15px;">
                <li class="file_li" :key="index" v-for="(file, index) in fileList" @click="openFile(file)">
                  <a><i aria-hidden="true"></i>{{file.name}}</a>
                </li>
              </ul>
              <el-upload
                v-else
                class="upload-demo"
                :action="$api.uploadFiles"
                multiple
                ref="uploada"
                :disabled="isseedetail === 2"
                :fileList="fileList"
                :on-success="handleUploadFile"
                :on-preview="preview"
                :on-remove="removeFile">
                <i style="color: #00a2fd;" v-if="!showxq" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
            </el-form-item>
          </el-form>

          <div class="dialog_footer" style=" text-align: left;">
            <div v-if="!showxq"
                 style="width: 100%;margin-right: 0px;padding-left: 0px; padding-right: 0px;height:4px;background-color: #c0cad6;"></div>
            <div class="header" style="width: 100%;height: 36px;line-height: 36px;padding-top: 0px;">
              <span class="headerTit" style="text-align: left;">子目清单</span>
              <el-button size="mini" class="dialog-button bao_cun" v-if="issave !== '详情'"
                         style="background-color: #DF4D4A;border-color: transparent;color: #fff;position: relative;left: 86%;top: -1px;"
                         @click="addMx(true)">
                添加子目
              </el-button>
            </div>
          </div>
          <!-- 添加回显 -->
          <div style="width: 100%;margin:0 auto; max-height:300px;padding-right: 20px;margin-bottom: 20px;">
            <el-table ref="multipleTable" :data="zmData" tooltip-effect="dark"
                      style="width: 100%;overflow-y: auto"
                      row-class-name="row_class"
                      border
                      :row-style="{fontFamily: '-apple-system', fontSize: '13px'}">
              <el-table-column
                type="index"
                align="center"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column align="center" prop="mxdjbh" label="单据编号" show-overflow-tooltip></el-table-column>
              <el-table-column align="center" prop="ylwtmc" label="遗留问题名称" show-overflow-tooltip></el-table-column>
              <el-table-column align="center" prop="zynr" label="主要内容"></el-table-column>
              <el-table-column align="center" prop="mxremark" label="备注"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-show="addzbs"
      title="添加子目"
      :visible.sync="addzbs"
      width="1300px"
      class="addzmstyle">
      <div style="width: 100%; margin-bottom: 15px;text-align: right;padding-right: 10px;">
        <el-button size="mini" type="primary" @click="addzm(zmData)">添加</el-button>
        <el-button size="mini" type="danger" @click="delectzm(zmData)">删除</el-button>
      </div>
      <div class="addzm">
        <el-table ref="multipleTable" :data="zmData" tooltip-effect="dark"
                  style="width: 100%;"
                  row-class-name="row_class"
                  border
                  :height="showSearch?'calc(100% - 59px)':'calc(100% - 18px)'"
                  :row-style="{fontFamily: '宋体', fontSize: '12px'}"
                  @selection-change="zmChange">

          <el-table-column
            type="selection"
            align="center"
            width="60">
          </el-table-column>
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="60">
          </el-table-column>
          <el-table-column align="left" prop="mxdjbh" label="单据编号" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" label="遗留问题名称" show-overflow-tooltip>
            <template scope="scope">
              <el-input v-model="scope.row.ylwtmc" size="mini" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="left" label="主要内容" show-overflow-tooltip>
            <template scope="scope">
              <el-input v-model="scope.row.zynr" size="mini" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="left" label="备注" width="350" show-overflow-tooltip>
            <template scope="scope">
              <el-input v-model="scope.row.mxremark" size="mini" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="width: 100%;text-align: center;margin-top: 5px;">
        <el-button size="mini" type="primary" @click="addsave"> 保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Dialog from '@/components/Dialog.vue'
  import {returnUserInfo} from '@/helper'

  export default {
    components: {Dialog},
    props: {
      hasMenu: {
        type: Boolean,
        default: false
      },
      clickHide: {
        type: Function
      }
    },
    data() {
      return {
        outside: true,
        jldModel: {
          mx: []
        },
        index: '',
        isadd: false,
        addzb: false,
        addzbs: false,
        submitLoading: false,
        showxq: false,
        showSearch: false,
        loading: false,
        tableData: [],
        showBhForm: false,
        searchCriteria: false,
        currentPage: 1,
        pageSize: 10,
        personelForm: {},
        showDetail: false,
        htbh: {},
        htList: [],
        multipleSelection: [],
        total: 0,
        userInfo: {},

        issave: '添加',
        treeRightData: [],
        jldModel: {
          djbh: '',
          gcmc: '',
          htbh: '',
          cbdw: '',
          bzdw: '',
          bzrq: '',
          spzt: '',
          ramark: ''
        },
        zmData: [{
          mxdjbh: '',
          ylwtmc: '',
          zynr: '',
          mxremark: '',
          xh: 0,
        }],
        delzmData: [],
        jldModelRules: {
          gcmc: [
            {type: 'string', required: true, message: '请输入项目名称', trigger: 'change'}
          ],
          bzrq: [
            {type: 'data', required: true, message: '请输入编制日期', trigger: 'change'}
          ],
        },

        isseedetail: 0,
        searchForm: {
          gcmc: '',
          htbh: '',
          jcrq: '',
          searchTime: '',
          selectType: undefined,
          typeIndex: 0,
          selectState: undefined,
          stateIndex: 0,
          pageNum: 1,
          pageSize: 10,
        },
        dialogVisible: false,
        restaurants: [],
        restaurantsBH: [],
        datatypes: '',
        dialogTableTit: { //ok
          XMMC: '项目名称', XMBH: '项目编号',
        },
        dialogData: [],
        defaultHtbh: '', // 外协单位默认的合同编号
        defaultHtmc: '', // 外协单位默认的合同名称
        files: [],
        fileList: [],
        isxmmcOfadd: 0
      }
    },
    mounted() {
      this.userInfo = returnUserInfo()
      // 当前登录为外协单位时，获取合同编号，默认取第一个
      if (this.userInfo.type === '供应商') {
        this.outside = true
        this.$api.getXmListBySpk().then(res => {
          if (res.code === 1) {
            let data = res.data
            if (data.length > 0) {
              this.defaultHtbh = data[0].XMBH
              this.defaultHtmc = data[0].XMMC
              this.searchForm.htbh = this.defaultHtbh
              this.searchForm.gcmc = this.defaultHtmc
              this.search()
            }
          }
        })
      } else {
        this.outside = false
        this.search()
      }
      this.initqueryXMBH()
      this.initqueryXMMC()

      // this.tableHeight = $('#gcbgd')[0].offsetHeight
    },
    methods: {
      zmChange(v) {
        this.delzmData = v
      },
      addzm(v) {
        this.zmData.push({
          mxdjbh: this.jldModel.djbh,
          ylwtmc: '',
          zynr: '',
          mxremark: '',
          xh: v.length + '',
        })
      },
      delectzm() {
        let leg = this.zmData.length
        let arr = []
        for (let i = leg - 1; i >= 0; i--) {
          for (let j = 0; j < this.delzmData.length; j++) {
            if (this.zmData[i]) {
              if (this.zmData[i] == this.delzmData[j]) {
                arr.push(this.zmData[i])
                this.zmData.splice(i, 1)
                continue;
              }
            }
          }
        }
      },

      addsave() {// 子目添加完成之后保存
        this.addzbs = false
        this.isshowzmdetail = true
      },
      selectables(val, i) {
        if (this.outside && val.spzt === '4001') {
          return true
        } else {
          return false
        }
      },
      showAdd() {// 添加
        this.fileList = []
        this.jldModel = {
          djbh: '',
          gcmc: '',
          htbh: '',
          cbdw: '',
          bzdw: '',
          bzrq: '',
          spzt: '',
          ramark: ''
        }
        this.zmData = []
        this.issave = '添加'

        this.showDetail = true
        this.showxq = false
        this.isadd = true
        this.formId = 'cbrylwt' + new Date().getTime()
        this.jldModel.djbh = this.formId
        this.jldModel.bzdw = this.userInfo.daZzmc
        this.jldModel.bzrq = this.formatDate(new Date())
        this.isxmmcOfadd = 1
      },
      updateFormDia(row, index) {// 编辑
        this.issave = '编辑'
        this.isxmmcOfadd = 1
        this.showDetail = true
        this.isadd = false
        this.showxq = false
        this.jldModel = JSON.parse(JSON.stringify(row))
        this.zmData = row.mx
        this.index = index
        this.htbh = {
          htbh: this.jldModel.htbh
        }
        this.getFilesDataById(row.djbh)
      },
      showBhFormDia(row) {// 详情
        this.issave = '详情'
        this.isseedetail = 0
        this.showDetail = true
        this.showxq = true
        this.zmData = row.mx
        this.jldModel = JSON.parse(JSON.stringify(row))
        this.htbh = {
          htbh: this.jldModel.htbh
        }
        this.getFilesDataById(row.djbh)
      },
      search() {// 查询
        this.showSearch = false
        if (this.searchForm.jcrq) {
          this.searchForm.ksrq = this.searchForm.jcrq[0]
          this.searchForm.jsrq = this.searchForm.jcrq[1]
        }
        this.$api.getCbrylwtList({
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          daZzid: this.userInfo.daZzid,
          htbh: this.searchForm.htbh,
          ksrq: this.searchForm.ksrq || '',
          jsrq: this.searchForm.jsrq || ''
        }).then(resp => {
          this.loading = false
          if (resp.status !== 200) {
            this.$message({
              message: '出错了',
              type: 'error'
            })
          } else {
            if (resp.data) {
              if (resp.data.data) {
                if (resp.data.data.list) {
                  this.tableData = resp.data.data.list
                }
                if (resp.data.data.total) {
                  this.total = resp.data.data.total
                }
              }
            }
          }
        }).catch(e => {
          this.loading = false
        })
      },
      addSubmit(formName) {// 保存
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = _.assign({}, this.jldModel, this.userInfo, {mx: this.zmData})

            // 有附件，保存文件信息
            if (this.files.length > 0) {
              this.saveFileData(params.djbh)
            }

            params.spzt = '4001'
            this.$api.addCbrylwtForGcys(params).then(res => {
              if (res.data.code === 1) {
                this.showDetail = false
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                })
                this.search()
                this.resetForm()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.msg
                })
              }
            })
          }
        })

      },

      addMx(bol) { // 子目弹框
        this.showDetailItem = false
        if (!this.jldModel.htbh) {
          this.$message({
            message: '请选择工程名称',
            type: 'info'
          });
        } else {
          this.addzbs = true
          let _this = this
          // console.log(this.jldModel.djbh,'this.jldModel.djbh')
          // this.zmData.map((item,i)=>{
          //   console.log(item,'item')
          //   item.mxdjbh = this.jldModel.djbh
          // })
        }

      },

      updateSubmit(formName) {// 点击编辑保存
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = _.assign({}, this.jldModel, this.userInfo)

            // 有附件，保存文件信息
            if (this.files.length > 0) {
              this.saveFileData(params.djbh)
            } else { // 无附件，调用删除接口
              this.deleteFilesData(params.djbh)
            }

            this.$api.editCbrylwtForGcys(params).then(res => {
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
          }
        })
      },
      deleteData() {//删除
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
            this.$api.delCbrylwtForGcys('?sqbhs=' + djbharr).then(res => {
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
      _getOnlyXmgkjcxx(val) {
        // // 根据项目编号的弹框搜索的项目编号获取项目信息
        console.log(val, 'val')
        let xmbh = val ? val : ''
        this.$api.getOnlyXmgkjcxx({xmbh: xmbh}).then(res => {

          if (res.code != 1) {
            this.$message({
              message: '网络出错',
              type: "error"
            })
          } else {
            console.log(res.data, 'ff')
            if (res.data && res.data.length !== 0) {
              for (var i = 0; i < res.data.length; i++) {
                this.jldModel.cbdw = res.data[i].cbdw
                // this.jldModel.gldw = res.data[i].gldw
                // this.jldModel.htzje = res.data[i].htje * 1
              }
            }
          }
        })
      },
      shenhe(row, index) { // 状态
        this.$confirm('是否提交？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let form = JSON.parse(JSON.stringify(row))

          // 先创建工作流，再提交
          this.$api.createWorkFlow({
            pc_initiator: this.userInfo.yhmc,
            pc_initiatorid: this.userInfo.yhid,
            pc_name: '36',
            pc_project_id: form.djbh,
            pc_remarks: '',
            pc_state: '1'
          }).then(res => {
            // 工作流创建成功，提交
            if (res.code === 1) {
              this.$api.spCbrylwtForGcys('?spzt=4002&djbhs=' + form.djbh).then(res => {
                if (res.data.code === 1) {
                  this.$message({
                    type: 'success',
                    message: '提交成功，正在审批中!'
                  })
                  this.search()
                  this.resetForm()
                }
              })
            } else {
              this.$message({
                type: 'error',
                message: res.msg
              })
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消提交'
          })
        })
      },

      addzibiao() { //子项添加
        this.jldModel.mx.push({mid: this.jldModel.id})
      },
      deletezibiao(index) {//子项删除
        this.jldModel.mx.splice(index, 1)
      },
      handleSelectionChange(val) {//复选框
        this.multipleSelection = val
      },
      handleSizeChange(val) {// 页数
        this.pageSize = val
        this.search()
      },
      handleCurrentChange(val) {// 页数
        this.currentPage = val
        this.search()
      },
      resetForm() {// 清空数据
        this.showDetail = false
        this.isxmmcOfadd = 0
        this.jldModel = {
          mx: []
        }
      },
      resizeDate() {//重置信息
        this.searchForm.htbh = this.defaultHtbh
        this.searchForm.gcmc = this.defaultHtmc
        this.searchForm.ksrq = ''
        this.searchForm.jcrq = ''
        this.searchForm.jsrq = ''
        this.search()
      },
      showDialog(bol) { // 点击弹框
        this.dialogVisible = true
        this.datatypes = bol
        this.$api.getmcbhList().then(res => {
          if (res.code == 1) {
            this.dialogData = res.data && res.data.length ? res.data : []
          } else {
            this.dialogData = []
          }
        })
      },
      querySearchMC(queryString, cb) {
        let restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString, 'XMMC')) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },

      createFilter(queryString, val) {
        return (restaurant) => {
          return (restaurant[val].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelectMC(event, param) { // 下拉选择
        console.log(event, param, '切换项目名称')
        if (param == 1) {
          this.searchForm.gcmc = event.XMMC
          this.searchForm.htbh = event.XMBH
        } else {
          this.jldModel.gcmc = event.XMMC
          this.jldModel.htbh = event.XMBH
          if (event.XMBH) {
            this._getOnlyXmgkjcxx(event.XMBH)
          }
        }
      },
      createFilter(queryString, val) {
        return (restaurant) => {
          return (restaurant[val].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
//Dialog
      closeDialog(val) { // 关闭窗口
        this.dialogVisible = false
        if (val) {
          if (this.isxmmcOfadd === 1) {
            this.jldModel.gcmc = val.XMMC
            this.jldModel.htbh = val.XMBH
            this._getOnlyXmgkjcxx(this.jldModel.htbh)
          } else {
            this.searchForm.gcmc = val.XMMC
            this.searchForm.htbh = val.XMBH
          }
        }
      },
      searchXMMC(val) { // 项目名称模糊搜索
        this.$api.getXmmcListt({xmmc: val}).then(res => {
          if (res.code === 1) {
            this.dialogData = res.data && res.data.length ? res.data : []
          } else {
            this.dialogData = []
          }
        })
      },
      searchXMBH(val) { //项目编号模糊搜索
        this.$api.getXmbhmhList({xmbh: val}).then(res => {
          if (res.code == 1) {
            this.dialogData = res.data && res.data.length ? res.data : []
          } else {
            this.dialogData = []
          }
        })
      },
      initqueryXMBH() { // 公共查询项目编号
        this.$api.getXmbhList().then(res => {
          if (res.code == 1) {
            this.restaurantsBH = res.data && res.data.length ? res.data : []
          } else {
            this.restaurantsBH = []
          }

        })
      },
      initqueryXMMC() {
        this.$api.getmcbhList().then(res => {
          if (res.code == 1) {
            this.restaurants = res.data && res.data.length ? res.data : []
          } else {
            this.restaurants = []
          }

        })
      },
      // 处理文件上传成功后的数据
      handleUploadFile(res, file, files) {
        if (res.code === 1) {
          this.files = files
        }
      },
      // 文件预览
      preview(file) {
        if (file.response) {
          let url = file.response.data.file_path
          window.open(url)
        } else {
          let url = file.url
          window.open(url)
        }
      },
      // 保存文件数据
      saveFileData(uuid) {
        // 处理文件数据
        let filesData = []
        this.files.forEach(item => {
          let file = {}
          let data = item.response.data
          file.file_yname = data.file_yname
          file.file_path = data.file_path
          file.file_depict = data.file_depict
          file.file_date = data.file_date
          file.file_status = data.file_status
          file.file_type = data.file_type
          file.file_name = data.file_name
          file.file_mjlx = data.file_mjlx
          file.id = data.id
          file.file_dx = data.file_dx
          file.file_remarks = data.remarks
          file.file_id = uuid
          filesData.push(file)
        })
        this.$api.addFileData(filesData).then(res => {
          if (res.data.code !== 1) {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })
      },
      /**
       * 根据UUID删除附件
       * @param id UUID
       */
      deleteFilesData(id) {
        this.$api.deleteFilesById('?ids=' + id).then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: res.data.data,
              type: 'message'
            })
          }
        })
      },
      // 通过ID获取文件信息
      getFilesDataById(id) {
        this.fileList = []
        this.files = []
        // 获取文件信息
        this.$api.getFilesDataById('?id=' + id).then(res => {
          if (res.data.code === 1) {
            if (res.data.data.length > 0) {
              res.data.data.forEach(item => {
                let file = {
                  status: 'success',
                  name: item.file_yname,
                  url: item.file_path,
                  response: {
                    data: item
                  }
                }
                this.files.push(file)
                this.fileList.push(file)
              })
            }
          }
        })
      },
      // 详情页面打开附件
      openFile(item) {
        window.open(item.url)
      },
      // 处理移除附件的逻辑
      removeFile(file, fileList) {
        this.files = fileList
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .zmsave {
    margin: 0 auto;
    margin-top: 20px;
    width: 100%;
    text-align: center;
  }

  .addzm {
    width: 100%;
    display: flex;
    height: 100%;
  }

  .el-table--enable-row-transition {
    height: 100% !important;
  }

  .el-dialog__body {
    height: calc(100% - 120px);
  }

  .addHead {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 46px;
    font-weight: bold;
    font-size: 16px;
    color: #111;
    background: #F6F6F6;
    margin-bottom: 12px;
    box-sizing: border-box;
    .tabAreaTit {
      i {
        font-weight: bold !important;
        font-size: 16px !important;
        color: #111 !important;

      }
    }
    .dialog_footer {
      height: 100%;
    }

  }

  .ylbselect {
    top: 168px !important;
  }

  #gcbgd {
    position: relative;
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    overflow: auto;
    .gjzjje {
      input {
        height: 55px;
      }
    }
    .conter_table {
      height: calc(100% - 91px);
      min-height: 300px;
      padding: 0 15px;
    }
    .footer {
      height: 45px;
      background: #fff;
      position: relative;
      z-index: 100;
    }
    .dialog_warp {
      background: #fff;

      .tab_lable {
        margin-bottom: 10px;
        font-size: 12px;
        text-align: left;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #f1f4f7;
        padding: 0 15px;
        p {
          text-align: left;
        }
        span {
          display: inline-block;
          /*border-bottom: 2px solid #00a2fd;*/
          height: 38px;
          margin-right: 20px;
          &:hover {
            border-bottom: 2px solid #00a2fd;
            cursor: pointer;
          }
        }
        .tabselect {
          border-bottom: 2px solid #00a2fd;
        }
      }
      .zhubnr {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 0 40px;
        .addJLD {
          width: 25%;
          .el-form-item__label {
            width: 6rem !important;
          }
          .el-form-item__error {
            margin-left: 6rem;
          }
        }
        .textarea-jss {
          width: 100%;
          .addJLD-textarea {
            width: 75%;
          }
        }
        // li{
        //   width: 25%;
        //   height: 32px;
        //   display: flex;
        //   align-items: center;
        //   padding: 10px;
        //   // float: left;
        //   // border: 1px solid #D5D6D7;
        //   // border-bottom: none;
        //   color: #52575D!important;
        //   font-size: 12px;
        //   // &:nth-of-type(2n+1){
        //   //   border-right: none;
        //   // }
        //   // &:nth-last-of-type(1),&:nth-last-of-type(2){
        //   //   border-bottom: 1px solid #D5D6D7;
        //   // }
        //   >span{
        //     width: 100px;
        //     height: 100%;
        //     display: flex;
        //     justify-content: flex-end;
        //     align-items: center;
        //     // line-height: 31px;
        //     // text-indent: 1em;
        //     // border-right: 1px solid #D5D6D7;
        //     // background: #F7F8F9;
        //     // float: left;
        //   }
        //   p{
        //     // width: calc(100% - 100px);
        //     flex: 1;
        //     height: 100%;
        //     margin-left: 10px;
        //     display: flex;
        //     align-items: center;
        //     position: relative;
        //     .el-input__inner{
        //       // border: none;
        //       text-align: center;
        //     }
        //   }
        //   .radio_line{
        //     /*span{
        //       display: inline-block;
        //       width: 50%;
        //     }*/
        //     padding: 0 5px;
        //     .el-radio__label{
        //       font-size: 12px;
        //     }
        //   }
        //   /*.tow_line,.three_line{
        //     >span{
        //       display: inline-block;
        //       text-indent: 5px;
        //       float: left;
        //       width: 50%;
        //       height: 100%;
        //       line-height: 31px;
        //       .el-input--mini{
        //         width: calc(100% - 25px);
        //         .el-input__inner{
        //           padding: 0;
        //         }
        //       }
        //     }
        //   }
        //   .three_line{
        //     >span{
        //       width: calc(100%/3);
        //     }
        //   }*/
        // }
        .tow_line, .three_line, .four_line {
          width: 100%;
          border-right: 1px solid #D5D6D7 !important;
          .el-input--mini {
            width: calc(100% - 60px);
          }
          p {
            > span {
              border-bottom: 1px solid #D5D6D7 !important;
              &:last-child {
                border-bottom: none;
              }
              i {
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
        .text_line {
          // border-right: 1px solid #D5D6D7!important;
          width: 70%;
          min-height: 64px;
          height: auto;
          display: flex;
          align-items: center;
          > span {
            width: 100px;
          }
          > p {
            flex: 1;
            > span {
              display: block;
            }
            // border:1px solid #cccc;
          }
          // .el-upload-list__item{
          //   border: none;
          // }
        }
      }
      .zibnr2, .zibiaonr {
        width: 100%;
        position: relative;
        padding: 15px 0 0 0;
        overflow: hidden;
        text-align: center;
        box-sizing: border-box;
        ul {
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 15px;
          li {
            width: 100%;
            /*width: 500px;*/
            height: 32px;
            float: left;
            box-sizing: border-box;
            border: 1px solid #D5D6D7;
            color: #52575D !important;
            font-size: 12px;
            border-right: none;
            border-bottom: none;
            &:nth-of-type(1) {
              height: 60px;
            }
            &:nth-last-of-type(1) {
              border-bottom: 1px solid #D5D6D7;
            }
            > span {
              width: calc(100% / 4);
              height: 100%;
              float: left;
              line-height: 31px;
              text-align: center;
              background: #F7F8F9;
              border-right: 1px solid #D5D6D7;
              div {
                height: 50%;
              }
              span {
                width: 50%;
                height: 50%;
                float: left;
                border-top: 1px solid #D5D6D7;
                border-right: 1px solid #D5D6D7;
                &:nth-last-of-type(1) {
                  border-right: none;
                }
              }
            }
            p {
              width: calc(100% / 4);
              height: 100%;
              line-height: 32px;
              float: left;
              border-right: 1px solid #D5D6D7;
              .el-input__inner {
                border: none;
                text-align: center;
              }
              i {
                color: #00a2fd;
                margin: 0 5px;
              }
            }
            .tow_linep {
              .el-input {
                width: 50% !important;
                float: left;
                &:nth-of-type(1) {
                  border-right: 1px solid #D5D6D7;
                }
                .el-input__inner {
                  padding: 0 !important;
                }
              }
            }
          }
        }
        .gchzb {
          li {
            width: 600px;
            > span, p {
              width: calc(100% / 6);
            }
          }
        }
      }
      .zibiaonr {
        margin-top: 20px;
        li {
          width: calc(100% / 6);
          height: 64px;
          float: left;
          border: 1px solid #D5D6D7;
          color: #52575D !important;
          font-size: 12px;
          border-right: none;
          &:nth-last-of-type(1) {
            border-right: 1px solid #D5D6D7;
          }
          > span {
            width: 100%;
            display: inline-block;
            height: 50%;
            line-height: 31px;
            text-align: center;
            background: #F7F8F9;
            border-bottom: 1px solid #D5D6D7;
          }
          p {
            width: calc(100%);
            height: 50%;
            float: left;
            .el-input__inner {
              border: none;
              text-align: center;
            }
            i {
              color: #00a2fd;
              margin: 0 5px;
            }
          }
        }
      }
      .addzbsj {
        text-align: center;
        color: #1CA4FA;
        padding: 10px 0;
      }
      .iconwarp {
        text-align: right;
        height: 14px;
        overflow: hidden;
        i {
          color: #1CA4FA;
          margin-left: 10px;
        }
      }
    }
    .addzmstyle {
      .el-dialog {
        height: 600px;
      }
    }
    .fjlist {
      li {
        list-style: none;
        border: none;
        height: 32px;
        line-height: 32px;
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover {
          background: #D5D6D7;
        }
        i {
          position: absolute;
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          right: 10px;
          top: 6px;
        }
      }

    }
  }
</style>
