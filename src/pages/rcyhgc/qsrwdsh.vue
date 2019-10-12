/**
* ----清扫任务单审核
*/
<template>
  <div id="lkpdlmsh" style="height: 100%" v-loading="loading">
    <div class="header">
      <div class="header_option">
        <ul>
          <li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>
          <!--<li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>-->
          <!--<li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>-->
        </ul>
      </div>
    </div>
    <div class="conter_table">
      <div class="cha_xun" style="" v-if="showSearch">
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
            <el-button size="small" @click="search(1, 10)" type="text" style="width: 64px;height: 28px;background-color: #DF4D4A;border-radius: 4px;color: #fff">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <p style="height: 18px;">
      </p>
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
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="80">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="djbh" label="状态"  show-overflow-tooltip>
          <template scope="scope">
            <span style="color:#D34C42;cursor: pointer;text-align: center" v-if="scope.row.qsrwdshzt==='1401'" @click="shenhe(scope.row, '1402')">未审核</span>
            <span style="color:#D34C42;cursor: pointer;text-align: center" v-if="scope.row.qsrwdshzt==='1402'" @click="paifa(scope.row, '1403')">已审核，未派发</span>
            <span style="color:#00a2fd;text-align: center" v-if="scope.row.qsrwdshzt==='1403'">已派发</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="qsrwddjbh" label="单据编号" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="qsrwdxxly" label="信息来源" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="qsrwdsjlx" label="事件类型" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="qsrwdsjsj" label="事件时间" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="qsrwdsjdd" label="事件地点" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="qsrwdsjld" label="事件路段" show-overflow-tooltip></el-table-column>
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
    <el-dialog class="data-dialog el-updata-div" title="任务单派发" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" @close="resetForm">
      <div class="dialog_warp">
        <ul class="zhubnr">
          <li>
            <span>单据编号</span>
            <p>
              <el-input size="mini" disabled type="text" v-model="zprwdForm.rwdid"></el-input>
            </p>
          </li>
          <li>
            <span>日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="zprwdForm.zpsj"
                size="mini"
                type="date"
                :disabled="showxq"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>指派人员</span>
            <p>
              <el-select size="mini"  class="" placeholder="请选择人员" v-model="rymc" value-key="RYXX_RYXM" @change="selectry">
                <!--<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>-->
                <el-option v-for="item in ryList" :label="item.RYXX_RYXM" :key="item.RYXX_RYXM" :value="item"></el-option>
              </el-select>
              <!--<el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.yhrwdyhdw"></el-input>-->
            </p>
          </li>
          <li>
            <span></span>
            <p>
            </p>
          </li>
          <div style="clear: both"></div>
        </ul>
        <!--<div class="addzbsj">
          <i @click="addzb=!addzb" :class="addzb?'el-icon-remove-outline':'el-icon-circle-plus-outline'"></i>
        </div>
        <div class="zibnr" v-if="addzb" style="overflow-x: auto;overflow-y: hidden;">
          <ul>
            <li>
              <span>操作</span><span>事件编号</span><span>巡查单位</span><span>巡查方向</span><span>车道</span><span>单位工程</span><span>病害类型</span><span>病害数量</span><span>工程量类型</span><span>桩号</span><span>病害说明</span><span>图片</span>
              &lt;!&ndash;<p>
                <i class="el-icon-edit-outline" title="添加"></i><i class="el-icon-delete" title="删除"></i>
              </p>&ndash;&gt;
            </li>
            <li v-for="(item, index) in zprwdForm.bhList" :key="index">
              <p>
                <i class="el-icon-delete" title="删除" @click="deletezibiao(index)"></i>
              </p>
              <p>
                &lt;!&ndash;<el-select clearable :disabled="showxq" size="mini" style="width: 10px;" v-model="htbh" value-key="RWMX_SJDH" placeholder="" @change="selectHt">
                  <el-option v-for="item in xcsjList" :key="item.RWMX_SJDH" :label="item.RWMX_SJDH" :value="item"></el-option>
                </el-select>&ndash;&gt;
                <el-input size="mini" type="text" v-model="item.bhid"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.dwmc"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.yhrwdxcfx"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.cd"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.yhrwddwgc"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.bhlxname"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.bhsl"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" value="二类项目"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.zh"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.sjsm"></el-input>
              </p>
              <p>
                <el-upload
                  class="upload-demo"
                  :action="$api.uploadFiles"
                  multiple
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  accept=".png,.jpg,.bmp,.jpeg"
                  list-type="picture-card"
                  :limit="1">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </p>
            </li>
            <div style="clear: both"></div>
          </ul>
        </div>-->
        <div class="dialog_footer">
          <el-button size="small" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="paifarwd">保存</el-button>
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
      lmshForm: {},
      zprwdForm: {},
      index: '',
      isadd: false,
      addzb: true,
      submitLoading: false,
      showxq: false,
      showSearch: false,
      loading: false,
      tableHeight: 300,
      tableData: [],
      tableData1: [],
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      roadOptions: [],
      searchForm: {},
      currentPage: 1,
      pageSize: 10,
      total: 10,
      tabindex: 0,
      personelForm: {},
      rymc: {},
      ryList: [],
      showDetail: false,
      multipleSelection: []
    }
  },
  methods: {
    getfilebyid () {
      this.$api.getFilesDataById('?id=' + this.lmshForm.djbh).then(res => {
        this.fileList = res.data.data
        this.fileList.map(item => {
          item.name = item.file_yname
        })
      })
    },
    handleRemove (fileid) {
      this.$api.deleteFilesById('?ids=' + fileid).then(res => {})
    },
    rukufile () {
      let uploadFiles = []
      if (this.$refs.uploada.uploadFiles.length > 0) {
        this.$refs.uploada.uploadFiles.map(item => {
          if (item.response) {
            item.response.data.file_id = this.lmshForm.djbh
            uploadFiles.push(item.response.data)
          } else {
            uploadFiles.push(item)
          }
        })
        this.$api.addFileData({dataList: uploadFiles}).then(resp => {
          if (resp.data.code === 1) {
          }
        })
      }
      this.search(this.currentPage, this.pageSize)
      this.resetForm()
    },
    changeFile (file, fileList) {},
    showAdd () {
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      this.formId = 'qsrwd' + new Date().getTime()
      this.lmshForm.qsrwddjbh = this.formId
    },
    updateFormDia (row, index) {
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.index = index
      this.htbh = {
        zqcwzf_htbh: this.lmshForm.zqcwzf_htbh
      }
      this.getfilebyid()
    },
    showBhFormDia (row) {
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.htbh = {
        zqcwzf_htbh: this.lmshForm.zqcwzf_htbh
      }
      this.getfilebyid()
    },
    search (currentPage, pageSize) {
      this.showSearch = false
      if (this.searchForm.jcrq) {
        this.searchForm.ksrq = this.searchForm.jcrq[0]
        this.searchForm.jsrq = this.searchForm.jcrq[1]
      }
      this.$api.getQsrwdList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.tableData = resp.data.data.list
          this.total = resp.data.data.total
        }
      }).catch(e => {
        this.loading = false
      })
    },
    addSubmit () {
      this.handleRemove(this.lmshForm.djbh)
      this.$api.qsrwdshinsert(this.lmshForm).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.rukufile()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    updateSubmit () {
      this.$api.qsrwdshupdate(this.lmshForm).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '编辑成功!'
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
    deleteData () {
      if (this.multipleSelection.length > 0) {
        this.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let djbharr = ''
          this.multipleSelection.map((item, index) => {
            djbharr = djbharr + item.qsrwdid + ','
          })
          djbharr = djbharr.slice(0, djbharr.length - 1)
          this.$api.qsrwdshdelete('?qsrwdid=' + djbharr).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.search(this.currentPage, this.pageSize)
              // this.resetForm()
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
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
        let form = JSON.parse(JSON.stringify(row))
        this.$api.rcyhXxrwupdateXxrwQsrwdShQszt('?value=' + index + '&dealType=sh&qsrwdid=' + form.qsrwdid).then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: '审核通过!'
            })
            this.search(this.currentPage, this.pageSize)
            this.resetForm()
          }
        })
        row.sfsh = '1'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消审核'
        })
      })
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
    resetForm () {
      this.showDetail = false
      this.lmshForm = {
      }
    },
    tablable (num) {
      this.tabindex = num
    },
    selectry (node) {
      this.zprwdForm.ryid = node.RYXX_ID
      this.zprwdForm.rymc = node.RYXX_RYXM
    },
    paifarwd () {
      let form = {}
      form.rwdid = this.zprwdForm.qsrwdid
      form.zpsj = this.zprwdForm.zpsj
      form.rymc = this.zprwdForm.rymc
      form.ryid = this.zprwdForm.ryid
      form.sjid = this.zprwdForm.bhid
      // form.sjid = this.zprwdForm.bhList[0].bhid
      form.sslx = 'qs'
      this.$api.rcyhXxrwinsertRwdSubsidiary(form).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '指派成功!'
          })
          this.search(this.currentPage, this.pageSize)
          this.resetForm()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      }).catch(() => {
      })
    },
    paifa (row) {
      this.zprwdForm = JSON.parse(JSON.stringify(row))
      this.zprwdForm.rwdid = row.qsrwddjbh
      this.showDetail = true
    },
    getrylist () {
      this.$api.commoncreateRyxxList('').then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else if (resp.data.code === 1) {
          this.ryList = resp.data.data
        }
      }).catch(e => {
      })
    }
  },
  mounted () {
    this.search(1, 10)
    this.getrylist()
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
      .tab_lable{
        margin-bottom: 10px;
        font-size: 12px;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #f1f4f7;
        padding: 0 15px;
        span{
          display: inline-block;
          /*border-bottom: 2px solid #00a2fd;*/
          height: 38px;
          margin-right: 20px;
          &:hover{
            border-bottom: 2px solid #00a2fd;
            cursor: pointer;
          }
        }
        .tabselect{
          border-bottom: 2px solid #00a2fd;
        }
      }
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
