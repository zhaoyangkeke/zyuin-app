<template>
  <div id="kgsqd" style="height: 100%" >
    <div class="header">
      <span class="headerTit">月度计划制定</span>
      <div class="SPState" style="position: relative;top: -42px;left: 8px;">
        <el-button size="mini" class="Addbtn" v-show="isshowbtn" @click="canInsertMp"><i class="icon iconfont icon-add"></i>添加</el-button>
        <!--<el-button size="mini" @click="lastBtns('add')"><i class="icon iconfont icon-add"></i>添加</el-button>-->
        <!--<el-button size="mini" @click="lastBtns('del')"><i class="icon iconfont icon-delete"></i>删除</el-button>-->
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="changeTabpane" style="padding-left: 20px;padding-top: 20px;height: calc(100% - 46px)" class="upstyle">
      <el-tab-pane label="月度总结" name="first">   <!--查询弹框区域-->
        <div class="conter_table">
          <p style="font-size: 12px;height: 18px"></p>
          <el-table  :data="initCurrentData" tooltip-effect="dark"
                     style="width: 100%;margin: auto;"
                     row-class-name="row_class"
                     border>
            <el-table-column align="center" prop="xmbh" sortable label="项目编号" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="xmmc" sortable label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="majorAcc" sortable label="主要完成情况" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="keyTasks" sortable label="主要工作内容" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="amount" sortable label="本月完成金额(万元)" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="uncompleted" sortable label="未完成情况" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="remarks" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" class-name="column-caoz" label="操作" width="90">
              <template scope="scope">
                <!--<span v-if="scope.row.state !=1" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"-->
                <!--@click="updateFormDia('编辑',scope.row)">编辑</span>-->
                <span   style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                        @click="handOneRow(scope.row);showInput =true">计划总结</span>
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
              :total="currentTotal">
            </el-pagination>
          </div>
        </footer>
      </el-tab-pane>
      <el-tab-pane label="月度计划" name="second" class="">   <!--查询弹框区域-->
        <div class="conter_table">
          <p style="font-size: 12px;height: 18px"></p>
          <el-table  :data="initlastData" tooltip-effect="dark"
                     style="width: 100%;margin: auto;"
                     row-class-name="row_class"
                     border>
            <el-table-column align="center" prop="xmmc" sortable label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="xmbh" sortable label="项目编号" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="year" sortable label="日期" show-overflow-tooltip>
              <template scope="scope">
                <span>{{`${scope.row.year?scope.row.year:''} - ${scope.row.month?(parseInt(scope.row.month) > 10 ? scope.row.month : '0'+ scope.row.month):''}`}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="" sortable label="状态" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.state == 1 ? '已制定':scope.row.state == 2 ? '已通过' : '审批中'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" class-name="column-caoz" label="操作" width="290">
              <template scope="scope">
                <span v-if="scope.row.state !=2" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                      @click="handSecondRow(scope.row);submitbtn = 1;showInput = true;addStaBtn = 0"
                >修改</span>
                <span style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                      @click="handSecondRow(scope.row);submitbtn = 0;addStaBtn = 1"
                >详情</span>
                <span style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                      v-if="scope.row.state == 1"
                      @click="updatestate(scope.row, '月度计划')"
                >提交</span>
              </template>
            </el-table-column>
            <!--<el-table-column align="center" prop="remarks" label="备注" show-overflow-tooltip></el-table-column>-->
          </el-table>
        </div>
        <!--分页区域-->
        <footer class="footer">
          <div style="float: right;padding: 6px">
            <el-pagination
              @current-change="handleCurrentChange"
              layout="total, sizes, prev, pager, next, jumper"
              :total="lastTotal">
            </el-pagination>
          </div>
        </footer>
      </el-tab-pane>
    </el-tabs>
    <!--添加新增的月度总结弹窗-->
    <div class="tabArea" v-show="activeName=='first'&&showDetail" >
      <div style="position:relative;height: 50px;" class="header tabAreaTit">
        <span @click="closeDetail" class="titleclasschild"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
        <span class="headerTit">项目编号：{{xmbhTit}}</span>
        <div  class="SPState" style="top:1px;" v-show="ishowaddbtnOfzj === 0">
          <el-button size="mini" @click="promiseTG('update');ishowaddbtnOfzj = 1;showInput=false;textareaWrite = true"><i class="icon iconfont icon-save"></i> 保存</el-button>
          <el-button size="mini" @click="promiseTG('add')"><i class="icon iconfont icon-add"></i> 添加</el-button>
          <el-button size="mini" @click="promiseTG('del')"><i class="icon iconfont icon-delete"></i> 删除</el-button>
        </div>
        <div class="SPState" style="top:1px;">
          <el-button size="mini" @click="showInput = true;ishowaddbtnOfzj = 0;textareaWrite = false" v-show="ishowaddbtnOfzj === 1"><i class="icon iconfont icon-add"></i> 编辑</el-button>
        </div>
      </div>
      <el-table  :data="detailItemInfo" tooltip-effect="dark"
                 @selection-change="handleSelectionChange"
                 style="width: calc(100% - 13px);max-height: 240px;overflow: auto"
                 row-class-name="row_class"
                 border>
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column align="center"  label="序号" type="index" width="50"></el-table-column>
        <!--<el-table-column v-if="!showInput"  :label="tit"  align="center" v-for="(tit,index) in detailItemTit" :prop="index" :key="index">-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" v-if="!showInput"  label="开始时间" prop="sdate"></el-table-column>-->
        <!--<el-table-column align="center" v-if="!showInput"  label="结束时间" prop="edate"></el-table-column>-->
        <el-table-column v-for="(tit,Zindex) in detailItemTit" :label="tit" :key="tit" align="center">
           <template slot-scope="scope">
            <div  v-if="Zindex !== 'direction'">
              <input type="text" v-if="showInput" style="text-align: center" class="rowEdput" v-model="scope.row[Zindex]"/>
              <span v-if="!showInput">{{scope.row[Zindex]}}</span>
            </div>
             <div v-if="Zindex === 'direction'">
               <el-select v-model="scope.row[Zindex]" placeholder="请选择" v-if="showInput">
                 <el-option
                   label="上行"
                   value="上行">
                 </el-option>
                 <el-option
                   label="下行"
                   value="下行">
                 </el-option>
                 <el-option
                   label="全幅"
                   value="全幅">
                 </el-option>
               </el-select>
               <span  v-if="!showInput">{{scope.row[Zindex]}}</span>
             </div>
          </template>
          </el-table-column>
        <el-table-column align="center"  label="开始时间">
          <template slot-scope="scope">
            <span  v-if="!showInput">{{scope.row.sdate}}</span>
            <el-date-picker
              v-if="showInput"
              v-model="scope.row.sdate"
              class="rowEdput"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </template>

        </el-table-column>
        <el-table-column align="center" label="结束时间">
          <template slot-scope="scope">
            <span  v-if="!showInput">{{scope.row.edate}}</span>
            <el-date-picker
              v-if="showInput"
              v-model="scope.row.edate"
              class="rowEdput"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </template>
        </el-table-column>
      </el-table>
      <div style="position: absolute;top: 350px;left: 0;right: 0;padding-left: 10px;">
        <span>主要完成情况</span>
        <el-input   type="textarea" size="small " v-model="modelControl.majorAcc"  style="width: 50%;height: 50px;resize: none;"
                    placeholder="请输入内容" :disabled="textareaWrite"></el-input>
        <span>本月完成金额(万元)：</span>
        <el-input   type="textarea" size="small " v-model="modelControl.execMoney" style="width: 20%;height: 50px;resize: none;"
                    placeholder="请输入内容" :disabled="textareaWrite"></el-input>
      </div>
    </div>
    <!--添加新增的月度计划弹窗-->
    <div class="tabArea" v-show="activeName=='second'&&showDetail" >
      <div style="position:relative;height: 50px;" class="header tabAreaTit">
        <span @click="closeDetail" class="titleclasschild"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
        <span v-html="deItemTit" class="headerTit"></span>
        <div  class="SPState" style="top:1px;" v-show="submitbtn === 1">
          <el-button size="mini" @click="updateBG('update');submitbtn=0"><i class="icon iconfont icon-save"></i> 保存</el-button>
          <!--<el-button size="mini" @click="updateBG('update')" v-if="updatesubmit == 1"><i class="icon iconfont icon-save"></i>提交</el-button>-->
          <el-button size="mini" @click="updateBG('add')"><i class="icon iconfont icon-add"></i> 添加</el-button>
          <el-button size="mini" @click="updateBG('del')"><i class="icon iconfont icon-delete"></i> 删除</el-button>
        </div>
        <div  class="SPState" style="top:1px;" v-show="submitbtn === 0 && addStaBtn === 0">
          <el-button size="mini" @click="submitbtn=1;showInput=true"><i class="icon iconfont icon-add"></i> 编辑</el-button>
        </div>

      </div>
      <el-table  :data="detailItemInfo" tooltip-effect="dark"
                 @selection-change="handleSelectionChange"
                 style="width: calc(100% - 13px);max-height: 240px;overflow-y: auto"
                 row-class-name="row_class"
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
          width="55">
        </el-table-column>
        <!--<el-table-column align="center" v-if="!showInput" v-for="(tit,index) in detailItemTit" :label="tit" :prop="index" :key="index"></el-table-column>-->
        <el-table-column  align="center"  v-for="(tit,Kindex) in detailItemTit" :prop="Kindex"  :key="tit" :label="tit" >
          <template  slot-scope="scope" >
            <div v-show="Kindex !== 'direction'">
              <input  v-if="showInput" type="text" style="text-align: center" class="rowEdput" v-model="scope.row[Kindex]"/>
              <span  v-if="!showInput">{{scope.row[Kindex]}}</span>
            </div>
            <div v-show="Kindex === 'direction'">
              <el-select  v-if="showInput" v-model="scope.row[Kindex]" placeholder="请选择">
                <el-option
                  label="上行"
                  value="上行">
                </el-option>
                <el-option
                  label="下行"
                  value="下行">
                </el-option>
                <el-option
                  label="全幅"
                  value="全幅">
                </el-option>
              </el-select>
              <span  v-if="!showInput">{{scope.row[Kindex]}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="开始时间">
          <template slot-scope="scope">
            <span  v-if="!showInput">{{scope.row.sdate}}</span>
            <el-date-picker
              v-if="showInput"
              v-model="scope.row.sdate"
              class="rowEdput"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </template>

        </el-table-column>
        <el-table-column align="center" label="结束时间" prop="edate">
          <template slot-scope="scope">
            <span  v-if="!showInput">{{scope.row.edate}}</span>
            <el-date-picker
              v-if="showInput"
              v-model="scope.row.edate"
              class="rowEdput"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        zzzhparam: null,
        qszhparam: null,
        lxmcparam: '',
        textareaWrite: false,
        ishowaddbtnOfzj:0,
        addStaBtn:0,
        submitbtn: 1,
        fangxiangArr:['上行','下行','全幅'],
        mdridparam: '',
        updatesubmit: 0,
        xmbhparam: '',
        xmmcparam: '',
        categoryparam: '',
        isshowbtn: false,
        daBmbm: JSON.parse(localStorage.userMsg)[0].deptList[0].deptCode,
        daBmid: JSON.parse(localStorage.userMsg)[0].deptList[0].deptId,
        daBmmc: JSON.parse(localStorage.userMsg)[0].deptList[0].deptName,
        daYhbm: JSON.parse(localStorage.userMsg)[0].userCode,
        daYhid: JSON.parse(localStorage.userMsg)[0].userId,
        daYhmc: JSON.parse(localStorage.userMsg)[0].userName,
        daZzid: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgId,
        daZzbh: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgCode,
        daZzmc: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgName,
        supplierpk: JSON.parse(localStorage.userMsg)[0].deptList[0].supplierpk,
        //me
        xmbhTit:'',
        delStr:'',
        detailItemTit:{},
        ktcsid:'',
        mwpsid:'',
        mdrid:'',
        kdrid:'',
        isNullData:null,
        params:{
          category:'',
          // ktcsRemarks:'',
          tableName:'',
          uncompletedAcc:'',
        },
        pl:'',
        currentZJ:[],
        currentType:'',
        showInput:false,
        initCurrentData:[],
        currentTotal:0,
        currentDetailData:[],
        initlastData:[],
        lastTotal:0,
        activeName:'first',
        modelControl:{
          majorAcc:'',
          execMoney:'',
        },
        editable:[],//是否可编辑
        deItemTit:'',
        searchForm:{
          pageNum:1,
          pageSize:10,
          daZzid: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgId,
          daBmid: JSON.parse(localStorage.userMsg)[0].deptList[0].deptId
        },
        lastForm:{
          pageNum:1,
          pageSize:10,
          // daYhid: JSON.parse(localStorage.userMsg)[0].userId,
          // daBmid: JSON.parse(localStorage.userMsg)[0].deptList[0].deptId,
          daZzid: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgId,
          daBmid: JSON.parse(localStorage.userMsg)[0].deptList[0].deptId
        },
        tableData2:[
          {
            xmmc:'乐清段小修日常养护',
            zywcqkL:'完成坑洞修补4.8㎡、护栏修复565m、隔离栅更换81m、防撞桶更换35个、塑料垃圾桶更换4个、隧道清洗3460m',
            bywcje:'57.7',
            wwcqk:'--',
            zrr:'蒋宇飞',
            rq:'2019.3',
            zt:'已完成'
          },
          {
            xmmc:'瓯南段小修日常养护',
            zywcqkL:'',
            bywcje:'',
            wwcqk:'--',
            zrr:'浦鹏鹏',
            rq:'2019.3',
            zt:'已完成'
          },
          {
            xmmc:'2017桥梁加固维修工程',
            zywcqkL:'完成四脚亭大桥完成支座更换40个，扬州大桥完成钢板加固3跨，裂缝封闭注浆1382米等。',
            bywcje:'133',
            wwcqk:'--',
            zrr:'浦鹏鹏',
            rq:'2019.3',
            zt:'已完成'
          },
          {
            xmmc:'G15沈海高速公路温州段隧道警示标识改造项目',
            zywcqkL:'完成雁荡山隧道电缆管道敷设、管道支架安装、供电线缆穿线工作',
            bywcje:'81.7',
            wwcqk:'--',
            zrr:'蒋宇飞',
            rq:'2019.3',
            zt:'已完成'
          },
        ],//月度总结初始化列表数据
        addDataparams:{},
        detailItemInfo:[],//项目段详情
        showDetail:false,//是否展示项目段详情
        firstDatas:[
          {name:'项目编码：',val:'001'},
          {name:'项目名称：',val:'001'},
          {name:'路线名称：',val:'001'},
          {name:'路线名称：',val:'001'},
          {name:'长度：',val:'001'},
          {name:'起始桩号：',val:'001'},
          {name:'终止桩号：',val:'001'},
          {name:'单位工程：',val:'001'},
          {name:'工程类型：',val:'001'},
          {name:'合同开工日期：',val:'001'},
          {name:'合同完工日期：',val:'001'},
          {name:'文号：',val:'001'},
          {name:'实际开工日期：',val:'001'},
          {name:'实际完工日期：',val:'001'},
          {name:'合同工期：',val:'001'},
          {name:'审批日期：',val:'001'},
          {name:'质量监督部门：',val:'001'},
          {name:'施工类型：',val:'001'},
          {name:'管理单位：',val:'001'},
          {name:'承包单位：',val:'001'},
          {name:'监理单位：',val:'001'},
          {name:'项目联系人：',val:'001'},
          {name:'联系电话：',val:'001'},
          {name:'项目介绍：',val:'001'},
          {name:'状态：',val:'001'},
          {name:'项目类型：',val:'001'},
        ],
        val:null,
      }
    },
    methods: {
      // 修改月度计划状态值
      updatestate (row, type) {
        this.changestatus(row)
        this.enterworkFlow(row)
      },
      // 修改状态值
      changestatus (row,type) {
        let paramObj = {}
        if (row) {
          paramObj.mdrid = row.mdrid
        }
        paramObj.lister = config.userInfo ? config.userInfo.username : ''
        paramObj.state = '1.1'
        this.$api.updateMDR(JSON.parse(JSON.stringify(paramObj))).then(res =>{
          if (res.status !== 200) {
            this.$message({
              message: '提交失败',
              type: 'error'
            })
          } else {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            if (type == '月度计划') {
              this.initlastMonthData()
            } else {
              this.queryYDJHData()
            }
          }
        }).catch(e => {
          console.log(e)
        })
      },
      // 调流程接口进入审批流程
      enterworkFlow (rowobj) {
        let {yhmc,yhid,bmmc,orgmc} = config.userInfo

        this.$api.createWorkFlow({
          pc_initiator:yhmc,
          pc_initiatorid: yhid,
          pc_name: '01',
          pc_project_id: rowobj.mdrid,
          pc_remarks: '',
          pc_state: '',
        },{
          group:bmmc,
          org:orgmc}).then(res=>{
          if(res.code == 1){
            this.$message({
              type: 'success',
              message: '进入审批流程!'
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
      seedetail (row) {
        this.showDetail =true
        let categoryparam = ''
        this.getplaneOfnextMonth(categoryparam,row)
      },
      // 判断月度计划是否已经制定
      canInsertMp () {
        this.$api.canInsertMp({xmbh:this.xmbhparam}).then(res => {
          if (res.code != 1) {
            this.$message({
              message: '月度计划已制定过，不允许重复制定！',
              type: 'error'
            })
          } else {
            // debugger
            this.updatesubmit = 0
            this.addStaBtn = 1
            this.handSecondRow()
          }
        }).catch(e => {
        })
      },
      changeTabpane (val) {
        this.showDetail = false;
        if (val.name == 'first') {
          this.isshowbtn = false
        } else if (val.name == 'second') {
          this.isshowbtn = true
        }
      },
      closeDetail(){
        // console.log(45)
        this.showDetail = false
        this.ishowaddbtnOfzj = 0
        this.showInput = false

      },

      handSecondRow(row){

        this.showInput = false
        if (row) {
          this.addStaBtn = 0
          console.log('aaaaaa')
        }
        // this.updatesubmit = 1
        console.log(row,'==row');
        // this.mwpsid = rowInfo .mwpsid
        // debugger
        // if (this.isshowdebtn == 1) {
        //   this.showInput = false
        // }
        this.showDetail = true
        // this.deItemTit = rowInfo.xmmc
        // this.params.tableName = rowInfo.xmmc
        let categoryparam = ''
        if (row) {
          categoryparam = row.category
        }
        this.getplaneOfnextMonth(categoryparam,row)
        console.log(row,111111)
      },
      getplaneOfnextMonth (param,row) {
        this.$api.getProjectMsgToCreateMWP({gldwId: this.daZzid,cbdwId: this.supplierpk}).then(res => {
          if (res.code != 1) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            console.log(res,'===res');
            // console.log(JSON.parse(localStorage.userMsg), '用户信息')
            param = res.data[0].gcfl
            // console.log(param, 4949499)
            this.deItemTit = res.data[0].dwgc   // 详情页面的title(合同名)
            // console.log(this.deItemTit,12)
            this.xmbhparam = res.data[0].xmbh
            this.xmmcparam = res.data[0].xmmc
            if (res.data[0].zzzh) {
              this.zzzhparam = res.data[0].zzzh
              this.qszhparam = res.data[0].qszh
            }
            this.lxmcparam = res.data[0].lxmc
            // debugger
            switch (param){
              case 'hm'://养护
                // this.detailItemInfo = res.data
                console.log(this.detailItemInfo, 'hmData')
                // this.detailItemInfo[0].number = 1
                this.currentType = 'hmList'
                this.params.category = 'hm'
                // addDataparams
                // this.params.remarks = rowInfo.remarks
                // this.params.uncompletedAcc = rowInfo.uncompleted?rowInfo.uncompleted:''
                this.detailItemTit = {
                  content:'工程内容',
                  roadSection:'路段',
                  direction:'方向',
                  spileNum:'起点桩号',
                  epileNum:'止点桩号',
                  projected:'预计完成工程量',
                  remarks:'备注',
                  // sdate:'开始时间',
                  // edate:'结束时间',
                }
                // this.$api.getMDRByMwpsid({mwpsid:rowInfo.mwpsid}).then(res=>{
                //   this.kdrid = res.data&&res.data.kdrid?res.data.kdrid:''
                //   this.mdrid = res.data&&res.data.mdrid?res.data.mdrid:''
                //   if(res.data == null){
                //     this.isNullData = res.data
                //     this.detailItemInfo = [ ]
                //   }else{
                //     this.isNullData = 'hhhhh'
                //   }
                //   if(res.code == 1){
                //
                //     if(res.data){
                //       if(res.data.hmList){
                //         this.detailItemInfo = res.data.hmList
                //         this.kdrid = res.data&&res.data.kdrid?res.data.kdrid:''
                //         this.tableName = res.data.tableName
                //       }else{
                //         this.detailItemInfo = [ ]
                //       }
                //     }else{
                //       this.detailItemInfo = []
                //     }
                //   }else{
                //     this.detailItemInfo = []
                //   }
                // })
                // console.log(row)
                if (row) {
                  this.params.ktcsRemarks = row.remarks
                  this.ktcsid = row.ktcsid
                  this.params.uncompletedAcc = row.uncompleted ? row.uncompleted : ''
                  this.detailItemInfo = row.hmList
                }
                // this.showInput
                break;
              case 'mee'://机电['工程内容', '结束时间','完成金额','完成工程量','施工地点','序号','备注', '开始时间',],
                console.log(this.showInput, 'mee99')
                // this.detailItemInfo = res.data
                console.log(this.detailItemInfo, 'meeData')
                // this.detailItemInfo[0].number = 1
                this.currentType = 'meeList'
                this.params.category = 'mee'
                this.detailItemTit = {
                  contents:'工程内容',
                  location:'施工地点',
                  projected:'预计完成工程量',
                  remarks:'备注',
                  // sdate:'开始时间',
                  // edate:'结束时间',
                }
                // this.$api.getMDRByMwpsid({mwpsid:rowInfo.mwpsid}).then(res=>{
                //
                //   if(res.data == null){
                //     this.isNullData = res.data
                //     this.detailItemInfo = [ ]
                //   }else{
                //     this.isNullData = 'hhhhh'
                //   }
                //   if(res.code == 1){
                //     if(res.data){
                //       this.detailItemInfo = res.data.meeList
                //       this.tableName = res.data.tableName
                //       this.mdrid = res.data&&res.data.mdrid?res.data.mdrid:''
                //     }else{
                //       this.detailItemInfo = []
                //     }
                //   }
                // })
                if (row) {
                  console.log(row, '每行对象')
                  this.params.ktcsRemarks = row.remarks
                  this.ktcsid = row.ktcsid
                  this.params.uncompletedAcc = row.uncompleted ? row.uncompleted : ''
                  this.detailItemInfo  = row.meeList
                }
                break;
              case 'sm'://专项['面积','方向','止点桩号','结束时间','完成金额','完成工程量', '车道','长度','处置方式','序号','备注','路段','起点桩号','开始时间','结构名称','宽度'],
                // this.detailItemInfo = res.data
                console.log(this.detailItemInfo, 'smData')
                this.currentType = 'smList'
                // this.detailItemInfo[0].number = 1
                this.params.category = 'sm'
                this.detailItemTit = {
                  roadSection:'路段',
                  direction:'方向',
                  lane:'车道',
                  spileNum:'起点桩号',
                  epileNum:'止点桩号',
                  structure:'结构名称',
                  method:'处置方式',
                  projected:'预计完成工程量',
                  area:'面积',
                  length:'长度',
                  width:'宽度',
                  remarks:'备注',
                  // sdate:'开始时间',
                  // edate:'结束时间',
                }
                // this.$api.getMDRByMwpsid({mwpsid:rowInfo.mwpsid}).then(res=>{
                //
                //   if(res.data == null){
                //     this.isNullData = res.data
                //     this.detailItemInfo = [ ]
                //   }else{
                //     this.isNullData = 'hhhhh'
                //   }
                //   if(res.code == 1){
                //     if(res.data){
                //         this.detailItemInfo = res.data.smList
                //         this.tableName = res.data.tableName
                //         this. mdrid = res.data&&res.data.mdrid?res.data.mdrid:''
                //     }else{
                //       this.detailItemInfo = []
                //     }
                //   }
                // })
                if (row) {
                  console.log(row, '每行对象')
                  this.params.ktcsRemarks = row.remarks
                  this.ktcsid = row.ktcsid
                  this.params.uncompletedAcc = row.uncompleted ? row.uncompleted : ''
                  this.detailItemInfo  = row.smList
                }
                break;
            }
          }
        }).catch(e => {
          console.log(e)
        })
      },
      //checked
      handleSelectionChange(selection){
        this.currentZJ = selection
      },
      //双击编辑
      chengenum(row){
        this.editable[row] = true;
        this.$set(this.editable,row,true)
      },
      //上月总结 展示详情区域
      handOneRow(row, event, column){
        this.xmbhTit = row.xmbh
        this.showDetail = !this.showDetail
        console.log(row, '计划总结')
        switch (row.category){
          case 'hm'://养护
            this.currentType = 'hmcList'
            this.params.category = 'hm'
            this.params.ktcsRemarks = row.remarks?row.remarks:''
            this.ktcsid = row.ktcsid
            this.params.uncompletedAcc = row.uncompleted?row.uncompleted:''
            this.detailItemTit = {
              content:'工程内容',
              roadSection:'路段',
              direction:'方向',
              spileNum:'起点桩号',
              epileNum:'止点桩号',
              execQuantities:'完成工程量',
              execMoney:'完成金额',
              remarks:'备注',
              // sdate:'开始时间',
              // edate:'结束时间',
            }
            this.$api.getMKDRByKtcsid({ktcsid:row.ktcsid}).then(res=>{
              this.kdrid =  res.data&& res.data.kdrid?res.data.kdrid:''
              if(res.code == 1){
                if(res.data){
                  this.isNullData = 'fsfsd'
                  this.modelControl.majorAcc = res.data.majorAcc
                  this.modelControl.execMoney = res.data.execMoney
                  this.detailItemInfo = res.data.hmcList
                  this.kdrid = res.data&&res.data.kdrid?res.data.kdrid:''
                  this.ktcsid = res.data&&res.data.ktcsid?res.data.ktcsid:''
                  if (res.data.state !=1) {
                    this.ishowaddbtnOfzj = 1
                    this.textareaWrite = true
                  }
                }else{
                  this.isNullData = null
                  this.detailItemInfo = []
                }
              }else{
                this.detailItemInfo = []
                this.isNullData = null
              }
            })
            break;
          case 'mee'://机电['工程内容', '结束时间','完成金额','完成工程量','施工地点','序号','备注', '开始时间',],
            this.currentType = 'meecList'
            this.params.category = 'mee'
            this.params.ktcsRemarks = row.remarks?row.remarks:''
            this.ktcsid = row.ktcsid
            this.params.uncompletedAcc = row.uncompleted? row.uncompleted:''
            this.detailItemTit = {
              contents:'工程内容',
              location:'施工地点',
              execQuantities:'完成工程量',
              execMoney:'完成金额',
              remarks:'备注',
              // sdate:'开始时间',
              // edate:'结束时间',
            }
            this.$api.getMKDRByKtcsid({ktcsid:row.ktcsid}).then(res=>{
              if(res.code == 1){
                if(res.data){
                  this.isNullData = 'fsfd'
                  this.modelControl.majorAcc = res.data.majorAcc
                  this.modelControl.execMoney = res.data.execMoney
                  this.detailItemInfo = res.data.meecList&&res.data.meecList.length? res.data.meecList:[]
                  this.kdrid = res.data&&res.data.kdrid?res.data.kdrid:''
                  this.ktcsid = res.data&&res.data.ktcsid?res.data.ktcsid:''
                  if (res.data.state !=1) {
                    this.ishowaddbtnOfzj = 1
                    this.textareaWrite = true
                  }
                }else{
                  this.detailItemInfo = []
                  this.isNullData = null
                }
              }else{
                this.detailItemInfo = []
                this.isNullData = null
              }
            })
            break;
          case 'sm'://专项['面积','方向','止点桩号','结束时间','完成金额','完成工程量', '车道','长度','处置方式','序号','备注','路段','起点桩号','开始时间','结构名称','宽度'],
            this.currentType = 'smcList'
            this.params.category = 'sm'
            this.params.ktcsRemarks = row.remarks?row.remarks:''
            this.ktcsid = row.ktcsid
            this.params.uncompletedAcc = row.uncompleted?row.uncompleted:''
            this.detailItemTit = {
              roadSection:'路段',
              direction:'方向',
              lane:'车道',
              spileNum:'起点桩号',
              epileNum:'止点桩号',
              structure:'结构名称',
              method:'处置方式',
              area:'面积',
              length:'长度',
              width:'宽度',
              execMoney:'完成金额',
              execQuantities:'完成工程量',
              remarks:'备注',
              // sdate:'开始时间',
              // edate:'结束时间',
            }
            this.$api.getMKDRByKtcsid({ktcsid:row.ktcsid}).then(res=>{
              if(res.code == 1){
                if(res.data){
                  this.isNullData = 'qweqw'
                  console.log(res.data.majorAcc, 1771)
                  console.log(res.data,1881)
                  this.modelControl.majorAcc = res.data.majorAcc
                  this.modelControl.execMoney = res.data.execMoney
                  this.kdrid = res.data&&res.data.kdrid?res.data.kdrid:''
                  this.ktcsid = res.data&&res.data.ktcsid?res.data.ktcsid:''
                  this.detailItemInfo = res.data.smcList&&res.data.smcList.length?res.data.smcList:[]
                  if (res.data.state !=1) {
                    this.ishowaddbtnOfzj = 1
                    this.textareaWrite = true
                  }
                }else{
                  this.detailItemInfo = []
                  this.isNullData = null
                }
              }else{
                this.isNullData = null
                this.detailItemInfo = []
              }
            })
            break;
        }
        if(row.xmmc){
          this.deItemTit = row.xmmc
        }else{
          this.deItemTit = ''
        }
        if(row.pl){
          this.pl = row.pl
        }else{
          this.pl = ''
        }
      },
      updateBG(types){
        console.log(this.addStaBtn, 79790)
        let self = this
        switch (types) {
          case 'update'://提交
            if (this.addStaBtn == 1 ) {//没有数据
              this.$api.createDetailedMonthlyPlans({
                ...self.params,
                // mwpsid:self.mwpsid,
                daBmbm: this.daBmbm,
                daBmid: this.daBmid,
                daBmmc: this.daBmmc,
                daYhbm: this.daYhbm,
                daYhid: this.daYhid,
                daYhmc: this.daYhmc,
                daZzid: this.daZzid,
                daZzbh: this.daZzbh,
                daZzmc: this.daZzmc,
                xmmc: this.xmmcparam,
                xmbh: this.xmbhparam,
                [self.currentType]: self.detailItemInfo
              }).then(res => {
                if (res.code == 1) {
                  this.$message({
                    type: 'success',
                    message: '保存成功!'
                  });
                  this.showDetail = false;
                  this.initlastMonthData()
                } else {
                  this.$message({
                    type: 'info',
                    message: '保存失败!'
                  });
                }
              })
            } else {
              this.$api.updateDetailedMonthlyPlans({//有数据
                ...self.params,
                // mwpsid:self.mwpsid,
                mdrid:this.mdridparam,
                [self.currentType]: self.detailItemInfo
              }).then(res => {
                if (res.code == 1) {
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  });
                  this.initlastMonthData()
                } else {
                  this.$message({
                    type: 'info',
                    message: '修改失败'
                  });
                }
              })
            }
            this.showInput = false
            break;
          case 'add':
            this.showInput = true
            let obj = {
              number: (this.detailItemInfo&&this.detailItemInfo.length)?Number(this.detailItemInfo[this.detailItemInfo.length - 1].number) + 1 :1,
            }
            this.detailItemInfo.push(obj)
            this.detailItemInfo[obj.number-1].spileNum = this.qszhparam
            this.detailItemInfo[obj.number-1].epileNum = this.zzzhparam
            this.detailItemInfo[obj.number-1].roadSection = this.lxmcparam
            console.log(this.detailItemInfo,'月度计划添加')
            break;
          case 'del':
            let currentZJ = self.currentZJ;
            let detailItemInfo = self.detailItemInfo
            console.log(currentZJ,'==del');
            this.detailItemInfo= detailItemInfo.filter(item => !currentZJ.some(ele=>ele.number===item.number));
            break;
        }
      },
      //月度总结弹窗内的保存，提交，删除，添加
      promiseTG(type){
        console.log(this.showInput, 35353535)
        let self = this
        let {majorAcc,execMoney} = this.modelControl

        switch (type) {
          case 'update'://提交
            // this.showDetail = false;
            if (!this.isNullData) {//没有数据
              this.$api.createKeyTasksCompletionDetailed({
                ...self.params,
                ktcsid:self.ktcsid,
                majorAcc: majorAcc,
                execMoney: execMoney,
                daBmbm: this.daBmbm,
                daBmid: this.daBmid,
                daBmmc: this.daBmmc,
                daYhbm: this.daYhbm,
                daYhid: this.daYhid,
                daYhmc: this.daYhmc,
                daZzid: this.daZzid,
                daZzbh: this.daZzbh,
                daZzmc: this.daZzmc,
                [self.currentType]: self.detailItemInfo
              }).then(res => {
                if (res.code == 1) {
                  this.$message({
                    type: 'success',
                    message: '保存成功!'
                  });
                } else {
                  this.$message({
                    type: 'info',
                    message: '保存失败!'
                  });
                }
              })
              // this.modelControl.majorAcc = ''
              // this.modelControl.execMoney = ''
            } else {
              this.$api.updateKeyTasksCompletionDetailed({//有数据
                ...self.params,
                kdrid:self.kdrid,
                ktcsid:self.ktcsid,
                majorAcc: majorAcc,
                execMoney: execMoney,
                daZzid: this.daZzid,
                [self.currentType]: self.detailItemInfo
              }).then(res => {
                if (res.code == 1) {
                  this.$message({
                    type: 'success',
                    message: '保存成功!'
                  });
                } else {
                  this.$message({
                    type: 'info',
                    message: '保存失败!'
                  });
                }
              })
              // this.modelControl.majorAcc = ''
              // this.modelControl.execMoney = ''
            }
            // this.showInput = false
            break;
          case 'add':
            this.showInput = true
            console.log(this.showInput, '==月度总结')
            // let xh = this.detailItemInfo[this.detailItemInfo.length - 1].xh
            let obj = {
              number: this.detailItemInfo&&this.detailItemInfo.length?Number(this.detailItemInfo[this.detailItemInfo.length - 1].number) + 1:1

            }
            this.detailItemInfo.push(obj)
                console.log(this.detailItemInfo,'===dsad')

          case 'del':
            let currentZJ = self.currentZJ;
            let detailItemInfo = self.detailItemInfo
            this.detailItemInfo= detailItemInfo.filter(item => !currentZJ.some(ele=>ele.number===item.number));
            break;
        }
      },
      //页数切换
      handleCurrentChange (val) {
        this.searchForm.pageNum = val
        this.queryYDJHData()
      },
      //初始化展示数据
      queryYDJHData(){
        let {pageNum,pageSize,daZzid,daBmid} = this.searchForm
        let randoms = parseInt(100*Math.random())
        this.$api.getKTCSLidt({pageNum,pageSize,daZzid,daBmid,randoms: randoms}).then(res=>{
          if(res.code == 1){
            this.initCurrentData = res.data.rows
            this.currentTotal = res.data.totle
          }else{
            this.initCurrentData = []
            this.currentTotal = 0
          }
        })
      },
      //下个月初始化数据展示
      initlastMonthData(){
        let {pageNum,pageSize,daZzid,daBmid} = this.lastForm
        let randoms = parseInt(100*Math.random())
        this.$api.getMDRByParam({pageNum,pageSize,daZzid,daBmid,randoms: randoms}).then(res=>{
          if(res.code == 1){
            if(res.data){
              let datas = res.data
              this.initlastData = datas.rows
              if(datas.rows.length){
                this.xmbhparam = datas.rows[0].xmbh
                this.mdridparam = datas.rows[0].mdrid
              }
              this.lastTotal = datas.totle
            }
          }else{
          }
        })
      }
    },
    mounted () {
      this.initlastMonthData()
      console.log(config.userInfo, '454')
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  /*.el-table .cell.el-tooltip{*/
  /*white-space: pre-wrap;*/
  /*}*/
  .rowEdput{
    width: 100%;
    height: 36px;
    border:0;
    outline:none;
    input{
      width: 100%;
      height: 36px;
      border:0;
      outline:none;
    }
  }
  .newAddcontent{
    position: absolute;
    top:60px;
    line-height: 51px;
    z-index: 999;
    width: 200px;
    background: #fff;
    border:1px solid #dfe1e4;
    text-align: center;
    height:150px;
    padding-bottom:20px;
    border-radius: 5px;
    .titles{
      padding-left:10px;
      border-left:2px solid #409eff;
    }
    button{
      margin-bottom: 20px;
    }
  }
  .el-tab-pane{
    >p{
      display: inline-block;
      width: 25%;
      padding-bottom: 22px;
      >span{
        display: inline-block;
        border-bottom: 1px solid #999;
        width: 50%;
      }
    }
  }
  .closeBTN{
    position: absolute;
    left:0;
    right: 0;
    width: 20px;
    margin: auto;
    top: -42px;
    z-index: 999;
    font-size:60px;
    color: #D5D6D7;
    cursor: pointer;
  }
  #kgsqd{
    .upstyle {
      /*.el-tabs__content {*/
      /*position: absolute;*/
      /*top: 47px;*/
      /*width: 99%;*/
      /*}*/
    }
    /*padding: 10px 15px 0 15px;*/
    position: relative;
    font-size: 12px;
    height: 100%;
    overflow: auto;
    .el-tabs__content{
      height: calc(100% - 64px);
      overflow: auto;
    }
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
  .Addbtn {
    position: absolute;
    right: 10px;
    top: 64px;
    z-index: 999;
    cursor: pointer;
  }
</style>
