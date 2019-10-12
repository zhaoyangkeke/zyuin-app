<template>
  <div id="liucheng">
    <div class="header">
      <span class="headerTit" v-if="showFirstPage">审批中心</span>
      <span class="headerTit" v-if="showSecondPage">
        <i  class="icon iconfont icon-arrow-left titleclasschild" @click="returnBack('two')"></i>
        返回
      </span>
      <span class="headerTit" v-if="showThirdPage">
        <i  class="icon iconfont icon-arrow-left titleclasschild" @click="returnBack('third')"></i>
        返回
      </span>
    </div>
    <!--查询弹框区域-->
    <div class="conter_table" v-if="showFirstPage">
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
      <el-table :data="initDatas" tooltip-effect="dark"
                style="width: 100%;overflow:auto;"
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
        <el-table-column align="left" prop="lcmc" label="流程名称" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" prop="spbm" label="审批部门" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" prop="tjsj" label="提交时间" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <span @click="showDetail(scope,'detail')" style="color:#00a2fd;cursor: pointer;text-align: center">详情</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="second_content" v-if="showSecondPage">
      <div class="third_content">
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
      <div class="second_center" style="width: 100%;overflow-x:hidden;">
        <div style="position:relative;">
          <p class="tabAreaTit" style="width: 100%;height: 46px;background-color: #F6F6F6;padding-left: 15px;line-height: 46px">
            <span >任务单详情</span>
          </p>
        </div>
        <div style="padding-left: 31px;">

          <p class="addJLD">
            <span class="inputlabel">项目编号:</span><span>G78</span></p>
          <p class="addJLD">
            <span class="inputlabel">项目名称:</span><span>贵黄铁路</span>
          </p>
          <p class="addJLD">
            <span class="inputlabel">路线名称:</span><span>甬台温线路</span></p>
          <p class="addJLD">
            <span class="inputlabel">养护单位:</span><span>工程技术部</span></p>
          <p class="addJLD">
            <span class="inputlabel">管理单位:</span><span>甬台温高速一</span></p>
          <p class="addJLD">
            <span class="inputlabel">月度:</span>2019-06</p>
          <p class="addJLD">
            <span class="inputlabel">日期:</span><span>2019-03-20</span></p>
        </div>
        <div class="eiconsty" style="padding-left: 16px;">
          <span class="iconfont icon-zhifuguanli" style="font-size: 12px;padding-right: 10px;"></span><span>事件信息</span>
        </div>
        <div style="padding-left: 31px;">
          <p class="addJLD">
            <span class="inputlabel">巡查单位:</span><span>暂无</span></p>
          <p class="addJLD">
            <span class="inputlabel">巡查方向:</span><span>上行</span> </p>
          <p class="addJLD">
            <span class="inputlabel">车道:</span><span>暂无数据</span></p>
          <p class="addJLD">
            <span class="inputlabel">单位工程:</span><span>暂无数据</span></p>
          <p class="addJLD">
            <span class="inputlabel">损坏类型:</span><span>路基</span></p>
          <p class="addJLD">
            <span class="inputlabel">病害类型:</span><span>暂无数据</span> </p>
          <p class="addJLD">
            <span class="inputlabel">病害数量:</span><span>2</span></p>
          <p class="addJLD"><span class="inputlabel">病害单位:</span><span>0120</span></p>
          <p class="addJLD">
            <span class="inputlabel">工程量类型:</span><span>string</span></p>
          <p class="addJLD">
            <span class="inputlabel">起点桩号:</span><span>120.02</span></p>
          <p class="addJLD">
            <span class="inputlabel">止点桩号:</span><span>150.6</span></p>
          <p class="addJLD" style="display: block;width: 80%;">
            <span class="inputlabel">病害说明:</span><span>0120</span></p>
        </div>
        <div style="width:100%;margin-left: 0;margin-right: 0px;padding-left: 0px; padding-right: 0px;height:4px;background-color: #c0cad6;"></div>
        <!--维修记录-->
        <div class="eiconsty"  style="padding-left: 16px;">
          <span class="iconfont icon-sanjiaoxing" style="font-size: 13px;padding-left: 10px;" @click="isShowwxcontent = true" v-if="isShowwxcontent === false"></span>
          <span class="iconfont icon-sanjiao01" style="font-size: 13px;padding-left: 10px;" @click="isShowwxcontent = false" v-if="isShowwxcontent === true"></span>
          <span>维修记录</span>
        </div>
        <!--维修记录子表内容-->
        <div class="wxtabArea" style="padding-left: 15px;" v-show="isShowwxcontent">
          <el-tabs v-model="activeName" >
            <el-tab-pane :label="item.wcsj"  v-for="(item, index) in tabList" :name="'first'+index" :key="index"></el-tab-pane>
          </el-tabs>
          <div style="padding-left: 15px;">
            <div v-for="(item, index) in wxorderobj" :key="index" style="font-size:0;margin-bottom: 15px;border-bottom: 1px solid #f1f4f7;">
              <p class="addJLD">病害类型: <span>{{item.lx}}</span></p>
              <p class="addJLD">数&nbsp;&nbsp;&nbsp;&nbsp;量: <span>{{item.sl}} {{item.dw}}</span></p>
              <p class="addJLD">子目编号: <span>{{item.zmbh}}</span></p>
              <p class="addJLD">子目名称: <span>{{item.zmmc}}</span></p>
              <p class="addJLD">月度计划工程内容: <span>{{item.gcnr}}</span></p>
              <p class="addJLD">备&nbsp;&nbsp;注: <span>{{item.bz}}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="third_content"  v-if="showThirdPage">
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
  export default {
    components: {},
    data () {
      return {
        isEdit:false,
        tableData:[
          {fsr:'王凯衍',fsrq:'2019-03-30 03：20：57',spr:'甬台温测试01',sprq:'2019-03-30 03：21：40',ls:'0天0时0分0秒',cyzlx:'自定义规则'},
          {fsr:'王凯衍',fsrq:'2019-03-30 03：20：57',spr:'甬台温测试01',sprq:'2019-03-30 03：21：40',ls:'0天0时0分0秒',cyzlx:'自定义规则'},
          {fsr:'王凯衍',fsrq:'2019-03-30 03：20：57',spr:'甬台温测试01',sprq:'2019-03-30 03：21：40',ls:'0天0时0分0秒',cyzlx:'自定义规则'},
          {fsr:'王凯衍',fsrq:'2019-03-30 03：20：57',spr:'甬台温测试01',sprq:'2019-03-30 03：21：40',ls:'0天0时0分0秒',cyzlx:'自定义规则'},
          {fsr:'王凯衍',fsrq:'2019-03-30 03：20：57',spr:'甬台温测试01',sprq:'2019-03-30 03：21：40',ls:'0天0时0分0秒',cyzlx:'自定义规则'},

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
          {lcmc:'《主要工作计划编制待审核》',spbm:'外协单位',tjsj:'2019-5-29',zt:'待审核',},
          {lcmc:'《主要工作计划编制待审核》',spbm:'外协单位',tjsj:'2019-5-29',zt:'待审核',},
          {lcmc:'《主要工作计划编制待审核》',spbm:'外协单位',tjsj:'2019-5-29',zt:'待审核',},
        ],
        options: [
          {
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
      }
    },

    methods: {
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
        if(type === 'detail'){
          this.showFirstPage = false
          this.showSecondPage = true
          this.showThirdPage = false
        }
      },
      searchXM(){

      },
      resizeDate(){

      },
    },
    mounted () {


    }
  }
</script>
<style lang="scss" scoped>
  #liucheng{
    width: 100%;
    height: 100%;
    overflow-y: auto;
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
            margin-right: 10px;
            .icon-duigou, .icon-user{
              color: #2b47bd;
              font-size: 20px;
              margin-right: 5px;
            }
            .line{
              display: inline-block;
              vertical-align: middle;
              width:51px;
              height: 2px;
              background-color: #2b47bd;
            }
            .dateg{
              color:#999;
              .yj{
                color:#2b47bd;
                border-bottom: 1px solid;
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
            resize: none;
            padding-left: 5px;
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

