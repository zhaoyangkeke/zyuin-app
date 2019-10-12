/**
* ----计量支付汇总表
*/
<template>
  <div id="kgsqd" style="height: 100%" >
    <div class="header">
      <div class="header_option">
        <ul>
          <!--<li><i class="el-icon-search"> 查询</i></li>-->
          <li><i class="icon iconfont icon-export"> 导出</i></li>
          <!--<li @click="addContent(true)"><i class="el-icon-edit-outline"> 添加</i></li>-->
          <li @click="addContent(false)"><i class="el-icon-delete"> 删除</i></li>
        </ul>

      </div>
    </div>
    <!--查询弹框区域-->
    <div class="conter_table">
      <!--查询信息-->
      <div class="cha_xun">
        <el-form  :inline="true"  style="display: inline-block;" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">

            <el-form-item class="" label="项目名称" prop="htbh">
              <el-input v-model="searchForm.sjdh"></el-input>
            </el-form-item>
            <el-form-item class="" label="支付期号" prop="htbh">
              <el-select v-model="searchForm.lxmc" placeholder="输入路线名称">
                <el-option
                  v-for="item in stateList"
                  :key="item.val"
                  :label="item.name"
                  :value="item.val">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="" label="日期" prop="htbh">

              <el-date-picker
                v-model="searchForm.selectDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-form-item>

          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button @click="searchYDJH" size="small" type="text" style="width: 64px;height: 35px;background-color: #DF4D4A;border-radius: 4px;color: #fff">查询</el-button>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button @click.native="resizeSearch" size="small">重置</el-button>
          </el-form-item>

        </el-form>
      </div>
      <p style="font-size: 12px;height: 18px"></p>
      <el-table  :data="YDJHData" tooltip-effect="dark"
                 style="width: calc(100% - 19px);"
                 row-class-name="row_class"
                 border>
        <el-table-column
          type="index"
          label=" "
          width="25">
        </el-table-column>
        <el-table-column
          type="selection"
          :selectable='selectable2'
          width="55">
        </el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="290">
          <template scope="scope">

            <span   v-if="scope.row.state !=1" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="updateFormDia('详情',scope.row)">详情</span>

          </template>
        </el-table-column>
        <el-table-column align="center" v-for="(tit,titIndex) in tableTits" :prop="titIndex" :label="tit" :key="titIndex"  show-overflow-tooltip> </el-table-column>
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
      <div class="detailItem_tit">{{firstItemTit}}</div>
      <div class="closeBTN" @click="promiseTG('close')"><i class="icon iconfont icon-down"></i></div>
      <el-table  :data="currentMonthData" tooltip-effect="dark"
                 style="width: calc(100% - 26px);margin: auto;"
                 row-class-name="row_class"
                 border>
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column align="center" v-for="(finTit,finIndex) in FinsdetailTit" :prop="finIndex" :label="finTit"   show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        //me
        searchInputVal:'',
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
        tableTits:{xmmc:'项目名称',cbdw:'承包单位',yzdw:'业主单位',zfqh:'支付期号',},
        FinsdetailTit:{zmh:'子目号',zmmc:'子目名称',dw:'单位',dj:'单价(元)',sl:'数量',je:'金额(元)'},
        stateList:[
          {name:'全部',val:undefined},
          {name:'编制中',val:'1'},
          {name:'工程技术部审核',val:'2'},
          {name:'经营发展部审核',val:'3'},
          {name:'公司分管领导审核',val:'4'},
          {name:'公司领导审批',val:'5'},
          {name:'审批完成',val:'6'},
        ],
        currentMonthData:[],
        total:0,
        state:['','编制中','工程技术部审核','经营发展部审核','公司分管领导审核','公司领导审批','审批完成'],
        showFirstItemWindow:false,
        firstItemTit:'G15沈海高速公路温州段2017-2019年小修保养工程第二标段',

        searchForm:{
          sjdh:undefined,
          lxmc:undefined,
          selectDate:null,
          pageNum:1,
          pageSize:10
        },
        YDJHData:[
          {
            xmmc:'G15沈海高速公路温州段2017-2019年小修保养工程第二标段',cbdw:'浙江交工高等级公路养护有限公司',yzdw:'浙江温州甬台温高速公路有限公司',zfqh:'XXBY16-02-38',
          },
          {
            xmmc:'G15沈海高速公路温州段2017-2019年小修保养工程第二标段',cbdw:'浙江交工高等级公路养护有限公司',yzdw:'浙江温州甬台温高速公路有限公司',zfqh:'XXBY16-02-38',
          },
          {
            xmmc:'G15沈海高速公路温州段2017-2019年小修保养工程第二标段',cbdw:'浙江交工高等级公路养护有限公司',yzdw:'浙江温州甬台温高速公路有限公司',zfqh:'XXBY16-02-38',
          },
          {
            xmmc:'G15沈海高速公路温州段2017-2019年小修保养工程第二标段',cbdw:'浙江交工高等级公路养护有限公司',yzdw:'浙江温州甬台温高速公路有限公司',zfqh:'XXBY16-02-38',
          },
        ],
        detailItemInfo:[],//本月完成情况详情数据
        showDetail:false,
      }
    },
    methods: {
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
        this.searchForm.lxmc = undefined
        this.searchForm.selectDate = undefined
        this.searchForm.pageNum = 1
      },
      addContent(bol){
      },
      //详情内 点击
      handOneRowSecod(row, event, column){
        this.detailItemInfo = [
          {zmnr:'--',zmmc:'二波波形护栏板',zmh:'602-1-1',dw:'m',sl:'880',bz:'602-1-1',state:''},
          {zmnr:'--',zmmc:'二波波形护栏板',zmh:'602-1-1',dw:'根',sl:'880',bz:'602-1-1',state:''},
          {zmnr:'--',zmmc:'二波波形护栏板',zmh:'602-1-1',dw:'根',sl:'880',bz:'602-1-1',state:''},
          {zmnr:'--',zmmc:'二波波形护栏板',zmh:'602-1-1',dw:'m',sl:'880',bz:'602-1-1',state:''},
        ]
        this.showFirstItemWindow = true
      },
      //操作通过打回等按钮
      promiseTG(bol){
        // 详情查看
        this.showDetail = false
        this.showFirstItemWindow = false
      },
      // 编辑 详情  本月完成情况 下月计划
      updateFormDia (row,info) {
        this.showDetail = !this.showDetail

        this.currentMonthData = [
          {zmh:'400章',zmmc:'桥梁、涵洞'},
          {zmh:'402-3-1',zmmc:'钢管更换',dw:'m',dj:'65',sl:'168',je:'10,920'},
          {zmh:'402-3-1',zmmc:'钢管更换',dw:'m',dj:'65',sl:'168',je:'10,920'},
          {zmmc:'总计',je:'28,170'},
          {zmh:'600章',zmmc:'交通安全设施'},
          {zmh:'602-3-1',zmmc:'钢管更换',dw:'m',dj:'65',sl:'168',je:'10,920'},
          {zmh:'602-3-1',zmmc:'钢管更换',dw:'m',dj:'65',sl:'168',je:'10,920'},
          {zmmc:'总计',je:'28,170'},
        ]
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
        let {XMMC,ZT,selectDate,pageNum,pageSize} = this.searchForm
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

        this.$api.getMPList({year:YearDate,month:MonthDate,pageNum,pageSize}).then(res=>{
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

<style lang="scss">
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
    overflow: auto;

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
