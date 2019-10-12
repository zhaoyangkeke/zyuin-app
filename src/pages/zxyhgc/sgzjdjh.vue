/**
* ----施工总进度计划
*/
<template>
  <div id="sgzjdjh" style="height: 100%" v-loading="loading">
    <div class="header"  v-if="!showDetail" >
      <span class="headerTit">施工总进度计划</span>
      <div class="header_option">
        <!--<div class="jianlimb" @click="showAdd()"><i class="el-icon-download"> 施工总进度计划</i></div>-->
        <ul>
          <!-- <li><i class="iconfont icon-export" style="font-size: 8px;"> 导出</i></li> -->
          <li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table"  v-if="!showDetail" >
      <div class="chaxun" style="">
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
                @select="handleSelectBH($event, 1)"
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
            <!--<el-select size="mini"  class="" placeholder="请选择日期" v-model="searchForm.jcrq">
              <el-option v-for="(item,index) in qmbbOptions" :key="index" :label="item.bbmc" :value="item.bbid"></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button size="mini" @click="search(1, 10)"  style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
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
          align="center"
          width="60">
        </el-table-column>
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column align="left" prop="htmc" label="项目名称" sortable show-overflow-tooltip></el-table-column>
        <!-- <el-table-column align="left" prop="djbh" label="单据名称" sortable show-overflow-tooltip></el-table-column> -->
        <el-table-column align="left" prop="cbdw" label="承包单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="gldw" label="管理单位" sortable show-overflow-tooltip></el-table-column>
        <!--<el-table-column align="center" prop="htbh" label="项目名称" show-overflow-tooltip></el-table-column>-->
        <el-table-column align="left" prop="gcmc" label="工程项目" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="bzdw" label="编制单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="bzrq" label="编制日期" width="100" sortable show-overflow-tooltip></el-table-column>
        <!-- <el-table-column align="left" prop="djbh" label="状态" width="80" sortable>
          <template scope="scope">
            <span style="color:#D34C42;cursor: pointer;text-align: center" v-if="scope.row.spzt==='未处理'" @click="shenhe(scope.row, scope.$index)">{{scope.row.spzt}}</span>
            <span style="color:#00a2fd;text-align: center" v-if="scope.row.spzt==='已下发'">{{scope.row.spzt}}</span>
          </template>
        </el-table-column> -->
        <el-table-column align="left" class-name="column-caoz" label="操作" width="120">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" >进度</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="left" prop="bz" label="备注"  width="90" sortable show-overflow-tooltip></el-table-column> -->
      </el-table>
    </div>

    <footer class="footer"  v-if="!showDetail" >
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

    <div class="tabArea" v-if="showDetail"  @close="resetForm">
      <div style="position:relative;">
        <p class="tabAreaTit" v-if="!addzb">
          <span class="titleclasschild"  @click="resetForm"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span  v-if="!addzb">施工总进度计划</span>
        </p>

        <div v-show="!showxq" class="SPState" >
          <el-button size="mini" class="minibtn"  v-if="isadd"  :loading="submitLoading" @click="addSubmit('lmshForm');isxmmcOfadd = 0"
                    style="background: #DF4D4A; border-color:transparent;color: #fff;">保存</el-button>
          <el-button size="mini" class="minibtn"  v-if="!isadd"  :loading="submitLoading" @click="updateSubmit('lmshForm');isxmmcOfadd = 0"
                    style="background: #DF4D4A; border-color:transparent;color: #fff;">保存</el-button>
          <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
        <!-- <p class="tabAreaTit" v-if="addzb">
          <span class="titleclasschild"  @click="addzb = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span  v-if="addzb">添加子目</span>
        </p> -->
        <!-- <div class="SPState" v-if="!addzb">
          <el-button size="mini" @click="addzb = true"><i class="el-icon-edit-outline" title="添加"></i>添加子目</el-button>
        </div> -->
      </div>



      <div v-show="isseedetail ==0">
        <div style="padding-left: 15px;"  v-if="!addzb">
          <el-form  :model="lmshForm" :rules="jldModelRules" ref="lmshForm" label-width="100px">

            <el-form-item class="addJLD" label="单据名称">
              <!--<el-input  v-model="lmshForm.djbh" size="mini"  placeholder="请输入内容" disabled></el-input>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.djbh}}</label>
            </el-form-item>

            <!--<el-form-item class="addJLD" label="项目名称" prop="htmc">
              <el-select
              v-model="lmshForm.htmc"
              value-key="xmmc"
              filterable
              placeholder="请选择"
              @change="selectHt"
              :disabled="isseedetail == 2"
              size="mini">
                <el-option
                  v-for="(item, index) in htList"
                  :key="index"
                  :label="item.xmmc"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>-->
            <el-form-item style="margin-bottom: 0;" label="项目名称" prop="" class="addJLD">
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



            <el-form-item class="addJLD" label="管理单位">
              <!--<el-input  v-model="lmshForm.gldw" size="mini"  placeholder="请输入内容" disabled></el-input>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.gldw}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="项目开工日期">
              <!--<el-date-picker
              disabled
              v-model="lmshForm.htkgrq"
              size="mini"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
              </el-date-picker>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.htkgrq}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="项目竣工日期">
              <!--<el-date-picker
              disabled
              v-model="lmshForm.htjgrq"
              size="mini"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
              </el-date-picker>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.htjgrq}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="计划工期">
              <!--<el-input  v-model="lmshForm.jhgq" size="mini"  placeholder="请输入内容" disabled></el-input>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.jhgq}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="承包单位">
              <!--<el-input  v-model="lmshForm.cbdw" size="mini"  placeholder="请输入内容" disabled></el-input>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.cbdw}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="编制人" prop="bzr">
              <el-input  v-model="lmshForm.bzr" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="编制日期" prop="bzrq">
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

            <el-form-item class="addJLD" label="编制单位" prop="bzdw">
              <el-input  v-model="lmshForm.bzdw" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="编制部门" prop="bzbm">
              <el-input  v-model="lmshForm.bzbm" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
            </el-form-item>


            <div style="width: 79%;">
              <el-form-item class="addJLD-textarea"  label="备注">
                <el-input type="textarea"   v-model="lmshForm.bz" :disabled="isseedetail == 2" style="width: 60%;"></el-input>
              </el-form-item>
              <!-- <li class="text_line" style="min-height: 64px;">
                <span>子目 :</span>
                <h6 style="font-weight:normal">
                  <p style="margin-right: ;" v-for="(item, index) in lmshForm.mx" :key="index" >
                    {{(index+1)+'、'+item.zmmc}}
                  </p>
                </h6>
              </li> -->
            </div>

            <el-form-item  class="addJLD"   label="附件">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                ref="uploada"
                :disabled="isseedetail == 2"
                :limit="2">
                <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
            </el-form-item>

          </el-form>
        </div>

        <!-- <div class="dialog_footer" v-if="!showxq">
          <el-button size="mini" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit('lmshForm')">保存</el-button>
          <el-button size="mini" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit('lmshForm')">保存</el-button>
          <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div> -->
      </div>


      <div v-show="showxq">
        <div style="padding-left: 15px;"  >

          <p class="addJLD">
            <span class="addJLD_tit2">单据名称 ：</span>
            <span>{{lmshForm.djbh}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">项目名称 ：</span>
            <span>{{lmshForm.htmc}}</span>
          </p>

          <p class="addJLD">
            <span class="addJLD_tit2">管理单位 ：</span>
            <span>{{lmshForm.gldw}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">项目开工日期 ：</span>
            <span>{{lmshForm.htkgrq}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">项目竣工日期 ：</span>
            <span>{{lmshForm.htjgrq}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">计划工期 ：</span>
            <span>{{lmshForm.jhgq}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">承包单位 ：</span>
            <span>{{lmshForm.cbdw}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">编制人 ：</span>
            <span>{{lmshForm.bzr}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">编制日期 ：</span>
            <span>{{lmshForm.bzrq}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">编制单位 ：</span>
            <span>{{lmshForm.bzdw}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">编制部门 ：</span>
            <span>{{lmshForm.bzbm}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">备注 ：</span>
            <span>{{lmshForm.bz}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">附件 ：</span>
            <span></span>
          </p>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
  import { returnUserInfo } from '@/helper'
import { debug, debuglog } from 'util';

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
    return {
      isxmmcOfadd: 0,
      // zll
      gldwarr: [],
      djbharr: [],
      index: '',
      isadd: false,
      addzb: false,
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
      // searchForm: {
      //   djbh: undefined,
      //   gldw: undefined,
      //   selectDate: null,
      //   pageNum:1,
      //   pageSize:10
      // },
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      multipleSelection: [],
      htList: [],
      formId: '',





      initializationForm: {
        mx: [],
        // djbh: '',
        gcmc: '',
        htmc: '',
        gldw: '',
        htkgrq: '',
        htjgrq: '',
        jhgq: '',
        cbdw: '',
        bz: '',
        bzr: '',
        bzrq: '',
        bzdw: '',
        bzbm: '',
      },
      lmshForm: {},
      userInfo:{
        orgbh:undefined,
        orgid:undefined,
        orgmc:undefined,
        bmbh:undefined,
        bmid:undefined,
        bmmc:undefined,
        yhbm:undefined,
        yhid:undefined,
        yhmc:undefined,
        gldwid:undefined,
        gldw:undefined,
        gldwbm:undefined,
      },
      isseedetail: 0,
      // form表单验证条件
      jldModelRules: {
        htmc: [
          { required: true,  message: '请选择项目名称', trigger: 'change'}
        ],
        bzr: [
          {type: 'string', required: true,  message: '请输入编制人', trigger: 'change' }
        ],
        bzrq: [
          {type: 'string', required: true,  message: '请选择日期', trigger: 'change' }
        ],
        bzdw: [
          {type: 'string', required: true,  message: '请输入编制单位', trigger: 'change' }
        ],
        bzbm: [
          {type: 'string', required: true,  message: '请输入编制部门', trigger: 'change' }
        ],
      },


      searchForm: {
        xmmc:'',
        xmbh:'',
        htbh: undefined,
        tbdw: undefined,
        jcrq:'',
        ksrq:'',
        datearr: null,
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible:false,
      restaurants:[ ],
      restaurantsBH:[ ],
      datatypes:'',
      dialogTableTit:{ //ok
          XMMC:'项目名称',XMBH:'项目编号',
        },
      dialogData:[],
    }
  },
  mounted () {
    this.userInfo = returnUserInfo()
    this.lmshForm.bzrq = this.formatDate(new Date())

    this.$api.getProjectMsgToCreateMWP().then(res=>{
      if(res.code == 1){
        this.htList = res.data
        }
    })
    this.initqueryXMBH()
    this.initqueryXMMC()

    this.search(1, 10)
    this.tableHeight = $('#sgzjdjh')[0].offsetHeight
    this.getDjbharr()
    this.getGldwarr()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.search()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.search()
    },
    resizeSearch(){
      this.searchForm.djbh = undefined
      this.searchForm.gldw = undefined
      this.searchForm.selectDate = undefined
      this.searchForm.pageNum = 1
    },
    // 管理单位list
    getGldwarr () {
      this.$api.getGldwList().then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {
          this.gldwarr = res.data.data
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 单据名称list
    getDjbharr () {
      this.$api.getDjbhList().then(res => {
        if (res.status !== 200) {
           this.$message({
             message: '网络出错',
             type: 'error'
           })
        } else {
          this.djbharr = res.data.data
        }
      }).catch(e => {
        console.log(e)
      })
    },
    addzibiao () {
      this.lmshForm.mx.push({mid: this.lmshForm.id})
    },
    showAdd () {
      if( !this.htList.length ) {
        this.$api.getProjectMsgToCreateMWP().then(res=>{
          if(res.code == 1){
              this.htList = res.data
            }
        })
      }

      this.lmshForm = _.cloneDeep(this.initializationForm)
      this.lmshForm.bzr = this.userInfo.daYhmc
      this.lmshForm.bzdw = this.userInfo.daYhmc
      this.lmshForm.bzbm = this.userInfo.daZzmc
      this.isxmmcOfadd = 1
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      this.formId = 'sgzjdjh' + new Date().getTime()
      this.lmshForm.djbh = this.formId
      this.lmshForm.bzrq = this.formatDate(new Date())

    },
    updateFormDia (row, index) {
      this.isxmmcOfadd = 1
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      this.isseedetail = 0
      // this.lmshForm = JSON.parse(JSON.stringify(row))
      this.lmshForm = row
      this.index = index
    },
    showBhFormDia (row) {
      this.isxmmcOfadd = 1
      this.showDetail = true
      this.showxq = true
      this.isadd = false
      // this.lmshForm = JSON.parse(JSON.stringify(row))
      this.lmshForm = row
      this.isseedetail = 2

    },
    // 获取列表数据
    search () {
      this.showSearch = false

      let {djbh, gldw, datearr, pageNum, pageSize} = this.searchForm
      let ksrq,jsrq
      if (datearr && datearr.length) {
        ksrq = datearr[0]
        jsrq = datearr[1]
      }
      this.$api.sgzjdjhgetSgzjdjh({
        pageNum:this.currentPage,
        pageSize:this.pageSize,
        daZzid:this.userInfo.daZzid,
        daYhid:this.userInfo.daYhid,
        daBmid:this.userInfo.daBmid,
        htbh:this.searchForm.xmbh,
        htmc:this.searchForm.xmmc,
        ksrq,
        jsrq
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
          //console.log(this.tableData, 111)
          //console.log(this.total,222)
          //console.log(this.userInfo,333)
        }
      }).catch(e => {
        this.loading = false
      })
    },
    // 添加保存
    addSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // if(this.lmshForm.mx.length==0) {
          //     this.lmshForm.mx=[]
          // }

          let params = _.assign({},this.lmshForm,this.userInfo)
          this.$api.sgzjdjhaddSgzjdjh(params).then(res => {
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
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    // 编辑保存
    updateSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.sgzjdjhupdateSgzjdjh(this.lmshForm).then(res => {
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
        } else {
          console.log('error submit!!');
          return false;
        }
      });

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
          this.$api.sgzjdjhdeleteSgzjdjh('?ids=' + djbharr).then(res => {
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
        this.$api.sgzjdjhspSgzjdjh('?spzt=已下发&ids=' + form.id).then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: '审核通过!'
            })
            this.search(this.currentPage, this.pageSize)
            this.resetForm()
          }
        })
        this.$message({
          type: 'success',
          message: '审核通过!'
        })
        row.sfsh = '1'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消审核'
        })
      })
    },
    selectHt (value) {
      this.lmshForm.htbh = value.xmbh
      this.lmshForm.gcmc = value.xmmc
      this.lmshForm.htmc = value.xmmc
      this.lmshForm.gldw = value.gldw
      this.lmshForm.htkgrq = value.htkgrq
      this.lmshForm.htjgrq = value.htwgrq

      this.lmshForm.jhgq = value.htgq
      this.lmshForm.cbdw = value.cbdw
      // this.lmshForm.mx = value.zmhts

    },
    resetForm () {
      this.showDetail = false
      this.isseedetail = 0
    },


     //重置信息
    resizeDate(){
      this.searchForm.xmmc = undefined
      this.searchForm.xmbh = undefined
      this.searchForm.searchTime = undefined
      this.searchForm.datearr = undefined

      this.search(this.currentPage, this.pageSize)
    },
    showDialog(bol){ // 点击弹框
        this.dialogVisible = true
        this.datatypes = bol
        this._getmcbhList()
      },
    _getmcbhList() { //获取数据
      this.$api.getmcbhList().then(res=>{
          if(res.code == 1){
            this.dialogData = res.data&&res.data.length?res.data:[]
          }else{
            this.dialogData = []
          }
        })
    },
    querySearchBH(queryString, cb) { // 1
        let  restaurants = this.restaurantsBH;
        let results = queryString ? restaurants.filter(this.createFilter(queryString,'XMBH')) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
    handleSelectBH(item){ // 2
        this.searchForm.xmbh = item.XMBH
        this.$api.getXmbhtomcList({xmbh:item.XMBH}).then(res=>{
          if(res.code == 1){
            this.searchForm.xmmc = res.data?res.data[0].XMMC:''
          }else{
            this.searchForm.xmmc = ''
          }
        })
      },
    querySearchMC(queryString, cb) {
        let  restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString,'XMMC')) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    handleSelectMC(item,param){
      //getXmmcList
      console.log(item,param, '切换项目名称')
      if (param == 1) {
        this.searchForm.xmmc = item.XMMC
        this.searchForm.xmbh = item.XMBH
        console.log(this.searchForm,1111111)
      } else {
        this.lmshForm.htmc = item.XMMC
        this.lmshForm.htbh = item.XMBH
        this.lmshForm.gcmc = item.XMMC

        if (item.XMBH){
          this.getOnlyXmgkjcxx(item.XMBH)
        }
      }

    },
    createFilter(queryString,val) {
      return (restaurant) => {
        return (restaurant[val].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

//Dialog
    searchXMMC(val){ // 项目名称模糊搜索
      this.$api.getXmmcListt({xmmc:val}).then(res=>{
        if(res.code == 1){
          this.dialogData = res.data&&res.data.length?res.data:[]
        }else{
          this.dialogData = []
        }
      })
    },
    searchXMBH(val){ //项目编号模糊搜索
      this.$api.getXmbhmhList({xmbh:val}).then(res=>{
        if(res.code == 1){
          this.dialogData = res.data&&res.data.length?res.data:[]
        }else{
          this.dialogData = []
        }
      })
    },

    initqueryXMMC(){
      let {outside,daZzid} = this.userInfo
      if(outside&&outside!=='~'){
        this.$api.getXxBySgdw({cbdwid:outside}).then(res=>{

          if(res.code == 1){
            this.restaurants = res.data && res.data.length ? res.data : []
          }else{
            this.restaurants = []
          }
        })
      }else {
        this.$api.getmcbhList().then(res => {
          if (res.code == 1) {
            this.restaurants = res.data && res.data.length ? res.data : []
          } else {
            this.restaurants = []
          }
        })
      }
    },
    initqueryXMBH(){ // 公共查询项目编号
        this.$api.getXmbhList().then(res=>{
          if(res.code == 1){
            this.restaurantsBH = res.data&&res.data.length?res.data:[]
          }else{
            this.restaurantsBH = []
          }

        })
    },


    getOnlyXmgkjcxx (val) {
      let xmbh = val ? val : ''
      this.$api.getOnlyXmgkjcxx({xmbh: xmbh}).then(res => {
        if (res.code != 1) {
          this.$message({
            message: '网络出错',
            type: "error"
          })
        } else {
          //console.log(res.data, '项目信息111')
          if (res.data && res.data.length !== 0) {
            for (var i = 0; i < res.data.length; i++) {
              //this.lmshForm.htbh = res.data[i].xmbh
              this.lmshForm.htmc = res.data[i].xmmc
              this.lmshForm.cbdw = res.data[i].cbdw
              this.lmshForm.gldw = res.data[i].gldw
              this.lmshForm.jhgq = res.data[i].htgq
              this.lmshForm.htkgrq = res.data[i].htkgrq
              //this.lmshForm.qdzh = parseFloat(res.data[i].qszh)
              this.lmshForm.htjgrq = res.data[i].htwgrq
              //this.lmshForm.zdzh = parseFloat(res.data[i].zzzh)

            }
          }
        }
      }).catch(e => {
        console.log(e)})
    },


    closeDialog(val){
      this.dialogVisible = false
      if(val){
        //console.log(this.isseedetail, 10101)
        //console.log(this.isxmmcOfadd, 1111111)
        console.log(this.isxmmcOfadd, 1111111)
        if (this.isxmmcOfadd == 1) {
          this.lmshForm.htmc = val.XMMC
          this.lmshForm.htbh = val.XMBH
          this.getOnlyXmgkjcxx(this.lmshForm.htbh)

        } else {
          this.searchForm.xmmc = val.XMMC
          this.searchForm.xmbh = val.XMBH
        }

      }
    },

    // 已注销功能
    selecttreeBm (node) {
      this.searchForm.bmid = node.bmcode
      this.searchForm.bmname = node.bmname
      if (!this.searchForm.qmbbid) {
        // return
      } else {
        this.search()
      }
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.jdselect{
  top:168px!important;
}
  #sgzjdjh{
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
      padding: 0 40px;
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
            width: calc(100% / 3);
            height: 100%;
            float: left;
            line-height: 31px;
            text-align: center;
            background: #F7F8F9;
            border-right: 1px solid #D5D6D7;
          }
          p{
            width: calc(100% / 3);
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
