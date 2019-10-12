/**
* ----任务单归档
*/
<template>
  <div id="kgsqd" style="height: 100%;position:relative;" >
    <div class="header" v-show="!showDetail" >
      <span class="headerTit">任务单归档</span>
      <div class="header_option">
        <ul>
          <!--<li><i class="el-icon-search"> 查询</i></li>-->
          <!--<li><i class="icon iconfont icon-export"> 导出</i></li>-->
          <!--<li @click="updateFormDia('add');isseedetail = 0"><i class="el-icon-edit-outline"> 添加</i></li>-->
          <!--<li @click="deleterows"><i class="el-icon-delete"> 删除</i></li>-->
        </ul>

      </div>
    </div>
    <!--删除区域弹框-->
    <!--<el-button type="text" @click="deleterows" v-if="isopendelete">点击打开 Message Box</el-button>-->
    <!--查询弹框区域-->
    <div class="conter_table" v-show="!showDetail" style="padding: 0 15px;">
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
            <el-button @click="searchYDJH" size="mini" style="background-color: #DF4D4A;border-color: transparent;color: #fff;">查询</el-button>
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
            <span v-if="scope.row.zt == 8">申请验收</span>
            <span v-if="scope.row.zt == 9">已验收</span>
            <span v-if="scope.row.zt == 10">已归档</span>
            <span v-if="scope.row.zt == 11">已计量</span>
            <span v-if="scope.row.zt == 12">已支付</span>
          </template>
        </el-table-column>
        <el-table-column align="left" sortable prop="fxsjStr" label="日期" show-overflow-tooltip></el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="90">
          <template scope="scope">
            <!--{{typeof parseInt(scope.row.zt)}}-->
            <span style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                  @click="seedetail('detail',scope.row)">详情</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                  @click="seedetail('detail',scope.row, 'guid');isseedetail = 0" v-show="parseInt(scope.row.zt) < 10 && scope.row.wcrwdsl !=0">归档</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页区域-->
    <footer class="footer" v-show="!showDetail" >
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
      <!--<div v-show="showPlan" class="titleclass" style="padding-left: 16px;">-->
        <!--<span class="icon iconfont icon-arrow-left titleclasschild" @click="showDetail = false;isShowwxcontent = false" -->
              <!--style="font-size: 16px; margin-right: 15px; cursor: pointer;"></span>-->
        <!--{{firstItemTit}}-->
      <!--</div>-->
      <div style="padding-left: 31px;">
        <p class="addJLD" v-for = '(item, keyname) in nameObj1'>
          <span class="inputlabel">{{item}} ：</span>
          <span class="spanwidth">{{jldModel[keyname]}}</span>
        </p>
      </div>
      <div class="eiconsty" style="padding-left: 16px;">
        <span class="iconfont icon-zhifuguanli" style="font-size: 12px;padding-right: 10px;"></span><span>事件信息</span>
      </div>
      <div style="padding-left: 31px;font-size: 0;">
        <p class="addJLD" v-for = '(item, keyname) in eventname' :style="keyname == 'bhsm' ? 'width: 85%;' : ''">
          <span class="inputlabel">{{item}} ：</span>
          <span class="spanwidth" v-if="keyname == 'bhsm'" style="width: 80%;vertical-align: middle;">{{jldModel[keyname]}}</span>
          <span class="spanwidth" v-else-if="keyname == 'xcfx' && jldModel[keyname] == '0301'">上行</span>
          <span class="spanwidth" v-else-if="keyname == 'xcfx' && jldModel[keyname] == '0302'">下行</span>
          <span class="spanwidth" v-else-if="keyname == 'xcfx' && jldModel[keyname] == '0303'">全幅</span>
          <span class="spanwidth" v-else>{{jldModel[keyname]}}</span>
        </p>
      </div>
      <div style="width: calc(100% + 17px);margin-left: -17px;margin-right: 0px;padding-left: 0px; padding-right: 0px;height:4px;background-color: #c0cad6;"></div>
      <!--维修记录-->
      <div class="eiconsty wxstyle">
        <span class="iconfont icon-sanjiaoxing" style="font-size: 13px;padding-left: 10px;" @click="isShowwxcontent = true" v-if="isShowwxcontent === false"></span>
        <span class="iconfont icon-sanjiao01" style="font-size: 13px;padding-left: 10px;" @click="isShowwxcontent = false" v-if="isShowwxcontent === true"></span>
        <span>维修记录</span>
        <el-button style="background-color: #DF4D4A;border-color: transparent;color: #fff;position: relative;left: 90%;top:1px;"  size="mini" v-if="isseedetail == 0" @click="updatezmxx">保存</el-button>
      </div>
      <!--维修记录子表内容-->
      <div class="wxtabArea" v-show="isShowwxcontent">
        <el-tabs v-model="activeName" @tab-click="handleClick"  style="margin-right: 16px;" :before-leave='leaveTab'>
          <el-tab-pane :label="item.wcsj" :name="'active'+index" v-for="(item, index) in tabList" :key="item.id"></el-tab-pane>
        </el-tabs>
        <div style="padding-left: 15px;">
          <div v-for="(item, index) in wxorderobj" :key="index" style="margin-bottom: 15px;border-bottom: 1px solid #f1f4f7;font-size: 0;">
            <p class="addJLD">月度计划工程内容 ：<span>{{item.gcnr}}</span></p>
            <p class="addJLD">病害类型 ：<span>{{item.bhname}}</span></p>
            <p class="addJLD">数&nbsp;&nbsp;&nbsp;&nbsp;量 ：<span>{{item.sl}} {{item.dw}}</span></p>
            <p class="addJLD" v-show="isseedetail == 1">子目编号 ：<span>{{item.zmbh}}</span></p>
            <p class="addJLD" v-show="isseedetail == 1">子目名称 ：<span>{{item.zmmc}}</span></p>
            <p class="addJLD" v-show="isseedetail == 0">子目编号 ：
              <!--<el-cascader-->
                <!--size="mini"-->
                <!--v-if="isseedetail == 0"-->
                <!--:options="zmbhzrr"-->
                <!--:props="zmprops"-->
                <!--v-model="item.bh"-->
                <!--:show-all-levels="false"-->
                <!--filterable-->
                <!--@focus="getitem(item,index)"-->
                <!--@change="handlechangezmmc"-->
              <!--&gt;</el-cascader>-->
              <el-input size="mini" @focus="addzb = true; arrindex = index" v-model="item.zmbh"></el-input>
            </p>
            <p class="addJLD" v-show="isseedetail == 0">子目名称 ：<span>{{item.zmmc}}</span></p>
            <p class="addJLD" style="width: 69%;margin-bottom: 24px;">备&nbsp;&nbsp;注 ：<span>{{item.bz}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <!--搜索弹窗-->
    <Dialog :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :dialogVisible="dialogVisible"
            @searchXMMC="searchXMMC"
            @searchXMBH="searchXMBH"
            @closeDialog="closeDialog">
    </Dialog>
    <!--添加子目弹框-->
    <el-dialog
      v-show="addzb"
      title="添加子目"
      :visible.sync="addzb"
      width="1100px"
      class="addzmstyle"
    >
      <div class="treeWrap">
        <div class="tree" style="height: 470px;overflow-y: auto;display: inline-block;width: 180px;vertical-align: top">
            <el-tree
              :data="zmbhzrr"
              :props="zmprops"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="choosedRole"
              @check-change="handleCheckChange"
              :expand-on-click-node="true">
            </el-tree>
        </div>
        <div class="treeRight" style="height: 470px;overflow-y: auto;display: inline-block;width:calc(100% - 200px)">
          <el-table tooltip-effect="dark"
                    :data="treeRightData"
                    highlight-current-row
                    row-class-name="row_class"
                    @row-dblclick="saveAdd"
                    @row-click="clickrightrow"
                    border>
            <!--<el-table-column align="center" class-name="column-caoz" label="操作" width="50">-->
              <!--<template slot-scope="scope">-->
                <!--<i class="el-icon-delete"  style="color:#00a2fd;cursor: pointer;" title="删除"  @click="deleteZM(scope.row,scope.$index)"></i>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center" label="子目编号" width="80">
              <template slot-scope="{row,$index}">
                <span >{{row.data.bh}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="子目名称">
              <template slot-scope="{row,$index}">
                <span>{{row.data.mc}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="treeBtn" style="margin-top: 10px;padding-bottom: 15px;">
          <el-button size="small" @click="saveAdd" type="text" style="display:block;margin:0px auto;width: 64px;height: 35px;background-color: #DF4D4A;border-radius: 4px;color: #fff">确定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="confirmGD"
      width="30%"
      :before-close="closeconfirmGD">
      <span>是否要将上一条维修记录归档</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmGD = false">取 消</el-button>
        <el-button type="primary" @click="senddatatogd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
export default {
  components: {Dialog},
  data () {
    return {
      gdstatus : 0,
      confirmGD: false,
      addzb: false,
      choosedRole: [5],
      treeRightData: [],
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
      dialogData: [],
      dialogTableTit:{
        XMMC:'项目名称',XMBH:'项目编号',
      },
      datatypes:'',
      restaurants:[],

      arrindex: null,
      submitparamarr: [],
      changezmmc: '',
      zmbhvalue: '',
      zmbhzrr: [],
      wxorderobj: [],
      tabList: [],
      activeName: 'active0',
      showwxzbDetail: false,
      isShowwxcontent: true,
      lxmc: '',
      dialogVisible2: false,
      isvisitable: false,
      rowobjId: '',
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
      zmprops: {
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
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      tableTits: {
        xmmc: '项目名称',
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
      },
      // 任务清单的数据
      YDJHData: [],
      detailItemInfo: [], // 本月完成情况详情数据
      showDetail: false,
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
      rightObj: {},
      gdrowobj: {}
    }
  },
  methods: {
    senddatatogd () {
      var p = new Promise((resolve, reject) => {
        console.log(reject, 9090)
      })
      return p
    },
    closeconfirmGD () {
      this.confirmGD = false
    },
    leaveTab (activeName,oldActiveName) {
      // debugger
      let firstindex = oldActiveName.split('e')[1]
      let secondindex = activeName.split('e')[1]
      if (parseInt(firstindex) < parseInt(secondindex) && this.gdstatus == 0) {
        for (var i = 0; i < this.wxorderobj.length; i++) {
          if (this.wxorderobj[i].zmbh == null) {
            var p = new Promise((resolve, reject) => {
              this.$confirm('维修记录未归档请先归档', '提示', {
                confirmButtonText: '取消',
                cancelButtonText: '确定',
                type: 'warning'
              }).then(() => {
                // 你可以在这儿做些操作
                // resolve()
              }).catch(err => {
                // 你可以在这儿做些操作
                reject(err)
              })
            })
            return p
          }
        }
      } else {
        console.log(1111111)
      }

    },
    makesure () {
      return this.$confirm('离开将不保存本页修改', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      }).catch(() => {
        throw new Error('取消成功！')
      })
    },
    // 点击子目弹窗右侧列表
    clickrightrow (row) {
      console.log(row,5)
      if (row) {
        this.rightObj = row.data
      }
    },
    saveAdd(){
      this.addzb = false
      this.wxorderobj[this.arrindex].zmbh = this.rightObj.bh
      this.wxorderobj[this.arrindex].zmmc = this.rightObj.mc
      this.wxorderobj[this.arrindex].zmid = this.rightObj.id
      this.wxorderobj[this.arrindex].zmbh = this.rightObj.bh
    },
    deleteZM(info,index){
      this.treeRightData.splice(index,1)
    },
    // 是否选择子目信息
    handleCheckChange(data, checked, indeterminate) {

      let datas = data
      if(checked){
        // debugger
        console.log(data,2)
        if(!data.length){
          this.treeRightData.push(data)
        }
      }else{
        this.treeRightData = this.treeRightData.filter(item=>  item.id != datas.id)
      }
    },
    initUser(){
      let userInfo = JSON.parse(localStorage.getItem('userMsg'))[0]
      if(userInfo){

        if(userInfo){
          this.userInfo.yhbm = userInfo.userCode
          this.userInfo.yhid = userInfo.userId
          this.userInfo.yhmc = userInfo.userName
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
    // 远程搜索项目名称list
    initqueryXMMC(){
      this.$api.getmcbhList2().then(res=>{
        if(res.code == 1){
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
    handleSelectMC(item){
      //getXmmcList
      this.searchForm.xmmc = item.XMMC
      this.searchForm.xmbh = item.XMBH
      // this.$api.getXmmctoxmbhList({xmmc:item.XMMC}).then(res=>{
      //   if(res.code == 1){
      //     this.searchForm.xmbh = res.data?res.data[0].XMBH:''
      //   }else{
      //     this.searchForm.xmbh = ''
      //   }
      // })
    },
    // 改变子目编号
    handlechangezmmc (val) {
      console.log(val,3445)

      // debugger
      // this.changezmmc = val[val.length - 1].mc
      this.wxorderobj[this.arrindex].zmmc = val[val.length - 1].mc
      this.wxorderobj[this.arrindex].zmid = val[val.length - 1].id
      this.wxorderobj[this.arrindex].zmbh = val[val.length - 1].bh
      console.log(this.wxorderobj);
    },
    // 获取当前子目编号对应的子目信息
    getitem (item,index) {

      this.arrindex = index
      // this.changezmmc = item.xmmc
    },
    // 获取子目编号的树结构
    getzmTreedata (row) {
      console.log(row, 'gd')
      this.$api.createZmxxRootNode('?xmbh='+ row.xmbh).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {

          this.zmbhzrr = res.data.data
          this.dealdata(res.data.data)
        }
      }).catch(e => {

      })
    },
    // 点击归档修改子目信息保存
    updatezmxx () {
      if(this.wxorderobj.length){
        this.$api.batchUpdateRcyhgcWcrwdZb(this.wxorderobj).then(res => {
          this.isShowwxcontent = false
          this.showDetail = false;
          if (res.status !== 200) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            if(res.data.code == 1){
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.confirmGD = false
              this.gdstatus = 1
              this.queryYDJHData()
            }else{
              this.$message({
                message: '失败',
                type: 'info'
              })
            }

          }
        }).catch(e => {

        })
      }else{
        this.$message({
          message: '请编辑维修记录',
          type: 'info'
        })
      }

      // this.isShowwxcontent = false


    },
    // 切换维修记录
    handleClick (tab, event) {
      console.log(tab,1111)
      console.log(event,2222)
      let _param = this.tabList[tab.index].id
      this.openwxDatas(_param)
    },
    openwxDatas (_param) {
      this.$api.getRcyhgcWcrwdZbListByWcrwdId('?id=' + _param).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {
          this.wxorderobj = res.data.data
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 提交养护任务单验收单
    sqdsubmit () {

      this.$api.insertYhrwysd(this.rowobj).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {

          this.$message({
            message: '申请单提交成功',
            type: 'success'
          })
          this.isvisitable = false
        }
      }).catch(e => {

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
      this.searchForm.xmmc = undefined
      this.searchForm.xmbh = undefined
      this.searchForm.selectDate = undefined
      this.searchForm.yd = undefined
      this.searchForm.pageNum = 1
    },
    deleterows () {
      let _param = this.deleteIds
      console.log(_param)
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
          message: '请先选择要删除的数据',
          type: 'warning'
        })
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
    seedetail (type, row, param) {

      this.jldModel = row
      this.isseedetail = 1
      this.isShowwxcontent = true
      this.updateFormDia(type, row)
      this.getservicerecord(row.id)
      if (param == 'guid' && row) {
        this.getzmTreedata(row) // 获取子目树结构
      }
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
          this.tabList = res.data.data && res.data.data.length !== 0 ? res.data.data : []
          if (this.tabList.length !== 0) {
            this.openwxDatas(this.tabList[0].id)
          }

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
      let {xmmc,xmbh,selectDate, pageNum, pageSize} = this.searchForm
      let startDate, endDate
      if (selectDate && selectDate.length) {
        startDate = selectDate[0]
        endDate = selectDate[1]
      }
      let {orgid,yhid,bmid} = this.userInfo
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
      this.$api.getRcyhgcSjqdList({xmbh: xmbh == undefined ? xmbhOfinit.XMBH : xmbh,startDate: startDate, endDate: endDate, pageNum, pageSize, zt: '9,10',daZzid:orgid}).then(res => {
        // debugger
        if (res.status === 200) {
          this.YDJHData = res.data.data.rows
          this.total = res.data.data.totle
        } else {
          this.$message({
            message: '网络出错了',
            type: 'error'
          })
        }
      })
    }
  },
  mounted () {
    this.initUser()
    this.initqueryXMMC()
    this.getbhlxarr() // 病害类型
    this.getMeijulxbm() // 获取枚举数据
    this.getlxmessage() // 获取路段信息
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
    height:calc(100% - 440px);
    overflow-y: auto;
    padding-left: 31px;
    background: #fff;
  }
  .eiconsty {
    padding-right: 10px;
    height: 16px;
    margin-top: 10px;
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
</style>
