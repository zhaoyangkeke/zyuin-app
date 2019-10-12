/**
* ----巡查次数配置
*/
<template>
  <div id="lkpdlmsh" style="height: 100%;position: relative" v-loading="loading">
    <div class="header" v-if="!showDetail">
      <span class="headerTit">巡查次数配置</span>
      <div class="header_option">
        <ul>
          <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
          <li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table">
      <div class="chaxun" style="">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0;" label="项目名称" prop="" class="">
            <el-autocomplete
              class="inline-input"
              size="mini"
              value-key="query"
              v-model="searchForm.xmmc"
              :fetch-suggestions="querySearchMC"
              @select="(item)=>handleSelectMC(item,'1')"
              placeholder="请输入项目名称"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.XMMC }}</div>
              </template>
              <i slot="suffix" @click="showDialog('mc')" class="icon iconfont icon-xiangqing1"></i>
            </el-autocomplete>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="单位名称" prop="" class="">
            <el-autocomplete
              class="inline-input"
              size="mini"
              value-key="query"
              v-model="searchForm.dwmc"
              :fetch-suggestions="querySearchDWMC"
              @select="(item)=>handleSelectMC(item,'2')"
              placeholder="请输入项目名称"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.XMGK_GLDW }}</div>
              </template>
              <i slot="suffix" @click="showDialog('dw')" class="icon iconfont icon-xiangqing1"></i>
            </el-autocomplete>
          </el-form-item>

          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button size="mini" @click="search(1, 10)" style="background-color: #DF4D4A;border-color:transparent;color: #fff">查询</el-button>
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
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column align="left" prop="xmmc" sortable label="项目名称"  show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="xccsDwmc" sortable label="单位名称"  show-overflow-tooltip></el-table-column>

        <!--<el-table-column align="left" prop="xccsDwbh" sortable label="单位编号" show-overflow-tooltip></el-table-column>-->
        <el-table-column align="left"  sortable  label="巡查类型" show-overflow-tooltip>
          <template scope="scope">
            <span>{{xclx[scope.row.xccsXclx]}}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="xccsRcs" sortable label="日巡查次数"></el-table-column>
        <el-table-column align="left" prop="xccsYcs" sortable label="月巡查次数"></el-table-column>
        <el-table-column align="left" prop="xccsNcs" sortable label="年度巡查次数"></el-table-column>
        <el-table-column align="left" prop="xccsNote" label="备注"></el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="80">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <footer class="footer" v-if="!showDetail">
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
    <!--<el-dialog class="data-dialog el-updata-div" title="巡查次数配置" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" @close="resetForm">-->
    <div class="tabArea"  v-if="showDetail"  @close="resetForm">
      <p class="tabAreaTit">
        <span class="titleclasschild" @click="showDetail = false"><i class="icon iconfont icon-arrow-left titleclasschild" @click="isShowDetail = false"></i></span>
        <span>巡查次数配置</span>
      </p>
      <div v-show="!showxq" class="SPState" >
        <el-button size="mini" class="minibtn"  v-if="isadd"  :loading="submitLoading" @click="addSubmit('lmshForm')"
                   style="background: #DF4D4A; border-color:transparent;color: #fff;">保存</el-button>
        <el-button size="mini" class="minibtn"  v-if="!isadd"  :loading="submitLoading" @click="updateSubmit"
                   style="background: #DF4D4A; border-color:transparent;color: #fff;">保存</el-button>


        <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
      </div>

        <el-form style="font-size: 0" :model="lmshForm" :rules="rules" ref="lmshForm" label-width="100px">
          <el-form-item  class="addJLD"  label="项目名称" prop="xmmc">
            <el-autocomplete
              class="inline-input"
              size="mini"
              v-model="lmshForm.xmmc"
              value-key="add"
              :fetch-suggestions="querySearchMC"
              @select="(item)=>handleSelectMC(item,'3')"
              placeholder="请输入项目名称"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.XMMC }}</div>
              </template>
              <i slot="suffix" @click="showDialog('mc')" style="display: inline-block;" class="icon iconfont icon-xiangqing1"></i>
            </el-autocomplete>
          </el-form-item>
          <el-form-item  class=" addJLD"  label="单位名称" prop="dwmc">
            <el-input size="mini"  :disabled="true" type="text"  placeholder="单位名称"  v-model="lmshForm.dwmc"></el-input>
          </el-form-item>
          <el-form-item  class="addJLD"  label="巡查类型" prop="xccsXclx">
            <el-select size="mini" :disabled="showxq" class="" placeholder="巡查类型" v-model="lmshForm.xccsXclx">
              <!--<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>-->
              <el-option label="营运巡查" value="1301"></el-option>
              <el-option label="养护普通巡查" value="1302"></el-option>
              <el-option label="养护专项巡查" value="1303"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  class=" addJLD"  label="日巡查次数" prop="rxccs">
            <el-input size="mini" placeholder="日巡查次数"  :disabled="showxq" v-model.number="lmshForm.rxccs"></el-input>
          </el-form-item>
          <el-form-item  class=" addJLD"  label="月巡查次数" prop="yxccs">
            <el-input size="mini" :disabled="showxq"  placeholder="月巡查次数"   v-model.number="lmshForm.yxccs"></el-input>
          </el-form-item>
          <el-form-item  class=" addJLD"  label="年度巡查次数" prop="nxccs">
            <el-input size="mini" :disabled="showxq" placeholder="年度巡查次数"  v-model.number="lmshForm.nxccs"></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 0;" label="备注" prop="bz">
            <!--<span style="margin-left: -100px;width: 80px;color: #606266;text-align: right">备注</span>-->
            <el-input size="mini" :disabled="showxq" placeholder="备注"  style="width: 75%;vertical-align: middle;" type="textarea" v-model="lmshForm.bz"></el-input>
          </el-form-item>

        </el-form>


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
      xclx:{"1301":"营运巡查","1302":"养护普通巡查","1303":"养护专项巡查",},
      rules:{
        xmmc: [
          { required: true, message: '项目联系人不能为空'},
          { min: 1, message: '输入内容不能为空', trigger: 'blur' }
        ],
        xccsXclx: [
          { required: true, message: '巡查次数不能为空'},
          { min: 1, message: '输入内容不能为空', trigger: 'blur' }
        ],
        dwmc: [
          { required: true, trigger: 'blur', message: '请输入单位名称'},//这里需要用到全局变量
          { min: 1, message: '输入内容不能为空', trigger: 'blur' }
        ],
        rxccs: [
          { required: true, message: '输入内容不能为空', trigger: 'blur' },
          { type: 'number', message: '请输入数字'}
        ],
        yxccs: [
          { required: true, message: '输入内容不能为空', trigger: 'blur' },
          { type: 'number',message: '请输入数字',}
        ],
        nxccs: [
          { required: true, message: '输入内容不能为空', trigger: 'blur' },
          { type: 'number', message: '请输入数字',}
        ],
        bz: [
          { required: false, message: '输入内容不能为空', trigger: 'blur' },
          { message: '请输入数字', }
        ],
      } ,
      isQuery:false,
      dialogData:[ ],
      dialogTableTit:{
        XMMC:'项目名称',XMBH:'项目编号',
      },
      datatypes:'',
      dialogVisible:false,
      restaurants:[ ],
      userMsg:{},
      dwmcData:[],

      lmshForm: {
        xmmc:'',
        dwmc:'',
        rxccs:null,
        yxccs:null,
        nxccs:null,
        bz:'',
        xmbh:'',
        dwbh:'',
        xclx:'',
        id:'',
      },
      total: 0,
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
      dwmcOptions: [],
      searchForm: {
        xmmc:'',
        dwmc:'',
        yhrwdlx:'',
        xmbh:'',
      },
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      dwmc: {},
      showDetail: false,
      multipleSelection: [],
      formId: '',
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
        supplierpk:null,
      },
    }
  },
  methods: {
    initUser(){
      let userInfo = JSON.parse(localStorage.getItem('userMsg'))[0]

      if(userInfo){
        this.userInfo = userInfo
        if(userInfo){
          this.userInfo.yhbm = userInfo.userCode
          this.userInfo.yhid = userInfo.userId
          this.userInfo.yhmc = userInfo.userName
          this.userInfo.userType = userInfo.userType
          let deptList = userInfo.deptList
          let bminfo = deptList[0]
          if(bminfo){
            this.userInfo.supplierpk = bminfo.supplierpk
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
    resizeSearch(){
      this.searchForm = {xmmc:'',dwmc:''}
    },
    initqueryXMMC() {
      this.$api.getmcbhList().then(res => {
        if (res.code == 1) {
          this.restaurants = res.data && res.data.length ? res.data : []
        } else {
          this.restaurants = []
        }
        this.search(1, 10)
      })

    },
    handleSelectMC(item,bol){
      if(bol === '1' ){
        this.searchForm.xmmc = item.XMMC
        this.searchForm.xmbh = item.XMBH
      }else if(bol === '2'){
        this.searchForm.dwmc = item.XMGK_GLDW
      }else if(bol === '3'){
        this.lmshForm.xmmc = item.XMMC
        this.$api.getXxfromDwmc({xmmc:item.XMMC}).then(res=>{
          if(res.code == 1){

            if(res.data&&res.data.length){
              this.lmshForm.dwmc = res.data[0].XMGK_CBDW
              this.lmshForm.dwbh = res.data[0].XMGK_CBDWBH
              this.lmshForm.xmbh = res.data[0].XMGK_XMBH
            }else{
              this.$message({
                message: '无法查找到对应单位',
                type: 'error'
              })
            }
          }else{
            this.$message({
              message: '出错了',
              type: 'error'
            })
          }
        })
      }


    },
    showDialog(bol){
      if(bol == 'mc'){
        this.dialogTableTit = {
          XMMC:'项目名称',XMBH:'项目编号',
        }

          this.$api.getmcbhList().then(res => {
            if (res.code == 1) {
              this.dialogData = res.data && res.data.length ? res.data : []

            } else {
              this.dialogData = []
            }
          })

      }else{
        this.dialogData = this.dwmcData
        this.dialogTableTit = {
          XMGK_GLDW:'单位名称',XMGK_GLDWBH:'单位编号',
        }
      }
      this.dialogVisible = true
      this.datatypes = bol

    },
    querySearchMC(queryString, cb) {
      let  restaurants = this.restaurants;
      let results = queryString ? restaurants.filter(this.createFilter(queryString,'XMMC')) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearchDWMC(queryString, cb) {
      let  dwmcData = this.dwmcData;
      let results = queryString ? dwmcData.filter(this.createFilter(queryString,'XMGK_GLDW')) : dwmcData;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString,val) {
        return (restaurant) => {
          return (restaurant[val].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },
    searchXMMC(val){

      this.$api.getXmmcListt({Code:val}).then(res=>{
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
        if(this.showDetail){
          this.lmshForm.xmmc = val.XMMC
          this.$api.getXxfromDwmc({xmmc:val.XMMC}).then(res=>{
            if(res.code == 1){
              if(res.data&&res.data.length){
                this.lmshForm.dwmc = res.data[0].XMGK_CBDW
                this.lmshForm.dwbh = res.data[0].XMGK_CBDWBH
                this.lmshForm.xmbh = res.data[0].XMGK_XMBH
              }else{
                this.$message({
                  message: '无法查找到对应单位',
                  type: 'error'
                })
              }
            }else{
              this.$message({
                message: '出错了',
                type: 'error'
              })
            }
          })
        }else{
          if(val.XMGK_GLDW){
            this.searchForm.dwmc = val.XMGK_GLDW
          }else{
            this.searchForm.xmmc = val.XMMC
            this.searchForm.xmbh = val.XMBH
          }

        }

      }
    },

    showAdd () {
      this.lmshForm = {
        xmmc:'',
        xmbh:'',
        dwmc:'',
        dwbh:'',
        xccsXclx:'',
        rxccs:'',
        yxccs:'',
        nxccs:'',
        bz:'',
        id:''
      };

      this.showDetail = true
      this.showxq = false
      this.isadd = true
      this.formId = 'xccspz' + new Date().getTime()
      this.lmshForm.xccsId = this.formId
    },
    updateFormDia (row, index) {
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      let self = this
      this.lmshForm = {
          xmmc:row.xmmc,
          xmbh:row.xmbh,
          dwmc:row.xccsDwmc,
          dwbh:row.xccsDwbh,
         xccsXclx:self.xclx[row.xccsXclx],
          rxccs:row.xccsRcs,
          yxccs:row.xccsYcs,
          nxccs:row.xccsNcs,
          bz:row.xccsNote,
          id:row.xccsId
      };


      // this.lmshForm = JSON.parse(JSON.stringify(row))
      this.index = index
    },
    showBhFormDia (row) {
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
    },
    search (currentPage, pageSize) {
        this.showSearch = false
        let self = this
             let {yhbm,orgid,userType} = this.userInfo
      if(userType&&userType =='供应商'){

        if( this.restaurants[0].length){
            if(this.restaurants[0].XMBH){
              this.searchForm.xmbh = this.restaurants[0].XMBH
            }
          }
      }
      let {yhrwdlx,xmmc,dwmc,xmbh} =  this.searchForm
      if (this.searchForm.jcrq) {
        this.searchForm.ksrq = this.searchForm.jcrq[0]
        this.searchForm.jsrq = this.searchForm.jcrq[1]
      }
      this.$api.getXccspzAll({
                pageNum:currentPage,
                pageSize,
                dwmc:dwmc?dwmc.trim():undefined,
                orgid:orgid,
                xmbh:xmbh?xmbh.trim():undefined,
                yhbm:yhbm,} )
                .then(resp => {
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


    guid(){
      let str = (((1+Math.random())*0x10000)|0).toString(16).substring(1)
      return (str+str+"-"+str+"-"+str+"-"+str+"-"+str+str+str);
    },
    addSubmit (formName) {
       let {orgbh,orgid,orgmc,
        bmbh,bmid,bmmc,
        yhbm,yhid,yhmc,supplierpk
      } = this.userInfo
      let {xmmc,xmbh,dwmc,dwbh,xclx,rxccs,yxccs,nxccs,bz,xccsXclx} = this.lmshForm
          this.$refs[formName].validate((valid) => {
            if(valid){
              this.$api.addxccspz({
                xccsId: this.guid(),
                xmmc: xmmc ? xmmc.trim() : undefined,
                xmbh,
                xccsXclx: xccsXclx ? xccsXclx.trim() : undefined,
                xccsNcs: nxccs,
                xccsYcs: yxccs,
                xccsRcs: rxccs,
                xccsDwmc: dwmc ? dwmc.trim() : undefined,
                xccsDwbh: dwbh ? dwbh.trim() : undefined,
                xccsNote: bz,
                orgid: orgid,
                orgbh: orgbh,
                orgmc:orgmc,
                yhbm: yhbm,
                yhid:yhid,
                yhmc: yhmc,
                bmbm: bmbh,
                bmid: bmid,
                bmmc:bmmc,
              }).then(res => {
                if (res.code === 1) {
                  this.search(this.currentPage, this.pageSize)
                  this.resetForm()
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  })

                } else {
                  this.$message({
                    type: 'error',
                    message: res.msg
                  })
                }
              })
            }

          })
    },
    updateSubmit () {
      let {userMsg} = this
      let {xmmc, xmbh,dwmc,dwbh,xclx,rxccs,yxccs,nxccs,id,bz} = this.lmshForm

      if(userMsg){
        let deptList = userMsg.deptList[0]
        if(deptList) {
          let orgId = deptList.org.orgId
          this.$api.updatexccspz({
            xccsId: id, xmmc, xmbh, xccsXclx: xclx, xccsNcs: nxccs, xccsYcs: yxccs, xccsRcs: rxccs, xccsDwmc: dwmc,
            xccsDwbh: dwbh, xccsNote: bz,orgid:orgId,yhbm:userMsg.userCode
          }).then(res => {
            if (res.code == 1) {
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
        }
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

          /* let djbharr = {}
           this.multipleSelection.map((item, index) => {

           djbharr[index] = item.djbh
           }) */
          let djbharr = ''
          this.multipleSelection.map((item, index) => {

            djbharr = djbharr + item.xccsId + ','
          })
          djbharr = djbharr.slice(0, djbharr.length - 1)

          this.$api.xccspzdelete('?xccsId=' + djbharr).then(res => {
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
      this.$confirm('是否通过审核？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.tableData.splice(0, this.multipleSelection.length)
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
    selectdwmc (value) {
      this.lmshForm.xccsDwmc = value.ZZMC
      this.lmshForm.xccsDwbh = value.ZZID
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
      this.$api.commoncreateZzxxList().then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.dwmcOptions = resp.data.data
        }
      }).catch(e => {
      })
    },
    initqueryDWMC() {
      let {supplierpk, orgid} = this.userInfo
      if (supplierpk && supplierpk !== '~') {
        this.$api.getXxBySgdw({cbdwid: supplierpk}).then(res => {
          if (res.code == 1) {
            this.restaurants = res.data && res.data.length ? res.data : []
          } else {
            this.restaurants = []
          }
        })
      } else {
        this.$api.getDwList({gldwid:orgid}).then(res => {
          if (res.code == 1) {
            this.dwmcData = res.data && res.data.length ? res.data : []
          } else {
            this.dwmcData = []
          }
        })
      }
    }
  },
  mounted () {
    this.initUser()
    this.initqueryXMMC()
    this.initqueryDWMC()
    this.getQmldbb()
    // this.search(this.currentPage, this.pageSize)

    // this.getXcRoadOptions()
    this.tableHeight = $('#lkpdlmsh')[0].offsetHeight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #lkpdlmsh{
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
      padding: 20px 40px;
      ul{
        /*li{*/
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
          /*>span{*/
            /*width: 100px;*/
            /*display: inline-block;*/
            /*height: 100%;*/
            /*line-height: 31px;*/
            /*text-indent: 1em;*/
            /*border-right: 1px solid #D5D6D7;*/
            /*background: #F7F8F9;*/
            /*float: left;*/
          /*}*/
          /*p{*/
            /*width: calc(100% - 100px);*/
            /*height: 100%;*/
            /*float: left;*/
            /*.el-input__inner{*/
              /*border: none;*/
              /*text-align: center;*/
            /*}*/
          /*}*/
          /*.radio_line{*/
            /*!*span{*/
              /*display: inline-block;*/
              /*width: 50%;*/
            /*}*!*/
            /*padding: 0 5px;*/
            /*.el-radio__label{*/
              /*font-size: 12px;*/
            /*}*/
          /*}*/
          /*!*.tow_line,.three_line{*/
            /*>span{*/
              /*display: inline-block;*/
              /*text-indent: 5px;*/
              /*float: left;*/
              /*width: 50%;*/
              /*height: 100%;*/
              /*line-height: 31px;*/
              /*.el-input--mini{*/
                /*width: calc(100% - 25px);*/
                /*.el-input__inner{*/
                  /*padding: 0;*/
                /*}*/
              /*}*/
            /*}*/
          /*}*/
          /*.three_line{*/
            /*>span{*/
              /*width: calc(100%/3);*/
            /*}*/
          /*}*!*/
        /*}*/
        /*.tow_line,.three_line,.four_line{*/
          /*width: 100%;*/
          /*border-right: 1px solid #D5D6D7!important;*/
          /*.el-input--mini{*/
            /*width: calc(100% - 60px);*/
          /*}*/
          /*p{*/
            /*>span{*/
              /*border-bottom: 1px solid #D5D6D7;*/
              /*&:last-child{*/
                /*border-bottom: none;*/
              /*}*/
              /*i{*/
                /*display: inline-block;*/
                /*width: 60px;*/
                /*height: 100%;*/
                /*font-style: normal;*/
                /*background: #F7F8F9;*/
                /*float: left;*/
                /*line-height: 32px;*/
                /*text-align: center;*/
              /*}*/
            /*}*/
          /*}*/
        /*}*/
        /*.text_line{*/
          /*width: 100%;*/
          /*border-right: 1px solid #D5D6D7!important;*/
          /*min-height: 64px;*/
          /*height: auto;*/
          /*>span{*/
            /*min-height: 64px;*/
            /*height: 100% !important;*/
          /*}*/
          /*p{*/
            /*min-height: 64px;*/
          /*}*/
          /*.el-upload-list__item{*/
            /*border: none;*/
          /*}*/
        /*}*/
      }
    }
  }
</style>
