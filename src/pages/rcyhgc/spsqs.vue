/**
* ----索赔申请书
*/
<template>
  <div id="spsqs" style="height: 100%" v-loading="loading">
    <div class="header">
      <span class="headerTit">索赔申请书</span>
      <div class="header_option">
        <ul>
          <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
          <li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table">
      <!--v-if="showSearch"-->
      <div class="chaxun">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="项目名称" prop="lxbh">
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="searchForm.xmmc"
                :fetch-suggestions="querySearchBH"
                @select="handleSelectBH"
                placeholder="请输入项目名称">
                <template slot-scope="{ item }">
                  <div class="name">{{item.XMMC}}</div>
                </template>
                <i slot="suffix"  @click="showDialog('mc')" class="icon iconfont icon-xiangqing1"></i>
              </el-autocomplete>
            </el-form-item>
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
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button size="mini" @click="search(1, 10)"  style="background-color: #DF4D4A;border-color:transparent;color: #fff">查询</el-button>
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

        <el-table-column align="left" prop="pmmtgcspsqs_djbh"   sortable label="索赔申请编号"  show-overflow-tooltip> </el-table-column>

        <el-table-column align="left" prop="pmmtgcspsqs_gcmc"  sortable label="项目名称" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" prop="pmmtgcspsqs_htbh"  sortable label="项目编号"> </el-table-column>
        <el-table-column align="left" prop="pmmtgcspsqs_gldw"  sortable label="管理单位"> </el-table-column>
        <el-table-column align="left" prop="pmmtgcspsqs_spsjjs"  sortable label="索赔事件简述" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" prop="pmmtgcspsqs_sqje"  sortable label="申请金额"> </el-table-column>
        <el-table-column align="left" prop="pmmtgcspsqs_spje"  sortable label="审批金额"> </el-table-column>
        <el-table-column align="left" prop="pmmtgcspsqs_gldw"  sortable label="编制单位"> </el-table-column>
        <el-table-column align="left" prop="djbh" label="状态"  sortable  show-overflow-tooltip>
          <template scope="scope">
            <span style="color:#D34C42;cursor: pointer;text-align: center" v-if="scope.row.pmmtgcspsqs_spzt==='4001'" @click="shenhe(scope.row, scope.$index)">自由</span>
            <span style="color:#00a2fd;text-align: center"  v-if="scope.row.pmmtgcspsqs_spzt==='4002'">审批中</span>
            <span style="color:#00a2fd;text-align: center"  v-if="scope.row.pmmtgcspsqs_spzt==='4003'">已审批</span>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="pmmtgcspsqs_sqrq"  sortable label="申请日期" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="120">
          <template slot-scope="scope">
            <span  style="color:#00a2fd;cursor: pointer;text-align: center" v-if="userInfo.isWaixie&&scope.row.pmmtgcspsqs_spzt"
                   @click="shenhe(scope.row, scope.$index)">提交</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index,'edit')">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tabArea" v-if="showDetail"  @close="resetForm">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild" @click="showDetail = false;xmmcOfadd = 0"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>索赔申请书</span>
        </p>
        <div  style="position:absolute;right: 10px;top: 10px;"  v-if="!showxq">
          <el-button size="mini" v-if="isadd" style="background-color: #DF4D4A;border-color:transparent;color: #fff"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit('lmshForm');xmmcOfadd = 0">保存</el-button>
          <el-button size="mini" v-if="!isadd" style="background-color: #DF4D4A;border-color:transparent;color: #fff" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit();xmmcOfadd = 0">保存</el-button>
          <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>
      <div class="dialog_warp">
        <div style="font-size: 0;">
          <el-form style="font-size: 0" :model="lmshForm" :rules="rules" ref="lmshForm" label-width="100px">
            <el-form-item  class="addJLD"  label="索赔申请编号 ：">
               <el-input size="mini" type="text" :disabled="true" v-model="lmshForm.pmmtgcspsqs_djbh"></el-input>
            </el-form-item>
            <el-form-item  class="addJLD"  label="项目名称 ：" prop="pmmtgcspsqs_gcmc">
              <!--<el-select @change="changeSelectXmmc"  :disabled="isSP||showxq"  size="mini" v-model="lmshForm.pmmtgcspsqs_gcmc" value-key="xmbh"  placeholder="请选择">-->
                  <!--<el-option-->
                <!--v-for="(item,index) in xmbhList"-->
                <!--:key="index"-->
                <!--:label="item.xmmc"-->
                <!--:value="item">-->
              <!--</el-option>-->
             <!--</el-select>-->

              <el-autocomplete
                class="inline-input"
                size="mini"
                :disabled="showxq"
                v-model="lmshForm.pmmtgcspsqs_gcmc"
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
            <el-form-item  class="addJLD"  label="申请日期 ：">
              <el-date-picker
                :disabled="isSP"
                v-model="lmshForm.pmmtgcspsqs_sqrq"
                size="mini"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item  class="addJLD"  label="管理单位 ：">
                <el-input :disabled="true" size="mini" type="text" v-model="lmshForm.pmmtgcspsqs_gldw"> </el-input>
            </el-form-item>
            <el-form-item  class="addJLD"  label="承包单位 ：">
               <el-input :disabled="true" size="mini" type="text" v-model="lmshForm.pmmtgcspsqs_cbdw"> </el-input>
            </el-form-item>
            <el-form-item  class="addJLD"  label="编制单位 ：">
                <el-input :disabled="true" size="mini" type="text" v-model="lmshForm.pmmtgcspsqs_dwmc"> </el-input>
            </el-form-item>
            <el-form-item  class="addJLD"  label="编制部门 ：">
            <el-input :disabled="true" size="mini" type="text" v-model="lmshForm.pmmtgcspsqs_bmmc"> </el-input>
            </el-form-item>
            <el-form-item  class="addJLD"  label="申请金额（元） ：" prop="pmmtgcspsqs_sqje">
            <el-input size="mini" type="text" v-model.number="lmshForm.pmmtgcspsqs_sqje"> </el-input>
            </el-form-item>
            <el-form-item  class="addJLD" v-if="showTgdw"  label="是否为托管单位 ：">
              <el-select v-model="lmshForm.sfwtgld" size="mini"  :disabled="showxq||isSP" placeholder="请选择">
                <el-option
                  label="是"
                  value="是">
                </el-option>
                <el-option
                  label="否"
                  value="否">
                </el-option>
              </el-select>
            <!--<el-input :disabled="showxq||isSP" size="mini" type="text" v-model.number="lmshForm.pmmtgcspsqs_sqje"> </el-input>-->
            </el-form-item>

            <el-form-item v-if="isSP" class="addJLD"  label="审批金额（元） ：">
                <el-input :disabled="showxq&&isSP" size="mini" type="text" v-model="lmshForm.pmmtgcspsqs_spje"></el-input>
            </el-form-item>
            <el-form-item style="font-size: 13px;"  prop="pmmtgcspsqs_spsjjs">
                <span style="margin-left: -100px;color: #606266;">索赔事件简述 ：</span>
                <el-input style="vertical-align: top;width: 33%"  :disabled="showxq" size="mini" type="textarea" v-model="lmshForm.pmmtgcspsqs_spsjjs"> </el-input>
            </el-form-item>
          </el-form>
          <div style="margin-top: 20px;font-size: 13px;" v-if="showxq">
            <span>附件列表 ：</span>
            <a v-for="(files,index) in fjFils" style="margin-right: 10px;" target="_blank" :key="index" :href="files.file_path">{{files.file_yname}}</a>
          </div>
          <div style="margin-top: 20px;font-size: 13px;"  v-if="showxq">
            <span>索赔审查意见书：</span>
            <a v-for="(files,index) in spscFils" style="margin-right: 10px;" target="_blank" :key="index" :href="files.file_path">{{files.file_yname}}</a>
          </div>
          <div style="margin-top: 20px;font-size: 13px;"  v-if="showxq">
            <span>索赔审批意见书：</span>
            <a v-for="(files,index) in spspFils" style="margin-right: 10px;" target="_blank" :key="index" :href="files.file_path">{{files.file_yname}}</a>
          </div>
          <p style="font-size: 13px;margin-bottom: 20px;margin-top: 20px;"  v-if="!showxq">
            <el-upload
              class="uploadFiles"
              action="111"
              multiple
              :file-list="fjfildDatas"
              :on-remove="fjRemove"
              :http-request="fjRequest"
              :limit="3">
              <span style="display:inline-block;width: 94px;text-align: right">附件:</span>
              <el-button size="mini" type="primary">上传附件</el-button>
            </el-upload>
          </p>
          <p style="font-size: 13px;margin-bottom: 20px;"  v-if="!showxq">
            <el-upload
              class="uploadFiles"
              action="111"
              multiple
              :file-list="spscfildDatas"
              :on-remove="spscRemove"
              :http-request="spscRequest"
              :limit="3">
              <span>索赔审查意见书:</span>
              <el-button size="mini" type="primary">上传附件</el-button>
            </el-upload>
          </p>
          <p style="font-size: 13px;margin-bottom: 20px;"  v-if="!showxq&&isSP">
            <el-upload
              class="uploadFiles"
              action="111"
              multiple
              :file-list="spspfildDatas"
              :on-remove="spspRemove"
              :http-request="spspRequest"
              :limit="3">
              <span>索赔审批意见书:</span>
              <el-button size="mini" type="primary">上传附件</el-button>
            </el-upload>
          </p>
        </div>
      </div>
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
    <!--遮罩层-->
    <Dialog :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :dialogVisible="dialogVisible"
            @searchXMBH="searchXMBH"
            @closeDialog="closeDialog">
    </Dialog>

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
        showTgdw:false,
        xmmcOfadd: 0,
        rules:{
          pmmtgcspsqs_gcmc: [
            { required: true, message: '项目名称不能为空'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          pmmtgcspsqs_sqje: [
            { required: true, message: '申请金额不能为空', trigger: 'blur' },
            { type: 'number',message: '请输入数字',}
          ],
          pmmtgcspsqs_spsjjs: [
            { required: true, message: '索赔事件简述不能为空'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
        } ,
        spspfildDatas:[],
        spscfildDatas:[],
        fjfildDatas:[],
        spspFils:[],
        spscFils:[],
        fjFils:[],
        xmbhList:[],
        dialogData:[ ],
        dialogTableTit:{
          XMMC:'项目名称',XMBH:'项目编号',
        },
        datatypes:'',
        dialogVisible:false,
        restaurants:[ ],

        total:0,
        lmshForm: {
          xcfx: '上行',
          pmmtgcspsqs_sqrq: '',

        },
        index: '',
        isadd: false,
        isSP:false,
        submitLoading: false,
        showxq: false,//是否可编辑
        showSearch: false,
        loading: false,
        tableHeight: 300,
        tableData: [],
        showBhForm: false,
        searchCriteria: false,
        qmbbOptions: [],
        roadOptions: [],
        searchForm: {jcrq:'',xmmc:'',pmmtgcspsqs_htbh: ''},
        currentPage: 1,
        pageSize: 10,
        personelForm: {},
        showDetail: false,
        multipleSelection: [],
        formId: '',
        htList: [],
        htbh: '',
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
        },
      }
    },
    methods: {
      showAdd () {
        this.lmshForm = {
          xcfx: '上行',
          pmmtgcspsqs_sqrq: '',
        }
        this.spscfildDatas   = []
        this.fjfildDatas = []
        this.spspfildDatas = []
        this.xmmcOfadd = 1
        // this.isSP = false
        this.showDetail = true
        this.showxq = false
        this.isadd = true
        this.getYear()
        this.formId = 'spsqs' + new Date().getTime()
        this.lmshForm.pmmtgcspsqs_dwmc = this.userInfo.orgmc
        this.lmshForm.pmmtgcspsqs_bmmc = this.userInfo.bmmc
        this.lmshForm.pmmtgcspsqs_djbh = this.formId
        this.uuidsID = this.uuid()
        this.$api.getmcbhList2().then(res=>{
          if(res.code == 1){

            this.xmbhList = res.data
          }
        })

      },
      // 远程搜索项目名称list
      initqueryXMMC(){
        this.$api.getmcbhList2().then(res=>{
          if(res.code == 1){
            this.restaurants = res.data&&res.data.length?res.data:[]
          }else{
            this.restaurants = []
          }

        })
      },
      // 远程搜索项目名称
      querySearchMC(queryString, cb) {
        let  restaurants = this.restaurantsBH;

        let results = queryString ? restaurants.filter(this.createFilter(queryString,'XMMC')) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      handleSelectMC(item){

        this.lmshForm.pmmtgcspsqs_gcmc = item.XMMC
        this.lmshForm.pmmtgcspsqs_cbdw = item.CBDW
        this.htbh = item.XMBH
        this.lmshForm.pmmtgcspsqs_gldw = item.GLDW
        this.lmshForm.sfwtgld = item.SFWTGLD
        this.showTgdw = item.SFWTGLD === '是'?true:false
        this.lmshForm.pmmtgcspsqs_htbh = item.XMBH

        // this.lmshForm.pmmtgcspsqs_gcmc = item.XMMC
        // if (item.XMBH) {
          // this.getxmmessage(item.XMBH)
        // }
      },
      // 获取项目信息
      getxmmessage (param) {
        this.$api.getOnlyXmgkjcxx({xmbh:param}).then(res => {
          if(res.code != 1) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            if (res.data) {
              this.lmshForm.pmmtgcspsqs_gcmc = res.data[0].xmmc
              this.lmshForm.pmmtgcspsqs_cbdw = res.data[0].cbdw
              this.htbh = res.data[0].xmbh
              this.lmshForm.pmmtgcspsqs_gldw = res.data[0].gldw
             }
          }
        })
      },
      getYear () {
        let now = new Date()
        let year = now.getFullYear() //年
        let month = now.getMonth() + 1 //月
        let day = now.getDate() //日
        let clock = year + "-"
        if(month < 10)
          clock += "0"
        clock += month + "-"
        if(day < 10)
          clock += "0"
        clock += day + " "

        this.lmshForm.pmmtgcspsqs_sqrq = clock
      },
      uuid(){
        let str = (((1+Math.random())*0x10000)|0).toString(16).substring(1)
        return (str+str+"-"+str+"-"+str+"-"+str+"-"+str+str+str);
      },
      spspRemove(file, fileList){
        this.spspfildDatas = fileList
      },
      spspRequest(files){
        let fm = new FormData();
        fm.append('file',files.file);
        this.$api.uploadFile2(fm).then(res=>{
          if(res.code == 1){
            let datas = res.data
            datas.file_remarks = datas.remarks
            delete datas.remarks
            let fildObj = datas
            fildObj.file_id = this.uuidsID
            fildObj.name = fildObj.file_yname
            fildObj.file_mjlx = '3301'
            this.spspfildDatas.push(fildObj)
          }
        })

      },
      spscRemove(file, fileList){
        this.spscfildDatas = fileList
      },
      spscRequest(files){
        let fm = new FormData();
        fm.append('file',files.file);
        this.$api.uploadFile2(fm).then(res=>{
          if(res.code == 1){
            let datas = res.data
            datas.file_remarks = datas.remarks
            delete datas.remarks
            let fildObj = datas
            fildObj.file_id = this.uuidsID
            fildObj.name = fildObj.file_yname
            fildObj.file_mjlx = '3302'
            this.spscfildDatas.push(fildObj)
          }
        })

      },
      fjRemove(file, fileList){
        this.fjfildDatas = fileList
      },
      fjRequest(files){
        let fm = new FormData();
        fm.append('file',files.file);
        this.$api.uploadFile2(fm).then(res=>{
          if(res.code == 1){
            let datas = res.data
            datas.file_remarks = datas.remarks
            delete datas.remarks
            let fildObj = datas
            fildObj.file_id = this.uuidsID
            fildObj.name = fildObj.file_yname
            fildObj.file_mjlx = '3303'
            this.fjfildDatas.push(fildObj)
          }
        })

      },

      resizeSearch(){
        this.searchForm = {pmmtgcspsqs_htbh:'',jcrq:'',}
      },
      selectable2:function(row, index){   //禁用第四个
        if(row.pmmtgcspsqs_spzt ==='4001'){
          return true
        }else{
          return false
        }

      },
      changeSelectXmmc(val){
        this.lmshForm.pmmtgcspsqs_gcmc = val.xmmc
        this.lmshForm.pmmtgcspsqs_cbdw = val.cbdw
        this.htbh = val.xmbh
        this.lmshForm.pmmtgcspsqs_gldw = val.gldw
        // this.detailList.dwmc = val.cbdw
        // this.detailList.htbh = val.xmbh
      },
      initqueryXMBH(){
        this.$api.getmcbhList2().then(res=>{
          if(res.code == 1){
            this.restaurantsBH = res.data&&res.data.length?res.data:[]
            if (config.userInfo.userType&&config.userInfo.userType =='供应商') {

              this.search(1, 10,this.restaurantsBH[0])
            } else {
              this.search(1, 10)
            }
          }else{
            this.restaurantsBH = []
          }

        })
      },
      searchXMBH(val){
        this.$api.getXmbhmhList({xmbh:val}).then(res=>{
          if(res.code == 1){
            this.dialogData = res.data&&res.data.length?res.data:[]
          }else{
            this.dialogData = []
          }
        })
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


          if (this.xmmcOfadd ==1) {
            // this.lmshForm.pmmtgcspsqs_gcmc = val.XMMC
            this.getxmmessage(val.XMMC)
          } else {
            this.searchForm.xmmc = val.XMMC
            this.searchForm.pmmtgcspsqs_htbh = val.XMBH
          }
        }
      },
      querySearchBH(queryString, cb) {
        let  restaurants = this.restaurantsBH;
        let results = queryString ? restaurants.filter(this.createFilter(queryString,'XMBH')) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString,val) {
        return (restaurant) => {
          return (restaurant[val].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelectBH(item){

        this.searchForm.xmmc = item.XMMC
        this.searchForm.pmmtgcspsqs_htbh = item.XMBH




        /*      this.$api.getXmbhtomcList({xmbh:item.XMBH}).then(res=>{
                if(res.code == 1){
                  this.searchForm.xmmc = res.data?res.data[0].XMMC:''
                }else{
                  this.searchForm.xmmc = ''
                }
              })*/
      },

      initUser(){
        let userInfo = JSON.parse(localStorage.getItem('userMsg'))[0]
        if(userInfo){

          if(userInfo){
            this.userInfo.yhbm = userInfo.userCode
            this.userInfo.yhid = userInfo.userId
            this.userInfo.yhmc = userInfo.userName
            this.userInfo.userType = userInfo.userType
            if(userInfo.userType == '供应商'){
              this.userInfo.isWaixie = true
              this.isSP = false
            }else{
              this.userInfo.isWaixie = false
              this.isSP = true
            }
            let deptList = userInfo.deptList
            let bminfo = deptList[0]

            if(bminfo){
              this.userInfo.bmbh = bminfo.deptCode
              this.userInfo.bmid = bminfo.deptId
              this.userInfo.bmmc = bminfo.deptName
              let org = bminfo.org
              if(org){
                this.userInfo.orgbh = org.orgCode
                this.userInfo.orgid = org.orgId
                this.userInfo.orgmc = org.orgName
              }
            }
          }

        }
      },

      updateFormDia (row, index,type) {
        console.log(row,'==row')
          // this.isSP = false
          this.xmmcOfadd = 0
          this.showTgdw = row.sfwtgld === '是'? true:false
          this.showDetail = true
          this.isadd = false
          this.showxq = false
          this.uuidsID = row.pmmtgcspsqs_id
          this.lmshForm = JSON.parse(JSON.stringify(row))
          this.index = index
          this.htbh = {
            htbh: row.pmmtgcspsqs_htbh
          }
          this.spspfildDatas = []
          this.spscfildDatas = []
          this.fjfildDatas = []
          this.$api.getFilesDataById2({id:row.pmmtgcspsqs_id}).then(res=>{
            if(res.code == 1){
              let datas = res.data
              datas.forEach(item =>{
                item.name = item.file_yname
                if(item.file_mjlx== '3301'){
                  this.spspfildDatas.push(item)
                }else if(item.file_mjlx== '3302'){
                  this.spscfildDatas.push(item)
                }else{
                  this.fjfildDatas.push(item)
                }
              })
              // this.currentFils = res.data
            }else{
              // this.currentFils = []
            }
          })


      },
      showBhFormDia (row) {
        // this.isSP = true
        this.showDetail = true
        this.showxq = true
        this.lmshForm = JSON.parse(JSON.stringify(row))

        this.spspFils = []
        this.spscFils = []
        this.fjFils = []
        this.$api.getFilesDataById2({id:row.pmmtgcspsqs_id}).then(res=>{
          if(res.code == 1){
            let datas = res.data
            datas.forEach(item =>{
              if(item.file_mjlx== '3301'){
                this.spspFils.push(item)
              }else if(item.file_mjlx== '3302'){
                this.spscFils.push(item)
              }else{
                this.fjFils.push(item)
              }
            })
            // this.currentFils = res.data
          }else{
            // this.currentFils = []
          }
        })
      },
      search (currentPage, pageSize,val) {
        this.showSearch = false
        if (this.searchForm.jcrq) {
          this.searchForm.ksrq = this.searchForm.jcrq[0]
          this.searchForm.jsrq = this.searchForm.jcrq[1]
        }


        let {orgid,yhid,bmid} = this.userInfo
        let xmbhOfinit = {}
        if (val) {
          xmbhOfinit = val
          if(val){
            this.searchForm.pmmtgcspsqs_htbh = val.XMBH
          }
        } else {
          if(config.userInfo.userType&&config.userInfo.userType =='供应商') {
            if(this.restaurants&&this.restaurants.length){
              xmbhOfinit = this.restaurants[0]
              this.searchForm.pmmtgcspsqs_htbh = xmbhOfinit.XMBH
            }

          } else {
            xmbhOfinit.XMBH = ''
            this.searchForm.pmmtgcspsqs_htbh = undefined
          }
        }
        let {ksrq,jsrq,pmmtgcspsqs_htbh} = this.searchForm

        this.$api.getSpsqdList({
          pageNum:currentPage,
          pageSize,
          ksrq,
          jsrq,
          daZzid:orgid,
          pmmtgcspsqs_htbh: pmmtgcspsqs_htbh}).then(resp => {
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
        let self = this
        let fileList = []
        let {orgbh,orgid,orgmc,bmbh,bmid,bmmc,yhbm,yhid,yhmc} = this.userInfo
        let obj = {
          daBmbm:bmbh ,
          daBmid:bmid ,
          daBmmc:bmmc ,
          daYhbm: yhbm,
          daYhid:yhid ,
          daYhmc: yhmc,
          daZzbh:orgbh ,
          daZzid:orgid ,
          daZzmc:orgmc ,
          pmmtgcspsqs_id:self.uuidsID,
          pmmtgcspsqs_spzt:'4001',
        }
        Object.assign(this.lmshForm, obj)
        console.log(this.lmshForm,'==lmshForm')
        this.$refs[formName].validate((valid)=>{
          if(valid) {
            if(this.fjfildDatas.length||this.spscfildDatas.length||this.spspfildDatas.length){
              let fildDatas = self.fjfildDatas.concat(self.spscfildDatas).concat(self.spspfildDatas)
              this.$api.addFileData(fildDatas).then(res=>{
                if(res.data.code == 1){
                }else{
                  this.$message({
                    message: '图片上传失败',
                    type: 'info'
                  });
                }
              })
            }
            this.$api.addSpsqsForJlzf(this.lmshForm).then(res => {
              if (res.data.code === 1) {
                this.showDetail = false
                this.isadd = false
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
          }
        })

      },
      updateSubmit () {
        let self = this
        let fileList = []
 /*       this.$refs.uploada.uploadFiles.map(item => {
          item.response.data.file_id = this.lmshForm.pmmtgcspsqs_djbh
          item.response.data.file_mjlx = 'fj'
          fileList.push(item.response.data)
        })
        this.$refs.uploadb.uploadFiles.map(item => {
          item.response.data.file_id = this.lmshForm.pmmtgcspsqs_djbh
          item.response.data.file_mjlx = 'scyjs'
          fileList.push(item.response.data)
        })
        this.$refs.uploadc.uploadFiles.map(item => {
          item.response.data.file_id = this.lmshForm.pmmtgcspsqs_djbh
          item.response.data.file_mjlx = 'spyjs'
          fileList.push(item.response.data)
        })*/
        let dataList = {
          dataList: fileList
        }


          if(this.fjfildDatas.length||this.spscfildDatas.length||this.spspfildDatas.length){
            let fildDatas = self.fjfildDatas.concat(self.spscfildDatas).concat(self.spspfildDatas)
            this.$api.addFileData(fildDatas).then(res=>{
              self.fjfildDatas = []
              self.spscfildDatas = []
              self.spspfildDatas = []
              if(res.data.code == 1){
              }else{
                this.$message({
                  message: '图片上传失败',
                  type: 'info'
                });
              }
            })
          }else{
            this.$api.deleteFilesById2({ids:self.uuidsID}).then(res=>{
              if(res.code == 1){

              }else{
                this.$message({
                  message: '图片上传失败',
                  type: 'info'
                });
              }
              })
          }

        this.$api.editSpsqsForJlzf(this.lmshForm).then(res => {
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
              djbharr = djbharr + item.pmmtgcspsqs_djbh + ','
            })
            djbharr = djbharr.slice(0, djbharr.length - 1)
            this.$api.delSpsqsForJlzf('?pmmtgcspsqs_djbhs=' + djbharr).then(res => {
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
          this.$message({type: 'warning', message: '请选择要删除的数据'})
        }
      },
      shenhe (row, index) {
        let {yhmc,yhid,bmmc,orgmc} = config.userInfo

        this.$confirm('是否提交审批?',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$api.createWorkFlow({
              pc_initiator:yhmc,
              pc_initiatorid: yhid,
              pc_name: '06',
              pc_project_id: row.pmmtgcspsqs_id,
              pc_remarks: '',
              pc_state: '',
            },{
              group:bmmc,
              org:orgmc}).then(resp=>{
              if(resp.code == 1){
                this.$api.spSpsqsForJlzf({},{spzt:'4002',ids:row.pmmtgcspsqs_id})
                  .then(res=>{
                    if(res.code == 1){
                      this.search(this.currentPage, this.pageSize)
                      this.resetForm()
                      this.$message({
                        type: 'success',
                        message: '提交成功!'
                      });
                    }else{
                      this.$message({
                        type: 'info',
                        message: '提交失败!'
                      });
                    }
                  })
              }else{
                this.$message({
                  type: 'info',
                  message: resp.msg
                });
              }
            })

          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交审批'
            });
          });
      },
      daoru () {
        for (var i = 0; i < 4; i++) {
          this.tableData.push({
            djbh: '234243415',
            famc: '路况评定',
            sjxx: '2018/12/11',
            sjsx: '2018/12/11',
            tbr: '张三',
            tbsj: '2018/12/11',
            tbdw: '甬台温高速',
            tbbm: '技术部',
            bz: '11111',
            sfsh: '0'
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
          xcfx: '上行',
         pmmtgcspsqs_sqrq : ''
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
      selectHt (value) {

        this.lmshForm.pmmtgcspsqs_htbh = value.htbh
        this.lmshForm.pmmtgcspsqs_gldw = value.xmgldw
        this.lmshForm.pmmtgcspsqs_cbdw = value.yh_cbdw
        this.lmshForm.pmmtgcspsqs_gcmc = value.gj_cgxmmc
      }
    },
    mounted () {
      this.initUser()
      this.initqueryXMBH()
     // this.initqueryXMMC()
      this.$api.getHtxxRelatedAll('').then(res => {
        this.htList = res.data.data
      })

      this.tableHeight = $('#spsqs')[0].offsetHeight
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #spsqs{
    position: relative;
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    overflow: auto;
    .uploadFiles{
      .el-upload-list{
      /*  display: inline-block;
        vertical-align: middle;*/
        .el-upload-list__item{
          width: 100%;
          margin-right: 10px;
          border: 0;
          float: none;
        }
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
          &:nth-last-of-type(1){
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
