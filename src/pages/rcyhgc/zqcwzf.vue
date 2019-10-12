/**
* ----终期财务支付证书
*/
<template>
  <div id="kgsqd" style="height: 100%" >
    <div class="header">
      <span class="headerTit">中(终)期财务支付证书</span>
      <div class="header_option">
        <ul>
          <!--<li><i class="el-icon-search"> 查询</i></li>-->
          <!--<li><i class="icon iconfont icon-export"> 导出</i></li>-->
          <li @click="addContent(true); isaddAndupdate = 1"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="addContent(false)"><i class="el-icon-delete"> 删除</i></li>
        </ul>

      </div>
    </div>
    <!--查询弹框区域-->
    <div class="conter_table">
      <!--查询信息-->
      <div class="chaxun">
        <el-form  :inline="true"  style="display: inline-block;" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="项目名称" prop="htbh">
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="searchForm.htmc"
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

            <el-form-item class="" label="日期" prop="htbh">

              <el-date-picker
                size="mini"
                v-model="searchForm.selectDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-form-item>

          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button @click="searchYDJH" size="mini" style="background-color: #DF4D4A;border-color:transparent;color: #fff">查询</el-button>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button @click.native="resizeSearch" size="mini">重置</el-button>
          </el-form-item>

        </el-form>
      </div>
      <el-table  :data="YDJHData" tooltip-effect="dark"
                 @selection-change="selectZB"
                 style="width: calc(100% - 19px);"
                 row-class-name="row_class"
                 border>
        <el-table-column
          type="selection"
          align="center"
          :selectable='selectable2'
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="50">
        </el-table-column>

        <el-table-column align="left" sortable v-for="(tit,titIndex) in tableTits" :prop="titIndex" :label="tit" :key="titIndex"  show-overflow-tooltip> </el-table-column>

        <el-table-column align="left" class-name="column-caoz" label="操作" width="290">
          <template scope="scope">
            <span   v-if="scope.row.state !=1" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="updateFormDia('detail',scope.row)">详情</span>
            <span   v-if="scope.row.state !=1" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="updateFormDia('edit',scope.row);isaddAndupdate = 1">编辑</span>
            <span   v-if="scope.row.state !=1" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="updateFormDia('sp',scope.row)">审批</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页区域-->
    <footer class="footer">
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
          <span class="titleclasschild"  @click="promiseTG('close')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>计量单汇总表</span>
        </p>
      </div>
      <p v-for="(item,keyname) in nameObj" :key="item" class="addJLD">
        <span class="inputlabel">{{item}} ：</span>
        <span class="spanwidth">{{detailrowObj[keyname]}}</span>
      </p>
      <div class="boundary"></div>
      <el-tabs style="height:calc(100% - 70px); margin-right: 16px; "  v-model="activeName">
        <el-tab-pane label="计量支付汇总表" name="first">
          <el-table  :data="jlmxList" tooltip-effect="dark"
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
        <el-tab-pane style="height: calc(100%);" label="清单终期支付报表" name="second">
          <el-table  :data="cwbbList" tooltip-effect="dark"
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
        <el-tab-pane label="终期财务支付证书" name="third">
          <!--<p style="padding: 0 0 17px 15px;">子目号：总则</p>-->
          <el-table  :data="huizongData" tooltip-effect="dark"
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
    <!--编辑-->
    <div class="tabArea" v-show="showAdd">
      <div style="position:relative;" v-show="!showFirstItemWindow">
        <p class="tabAreaTit">
          <span class="titleclasschild"  @click="promiseTG('close');isaddAndupdate = 0"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>终期财务支付证书</span>
        </p>
        <div class="SPState">
          <el-button  size="mini" v-if="canAdd" @click="saveAdd(true);isaddAndupdate = 1" style="display: block; background-color: #DF4D4A;border-color: transparent;color: #fff" class="dialog-button bao_cun">保存</el-button>
        </div>
      </div>
      <!--下面的列表页-->
      <div style="margin-top: 35px;font-size: 0" v-show="!showFirstItemWindow">
        <div>

          <p class="addJLD">
            <span class="addJLD_tit">项目编号 ：</span>
            <el-input size="mini" v-model="jldModel.htbh" :disabled="true"   placeholder="请输入内容"></el-input></p>
          <p class="addJLD">
            <span class="addJLD_tit">项目名称 ：</span>
            <el-autocomplete
              class="inline-input"
              size="mini"
              v-model="jldModel.htmc"
              :fetch-suggestions="querySearchMC"
              @select="handleSelectMC1"
              placeholder="请输入项目名称"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.XMMC }}</div>
              </template>
              <i slot="suffix" @click="showDialog('mc')" class="icon iconfont icon-xiangqing1"></i>
            </el-autocomplete>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">管理单位 ：</span>
            <el-input size="mini"  v-model="jldModel.gldw" :disabled="true" placeholder="请输入内容"></el-input></p>
          <p class="addJLD">
            <span class="addJLD_tit">承包单位 ：</span>
            <el-input size="mini"  v-model="jldModel.cbdw" :disabled="true"  placeholder="请输入内容"></el-input></p>
          <!--<p class="addJLD">-->
            <!--<span class="addJLD_tit"> 承包部门 ：</span>-->
            <!--<el-input size="mini" v-model="jldModel.cbbm"  placeholder="请输入内容"></el-input></p>-->
          <p class="addJLD">
            <span class="addJLD_tit">监理单位 ：</span>
            <el-input size="mini" v-model="jldModel.jldw" :disabled="true"  placeholder="请输入内容"></el-input></p>
          <p class="addJLD">
            <span class="addJLD_tit"> 填报日期:</span>
            <el-date-picker
              v-model="jldModel.tbrq"
              size="mini"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit">支付期号 ：</span>
            <el-input size="mini" v-model="jldModel.zfqh"  placeholder="请输入内容"></el-input></p>
          <p class="addJLD">
            <span class="addJLD_tit">索赔费用 ：</span>
            <el-input size="mini" v-model="jldModel.spfy"  placeholder="请输入内容"></el-input></p>
          <p class="addJLD">
            <span class="addJLD_tit">罚金 ：</span>
            <el-input size="mini" v-model="jldModel.fj"  placeholder="请输入内容"></el-input></p>
          <p class="addJLD">
            <span class="addJLD_tit">质保金 ：</span>
            <el-input size="mini" v-model="jldModel.zbj"  placeholder="请输入内容"></el-input></p>
          <p class="addJLD" v-if="showTgdw">
            <span class="addJLD_tit">是否为托管单位 ：</span>
            <el-input size="mini" v-model="jldModel.sfwtgld"  placeholder="请输入内容"></el-input></p>
          <p class="addJLD">
            <span class="addJLD_tit">备注 ：</span>
            <el-input size="mini" v-model="jldModel.bz"  placeholder="请输入内容"></el-input></p>

        </div>
        <div style="width: calc(100% + 17px);margin-left: -17px;margin-right: 0px;padding-left: 0px; padding-right: 0px;height:4px;background-color: #c0cad6;"></div>
        <div class="header"   style="width: calc(100% + 16px);margin-left: -16px;height: 36px;line-height: 36px;padding-top: 0px;">
          <span class="headerTit" style="text-align: left;">计量汇总单</span>
          <el-button v-if="canAdd" size="mini" style="background-color: #DF4D4A;border-color: transparent;color: #fff;float: right;margin-top: 3px;" @click="addMX(true)">
            <i style="color: #fff;" class="icon iconfont icon-past"></i>添加计量汇总</el-button>
        </div>

      </div>
      <el-table :data="selectMxList" tooltip-effect="dark"
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
      <div class="windowAramFirst" v-if="showFirstItemWindow" >
        <div style="position:relative;">
          <p class="tabAreaTit">
            <span class="titleclasschild"  @click="showFirstItemWindow = false;activeName2='first';activeName='first'"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
            <span>添加计量汇总单</span>
          </p>
          <div class="SPState">
            <el-button size="mini"  style="margin:auto;display: block;background-color: #DF4D4A;border-color: transparent;color: #fff" class="dialog-button bao_cun"
                       @click="saveAdd(false)">
              <i class="icon iconfont icon-past"></i>
              保存
            </el-button>
          </div>
        </div>

        <el-table v-show="showFirstItemWindow" ref="multipleTable2"  :data="detailItemInfo" tooltip-effect="dark"
                  style="width: calc(100% - 23px);max-height: 250px;overflow-y: auto;margin-top: 35px;"
                  row-class-name="row_class"
                  @selection-change="handleSelectionChange"
                  border>
          <el-table-column
            type="selection"
            label="序号"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column align="left" v-for="(names,index) in zmtit" :key="index" :prop="names.props" :label="names.name" show-overflow-tooltip> </el-table-column>
        </el-table>
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
    data () {
      return {
        showTgdw:false,
        isaddAndupdate: 0,
        isClickNum:0,
        isAddClickNum:0,
        zanshiData:[],
        selectMxList:[{}],
        detailrowObj: {},
        nameObj: {
          htbh: '项目编号',
          htmc: '项目名称',
          gldw: '管理单位',
          cbdwmc: '承包单位',
          daBmmc: '承包部门',
          jldw: '监理单位',
          tbrq: '填报日期',
          zfqh: '支付期号',
          spfy: '索赔费用',
          fj: '罚金',
          zbj: '质保金',
          zb: '备注',

        },
        zbid:'',
        zbidsList:[],
        activeName2:'first',
        dialogData:[ ],
        dialogTableTit:{
          XMMC:'项目名称',XMBH:'项目编号',
        },
        datatypes:'',
        dialogVisible:false,
        restaurants:[ ],
        //me
        jlzfhzbTit:{zmbh:'子目编号',zmmc:'子目名称',dw:'单位',dj:'单价(元)',sl:'数量',je:'金额(元)'},
        jlmxList:[],
        cwbbList:[],
        isJRG:false,
        isEdit:false,
        tabDatas:[],
        zbSelect:[],
        selectRwd:[],
        selectJRG:[],
        zmtit:[
          {props:'',name:''}
        ],
        zmExpandtit:[
          {props:'',name:''}
        ],
        xmbhList:[],
        jldModel: {
          tbrq: '',
          htmc:'',
          htbh:'',
          gldw:'',
          cbdw:'',
          cbbm:'',
          jldw:'',
          tbr:'',
          zfqh:'',
          qc:'',
          spfy:'',
          fj:'',
          zbj:'',
          bz:'',
          pmmtgcspsqs_sqrq: ''
        },
        activeName:"first",
        searchInputVal:'',
        options: [],
        tableTits:{htmc:'项目名称',cbdwmc:'承包单位',daZzmc:'业主单位',zfqh:'支付期号',qcZh:'期次'},
        FinsdetailTit:{zmh:'子目号',zmmc:'子目名称',jldbh:'计量单编号',dw:'单位',wcsl:'数量'},
        stateList:[
          {name:'全部',val:undefined},
          {name:'编制中',val:'1'},
          {name:'工程技术部审核',val:'2'},
          {name:'经营发展部审核',val:'3'},
          {name:'公司分管领导审核',val:'4'},
          {name:'公司领导审批',val:'5'},
          {name:'审批完成',val:'6'},
        ],

        total:0,
        state:['','编制中','工程技术部审核','经营发展部审核','公司分管领导审核','公司领导审批','审批完成'],
        showFirstItemWindow:false,
        firstItemTit:'',

        searchForm:{
          htmc:'',
          sjdh:undefined,
          lxmc:undefined,
          selectDate:null,
          pageNum:1,
          pageSize:10
        },
        YDJHData:[ ],
        detailItemInfo:[],//本月完成情况详情数据
        showDetail:false,//是否可以编辑    编辑+添加：false, 详情:true
        showAdd:false,//是否是添加页面
        huizongData:[],
        qcid:'',
        canAdd:true,
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
      resizeInput(){
        this.jldModel = {
          tbrq: '',
          htmc:'',
          htbh:'',
          gldw:'',
          cbdw:'',
          cbbm:'',
          jldw:'',
          tbr:'',
          zfqh:'',
          qc:'',
          spfy:'',
          fj:'',
          zbj:'',
          bz:'',
          pmmtgcspsqs_sqrq: ''
        }
      },
      initqueryXMMC(){
        // this.$api.getXmmList().then(res=>{
        //   if(res.code == 1){
        //     this.restaurants = res.data&&res.data.length?res.data:[]
        //   }else{
        //     this.restaurants = []
        //   }
        //
        // })
        let userparam = config.userInfo.orgid
        if (userparam) {
          this.$api.getmcbhList().then(res => {
            if (res.code != 1) {
              this.$message({
                message: '网络出错',
                type: 'error'
              })
            } else {
              if (res.data && res.data.length !== 0) {
                this.restaurants = res.data
              } else {
                this.restaurants = []
              }
            }
          })
        }
      },
      handleSelectMC(item){
        //getXmmcList
        this.searchForm.htmc = item.XMMC
        this.searchForm.xmbh = item.XMBH
      },
      handleSelectMC1(item){

        this.jldModel.htmc = item.XMMC
        this.jldModel.htbh = item.XMBH
        this.jldModel.cbdw = item.CBDW
        this.jldModel.jldw = item.JLDW
        this.jldModel.gldw = item.GLDW
        this.jldModel.cbdwid = item.CBDWID
        this.jldModel.cbdwbh = item.CBDWBH
        this.jldModel.sfwtgld = item.SFWTGLD
        this.showTgdw = item.SFWTGLD === '是'?true:false
        if (this.jldModel.htbh) {
          this.getjlhzdData(this.jldModel.htbh)
        }
      },
      // 获取计量汇总单数据
      getjlhzdData (xmbh) {
        this.$api.getJgjssByHtbh2({htbh:xmbh}).then(res=>{
          if(res.code == 0){
            this.canAdd = false
            this.$message.error(res.msg);
          }else{
            this.canAdd = true
          }
        })
      },
      showDialog(bol){
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
      closeDialog(val){
        this.dialogVisible = false
        if(val){
          if (this.isaddAndupdate == 1) {
            this.jldModel.htmc = val.XMMC
            this.jldModel.htbh = val.XMBH

            this.getmsgOfmx(this.jldModel.htbh)
          } else {
            this.searchForm.htmc = val.XMMC
            this.searchForm.xmbh = val.XMBH
          }
        }
      },
      getmsgOfmx (param) {
        this.$api.getOnlyXmgkjcxx({xmbh: param}).then(res => {
          if (res.code != 1) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            if (res.data && res.data.length !== 0) {
              let item = res.data[0]
              this.jldModel.cbdw = item.cbdw
              // this.jldModel.cbbm = item.daBmmc
              this.jldModel.jldw = item.jldw
              this.jldModel.gldw = item.gldw
              this.jldModel.cbdwid = item.cbdwid
              this.jldModel.cbdwbh = item.cbdwbh
            }
          }
        })
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
      // selectHt(row){

      //   this.jldModel.htmc = row.xmmc
      //   this.jldModel.htbh = row.xmbh
      //   this.jldModel.cbdw = row.cbdw
      //   this.jldModel.cbbm = row.daBmmc
      //   this.jldModel.jldw = row.jldw
      //   this.jldModel.gldw = row.gldw
      //   this.jldModel.cbdwid = row.cbdwid
      //   this.jldModel.cbdwbh = row.cbdwbh
      //   this.$api.getJgjssByHtbh2({htbh:row.xmbh}).then(res=>{
      //     if(res.code == 0){
      //       this.canAdd = false
      //       this.$message.error(res.msg);
      //     }else{
      //       this.canAdd = true
      //     }
      //   })
      // },
      selectZB(row){
        this.zbSelect = row
      },
      uuid(){
        let str = (((1+Math.random())*0x10000)|0).toString(16).substring(1)
        return (str+str+"-"+str+"-"+str+"-"+str+"-"+str+str+str);
      },
      saveAdd(bol){
        let self = this
        let { htmc, htbh, gldw, cbdw, cbbm, jldw,
          tbr, tbrq, zfqh, qc, spfy, fj, zbj, bz,cbdwid,cbdwbh,daZzmc} = this.jldModel
        let {orgbh,orgid,orgmc,bmbh,bmid,bmmc,yhbm,yhid,yhmc} = this.userInfo
        let str = ''
        this.selectRwd.forEach(item=>{
          str+=item.id+','
        })
        if(!str.trim()){
          this.$message({
            message: '请添加工程汇总单',
            type: 'info'
          });
        }
        if(bol){
          if(this.isEdit){

            let str = ''
            self.zbidsList.forEach(item=>{
              str+=item+','
            })
            this.jldModel.jlhzIds = str.substring(0,str.length-1)
            this.jldModel.gchzIdList =  self.zbidsList
            this.jldModel.fj = Number(this.jldModel.fj )
            this.jldModel.zbj = Number(this.jldModel.zbj )
            this.jldModel.spfy = Number(this.jldModel.spfy )
            this.$api.updateRcyhZqcwzfzs(this.jldModel).then(res=>{
              this.showDetail = false
              this.showAdd = false
              if(res.code == 1){
                this.queryYDJHData()
                this.$message({
                  message: '编辑成功！',
                  type: 'success'
                });
              }else{
                this.$message({
                  message: '编辑失败',
                  type: 'info'
                });
              }
            })
          }
          else{
            this.$api.insertRcyhZqcwzfzs({
              cbdwid,cbdwbh,
              daBmbm: bmbh,
              daBmid: bmid,
              daBmmc: bmmc,
              daYhbm:yhbm,
              daYhid: yhid,
              daYhmc:yhmc,
              daZzbh: orgbh,
              daZzid: orgid,
              daZzmc: orgmc,
              bz,cbbmmc:cbbm,cbdwmc:cbdw,gldw,htbh,
              htmc,jldw,tbr:yhmc,tbrq,zfqh,spfy,fj,zbj,
              id:self.uuid(), cbbmbh:"", cbbmid:"",
              htid: "", jlhzIds:str.substring(0, str.length - 1), qc: "", tbrid: "",zt:"3501"})
              .then(res=>{
                this.showDetail = false
                this.showAdd = false
                if(res.code == 1){
                  this.queryYDJHData()
                  this.$message({
                    message: '添加成功！',
                    type: 'success'
                  });
                }else{
                  this.$message({
                    message: '添加失败',
                    type: 'info'
                  });
                }
              })
          }
        }else{
          let self = this
          self.selectMxList = []
          this.zbidsList = []

          self.selectRwd.forEach(item=>{
            if(JSON.stringify(self.selectMxList).indexOf(JSON.stringify(...item.mxList)) == -1){
              self.selectMxList.push(...item.mxList)
              self.zbidsList.push(item.id)
            }else{

            }
          })
          this.showFirstItemWindow = false
        }

      },
      handleSelectionChange(row){
        this.selectRwd = row
      },
      addMX(bol){
        let {orgid} = this.userInfo
        let htbh = this.jldModel.htbh
        this.detailItemInfo = []
        if(htbh){
          this.showFirstItemWindow = true
          this.isJRG = false
          this.zmtit = [
            {props:'htbh',name:'合同编号'},
            {props:'htmc',name:'合同名称'},
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
          if(this.isEdit){
            this.isClickNum = this.isClickNum+1

            this.$api.getGcjlhzToZqcwzf({htbh,daZzid:orgid,zqcwzfId: self.zbid }).then(res=>{
              if(res.code == 1){
                this.detailItemInfo = res.data.length?res.data:[]
                if(self.isClickNum <=1){
                  zbidsList.forEach(ele=>{
                    self.detailItemInfo.forEach(item => {
                      if(ele === item.id){
                        self.$nextTick(()=> {
                          self.selectRwd = item
                          self.$refs.multipleTable2.toggleRowSelection(item, true);
                        })
                      }
                    });
                  })

                }else{

                  zbidsList.forEach(ele=>{
                    self.detailItemInfo.forEach(item => {
                      if(ele === item.id){
                        self.$nextTick(()=> {
                          self.selectRwd = item
                          self.$refs.multipleTable2.toggleRowSelection(item, true);
                        })
                      }else{
                        self.$refs.multipleTable2.toggleRowSelection(item, false);
                      }
                    });
                  })
                }
              }else{
                this.detailItemInfo = []
              }
            })
          }else{
            this.isAddClickNum = this.isAddClickNum+1

            this.$api.getGcjlhzToZqcwzf({htbh,daZzid:orgid}).then(res=>{
              if(res.code == 1){
                this.detailItemInfo = res.data.length?res.data:[]
                if(self.isClickNum <=1){
                  zbidsList.forEach(ele=>{
                    self.detailItemInfo.forEach(item => {
                      if(ele === item.id){
                        self.$nextTick(()=> {
                          self.selectRwd = item
                          self.$refs.multipleTable2.toggleRowSelection(item, true);
                        })
                      }
                    });
                  })

                }else{
                  zbidsList.forEach(ele=>{
                    self.detailItemInfo.forEach(item => {
                      if(ele === item.id){
                        self.$nextTick(()=> {
                          self.selectRwd = item
                          self.$refs.multipleTable2.toggleRowSelection(item, true);
                        })
                      }else{
                        self.$refs.multipleTable2.toggleRowSelection(item, false);
                      }
                    });
                  })
                }
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
      selectable2:function(row, index){   //禁用第四个
        return true
        // if(row.canDel == 1){
        //   return true
        // }else{
        //   return false
        // }
      },
      resizeSearch(){
        this.searchForm.sjdh = undefined
        this.searchForm.htmc = undefined
        this.searchForm.xmbh = undefined
        this.searchForm.lxmc = undefined
        this.searchForm.selectDate = undefined
        this.searchForm.pageNum = 1
      },
      addContent(bol){
        if(bol){//添加
         this.canAdd = true
          this.resizeInput()
          this.isAddClickNum = 0
          this.selectMxList = []
          // this.jldModel = {}
          this.showDetail = false
          this.showAdd = true
          this.isEdit = false
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

          this.jldModel.tbrq = clock
          this.$api.getmcbhList().then(res=>{
            if(res.code == 1){
              this.xmbhList = res.data
            }
          })
        }else{//删除

          if(!this.zbSelect.length){
            this.$message({
              message: '请选择要删除的内容',
              type: 'warning'
            });
          }
          if(this.zbSelect.length>1){
            this.$message({
              message: '一次只能删除一条',
              type: 'warning'
            });
          }

          if(this.zbSelect.length == 1){
            if(this.zbSelect[0]){
              if(this.zbSelect[0].id){
                this.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                  center: true
                }).then( () => {
                  this.$api.deleteRcyhZqcwzfzs({id: this.zbSelect[0].id}).then(res=>{
                    if(res.code == 1){
                      this.$message({
                        message: '删除成功',
                        type: 'success'
                      });
                      this.queryYDJHData()
                    }else{
                      this.$message.error('删除失败');
                    }
                  })
                  }
                ).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '取消删除'
                  })
                })
              }
            }


          }

          //
        }
      },
      //详情内 点击
      handOneRowSecod(row, event, column){
        this.detailItemInfo = [ ]
        this.showFirstItemWindow = true
      },
      //操作通过打回等按钮
      promiseTG(bol){
        // 详情查看

        this.showDetail = false
        this.showFirstItemWindow = false
        this.showAdd = false
        this.activeName2='first'
        this.activeName='first'
      },
      // 编辑 详情  本月完成情况 下月计划
      updateFormDia (row,info) {

        switch (row){
          case 'detail':
            this.detailrowObj = info
            this.showDetail = true
            this.isEdit = false
            this.jlmxList = info.jlmxList
            this.cwbbList = info.cwbbList
            this.huizongData = info.mx3List
            break;
          case 'edit':
            this.canAdd = true
            this.isClickNum = 0
            this.zbid = info.id
            self.selectRwd = []
            this.zbidsList = info.gchzIdList
            this.showDetail = false
            this.showAdd = true
            this.isEdit = true
            this.qcid = info.qcid
            this.selectMxList = info.jlmxList
            this.jldModel =  JSON.parse(JSON.stringify(info))
            this.jldModel.cbdw = info.cbdwmc
            // this.jldModel.cbbm = info.daBmmc
            this.jlmxList = info.jlmxList
            this.cwbbList = info.cwbbList
            this.huizongData = info.mx3List
            this.$api.getmcbhList().then(res=>{
              if(res.code == 1){
                this.xmbhList = res.data
              }
            })
            break;
          case 'sp':
            this.isEdit = false

            this.$confirm('是否通过审批?',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '审批成功!'
              });
              /*           this.$api.updateRcyhGcjlhzbZtByGcjlhzId({id:info.id,zt:'3502'}).then(res=>{
                           if(res.code == 1){
                             this.queryYDJHData()
                             this.$message({
                               type: 'success',
                               message: '审批成功!'
                             });
                           }else{
                             this.$message({
                               type: 'success',
                               message: '审批失败!'
                             });
                           }
                         })*/

            }).catch(() => {

              this.$message({
                type: 'info',
                message: '已取消审批!'
              });
            });
            break;
        }

      },
      //分页展示数据
      handleCurrentChange (val) {
        this.searchForm.pageNum = val
        this.queryYDJHData()
      },
      //月度计划初始化查询
      searchYDJH(){
        this.queryYDJHData()
      },
      //初始化列表数据
      queryYDJHData(){
        let {XMMC,ZT,selectDate,pageNum,pageSize,xmbh} = this.searchForm
        let YearDate,MonthDate;


        let {orgid} = this.userInfo
        this.$api.getRcyhZqcwzfzs({pageNum,pageSize,daZzid:orgid,xmbh,startDate:selectDate}).then(res=>{
          if(res.code == 1){
            this.YDJHData =  res.data&&res.data.rows?res.data.rows:[]
            this.total = res.data&&res.data.totle?res.data.totle:0
          }else{
            this.YDJHData =[]
            this.total = 0
          }

        })
      },
    },
    mounted () {
      this.initUser()
      this.initqueryXMMC()
      this.queryYDJHData()

    }
  }
</script>

<style lang="scss" >
  .textArea{
    width: calc(100% - 93px);
    outline: none;
    border:1px solid #DCDFE6;
    vertical-align: top;
    padding-left: 5px;
  }
  .el-tabs__content{
    height: calc(100% - 60px);
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



  #kgsqd{
    /*padding: 10px 15px 0 15px;*/
    position: relative;
    font-size: 12px;
    height: 100%;
    /*overflow: auto;*/

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
  }
</style>
