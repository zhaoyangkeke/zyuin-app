/**
* ----工程变更申请表
*/
<template>
  <div id="lkpdlmsh" style="height: 100%" v-loading="loading">
    <div class="header">
      <span class="headerTit">工程变更申请表</span>
      <div class="header_option">
        <ul>
          <li @click="showAdd()" v-if="outside"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()" v-if="outside"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table">
      <div class="chaxun">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">

          <el-form-item style="margin-bottom: 0;" label="项目名称" prop="" class="">
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

          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="项目编号" prop="htbh">
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="searchForm.xmbh"
                :fetch-suggestions="querySearchBH"
                @select="handleSelectBH"
                placeholder="请输入项目编号"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.XMBH }}</div>
                </template>
                <i slot="suffix"  @click="showDialog('bh')" class="icon iconfont icon-xiangqing1"></i>
              </el-autocomplete>
            </el-form-item>
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
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button size="mini" @click="search(1, 10)" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button @click.native="resizeDate" size="mini">重置</el-button>
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
          :selectable="onSeleteState"
          align="center"
          width="60">
        </el-table-column>
         <el-table-column
          type="index"
          align="center"
          label="序号"
          width="60">
        </el-table-column>
         <el-table-column align="left" prop="gcmc" label="项目名称" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="sbdw" label="申报单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="gldw" label="管理单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="bzdw" label="编制单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="bzrq" label="编制日期" sortable width="100"></el-table-column>
        <el-table-column align="left" label="状态"  sortable width="80">
        <template scope="scope">
          <span style="color:#D34C42;text-align: left" v-if="scope.row.spzt === '4001'">自由</span>
          <span style="color:#D34C42;text-align: left" v-if="scope.row.spzt === '4002'">审批中</span>
          <span style="color:#D34C42;text-align: left" v-if="scope.row.spzt === '4003'">已审批</span>
          </template>
        </el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="120">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: left" v-if="outside && scope.row.spzt === '4001'"
                  @click="shenhe(scope.row, scope.$index)">提交</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: left" v-if="outside && scope.row.spzt === '4001'"
                  @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: left" @click="showBhFormDia(scope.row)">详情</span>
          </template>
        </el-table-column>
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
        <p class="tabAreaTit">
          <span class="titleclasschild"  @click="resetForm"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>工程变更申请表</span>
        </p>

        <div v-show="!showxq" class="SPState" >
          <el-button size="mini" class="minibtn"  v-if="isadd"  :loading="submitLoading" @click="addSubmit('lmshForm');isxmmcOfadd = 0"
                    style="background: #DF4D4A; border-color:transparent;color: #fff;">保存</el-button>
          <el-button size="mini" class="minibtn"  v-if="!isadd"  :loading="submitLoading" @click="updateSubmit('lmshForm');isxmmcOfadd = 0"
                    style="background: #DF4D4A; border-color:transparent;color: #fff;">保存</el-button>
          <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>

      <div v-show="isseedetail == 0">
        <div style="padding-left: 15px;"  >
          <el-form  :model="lmshForm" :rules="jldModelRules" ref="lmshForm">

            <el-form-item class="addJLD" label="单据编号" label-width="100px" label-position="left">
              <!--<el-input  v-model="lmshForm.djbh" size="mini"  placeholder="请输入内容" disabled></el-input>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.djbh}}</label>
            </el-form-item>

            <el-form-item style="padding-left: 2.1875rem" label="项目名称" prop="" class="addJLD">
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="lmshForm.htmc"
                :fetch-suggestions="querySearchMC"
                @select="handleSelectMC($event, 0)"
                placeholder="请输入项目名称"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.XMMC }}</div>
                </template>
                <i slot="suffix" @click="showDialog('mc')" class="icon iconfont icon-xiangqing1"></i>
              </el-autocomplete>
            </el-form-item>

            <el-form-item class="addJLD" label="合同编号" prop="htbh" label-width="100px">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.htbh}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="管理单位" label-width="100px">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.gldw}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="起点桩号" prop="qdzh" label-width="100px">
              <el-input type="number"  v-model="lmshForm.qdzh" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="止点桩号" prop="zdzh" label-width="100px">
              <el-input type="number" v-model="lmshForm.zdzh" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="申报单位" prop="sbdw" label-width="100px">
              <el-input  v-model="lmshForm.sbdw" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2"></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="编制单位" prop="bzdw" label-width="100px">
              <el-input  v-model="lmshForm.bzdw" size="mini"   placeholder="请输入内容" :disabled="true" ></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="编制日期" prop="bzrq" label-width="100px">
              <el-date-picker
              :disabled="isseedetail == 2"
              v-model="lmshForm.bzrq"
              size="mini"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>

            <el-form-item class="addJLD" label="变更预算（元）" prop="bgys"  label-width="100px">
              <el-input type="number" v-model.number="lmshForm.bgys" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
            </el-form-item>

            <div style="width: 79%;margin-left: 27px;">
              <el-form-item class="addJLD-textarea"  label="变更原因" prop="bgyy">
                <el-input type="textarea"   v-model="lmshForm.bgyy" :disabled="isseedetail == 2" style="width: 83%;"></el-input>
              </el-form-item>
            </div>
            <div style="width: 79%;margin-left: -12px;">
              <el-form-item class="addJLD-textarea"  label="变更内容及方案" prop="bgnrjfa">
                <el-input type="textarea"   v-model="lmshForm.bgnrjfa" :disabled="isseedetail == 2" style="width: 83%;"></el-input>
              </el-form-item>
            </div>
            <el-form-item  class="addJLD" label="附件" label-width="100px">
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
      <div v-show="showxq"   >
        <div style="padding-left: 15px;">
          <p class="addJLD">
            <span class="addJLD_tit2">单据名称 ：</span>
            <span>{{lmshForm.djbh}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">项目名称 ：</span>
            <span>{{lmshForm.htmc}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">合同编号 ：</span>
            <span>{{lmshForm.htbh}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">管理单位 ：</span>
            <span>{{lmshForm.gldw}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">起点桩号 ：</span>
            <span>{{lmshForm.qdzh}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">止点桩号 ：</span>
            <span>{{lmshForm.zdzh}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">申报单位 ：</span>
            <span>{{lmshForm.sbdw}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">编制单位 ：</span>
            <span>{{lmshForm.bzdw}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">编制日期 ：</span>
            <span>{{lmshForm.bzrq}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">变更预算 ：</span>
            <span>{{lmshForm.bgys}}</span>
          </p>
          <br/>
          <p class="addJLD">
            <span class="addJLD_tit2">变更原因 ：</span>
            <span>{{lmshForm.bgyy}}</span>
          </p>
          <br/>
          <p class="addJLD">
            <span class="addJLD_tit2">变更内容及方案 ：</span>
            <span>{{lmshForm.bgnrjfa}}</span>
          </p>
          <br/>
          <p class="addJLD">
            <span class="addJLD_tit2">附件 ：</span>
            <span>
              <ul class="fjlist" style="margin-left: 140px; margin-top: -25px;">
                <li class="file_li" :key="index" v-for="(file, index) in fileList" @click="openFile(file)">
                  <a><i aria-hidden="true"></i>{{file.name}}</a>
                </li>
              </ul>
            </span>
          </p>
        </div>
      </div>
    </div>

    <Dialog :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :dialogVisible="dialogVisible"
            @searchXMMC="searchXMMC"
            @searchXMBH="searchXMBH"
            @closeDialog="closeDialog">
    </Dialog>

  </div>
</template>

<script>
import { returnUserInfo } from '@/helper'
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
  data () {
    var qdzh1111 = (rule, value, callback) => {
      let RegMatch = /(^[\-0-9][0-9]*(.[0-9]+)?)$/
      if (RegMatch.test(value)) {
        callback()
      } else {
        callback(new Error('桩号格式不正确'))
      }
    }
    return {
      isxmmcOfadd: 0,
      lmshForm: {
        xcfx: '上行'
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
      total: 10,
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      roadOptions: [],
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      formId: '',
      htList: [],
      htbh: {},
      fileList: [],
      files: [],
      multipleSelection: [],
      defaultHtbh: '', // 外协单位默认的合同编号
      defaultHtmc: '', // 外协单位默认的合同名称

      initializationForm: {
        djbh: '',
        htmc: '',
        htbh: '',
        gldw: '',
        qdzh: '',
        zdzh: '',
        sbdw: '',
        bzdw: '',
        bzrq: '',
        bgyy: '',
        bgnrjfa: '',
        bgys: ''

      },
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
        gldwbm: undefined
      },
      isseedetail: 0,
      // form表单验证条件
      jldModelRules: {
        htmc: [
          { required: true, message: '请选择项目名称', trigger: 'change' }
        ],
        htbh: [
          { type: 'string', required: true, message: '请选择项目名称' }
        ],
        qdzh: [
          { message: '请填写起点桩号', required: true, trigger: 'blur' },
          { validator: qdzh1111, trigger: 'blur' }
        ],
        zdzh: [
          { message: '请填写止点桩号', required: true, trigger: 'blur' },
          { validator: qdzh1111, trigger: 'blur' }
        ],
        sbdw: [
          { type: 'string', required: true, message: '请填写申报单位', trigger: 'change' }
        ],
        bzdw: [
          { type: 'string', required: true, message: '请填写编制单位', trigger: 'change' }
        ],
        bzrq: [
          { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        ],
        bgyy: [
          { type: 'string', required: true, message: '请填写变更原因', trigger: 'change' }
        ],
        bgnrjfa: [
          { type: 'string', required: true, message: '请填写变更内容及方案', trigger: 'change' }
        ],
        bgys: [
          { type: 'number', required: true, message: '请填写预算', trigger: 'change' }
        ]
      },

      searchForm: {
        xmmc: '',
        xmbh: '',
        htbh: '',
        tbdw: undefined,
        jcrq: '',
        ksrq: '',
        datearr: null,
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      restaurants: [ ],
      restaurantsBH: [ ],
      datatypes: '',
      dialogTableTit: { // ok
        XMMC: '项目名称', XMBH: '项目编号'
      },
      dialogData: [],
      outside: true
    }
  },
  mounted () {
    this.userInfo = returnUserInfo()
    if (config.userInfo.userType === '供应商') {
      this.outside = true
    } else {
      this.outside = false
    }

    // 当前登录为外协单位时，获取合同编号，默认取第一个
    if (config.userInfo.userType === '供应商') {
      this.$api.getXmListBySpk().then(res => {
        if (res.code === 1) {
          let data = res.data
          if (data.length > 0) {
            this.defaultHtbh = data[0].XMBH
            this.defaultHtmc = data[0].XMMC
            this.searchForm.htbh = this.defaultHtbh
            this.searchForm.xmbh = this.defaultHtbh
            this.searchForm.xmmc = this.defaultHtmc
            this.search(1, 10)
          }
        }
      })
    } else {
      this.search(1, 10)
    }

    this.$api.getProjectMsgToCreateMWP().then(res => {
      if (res.code === 1) {
        this.htList = res.data
      }
    })
    this.initqueryXMBH()
    this.initqueryXMMC()
    this.tableHeight = $('#lkpdlmsh')[0].offsetHeight
  },
  methods: {

    // 处理文件上传成功后的数据
    handleUploadFile (res, file, files) {
      if (res.code === 1) {
        this.files = files
      }
    },
    // 文件预览
    preview (file) {
      if (file.response) {
        let url = file.response.data.file_path
        window.open(url)
      } else {
        let url = file.url
        window.open(url)
      }
    },
    // 保存文件数据
    saveFileData () {
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
        file.file_id = this.lmshForm.djbh
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
              this.fileList.push(file)
              this.files.push(file)
            })
          }
        }
      })
    },
    // 详情页面打开附件
    openFile (item) {
      window.open(item.url)
    },
    // 处理移除附件的逻辑
    removeFile (file, fileList) {
      this.files = fileList
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
    handleRemove (fileid) {
      this.$api.deleteFilesById('?ids=' + fileid).then(res => {})
    },
    showAdd () {
      if (!this.htList.length) {
        this.$api.getProjectMsgToCreateMWP().then(res => {
          if (res.code === 1) {
            this.htList = res.data
          }
        })
      }
      this.lmshForm = _.cloneDeep(this.initializationForm)
      this.lmshForm.bzdw = this.userInfo.daZzmc
      this.lmshForm.bzrq = this.formatDate(new Date())
      this.lmshForm.sbdw = config.userInfo.supplierMc
      this.lmshForm.sbdwid = this.userInfo.daZzid
      this.lmshForm.bzdwid = this.userInfo.daZzid

      this.isadd = true
      this.showDetail = true
      this.inuptloading = true
      this.isxmmcOfadd = 1
      this.showxq = false
      this.formId = 'gcbgsqb' + new Date().getTime()
      this.lmshForm.djbh = this.formId
    },
    updateFormDia (row, index) {
      this.isseedetail = 0
      this.isxmmcOfadd = 1
      this.isseedetail = 0
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      // this.lmshForm = JSON.parse(JSON.stringify(row))
      this.lmshForm = row
      this.lmshForm.htmc = row.gcmc
      this.lmshForm.bgys = row.bgys - 0
      this.index = index
      this.htbh = {
        htbh: row.gcmc
      }
      // this.getfilebyid()
      this.getFilesDataById(row.djbh)
    },

    showBhFormDia (row) {
      this.showDetail = true
      this.isxmmcOfadd = 1
      this.showxq = true
      this.isadd = false
      // this.lmshForm = JSON.parse(JSON.stringify(row))
      this.lmshForm = row
      this.isseedetail = 2
      this.htbh = {
        htbh: row.htbh
      }
      // this.getfilebyid()
      this.getFilesDataById(row.djbh)
    },
    search (currentPage, pageSize) {
      this.showSearch = false
      let {xmmc, xmbh, datearr} = this.searchForm
      let ksrq = ''
      let jsrq = ''
      if (datearr && datearr.length) {
        ksrq = datearr[0]
        jsrq = datearr[1]
      }
      this.$api.getBgsqbList('?pageNum=' + currentPage +
      '&pageSize=' + pageSize +
      '&daZzid=' + this.userInfo.daZzid +
      '&htbh=' + xmbh +
      '&xmmc=' + xmmc +
      '&ksrq=' + ksrq +
      '&jsrq=' + jsrq
      ).then(resp => {
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
    addSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = _.assign({}, this.lmshForm, this.userInfo)
          params.spzt = '4001'
          params.gcmc = params.htmc
          this.handleRemove(this.lmshForm.djbh)
          if (this.files.length > 0) {
            this.saveFileData()
          }
          this.$api.addBgsqbForBggl(params).then(res => {
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
        } else {
          return false
        }
      })
    },
    updateSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleRemove(this.lmshForm.djbh)
          this.lmshForm.gcmc = this.lmshForm.htmc
          // 有附件，保存文件信息
          if (this.files.length > 0) {
            this.saveFileData(this.lmshForm.djbh)
          } else { // 无附件，调用删除接口
            this.deleteFilesData(this.lmshForm.djbh)
          }
          this.$api.editBgsqbForBggl(this.lmshForm).then(res => {
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
        } else {
          return false
        }
      })
    },
    onSeleteState (item, index) {
      if (item.spzt !== '4001') {
        return false
      } else {
        return true
      }
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
          this.$api.delBgsqbForBggl('?djbhs=' + djbharr).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.handleRemove(this.lmshForm.djbh)
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
      this.$confirm('是否提交？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let form = row
        // 先创建工作流，再提交
        this.$api.createWorkFlow({
          pc_initiator: this.userInfo.yhmc,
          pc_initiatorid: this.userInfo.yhid,
          pc_name: '18',
          pc_project_id: form.djbh,
          pc_remarks: '',
          pc_state: '1'
        }).then(res => {
          // 工作流创建成功，提交
          if (res.code === 1) {
            this.$api.spBgsqbForBggl('?spzt=4002&djbhs=' + form.djbh).then(res => {
              if (res.data.code === 1) {
                // 提交成功，创建审批流程
                this.$message({
                  type: 'success',
                  message: '提交成功，正在审批中!'
                })
                this.search(this.currentPage, this.pageSize)
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

    resetForm () {
      this.showDetail = false
      this.isseedetail = 0
      this.isxmmcOfadd = 0
      this.htbh = {}
      this.fileList = []
    },
    selectHt (value) {
      this.lmshForm.htbh = value.xmbh
      this.lmshForm.htmc = value.xmmc
      this.lmshForm.gcmc = value.xmmc

      this.lmshForm.gldw = value.gldw
      this.lmshForm.gldwid = value.gldwid
      // 起始终止桩号
      this.lmshForm.qdzh = value.qszh
      this.lmshForm.zdzh = value.zzzh
    },
    rukufile () {
      /* let uploadFiles = []
      // console.log(this.$refs.uploada.uploadFiles, 6666)
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
      } */
      this.search(this.currentPage, this.pageSize)
      this.resetForm()
    },
    getfilebyid () {
      this.$api.getFilesDataById('?id=' + this.lmshForm.djbh).then(res => {
        this.fileList = res.data.data
        this.fileList.map(item => {
          item.name = item.file_yname
        })
      })
    },

    // 重置信息
    resizeDate () {
      this.searchForm.xmmc = ''
      this.searchForm.xmbh = ''
      this.searchForm.htbh = ''
      this.searchForm.searchTime = ''
      this.searchForm.datearr = null
      this.searchForm.xmmc = this.defaultHtmc
      this.searchForm.htbh = this.defaultHtbh
      this.searchForm.xmbh = this.defaultHtbh
      this.search(this.currentPage, this.pageSize)
    },
    showDialog (bol) { // 点击弹框
      this.dialogVisible = true
      this.datatypes = bol
      this._getmcbhList()
    },
    _getmcbhList () { // 获取数据
      this.$api.getmcbhList().then(res => {
        if (res.code === 1) {
          this.dialogData = res.data && res.data.length ? res.data : []
        } else {
          this.dialogData = []
        }
      })
    },
    querySearchBH (queryString, cb) { // 1
      let restaurants = this.restaurantsBH
      let results = queryString ? restaurants.filter(this.createFilter(queryString, 'XMBH')) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    handleSelectBH (item) { // 2
      this.searchForm.xmbh = item.XMBH
      this.$api.getXmbhtomcList({xmbh: item.XMBH}).then(res => {
        if (res.code === 1) {
          this.searchForm.xmmc = res.data ? res.data[0].XMMC : ''
        } else {
          this.searchForm.xmmc = ''
        }
      })
    },
    querySearchMC (queryString, cb) {
      let restaurants = this.restaurants
      let results = queryString ? restaurants.filter(this.createFilter(queryString, 'XMMC')) : restaurants
      // 调用 callback 返回建议列表的数据

      cb(results)
    },
    handleSelectMC (item, param) {
      // getXmmcList
      if (param === 1) {
        this.searchForm.xmmc = item.XMMC
        this.searchForm.xmbh = item.XMBH
      } else {
        this.lmshForm.htmc = item.XMMC
        this.lmshForm.htbh = item.XMBH
        if (item.XMBH) {
          this.getOnlyXmgkjcxx(item.XMBH)
        }
      }
    },
    createFilter (queryString, val) {
      return (restaurant) => {
        return (restaurant[val].toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },

    // Dialog
    searchXMMC (val) { // 项目名称模糊搜索
      this.$api.getXmmcListt({xmmc: val}).then(res => {
        if (res.code === 1) {
          this.dialogData = res.data && res.data.length ? res.data : []
        } else {
          this.dialogData = []
        }
      })
    },
    searchXMBH (val) { // 项目编号模糊搜索
      this.$api.getXmbhmhList({xmbh: val}).then(res => {
        if (res.code === 1) {
          this.dialogData = res.data && res.data.length ? res.data : []
        } else {
          this.dialogData = []
        }
      })
    },

    initqueryXMMC () {
      let {outside} = this.userInfo
      if (outside && outside !== '~') {
        this.$api.getXxBySgdw({cbdwid: outside}).then(res => {
          if (res.code === 1) {
            this.restaurants = res.data && res.data.length ? res.data : []
          } else {
            this.restaurants = []
          }
        })
      } else {
        this.$api.getmcbhList().then(res => {
          if (res.code === 1) {
            this.restaurants = res.data && res.data.length ? res.data : []
          } else {
            this.restaurants = []
          }
        })
      }
    },
    initqueryXMBH () { // 公共查询项目编号
      this.$api.getXmbhList().then(res => {
        if (res.code === 1) {
          this.restaurantsBH = res.data && res.data.length ? res.data : []
        } else {
          this.restaurantsBH = []
        }
      })
    },

    getOnlyXmgkjcxx (val) {
      let xmbh = val || ''
      this.$api.getOnlyXmgkjcxx({xmbh: xmbh}).then(res => {
        if (res.code !== 1) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {
          if (res.data && res.data.length !== 0) {
            for (var i = 0; i < res.data.length; i++) {
              this.lmshForm.htbh = res.data[i].xmbh
              this.lmshForm.htmc = res.data[i].xmmc
              this.lmshForm.cbdw = res.data[i].cbdw
              this.lmshForm.gldw = res.data[i].gldw
              this.lmshForm.jhgq = res.data[i].htgq
              this.lmshForm.qdzh = res.data[i].qszh
              this.lmshForm.zdzh = res.data[i].zzzh
            }
          }
        }
      }).catch(e => {
        console.log(e)
      })
    },

    closeDialog (val) {
      this.dialogVisible = false
      if (val) {
        if (this.isxmmcOfadd === 1) {
          this.lmshForm.htmc = val.XMMC
          this.lmshForm.htbh = val.XMBH
          this.getOnlyXmgkjcxx(this.lmshForm.htbh)
        } else {
          this.searchForm.xmmc = val.XMMC
          this.searchForm.xmbh = val.XMBH
        }
      }
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.sqbselect{
  top:168px!important;
}
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
    // .header{}
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
      padding: 0 40px!important;
       .zhubnr{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li{
          width: 25%;
          height: 32px;
          display: flex;
          align-items: center;
          padding: 10px;
          // float: left;
          // border: 1px solid #D5D6D7;
          // border-bottom: none;
          color: #52575D!important;
          font-size: 12px;
          // &:nth-of-type(2n+1){
          //   border-right: none;
          // }
          // &:nth-last-of-type(1),&:nth-last-of-type(2){
          //   border-bottom: 1px solid #D5D6D7;
          // }
          >span{
            width: 100px;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            // line-height: 31px;
            // text-indent: 1em;
            // border-right: 1px solid #D5D6D7;
            // background: #F7F8F9;
            // float: left;
          }
          p{
            // width: calc(100% - 100px);
            flex: 1;
            height: 100%;
            margin-left: 10px;
            display: flex;
            align-items: center;
            position: relative;
            .el-input__inner{
              // border: none;
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
              border-bottom: 1px solid #D5D6D7!important;
              &:last-child{
                border-bottom: none;
              }
              i{
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
          // border-right: 1px solid #D5D6D7!important;
          width: 70%;
          min-height: 64px;
          height: auto;
          display: flex;
          align-items: center;
          >span{
            width: 100px;
          }
          >p{
            flex: 1;
            >span{
              display: block;
            }
            // border:1px solid #cccc;
          }
          // .el-upload-list__item{
          //   border: none;
          // }
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
