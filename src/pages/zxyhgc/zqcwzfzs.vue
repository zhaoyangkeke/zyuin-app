/**
* 专项养护----中(终)期财务支付证书
*/
<template>
  <div id="zqcwzfzs" style="height: 100%" v-loading="loading">
    <div class="exhibition" v-if="showDetail == 0" >
      <div class="header">
        <span class="headerTit">中(终)期财务支付证书</span>
        <div class="header_option">
          <ul>
            <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
            <li @click="showAdd();showDetail == 1"><i class="el-icon-edit-outline"> 添加</i></li>
            <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
          </ul>
        </div>
      </div>
      <div class="conter_table" >
        <div class="chaxun">
          <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">

            <el-form-item class="autocomplete" label="项目名称" prop="htbh">
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
              <el-button size="mini" @click="search(1, 10 ,searchForm)" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
              <el-button size="mini" @click="resizeDate">重置</el-button>

            </el-form-item>
          </el-form>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                  style="width: 100%;height:auto"
                  row-class-name="row_class"
                  border
                  :row-style="{fontFamily: '宋体', fontSize: '12px'}"
                  @selection-change="handleSelectionChange">

          <el-table-column
            type="selection"
            align="center"
            :selectable="selectables"
            width="60">
          </el-table-column>
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="60">
          </el-table-column>
          <el-table-column align="left" prop="xmmc" label="项目名称" sortable show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="zfqh" label="支付期号" sortable show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="jldw" label="监理单位" sortable show-overflow-tooltip></el-table-column>
          <!-- <el-table-column align="left" prop="htmc" label="合同名称" sortable show-overflow-tooltip></el-table-column> -->
          <el-table-column align="left" prop="cbdwmc" label="承包单位" sortable show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="gldw" label="管理单位" sortable show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="tbdwmc" label="填报单位" sortable show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="tbrq" label="填报日期"  sortable show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="djbh" label="状态" width="80"  sortable>
            <template scope="scope">
              <span style="color:#D34C42;cursor: pointer;text-align: left" v-if="scope.row.zt==='3701'" @click="shenhe(scope.row, scope.$index)">未处理</span>
              <span style="color:#00a2fd;text-align: left" v-if="scope.row.zt==='3702'">已下发</span>
            </template>
          </el-table-column>
          <el-table-column align="left" class-name="column-caoz" label="操作" width="80">
            <template scope="scope">
              <span style="color:#00a2fd;cursor: pointer;text-align: left" v-if="scope.row.zt==='3701'" @click="updateFormDia(scope.row, scope.$index);isseedetail = 0">编辑</span>
              <span style="color:#00a2fd;cursor: pointer;text-align: left" @click="showBhFormDia(scope.row);showDetail = 3">详情</span>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <footer class="footer" >
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
    </div>




    <Dialog :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :dialogVisible="dialogVisible"
            @searchXMMC="searchXMMC"
            @searchXMBH="searchXMBH"
            @closeDialog="closeDialog">
    </Dialog>

<!-- 添加编辑 -->
    <div class="zqcftj" v-if="showDetail == 1">
      <div  class="zqcftjHead">
        <p class="zqcftjtit" v-if="!addzb">
          <span class="titleclasschild"  @click="showDetail = 0"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>财务支付证书</span>
        </p>
        <div class="zqcftjbtn" v-if="!showxq">
          <el-button size="mini" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit('jldModel')">保存</el-button>
          <el-button size="mini" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit('jldModel')">保存</el-button>
        </div>
      </div>

      <div class="dialog_warp">
        <div v-if="isseedetail == 0">
           <el-form class="zhubnr"  :model="jldModel"  ref="jldModel" :rules="jldModelRules">

            <el-form-item class="addJLD" label="支付期号">
<!--              <el-input  v-model="jldModel.zfqh" size="mini"  placeholder="请输入内容" disabled></el-input>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.zfqh}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="项目名称" prop="xmmc">
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="jldModel.xmmc"
                :disabled="isseedetail == 1"
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

            <!-- <el-form-item class="addJLD" label="项目名称" prop="region">
              <el-select
                clearable
                :disabled="showxq"
                v-model="htbh"
                value-key="zqcwzf_htbh"
                filterable
                placeholder="请选择"
                @change="selectHt"
                size="mini">
                <el-option
                  v-for="item in htList"
                  :key="item.zqcwzf_htbh"
                  :label="item.zqcwzf_gcmc"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item> -->

            <el-form-item class="addJLD" label="合同编号">
<!--              <el-input  v-model="jldModel.xmbh" size="mini"  placeholder="请输入内容" disabled></el-input>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.xmbh}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="填报日期" prop="tbrq">
              <el-date-picker
                v-model="jldModel.tbrq"
                 required
                size="mini"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>

            <!-- <el-form-item class="addJLD" label="合同编号">
              <el-input  v-model="jldModel.xmbh" size="mini"  placeholder="请输入内容" :disabled="showxq"></el-input>
            </el-form-item> -->

            <el-form-item class="addJLD" label="承包单位">
<!--              <el-input  v-model="jldModel.cbdwmc" size="mini"  placeholder="请输入内容" disabled></el-input>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.cbdwmc}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="管理单位">
<!--              <el-input  v-model="jldModel.gldw" size="mini"  placeholder="请输入内容" disabled></el-input>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.gldw}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="监理单位">
<!--              <el-input  v-model="jldModel.jldw" size="mini"  placeholder="请输入内容" disabled></el-input>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.jldw}}</label>
            </el-form-item>

            <!-- <el-form-item class="addJLD" label="填报单位" prop="tbdwmc">
              <el-input  v-model="jldModel.tbdwmc" size="mini"  placeholder="请输入内容" :disabled="showxq"></el-input>
            </el-form-item> -->

            <el-form-item class="addJLD" label="索赔费用" prop="spfy">
              <el-input  v-model="jldModel.spfy" size="mini"  placeholder="请输入内容" :disabled="showxq"></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="罚金" prop="fj">
              <el-input  v-model="jldModel.fj" size="mini"  placeholder="请输入内容" :disabled="showxq"></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="质保金" prop="zbj">
              <el-input  v-model="jldModel.zbj" size="mini"  placeholder="请输入内容" :disabled="showxq"></el-input>
            </el-form-item>

          </el-form>
          <!-- 回显添加计量汇总 -->
          <div style="width:100% ;height:4px;background-color: #c0cad6;"></div>
          <div class="header"   style="width:100%;height: 36px;line-height: 36px;padding-top: 0px;">
            <span class="headerTit" style="text-align: left;">计量汇总单</span>
            <el-button size="mini" style="background-color: #DF4D4A;border-color: transparent;color: #fff;float: right;margin-top: 3px;" @click="addMX(true)">
            <i style="color: #fff;" class="icon iconfont icon-past"></i>添加计量汇总</el-button>
          </div>
          <el-table :data="echo" tooltip-effect="dark"
                 style="width: 95%;margin: 20px auto"
                 row-class-name="row_class"
                 border>
              <el-table-column
                type="index"
                align="center"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column align="center" sortable  label="子目编号"  show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span>{{row.zmh?row.zmh:row.zmbh}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" sortable  prop="zmmc" label="子目名称" show-overflow-tooltip> </el-table-column>
              <el-table-column align="center" sortable  prop="dw" label="单位"> </el-table-column>
              <el-table-column align="center" sortable   label="数量">
                <template slot-scope="{row}">
                  <span>{{row.wcsl?row.wcsl:row.sl}}</span>
                </template>
              </el-table-column>
            </el-table>
        </div>

      </div>

    </div>

<!-- 添加计量汇总单 -->
     <div class="windowAramFirst" v-if="showDetail == 2" >
        <div class="addtjjlhz" style="position:relative;">
          <p class="tabAreaTit">
            <span class="titleclasschild"  @click="showDetail =1 ;activeName2='first';activeName='first'"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
            <span>添加计量汇总单</span>
          </p>
          <div class="SPState">
            <el-button size="mini"  style="margin:auto;display: block;background-color: #DF4D4A;border-color: transparent;color: #fff" class="dialog-button bao_cun"
                       @click="saveAdd()">
              <i class="icon iconfont icon-past"></i>
              保存
            </el-button>
          </div>
        </div>

        <el-table :data="detailItemInfo" tooltip-effect="dark"
                    ref="multipleTable"
                    style="width: 90%;max-height: 250px;overflow-y: auto;margin:0 aoto"
                    row-class-name="row_class"
                    @selection-change="addzmChange"
                    border>
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

            <el-table-column align="left" prop="djbh" label="项目编号" show-overflow-tooltip> </el-table-column>
            <el-table-column align="left" prop="xmmc" label="项目名称" show-overflow-tooltip> </el-table-column>
            <el-table-column align="left" prop="dwmc" label="承包单位名称" show-overflow-tooltip> </el-table-column>
            <el-table-column align="left" prop="zjdbh" label="质检单编号" show-overflow-tooltip> </el-table-column>
             <el-table-column align="left" prop="sfybgc" label="是否隐蔽工程" show-overflow-tooltip> </el-table-column>
          </el-table>
      </div>

       <!--详情-->
       <div class="details" v-if="showDetail == 3">

        <div class="addHead">
          <p class="tabAreaTit">
            <span class="titleclasschild"  @click="showDetail = 0"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
            <span>计量单汇总表</span>
          </p>
        </div>

         <div class="detailsCon">
            <ul>
              <li>
                <span>支付期号</span>
                <span>{{jldModel.zfqh}}</span>
              </li>
              <li>
                <span>项目名称：</span>
                <span>{{jldModel.xmmc}}</span>
              </li>
              <li>
                <span>合同编号：</span>
                <span>{{jldModel.xmbh}}</span>
              </li>
              <li>
                <span>填报日期：</span>
                <span>{{jldModel.tbrq}}</span>
              </li>
              <li>
                <span>承包单位：</span>
                <span>{{jldModel.cbdwmc}}</span>
              </li>
              <li>
                <span>管理单位：</span>
                <span>{{jldModel.gldw}}</span>
              </li>
              <li>
                <span>监理单位：</span>
                <span>{{jldModel.jldw}}</span>
              </li>
              <li>
                <span>索赔费用：</span>
                <span>{{jldModel.spfy}}</span>
              </li>
              <li>
                <span>罚金：</span>
                <span>{{jldModel.fj}}</span>
              </li>
              <li>
                <span>质保金：</span>
                <span>{{jldModel.zbj}}</span>
              </li>
            </ul>
          </div>
          <div style="width:100% ;height:4px;background-color: #c0cad6;"></div>
          <el-tabs style="height:calc(100% - 70px); margin:0 16px; "  v-model="activeName">
            <el-tab-pane label="计量支付汇总表" name="first">
              <el-table  :data="jldModel.jlmxList" tooltip-effect="dark"
                        style="width: calc(100% - 26px);margin: auto;"
                        row-class-name="row_class"
                        border>
                <el-table-column
                  type="index"
                  align="center"
                  label="序号"
                  width="50">
                </el-table-column>
                <el-table-column align="left" v-for="(finTit,finIndex) in jlzfhzbTit" :prop="finIndex" :label="finTit"   show-overflow-tooltip></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane style="height: calc(100%);" label="清单中期支付报表" name="second">
              <el-table  :data="jldModel.cwbbList" tooltip-effect="dark"
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
                <el-table-column align="center"  prop="zmbh" label="子目号"></el-table-column>
                <el-table-column align="center"  prop="zmmc" label="子目名称"></el-table-column>
                <el-table-column align="center"  prop="jldw" label="计量单位"></el-table-column>
                <el-table-column align="center"   label="合同数量">
                  <el-table-column align="center"  prop="htsl" label="数量"></el-table-column>
                  <el-table-column align="center"  prop="htdj" label="单价"></el-table-column>
                  <el-table-column align="center"  prop="htje" label="金额"></el-table-column>
                </el-table-column>
                <el-table-column align="center"  prop="ljwczb" label="累计完成占合同%"></el-table-column>
                <el-table-column align="center" label="到本期末完成">
                  <el-table-column align="center"  prop="bqmwcsl" label="数量"></el-table-column>
                  <el-table-column align="center"  prop="bqmwcje" label="金额"></el-table-column>
                </el-table-column>
                <el-table-column align="center"  prop="dsqmwc" label="到上期末完成">
                  <el-table-column align="center"  prop="sqmwcsl" label="数量"></el-table-column>
                  <el-table-column align="center"  prop="sqmwcje" label="金额"></el-table-column>
                </el-table-column>
                <el-table-column align="center"   label="本期完成">
                  <el-table-column align="center"  prop="bywcsl" label="数量"></el-table-column>
                  <el-table-column align="center"  prop="bywcje" label="金额"></el-table-column>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="中期财务支付证书" name="third">
              <!--<p style="padding: 0 0 17px 15px;">子目号：总则</p>-->
              <el-table  :data="jldModel.cwbbZjList" tooltip-effect="dark"
                        style="width: calc(100% - 26px);margin: auto;"
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
                <el-table-column align="center"   label="合同价及变更金额(元)">
                  <el-table-column align="center"  prop="htje" label="合同金额"></el-table-column>
                  <el-table-column align="center"  prop="htje" label="变更后总金额"></el-table-column>
                </el-table-column>
                <el-table-column align="center"  prop="zmh" label="到本期末完成(元)">
                  <el-table-column align="center"  prop="bqmwcje" label="金额"></el-table-column>
                  <el-table-column align="center"  prop="bqmwcje" label="变更后总金额"></el-table-column>
                </el-table-column>
                <el-table-column align="center"  prop="zmh" label="到上期末完成(元)">
                  <el-table-column align="center"  prop="sqmwcje" label="金额"></el-table-column>
                  <el-table-column align="center"  prop="sqmwcje" label="变更后总金额"></el-table-column>
                </el-table-column>
                <el-table-column align="center"  prop="zmh" label="本期完成(元)">
                  <el-table-column align="center"  prop="bywcje" label="金额"></el-table-column>
                  <el-table-column align="center"  prop="bywcje" label="变更后总金额"></el-table-column>
                </el-table-column>

              </el-table>
            </el-tab-pane>
      </el-tabs>
      </div>


  </div>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
import { returnUserInfo } from '@/helper'
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
      jlzfhzbTit:{zmbh:'子目编号',zmmc:'子目名称',dw:'单位',dj:'单价(元)',sl:'数量',je:'金额(元)'},

      jldModel: {
        zfqh:'',
        xmmc:'',
        xmbh:'',
        tbrq:'',
        cbdwmc:'',
        gldw:'',
        jldw:'',
        tbdw:'',
        spfy:'',
        fj:'',
        zbj:'',
        cbdwid:'',
        cbdwbh:'',
        tbdwbh:'',
        tbdwid:'',
        tbdwmc:'',
        id:'',
        zt:''


      },
      index: '',
      isadd: false,
      addzb: false,
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
      searchForm: {},
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: 0,// 切换显示
      multipleSelection: [],
      htbh: {},
      htList: [],
      tabindex: 0,
      total:0,
      userInfo: {},




      hxId:'',// 回显ID
      echo:[],// 回显
      detailItemInfo:[],//本月完成情况详情数据
      selectMxList:[{}],
      zmtit:[
          {props:'',name:''}
        ],
        zmExpandtit:[
          {props:'',name:''}
        ],
       jldModel: {
        zqcwzf_zfqh: '',
        xmmc: '',
        xmbh: '',
        tbrq: '',
        gldw: '',
        cbdw:'',
        jldw: '',
        zqcwzf_bmmc: '',
      },

      jldModelRules: {
        xmmc: [
          {type: 'string', required: true,  message: '请输入项目名称', trigger: 'change'}
        ],
        tbrq: [
          {type: 'string', required: true,  message: '请输入填报日期', trigger: 'change'}
        ],
        tbdwmc: [
          {type: 'string', required: true,  message: '请输入填报单位', trigger: 'blur'}
        ],
        spfy: [
          {type: 'string', required: true,  message: '请输入索赔费用', trigger: 'blur'}
        ],
        fj: [
          {type: 'string', required: true,  message: '请输入罚金', trigger: 'blur'}
        ],
        zbj: [
          {type: 'string', required: true,  message: '请输入质保金', trigger: 'blur'}
        ]

      },
      isaddeditor:'添加',
      isseedetail: 0,
      activeName:'first',
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
     dialogData:[],


    }
  },
  mounted () {

    this.userInfo = returnUserInfo()

    this.$api.getProjectMsgToCreateMWP('').then(res => {
      this.htList = res.data.data
    })

    this.initqueryXMBH()
    this.initqueryXMMC()
    this.search()
    // this.tableHeight = $('#zqcwzfzs')[0].offsetHeight
  },
  methods: {
    showAdd () {
       this.jldModel= {
        zfqh:'',
        xmmc:'',
        xmbh:'',
        tbrq:'',
        cbdwmc:'',
        gldw:'',
        jldw:'',
        tbdw:'',
        spfy:'',
        fj:'',
        zbj:'',
        cbdwid:'',
        cbdwbh:'',
        tbdwbh:'',
        tbdwid:'',
        tbdwmc:'',
        id:'',
        zt:''
      }
      this.echo = []
      this.isaddeditor = '添加'
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      this.formId = 'zqcwzfzs' + new Date().getTime()
      this.jldModel.zfqh = this.formId
      this.jldModel.tbrq = this.formatDate(new Date())
    },
    updateFormDia (row, index) {// 编辑
      console.log(row,index,'bianji')
      this.echo = []
      this.jldModel = {}
      this.isaddeditor = '编辑'
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      this.jldModel = JSON.parse(JSON.stringify(row))
      this.echo=row.jlmxList.splice(1,row.jlmxList.length -1)
      console.log(row.jlmxList.splice(1,row.jlmxList.length -1),'sssws')
    },
    showBhFormDia (row) {// 详情
      // this.isseedetail = 3
      // this.showDetail = true
      // this.showxq = true
      this.jldModel = JSON.parse(JSON.stringify(row))
      console.log(this.jldModel,'this.jldModel')
      this.htbh = {
        zqcwzf_htbh: this.jldModel.zqcwzf_htbh
      }
    },
    search () {// 点击查询
      this.showSearch = false
      if (this.searchForm.jcrq) {
        this.searchForm.ksrq = this.searchForm.jcrq[0]
        this.searchForm.jsrq = this.searchForm.jcrq[1]
      }
      // '?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)
      this.$api.gczfgetZqcwzfList({
        pageNum:this.currentPage,
        pageSize:this.pageSize,
        daZzid:this.userInfo.daZzid,
        daYhid:this.userInfo.daYhid,
        daBmid:this.userInfo.daBmid,
        xmbh:this.searchForm.xmbh,
        xmmc:this.searchForm.xmmc,
        startDate:this.searchForm.ksrq||'',
        endDate:this.searchForm.jsrq||''
      }).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
            this.tableData = resp.data.data.rows
            this.total = resp.data.data.totle
            console.log(resp,'respresp')
        }
      }).catch(e => {
        this.loading = false
      })
    },
    addSubmit (formName) {// 点击添加保存
      this.$refs[formName].validate((valid) =>{
        if(valid){
          this.showDetail = 0
          let params = _.assign({},this.jldModel,this.userInfo,{gcjldids:this.hxId},{cbdwmc:this.jldModel.cbdwmc},{cbdwid:this.jldModel.cbdwid},{cbdwbh:this.jldModel.cbdwbh})
          console.log(this.jldModel,'params')
          this.$api.addZqcwzfForGczf(params).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.search()
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
    updateSubmit (formName) {// 点击编辑保存
      this.$refs[formName].validate((valid) =>{

        if(valid){
          console.log(this.jldModel,'this.jldModel')
          let params = _.assign({},this.jldModel,{gcjldids:this.jldModel.gcjldids},this.userInfo,{cbdwmc:this.jldModel.cbdwmc},{cbdwid:this.jldModel.cbdwid},{cbdwbh:this.jldModel.cbdwbh})

          this.$api.editZqcwzfForGczf(params).then(res => {
            if (res.data.code === 1) {
              this.showDetail = 0
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
        }
       })

    },
    deleteData () {// 点击删除
      if (this.multipleSelection.length > 0) {
        this.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let delID = []
          this.multipleSelection.map((item)=>{
            delID.push(item.id)
          })
          delID = delID.join(',')
           console.log( delID,' this.multipleSelection')

          this.$api.delZqcwzfForGczf('?id=' + delID).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.search(this.currentPage, this.pageSize)
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
    _getOnlyXmgkjcxx (val) {
      // // 根据项目编号的弹框搜索的项目编号获取项目信息
      console.log(val,'val')
      let xmbh = val ? val : ''
      this.$api.getOnlyXmgkjcxx({xmbh: xmbh}).then(res => {
        if (res.code != 1) {
          this.$message({
            message: '网络出错',
            type: "error"
          })
        } else {
          console.log(res.data,'ff')
          if (res.data && res.data.length !== 0) {
            for (var i = 0; i < res.data.length; i++) {
              this.jldModel.xmmc = res.data[i].xmmc
              this.jldModel.cbdwmc = res.data[i].cbdw
              this.jldModel.cbdwid = res.data[i].cbdwid
              this.jldModel.cbdwbh = res.data[i].cbdwbh
              this.jldModel.gldw = res.data[i].gldw
              this.jldModel.jldw = res.data[i].jldw
              this.jldModel.id = res.data[i].id
              this.jldModel.tbdwbh = res.data[i].tbdwbh
              this.jldModel.tbdwid = res.data[i].tbdwid
              this.jldModel.tbdwmc = res.data[i].tbdwmc
            }
          }
        }
      })
    },
    selectables(val,i){
      if(val.zt==='3701'){
        return true
      }else{
        return false
      }
      console.log(val)
    },
    shenhe (row, index) {// 状态
      this.$confirm('是否通过审核？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        console.log(row,'row')
        let form = JSON.parse(JSON.stringify(row))
        this.$api.updateZqcwzfzsZt('?id=' + form.id + '&zt=' + '3702' ).then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: '审核通过!'
            })
            this.search()
          }
        })
        this.$message({
          type: 'success',
          message: '审核通过!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消审核'
        })
      })
    },
    addMX(bol){ // 点击添加计量汇总
        // let {daZzid} = this.userInfo

        let htbh = this.jldModel.xmbh
        this.detailItemInfo = []
        if(htbh){
            this.isJRG = false
            this.showDetail = 2
            this.zmtit = [
              {props:'htbh',name:'合同编号'},
              {props:'xmmc',name:'合同名称'},
              {props:'zjbh',name:'章节编号'},
              {props:'zjmc',name:'章节名称'},
              {props:'sl',name:'数量'},
            ]
            this.zmExpandtit = [
              {props:'zmh',name:'子目号'},
              {props:'zmmc',name:'子目名称'},
              {props:'dw',name:'单位'},
              {props:'wcsl',name:'完成数量'},
            ]
          let self = this
          let {zbidsList} = this
          console.log(this,'this')
          this.isClickNum = this.isClickNum+1
          if(this.isaddeditor === '添加'){
            this.$api.getGcjldToInsertZqcwzfzs('?xmbh='+htbh).then(res=>{
              if(res.data.code == 1){
                this.detailItemInfo = res.data.data.length?res.data.data:[]
              }else{
                this.detailItemInfo = []
              }
            })
          }else{
            this.$api.getGcjldToInsertZqcwzfzs('?xmbh='+htbh+'&zqcwzfId='+this.jldModel.id).then(res=>{
              if(res.data.code == 1){
                this.detailItemInfo = res.data.data.length?res.data.data:[]
              }else{
                this.detailItemInfo = []
              }
            })
          }

        }else{
          this.$message({
            message: '请先选择项目名称',
            type: 'warning'
          });
        }
      },
   addzmChange(val){
     console.log(val,'this.hxId')
     let arr =[]
     val.map((item,i)=>{
       arr.push(item.id)
     })
     this.hxId=arr.join(',')
     console.log(this.hxId,'this.hxId')
   },

  saveAdd(){//添加添加计量汇总单保存 getGcjlMxByGcjlIds
    this.showDetail = 1
    this.$api.getGcjlMxByGcjlIds('?gcjldIds='+this.hxId).then(res=>{
      if(res.data.code == 1){
        this.echo = res.data.data.length?res.data.data:[]

      }else{
        this.echo = []
      }
      console.log(this.echo,'’this.echo')
    })

   },
   addzibiao () {//子项添加
      this.jldModel.mx.push({mid: this.jldModel.id})
    },
    deletezibiao (index) {//子项删除
      this.jldModel.mx.splice(index, 1)
    },
    handleSelectionChange (val) {//复选框
      this.multipleSelection = val
    },
    handleSizeChange (val) { // 页数
      this.pageSize = val
      this.search()
    },
    handleCurrentChange (val) { // 页数
      this.currentPage = val
      this.search()
    },


    tablable (num) {
      this.tabindex = num
    },
    // selectHt (value) {// 下拉选择
    //   this.jldModel.zqcwzf_htmc = value.zqcwzf_htmc
    //   this.jldModel.zqcwzf_htbh = value.zqcwzf_htbh
    //   this.jldModel.zqcwzf_gcmc = value.zqcwzf_gcmc
    //   this.jldModel.zqcwzf_cbdw = value.zqcwzf_cbdw
    //   this.jldModel.zqcwzf_gldw = value.zqcwzf_gldw
    //   this.jldModel.zqcwzf_jldw = value.zqcwzf_jldw
    //   this.jldModel.mx = value.mx
    // },



      //重置信息
    resizeDate(){
       this.searchForm.xmmc = undefined
      this.searchForm.xmbh = undefined
      this.searchForm.searchTime = undefined
      this.searchForm.jcrq = undefined
      this.searchForm.ksrq =undefined
      this.searchForm.jsrq=undefined
      this.search()
    },
    showDialog(bol){// 点击弹框
      this.dialogVisible = true
      this.datatypes = bol
      this.$api.getmcbhList().then(res=>{
        if(res.code == 1){
          this.dialogData = res.data&&res.data.length?res.data:[]
        }else{
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
    handleSelectMC(event,param){ // 下拉选择
      console.log(event,param, '切换项目名称')
      if (param == 1) {
        this.searchForm.xmmc = event.XMMC
      } else {
        this.jldModel.xmmc = event.XMMC
        this.jldModel.xmbh = event.XMBH
        if (event.XMBH) {
          this._getOnlyXmgkjcxx(event.XMBH)
        }
      }
      },
    createFilter(queryString,val) {
      return (restaurant) => {
        return (restaurant[val].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },




//Dialog
    closeDialog(val){ // 关闭窗口
     this.dialogVisible = false
     if(val){
       if (this.isseedetail == 0) {
         this.jldModel.xmmc = val.XMMC
         this.jldModel.xmbh = val.XMBH
         this._getOnlyXmgkjcxx(this.jldModel.xmbh)
       } else {
         this.searchForm.xmmc = val.XMMC
         this.searchForm.xmbh = val.XMBH
       }
      }
     },
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
         this.$api.getmcbhList().then(res=>{
           if(res.code == 1){
             this.restaurants = res.data&&res.data.length?res.data:[]
           }else{
             this.restaurants = []
           }

         })
      },

     // ceshi () {
    //   this.$message({
    //     type: 'error',
    //     message: '内容格式不符合要求'
    //   })
    // },
      // getPage (currentPage, pageSize) {
    //   this.loading = true
    //   this.$api.requestLkpdLkdcQueryPage('/' + currentPage + '/' + pageSize).then(resp => {
    //     this.loading = false
    //     if (resp.status !== 200) {
    //       this.$message({
    //         message: '出错了',
    //         type: 'error'
    //       })
    //     } else {
    //       this.tableData = resp.data.content
    //       this.total = resp.data.totalElements
    //     }
    //   }).catch(e => {
    //     this.loading = false
    //   })
    // },
     // getXcRoadOptions () {
    //   this.$api.requestLdbqueryCombos().then(resp => {
    //     if (resp.status !== 200) {
    //       this.$message({
    //         message: '出错了',
    //         type: 'error'
    //       })
    //     } else {
    //       this.roadOptions = resp.data
    //     }
    //   }).catch(e => {
    //   })
    // },
     // selecttreeBm (node) {
    //   this.searchForm.bmid = node.bmcode
    //   this.searchForm.bmname = node.bmname
    //   if (!this.searchForm.qmbbid) {
    //     // return
    //   } else {
    //     this.search(this.currentPage, this.pageSize)
    //   }
    // },

    // submitAddForm () {
    // },
    //  getQmldbb () {
    //   if (this.qmbbOptions.length > 0) { return }
    //   this.$api.requestLkpdbbkQueryQmldbb('0201').then(resp => {
    //     if (resp.status !== 200) {
    //       this.$message({
    //         message: '出错了',
    //         type: 'error'
    //       })
    //     } else {
    //       this.qmbbOptions = resp.data
    //       this.searchForm.qmbbid = this.qmbbOptions[0].bbid
    //       if (!this.searchForm.bmid) {
    //         // return
    //       } else {
    //         this.search(this.currentPage, this.pageSize)
    //       }
    //     }
    //   }).catch(e => {
    //   })
    // },
      // daoru () {
    //   for (var i = 0; i < 4; i++) {
    //     this.tableData.push({
    //       djbh: '234243415',
    //       famc: '路况评定',
    //       sjxx: '2018/12/11',
    //       sjsx: '2018/12/11',
    //       tbr: '张三',
    //       tbsj: '2018/12/11',
    //       tbdw: '甬台温高速',
    //       tbbm: '技术部',
    //       bz: '11111',
    //       sfsh: '0',
    //       tableData1: []
    //     })
    //   }
    //   this.$message({
    //     type: 'success',
    //     message: '导入成功!'
    //   })
    // },
    // daochu () {
    // },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.details{
  width: 100%;
  .addHead{
    width: 100%;
    height: 46px !important;
    line-height: 46px !important;
    color: #111;
    font-weight: 700;
    font-size: 16px !important;
    color: #111;
    color: #111;
    background: #f6f6f6;
    padding-left: 16px !important;
    margin-bottom: 12px;
    p{
      i{
        font-weight: 700;
        font-size: 16px;
        color: #111;
      }
    }
  }
  .detailsCon{
    width: 100%;
    ul{
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      li{
        width: 25%;
        height: 40px;
        display: flex;
        span{
          &:nth-child(1){
             width: 9rem;
             text-align: end;
          }

        }
      }
      div{
        width: 75%;
        padding: 10px 0;
      }
    }
  }
   .taskShows{
      width: 100%;
      .taskShowHeads{
        width: 100%;
        height:46px ;
        padding: 0 20px;
        align-items: center;
        justify-content: space-between;
        background: #F6F6F6;
        p{
          font-weight:  bold;
          color: #111;
          font-size: 16px!important;
          line-height: 46px;
        }

    }
    }
}
.exhibition{
  display: flex;
  flex-direction: column;
}
.addtjjlhz{
  width: 100%;
  height: 46px;
  line-height: 46px;
  font-weight: bold;
  font-size: 16px;
  color: #111;
  background: #F6F6F6;
  margin-bottom: 12px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p{
    i{
      font-weight: bold;
      color: #111;
       font-size: 16px;
    }
  }
}
.zqcftj{
  width: 100%;
  .zqcftjHead{
    width: 100%;
    height: 46px;
    line-height: 46px;
    font-weight: bold;
    font-size: 16px;
    color: #111;
    background: #F6F6F6;
    padding: 0 16px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    p{
      i{
        font-weight: bold;
    font-size: 16px;
    color: #111;
      }
    }
  }

}
.fzsselect{
  top:168px!important;
}
  #zqcwzfzs{
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    overflow: auto;
    .conter_table{
      height: calc(100% - 91px);
      min-height: 300px;
      padding: 0 15px;
      .search{
        height: 500px;
      }
    }
    .footer{
      height: 45px;
      background: #fff;
      position: relative;
      z-index: 100;
    }
    .dialog_warp{
      background: #fff;
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
         width: 100%;
        display: flex;
        flex-wrap: wrap;
         padding: 0 40px!important;
        .addJLD{
          width: 25%;
          .el-form-item__label{
            width: 6rem!important;
          }
          .el-form-item__error{
            margin-left:6rem;
          }
        }
       .textarea-jss{
          width: 100%;
          margin-top: 20px;
          .addJLD-textarea{
            width: 75%;
          }
          >.el-form-item__content{
             >.el-form-item__label{
                margin: 0;
              }
          }

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
      .zibnr2,.zibiaonr{
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
            width: 100%;
            /*width: 900px;*/
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
              width: calc(100%/9);
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
                float: left;
                border-top: 1px solid #D5D6D7;
                border-right: 1px solid #D5D6D7;
                &:nth-last-of-type(1){
                  border-right: none;
                }
              }
            }
            p{
              width: calc(100%/9);
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
            width: 100%;
            /*width: 600px;*/
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
