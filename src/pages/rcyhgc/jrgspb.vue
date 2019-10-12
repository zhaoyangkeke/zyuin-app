/**
* ----计日工(台班)审批表
*/
<template>
  <div id="zljcpfb" style="height: 100%" v-loading="loading">
    <div class="header">
      <span class="headerTit">计日工(台班)审批表</span>
      <div class="header_option">
        <ul>
          <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
          <li @click="showAdd"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table">
      <div class="chaxun">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">

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
                <div class="name">{{item.XMMC}}</div>
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
            <el-button size="mini" @click="search(1, 10)" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
            <el-button @click.native="resizeSearch" size="mini">重置</el-button>

          </el-form-item>
        </el-form>
      </div>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                style="width: 100%;"
                row-class-name="row_class"
                border
                :row-style="{fontFamily: '-apple-system', fontSize: '13px'}"
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
        <el-table-column align="left" sortable prop="djbh" label="单据编号"  show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="xmmc" label="项目名称" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="cbdwmc" label="承包单位"> </el-table-column>
        <el-table-column align="left" sortable prop="hjje" label="合计金额"> </el-table-column>
        <el-table-column align="left" sortable prop="sgdwmc" label="施工单位"> </el-table-column>
        <el-table-column align="left" sortable prop="sfwtgld" label="是否为托管单位"> </el-table-column>
        <el-table-column align="left" sortable prop="tbrq" label="填报日期"> </el-table-column>
        <el-table-column align="left" sortable prop="djbh" label="状态"  show-overflow-tooltip>
          <template scope="{row}">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" v-if="row.zt==0.1 ">自由</span>
            <span style="color:#D34C42;cursor: pointer;text-align: center" v-if="row.zt==1 ">审核中</span>
            <span style="color:#00a2fd;text-align: center" v-if="row.zt==2 ">已审核</span>
            <span style="color:#00a2fd;text-align: center" v-if="row.zt==3 ">已汇总</span>
          </template>
        </el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="150">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" v-if="scope.row.zt==0.1"  @click="updateFormDia(scope.row, scope.$index)" >编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row);isshowzmdetail = false">详情</span>
            <span  @click="spForm(scope.row)" v-if="scope.row.zt==0.1" style="color:#00a2fd;cursor: pointer;text-align: center">提交</span>
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
          <span>计日工(台班)</span>
        </p>
        <div class="SPState">
          <el-button size="mini" v-if="!showxq && isadd" style="background-color: #DF4D4A;border-color: transparent;color: #fff"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="mini" v-if="!showxq && !isadd" style="background-color: #DF4D4A;border-color: transparent;color: #fff" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="mini" v-if="!showxq" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 10px">取消</el-button>
        </div>

      </div>
      <div class="dialog_warp" style="height: calc(100% - 50px)">
        <div style="font-size: 0;" v-if="!showxq">
          <p class="addJLD">
            <span class="addJLD_tit">项目名称 ：</span>
            <span v-if="showxq">{{lmshForm.xmmc}}</span>
            <el-select clearable v-if="!showxq" :disabled="showxq" size="mini" style="width: 100%;" :value="htbh"  value-key="xmbh"
                       @change="selectHt">
              <el-option
                v-for="(item,index) in htList" :key="index" :label="item.XMMC"  :value="item"> </el-option>
            </el-select>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">单据编号 ：</span>
            <el-input style="font-size: 13px;color: #000;" size="mini" :disabled="true" type="text" v-model="lmshForm.djbh"> </el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">承包单位 ：</span>
            <el-input size="mini"  :disabled="true" type="text" v-model="lmshForm.cbdwmc"> </el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">合计金额 ：</span>
            <el-input size="mini" :disabled="true" type="text" v-model="lmshForm.hjje"> </el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">填报日期 ：</span>
            <el-date-picker
              :disabled="showxq"
              v-model="lmshForm.tbrq"
              size="mini"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </p>
          <p class="addJLD"  v-if="showTgdw">
            <span class="addJLD_tit">是否为托管单位 ：</span>
            <el-select  :disabled="showxq" size="mini" v-model="lmshForm.sfwtgld" placeholder="请选择">
              <el-option
                label="是"
                value="是">
              </el-option>
              <el-option
                label="否"
                value="否">
              </el-option>
            </el-select>
            <!--<el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.hjje"> </el-input>-->
          </p>
          <p style="font-size: 13px">
            <!--<span class="addJLD_tit" style="display: inline-block;width: 100px;text-align: right;">附件 ：</span>-->
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
        <div class="zibnr" v-show="showDetailItem" style="overflow-x: auto;overflow-y: hidden;margin-top: 25px;">
          <ul class="listTable">
            <li>
              <span>子目号</span><span>子目名称</span><span>单位</span><span>数量</span><span>单价</span><span>金额</span><span>用途</span>
            </li>
            <li v-for="(item, index) in lmshForm.mxList" :key="index">
              <p>
                <el-input size="mini" :disabled="showxq" type="text" v-model="item.zmh"></el-input>
              </p>
              <p>
                <el-input size="mini" :disabled="showxq" type="text" v-model="item.zmmc"></el-input>
              </p>
              <p>
                <el-input size="mini" :disabled="showxq" type="text" v-model="item.dw"></el-input>
              </p>
              <p>
                <el-input size="mini" :disabled="showxq" type="text" v-model="item.sl" @change="tongjije(item, index)"></el-input>
              </p>
              <p>
                <el-input size="mini" :disabled="showxq" type="text" v-model="item.dj" @change="tongjije(item, index)"></el-input>
              </p>
              <p>
                <el-input size="mini" :disabled="showxq" type="text" v-model="item.je"></el-input>
              </p>
              <p>
                <el-input size="mini" :disabled="showxq" type="text" v-model="item.yt"></el-input>
              </p>
            </li>
            <div style="clear: both"></div>
          </ul>
          <div style="float: left;margin-top:20px;margin-left: 13px;">
            <span>文件列表 ：</span>
            <a style="margin-right: 20px;" v-for="(files,index) in fildDatas" target="_blank" :key="index" :href="files.file_path">{{files.file_yname}}</a>
          </div>
        </div>
        <div class="dialog_footer" style=" text-align: left;">
          <div v-if="!showxq" style="width: calc(100% + 16px);margin-left: -16px;margin-right: 0px;padding-left: 0px; padding-right: 0px;height:4px;background-color: #c0cad6;"></div>
          <div class="header" v-if="!showxq" style="width: calc(100% + 16px);margin-left: -16px;height: 36px;line-height: 36px;padding-top: 0px;">
            <span class="headerTit" style="text-align: left;">子目清单</span>
            <el-button size="mini"  class="dialog-button bao_cun" v-if="!showxq&&isadd" style="background-color: #DF4D4A;border-color: transparent;color: #fff;position: relative;left: 91%;top: -1px;" @click="addMx(true)">
              添加子目
            </el-button>
            <el-button size="mini"  style="background-color: #DF4D4A;border-color: transparent;color: #fff;position: relative;left: 91%;top: -1px;"  class="dialog-button bao_cun" v-if="!showxq&&!isadd" @click="addMx(false)">
              编辑子目
            </el-button>
          </div>
        </div>
        <!--页面显示添加字母保存后的信息-->
        <div v-show="isshowzmdetail" style="width: 99%;height:calc(100% - 300px);background: pink">
          <el-table ref="multipleTable" :data="treeRightData" tooltip-effect="dark"
                    style="width: 100%;"
                    height="100%"
                    row-class-name="row_class"
                    border
                    :row-style="{fontFamily: '-apple-system', fontSize: '13px'}"
                    @selection-change="handleSelectionChange">
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column align="center" sortable  prop="data.bh" label="子目编号"  show-overflow-tooltip> </el-table-column>
            <el-table-column align="center" sortable  prop="data.mc" label="子目名称" show-overflow-tooltip> </el-table-column>
            <el-table-column align="center" sortable  prop="data.dw" label="单位"> </el-table-column>
            <el-table-column align="center" sortable  prop="data.sl" label="数量"> </el-table-column>
            <el-table-column align="center" sortable  prop="data.dj" label="单价"> </el-table-column>
            <el-table-column align="center" sortable  prop="dj" label="金额">
              <template slot-scope="{row,$index}">
                <span>{{Number(row.data.sl)*Number(row.data.dj)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" sortable prop="data.tbrq" label="用途"> </el-table-column>
          </el-table>
        </div>
      </div>

    </div>

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
               ref="tree"
               :data="data4"
               :props="defaultProps"
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
                    :data="zsData"
                    row-class-name="row_class"
                    border>
            <el-table-column align="center" class-name="column-caoz" label="操作" width="50">
              <template slot-scope="scope">
                <i class="el-icon-delete"  style="color:#00a2fd;cursor: pointer;" title="删除"  @click="deleteZM(scope.row,scope.$index)"></i>
              </template>
            </el-table-column>
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
            <el-table-column align="center" label="单位" width="60">
              <template slot-scope="{row,$index}">
                <span >{{row.data.dw}}</span>

              </template>
            </el-table-column>
            <el-table-column align="center" label="数量" width="60">
              <template slot-scope="{row,$index}">
                <input type="text"  style="width: 100%" v-model="row.data.sl">

              </template>
            </el-table-column>
            <el-table-column align="center" label="单价" width="60">
              <template slot-scope="{row,$index}">
               <span>{{row.data.dj}}</span>

              </template>
            </el-table-column>
            <el-table-column align="center" prop="yd" label="金额" width="100">
              <template slot-scope="{row,$index}">
               <span>{{Number(row.data.sl)*Number(row.data.dj)}}</span>

              </template>
            </el-table-column>
            <el-table-column align="center" label="用途">
              <template slot-scope="{row,$index}">
                <input type="text" style="width: 100%"  v-model="row.data.yt">
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="treeBtn" style="margin-top: 10px;">
          <el-button size="small" @click="saveAdd" type="text" style="display:block;margin:0px auto;width: 64px;height: 35px;background-color: #DF4D4A;border-radius: 4px;color: #fff">保存</el-button>
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
      zsData:[],
      showTgdw:false,
      dialogVisible: false,
      dialogData: [],
      dialogTableTit:{
        XMMC:'项目名称',XMBH:'项目编号',
      },
      datatypes:'',
      isshowzmdetail: false,
      fildDatas:[],
      uuidsID:'',
      choosedRole:[],
      ztData:['','审核中','已审核','已汇总'],
      showDetailItem:true,
      data4:[
          {
            id: "id1",
            children: [
              {
                id: "id2",
                text: "101-1",
                isFinalLeafNode: null,
                data: {
                  id: "id2",
                  xmbh: "LrTestXmId",
                  bh: "101-1",
                  mc: "保险费",
                  dw: null,
                  sl: null,
                  dj: null,
                  hj: null,
                  bz: null,
                  pid: "id1",
                  xh: "1"
                },
                children: [
                  {
                    id: "id3",
                    text: "-a",
                    isFinalLeafNode: null,
                    data: {
                      "id": "id3",
                      "xmbh": "LrTestXmId",
                      "bh": "-a",
                      "mc": "按合同条款规定，提供建筑工程一切险",
                      "dw": "总额",
                      "sl": "1",
                      "dj": null,
                      "hj": "0",
                      "bz": null,
                      "pid": "id2",
                      "xh": "1"
                    },
                    "children": []
                  },
                  {
                    "id": "id4",
                    "text": "-b",
                    "isFinalLeafNode": null,
                    "data": {
                      "id": "id4",
                      "xmbh": "LrTestXmId",
                      "bh": "-b",
                      "mc": "按合同条款规定，提供第三方责任险",
                      "dw": "总额",
                      "sl": "1",
                      "dj": null,
                      "hj": "0",
                      "bz": null,
                      "pid": "id2",
                      "xh": "2"
                    },
                    "children": []
                  }
                ]
              },
              {
                id: "id5",
                text: "102-1",
                isFinalLeafNode: null,
                data: {
                  id: "id5",
                  xmbh: "LrTestXmId",
                  bh: "102-1",
                  mc: "竣工文件（档案资料编制）",
                  dw: "总额",
                  sl: "1",
                  dj: null,
                  hj: "0",
                  bz: null,
                  pid: "id1",
                  xh: "2"
                },
                children: []
              },
              {
                id: "id6",
                text: "102-2",
                isFinalLeafNode: null,
                data: {
                  id: "id6",
                  xmbh: "LrTestXmId",
                  bh: "102-2",
                  mc: "安全生产费",
                  dw: "总额",
                  sl: "1",
                  dj: null,
                  hj: "0",
                  bz: null,
                  pid: "id1",
                  xh: "3"
                },
                children: []
              },
              {
                id: "id7",
                text: "104-1",
                isFinalLeafNode: null,
                data: {
                  id: "id7",
                  xmbh: "LrTestXmId",
                  bh: "104-1",
                  mc: "承包人驻地建设",
                  dw: "总额",
                  sl: "1",
                  dj: null,
                  hj: "0",
                  bz: null,
                  pid: "id1",
                  xh: "4"
                },
                children: []
              }
            ]
          },

      ],
      treeRightData:[],
      defaultProps: {
        children: 'children',
        label: 'text'
      },

      total:0,
      lmshForm: {
        djbh:'123',
        hjje:'',
        cbdwmc:'',
        dwmc:'',
        tbrq:'',
        tbr:'',
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
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      roadOptions: [],
      searchForm: {xmmc:'',jcrq:'',xmbh:undefined},
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      multipleSelection: [],
      htbh:'',
      htList: [],
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
    fjRemove(file, fileList){
      this.fildDatas = fileList
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
    initqueryXMMC(){
      this.$api.getmcbhList2().then(res=>{
        if(res.code == 1){
          this.restaurants = res.data&&res.data.length?res.data:[]
          if (config.userInfo.userType&&config.userInfo.userType =='供应商') {
            this.search(1, 10,this.restaurants[0])
          } else {
            this.search(1, 10)
          }
        }else{
          this.restaurants = []
        }
      })
    },
    handleSelectMC(item){
      this.searchForm.xmmc = item.XMMC
      this.searchForm.xmbh = item.XMBH

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
    selectable2(row, index){   //禁用第四个
      if(row.zt != 0.1){
        return false
      }else{
        return true
      }

    },
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
      this.lmshForm.tbrq = clock
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
    resizeSearch(){
      this.searchForm = {xcfx:'',jcrq:'',lxcode:''}
      this.searchForm.xmbh = undefined
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
    deleteZM(info,index){
      // this.lmshForm.sgjhsbmx.splice(index, 1)
    // this.treeRightData.splice(index,1)
     this.zsData.splice(index,1)
     this.$refs.tree.setCheckedNodes(this.zsData)
      // this.choosedRole
    },
    spForm(info){
      let {yhmc,yhid,bmmc,orgmc} = config.userInfo
      let self = this
      this.$confirm('是否通过提交?',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {

        self.$api.createWorkFlow({
            pc_initiator:yhmc,
            pc_initiatorid: yhid,
            pc_name: '09',
            pc_project_id: info.id,
            pc_remarks: '',
            pc_state: '',
          },{
            group:bmmc,
            org:orgmc}).then(resp=>{
            if(resp.code == 1){
              self.$api.updateJrgZtByJrgid({id:info.id,zt:'1'}).then(res=>{
                if(res.code == 1){
                  self.search(1,10)
                  self.$message({
                    type: 'success',
                    message: '提交成功!'
                  });
                }else{
                  self.$message({
                    type: 'info',
                    message: res.msg
                  });
                }
              })
            }else{
              self.$message({
                type: 'info',
                message: resp.msg
              });
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    saveAdd(){
        this.addzb = false
        this.isshowzmdetail = true
         this.treeRightData = this.zsData
      // lmshForm.hjje
      let zjg = 0
      this.zsData.forEach(item=>{
        if(item.data){
          zjg += parseFloat(item.data.dj) * parseFloat(item.data.sl)
        }
      })

      this.lmshForm.hjje = zjg
    },
    handleCheckChange(data, checked, indeterminate) {

      let datas = data
      if(checked){
          if(!data.children.length){
            this.zsData.push(data)
          }
      }else{
        this.zsData = this.zsData.filter(item=>  item.id != datas.id)
      }
    },
    addMx(bol){
      this.showDetailItem = false
      this.zsData = []
      if(!this.lmshForm.jrgsp_htbh){
        this.$message({
          message: '请选择工程名称',
          type: 'info'
        });
      }else{
        this.addzb = true
        this.$api.createZmxxRootNode2({xmbh:this.lmshForm.jrgsp_htbh}).then(res=>{
          if(res.code == 1){
            this.data4 = res.data.length?res.data:[]
            // this.zsData = res.data.length?res.data:[]
          }else{
            this.data4 = []
            // this.zsData = []
          }

        })
      }

    },
    tongjije (item, index) {

      // this.lmshForm.jlzf_jrgspmx[index].jrgmx_je = item.jrgmx_sl * item.jrgmx_dj
    },
    showAdd () {
      this.uuidsID = this.guid()
      this.showDetailItem = false
      this.lmshForm.djbh = 'jrg' + Date.now();
      this.fildDatas  = []
      this.treeRightData = []
      this.zsData  = []
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      this.htbh = ''
      this.$api.getmcbhList2().then(res=>{
       if(res.code == 1){
         this.htList = res.data

          }
      })
      this.getYear()
    },
    guid(){
      let str = (((1+Math.random())*0x10000)|0).toString(16).substring(1)
      return (str+str+"-"+str+"-"+str+"-"+str+"-"+str+str+str);
    },
    updateFormDia (row, index) {
      this.isshowzmdetail = true
      this.showDetail = true
      this.showDetailItem = false
      this.isadd = false
      this.uuidsID = row.id
      this.showxq = false
      this.showTgdw = row.sfwtgld == '是'?true:false
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.htbh = this.lmshForm.xmmc ;
      this.lmshForm.jrgsp_htbh= this.lmshForm.xmbh
      this.treeRightData = []
      this.fildDatas = []
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

      this.lmshForm.mxList.forEach(item=>{

        this.treeRightData.push({data:{
           bh: item.zmh,
           mc: item.zmmc,
           dw: item.jldw,
           sl: item.sl,
           dj:item.dj,
           yt:item.yt
          }
        })
        this.choosedRole.push(item.zmid)
      })

      this.index = index
      this.$api.getmcbhList2().then(res=>{
        if(res.code == 1){
          this.htList = res.data
        }
      })

    },
    showBhFormDia (row) {

      this.showDetail = true
      this.showDetailItem = true
      this.showxq = true
      this.fildDatas = []
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
    search (currentPage, pageSize, val) {
      this.showSearch = false
      if (this.searchForm.jcrq) {
        this.searchForm.ksrq = this.searchForm.jcrq[0]
        this.searchForm.jsrq = this.searchForm.jcrq[1]
      }
      let {ksrq,jsrq,xmbh} =   this.searchForm
      let {orgid} = this.userInfo
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
   this.$api.getJrgByParam({pageNum:currentPage,pageSize,daZzid:orgid,startDate:ksrq,endDate:jsrq,xmbh: xmbh == undefined ? xmbhOfinit.XMBH : xmbh}).then(res=>{
     if(res.code == 1){
       if(res.data){
         this.tableData = res.data.rows.length?res.data.rows:[]
         this.total = res.data.totle
       }else{
         this.tableData = []
         this.total = 0
       }

     }else{
         this.tableData = []
       this.total = 0
     }
   })
    },
    addSubmit () {
      let {cbdwmc,djbh,hjje,jrgsp_htbh,tbrq,cbdwbh,cbdwid,sfwtgld} = this.lmshForm
      let guid = this.uuidsID
      let xmmc = this.htbh
      let treeData = []
      this.treeRightData.forEach(item=>{
        let obj = {}
        obj.je ='' + Number(item.data.sl)*Number(item.data.dj)
        obj.id = ''
        obj.zmh = item.data.bh
        obj.zmmc = item.data.mc
        obj.zmid = item.data.id
        obj.jldw = item.data.dw
        obj.sl = item.data.sl
        obj.dj = item.data.dj
        obj.yt = item.data.yt
        treeData.push(obj)
      })
      let {orgbh,orgid,orgmc,bmbh,bmid,bmmc,yhbm,yhid,yhmc} = this.userInfo
        if(treeData.length){
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
          this.$api.insertJrg({
            cbdwbh,cbdwid,sfwtgld,
            daBmbm: bmbh,
            daBmid: bmid,
            daBmmc: bmmc,
            daYhbm:yhbm,
            daYhid: yhid,
            daYhmc:yhmc,
            daZzbh: orgbh,
            daZzid: orgid,
            daZzmc: orgmc,
            cbdwmc:cbdwmc ,
            djbh,
            hjje,
            id:guid,
            sgdwbh: "",
            sgdwid: "",
            sgdwmc: "",
            mxList:treeData,
            tbr:yhmc,
            tbrq,
            xmbh: jrgsp_htbh,
            xmmc,
            xmid:''
          }).then(res=>{
            if(res.code == 1){
              this.showDetail = false
              this.search(1,10)

              this.$message({
                type: 'success',
                message: '添加成功!'
              });
            }else{
              this.$message({
                type: 'error',
                message: '添加失败!'
              });
            }
          })
        }else{
          this.$message({
            type: 'warning',
            message: '请添加子目!'
          });
        }

    },
    updateSubmit () {
      let {yhmc} = this.userInfo
      let {cbdwmc,djbh,hjje,jrgsp_htbh,tbrq,tbr,cbdwbh,cbdwid,sfwtgld} = this.lmshForm

      let xmmc = this.htbh
      let treeData = []
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
      }else{
        this.$api.deleteFilesById2({ids:this.uuidsID}).then(res=>{
          if(res.code == 1){

          }else{
            this.$message({
              message: '图片上传失败',
              type: 'info'
            });
          }
        })
      }
      this.treeRightData.forEach(item=>{
        let obj = {}
        obj.je ='' + Number(item.data.sl)*Number(item.data.dj)
        obj.id = ''
        obj.zmh = item.data.bh
        obj.zmmc = item.data.xmbh
        obj.zmid = item.data.id
        obj.dw = item.data.dw
        obj.sl = item.data.sl
        obj.dj = item.data.dj
        obj.yt = item.data.yt
        treeData.push(obj)
      })
      let obj =   {
        cbdwbh,cbdwid,sfwtgld,
        cbdwmc:cbdwmc , djbh, hjje, id:this.lmshForm.id, sgdwbh: "", sgdwid: "", sgdwmc: "",
        mxList:treeData,  tbr:yhmc, tbrq, xmbh: jrgsp_htbh, xmmc, xmid:''}
      this.$api.updateJrg(obj).then(res => {
        this.showDetail = false
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
            message: res.data.msg
          })
        }
      })
    },
    deleteData () {
      if(this.multipleSelection&&this.multipleSelection.length>1){
        this.$message({
          message: '一次只能删除一条！',
          type: 'warning'
        });
      }else if(!this.multipleSelection.length){
        this.$message({
          message: '请选择要删除的数据！',
          type: 'warning'
        });
      }else {

              this.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
              }).then(() => {
                this.$api.deleteJrgByJrgid({id:this.multipleSelection[0].id}).then(res => {

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
                      message: '删除失败'
                    })
                  }
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                })
              })
      }
    },
    shenhe (row, index) {
      this.$confirm('是否通过审核？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let form = JSON.parse(JSON.stringify(row))
        form.jrgsp_spzt = '已下发'
        this.$api.spJgrspForJlzf('?spzt=' + form.jrgsp_spzt + '&djbhs=' + form.jrgsp_djbh).then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: '审核通过!'
            })
            this.search(this.currentPage, this.pageSize)
            this.resetForm()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消审核'
        })
      })
    },
    addzibiao () {
      this.lmshForm.jlzf_jrgspmx.push({mid: this.lmshForm.id})
    },
    deletezibiao (index) {
      this.lmshForm.jlzf_jrgspmx.splice(index, 1)
    },
    ceshi () {
      this.$message({
        type: 'error',
        message: '内容格式不符合要求'
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
    resetForm () {
      this.showDetail = false
      this.lmshForm = {
        jlzf_jrgspmx: [{}]
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
    selectHt (value) {
      this.showTgdw = value.SFWTGLD === '是'?true:false
      this.lmshForm.sfwtgld = value.SFWTGLD
      this.lmshForm.cbdwmc = value.SJDW//SJDW
      this.lmshForm.dwmc = value.GLDW//GLDW
      this.lmshForm.jrgsp_htbh = value.XMBH//XMBH
      this.lmshForm.jldw = value.JLDW//JLDW
      this.lmshForm.cbdwbh = value.CBDWBH//CBDWBH
      this.lmshForm.cbdwid = value.CBDWID//CBDWID
      this.htbh = value.XMMC//XMMC
    }
  },
  mounted () {
    this.initUser()
    this.initqueryXMMC()
    // this.getXcRoadOptions()
    this.tableHeight = $('#zljcpfb')[0].offsetHeight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .goDetail{
    margin-top: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    i{
      color: #1f262e;
      margin-right: 10px;
    }
  }

  #zljcpfb{
    /*padding: 10px 15px 0 15px;*/
    position: relative;
    font-size: 12px;
    height: 100%;
    /*overflow: auto;*/
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
      .zibnr,.zibiaonr2{
        width: 98%;
        position: relative;
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
              width: calc(100%/7);
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
              width: calc(100%/7);
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
        position: absolute;
        right: 0px;
        top: 0;
        i{
          color: #1CA4FA;
          margin-left: 10px;
        }
      }
    }
    .addzmstyle{
      .el-dialog {
        height: 600px;
      }
    }
  }
</style>
