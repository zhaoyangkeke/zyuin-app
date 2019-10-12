/**
* ----工程变更单
*/
<template>
  <div id="gcbgd" style="height: 100%" v-loading="loading">
    <div class="header" v-show="!showDetail">
      <span class="headerTit">工程变更单</span>
      <div class="header_option">
        <ul>
          <li @click="showAdd()" v-if="outside"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()" v-if="outside"><i class="el-icon-delete"> 删除</i></li>
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
              v-model="searchForm.datearr"
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
            <el-button size="mini" @click="search(1, 10)" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
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
          :selectable="onSeleteState"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column align="left" prop="gcmc" label="项目名称" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="qdzh" label="起点桩号" sortable></el-table-column>
        <el-table-column align="left" prop="zdzh" label="止点桩号" sortable></el-table-column>
        <el-table-column align="left" prop="bw" label="部位"></el-table-column>
        <el-table-column align="left" prop="gldw" label="管理单位"></el-table-column>
        <el-table-column align="left" prop="sqrq" label="申请日期" width="100" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" label="状态"  sortable width="80">
        <template scope="scope">
            <span style="color:#D34C42;text-align: left" v-if="scope.row.spzt === '4001'">自由</span>
            <span style="color:#D34C42;text-align: left" v-if="scope.row.spzt === '4002'">审批中</span>
            <span style="color:#D34C42;text-align: left" v-if="scope.row.spzt === '4003'">已审批</span>
          </template>
        </el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="120">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: left" v-if="outside && scope.row.spzt === '4001'"
                  @click="shenhe(scope.row, scope.$index)">提交</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: left" v-if="outside && scope.row.spzt === '4001'"
                  @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: left" @click="showBhFormDia(scope.row)">详情</span>
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

    <div class="tabArea" v-if="showDetail"  @close="resetForm">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild"  @click="resetForm"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>工程变更单</span>
        </p>

        <div v-show="!showxq" class="SPState" >
          <el-button size="mini" class="minibtn"  v-if="isadd"  :loading="submitLoading" @click="addSubmit('lmshForm');isxmmcOfadd = 0"
                    style="background: #DF4D4A; border-color:transparent;color: #fff;">保存</el-button>
          <el-button size="mini" class="minibtn"  v-if="!isadd"  :loading="submitLoading" @click="updateSubmit('lmshForm');isxmmcOfadd = 0"
                    style="background: #DF4D4A; border-color:transparent;color: #fff;">保存</el-button>
          <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>

      <div >
        <div  v-show="isseedetail == 0" style="padding-left: 15px;">
          <el-form  :model="lmshForm" :rules="jldModelRules" ref="lmshForm">

            <el-form-item class="addJLD" label="单据编号" label-width="100px">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.djbh}}</label>
            </el-form-item>

            <el-form-item style="padding-left: 2.1875rem" label="项目名称" class="addJLD">
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="lmshForm.gcmc"
                :fetch-suggestions="querySearchMC"
                @select="handleSelectMC($event, 0)"
                placeholder="请输入项目名称"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.XMMC}}</div>
                </template>
                <i slot="suffix" @click="showDialog('mc')" class="icon iconfont icon-xiangqing1"></i>
              </el-autocomplete>
            </el-form-item>

            <el-form-item style="padding-left: 2.4rem" class="addJLD" label="合同编号" prop="htbh" label-width="100px">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.htbh}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="承包单位" label-width="100px">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.cbdw}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="管理单位" label-width="100px">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.gldw}}</label>
            </el-form-item>

            <el-form-item style="padding-left: 2.4rem" class="addJLD" label="申请日期" prop="sqrq" label-width="100px">
              <el-date-picker
              :disabled="isseedetail == 2"
              v-model="lmshForm.sqrq"
              size="mini"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>

            <el-form-item class="addJLD" label="编制日期" prop="bzrq" label-width="100px">
              <el-date-picker
              :disabled="isseedetail == 2"
              v-model="lmshForm.bzrq"
              size="mini"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>

            <el-form-item class="addJLD" label="部位" label-width="100px">
              <el-input  v-model="lmshForm.bw" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
            </el-form-item>

            <el-form-item style="padding-left: 2.4rem" class="addJLD" label="起点桩号" prop="qdzh" label-width="100px">
              <el-input type="number" v-model="lmshForm.qdzh" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="止点桩号" prop="zdzh" label-width="100px">
              <el-input type="number"  v-model="lmshForm.zdzh" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="变更令编号" prop="bglbh" label-width="100px">
               <el-select v-model="lmshForm.bglbh" size="mini" placeholder="请选择变更令编号">
                  <el-option
                    v-for="item in BGLBHlist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>

            <el-form-item   class="addJLD" label="工程变更申请表编号" prop="sqbbh" label-width="138px">
                <el-select v-model="lmshForm.sqbbh" size="mini" placeholder="请选择工程变更申请表编号">
                  <el-option
                    v-for="item in SQBBHlist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>

            <div style="width: 79%;">
              <el-form-item class="addJLD-textarea"  label="变更理由" prop="bgly" label-width="100px">
                <el-input type="textarea"   v-model="lmshForm.bgly" :disabled="isseedetail == 2" style="width: 94.8%;"></el-input>
              </el-form-item>

              <el-form-item class="addJLD-textarea"  label="变更内容" prop="bgnr" label-width="100px">
                <el-input type="textarea"   v-model="lmshForm.bgnr" :disabled="isseedetail == 2" style="width: 94.8%;"></el-input>
              </el-form-item>
            </div>

            <el-form-item class="addJLD" label="估计增(减)金额" prop="gjzjje" style="width: 100%;" label-width="100px">
              <el-input type="number"  v-model.number="lmshForm.gjzjje" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
            </el-form-item>

            <el-form-item  class="addJLD" label="附件" label-width="100px">
              <el-upload
                class="upload-demo"
                :action="$api.uploadFiles"
                multiple
                ref="uploada"
                :disabled="isseedetail === 2"
                :fileList="fileList"
                :on-success="handleUploadFile"
                :on-preview="preview"
                :on-remove="removeFile">
                <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
            </el-form-item>

          </el-form>
        </div>

        <div v-show="showxq"   >
          <div style="padding-left: 15px;">
            <p class="addJLD">
              <span class="addJLD_tit2">单据编号 ：</span>
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
              <span class="addJLD_tit2">承包单位 ：</span>
              <span>{{lmshForm.cbdw}}</span>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit2">管理单位 ：</span>
              <span>{{lmshForm.gldw}}</span>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit2">申请日期 ：</span>
              <span>{{lmshForm.sqrq}}</span>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit2">编制日期 ：</span>
              <span>{{lmshForm.bzrq}}</span>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit2">部位 ：</span>
              <span>{{lmshForm.bw}}</span>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit2">起点桩号 ：</span>
              <span>{{lmshForm.qdzh}}</span>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit2">止点桩号 ：</span>
              <span>{{lmshForm.zdzh}}</span>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit2">变更令编号 ：</span>
              <span>{{lmshForm.bglbh}}</span>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit2">工程变更申请表编号 ：</span>
              <span>{{lmshForm.sqbbh}}</span>
            </p>

            <p class="addJLD">
              <span class="addJLD_tit2">变更理由 ：</span>
              <span>{{lmshForm.bgly}}</span>
            </p>
            <br/>
            <p class="addJLD">
              <span class="addJLD_tit2">变更内容 ：</span>
              <span>{{lmshForm.bgnr}}</span>
            </p>
            <br/>
            <p class="addJLD">
              <span class="addJLD_tit2">估计增(减)金额 ：</span>
              <span>{{lmshForm.gjzjje}}</span>
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

        <div class="dialog_footer" style=" text-align: left;">
          <div v-if="!showxq" style="width: calc(100% + 18px);margin-left: -18px;margin-right: 0px;padding-left: 0px; padding-right: 0px;height:4px;background-color: #c0cad6;"></div>
          <div class="header" style="width: calc(100% + 18px);margin-left: -18px;height: 36px;line-height: 36px;padding-top: 0px;">
            <span class="headerTit" style="text-align: left;">子目清单</span>
            <!-- &&isadd -->
            <el-button size="mini"  class="dialog-button bao_cun"
              v-if="!showxq"
              style="background-color: #DF4D4A;border-color: transparent;color: #fff;position: relative;left: 86%;top: -1px;"
              @click="addMx(true)">
              添加子目
            </el-button>
          </div>
        </div>

        <!--页面显示添加字母保存后的信息-->
        <div v-show="isshowzmdetail" style="width: 99%;max-height: 300px">
          <el-table ref="multipleTable" :data="treeRightData" tooltip-effect="dark"
                    style="width: 100%;overflow-y: auto"
                    row-class-name="row_class"
                    border
                    :row-style="{fontFamily: '-apple-system', fontSize: '13px'}"
                    @selection-change="handleSelectionChange">
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column align="center" sortable  prop="data.bh" label="子目编号"  show-overflow-tooltip> </el-table-column>
            <el-table-column align="center" sortable  prop="data.mc" label="子目名称" show-overflow-tooltip> </el-table-column>
            <el-table-column align="center" sortable  prop="data.dw" label="单位"> </el-table-column>
            <el-table-column align="center" sortable  prop="data.dj" label="单价"> </el-table-column>
            <el-table-column align="center" sortable  prop="data.sl" label="变更前数量"> </el-table-column>
            <el-table-column align="center" sortable  prop="data.gclbgh" label="变更后数量"> </el-table-column>
           <!-- <el-table-column align="center" sortable  prop="data.jebgq" label="变更前金额"> </el-table-column>
            <el-table-column align="center" sortable  prop="data.jebgh" label="变更后金额"> </el-table-column>-->
          </el-table>
        </div>
      </div>
    </div>

    <el-dialog
      v-if="addzb"
      title="子目表单"
      :visible.sync="addzb"
      width="1150px"
      @closeDialog="closeDialog2"
      >
      <div style="padding-right: 28px;
    height: 40px;
    line-height: 40px;">
        <!--添加子目按钮-->
        <el-button style="float:right"  size="mini" plain icon="el-icon-edit" @click="addZMX()">添加子目项</el-button>
      </div>
      <div class="treeWrap">
           <div class="tree" style="max-height: 420px;overflow-y: auto;display: inline-block;width: 200px;vertical-align: top">
             <el-tree
               :data="data4"
               :props="defaultProps"
               show-checkbox
               :highlight-current="true"
               node-key="id"
               ref = "tree"
               :default-expanded-keys="choosedRole"
               :default-checked-keys="choosedRole"
               @check-change="handleCheckChange"
               @node-click = "selectedFNode"
               :expand-on-click-node="true">
             </el-tree>
           </div>
        <div class="treeRight" style="max-height: 420px;overflow-y: auto;display: inline-block;width: 900px;">
          <el-table tooltip-effect="dark"
                    :data="treeRightData"
                    row-class-name="row_class"
                    border>
            <el-table-column align="center" class-name="column-caoz" label="操作">
              <template slot-scope="scope">
                <i class="el-icon-delete"  style="color:#00a2fd;cursor: pointer;" title="删除"  @click="deleteZM(scope.row,scope.$index)"></i>
              </template>
            </el-table-column>
            <el-table-column align="center" label="子目编号">
              <template slot-scope="{row,$index}">
                <span v-if="row.data.bglx == 5201">{{row.data.bh}}</span>
                <el-input v-if="row.data.bglx == 5202" size="mini"   style="text-align: center;" v-model="row.data.bh" ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="子目名称">
              <template slot-scope="{row,$index}">
                <span v-if="row.data.bglx == 5201">{{row.data.mc}}</span>
                <el-input v-if="row.data.bglx == 5202" size="mini"   style="text-align: center;" v-model="row.data.mc" ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="单位">
              <template slot-scope="{row,$index}">
                <span v-if="row.data.bglx == 5201">{{row.data.dw}}</span>
                <el-input v-if="row.data.bglx == 5202" size="mini"   style="text-align: center;" v-model="row.data.dw" ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="单价">
              <template slot-scope="{row,$index}">
                <span v-if="row.data.bglx == 5201">{{row.data.dj}}</span>
                <el-input v-if="row.data.bglx == 5202" size="mini" type="number"  style="text-align: center;" v-model.number="row.data.dj" ></el-input>
              </template>
            </el-table-column>

            <el-table-column align="center" label="变更前数量">
              <template slot-scope="{row,$index}">
                <span>{{row.data.sl}}</span>
              </template>
            </el-table-column>
            <!--@change="changeNum(row.data)"-->
            <el-table-column align="center" label="变更后数量" width="180">
              <template slot-scope="{row,$index}">
                <el-input-number   size="mini" type="number" :min="0"  style="text-align: center;" v-model.number="row.data.gclbgh" ></el-input-number>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="treeBtn" style="padding-bottom: 20px;">
          <el-button size="small" @click="saveAdd" type="text" style="display:block;margin:30px auto 20px;width: 64px;height: 35px;background-color: #DF4D4A;border-radius: 4px;color: #fff">保存</el-button>
        </div>
      </div>
    </el-dialog>

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

import { returnUserInfo } from '@/helper'
import Dialog from '@/components/Dialog.vue'

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
    var qdzh1111 = (rule, value, callback) => {
      let RegMatch = /(^[\-0-9][0-9]*(.[0-9]+)?)$/
      if (RegMatch.test(value)) {
        callback()
      } else {
        callback(new Error('桩号格式不正确'))
      }
    }
    return {
      isxmmcOfadd: 0,
      isshowzmdetail: false,
      index: '',
      isadd: false,
      addzb: false,
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
      currentPage: 1,
      pageSize: 10,
      total: 10,
      personelForm: {},
      showDetail: false,
      formId: '',
      htList: [],
      htbh: {},
      sqbList: [],
      sqbbh: {},
      fileList: [],
      multipleSelection: [],
      SQBBHlist: [],
      BGLBHlist: [],
      data4: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      choosedRole: [],
      treeRightData: [],
      treeRightDataInput: [],
      defaultHtbh: '', // 外协单位默认的合同编号
      defaultHtmc: '', // 外协单位默认的合同名称

      initializationForm: {
        djbh: '',
        gcmc: '',
        htmc: '',
        htbh: '',
        cbdw: '',
        gldw: '',
        sqrq: '',
        bzrq: '',
        qdzh: '',
        zdzh: '',
        bw: '',
        sqbbh: '',
        bglbh: '',
        bgly: '',
        bgnr: '',
        gjzjje: '',
        mx: []

      },
      lmshForm: {},
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
        gldwbm: undefined
      },
      isseedetail: 0,
      // form表单验证条件
      jldModelRules: {
        gcmc: [
          {type: 'string', required: true, message: '请选择项目名称', trigger: 'change'}
        ],
        htbh: [
          { type: 'string', required: true, message: '请选择项目名称' }
        ],
        sqrq: [
          { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        ],
        bzrq: [
          { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        ],
        qdzh: [
          { message: '请填写起点桩号', trigger: 'blur', required: true},
          { validator: qdzh1111, trigger: 'blur' }
        ],
        zdzh: [
          { message: '请填写止点桩号', trigger: 'blur', required: true},
          { validator: qdzh1111, trigger: 'blur' }
        ],
        sqbbh: [
          { type: 'string', required: true, message: '请输入工程变更申请表编号', trigger: 'change' }
        ],
        bglbh: [
          { type: 'string', required: true, message: '请输入变更令编号', trigger: 'change' }
        ],
        bgly: [
          { type: 'string', required: true, message: '请输入变更理由', trigger: 'change' }
        ],
        bgnr: [
          { type: 'string', required: true, message: '请输入变更内容', trigger: 'change' }
        ],
        gjzjje: [
          { required: true, message: '请输入估计增(减)金额', trigger: 'change' }
        ]
      },

      searchForm: {
        xmmc: '',
        xmbh: '',
        htbh: undefined,
        tbdw: undefined,
        jcrq: '',
        ksrq: '',
        datearr: null,
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      restaurants: [ ],
      restaurantsBH: [ ],
      datatypes: '',
      dialogTableTit: { // ok
        XMMC: '项目名称', XMBH: '项目编号'
      },
      dialogData: [],
      files: [],
      outside: true,
      zmxid: ''
    }
  },
  mounted () {
    this.userInfo = returnUserInfo()

    this.$api.getProjectMsgToCreateMWP().then(res => {
      if (res.code === 1) {
        this.htList = res.data
      }
    })
    this.initqueryXMBH()
    this.initqueryXMMC()

    if (config.userInfo.userType === '供应商') {
      this.outside = true
    } else {
      this.outside = false
    }
    // 当前登录为外协单位时，获取合同编号，默认取第一个
    if (config.userInfo.userType === '供应商') {
      this.$api.getXmListBySpk().then(res => {
        if (res.code === 1) {
          let data = res.data
          if (data.length > 0) {
            this.defaultHtbh = data[0].XMBH
            this.defaultHtmc = data[0].XMMC
            this.searchForm.htbh = this.defaultHtbh
            this.searchForm.xmmc = this.defaultHtmc
            this.search(1, 10)
          }
        }
      })
    } else {
      this.search(1, 10)
    }
  },
  methods: {
    selectedFNode (data, node, self) {
      if (node.level === 1 || node.level === 2) {
        // this.$message({message:'您选择的是' + node.level +  '级目录,可以添加子目',type: 'success'})
          //改变选中样式
          console.log(node,self)
        this.zmxid = data.data.id
      } else {
        this.zmxid = ''
      }
    },
    /* 添加子目项 */
    addZMX () {
      if (this.zmxid) {
        let item = {
          data: {
            bglx: '5202',
            bh: '',
            bz: '',
            dj: '',
            dw: '',
            gclbgh: 0,
            hj: null,
            id: '',
            mc: '',
            mxhtbh: '',
            pid: this.zmxid,
            sl: 0,
            xh: '',
            xmbh: this.lmshForm.htbh
          }
        }
        this.treeRightData.push(item)
      } else {
        this.$alert('请先选择新建子目项的父级,并且子目项的父级只能为1~2级', '提示', {
          confirmButtonText: '确定',
          center: true
        })
      }
    },
    // 处理变更数据量
    changeNum (obj) {
      if (!Number(obj.gclbgh)) obj.gclbgh = 0
      obj.jebgq = Number(obj.sl) * Number(obj.dj)
      obj.jebgh = Number(obj.gclbgh) * Number(obj.dj)
    },
    // 处理文件上传成功后的数据
    handleUploadFile (res, file, files) {
      if (res.code === 1) {
        this.files = files
      }
    },
    // 文件预览
    preview (file) {
      if (file.response) {
        let url = file.response.data.file_path
        window.open(url)
      } else {
        let url = file.url
        window.open(url)
      }
    },
    // 保存文件数据
    saveFileData (uuid) {
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
        file.file_id = this.lmshForm.bglbh
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
    /**
       * 根据UUID删除附件
       * @param id UUID
       */
    deleteFilesData (id) {
      this.$api.deleteFilesById('?ids=' + id).then(res => {
        if (res.data.code === 1) {
          this.$message({
            message: res.data.data,
            type: 'message'
          })
        }
      })
    },
    // 通过ID获取文件信息
    getFilesDataById (id) {
      this.fileList = []
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
              this.fileList.push(file)
              this.files.push(file)
            })
          }
        }
      })
    },
    // 详情页面打开附件
    openFile (item) {
      window.open(item.url)
    },
    // 处理移除附件的逻辑
    removeFile (file, fileList) {
      this.files = fileList
    },
    // 获取变更令编号列表
    getBglList (info) {
      let that = this
      this.$api.getBglList('?daZzid=' + info.ORGID + '&spzt=4303&htbh=' + info.XMBH).then(res => {
        that.BGLBHlist = []
        let list = res.data.data.list
        if (list && list.length <= 0) {
          return
        }
        list.forEach(item => {
          let itBGLBH = {label: item.bglbh, value: item.bglbh}
          that.BGLBHlist.push(itBGLBH)
        })
      })
    },
    getBgsqbList (info) {
      let that = this
      this.$api.getBgsqbList('?daZzid=' + info.ORGID + '&spzt=' + '4003' + '&htbh=' + info.XMBH).then(res => {
        that.SQBBHlist = []
        let list = res.data.data.list
        if (list && list.length <= 0) {
          return
        }
        list.forEach(item => {
          let it = {label: item.bzrq.replace(/\-/g, '') + '-' + item.djbh, value: item.djbh}
          that.SQBBHlist.push(it)
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
    handleRemove (fileid) {
      this.$api.deleteFilesById('?ids=' + fileid).then(res => {})
    },
    getfilebyid () {
      this.$api.getFilesDataById('?id=' + this.lmshForm.djbh).then(res => {
        this.fileList = res.data.data
        this.fileList.map(item => {
          item.name = item.file_yname
        })
      })
    },
    rukufile () {
      /* let uploadFiles = []
      console.log(this.$refs.uploada.uploadFiles, 6666)
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
      } */
      this.search(this.currentPage, this.pageSize)
      this.resetForm()
    },

    showAdd () {
      this.isshowzmdetail = false
      this.lmshForm = _.cloneDeep(this.initializationForm)
      let time = this.formatDate(new Date())
      this.lmshForm.bzrq = time
      this.lmshForm.sqrq = time
      this.lmshForm.gldw = this.userInfo.daYhmc

      this.isxmmcOfadd = 1
      this.isadd = true
      this.showDetail = true
      this.inuptloading = true
      this.showxq = false
      this.formId = 'gcbgd' + new Date().getTime()
      this.lmshForm.djbh = this.formId
      this.treeRightData = []
      this.data4 = []
      this.choosedRole = []
    },
    handleCheckChange (data, checked, indeterminate) {
      let datas = data
      if (checked) {
        if (!data.children.length) {
          // 判断是否已存在
          let data_id = false
          _.forEach(this.treeRightData, (item) => {
            if (item.id == data.id) {
              data_id = true
            }
          })
          if (data_id) {
            return
          }
          this.treeRightData.push(data)
          let flag = true
          if (data.id) {
            this.choosedRole.forEach(item => {
              if (item == data.id) {
                flag = false
              }
            })
          }
          if (flag) {
            this.choosedRole.push(data.id)
          }
        }
      } else {
        this.treeRightData = this.treeRightData.filter(item => {
          return item.data.id != datas.id
        })
        this.choosedRole = this.choosedRole.filter(id => id !== data.id)
      }
    },
    // 删除子目里的内容
    deleteZM (info, index) {
      this.treeRightData.splice(index, 1)
      if (info.data.id) {
        let delIdIndex = this.choosedRole.indexOf(info.data.id)
        if (delIdIndex !== -1) {
          this.choosedRole.splice(delIdIndex, 1)
          this.$refs.tree.setCheckedKeys(this.choosedRole)
        }
      }
    },
    addMx (bol) {
      if (!this.lmshForm.gcmc) {
        this.$message({
          message: '请选择项目名称',
          type: 'info'
        })
      } else {
        this.addzb = bol
        this.$api.createZmxxRootNode2({xmbh: this.lmshForm.htbh}).then(res => {
          let mxhtbh = this.lmshForm.htbh
          let recursion = function (items) {
            for (let i = 0; i < items.length; i++) {
              items[i].data.mxhtbh = mxhtbh
              if (!items[i].data.dj) {
                items[i].data.dj = 0
              }
              if (items[i].children.length === 0) {
                items[i].data.gclbgh = 0
              } else {
                items[i].data.gclbgh = 0
                recursion(items[i].children)
              }
              items[i].data.bglx = '5201' // 枚举数量变更
            }
          }
          if (res.code === 1) {
            recursion(res.data)
            this.data4 = res.data.length ? res.data : []
          } else {
            this.data4 = []
          }
        })
      }
    },
    saveAdd () {
      this.addzb = false
      this.isshowzmdetail = true
      this.zmxid = ''
    },
    updateFormDia (row, index) {
      this.isxmmcOfadd = 1
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      this.lmshForm = row
      this.index = index
      this.htbh = {
        htbh: row.htbh
      }
      this.sqbbh = {
        sqbbh: row.sqbbh
      }
      this.getFilesDataById(row.bglbh)
      this.getBglList({ZT: row.spzt, ORGID: this.userInfo.gldwid, XMBH: row.htbh})
      this.getBgsqbList({ZT: row.ZT, ORGID: this.userInfo.gldwid, XMBH: row.XMBH})
      this.treeRightData = []
      this.choosedRole = []
      this.lmshForm.mx.forEach(item => {
        let params = {
          data: {
            id: item.zmid,
            bh: item.zmh,
            mc: item.zmmc,
            dw: item.dw,
            dj: item.dj,
            zmpid: item.zmpid,
            bglx: item.bglx,
            gclbgh: item.gclbgh,
            gclbgq: item.gclbgq,
            sl: item.gclbgq,
            xmbh: item.xmbh
          }
        }
        this.treeRightData.push(params)
        this.choosedRole.push(item.zmid)
      })
      this.isshowzmdetail = true
    },
    onSeleteState (item, index) {
      if (this.outside && item.spzt === '4001') {
        return true
      } else {
        return false
      }
    },
    showBhFormDia (row) {
      this.isxmmcOfadd = 1
      this.showDetail = true
      this.showxq = true
      this.isadd = false
      this.lmshForm = row

      this.htbh = {
        htbh: row.htbh
      }
      this.sqbbh = {
        sqbbh: row.sqbbh
      }

      this.isseedetail = 2
      this.getFilesDataById(row.bglbh)
      this.treeRightData = []
      this.choosedRole = []
      this.lmshForm.mx.forEach(item => {
        let params = {
          data: {
            id: item.zmid,
            bh: item.zmh,
            mc: item.zmmc,
            dw: item.dw,
            dj: item.dj,
            jebgh: item.jebgh,
            jebgq: item.jebgq,
            gclbgh: item.gclbgh,
            gclbgq: item.gclbgq,
            sl: item.gclbgq,
            mxhtbh: item.mxhtbh
          }
        }

        this.treeRightData.push(params)
        this.choosedRole.push(item.zmid)
      })

      this.isshowzmdetail = true
    },
    search (currentPage, pageSize) {
      this.showSearch = false
      let {datearr} = this.searchForm
      let ksrq = ''
      let jsrq = ''
      if (datearr && datearr.length) {
        ksrq = datearr[0]
        jsrq = datearr[1]
      }
      this.$api.getBgdList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&daZzid=' + this.userInfo.daZzid + '&htbh=' + this.searchForm.htbh + '&ksrq=' + ksrq +
          '&jsrq=' + jsrq).then(resp => {
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
    addSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let treeData = []
          this.treeRightData.forEach(item => {
            let obj = {}
            obj.id = item.id
            obj.zmh = item.data.bh
            obj.zmmc = item.data.mc
            obj.zmid = item.data.id
            obj.gclbgq = item.data.sl
            obj.gclbgh = item.data.gclbgh
            obj.jldw = item.data.dw
            obj.dw = item.data.dw
            obj.dj = item.data.dj

            obj.xmbh = item.data.xmbh
            obj.bglx = item.data.bglx
            obj.zmpid = item.data.pid
            treeData.push(obj)
          })
          if (treeData.length === 0) {
            // this.lmshForm.mx=[]
            this.$message({
              message: '请添加子目后在提交！',
              type: 'warning'
            })
            return
          }
          let params = _.assign({}, this.lmshForm, this.userInfo)
          params.spzt = '4001'

          params.mx = treeData
          this.handleRemove(this.lmshForm.djbh)
          // 有附件，保存文件信息
          if (this.files.length > 0) {
            this.saveFileData()
          }
          console.log(JSON.stringify(params, null, 2))
          this.$api.addBgdForBggl(params).then(res => {
            if (res.data.code === 1) {
              // this.rukufile()
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
      })
    },
    updateSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let treeData = []
          this.treeRightData.forEach(item => {
            let obj = {}
            obj.id = item.id
            obj.zmh = item.data.bh
            obj.zmmc = item.data.mc
            obj.zmid = item.data.id
            obj.gclbgq = item.data.sl
            obj.gclbgh = item.data.gclbgh

            obj.jldw = item.data.dw
            obj.dw = item.data.dw
            obj.dj = item.data.dj
            obj.xmbh = item.data.xmbh
            obj.bglx = item.data.bglx
            obj.zmpid = item.data.zmpid
            treeData.push(obj)
          })
          if (treeData.length === 0) {
            this.$message({
              message: '请添加子目后在提交！',
              type: 'warning'
            })
            return
          }
          this.lmshForm.mx = treeData
          this.lmshForm.daYhid = this.userInfo.yhid
          this.lmshForm.daZzid = this.userInfo.daZzid
          this.handleRemove(this.lmshForm.djbh)
          // 有附件，保存文件信息
          if (this.files.length > 0) {
            this.saveFileData(this.lmshForm.bglbh)
          } else { // 无附件，调用删除接口
            this.deleteFilesData(this.lmshForm.bglbh)
          }
          this.$api.editBgdForBggl(this.lmshForm).then(res => {
            if (res.data.code === 1) {
              // this.rukufile()
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
        } else {
          return false
        }
      })
    },

    resetForm () {
      this.showDetail = false
      this.isseedetail = 0
      this.isxmmcOfadd = 0
      this.htbh = {}
      this.fileList = []
      this.SQBBHlist = []
      this.BGLBHlist = []
      this.treeRightData = []
    },

    selectHt (value) {
      this.lmshForm.htbh = value.xmbh
      this.lmshForm.gcmc = value.xmmc
      this.lmshForm.htmc = value.xmmc
      // 起始终止桩号
      this.lmshForm.qdzh = value.qszh
      this.lmshForm.zdzh = value.zzzh
      this.lmshForm.cbdw = value.cbdw
      this.lmshForm.cbdwid = value.cbdwid

      this.lmshForm.gldw = value.gldw
      this.lmshForm.gldwid = value.gldwid
    },

    shenhe (row, index) {
      this.$confirm('是否提交？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let form = row
        // 先创建工作流，再提交
        this.$api.createWorkFlow({
          pc_initiator: this.userInfo.yhmc,
          pc_initiatorid: this.userInfo.yhid,
          pc_name: '20',
          pc_project_id: form.djbh,
          pc_remarks: '',
          pc_state: '1'
        }).then(res => {
          // 工作流创建成功，提交
          if (res.code === 1) {
            form.spzt = '4002'
            this.$api.spBgdForBggl('?spzt=' + form.spzt + '&djbhs=' + form.djbh).then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '提交成功，正在审批中!'
                })
                this.search(this.currentPage, this.pageSize)
                this.resetForm()
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消提交'
        })
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
            djbharr = djbharr + item.djbh + ','
          })
          djbharr = djbharr.slice(0, djbharr.length - 1)
          this.$api.delBgdForBggl('?djbhs=' + djbharr).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.handleRemove(this.lmshForm.bglbhs)
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
    selecttreeBm (node) {
      this.searchForm.bmid = node.bmcode
      this.searchForm.bmname = node.bmname
      if (!this.searchForm.qmbbid) {
        // return
      } else {
        this.search(this.currentPage, this.pageSize)
      }
    },

    showDialog (bol) { // 点击弹框
      this.dialogVisible = true
      this.datatypes = bol
      this._getmcbhList()
    },
    _getmcbhList () { // 获取数据
      this.$api.getmcbhList().then(res => {
        if (res.code === 1) {
          this.dialogData = res.data && res.data.length ? res.data : []
        } else {
          this.dialogData = []
        }
      })
    },
    querySearchBH (queryString, cb) { // 1
      let restaurants = this.restaurantsBH
      let results = queryString ? restaurants.filter(this.createFilter(queryString, 'XMBH')) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    handleSelectBH (item) { // 2
      this.searchForm.htbh = item.XMBH
      this.$api.getXmbhtomcList({xmbh: item.XMBH}).then(res => {
        if (res.code === 1) {
          this.searchForm.xmmc = res.data ? res.data[0].XMMC : ''
        } else {
          this.searchForm.xmmc = ''
        }
      })
    },
    querySearchMC (queryString, cb) {
      let restaurants = this.restaurants
      let results = queryString ? restaurants.filter(this.createFilter(queryString, 'XMMC')) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    handleSelectMC (item, param) {
      // getXmmcList
      if (param === 1) {
        this.searchForm.xmmc = item.XMMC
        this.searchForm.htbh = item.XMBH
      } else {
        this.lmshForm.gcmc = item.XMMC
        // this.lmshForm.htbh = item.XMBH
        if (item.XMBH) {
          this.getOnlyXmgkjcxx(item.XMBH)
          this.getBglList({ZT: item.ZT, ORGID: this.userInfo.gldwid, XMBH: item.XMBH})
          this.getBgsqbList({ZT: item.ZT, ORGID: this.userInfo.gldwid, XMBH: item.XMBH})
        }
      }
    },
    createFilter (queryString, val) {
      return (restaurant) => {
        return (restaurant[val].toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },

    // Dialog
    searchXMMC (val) { // 项目名称模糊搜索
      this.$api.getXmmcListt({xmmc: val}).then(res => {
        if (res.code === 1) {
          this.dialogData = res.data && res.data.length ? res.data : []
        } else {
          this.dialogData = []
        }
      })
    },
    searchXMBH (val) { // 项目编号模糊搜索
      this.$api.getXmbhmhList({xmbh: val}).then(res => {
        if (res.code === 1) {
          this.dialogData = res.data && res.data.length ? res.data : []
        } else {
          this.dialogData = []
        }
      })
    },

    initqueryXMMC () {
      let {outside} = this.userInfo

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
    initqueryXMBH () { // 公共查询项目编号
      this.$api.getXmbhList().then(res => {
        if (res.code === 1) {
          this.restaurantsBH = res.data && res.data.length ? res.data : []
        } else {
          this.restaurantsBH = []
        }
      })
    },
    getOnlyXmgkjcxx (val) {
      let xmbh = val || ''
      this.$api.getOnlyXmgkjcxx({xmbh: xmbh}).then(res => {
        if (res.code !== 1) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {
          if (res.data && res.data.length !== 0) {
            for (var i = 0; i < res.data.length; i++) {
              this.lmshForm.htbh = res.data[i].xmbh
              this.lmshForm.gcmc = res.data[i].xmmc
              this.lmshForm.cbdw = res.data[i].cbdw
              this.lmshForm.gldw = res.data[i].gldw
            }
          }
        }
      }).catch(e => {
        console.log(e)
      })
    },
    closeDialog (val) {
      this.dialogVisible = false
      if (val) {
        if (this.isxmmcOfadd === 1) {
          this.lmshForm.gcmc = val.XMMC
          this.lmshForm.htbh = val.XMBH
          this.getOnlyXmgkjcxx(this.lmshForm.htbh)
          this.getBglList({ZT: val.ZT, ORGID: this.userInfo.gldwid, XMBH: val.XMBH})
          this.getBgsqbList({ZT: val.ZT, ORGID: this.userInfo.gldwid, XMBH: val.XMBH})
        } else {
          this.searchForm.xmmc = val.XMMC
          this.searchForm.htbh = val.XMBH
        }
      }
    },
    resizeDate () {
      this.searchForm.xmmc = this.defaultHtmc
      this.searchForm.htbh = this.defaultHtbh
      this.searchForm.searchTime = ''
      this.searchForm.datearr = null

      this.search(this.currentPage, this.pageSize)
    },

    closeDialog2 () {
      alert('ssssss')
      this.treeRightData = []
      this.data4 = []
      this.zmxid = ''
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.bgdelect{
  top:168px!important;
}
.bgdelectr{
  top:222px!important;
}

  #gcbgd{
    .el-tree-node:focus > .el-tree-node__content {
      background-color: #ccc !important;
    }
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
    // .header{}
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
      /*padding: 20px 40px;*/
       .zhubnr{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li{
          width: 25%;
          height: 32px;
          display: flex;
          align-items: center;
          padding: 10px;
          // float: left;
          // border: 1px solid #D5D6D7;
          // border-bottom: none;
          color: #52575D!important;
          font-size: 12px;
          // &:nth-of-type(2n+1){
          //   border-right: none;
          // }
          // &:nth-last-of-type(1),&:nth-last-of-type(2){
          //   border-bottom: 1px solid #D5D6D7;
          // }
          >span{
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
          p{
            // width: calc(100% - 100px);
            flex: 1;
            height: 100%;
            margin-left: 10px;
            display: flex;
            align-items: center;
            position: relative;
            .el-input__inner{
              // border: none;
              text-align: center;
            }
          }
          .radio_line{
            padding: 0 5px;
            .el-radio__label{
              font-size: 12px;
            }
          }

        }
        .tow_line,.three_line,.four_line{
          width: 100%;
          border-right: 1px solid #D5D6D7!important;
          .el-input--mini{
            width: calc(100% - 60px);
          }
          p{
            >span{
              border-bottom: 1px solid #D5D6D7!important;
              &:last-child{
                border-bottom: none;
              }
              i{
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
          // border-right: 1px solid #D5D6D7!important;
          width: 70%;
          min-height: 64px;
          height: auto;
          display: flex;
          align-items: center;
          >span{
            width: 100px;
          }
          >p{
            flex: 1;
            >span{
              display: block;
            }
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
            width: 100%;
            /*width: 600px;*/
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
              width: calc(100%/6);
              // display: inline-block;
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
                // display: inline-block;
                float: left;
                border-top: 1px solid #D5D6D7;
                border-right: 1px solid #D5D6D7;
                &:nth-last-of-type(1){
                  border-right: none;
                }
              }
            }
            p{
              width: calc(100%/6);
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
            .tow_linep{
              .el-input{
                width: 50%!important;
                float: left;
                &:nth-of-type(1){
                  border-right: 1px solid #D5D6D7;
                }
                .el-input__inner{
                  padding: 0!important;
                }
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
    }
  }
</style>
