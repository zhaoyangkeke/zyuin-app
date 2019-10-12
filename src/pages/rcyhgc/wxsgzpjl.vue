/**
* ----维修施工照片记录
*/
<template>
  <div id="lkpdlmsh" style="height: 100%" v-loading="loading">
    <div class="header">
      <span class="headerTit">日常养护维修施工照片记录</span>
      <div class="header_option">
        <!--<div class="jianlimb" @click="showAdd()"><i class="el-icon-download"> 计划申报</i></div>-->
        <ul>
          <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
          <!--<li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>-->
        </ul>
      </div>
    </div>
    <div class="conter_table">
      <div class="chaxun" style="" v-if="showSearch">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="项目名称" prop="lxbh">
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="searchForm.htbh"
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
            <el-button size="mini" @click="search(1, 10)" style="background-color: #DF4D4A;border-color:transparent;color: #fff">查询</el-button>
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
        <el-table-column align="left" sortable  prop="HTMC" label="项目名称"  show-overflow-tooltip> </el-table-column>
        <!--<el-table-column align="left" sortable  prop="SGDW" label="施工单位"  show-overflow-tooltip> </el-table-column>-->
        <el-table-column align="left" sortable  prop="BHNAME" label="事件类型" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable  prop="" label="起止点桩号" show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.QZH}}K</span> - <span>{{scope.row.ZZH}}K</span>
          </template>
        </el-table-column>
        <el-table-column align="left" sortable  prop="WXSJ" label="时间"> </el-table-column>
        <el-table-column align="left" sortable  prop="sgq" label="施工前">
          <template scope="scope">
            <img :src="scope.row.SGQZP" @click="showimg=true;imgurl=scope.row.SGQZP" alt="" style="width: 30px;height: 30px">
          </template>
        </el-table-column>
        <el-table-column align="left" sortable  prop="sgq" label="施工中">
          <template scope="scope">
            <img :src="scope.row.SGZZP" @click="showimg=true;imgurl=scope.row.SGZZP" alt="" style="width: 30px;height: 30px">
          </template>
        </el-table-column>
        <el-table-column align="left" sortable  prop="sgh" label="施工后">
          <template scope="scope">
            <img :src="scope.row.SGHZP" alt="" @click="showimg=true;imgurl=scope.row.SGHZP" style="width: 30px;height: 30px">
          </template>
        </el-table-column>
        <!--<el-table-column align="left" sortable class-name="column-caoz" label="操作" width="80">-->
          <!--<template scope="scope">-->
            <!--&lt;!&ndash;<span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>&ndash;&gt;-->
            <!--<span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
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
    <!--<el-dialog class="data-dialog el-updata-div" title="详情" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" @close="resetForm">-->
      <div class="tabArea" v-if="showDetail"  @close="resetForm">
        <div class="detailItem_tit">施工计划申报</div>
        <div class="SPState" v-if="addzb">
          <span class="iconSpan" @click="addzibiao"><i class="el-icon-edit-outline" title="添加" ></i>添加</span>
        </div>
        <!--<div class="closeBTN" @click="showDetail = false"><i class="icon iconfont icon-down"></i></div>-->
      <div class="dialog_warp">
        <ul>
          <li>
            <span>合同编号</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.djbh"></el-input>
            </p>
          </li>
          <li>
            <span>检查日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.sj"
                size="mini"
                type="date"
                :disabled="showxq"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>合同名称</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.famc"></el-input>
            </p>
          </li>
          <li>
            <span>施工单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.tbr"></el-input>
            </p>
          </li>
          <li>
            <span>检查人</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.tbdw"></el-input>
            </p>
          </li>
          <li>
            <span>管理单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.tbbm"></el-input>
            </p>
          </li>
          <li>
            <span>合同金额</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.tbbm"></el-input>
            </p>
          </li>
          <li>
            <span>违约罚金合计</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.tbbm"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>备注</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.bz"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>附件</span>
            <p>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :disabled="showxq"
                :limit="3">
                <i style="color: #00a2fd;" v-if="!showxq" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
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
      </div>
    <!--</el-dialog>-->
    <el-dialog class="data-dialog el-updata-div" title="图片信息"  :visible.sync="showimg" :before-close="handleimgClose" width="880px" @close="resetForm">
      <div class="dialog_warp">
        <img :src="this.imgurl" alt="" style="width: 100%;height: 90%;">
      </div>
    </el-dialog>
    <!--搜索弹窗-->
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
      dialogVisible: false,
      dialogData: [],
      dialogTableTit:{
        XMMC:'项目名称',XMBH:'项目编号',
      },
      datatypes:'',
      restaurants:[],
      imgurl:'',
      total:0,
      lmshForm: {
        xcfx: '上行'
      },
      showimg: false,
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
      searchForm: {
        xmbh: undefined,
        xmmc: undefined,
        jcrq: undefined,
        htbh: undefined,
        pageNum: 1,
        pageSize: 10,
      },
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      multipleSelection: []
    }
  },
  methods: {
    // 关掉照片放大弹框
    handleimgClose () {
      this.showimg = false
    },
    // 远程搜索项目名称list
    initqueryXMMC(){
      this.$api.getmcbhList2().then(res=>{
        if(res.code == 1){
          // console.log(this.restaurants, 8080801111)
          this.restaurants = res.data&&res.data.length?res.data:[]
          if (config.userInfo.userType&&config.userInfo.userType =='供应商') {
            this.search(this.currentPage, this.pageSize, this.restaurants[0])
          } else {
            this.search(this.currentPage, this.pageSize)
          }
        }else{
          this.restaurants = []
        }

      })
    },
    // 项目名称和项目编号的模糊搜索
    searchXMMC(val){
      this.$api.getXmmcListt({xmmc:val}).then(res=>{
        if(res.code == 1){
          this.dialogData = res.data&&res.data.length?res.data:[]
        }else{
          this.dialogData = []
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
    // 关闭弹窗
    closeDialog(val){
      this.dialogVisible = false

      if(val){
        this.searchForm.xmmc = val.XMMC
        this.searchForm.htbh = val.XMBH
      }
    },
    // 打开搜索弹窗
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
    // 远程搜索项目名称
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

    handleSelectMC(item){
      //getXmmcList
      this.searchForm.xmmc = item.XMMC
      this.searchForm.htbh = item.XMBH
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
    search (currentPage, pageSize, val) {
      this.showSearch = true
      if (this.searchForm.jcrq) {
        this.searchForm.ksrq = this.searchForm.jcrq[0]
        this.searchForm.jsrq = this.searchForm.jcrq[1]
      }
      let xmbhOfinit = {}
      //console.log(val, 123456)
      if (val) {
        xmbhOfinit = val
        //console.log(xmbhOfinit, 7777)
      } else {
        if(config.userInfo.userType&&config.userInfo.userType =='供应商') {
          xmbhOfinit = this.restaurants[0]
        } else {
          xmbhOfinit.XMBH = ''
        }
      }
      this.$api.getWxsgzpjl({htbh:this.searchForm.htbh == undefined ? xmbhOfinit.XMBH: this.searchForm.htbh, startDate: this.searchForm.ksrq ? this.searchForm.ksrq : '',endDate: this.searchForm.jsrq ? this.searchForm.jsrq : '',pageNum: currentPage,pageSize: pageSize}).then(resp => {
        this.loading = false
        if (resp.code != 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.tableData = resp.data.rows
          this.total = resp.data.totle
        }
      }).catch(e => {
        this.loading = false
      })
    },
    addSubmit () {
      this.tableData.push(this.lmshForm)
      this.resetForm()
    },
    updateSubmit () {
      this.tableData.splice(this.index, 1, this.lmshForm)
      this.resetForm()
    },
    deleteData () {
      if (this.multipleSelection.length > 0) {
        this.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.tableData.splice(0, this.multipleSelection.length)
          this.$message({
            type: 'success',
            message: '删除成功!'
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
    }
  },
  mounted () {
    this.initqueryXMMC() // 获取项目名称列表
    this.tableHeight = $('#lkpdlmsh')[0].offsetHeight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  #lkpdlmsh{
    position: relative;
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
