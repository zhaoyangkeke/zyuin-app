/**
* ----工程验收申请单
*/
<template>
  <div id="gcyssqd" style="height: 100%;position:relative;" v-loading="loading">
    <div class="header">
      <span class="headerTit">工程验收申请单</span>
      <div class="header_option">
        <ul>
          <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
          <li @click="showAdd();seeDetails = 0"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table">
      <div class="cha_xun">
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
            <el-button size="mini" @click="search(1, 10)"  style="background-color: #DF4D4A;border-color:transparent;color: #fff">查询</el-button>
            <el-button @click.native="resizeSearch" size="mini">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <p style="font-size: 12px;height: 18px"></p>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                style="width: 100%;"
                row-class-name="row_class"
                border
                :height="showSearch?'calc(100% - 59px)':'calc(100% - 18px)'"
                :row-style="{fontFamily: '宋体', fontSize: '12px'}"
                @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          :selectable='selectable2'
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="50">
        </el-table-column>



        <el-table-column align="center" prop="sqbh" label="申请编号"  show-overflow-tooltip></el-table-column>
        <!--<el-table-column align="center" prop="htmc" label="项目" show-overflow-tooltip></el-table-column>-->
        <el-table-column align="center" prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="sqrqZh" label="申请时间"></el-table-column>
        <el-table-column align="center" prop="xmbh" label="项目编号"></el-table-column>
        <el-table-column align="center" prop="sgdw" label="施工单位"></el-table-column>
        <el-table-column align="center" prop="gldw" label="管理单位"></el-table-column>
        <el-table-column align="center" prop="xmkgrqZh" label="项目开工工期"></el-table-column>
        <el-table-column align="center" label="状态" width="80">
          <template scope="scope">
            <span style="color:#D34C42;cursor: pointer;text-align: center" v-if="scope.row.spzt==='1701'">自由</span>
            <span style="color:#00a2fd;text-align: center" v-if="scope.row.spzt==='1703'">审核中</span>
            <span style="color:#00a2fd;text-align: center" v-if="scope.row.spzt==='1702'">已验收</span>

          </template>
        </el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="120">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" v-if="scope.row.spzt=='1701'" @click="updateFormDia(scope.row, scope.$index);seeDetails = 0">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row);seeDetails = 1">详情</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" v-if="scope.row.spzt=='1701'" @click="shenhe(scope.row, scope.$index)">提交</span>
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
    <div class="tabArea" v-if="showDetail"  @close="resetForm">
        <div style="position:relative;">
          <p class="tabAreaTit">
            <span class="titleclasschild"  @click="showDetail = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
            <span>返回</span>
          </p>
          <div style="position:absolute;right: 10px;top: 10px;" v-if="!showxq">
            <el-button size="mini" v-if="isadd" style="background-color: #DF4D4A;border-color:transparent;color: #fff"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
            <el-button size="mini" v-if="!isadd" style="background-color: #DF4D4A;border-color:transparent;color: #fff" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
            <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
          </div>
        </div>
        <div class="dialog_warp">
          <div style="font-size: 0" v-show = 'seeDetails === 0'>
            <p class="addJLD">
              <span class="addJLD_tit">申请编号 ：</span>
              <el-input size="mini" :disabled="true" type="text" v-model="lmshForm.sqbh"></el-input>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit">项目名称 ：</span>
              <el-select clearable :disabled="showxq" size="mini" style="width: 148px;" v-model="lmshForm.xmmc"  placeholder="" @change="selectHt">
                <el-option v-for="(item,index) in htlist" :key="index" :label="item.xmmc" :value="item"> </el-option>
              </el-select>
              <!--<el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.xmmc"></el-input>-->
            </p>
            <p class="addJLD">
              <span class="addJLD_tit">申请时间 ：</span>
              <el-date-picker
                :disabled="showxq"
                v-model="lmshForm.sqrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit">项目编号 ：</span>
              <el-input size="mini"  type="text" v-model="lmshForm.xmbh"></el-input>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit">施工单位 ：</span>
              <el-input size="mini"  type="text" :value="lmshForm.sgdw" v-model="lmshForm.sgdw"></el-input>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit">管理单位 ：</span>
              <el-input size="mini" :disabled="true" type="text" v-model="lmshForm.gldw"></el-input>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit">项目开始工期 ：</span>
              <el-date-picker
                v-model="lmshForm.xmkgrq"
                size="mini"
                type="date"
                :disabled="true"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit">项目结束工期 ：</span>
              <el-date-picker
                v-model="lmshForm.xmjgrq"
                size="mini"
                type="date"
                :disabled="true"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit">验收类型 ：</span>

              <el-radio style="height: 100%;line-height: 31px" :disabled="showxq" v-model="lmshForm.yslx" label="交工验收">交工验收</el-radio>
              <el-radio style="height: 100%;line-height: 31px" :disabled="showxq" v-model="lmshForm.yslx" label="竣工验收">竣工验收</el-radio>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit">施工方意见 ：</span>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.sgfyj"></el-input>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit">监理单位意见 ：</span>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.jldwyj"></el-input>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit">工程技术部意见 ：</span>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.gcjsbyj"></el-input>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit">经营发展部意见 ：</span>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.jyfzbyj"></el-input>
            </p>

            <p class="addJLD">
              <span class="addJLD_tit">填报人 ：</span>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.tbr"></el-input>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit">填报日期 ：</span>
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
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.tbdw"></el-input>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit">填报部门 ：</span>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.tbbm"></el-input>
            </p>
            <p style="font-size: 14px;">
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
          <div style="font-size: 0" v-show = 'seeDetails === 1'>
            <p class="addJLD" v-for = '(item, keyname) in nameLabOfobj'>
              <span class="inputlabel" style="width:7rem;">{{item}} ：</span>
              <span class="spanwidth">{{lmshForm[keyname]}}</span>
            </p>
            <div style="margin-top:20px;margin-left: 13px;font-size: 14px;">
              <span>文件列表 ：</span>
              <a style="margin-right: 20px;" v-for="(files,index) in fildDatas" target="_blank" :key="index" :href="files.file_path">{{files.file_yname}}</a>
            </div>
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
      nameLabOfobj: {
        sqbh: '申请编号',
        xmmc: '项目名称',
        sqrq: '申请时间',
        xmbh: '项目编号',
        sgdw: '施工单位',
        gldw: '管理单位',
        xmkgrq: '项目开始工期',
        xmjgrq: '项目结束工期',
        yslx: '验收类型',
        sgfyj: '施工方意见',
        jldwyj: '监理单位意见',
        gcjsbyj: '工程技术部意见',
        jyfzbyj: '经营发展部意见',
        fj: '附件',
        tbr: '填报人',
        tbrq: '填报日期',
        tbdw: '填报单位',
        tbbm: '填报部门'
      },
      seeDetails: 2,
      dialogData:[ ],
      dialogTableTit:{
        XMMC:'项目名称',XMBH:'项目编号',
      },
      datatypes:'',
      dialogVisible:false,
      restaurants:[ ],
      datas:'',
      ztDatas:{"1701":'申请验收',"1702":'已验收',},
      lmshForm: {
        sqrq:'',
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
      searchForm: {},
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      multipleSelection: [],
      fromId: '',
      htlist: [],
      total:0,
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
      if(row.spzt == '1701'){
        return true
      }else{
        return false
      }

    },
    resizeSearch(){
      this.searchForm = {htmc:'',xcfx:'',jcrq:''}
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
        this.search(1, 10)
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
          this.userInfo.userType = userInfo.userType
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
    showAdd () {
      this.fildDatas = []
      this.lmshForm = {}
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
      this.lmshForm.sqrq = clock
      this.lmshForm.tbrq = clock
      this.formId = 'gcys' + new Date().getTime()
      this.lmshForm.sqbh = this.formId
      this.uuidsID = this.uuid()
    },
    updateFormDia (row, index) {
      this.fildDatas = []
      this.uuidsID = row.id
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.index = index
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
    },
    showBhFormDia (row) {
      this.fildDatas = []
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
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
    },
    search (currentPage, pageSize) {
      this.showSearch = false
      let {daZzid,daBmid,daYhid,userType} = this.userInfo
      if(userType&&userType =='供应商'){
        if( this.restaurants.length){
          if(this.restaurants[0].XMBH){
            this.searchForm.xmbh = this.restaurants[0].XMBH
          }
        }
      }
      if (this.searchForm.jcrq) {
        this.searchForm.ksrq = this.searchForm.jcrq[0]
        this.searchForm.jsrq = this.searchForm.jcrq[1]
      }
      let {ksrq,jsrq,htmc,xmbh} =   this.searchForm

      this.$api.getGcyssqdList2({pageNum:currentPage,pageSize,daZzid,xmbh,
        startDate:ksrq?ksrq.trim():undefined,
        endDate:jsrq?jsrq.trim():undefined,
      }).then(resp => {
        this.loading = false
             if(resp.code == 1){

               if(resp.data){
                 this.tableData = resp.data.rows
                 this.total = resp.data.totle
               }
             }else{
               this.tableData = []
               this.totle = 0
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
        this.$api.insertGcyssqd(this.lmshForm).then(res => {
          if (res.code === 1) {
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

    },
    updateSubmit () {
      this.lmshForm.xmkgrq = this.lmshForm.xmkgrq.split(" ")[0]
      this.lmshForm.xmjgrq = this.lmshForm.xmjgrq.split(" ")[0]
      this.lmshForm.tbrq = this.lmshForm.tbrq.split(" ")[0]
      this.lmshForm.sqrq = this.lmshForm.sqrq.split(" ")[0]

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
      let {sqbh, xmmc, sqrq, xmbh, sgdw, gldw, xmkgrq, xmjgrq, yslx, sgfyj, jldwyj, gcjsbyj, jyfzbyj, fj, tbr, tbdw, tbbm,id} = this.lmshForm
      this.$api.updateGcyssqd({sqbh, xmmc, sqrq, xmbh, sgdw, gldw, xmkgrq, xmjgrq, yslx, sgfyj, jldwyj, gcjsbyj, jyfzbyj, fj, tbr, tbdw, tbbm,id}).then(res => {
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
          let xmbharr = ''

          this.multipleSelection.map((item, index) => {

            djbharr = djbharr + item.id + ','
            xmbharr = xmbharr + item.xmbh + ','
          })

          djbharr = djbharr.slice(0, djbharr.length - 1)
          xmbharr = xmbharr.slice(0, xmbharr.length - 1)

          this.$api.deleteGcyssqdq({id:djbharr,xmbh:xmbharr}).then(res => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.search(this.currentPage, this.pageSize)
              // this.resetForm()
            } else {
              this.$message({
                type: 'error',
                message: res.msg
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
          spzt:'1703',
        }
        this.$api.createWorkFlow({
          pc_initiator:yhmc,
          pc_initiatorid: yhid,
          pc_name: '49',
          pc_project_id: form.id,
          pc_remarks: '',
          pc_state: '',
        },{
          group:bmmc,
          org:orgmc}).then(resp=>{
            if(resp.code == 1){
              this.$api.updateGcyssqdYjAndZt(objParam).then(res => {
                if (res.code === 1) {
                  this.search(this.currentPage, this.pageSize)
                  this.resetForm()
                  this.$message({
                    type: 'success',
                    message: '提交成功!'
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: res.msg
                  })
                }
              })
            }else{
              this.$message({
                type: 'info',
                message: '提交失败'
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
    getHtxxRelatedAll () {
      this.$api.getProjectMsgToCreateMWP().then(resp => {
        if (resp.code === 1) {

          this.htlist = resp.data
        }else{
          this.htlist = []
        }
      })
    },
    selectHt (value) {
              let self = this

      self.lmshForm.xmbh = value.xmbh
             self.lmshForm.xmmc = value.xmmc
             self.lmshForm.xmje = value.htje
             self.lmshForm.sgdw = value.cbdw
             self.lmshForm.gldw = value.gldw
             this.lmshForm.xmkgrq = value.sjkgrq
             this.lmshForm.xmjgrq = value.sjwgrq


    }
  },
  mounted () {
    this.initUser()
    this.initqueryXMMC()

    this.getHtxxRelatedAll()
    this.tableHeight = $('#gcyssqd')[0].offsetHeight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #gcyssqd{
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    overflow: auto;
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
          /*&:nth-last-of-type(1),&:nth-last-of-type(2){*/
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
