<!--月度计划审批-->
<template>
  <div id="kgsqd" style="height: 100%" >
    <div class="header">
      <span class="headerTit">月度计划审批</span>
    </div>
    <!--查询弹框区域-->
    <div class="conter_table">
      <div class="cha_xun">
        <el-form  :inline="true"  style="display: inline-block;" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="状态" prop="htbh">
              <el-select size="mini" v-model="searchForm.ZT" placeholder="请输入状态">
                <el-option
                  v-for="item in stateList"
                  :key="item.val"
                  :label="item.name"
                  :value="item.val">
                </el-option>
              </el-select>
              <!--<el-input v-model="searchForm.ZT" size="mini" placeholder="请输入状态"></el-input>-->
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
            <el-button @click="searchYDJH" size="mini" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
            <el-button @click.native="resizeSearch" size="mini">重置</el-button>
          </el-form-item>

        </el-form>
      </div>
      <el-table  :data="YDJHData" tooltip-effect="dark"
                 style="width: 100%;"
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
          width="50">
        </el-table-column>

        <el-table-column align="center" sortable prop="mpname" label="名称" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" sortable label="状态"  show-overflow-tooltip>
          <template scope="scope">
            <span >{{state[scope.row.state]}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="rq" label="日期" width="120" show-overflow-tooltip>
          <template scope="scope">
            <span>{{`${scope.row.year?scope.row.year:''} - ${scope.row.month?(parseInt(scope.row.month) > 10 ? scope.row.month : '0'+ scope.row.month):''}`}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="120">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click=" showBhFormDia(scope.row)">详情</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="promiseTG('save',scope.row)">通过</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="promiseTG('goOut',scope.row)">打回</span>
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
      <div style="position:relative;">
        <p class="tabAreaTit" v-if="!detailItemFirst" >
          <span class="titleclasschild"  @click="showDetail=false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span  v-if="!detailItemFirst" >{{deItemTit}}</span>
        </p>
        <p class="tabAreaTit" v-if="detailItemFirst" >
          <span class="titleclasschild"  @click="detailItemFirst = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>{{detailTit}}</span>
        </p>

      </div>

      <div >

      </div>
      <el-tabs v-if="!detailItemFirst" v-model="activeName" @tab-click="handleClickTab">
        <el-tab-pane label="月度总结" name="first">
          <el-table  :data="currentMonthData" tooltip-effect="dark"
                     style="width: calc(100% - 19px);"
                     @row-click="handOneRowSecod"
                     row-class-name="row_class"
                     border>
            <el-table-column
              type="selection"
              align="center"
              width="55">
            </el-table-column>
            <el-table-column align="center" prop="number" label="序号"  width="55" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="keyTasks" label="主要完成情况" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="amount" label="本月完成金额(万元)" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="uncompleted" label="未完成情况" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="remarks" label="备注" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="月度计划" name="second">
          <el-table  :data="lastPlanData" tooltip-effect="dark"
                     @row-click="handOneRow"
                     style="width: calc(100% - 19px);margin: auto;cursor: pointer;"
                     row-class-name="row_class"
                     border>

            <el-table-column
              type="selection"
              align="center"
              width="55">
            </el-table-column>
            <el-table-column align="center" prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="keyTasks" label="主要工作内容" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="pl" label="责任人" show-overflow-tooltip></el-table-column>

          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!--弹窗区域的详情页面-->
      <div class="detailItem" v-if="detailItemFirst">
        <el-table  :data="detailItemInfo" tooltip-effect="dark"

                   style="width: calc(100% - 16px);margin: auto;"
                   row-class-name="row_class"
                   border>
          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column v-for="(tit,index) in detailItemTit" :label="tit" :prop="index" :key="index"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="maskWrap" v-if="showPlan">
      <div class="maskWindow2">
        <div class="addPlanTit">
          <span><i class="icon iconfont icon-file-text"></i>审批意见</span>
          <span class="closeAddPlan" @click="confirmAdd(false)">×</span>
        </div>
        <textarea v-model="spyj"></textarea>
        <div style="text-align: center;margin-top: 20px;">
          <el-button size="small" @click="confirmAdd(true)" type="danger" round>确定</el-button>
          <el-button size="small" @click="confirmAdd(false)" round>取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        // zll
        detailItemTit: {},
        year: '',
        month: '',
        nextmonthOfState: '',
        mdridparam: '',
        daBmbm: JSON.parse(localStorage.userMsg)[0].deptList[0].deptCode,
        daBmid: JSON.parse(localStorage.userMsg)[0].deptList[0].deptId,
        daBmmc: JSON.parse(localStorage.userMsg)[0].deptList[0].deptName,
        daYhbm: JSON.parse(localStorage.userMsg)[0].userCode,
        daYhid: JSON.parse(localStorage.userMsg)[0].userId,
        daYhmc: JSON.parse(localStorage.userMsg)[0].userName,
        daZzid: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgId,
        daZzbh: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgCode,
        daZzmc: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgName,
        //me
        stateList:[
          {name:'全部',val:undefined},
          {name:'编制中',val:'1'},
          {name:'工程技术部审核',val:'2'},
          {name:'经营发展部审核',val:'3'},
          {name:'公司分管领导审核',val:'4'},
          {name:'公司领导审批',val:'5'},
          {name:'审批完成',val:'6'},
        ],
        mpaState:'',
        mpaid:'',
        spyj:'',
        showPlan:false,
        state:['','编制中','工程技术部审核','经营发展部审核','公司分管领导审核','公司领导审批','审批完成'],
        deItemTit:'hahha',
        detailTit:'',
        detailItemFirst:false,
        searchForm:{
          XMMC:undefined,
          ZT:undefined,
          selectDate:undefined,
          daZzid: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgId,
          pageNum:1,
          pageSize:10
        },
        YDJHData:[], //初始化查询列表信息
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

        ],//上月总结信息
        tableData: [
          {
            xmmc:'乐清段小修日常养护',
            zygznr:'乐清段小修日常养护(含三防工作和公路局检查工作)',
            zrr:'蒋宇飞'
          },
          {
            xmmc:'瓯南段小修日常养护',
            zygznr:'瓯南段小修日常养护(含三防工作和公路局检查工作)',
            zrr:'蒋宇飞'
          },
          {
            xmmc:'瓯南段小修日常养护',
            zygznr:'G15沈海高速温州段隧道警示标识改造项目',
            zrr:'蒋宇飞'
          },
          {
            xmmc:'瓯南段小修日常养护',
            zygznr:'G15沈海高速温州段隧道警示标识改造项目',
            zrr:'蒋宇飞'
          },
        ],//下月计划
        detailItemInfo:[
          {xh:1001,gcnr:'公路巡检查',wz:'k1677+232-k1740+150',sgrq:'3.26-4.25',wcgcl:'包干项目',bz:'已完成（已保证全线巡检查每日至少1次）'},
          {xh:1002,gcnr:'桥梁等结构、桥下、沿线隔离栅检查',wz:'k1677+232-k1740+150',sgrq:'3.26-4.25',wcgcl:'包干项目',bz:'已完成（隔离栅绑扎30处）'},
          {xh:1003,gcnr:'路基、路面、边坡保洁',wz:'k1677+232-k1740+150',sgrq:'3.26-4.25',wcgcl:'包干项目',bz:'已完成（除正常路段保洁外，另外对紧急停车带特殊路段安排清理）'},
        ],//弹窗内详情
        showDetail:false,//是否显示弹窗
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
        activeName:'first',
        lastPlanData:[],
        currentMonthData:[],
        total:100
      }
    },
    methods: {
      resizeSearch(){
        this.searchForm = {ZT:'',selectDate:undefined}
      },
      confirmAdd(bol){
        let self = this
        // console.log(this.mpaState, bol,66)
        if(bol){
          this.$api.updateMPA({
            mpaState: Number(this.mpaState)+1,
            mpaid: self.mpaid,
            leaderOpinions:self.spyj,
          }).then(res=>{
            console.log(res)
            if(res.code == 1){
              this.$message(
                {
                  type: 'success',
                  message: '审批成功!'
                });
              this.queryYDJHData()
            }else{
              this.$message({
                type: 'info',
                message: '审批失败!'
              });
            }
            this.showPlan = false
          })
        }else{
          this.$message(  {
            type: 'info',
            message: '取消审批!'
          });
          this.showPlan = false
        }
      },
      //详情内  本月总结点击
      handOneRowSecod(row, event, column){
         console.log(row)
        switch (row.category){
          case 'hm'://养护
            this.detailItemTit = {
              number:'序号',
              content:'工程内容',
              roadSection:'路段',
              direction:'方向',
              spileNum:'起点桩号',
              epileNum:'止点桩号',
              execQuantities:'完成工程量',
              execMoney:'完成金额',
              sdate:'开始时间',
              edate:'结束时间',
              remarks:'备注'
            }
            this.$api.getMKDRByKtcsid({ktcsid:row.ktcsid}).then(res=>{

              if(res.code == 1){
                if(res.data){
                  this.detailItemInfo = res.data.hmcList
                }else{
                  this.detailItemInfo = []
                }
              }else{
                this.detailItemInfo = []
              }
            })
            break;
          case 'mee'://机电['工程内容', '结束时间','完成金额','完成工程量','施工地点','序号','备注', '开始时间',],
            this.detailItemTit = {
              number:'序号',
              contents:'工程内容',
              location:'施工地点',
              execQuantities:'完成工程量',
              execMoney:'完成金额',
              sdate:'开始时间',
              edate:'结束时间',
              remarks:'备注'
            }
            this.$api.getMKDRByKtcsid({ktcsid:row.ktcsid}).then(res=>{

              if(res.code == 1){
                this.detailItemInfo = res.data.meecList
              }
            })
            break;
          case 'sm'://专项['面积','方向','止点桩号','结束时间','完成金额','完成工程量', '车道','长度','处置方式','序号','备注','路段','起点桩号','开始时间','结构名称','宽度'],
            this.detailItemTit = {
              number:'序号',
              roadSection:'路段',
              direction:'方向',
              lane:'车道',
              spileNum:'起点桩号',
              epileNum:'止点桩号',
              structure:'结构名称',
              method:'处置方式',
              execQuantities:'完成工程量',
              execMoney:'完成金额',
              area:'面积',
              length:'长度',
              width:'宽度',
              sdate:'开始时间',
              edate:'结束时间',
              remarks:'备注'
            }
            this.$api.getMKDRByKtcsid({ktcsid:row.ktcsid}).then(res=>{

              if(res.code == 1){
                this.detailItemInfo = res.data.smcList
              }
            })
            break;
        }
        this.showFirstItemWindow = true
        this.detailItemFirst = !this.detailItemFirst
        this.detailTit = row.keyTasks
      },

      //查看弹窗详情
      handOneRow(row, column){
        console.log(row,1)
        this.detailTit = row.xmmc
        this.detailItemFirst = !this.detailItemFirst
        switch (row.category){
          case 'hm'://养护  ['工程内容','方向','止点桩号','结束时间','序号','预计完成工程量', '备注','路段','起点桩号','开始时间'],
            this.detailItemTit = {
              number:'序号',
              content:'工程内容',
              roadSection:'路段',
              direction:'方向',
              spileNum:'起点桩号',
              epileNum:'止点桩号',
              projected:'预计完成工程量',
              sdate:'开始时间',
              edate:'结束时间',
              remarks:'备注',
            }
            // this.$api.getMDRByMwpsid({mwpsid:row.mwpsid}).then(res=>{
            //
            //   if(res.code == 1){
            //     if(res.data){
            //       this.detailItemInfo = res.data.hmList
            //     }else{
            //       this.detailItemInfo = []
            //     }
            //   }else{
            //     this.detailItemInfo = []
            //   }
            // })
            break;
          case 'mee'://机电['工程内容', '结束时间','施工地点','序号', '预计完成工程量', '备注',  '开始时间'],
            this.detailItemTit = {
              number:'序号',
              contents:'工程内容',
              location:'施工地点',
              projected:'预计完成工程量',
              sdate:'开始时间',
              edate:'结束时间',
              remarks:'备注',
            }
            // this.$api.getMDRByMwpsid({mwpsid:row.mwpsid}).then(res=>{
            //
            //   if(res.code == 1){
            //     this.detailItemInfo = res.data.meeList
            //   }
            // })
            break;
          case 'sm'://专项['面积','方向','止点桩号','结束时间', '车道','长度','处置方式','序号','备注','预计完成工程量','路段','起点桩号','开始时间','结构名称','宽度' ],
            this.detailItemTit = {
              number:'序号',
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
              projected:'预计完成工程量',
              sdate:'开始时间',
              edate:'结束时间',
              remarks:'备注',
            }
            // this.$api.getMDRByMwpsid({mwpsid:row.mwpsid}).then(res=>{
            //
            //   if(res.code == 1){
            //     this.detailItemInfo = res.data.smList
            //   }
            // })
            break;
        }
        this.getEacheadOfdata(row.xmbh,this.year,this.month)
      },
      // 下月计划详情页数据
      getEacheadOfdata (xmbh,year,month) {
        // debugger
        this.$api.getMDRByXmbhAndMonth({xmbh:xmbh,year: year,month: month}).then(res => {
          if (res.code !=1) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            console.log(res.data, 8080)
            if (res.data) {
              console.log('aa')
              if (res.data.category === 'hm') {
                this.detailItemInfo = res.data.hmList
              } else if (res.data.category === 'mee') {
                this.detailItemInfo = res.data.meeList
              } else if (res.data.category === 'sm') {
                this.detailItemInfo = res.data.smList
              }
              this.nextmonthOfState = res.data.state
              this.mdridparam = res.data.mdrid
              console.log(res.data, 6767)
            } else {
              console.log('bb')
              this.detailItemInfo = []
            }
          }
        }).catch(e => {
        })
      },
      //tab切换
      handleClickTab(){
        this.detailItemFirst = false

      },
      //审批意见
      promiseTG(bol,info){
        let self = this
        this.mpaState = info.state
        self.mpaid = info.mpaid
       if(bol == 'save'){
          this.showPlan = true
         console.log(info)
       }else{
         this.$api.updateMPA({
           mpaState: Number(this.mpaState)-1,
           mpaid: info.mpaid,
         }).then(res=>{
           console.log(res)
           if(res.code == 1){
             this.$message({
               type: 'success',
               message: '打回成功!'
             });
             this.queryYDJHData()
           }else{
             this.$message(
               {
                 type: 'info',
                 message: '打回失败!'
               });
           }
           this.showPlan = false
         })
       }
        // this.showDetail = false
      },

      //查看详情
      showBhFormDia (row) {
        console.log(row)
        this.mpaid = row.mpaid
        this.mpaState = row.state
        this.deItemTit = row.mpname
        this.showDetail = !this.showDetail
        //本月关键任务完成情况
        this.$api.getKTCByMPAID({mpaid:this.mpaid}).then(res=>{
          if(res.code == 1){
            if(res.data){
              this.currentMonthData = res.data.ktcs
              this.tableName = res.data.tableName
            }
          }
        })
        //下月主要工作工作计划
        this.$api.getMWPByMPAID({mpaid:this.mpaid}).then(res=>{
          if(res.code == 1){
            if(res.data){
              this.lastPlanData = res.data.mwps
              this.tableName = res.data.tableName
              this.year = res.data.year
              this.month = res.data.month
            }

          }
        })
      },
      //分页展示数据
      handleCurrentChange (val) {
        this.pageNum = val
        this.queryYDJHData()
      },
      //月度计划初始化查询
      searchYDJH(){
        this.queryYDJHData()
      },
      queryYDJHData(){
        let {XMMC,ZT,selectDate,daZzid,pageNum,pageSize} = this.searchForm
        let YearDate,MonthDate;
        if(selectDate){
          console.log(selectDate)
          let  selectDateArr = selectDate.split('-');
          YearDate = selectDateArr[0]
          if(selectDateArr[1][0] == 0){
            MonthDate = selectDateArr[1][1]
          }else{
            MonthDate = selectDateArr[1]
          }
        }
        this.$api.getMPList({year:YearDate,month:MonthDate,state:ZT,daZzid:daZzid,pageNum,pageSize,isApprove:'sp'}).then(res=>{
        // this.$api.getMPList({year:YearDate,month:MonthDate,state:ZT,pageNum,pageSize}).then(res=>{
          if(res.code == 1){
            this.YDJHData = res.data.rows
            this.total = res.data.totle
          }else{

          }

        })
      },

    },
    mounted () {
      this.queryYDJHData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .maskWrap{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background:rgba(31,38,46,0.15);
    .maskWindow2{
      width: 480px;
      height: 240px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      z-index: 1000;
      background: #fff;
      .addPlanTit{
        padding: 10px;
        display: flex;
        justify-content: space-between;
        .titIcon{
          color: #1f262e;
          font-size: 14px;
          i{
            color: #1f262e;
          }
        }
        .closeAddPlan{
          color: #1f262e;
          display: inline-block;
          vertical-align: top;
          font-size: 15px;
          /*border-left:1px solid;*/
          padding-left: 15px;
          margin-left: -20px;
          height: 20px;
          line-height: 20px;
          cursor: pointer;
        }
      }
      .selectBox{
        padding: 20px 10px;
        >span{
          display: inline-block;
          cursor: pointer;
          padding: 10px;
          background: #eee;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          margin-right: 20px;
          margin-bottom: 15px;
          border: 1px solid transparent;
        }
        .selectSpan{
          background: #fff;
          border: 1px solid red;
        }
      }
      textarea{
        display: block;
        width: 90%;
        padding-left: 10px;
        height: 120px;
        outline: none;
        margin: auto;
      }
    }
  }
  .rowEdput{
    width: 100%;
    height: 36px;
    border:0;
    outline:none;
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

  #kgsqd{
    /*padding: 10px 15px 0 15px;*/
    position: relative;
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
</style>
