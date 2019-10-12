/**
* 专项养护----工程计量单
*/
<template>
  <div id="gcjld" style="height: 100%" v-loading="loading">
    <!-- 展示 -->
    <div class="exhibition" v-if="showDetail == 0">
      <div class="header" >
        <span class="headerTit">工程计量单</span>
        <div class="header_option">
          <ul>
            <li @click="showAdd('add')"><i class="el-icon-edit-outline"> 添加</i></li>
            <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
          </ul>
        </div>
      </div>

      <div class="conter_table" v-if="!showDetail">
        <div class="chaxun">
          <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">

            <el-form-item class="autocomplete" label="项目名称" prop="htbh">
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
            </el-form-item>
            <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <el-button size="mini"  @click="search(1, 10 ,searchForm)" style="background-color: #DF4D4A;border-color:transparent;color: #fff">查询</el-button>
              <el-button size="mini" @click="resizeDate">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                  style="width: 100%;"
                  row-class-name="row_class"
                  border
                  :row-style="{fontFamily: '宋体', fontSize: '12px'}"
                  @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            :selectable="selectables"
            align="center"
            width="60">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="60">
          </el-table-column>
          <el-table-column align="left" prop="xmmc" label="项目名称" sortable show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="dwmc" label="承包单位" sortable  show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="qdzh" label="起点桩号" width="100" sortable show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="zdzh" label="止点桩号" width="100" sortable show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="yd" label="月度" width="80" sortable show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="sqrq" label="申请日期" width="180" sortable show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="djbh" label="状态" width="80" sortable>
            <template scope="scope">
              <span style="color:#00a2fd;text-align: center" v-if="scope.row.spzt === '4001'">自由</span>
              <span style="color:#D34C42;cursor: pointer;text-align: center" v-if="scope.row.spzt==='4002'" >审批中</span>
              <span style="color:#00a2fd;text-align: center" v-if="scope.row.spzt === '4003'">已审核</span>
            </template>
          </el-table-column>
          <el-table-column align="left" class-name="column-caoz" label="操作" width="120">
            <template scope="scope">
              <span style="color:#00a2fd;cursor: pointer;text-align: center" v-if="scope.row.spzt === '4001'" @click="updateFormDia(scope.row, scope.$index); isseedetail = 0">编辑</span>
              <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row);showDetail = 3">详情</span>
              <!---->
              <span v-if="scope.row.spzt === '4001'"  style="color:#00a2fd;cursor: pointer;text-align: center"  @click="shenhe(scope.row, scope.$index)">提交</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <footer class="footer" v-if="!showDetail">
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

    </div>
    <Dialog :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :dialogVisible="dialogVisible"
            @searchXMMC="searchXMMC"
            @searchXMBH="searchXMBH"
            @closeDialog="closeDialog">
    </Dialog>

    <!-- 添加子目 -->
    <div class="add"  v-if="showDetail == 1"  @close="resetForm">
      <div class= "addShow" style="position:relative;">
        <div class="addHead">
          <p class="tabAreaTit" v-if="!addzb">
            <span class="titleclasschild"  @click="showDetail = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
            <span>工程计量单</span>
          </p>
          <el-button size="mini" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit('jldModel')">保存</el-button>
          <el-button size="mini" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit('jldModel')">保存</el-button>
            <!-- <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button> -->

        </div>


        <!-- <p class="tabAreaTit" v-if="addzb">
          <span class="titleclasschild"  @click="addzb = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>添加子目</span>
        </p> -->
        <!-- <div class="SPState" v-if="!addzb">
          <el-button size="mini" @click="addzb = true"><i class="el-icon-edit-outline" title="添加"></i>添加子目</el-button>
        </div> -->
        <!-- <div class="SPState" v-if="addzb&&tabindex===0">
          <el-button size="mini" @click="addzibiao"><i class="el-icon-edit-outline" title="添加"></i>添加</el-button>
        </div> -->

        <div class="dialog_warp2">
         <!-- 添加编辑 -->
          <div v-if="isseedetail == 0" style="padding:0 40px">
            <el-form class="zhubnr" :model="jldModel"  ref="jldModel" :rules="jldModelRules">
              <el-form-item class="addJLD" label="单据名称">
<!--                <el-input  v-model="jldModel.djbh" size="mini"  placeholder="请输入内容" disabled></el-input>-->
                <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.djbh}}</label>
              </el-form-item>

              <el-form-item class="addJLD" label="项目名称" prop="xmmc" style="z-index: 100">
                <!-- :disabled="isseedetail == 1" -->
                <el-autocomplete
                  class="inline-input"
                  size="mini"
                  :disabled="showxq"
                  v-model="jldModel.xmmc"
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

              <el-form-item class="addJLD" label="申请日期" prop="sqrq">
                <!--<el-date-picker
                  disabled
                  v-model="jldModel.sqrq"
                  required
                  size="mini"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd">
                </el-date-picker>-->
                <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.sqrq}}</label>
              </el-form-item>

              <el-form-item class="addJLD" label="月度" prop="yd">
                <el-date-picker
                  :disabled="showxq"
                  v-model="jldModel.yd"
                  required
                  size="mini"
                  type="month"
                  placeholder="选择日期"
                  format="MM"
                  value-format="MM">
                </el-date-picker>
              </el-form-item>

              <el-form-item class="addJLD" label="合同编号">
<!--                <el-input  v-model="jldModel.xmbh" size="mini"  placeholder="请输入内容" disabled></el-input>-->
                <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.xmbh}}</label>
              </el-form-item>

              <el-form-item class="addJLD" label="承包单位">
<!--                <el-input  v-model="jldModel.dwmc" size="mini"  placeholder="请输入内容" disabled></el-input>-->
                <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.dwmc}}</label>
              </el-form-item>

              <el-form-item class="addJLD" label="起点桩号" prop="qdzh">
                <el-input  v-model="jldModel.qdzh" size="mini"  placeholder="请输入内容" :disabled="showxq"></el-input>
              </el-form-item>

              <el-form-item class="addJLD" label="止点桩号" prop="zdzh">
                <el-input  v-model="jldModel.zdzh" size="mini"  placeholder="请输入内容" :disabled="showxq"></el-input>
              </el-form-item>

              <el-form-item class="addJLD" label="部位" prop="bw">
                <el-input  v-model="jldModel.bw" size="mini"  placeholder="请输入内容" :disabled="showxq"></el-input>
              </el-form-item>

              <el-form-item class="addJLD" label="图号" prop="th">
                <el-input  v-model="jldModel.th" size="mini"  placeholder="请输入内容" :disabled="showxq"></el-input>
              </el-form-item>

              <el-form-item class="addJLD" label="质检单名称" prop="zjdbh">
                <el-input  v-model="jldModel.zjdbh" size="mini"  placeholder="请输入内容" :disabled="showxq"></el-input>
              </el-form-item>

              <el-form-item class="addJLD" label="是否隐蔽工程">
                <el-radio style="height: 100%;"  v-model="jldModel.sfybgc" label="是" :disabled="istab" :key="0"></el-radio>
                <el-radio style="height: 100%;"  v-model="jldModel.sfybgc" label="否" :disabled="istab" :key="1"></el-radio>
              </el-form-item>

              <el-form-item class="addJLD" label="隐蔽工程检查单号" prop="ybgcdh">
<!--                <el-input  v-model="jldModel.ybgcdh" size="mini"  placeholder="请输入内容" disabled></el-input>-->
                <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{jldModel.ybgcdh}}</label>
              </el-form-item>

              <el-form-item class="addJLD" label="填报单位" prop="tbdw">
                <el-input  v-model="jldModel.tbdw" size="mini"  placeholder="请输入内容" :disabled="showxq"></el-input>
              </el-form-item>

              <el-form-item class="addJLD" label="填报日期" prop="tbrq">
                <el-date-picker
                  :disabled="showxq"
                  v-model="jldModel.tbrq"
                  required
                  size="mini"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item class="addJLD" label="是否为托管单位"  v-show="isShowTgld">
                <el-radio style="height: 100%;"  v-model="jldModel.sfwtgld" label="是" :disabled="istab" :key="0"></el-radio>
                <el-radio style="height: 100%;"  v-model="jldModel.sfwtgld" label="否" :disabled="istab" :key="1"></el-radio>
              </el-form-item>
              <div class="textarea-jss">
                <el-form-item class="addJLD-textarea"   label="计算式及简图说明" >
                  <el-input type="textarea"   v-model="jldModel.jtsm" :disabled="showxq"></el-input>
                </el-form-item>
                <el-form-item class="addJLD-textarea"   label="附件" >
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
                </el-form-item>
              </div>

            </el-form>

          </div>

          <div class="taskShow">
            <div class="taskShowHead">
              <p>任务单</p>
                <el-button size="mini" v-if="jldModel.sfybgc === '是' " @click="handOneRowSecod('是')" style="background-color: #DF4D4A;border-color: transparent;color: #fff;float: right;margin-top: 3px;" class="dialog-button bao_cun">
                  <i style="color: #fff;" class="icon iconfont icon-past"></i>
                  添加隐蔽工程
                </el-button>
                <el-button size="mini" v-if="jldModel.sfybgc === '否' " class="dialog-button bao_cun"  style="background-color: #DF4D4A;border-color: transparent;color: #fff;float: right;margin-top: 3px;" @click="addMx(true)">
                    添加子目
                </el-button>
            </div>
            <el-table  :data="selectMxList" tooltip-effect="dark"
                  style="width: 95%;margin: 20px auto"
                  row-class-name="row_class"
                  border>
              <el-table-column
                type="index"
                align="center"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column   align="center" sortable  label="子目编号"  show-overflow-tooltip>
                <template slot-scope="{row,$index}">
                  <span>{{row.zmh ?row.zmh : row.bh }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column v-if="jldModel.sfybgc === '否' "  align="center" sortable label="子目编号"  show-overflow-tooltip>
                <template slot-scope="{row,$index}">
                  <span>{{row.bh}}</span>
                </template>
              </el-table-column> -->

              <el-table-column align="center" sortable    prop="zmmc" label="子目名称" show-overflow-tooltip>
                <template slot-scope="{row,$index}">
                  <span>{{row.zmmc ? row.zmmc : row.mc}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" sortable  prop="dw" label="单位">
              </el-table-column>
              <el-table-column align="center" sortable  prop="sl" label="数量">
                <template slot-scope="{row,$index}">
                  <span>{{row.sl ? row.sl : row.wcsl}}</span>
                </template>
              </el-table-column>
            </el-table>

          </div>

        </div>
      </div>
    </div>
    <!-- 添加隐蔽工程 -->
        <div class="tabArea" style="position: relative" v-if="showDetail == 2" >
          <div style="position:relative;">
            <p class="tabAreaTit">
              <span class="titleclasschild"  @click="promiseTG()"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
              <span>工程计量单</span>
            </p>
            <div class="SPState" >
              <el-button size="mini" style="display:block;margin: auto;background-color: #DF4D4A;border-color:transparent;color: #fff" @click="showDetail = 1">
                <i style="color:#fff;" class="icon iconfont icon-past"></i>保存
              </el-button>
            </div>
          </div>
          <el-table :data="detailItemInfo" tooltip-effect="dark"
                    ref="multipleTable"
                    style="width: calc(100% - 23px);max-height: 250px;overflow-y: auto"
                    row-class-name="row_class"
                    @selection-change="handleSelectionChangeadd"
                    border>
            <el-table-column
              type="selection"
              align="center"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="50">
            </el-table-column>

            <el-table-column align="left" prop="htbh" label="项目编号" show-overflow-tooltip> </el-table-column>
            <el-table-column align="left" prop="htmc" label="项目名称" show-overflow-tooltip> </el-table-column>
            <el-table-column align="left" prop="ybgcnr" label="隐蔽工程内容" show-overflow-tooltip> </el-table-column>
            <el-table-column align="left" prop="yjrq" label="隐蔽日期" show-overflow-tooltip> </el-table-column>
          </el-table>
        </div>

        <!-- 添加子目 -->
        <!-- <div class="tabArea" v-if="showDetail == 3" >

        </div> -->
        <el-dialog
          title="添加子目"
          :visible.sync="addzb"
          width="1100px"
          class="addzmstyle"
          z-index='99'
        >
          <div class="treeWrap">
              <div class="tree" style="height: 470px;overflow-y: auto;display: inline-block;width: 180px;vertical-align: top">
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
              <div class="treeRight" style="height: 470px;overflow-y: auto;display: inline-block;width:calc(100% - 200px)">
                <el-table tooltip-effect="dark"
                          :data="treeRightData"
                          row-class-name="row_class"
                          border>
                  <el-table-column align="center" class-name="column-caoz" label="操作" width="50">
                    <template slot-scope="scope">
                      <i class="el-icon-delete"  style="color:#00a2fd;cursor: pointer;" title="删除"  @click="deleteZM(scope.row,scope.$index)"></i>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="子目编号" width="80">
                    <template slot-scope="{row,$index}">
                      <span >{{row.data.bh}}</span>

                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="子目名称">
                    <template slot-scope="{row,$index}">
                      <span>{{row.data.mc}}</span>

                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="单位" width="60">
                    <template slot-scope="{row,$index}">
                      <span >{{row.data.dw}}</span>

                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="数量" width="60">
                    <template slot-scope="{row,$index}">
                      <input type="text"  style="width: 100%" v-model="row.data.sl">

                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="单价" width="60">
                    <template slot-scope="{row,$index}">
                    <span>{{row.data.dj}}</span>

                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="yd" label="金额" width="100">
                    <template slot-scope="{row,$index}">
                    <span>{{Number(row.data.sl)*Number(row.data.dj)}}</span>

                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="用途">
                    <template slot-scope="{row,$index}">
                      <input type="text" style="width: 100%"  v-model="row.data.yt">
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="treeBtn" style="margin-top: 10px;">
                <el-button size="small" @click="saveAdd" type="text" style="display:block;margin:0px auto;width: 64px;height: 35px;background-color: #DF4D4A;border-radius: 4px;color: #fff">保存</el-button>
              </div>
          </div>
        </el-dialog>
          <!-- 点击详情 -->
        <div class= "details" v-if="showDetail == 3">
          <div class="addHead">
            <p class="tabAreaTit" v-if="!addzb">
              <span class="titleclasschild"  @click="showDetail = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
              <span>工程计量单</span>
            </p>
          </div>
          <div class="detailsCon">
            <ul>
              <li>
                <span>单据名称：</span>
                <span>{{jldModel.djbh}}</span>
              </li>
              <li>
                <span>项目名称：</span>
                <span>{{jldModel.xmmc}}</span>
              </li>
              <li>
                <span>申请日期：</span>
                <span>{{jldModel.sqrq}}</span>
              </li>
              <li>
                <span>月度：</span>
                <span>{{jldModel.yd}}</span>
              </li>
              <li>
                <span>合同编号：</span>
                <span>{{jldModel.xmbh}}</span>
              </li>
              <li>
                <span>承包单位：</span>
                <span>{{jldModel.dwmc}}</span>
              </li>
              <li>
                <span>起点桩号：</span>
                <span>{{jldModel.qdzh}}</span>
              </li>
              <li>
                <span>止点桩号：</span>
                <span>{{jldModel.zdzh}}</span>
              </li>
              <li>
                <span>部位：</span>
                <span>{{jldModel.bw}}</span>
              </li>
              <li>
                <span>图号：</span>
                <span>{{jldModel.th}}</span>
              </li>
              <li>
                <span>质检单名称：</span>
                <span>{{jldModel.zjdbh}}</span>
              </li>
              <li>
                <span>是否隐蔽工程：</span>
                <span>{{jldModel.sfybgc}}</span>
              </li>
              <li>
                <span>隐蔽工程检查单号：</span>
                <span>{{jldModel.ybgcdh}}</span>
              </li>
              <li>
                <span>填报单位：</span>
                <span>{{jldModel.tbdw}}</span>
              </li>
              <li>
                <span>填报日期：</span>
                <span>{{jldModel.tbrq}}</span>
              </li>
              <div>
                <p>计算式及简图说明：</p>
                <p>{{jldModel.jtsm}}</p>
              </div>
            </ul>


          </div>
          <div class="taskShows">
            <div class="taskShowHeads">
              <p>任务单</p>
            </div>
            <el-table  :data="selectMxList" tooltip-effect="dark"
                  style="width: 95%;margin: 20px auto"
                  row-class-name="row_class"
                  border>
              <el-table-column
                type="index"
                align="center"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column  align="center"  label="子目编号"  show-overflow-tooltip>
                <template slot-scope="{row,$index}">
                  <span>{{row.zmh ? row.zmh :row.bh}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center"   prop="zmmc" label="子目名称" show-overflow-tooltip>
                <template slot-scope="{row,$index}">
                  <span>{{row.zmmc?row.zmmc:row.mc}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center"   prop="dw" label="单位"> </el-table-column>
              <el-table-column align="center"   prop="sl" label="数量">
                <template slot-scope="{row,$index}">
                  <span>{{row.sl ? row.sl : row.wcsl}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
  </div>
</template>

<script>

import Dialog from '@/components/Dialog.vue'
import { returnUserInfo } from '@/helper'
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
    return {
      isShowTgld:false,
      index: '',
      isadd: false,
      isshoubj:false,
      addzb: false,
      submitLoading: false,
      showxq: false,
      showSearch: false,
      loading: false,
      tableHeight: 300,
      tableData: [],
      total: 0,
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      roadOptions: [],

      currentPage: 1,
      pageSize: 10,
      personelForm: {},

      multipleSelection: [],
      htbh: {},
      htList: [],
      fileList:[],
      userInfo:{},
      tabindex: 0,
      istab:false,


      data4:[
          {
            id: "id1",
            // text: "第100章",
            // isFinalLeafNode: null,
            // data: {
            //   id: "id1",
            //   xmbh: "LrTestXmId",
            //   bh: "第100章",
            //   mc: "第100章  总则",
            //   dw: null,
            //   sl: null,
            //   dj: null,
            //   hj: null,
            //   bz: null,
            //   pid: null,
            //   xh: "1"
            // },
            children: [
              {
                id: "id2",
                text: "101-1",
                isFinalLeafNode: null,
                data: {
                  id: "id2",
                  xmbh: "LrTestXmId",
                  bh: "101-1",
                  mc: "保险费",
                  dw: null,
                  sl: null,
                  dj: null,
                  hj: null,
                  bz: null,
                  pid: "id1",
                  xh: "1"
                },
                children: [
                  {
                    id: "id3",
                    text: "-a",
                    isFinalLeafNode: null,
                    data: {
                      "id": "id3",
                      "xmbh": "LrTestXmId",
                      "bh": "-a",
                      "mc": "按合同条款规定，提供建筑工程一切险",
                      "dw": "总额",
                      "sl": "1",
                      "dj": null,
                      "hj": "0",
                      "bz": null,
                      "pid": "id2",
                      "xh": "1"
                    },
                    "children": []
                  },
                  {
                    "id": "id4",
                    "text": "-b",
                    "isFinalLeafNode": null,
                    "data": {
                      "id": "id4",
                      "xmbh": "LrTestXmId",
                      "bh": "-b",
                      "mc": "按合同条款规定，提供第三方责任险",
                      "dw": "总额",
                      "sl": "1",
                      "dj": null,
                      "hj": "0",
                      "bz": null,
                      "pid": "id2",
                      "xh": "2"
                    },
                    "children": []
                  }
                ]
              },
              {
                id: "id5",
                text: "102-1",
                isFinalLeafNode: null,
                data: {
                  id: "id5",
                  xmbh: "LrTestXmId",
                  bh: "102-1",
                  mc: "竣工文件（档案资料编制）",
                  dw: "总额",
                  sl: "1",
                  dj: null,
                  hj: "0",
                  bz: null,
                  pid: "id1",
                  xh: "2"
                },
                children: []
              },
              {
                id: "id6",
                text: "102-2",
                isFinalLeafNode: null,
                data: {
                  id: "id6",
                  xmbh: "LrTestXmId",
                  bh: "102-2",
                  mc: "安全生产费",
                  dw: "总额",
                  sl: "1",
                  dj: null,
                  hj: "0",
                  bz: null,
                  pid: "id1",
                  xh: "3"
                },
                children: []
              },
              {
                id: "id7",
                text: "104-1",
                isFinalLeafNode: null,
                data: {
                  id: "id7",
                  xmbh: "LrTestXmId",
                  bh: "104-1",
                  mc: "承包人驻地建设",
                  dw: "总额",
                  sl: "1",
                  dj: null,
                  hj: "0",
                  bz: null,
                  pid: "id1",
                  xh: "4"
                },
                children: []
              }
            ]
          },

      ],
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      treeRightData:[],
      choosedRole:[],


      jldModel: {
        djbh: '',
        xmmc: '',
        sqrq: '',
        yd: '',
        xmbh: '',
        dwmc: '',
        qdzh: '',
        zdzh: '',
        bw: '',
        th: '',
        zjdbh: '',
        sfybgc:'是',
        ybgcdh: '',
        tbrq: null,
        jtsm: '',
        cbdwid:'',
        cbdwbh:'',
        ybids:'',
        mxList:[],
        sfwtgld:'否'
      },
      showDetail:0, // 控制页面显示
      jldModelRules: {

        qdzh: [
          {type: 'string', required: true,  message: '请输入起点桩号', trigger: 'blur'}
        ],

        zdzh: [
          {type: 'string', required: true,  message: '请输入止点桩号', trigger: 'blur'}
        ],
        bw: [
          {type: 'string', required: true,  message: '请输入部位', trigger: 'blur'}
        ],
        th: [
          {type: 'string', required: true,  message: '请输入图号', trigger: 'blur'}
        ],
        zjdbh: [
          {type: 'string', required: true,  message: '请输入质检单名称', trigger: 'blur'}
        ],
        tbdw: [
          {type: 'string', required: true,  message: '请输入填报单位', trigger: 'blur'}
        ],
        tbrq: [
          {type: 'string', required: true,  message: '请输入填报日期', trigger: 'blur'}
        ],

      },

      isseedetail: 0,
      searchForm:{
        xmmc:'',
        xmbh:'',
        jcrq:'',
        searchTime:'',
        selectType:undefined,
        typeIndex:0,
        selectState:undefined,
        stateIndex:0,
        pageNum:1,
        pageSize:10,
      },
      dialogVisible:false,
      restaurants:[ ],
      restaurantsBH:[ ],
      datatypes:'',
      dialogTableTit:{ XMMC:'项目名称',XMBH:'项目编号',},
      dialogData:[],
      showFirstItemWindow:false,
      detailItemInfo:[],// 添加隐蔽
      selectMxList:[],// 添加隐蔽回显
      mxList:[],
      newArr:[],
      istjbj:'添加'

    }
  },
  watch:{
    'jldModel.sfybgc':(v)=>{

    }
  },
  mounted () {
    this.userInfo = returnUserInfo()

    this.$api.getmcbhList().then(res => {
      console.log(res)
      if(res.code == 1){
        this.htList = res.data.data
      }
    })
    this.search()
  /*  this.initqueryXMBH()*/
    this.initqueryXMMC()
    this.jldModel.bzdw = this.userInfo.daZzmc
  },
  methods: {
    search () { // 请求列表
      this.showSearch = false
      if (this.searchForm.jcrq) {
        this.searchForm.ksrq = this.searchForm.jcrq[0]
        this.searchForm.jsrq = this.searchForm.jcrq[1]
      }
      this.$api.gczfgetGcjldList({
        pageNum:this.currentPage,
        pageSize:this.pageSize,
        daZzid:this.userInfo.daZzid,
/*        daYhid:this.userInfo.daYhid,
        daBmid:this.userInfo.daBmid,*/
        xmbh:this.searchForm.xmbh,
        xmmc:this.searchForm.xmmc,
        startDate:this.searchForm.ksrq|| '',
        endDate:this.searchForm.jsrq || ''
      }).then(resp => {
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
    showAdd () {// 添加
      this.istjbj = '添加'
      this.istab = false
      this.jldModel= {
        djbh: '',
        xmmc: '',
        sqrq: '',
        yd: '',
        xmbh: '',
        dwmc: '',
        qdzh: '',
        zdzh: '',
        bw: '',
        th: '',
        zjdbh: '',
        sfybgc:'是',
        ybgcdh: '',
        tbrq: null,
        jtsm: '',
        cbdwid:'',
        cbdwbh:'',
        ybids:'',
        mxList:[],
        sfwtgld:'否'
      }
      this.selectMxList = []
      let newDate = new Date()
      this.showDetail = 1
      this.showxq = false
      this.isadd = true
      this.formId = 'gcjl' + new Date().getTime()
      this.jldModel.djbh = this.formId
      this.getYear ()
    },
    getYear () {
      let now = new Date()
      let year = now.getFullYear() //年
      let month = now.getMonth() + 1 //月
      let day = now.getDate() //日
      let clock = year + "-" + (month < 10 ? '0' + month : month) +'-' + (day < 10 ? '0' + day: day)

      this.jldModel.tbrq = clock
      this.jldModel.sqrq = clock
      this.jldModel.yd = ''+month
    },
    handOneRowSecod(bol){ // 点击添加隐蔽任务

       let selectVal =  this.jldModel.xmbh
       this.jldModel.sfybgc = '是'
      console.log(this.jldModel,'==jldModel')
      this.selectMxList = []
      if (selectVal){
        if(bol === '是') {
          this.showDetail = 2
          if(this.istjbj === '添加'){
             this.$api.getYbgcToInsertGcjld({xmbh:selectVal,sfwtgld:this.jldModel.sfwtgld}).then(res=>{
              if(res.data.code == 1){
                if(res.data.data){
                  this.detailItemInfo = res.data.data
                }
              }
            })
          }else{
            this.$api.getYbgcToInsertGcjld({xmbh:selectVal,gcjlId:this.jldModel.id,sfwtgld:this.jldModel.sfwtgld}).then(res=>{
              if(res.data.code == 1){
                if(res.data.data){
                  this.detailItemInfo = res.data.data
                }
              }
            })
          }
      }
      }
      else{
        this.$message({
          message: '请选择相对应的项目编号',
          type: 'warning'
      } );
      }
    },
    addSubmit (formName) {// 点击添加保存
      this.$refs[formName].validate((valid) =>{
        if(valid){

          let mxList = []
          let _this= this
          this.selectMxList.map(function(item){
            _this.jldModel.mxList.push(item)
          })
          let params = _.assign({},{sfybgh:this.sfybgc},{dwmc:this.jldModel.dwmc},{dwid:this.jldModel.cbdwid},{dwbh:this.jldModel.cbdwbh},this.jldModel,this.userInfo,{mxList:this.jldModel.mxList},{ybgcids:this.jldModel.ybids},{ybgcdh:this.jldModel.djbh})
           if(_this.jldModel.mxList.length){
             this.$api.addGcjldForGczf(params).then(res => {
               if (res.data.code === 1) {
                 this.showDetail = 0
                 this.$message({
                   type: 'success',
                   message: '添加成功!'
                 })
                 this.search()
               } else {
                 this.$message({
                   type: 'error',
                   message: res.data.msg
                 })
               }
             })
           }else{
             this.$message({
               type: 'info',
               message: '请先添加隐蔽工程'
             })
           }


        }
      })

    },
    selectables(val,i){
      if(val.spzt==='4001'){
        return true
      }else{
        return false
      }

    },
    updateFormDia (row, index) {// 编辑

      this.istjbj = '编辑'
      this.showDetail = 1
      this.istab = true
      this.isadd = false
      this.showxq = false
      this.jldModel = JSON.parse(JSON.stringify({...row}))
      this.selectMxList = JSON.parse(JSON.stringify({...row})).mxList
      this.index = index
      this.htbh = {
        htbh: row.htbh
      }
    },
    updateSubmit (formName) {// 点击编辑保存
      this.jldModel.mxList = []
      this.showDetail = 0
      let _this= this
      this.selectMxList.map(function(item){
        _this.jldModel.mxList.push({
          dw:item.dw,
          zmh:item.bh || item.zmh,
          zmmc:item.mc || item.zmmc,
          wcsl:item.yt || item.sl,
          zmid:item.zmid || item.id
        })
      })
      this.$refs[formName].validate((valid) =>{
        if(valid){
          let params = _.assign({},{sfybgh:this.sfybgc},{dwmc:this.jldModel.dwmc},{dwid:this.jldModel.cbdwid},{dwbh:this.jldModel.cbdwbh},this.jldModel,this.userInfo,{mxList:this.jldModel.mxList},{ybgcids:this.jldModel.ybgcids},{ybgcdh:this.jldModel.djbh})

          this.$api.editGcjldForGczf(params).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '编辑成功!'
              })
              this.search()
              // this.rukufile()
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        }
       })
    },
     showBhFormDia (row) {// 详情
      // this.isseedetail = 1
      this.showDetail = true
      this.showxq = true
      this.jldModel = JSON.parse(JSON.stringify({...row}))
      this.selectMxList = JSON.parse(JSON.stringify({...row})).mxList
      this.htbh = {
        htbh: row.htbh
      }
    },
    promiseTG () { // 点击子目回退
      this.showDetail = 1
    },
    addMx(bol){ // 点击添加子目
      this.treeRightData = []
      this.selectMxList= []
      this.treeRightData = []
      this.data4 = []
      let selectVal =  this.jldModel.xmbh
      this.jldModel.sfybgc = '否'

      if(!selectVal){
        this.$message({
          message: '请选择工程名称',
          type: 'info'
        });
      }else{
        this.addzb = true
        this.$api.createZmxxRootNode2({xmbh:selectVal}).then(res=>{
          if(res.code == 1){
            this.data4 = res.data.length?res.data:[]
          }else{
            this.data4 = []
          }
        })
      }
    },
    handleCheckChange(data, checked, indeterminate) {// 添加子目的方法

      let datas = data
      if(checked){
          if(!data.children.length){
            this.treeRightData.push(data)
          }
      }else{
        this.treeRightData = this.treeRightData.filter(item=>  item.id != datas.id)
      }
    },
    deleteZM(info,index){
      // this.lmshForm.sgjhsbmx.splice(index, 1)
    this.treeRightData.splice(index,1)
      // this.choosedRole
    },
    saveAdd(){// 点击添加子目保存
        this.addzb = false
        this.isshowzmdetail = true
        this.mxList  = this.treeRightData
        let self = this
        this.mxList.forEach(item=>{
          self.selectMxList.push(item.data)

        })

    },
    deleteData () {// 点击删除
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

          this.$api.delGcjldForGczf('?id=' + djbharr).then(res => {

            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              // this.handleRemove(this.jldModel.djbh)
              this.search()
              this.resetForm()
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
     _getOnlyXmgkjcxx (val) { // 根据项目编号的弹框搜索的项目编号获取项目信息

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
              this.jldModel.dwmc = res.data[i].cbdw
              this.jldModel.cbdwbh = res.data[i].cbdwbh
              this.jldModel.cbdwid = res.data[i].cbdwid
              this.jldModel.gldw = res.data[i].gldw
              this.jldModel.sprq = res.data[i].sprq
            }
          }
        }
      })
    },
    shenhe (row, index) {// 状态
      let {yhmc,yhid,bmmc,orgmc} = config.userInfo
      this.$confirm('是否通过审核？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let form = JSON.parse(JSON.stringify(row))
        this.$api.createWorkFlow({
          pc_initiator:yhmc,
          pc_initiatorid: yhid,
          pc_name: '40',
          pc_project_id: form.id,
          pc_remarks: '',
          pc_state: '',
        },{
          group:bmmc,
          org:orgmc}).then(resp=>{
            if(resp.code == 1){
              this.$api.spGcjldForGczf('?spzt='+ '4002' + '&id='+form.id).then(res => {
                if (res.data.code === 1) {
                  this.$message({
                    type: 'success',
                    message: '审核通过!'
                  })
                  this.search()
                  this.resetForm()
                }else{
                  this.$message({
                    type: 'warning',
                    message: res.data.msg
                  });
                }

              })
            }else{
              this.$message({
                type: 'warning',
                message: resp.msg
              });
            }
        })

      }).catch(() => {

        this.$message({
          type: 'info',
          message: '取消审核'
        })
      })
    },
    addzibiao () {
      this.jldModel.mx.push({mid: this.jldModel.id})
    },
    deletezibiao (index) {
      this.jldModel.mx.splice(index, 1)
    },
    handleSelectionChange (val) { //复选框
      this.multipleSelection = val
    },
    handleSelectionChangeadd (val){ //子目隐蔽勾选
      if(val.length){
        let self = this
        let str = ''
        let ybid = ''
        let ybgcdh
        let ybids
        let ids = val.map((item,ind)=>{
            return item.ybgcmxList[0].ybid
          })
        let idss = ids.join(',')
        this.$api.getYbgcMxByYbgcIds({ids:idss}).then(res => {
            if (res.data.code === 1) {
              this.selectMxList = res.data.data
            }
        })
        val.map((item,i)=>{

           str += item.djbh+','
           ybid += item.id+','
        })
        ybgcdh = str.split(',')
        ybids = ybid.split(',')
        ybgcdh.splice(ybgcdh.length-1,1)
        ybids.splice(ybids.length-1,1)
        self.jldModel.ybgcdh = ybgcdh.join(',')
        self.jldModel.ybids = ybids.join(',')



        // val.map((item)=>{
        //   if(JSON.stringify(self.selectMxList).indexOf(JSON.stringify(...item.ybgcmxList)) == -1){
        //
        //     self.newArr.push(item)
        //   }
        // })
      }


    },
    handleSizeChange (val) { // 页数
      this.pageSize = val
      this.search()
    },
    handleCurrentChange (val) { // 页数
      this.currentPage = val
      this.search()
    },
    resetForm () { // 清空数据
      this.showDetail = false
      this.jldModel = {
        mx: [{}]
      }
    },
    resizeDate(){//重置信息
      this.searchForm.xmmc = undefined
      this.searchForm.xmbh = undefined
      this.searchForm.searchTime = undefined
      this.searchForm.jcrq = undefined
      this.searchForm.ksrq =undefined
      this.searchForm.jsrq=undefined

      this.search()
    },
    tablable (num) {
      this.tabindex = num
    },
    showDialog(bol) {// 点击弹框
      this.dialogVisible = true
      this.datatypes = bol

      this.$api.getmcbhList().then(res=>{
        if(res.code == 1){
          this.dialogData = res.data&&res.data.length?res.data:[]
        }else{
          this.dialogData = []
        }
      })
    },
    querySearchMC(queryString, cb) {
      let  restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString,'XMMC')) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
    handleSelectMC(event,param){ // 下拉选择
      console.log(event,param, '切换项目名称')
      if (param == 1) {
        this.searchForm.xmmc = event.XMMC
        this.searchForm.xmbh = event.XMBH
      } else {
        this.jldModel.xmmc = event.XMMC
        this.jldModel.xmbh = event.XMBH
        this.jldModel.sfwtgld = event.SFWTGLD
        this.isShowTgld = event.SFWTGLD == '是'?true:false
        if (event.XMBH) {
          this._getOnlyXmgkjcxx(event.XMBH)
        }
      }
      },
    createFilter(queryString,val) {
      return (restaurant) => {
        return (restaurant[val].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
//Dialog
    closeDialog(val){ // 关闭窗口
     this.dialogVisible = false
     if(val){
       if (this.isseedetail == 0) {
         this.jldModel.xmmc = val.XMMC
         this.jldModel.xmbh = val.XMBH
         this._getOnlyXmgkjcxx(this.jldModel.xmbh)
       } else {
         this.searchForm.xmmc = val.XMMC
         this.searchForm.xmbh = val.XMBH
       }
      }
     },
    searchXMMC(val){ // 项目名称模糊搜索
      this.$api.getXmmcListt({xmmc:val}).then(res=>{
        if(res.code == 1){
          this.dialogData = res.data&&res.data.length?res.data:[]
        }else{
          this.dialogData = []
        }
      })
    },
    searchXMBH(val){ //项目编号模糊搜索
        this.$api.getXmbhmhList({xmbh:val}).then(res=>{
          if(res.code == 1){
            this.dialogData = res.data&&res.data.length?res.data:[]
          }else{
            this.dialogData = []
          }
        })
      },
    initqueryXMBH(){ // 公共查询项目编号
        this.$api.getmcbhList().then(res=>{
          if(res.code == 1){
            this.restaurantsBH = res.data&&res.data.length?res.data:[]
          }else{
            this.restaurantsBH = []
          }

        })
    },
    initqueryXMMC(){
         this.$api.getmcbhList().then(res=>{
           if(res.code == 1){
             this.restaurants = res.data&&res.data.length?res.data:[]
           }else{
             this.restaurants = []
           }

         })
      },


  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.details{
  width: 100%;
  .addHead{
    width: 100%;
    height: 46px !important;
    line-height: 46px !important;
    color: #111;
    font-weight: 700;
    font-size: 16px !important;
    color: #111;
    color: #111;
    background: #f6f6f6;
    padding-left: 16px !important;
    margin-bottom: 12px;
    p{
      i{
        font-weight: 700;
        font-size: 16px;
        color: #111;
      }
    }
  }
  .detailsCon{
    width: 100%;
    padding: 0 20px;
    ul{
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      li{
        width: 25%;
        height: 40px;
        display: flex;
        span{
          &:nth-child(1){
             width: 9rem;
             text-align: end;
          }

        }
      }
      div{
        width: 75%;
        padding: 10px 0;
      }
    }
  }
   .taskShows{
      width: 100%;
      .taskShowHeads{
        width: 100%;
        height:46px ;
        padding: 0 20px;
        align-items: center;
        justify-content: space-between;
        background: #F6F6F6;
        p{
          font-weight:  bold;
          color: #111;
          font-size: 16px!important;
          line-height: 46px;
        }

    }
    }
}

  #gcjld{
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
      .search{
        height: 500px;
      }
    }
    .footer{
      // height: 45px;
      position: absolute;
      z-index: 100;
      right: 0;
        bottom: 40px;
        >div{
          margin-right: 20px;
        }

    }
    .dialog_warp2{
      background: #fff;
      padding-top: 20px;
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
          width: 100%;
        display: flex;
        flex-wrap: wrap;
        .addJLD{
          width: 25%;
          .el-form-item__label{
            width: 9rem!important;
          }
          .el-form-item__error{
            margin-left:9rem;
          }
        }
       .textarea-jss{
          width: 100%;
          margin-top: 20px;
          .addJLD-textarea{
            width: 75%;
          }
          >.el-form-item__content{
             >.el-form-item__label{
                margin: 0;
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
            // border:1px solid #cccc;
          }
          // .el-upload-list__item{
          //   border: none;
          // }
        }
      }
      .zibnr2,.zibiaonr{
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
            /*width: 900px;*/
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
            width: 100%;
            /*width: 600px;*/
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
.add{
  width: 100%;
  .addShow{
    width: 100%;
    .addHead{
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 46px;
      font-weight: bold;
      font-size: 16px;
      color: #111;
      background: #F6F6F6;
      margin-bottom: 12px;
      .tabAreaTit{
        i{
        font-weight: bold!important;
        font-size: 16px!important;
        color: #111!important;

        }
      }

    }
    .taskShow{
      width: 100%;
      border-top: 2px solid rgb(192, 202, 214)!important;
      .taskShowHead{
        width: 100%;
        display: flex;
        height:46px ;
        padding: 0 20px;
        align-items: center;
        justify-content: space-between;
        background: #F6F6F6;
        p{
        font-weight:  bold;
        color: #111;
        font-size: 16px!important;
        }
      }
    }

  }
.addzmstyle{
      .el-dialog {
        height: 600px;
      }
    }
}

</style>
