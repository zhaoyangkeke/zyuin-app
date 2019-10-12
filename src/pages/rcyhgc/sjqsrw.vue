/**
* ----事件清扫任务
*/
<template>
  <div id="rcyhcxjd" style="height: 100%" v-loading="loading">
    <el-amap vid="amapDemo" ref="map" :center="center" :map-manager="amapManager" :zoom="zoom" :events="events" :plugin="plugins"
             style="width: 100%;height: 100%;position: relative">
    </el-amap>
    <div style="position: absolute;bottom: 0;width: 100%;background: #fff;height: 280px">
      <div class="header">
        <div class="cha_xun" style="">
          <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
            <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <el-form-item class="" label="路线名称" prop="lxbh">
                <el-input v-model="searchForm.lxcode" size="mini" placeholder="请输入编号"></el-input>
                <!--<selectTree class="selectTree" v-model="searchForm.bmname" :isDefaultselect="true" :urlFunc="$api.requestBmtreeAll" :dataKey="{name: 'bmname'}" placeholder="请选择部门" @treeSelect="selecttreeBm"></selectTree>-->
              </el-form-item>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px" label="行车方向" prop="" class="">
              <el-select size="mini"  class="" placeholder="请选择方向" v-model="searchForm.xcfx">
                <!--<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>-->
                <el-option label="上行" value="上行"></el-option>
                <el-option label="下行" value="下行"></el-option>
              </el-select>
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
              <!--<el-select size="mini"  class="" placeholder="请选择日期" v-model="searchForm.jcrq">
                <el-option v-for="(item,index) in qmbbOptions" :key="index" :label="item.bbmc" :value="item.bbid"></el-option>
              </el-select>-->
            </el-form-item>
            <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <el-button size="mini" @click="search(1, 10)" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--<div class="header_option">-->
          <!--&lt;!&ndash;<div class="jianlimb" @click="showAdd()"><i class="el-icon-download"> 计划申报</i></div>&ndash;&gt;-->
          <!--<ul>-->
            <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
            <!--&lt;!&ndash;<li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>-->
            <!--<li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>&ndash;&gt;-->
          <!--</ul>-->
        <!--</div>-->
      </div>
      <div class="conter_table">


        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                  style="width: 100%;"
                  row-class-name="row_class"
                  border
                  :height="showSearch?'calc(100% - 59px)':'calc(100% - 18px)'"
                  :row-style="{fontFamily: '宋体', fontSize: '12px'}"
                  @current-change="handleChange">
          <el-table-column
            type="index"
            label=" "
            width="25">
          </el-table-column>
          <!--<el-table-column align="center" class-name="column-caoz" label="操作" width="80">
            <template scope="scope">
              &lt;!&ndash;<span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>&ndash;&gt;
              <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
            </template>
          </el-table-column>-->
          <el-table-column align="center" prop="djbh" label="路线"  show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="famc" label="方向" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="sjxx" label="人员" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="sjsx" label="开始时间"></el-table-column>
          <el-table-column align="center" prop="tbr" label="结束时间"></el-table-column>
          <el-table-column align="center" prop="tbdw" label="气象信息"></el-table-column>
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
    </div>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap'
export default {
  components: {},
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
      plugins: [],
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
      searchForm: {},
      currentPage: 1,
      personelForm: {},
      showDetail: false,
      multipleSelection: [],
      amapManager: new AMapManager(),
      zoom: 6,
      center: [121.43, 28.197646],
      events: {
        init: (map) => {
          /*
           this.mouseTool = new AMap.MouseTool(this.$refs.map.$$getInstance())
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
        [121.170417, 28.379594],
        [121.160317, 28.371584],
        [121.152217, 28.365574],
        [121.148517, 28.349564]
      ]
    }
  },
  methods: {
    initData (list) {
      if (list.length === 0) { return }
      AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], (PathSimplifier, $) => {
        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！')
          return
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
              dirArrowStyle: true
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
        this.pathSimplifierIns.setData([{points: list, name: 'xxxxx'}])

        this.navg = this.pathSimplifierIns.createPathNavigator(0, {
          loop: true,
          speed: 1000,
          pathNavigatorStyle: {
            width: 32,
            height: 32,
            // 使用图片
            content: PathSimplifier.Render.Canvas.getImageContent('./static/img/guiji.png', () => { this.pathSimplifierIns.renderLater() }, (e) => {   })
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
    handleChange (val) {
      this.currentRow = val
    },
    search () {
      this.showSearch = false
      for (var i = this.tableData.length - 1; i >= 0; i--) {
        if ((this.searchForm.lxcode && this.searchForm.lxcode !== this.tableData[i].lxcode) || (this.searchForm.xcfx && this.searchForm.xcfx !== this.tableData[i].xcfx)) {
          this.tableData.splice(i, 1)
        }
      }
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
    daoru () {
      for (var i = 0; i < 4; i++) {
        this.tableData.push({
          lxcode: 'G15',
          qdzh: 'K16+700',
          zdzh: 'K16+800',
          xcfx: '上行',
          jcrq: '2018/12/11',
          jcsb: 'XX设备',
          jlry: '张三',
          jckd: '3',
          qljszk1: '2',
          qljszk2: '3',
          qljszk3: '4',
          qljszk4: '5',
          sd1: '1',
          sd2: '2',
          sd3: '3',
          hd1: '1',
          hd2: '2',
          hd3: '3',
          hd4: '4'
        })
      }
      this.$message({
        type: 'success',
        message: '导入成功!'
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
    getPage (currentPage, pageSize) {
      this.loading = true
      this.$api.requestLkpdLkdcQueryPage('/' + currentPage + '/' + pageSize).then(resp => {
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
    }
  },
  mounted () {
    // this.getQmldbb()
    // this.search(this.currentPage, this.pageSize)
    this.tableData = [
      {
        djbh: 'G50',
        famc: '上行',
        sjxx: '张三',
        sjsx: '2018/12/11',
        tbr: '2018/12/11',
        tbsj: '2018/12/11',
        tbdw: '晴',
        tbbm: '技术部',
        bz: '11111',
        sfsh: '0'
      },
      {
        djbh: 'G50',
        famc: '上行',
        sjxx: '张三',
        sjsx: '2018/12/11',
        tbr: '2018/12/11',
        tbsj: '2018/12/11',
        tbdw: '晴',
        tbbm: '技术部',
        bz: '11111',
        sfsh: '0'
      },
      {
        djbh: 'G50',
        famc: '上行',
        sjxx: '张三',
        sjsx: '2018/12/11',
        tbr: '2018/12/11',
        tbsj: '2018/12/11',
        tbdw: '晴',
        tbbm: '技术部',
        bz: '11111',
        sfsh: '0'
      },
      {
        djbh: 'G50',
        famc: '上行',
        sjxx: '张三',
        sjsx: '2018/12/11',
        tbr: '2018/12/11',
        tbsj: '2018/12/11',
        tbdw: '晴',
        tbbm: '技术部',
        bz: '11111',
        sfsh: '0'
      },
      {
        djbh: 'G50',
        famc: '上行',
        sjxx: '张三',
        sjsx: '2018/12/11',
        tbr: '2018/12/11',
        tbsj: '2018/12/11',
        tbdw: '晴',
        tbbm: '技术部',
        bz: '11111',
        sfsh: '0'
      }
    ]
    this.$refs.multipleTable.setCurrentRow(this.tableData[0])
    // this.getXcRoadOptions()
    if( $('#lkpdlmsh')[0]){
      this.tableHeight = $('#lkpdlmsh')[0].offsetHeight
    }

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
    .header{}
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
