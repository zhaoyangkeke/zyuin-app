/**
* ----工程变更令
*/
<template>
  <div id="gcbgl" style="height: 100%" v-loading="loading">
    <div class="header" v-show="!showDetail" >
      <span class="headerTit">工程变更令</span>
      <div class="header_option">
        <ul>
          <li @click="showAdd()" v-if="!outside"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()" v-if="!outside"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table" v-show="!showDetail" >
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
          label="序号"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column align="left" prop="gcmc" label="项目名称" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="bw" label="部位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="ysjtmc" label="原设计图名称" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="yth" label="图号" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="cbdw" label="承包单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="bzrq" label="编制日期"  width="100" sortable></el-table-column>
        <el-table-column align="left" label="状态" sortable  width="80">
          <template scope="scope">
            <span style="color:#D34C42;cursor: pointer;text-align: left" v-if="scope.row.spzt ==='4301'">自由</span>
            <span style="color:#00a2fd;text-align: left" v-if="scope.row.spzt === '4302'">已下发</span>
            <span style="color:#00a2fd;text-align: left" v-if="scope.row.spzt === '4303'">已接收</span>
          </template>
        </el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="120">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: left" v-if="scope.row.spzt === '4301' && !outside" @click="shenhe(scope.row, scope.$index)">下发</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: left" v-if="scope.row.spzt === '4301'" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: left" @click="showBhFormDia(scope.row)">详情</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <footer class="footer" v-show="!showDetail" >
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
          <span >工程变更令</span>
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
        <div style="padding-left: 15px;">
          <el-form  :model="lmshForm" :rules="jldModelRules" ref="lmshForm">

            <el-form-item class="addJLD" label="变更令编号" label-width="100px">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.bglbh}}</label>
            </el-form-item>

            <el-form-item style="padding-left: 2.4rem" label="项目名称" prop="" class="addJLD">
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="lmshForm.gcmc"
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

            <el-form-item style="padding-left: 2.4rem" class="addJLD" label="起点桩号" prop="qdzh" label-width="100px">
              <el-input  v-model="lmshForm.qdzh" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="止点桩号" prop="zdzh" label-width="100px">
              <el-input  v-model="lmshForm.zdzh" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
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

            <el-form-item style="padding-left: 2.4rem" class="addJLD" label="部位" label-width="100px">
              <el-input  v-model="lmshForm.bw" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2"></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="原设计图名称" label-width="100px">
              <el-input  v-model="lmshForm.ysjtmc" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="原图号" label-width="100px">
              <el-input  v-model="lmshForm.yth" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
            </el-form-item>

            <el-form-item style="padding-left: 2.4rem" class="addJLD" label="变更设计图名称" label-width="100px">
              <el-input  v-model="lmshForm.bgsjtmc" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="变更图号" label-width="100px">
              <el-input  v-model="lmshForm.bgth" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="承包单位" prop="cbdw" label-width="100px">
              <el-input  v-model="lmshForm.cbdw" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2"></el-input>
            </el-form-item>

            <el-form-item class="addJLD"  label="工程变更申请表编号" prop="sqbbh">
                <el-select v-model="lmshForm.sqbbh" size="mini" placeholder="请选择工程变更申请表编号">
                  <el-option
                    v-for="item in SQBBHlist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
             <div style="width: 79%;">
              <el-form-item class="addJLD-textarea"  label="变更内容" prop="bgnr" label-width="100px">
                <el-input type="textarea"   v-model="lmshForm.bgnr" :disabled="isseedetail == 2" style="width: 92.8%;"></el-input>
              </el-form-item>
            </div>

            <el-form-item  class="addJLD" label="附件"  label-width="100px">
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
        <div style="padding-left: 20px;">
          <p class="addJLD">
            <span class="addJLD_tit2">变更令编号 ：</span>
            <span>{{lmshForm.bglbh}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">项目名称 ：</span>
            <span>{{lmshForm.gcmc}}</span>
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
            <span class="addJLD_tit2">编制日期 ：</span>
            <span>{{lmshForm.bzrq}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">部位 ：</span>
            <span>{{lmshForm.bw}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">原设计图名称 ：</span>
            <span>{{lmshForm.ysjtmc}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">原图号 ：</span>
            <span>{{lmshForm.yth}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">变更设计图名称 ：</span>
            <span>{{lmshForm.bgsjtmc}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">变更图号 ：</span>
            <span>{{lmshForm.bgth}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">承包单位 ：</span>
            <span>{{lmshForm.cbdw}}</span>
          </p>
          <br/>
          <p class="addJLD">
            <span class="" style="margin-left:-3px">工程变更申请表编号 ：</span>
            <span>{{lmshForm.sqbbh}}</span>
          </p>
          <br/>
          <p class="addJLD">
            <span class="addJLD_tit2">变更内容 ：</span>
            <span>{{lmshForm.bgnr}}</span>
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
import {uuid} from '../../helper/index'

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
      if ((value - 0) < 0 || (value + '').indexOf('.') < 0) {
        callback(new Error('桩号格式不正确'))
      } else {
        callback()
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
      total: 0,
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
      sqbList: [],
      sqbbh: {},
      multipleSelection: [],
      SQBBHlist: [],
      defaultHtbh: '', // 外协单位默认的合同编号
      defaultHtmc: '', // 外协单位默认的合同名称

      initializationForm: {
        bglbh: '',
        gcmc: '',
        htmc: '',
        qdzh: '',
        zdzh: '',
        bzrq: '',
        bw: '',
        ysjtmc: '',
        yth: '',
        bgsjtmc: '',
        bgth: '',
        cbdw: '',
        sqbbh: '',
        bgnr: ''
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
        gcmc: [
          {required: true, message: '请选择项目名称', trigger: 'change'}
        ],
        qdzh: [
          { message: '起点桩号为数字类型且要精确到小数点后两位', required: true, trigger: 'blur' },
          { validator: qdzh1111, trigger: 'blur' }
        ],
        zdzh: [
          { message: '起点桩号为数字类型且要精确到小数点后两位', required: true, trigger: 'blur' },
          { validator: qdzh1111, trigger: 'blur' }
        ],
        bzrq: [
          { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        ],
        cbdw: [
          { type: 'string', required: true, message: '请输入承包单位', trigger: 'change' }
        ],
        sqbbh: [
          { type: 'string', required: true, message: '请输入工程变更申请表编号', trigger: 'change' }
        ],
        bgnr: [
          { type: 'string', required: true, message: '请输入变更内容', trigger: 'change' }
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
      files: [],
      uuid: uuid(),
      fileList: [],
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
            this.searchForm.xmbh = this.defaultHtbh
            this.searchForm.htbh = this.defaultHtbh
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
    this.tableHeight = $('#gcbgl')[0].offsetHeight
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
        file.file_id = this.lmshForm.bglbh
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

    // 获取变更表申请表数据
    getBgdList (info) {
      let that = this
      this.$api.getBgsqbList('?daZzid=' + info.ORGID + '&spzt=' + '4003' + '&htbh=' + info.XMBH).then(res => {
        that.SQBBHlist = []
        let list = res.data.data.list
        if (list && list.length <= 0) {
          return
        }
        list.forEach(item => {
          let it = {label: item.bzrq.replace(/\-/g, '') + '-' + item.djbh, value: item.djbh}
          that.SQBBHlist.push(it)
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
    handleRemove (fileid) {
      this.$api.deleteFilesById('?ids=' + fileid).then(res => {})
    },
    rukufile () {
      let uploadFiles = []
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

    showAdd () {
      this.fileList = []
      this.lmshForm = _.cloneDeep(this.initializationForm)
      this.isxmmcOfadd = 1
      this.isadd = true
      this.showDetail = true
      this.inuptloading = true
      this.showxq = false
      this.formId = 'gcbgl' + new Date().getTime()
      this.lmshForm.bglbh = this.formId
      this.lmshForm.bzrq = this.formatDate(new Date())
    },
    updateFormDia (row, index) {
      this.isseedetail = 0
      this.isxmmcOfadd = 1
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      this.lmshForm = row
      this.index = index
      this.htbh = {
        htbh: row.htbh
      }
      this.sqbbh = {
        sqbbh: row.sqbbh
      }
      this.getFilesDataById(row.bglbh)
      this.getBgdList({ZT: row.spzt, ORGID: this.userInfo.gldwid, XMBH: row.htbh})
    },
    onSeleteState (item, index) {
      if (item.spzt === '4301') {
        return true
      } else {
        return false
      }
    },
    showBhFormDia (row) {
      this.isxmmcOfadd = 1
      this.isseedetail = 2
      this.isadd = false
      this.showDetail = true
      this.showxq = true
      this.lmshForm = row
      this.htbh = {
        htbh: row.htbh
      }
      this.sqbbh = {
        sqbbh: row.sqbbh
      }
      this.getFilesDataById(row.bglbh)
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

      this.$api.getBglList(
        '?pageNum=' + currentPage +
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
          this.handleRemove(this.lmshForm.djbh)
          let params = _.assign({}, this.lmshForm, this.userInfo)
          params.spzt = '4301'

          // 生成唯一的UUID
          // const uuid = this.uuid
          // 有附件，保存文件信息
          if (this.files.length > 0) {
            this.saveFileData(uuid)
          }
          // params.id = uuid
          this.$api.addBglForBggl(params).then(res => {
            if (res.data.code === 1) {
              this.resetForm()
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
        } else {
          return false
        }
      })
    },
    updateSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleRemove(this.lmshForm.djbh)
          // 有附件，保存文件信息
          if (this.files.length > 0) {
            this.saveFileData(this.lmshForm.bglbh)
          } else { // 无附件，调用删除接口
            this.deleteFilesData(this.lmshForm.bglbh)
          }
          this.$api.editBglForBggl(this.lmshForm).then(res => {
            if (res.data.code === 1) {
              // this.rukufile()
              this.resetForm()
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
    resetForm () {
      this.showDetail = false
      this.isseedetail = 0
      this.SQBBHlist = []
    },

    selectHt (value) {
      this.lmshForm.htbh = value.xmbh
      this.lmshForm.htmc = value.xmmc
      this.lmshForm.gcmc = value.xmmc

      this.lmshForm.cbdw = value.cbdw
      this.lmshForm.cbdwid = value.cbdwid
      // 起始终止桩号
      this.lmshForm.qdzh = value.qszh
      this.lmshForm.zdzh = value.zzzh
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
            djbharr = djbharr + item.bglbh + ','
          })
          djbharr = djbharr.slice(0, djbharr.length - 1)
          this.$api.delBglForBggl('?bglbhs=' + djbharr).then(res => {
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
    getfilebyid () {
      this.$api.getFilesDataById('?id=' + this.lmshForm.djbh).then(res => {
        this.fileList = res.data.data
        this.fileList.map(item => {
          item.name = item.file_yname
        })
      })
    },
    shenhe (row, index) {
      this.$confirm('是否确认下发？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let form = JSON.parse(JSON.stringify(row))
        this.$api.createWorkFlow({
          pc_initiator: this.userInfo.yhmc,
          pc_initiatorid: this.userInfo.yhid,
          pc_name: '35',
          pc_project_id: form.bglbh,
          pc_remarks: '',
          pc_state: '1'
        }).then(res => {
          // 工作流创建成功，提交
          if (res.code === 1) {
            form.spzt = '4302'
            this.$api.spBglForBggl('?spzt=' + form.spzt + '&bglbhs=' + form.bglbh).then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '下发通过,正在审核中!'
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
            message: '已取消下发!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消下发'
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
      this.searchForm.xmbh = this.defaultHtbh
      this.searchForm.htbh = this.defaultHtbh

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
        this.searchForm.xmbh = item.XMBH
        this.searchForm.xmmc = item.XMMC
      } else {
        this.lmshForm.gcmc = item.XMMC
        this.lmshForm.htbh = item.XMBH
        if (item.XMBH) {
          this.getOnlyXmgkjcxx(item.XMBH)
          this.getBgdList({ZT: item.ZT, ORGID: this.userInfo.gldwid, XMBH: item.XMBH})
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
              this.lmshForm.gcmc = res.data[i].xmmc
              this.lmshForm.cbdw = res.data[i].cbdw
              this.lmshForm.jhgq = res.data[i].htgq
              this.lmshForm.qdzh = parseFloat(res.data[i].qszh)
              this.lmshForm.zdzh = parseFloat(res.data[i].zzzh)
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
          this.lmshForm.gcmc = val.XMMC
          this.lmshForm.htbh = val.XMBH
          this.getOnlyXmgkjcxx(this.lmshForm.htbh)
          this.getBgdList({ZT: val.ZT, ORGID: this.userInfo.gldwid, XMBH: val.XMBH})
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
.bglselect{
  top:168px!important;
}
  #gcbgl{
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
