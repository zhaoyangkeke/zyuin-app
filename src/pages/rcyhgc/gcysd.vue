/**
* ----工程验收单
*/
<template>
  <div id="gcysd" style="height: 100%" v-loading="loading">
    <div class="header">
      <span class="headerTit">工程验收单</span>
      <div class="header_option">
        <ul>
          <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
         <li @click="showAdd(); seeDetails = 0"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table">
      <div class="chaxun">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item class="" label="项目名称" prop="htbh">
            <el-autocomplete
              class="inline-input"
              size="mini"
              v-model="searchForm.htmc"
              :fetch-suggestions="querySearchMC"
              @select="handleSelectMC"
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
            <el-button size="mini" @click="search(1, 10)" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
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
          align="center"
          type="selection"
          :selectable='selectable2'
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="50">
        </el-table-column>

        <el-table-column align="left" sortable prop="djbh" label="申请编号" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="xmmc" label="项目名称" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="xmbh" label="项目编号"> </el-table-column>
        <el-table-column align="left" sortable prop="xmje" label="项目金额"> </el-table-column>
        <el-table-column align="left" sortable prop="ysrqZh" label="验收时间"> </el-table-column>
        <el-table-column align="left" sortable prop="sgdw" label="施工单位"> </el-table-column>
        <el-table-column align="left" sortable prop="gldw" label="管理单位"> </el-table-column>
        <el-table-column align="left" sortable label="状态"  show-overflow-tooltip>
          <template scope="scope">
            <span style="color:#D34C42;cursor: pointer;text-align: center" v-if="scope.row.yszt==='1701'">{{scope.row.ysztZh}}</span>
            <span style="color:#00a2fd;text-align: center" v-if="scope.row.yszt==='1702'">{{scope.row.ysztZh}}</span>
            <span style="color:#00a2fd;text-align: center" v-if="scope.row.yszt==='1703'">{{scope.row.ysztZh}}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="120">
          <template slot-scope="{row,$index}">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" v-if="row.yszt =='1701'" @click="updateFormDia(row, $index); seeDetails = 0">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(row); seeDetails = 1">详情</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center"  v-if="row.yszt =='1701'" @click="shenhe(row, $index)">提交</span>
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
    <!--<el-dialog class="data-dialog el-updata-div" title="工程验收单" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" @close="resetForm">-->
    <div class="tabArea" v-if="showDetail"  @close="resetForm">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild"  @click="showDetail = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>返回</span>
        </p>
      </div>
      <div class="dialog_warp">
        <div style="font-size: 0" v-show = 'seeDetails === 0'>
          <p class="addJLD">
            <span class="addJLD_tit">单据编号 ：</span>
            <el-input size="mini" :disabled="true" type="text" v-model="lmshForm.djbh"></el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">项目名称 ：</span>
            <el-select clearable :disabled="showxq" size="mini" style="width:100%;" v-model="lmshForm.xmmc" value-key="htbh" placeholder="" @change="selectHt">
              <el-option v-for="(item,index) in htlist" :key="index" :label="item.xmmc" :value="item"> </el-option>
            </el-select>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">项目编号 ：</span>
            <el-input size="mini" :disabled="true" type="text" v-model="lmshForm.xmbh"></el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">项目金额 ：</span>
            <el-input size="mini" :disabled="true" type="text" v-model="lmshForm.xmje"></el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">验收时间 ：</span>
            <el-date-picker
              v-model="lmshForm.ysrq"
              size="mini"
              type="date"
              :disabled="showxq"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">施工单位 ：</span>
            <el-input size="mini" :disabled="true" type="text" v-model="lmshForm.sgdw"></el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">管理单位 ：</span>
            <el-input size="mini" :disabled="true" type="text" v-model="lmshForm.gldw"></el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">填报人 ：</span>
            <el-input size="mini" :disabled="true" type="text" v-model="lmshForm.tbr"></el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">填报时间 ：</span>
            <el-date-picker
              v-model="lmshForm.tbrq"
              size="mini"
              :disabled="showxq"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">填报单位 ：</span>
            <el-input size="mini" :disabled="true" type="text" v-model="lmshForm.tbdw"></el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">填报部门 ：</span>
            <el-input size="mini" :disabled="true" type="text" v-model="lmshForm.tbbm"></el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">参加验收人员 ：</span>
            <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.cjysry"></el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">工程内容 ：</span>
            <el-input  size="mini" :disabled="showxq" type="text" v-model="lmshForm.gcnr"></el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">施工方意见 ：</span>
            <el-input  size="mini" :disabled="showxq" type="text" v-model="lmshForm.sgfyj"></el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">业主验收小组意见 ：</span>
            <el-input   size="mini" :disabled="showxq" type="text" v-model="lmshForm.yzysxzyj"></el-input>
          </p>
          <p style="font-size: 13px">
            <el-upload
              style="display: inline-block"
              class="upload-demo"
              action="111"
              :file-list="fildDatas"
              :on-remove="fjRemove"
              :http-request="handHttpRequest"
              multiple
              :disabled="showxq"
              :limit="3">
              <el-button  v-if="!showxq" size="mini" type="primary">添加附件</el-button>
            </el-upload>
          </p>
        </div>
        <div style="font-size: 0;" v-show = 'seeDetails === 1'>
          <p class="addJLD" v-for = '(item, keyname) in nameLabsObj'>
            <span class="inputlabel" style="width:7rem;">{{item}} ：</span>
            <span class="spanwidth">{{lmshForm[keyname]}}</span>
          </p>
          <div style="margin-top:20px;margin-left: 13px;font-size: 14px;">
            <span>文件列表 ：</span>
            <a style="margin-right: 20px;" v-for="(files,index) in fildDatas" target="_blank" :key="index" :href="files.file_path">{{files.file_yname}}</a>
          </div>
        </div>
        <div class="dialog_footer" v-if="!showxq&&canAdd">
          <el-button size="mini" v-if="isadd" style="background-color: #DF4D4A;border-color: transparent;color: #fff" class="dialog-button bao_cun"
                     :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="mini" v-if="!isadd" style="background-color: #DF4D4A;border-color: transparent;color: #fff" class="dialog-button bao_cun"
                     :loading="submitLoading" @click="updateSubmit">保存</el-button>
          <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>
    </div>
    <Dialog :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :dialogVisible="dialogVisible"
            @searchXMMC="searchXMMC"
            @closeDialog="closeDialog">
    </Dialog>
    <!--</el-dialog>-->
  </div>
</template>

<script>
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
    return {
      fildDatas:[],
      nameLabsObj: {
        djbh: '单据编号',
        xmmc: '项目名称',
        xmbh: '项目编号',
        xmje: '项目金额',
        ysrq: '验收时间',
        sgdw: '施工单位',
        gldw: '管理单位',
        tbr: '填报人',
        tbrq: '填报时间',
        tbdw: '填报单位',
        tbbm: '填报部门',
        cjysry: '参加验收人员',
        gcnr: '工程内容',
        sgfyj: '施工方意见',
        yzysxzyj: '业主验收小组意见',
        fj: '附件',
        // zlbzj: '应扣留的质量保证金(元)',
        // ljzfgck: '累计已支付工程价款(元)',
        // yzfkk: '应支付的交工付款金额(元)',
        // yzfkkdx: '应支付的交工付款金额(大写)',
        // dwmc: '编制单位',
        // bmmc: '编制部门'
      },
      seeDetails: 2,
      dialogData:[ ],
      dialogTableTit:{
        XMMC:'项目名称',XMBH:'项目编号',
      },
      datatypes:'',
      dialogVisible:false,
      restaurants:[ ],

      canAdd:true,
      uuidsID:'',
      userInfo:{
        daZzbh:undefined,
        daZzid:undefined,
        daZzmc:undefined,
        daBmbm:undefined,
        daBmid:undefined,
        daBmmc:undefined,
        daYhbm:undefined,
        daYhid:undefined,
        daYhmc:undefined,
      },
      lmshForm: {
        xcfx: '上行',
        ysrq:'',
        tbrq:'',
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
      searchForm: {htmc:'',jcrq:''},
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      multipleSelection: [],
      htlist: [],
      htbh: {},
      total:0
    }
  },
  methods: {
    fjRemove(file, fileList){
      this.fildDatas = fileList
    },
    handHttpRequest(files){
      var fm = new FormData();
      fm.append('file',files.file);
      this.$api.uploadFile2(fm).then(res=>{
        if(res.code == 1){
          let datas = res.data
          datas.file_remarks = datas.remarks
          delete datas.remarks
          let fildObj = datas
          fildObj.file_id = this.uuidsID
          fildObj.name = fildObj.file_yname
          this.fildDatas.push(fildObj)
        }
      })
    },
    selectable2(row, index){   //禁用第四个
      if(row.yszt ==='1701'){
        return true
      }else{
        return false
      }

    },
    searchXMMC(val){
      this.$api.getXmmcListt({xmmc:val}).then(res=>{
        if(res.code == 1){
          this.dialogData = res.data&&res.data.length?res.data:[]
        }else{
          this.dialogData = []
        }
      })
    },
    initqueryXMMC(){
      this.$api.getmcbhList2().then(res=>{
        if(res.code == 1){
          this.restaurants = res.data&&res.data.length?res.data:[]
        }else{
          this.restaurants = []
        }

      })
    },
    handleSelectMC(item){
      //getXmmcList
      this.searchForm.htmc = item.XMMC
      this.searchForm.xmbh = item.XMBH
    },
    showDialog(bol){
      this.dialogVisible = true
      this.datatypes = bol
      this.$api.getmcbhList2().then(res=>{
        if(res.code == 1){
          this.dialogData = res.data&&res.data.length?res.data:[]
        }else{
          this.dialogData = []
        }
      })
    },
    closeDialog(val){
      this.dialogVisible = false
      if(val){
        this.searchForm.htmc = val.XMMC
        this.searchForm.xmbh = val.XMBH
      }
    },
    querySearchMC(queryString, cb) {
      let  restaurants = this.restaurants;
      let results = queryString ? restaurants.filter(this.createFilter(queryString,'XMMC')) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString,val) {
      return (restaurant) => {

        return (restaurant[val].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

    uuid(){
      let str = (((1+Math.random())*0x10000)|0).toString(16).substring(1)
      return (str+str+"-"+str+"-"+str+"-"+str+"-"+str+str+str);
    },
    initUser(){
      let userInfo = JSON.parse(localStorage.getItem('userMsg'))[0]
      if(userInfo){
        if(userInfo){
          this.userInfo.daYhbm = userInfo.userCode
          this.userInfo.daYhid = userInfo.userId
          this.userInfo.daYhmc = userInfo.userName
          let deptList = userInfo.deptList
          let bminfo = deptList[0]

          if(bminfo){
            this.userInfo.daBmbm = bminfo.deptCode
            this.userInfo.daBmid = bminfo.deptId
            this.userInfo.daBmmc = bminfo.deptName
            let org = bminfo.org
            if(org){
              this.userInfo.daZzbh = org.orgCode
              this.userInfo.daZzid = org.orgId
              this.userInfo.daZzmc = org.orgName
            }
          }
        }

      }
    },
    resizeSearch(){
      this.searchForm = {lxcode:'',xcfx:'',jcrq:''}
    },
    showAdd () {
      this.lmshForm ={
        xcfx: '上行',
        ysrq:'',
        tbrq:'',
      }
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      var now = new Date()
      var year = now.getFullYear() //年
      var month = now.getMonth() + 1 //月
      var day = now.getDate() //日
      var clock = year + "-"
      if(month < 10)
        clock += "0"
      clock += month + "-"
      if(day < 10)
        clock += "0"
      clock += day + " "
      this.lmshForm.ysrq =  clock
      this.lmshForm.tbrq =  clock
      this.formId = 'gcys' + new Date().getTime()
      this.lmshForm.djbh = this.formId


      this.lmshForm.tbdw = this.userInfo.daZzmc
      this.lmshForm.tbr = this.userInfo.daYhmc
      this.lmshForm.tbbm =  this.userInfo.daBmmc

      this.uuidsID = this.uuid()
    },
    updateFormDia (row, index) {
      this.fildDatas = []
      this.uuidsID = row.id
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      this.$api.getFilesDataById2({id:row.id}).then(res=>{
        if(res.code == 1){
          let datas = res.data
          datas.forEach(item =>{
            item.name = item.file_yname
            this.fildDatas.push(item)
          })
        }else{
        }
      })
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.index = index
    },
    showBhFormDia (row) {
      this.fildDatas = []
      this.showDetail = true
      this.showxq = true
      this.$api.getFilesDataById2({id:row.id}).then(res=>{
        if(res.code == 1){
          let datas = res.data
          datas.forEach(item =>{
            item.name = item.file_yname
            this.fildDatas.push(item)
          })
        }else{
        }
      })
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.htbh = {
        htbh: this.lmshForm.xmbh
      }
    },
    search (currentPage, pageSize) {
      this.showSearch = false
      if (this.searchForm.jcrq) {
        this.searchForm.ksrq = this.searchForm.jcrq[0]
        this.searchForm.jsrq = this.searchForm.jcrq[1]
      }
      let {ksrq,jsrq,htmc,xmbh} =   this.searchForm
     let {daZzid,daBmid,daYhid} = this.userInfo

      this.$api.getGcyhysdList({pageNum:currentPage,pageSize,daZzid,
//        xmmc:htmc?htmc.trim():undefined,
        xmbh:xmbh?xmbh.trim():undefined,
        startDate:ksrq?ksrq.trim():undefined,
        endDate:jsrq?jsrq.trim():undefined,
      }).then(resp => {

        this.loading = false
        if(resp.code == 1){
          this.tableData = resp.data.rows
          this.total = resp.data.totle
        }else{
          this.$message({
            message: resp.msg,
            type: 'error'
          })
        }
      }).catch(e => {
        this.loading = false
      })
    },
    addSubmit () {
        this.lmshForm.id =  this.uuidsID
        let self = this
      if(this.fildDatas.length){
        this.$api.addFileData(this.fildDatas).then(res=>{
          if(res.data.code == 1){
          }else{
            this.$message({
              message: '图片上传失败',
              type: 'info'
            });
          }
        })
      }
        Object.assign(self.lmshForm,self.userInfo)
        if(this.lmshForm.xmmc){
          this.$api.insertGcyhysd(this.lmshForm).then(res => {
            if (res.code === 1) {
              this.showDetail = true
              this.showxq = false
              this.isadd = true
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.search(this.currentPage, this.pageSize)
              this.resetForm()

            } else {
              this.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        }else{
          this.$message({
            message: '请先选择项目',
            type: 'info'
          });
        }

      // })
    },
    updateSubmit () {

      if(this.fildDatas.length){

        this.$api.addFileData(this.fildDatas).then(res=>{

          this.fildDatas = []
          if(res.data.code == 1){
          }else{
            this.$message({
              message: '图片上传失败',
              type: 'info'
            });
          }
        })
      }
      else{
        this.$api.deleteFilesById2({ids:this.lmshForm.id}).then(res=>{

          if(res.code == 1){

          }else{
            this.$message({
              message: '图片上传失败',
              type: 'info'
            });
          }
        })
      }
      this.$api.updateGcyhysd(this.lmshForm).then(res => {
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
    /*  }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消验收'
        })
      })*/
    },
    deleteData () {
      if (this.multipleSelection.length > 0) {
        this.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          /* let djbharr = {}
           this.multipleSelection.map((item, index) => {
           djbharr[index] = item.djbh
           }) */
          let djbharr = ''
          this.multipleSelection.map((item, index) => {

            djbharr = djbharr + item.id + ','
          })
          djbharr = djbharr.slice(0, djbharr.length - 1)

          this.$api.deleteGcyhysd('?id=' + djbharr).then(res => {
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
      let {yhmc,yhid,bmmc,orgmc} = config.userInfo
      this.$confirm('是否通过审核？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let form = JSON.parse(JSON.stringify(row))
        form.spzt = '已下发'
        let objParam = {
          id:form.id,
          yszt:'1703',
        }
        this.$api.createWorkFlow({
          pc_initiator:yhmc,
          pc_initiatorid: yhid,
          pc_name: '50',
          pc_project_id: form.id,
          pc_remarks: '',
          pc_state: '',
        },{
          group:bmmc,
          org:orgmc}).then(resp=>{
            if(resp.code == 1){
              this.$api.updateGcyhysdYjAndZt(objParam).then(res => {
                if (res.code === 1) {
                  this.$message({
                    type: 'success',
                    message: '审核成功!'
                  })
                  this.search(this.currentPage, this.pageSize)
                  this.resetForm()
                } else {
                  this.$message({
                    type: 'error',
                    message: res.msg
                  })
                }
              })
            }else{
              this.$message({
                type: 'error',
                message: resp.msg
              })
            }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消审核'
        })
      })
     /* this.showDetail = true
      this.showxq = false
      this.lmshForm = row
      this.htbh = {
        htbh: this.lmshForm.xmbh
      }*/
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
      this.htbh = {}
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
    // 获取项目信息
    getHtxxRelatedAll () {
      this.$api.getProjectMsgToCreateMWP().then(resp => {
        if (resp.code === 1) {
          this.htlist = resp.data
        }else{
          this.htlist = []
        }
      })
    },
    // 选取项目信息
    selectHt (value) {
      console.log(value,'==value')
      let self = this
      self.lmshForm.xmbh = value.xmbh
      self.lmshForm.xmmc = value.xmmc
      self.lmshForm.xmje = value.htje
      self.lmshForm.sgdw = value.cbdw
      self.lmshForm.gldw = value.gldw

 /*     this.lmshForm.xmbh = value.htbh
      this.lmshForm.xmmc = value.htmc
      this.lmshForm.xmje = value.gj_htje
      this.lmshForm.sgdw = value.yh_cbdw
      this.lmshForm.gldw = value.yh_gldw*/
      this.$api.getGcyssqdByXmbh({xmbh:value.xmbh}).then(res=>{

        if(res.code == 1){
            this.canAdd = true
        }else{
          this.canAdd = false
          this.$message({
            type: 'info',
            message: res.msg
          })
        }
      })
    }
  },
  mounted () {
    this.initUser()
    this.initqueryXMMC()
    this.search(1, 10)
    this.getHtxxRelatedAll()
    this.tableHeight = $('#gcysd')[0].offsetHeight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #gcysd{
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
          /*width: 50%;*/
          /*height: 32px;*/
          /*float: left;*/
          /*border: 1px solid #D5D6D7;*/
          /*border-bottom: none;*/
          /*color: #52575D!important;*/
          /*font-size: 12px;*/
          /*&:nth-of-type(2n+1){*/
            /*border-right: none;*/
          /*}*/
          /*&:nth-last-of-type(1){*/
            /*border-bottom: 1px solid #D5D6D7;*/
          /*}*/
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
