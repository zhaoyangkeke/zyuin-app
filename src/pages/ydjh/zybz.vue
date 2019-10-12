<!--主要工作计划编制-->
<template>
  <div id="kgsqd" style="height: 100%" >
    <div class="header" v-show="!showDetail">
      <span class="headerTit">主要计划编制</span>
      <div class="header_option">

        <ul>
          <!--<li><i class="el-icon-search"> 查询</i></li>-->
          <!--<li><i class="icon iconfont icon-export"> 导出</i></li>-->
          <!--<li><i class="icon iconfont icon-bianji2"> 编辑</i></li>-->
          <li @click="addContent(true)"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="addContent(false)"><i class="el-icon-delete"> 删除</i></li>
        </ul>
         <div class="newAddcontent" v-if="showAdd">
           <div style="text-align: left;padding-left: 10px;"><i class="icon iconfont icon-add" style="margin-right: 10px;"></i>添加月度计划</div>
           <h2 class="content">《{{currentDate.year}}年{{currentDate.month}}月份月度计划》</h2>
           <div class="buttons" style="padding-left: 80px;">
             <span style="color: #e14c46;margin-right:45px;" @click="promiseAdd(true)">确定</span>
             <span @click="promiseAdd(false)">取消</span>
           </div>
         </div>
      </div>
    </div>
    <!--查询弹框区域-->
    <div class="conter_table" v-show="!showDetail">
      <!--查询信息-->
      <div class="cha_xun">
        <el-form  :inline="true"  style="display: inline-block;" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
          <!--<el-form-item style="margin-bottom: 0;" label="项目名称" prop="" class="">-->
            <!--<el-input v-model="searchForm.XMMC"  size="mini" placeholder="请输入项目名称"></el-input>-->
          <!--</el-form-item>-->
            <el-form-item class="" label="状态" prop="htbh">
              <el-select size="mini" v-model="searchForm.ZT" placeholder="请输入状态">
                <el-option
                  v-for="item in stateList"
                  :key="item.val"
                  :label="item.name"
                  :value="item.val">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="" label="月份" prop="htbh">

              <!--<el-date-picker-->
                <!--v-model="searchForm.selectDate"-->
                <!--size="mini"-->
                <!--type="date"-->
                <!--placeholder="选择日期"-->
                <!--format="yyyy 年 MM 月 dd 日"-->
                <!--value-format="yyyy-MM-dd">-->
              <!--</el-date-picker>-->
              <el-date-picker
                v-model="searchForm.selectDate"
                size="mini"
                type="month"
                placeholder="选择月份"
                format="M月"
                value-format="yyyy-MM"
                @change="getyearandmonth"
                >
              </el-date-picker>
            </el-form-item>
          </el-form-item>

          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button @click="searchYDJH" size="mini" style="background-color: #DF4D4A;border-color:transparent;color: #fff">查询</el-button>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button @click.native="resizeSearch" size="mini">重置</el-button>
            <!--<el-button @click="searchYDJH" size="small" type="text" style="width: 64px;height: 35px;background-color: #DF4D4A;border-radius: 4px;color: #fff">查询</el-button>-->
          </el-form-item>

        </el-form>
      </div>
      <!--<p style="font-size: 12px;height: 18px"></p>-->
      <el-table  :data="YDJHData" tooltip-effect="dark"
                style="width: calc(100% - 19px);"
                row-class-name="row_class"
                 @selection-change="handleSelectionChange"
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
        <el-table-column align="center" prop="mpname" label="名称" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="日期" sortable show-overflow-tooltip>
          <template scope="scope">
            <span>{{`${scope.row.year?scope.row.year+'-':''}${scope.row.month?scope.row.month:''}`}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" sortable label="状态"  show-overflow-tooltip>
          <template scope="scope">
            <span >{{state[scope.row.state]}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="290">
          <template scope="scope">
            <!--<span v-if="scope.row.state !=1" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"-->
            <!--@click="updateFormDia('编辑',scope.row)">编辑</span>-->
            <span   v-if="scope.row.state !=1" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="updateFormDia('详情',scope.row)">详情</span>
            <span   v-if="scope.row.state ==1" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="updateFormDia('本月完成情况',scope.row)">本月完成情况</span>
            <span   v-if="scope.row.state ==1" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="updateFormDia('下月计划',scope.row)">下月计划</span>
            <span   v-if="scope.row.state ==1" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="updateFormDia('完成编制',scope.row)">完成编制</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页区域-->
    <footer class="footer"  v-show="!showDetail">
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
        <p class="tabAreaTit" v-if="!showlastWindow">
          <span class="titleclasschild" @click="closeDetail"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span v-html="firstItemTit"></span>
        </p>
        <div v-show="showcurrentMonthPlan&&!showlastWindow" class="SPState" >
          <el-button size="mini" @click="isenable = 0;showInput = !showInput" v-if="isshowupdatebtn && !showInput"><i class="icon iconfont icon-add"></i> 修改</el-button>
          <el-button size="mini" @click="lastBtns('save')" v-if="showInput"><i class="icon iconfont icon-save"></i> 保存</el-button>
          <el-button size="mini" @click="CancelBtn" v-if="showInput"><i class="icon iconfont icon-save"></i> 取消</el-button>
          <!--<el-button size="mini" @click="lastBtns('add')"><i class="icon iconfont icon-add"></i>添加</el-button>-->
          <!--<el-button size="mini" @click="lastBtns('del')"><i class="icon iconfont icon-delete"></i>删除</el-button>-->
        </div>
      </div>
      <el-tabs  style="height:calc(100% - 58px);" class="zybzTabs"  v-show="showPlan" v-model="activeName"  @tab-click="handFirstTab">
        <el-tab-pane  style="height:calc(100% - 40px);"  label="月度总结" name="first">
          <el-table  :data="currentMonthData" tooltip-effect="dark"
          style="width: calc(100% - 26px);margin: auto;"
                     height="calc(100% - 30px)"
                     @row-click="handOneRowSecod"
          row-class-name="row_class"
          border>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
            <el-table-column align="center"  type="index" label="序号"  width="55" show-overflow-tooltip></el-table-column>
          <!--<el-table-column align="center" prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>-->
          <el-table-column align="center" prop="majorAcc" label="主要完成情况" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="amount" label="本月完成金额(万元)" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="uncompleted" label="未完成情况" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="remarks" label="备注" show-overflow-tooltip></el-table-column>
          <!--<el-table-column align="center" prop="rq" label="日期" show-overflow-tooltip></el-table-column>-->
          <!--<el-table-column align="center" prop="zt" label="状态" show-overflow-tooltip></el-table-column>-->
        </el-table>
        </el-tab-pane>
        <el-tab-pane style="height:calc(100% - 40px);" label="月度计划" name="second">
          <el-table  :data="lastPlanData" tooltip-effect="dark"
                     @row-click="handOneRow"
                     height="calc(100% - 30px)"
                     style="width: calc(100% - 26px);margin: auto;cursor: pointer;"
                     row-class-name="row_class"
                     border>
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column align="center" prop="number" label="序号" width="55" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="keyTasks" label="主要工作内容" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="pl" label="责任人" show-overflow-tooltip></el-table-column>

          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div class="windowAramFirst" v-if="showFirstItemWindow" >

        <div style="position:relative;">
          <p class="tabAreaTit">
            <span class="titleclasschild" @click="showFirstItemWindow = false">
              <i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
            <span>返回</span>
          </p>

        </div>

        <!--<div class="closeBTN" @click="promiseTG('close')"><i class="icon iconfont icon-down"></i></div>-->
        <!--<div v-if="showFirstItemWindow" class="goDetail"><i @click="showFirstItemWindow = false" class="icon iconfont icon-arrow-left"></i>《2019年5月份主要工作计划》</div>-->
        <el-table v-if="showFirstItemWindow"  :data="detailItemInfo" tooltip-effect="dark"
                  max-height="250"
                  style="width: calc(100% - 23px);"
                  row-class-name="row_class"
                  border>
          <!--<el-table-column-->
            <!--type="selection"-->
            <!--width="55">-->
          <!--</el-table-column>-->
          <el-table-column v-for="(tit,index) in detailItemTit" :label="tit" :prop="index" :key="index"></el-table-column>
        </el-table>
      </div>

      <!--本月完成情况-->
      <div v-show="showlastMontPlan">
         <p v-if="currentMonthData.lister">制表人：{{currentMonthData.lister}}</p>
      </div>
      <el-table v-if="!showlastWindow&&showlastMontPlan" :data="currentMonthData" tooltip-effect="dark"
                 style="width: calc(100% - 19px);margin:20px auto 0;height:calc(100% - 75px);overflow-y: auto"
                 row-class-name="row_class"
                 border>
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column align="center" type="index" label="序号"  width="55" show-overflow-tooltip> </el-table-column>
        <el-table-column align="center" prop="xmbh" label="项目编号" show-overflow-tooltip> </el-table-column>
        <el-table-column align="center" prop="xmmc" label="项目名称" show-overflow-tooltip> </el-table-column>
        <el-table-column align="center" prop="majorAcc" label="主要完成情况" show-overflow-tooltip> </el-table-column>
        <el-table-column align="center" prop="amount" label="本月完成金额(万元)" show-overflow-tooltip> </el-table-column>
        <el-table-column align="center" prop="uncompleted" label="未完成情况" show-overflow-tooltip> </el-table-column>
        <el-table-column align="center" prop="remarks" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="查看详情" width="100"  show-overflow-tooltip @click="">
          <template slot-scope="scope">
          <span style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"  @click="showSecondDetail(scope.row)">查看</span>
          </template>
        </el-table-column>
      </el-table>
      <!--下月计划-->
      <!--{{lastPlanData}}-->
      <el-table v-if="showcurrentMonthPlan&&!showlastWindow"  :data="lastPlanData" tooltip-effect="dark"
               @selection-change="selectionChange"
               style="width: calc(100% - 19px);"
                height="calc(100% - 70px)"
               row-class-name="row_class"
               border>
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>

        <el-table-column align="center" type="index" label="序号" width="55" show-overflow-tooltip></el-table-column>
        <el-table-column  align="center"   v-for="(tit,index) in dataInfoMC" :label="tit" :key="index" show-overflow-tooltip>
          <template slot-scope="{row,$index}">
            <div>
              <span style="text-align: center;" v-if="!showInput">{{row[index]}}</span>
              <input type="text" style="text-align: center;" class="rowEdput" v-model="row[index]" v-if="showInput"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="70" show-overflow-tooltip>
          <template slot-scope="{row,$index}">
            <!--<span style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"  type="primary" size="small"  @click="chengenum($index)">{{editable[$index]?'保存':"修改"}}</span>-->
            <span style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"  @click="handwindowThird(row)" type="primary" size="small">详情</span>
          </template>
        </el-table-column>
    </el-table>
      <!--弹窗区域的详情页面-->
      <div class="windowAram" v-if="showlastWindow" >
          <p class="tabAreaTit" v-if="showlastWindow">
            <span class="titleclasschild"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer" @click="backxmtable"></i></span>
            <span v-html="secondItemTit"></span>
          </p>
          <div v-if="showlastWindow && isshowagreebtn" class="SPState">
            <el-button size="mini" @click="promiseTG('tg')"><i class="icon iconfont icon-past"></i>通过</el-button>
            <el-button size="mini" @click="promiseTG('dh')"><i class="icon iconfont icon-return"></i>打回</el-button>
          </div>
        <div v-if="showlastWindow && isshowzjbtn" class="SPState">
          <el-button size="mini" @click="promiseTG('tg')"><i class="icon iconfont icon-past"></i>通过</el-button>
          <el-button size="mini" @click="promiseTG('dh')"><i class="icon iconfont icon-return"></i>打回</el-button>
        </div>
        <el-table v-if="showlastWindow"  :data="detailItemInfo" tooltip-effect="dark"
                  max-height="200"
                  style="width: calc(100% - 19px);margin:40px auto 0;"
                  row-class-name="row_class"
                  border>
          <!--<el-table-column-->
            <!--type="selection"-->
            <!--width="55">-->
          <!--</el-table-column>-->
          <el-table-column v-for="(tit,index) in detailItemTit" :label="tit" :prop="index" :key="index"></el-table-column>

        </el-table>
        <div style="padding-top: 60px;text-align: center;display: none">
          <span style="margin-right: 60px;">审核人：<el-input v-model="reviewerModel" style="width: 100px"  placeholder="请输入内容"></el-input></span>
          <span style="margin-right: 60px;">制表人：<el-input v-model="auditorModel" style="width: 100px" placeholder="请输入内容"></el-input></span>
          <span style="margin-right: 60px;">复核人：<el-input v-model="listerModel" style="width: 100px" placeholder="请输入内容"></el-input></span>
        </div>
      </div>

    </div>
    <!--下个月计划添加弹窗-->
    <div class="maskWrap" v-show="showAddPlan">
    <div class="maskWindow">
      <div class="addPlanTit">
        <span class="titIcon"><i class="icon iconfont icon-add"></i>添加计划</span>
        <div>
          <!--<el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
          <span class="closeAddPlan" @click="showAddPlan = false">×</span>
        </div>

      </div>
      <!--<div class="selectBox">-->
        <!--<span v-for="(val,index) in selectVals" @click="selectXMMC(val)" :key="index" :class="selectPlan.indexOf(val.xmbh) !== -1?'selectSpan':''">{{val.xmmc}}</span>-->
      <!--</div>-->
      <div style="text-align: center">
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
        isshowzjbtn: false,
        // ishowAddandDelBtn: 1,
        isshowagreebtn: false,
        nextmonthOfState: '',
        mdridparam: '',
        detaillist: {},
        categoryparam: '',
        isshowupdatebtn: true,
        mpaidofRow: '',
        year: '',
        month: '',
        isenable: 0,
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
        editable:[],
        stateList:[
          {name:'全部',val:undefined},
          {name:'编制中',val:'1'},
          {name:'工程技术部审核',val:'2'},
          {name:'经营发展部审核',val:'3'},
          {name:'公司分管领导审核',val:'4'},
          {name:'公司领导审批',val:'5'},
          {name:'审批完成',val:'6'},
        ],
        selection:[],
        dataInfoMC:{xmmc:'项目名称',keyTasks:'主要工作内容',pl:'责任人',},
        showInput:false,
        selectPlan:[],
        addObj:{},
        addArr:[],
        currentWindowInfo:{},
        showAddPlan:false,
        isIndeterminate: true,
        checkAll:false,
        selectVals:[],
        listerModel:'',
        auditorModel:'',
        reviewerModel:'',
        delStr:'',
        kdrid:'',
        mdrid:'',
        isShowCurrent:null,
        detailItemTit:{},
        currentTit:{
          hmcList:['工程内容','方向','止点桩号','结束时间','完成金额','完成工程量','序号','备注','路段','起点桩号','开始时间',],
          meecList:['工程内容', '结束时间','完成金额','完成工程量','施工地点','序号','备注', '开始时间',],
          smcList:['面积','方向','止点桩号','结束时间','完成金额','完成工程量', '车道','长度','处置方式','序号','备注','路段','起点桩号','开始时间','结构名称','宽度'],
        },
        nextTit:{
          hmcList:['工程内容','方向','止点桩号','结束时间','序号','预计完成工程量', '备注','路段','起点桩号','开始时间'],
          meecList:['工程内容', '结束时间','施工地点','序号', '预计完成工程量', '备注',  '开始时间'],
          smcList:['面积','方向','止点桩号','结束时间', '车道','长度','处置方式','序号','备注','预计完成工程量','路段','起点桩号','开始时间','结构名称','宽度' ],
        },
        currentMonthData:[],
        lastPlanData:[],
        currentName:'',
        total:0,
        state:['','编制中','工程技术部审核','经营发展部审核','公司分管领导审核','公司领导审批','审批完成'],

        showFirstItemWindow:false,
        firstItemTit:'fdaf',
        showlastWindow:false,
        showPlan:false,
        showlastMontPlan:false,
        showcurrentMonthPlan:false,
        currentPlanDetail:false,
        showAdd:false,
        currentDate:{year:'2019',month:'4',date:'22'},
        secondItemTit:'fdfdsf',
        detailCtitle:'二级弹窗页面',
        detailItemSecond:false,
        detailItemFirst:false,
        searchForm:{
          XMMC:undefined,
          ZT:undefined,
          selectDate:null,
          pageNum:1,
          pageSize:10,
          daZzid: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgId
        },
        YDJHData:[ ],
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

        ],
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
        ],
        detailItemInfo:[],//本月完成情况详情数据
        /*
        *
        *
        *
        * */
        // detailItemInfo:[
        //   {xh:1001,gcnr:'公路巡检查',wz:'k1677+232-k1740+150',sgrq:'3.26-4.25',wcgcl:'包干项目',bz:'已完成（已保证全线巡检查每日至少1次）'},
        //   {xh:1002,gcnr:'桥梁等结构、桥下、沿线隔离栅检查',wz:'k1677+232-k1740+150',sgrq:'3.26-4.25',wcgcl:'包干项目',bz:'已完成（隔离栅绑扎30处）'},
        //   {xh:1003,gcnr:'路基、路面、边坡保洁',wz:'k1677+232-k1740+150',sgrq:'3.26-4.25',wcgcl:'包干项目',bz:'已完成（除正常路段保洁外，另外对紧急停车带特殊路段安排清理）'},
        // ],
        showDetail:false,
        value1:'',
        activeName2:'third',
        activeName:'first',
        tableName : '',
        mpaid:'',
        ktcid:'',
        mwpid:'',
        isNullData:'',
      }
    },
    methods: {
      CancelBtn() {
        this.isenable = 0
        this.showInput = false
        this.planOfnextmonth()
      },
      closeDetail () {
        this.showDetail = false
        this.showInput = false
      },
      getyearandmonth (val) {

      },
      // 下月计划详情页跳到项目列表页
      backxmtable () {
        this.showlastWindow = false
        this.showcurrentMonthPlan = true
      },
      // 初始化加载下月计划列表
      planOfnextmonth () {
        this.$api.getProjectMsgToCreateMWP({gldwId: this.daZzid}).then(res=>{
          if(res.code == 1){
            for (var i=0; i<res.data.length;i++) {
              res.data[i].category = res.data[i].gcfl
            }
            for (var i=0; i<res.data.length;i++) {
              res.data[i].number = ++i
            }
            console.log(res.data, '动态添加字段')
            this.lastPlanData = res.data
          }
        })
      },
      // chengenum(row){

      //   if(this.editable[row]){
      //     this.editable[row] = false;
      //     this.$set(this.editable,row,false)
      //   }else{
      //     this.editable[row] = true;
      //     this.$set(this.editable,row,true)
      //   }
      //
      // },
      // 提交后表格不可编辑
      stusunwritable () {
        this.isenable = 1
      },
      selectionChange(selection){
        this.selection = selection

      },
      confirmAdd(bol){

        if(bol){
          this.showAddPlan = false
          this.showInput = true
          // this.lastPlanData.push(...this.addArr)
        }else{
          this.showAddPlan = false
        }
        this.addArr = []
        this.selectPlan = []
        this.checkAll = false
      },
      //全选的选项
      // handleCheckAllChange(val){
      //   let {selectVals,addArr,lastPlanData} = this
      //
      //   if(val){
      //     selectVals.forEach( obj =>{
      //        let objs = {
      //          number:addArr.length?Number(addArr[addArr.length-1].number)+1:(lastPlanData.length?Number(lastPlanData[lastPlanData.length-1].number)+1:1),
      //          xmmc:obj.xmmc,
      //          xmbh:obj.xmbh,
      //          category:obj.xmlx,
      //        }
      //        this.addArr.push(objs)
      //        this.selectPlan.push(obj.xmbh)
      //      })
      //    }else{
      //      this.selectPlan = []
      //      this.addArr = []
      //    }
      // },
      // selectXMMC(val){
      //   let {lastPlanData,addArr} = this

      //   let addObj = {}
      //   if(this.selectPlan.indexOf(val.xmbh) == -1){
      //     this.selectPlan.push(val.xmbh)
      //     if(this.addArr.length){
      //       addObj.number = Number(addArr[addArr.length-1].number)+1
      //     }else{
      //       addObj.number = lastPlanData.length?Number(lastPlanData[lastPlanData.length-1].number)+1:1
      //     }
      //     addObj.xmmc = val.xmmc
      //     addObj.xmbh = val.xmbh
      //     addObj.category = val.xmlx
      //     this.addArr.push(addObj)
      //   }else{
      //     let xmbh = val.xmbh
      //     let indexVal = this.selectPlan.indexOf(xmbh)
      //     this.addArr.forEach((item,index)=>{
      //       if(item.xmbh == val.xmbh){
      //         this.addArr.splice(index,1)
      //       }
      //     })
      //     this.selectPlan.splice(indexVal,1)
      //   }
      // },

      //下个月计划的操作
      lastBtns(types){
        let self = this

        switch (types){
          case 'add'://添加
            this.showAddPlan = true
            this.$api.getProjectMsgToCreateMWP().then(res=>{
              if(res.code == 1){
                this.selectVals = res.data
              }
        })
            break;
          case 'del':
            this.lastPlanData= self.lastPlanData.filter(item => !self.selection.some(ele=>ele.mwpsid===item.mwpsid));
            break;
          case 'save':

            if(this.isNullData == null){
           this.$api.createMWP(
             {
               daBmbm: this.daBmbm,
               daBmid: this.daBmid,
               daBmmc: this.daBmmc,
               daYhbm: this.daYhbm,
               daYhid: this.daYhid,
               daYhmc: this.daYhmc,
               daZzid: this.daZzid,
               daZzbh: this.daZzbh,
               daZzmc: this.daZzmc,
               tableName: self.tableName,
               mpaid: this.mpaidofRow,
               mwps: self.lastPlanData,
               year: this.year,
               month: this.month
             }
           ).then(res=>{
             if(res.code == 1){

               this.$message({
                 type: 'success',
                 message: '保存成功!'
               });
               this.stusunwritable()
             }else{
               this.$message(
                 {
                   type: 'info',
                   message: '保存失败!'
                 });
             }

           })
         }else{
           this.$api.updateMWP(
             {
               tableName:self.tableName,
               mpaid:self.mpaid,
               mwps:self.lastPlanData,
               mwpid:self.mwpid,
             }
           ).then(res=>{
             if(res.code == 1){
               this.$message({
                 type: 'success',
                 message: '保存成功!'
               });
             }else{
               this.$message(   {
                 type: 'info',
                 message: '保存失败!'
               });
             }

           })
         }

            break;
        }
        this.showInput = false
      },
      selectable2:function(row, index){   //禁用第四个
        if(row.canDel == 1){
          return true
        }else{
          return false
        }

      },
      handleSelectionChange(selection){
        let str = ''
        if(selection.length){
          if(selection.length>1){
            selection.forEach(sele =>{
              str = str + sele.mpid +','
            })
          }else{
            selection.forEach(sele =>{
              str = str + sele.mpid
            })
          }
          this.delStr = str
        }
      },
      resizeSearch(){
        this.searchForm.XMMC = undefined
        this.searchForm.ZT = undefined
        this.searchForm.selectDate = undefined
        this.searchForm.pageNum = 1
      },

      //本月完成情况点击的详细信息
      showSecondDetail(row, event, column){
        console.log(row, 7)
        this.showlastWindow = true
        this.secondItemTit = row.xmmc
        this.isShowCurrent = 'true'
        this.isshowagreebtn = false
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
              remarks:'备注',
            }
            this.$api.getMKDRByKtcsid({ktcsid:row.ktcsid}).then(res=>{

              if(res.code == 1){
                if(res.data){
                  this.detailItemInfo = res.data.hmcList
                  this.kdrid = res.data.kdrid
                  if (res.data.state !=1 ) {
                    this.isshowzjbtn = false
                  } else {
                    this.isshowzjbtn = true
                  }
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
              remarks:'备注',
            }
            this.$api.getMKDRByKtcsid({ktcsid:row.ktcsid}).then(res=>{

              if(res.code == 1){
                if(res.data){
                  this.detailItemInfo = res.data.meecList
                  this.kdrid = res.data.kdrid
                  if (res.data.state !=1 ) {
                    this.isshowzjbtn = false
                  } else {
                    this.isshowzjbtn = true
                  }
                }else{
                  this.detailItemInfo = []
                }

              }else{
                this.detailItemInfo = []
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
              area:'面积',
              length:'长度',
              width:'宽度',
              structure:'结构名称',
              method:'处置方式',
              execQuantities:'完成工程量',
              execMoney:'完成金额',
              sdate:'开始时间',
              edate:'结束时间',
              remarks:'备注',
            }
            this.$api.getMKDRByKtcsid({ktcsid:row.ktcsid}).then(res=>{

              if(res.code == 1){
                if(res.data){
                  this.detailItemInfo = res.data.smcList
                  this.kdrid = res.data.kdrid
                  if (res.data.state !=1 ) {
                    this.isshowzjbtn = false
                  } else {
                    this.isshowzjbtn = true
                  }
                }else{
                  this.detailItemInfo = []
                }

              }else{
                this.detailItemInfo = []
              }
            })
            break;
        }
      },
      //下月计划某一行被点击
      handwindowThird(row, event, column){
        console.log(row)
        this.showlastWindow = true
        this.secondItemTit = row.xmmc
        this.isShowCurrent = 'false'
        this.categoryparam = row.category
        this.isshowzjbtn = false
        console.log(this.categoryparam,6)
        console.log(row.category,7)
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
            console.log('hm表头')
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
            console.log('mee表头')
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
            console.log('sm表头')
            break;
        }
        console.log(this.detailItemTit, 808011)
        this.getEacheadOfdata(row.xmbh,this.year, this.month)
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
              this.isShowagree(this.nextmonthOfState)
            } else {
              console.log('bb')
              this.detailItemInfo = []
            }
          }
        }).catch(e => {
        })
      },
      isShowagree (param) {
        if (param == 1) {
          this.isshowagreebtn = true
        } else {
          this.isshowagreebtn = false
        }
      },
      promiseAdd(bol){
        // let userobj = JSON.parse(localStorage.userMsg)
        // if (userobj) {
        //   var daBmbm = userobj[0].deptList[0].deptCode
        //   var daBmid = userobj[0].deptList[0].deptId
        //   var daBmmc = userobj[0].deptList[0].deptName
        //   var daYhbm = userobj[0].userCode
        //   var daYhid = userobj[0].userId
        //   var daYhmc = userobj[0].userName

        // }

        if(bol){
          let addDate = `${ this.currentDate.year}-${this.currentDate.month}-${this.currentDate.date} 00:00:00`
          this.$api.createMonthlyPlan({
            daBmbm: this.daBmbm,
            daBmid: this.daBmid,
            daBmmc: this.daBmmc,
            daYhbm: this.daYhbm,
            daYhid: this.daYhid,
            daYhmc: this.daYhmc,
            daZzid: this.daZzid,
            daZzbh: this.daZzbh,
            daZzmc: this.daZzmc,
            company:'',dept:'',formulateDate:addDate,
            month:this.currentDate.month,mpname:`《${this.currentDate.year}年${this.currentDate.month}月度计划》`,remarks:'',
            state:'',year:this.currentDate.year}).then(res=>{
            if(res.code == 1){
              this.queryYDJHData()
            } else {
              this.$message({
                message: '月度计划已制定，不可以重复制定',
                type: 'error'
              })
            }
          })
          // let year = new Date().getFullYear()
          // let month = new Date().getMonth()
          // let newArr ={
          //   edit:['上月关键任务完成情况','本月主要工作计划'],
          //   mc:`${year}年${month+1}月份工作计划`,
          //   zt:'已完成',
          //   rq:`${year}.${month+1}`,
          // }
          // if(this.YDJHData.length ==3){
          //   this.YDJHData.unshift(newArr)
          // }
        }
        this.showAdd = false
      },
      addContent(bol){
        //添加
        if(bol){
          this.showAdd = !this.showAdd
          let year = new Date().getFullYear()
          let month = new Date().getMonth()
          let date = new Date().getDate()
          this.currentDate.year = year
          this.currentDate.month = month+2
          this.currentDate.date = date
        }else{//删除

          if(this.delStr.length){
               this.$api.deleteMonthlyPlan({mpid:this.delStr}).then(res=>{

                 if(res.code == 1){
                   this.$message({
                     type: 'success',
                     message: '删除成功!'
                   });
                 }else {
                   this.$message({
                     type: 'info',
                     message: '删除失败!'
                   });
                 }
                 this.queryYDJHData()
               }).catch(err =>{

               })
             }else{
            this.$message({type: 'warning', message: '请选择要删除的数据'})
          }

        }

      },
      handFirstTab(){
        this.showFirstItemWindow = false
      },
      //详情内  下月计划点击
      handOneRow(row, event, column){
        console.log(row)
        this.showFirstItemWindow = true
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
            this.detailItemInfo = this.detaillist.hmList
            // this.$api.getMDRByMwpsid({mwpsid:row.mwpsid}).then(res=>{
            //
            //   if(res.code == 1){
            //     if(res.data){
            //       this.detailItemInfo = res.data.hmcList
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
            this.detailItemInfo = this.detaillist.meeList
            // this.$api.getMDRByMwpsid({mwpsid:row.mwpsid}).then(res=>{
            //
            //   if(res.code == 1){
            //     this.detailItemInfo = res.data.meecList
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
            this.detailItemInfo = this.detaillist.smList
            console.log(this.detaillist.smList, 'isShowTime')
            // this.$api.getMDRByMwpsid({mwpsid:row.mwpsid}).then(res=>{
            //
            //   if(res.code == 1){
            //     if(res.data){
            //       if( res.data.smcList.length){
            //         this.detailItemInfo = res.data.smcList
            //       }else{
            //         this.detailItemInfo = []
            //       }
            //
            //     }else{
            //       this.detailItemInfo = []
            //     }
            //
            //   }else{
            //     this.detailItemInfo = []
            //   }
            // })
            break;
        }
        this.getEacheadOfdata(row.xmbh,this.year,this.month)
      },
      //详情内  本月总结点击
      handOneRowSecod(row, event, column){

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
             remarks:'备注',
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
              remarks:'备注',
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
              area:'面积',
              length:'长度',
              width:'宽度',
              execQuantities:'完成工程量',
              execMoney:'完成金额',
              sdate:'开始时间',
              edate:'结束时间',
              remarks:'备注',
            }
            this.$api.getMKDRByKtcsid({ktcsid:row.ktcsid}).then(res=>{

              if(res.code == 1){
                this.detailItemInfo = res.data.smcList
              }
            })
            break;
        }
        this.showFirstItemWindow = true


      },
      //操作通过打回等按钮
      promiseTG(bol){
        let {kdrid,listerModel,auditorModel,reviewerModel,mdrid,isShowCurrent} = this

        switch (bol){
          case 'tg'://通过
            if( isShowCurrent == 'true' ){ //月度总结
              this.$api.updateKDR({
                state:'2',
                kdrid:kdrid,
                reviewer: reviewerModel?reviewerModel:undefined,
                auditor:auditorModel?auditorModel:undefined,
                lister:listerModel?listerModel:undefined,
              }).then(res=>{
                if(res.code == 1){
                  this.$message('审核通过');
              }else{
                  this.$message(res.msg);
                }
              })

            }
            else if( isShowCurrent == 'false') {//下月计划
                this.$api.updateMDR({
                  state: '2',
                  mdrid: this.mdridparam,
                  reviewer: reviewerModel?reviewerModel:undefined,
                  auditor: auditorModel?auditorModel:undefined,
                  lister: listerModel?listerModel:undefined,
                }).then(res => {
                  if(res.code == 1){
                    this.$message('审核通过');
                  }else{
                    this.$message(res.msg);
                  }
                })
            }
            break;
          case 'dh'://打回
            if( this.isShowCurrent  == 'true'){ //月度总结
              this.$api.updateKDR({
                state:'3',
                kdrid:kdrid,
                reviewer: reviewerModel?reviewerModel:undefined,
                auditor:auditorModel?auditorModel:undefined,
                lister:listerModel?listerModel:undefined,
              }).then(res=>{
                if(res.code == 1){
                  this.$message('审核打回');
                }else{
                  this.$message(res.msg);
                }
              })
            }else if( this.isShowCurrent == 'false'){//下月计划

              this.$api.updateMDR({
                state: '3',
                mdrid: this.mdridparam,
                reviewer: reviewerModel?reviewerModel:undefined,
                auditor: auditorModel?auditorModel:undefined,
                lister: listerModel?listerModel:undefined,
              }).then(res => {
                if(res.code == 1){
                  this.$message('审核打回');
                }else{
                  this.$message(res.msg);
                }

              })
            }else{

            }
            break;
          case 'close'://关闭
            break;
        }
         // 详情查看
         // this.showDetail = false
         // this.showFirstItemWindow = false
        this.backxmtable()
      },
      // 编辑 详情  本月完成情况 下月计划
      updateFormDia (row,info) {
        this.year = info.year
        this.month = info.month
        this.mpaidofRow= info.mpaid
        this.currentPlanDetail = false
        this.showlastWindow = false
        this.currentName = info.mpname

        let mpaid = info.mpaid
        let self = this
        this.tableData2 = []
        switch (row){
          case'详情':
            this.firstItemTit = info.mpname
            this.showDetail = !this.showDetail
            this.showcurrentMonthPlan = false
            this.showlastMontPlan = false
            this.showPlan = true
            //本月关键任务完成情况
            this.$api.getKTCByMPAID({mpaid:mpaid}).then(res=>{

              if(res.code == 1){
                if(res.data){
                  this.currentMonthData = res.data.ktcs
                  this.tableName = res.data.tableName
                  this.mpaid = res.data.mpaid
                }else{
                  this.currentMonthData = []
                }

              }
            })
            //下月主要工作工作计划
            this.$api.getMWPByMPAID({mpaid:mpaid,gldwId: this.daZzid}).then(res=>{
              if(res.code == 1){
                if (!res.data) {
                  this.isshowupdatebtn = false
                } else {
                  this.isshowupdatebtn = true
                }
                if(res.data){
                  this.lastPlanData = res.data.mwps
                  this.tableName = res.data.tableName
                  this.mpaid = res.data.mpaid
                }else{

                  this.lastPlanData = []
                }

              }
            })
            break;
          case'本月完成情况':
            this.firstItemTit = '本月完成情况' + info.mpname
            this.showDetail = !this.showDetail
            this.showPlan = false
            this.isshowupdatebtn = false
            this.showcurrentMonthPlan = false
            this.showlastMontPlan = true
            this.$api.getKTCByMPAID({mpaid:mpaid}).then(res=>{
              //isNullData
              if(res.code == 1){
                if(res.data){
                  this.currentMonthData = res.data.ktcs?res.data.ktcs:[]
                  this.tableName = res.data.tableName
                  this.mpaid = res.data.mpaid
                  this.ktcid = res.data.ktcid
                }else{
                  this.currentMonthData = []
                }
              }
            })
            break;
          case'下月计划':
            this.firstItemTit = '下月计划' + info.mpname
            this.showDetail = !this.showDetail
            this.showPlan = false
            this.showlastMontPlan = false
            this.isshowupdatebtn = true
            this.showcurrentMonthPlan = true
            this.$api.getMWPByMPAID({mpaid:mpaid,gldwId: this.daZzid}).then(res=>{
              if(res.code == 1){
                if(res.data){
                  // debugger
                  if(res.data.mwps&&res.data.mwps.length){
                    this.isNullData = '12321'
                  }else{
                    this.isNullData = null
                  }
                  this.lastPlanData = res.data.mwps?res.data.mwps:[]
                  this.tableName = res.data.tableName
                  this.mpaid = res.data.mpaid
                  this.mwpid = res.data.mwpid
                  this.isenable = 1
                }else{
                  // this.lastPlanData = []
                  // debugger
                  this.isNullData = null
                  this.isenable = 0
                  this.planOfnextmonth()
                }

              }else{
                this.lastPlanData = []
              }
            })
            break;
          case '完成编制':
          //  哈哈
            self.$confirm('是否完成编制?', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              center: true
            }).then(() => {
              self.$api.updateMPA({
                mpaState:'2',
                mpaid: info.mpaid,
              }).then(res=>{
                if(res.code == 1){
                  self.$message({
                    type: 'success',
                    message: '完成编制成功!'
                  });
                  self.queryYDJHData()
                }else{
                  self.$message({
                    type: 'info',
                    message: '完成编制失败'
                  });
                }

              })

            }).catch(() => {
              self.$message({
                type: 'info',
                message: '取消完成编制'
              });
            });
            break;
        }
      },

      //分页展示数据
      handleCurrentChange (val) {
             this.searchForm.pageNum = val
        if(val){
          // this.queryYDJHData()
        }

      },
      //月度计划初始化查询
      searchYDJH(){
          this.queryYDJHData()
      },
      //初始化列表数据
      queryYDJHData(){
        let {selectDate,pageNum,pageSize,daZzid} = this.searchForm
        let YearDate,MonthDate;
        if(selectDate&&selectDate.length){
         let  selectDateArr = selectDate.split('-');
          YearDate = selectDateArr[0]
         if(selectDateArr[1][0] == 0){
           MonthDate = selectDateArr[1][1]
         }else{
           MonthDate = selectDateArr[1]
         }
        }
        let randoms = parseInt(100*Math.random())
        this.$api.getMPList({daZzid: daZzid,year: YearDate,month: MonthDate,pageNum,pageSize,randoms: randoms}).then(res=>{
          if(res.code == 1){
            this.YDJHData = res.data.rows
            console.log(this.YDJHData, '初始状态数据')
            // this.ishowAddandDelBtn = this.YDJHData[0].state
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
  .zybzTabs{
    .el-tabs__content {
      height: calc(100% - 60px);
    }
  }
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
    .maskWindow{
      width: 480px;
      min-height: 240px;
      max-height: 450px;
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
          border-left:1px solid;
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
    }
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
  }
  .rowEdput{
    width: 100%;
    height: 36px;
    border:0;
    outline:none;
  }
  .newAddcontent{
    position: absolute;
    top:40px;
    right: 14px;
    line-height: 51px;
    z-index: 999;
    width: 271px;
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
    top: -16px;
    z-index: 999;
    font-size:60px;
    color: #D5D6D7;
    cursor: pointer;
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
