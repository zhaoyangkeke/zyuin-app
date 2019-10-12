/**
* ----月度施工计划完成情况
*/
<template>
  <div id="ydsgjhwcqk" style="height: 100%" v-loading="loading">
    <div class="header">
      <span class="headerTit">月度施工计划申报</span>
      <div class="header_option">
        <ul>
          <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
          <li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table">
      <div class="cha_xun">
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
                      :data="scope.row.sgjhwcmx"
                      border>
              <el-table-column prop="xmnr" label="工程内容"></el-table-column>
              <el-table-column align="center" prop="qdzh" label="起点桩号" show-overflow-tooltip>
                <template scope="scope">
                  <span v-if="scope.row.qdzh.toString().indexOf('.') >= 0">K{{scope.row.qdzh.toString().replace('.', '+')}}</span>
                  <span v-if="scope.row.qdzh.toString().indexOf('.') < 0">K{{scope.row.qdzh}}+000</span>
                  <!--<span>详情</span>-->
                </template>
              </el-table-column>
              <el-table-column align="center" prop="ezhh" label="终点桩号" show-overflow-tooltip>
                <template scope="scope">
                  <span v-if="scope.row.zdzh.toString().indexOf('.') >= 0">K{{scope.row.zdzh.toString().replace('.', '+')}}</span>
                  <span v-if="scope.row.zdzh.toString().indexOf('.') < 0">K{{scope.row.zdzh}}+000</span>
                </template>
              </el-table-column>
              <el-table-column prop="jhksrq" label="计划开始日期"></el-table-column>
              <el-table-column prop="jhjsrq" label="计划结束日期"></el-table-column>
              <el-table-column prop="yjgcl" label="预计工程量"></el-table-column>
              <el-table-column prop="sjksrq" label="实际开始日期"></el-table-column>
              <el-table-column prop="sjjsrq" label="实际完成日期"></el-table-column>
              <el-table-column prop="wcgcl" label="完成工程量"></el-table-column>
              <el-table-column prop="bz" label="备注"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="80">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="spzt" label="状态"  show-overflow-tooltip>
          <template scope="scope">
            <span style="color:#D34C42;cursor: pointer;text-align: center" v-if="scope.row.spzt==='未处理'" @click="shenhe(scope.row, scope.$index)">未处理</span>
            <span style="color:#454C53;text-align: center" v-if="scope.row.spzt==='不处理'">不处理</span>
            <span style="color:#454C53;text-align: center" v-if="scope.row.spzt==='已下发'">已下发</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="yf" label="月份" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="djbh" label="单据编号" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="htmc" label="项目名称" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="yhdwmc" label="养护单位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="gldw" label="管理单位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="tbr" label="填报人" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="tbrq" label="填报日期" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="tbdw" label="填报单位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="tbbm" label="填报部门" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="bz" label="备注" show-overflow-tooltip></el-table-column>
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
    <!--<el-dialog class="data-dialog el-updata-div" title="进度完成情况" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" @close="resetForm">-->
      <div class="tabArea"  v-if="showDetail"  @close="resetForm">
        <p class="tabAreaTit">
          <span class="titleclasschild" @click="showDetail = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer" @click="isShowDetail = false"></i></span>
          <span>进度完成情况</span>
        </p>
        <div class="SPState" v-if="addzb">
          <span class="iconSpan" @click="addzibiao"><i class="el-icon-edit-outline" title="添加" ></i>添加</span>
        </div>
        <!--<div class="closeBTN" @click="showDetail = false"><i class="icon iconfont icon-down"></i></div>-->
      <div class="dialog_warp">
        <ul class="zhubnr">
          <li>
            <span>单据编号</span>
            <p>
              <el-input size="mini" disabled type="text" v-model="lmshForm.djbh"></el-input>
            </p>
          </li>
          <li>
            <span>月份</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.yf"
                size="mini"
                type="month"
                :disabled="showxq"
                format="yyyy-MM"
                value-format="yyyy-MM"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>项目名称</span>
            <p>
              <el-select clearable :disabled="showxq" size="mini" style="width: 100%;" v-model="htbh" value-key="htbh" placeholder="" @change="selectHt">
                <el-option v-for="item in htList" :key="item.htbh" :label="item.htmc" :value="item"></el-option>
              </el-select>
            </p>
          </li>
          <li>
            <span>养护单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.yhdwmc"></el-input>
            </p>
          </li>
          <li>
            <span>填报人</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.tbr"></el-input>
            </p>
          </li>
          <li>
            <span>填报日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.tbrq"
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
            <span>填报单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.tbdw"></el-input>
            </p>
          </li>
          <li>
            <span>填报部门</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.tbbm"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>管理单位</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.gldw"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>备注</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.bz"></el-input>
            </p>
          </li>
          <div style="clear: both"></div>
        </ul>
        <div class="addzbsj">
          <i @click="addzb=!addzb" :class="addzb?'el-icon-remove-outline':'el-icon-circle-plus-outline'"></i>
        </div>
        <div class="zibnr" v-if="addzb" style="overflow-x: auto;overflow-y: hidden;">
          <div class="iconwarp">
            <!--<el-upload
              class="upload-demo"
              action=""
              style="float: left"
              multiple
              :limit="3"
              :on-change="ceshi">
              <i class="el-icon-download" title="导入"></i>
            </el-upload>
            <i class="el-icon-edit-outline" title="添加" @click="addzibiao"></i>-->
          </div>
          <ul>
            <li>
              <span>操作</span><span>工程内容</span><span>起点桩号</span><span>止点桩号</span><span>计划开始时间</span><span>计划完成时间</span><span>预计工程量</span><span>实际开始日期</span><span>实际完成日期</span><span>完成工程量</span><span>备注</span>
              <!--<p>
                <i class="el-icon-edit-outline" title="添加"></i><i class="el-icon-delete" title="删除"></i>
              </p>-->
            </li>
            <li v-for="(item, index) in lmshForm.sgjhwcmx" :key="index">
              <p>
                <i class="el-icon-delete" title="删除" @click="deletezibiao(index, item)"></i>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.xmnr"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.qdzh"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.zdzh"></el-input>
              </p>
              <p>
                <el-date-picker
                  style="width:100%"
                  v-model="item.jhksrq"
                  size="mini"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </p>
              <p>
                <el-date-picker
                  style="width:100%"
                  v-model="item.jhjsrq"
                  size="mini"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.yjgcl"></el-input>
              </p>
              <p>
                <el-date-picker
                  style="width:100%"
                  v-model="item.sjksrq"
                  size="mini"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </p>
              <p>
                <el-date-picker
                  style="width:100%"
                  v-model="item.sjjsrq"
                  size="mini"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.wcgcl"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.bz"></el-input>
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
      </div>
    <!--</el-dialog>-->
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
      showBtn:false,
      lmshForm: {
        tbr: '新月',
        tbdw: '甬台温施工单位',
        tbbm: '养护部',
        tbrq: this.formatDate(new Date()),
        sgjhwcmx: [{}]
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
      total: 10,
      personelForm: {},
      showDetail: false,
      multipleSelection: [],
      filedata: {
        id: 'ydsgwcqk' + new Date().getTime(),
        type: 'lyjc'
      },
      formId: '',
      htList: [],
      htbh: {}
    }
  },
  methods: {
    changeFile (file, fileList) {},
    showAdd () {
      this.showBtn = true
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      this.formId = 'lyjc' + new Date().getTime()
      this.lmshForm.sgjhwcmx[0].mid = this.formId
      this.lmshForm.djbh = this.formId
    },
    updateFormDia (row, index) {
      this.showBtn = true
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.index = index
      this.htbh = {
        htbh: row.htbh
      }
    },
    showBhFormDia (row) {
      this.showBtn = false
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.htbh = {
        htbh: row.htbh
      }
    },
    search (currentPage, pageSize) {
      this.showSearch = false
      if (this.searchForm.jcrq) {
        this.searchForm.ksrq = this.searchForm.jcrq[0]
        this.searchForm.jsrq = this.searchForm.jcrq[1]
      }

      this.$api.getWcSgjhAll('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {

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
      this.lmshForm.id = this.formId
      this.$api.addWcSgjh(this.lmshForm).then(res => {
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
    updateSubmit () {
      this.$api.upateWcSgjh(this.lmshForm).then(res => {
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
            djbharr = djbharr + item.id + ','
          })
          djbharr = djbharr.slice(0, djbharr.length - 1)
          this.$api.deleteWcSgjh('?ids=' + djbharr).then(res => {
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
        form.spzt = '已下发'
        this.$api.upateWcSgjh(form).then(res => {
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
    addzibiao () {
      this.lmshForm.sgjhwcmx.push({mid: this.lmshForm.id})
    },
    deletezibiao (index) {
      this.lmshForm.sgjhwcmx.splice(index, 1)
    },
    ceshi () {
      this.$message({
        type: 'error',
        message: '内容格式不符合要求'
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
        tbr: '新月',
        tbdw: '甬台温施工单位',
        tbbm: '养护部',
        sgjhwcmx: [{}]
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
      if (this.lmshForm.yf) {
        this.$api.rcyhXxrwgetCreateYhjdwcmxByYfAndHtbh('?yf=' + this.lmshForm.yf + '&htbh=' + value.htbh).then(resp => {
          this.loading = false
          if (resp.status !== 200) {
            this.$message({
              message: '出错了',
              type: 'error'
            })
          } else {
            this.lmshForm.sgjhwcmx = resp.data.data
            this.lmshForm.sgjhwcmx.map(item => {
              item.mid = this.lmshForm.djbh
            })
          }
        }).catch(e => {
          this.loading = false
        })
      }
      this.lmshForm.htbh = value.htbh
      this.lmshForm.htmc = value.htmc
      this.lmshForm.yhdwmc = value.yh_cbdw
      this.lmshForm.gldw = value.yh_gldw
      this.lmshForm.xmmc = value.yh_dwgc
    }
  },
  mounted () {
    this.$api.getHtxxRelatedAll('').then(res => {
      this.htList = res.data.data
    })
    this.search(1, 10)
    this.tableHeight = $('#ydsgjhwcqk')[0].offsetHeight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  #ydsgjhwcqk{
    position: relative;
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    overflow: auto;
    .gjzjje{
      input{
        height: 55px;
      }
    }
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
            /*width: 1100px;*/
            width: 100%;
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
              width: calc(100%/11);
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
              width: calc(100%/11);
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
