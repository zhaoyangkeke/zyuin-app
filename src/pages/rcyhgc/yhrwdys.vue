/**
* ----任务单验收
*/
<template>
  <div id="kgsqd" style="height: 100%" >
    <div class="header" v-show="!showDetail">
      <span class="headerTit">任务单验收</span>
      <div class="header_option">
        <ul>
          <!--<li><i class="el-icon-search"> 查询</i></li>-->
          <!--<li><i class="icon iconfont icon-export"> 导出</i></li>-->
          <!--<li @click="updateFormDia('add');isseedetail = 0"><i class="el-icon-edit-outline"> 添加</i></li>-->
          <!--<li @click="deleterows"><i class="el-icon-delete"> 删除</i></li>-->
        </ul>

      </div>
    </div>

    <div class="conter_table" v-show="!showDetail">
      <!--查询信息-->
      <div class="chaxun">
        <el-form  :inline="true"  style="display: inline-block;" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="项目名称" prop="htbh">
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
            <!--<el-form-item class="" label="月度" prop="htbh">-->
              <!--<el-date-picker-->
                <!--size="mini"-->
                <!--v-model="searchForm.yd"-->
                <!--type="month"-->
                <!--placeholder="选择日期"-->
                <!--format="MM 月"-->
                <!--value-format="MM">-->
              <!--</el-date-picker>-->
            <!--</el-form-item>-->
            <el-form-item class="" label="日期" prop="htbh">
              <el-date-picker
                size="mini"
                v-model="searchForm.selectDate"
                type="daterange"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-form-item>

          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button @click="searchYDJH" size="mini" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button @click.native="resizeSearch" size="mini">重置</el-button>
          </el-form-item>

        </el-form>
      </div>
      <el-table  :data="YDJHData" tooltip-effect="dark"
                 style="width: calc(100% - 19px);"
                 row-class-name="row_class"
                 @selection-change="isselect"
                 border>
        <el-table-column
          type="selection"
          align="center"
          :selectable='selectable2'
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="50">
        </el-table-column>

        <el-table-column align="left" sortable v-for="(tit,titIndex) in tableTits" :prop="titIndex" :label="tit" :key="titIndex"  show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable :prop="zt" label="状态" show-overflow-tooltip>
          <template scope="scope">
            <span v-if="scope.row.zt == 1">巡查事件</span>
            <span v-if="scope.row.zt == 2">指挥中心处理</span>
            <span v-if="scope.row.zt == 3">工程部处理</span>
            <span v-if="scope.row.zt == 4">施工单位</span>
            <span v-if="scope.row.zt == 5">施工单位人员</span>
            <span v-if="scope.row.zt == 6">维修中</span>
            <span v-if="scope.row.zt == 7">已维修</span>
            <span v-if="scope.row.zt == 8">验收中</span>
            <span v-if="scope.row.zt == 9">已验收</span>
            <span v-if="scope.row.zt == 10">已归档</span>
            <span v-if="scope.row.zt == 11">已计量</span>
            <span v-if="scope.row.zt == 12">已支付</span>
          </template>
        </el-table-column>
        <el-table-column  align="left" sortable show-overflow-tooltip label="日期" prop="fxsjStr"></el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="290">
          <template scope="scope">
            <!--{{scope.row.state}}-->
            <span style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                  @click="seedetail('detail',scope.row)">详情</span>
            <!-- <span   v-if="scope.row.state !=1" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                     @click="updatejobOrder('update',scope.row);isseedetail = 0">编辑</span>-->
            <span  v-if="scope.row.zt == 7 ? true : false" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                   @click="isshowsubmit(scope.row);" >申请验收</span>
            <!--<span   v-if="scope.row.zt == 8 ? true : false" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"-->
                    <!--@click="sendZpparam({id:rowobjId,zt:9})" >同意</span>-->
            <!--<span   v-if="scope.row.zt == 8 ? true : false" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"-->
                    <!--@click="getrowId(scope.row);dialogVisible2=true">打回</span>-->
            <span style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                  @click="isshowmap = true;">定位</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--申请养护任务单验收单-->
    <div class="tabArea" v-show="isvisitable">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild"  @click="isvisitable = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>任务单验收申请单</span>
        </p>
      </div>
      <div style="padding-left: 15px;">
        <el-form>
          <el-form-item class="addJLD" label="合同编号:" prop="bhsl">
            <el-input size="mini"  v-model="rowobj.htbh"   placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item class="addJLD" label="合同名称:" prop="bhsl">
            <el-input size="mini"  v-model="rowobj.htmc"   placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item class="addJLD" label="路线:" prop="bhsl">
            <el-input size="mini"  v-model="lxmc"   placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item class="addJLD" label="养护单位:" prop="bhsl">
            <el-input size="mini"  v-model="rowobj.yhdw"   placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item class="addJLD" label="管理单位:" prop="bhsl">
            <el-input size="mini"  v-model="rowobj.gldw"   placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item class="addJLD" label="填报单位:" prop="bhsl">
            <el-input size="mini"  v-model="rowobj.tbdw"   placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item class="addJLD" label="月度:" prop="bhsl">
            <el-input size="mini"  v-model="rowobj.yd"   placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item class="addJLD" label="填报日期:" prop="bhsl">
            <el-date-picker
              v-model="rowobj.tbrq"
              type="date"
              size="mini"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <div style="position: relative;top: -18px;">
            <el-button style="display: block;margin:20px auto;" type="primary" size="small" @click="sqdsubmit">保存</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <!--打回任务弹出框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose">
      <span>确定要将任务打回？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="sendZpparam({id:rowobjId,zt:6},1);dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--分页区域-->
    <footer class="footer" v-show="!showDetail">
      <div style="float: right;padding: 6px">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </footer>
    <!--添加新增的弹窗-->
    <div class="tabArea" v-show="showDetail">
      <!--详情-->
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild"  @click="showDetail = false;isShowwxcontent = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>{{firstItemTit}}</span>
        </p>
      </div>

      <div style="padding-left: 31px;">
        <p class="addJLD" v-for = '(item, keyname) in nameObj1'>
          <span class="inputlabel">{{item}} ：</span>
          <span class="spanwidth">{{jldModel[keyname]}}</span>
        </p>
      </div>
      <div class="eiconsty" style="padding-left: 16px;">
        <span class="iconfont icon-zhifuguanli" style="font-size: 12px;padding-right: 10px;"></span><span>事件信息</span>
      </div>
      <div style="padding-left: 31px;">
        <p class="addJLD" v-for = '(item, keyname) in eventname' :style="keyname == 'bhsm' ? 'width: 85%;' : ''">
          <span class="inputlabel">{{item}} ：</span>
          <span class="spanwidth" v-if="keyname == 'bhsm'" style="width: 80%;vertical-align: middle;">{{jldModel[keyname]}}</span>
          <span class="spanwidth" v-else-if="keyname == 'xcfx' && jldModel[keyname] == '0301'">上行</span>
          <span class="spanwidth" v-else-if="keyname == 'xcfx' && jldModel[keyname] == '0302'">下行</span>
          <span class="spanwidth" v-else-if="keyname == 'xcfx' && jldModel[keyname] == '0303'">全幅</span>
          <span class="spanwidth" v-else>{{jldModel[keyname]}}</span>
        </p>
      </div>
      <div style="width: calc(100% + 16px);margin-left: -16px;margin-right: 0px;padding-left: 0px; padding-right: 0px;height:4px;background-color: #c0cad6;"></div>
      <!--维修记录-->
      <div class="eiconsty wxstyle">
        <span class="iconfont icon-sanjiaoxing" style="font-size: 13px;padding-left: 10px;" @click="isShowwxcontent = true" v-if="isShowwxcontent === false"></span>
        <span class="iconfont icon-sanjiao01" style="font-size: 13px;padding-left: 10px;" @click="isShowwxcontent = false" v-if="isShowwxcontent === true"></span>
        <span>维修记录</span>
      </div>
      <!--维修记录子表内容-->
      <div class="wxtabArea" v-show="isShowwxcontent">
        <!--<div class="detailItem_tit">维修记录</div>-->
        <!--<div class="closeBTN"><i class="icon iconfont icon-down" @click="isShowwxcontent = false"></i></div>-->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="item.wcsj" :name="'active'+index" v-for="(item, index) in tabList" :key="index"></el-tab-pane>
        </el-tabs>
        <div style="padding-left: 15px;">
          <div v-for="(item, index) in wxorderobj" :key="index" style="margin-bottom: 15px;border-bottom: 1px solid #f1f4f7;font-size: 0;">
            <!--{{item}}-->
            <p class="addJLD"><span class="wxinputlabel">月度计划工程内容 ：</span><span>{{item.gcnr}}</span></p>
            <p class="addJLD"><span class="wxinputlabel">病害类型 ：</span><span>{{item.bhname}}</span></p>
            <p class="addJLD"><span class="wxinputlabel">数&nbsp;&nbsp;&nbsp;&nbsp;量 ：</span><span>{{item.sl}} {{item.dw}}</span></p>
            <p class="addJLD">
              <span class="wxinputlabel">施工前照片 ：</span>
              <span v-for="(item, index) in beforeImg" :key="index" @click="openBigimg(item, '施工前照片')">
                    <img :src="item" alt="" class="workimg">
                 </span>
            </p>
            <p class="addJLD">
              <span class="wxinputlabel">施工中照片 ：</span>
              <span v-for="(item, index) in duringImg" :key="index" @click="openBigimg(item, '施工中照片')">
                    <img :src="item" alt="" class="workimg">
                 </span>
            </p>
            <p class="addJLD">
              <span class="wxinputlabel">施工后照片 ：</span>
              <span v-for="(item, index) in afterImg" :key="index" @click="openBigimg(item, '施工后照片')">
                    <img :src="item" alt="" class="workimg">
                 </span>
            </p>
            <p class="addJLD" style="width: 69%;margin-bottom: 24px;"><span class="wxinputlabel">备&nbsp;&nbsp;注 ：</span><span>{{item.bz}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <!--地图页面-->
    <div class="tabArea" v-if="isshowmap">
      <p class="tabAreaTit">
        <span class="titleclasschild"  @click="isshowmap = false;"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
        <span>返回</span>
      </p>
      <div style="height: 100%;margin-top: -15px;margin-left: -16px;">
        <el-amap vid="amapDemo" ref="map" :center="center"  :map-manager="amapManager" :zoom="zoom" :events="events" :plugin="plugins" id="container"
                 style="width: 100%;">
          <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events"></el-amap-marker>
          <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
        </el-amap>
        <div class="leftpanel">
          <el-table  :data="YDJHData" tooltip-effect="dark"
                     style="width: 100%;"
                     row-class-name="row_class"
                     @selection-change="clickmap"
                     border>
            <el-table-column
              type="selection"
              align="center"
              width="40">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="40">
            </el-table-column>
            <el-table-column align="center" prop="xmmc" label="项目名称"></el-table-column>
            <el-table-column align="center" prop="bhname" label="病害类型"></el-table-column>
            <el-table-column align="center" prop="" label="起止点桩号" width="150">
              <template scope="scope">
                <span>{{scope.row.qzh}}K - {{scope.row.zzh}}K</span>
              </template>
            </el-table-column>
          </el-table>
          <footer class="footer" style="width: 97%;">
            <div style="float: right;padding: 6px">
              <el-pagination
                @current-change="handleCurrentChange"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </footer>
        </div>
      </div>
    </div>
    <!--大图片的窗口-->
    <el-dialog
      :title="titlename"
      :visible.sync="showbigImg"
      width="53%"
      :before-close="closeBigimg">
      <img :src="bigImgsrc" alt="" style="width: 100%;">
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
import { AMapManager } from 'vue-amap'
export default {
  components: {Dialog},
  data () {
    return {
      titlename: '',
      bigImgsrc: '',
      showbigImg: false,
      beforeImg: [],
      duringImg: [],
      afterImg: [],
      nameObj1: {
        xmbh: '项目编号',
        xmmc: '项目名称',
        lxmc: '路线名称',
        yhdw: '养护单位',
        gldw: '管理单位',
        yd: '月度',
        fxsj: '日期',
      },
      eventname: {
        czfs: '巡查单位',
        xcfx: '巡查方向',
        cd: '车道',
        dwgc: '单位工程',
        shlxname: '损坏类型',
        bhname: '病害类型',
        bhsl: '病害数量',
        bhdw: '病害单位',
        gcllxname: '工程量类型',
        qzh: '起点桩号',
        zzh: '止点桩号',
        bhsm: '病害说明'
      },
      rowObjData: {},
      isshowmap: false,
      plugins: [],
      amapManager: new AMapManager(),
      zoom: 13,
      center: [121.5482123, 29.78034647],
      markers: [],
      windows: [],
      window: '',
      events: {
        // init: (map) => {
        //   var marker = new AMap.Marker({
        //     icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        //     position: [121.5482123, 29.78034647]
        //   })
        //   map.add(marker);
        //   // this.initData(this.gjlist)
        // },
        'click': (e) => {
        }
      },
      usermsgObj: {
        daBmbm: JSON.parse(localStorage.userMsg)[0].deptList[0].deptCode,
        daBmid: JSON.parse(localStorage.userMsg)[0].deptList[0].deptId,
        daBmmc: JSON.parse(localStorage.userMsg)[0].deptList[0].deptName,
        daYhbm: JSON.parse(localStorage.userMsg)[0].userCode,
        daYhid: JSON.parse(localStorage.userMsg)[0].userId,
        daYhmc: JSON.parse(localStorage.userMsg)[0].userName,
        daZzid: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgId,
        daZzbh: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgCode,
        daZzmc: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgName,
      },
      dialogData: [],
      dialogTableTit:{
        XMMC:'项目名称',XMBH:'项目编号',
      },
      datatypes:'',
      restaurants:[],
      wxorderobj: [],
      tabList: [],
      activeName: 'active0',
      showwxzbDetail: false,
      isShowwxcontent: true,
      lxmc: '',
      dialogVisible2: false,
      isvisitable: false,
      rowobjId: '',
      rowobj: {
        htbh: '',
        htmc: '',
        yd: '',
        tbrq: '',
        lx: '',
        yhdw: '',
        gldw: '',
        tbdw: ''
      },
      isopendelete: false,
      lxmcarr: [],
      deleteIds: '',
      pathname: '',
      xmarr: [{value: 'XM01', label: '项目A'}, {value: 'XM02', label: '项目B'}, {value: 'XM03', label: '项目C'}],
      shlxarr: '',
      gcllxarr: '',
      xcvalue: '',
      xcvaluearr: [],
      isupdate: false,
      props: {
        label: 'text',
        value: 'data',
        children: 'children'
      },
      bhlxarr: [],
      isseedetail: 0,
      tasktitle: '',
      // me
      fileList4: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        status: 'finished'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        status: 'finished'
      }],
      selectRwd: ['601-1-1_一波波形护栏板', '601-1-2_二波波形护栏板', '601-1-3_三波波形护栏板'],
      fileList3: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }
      ],
      dialogImageUrl: '',
      dialogVisible: false,
      bhlx1: [],
      jldModel: {
        xmbh: '',
        xmmc: '',
        sjdh: '',
        lxbh: '',
        fxsj: '',
        yd: '',
        yhdw: '',
        gldw: '',
        czfs: '',
        xcfx: '',
        cd: '',
        dwgc: '',
        shlx: '',
        bhlx: '',
        bhsl: '',
        bhdw: '',
        gcllx: '',
        qzh: '',
        zzh: '',
        bhsm: ''
      },
      BasicInfo: {
        zfzmh: '支付子目号:',
        zmmc: '子目名称:',
        qzzh: '起止桩号:',
        bw: '部位:',
        th: '图号:',
        zjdbh: '质检单编号:',
        cbdw: '承包单位:'
      },
      searchInputVal: '',
      options: [],
      tableTits: {
        xmmc: '项目名称',
        lxmc: '路线名称',
        // fxsjStr: '发现时间',
        bhname: '病害类型',
        bhsl: '病害数量',
        yhdw: '养护单位'
      },
      zt: '',
      FinsdetailTit: {xmbh: '项目编号', xmmc: '项目名称', wcsj: '完成时间', bz: '备注'},
      stateList: [
        {name: '全部', val: undefined},
        {name: '编制中', val: '1'},
        {name: '工程技术部审核', val: '2'},
        {name: '经营发展部审核', val: '3'},
        {name: '公司分管领导审核', val: '4'},
        {name: '公司领导审批', val: '5'},
        {name: '审批完成', val: '6'}
      ],

      total: 0,
      state: ['', '编制中', '工程技术部审核', '经营发展部审核', '公司分管领导审核', '公司领导审批', '审批完成'],
      showFirstItemWindow: false,
      firstItemTit: '',
      showPlan: false,
      searchForm: {
        sjdh: undefined,
        lxmc: undefined,
        xmmc: undefined,
        xmbh: undefined,
        selectDate: null,
        pageNum: 1,
        pageSize: 10,
        daZzid: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgId
      },
      // 任务清单的数据
      YDJHData: [],
      detailItemInfo: [], // 本月完成情况详情数据
      showDetail: false
    }
  },
  methods: {
    // 默认显示年份
    getYear () {
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
      console.log(clock,22)
      this.rowobj.tbrq = clock
    },
    // 点击行标点
    switchWindow(row) {
      let markers = [];
      let windows = [];
      let self = this;
      for (var i = 0; i < row.length; i++) {

        let cent = {};
        cent ={
          position: [row[i].ptx, row[i].pty],
          content: `<div class="prompt" style="width:200px;height:100px;">项目名称:` + row[i].xmmc + `<br />养护单位：` + row[i].yhdw + `<br />病害类型：` + row[i].bhlx + `<br />病害数量：` + row[i].bhsl + `<br />发现时间：` + row[i].fxsj + `<br /></div>`,
          visible: false
        };
        console.log(row[i].ptx, row[i].pty, 3467)
        markers.push({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: [row[i].ptx, row[i].pty],
          events: {
            click() {
              self.windows.forEach(window => {
                window.visible = false;
              });
              console.log(i, 'one day, you will be remember')
              console.log(windows, 'one day, you will be remember')
              self.window = cent;
              // console.log(e,454)
              self.$nextTick(() => {
                // console.log(e, 'belong me')
                self.window.visible = true;
              });
            }
          }
        });


        this.center = [row[i].ptx, row[i].pty]
        if (row.length >1) {
          this.zoom =  6
        }else {
          this.zoom =  9
        }


      }
      this.markers = markers;
      this.windows = windows;
      console.log(this.markers, this.windows, 80)
    },
    clickmap (row) {
      console.log(row, 781);
      if (row && row.length !== 0 ) {
        this.switchWindow(row)
      }
      // this.switchWindow(row)
    },
    // 远程搜索项目名称list
    initqueryXMMC(){
      this.$api.getmcbhList2().then(res=>{
        if(res.code == 1){
          // console.log(this.restaurants, 8080801111)
          this.restaurants = res.data&&res.data.length?res.data:[]
          if (config.userInfo.userType&&config.userInfo.userType =='供应商') {
            this.queryYDJHData(this.restaurants[0]) // 获取事件任务清单列表
          } else {
            this.queryYDJHData() // 获取事件任务清单列表
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
        this.searchForm.xmbh = val.XMBH
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
      this.searchForm.xmbh = item.XMBH
    },
    // 切换维修记录
    handleClick (tab, event) {
      console.log(tab, event, 8181)
      let _param = this.tabList[tab.index].id
      this.beforeImg = []
      this.duringImg = []
      this.afterImg = []
      this.getwxContent(_param)
    },
    getwxContent (_param) {
      this.$api.getRcyhgcWcrwdZbListByWcrwdId('?id=' + _param).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {
          console.log(res.data.data, '每一条维修记录子表')
          this.wxorderobj = res.data.data
          if (this.wxorderobj && this.wxorderobj.length !==0) {
            for (var i = 0; i< this.wxorderobj.length; i++) {
              this.getFilesDataById(this.wxorderobj[i].id)
            }
          }
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 通过fileId获取上传过的照片
    getFilesDataById (paramId) {
      this.$api.getFilesDataById2({id: paramId}).then(res => {
        if (res.code !== 1) {
          this.$message({
            message: '网络错误',
            type: 'error'
          })
        } else {
          console.log(res.data)
          if (res.data && res.data.length) {
            for (var i=0; i<res.data.length;i++) {
              if (res.data[i].file_mjlx == '3001' && paramId == res.data[i].file_id) {
                this.beforeImg.push(res.data[i].file_path)

              } else if(res.data[i].file_mjlx == '3002' && paramId == res.data[i].file_id) {
                // debugger
                this.duringImg.push(res.data[i].file_path)

              } else {

                this.afterImg.push(res.data[i].file_path)
              }
            }
            console.log(this.beforeImg, this.duringImg, this.afterImg, 700700)
          }
        }
      }).catch(e => {
        console.log(e)})
    },
    closeBigimg () {
      this.showbigImg = false
    },
    // 打开施工前，施工中，施工后的放大照片
    openBigimg (param, name) {
      this.showbigImg = true
      this.bigImgsrc = param
      this.titlename = name
    },
    // 提交养护任务单验收单
    sqdsubmit () {
    let paramObj = Object.assign(this.rowobj,this.usermsgObj)
      this.$api.insertYhrwysd(paramObj).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {
          // this.$message({
          //   message: '申请单提交成功',
          //   type: 'success'
          // })
          this.isvisitable = false
          this.rowObjData.zt = '8'
          this.enterworkFlow(this.rowObjData)
          this.updatestatus(this.rowObjData)
        }
      }).catch(e => {
      })
    },
   // 调流程接口进入审批流程
    enterworkFlow (rowobj) {
      let {yhmc,yhid,bmmc,orgmc} = config.userInfo

      this.$api.createWorkFlow({
        pc_initiator:yhmc,
        pc_initiatorid: yhid,
        pc_name: '05',
        pc_project_id: rowobj.id,
        pc_remarks: '',
        pc_state: '',
      },{
        group:bmmc,
        org:orgmc}).then(res=>{
        if(res.code == 1){
          this.$message({
            type: 'success',
            message: '申请审批成功!'
          });
        }else{
          this.$message({
            type: 'error',
            message: res.msg
          });
        }
      }).catch( () => {
        this.$message({
          type: 'info',
          message: '已取消审批!'
        });
      })
    },
    // 修改状态值
    updatestatus (obj) {
      this.$api.updateRcyhgcSjqd(JSON.stringify(obj)).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错了',
            type: 'error'
          })
        } else {
          this.queryYDJHData()
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 关闭指派任务对话框
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    //  打回任务
    sendZpparam (obj) {
      this.$api.updateRcyhgcSjqd(JSON.stringify(obj)).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错了',
            type: 'error'
          })
        } else {
          this.$message({
            message: '已将任务打回',
            type: 'success'
          })
          this.queryYDJHData()
        }
      }).catch(e => {

      })
    },
    // 打开指派任务对话框传参
    getrowId (row) {

      this.rowobjId = row.id
    },
    isshowsubmit (row) {
      this.rowobj.htbh = row.xmbh
      this.rowobj.htmc = row.xmmc
      this.rowobj.yd = row.yd
      this.rowobj.lx = row.lxbm
      this.rowobj.yhdw = row.yhdw
      this.rowobj.gldw = row.gldw
      this.rowobj.tbdw = row.yhdw
      this.rowobj.rwmxId = row.id
      this.lxmc = row.lxmc
      this.rowObjData = row
      this.getYear()
      this.sqdsubmit()
    },
    // 选中表格行
    isselect (row) {

      // deleteIds
      let idarr = []
      for (var i = 0; i < row.length; i++) {
        idarr.push(row[i].id)
      }

      this.deleteIds = idarr.toString()
    },
    // 病害类型选择是触发的方法
    changeBhlx (data) {

      this.bhlx1 = data
      this.jldModel.bhlx = this.bhlx1[1].bhid
      this.jldModel.bhdw = this.bhlx1[1].dw

    },
    // 获取路段信息
    getlxmessage () {
      let _param = '0101'
      this.$api.getlxId('?bmCode=' + _param).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错了',
            type: 'error'
          })
        } else {

          this.lxmcarr = res.data.data
        }
      }).catch(e => {

      })
    },
    // 巡查方向
    handlechangexcfx (val) {

      this.jldModel.xcfx = val

    },
    handlechangeshlx (val) {
      this.jldModel.shlx = val
    },
    handlechangecllx (val) {
      this.jldModel.gcllx = val
    },
    // 项目编号及名称
    handlexmbh (val) {

      this.jldModel.xmbh = val.value
      this.jldModel.xmmc = val.label
    },
    // 切换路段
    handlechangelxbh (val) {
      this.jldModel.lxbm = val

    },
    handleChange (file, fileList) {

      // this.fileList4 = fileList.slice(-3);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handHttpRequest (a) {
      // 上传图片

    },
    handleSelectionChange (row) {
      this.selectRwd = [ ]
      row.forEach(item => {
        this.selectRwd.push(item.zmmc)
      })
    },
    delRwd (index) {
      this.selectRwd.splice(index, 1)
    },
    handleRemove (file, fileList) {
      // 删除图片

    },
    handlePictureCardPreview (file) {
      // 放大图片查看

      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
    },
    selectable2: function (row, index) { // 禁用第四个
      return true
      // if(row.canDel == 1){
      //   return true
      // }else{
      //   return false
      // }
    },
    resizeSearch () {
      this.searchForm.sjdh = undefined
      this.searchForm.lxmc = undefined
      this.searchForm.xmbh = undefined
      this.searchForm.xmmc = undefined
      this.searchForm.selectDate = undefined
      this.searchForm.pageNum = 1
    },
    deleterows () {
      let _param = this.deleteIds
      if(_param){
        this.$api.deleteRcyhgcSjqd('?id=' + _param).then(res => {
          if (res.status !== 200) {
            this.$message({
              message: '网络出错了',
              type: 'error'
            })
          } else {
            this.$confirm('此操作将删除该选中数据, 是否继续？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.queryYDJHData()
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          }
        }).catch(e => {

        })
      }else{
        this.$message({
          message: '请选择要删除的内容',
          type: 'warning'
        });
      }

    },
    // 详情内 点击
    handOneRowSecod (row, event, column) {
      this.detailItemInfo = [
        {zmmc: '二波波形护栏板', zmh: '602-1-1', dw: 'm', sl: '880'},
        {zmmc: '二波波形护栏板', zmh: '602-1-1', dw: '根', sl: '880'},
        {zmmc: '二波波形护栏板', zmh: '602-1-1', dw: '根', sl: '880'},
        {zmmc: '二波波形护栏板', zmh: '602-1-1', dw: 'm', sl: '880'}
      ]
      this.showFirstItemWindow = true
    },
    // 操作通过打回等按钮
    promiseTG (bol) {
      // 详情查看
      this.showDetail = false
      this.showFirstItemWindow = false
    },
    // 获取想要的枚举（工程量类型，损坏类型，巡查方向）
    getMeijulxbm () {
      let _param = '03,08,09'
      this.$api.getEnumByMeijulxbm('?meijulxbm=' + _param).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {

          let valuearr = {}
          valuearr = res.data.data.rows
          for (let item in valuearr) {

            if (item == '03') {
              this.xcvaluearr = valuearr[item]
            } else if (item == '08') {
              this.shlxarr = valuearr[item]
            } else if (item == '09') {
              this.gcllxarr = valuearr[item]
            }
          }

        }
      }).catch(e => {

      })
    },
    // 修改任务单保存
    submitjobOrder () {
      this.$api.updateRcyhgcSjqd(this.jldModel).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错了',
            type: 'error'
          })
        } else {

          this.$message({
            message: '信息修改成功',
            type: 'success'
          })
          this.showDetail = false
          this.queryYDJHData()
        }
      }).catch()
    },
    // 编辑任务单
    updatejobOrder (type, row) {
      this.jldModel = row
      this.updateFormDia(type, row)
    },
    // 查看详情
    seedetail (type, row) {
      console.log(row, 800)
      this.jldModel = row
      this.isseedetail = 1
      this.isShowwxcontent = true
      this.updateFormDia(type, row)
      this.getservicerecord(row.id)
    },
    // 获取事件清单列表的每个事件对应的维修记录
    getservicerecord (id) {
      this.$api.getRcyhgcWcrwdListBySjqdId('?id=' + id).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错了',
            type: 'error'
          })
        } else {

          // debugger
          this.tabList = res.data.data
          console.log(id,'===id')
          if (this.tabList && this.tabList.length !== 0) {
            let _param = this.tabList[0].id
            this.getwxContent(_param)
          }
          console.log( this.tabList )
        }
      }).catch(e => {

      })
    },
    // 用于添加任务单的病害类型
    getbhlxarr () {
      this.$api.createBhlxTree().then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错了',
            type: 'error'
          })
        } else {

          this.bhlxarr = res.data.data
          this.dealdata(res.data.data)
        }
      }).catch(err=>{

      })
    },
    // 处理病害类型级联数据
    dealdata (_data) {
      for (var i = 0; i < _data.length; i++) {
        if (_data[i].children.length < 1) {
          _data[i].children = undefined
        } else {
          this.dealdata(_data[i].children)
        }
      }
      return _data
    },
    // 添加事件任务单，养护任务单，任务单验收
    addjobOrder () {
      this.$api.insertRcyhgcSjqd(this.jldModel).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错了',
            type: 'error'
          })
        } else {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.showDetail = false
          this.queryYDJHData()
        }
      }).catch(e => {

      })
    },
    // 编辑 详情  本月完成情况 下月计划
    updateFormDia (type, row) {

      if (type == 'add') {
        this.tasktitle = '添加任务单'
        this.firstItemTit = '添加任务单'
        this.isupdate = false
      } else if (type == 'detail') {
        this.tasktitle = '任务单详情'
        this.firstItemTit = '任务单详情'
        this.wxorderobj = []
        this.beforeImg = []
        this.duringImg = []
        this.afterImg = []
      } else if (type == 'update') {
        this.tasktitle = '任务单编辑'
        this.firstItemTit = '任务单编辑'
        this.isupdate = true
      }
      this.showDetail = !this.showDetail
      this.showPlan = true
    },
    // 分页展示数据
    handleCurrentChange (val) {
      this.searchForm.pageNum = val
      this.queryYDJHData()
    },
    // 月度计划初始化查询
    searchYDJH () {
      this.queryYDJHData()
    },
    // 初始化列表数据
    queryYDJHData (val) {
      let {xmmc,xmbh,selectDate, pageNum, pageSize, daZzid} = this.searchForm
      let startDate, endDate
      if (selectDate && selectDate.length) {
        startDate = selectDate[0]
        endDate = selectDate[1]
      }
      let xmbhOfinit = {}
      if (val) {
        xmbhOfinit = val
      } else {
        if(config.userInfo.userType&&config.userInfo.userType =='供应商') {
          xmbhOfinit = this.restaurants[0]
        } else {
          xmbhOfinit.XMBH = ''
        }
      }
      this.$api.getRcyhgcSjqdList({xmbh: xmbh == undefined ? xmbhOfinit.XMBH : xmbh,startDate: startDate, endDate: endDate, pageNum, pageSize,daZzid, zt: '7,8,9,10,11,12'}).then(res => {

        if (res.status === 200) {
          this.YDJHData = res.data.data.rows
          this.total = res.data.data.totle
        } else {
          this.$message({
            message: '网络出错了',
            type: 'error'
          })
        }
      }).catch(err=>{

      })
    }
  },

  mounted () {
    this.getbhlxarr() // 病害类型
    this.getMeijulxbm() // 获取枚举数据
    this.getlxmessage() // 获取路段信息
    this.initqueryXMMC() // 获取项目名称列表
  }
}
</script>
<style lang="scss">
  .el-upload-list__item{
    padding-top: 0;
  }
  .uploadFiles{
    display: flex;
    align-self: center;
    margin-top: 20px;
    .el-upload-list{
      margin-left: 10px;
      /*display: flex;*/
      align-self: center;
      background: #f7f9fb;
      height: 36px;
      li{
        height: 100%;
        margin-right: 20px;
        margin-top: 0px;
        padding-top: 5px;
      }
    }
  }
  .rwd{
    display: inline-block;
    width: calc(100% - 120px);
    background: #f7f9fb;
    border-radius:4px;
    height: 36px;
    line-height: 36px;
    padding-left: 8px;
    span{
      position: relative;
      display: inline-block;
      margin-right: 30px;
      i{
        position: absolute;
        top: -5px;
        right:-14px;
      }
    }
  }
  .updateImg{
    .el-upload-list{
      li{
        width: 64px;
        height: 64px;
      }
    }
    .el-upload{
      width: 64px;
      height: 64px;
      line-height: 74px;
    }
  }
  .middleInput{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 101px 0 10px;
  }
  .searchInputVal input{
    height: 30px;
  }

  .goDetail{
    margin-top: 20px;
    margin-bottom: 20px;
    i{
      color: #1f262e;
      margin-right: 10px;
    }
  }
  .buttons>span{
    cursor: pointer;
  }
  .windowAramFirst{
    position: absolute;
    top:0;
    width: calc(100% - 19px);
    height: 100%;
    z-index:999;
    margin: auto;
    background: #fff;
    padding-bottom:30px;
    /*border-top: 1px solid #dfe1e4;*/
    .detailItem_tit{
      border-left: 2px solid #409eff;
      padding-left: 10px;
      height:16px;
      line-height: 16px;
      margin-bottom: 20px;
    }
  }
  .detailItem_tit{
    border-left: 2px solid #409eff;
    padding-left: 10px;
    height:16px;
    margin-top: 20px;
    margin-bottom: 20px;
    line-height: 16px;
  }
  .wxtabArea {
    width: 100%;
    height:calc(100% - 370px);
    overflow-y: auto;
    padding-left: 31px;
    background: #fff;

  }
  .eiconsty {
    padding-right: 10px;
    height: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
    line-height: 16px;
    font-size: 12px;
  }
  .closeBTN{
    position: absolute;
    left:0;
    right: 0;
    width: 20px;
    margin: auto;
    top: -38px;
    z-index: 999;
    font-size:60px;
    color: #D5D6D7;
    cursor: pointer;
  }
  .SPState{
    position: absolute;
    right: 26px;
    top: 17px;
    z-index: 999;
    cursor: pointer;
    p{
      display: inline-block;
      padding: 0 5px;
      height: 30px;
      -webkit-border-radius:5px;
      -moz-border-radius:5px;
      border-radius:5px;
      font-size: 14px;
      cursor: pointer;
      text-align: center;
      line-height: 30px;
      border: 1px solid #e6ecf5;
    }
  }
  .workimg {
    width: 30px;
    height: 20px;
    margin-right: 10px;
    vertical-align: middle;
    cursor: pointer;
  }
</style>
