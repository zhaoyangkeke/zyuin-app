/**
* ----计量汇总表
*/
<template>
  <div id="kgsqd" style="height: 100%;position:relative;" >
    <div class="header" v-show="!showDetail&&!showAdd">
      <span class="headerTit">计量汇总表</span>
      <div class="header_option">
        <ul>
          <!--<li><i class="el-icon-search"> 查询</i></li>-->
          <!--<li><i class="icon iconfont icon-export"> 导出</i></li>-->
          <li @click="addContent(true)"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="addContent(false)"><i class="el-icon-delete"> 删除</i></li>
        </ul>

      </div>
    </div>
    <!--查询弹框区域-->
    <div class="conter_table" v-show="!showDetail&&!showAdd">
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
              <!--<el-input size="mini" v-model="searchForm.sjdh"></el-input>-->
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
          label="序号"
          align="center"
          width="50">
        </el-table-column>

        <el-table-column align="left" sortable v-for="(tit,titIndex) in tableTits" :prop="titIndex" :label="tit" :key="titIndex"  show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable  prop="rq" label="填报日期" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable  prop="zt" label="状态" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span v-if="row.zt == 1">已制表</span>
            <span v-if="row.zt == 1.1">已计量</span>
            <span v-if="row.zt == 2">已审核</span>
            <span v-if="row.zt == 4">已支付</span>
          </template>
        </el-table-column>
        <el-table-column align="left"  class-name="column-caoz" label="操作" width="290">
          <template scope="scope">
            <span    style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="updateFormDia('detail',scope.row)">详情</span>
            <span   v-if="scope.row.zt ==1" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="updateFormDia('edit',scope.row)">编辑</span>
            <span   v-if="scope.row.zt == 1" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="updateFormDia('sp',scope.row)">提交</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页区域-->
    <footer class="footer" v-show="!showDetail&&!showAdd">
      <div style="float: right;padding: 6px">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </footer>
    <!--添加新增的弹窗-->
    <div class="tabArea" v-if="showDetail">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild"  @click="promiseTG('close')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>计量单汇总表</span>
        </p>
        <!--<div class="SPState">-->
          <!--<el-button size="mini" @click="handOneRowSecod(true)"><i class="icon iconfont icon-save"></i>导出</el-button>-->
        <!--</div>-->
      </div>
      <!--详情-->
      <el-tabs   v-model="activeName2">
        <el-tab-pane
            v-for="(tabItem,keyIndex) in tabDatas"
            :label="tabItem.zjmc"
            :key="tabItem.id"
            :name="''+keyIndex">
          <el-table  :data="tabItem.mxList" tooltip-effect="dark"
                     style="width: calc(100% - 26px);margin: auto;"
                     row-class-name="row_class"
                     border>
            <el-table-column
              align="center"
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column align="left" v-for="(finTit,finIndex) in FinsdetailTit" :prop="finIndex" :label="finTit"   show-overflow-tooltip> </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="汇总表" :name="''+tabDatas.length">
          <el-table  :data="huizongData" tooltip-effect="dark"
                     style="width: calc(100% - 26px);margin: auto;"
                     row-class-name="row_class"
                     border>
            <el-table-column
              type="selection"
              align="center"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50">
            </el-table-column>
            <el-table-column align="left" v-for="(finTit,finIndex) in FinsdetailTit" :prop="finIndex" :label="finTit"   show-overflow-tooltip> </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--新增添加窗口-->
    <div class="tabArea" v-show="showAdd">
      <div style="position:relative;" v-show="!showFirstItemWindow">
        <p class="tabAreaTit">
          <span class="titleclasschild"  @click="promiseTG('close')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>计量汇总表</span>
        </p>
        <div class="SPState">
          <el-button  size="mini" @click="saveAdd(true)"  style="margin: auto;display: block; background-color: #DF4D4A;border-color: transparent;color: #fff"  class="dialog-button bao_cun">保存</el-button>
        </div>
      </div>

      <div style="font-size: 0" v-show="!showFirstItemWindow">
        <p class="addJLD"><span class="addJLD_tit">支付期号 ：</span><el-input v-model="jldModel.zfqh" size="mini" placeholder="请输入内容"></el-input></p>
        <p class="addJLD">
          <span class="addJLD_tit">项目名称 ：</span>
          <el-select size="mini"  v-model="jldModel.htmc" value-key="xmbh"  placeholder="请选择"  @change="selectHt">
          <el-option
          v-for="(item,index) in xmbhList"
          :key="index"
          :label="item.XMMC"
          :value="item">
          </el-option>
        </el-select>
        </p>
        <p class="addJLD"><span class="addJLD_tit">项目编号 ：</span><el-input size="mini" v-model="jldModel.htbh" :disabled="true" placeholder="请输入内容"></el-input></p>
        <p class="addJLD"><span class="addJLD_tit">承包单位 ：</span><el-input size="mini" v-model="jldModel.cbdw" :disabled="true"  placeholder="请输入内容"></el-input></p>
        <p class="addJLD"><span class="addJLD_tit">业主单位 ：</span><el-input size="mini" v-model="jldModel.yzdw"  placeholder="请输入内容"></el-input></p>
        <p class="addJLD"><span class="addJLD_tit">填报日期 ：</span>
          <el-date-picker
            v-model="jldModel.rq"
            type="date"
            size="mini"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
     </p>
        <p class="addJLD" v-if="showTgdw"><span class="addJLD_tit">是否为托管单位 ：</span>
          <el-select v-model="jldModel.sfwtgld" size="mini" placeholder="请选择">
            <el-option
              label="是"
              value="是">
            </el-option>
            <el-option
              label="否"
              value="否">
            </el-option>
          </el-select>
          <!--<el-input size="mini" v-model="jldModel.sfwtgdw"  placeholder="请输入内容"></el-input>-->
        </p>

        <div style="width: calc(100% + 17px);margin-left: -17px;margin-right: 0px;padding-left: 0px; padding-right: 0px;height:4px;background-color: #c0cad6;"></div>
        <div class="header" style="width: calc(100% + 16px);margin-left: -16px;height: 36px;line-height: 36px;padding-top: 0px;">
          <span class="headerTit" style="text-align: left;">计量汇总明细</span>
          <div style="float: right;margin-top: 3px">
            <el-button size="mini" @click="addMX(true)"><i class="icon iconfont icon-add"></i>添加工程计量单</el-button>
            <el-button size="mini" @click="addMX(false)"><i class="icon iconfont icon-add"></i>添加计日工(台班)</el-button>
          </div>
        </div>
        <el-table v-if="!isEdit"  :data="selectData" tooltip-effect="dark"
                   style="width: calc(100% - 26px);margin: auto;"
                   height="calc(100% - 170px)"
                   row-class-name="row_class"
                   border>
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column align="left"   prop="zmh" label="子目编号"   show-overflow-tooltip> </el-table-column>
          <el-table-column align="left"   prop="zmmc" label="子目名称"   show-overflow-tooltip> </el-table-column>
          <el-table-column align="left"   prop="dw" label="单位"   show-overflow-tooltip> </el-table-column>
          <el-table-column align="left"   prop="wcsl" label="数量"   show-overflow-tooltip> </el-table-column>
        </el-table>
        <el-tabs v-if="isEdit" style="width: 100%"  class="tabWrap" v-model="activeName">
          <el-tab-pane
            v-for="(tabItem,keyIndex) in tabDatas"
            :label="tabItem.zjmc"
            :key="tabItem.id"
            :name="''+keyIndex">
            <el-table  :data="tabItem.mxList" tooltip-effect="dark"
                       style="width: calc(100% - 26px);margin: auto;"
                       row-class-name="row_class"
                       border>
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column
                type="selection"
                align="center"
                width="55">
              </el-table-column>
              <el-table-column align="left" v-for="(finTit,finIndex) in FinsdetailTit" :prop="finIndex" :label="finTit"   show-overflow-tooltip> </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane :label="'汇总表'" :name="''+tabDatas.length">

            <el-table  :data="huizongData" tooltip-effect="dark"
                       style="width: calc(100% - 26px);margin: auto;"
                       height="calc(100% - 170px)"
                       row-class-name="row_class"
                       border>
              <el-table-column
                type="selection"
                align="center"
                width="55">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column align="left" v-for="(finTit,finIndex) in FinsdetailTit" :prop="finIndex" :label="finTit"   show-overflow-tooltip> </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="windowAramFirst" v-if="showFirstItemWindow" >
        <div style="position:relative;">
          <p class="tabAreaTit">
            <span class="titleclasschild"  @click="BackSave"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
            <span>添加任务单</span>
          </p>
          <div class="SPState">
            <el-button size="mini"  style="margin:auto;display: block;background-color: #DF4D4A;border-color: transparent;color: #fff"  class="dialog-button bao_cun" @click="saveAdd(false)">
              <i class="icon iconfont icon-past"></i>保存
            </el-button>
          </div>
        </div>
        <el-table v-if="showFirstItemWindow" ref="multipleTable2"  :data="detailItemInfo" tooltip-effect="dark"
                  style="width: calc(100% - 23px);max-height: 250px;overflow-y: auto;margin-top: 35px;"
                  row-class-name="row_class"
                  @selection-change="handleSelectionChange"
                  border>
          <el-table-column
            align="center"
            type="selection"
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
        selectJRGArr:[],
        selectRwdArr:[],
        LJRGData:[],
        LRwdData:[],
        zbidsList:[],
        selectData:[],
        dialogVisible:false,
        dialogData: [],
        dialogTableTit:{
          XMMC:'项目名称',XMBH:'项目编号',
        },
        datatypes:'',
        restaurants:[],
        //me
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
        jldModel:{
          zfqh:'',
          htmc:'',
          htbh:'',
          cbdw:'',
          rq:'',
          yzdw:'浙江温州甬台温高速公路有限公司',
          sfwtgld:'否',

        },
        activeName:"0",
        activeName2:"1",
        searchInputVal:'',
        options: [],
        tableTits:{htmc:'项目名称',cbdw:'承包单位',yzdw:'业主单位',zfqh:'支付期号',qcZh:'期次'},
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
          xmmc:undefined,
          xmbh:undefined,
          sjdh:undefined,
          lxmc:undefined,
          selectDate:null,
          pageNum:1,
          pageSize:10
        },
        YDJHData:[ ],
        detailItemInfo:[],//本月完成情况详情数据
        showDetail:false,
        showAdd:false,
        huizongData:[],
        qcid:'',

        showTgdw:false,
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
      BackSave(){
        this.showFirstItemWindow = false
        // ;saveAdd(false)
      },
      getYear () {
        let now = new Date()
        let year = now.getFullYear() //年
        let month = now.getMonth() + 1 //月
        let day = now.getDate() //日
        let clock = year + "-"
        if(month < 10)
          clock += "0"
        clock += month + "-"
        if(day < 10)
          clock += "0"
        clock += day + " "

        this.jldModel.rq = clock
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
      initUser(){
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))

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
      selectHt(row){

        this.jldModel.htmc = row.XMMC
        this.jldModel.htbh = row.XMBH

        this.jldModel.cbdw = row.SJDW
        this.jldModel.cbdwid = row.CBDWID
        this.jldModel.cbdwbh = row.CBDWBH
        this.jldModel.sfwtgld = row.SFWTGLD
        this.showTgdw = row.SFWTGLD === '是'?true:false
      },
      selectZB(row){
        this.zbSelect = row
      },
      uuid(){
        let str = (((1+Math.random())*0x10000)|0).toString(16).substring(1)
        return (str+str+"-"+str+"-"+str+"-"+str+"-"+str+str+str);
      },
      saveAdd(bol){
        let {orgbh,orgid,orgmc,bmbh,bmid,bmmc,yhbm,yhid,yhmc} = this.userInfo
        if(bol){
          let {cbdw,htbh,htmc,zt,zfqh,yzdw,cbdwbh,cbdwid,rq,sfwtgld} = this.jldModel
          let {} = this.jldModel
          let str = ''
          let jrgStr = ''
          this.selectRwd.forEach(item=>{
            str+=item.id+','
          })
          this.selectJRG.forEach(item=>{
            jrgStr+=item.id+','
          })
          if(!str.trim()&&!jrgStr.trim()){
            this.$message({
              message: '请添加工程计量单或计日工(台班)',
              type: 'info'
            });
          }else{
            if(this.isEdit){
              this.$api.updateRcyhGcjlhzb({
                cbdwbh,cbdwid,sfwtgld:sfwtgld,
                daBmbm: bmbh,
                daBmid: bmid,
                daBmmc: bmmc,
                daYhbm:yhbm,
                daYhid: yhid,
                daYhmc:yhmc,
                daZzbh: orgbh,
                daZzid: orgid,
                daZzmc: orgmc,
                cbdw,htbh,htmc,zt:zt,zfqh:zfqh,rq,
                yzdw:yzdw,jrgIds:jrgStr.substring(0, jrgStr.length - 1),
                gcjldIds:str.substring(0, str.length - 1),
                id:this.uuid(),
                qcid:this.qcid}).then(res=>{
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
            }else{
              this.$api.batchInsertRcyhGcjlhzb_Free({
                cbdw,htbh,htmc,zt:zt,zfqh:zfqh,sfwtgld:sfwtgld,
                cbdwbh,cbdwid,
                daBmbm: bmbh,
                daBmid: bmid,
                daBmmc: bmmc,
                daYhbm:yhbm,
                daYhid: yhid,
                daYhmc:yhmc,
                daZzbh: orgbh,
                daZzid: orgid,
                daZzmc: orgmc,rq,
                yzdw:yzdw,jrgIds:jrgStr.substring(0, jrgStr.length - 1),gcjldIds:str.substring(0, str.length - 1),id:this.uuid(),
              }).then(res=>{
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

          }
        }
         else{
          let self = this
          this.selectJRG = this.LJRGData
          this.selectRwd = this.LRwdData
          this.selectJRG.forEach(item=>{
            if(JSON.stringify(self.selectData).indexOf(JSON.stringify(...item.mxList)) == -1){
              self.selectData.push(...item.mxList)
              self.zbidsList.push(item.id)
            }
          })
          this.selectRwd.forEach(item=>{
            if(JSON.stringify(self.selectData).indexOf(JSON.stringify(...item.mxList)) == -1){
              self.selectData.push(...item.mxList)
              self.zbidsList.push(item.id)
            }
          })
          this.showFirstItemWindow = false
        }
      },
      handleSelectionChange(row){
        if(this.isJRG){
          this.LJRGData = row
        }else{
          this.LRwdData = row
        }
      },
      addMX(bol){
        let htbh = this.jldModel.htbh
        let sfwtgld = this.jldModel.sfwtgld
        this.detailItemInfo = []
        this.selectData =[]
        let {orgid} = this.userInfo
        // this.zbidsList =[]
        if(htbh){
          this.showFirstItemWindow = true
          let self = this
          if(bol){//工程计量单
            this.isJRG = false
            this.zmtit = [
              {props:'dwmc',name:'承包单位'},
              {props:'htbh',name:'合同编号'},
              {props:'htmc',name:'合同名称'},
              {props:'zjdbh',name:'质检单编号'},
            ]
            this.zmExpandtit = [
              {props:'zmh',name:'子目号'},
              {props:'zmmc',name:'子目名称'},
              {props:'dw',name:'单位'},
              {props:'wcsl',name:'完成数量'},
            ]
            if(this.isEdit){
              this.$api.getRcyhGcjlListToGcjlhz({htbh,daZzid:orgid,gchzId:this.qcid,sfwtgld:sfwtgld}).then(res=>{
                if(res.code == 1){
                  this.detailItemInfo = res.data.length?res.data:[]
                }else{
                  this.detailItemInfo = []

                }
              })
            }else{
              this.$api.getRcyhGcjlListToGcjlhz({htbh,daZzid:orgid,sfwtgld:sfwtgld}).then(res=>{
                if(res.code == 1){
                  this.detailItemInfo = res.data.length?res.data:[]
                  self.zbidsList.forEach(ele=>{
                    self.detailItemInfo.forEach(item => {
                      if(ele === item.id){
                        self.$nextTick(()=> {
                          self.$refs.multipleTable2.toggleRowSelection(item, true);
                        })
                      }
                    });
                  })
                }else{
                  this.detailItemInfo = []
                }
              })
            }

          }
          else{//计日工台班
            this.isJRG = true
            this.zmtit = [
              {props:'xmbh',name:'工程编号'},
              {props:'xmmc',name:'工程名称'},
              {props:'cbdwmc',name:'承包单位'},
              {props:'sgdwmc',name:'施工单位'},
            ]
            this.zmExpandtit = [
              {props:'zmh',name:'子目号'},
              {props:'zmmc',name:'子目名称'},
              {props:'jldw',name:'单位'},
              {props:'sl',name:'数量'},
            ]
            let  sfwtgld = this.showTgdw?'是':'否'
            if(this.isEdit){
              this.$api.getRcyhJrgtbToGcjlhz({htbh,daZzid:orgid,gchzId:this.qcid,sfwtgld}).then(res=>{
                if(res.code == 1){
                  this.detailItemInfo = res.data.length?res.data:[]
                  self.zbidsList.forEach(ele=>{
                    self.detailItemInfo.forEach(item => {
                      if(ele === item.id){
                        self.$nextTick(()=> {
                          self.$refs.multipleTable2.toggleRowSelection(item, true);
                        })
                      }
                    });
                  })
                }else{
                  this.detailItemInfo = []
                }
              })
            }else{
              this.$api.getRcyhJrgtbToGcjlhz({htbh,daZzid:orgid,sfwtgld}).then(res=>{
                if(res.code == 1){
                  this.detailItemInfo = res.data.length?res.data:[]
                  self.zbidsList.forEach(ele=>{
                    self.detailItemInfo.forEach(item => {
                      if(ele === item.id){
                        self.$nextTick(()=> {
                          self.$refs.multipleTable2.toggleRowSelection(item, true);
                        })
                      }
                    });
                  })
                }else{
                  this.detailItemInfo = []
                }
              })
            }
          }
        }else{
          this.$message({
            message: '请先选择项目名称',
            type: 'warning'
          });
        }
      },
      selectable2:function(row, index){   //禁用第四个
        if(row.zt == 1){
          return true
        }else{
          return false
        }
      },
      resizeSearch(){
        this.searchForm.sjdh = undefined
        this.searchForm.xmmc = undefined
        this.searchForm.xmbh = undefined

        this.searchForm.lxmc = undefined
        this.searchForm.selectDate = undefined
        this.searchForm.pageNum = 1
      },
      addContent(bol){
        if(bol){//添加
          this.jldModel = {
             zfqh:'',
              htmc:'',
              htbh:'',
              cbdw:'',
              rq:'',
              yzdw:'浙江温州甬台温高速公路有限公司',
          }
          this.getYear()
     /*     this.jldModel = []*/
          this.showDetail = false
          this.showAdd = true
          this.isEdit = false
          this.$api.getmcbhList2().then(res=>{
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
              if(this.zbSelect[0].qcid){
                this.$api.deleteRcyhGcjlhzb({id: this.zbSelect[0].qcid}).then(res=>{
                  if(res.code == 1){
                    this.queryYDJHData()
                    this.$message({
                      message: '删除成功',
                      type: 'success'
                    });
                  }else{
                    this.$message.error('删除失败');
                  }
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
        this.activeName = "0"
        this.activeName2 = "0"
        this.showDetail = false
        this.showFirstItemWindow = false
        this.showAdd = false
      },
      // 编辑 详情  本月完成情况 下月计划
      updateFormDia (row,info) {
        let {yhmc,yhid,bmmc,orgmc} = config.userInfo
        switch (row){
          case 'detail':
            this.showDetail = !this.showDetail
            this.isEdit = false
            this.huizongData = []
            this.$api.getRcyhGcjlhzbByXmbhANDQc({qc:info.qc,htbh:info.htbh}).then(res=>{

              if(res.code == 1){
                this.tabDatas = res.data.length?res.data:[]
                let datas = res.data
                datas.forEach(item=>{
                  if(item.mxList.length){
                    item.mxList.forEach(mxItem =>{
                      this.huizongData.push(mxItem)
                    })
                  }else{
                    this.huizongData = []
                  }

                  //
                })
              }else{
                this.tabDatas = []
              }
            })
            break;
          case 'edit':
            this.showDetail = false
            this.showAdd = true
            this.isEdit = true
            this.qcid = info.qcid
            this.jldModel =  JSON.parse(JSON.stringify(info))

            this.$api.getRcyhGcjlhzbByXmbhANDQc({qc:info.qc,htbh:info.htbh}).then(res=>{

              if(res.code == 1){
                this.tabDatas = res.data.length?res.data:[]
                this.jldModel.sfwtgld = res.data[0].sfwtgld
                this.showTgdw = res.data[0].sfwtgld === '是'?true:false
                let datas = res.data
                datas.forEach(item=>{
                  if(item.mxList.length){
                    item.mxList.forEach(mxItem =>{
                      this.huizongData.push(mxItem)
                    })
                  }else{
                    this.huizongData = []
                  }

                  //
                })
              }else{
                this.tabDatas = []
              }
            })
            this.$api.getmcbhList2().then(res=>{
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
              this.$api.createWorkFlow({
                pc_initiator:yhmc,
                pc_initiatorid: yhid,
                pc_name: '08',
                pc_project_id: info.qcid,
                pc_remarks: '',
                pc_state: '',
              },{
                group:bmmc,
                org:orgmc}).then(resp=>{
                  if(resp.code == 1){
                    this.$api.updateRcyhGcjlhzbZtByGcjlhzId({id:info.qcid,zt:'1.1'}).then(res=>{
                      if(res.code == 1){
                        this.queryYDJHData()
                        this.$message({
                          type: 'success',
                          message: '提交成功!'
                        });
                      }else{
                        this.$message({
                          type: 'info',
                          message:res.msg
                        });
                      }
                    })
                  }else{
                    this.$message({
                      type: 'info',
                      message: resp.msg
                    });
                  }
              })


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
      queryYDJHData(val){
        let {XMMC,ZT,selectDate,pageNum,pageSize,xmbh,zfqh} = this.searchForm
        let YearDate,MonthDate;
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

        this.$api.getRcyhGcjlhzbToDataGridList({pageNum,pageSize,daZzid:orgid,
          startDate:selectDate,xmbh: xmbh == undefined ? xmbhOfinit.XMBH : xmbh,zfqh}).then(res=>{
          if(res.code == 1){
            this.YDJHData = res.data.rows
            this.total = res.data.totle
          }else{
          }
        })
      },
    },
    mounted () {
      this.initUser()
      this.initqueryXMMC()

    }
  }
</script>

<style lang="scss" >
  .tabWrap{
    .el-tabs__nav-wrap{
       width: 100%;
    }
  }
  .textArea{
    width: calc(100% - 93px);
    outline: none;
    border:1px solid #DCDFE6;
    vertical-align: top;
    padding-left: 5px;
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
