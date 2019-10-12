/**
* ----竣工验收
*/
<template>
  <div id="zqcwzfzs" style="height: 100%" v-loading="loading">
    <div class="header" v-show="!showDetail">
      <span class="headerTit">竣工验收</span>
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
          <el-form-item class="" label="项目名称" prop="xmmc">
            <el-autocomplete
              class="inline-input"
              size="mini"
              v-model="searchForm.xmmc"
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
            <el-button size="mini" @click="search(1, 10)"  style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
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
          :selectable='selectable2'
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="50">
        </el-table-column>

        <el-table-column align="left" sortable prop="jssbh" label="决算书编号" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="xmmc" label="项目名称" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="xmbh" label="合同编号" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="cbdw" label="承包单位" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="jldw" label="监理单位" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="gldw" label="管理单位" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="xmzje" label="合同金额" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="bz" label="备注" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable label="状态"  show-overflow-tooltip>
          <template scope="scope">
            <span   v-if="scope.row.spzt==='4001'">自由</span>
            <span  v-if="scope.row.spzt==='4002'">审批中</span>
            <span  v-if="scope.row.spzt==='4003'">已审批</span>

          </template>
        </el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="120">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" v-if="scope.row.spzt =='4001'" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" v-if="scope.row.spzt =='4001'" @click="shenhe(scope.row)">提交</span>
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
    <div class="tabArea" v-if="showDetail"  @close="resetForm">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild"  @click="showDetail = false;activeName2 = 'first'"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>竣工验收</span>
        </p>
      </div>

      <div class="dialog_warp">
        <div  style="font-size: 0" v-show="seeDetails === 0">
          <p class="addJLD2">
            <span class="addJLD_tit3">决算书编号</span>
            <el-input size="mini" :disabled="true" type="text" v-model="lmshForm.jssbh"></el-input>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">工程名称</span>
            <el-select  :disabled="showxq" size="mini" style="width: 100%;" v-model="lmshForm.xmmc" value-key="xmbh" placeholder="请选择" @change="selectHt">
              <el-option v-for="(item,index) in htList" :key="index" :label="item.XMMC" :value="item"> </el-option>
            </el-select>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">项目编号</span>
            <el-input size="mini" :disabled="true" type="text" v-model="lmshForm.xmbh"> </el-input>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">承包单位</span>
            <el-input size="mini" :disabled="true" type="text" v-model="lmshForm.cbdw"> </el-input>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">管理单位</span>
            <el-input size="mini" :disabled="true" type="text" v-model="lmshForm.gldw"> </el-input>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">监理单位</span>
            <el-input size="mini" :disabled="true" type="text" v-model="lmshForm.jldw"> </el-input>
          </p>

          <p class="addJLD2">
            <span class="addJLD_tit3">备注</span>
            <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.bz"></el-input>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">合同金额(元)</span>
            <el-input size="mini" :disabled="true" type="text" v-model.number="lmshForm.xmzje"></el-input>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">结算金额(元)</span>
            <el-input size="mini" :disabled="showxq" type="text" v-model.number="lmshForm.jsje"></el-input>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">质保金(元)</span>
            <el-input size="mini" :disabled="showxq" type="text" v-model.number="lmshForm.zbj"></el-input>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">质量缺陷扣款(元)</span>
            <el-input size="mini" :disabled="showxq" type="text" v-model.number="lmshForm.zlqxkk"></el-input>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">决算金额(元)</span>
            <el-input size="mini" :disabled="showxq" type="text" v-model.number="lmshForm.juesje"></el-input>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">完成合同百分比</span>
            <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.wcht"></el-input>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">决算后应支付金额(元)</span>
            <el-input size="mini" :disabled="showxq" type="text" v-model.number="lmshForm.jshzf"></el-input>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">工程内容简述及验收情况</span>
            <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.gcnr"></el-input>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">验收意见</span>
            <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.ysyj"></el-input>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">编制单位</span>
            <el-input  size="mini" :disabled="showxq" type="text" v-model="lmshForm.dwmc"></el-input>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">编制部门</span>
            <el-input  size="mini" :disabled="showxq" type="text" v-model="lmshForm.bmmc"></el-input>
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
        <div v-show="seeDetails === 1">
          <p class="addJLD" v-for = '(item, keyname) in labelnameObj'>
            <span class="inputlabel" style="width:9.5rem;">{{item}} ：</span>
            <span class="spanwidth">{{lmshForm[keyname]}}</span>
          </p>
          <div style="margin-top:20px;margin-left: 13px;font-size: 14px;">
            <span>文件列表 ：</span>
            <a style="margin-right: 20px;" v-for="(files,index) in fildDatas" target="_blank" :key="index" :href="files.file_path">{{files.file_yname}}</a>
          </div>
        </div>
        <div class="zibnr" v-if="seeDetails === 1" style="overflow-x: auto;overflow-y: hidden;">

          <el-tabs   v-model="activeName2" max-height="150" style="margin-bottom: 20px;">
            <el-tab-pane   label="养护工程项目概况表" name="first">
              <div style="font-size: 0;" v-for="(item,index) in yhgcgkData" :key="index">
                <p class="addJLD2">
                  <span class="addJLD_tit3">养护工程名称:</span>
                  <span>{{item.yhgcmc}}</span>
                </p>
                <p class="addJLD2">
                  <span class="addJLD_tit3">桩号、位置:</span>
                  <span>{{item.zhwz}}</span>
                </p>
                <p class="addJLD2">
                  <span class="addJLD_tit3">计划实施开始时间:</span>
                  <span>{{item.jhkssj}}{{item.jhjssj}}</span>
                </p>
                <p class="addJLD2">
                  <span class="addJLD_tit3">计划实施结束时间:</span>
                  <span>{{item.sjkssj}}{{item.sjjssj}} </span>
                </p>
                <p class="addJLD2">
                  <span class="addJLD_tit3">计划审批单位、时间、文号:</span>
                  <span>{{item.jhspdwsjwh}}</span>
                </p>

                <p class="addJLD2">
                  <span class="addJLD_tit3">开工报告批准时间:</span>
                  <span>{{item.kgbgpzsj}}</span>
                </p>
                <p class="addJLD2">
                  <span class="addJLD_tit3">交工验收时间及评定:</span>
                  <span>{{item.jgsjjpd}}</span>
                </p>
                <p class="addJLD2">
                  <span class="addJLD_tit3">竣工验收时间及评定:</span>
                  <span>{{item.jungsjjpd}}</span>
                </p>
                <p class="addJLD2">
                  <span class="addJLD_tit3">设计单位:</span>
                  <span>{{item.sjdw}}</span>
                </p>
                <p class="addJLD2">
                  <span class="addJLD_tit3">监理单位:</span>
                  <span>{{item.jldw}}</span>
                </p>
                <p class="addJLD2">
                  <span class="addJLD_tit3">施工单位:</span>
                  <span>{{item.sgdw}}</span>
                </p>
                <p class="addJLD2">
                  <span class="addJLD_tit3">工程质量监督部门:</span>
                  <span>{{item.gczljdbm}}</span>
                </p>
              </div>
            </el-tab-pane>
            <el-tab-pane style="height: calc(100%);" label="竣工决算单" name="second">
              <el-table  :data="jgjsData" tooltip-effect="dark"
                         style="width: calc(100% - 26px);margin: auto;"
                         height="100%"
                         row-class-name="row_class"
                         border>
                <el-table-column
                  type="index"
                  align="center"
                  label="序号"
                  width="50">
                </el-table-column>
                <el-table-column align="center"  prop="zmbh" label="子目编号"></el-table-column>
                <el-table-column align="center"  prop="zmmc" label="子目内容"></el-table-column>
                <el-table-column align="center"  prop="jldw" label="计量单位"></el-table-column>
                <el-table-column align="center" prop="dj"   label="单价"></el-table-column>
                <el-table-column align="center" label="合同数量">
                  <el-table-column align="center"  prop="htsl" label="数量"></el-table-column>
                  <el-table-column align="center"  prop="htje" label="金额"></el-table-column>
                </el-table-column>
                <el-table-column align="center"  label="实际完成">
                  <el-table-column align="center"  prop="sjwcsl" label="数量"></el-table-column>
                  <el-table-column align="center"  prop="sjwcje" label="金额"></el-table-column>
                </el-table-column>
                <el-table-column align="center" prop="ljwdzht"  label="累计完成占合同%"> </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="计量支付汇总表" name="third">
              <el-table  :data="jlzfhzData" tooltip-effect="dark"
                         style="width: calc(100% - 26px);margin: auto;"
                         row-class-name="row_class"
                         border>
                <el-table-column
                  type="index"
                  align="center"
                  label="序号"
                  width="50">
                </el-table-column>
                <el-table-column align="center"  prop="zfqh" label="支付期号"></el-table-column>
                <el-table-column align="center"  prop="jlje" label="计量金额（元）"></el-table-column>
                <el-table-column align="center"  prop="yzfje" label="已支付金额（元）"></el-table-column>
                <el-table-column align="center"  prop="zfsj" label="支付时间"></el-table-column>
                <el-table-column align="center"  prop="bz" label="备注"></el-table-column>
              </el-table>
            </el-tab-pane>

          </el-tabs>

        </div>
        <div class="dialog_footer" v-if="!showxq">
          <el-button size="mini" v-if="isadd"  style="background-color: #DF4D4A;border-color: transparent;color: #fff" class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="mini" v-if="!isadd"  style="background-color: #DF4D4A;border-color: transparent;color: #fff" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
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
        yhgcgkData:[],
        jgjsData:[],
       jlzfhzData:[],


        datatypes:'',
        dialogData:[],
        dialogTableTit:{
          XMMC:'项目名称',XMBH:'项目编号',
        },
        dialogVisible:false,
        restaurants:[],
        zqzfData: [],
        labelnameObj: {
          jssbh: '决算书编号',
          xmmc: '工程名称',
          xmbh: '项目编号',
          cbdw: '承包单位',
          gldw: '管理单位',
          jldw: '监理单位',
          fj: '附件',
          bz: '备注',
          xmzje: '合同金额(元)',
          jsje: '结算金额(元) ',
          zbj: '质保金(元)',
          zlqxkk: '质量缺陷扣款(元)',
          juesje: '决算金额(元)',
          wcht: '完成合同百分比',
          jshzf: '决算后应支付金额(元)',
          gcnr: '工程内容简述及验收情况',
          ysyj: '验收意见',
          dwmc: '编制单位',
          bmmc: '编制部门'
        },
        seeDetails: 2,
        jlzfhzbTit:{zmbh:'子目编号',zmmc:'子目名称',dw:'单位',dj:'单价(元)',sl:'数量',je:'金额(元)'},

        activeName2:'first',
        lmshForm: {
          zmbs: [{}],
          zbj:0,
          jsje:0
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
        tableData1: [],
        showBhForm: false,
        searchCriteria: false,
        qmbbOptions: [],
        roadOptions: [],
        fileList: [],
        searchForm: {},
        currentPage: 1,
        pageSize: 10,
        total: 0,
        personelForm: {},
        showDetail: false,
        multipleSelection: [],
        htbh: {},
        htList: [],
        tabindex: 0,
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
      handleSelectMC(item){
        //getXmmcList
        this.searchForm.xmmc = item.XMMC
        this.searchForm.xmbh = item.XMBH
      },
      querySearchMC(queryString, cb) {
        let  restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString,'XMMC')) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      closeDialog(val){
        this.dialogVisible = false
        if(val){
          this.searchForm.xmmc = val.XMMC
          this.searchForm.xmbh = val.XMBH
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
          this.searchForm.xmmc = val.XMMC
          this.searchForm.xmbh = val.XMBH
        }
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
      selectable2(row, index){   //禁用第四个
        if(row.spzt ==='4001'){
          return true
        }else{
          return false
        }

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
      resizeSearch(){
        this.searchForm = {lxcode:'',xcfx:'',jcrq:''}
      },
      getfilebyid () {
        this.$api.getFilesDataById('?id=' + this.lmshForm.djbh).then(res => {
          this.fileList = res.data.data
          this.fileList.map(item => {
            item.name = item.file_yname
          })
        })
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
      changeFile (file, fileList) {},
      showAdd () {
        this.showDetail = true
        this.seeDetails = 0
        this.showxq = false
        this.isadd = true

        this.lmshForm = {
            zmbs: [{}],
            zbj:0,
            jsje:0
        }
        this.uuidsID = this.uuid()
        this.lmshForm.id =  this.uuidsID
        this.formId = 'jgjss' + new Date().getTime()
        this.lmshForm.jssbh = this.formId
        let {daBmmc,daZzmc} = this.userInfo
        this.lmshForm.dwmc = daZzmc
        this.lmshForm.bmmc = daBmmc
        this.$api.getmcbhList2().then(res=>{
          if(res.code == 1){
            this.htList = res.data
          }else{
            this.htList = []
          }
        })
      },
      updateFormDia (row, index) {
        this.fildDatas = []
        this.uuidsID = row.id
        this.seeDetails = 0
        this.showDetail = true
        this.isadd = false
        this.showxq = false
        this.lmshForm = row
        this.lmshForm.xmzje = parseFloat(this.lmshForm.xmzje)
        this.lmshForm.jsje = parseFloat(this.lmshForm.jsje)
        this.lmshForm.zbj = parseFloat(this.lmshForm.zbj)
        this.lmshForm.zlqxkk = parseFloat(this.lmshForm.zlqxkk)
        this.lmshForm.juesje = parseFloat(this.lmshForm.juesje)
        this.lmshForm.jshzf = parseFloat(this.lmshForm.jshzf)

        this.lmshForm.xmmc = row.xmmc

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
        this.$api.getmcbhList2().then(res=>{
          if(res.code == 1){
            this.htList = res.data

          }
        })

        this.index = index

      },
      showBhFormDia (row) {
        this.fildDatas = []
        this.showDetail = true
        this.seeDetails = 1
        this.showxq = true
        this.lmshForm = JSON.parse(JSON.stringify(row))
        this.htbh = row.xmmc
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
        this.$api.getJungDetailed({id:row.id}).then(res=>{
          if(res.code == 1){
            if (res.data) {
              this.yhgcgkData = res.data.yhgcxmgkbList
              this.jgjsData = res.data.jungjsdList
              this.jlzfhzData = res.data.jlzfhzbList
              // this.jlmxList = res.data.jlmxList
              // this.huizongData = res.data.mx3List
            }
          }
        })
      },
      search (currentPage, pageSize) {
        let {daZzid,daBmid,daYhid,userType} = this.userInfo
        if(userType&&userType =='供应商'){
          if( this.restaurants.length){
            if(this.restaurants[0].XMBH){
              this.searchForm.xmbh = this.restaurants[0].XMBH
            }
          }
        }
        this.showSearch = false
        if (this.searchForm.jcrq) {
          this.searchForm.ksrq = this.searchForm.jcrq[0]
          this.searchForm.jsrq = this.searchForm.jcrq[1]
        }

        let {ksrq,jsrq,xmbh} = this.searchForm
        this.$api.getJungList2({pageNum:currentPage,pageSize,daZzid,daBmid,daYhid,xmbh,startDate:ksrq,endDate:jsrq}).then(resp => {

          this.loading = false
          if(resp.code == 1){

            this.tableData = resp.data.rows
            this.total = resp.data.totle
          }else{
            this.tableData = []
            this.total = 0
          }
        }).catch(e => {
          this.loading = false
        })
      },
      addSubmit () {
        this.lmshForm.bmid = this.userInfo.daBmid
        this.lmshForm.bmbh = this.userInfo.daBmbm
        this.lmshForm.tbr = this.userInfo.daYhmc
        this.lmshForm.spzt = '4001'
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
        this.lmshForm.tbrq = clock
        Object.assign(this.lmshForm,this.userInfo)

        if(this.fildDatas.length){
          this.$api.addFileData(this.fildDatas).then(res=>{
            if(res.data.code == 1){
            }else{
              this.$message({
                message: '文件上传失败',
                type: 'info'
              });
            }
          })
        }
        if(this.lmshForm.xmmc){
          this.$api.insertJung(this.lmshForm).then(res => {

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
        this.$api.updateJung(this.lmshForm).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '编辑成功!'
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
            // djbharr = djbharr.slice(0, djbharr.length - 1)
            this.$api.deleteJung({id:djbharr}).then(res => {
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
          form.pmmtjgjssmx_spzt = '已下发'
          this.$api.createWorkFlow({
            pc_initiator:yhmc,
            pc_initiatorid: yhid,
            pc_name: '12',
            pc_project_id: row.id,
            pc_remarks: '',
            pc_state: '',
          },{
            group:bmmc,
            org:orgmc}).then(resp=>{
              if(resp.code == 1){
                this.$api.updateJungSpzt({id:row.id,spzt:"4002"}).then(res => {
                  if (res.code === 1) {
                    this.$message({
                      type: 'success',
                      message: '审核通过!'
                    })
                    this.search(this.currentPage, this.pageSize)
                    this.resetForm()
                  }else{
                    this.$message({
                      type: 'info',
                      message: res.msg
                    })
                  }
                })
              }else{
                this.$message({
                  type: 'info',
                  message: res.msg
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
          zmbs: [{}],
          zbj:0,
          jsje:0
        }
        this.activeName2 = 'first'
        this.huizongData = []
        this.cwbbList = []
        this.jlmxList = []
        this.htbh = {}
      },
      addzibiao () {
        this.lmshForm.zmbs.push({mid: this.lmshForm.id})
      },
      deletezibiao (index) {
        this.lmshForm.zmbs.splice(index, 1)
      },
      ceshi () {
        this.$message({
          type: 'error',
          message: '内容格式不符合要求'
        })
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
      tablable (num) {
        this.tabindex = num
      },
      uuid(){
        let str = (((1+Math.random())*0x10000)|0).toString(16).substring(1)
        return (str+str+"-"+str+"-"+str+"-"+str+"-"+str+str+str);
      },
      selectHt (value) {

        this.lmshForm.xmmc = value.XMMC
        //合同金额
        this.lmshForm.xmzje = value.HTJE?parseFloat(value.HTJE):0
        this.lmshForm.xmbh = value.XMBH
        this.lmshForm.cbdw = value.CBDW
        this.lmshForm.gldw = value.GLDW
        this.lmshForm.jldw = value.JLDW


        this.$api.getJungBasicData({xmbh:value.XMBH}).then(res=>{
          if(res.code == 1){

            this.zqzfData = res.data
            if (res.data && res.data.length !== 0) {

              this.lmshForm.zbj = res.data.zbj
              this.lmshForm.jsje = res.data.jsje
              // this.cwbbList = res.data.cwbbList
              // this.jlmxList = res.data.jlmxList
              // this.huizongData = res.data.mx3List
              // this.lmshForm.zqcwzfId = res.data.id
            }else{
              this.$message({
                message: '未终期支付，请选择有终期支付的工程',
                type: 'error'
              })
            }
          }else{
            this.$message({
              message: '未终期支付，请选择有终期支付的工程',
              type: 'error'
            })
          }
        })

        /* this.lmshForm.pmmtjgjss_htmc = value.pmmtjgjss_htmc
        this.lmshForm.pmmtjgjss_htbh = value.pmmtjgjss_htbh
        this.lmshForm.pmmtjgjss_gcmc = value.pmmtjgjss_gcmc
        this.lmshForm.pmmtjgjss_cbdw = value.pmmtjgjss_cbdw
        this.lmshForm.pmmtjgjss_gldw = value.pmmtjgjss_gldw
        this.lmshForm.pmmtjgjss_jldw = value.pmmtjgjss_jldw
        this.lmshForm.zmbs = value.zmbs */
      }
    },
    mounted () {
      this.initUser()
      this.initqueryXMMC()
      /*    this.$api.getHtJgInfoByBm('').then(res => {
            this.htList = res.data.data
          })*/

      // this.tableHeight = $('#zqcwzfzs')[0].offsetHeight
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #zqcwzfzs{
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
      .tab_lable{
        margin-bottom: 10px;
        font-size: 12px;
        text-align: left;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #f1f4f7;
        padding: 0 15px;
        p{
          text-align: left;
        }
        span{
          display: inline-block;
          /*border-bottom: 2px solid #00a2fd;*/
          height: 38px;
          margin-right: 20px;
          &:hover{
            border-bottom: 2px solid #00a2fd;
            cursor: pointer;
          }
        }
        .tabselect{
          border-bottom: 2px solid #00a2fd;
        }
      }
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
            padding:0 5px;
            height: 100%;
            line-height: 31px;
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
        .zbxx{
          height: 60px;
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
        position: relative;
        padding: 15px 0 0 0;
        overflow: hidden;
        text-align: center;
        box-sizing: border-box;
        ul{
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 15px;
          li{
            /*width: 1000px;*/
            width: 100%;
            height: 32px;
            float: left;
            box-sizing: border-box;
            border: 1px solid #D5D6D7;
            color: #52575D!important;
            font-size: 12px;
            border-right: none;
            border-bottom: none;
            &:nth-of-type(1){
              height: 60px;
            }
            &:nth-last-of-type(1){
              border-bottom: 1px solid #D5D6D7;
            }
            >span{
              width: calc(100%/10);
              display: inline-block;
              height: 100%;
              float: left;
              line-height: 31px;
              text-align: center;
              background: #F7F8F9;
              border-right: 1px solid #D5D6D7;
              div{
                height: 50%;
              }
              span{
                width: 50%;
                height: 50%;
                display: inline-block;
                float: left;
                border-top: 1px solid #D5D6D7;
                border-right: 1px solid #D5D6D7;
                &:nth-last-of-type(1){
                  border-right: none;
                }
              }
            }
            p{
              width: calc(100%/10);
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
            .tow_linep{
              .el-input{
                width: 50%!important;
                float: left;
                &:nth-of-type(1){
                  border-right: 1px solid #D5D6D7;
                }
                .el-input__inner{
                  padding: 0!important;
                }
              }
            }
          }
        }
        .gchzb{
          li{
            width: 600px;
            >span,p{
              width: calc(100%/6);
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
      .iconwarp{
        text-align: right;
        height: 14px;
        overflow: hidden;
        i{
          color: #1CA4FA;
          margin-left: 10px;
        }
      }
    }
  }
</style>
