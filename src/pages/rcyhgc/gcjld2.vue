/**
* ----工程计量单
*/
<template>
  <div id="gcjld" style="height: 100%" v-loading="loading">
    <div class="header">
      <div class="header_option">
        <ul>
          <li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>
          <li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
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
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template scope="scope">
            <el-table class="demo-table-expand"
                      :data="scope.row.zmbs"
                      border>
              <el-table-column prop="jrgmx_xmh" label="细目号"></el-table-column>
              <el-table-column prop="jrgmx_xmmc" label="细目名称"></el-table-column>
              <el-table-column prop="jrgmx_jldw" label="单位"></el-table-column>
              <el-table-column prop="jrgmx_sl" label="数量"></el-table-column>
              <el-table-column prop="jrgmx_dj" label="单位"></el-table-column>
              <el-table-column prop="jrgmx_je" label="金额"></el-table-column>
              <el-table-column prop="jrgmx_yt" label="用途"></el-table-column>
              <el-table-column prop="jrgmx_rq" label="时间"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="80">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="djbh" label="状态"  show-overflow-tooltip>
          <template scope="scope">
            <span style="color:#D34C42;cursor: pointer;text-align: center" v-if="scope.row.gcjl_spzt==='未处理'" @click="shenhe(scope.row, scope.$index)">{{scope.row.gcjl_spzt}}</span>
            <span style="color:#00a2fd;text-align: center" v-if="scope.row.gcjl_spzt==='已下发'">{{scope.row.gcjl_spzt}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="gcjl_djbh" label="单据编号"  show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="gcjl_gcmc" label="工程名称" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="gcjl_sqrq" label="申请日期" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="gcjl_yd" label="月度"></el-table-column>
        <el-table-column align="center" prop="gcjl_htmc" label="合同名称"></el-table-column>
        <el-table-column align="center" prop="gcjl_cbdw" label="承包单位"></el-table-column>
        <el-table-column align="center" prop="gcjl_qdzh" label="起点桩号"></el-table-column>
        <el-table-column align="center" prop="gcjl_zdzh" label="止点桩号"></el-table-column>
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
    <el-dialog class="data-dialog el-updata-div" title="工程计量单" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" @close="resetForm">
      <div class="dialog_warp">
        <ul class="zhubnr">
          <li>
            <span>单据编号</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.gcjl_djbh"></el-input>
            </p>
          </li>
          <li>
            <span>工程名称</span>
            <p>
              <el-select clearable :disabled="showxq" size="mini" style="width: 148px;" v-model="htbh" value-key="gcjl_htbh" placeholder="" @change="selectHt">
                <el-option v-for="item in htList" :key="item.gcjl_htbh" :label="item.gcjl_htmc" :value="item"></el-option>
              </el-select>
              <!--<el-input size="mini" type="text" v-model="lmshForm.gcjl_gcmc"></el-input>-->
            </p>
          </li>
          <li>
            <span>申请日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                :disabled="showxq"
                v-model="lmshForm.gcjl_sqrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>月度</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.gcjl_yd"
                size="mini"
                :disabled="showxq"
                type="month"
                format="yyyy-MM"
                value-format="yyyy-MM"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>合同名称</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.gcjl_htmc"></el-input>
            </p>
          </li>
          <li>
            <span>承包单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.gcjl_cbdw"></el-input>
            </p>
          </li>
          <li>
            <span>起点桩号</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.gcjl_qdzh"></el-input>
            </p>
          </li>
          <li>
            <span>止点桩号</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.gcjl_zdzh"></el-input>
            </p>
          </li>
          <li>
            <span>部位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.gcjl_bw"></el-input>
            </p>
          </li>
          <li>
            <span>图号</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.gcjl_th"></el-input>
            </p>
          </li>
          <li>
            <span>质检单编号</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.gcjl_zjdbh"></el-input>
            </p>
          </li>
          <li>
            <span>是否隐蔽工程</span>
            <p class="radio_line">
              <el-radio style="height: 100%;line-height: 31px" :disabled="showxq" v-model="lmshForm.gcjl_sfybgc" label="是">是</el-radio>
              <el-radio style="height: 100%;line-height: 31px" :disabled="showxq" v-model="lmshForm.gcjl_sfybgc" label="否">否</el-radio>
            </p>
          </li>
          <li>
            <span>隐蔽工程检查单号</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.gcjl_ybgcdh"></el-input>
            </p>
          </li>
          <li>
            <span></span>
            <p>
            </p>
          </li>
          <li class="text_line">
            <span>计算式及简图说明</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.gcjl_jtsm"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>附件</span>
            <p>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :disabled="showxq"
                :limit="3">
                <i style="color: #00a2fd;" v-if="!showxq" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
            </p>
          </li>
          <li>
            <span>填报单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.gcjl_dwmc"></el-input>
            </p>
          </li>
          <li>
            <span>填报日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.gcjl_tbrq"
                size="mini"
                type="date"
                :disabled="showxq"
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
          <p class="tab_lable" style="">
            <span :class="tabindex===0?'tabselect':''" @click="tablable(0)">明细表</span>
            <span :class="tabindex===1?'tabselect':''" @click="tablable(1)">汇总表</span>
          </p>
          <div v-if="tabindex===0" class="iconwarp">
            <i style="float: right" class="el-icon-edit-outline" title="添加" @click="addzibiao"></i>
            <el-upload
              class="upload-demo"
              action=""
              style="float: right"
              multiple
              :limit="3"
              :on-change="ceshi">
              <i class="el-icon-download" title="导入"></i>
            </el-upload>
          </div>
          <ul v-if="tabindex===0">
            <li>
              <span>操作</span><span>子目号</span><span>子目名称</span><span>单位</span><span>合同数量</span><span>合同单价</span><span>合同金额</span><span>扣款金额</span><span>金额</span>
              <!--<p>
                <i class="el-icon-edit-outline" title="添加"></i><i class="el-icon-delete" title="删除"></i>
              </p>-->
            </li>
            <li v-for="(item, index) in lmshForm.zmbs" :key="index">
              <p>
                <i class="el-icon-delete" title="删除" @click="deletezibiao(index)"></i>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.gcjlmx_zmh"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.gcjlmx_zmmc"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.gcjlmx_jldw"></el-input>
              </p>
              <p>
                <!--<input type="text" @change="tongjije(item, index)" v-model="item.jrgmx_sl">-->
                <el-input size="mini" type="text" v-model="item.gcjlmx_htsl" @change="tongjije(item, index)"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.gcjlmx_htdj" @change="tongjije(item, index)"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.gcjlmx_htje"></el-input>
                <!--{{item.gcjlmx_htsl*item.gcjlmx_htdj}}-->
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.gcjlmx_kkje"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.gcjlmx_zje"></el-input>
              </p>
            </li>
            <div style="clear: both"></div>
          </ul>
          <ul class="gchzb" v-if="tabindex===1">
            <li>
              <span>操作</span><span>子目号</span><span>子目名称</span><span>计量单编号</span><span>单位</span><span>数量</span>
              <!--<p>
                <i class="el-icon-edit-outline" title="添加"></i><i class="el-icon-delete" title="删除"></i>
              </p>-->
            </li>
            <li v-for="(item, index) in lmshForm.zmbs" :key="index">
              <p>
                <i class="el-icon-delete" title="删除" @click="deletezibiao(index)"></i>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.gcjlmx_zmh"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.gcjlmx_zmmc"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.gcjl_djbh"></el-input>
              </p>
              <p>
                <!--<input type="text" @change="tongjije(item, index)" v-model="item.jrgmx_sl">-->
                <el-input size="mini" type="text" v-model="item.gcjlmx_jldw"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.gcjlmx_htsl"></el-input>
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
          zmbs: [{}]
        },
        index: '',
        isadd: false,
        addzb: true,
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
        pageSize: 10,
        personelForm: {},
        showDetail: false,
        multipleSelection: [],
        htbh: {},
        htList: [],
        tabindex: 0
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
      tongjije (item, index) {
        // this.lmshForm.zmbs[index].jrgmx_je = item.jrgmx_sl * item.jrgmx_dj
      },
      showAdd () {
        this.showDetail = true
        this.showxq = false
        this.isadd = true
        this.formId = 'gcjl' + new Date().getTime()
        this.lmshForm.gcjl_djbh = this.formId
        this.lmshForm.gcjl_yd = this.formatMonth(new Date())
        this.lmshForm.gcjl_sqrq = this.formatDate(new Date())
        // this.lmshForm.jrgsp_tbrq = new Date()
      },
      updateFormDia (row, index) {
        this.showDetail = true
        this.isadd = false
        this.showxq = false
        this.lmshForm = JSON.parse(JSON.stringify(row))
        this.index = index
        this.htbh = {
          gcjl_htbh: row.gcjl_htbh
        }
        this.getfilebyid()
      },
      showBhFormDia (row) {
        this.showDetail = true
        this.showxq = true
        this.lmshForm = JSON.parse(JSON.stringify(row))
        this.htbh = {
          gcjl_htbh: row.gcjl_htbh
        }
        this.getfilebyid()
      },
      search (currentPage, pageSize) {
        this.showSearch = false
        if (this.searchForm.jcrq) {
          this.searchForm.ksrq = this.searchForm.jcrq[0]
          this.searchForm.jsrq = this.searchForm.jcrq[1]
        }
        this.$api.getGcjldList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
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
        this.$api.addGcjldForJlzf(this.lmshForm).then(res => {
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
        this.handleRemove(this.lmshForm.djbh)
        this.$api.editGcjldForJlzf(this.lmshForm).then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: '编辑成功!'
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
              djbharr = djbharr + item.gcjl_djbh + ','
            })
            djbharr = djbharr.slice(0, djbharr.length - 1)
            this.$api.delGcjldForJlzf('?djbhs=' + djbharr).then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.handleRemove(this.lmshForm.djbh)
                this.search(this.currentPage, this.pageSize)
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
          form.gcjl_spzt = '已下发'
          this.$api.spGcjldForJlzf('?spzt=' + form.gcjl_spzt + '&djbhs=' + form.gcjl_djbh).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '审核通过!'
              })
              this.search(this.currentPage, this.pageSize)
              this.resetForm()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消审核'
          })
        })
      },
      tablable (num) {
        this.tabindex = num
      },
      addzibiao () {
        this.lmshForm.zmbs.push({mid: this.lmshForm.id})
      },
      deletezibiao (index) {
        this.lmshForm.zmbs.splice(index, 1)
      },
      ceshi () {
        this.$message({
          type: 'error',
          message: '内容格式不符合要求'
        })
      },
      daoru () {
        for (var i = 0; i < 4; i++) {
          this.tableData.push({
            djbh: '234243415',
            famc: '路况评定',
            sjxx: '2018/12/11',
            sjsx: '2018/12/11',
            tbr: '张三',
            tbsj: '2018/12/11',
            tbdw: '甬台温高速',
            tbbm: '技术部',
            bz: '11111',
            sfsh: '0',
            tableData1: [{date: '1'}]
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
          zmbs: [{}]
        }
        this.htbh = {}
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
      selectHt (value) {
        this.lmshForm.gcjl_htmc = value.gcjl_htmc
        this.lmshForm.gcjl_htbh = value.gcjl_htbh
        this.lmshForm.gcjl_cbdw = value.pmmtgcspsqs_cbdw
        this.lmshForm.gcjl_qdzh = value.gcjl_qdzh
        this.lmshForm.gcjl_zdzh = value.gcjl_zdzh
        this.lmshForm.gcjl_glmc = value.gcjl_glmc
        this.lmshForm.gcjl_gcmc = value.gcjl_gcmc
        this.lmshForm.zmbs = value.zmbs
      }
    },
    mounted () {
      this.$api.getHtXxInfoByBm('').then(res => {
        this.htList = res.data.data
      })
      // this.getQmldbb()
      // this.search(this.currentPage, this.pageSize)
      this.search(1, 10)
      // this.getXcRoadOptions()
      this.tableHeight = $('#gcjld')[0].offsetHeight
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #gcjld{
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
      .tab_lable{
        margin-bottom: 10px;
        font-size: 12px;
        text-align: left;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #f1f4f7;
        padding: 0 15px;
        p{
          text-align: left;
        }
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
        ul{
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 15px;
          li{
            width: 900px;
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
              width: calc(100%/9);
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
              width: calc(100%/9);
              height: 100%;
              line-height: 32px;
              float: left;
              border-right: 1px solid #D5D6D7;
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
        .gchzb{
          li{
            width: 600px;
            >span,p{
              width: calc(100%/6);
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
        height: 14px;
        overflow: hidden;
        i{
          color: #1CA4FA;
          margin-left: 10px;
        }
      }
    }
  }
</style>
