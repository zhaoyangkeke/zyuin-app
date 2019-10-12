/**
* ----工程质量检查整改及复查
*/
<template>
  <div id="lkpdlmsh" style="height: 100%" v-loading="loading">
    <div class="header" v-show="!showDetail">
      <span class="headerTit">工程质量检查整改及复查</span>
      <div class="header_option">
        <!--<div class="jianlimb" @click="showAdd()"><i class="el-icon-download"> 填写工程整改</i></div>-->
        <ul>
          <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
          <li @click="showAdd()" v-if="!outside"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()" v-if="!outside"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table" v-show="!showDetail">
      <div class="chaxun">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">

          <el-form-item style="margin-bottom: 0;" label="项目名称" prop="" class="">
            <el-autocomplete
              class="inline-input"
              size="mini"
              v-model="searchForm.xmmc"
              :fetch-suggestions="querySearchMC"
              @select="handleSelectMC($event, 1)"
              placeholder="请输入项目名称"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.XMMC }}</div>
              </template>
              <i slot="suffix" @click="showDialog('mc')" class="icon iconfont icon-xiangqing1"></i>
            </el-autocomplete>
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
            <el-button size="mini" @click="search(1, 10)"
                       style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询
            </el-button>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button @click.native="resizeDate" size="mini">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
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
          :selectable="onSeleteState"
          width="60">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column align="left" prop="gcmc" label="项目名称" sortable show-overflow-tooltip></el-table-column>
        <!-- <el-table-column align="left" prop="htbh" label="项目编号" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="djbh" label="单据名称" sortable show-overflow-tooltip></el-table-column> -->
        <el-table-column align="left" prop="jcxs" label="检查形式" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="gcbw" label="项目部位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="cbdw" label="承包单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="gldw" label="管理单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="gcnr" label="项目内容" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="bzdw" label="编制单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="jcrq" label="检查日期" width="100" sortable
                         show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="bzrq" label="编制日期" width="100" sortable
                         show-overflow-tooltip></el-table-column>
        <el-table-column align="left" label="状态" width="80" sortable>
          <template scope="scope">
            <!-- <span style="color:#D34C42;cursor: pointer;text-align: left" v-if="scope.row.spzt==='未处理'||scope.row.spzt===null" @click="shenhe(scope.row, scope.$index)">未处理</span>
            <span style="color:#00a2fd;text-align: left" v-if="scope.row.spzt==='已下发'">{{scope.row.spzt}}</span> -->
            <!-- && !outside -->
            <span style="color:#D34C42;text-align: left" v-if="scope.row.spzt === '3401'">未下发</span>
            <span style="color:#D34C42;text-align: left" v-if="scope.row.spzt === '3402'">已下发</span>
            <span style="color:#D34C42;text-align: left" v-if="scope.row.spzt === '3403'">已回复</span>
            <span style="color:#D34C42;text-align: left" v-if="scope.row.spzt === '3404'">已验收</span>
            <span style="color:#D34C42;text-align: left" v-if="scope.row.spzt === '3405'">已打回</span>
          </template>
        </el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="120">
          <template scope="scope">

             <span
               style="color:#00a2fd;cursor: pointer;text-align: left"
               v-if="scope.row.spzt === '3401' && !outside"
               @click="updateFormDia(scope.row, scope.$index,'edit')">
              编辑
            </span>

            <span
              style="color:#00a2fd;cursor: pointer;text-align: left"
              v-if="scope.row.spzt === '3401' && !outside"
              @click="shenhe(scope.row, scope.$index)">
              下发
            </span>

            <!-- v-if="outside" -->
            <span
              style="color:#00a2fd;cursor: pointer;text-align: left"
              v-if="scope.row.spzt === '3402' && outside"
              @click="updateFormDia(scope.row, scope.$index,'rectification')">
              整改
            </span>

            <span
              style="color:#00a2fd;cursor: pointer;text-align: left"
              v-if="scope.row.spzt === '3403' && !outside"
              @click="updateFormDia(scope.row, scope.$index,'monitor')">
              验收
            </span>

            <span style="color:#00a2fd;cursor: pointer;text-align: left"
                  @click="showBhFormDia(scope.row, 'details')">详情</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <footer class="footer" v-show="!showDetail">
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


    <div class="tabArea" v-if="showDetail" @close="resetForm">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild" @click="resetForm"><i class="icon iconfont icon-arrow-left titleclasschild"
                                                              style="cursor: pointer"></i></span>
          <span>工程质量检查整改及复查</span>
        </p>

        <div v-show="!showxq" class="SPState">
          <!-- monitor 验收 edit 编辑 rectification 整改 stateType -->
          <el-button size="mini" class="minibtn" v-if="isadd && stateType == 'add'" :loading="submitLoading"
                     @click="addSubmit('lmshForm', 'add');isxmmcOfadd = 0"
                     style="background: #DF4D4A; border-color:transparent;color: #fff;">新增保存
          </el-button>
          <el-button
            size="mini"
            v-if="!isadd && stateType == 'edit'"
            type="primary"
            class="minibtn"
            :loading="submitLoading"
            @click="updateSubmit('lmshForm', 'edit');isxmmcOfadd = 0">
            编辑保存
          </el-button>
          <el-button size="mini" class="minibtn" v-if="!isadd && stateType == 'rectification'" :loading="submitLoading"
                     @click="updateSubmit('lmshForm', 'rectification');isxmmcOfadd = 0"
                     style="background: #DF4D4A; border-color:transparent;color: #fff;">整改保存
          </el-button>
          <!-- 验收保存 -->
          <el-button size="mini" class="minibtn" v-if="!isadd && stateType == 'monitor'" :loading="submitLoading"
                     @click="updateSubmit('lmshForm', 'monitor');isxmmcOfadd = 0"
                     style="background: #DF4D4A; border-color:transparent;color: #fff;">验收保存
          </el-button>
          <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao" style="margin-right: 20px">取消
          </el-button>
        </div>

      </div>


      <div v-show="isseedetail == 0 || isseedetail == 2">
        <div style="padding-left: 15px;">
          <el-form :model="lmshForm" :rules="jldModelRules" ref="lmshForm" label-width="150px">

            <el-form-item class="addJLD" label="单据名称">
              <!--<el-input  v-model="lmshForm.djbh" size="mini"  placeholder="请输入内容" disabled></el-input>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.djbh}}</label>
            </el-form-item>

            <!--<el-form-item class="addJLD" label="项目名称" prop="htmc">
              <el-select
              v-model="lmshForm.htmc"
              value-key="xmmc"
              filterable
              placeholder="请选择"
              @change="selectHt"
              :disabled="isseedetail == 2"
              size="mini">
                <el-option
                  v-for="(item, index) in htList"
                  :key="index"
                  :label="item.xmmc"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>-->


            <el-form-item label="项目名称" prop="" class="addJLD">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px" v-if="isseedetail == 2">{{lmshForm.gcmc}}</label>
              <el-autocomplete
                v-else
                class="inline-input"
                size="mini"
                v-model="lmshForm.gcmc"
                :fetch-suggestions="querySearchMC"
                @select="handleSelectMC($event, 0)"
                placeholder="请输入项目名称"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.XMMC }}</div>
                </template>
                <i slot="suffix" @click="showDialog('mc')" class="icon iconfont icon-xiangqing1"></i>
              </el-autocomplete>
            </el-form-item>


            <el-form-item class="addJLD" label="合同编号">
              <!--<el-input  v-model="lmshForm.htbh" size="mini"  placeholder="请输入内容"  disabled></el-input>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.htbh}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="管理单位">
              <!--<el-input  v-model="lmshForm.gldw" size="mini"  placeholder="请输入内容" disabled></el-input>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.gldw}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="承包单位">
              <!--<el-input  v-model="lmshForm.cbdw" size="mini"  placeholder="请输入内容" disabled></el-input>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.cbdw}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="检查日期" prop="jcrq">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px" v-if="isseedetail === 2">{{lmshForm.jcrq}}</label>
              <el-date-picker
                v-else
                :disabled="isseedetail === 2"
                v-model="lmshForm.jcrq"
                size="mini"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>

            <el-form-item class="addJLD" label="检查形式" prop="jcxs">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px" v-if="isseedetail === 2">{{lmshForm.jcxs}}</label>
              <el-input v-else v-model="lmshForm.jcxs" size="mini" placeholder="请输入内容"
                        :disabled="isseedetail === 2"></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="工程部位" prop="gcbw">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px" v-if="isseedetail === 2">{{lmshForm.gcbw}}</label>
              <el-input v-else v-model="lmshForm.gcbw" size="mini" placeholder="请输入内容"
                        :disabled="isseedetail === 2"></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="编制单位" prop="bzdw">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px" v-if="isseedetail === 2">{{lmshForm.bzdw}}</label>
              <el-input v-else v-model="lmshForm.bzdw" size="mini" placeholder="请输入内容"
                        :disabled="isseedetail === 2"></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="编制日期" prop="bzrq">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px" v-if="isseedetail === 2">{{lmshForm.bzrq}}</label>
              <el-date-picker
                v-else
                :disabled="isseedetail === 2"
                v-model="lmshForm.bzrq"
                size="mini"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>


            <div style="width: 70%;">
              <el-form-item class="addJLD-textarea" label="工程内容" prop="gcnr">
                <label style="padding-left: 1.168em;color: #606266;font-size: 13px" v-if="isseedetail === 2">{{lmshForm.gcnr}}</label>
                <el-input v-else type="textarea" v-model="lmshForm.gcnr" :disabled="isseedetail === 2"
                          style="width: 100%;"></el-input>
              </el-form-item>

              <el-form-item class="addJLD-textarea" label="整改意见">
                <label style="padding-left: 1.168em;color: #606266;font-size: 13px" v-if="isseedetail === 2">{{lmshForm.zgyj}}</label>
                <el-input v-else type="textarea" v-model="lmshForm.zgyj" :disabled="isseedetail === 2"
                          style="width: 100%;"></el-input>
              </el-form-item>

              <el-form-item class="addJLD" label="是否整改" v-if="stateType !== 'rectification'">
                <el-radio-group v-model="lmshForm.iszg" :disabled="stateType !== 'add' && stateType !== 'edit'">
                  <el-radio label="是"></el-radio>
                  <el-radio label="否"></el-radio>
                </el-radio-group>
              </el-form-item>

              <!-- monitor 验收 edit 编辑 rectification 整改 stateType -->
              <el-form-item class="addJLD-textarea" label="整改情况" v-if="isseedetail === 2">
                <label style="padding-left: 1.168em;color: #606266;font-size: 13px"
                       v-if="stateType !== 'rectification'">{{lmshForm.zgqk}}</label>
                <el-input type="textarea" v-model="lmshForm.zgqk" :disabled="stateType !== 'rectification'" v-else
                          style="width: 100%;"></el-input>
              </el-form-item>

              <el-form-item class="addJLD-textarea" label="整改情况" v-else>
                <el-input type="textarea" v-model="lmshForm.zgqk" v-if="stateType === 'rectification'"
                          style="width: 60%;"></el-input>
                <!-- <el-input type="textarea"   v-model="lmshForm.zgqk" v-if="stateType == 'rectification'"  style="width: 60%;"></el-input> -->
                <el-input type="textarea" v-model="lmshForm.zgqk" v-else
                          :disabled="lmshForm.iszg ==='是' || stateType === 'monitor'" style="width: 100%;"></el-input>
              </el-form-item>

              <!-- label-width="200px" -->
              <el-form-item class="addJLD-textarea" label="整改问题复查" v-if="stateType !== 'rectification'">
                <el-input type="textarea" v-model="lmshForm.fc" :disabled="stateType !== 'monitor'"
                          style="width: 100%;display: block;"></el-input>
              </el-form-item>
            </div>

            <div v-if="!outside">
              <el-form-item class="addJLD" label="附件" v-if="stateType === 'add' || stateType === 'edit'">
                <el-upload
                  class="upload-demo"
                  :disabled="outside"
                  :action="$api.uploadFiles"
                  multiple
                  ref="uploada"
                  :fileList="fileList"
                  :on-success="handleUploadFile"
                  :on-preview="preview"
                  :on-remove="removeFile">
                  <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
                </el-upload>
              </el-form-item>

              <el-form-item class="addJLD" v-else label="附件">
                <ul class="fjlist" style="margin-left: 15px;">
                  <li class="file_li" :key="index" v-for="(file, index) in fileList" @click="openFile(file)">
                    <a><i aria-hidden="true"></i>{{file.name}}</a>
                  </li>
                </ul>
              </el-form-item>
            </div>

            <el-form-item class="addJLD" v-else label="附件">
              <ul class="fjlist" style="margin-left: 15px;">
                <li class="file_li" :key="index" v-for="(file, index) in fileList" @click="openFile(file)">
                  <a><i aria-hidden="true"></i>{{file.name}}</a>
                </li>
              </ul>
            </el-form-item>

          </el-form>
        </div>


        <!-- <div class="dialog_footer" v-if="!showxq">
          <el-button size="mini" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit('lmshForm')">保存</el-button>
          <el-button size="mini" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit('lmshForm')">保存</el-button>
          <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div> -->

      </div>

      <div v-show="showxq">
        <div style="padding-left: 50px;">
          <p class="addJLD">
            <span class="addJLD_tit2">单据名称 ：</span>
            <span>{{lmshForm.djbh}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">项目名称 ：</span>
            <span>{{lmshForm.gcmc}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">合同编号 ：</span>
            <span>{{lmshForm.htbh}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">管理单位 ：</span>
            <span>{{lmshForm.gldw}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">承包单位 ：</span>
            <span>{{lmshForm.cbdw}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">检查日期 ：</span>
            <span>{{lmshForm.jcrq}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">检查形式 ：</span>
            <span>{{lmshForm.jcxs}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">工程部位 ：</span>
            <span>{{lmshForm.gcbw}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">编制单位 ：</span>
            <span>{{lmshForm.bzdw}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">编制日期 ：</span>
            <span>{{lmshForm.bzrq}}</span>
          </p>
          <br/>
          <p class="addJLD">
            <span class="addJLD_tit2">工程内容 ：</span>
            <span>{{lmshForm.gcnr}}</span>
          </p>
          <br/>
          <p class="addJLD">
            <span class="addJLD_tit2">整改意见 ：</span>
            <span>{{lmshForm.zgyj}}</span>
          </p>
          <br/>
          <p class="addJLD">
            <span class="addJLD_tit2">是否整改 ：</span>
            <span>{{lmshForm.iszg}}</span>
          </p>
          <br/>
          <p class="addJLD">
            <span class="addJLD_tit2">整改情况 ：</span>
            <span>{{lmshForm.zgqk}}</span>
          </p>
          <br/>
          <p class="addJLD">
            <span class="addJLD_tit2">整改问题复查 ：</span>
            <span>{{lmshForm.fc}}</span>
          </p>
          <br/>
          <p class="addJLD">
            <span class="addJLD_tit2">附件 ：</span>
            <span>
              <ul class="fjlist" style="margin-left: 140px; margin-top: -25px;">
                <li class="file_li" :key="index" v-for="(file, index) in fileList" @click="openFile(file)">
                  <a><i aria-hidden="true"></i>{{file.name}}</a>
                </li>
              </ul>
            </span>
          </p>
        </div>
      </div>


    </div>

    <Dialog :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :dialogVisible="dialogVisible"
            @searchXMMC="searchXMMC"
            @searchXMBH="searchXMBH"
            @closeDialog="closeDialog">
    </Dialog>

  </div>
</template>

<script>
  import {returnUserInfo} from '@/helper'
  import Dialog from '@/components/Dialog.vue'
  import {uuid} from '../../helper/index'

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
    data() {
      return {
        // lmshForm: {},
        isxmmcOfadd: 0,
        index: '',
        isadd: false,
        addzb: true,
        submitLoading: false,
        showxq: false,
        showSearch: false,
        loading: false,
        tableHeight: 300,
        tableData: [],
        total: 10,
        showBhForm: false,
        searchCriteria: false,
        qmbbOptions: [],
        roadOptions: [],
        searchForm: {
          xmmc: '',
          xmbh: '',
          ksrq: '',
          jcrq: ''
        },
        defaultHtbh: '', // 外协单位默认的合同编号
        defaultHtmc: '', // 外协单位默认的合同名称
        currentPage: 1,
        pageSize: 10,
        personelForm: {},
        showDetail: false,
        multipleSelection: [],
        htList: [],
        initializationForm: {
          djbh: '',
          gcmc: '',
          htbh: '',
          gldw: '',
          cbdw: '',
          jcrq: '',
          jcxs: '',
          gcbw: '',
          iszg: '是',
          bzdw: '',
          bzrq: '',
          gcnr: '',
          zgyj: '',
          zgqk: '',
          fc: ''
        },
        lmshForm: {
          iszg: '是'
        },
        userInfo: {
          orgbh: undefined,
          orgid: undefined,
          orgmc: undefined,
          bmbh: undefined,
          bmid: undefined,
          bmmc: undefined,
          yhbm: undefined,
          yhid: undefined,
          yhmc: undefined,
          gldwid: undefined,
          gldw: undefined,
          gldwbm: undefined,
          outside: ''
        },
        outside: true, // 是否为外协单位
        // monitor 验收 edit 编辑 rectification 整改 stateType
        stateType: 'edit',
        isseedetail: 0,
        // form表单验证条件
        jldModelRules: {
          gcmc: [
            {required: true, message: '请选择项目名称', trigger: 'change'}
          ],
          jcrq: [
            {type: 'string', required: true, message: '请选择日期', trigger: 'change'}
          ],
          bzdw: [
            {type: 'string', required: true, message: '请输入编制单位', trigger: 'change'}
          ],
          bzrq: [
            {type: 'string', required: true, message: '请选择日期', trigger: 'change'}
          ],
          jcxs: [
            {type: 'string', required: true, message: '请输入内容', trigger: 'change'}
          ],
          gcbw: [
            {type: 'string', required: true, message: '请输入内容', trigger: 'change'}
          ],
          gcnr: [
            {type: 'string', required: true, message: '请输入内容', trigger: 'change'}
          ]
        },
        dialogVisible: false,
        restaurants: [],
        restaurantsBH: [],
        datatypes: '',
        dialogTableTit: { // ok
          XMMC: '项目名称',
          XMBH: '项目编号'
        },
        dialogData: [],
        files: [],
        uuid: uuid(),
        fileList: []
      }
    },
    mounted() {
      this.userInfo = returnUserInfo()
      if (this.userInfo.type === '供应商') {
        this.outside = true
      } else {
        this.outside = false
      }

      // 当前登录为外协单位时，获取合同编号，默认取第一个
      if (this.userInfo.type === '供应商') {
        this.$api.getXmListBySpk().then(res => {
          if (res.code === 1) {
            let data = res.data
            if (data.length > 0) {
              this.defaultHtbh = data[0].XMBH
              this.defaultHtmc = data[0].XMMC
              this.searchForm.xmbh = this.defaultHtbh
              this.searchForm.xmmc = this.defaultHtmc
              this.search(1, 10)
            }
          }
        })
      } else {
        this.search(1, 10)
      }

      this.initqueryXMBH()
      this.initqueryXMMC()
      this.tableHeight = $('#lkpdlmsh')[0].offsetHeight
    },
    methods: {
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
      showAdd() {
        if (!this.htList.length) {
          this.$api.getProjectMsgToCreateMWP().then(res => {
            if (res.code == 1) {
              this.htList = res.data
            }
          })
        }
        this.fileList = []
        this.stateType = 'add'
        this.isxmmcOfadd = 1
        this.lmshForm = _.cloneDeep(this.initializationForm)
        this.lmshForm.bzdw = this.userInfo.daZzmc
        let time = this.formatDate(new Date())
        this.lmshForm.bzrq = time
        this.lmshForm.jcrq = time
        this.formId = 'gczljc' + new Date().getTime()
        this.lmshForm.djbh = this.formId
        this.lmshForm.bzdwid = this.userInfo.daZzid

        this.showDetail = true
        this.showxq = false
        this.isadd = true
      },
      // monitor 验收 edit 编辑 rectification 整改 stateType
      updateFormDia(row, index, type) {
        // this.isseedetail = 0

        if (type == 'rectification' || type == 'monitor') {
          this.isseedetail = 2
        }
        this.stateType = type
        this.isxmmcOfadd = 1
        this.showDetail = true
        // 显示是新增保存还是编辑保存
        this.isadd = false
        // 显示保存区域
        this.showxq = false

        this.lmshForm = row
        this.lmshForm.gcmc = row.gcmc
        this.index = index

        this.getFilesDataById(row.id)
      },
      showBhFormDia(row) {
        this.isseedetail = 3
        this.isadd = false
        this.showDetail = true
        this.showxq = true
        // this.lmshForm = JSON.parse(JSON.stringify(row))
        this.lmshForm = row
        this.getFilesDataById(row.id)
      },
      search(currentPage, pageSize) {
        this.showSearch = false
        // 日期
        let jcrq = this.searchForm.jcrq
        let ksrq, jsrq
        if (jcrq && jcrq.length) {
          ksrq = jcrq[0]
          jsrq = jcrq[1]
        }

        this.$api.gcxcjcgetGcxczljc({
          pageNum: currentPage,
          pageSize: pageSize,
          daZzid: this.userInfo.daZzid,
          htbh: this.searchForm.xmbh,
          htmc: this.searchForm.xmmc,
          ksrq: ksrq || '',
          jsrq: jsrq || ''

        }).then(resp => {
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
      addSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = _.assign({}, this.lmshForm, this.userInfo)
            if (params.iszg === '是') {
              params.spzt = '3401'
            } else {
              params.spzt = '3404'
            }

            const uuid = this.uuid

            // 有附件，保存文件信息
            if (this.files.length > 0) {
              this.saveFileData(uuid)
            }

            params.id = uuid

            this.$api.gcxcjcaddGcxczljc(params).then(res => {
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
          } else {
            return false
          }
        });
      },
      // monitor 验收 edit 编辑 rectification 整改 stateType
      updateSubmit(formName, type) {
        let item = this.lmshForm
        let stateUrl = ''
        let dataString = ''
        let zgSpzt = 3403
        let fcSpzt = 3404
        dataString = '?id=' + item.id

        if (type === 'edit') {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$api.gcxcjcupdateGcxczljc(this.lmshForm).then(res => {
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

              // 有附件，保存文件信息
              if (this.files.length > 0) {
                this.saveFileData(item.id)
              } else { // 无附件，调用删除接口
                this.deleteFilesData(item.id)
              }
            } else {
              console.log('error submit!!')
              return false
            }
          })
        } else {
          if (type === 'rectification') {
            if (!item.zgqk) {
              this.$message({
                type: 'error',
                message: '请输入整改情况后保存！'
              })
              return
            }
            stateUrl = 'gcxcjcgetZgOfGcxczljc'
            dataString += '&spzt=' + zgSpzt + '&zghfrid=' + this.userInfo.daYhid + '&zghfr=' + this.userInfo.daYhmc + '&zgqk=' + item.zgqk
          } else if (type === 'monitor') {
            if (!item.fc) {
              this.$message({
                type: 'error',
                message: '请输入验收情况后保存！'
              })
              return
            }
            stateUrl = 'gcxcjcgetFcOfGcxczljc'
            dataString += '&spzt=' + fcSpzt + '&iszg=' + item.iszg + '&fc=' + item.fc

            // 有附件，保存文件信息
            if (this.files.length > 0) {
              this.saveFileData(item.id)
            } else { // 无附件，调用删除接口
              this.deleteFilesData(item.id)
            }
          }
          this.$api[stateUrl](dataString).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: res.data.data
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
        }
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
            this.$api.gcxcjcdeleteGcxczljc('?ids=' + djbharr).then(res => {
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
      selectHt(value) {
        this.lmshForm.htbh = value.xmbh
        this.lmshForm.gcmc = value.xmmc
        this.lmshForm.gcmc = value.xmmc
        this.lmshForm.cbdw = value.cbdw
        this.lmshForm.gldw = value.gldw
        this.lmshForm.cbdwid = value.cbdwid
        this.lmshForm.gldwid = value.gldwid

        // this.ybmxList = value.zmhts
      },
      shenhe(row, index) {
        // this.outside = false
        if (this.outside) {
          this.$message({
            type: 'info',
            message: '您的权限不能下发项目！'
          })
          return
        }
        this.$confirm('是否确定下发？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let form = row
          this.$api.gcxcjcgetZgOfGcxczljc('?spzt=3402&id=' + form.id).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '下发成功!'
              })
              this.search(this.currentPage, this.pageSize)
              this.resetForm()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消下发'
          })
        })
      },

      resetForm() {
        this.showDetail = false
        this.isseedetail = 0
        this.isxmmcOfadd = 0
        this.stateType = 'add'
        // this.lmshForm = {}
      },
      onSeleteState(item, index) {
        if (item.spzt != '3401') {
          return false
        } else {
          return true
        }
      },

      resizeDate() {
        this.searchForm.xmbh = this.defaultHtbh
        this.searchForm.xmmc = this.defaultHtmc
        this.searchForm.jcrq = ''
        this.search(this.currentPage, this.pageSize)
      },
      showDialog(bol) { // 点击弹框
        this.dialogVisible = true
        this.datatypes = bol
        this._getmcbhList()
      },
      _getmcbhList() { //获取数据
        this.$api.getmcbhList().then(res => {
          if (res.code == 1) {
            this.dialogData = res.data && res.data.length ? res.data : []
          } else {
            this.dialogData = []
          }
        })
      },
      querySearchBH(queryString, cb) { // 1
        let restaurants = this.restaurantsBH;
        let results = queryString ? restaurants.filter(this.createFilter(queryString, 'XMBH')) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      handleSelectBH(item) { // 2
        this.searchForm.xmbh = item.XMBH
        this.$api.getXmbhtomcList({xmbh: item.XMBH}).then(res => {
          if (res.code == 1) {
            this.searchForm.xmmc = res.data ? res.data[0].XMMC : ''
          } else {
            this.searchForm.xmmc = ''
          }
        })
      },
      querySearchMC(queryString, cb) {
        let restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString, 'XMMC')) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      handleSelectMC(item, param) {
        //getXmmcList
        if (param == 1) {
          this.searchForm.xmmc = item.XMMC
          this.searchForm.xmbh = item.XMBH
          console.log(this.searchForm)
        } else {
          this.lmshForm.gcmc = item.XMMC
          this.lmshForm.htbh = item.XMBH
          if (item.XMBH) {
            this.getOnlyXmgkjcxx(item.XMBH)
          }
        }


      },
      createFilter(queryString, val) {
        return (restaurant) => {
          return (restaurant[val].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },

//Dialog
      searchXMMC(val) { // 项目名称模糊搜索
        this.$api.getXmmcListt({xmmc: val}).then(res => {
          if (res.code == 1) {
            this.dialogData = res.data && res.data.length ? res.data : []
          } else {
            this.dialogData = []
          }
        })
      },
      searchXMBH(val) { //项目编号模糊搜索
        this.$api.getXmbhmhList({xmbh: val}).then(res => {
          if (res.code == 1) {
            this.dialogData = res.data && res.data.length ? res.data : []
          } else {
            this.dialogData = []
          }
        })
      },

      initqueryXMMC() {
        let outside = this.userInfo.outside
        if (outside && outside !== '~') {
          this.$api.getXxBySgdw({cbdwid: outside}).then(res => {

            if (res.code === 1) {
              this.restaurants = res.data && res.data.length ? res.data : []
            } else {
              this.restaurants = []
            }
          })
        } else {
          this.$api.getmcbhList().then(res => {
            if (res.code === 1) {
              this.restaurants = res.data && res.data.length ? res.data : []
            } else {
              this.restaurants = []
            }
          })
        }
      },
      initqueryXMBH() { // 公共查询项目编号
        this.$api.getXmbhList().then(res => {
          if (res.code == 1) {
            this.restaurantsBH = res.data && res.data.length ? res.data : []
          } else {
            this.restaurantsBH = []
          }

        })
      },
      getOnlyXmgkjcxx(val) {
        let xmbh = val ? val : ''
        this.$api.getOnlyXmgkjcxx({xmbh: xmbh}).then(res => {
          if (res.code != 1) {
            this.$message({
              message: '网络出错',
              type: "error"
            })
          } else {
            if (res.data && res.data.length !== 0) {
              for (var i = 0; i < res.data.length; i++) {
                this.lmshForm.gcmc = res.data[i].xmmc
                this.lmshForm.cbdw = res.data[i].cbdw
                this.lmshForm.gldw = res.data[i].gldw
                this.lmshForm.htbh = res.data[i].xmbh
              }
            }
          }
        }).catch(e => {
          console.log(e)
        })
      },
      closeDialog(val) {
        this.dialogVisible = false
        if (val) {
          if (this.isxmmcOfadd == 1) {
            this.lmshForm.gcmc = val.XMMC
            this.lmshForm.htbh = val.XMBH
            this.getOnlyXmgkjcxx(this.lmshForm.htbh)
          } else {
            this.searchForm.xmmc = val.XMMC
            this.searchForm.xmbh = val.XMBH
          }
        }
      },
      selecttreeBm(node) {
        this.searchForm.bmid = node.bmcode
        this.searchForm.bmname = node.bmname
        if (!this.searchForm.qmbbid) {
          // return
        } else {
          this.search(this.currentPage, this.pageSize)
        }
      },
      // 处理文件上传成功后的数据
      handleUploadFile(res, file, files) {
        if (res.code === 1) {
          this.files = files
        }
      },
      // 文件预览
      preview(file) {
        if (file.response) {
          let url = file.response.data.file_path
          window.open(url)
        } else {
          let url = file.url
          window.open(url)
        }
      },
      // 详情页面打开附件
      openFile(item) {
        window.open(item.url)
      },
      // 处理移除附件的逻辑
      removeFile(file, fileList) {
        this.files = fileList
      },
      // 通过ID获取文件信息
      getFilesDataById(id) {
        this.fileList = []
        this.files = []
        // 获取文件信息
        this.$api.getFilesDataById('?id=' + id).then(res => {
          if (res.data.code === 1) {
            if (res.data.data.length > 0) {
              res.data.data.forEach(item => {
                let file = {
                  status: 'success',
                  name: item.file_yname,
                  url: item.file_path,
                  response: {
                    data: item
                  }
                }
                this.files.push(file)
                this.fileList.push(file)
              })
            }
          }
        })
      },
      /**
       * 根据UUID删除附件
       * @param id UUID
       */
      deleteFilesData(id) {
        this.$api.deleteFilesById('?ids=' + id).then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: res.data.data,
              type: 'message'
            })
          }
        })
      },
      // 保存文件数据
      saveFileData(uuid) {
        // 处理文件数据
        let filesData = []
        this.files.forEach(item => {
          let file = {}
          let data = item.response.data
          file.file_yname = data.file_yname
          file.file_path = data.file_path
          file.file_depict = data.file_depict
          file.file_date = data.file_date
          file.file_status = data.file_status
          file.file_type = data.file_type
          file.file_name = data.file_name
          file.file_mjlx = data.file_mjlx
          file.id = data.id
          file.file_dx = data.file_dx
          file.file_remarks = data.remarks
          file.file_id = uuid
          filesData.push(file)
        })
        this.$api.addFileData(filesData).then(res => {
          if (res.data.code !== 1) {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .fcbselect {
    top: 168px !important;
  }

  .fcbselectr {
    top: 222px !important;
  }

  #lkpdlmsh {
    position: relative;
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    overflow: auto;
    .gjzjje {
      input {
        height: 55px;
      }
    }
    // .header{}
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
      padding: 0 40px !important;
      .zhubnr {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
          width: 25%;
          height: 32px;
          display: flex;
          align-items: center;
          padding: 10px;
          // float: left;
          // border: 1px solid #D5D6D7;
          // border-bottom: none;
          color: #52575D !important;
          font-size: 12px;
          // &:nth-of-type(2n+1){
          //   border-right: none;
          // }
          // &:nth-last-of-type(1),&:nth-last-of-type(2){
          //   border-bottom: 1px solid #D5D6D7;
          // }
          > span {
            width: 100px;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            // line-height: 31px;
            // text-indent: 1em;
            // border-right: 1px solid #D5D6D7;
            // background: #F7F8F9;
            // float: left;
          }
          p {
            // width: calc(100% - 100px);
            flex: 1;
            height: 100%;
            margin-left: 10px;
            display: flex;
            align-items: center;
            position: relative;
            .el-input__inner {
              // border: none;
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
              border-bottom: 1px solid #D5D6D7 !important;
              &:last-child {
                border-bottom: none;
              }
              i {
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
          // border-right: 1px solid #D5D6D7!important;
          width: 70%;
          min-height: 64px;
          height: auto;
          display: flex;
          align-items: center;
          > span {
            width: 100px;
          }
          > p {
            flex: 1;
            > span {
              display: block;
            }
            // border:1px solid #cccc;
          }
          // .el-upload-list__item{
          //   border: none;
          // }
        }
      }
      .zibnr {
        li {
          /*width: calc(100%/4);*/
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
    .fjlist {
      li {
        list-style: none;
        border: none;
        height: 32px;
        line-height: 32px;
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover {
          background: #D5D6D7;
        }
        i {
          position: absolute;
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          right: 10px;
          top: 6px;
        }
      }

    }
  }
</style>
