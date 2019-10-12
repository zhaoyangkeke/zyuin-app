/**
* ----工程验收申请单
*/
<template>
  <div id="gcyssqd" style="height: 100%" v-loading="loading">
    <div class="header" v-show="!showDetail">
      <span class="headerTit">工程验收申请单</span>
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
              v-model="searchForm.xmmc"
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
            <el-button size="mini" @click="search(1, 10 ,searchForm)"
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
        <el-table-column align="left" prop="xmmc" label="项目名称" sortable show-overflow-tooltip></el-table-column>
        <!-- <el-table-column align="left" prop="htbh" label="项目编号" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="sqbh" label="申请编号"  sortable show-overflow-tooltip></el-table-column> -->
        <el-table-column align="left" prop="sgdw" label="施工单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="gldw" label="管理单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="htksgq" label="合同开工工期" width="120" sortable
                         show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="sqsj" label="申请时间" width="100" sortable
                         show-overflow-tooltip></el-table-column>
        <el-table-column align="left" label="状态" width="80" sortable>
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
          <span>工程验收申请单</span>
        </p>
        <div v-show="!showxq" class="SPState">
          <el-button size="mini" v-if="isadd" type="primary" :loading="submitLoading" @click="addSubmit('jldModel');isxmmcOfadd = 0"
                     style="background: #DF4D4A; border-color:transparent;color: #fff;">保存
          </el-button>
          <el-button size="mini" v-if="!isadd" type="primary"
                     :loading="submitLoading" @click="updateSubmit('jldModel');isxmmcOfadd = 0"
                     style="background: #DF4D4A; border-color:transparent;color: #fff;">保存
          </el-button>
          <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>

      <div>
        <div style="padding-left: 15px;" v-show="isseedetail === 0">
          <!-- 添加编辑 -->
            <el-form :model="jldModel" ref="jldModel" :rules="jldModelRules" label-width="120px">

              <el-form-item class="addJLD" label="申请编号">
                <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.sqbh}}</label>
              </el-form-item>

              <el-form-item class="addJLD" label="项目名称" prop="xmmc">
                <el-autocomplete
                  class="inline-input"
                  size="mini"
                  v-model="jldModel.xmmc"
                  :disabled="isseedetail === 1"
                  :fetch-suggestions="querySearchMC"
                  @select="handleSelectMC($event, 0)"
                  placeholder="请输入项目名称">
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.XMMC }}</div>
                  </template>
                  <i slot="suffix" @click="showDialog('mc')" class="icon iconfont icon-xiangqing1"></i>
                </el-autocomplete>
              </el-form-item>

              <el-form-item class="addJLD" label="合同编号">
                <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.htbh}}</label>
              </el-form-item>

              <el-form-item class="addJLD" label="施工单位" prop="sgdw">
                <el-input v-model="jldModel.sgdw" size="mini" placeholder="请输入内容" :disabled="showxq"></el-input>

              </el-form-item>

              <el-form-item class="addJLD" label="申请时间" prop="sqkgrq">
                <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.sqsj}}</label>
              </el-form-item>

              <el-form-item class="addJLD" label="填报日期" prop="tbrq">
                <el-date-picker
                  v-model="jldModel.tbrq"
                  required
                  size="mini"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  :disabled="showxq"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>

              <el-form-item class="addJLD" label="合同开始工期" prop="sqkgrq">
                <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.htksgq}}</label>
              </el-form-item>

              <el-form-item class="addJLD" label="合同结束工期" prop="sqkgrq">
                <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.htjsgq}}</label>
              </el-form-item>

              <el-form-item class="addJLD" label="管理单位">
                <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.gldw}}</label>
              </el-form-item>

              <el-form-item class="addJLD" label="验收类型">
                <el-radio style="height: 100%;" v-model="jldModel.yslx" label="交工验收"></el-radio>
                <el-radio style="height: 100%;" v-model="jldModel.yslx" label="竣工验收"></el-radio>
              </el-form-item>

              <el-form-item class="addJLD" label="填报单位" prop="tbdw">
                <el-input v-model="jldModel.tbdw" size="mini" placeholder="请输入内容" :disabled="showxq"></el-input>
              </el-form-item>

              <el-form-item class="addJLD" label="填报部门" prop="tbbm">
                <el-input v-model="jldModel.tbbm" size="mini" placeholder="请输入内容" :disabled="showxq"></el-input>
              </el-form-item>

              <div style="width: 75.5%;">

                <el-form-item class="addJLD-textarea" label="施工方意见" prop="sgfyj">
                  <el-input type="textarea" v-model="jldModel.sgfyj" :disabled="showxq"></el-input>
                </el-form-item>

                <el-form-item class="addJLD-textarea" label="监理单位意见" prop="jldwyj">
                  <el-input type="textarea" v-model="jldModel.jldwyj" :disabled="showxq"></el-input>
                </el-form-item>

                <el-form-item class="addJLD-textarea" label="工程技术部意见">
                  <el-input type="textarea" v-model="jldModel.gcjsbyj" :disabled="showxq"></el-input>
                </el-form-item>

                <el-form-item class="addJLD-textarea" label="经营发展部意见">
                  <el-input type="textarea" v-model="jldModel.jyfzbyj" :disabled="showxq"></el-input>
                </el-form-item>
              </div>

              <el-form-item class="addJLD" label="附件">
                <el-upload
                  class="upload-demo"
                  :action="$api.uploadFiles"
                  multiple
                  ref="uploada"
                  :disabled="isseedetail === 2"
                  :fileList="fileList"
                  :on-success="handleUploadFile"
                  :on-preview="preview"
                  :on-remove="removeFile">
                  <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
                </el-upload>
              </el-form-item>
            </el-form>
        </div>
      </div>

      <!-- 详情 -->
      <div v-if="showxq">
        <div style="padding-left: 50px;">
          <p class="addJLD">
            <span class="addJLD_tit2">申请编号 ：</span>
            <span>{{jldModel.sqbh}}</span>
          </p>

          <p class="addJLD">
            <span class="addJLD_tit2">项目名称 ：</span>
            <span>{{jldModel.xmmc}}</span>
          </p>

          <p class="addJLD">
            <span class="addJLD_tit2">合同编号 ：</span>
            <span>{{jldModel.htbh}}</span>
          </p>

          <p class="addJLD">
            <span class="addJLD_tit2">施工单位 ：</span>
            <span>{{jldModel.sgdw}}</span>
          </p>

          <p class="addJLD">
            <span class="addJLD_tit2">申请时间 ：</span>
            <span>{{jldModel.sqsj}}</span>
          </p>

          <p class="addJLD">
            <span class="addJLD_tit2">填报日期 ：</span>
            <span>{{jldModel.tbrq}}</span>
          </p>

          <p class="addJLD">
            <span class="addJLD_tit2">合同开始工期 ：</span>
            <span>{{jldModel.htksgq}}</span>
          </p>

          <p class="addJLD">
            <span class="addJLD_tit2">合同结束工期 ：</span>
            <span>{{jldModel.htjsgq}}</span>
          </p>

          <p class="addJLD">
            <span class="addJLD_tit2">管理单位 ：</span>
            <span>{{jldModel.gldw}}</span>
          </p>

          <p class="addJLD">
            <span class="addJLD_tit2">验收类型 ：</span>
            <span>{{jldModel.yslx}}</span>
          </p>

          <p class="addJLD">
            <span class="addJLD_tit2">填报单位 ：</span>
            <span>{{jldModel.tbdw}}</span>
          </p>

          <p class="addJLD">
            <span class="addJLD_tit2">填报部门 ：</span>
            <span>{{jldModel.tbbm}}</span>
          </p>

          <p class="addJLD" style="display: -webkit-box;">
            <span class="addJLD_tit2">施工方意见 ：</span>
            <span>{{jldModel.sgfyj}}</span>
          </p>

          <p class="addJLD" style="display: -webkit-box;">
            <span class="addJLD_tit2">监理单位意见 ：</span>
            <span>{{jldModel.jldwyj}}</span>
          </p>

          <p class="addJLD" style="display: -webkit-box;">
            <span class="addJLD_tit2">工程技术部意见 ：</span>
            <span>{{jldModel.gcjsbyj}}</span>
          </p>

          <p class="addJLD" style="display: -webkit-box;">
            <span class="addJLD_tit2">经营发展部意见 ：</span>
            <span>{{jldModel.jyfzbyj}}</span>
          </p>
          <p class="addJLD" style="display: -webkit-box;">
            <span class="addJLD_tit2">附件 ：</span>
            <span><ul class="fjlist" style="margin-left: 140px; margin-top: -25px;">
                <li class="file_li" :key="index" v-for="(file, index) in fileList" @click="openFile(file)">
                  <a><i aria-hidden="true"></i>{{file.name}}</a>
                </li>
              </ul></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {returnUserInfo} from '@/helper'
  import Dialog from '@/components/Dialog.vue'

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
        htbh: {},
        currentPage: 1,
        pageSize: 10,
        personelForm: {},
        showDetail: false,
        multipleSelection: [],
        fromId: '',
        htlist: [],
        total: 0,
        outside: true,
        jldModel: {
          sqbh: '',
          xmmc: '',
          htbh: '',
          sgdw: '',
          sqsj: '',
          tbrq: '',
          htksgq: '',
          htjsgq: '',
          gldw: '',
          bzdw: '',
          yslx: '交工验收',
          tbdw: '',
          tbbm: '',
          sgfyj: '',
          jldwyj: '',
          gcjsbyj: '',
          jyfzbyj: ''
        },
        jldModelRules: {
          xmmc: [
            {type: 'string', required: true, message: '请输入项目名称', trigger: 'change'}
          ],
          sgdw: [
            {type: 'string', required: true, message: '请输入施工单位', trigger: 'blur'}
          ],
          tbrq: [
            {type: 'string', required: true, message: '请输入填报日期', trigger: 'blur'}
          ],
          tbdw: [
            {type: 'string', required: true, message: '请输入填报单位', trigger: 'blur'}
          ],
          tbbm: [
            {type: 'string', required: true, message: '请输入填报部门', trigger: 'blur'}
          ],

          sgfyj: [
            {type: 'string', required: true, message: '请输入施工方意见', trigger: 'blur'}
          ],
          jldwyj: [
            {type: 'string', required: true, message: '请输入监理单位意见', trigger: 'blur'}
          ]
        },
        isseedetail: 0,
        searchForm: {
          xmmc: '',
          htbh: '',
          jcrq: '',
          searchTime: '',
          selectType: undefined,
          typeIndex: 0,
          selectState: undefined,
          stateIndex: 0,
          pageNum: 1,
          pageSize: 10
        },
        dialogVisible: false,
        restaurants: [],
        restaurantsBH: [],
        datatypes: '',
        dialogTableTit: { // ok
          XMMC: '项目名称',
          XMBH: '项目编号'
        },
        dialogData: [],
        userInfo: {
          orgbh: undefined,
          orgid: undefined,
          orgmc: undefined,
          bmbh: undefined,
          bmid: undefined,
          bmmc: undefined,
          yhbm: undefined,
          yhid: undefined,
          yhmc: undefined,
          gldwid: undefined,
          gldw: undefined,
          gldwbm: undefined,
          outside: ''
        },
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
              this.searchForm.xmmc = this.defaultHtmc
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
    },
    methods: {
      showAdd() { // 添加
        this.fileList = []
        this.jldModel = {
          sqbh: '',
          xmmc: '',
          htbh: '',
          sgdw: '',
          sqsj: '',
          tbrq: '',
          htksgq: '',
          htjsgq: '',
          gldw: '',
          bzdw: '',
          yslx: '交工验收',
          tbdw: '',
          tbbm: '',
          sgfyj: '',
          jldwyj: '',
          gcjsbyj: '',
          jyfzbyj: ''
        }
        this.isxmmcOfadd = 1
        this.showDetail = true
        this.showxq = false
        this.isadd = true
        this.formId = 'gcys' + new Date().getTime()
        this.jldModel.sqbh = this.formId
        this.jldModel.tbrq = this.formatDate(new Date())
        this.jldModel.bzdw = this.userInfo.daZzmc
      },
      updateFormDia(row, index) { // 编辑
        this.isseedetail = 0
        this.isxmmcOfadd = 1
        this.showDetail = true
        this.isadd = false
        this.showxq = false
        this.jldModel = JSON.parse(JSON.stringify(row))
        this.index = index
        // 获取附件信息
        this.getFilesDataById(row.sqbh)
      },
      showBhFormDia(row) {// 详情
        this.isxmmcOfadd = 1
        this.isseedetail = 3
        this.showDetail = true
        this.showxq = true
        this.jldModel = JSON.parse(JSON.stringify(row))
        this.htbh = {
          htbh: this.jldModel.htbh
        }

        // 获取附件信息
        this.getFilesDataById(row.sqbh)
      },
      search() { // 点击查询
        this.showSearch = false
        if (this.searchForm.jcrq) {
          this.searchForm.ksrq = this.searchForm.jcrq[0]
          this.searchForm.jsrq = this.searchForm.jcrq[1]
        }
        this.$api.getGcyssqdList({
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          daZzid: this.userInfo.daZzid,
          // daYhid: this.userInfo.daYhid,
          // daBmid: this.userInfo.daBmid,
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
            if (resp.data.code === 1) {
              this.tableData = resp.data.data.list
              this.total = resp.data.data.total
            }

          }
        }).catch(e => {
          this.loading = false
        })
      },
      addSubmit(formName) { // 点击添加保存
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = _.assign({}, this.jldModel, this.userInfo, {htbh: this.jldModel.htbh})

            // 有附件，保存文件信息
            if (this.files.length > 0) {
              this.saveFileData(params.sqbh)
            }

            params.spzt = '4001'
            this.$api.addGcyssqdForGcys(params).then(res => {
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
      selectables(val, i) {
        if (this.outside && val.spzt === '4001') {
          return true
        } else {
          return false
        }
      },
      updateSubmit(formName) {// 点击编辑保存
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = _.assign({}, this.jldModel, this.userInfo)

            // 有附件，保存文件信息
            if (this.files.length > 0) {
              this.saveFileData(params.sqbh)
            } else { // 无附件，调用删除接口
              this.deleteFilesData(params.sqbh)
            }

            this.$api.editGcyssqdForGcys(params).then(res => {
              if (res.data.code === 1) {
                this.showDetail = false
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
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
      deleteData() {// 点击删除
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
                this.search()
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
        let xmbh = val ? val : ''
        this.$api.getOnlyXmgkjcxx({xmbh: xmbh}).then(res => {

          if (res.code != 1) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            if (res.data && res.data.length !== 0) {
              for (var i = 0; i < res.data.length; i++) {
                this.jldModel.sqsj = res.data[i].sprq
                this.jldModel.gldw = res.data[i].gldw
                this.jldModel.htksgq = res.data[i].sjkgrq
                this.jldModel.htjsgq = res.data[i].sjwgrq
                this.jldModel.htbh = res.data[i].xmbh
              }
            }
          }
        })
      },
      shenhe(row, index) {// 状态
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
            pc_name: '24',
            pc_project_id: form.sqbh,
            pc_remarks: '',
            pc_state: '1'
          }).then(res => {
            // 工作流创建成功，提交
            if(res.code === 1) {
              this.$api.spGcyssqdForGcys('?spzt=4002&sqbhs=' + form.sqbh).then(res => {
                if (res.data.code === 1) {
                  this.$message({
                    type: 'success',
                    message: '提交成功，正在审批中!'
                  })
                  this.search()
                } else {
                  this.$message({
                    type: 'error',
                    message: res.data.msg
                  })
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


      handleSelectionChange(val) { //复选框
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
        this.jldModel = {}
        this.isseedetail = 0
        this.isxmmcOfadd = 0
      },
      selectHt(value) { // 下拉选择
        this.jldModel.htbh = value.gj_htbh
        this.jldModel.xmmc = value.htmc
        this.jldModel.htje = value.gj_htje
        this.jldModel.sgdw = value.yh_cbdw
        this.jldModel.gldw = value.yh_gldw
        this.jldModel.htksgq = value.yh_htkgrq
        this.jldModel.htjsgq = value.yh_htwgrq
        this.jldModel.bzrq = this.formatDate(new Date())
      },


      //重置信息
      resizeDate() {
        this.searchForm.xmmc = this.defaultHtmc
        this.searchForm.htbh = this.defaultHtbh
        this.searchForm.searchTime = undefined
        this.searchForm.jcrq = undefined
        this.searchForm.ksrq = undefined
        this.searchForm.jsrq = undefined
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
        cb(results)
      },
      handleSelectMC(event, param) { // 下拉选择
        if (param === 1) {
          this.searchForm.xmmc = event.XMMC
          this.searchForm.htbh = event.XMBH
        } else {
          this.jldModel.xmmc = event.XMMC
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
            this.jldModel.xmmc = val.XMMC
            this.jldModel.htbh = val.XMBH
            this._getOnlyXmgkjcxx(this.jldModel.htbh)
          } else {
            this.searchForm.xmmc = val.XMMC
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
      handleUploadFile (res, file, files) {
        if (res.code === 1) {
          this.files = files
        }
      },
      // 文件预览
      preview (file) {
        if(file.response) {
          let url = file.response.data.file_path
          window.open(url)
        } else {
          let url = file.url
          window.open(url)
        }
      },
      // 保存文件数据
      saveFileData (uuid) {
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
      deleteFilesData (id) {
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
      getFilesDataById (id) {
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
      openFile(item){
        window.open(item.url)
      },
      // 处理移除附件的逻辑
      removeFile(file,fileList){
        this.files = fileList
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .detailsCon {
    width: 100%;
    padding: 0 20px;
    ul {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      li {
        width: 25%;
        height: 40px;
        display: flex;
        span {
          &:nth-child(1) {
            width: 9rem;
            text-align: end;
          }

        }
      }
      div {
        width: 75%;
        padding: 10px 0;
      }
    }

  }

  /*.tabArea{*/
  /*padding: 0!important;*/
  /*}*/
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

  }

  .sqdselect {
    top: 168px !important;
  }

  #gcyssqd {
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
      padding: 0 40px !important;
      .zhubnr {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
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
            width: 65%;
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
        // .text1_line{

        // }
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
    }
    .fjlist{
      li{
        list-style: none;
        border: none;
        height: 32px;
        line-height: 32px;
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover{
          background: #D5D6D7;
        }
        i{
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
