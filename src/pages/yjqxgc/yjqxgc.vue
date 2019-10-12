/**
* ----应急抢修工程
*/
<template>
  <div id="lkpdlmsh" style="height: 100%;position:relative;" v-loading="loading">
    <div class="header">
      <span class="headerTit">应急抢修工程</span>
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
            <el-form-item class="" label="单据编号" prop="lxbh">
              <!--<el-input v-model="searchForm.lxcode" size="mini" placeholder="请输入单据编号"></el-input>-->
              <el-select v-model="searchForm.djbh" size="mini">
                <el-option v-for="(item, index) in tableData" :key="index" :label="item.djbh"
                           :value="item.djbh"></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
          <!--<el-form-item style="margin-bottom: 0px" label="行车方向" prop="" class="">-->
          <!--<el-select size="mini"  class="" placeholder="请选择方向" v-model="searchForm.xcfx">-->
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

          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button size="mini" @click="search(1, 10)"
                       style="background-color: #DF4D4A;border-color:transparent;color: #fff">查询
            </el-button>
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
          type="selection"
          align="center"
          :selectable='selectable2'
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column align="left" sortable prop="djbh" label="单据编号" show-overflow-tooltip></el-table-column>
        <el-table-column align="left" sortable prop="gcmc" label="工程名称"></el-table-column>
        <el-table-column align="left" sortable prop="qxld" label="抢修路段"></el-table-column>
        <el-table-column align="left" sortable prop="fx" label="方向"></el-table-column>
        <el-table-column align="left" sortable prop="qdzh" label="起始桩号"></el-table-column>
        <el-table-column align="left" sortable prop="zdzh" label="止点桩号"></el-table-column>
        <el-table-column align="left" sortable prop="dllc" label="抢修道路(公里)"></el-table-column>
        <el-table-column align="left" sortable prop="fygs" label="费用估算(万元)"></el-table-column>
        <el-table-column align="left" sortable prop="ql" label="抢修桥梁"></el-table-column>
        <el-table-column align="left" sortable prop="spztZh" class-name="column-caoz" label="状态" width="100" style="cursor: pointer;">
          <!--<template scope="scope">-->
            <!--<span v-if="scope.row.spzt == '3501'" @click="updateStatus(scope.row)">{{scope.row.spztZh}}</span>-->
            <!--<span v-if="scope.row.spzt != '3501'">{{scope.row.spztZh}}</span>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="120">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" v-if="scope.row.spzt == '3501'"
                  @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" v-if="scope.row.spzt == '3501'" @click="updateStatus(scope.row)">推送</span>
          </template>
        </el-table-column>
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
    <!--<el-dialog class="data-dialog el-updata-div" title="添加" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" @close="resetForm">-->
    <!--<div class="dialog_warp">-->

    <div class="tabArea" v-if="showDetail">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild" @click="showDetail = false"><i
            class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>返回</span>
        </p>
      </div>
      <div v-show="isadd">
        <div style="font-size: 0;margin-left: -40px;">
          <p class="addJLD"><span class="addJLD_tit2">单据编号 ：</span>
            <el-input size="mini" type="text" v-model="lmshForm.djbh"></el-input>
          </p>
          <p class="addJLD"><span class="addJLD_tit2">工程名称 ：</span>
            <el-input size="mini" type="text" v-model="lmshForm.gcmc"></el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">抢修路段 ：</span>
            <el-select clearable size="mini" :disabled="showxq" v-model="ldobj" value-key="ldcode" placeholder=""
                       @change="selectld">
              <el-option v-for="(items,index) in qmbbOptions" :key="index" :label="items.ldname"
                         :value="items"></el-option>
            </el-select>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">方向 ：</span>
            <el-select size="mini" class="" placeholder="请选择方向" :key="index" v-model="lmshForm.fx">
              <el-option :label="item.mjmc" :value="item.mjbm" v-for="(item, index) in fxList"></el-option>
            </el-select>
          </p>
          <p class="addJLD"><span class="addJLD_tit2">起始桩号 ：</span>
            <el-input size="mini" type="text" v-model="lmshForm.qdzh"></el-input>
          </p>
          <p class="addJLD"><span class="addJLD_tit2">止点桩号 ：</span>
            <el-input size="mini" type="text" v-model="lmshForm.zdzh"></el-input>
          </p>
          <p class="addJLD"><span class="addJLD_tit2">抢修道路里程(公里) ：</span>
            <el-input size="mini" type="text" v-model="lmshForm.dllc"></el-input>
          </p>
          <p class="addJLD"><span class="addJLD_tit2">费用估算(万元) ：</span>
            <el-input size="mini" type="text" v-model="lmshForm.fygs"></el-input>
          </p>
          <p class="addJLD"><span class="addJLD_tit2">抢修桥梁 ：</span>
            <el-input size="mini" type="text" v-model="lmshForm.ql"></el-input>
          </p>
          <p class="addJLD"><span class="addJLD_tit2">抢修隧道 ：</span>
            <el-input size="mini" type="text" v-model="lmshForm.sd"></el-input>
          </p>
          <p class="addJLD"><span class="addJLD_tit2">联系人 ：</span>
            <el-input size="mini" type="text" v-model="lmshForm.lxr"></el-input>
          </p>
          <p class="addJLD"><span class="addJLD_tit2">联系方式 ：</span>
            <el-input size="mini" type="text" v-model="lmshForm.lxfs"></el-input>
          </p>
          <p class="addJLD"><span class="addJLD_tit2">管理单位 ：</span>
            <el-input size="mini" type="text" v-model="lmshForm.gldwmc" disabled></el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">施工单位 ：</span>
            <!--<el-input size="mini" type="text" v-model="lmshForm.sgdwmc"> </el-input>-->
            <el-autocomplete
              class="inline-input"
              size="mini"
              v-model="lmshForm.sgdwmc"
              :fetch-suggestions="querySearchMC"
              @select="handleSelectMC($event, 0)"
              placeholder="请输入项目名称"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.gysmc }}</div>
              </template>
              <i slot="suffix" @click="showDialog('mc')" class="icon iconfont icon-xiangqing1"></i>
            </el-autocomplete>
          </p>
          <!--<p class="addJLD"><span class="addJLD_tit2">编制单位 ：</span><el-input size="mini" type="text" v-model="lmshForm.bzdwmc"> </el-input></p>-->
          <p class="addJLD"><span class="addJLD_tit2">编制日期 ：</span>
            <el-date-picker
              v-model="lmshForm.bzrq"
              size="mini"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">工程描述 ：</span>
            <el-input size="mini" type="text" v-model="lmshForm.gcms"></el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">填报人 ：</span>
            <el-input size="mini" type="text" v-model="lmshForm.tbr"></el-input>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">填报日期 ：</span>
            <el-date-picker
              v-model="lmshForm.tbrq"
              size="mini"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </p>
          <p style="padding-left: 90px;font-size: 13px">
            <span style="">附件 ：</span>
            <el-upload
              style="display: inline-block;width: 130px;"
              class="upload-demo"
              :action="$api.uploadFiles"
              multiple
              ref="uploada"
              :disabled="showxq"
              :file-list="fileList"
              :limit="2">
              <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
            </el-upload>
          </p>
        </div>
      </div>
      <div v-show="showxq">
        <div style="font-size: 0;margin-left: -40px;">
          <p class="addJLD">
            <span class="addJLD_tit2">单据编号 ：</span>
            <span>{{lmshForm.djbh}}</span></p>
          <p class="addJLD">
            <span class="addJLD_tit2">工程名称 ：</span>
            <span>{{lmshForm.gcmc}}</span></p>
          <p class="addJLD">
            <span class="addJLD_tit2">抢修路段 ：</span>
            <span>{{lmshForm.qxld}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">方向 ：</span>
            <span v-if="lmshForm.fx == '0301'">上行</span>
            <span v-if="lmshForm.fx == '0302'">下行</span>
            <span v-if="lmshForm.fx == '0303'">全幅</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">起始桩号 ：</span>
            <span>{{lmshForm.qdzh}}</span></p>
          <p class="addJLD">
            <span class="addJLD_tit2">止点桩号 ：</span>
            <span>{{lmshForm.zdzh}}</span></p>
          <p class="addJLD">
            <span class="addJLD_tit2">抢修道路里程(公里) ：</span>
            <span>{{lmshForm.dllc}}</span></p>
          <p class="addJLD">
            <span class="addJLD_tit2">费用估算(万元) ：</span>
            <span>{{lmshForm.fygs}}</span></p>
          <p class="addJLD">
            <span class="addJLD_tit2">抢修桥梁 ：</span>
            <span>{{lmshForm.ql}}</span></p>
          <p class="addJLD">
            <span class="addJLD_tit2">抢修隧道 ：</span>
            <span>{{lmshForm.sd}}</span></p>
          <p class="addJLD">
            <span class="addJLD_tit2">联系人 ：</span>
            <span>{{lmshForm.lxr}}</span></p>
          <p class="addJLD">
            <span class="addJLD_tit2">联系方式 ：</span>
            <span>{{lmshForm.lxfs}}</span></p>
          <p class="addJLD">
            <span class="addJLD_tit2">管理单位 ：</span>
            <span>{{lmshForm.gldwmc}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">施工单位 ：</span>
            <span>{{lmshForm.sgdwmc}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">编制日期 ：</span>
            <span>{{lmshForm.bzrq}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">工程描述 ：</span>
            <span>{{lmshForm.gcms}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">填报人 ：</span>

            <span>{{lmshForm.tbr}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">填报日期 ：</span>
            <span>{{lmshForm.tbrq}}</span>
          </p>
          <p style="padding-left: 90px;font-size: 13px">
            <span style="">附件 ：</span>
            <span></span>
          </p>
        </div>
      </div>


      <!--    <ul class="zhubnr">
            <li>
              <span>单据编号</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.djbh"></el-input>
              </p>
            </li>
            <li>
              <span>工程名称</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.gcmc"></el-input>
              </p>
            </li>
            <li>
              <span>抢修路段</span>
              <p>
                <el-select clearable size="mini" :disabled="showxq" v-model="ldobj" value-key="ldcode" placeholder="" @change="selectld">
                  <el-option v-for="items in qmbbOptions" :key="items.ldcode" :label="items.ldname" :value="items"></el-option>
                </el-select>
                &lt;!&ndash;<el-input size="mini" type="text" v-model="lmshForm.qxld"></el-input>&ndash;&gt;
              </p>
            </li>
            <li>
              <span>方向</span>
              <p>
                <el-select size="mini"  class="" placeholder="请选择方向" v-model="lmshForm.fx">
                  <el-option label="上行" value="上行"></el-option>
                  <el-option label="下行" value="下行"></el-option>
                </el-select>
              </p>
            </li>
            <li>
              <span>起始桩号</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.qdzh"></el-input>
              </p>
            </li>
            <li>
              <span>止点桩号</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.zdzh"></el-input>
              </p>
            </li>
            <li>
              <span>抢修道路里程(公里)</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.dllc"></el-input>
              </p>
            </li>
            <li>
              <span>费用估算(万元)</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.fygs"></el-input>
              </p>
            </li>
            <li>
              <span>抢修桥梁</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.ql"></el-input>
              </p>
            </li>
            <li>
              <span>抢修隧道</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.sd"></el-input>
              </p>
            </li>
            <li>
              <span>联系人</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.lxr"></el-input>
              </p>
            </li>
            <li>
              <span>联系方式</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.lxfs"></el-input>
              </p>
            </li>
            <li>
              <span>管理单位</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.gldwmc"></el-input>
              </p>
            </li>
            <li>
              <span>施工单位</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.sgdwmc"></el-input>
              </p>
            </li>
            <li>
              <span>编制单位</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.bzdwmc"></el-input>
              </p>
            </li>
            <li>
              <span>编制日期</span>
              <p>
                <el-date-picker
                  style="width:100%"
                  v-model="lmshForm.bzrq"
                  size="mini"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </p>
            </li>
            <li class="text_line">
              <span>工程描述</span>
              <p>
                <el-input size="mini" type="text" v-model="lmshForm.gcms"></el-input>
              </p>
            </li>
            <li class="text_line">
              <span>附件</span>
              <p>
                <el-upload
                  class="upload-demo"
                  :action="$api.uploadFiles"
                  multiple
                  ref="uploada"
                  :disabled="showxq"
                  :file-list="fileList"
                  :limit="2">
                  <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
                </el-upload>
              </p>
            </li>
            <div style="clear: both"></div>
          </ul>-->
      <div class="dialog_footer" v-if="!showxq">
        <el-button size="mini" v-if="isaddbtn" style="background-color: #DF4D4A;border-color:transparent;color: #fff"
                   class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存
        </el-button>
        <el-button size="mini" v-if="!isaddbtn" style="background-color: #DF4D4A;border-color:transparent;color: #fff"
                   class="dialog-button bao_cun" :loading="submitLoading" @click="updateSubmit">保存
        </el-button>
        <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao" style="margin-right: 20px">取消
        </el-button>
      </div>
    </div>
    <!--搜索弹窗-->
    <gysDialog :dialogData="dialogData"
               :dialogTableTit="dialogTableTit"
               :datatypes="datatypes"
               :dialogVisible="dialogVisible"
               @searchXMMC="searchXMMC"
               @closeDialog="closeDialog">
    </gysDialog>
  </div>
</template>

<script>
  import gysDialog from '@/components/gysDialog.vue'

  export default {
    components: {gysDialog},
    props: {
      hasMenu: {
        type: Boolean,
        default: false
      },
      clickHide: {
        type: Function
      }
    },
    data() {
      return {
        isaddbtn: false,
        datatypes: '',
        dialogData: [],
        dialogVisible: false,
        dialogTableTit: {
          gysmc: '供应商',
          gysbm: '供应商编码'
        },
        gysList: [],
        fxList: [],
        lmshForm: {
          gldwmc: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgName
        },
        ldobj: {},
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
        total: 0,
        fileList: [],
        personelForm: {},
        showDetail: false,
        multipleSelection: [],
        userInfo: {
          orgbh: undefined,
          gldwid: undefined,
          orgmc: undefined,
          bmbh: undefined,
          bmid: undefined,
          bmmc: undefined,
          yhbm: undefined,
          yhid: undefined,
          yhmc: undefined,
        },
      }
    },
    methods: {
      initUser() {
        let userInfo = JSON.parse(localStorage.getItem('userMsg'))[0]
        if (userInfo) {

          if (userInfo) {
            this.userInfo.yhbm = userInfo.userCode
            this.userInfo.yhid = userInfo.userId
            this.userInfo.yhmc = userInfo.userName
            let deptList = userInfo.deptList
            let bminfo = deptList[0]

            if (bminfo) {
              this.userInfo.bmbh = bminfo.deptCode
              this.userInfo.bmid = bminfo.deptId
              this.userInfo.bmmc = bminfo.deptName
              let org = bminfo.org
              if (org) {
                this.userInfo.orgbh = org.orgCode
                this.userInfo.gldwid = org.orgId
                this.userInfo.orgmc = org.orgName
              }
            }
          }

        }
      },
      getfilebyid() {
        this.$api.getFilesDataById('?id=' + this.lmshForm.id).then(res => {
          this.fileList = res.data.data
          this.fileList.map(item => {
            item.name = item.file_yname
          })
        })
      },
      handleRemove(fileid) {
        this.$api.deleteFilesById('?ids=' + fileid).then(res => {
        })
      },
      rukufile() {
        let uploadFiles = []
        console.log(this.$refs.uploada.uploadFiles, 6666)
        if (this.$refs.uploada.uploadFiles.length > 0) {
          this.$refs.uploada.uploadFiles.map(item => {
            if (item.response) {
              item.response.data.file_id = this.lmshForm.id
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
      changeFile(file, fileList) {
      },
      showAdd() {
        this.showDetail = true
        this.isaddbtn = true
        this.showxq = false
        this.isadd = true
        this.formId = 'yjqxgc' + new Date().getTime()
        this.lmshForm.djbh = this.formId
        this.lmshForm.bzrq = this.formatDate(new Date())
      },
      updateFormDia: function (row, index) {
        this.showDetail = true
        this.isaddbtn = false
        this.isadd = true
        this.showxq = false

        this.lmshForm = JSON.parse(JSON.stringify(row))
        this.index = index
        this.htbh = {
          htbh: row.htbh
        }
        this.getfilebyid()
      },
      showBhFormDia(row) {
        this.showDetail = true
        this.isadd = false
        this.showxq = true
        this.lmshForm = JSON.parse(JSON.stringify(row))
        this.htbh = {
          htbh: row.htbh
        }
        // console.log(this.lmshForm.lyjcmxb, 999)
        // this.lmshForm.lyjcmxb.map(item => {
        //   item.htlynr = {
        //     LYJC_NR: item.jcnr
        //   }
        // })
        this.getfilebyid()
      },
      search(currentPage, pageSize) {
        let self = this
        this.showSearch = false
        if (this.searchForm.jcrq) {
          this.searchForm.ksrq = this.searchForm.jcrq[0]
          this.searchForm.jsrq = this.searchForm.jcrq[1]
        }
        console.log(self.userInfo, 23)
        let userParam = config.userInfo
        console.log(this.searchForm, 245)
        let {djbh, ksrq, jsrq} = this.searchForm
        this.$api.yjqxgetYjqxgcList({
          pageNum: currentPage,
          pageSize,
          gldwid: self.userInfo.gldwid,
          daZzid: userParam.deptList[0].org.orgId,
          djbh: djbh,
          ksrq: ksrq,
          jsrq: jsrq
        }).then(resp => {
          this.loading = false
          if (resp.code == 1) {
            this.tableData = resp.data.list
            this.total = resp.data.total
          } else {
            this.tableData = []
            this.total = 0
          }
        }).catch(e => {
          this.loading = false
        })
      },
      addSubmit() {
        // this.handleRemove(this.lmshForm.id)
        // this.lmshForm.id = this.formId
        let self = this
        let userparamobj = config.userInfo
        let userparam = {}
        userparam.daBmbm = userparamobj.deptList[0].deptCode
        userparam.daBmid = userparamobj.deptList[0].deptId
        userparam.daBmmc = userparamobj.deptList[0].deptName
        userparam.daYhbm = userparamobj.userCode
        userparam.daYhid = userparamobj.userId
        userparam.daYhmc = userparamobj.userName
        userparam.daZzid = userparamobj.deptList[0].org.orgId
        userparam.daZzbh = userparamobj.deptList[0].org.orgCode
        userparam.daZzmc = userparamobj.deptList[0].org.orgName
        self.lmshForm.gcfl = '02010403'
        self.lmshForm.gldwid = userparam.daZzid
        self.lmshForm.gldwbh = userparam.daZzbh
        self.lmshForm.bzdwid = userparam.daZzid
        self.lmshForm.bzdwmc = userparam.daZzmc
        self.lmshForm.cgfx = '0101'
        self.lmshForm.ywlx = '0101'
        Object.assign(self.lmshForm, userparam)
        this.$api.yjqxaddYjqxgc(this.lmshForm).then(res => {
          if (res.data.code === 1) {
            this.rukufile()
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      },
      updateSubmit() {
        this.handleRemove(this.lmshForm.id)
        this.$api.yjqxeditYjqxgc(this.lmshForm).then(res => {
          if (res.data.code === 1) {
            this.rukufile()
            this.$message({
              type: 'success',
              message: '编辑成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      },
      deleteData() {
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
            this.$api.yjqxdelYjqxgcByIds('?ids=' + djbharr).then(res => {
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
      shenhe(row, index) {
        this.$confirm('是否通过审核？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let form = JSON.parse(JSON.stringify(row))
          form.spzt = '已下发'
          this.$api.yjqxeditYjqxgc(form).then(res => {
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
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.search(this.currentPage, this.pageSize)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.search(this.currentPage, this.pageSize)
      },
      resetForm() {
        this.showDetail = false
        this.lmshForm = {}
      },
      selectld(value) {
        this.lmshForm.ldcode = value.ldcode
        this.lmshForm.qxld = value.ldname
      },
      getQmldbb() {
        if (this.qmbbOptions.length > 0) {
          return
        }
        this.$api.commongetLd('?bmCode=0101').then(resp => {
          if (resp.status !== 200) {
            this.$message({
              message: '出错了',
              type: 'error'
            })
          } else if (resp.data.code === 1) {
            this.qmbbOptions = resp.data.data
          }
        }).catch(e => {
        })
      },
      // 方向枚举
      getfxList() {
        this.$api.jdwhxjwxgetXjType2({mjlxbm: '03'}).then(res => {
          if (res.code != 1) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            if (res.data && res.data.length !== 0) {
              this.fxList = res.data
            } else {
              this.fxList = []
            }
          }
        })
      },
      // 获取供应商数据
      getgysData() {
        this.$api.getgysxx({pageNum: '1', pageSize: '10'}).then(res => {
          if (res.code != 1) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            if (res.data && res.data.length !== 0) {
              this.gysList = res.data
            }
          }
        })
      },
      // 远程搜索供应商名称
      querySearchMC(queryString, cb) {
        let restaurants = this.gysList
        let results = queryString ? restaurants.filter(this.createFilter(queryString, 'gysmc')) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString, val) {
        return (restaurant) => {
          return (restaurant[val].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelectMC(event) {
        console.log(event, 112)
        this.lmshForm.sgdwmc = event.gysmc
        this.lmshForm.sgdwid = event.gyspk
        this.lmshForm.sgdwbh = event.gysbm
      },
      // 打开搜索弹窗
      showDialog(bol) {
        this.dialogVisible = true
        this.datatypes = bol
        this.dialogData = this.gysList
      },
      searchXMMC(val) {
        // this.$api.getXmmcListt({xmmc:val}).then(res=>{
        //   if(res.code == 1){
        //     this.dialogData = res.data&&res.data.length?res.data:[]
        //   }else{
        //     this.dialogData = []
        //   }
        // })
        console.log(val, '供应商信息')
      },
      closeDialog(val) {
        this.dialogVisible = false
        console.log(val, 113)
        if (val) {
          this.lmshForm.sgdwmc = val.gysmc
          this.lmshForm.sgdwid = val.gyspk
          this.lmshForm.sgdwbh = val.gysbm
        }
      },
      // 点击状态修改状态
      updateStatus(row) {
        this.$confirm('是否通过审核？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let form = JSON.parse(JSON.stringify(row))
          form.spzt = '3502'
          this.$api.updateYjqxSfztByIds({spzt: form.spzt, ids: row.id}).then(res => {
            if (res.code == 1) {
              this.$message({
                type: 'success',
                message: '审核通过!'
              })
              this.search(this.currentPage, this.pageSize)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消审核'
          })
        })
      },
      selectable2: function (row, index) { // 禁用第四个
        if (row.spzt !== '3501') {
          return false
        } else {
          return true
        }
      }
    },
    mounted() {
      this.initUser()
      this.search(1, 10)
      this.getQmldbb()
      this.tableHeight = $('#lkpdlmsh')[0].offsetHeight
      this.getfxList()
      this.getgysData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #lkpdlmsh {
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    overflow: auto;
    .header {
    }
    .conter_table {
      height: calc(100% - 91px);
      min-height: 300px;
      padding: 0 15px;
    }
    .footer {
      height: 45px;
      background: #fff;
      position: relative;
      z-index: 100;
    }
    .dialog_warp {
      background: #fff;
      /*padding: 20px 40px;*/
      .zhubnr {
        li {
          width: 50%;
          height: 32px;
          float: left;
          border: 1px solid #D5D6D7;
          border-bottom: none;
          color: #52575D !important;
          font-size: 12px;
          &:nth-of-type(2n+1) {
            border-right: none;
          }
          &:nth-last-of-type(1) {
            border-bottom: 1px solid #D5D6D7;
          }
          > span {
            width: 100px;
            display: inline-block;
            height: 100%;
            line-height: 31px;
            text-indent: 1em;
            border-right: 1px solid #D5D6D7;
            background: #F7F8F9;
            float: left;
          }
          p {
            width: calc(100% - 100px);
            height: 100%;
            float: left;
            .el-input__inner {
              border: none;
              text-align: center;
            }
          }
          .radio_line {
            /*span{
              display: inline-block;
              width: 50%;
            }*/
            padding: 0 5px;
            .el-radio__label {
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
        .tow_line, .three_line, .four_line {
          width: 100%;
          border-right: 1px solid #D5D6D7 !important;
          .el-input--mini {
            width: calc(100% - 60px);
          }
          p {
            > span {
              border-bottom: 1px solid #D5D6D7;
              &:last-child {
                border-bottom: none;
              }
              i {
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
        .text_line {
          width: 100%;
          border-right: 1px solid #D5D6D7 !important;
          min-height: 64px;
          height: auto;
          > span {
            min-height: 64px;
            height: 100% !important;
          }
          p {
            min-height: 64px;
          }
          .el-upload-list__item {
            border: none;
          }
        }
      }
      .zibnr {
        li {
          width: 25%;
          height: 64px;
          float: left;
          border: 1px solid #D5D6D7;
          color: #52575D !important;
          font-size: 12px;
          border-right: none;
          &:nth-last-of-type(1) {
            border-right: 1px solid #D5D6D7;
          }
          > span {
            width: 100%;
            display: inline-block;
            height: 50%;
            line-height: 31px;
            text-align: center;
            background: #F7F8F9;
            border-bottom: 1px solid #D5D6D7;
          }
          p {
            width: calc(100%);
            height: 50%;
            float: left;
            .el-input__inner {
              border: none;
              text-align: center;
            }
          }
        }
      }
      .addzbsj {
        text-align: center;
        color: #1CA4FA;
        padding: 10px 0;
      }
    }
  }
</style>
