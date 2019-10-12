/**
* ----隐蔽工程检查验收记录
*/
<template>
  <div id="lkpdlmsh" style="height: 100%" v-loading="loading">
    <div class="header">
      <span class="headerTit">隐蔽工程检查验收记录</span>
      <div class="header_option">
        <!--<div class="jianlimb" @click="showAdd()"><i class="el-icon-download"> 填写验收记录</i></div>-->
        <ul>
          <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
          <li @click="showAdd()" v-if="outside"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()" v-if="outside"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table">
      <div class="chaxun">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <!-- :fetch-suggestions="querySearchBH"
                @select="handleSelectBH"
                v-model="searchForm.xmbh" -->

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

          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="项目编号" prop="htbh">
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="searchForm.xmbh"
                :fetch-suggestions="querySearchBH"
                @select="handleSelectBH"
                placeholder="请输入项目编号"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.XMBH }}</div>
                </template>
                <i slot="suffix" @click="showDialog('bh')" class="icon iconfont icon-xiangqing1"></i>
              </el-autocomplete>
            </el-form-item>
          </el-form-item>


          <!-- <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="合同编号" prop="lxbh"> -->
          <!--<el-input v-model="searchForm.lxcode" size="mini" placeholder="请输入合同编号"></el-input>-->
          <!-- <el-select size="mini"  class="" placeholder="请选择合同编号" v-model="searchForm.htbh" filterable>
            <el-option v-for="(item,index) in htbhlist" :key="index" :label="item.HTBH" :value="item.HTBH"></el-option>
          </el-select> -->
          <!-- </el-form-item>
        </el-form-item> -->
          <!-- <el-form-item style="margin-bottom: 0px" label="管理单位" prop="" class="">
            <el-select size="mini"  class="" placeholder="请选择管理单位" v-model="searchForm.gldw" filterable>
              <el-option v-for="(item,index) in gldwlist" :key="index" :label="item.GLDW" :value="item.GLDW"></el-option>
            </el-select>
          </el-form-item> -->
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
        <!-- <el-table-column type="expand">
          <template scope="scope">
            <el-table class="demo-table-expand"
                      :data="scope.row.ybgcmxList"
                      border>
              <el-table-column prop="zmh" label="子目号"></el-table-column>
              <el-table-column prop="zmmc" label="子目名称"></el-table-column>
              <el-table-column prop="dw" label="单位"></el-table-column>
              <el-table-column prop="sl" label="数量"></el-table-column>
            </el-table>
          </template>
        </el-table-column> -->


        <el-table-column align="left" prop="htmc" label="项目名称" sortable show-overflow-tooltip></el-table-column>
        <!-- <el-table-column align="left" prop="htbh" label="项目编号" sortable show-overflow-tooltip></el-table-column> -->
        <el-table-column align="left" prop="yjxm" label="隐检项目" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="yjbw" label="隐检部位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="cbdw" label="承包单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="gldw" label="管理单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="ybgcnr" label="隐蔽工程内容" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="bzdw" label="编制单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="yjrq" label="隐检日期" width="100" sortable
                         show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="bzrq" label="编制日期" width="100" sortable
                         show-overflow-tooltip></el-table-column>
        <el-table-column align="left" label="状态" width="80" sortable>
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

    <Dialog :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :dialogVisible="dialogVisible"
            @searchXMMC="searchXMMC"
            @searchXMBH="searchXMBH"
            @closeDialog="closeDialog">
    </Dialog>


    <div class="tabArea" v-if="showDetail" @close="resetForm">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild" @click="resetForm"><i class="icon iconfont icon-arrow-left titleclasschild"
                                                              style="cursor: pointer"></i></span>
          <span>隐蔽工程检查验收记录</span>
        </p>

        <div v-show="!showxq" class="SPState">
          <el-button size="mini" class="minibtn" v-if="isadd" :loading="submitLoading"
                     @click="addSubmit('lmshForm');isxmmcOfadd = 0"
                     style="background: #DF4D4A; border-color:transparent;color: #fff;">保存
          </el-button>
          <el-button size="mini" class="minibtn" v-if="!isadd" :loading="submitLoading"
                     @click="updateSubmit('lmshForm');isxmmcOfadd = 0"
                     style="background: #DF4D4A; border-color:transparent;color: #fff;">保存
          </el-button>


          <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao" style="margin-right: 20px">取消
          </el-button>
        </div>


        <!-- <p class="tabAreaTit" v-if="addzb">
          <span class="titleclasschild"  @click="addzb = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>添加计划</span>
        </p>
        <div class="SPState">
          <el-button size="mini" v-if="!addzb" @click="addzb = true"><i class="el-icon-edit-outline" title="添加"></i>添加子目</el-button>
          <el-button size="mini" v-if="addzb" @click="addzibiao"><i class="el-icon-edit-outline" title="添加"></i>添加</el-button>
        </div> -->
      </div>


      <!--<div class="closeBTN" @click="showDetail = false"><i class="icon iconfont icon-down"></i></div>-->
      <div>
        <div style="padding-left: 15px;" v-show="isseedetail === 0">
          <el-form :model="lmshForm" :rules="jldModelRules" ref="lmshForm" label-width="150px">

            <el-form-item class="addJLD" label="单据名称">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.djbh}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="隐检日期" prop="yjrq">
              <el-date-picker
                :disabled="isseedetail === 2"
                v-model="lmshForm.yjrq"
                size="mini"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="项目名称" class="addJLD">
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="lmshForm.htmc"
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


            <el-form-item class="addJLD" label="合同编号" prop="htbh">
              <!--<el-input  v-model="lmshForm.htbh" size="mini"  placeholder="请输入内容"  disabled></el-input>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.htbh}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="隐检项目" prop="yjxm">
              <el-input v-model="lmshForm.yjxm" size="mini" placeholder="请输入内容" :disabled="isseedetail === 2"></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="隐检部位" prop="yjbw">
              <el-input v-model="lmshForm.yjbw" size="mini" placeholder="请输入内容" :disabled="isseedetail === 2"></el-input>
            </el-form-item>


            <el-form-item class="addJLD" label="管理单位">
              <!--<el-input  v-model="lmshForm.gldw" size="mini"  placeholder="请输入内容" disabled></el-input>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.gldw}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="承包单位">
              <!--<el-input  v-model="lmshForm.cbdw" size="mini"  placeholder="请输入内容" disabled></el-input>-->
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.cbdw}}</label>
            </el-form-item>

            <el-form-item class="addJLD" label="编制单位" prop="bzdw">
              <el-input v-model="lmshForm.bzdw" size="mini" placeholder="请输入内容" :disabled="isseedetail == 2"></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="编制日期" prop="bzrq">
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

            <el-form-item class="addJLD" label="是否为托管路段" prop="sfwtgld">
              <el-radio-group v-model="lmshForm.sfwtgld">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>

            <div style="width: 78.5%;">
              <el-form-item class="addJLD-textarea" label="检查结论">
                <el-input type="textarea" v-model="lmshForm.jcjl" :disabled="isseedetail === 2"
                          style="width: 100%;display: block;"></el-input>
              </el-form-item>

              <el-form-item class="addJLD-textarea" label="质量问题">
                <el-input type="textarea" v-model="lmshForm.zlwt" :disabled="isseedetail === 2"
                          style="width: 100%;display: block;"></el-input>
              </el-form-item>
              <el-form-item class="addJLD-textarea" label="隐蔽工程内容" prop="ybgcnr">
                <el-input type="textarea" v-model="lmshForm.ybgcnr" :disabled="isseedetail === 2"
                          style="width: 100%;display: block;"></el-input>
              </el-form-item>
            </div>


            <el-form-item class="addJLD" label="附件(含工程量计算简图)">
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

        <div v-show="showxq">
          <div style="padding-left: 50px;">
            <p class="addJLD">
              <span class="addJLD_tit2">单据名称 ：</span>
              <span>{{lmshForm.djbh}}</span>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit2">隐检日期 ：</span>
              <span>{{lmshForm.yjrq}}</span>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit2">项目名称 ：</span>
              <span>{{lmshForm.htmc}}</span>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit2">合同编号 ：</span>
              <span>{{lmshForm.htbh}}</span>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit2">隐检项目 ：</span>
              <span>{{lmshForm.yjxm}}</span>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit2">隐检部位 ：</span>
              <span>{{lmshForm.yjbw}}</span>
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
              <span class="addJLD_tit2">编制单位 ：</span>
              <span>{{lmshForm.bzdw}}</span>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit2">编制日期 ：</span>
              <span>{{lmshForm.bzrq}}</span>
            </p>
            <p class="addJLD">
              <span class="addJLD_tit2">是否为托管路段 ：</span>
              <span>{{lmshForm.sfwtgld}}</span>
            </p>
            <br/>
            <p class="addJLD">
              <span class="addJLD_tit2">检查结论 ：</span>
              <span>{{lmshForm.jcjl}}</span>
            </p>
            <br/>
            <p class="addJLD">
              <span class="addJLD_tit2">质量问题 ：</span>
              <span>{{lmshForm.zlwt}}</span>
            </p>
            <br/>
            <p class="addJLD">
              <span class="addJLD_tit2">隐蔽工程内容 ：</span>
              <span>{{lmshForm.ybgcnr}}</span>
            </p>
            <br/>
            <p class="addJLD">
              <span class="addJLD_tit2" style="margin-left: -25px">附件(含工程量计算简图) ：</span>
              <span><ul class="fjlist" style="margin-left: 140px; margin-top: -25px;">
                <li class="file_li" :key="index" v-for="(file, index) in fileList" @click="openFile(file)">
                  <a><i aria-hidden="true"></i>{{file.name}}</a>
                </li>
              </ul></span>
            </p>
          </div>
        </div>

        <div class="dialog_footer" style=" text-align: left;">
          <div v-if="!showxq"
               style="width: calc(100% + 18px);margin-left: -18px;margin-right: 0px;padding-left: 0px; padding-right: 0px;height:4px;background-color: #c0cad6;"></div>
          <div class="header"
               style="width: calc(100% + 18px);margin-left: -18px;height: 36px;line-height: 36px;padding-top: 0px;">
            <span class="headerTit" style="text-align: left;">子目清单</span>
            <!-- &&isadd -->
            <el-button size="mini" class="dialog-button bao_cun" v-if="!showxq"
                       style="background-color: #DF4D4A;border-color: transparent;color: #fff;position: relative;left: 86%;top: -1px;"
                       @click="addMx(true)">
              添加子目
            </el-button>
          </div>
        </div>

        <!--页面显示添加子母保存后的信息-->
        <div v-show="isshowzmdetail" style="width: 99%;">
          <el-table ref="multipleTable" :data="treeRightData" tooltip-effect="dark"
                    style="width: 100%;overflow-y: auto;max-height: 300px;margin-bottom: 15px;"
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
            <el-table-column align="center" sortable prop="data.bh" label="子目编号"
                             show-overflow-tooltip></el-table-column>
            <el-table-column align="center" sortable prop="data.mc" label="子目名称"
                             show-overflow-tooltip></el-table-column>
            <el-table-column align="center" sortable prop="data.dw" label="单位"></el-table-column>
            <!-- <el-table-column align="center" sortable  prop="data.dj" label="单价"> </el-table-column> -->
            <el-table-column align="center" sortable prop="data.sl" label="数量"></el-table-column>

          </el-table>
        </div>

      </div>

    </div>

    <el-dialog
      v-show="addzb"
      title="子目表单"
      :visible.sync="addzb"
      width="820px">

      <div class="treeWrap">
        <div class="tree" style="max-height: 420px;overflow-y: auto;display: inline-block;width: 220px;vertical-align: top">
          <el-tree
            :data="data4"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="choosedRole"
            @check-change="handleCheckChange"
            :expand-on-click-node="true">
          </el-tree>
        </div>
        <div class="treeRight" style="max-height: 420px;overflow-y: auto;display: inline-block;width: 550px;">
          <el-table tooltip-effect="dark"
                    :data="treeRightData"
                    row-class-name="row_class"
                    border>
            <el-table-column align="center" class-name="column-caoz" label="操作">
              <template slot-scope="scope">
                <i class="el-icon-delete" style="color:#00a2fd;cursor: pointer;" title="删除"
                   @click="deleteZM(scope.row,scope.$index)"></i>
              </template>
            </el-table-column>
            <el-table-column align="center" label="子目编号">
              <template slot-scope="{row,$index}">
                <span>{{row.data.bh}}</span>

              </template>
            </el-table-column>
            <el-table-column align="center" label="子目名称">
              <template slot-scope="{row,$index}">
                <span>{{row.data.mc}}</span>

              </template>
            </el-table-column>
            <el-table-column align="center" label="单位">
              <template slot-scope="{row,$index}">
                <span>{{row.data.dw}}</span>

              </template>
            </el-table-column>
            <!-- <el-table-column align="center" label="单价">
              <template slot-scope="{row,$index}">
              <span>{{row.data.dj}}</span>
              </template>
            </el-table-column> -->

            <el-table-column align="center" label="数量">
              <template slot-scope="{row,$index}">
                <input type="number" style="width: 100%;text-align: center;" v-model.number="row.data.sl"/>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="treeBtn" style="padding-bottom: 20px;">
          <el-button size="small" @click="saveAdd" type="text"
                     style="display:block;margin:30px auto 20px;width: 64px;height: 35px;background-color: #DF4D4A;border-radius: 4px;color: #fff">
            保存
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import Dialog from '@/components/Dialog.vue'
  import {returnUserInfo} from '@/helper'
  import {uuid} from '@/helper/index'

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
        isxmmcOfadd: 0,
        isshowzmdetail: false,
        // zll
        gldwlist: [],
        htbhlist: [],
        // lmshForm: {
        //   ybgcmxList: [{htlynr: {}}]
        // },
        index: '',
        isadd: false,
        addzb: false,
        submitLoading: false,
        showxq: false,
        showSearch: false,
        loading: false,
        tableHeight: 300,
        tableData: [],
        total: 10,
        htbh: [],
        showBhForm: false,
        searchCriteria: false,
        qmbbOptions: [],
        roadOptions: [],

        // searchForm: {
        //   htbh: undefined,
        //   gldw: undefined,
        //   selectDate: null,
        //   pageNum:1,
        //   pageSize:10
        // },
        currentPage: 1,
        pageSize: 10,
        personelForm: {},
        showDetail: false,
        multipleSelection: [],
        htList: [],
        searchForm: {
          xmmc: '',
          xmbh: '',
          jcrq: '',
          searchTime: '',
          htbh: undefined,
          selectType: undefined,
          gldw: undefined,
          typeIndex: 0,
          selectState: undefined,
          stateIndex: 0,
          pageNum: 1,
          pageSize: 10
        },
        defaultHtbh: '', // 外协单位默认的合同编号
        defaultHtmc: '', // 外协单位默认的合同名称
        ybmxList: [],
        ybgcindex: 1,

        data4: [],
        defaultProps: {
          children: 'children',
          label: 'text'
        },
        choosedRole: [],
        treeRightData: [],
        initializationForm: {
          djbh: '',
          yjrq: '',
          htmc: '',
          htbh: '',
          yjxm: '',
          yjbw: '',
          gldw: '',
          cbdw: '',
          bzdw: '',
          bzrq: '',
          jcjl: '',
          zlwt: '',
          ybgcnr: ''
          // ybgcmxList: []
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
          gldwbm: undefined,
          outside: ''
        },
        isseedetail: 0,
        outside: true,
        jldModelRules: {
          htmc: [
            {required: true, message: '请选择项目名称', trigger: 'change'}
          ],
          yjrq: [
            {type: 'string', required: true, message: '请选择日期', trigger: 'change'}
          ],
          yjxm: [
            {type: 'string', required: true, message: '请填写隐检项目', trigger: 'change'}
          ],
          yjbw: [
            {type: 'string', required: true, message: '请填写隐检部位', trigger: 'change'}
          ],
          bzdw: [
            {type: 'string', required: true, message: '请填写编制单位', trigger: 'change'}
          ],
          bzrq: [
            {type: 'string', required: true, message: '请选择日期', trigger: 'change'}
          ],
          sfwtgld: [
            {type: 'string', required: true, message: '请选择是否为托管路段', trigger: 'change'}
          ],
          ybgcnr: [
            {type: 'string', required: true, message: '请填写隐蔽工程内容', trigger: 'change'}
          ]
        },
        dialogVisible: false,
        restaurants: [],
        restaurantsBH: [],
        datatypes: '',
        dialogTableTit: { // ok
          XMMC: '项目名称', XMBH: '项目编号'
        },
        dialogData: [ // ok
          {xmmc: '甬台温', xmbh: 'G48'},
          {xmmc: '贵黄', xmbh: 'G56'},
          {xmmc: '桂林', xmbh: 'G99'}
        ],
        files: [],
        uuid: uuid(),
        fileList: []
      }
    },
    mounted () {
      this.userInfo = returnUserInfo()
      // 当前登录为外协单位时，获取合同编号，默认取第一个
      if (this.userInfo.type === '供应商') {
        this.outside = true
        this.$api.getXmListBySpk().then(res => {
          if (res.code === 1) {
            let data = res.data
            if (data.length > 0) {
              this.defaultHtbh = data[0].XMBH
              this.defaultHtmc = data[0].XMMC
              this.searchForm.xmbh = this.defaultHtbh
              this.searchForm.xmmc = this.defaultHtmc
              this.search()
            }
          }
        })
      } else {
        this.outside = false
        this.search()
      }

        this.tableHeight = $('#lkpdlmsh')[0].offsetHeight
        // this.getYbgcHtbhArr()
        // this.getYbgcGldwArr()
        this.initqueryXMBH()
        this.initqueryXMMC()
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.search()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.search()
      },
      // zll
      resizeSearch() {
        this.searchForm.htbh = undefined
        this.searchForm.gldw = undefined
        this.searchForm.selectDate = undefined
        this.searchForm.pageNum = 1
      },
      // 合同编号list
      getYbgcHtbhArr() {
        this.$api.getYbgcHtbhList().then(res => {
          console.log('合同编号list: ' + JSON.stringify(res))
          if (res.status !== 200) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            this.htbhlist = res.data.data
          }
        }).catch(e => {
          console.log(e)
        })
      },
      // 管理单位list
      getYbgcGldwArr() {
        this.$api.getYbgcGldwList().then(res => {
          if (res.status !== 200) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            this.gldwlist = res.data.data
          }
        }).catch(e => {
          console.log(e)
        })
      },
      handleCheckChange(data, checked, indeterminate) {

        // console.log('4.treeRightData: ', JSON.stringify(this.treeRightData))

        // console.log('checked ',JSON.stringify(checked))

        let datas = data
        if (checked) {
          if (!data.children.length) {
            // 判断是否已存在
            let data_id = false
            _.forEach(this.treeRightData, (item) => {
              if (item.id === data.id) {
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
                if (item === data.id) {
                  flag = false
                }
              })
            }
            if (flag) {
              this.choosedRole.push(data.id)
            }
          }
        } else {
          this.treeRightData = this.treeRightData.filter(item => item.id !== data.id)
          this.choosedRole = this.choosedRole.filter(id => id !== data.id)
        }
      },
      // 删除子目里的内容
      deleteZM(info, index) {
        this.treeRightData.splice(index, 1)
        this.choosedRole.splice(index, 1)
      },
      addMx(bol) {
        if (!this.lmshForm.htmc) {
          this.$message({
            message: '请选择项目名称',
            type: 'info'
          })
        } else {
          this.addzb = bol
          // this.lmshForm.jrgsp_htbh = 'LrTestXmId'
          this.$api.createZmxxRootNode2({xmbh: this.lmshForm.htbh}).then(res => {
            let mxhtbh = this.lmshForm.htbh
            let recursion = function (items) {
              for (let i = 0; i < items.length; i++) {
                items[i].data.mxhtbh = mxhtbh
                if (!items[i].data.dj) {
                  items[i].data.dj = 0
                }
                if (items[i].children.length === 0) {
                  items[i].data.sl = 0

                } else {
                  items[i].data.sl = 0
                  recursion(items[i].children)
                }
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

        // console.log('2.treeRightData:' + JSON.stringify(this.treeRightData))
      },
      saveAdd() {
        this.addzb = false
        this.isshowzmdetail = true
        // console.log('3.treeRightData:' + JSON.stringify(this.treeRightData))
      },
      showAdd() {
        this.fileList = []
        this.isxmmcOfadd = 1
        this.lmshForm = _.cloneDeep(this.initializationForm)
        this.lmshForm.bzdwid = this.userInfo.daZzid
        let time = this.formatDate(new Date())
        this.lmshForm.bzrq = time
        this.lmshForm.yjrq = time
        this.lmshForm.bzdw = this.userInfo.daYhmc

        this.showDetail = true
        this.showxq = false
        this.isadd = true
        this.formId = 'ybgc' + new Date().getTime()
        this.lmshForm.djbh = this.formId
        this.treeRightData = []
      },
      // 显示编辑页面的数据
      updateFormDia (row, index) {
        this.showDetail = true
        this.isxmmcOfadd = 1
        this.isadd = false
        this.showxq = false
        // this.lmshForm = JSON.parse(JSON.stringify(row))
        this.lmshForm = row
        this.index = index
        this.treeRightData = []
        this.lmshForm.ybgcmxList.forEach(item => {
          let params = {
            data: {
              id: item.id,
              zmid: item.zmid,
              bh: item.zmh,
              mc: item.zmmc,
              dw: item.dw,
              dj: item.dj,
              sl: item.sl
            }
          }

          this.treeRightData.push(params)
          this.choosedRole.push(item.zmid)
        })
        this.isshowzmdetail = true

        // 获取附件信息
        this.getFilesDataById(row.id)
      },
      // 显示是详情页面
      showBhFormDia(row) {
        this.isxmmcOfadd = 1
        this.showDetail = true
        this.showxq = true
        this.isadd = false
        // this.lmshForm = JSON.parse(JSON.stringify(row))
        this.lmshForm = row
        this.isseedetail = 2

        this.treeRightData = []
        this.lmshForm.ybgcmxList.forEach(item => {
          let params = {
            data: {
              id: item.id,
              zmid: item.zmid,
              bh: item.zmh,
              mc: item.zmmc,
              dw: item.dw,
              dj: item.dj,
              sl: item.sl,
            }
          }
          this.treeRightData.push(params)
          this.choosedRole.push(item.zmid)
        })
        this.isshowzmdetail = true

        this.getFilesDataById(row.id)
      },
      search() {
        this.showSearch = false
        // 日期
        let jcrq = this.searchForm.jcrq
        let ksrq, jsrq
        if (jcrq && jcrq.length) {
          ksrq = jcrq[0]
          jsrq = jcrq[1]
        }

        this.$api.ybgcgetYbgc({
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          daZzid: this.userInfo.daZzid,
          // daYhid: this.userInfo.daYhid,
          // daBmid: this.userInfo.daBmid,
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
            let treeData = []
            this.treeRightData.forEach(item => {
              let obj = {}
              // obj.id = item.id
              // obj.ybid = item.id
              obj.zmid = item.data.id

              obj.zmh = item.data.bh
              obj.zmmc = item.data.mc
              obj.sl = item.data.sl
              obj.dw = item.data.dw
              obj.dj = item.data.dj

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
            params.ybgcmxList = treeData

            // 生成唯一的UUID
            const uuid = this.uuid

            // 有附件，保存文件信息
            if (this.files.length > 0) {
              this.saveFileData(uuid)
            }
            params.id = uuid
            params.spzt = '4001'
            // debugger
            this.$api.ybgcaddYbgc(params).then(res => {
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
            // this.search()
            // this.resetForm()
          } else {
            this.$message({
              type: 'error',
              message: '请输入必填项'
            })
          }
        })
      },
      updateSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let treeData = []
            this.treeRightData.forEach(item => {
              let obj = {}
              obj.id = item.id
              // obj.ybid = item.id
              obj.zmid = item.data.zmid

              obj.zmh = item.data.bh
              obj.zmmc = item.data.mc
              obj.sl = item.data.sl
              obj.dw = item.data.dw
              obj.dj = item.data.dj

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
            this.lmshForm.ybgcmxList = treeData

            // 有附件，保存文件信息
            if (this.files.length > 0) {
              this.saveFileData(this.lmshForm.id)
            } else { // 无附件，调用删除接口
              this.deleteFilesData(this.lmshForm.id)
            }

            // let params = _.assign({},this.lmshForm,this.userInfo)
            this.$api.ybgcupdateYbgc(this.lmshForm).then(res => {
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
            // this.search(this.currentPage, this.pageSize)
            // this.resetForm()
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      },
      onSeleteState(item, index) {
        if (this.outside && item.spzt === '4001') {
          return true
        } else {
          return false
        }
      },
      resetForm() {
        this.showDetail = false
        this.isseedetail = 0
        this.isxmmcOfadd = 0
        this.isshowzmdetail = false
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
            this.$api.ybgcdeleteYbgc('?ids=' + djbharr).then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.search()
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
            pc_name: '15',
            pc_project_id: form.id,
            pc_remarks: '',
            pc_state: '1'
          }).then(res => {
            // 工作流创建成功，提交
            if(res.code === 1) {
              this.$api.ybgcspYbgc('?spzt=4002&ids=' + form.id).then(res => {
                if (res.data.code === 1) {
                  // 提交成功，创建审批流程
                  this.$message({
                    type: 'success',
                    message: '提交成功，正在审批中!'
                  })

                  this.search()
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
      selectHt(value) {
        this.lmshForm.htbh = value.xmbh
        this.lmshForm.htmc = value.xmmc

        this.lmshForm.gldw = value.gldw
        this.lmshForm.gldwid = value.gldwid
        this.lmshForm.cbdw = value.cbdw
        this.lmshForm.cbdwid = value.cbdwid
        this.lmshForm.spzt = 1701

        // this.lmshForm.BZDWID = value.BZDWID
        // this.lmshForm.GLDWID = value.GLDWID
        // this.lmshForm.CBDWID = value.CBDWID

        // this.ybmxList = value.zmhts
      },
      fuzhi(item, index) {
        this.ybgcindex = index
      },
      // 重置信息
      resizeDate() {
        this.searchForm.xmbh = this.defaultHtbh
        this.searchForm.xmmc = this.defaultHtmc
        this.searchForm.searchTime = undefined
        this.searchForm.jcrq = undefined
        this.search()
      },
      showDialog(bol) { // 点击弹框
        this.dialogVisible = true
        this.datatypes = bol
        this.$api.getmcbhList().then(res => {
          if (res.code === 1) {
            this.dialogData = res.data && res.data.length ? res.data : []
          } else {
            this.dialogData = []
          }
        })
      },
      _getmcbhList() { // 获取数据
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
        if (param == 1) {
          this.searchForm.xmmc = item.XMMC
          this.searchForm.xmbh = item.XMBH
        } else {
          this.lmshForm.htmc = item.XMMC
          console.log(item.XMBH)
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
          if (res.code === 1) {
            this.restaurantsBH = res.data && res.data.length ? res.data : []
          } else {
            this.restaurantsBH = []
          }
        })
      },
      closeDialog(val) {
        this.dialogVisible = false
        if (val) {
          if (this.isxmmcOfadd === 1) {
            this.lmshForm.htmc = val.XMMC
            this.lmshForm.htbh = val.XMBH
            this.getOnlyXmgkjcxx(this.lmshForm.htbh)
          } else {
            this.searchForm.xmmc = val.XMMC
            this.searchForm.xmbh = val.XMBH
          }
        }
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
            console.log(res.data, '项目信息111')
            if (res.data && res.data.length !== 0) {
              for (var i = 0; i < res.data.length; i++) {
                this.lmshForm.htbh = res.data[i].xmbh
                this.lmshForm.htmc = res.data[i].xmmc
                this.lmshForm.cbdw = res.data[i].cbdw
                this.lmshForm.gldw = res.data[i].gldw
                //this.lmshForm.qdzh = res.data[i].lxbm
                //this.lmshForm.qdzh = parseFloat(res.data[i].qszh)
                //this.lmshForm.zdzh = res.data[i].cbdw
                //this.lmshForm.zdzh = parseFloat(res.data[i].zzzh)
              }
            }
          }
        }).catch(e => {
          console.log(e)
        })
      },
      // 处理文件上传成功后的数据
      handleUploadFile (res, file, files) {
        if (res.code === 1) {
          this.files = files
        }
      },
      // 文件预览
      preview (file) {
        if(file.response) {
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
      // 详情页面打开附件
      openFile(item){
        window.open(item.url)
      },
      // 处理移除附件的逻辑
      removeFile(file,fileList){
        this.files = fileList
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .sjlselect {
    top: 168px !important;
  }

  .sjlselectr {
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
        .addJLD {
          width: 25%;
        }
        .textarea-jss {
          width: 100%;
          .addJLD-textarea {
            width: 75%;
          }
        }
        // li{
        //   width: 25%;
        //   height: 32px;
        //   display: flex;
        //   align-items: center;
        //   padding: 10px;
        //   // float: left;
        //   // border: 1px solid #D5D6D7;
        //   // border-bottom: none;
        //   color: #52575D!important;
        //   font-size: 12px;
        //   // &:nth-of-type(2n+1){
        //   //   border-right: none;
        //   // }
        //   // &:nth-last-of-type(1),&:nth-last-of-type(2){
        //   //   border-bottom: 1px solid #D5D6D7;
        //   // }
        //   >span{
        //     width: 100px;
        //     height: 100%;
        //     display: flex;
        //     justify-content: flex-end;
        //     align-items: center;
        //     // line-height: 31px;
        //     // text-indent: 1em;
        //     // border-right: 1px solid #D5D6D7;
        //     // background: #F7F8F9;
        //     // float: left;
        //   }
        //   p{
        //     // width: calc(100% - 100px);
        //     flex: 1;
        //     height: 100%;
        //     margin-left: 10px;
        //     display: flex;
        //     align-items: center;
        //     position: relative;
        //     .el-input__inner{
        //       // border: none;
        //       text-align: center;
        //     }
        //   }
        //   .radio_line{
        //     /*span{
        //       display: inline-block;
        //       width: 50%;
        //     }*/
        //     padding: 0 5px;
        //     .el-radio__label{
        //       font-size: 12px;
        //     }
        //   }
        //   /*.tow_line,.three_line{
        //     >span{
        //       display: inline-block;
        //       text-indent: 5px;
        //       float: left;
        //       width: 50%;
        //       height: 100%;
        //       line-height: 31px;
        //       .el-input--mini{
        //         width: calc(100% - 25px);
        //         .el-input__inner{
        //           padding: 0;
        //         }
        //       }
        //     }
        //   }
        //   .three_line{
        //     >span{
        //       width: calc(100%/3);
        //     }
        //   }*/
        // }
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
      .zibnr, .zibiaonr {
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        text-align: center;
        li {
          width: 100%;
          height: 32px;
          float: left;
          border: 1px solid #D5D6D7;
          color: #52575D !important;
          font-size: 12px;
          border-right: none;
          border-bottom: none;
          &:nth-last-of-type(1) {
            border-bottom: 1px solid #D5D6D7;
          }
          > span {
            width: 20%;
            // display: inline-block;
            height: 100%;
            float: left;
            line-height: 31px;
            text-align: center;
            background: #F7F8F9;
            border-right: 1px solid #D5D6D7;
          }
          p {
            width: calc(20%);
            height: 100%;
            line-height: 32px;
            float: left;
            border-right: 1px solid #D5D6D7;
            .el-input__inner {
              border: none;
              text-align: center;
            }
            i {
              color: #00a2fd;
              margin: 0 5px;
            }
          }
        }
      }
      .zibiaonr {
        margin-top: 20px;
        li {
          width: calc(100% / 6);
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
            i {
              color: #00a2fd;
              margin: 0 5px;
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

    .fjlist{
      li{
        list-style: none;
        border: none;
        height: 32px;
        line-height: 32px;
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover{
          background: #D5D6D7;
        }
        i{
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
