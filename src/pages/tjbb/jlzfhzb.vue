/**
* ----病害统计
*/
<template>
  <div id="lkpdlmsh" style="height: 100%" v-loading="loading">
    <div class="header">

      <div class="header_option">
        <ul>
          <li><a href="./static/桥隧构造物.xlsx"><i class="el-icon-upload2" @click="daochu"> 导出</i></a></li>
          <li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table">
      <div class="cha_xun" style="" v-if="showSearch">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="单位名称" prop="lxbh">
              <el-input v-model="searchForm.lxcode" size="mini" placeholder="请输入单位名称"></el-input>
              <!--<selectTree class="selectTree" v-model="searchForm.bmname" :isDefaultselect="true" :urlFunc="$api.requestBmtreeAll" :dataKey="{name: 'bmname'}" placeholder="请选择部门" @treeSelect="selecttreeBm"></selectTree>-->
            </el-form-item>
          </el-form-item>
          <!--<el-form-item style="margin-bottom: 0px" label="行车方向" prop="" class="">-->
            <!--<el-select size="mini"  class="" placeholder="请选择方向" v-model="searchForm.xcfx">-->
              <!--&lt;!&ndash;<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>&ndash;&gt;-->
              <!--<el-option label="上行" value="上行"></el-option>-->
              <!--<el-option label="下行" value="下行"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
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
            <el-button size="small" @click="search(1, 10)" type="text" style="width: 64px;height: 28px;background-color: #DF4D4A;border-radius: 4px;color: #fff">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <p style="font-size: 12px;height: 18px"></p>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                style="width: 100%;"
                row-class-name="row_class"
                border
                :height="showSearch?'calc(100% - 59px)':'calc(100% - 18px)'"
                :row-style="{fontFamily: '宋体', fontSize: '12px'}"
                @selection-change="handleSelectionChange">
        <el-table-column
          type="index"
          label=" "
          width="25">
        </el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="80">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="dwmc" label="单位名称"  show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="dwmc" label="施工单位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="dwmc" label="监理单位"></el-table-column>
        <el-table-column align="center" prop="qzzh" label="起止桩号"></el-table-column>
        <el-table-column align="center" prop="kgsj" label="时间开工"></el-table-column>
        <el-table-column align="center" prop="gcfl" label="工程分类"></el-table-column>
        <el-table-column align="center" prop="zt" label="项目状态"></el-table-column>
        <el-table-column align="center" prop="je" label="合同金额"></el-table-column>
        <el-table-column align="center" prop="je" label="变更金额"></el-table-column>
        <el-table-column align="center" prop="je" label="计量金额"></el-table-column>
        <el-table-column align="center" prop="je" label="已支付金额"></el-table-column>
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
            <span>单位名称</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.dwmc"></el-input>
            </p>
          </li>
          <li>
            <span>项目名称</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.xmmc"></el-input>
            </p>
          </li>
          <li>
            <span>施工单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.sgdw"></el-input>
            </p>
          </li>
          <li>
            <span>监理单位</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.dwmc"></el-input>
            </p>
          </li>
          <li>
            <span>起止桩号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.qzzh"></el-input>
            </p>
          </li>
          <li>
            <span>实际开工日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.kgsj"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>工程分类</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.gcfl"></el-input>
            </p>
          </li>
          <li>
            <span>项目状态</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.zt"></el-input>
            </p>
          </li>
          <li>
            <span>合同金额</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.je"></el-input>
            </p>
          </li>
          <li>
            <span>变更金额</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.je"></el-input>
            </p>
          </li>
          <li>
            <span>计量金额</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.je"></el-input>
            </p>
          </li>
          <li>
            <span>已支付金额</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.je"></el-input>
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
</template>

<script>
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
      multipleSelection: []
    }
  },
  methods: {
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
    this.tableData = []
    for (let i = 0; i < 4; i++) {
      this.tableData.push({
        dwmc: '甬台温公司',
        xmmc: '甬台温公司项目',
        qzzh: 'K0+K16',
        kgsj: '2018/12/1',
        gcfl: '路况评定',
        zt: '完成',
        je: '25'

      })
    }
    // this.getXcRoadOptions()
    this.tableHeight = $('#lkpdlmsh')[0].offsetHeight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #lkpdlmsh{
    /*padding: 10px 15px 0 15px;*/
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
