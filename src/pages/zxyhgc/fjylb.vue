/**
* ----罚金一览表
*/
<template>
  <div id="lkpdlmsh" style="height: 100%" v-loading="loading">
    <div class="header">
      <span class="headerTit">罚金一览表</span>
      <div class="header_option">
        <!--<div class="jianlimb" @click="showAdd()"><i class="el-icon-download"> 计划申报</i></div>-->
        <!--<ul>
          <li class="daoru">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
              :on-success="daoru">
              <i class="el-icon-download"> 导入</i>
            </el-upload>
          </li>
          <li><a href="./static/桥隧构造物.xlsx"><i class="el-icon-upload2" @click="daochu"> 导出</i></a></li>
          &lt;!&ndash;<li @click="searchCriteriaShow()" v-if="!searchCriteria"><b></b><span
            class="iconfont icon-gaojichaxun cal-caozuo"> 高级查询</span></li>
          <li @click="searchCriteriaShow()" v-if="searchCriteria"><b></b><span
            class="iconfont icon-yincangchaxun cal-caozuo"> 隐藏查询</span></li>&ndash;&gt;
        </ul>-->
        <ul>
          <!--<li><a href="./static/桥隧构造物.xlsx"><i class="el-icon-upload2" @click="daochu"> 导出</i></a></li>-->
          <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
          <!--<li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>-->
        </ul>
      </div>
    </div>
    <div class="conter_table">
      <div class="chaxun">



         <el-form :inline="true"   style="display: inline-block;" class="searchForm chaxun">

          <!-- <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
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
          </el-form-item> -->

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
            <el-button size="mini" @click="searchXM" style="background-color: #DF4D4A;border-color:transparent;color: #fff">查询</el-button>
            <el-button size="mini" @click="resizeDate">重置</el-button>
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
          type="index"
          label="序号"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column align="left" prop="XMBH" label="项目编号" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="XMMC" label="项目名称" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="FJ" label="罚金" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="LY" label="来源" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="SJZH" label="日期" sortable show-overflow-tooltip></el-table-column>
        <!-- <el-table-column align="left" prop="BZ" label="备注" sortable show-overflow-tooltip></el-table-column> -->
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
import { returnUserInfo } from '@/helper'

export default {
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
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      roadOptions: [],
      // searchForm: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      personelForm: {},
      showDetail: false,
      multipleSelection: [],


      searchForm:{
          xmmc:'',
          xmbh:'',
          jcrq:'',
          searchTime:'',
          selectType:undefined,
          typeIndex:0,
          selectState:undefined,
          stateIndex:0,
          pageNum:1,
          pageSize:10,
      },
      dialogVisible:false,
      restaurants:[ ],
      restaurantsBH:[ ],
      datatypes:'',
      dialogTableTit:{ //ok
          XMMC:'项目名称',XMBH:'项目编号',
        },
      dialogData:[ // ok
          {xmmc:'甬台温',xmbh:'G48'},
          {xmmc:'贵黄',xmbh:'G56'},
          {xmmc:'桂林',xmbh:'G99'},
        ],
    }
  },
  mounted () {
    this.userInfo = returnUserInfo()
    this.searchXM()
    this.initqueryXMMC()
    this.initqueryXMBH()
    this.tableHeight = $('#lkpdlmsh')[0].offsetHeight
  },
  methods: {
    //标签里面写了但是没有调用
    handleSelectionChange(){

    },
    
    handleSizeChange (val) {
      this.pageSize = val
      this.searchXM()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.searchXM()
    },





     //查询详细情况
    searchXM(){ // 点击查询
      this.$api.getGcysFjylbList({
        daZzid:this.userInfo.daZzid,
        xmbh:this.searchForm.xmbh,
        xmmc:this.searchForm.xmmc,
        pageNum:this.currentPage,
        pageSize:this.pageSize,
        startDate:this.searchForm.jcrq[0]||'',
        endDate:this.searchForm.jcrq[1]||''
      }).then(res=>{
          if(res.status == 200){
            this.tableData = res.data.data.rows
            this.total = res.data.data.totle
          }
      })
    },
     //重置信息
    resizeDate(){
      console.log('sdsads')
      this.searchForm.xmbh = undefined
      this.searchForm.xmmc = undefined
      this.searchForm.searchTime = undefined
      this.searchForm.jcrq[0] =undefined
      this.searchForm.jcrq[1]=undefined
      this.searchXM()
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
     handleSelectMC(item){
       console.log(item,'item')
        // console.log(event,param, '切换项目名称')
        this.searchForm.xmmc = item.XMMC
        this.$api.getXmmctoxmbhList({xmmc:item.XMMC}).then(res=>{
          if(res.code == 1){
            this.searchForm.xmbh = res.data?res.data[0].XMBH:''
          }else{
            this.searchForm.xmbh = ''
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
    initqueryXMBH(){ // 公共查询项目编号
        this.$api.getXmbhList().then(res=>{
          if(res.code == 1){
            this.restaurantsBH = res.data&&res.data.length?res.data:[]
          }else{
            this.restaurantsBH = []
          }

        })
    },
    initqueryXMMC(){
         this.$api.getXmmList().then(res=>{
           if(res.code == 1){
             this.restaurants = res.data&&res.data.length?res.data:[]
           }else{
             this.restaurants = []
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
  },
  components: {
    Dialog
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
