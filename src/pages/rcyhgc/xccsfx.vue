/**
* ----启动巡查
*/
<template>
  <div id="xccsfx" style="height: 100%" v-loading="loading">
    <div class="header">
      <span class="headerTit">巡查次数分析</span>
      <div class="header_option">
        <!--<div class="jianlimb" @click="showAdd()"><i class="el-icon-download"> 计划申报</i></div>-->
        <!--<ul>-->
          <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
          <!--<li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>-->
        <!--</ul>-->
      </div>
    </div>
    <div class="conter_table">
      <div class="chaxun" style="">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0;" label="项目名称" prop="" class="">
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
          <el-form-item style="margin-bottom: 0px" label="按年、月、日" prop="" class="">
            <el-select size="mini"  class="" placeholder="请选择" @change="pickerChange" v-model="alxcx">
              <!--<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>-->
              <el-option label="年" value="1"></el-option>
              <el-option label="月" value="2"></el-option>
              <el-option label="日" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="日期选择" prop="" class="">
            <el-date-picker
              v-model="searchForm.ksrq"
              :type="pickerType"
              :value-format="pickerFormat"
              size="mini"
              placeholder="开始时间">
            </el-date-picker>
            <el-date-picker
              v-model="searchForm.jsrq"
              :type="pickerType"
              :value-format="pickerFormat"
              size="mini"
              placeholder="结束时间">
            </el-date-picker>
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
          label="序号"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column align="left" prop="XMMC" sortable label="项目名称" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left"  sortable label="巡查类型" show-overflow-tooltip>
          <template slot-scope="{row,$index}">
            <span>{{xclx[row.XCCS_XCLX]}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column align="left" prop="RQ" sortable label="巡查时间" show-overflow-tooltip> </el-table-column>-->
        <el-table-column align="left" :prop="bzxccs[alxcx]" sortable label="标准巡查次数"> </el-table-column>
        <el-table-column align="left" prop="CS" sortable label="实际巡查次数"> </el-table-column>
        <el-table-column align="left" label="实际占比">
          <template slot-scope="{row}">
            <span style="display: inline-block;">{{(Number(row.CS)/Number(row[bzxccs[alxcx]])*100).toFixed(2)}}%</span>
            <div class="aa" style="display: inline-block;width: 100px;height: 6px;background: #e9f2fb;border-radius:3px;">
               <span :style="{width:Number(row.CS)/Number(row[bzxccs[alxcx]])*100+'%'}" style="float: left;display: inline-block;height: 6px;background: #00da88;border-radius:3px;"></span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <footer class="footer">
      <div style="float: right;padding: 6px">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </footer>
    <el-dialog class="data-dialog el-updata-div" title="添加" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" @close="resetForm">
      <div class="dialog_warp">
        <ul>
          <li>
            <span>巡查类型</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.XCRW_XCLX"></el-input>
            </p>
          </li>
          <li>
            <span>巡查时间</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.XCRW_TBRQ"></el-input>
            </p>
          </li>
          <li>
            <span>标准巡查次数</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.XCCS_RCS"></el-input>
            </p>
          </li>
          <li>
            <span>实际巡查次数</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.QDXC_COUNT"></el-input>
            </p>
          </li>
          <div style="clear: both"></div>
        </ul>
        <div class="dialog_footer" v-if="!showxq">
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="small" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>
    </el-dialog>
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
      xclx:{"1301":'营运巡查',"1302":'养护普通巡查',"1303":'养护专项巡查',},
      pickerType:'year',
      pickerFormat:'yyyy',
      dialogData:[ ],
      dialogTableTit:{
        XMMC:'项目名称',XMBH:'项目编号',
      },
      datatypes:'',
      dialogVisible:false,
      restaurants:[ ],

      lmshForm: {
      },
      total: 0,
      index: '',
      isadd: false,
      submitLoading: false,
      showxq: false,
      showSearch: true,
      loading: false,
      tableHeight: 300,
      tableData: [],
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      roadOptions: [],
      searchForm: {xmmc:'',ksrq:'',jsrq:''},
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      multipleSelection: [],
      bzxccs:['','XCCS_NCS','XCCS_YCS','XCCS_RCS'],
      alxcx: '1',
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
    resizeSearch(){
      this.searchForm = {xmmc:'',ksrq:'',jsrq:''}
      this.alxcx = ''
    },
    pickerChange(){
      this.searchForm.ksrq = ''
      this.searchForm.jsrq = ''
      if(this.alxcx == 1){
        this.pickerType = 'year'
        this.pickerFormat = 'yyyy'
      }else if(this.alxcx == 2){
        this.pickerType = 'month'
        this.pickerFormat = 'yyyy-MM'
      }else if(this.alxcx == 3){
        this.pickerType = 'date'
        this.pickerFormat = 'yyyy-MM-dd'
      }
      this.search (this.currentPage, this.pageSize)
    },
    initqueryXMMC(){
        this.$api.getmcbhList().then(res => {
          if (res.code == 1) {
            this.restaurants = res.data && res.data.length ? res.data : []
          } else {
            this.restaurants = []
          }

          this.search(1, 10)
        })
    },
    handleSelectMC(item){
      //getXmmcList
      this.searchForm.xmmc = item.XMMC
      this.searchForm.xmbh = item.XMBH
    },
    showDialog(bol){
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
    searchXMMC(val){
      this.$api.getXmmcListt({xmmc:val}).then(res=>{
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
    showAdd () {
      this.showDetail = true
      this.showxq = false
      this.isadd = true
    },
    updateFormDia (row, index) {
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.index = index
    },
    showBhFormDia (row) {
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
    },
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
    search (currentPage, pageSize) {
      let {yhbm,userType,orgid,supplierpk,bmid} = this.userInfo
      if(userType&&userType =='供应商'){
        if(this.restaurants.length){
          if( this.restaurants[0].XMBH){
            this.searchForm.xmbh = this.restaurants[0].XMBH
          }
        }

      }
         let {ksrq,jsrq,xmbh} =  this.searchForm
           this.showSearch = false
           let  obj = {
             xmbh,
             orgid:orgid,
             cbdwid:supplierpk&&supplierpk!=='~'?bmid:undefined,
             ksrq:ksrq?ksrq:undefined,
             jsrq:jsrq?jsrq:undefined,
             pageNum:currentPage,
             pageSize:pageSize,
           }
           if (this.alxcx === '1') {
             this.$api.xccsfxqueryYear(obj).then(resp => {
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
           }
           else if (this.alxcx === '2') {
             this.$api.xccsfxqueryMonth(obj).then(resp => {
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
           }
           else if (this.alxcx === '3') {
             this.$api.xccsfxqueryDay(obj).then(resp => {
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
           }

    },
    addSubmit () {
      this.$api.addxccspz(this.lmshForm).then(res => {
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
    },
    updateSubmit () {
      this.$api.updatexccspz(this.lmshForm).then(res => {
        if (res.data.code === 200) {
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
            djbharr = djbharr + item.djbh + ','
          })
          djbharr = djbharr.slice(0, djbharr.length - 1)
          this.$api.xccspzdeletes('?id=' + djbharr).then(res => {
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
    handleSelectionChange (val) {
      this.multipleSelection = val
    },

    handleCurrentChange (val) {
      this.currentPage = val
      this.search(this.currentPage, this.pageSize)
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


  },
  mounted () {
    this.initUser()
    this.pickerChange()
    this.initqueryXMMC()

    // this.getXcRoadOptions()
    this.tableHeight = $('#xccsfx')[0].offsetHeight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #xccsfx{
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
