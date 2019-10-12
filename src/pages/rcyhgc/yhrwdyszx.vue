/**
* ----养护任务单验收
*/
<template>
  <div id="ydsgjhwcqk" style="height: 100%" v-loading="loading">
    <div class="header">
      <div class="header_option">
        <ul>
          <li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>
          <!--<li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>-->
        </ul>
      </div>
    </div>
    <div class="conter_table">
      <div class="cha_xun" style="" v-if="showSearch">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="项目名称" prop="lxbh">
              <el-input v-model="searchForm.htmc" size="mini" placeholder="请输入编号"></el-input>
              <!--<selectTree class="selectTree" v-model="searchForm.bmname" :isDefaultselect="true" :urlFunc="$api.requestBmtreeAll" :dataKey="{name: 'bmname'}" placeholder="请选择部门" @treeSelect="selecttreeBm"></selectTree>-->
            </el-form-item>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="状态" prop="" class="">
            <el-select size="mini"  class="" placeholder="请选择状态" v-model="searchForm.xcfx">
              <!--<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>-->
              <el-option label="1001" value="未处理"></el-option>
              <el-option label="1002" value="不处理"></el-option>
              <el-option label="1003" value="已下发"></el-option>
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
            <el-button size="small" @click="search(1, 10)" type="text" style="width: 64px;height: 28px;background-color: #DF4D4A;border-radius: 4px;color: #fff">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <p style="font-size: 12px;height: 18px"></p>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                style="width: calc(100% - 30px);margin: 0 15px"
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
        <el-table-column type="expand">
          <template scope="scope">
            <el-table class="demo-table-expand"
                      :data="scope.row.bhList"
                      border>
              <el-table-column prop="sjbh" label="事件编号"></el-table-column>
              <el-table-column prop="xcdw" label="巡查单位"></el-table-column>
              <el-table-column prop="xcfx" label="巡查方向"></el-table-column>
              <el-table-column prop="cd" label="车道"></el-table-column>
              <el-table-column prop="dwgc" label="单位工程"></el-table-column>
              <el-table-column prop="bhlx" label="病害类型"></el-table-column>
              <el-table-column prop="bhsl" label="病害数量"></el-table-column>
              <el-table-column prop="gcllx" label="工程量类型"></el-table-column>
              <el-table-column prop="zh" label="桩号"></el-table-column>
              <el-table-column prop="bhsm" label="病害说明"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="80">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态"  show-overflow-tooltip>
          <template scope="scope">
            <span style="color:#D34C42;cursor: pointer;text-align: center" v-if="scope.row.ysdysztname==='申请验收'" @click="shenhe(scope.row, scope.$index)">{{scope.row.ysdysztname}}</span>
            <span style="color:#00a2fd;text-align: center" v-if="scope.row.ysdysztname==='已验收'">{{scope.row.ysdysztname}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="ysdhtbh" label="单据编号" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="ysdlx" label="路线" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="ysdtbrq" label="日期"></el-table-column>
        <el-table-column align="center" prop="ysdyd" label="月度"></el-table-column>
        <el-table-column align="center" prop="ysdyhdw" label="养护单位"></el-table-column>
        <el-table-column align="center" prop="ysdgldw" label="管理单位"></el-table-column>
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
    <el-dialog class="data-dialog el-updata-div" title="详情" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" @close="resetForm">
      <div class="dialog_warp">
        <ul class="zhubnr">
          <li>
            <span>单据编号</span>
            <p>
              <el-input size="mini" disabled type="text" v-model="lmshForm.ysdhtbh"></el-input>
            </p>
          </li>
          <li>
            <span>工程项目</span>
            <p>
              <el-select size="mini"  class="" placeholder="请选择工程项目" v-model="lmshForm.ysdhtmc" @change="selectyhdw">
                <el-option v-for="item in yhhtList" :label="item.htxxhtmc" :key="item.htxxhtmc" :value="item.htxxhtbh"></el-option>
              </el-select>
            </p>
          </li>
          <li>
            <span>月度</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.ysdyd"
                size="mini"
                type="month"
                format="yyyy-MM"
                value-format="yyyy-MM"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>路线</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.ysdlx"></el-input>
            </p>
          </li>
          <li>
            <span>养护单位</span>
            <p>
              <el-input size="mini"  type="text" v-model="lmshForm.ysdyhdw"></el-input>
            </p>
          </li>
          <li>
            <span>管理单位</span>
            <p>
              <el-input size="mini"  type="text" v-model="lmshForm.ysdgldw"></el-input>
            </p>
          </li>
          <li>
            <span>填报单位</span>
            <p>
              <el-input size="mini"  type="text" v-model="lmshForm.ysdtbdw"></el-input>
            </p>
          </li>
          <li>
            <span>填报日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.ysdtbrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <div style="clear: both"></div>
        </ul>
        <div class="addzbsj">
          <i @click="addzb=!addzb" :class="addzb?'el-icon-remove-outline':'el-icon-circle-plus-outline'"></i>
        </div>
        <div class="zibnr" v-if="addzb" style="overflow-x: auto;overflow-y: hidden;">
          <ul>
            <li>
              <span>操作</span><span>事件编号</span><span>巡查单位</span><span>巡查方向</span><span>车道</span><span>单位工程</span><span>病害类型</span><span>病害数量</span><span>工程量类型</span><span>桩号</span><span>病害说明</span><span>图片</span>
              <!--<p>
                <i class="el-icon-edit-outline" title="添加"></i><i class="el-icon-delete" title="删除"></i>
              </p>-->
            </li>
            <li v-for="(item, index) in lmshForm.bhList" :key="index">
              <p>
                <i class="el-icon-delete" title="删除" @click="deletezibiao(index)"></i>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.bhid"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.dwmc"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.xcfx"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.cd"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.dwgl"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.bhlx"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.bhsl"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.gcllx"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.zh"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.bhsm"></el-input>
              </p>
              <p>
                <el-upload
                  class="upload-demo"
                  :action="$api.uploadFiles"
                  :data="{'id':item.djbh,'type':'yhrwdys'}"
                  multiple
                  accept=".png,.jpg,.bmp,.jpeg"
                  list-type="picture-card"
                  :limit="1">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </p>
            </li>
            <div style="clear: both"></div>
          </ul>
        </div>
        <div class="dialog_footer" v-if="!showxq">
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="small" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog class="data-dialog el-updata-div" title="验收" :close-on-click-modal="false" :visible.sync="showyanshou" width="580px">
      <div class="dialog_warp">
        <el-input type="textarea" placeholder="验收意见" v-model="lmshForm.ysyj"></el-input>
        <div class="dialog_footer">
          <el-button size="small" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="yanshou">保存</el-button>
          <el-button size="small" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
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
        tbdw: '甬台温施工单位',
        tbrq: this.formatDate(new Date()),
        bhList: [{}]
      },
      index: '',
      isadd: false,
      addzb: true,
      submitLoading: false,
      showxq: false,
      showSearch: false,
      showyanshou: false,
      loading: false,
      tableHeight: 300,
      tableData: [],
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      roadOptions: [],
      searchForm: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      personelForm: {},
      showDetail: false,
      multipleSelection: [],
      filedata: {
        id: 'sgdwlyjcb' + new Date().getTime(),
        type: 'lyjc'
      },
      formId: ''
    }
  },
  methods: {
    changeFile (file, fileList) {},
    showAdd () {
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      this.lmshForm.djbh = this.formId
      this.formId = 'yhrwdsh' + new Date().getTime()
      this.lmshForm.bhList[0].yhrwdid = this.formId
      this.lmshForm.ysdhtbh = this.formId
      this.lmshForm.ysdrq = this.formatDate(new Date())
      // this.lmshForm.ysdyd = this.formatMonth(new Date())
      this.lmshForm.ysdyd = '2019-01'
      this.lmshForm.ysdlx = 'G70'
      this.lmshForm.ysdyhdw = '北仑港高速施工单位'
      this.lmshForm.ysdgldw = '北仑港高速管理单位'
      this.lmshForm.ysdtbdw = '北仑港高速'
      this.lmshForm.ysdtbrq = this.formatDate(new Date())
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
      this.lmshForm.bhList = []
      this.$api.rcyhYhrwysdinsertYhrwysd(this.lmshForm).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.search(this.currentPage, this.pageSize)
          this.resetForm()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    shenhe (row, index) {
      this.showyanshou = true
      this.lmshForm.ysdid = row.ysdid
    },
    yanshou () {
      this.$api.rcyhYhrwysdupdateYhrwysdYS('?ysdid=' + this.lmshForm.ysdid + '&ysdysyj=' + this.lmshForm.ysyj).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '验收通过!'
          })
          this.showyanshou = false
          this.search(this.currentPage, this.pageSize)
          this.resetForm()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    search (currentPage, pageSize) {
      this.showSearch = false
      if (this.searchForm.jcrq) {
        this.searchForm.ksrq = this.searchForm.jcrq[0]
        this.searchForm.jsrq = this.searchForm.jcrq[1]
      }
      this.$api.rcyhYhrwysdgetYsdList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.tableData = resp.data.data.rows
          this.total = resp.data.data.totle
        }
      }).catch(e => {
        this.loading = false
      })
    },
    addzibiao () {
      this.lmshForm.bhList.push({yhrwdid: this.lmshForm.id})
    },
    deletezibiao (index) {
      this.lmshForm.bhList.splice(index, 1)
    },
    ceshi () {
      this.$message({
        type: 'error',
        message: '内容格式不符合要求'
      })
    },
    resetForm () {
      this.showDetail = false
      this.lmshForm = {
        bhList: [{}]
      }
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
    getyhhtList () {
      this.$api.rcyhYhrwysdgetHtxxList().then(res => {
        this.yhhtList = res.data
      })
    },
    selectyhdw (value) {
      this.$api.rcyhYhrwysdgetBhListByHtxxID('?yhhtxxhtbh=' + value + '&ysdyd=' + this.lmshForm.ysdyd).then(res => {
        if (res.status === 200) {
          this.lmshForm.bhList = res.data
          let arrid = ''
          this.lmshForm.bhList.map(item => {
            arrid = arrid + item.bhid + ','
          })
          arrid = arrid.slice(0, arrid.length - 1)
          this.lmshForm.rwdidArrStr = arrid
        }
      }).catch(e => {
      })
    }
  },
  mounted () {
    this.search(1, 10)
    this.getyhhtList()
    this.tableHeight = $('#ydsgjhwcqk')[0].offsetHeight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #ydsgjhwcqk{
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
      .zibnr,.zibiaonr{
        width: 100%;
        position: relative;
        padding: 15px 0 0 0;
        overflow: hidden;
        text-align: center;
        box-sizing: border-box;
        .el-upload--picture-card{
          width: 14px!important;
          height: 14px!important;
          border-radius: 0!important;
          line-height: 14px!important;
          margin: 9px 0!important;
          i{
            font-size: 12px!important;
          }
        }
        ul{
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 15px;
          li{
            width: 1200px;
            height: 32px;
            float: left;
            box-sizing: border-box;
            border: 1px solid #D5D6D7;
            color: #52575D!important;
            font-size: 12px;
            border-right: none;
            border-bottom: none;
            &:nth-of-type(1){
              height: 60px;
            }
            &:nth-last-of-type(1){
              border-bottom: 1px solid #D5D6D7;
            }
            >span{
              width: calc(100%/12);
              display: inline-block;
              height: 100%;
              float: left;
              line-height: 31px;
              text-align: center;
              background: #F7F8F9;
              border-right: 1px solid #D5D6D7;
              div{
                height: 50%;
              }
              span{
                width: 50%;
                height: 50%;
                display: inline-block;
                float: left;
                border-top: 1px solid #D5D6D7;
                border-right: 1px solid #D5D6D7;
                &:nth-last-of-type(1){
                  border-right: none;
                }
              }
            }
            p{
              width: calc(100%/12);
              height: 100%;
              line-height: 32px;
              float: left;
              border-right: 1px solid #D5D6D7;
              .el-input__inner{
                border: none;
                text-align: center;
              }
              >i{
                color: #00a2fd;
                margin:0 5px;
              }
            }
          }
        }
      }
      .zibiaonr{
        margin-top: 20px;
        li{
          width: calc(100%/6);
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
            i{
              color: #00a2fd;
              margin:0 5px;
            }
          }
        }
      }
      .addzbsj{
        text-align: center;
        color: #1CA4FA;
        padding: 10px 0;
      }
      .iconwarp{
        text-align: right;
        position: absolute;
        right: 0px;
        top: 0;
        i{
          color: #1CA4FA;
          margin-left: 10px;
        }
      }
    }
  }
</style>
