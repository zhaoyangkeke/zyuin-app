/**
* ----启动巡查
*/
<template>
  <div id="rcyhcxjd" style="height: 100%" v-loading="loading">
    <el-amap vid="amapDemo" ref="map" :center="center" :map-manager="amapManager" :zoom="zoom" :events="events"
             style="">
    </el-amap>
    <div style="position: absolute;bottom: 0;width: 100%;background: #fff;height: 280px">
      <div class="header">
        <!--<div class="header_option">-->
        <!--<span class="headerTit">巡查监督</span>-->
        <!--<div class="jianlimb" @click="showAdd()"><i class="el-icon-download"> 计划申报</i></div>-->
        <!--<ul>-->
        <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
        <div class="cha_xun" style="">
          <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
            <el-form-item style="margin-bottom: 0;" label="项目名称" prop="" class="">
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

            <el-form-item style="margin-bottom: 0px" label="时间" prop="" class="">
              <el-date-picker
                v-model="searchForm.xcsj"
                size="mini"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>

            </el-form-item>
            <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <el-button size="mini" @click="queryData" style="background-color: #DF4D4A;border-color:transparent;color: #fff">查询</el-button>
              <el-button @click.native="resizeSearch" size="mini">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--</ul>-->
        <!--</div>-->
      </div>
      <div class="conter_table">

        <p style="font-size: 12px;height: 18px"></p>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                  style="width: 100%;"
                  row-class-name="row_class"
                  border
                  @row-click="rowClick"
                  highlight-current-row
                  :height="showSearch?'calc(100% - 59px)':'calc(100% - 18px)'"
                  :row-style="{fontFamily: '宋体', fontSize: '12px'}"
                  @current-change="handleChange"> <!--@selection-change="handleSelectionChange"-->
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column align="left" sortable prop="xmmc" label="项目名称"  show-overflow-tooltip></el-table-column>
          <el-table-column align="left" sortable prop="xclx" label="巡查路线"  show-overflow-tooltip></el-table-column>
          <el-table-column align="left" sortable prop="qdzh" label="起点桩号" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" sortable prop="zdzh" label="止点桩号" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" sortable prop="xcfx" label="巡查方向" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" sortable prop="kssj" label="开始时间" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" sortable prop="jssj" label="结束时间" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" sortable prop="xcry" label="巡查人员" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" sortable prop="cphm" label="巡查车辆" show-overflow-tooltip></el-table-column>
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
      <el-dialog class="data-dialog el-updata-div" title="添加" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" @close="resetForm">
        <div class="dialog_warp">
          <ul>
            <li>
              <span>事件单号</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.djbh"></el-input>
              </p>
            </li>
            <li>
              <span>事件类型</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.famc"></el-input>
              </p>
            </li>
            <li>
              <span>损坏类型</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.tbdw"></el-input>
              </p>
            </li>
            <li>
              <span>病害类型</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.tbdw"></el-input>
              </p>
            </li>
            <li>
              <span>病害数量</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.tbdw"></el-input>
              </p>
            </li>
            <li>
              <span>考核内容</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.tbdw"></el-input>
              </p>
            </li>
            <li>
              <span>车道</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.tbdw"></el-input>
              </p>
            </li>
            <li>
              <span>事件说明</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.tbdw"></el-input>
              </p>
            </li>
            <li>
              <span>处置方式</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.tbdw"></el-input>
              </p>
            </li>
            <li>
              <span>紧急度</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.tbdw"></el-input>
              </p>
            </li>
            <li class="text_line">
              <span>桩号</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.bz"></el-input>
              </p>
            </li>
            <li class="text_line">
              <span>图片/视频</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.bz"></el-input>
              </p>
            </li>
            <div style="clear: both"></div>
          </ul>
          <div class="dialog_footer" v-if="!showxq">
            <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
            <el-button size="small" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
            <el-button size="small" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
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
  </div>
</template>

<script>
  import Dialog from '@/components/Dialog.vue'
  import { AMapManager } from 'vue-amap'
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
        total:0,
        zoom: 12,
        plugins:[],
        dialogData:[ ],
        dialogTableTit:{
          XMMC:'项目名称',XMBH:'项目编号',
        },
        datatypes:'',
        dialogVisible:false,
        restaurants:[ ],
        userMsg:{},

        currentRow: null,
        lmshForm: {
          xcfx: '上行'
        },
        index: '',
        isadd: false,
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
        searchForm: {xcsj:''},
        currentPage: 1,
        pageSize:10,
        personelForm: {},
        showDetail: false,
        multipleSelection: [],
        amapManager: new AMapManager(),
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
          supplierpk:null,
        },
        center: [121.43, 28.197646],
        events: {
          init: (map) => {
            /* this.mouseTool = new AMap.MouseTool(this.$refs.map.$$getInstance())
            this.trafficLayer = new AMap.TileLayer.Traffic({
              zIndex: 4
            })
            this.trafficLayer.setMap(map)
            this.trafficLayer.hide() */
            this.initData(this.gjlist)
          },
          'click': (e) => {
          }
        },
        navg: null,
        gjlist: [
          // ["116.250461", "39.973003"],
          // ["116.250461", "39.973003"],
          // ["116.250461", "39.973003"],
          // ["116.250461", "39.973003"],
          // ["116.258011", "39.973194"],
          // ["116.258011", "39.973194"],
          // ["116.258011", "39.973194"],
          // ["116.258011", "39.973194"],
          // ["121.170417", "28.379594"],
          // ["121.160317", "28.371584"],
          // ["121.152217"," 28.365574"],
          // ["121.148517", "28.349564"]
        ]
      }
    },
    methods: {
      initUser(){
        let userInfo = JSON.parse(localStorage.getItem('userMsg'))[0]
        if(userInfo){
          this.userInfo = userInfo
          if(userInfo){
            this.userInfo.yhbm = userInfo.userCode
            this.userInfo.yhid = userInfo.userId
            this.userInfo.yhmc = userInfo.userName
            this.userInfo.userType = userInfo.userType
            let deptList = userInfo.deptList
            let bminfo = deptList[0]
            if(bminfo){
              this.userInfo.supplierpk = bminfo.supplierpk
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
      resizeSearch(){
        this.searchForm = {xcsj:'',xmmc:''}
      },
      initMap(){

      },
      rowClick(row){
        let self = this
        // self.initData()
        // this.$refs.map.clearMap()
        // this.$refs.map.$$getInstance()
        // this.amapManager = new AMapManager()
        self.gjlist = []

        this.$api.getXcgj({id:row.id}).then(res=>{
          if(res.code == 1){
            let data = res.data
            if(data&&data){
              data.forEach(item=>{
                let arr = []
                arr.push(item.jd,item.wd)
                self.gjlist.push(arr)
              })
              self.initData(this.gjlist)

              // self.amapManager.setZoom(12)
              // AMap.Map.setZoom(12)
              // AMap.moveCamera(CameraUpdateFactory.zoomTo(zoom))
            }
          }else{
            this.gjlist = []
            self.initData(this.gjlist)
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      },

      initqueryXMMC() {

        this.$api.getmcbhList().then(res => {
          if (res.code == 1) {
            this.restaurants = res.data && res.data.length ? res.data : []
            this.queryData()
          } else {
            this.restaurants = []
            this.queryData()
          }
        })

      },
      handleSelectMC(item){
        //getXmmcList
        this.searchForm.xmmc = item.XMMC
        this.searchForm.xmbh = item.XMBH
      },
      showDialog(bol) {
        this.dialogVisible = true
        this.datatypes = bol

        this.$api.getmcbhList().then(res => {
          if (res.code == 1) {
            this.dialogData = res.data && res.data.length ? res.data : []
          } else {
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
          this.searchForm.xmbh = item.XMBH
        }
      },

      handleChange (val) {
        this.currentRow = val
      },
      initData (list) {
        if (list.length === 0) { return }
        AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], (PathSimplifier, $) => {
          if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！')
            return
          }
          if (window.pathSimplifierIns) {
            pathSimplifierIns.setData([])
          }
          this.pathSimplifierIns = new PathSimplifier({
            zIndex: 100,
            autoSetFitView: true,
            map: this.$refs.map.$$getInstance(), // 所属的地图实例

            getPath: (pathData, pathIndex) => { // 注意：此处为坐标点的转化
              var lnglatList = []
              pathData.points.map((item, index) => {
                lnglatList.push([item[0], item[1]])
              })
              return lnglatList
            },

            getHoverTitle: (pathData, pathIndex, pointIndex) => {
            },
            renderOptions: {
              pathLineStyle: {
                dirArrowStyle: false
              },
              getPathStyle: (pathItem, zoom) => {

                return {
                  pathLineStyle: {
                    strokeStyle: '#316ddb',
                    lineWidth: 5
                  },
                  pathLineSelectedStyle: {
                    lineWidth: 5 + 2
                  },
                  pathNavigatorStyle: {
                    fillStyle: '#6ae0b0'
                  }
                }
              },
              renderAllPointsIfNumberBelow: 100 // 绘制路线节点，如不需要可设置为-1
            }
          })

          window.pathSimplifierIns = this.pathSimplifierIns
          // initRoutesContainer(d);
          // this.pathSimplifierIns.setData([{}])
          if(list.length){
            this.pathSimplifierIns.setData([{points: list, name: 'xxxxx'}])
          }else{
            this.pathSimplifierIns.setData([]);
          }


          this.navg = this.pathSimplifierIns.createPathNavigator(0, {
            loop: true,
            speed: 70,
            pathNavigatorStyle: {
              width: 32,
              height: 32,
              // 使用图片
              content: PathSimplifier.Render.Canvas.getImageContent('./static/img/guiji.png', () => { this.pathSimplifierIns.renderLater() }, (e) => {

              })
            }
          })
          this.navg.start()


        })

      },
      showAdd () {
        this.showDetail = true
        this.showxq = false
        this.isadd = true
      },
      updateFormDia (row, index) {
        this.showDetail = true
        this.isadd = false
        this.showxq = false
        this.lmshForm = JSON.parse(JSON.stringify(row))
        this.index = index
      },
      showBhFormDia (row) {
        this.showDetail = true
        this.showxq = true
        this.lmshForm = JSON.parse(JSON.stringify(row))
      },

      addSubmit () {
        this.tableData.push(this.lmshForm)
        this.resetForm()
      },
      updateSubmit () {
        this.tableData.splice(this.index, 1, this.lmshForm)
        this.resetForm()
      },
      deleteData () {
        if (this.multipleSelection.length > 0) {
          this.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.tableData.splice(0, this.multipleSelection.length)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else {
          this.$message({type: 'error', message: '请选选择要删除的数据'})
        }
      },
      shenhe (row, index) {
        this.$confirm('是否通过审核？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.tableData.splice(0, this.multipleSelection.length)
          this.$message({
            type: 'success',
            message: '审核通过!'
          })
          row.sfsh = '1'
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消审核'
          })
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
        this.queryData()
      },
      getPage (currentPage, pageSize) {
        this.loading = true
        this.$api.getYhxc({pageNum:currentPage,pageSize,ksrq}).then(resp => {
          this.loading = false
          if (resp.status !== 200) {
            this.$message({
              message: '出错了',
              type: 'error'
            })
          } else {
            this.tableData = resp.data.content
            this.total = resp.data.totalElements
          }
        }).catch(e => {
          this.loading = false
        })
      },
      resetForm () {
        this.showDetail = false
        this.lmshForm = {
          xcfx: '上行'
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
      queryData(){

        let {orgid,userType} = this.userInfo
        if(userType&&userType =='供应商'){
          if(this.restaurants.length){
            if(this.restaurants[0].XMBH){

              this.searchForm.xmbh = this.restaurants[0].XMBH
            }
          }
        }
        let {xcsj,xmmc,xmbh} = this.searchForm
        let {currentPage,pageSize} = this
        let self = this
       self.$api.getYhxc({pageNum:currentPage,pageSize,
         xmbh:xmbh?xmbh:undefined,ksrq:xcsj?xcsj:undefined,orgid:orgid}).then(res=>{
                if(res.code == 1){
                  if(res.data.list&&res.data.list.length){
                    self.tableData = res.data.list
                    self.rowClick(self.tableData[0])
                  }else{
                    self.tableData = []
                  }
                  self.total = res.data.total
                }else{
                  self.$message({
                    message: res.msg,
                    type: 'warning'
                  });
                  self.tableData = []
                  self.total = 0
                }

              })





      }

    },
    mounted () {
      // this.getPage()
      this.initUser()
      this.initqueryXMMC()


      // this.getQmldbb()
      // this.search(this.currentPage, this.pageSize)

      this.$refs.multipleTable.setCurrentRow(this.tableData[0])
      // this.getXcRoadOptions()
      // this.tableHeight = $('#lkpdlmsh')[0].offsetHeight
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #rcyhcxjd{
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    overflow: auto;
    position: relative;
    .conter_table{
      height: calc(100% - 91px);
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
      ul{
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
    }
  }
</style>
