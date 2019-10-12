<template>
  <div id="liucheng">
    <div class="header">
      <span class="headerTit" v-show="showFirstPage">审批中心</span>
      <span class="headerTit" v-show="showSecondPage">
        <i  class="icon iconfont icon-arrow-left titleclasschild" @click="returnBack('two')"></i>
        返回
      </span>
      <span class="headerTit" v-show="showThirdPage">
        <i  class="icon iconfont icon-arrow-left titleclasschild" @click="returnBack('third')"></i>
        返回
      </span>
    </div>
    <!--查询弹框区域-->
    <div class="conter_table" v-show="false"> <!--showFirstPage-->
      <el-form :inline="true"  >
        <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
          <el-form-item class="" label="提交时间" prop="htbh">
            <el-date-picker
              v-model="selectForm.tjsj"
              size="mini"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;" label="业务模块" prop="" class="">
          <el-select v-model="selectForm.ywmk"  size="mini" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
          <el-button size="mini" @click="searchXM" style="background-color: #DF4D4A;border-color:transparent;color: #fff">查询</el-button>
          <el-button size="mini" @click="resizeDate">重置</el-button>
        </el-form-item>
      </el-form>
      <div  class="searchLeft" >
        <div >
          <em>当前状态:</em>
          <span class="currentState">全部</span>
          <span class="currentState" id="selectColor2">未审批</span>
          <span class="currentState">已审批</span>
        </div>
        <div class="htTypeList">
          <em>提交时间:</em>
          <span class="currentState">全部</span>
          <span class="currentState">最近三天</span>
          <span class="currentState">最近一周</span>
          <span class="currentState">最近一月</span>
         </div>
      </div>
      <!--</div>-->
      <p style="font-size: 12px;height: 18px"></p>
      <!--<el-table :data="initDatas" tooltip-effect="dark"-->
                <!--style="width: 100%;overflow:auto;"-->
                <!--row-class-name="row_class"-->
                <!--border>-->
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--align="center"-->
          <!--width="55">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--type="index"-->
          <!--align="center"-->
          <!--label="序号"-->
          <!--width="50">-->
        <!--</el-table-column>-->
        <!--<el-table-column align="left" prop="lcmc" label="流程名称" show-overflow-tooltip> </el-table-column>-->
        <!--<el-table-column align="left" prop="spbm" label="审批部门" show-overflow-tooltip> </el-table-column>-->
        <!--<el-table-column align="left" prop="tjsj" label="提交时间" show-overflow-tooltip> </el-table-column>-->
        <!--<el-table-column align="left" prop="zt" label="状态" show-overflow-tooltip> </el-table-column>-->
        <!--<el-table-column align="left" label="操作" show-overflow-tooltip>-->
          <!--<template slot-scope="scope">-->
            <!--<span @click="showDetail(scope.row,'sp')" style="color:#00a2fd;cursor: pointer;text-align: center">审批</span>-->
            <!--<span @click="showDetail(scope,'detail')" style="color:#00a2fd;cursor: pointer;text-align: center">详情</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    </div>
    <div class="second_content" v-show="true" style="height: calc(100% - 100px)"> <!--showSecondPage-->
        <div v-show="isShowTop" class="second_top" style="padding-bottom: 20px"> <!--isEdit-->
          <div class="liuchengLeft">
            <div class="Itmes" v-for="(nodeV,index) in nodeData" :key="index">
              <p v-show="nodeV.pcProcessState == 2">
                <span class="iconDuiGou aa" @click="showXQDetail">
                  <i class="icon iconfont icon-duigou1"></i>
                </span>
                <i v-show="index!=nodeData.length-1" class="line"></i>
              </p>
              <p v-show="index!=nodeData.length&&nodeV.pcProcessState == 1">
                <span class="iconSp">
                  <i class="icon iconfont icon-yuan"></i>
                </span>
                <span><i class="spLine"  v-show="index!=nodeData.length-1"></i></span>
              </p>
              <p v-show="nodeV.pcProcessState != 1&&nodeV.pcProcessState != 2">
                <span class="notLive"></span>
                <span><i class="spLine"  v-show="index!=nodeData.length-1"></i></span>
              </p>
              <p class="dateg"><span :title="nodeV.userName" style="display:block;width: 98%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{nodeV.userName}}</span></p>
              <p v-show="nodeV.pcProcessState == 1" style="color: #f27a19;font-size: 12px">审批中</p>
              <p class="dateg" v-show="nodeV.pcProcessState == 2"><span>{{nodeV.pcApprovalTime}}</span></p>
              <p class="dateg" v-show="nodeV.pcProcessState == 2"><span>意见：</span> <span class="yj" :title="nodeV.pcOpinion">{{nodeV.pcOpinion}}</span></p>
            </div>
           <!-- <div class="Itmes">
              <p>
                <span class="iconDuiGou" >
                  <i class="icon iconfont icon-duigou1"></i>
                </span>
                <span><i class="line"></i></span>
              </p>
              <p class="dateg"><span>甬台温测试02</span></p>
              <p class="dateg"><span>2019-03-10</span></p>
              <p class="dateg"><span>意见：</span><span class="yj">通过通过通过通过通过通过</span></p>
            </div>
            <div class="Itmes">
              <p>
                <span class="iconSp">
                  <i class="icon iconfont icon-yuan"></i>
                </span>
                <span><i class="spLine"></i></span>
              </p>
              <p class="dateg">
                <span>甬台温测试02</span>
              </p>
              <p style="color: #f27a19;font-size: 12px">审批中</p>
            </div>
            <div class="Itmes">
              <p>
                <span class="notLive"></span>
                <span><i class="spLine" ></i></span>
              </p>
              <p class="dateg">
                <span>甬台温测试02</span>
              </p>
            </div>-->
          </div>
          <div class="liuchengRight" v-show="showAlertWindow" >
            <textarea class="site" maxlength="200" v-model="desc" placeholder="最多输入200个字" ></textarea>
            <span class="xianzhi">{{remnant}}/200</span>
            <p>
              <el-button size="mini"  style="background-color: #DF4D4A;border-color:transparent;color: #fff" @click="Approval(true)">批准</el-button>
              <el-button size="mini" @click="Approval(false)">驳回</el-button>

           <!--   <el-select size="mini" v-model="selectValue" clearable    placeholder="驳回至">
                <el-option label="总领导" value="1">
                </el-option>
                <el-option label="分公司领导" value="2">
                </el-option>
                <el-option label="工程部" value="3">
                </el-option>
              </el-select>
              <el-button v-show="selectValue&&selectValue !== '驳回至'" size="mini">驳回</el-button>-->
              <!--<el-button size="mini" @click="showThirdDetail">详情</el-button>-->

            </p>
          </div>
        </div>


       <div style="height:calc(100% - 130px);overflow-y: auto;">
            <div v-show="false" class="third_content"> <!--!isEdit-->
              <div class="third_tit">
                <span>流程状态：审核进行中</span>
              </div>
              <div class="third_top" style="padding-left: 15px;">
                <el-button size="mini">开始</el-button>
                <i style="font-size: 12px;" class="icon iconfont icon-changjiantou"></i>
                <el-button type="primary" size="mini">王凯衍< 制单 ></el-button>
                <i style="font-size: 12px;" class="icon iconfont icon-changjiantou"></i>
                <el-button type="primary" size="mini">制出部门< 审核 ></el-button>
                <i style="font-size: 12px;" class="icon iconfont icon-changjiantou"></i>
                <el-button type="primary" size="mini">资产管理部门</el-button>
                <i style="font-size: 12px;" class="icon iconfont icon-changjiantou"></i>
                <el-button type="danger" size="mini">接收部门< 审核 ></el-button>
                <i style="font-size: 12px;" class="icon iconfont icon-changjiantou"></i>
                <el-button size="mini">开始</el-button>
              </div>
              <el-table
                :data="tableData"
                style="width:calc(100% - 30px);margin-top: 20px;margin-left: 10px">

                <el-table-column
                  prop="fsr"
                  label="发送人"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="fsrq"
                  label="发送日期">
                </el-table-column>
                <el-table-column
                  prop="spr"
                  label="审批人">
                </el-table-column>
                <el-table-column
                  prop="sprq"
                  label="审批日期">
                </el-table-column>
                <el-table-column
                  prop="ls"
                  label="历时">
                </el-table-column>
                <el-table-column
                  prop="cyzlx"
                  label="参与者类型">
                </el-table-column>
              </el-table>
            </div>
             <div style="width:100%;height:4px;background-color: #c0cad6;"></div>
             <div >
              <div style="position:relative;background-color: #F6F6F6;line-height: 36px">
                <p class="tabAreaTit" style="display: inline-block; height: 36px;padding-left: 15px;">
                  <span>审批详情</span>
                </p>
                <div style="float: right;padding-right: 10px" v-show="!isShowTop">
                  <el-button size="mini"  style="background-color: #DF4D4A;border-color:transparent;color: #fff" @click="Agree(true)">接收</el-button>
                  <el-button size="mini" @click="Agree(false)">拒绝</el-button>
                </div>
              </div>
              <el-table :data="historyData" class="aaa" style="width: 100%;padding: 20px;">
                <el-table-column
                  class="aaaa"
                  type="index"
                  align="center"
                  label="序号"
                  width="50">
                </el-table-column>
                <el-table-column align="center"  style="background: #afc;" v-for="(tit,titIndex) in dialogTableTit" :prop="titIndex" :label="tit" :key="titIndex"> </el-table-column>
              </el-table>
            </div>
            <div style="width:100%;height:4px;background-color: #c0cad6;"></div>
            <eventsTempOflc :parentData = "childDatas" v-show="isshowchild"></eventsTempOflc>
            <tableTemOflc :parentData = "childDatas" v-show="isshowchild2"></tableTemOflc>
           </div>
    </div>
    <div class="third_content"  v-show="showThirdPage">
       <div class="third_tit">
         <span>流程状态：审核进行中</span>
       </div>
       <div class="third_top" style="padding-left: 15px;">
         <el-button size="mini">开始</el-button>
          <i style="font-size: 12px;" class="icon iconfont icon-changjiantou"></i>
         <el-button type="primary" size="mini">王凯衍< 制单 ></el-button>
         <i style="font-size: 12px;" class="icon iconfont icon-changjiantou"></i>
         <el-button type="primary" size="mini">制出部门< 审核 ></el-button>
         <i style="font-size: 12px;" class="icon iconfont icon-changjiantou"></i>
         <el-button type="primary" size="mini">资产管理部门</el-button>
         <i style="font-size: 12px;" class="icon iconfont icon-changjiantou"></i>
         <el-button type="danger" size="mini">接收部门< 审核 ></el-button>
         <i style="font-size: 12px;" class="icon iconfont icon-changjiantou"></i>
         <el-button size="mini">开始</el-button>
       </div>
      <el-table
        :data="tableData"
        style="width:calc(100% - 30px);margin-top: 20px;margin-left: 10px">

        <el-table-column
          prop="fsr"
          label="发送人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="fsrq"
          label="发送日期">
        </el-table-column>
        <el-table-column
          prop="spr"
          label="审批人">
        </el-table-column>
        <el-table-column
          prop="sprq"
          label="审批日期">
        </el-table-column>
        <el-table-column
          prop="ls"
          label="历时">
        </el-table-column>
        <el-table-column
          prop="cyzlx"
          label="参与者类型">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import eventsTempOflc from '@/components/eventsTempOflc.vue'
  import tableTemOflc from '@/components/tableTemOflc.vue'
  export default {
    components: {eventsTempOflc, tableTemOflc},
    data () {
      return {
       urlpath: '',
       showAlertWindow:false,
        // ids:'84ad84ad-84ad-84ad-84ad-84ad84ad84ad',
        // ids: 'a35ea35e-a35e-a35e-a35e-a35ea35ea35e',
        ids: 'eec80c45a8fb43bf8d2bcc93fbecd750',
        historyData:[],
        dialogVisible:false,
        isshowchild: false,
        isshowchild2: false,
        tan: [],
        bigTitle: '',
        subTitle: '',
        firstObj: {},
        secondObj: {},
        dialogTableTit:{pcInitiator:'发送人',pcInitiationTime:'发送日期',pcTarget:'审批人',pcOpinion:'审批意见',pcApprovalTime:'审批日期',pcDuration:'历时',cyzlx:'参与者类型'},
        listArr: [],
        zbTitle: '',
        childDatas: {},
        isEdit:false,
        tableData:[
          {fsr:'王凯衍',fsrq:'2019-03-30 03：20：57',spr:'甬台温测试01',spyj:'很好',sprq:'2019-03-30 03：21：40',ls:'0天0时0分0秒',cyzlx:'自定义规则'},
          {fsr:'王凯衍',fsrq:'2019-03-30 03：20：57',spr:'甬台温测试01',spyj:'很好',sprq:'2019-03-30 03：21：40',ls:'0天0时0分0秒',cyzlx:'自定义规则'},
          {fsr:'王凯衍',fsrq:'2019-03-30 03：20：57',spr:'甬台温测试01',spyj:'很好',sprq:'2019-03-30 03：21：40',ls:'0天0时0分0秒',cyzlx:'自定义规则'},
          {fsr:'王凯衍',fsrq:'2019-03-30 03：20：57',spr:'甬台温测试01',spyj:'很好',sprq:'2019-03-30 03：21：40',ls:'0天0时0分0秒',cyzlx:'自定义规则'},
          {fsr:'王凯衍',fsrq:'2019-03-30 03：20：57',spr:'甬台温测试01',spyj:'很好',sprq:'2019-03-30 03：21：40',ls:'0天0时0分0秒',cyzlx:'自定义规则'},

        ],
        activeName: 'first0',
        tabList:[
          {
            id: "8a7f34eb-9b54-4d40-b134-71027ed625DD",
            rwmxId: "69520351-fcf9-4aa3-9d87-65ff10f707DD",
            xmbh: "string",
            xmmc: "string",
            wcsj: "2019-04-23",
            gydw: "string",
            gldw: "string",
            lxbm: "road1",
            lxmc: "两条路",
            gydwId: "string",
            wcrwdZbList: [],
            daYhid: null,
            daYhbm: null,
            daYhmc: null,
            daBmid: null,
            daBmbm: null,
            daBmmc: null,
            daZzid: null,
            daZzbh: null,
            daZzmc: null
          },
          {
            id: "8a7f34eb-9b54-4d40-b134-71027ed625DD",
            rwmxId: "69520351-fcf9-4aa3-9d87-65ff10f707DD",
            xmbh: "string",
            xmmc: "string",
            wcsj: "2019-04-23",
            gydw: "string",
            gldw: "string",
            lxbm: "road1",
            lxmc: "两条路",
            gydwId: "string",
            wcrwdZbList: [],
            daYhid: null,
            daYhbm: null,
            daYhmc: null,
            daBmid: null,
            daBmbm: null,
            daBmmc: null,
            daZzid: null,
            daZzbh: null,
            daZzmc: null
          },
          {
            id: "8a7f34eb-9b54-4d40-b134-71027ed625DD",
            rwmxId: "69520351-fcf9-4aa3-9d87-65ff10f707DD",
            xmbh: "string",
            xmmc: "string",
            wcsj: "2019-04-23",
            gydw: "string",
            gldw: "string",
            lxbm: "road1",
            lxmc: "两条路",
            gydwId: "string",
            wcrwdZbList: [],
            daYhid: null,
            daYhbm: null,
            daYhmc: null,
            daBmid: null,
            daBmbm: null,
            daBmmc: null,
            daZzid: null,
            daZzbh: null,
            daZzmc: null
          },

        ],
        wxorderobj:[
          {
            id: "f29fd540-cda3-4a41-8947-d7b0f72d33MM",
            wcrwdId: "4d8f5fe2-adeb-4538-93ed-a1efbf41e6DD",
            xmbh: "string",
            xmmc: "string",
            gcnrId: "string",
            gcnr: "string",
            lx: "0104",
            dw: "string",
            sl: "2",
            bz: "string",
            zmid: "id45",
            zmbh: "202-7",
            zmmc: "增设盲沟",
            bhname: "块状裂缝（轻）"
          },
          {
            id: "f29fd540-cda3-4a41-8947-d7b0f72d33MM",
            wcrwdId: "4d8f5fe2-adeb-4538-93ed-a1efbf41e6DD",
            xmbh: "string",
            xmmc: "string",
            gcnrId: "string",
            gcnr: "string",
            lx: "0104",
            dw: "string",
            sl: "2",
            bz: "string",
            zmid: "id45",
            zmbh: "202-7",
            zmmc: "增设盲沟",
            bhname: "块状裂缝（轻）"
          },
          {
            id: "f29fd540-cda3-4a41-8947-d7b0f72d33MM",
            wcrwdId: "4d8f5fe2-adeb-4538-93ed-a1efbf41e6DD",
            xmbh: "string",
            xmmc: "string",
            gcnrId: "string",
            gcnr: "string",
            lx: "0104",
            dw: "string",
            sl: "2",
            bz: "string",
            zmid: "id45",
            zmbh: "202-7",
            zmmc: "增设盲沟",
            bhname: "块状裂缝（轻）"
          },
        ],
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
        isShowwxcontent:false,
        selectValue:'驳回至',
        desc:'',
        remnant:1,
        showFirstPage:true,
        showSecondPage:false,
        showThirdPage:false,
        selectForm:{
          tjsj:'',
          ywmk:'',
        },
        initDatas:[
          {lcmc:'《主要工作计划编制待审核》',spbm:'外协单位',tjsj:'2019-5-29',zt:'待审核',id: '4f9ef153ed374b7f9fff17e61ee09436'},
          {lcmc:'《主要工作计划编制待审核》',spbm:'外协单位',tjsj:'2019-5-29',zt:'待审核', id: '5bca5bca-5bca-5bca-5bca-5bca5bca5bca'},
          {lcmc:'《主要工作计划编制待审核》',spbm:'外协单位',tjsj:'2019-5-29',zt:'待审核',id: 'a35ea35e-a35e-a35e-a35e-a35ea35ea35e'},
          {lcmc:'《主要工作计划编制待审核》',spbm:'外协单位',tjsj:'2019-5-29',zt:'待审核',id: 'a35ea35e-a35e-a35e-a35e-a35ea35ea65e'},
        ],
        options: [],
        nodeData:[],
        isShowTop :true,
        billid:'d23dd23d-d23d-d23d-d23d-d23dd23dd23d',
        receive:'1001A21000000000JV2U',

      }
    },

    methods: {
      Agree(bol){
        if(bol){//接收
            this.$api.tySP(this.nodeData[this.nodeData.length-1].endUrl,this.ids).then(resp=>{
               if(resp.code == 1){
                 this.$api.processPass({
                   pcAoid: "",
                   pcApprovalState: "1",
                   pcApprovalTime: "",
                   pcDuration: "",
                   pcOpinion:this.desc,
                   pcPcproid: "",
                   pcTarget:config.userInfo.userName,
                   pcTargetId: config.userInfo.userId,
                 },{
                   pcProjectId:this.ids,
                   group:config.userInfo.bmmc,
                   org:config.userInfo.orgmc,
                 }).then(res=>{
                   if(res.code == 1){
                     this.$message({
                       message:res.msg,
                       type: 'success'
                     })
                   }else{
                     this.$message({
                       message:res.msg,
                       type: 'info'
                     })
                   }

                 })
               }else{
                 this.$message({
                   message:resp.msg,
                   type: 'info'
                 })
               }
            })

        }
        else{//拒绝
          this.$api.tySP(this.nodeData[this.nodeData.length-1]. backUrl,this.ids).then(res=>{

          })
          this.$api.processPass(
            {
              pcAoid: "",
              pcApprovalState: "2",
              pcApprovalTime: "",
              pcDuration: "",
              pcOpinion:this.desc,
              pcPcproid: "",
              pcTarget:config.userInfo.userName,
              pcTargetId: config.userInfo.userId,
            },{pcProjectId:this.ids,
              group:config.userInfo.bmmc,
              org:config.userInfo.orgmc,}).then(res=>{
            this.$message({
              message:res.msg,
              type: 'success'
            })
          })
        }
      },
      Approval(bol){
        if(this.desc){
          if(bol){//批准
            if(this.nodeData[this.nodeData.length-1].pcProcessState == 1){
              if(this.nodeData[this.nodeData.length-1].endUrl){
                this.$api.tySP(this.nodeData[this.nodeData.length-1].endUrl,this.ids).then(resp=>{
                  if(resp.code == 1){

                    this.$api.processPass({
                      pcAoid: "",
                      pcApprovalState: "1",
                      pcApprovalTime: "",
                      pcDuration: "",
                      pcOpinion:this.desc,
                      pcPcproid: "",
                      pcTarget:config.userInfo.userName,
                      pcTargetId: config.userInfo.userId,
                    },{
                      pcProjectId:this.ids,
                      group:config.userInfo.bmmc,
                      org:config.userInfo.orgmc,
                    }).then(res=>{
                      if(res.code == 1){
                        this.initDataList(localStorage.getItem('urlPath'))
                        this.$message({
                          message:res.msg,
                          type: 'success'
                        })
                      }else{
                        this.$message({
                          message:res.msg,
                          type: 'info'
                        })
                      }
                    })
                  }
                })
              }

            }
            else{
              this.$api.processPass({
                pcAoid: "",
                pcApprovalState: "1",
                pcApprovalTime: "",
                pcDuration: "",
                pcOpinion:this.desc,
                pcPcproid: "",
                pcTarget:config.userInfo.userName,
                pcTargetId: config.userInfo.userId,
              },{
                pcProjectId:this.ids,
                group:config.userInfo.bmmc,
                org:config.userInfo.orgmc,
              }).then(res=>{
                if(res.code == 1){

                  this.initDataList(localStorage.getItem('urlPath'))
                  this.$message({
                    message:res.msg,
                    type: 'success'
                  })
                }else{
                  this.$message({
                    message:res.msg,
                    type: 'info'
                  })
                }
              })
            }

          }
          else{
            if(this.nodeData[0].pcProcessState == 1){
              if(this.nodeData[0].backUrl){

                this.$api.tySP(this.nodeData[0].backUrl,this.ids).then(res=>{
                  if(res.code == 1){

                    this.initDataList(localStorage.getItem('urlPath'))
                    this.$message({
                      message: res.msg,
                      type: 'success'
                    })
                  }else{
                    this.$message({
                      message: res.msg,
                      type: 'info'
                    });
                  }

                })
              }

            }else{

              this.$api.processPass(
                {
                  pcAoid: "",
                  pcApprovalState: "2",
                  pcApprovalTime: "",
                  pcDuration: "",
                  pcOpinion:this.desc,
                  pcPcproid: "",
                  pcTarget:config.userInfo.userName,
                  pcTargetId: config.userInfo.userId,
                },{pcProjectId:this.ids,
                  group:config.userInfo.bmmc,
                  org:config.userInfo.orgmc,}).then(res=>{
                if(res.code == 1){

                  this.initDataList(localStorage.getItem('urlPath'))
                  this.$message({
                    message:res.msg,
                    type: 'success'
                  })
                }else{
                  this.$message({
                    message: res.msg,
                    type: 'info'
                  });
                }

              })
            }

          }
        }else{
          this.$message({
            type: 'info',
            message: '请填写意见!'
          });
        }


      },
      initDataList(urlpath){

         var paramid = ''
         if(urlpath){
           if (urlpath.indexOf('?') == -1) {
             console.log(urlpath,'==有urlpath===1')
             paramid = ''
           }
           else {
             console.log(urlpath,'==有urlpath==2')
             var reg2 = new RegExp('(^|&)' + 'billid' + '=([^&]*)(&|$)', 'i');
             var idsparam = urlpath.split('?')[1]

             var billidparam = idsparam.substr(1).match(reg2)
             paramid = unescape(billidparam[2])
             this.ids = paramid
           }
         }else{
           console.log(urlpath,'==无urlpath')
           paramid = this.billid
         }
        this.$api.getProcessInfoAll({pcProjectId:paramid}).then(res=>{

          if(res.code == 1){
           let datas = res.data
            this.nodeData = datas


            datas.forEach(item=>{
              if(item.userId == config.userInfo.yhid){
                if(item.pcProcessState == "1"){
                  this.showAlertWindow = true
                }else{

                  this.showAlertWindow = false
                }
                // showAlertWindow
              }
            })
         /*  if(res.data&&res.data[0].messageType == ' 4402'){
             this.isShowTop = false//不显示上面部分
           }else{
             this.isShowTop = true//显示上面部分
           }*/

          }
        })
       },
      initHistoryData(urlpath){
        var paramid = ''
        if (urlpath.indexOf('?')== -1) {

          paramid = ''
        } else {
          var reg2 = new RegExp('(^|&)' + 'billid' + '=([^&]*)(&|$)', 'i');
          var idsparam = urlpath.split('?')[1]

          var billidparam = idsparam.substr(1).match(reg2)

          paramid = unescape(billidparam[2])
          this.ids = paramid

        }
        this.$api.getHistoryList({pcProjectId:paramid}).then(res=>{
           if(res.code == 1){
             this.historyData = res.data
           }else{
             this.historyData = []
           }
         })
      },
      showXQDetail(){

        this.dialogVisible = true
      },
      // 审批详情的ajax
      getDetailbyajax: function (param,idparam) {

        var _this = this
        $.ajax({
          type: 'get',
          url: 'http://61.141.223.10:8001/DisplayDetails/'+param+'/getData',
          data: {
            PK: idparam
          },
          success: function (data) {
            _this.senddatatochild(data)
          },
          error: function () {

          }
        })
      },
      senddatatochild (res) {
        let  _this = this

        _this.tab = []
        _this.tabList = []
        if (res) {
          if (res.mainData !== null) {
            _this.bigTitle = res.mainData[0].text
            _this.firstObj = res.mainData[0].data
            if (res.mainData.length > 1) {
              _this.subTitle = res.mainData[1].text
              _this.secondObj = res.mainData[1].data
            } else {
              _this.subTitle = ''
              _this.secondObj = {}
            }
          } else {
            _this.bigTitle = res.title
          }
          if(res.subtableData != null) {
            if (res.subtableData.constructor === Object) {
              for (var item in res.subtableData) {
                _this.zbTitle = item
                for (var i = 0; i < res.subtableData[item].length; i++) {
                  _this.tab.push(res.subtableData[item][i].text)
                  _this.tabList.push(res.subtableData[item][i].data)
                }
              }
            } else {
              _this.zbTitle = ''
              for (var i = 0; i < res.subtableData.length; i++) {
                _this.tab.push(res.subtableData[i].text)
                _this.tabList.push(res.subtableData[i].data)
              }
            }
          }
          _this.listArr = _this.tabList[0]
          // debugger

          let parampobj = {
            bigTitle: '',
            subTitle: '',
            firstObj: {},
            secondObj: {},
            zbTitle: '',
            tab: [],
            tabList: [],
            listArr: [],
            subtableData: res.subtableData,
            mainData: res.mainData
          }
          parampobj.bigTitle = _this.bigTitle
          parampobj.subTitle = _this.subTitle
          parampobj.firstObj = _this.firstObj
          parampobj.secondObj = _this.secondObj
          parampobj.zbTitle = _this.zbTitle
          parampobj.tab = _this.tab
          parampobj.tabList = _this.tabList
          parampobj.listArr = _this.tabList[0]
          _this.childDatas = parampobj

          if ( res.type == 'Complex Data Structures' || res.type == 'Main Structure') {

            _this.isshowchild2 = false
            _this.isshowchild = true

          } else if (res.type != 'Complex Data Structures' && res.type != 'Main Structure') {

            _this.isshowchild = false
            _this.isshowchild2 = true
          }
        }
      },
      geturl (urlpath) {

        // let urlpath = 'http://61.141.223.10:9080/yygl/index.html#/liucheng-spzx?appcode=YH110101A&status=add&pagecode=YH110101A01_page&billid=kgsqd1564998602418&billno=ZxyhKgsqd&receive=1001A21000000000JV34&scene=todo&c=YH110101A&p=YH110101A01_page'
        if (urlpath.indexOf('?') == -1) {
          // debugger
        } else {
          this.queryString(urlpath,'billno','billid')
        }

      },
      queryString (url,billno,billid) {
        var reg = new RegExp('(^|&)' + billno + '=([^&]*)(&|$)', 'i');
        var reg2 = new RegExp('(^|&)' + billid + '=([^&]*)(&|$)', 'i');
        let idparams = url.split('?')[1]
        var billnoparam = idparams.substr(1).match(reg)
        var billidparam = idparams.substr(1).match(reg2)
        if(billnoparam!=null && billidparam!=null) {
          var paramno = unescape(billnoparam[2])
          var paramid = unescape(billidparam[2])
          this.ids = paramid
          this.getDetailbyajax(paramno, paramid)
        } else {
          return null;
        }
      },
      testqueryString (name, name1) {
        // debugger
        var testparam = 'http://61.141.223.10:9080/yygl/index.html#/liucheng-spzx?appcode=YH110101A&billno=SjqdRwd&status=add&pagecode=YH110101A01_page&billid=a35ea35e-a35e-a35e-a35e-a35ea35ea35e&receive=1001A21000000000JV34&scene=todo&c=YH110101A&p=YH110101A01_page'
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)", 'i');
        var reg1 = new RegExp("(^|&)"+ name1 +"=([^&]*)(&|$)", 'i');

        var r = testparam.split('?')[1].substr(1).match(reg);//search,查询？后面的参数，并匹配正则
        var s = testparam.split('?')[1].substr(1).match(reg1);

        // if(r!=null)return  unescape(r[2]); return null;

      },
      showThirdDetail(){
        this.showFirstPage = false
        this.showSecondPage = false
        this.showThirdPage = true
      },
      returnBack(arg){
        if(arg == 'two'){
          this.showFirstPage = true
          this.showSecondPage = false
          this.showThirdPage = false
        }else{
          this.showFirstPage = false
          this.showSecondPage = true
          this.showThirdPage = false
        }

      },
      showDetail(row,type){
        // this.getinitData(row,1)
         if(type === 'detail'){
           this.showFirstPage = false
           this.showSecondPage = true
           this.showThirdPage = false
           this.isEdit = false
         }else{
           this.showFirstPage = false
           this.showSecondPage = true
           this.showThirdPage = false
           this.isEdit = true
         }
      },
      searchXM(){

      },
      resizeDate(){

      },
    },
    mounted () {

      let pathurl = localStorage.getItem('urlPath')
      let {billid,receive} = this
      if(pathurl){
        this.geturl(pathurl)
        console.log(pathurl,'==pathurl==1')
      }else{
        pathurl = `http://61.141.223.10:9080/yygl/index.html#/liucheng-spzx?appcode=YH110101A&status=add&pagecode=YH110101A01_page&billid=${billid}&billno=ZxyhKgsqd&receive=${receive}&scene=todo&c=YH110101A&p=YH110101A01_page`
        this.geturl(pathurl)
        console.log(pathurl,'==pathurl==2')
      }
      this.initDataList(pathurl)
      this.initHistoryData(pathurl)
    },
    created () {

      this.urlpath = window.location.href

      if (this.urlpath.indexOf('?') !== -1) {

        localStorage.setItem('urlPath',this.urlpath)
      } else {

        localStorage.setItem('urlPath',[])
      }
    }
  }
</script>
<style lang="scss">
  #liucheng{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .closeBtn{
      position: absolute;
      top: -5px;
      right: 10px;
      font-size: 26px;
      font-weight: bold;
      cursor: pointer;
    }
    .headerTit{
      i{
        font-weight: bold;
        font-size: 16px;
        color: #111;
        cursor: pointer;
      }
    }
    .second_content{
      .second_top{
        padding: 5px 15px;
        display: flex;
        justify-content: space-between;
        .liuchengLeft{
          display: flex;
          align-items: center;
          .Itmes{
            height: 88px;
            p{
              width: 116px;
              font-size: 0;
              span{
                font-size: 12px;
              }
              .iconSp{
                display: inline-block;
                width: 28px;
                height: 28px;
                vertical-align: middle;
                text-align: center;
                line-height: 28px;
                background: #fff;
                border-radius:50%;
                box-shadow: 0px 3px 9px 0px
                rgba(75, 80, 86, 0.15);
                color: #4c84ff;
                i{
                  color: #4c84ff;
                }
              }
              .notLive{
                display: inline-block;
                vertical-align: middle;
                width: 28px;
                height: 28px;
                background-color: #ffffff;
                border: solid 2px #dfe2e9;
                border-radius: 50%;
              }
              .line{
                display: inline-block;
                width: calc(100% - 28px);
                height: 2px;
                background: #4c84ff;
              }
            }
            .iconDuiGou{
              display: inline-block;
              vertical-align: middle;
              width: 28px;
              height: 28px;
              text-align: center;
              line-height: 28px;
              background-color: #4c84ff;
              border-radius:50%;
              color: #fff;
              i{
                color: #fff;
                font-size: 20px;
              }
            }
            .icon-duigou, .icon-user{
              color: #2b47bd;
              font-size: 20px;
              margin-right: 5px;
            }
            .spLine{
              display: inline-block;
              vertical-align: middle;
              width:calc(100% - 28px);
              height: 2px;
              background-color: #dfe2e9;
            }
            .dateg{
              color:#999;
              height: 20px;
              .yj{
                display: inline-block;
                vertical-align: top;
                color: #4b5056;
                width: 80px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                /*color:#2b47bd;*/
                /*border-bottom: 1px solid;*/
                cursor: pointer;
              }
            }
          }
        }
        .liuchengRight{
          position: relative;
          width: 35%;
          margin-right: 20px;
          .xianzhi{
            position: absolute;
            top: 22px;
            right: 15px;
          }
          textarea{
            width: 100%;
            height: 60px;
            resize: none;
            padding-left: 5px;
            border: solid 1px #dfe2e9;
            border-radius: 4px;
          }
        }
      }
      .second_center{
        .eiconsty{
          padding-right: 10px;
          height: 16px;
          margin-top: 20px;
          margin-bottom: 20px;
          line-height: 16px;
          font-size: 12px;
        }
      }

    }
    .third_content{
      padding: 0 15px;
      .third_tit{
        display: flex;
        justify-content: space-between;
        padding:10px 15px;
        .hoverSt,.hoverSt i{
          font-size: 12px;
          color: #fff;
        }
        .hoverSt:hover,.hoverSt i:hover{
          color:red;
        }
      }
    }
    .conter_table{

      .searchLeft{
        display: flex;
        vertical-align: middle;
        /*margin-top: 10px;*/
        height: 40px;
        line-height: 40px;
        font-size: 13px;
        background: #f7f9fb;
        #selectColor,#selectColor2{
          color:red;
        }
        .currentState{
          display: inline-block;
          cursor: pointer;
          padding-right: 10px;
          color: #555;
          height: 19px;
          line-height: 19px;
          margin-right: 10px;
          border-right: 2px solid #999;
        }
        .currentState:last-child{
          border-right: 0 !important;
        }
        .htTypeList{
          padding-left: 100px;
        }
      }
    }
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

