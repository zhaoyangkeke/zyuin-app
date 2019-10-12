/**
* ----开工申请单
*/
<template>
  <div id="kgsqd" style="height: 100%" v-loading="loading">
    <div class="header">
      <span class="headerTit">开工申请单</span>
      <div class="header_option">
        <!--<div class="jianlimb" @click="showAdd()"><i class="el-icon-download"> 开工申请</i></div>-->
        <ul>
          <!-- <li><i class="iconfont icon-export" style="font-size:8px;"> 导出</i></li> -->
          <li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table">
      <div class="chaxun" style="">
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
                <i slot="suffix"  @click="showDialog('bh')" class="icon iconfont icon-xiangqing1"></i>
              </el-autocomplete>
            </el-form-item>
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
            <!--<el-select size="mini"  class="" placeholder="请选择日期" v-model="searchForm.jcrq">
              <el-option v-for="(item,index) in qmbbOptions" :key="index" :label="item.bbmc" :value="item.bbid"></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button size="mini" @click="search1"  style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
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
         <!-- <el-table-column align="left" prop="htmc" label="项目名称" sortable show-overflow-tooltip></el-table-column> -->
        <!-- <el-table-column align="left" prop="htbh" label="项目编号" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="djbh" label="单据名称" sortable show-overflow-tooltip></el-table-column> -->
        <el-table-column align="left" prop="htmc" label="项目名称" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="cbdw" label="承包单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="gldw" label="管理单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="tbdw" label="填报单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="tbrq" label="填报日期" width="100" sortable show-overflow-tooltip></el-table-column>
         <el-table-column align="left" label="状态" sortable width="80">
        <template scope="scope">
            <span style="color:#D34C42;text-align: left;cursor: pointer;" v-if="scope.row.zt==='3501'" >自由</span>
            <span style="color:#3EC481;text-align: left;cursor: pointer;" v-if="scope.row.zt==='3502'">审批中</span>
            <span style="color:#3EC481;text-align: left;cursor: pointer;" v-if="scope.row.zt==='3503'">已审批</span>
        </template>
        </el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="120">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: left" v-if="scope.row.zt == '3501'" @click="shenhe(scope.row, scope.$index)">提交</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: left" v-if="scope.row.zt == '3501'" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
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


    <!-- 编辑新增 -->
    <div class="tabArea" v-if="showDetail"  @close="resetForm">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild"  @click="resetForm"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>开工申请</span>
        </p>

        <div v-show="!showxq" class="SPState" >
          <el-button size="mini" class="minibtn"  v-if="isadd"  :loading="submitLoading" @click="addSubmit('lmshForm');isxmmcOfadd = 0"
                    style="background: #DF4D4A; border-color:transparent;color: #fff;">保存</el-button>
          <el-button size="mini" class="minibtn"  v-if="!isadd"  :loading="submitLoading" @click="updateSubmit('lmshForm');isxmmcOfadd = 0"
                    style="background: #DF4D4A; border-color:transparent;color: #fff;">保存</el-button>
          <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>

      </div>

      <div v-show="isseedetail == 0"  style="padding-left: 15px;"  >
        <el-form  :model="lmshForm" :rules="jldModelRules" ref="lmshForm" >

          <el-form-item class="addJLD" label="单据编号" label-width="100px">
            <!--<el-input  v-model="lmshForm.djbh" size="mini"  placeholder="请输入内容" disabled></el-input>-->
            <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.djbh}}</label>
          </el-form-item>

          <!--<el-form-item class="addJLD" label="项目名称" label-width="100px">
            <el-select

            v-model="lmshForm.xmmc"
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

          <el-form-item style="padding-left: 2.1875rem" label="项目名称" class="addJLD">
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

          <el-form-item class="addJLD" label="合同编号" prop="htbh" label-width="100px" >
            <!--<el-input   v-model="lmshForm.htbh" size="mini"  placeholder="请输入内容" disabled></el-input>-->
            <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.htbh}}</label>

          </el-form-item>

          <el-form-item class="addJLD" label="承包单位" label-width="100px">
            <!--<el-input  v-model="lmshForm.cbdw" size="mini"  placeholder="请输入内容" disabled></el-input>-->
            <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.cbdw}}</label>
          </el-form-item>

          <el-form-item class="addJLD" label="管理单位" label-width="100px">
            <!--<el-input  v-model="lmshForm.gldw" size="mini"  placeholder="请输入内容" disabled></el-input>-->
            <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.gldw}}</label>
          </el-form-item>

          <el-form-item class="addJLD" label="合同名称" label-width="100px">
            <!--<el-input  v-model="lmshForm.htmc" size="mini"  placeholder="请输入内容" disabled></el-input>-->
            <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.htmc}}</label>
          </el-form-item>



          <!--<p class="addJLD" style="margin-left: -29px">
            <span class="addJLD_tit2">合同编号 ：</span>
            <span>{{lmshForm.htbh}}</span>
          </p>

          <p class="addJLD">
            <span class="addJLD_tit2">承包单位 ：</span>
            <span>{{lmshForm.cbdw}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">承包单位 ：</span>
            <span>{{lmshForm.cbdw}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">管理单位 ：</span>
            <span>{{lmshForm.gldw}}</span>
          </p>-->



          <el-form-item class="addJLD" label="路线名称" label-width="100px">
<!--            <el-input  v-model="lmshForm.lxmc" size="mini"  placeholder="请输入内容"></el-input>-->
            <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{lmshForm.lxmc}}</label>
          </el-form-item>

          <el-form-item class="addJLD"  label="选择方向" label-width="100px">
            <el-radio-group v-model="lmshForm.fx" :disabled="isseedetail == 2">
              <el-radio label="上行"></el-radio>
              <el-radio label="下行"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item class="addJLD" label="起点桩号" prop="qdzh" label-width="100px">
            <el-input  v-model="lmshForm.qdzh" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
          </el-form-item>

          <el-form-item class="addJLD" label="止点桩号" prop="zdzh" label-width="100px">
            <el-input  v-model="lmshForm.zdzh" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
          </el-form-item>

          <el-form-item class="addJLD" label="爆破阻断位置" label-width="100px">
            <el-input  v-model="lmshForm.bpzdwz" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
          </el-form-item>

          <el-form-item class="addJLD" label="主线卡口方向" label-width="100px">
            <el-input  v-model="lmshForm.zxkfx" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
          </el-form-item>

          <el-form-item class="addJLD" label="是否限流" label-width="100px">
            <el-radio-group v-model="lmshForm.isxl" :disabled="isseedetail == 2">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item class="addJLD" label="是否封道" label-width="100px">
            <el-radio-group v-model="lmshForm.isfd" :disabled="isseedetail == 2">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item class="addJLD" label="申请开工日期" prop="sqkgrq" label-width="100px">
            <el-date-picker
            :disabled="isseedetail == 2"
            v-model="lmshForm.sqkgrq"
            :picker-options="pickerOptionsStart"
            size="mini"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="addJLD" label="预期完工日期" prop="yjwgrq" label-width="100px">
            <el-date-picker
            :disabled="isseedetail == 2"
            v-model="lmshForm.yjwgrq"
            :picker-options="pickerOptionsEnd"
            size="mini"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="addJLD" label="填报单位" label-width="100px">
            <el-input  v-model="lmshForm.tbdw" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
          </el-form-item>

          <el-form-item class="addJLD" label="现场负责人" label-width="100px">
            <el-input  v-model="lmshForm.xcfzr" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
          </el-form-item>

          <el-form-item class="addJLD" label="联系电话" prop="lxdh" label-width="100px">
            <el-input  v-model="lmshForm.lxdh" size="mini"  placeholder="请输入内容" :disabled="isseedetail == 2" ></el-input>
          </el-form-item>

          <el-form-item class="addJLD" label="填报日期" prop="tbrq" label-width="100px">
            <el-date-picker
            :disabled="isseedetail == 2"
            v-model="lmshForm.tbrq"
            size="mini"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <br>
          <el-form-item  class="addJLD" label="审批意见" style="width: 40%;" label-width="100px">
            <el-radio-group v-model="lmshForm.spyj" :disabled="isseedetail == 2">
              <el-radio label="0">同意开工</el-radio>
              <el-radio label="1">不具备开工条件，请完善后再行申请</el-radio>
            </el-radio-group>
          </el-form-item>


          <div style="width: 79%">
            <el-form-item class="addJLD-textarea"  label="工程主要内容" prop="gczynr">
              <el-input type="textarea"   v-model="lmshForm.gczynr"
                        :disabled="isseedetail == 2" style="width: 84%;display: block;margin-left: 6.25rem"></el-input>
            </el-form-item>
            <el-form-item class="addJLD-textarea"   label="施工说明" style="margin-left: 2.25rem">
              <el-input type="textarea"   v-model="lmshForm.sgzbqksm" placeholder="工、料、机准备情况"
                        :disabled="isseedetail == 2" style="width: 87.2%;display: block;margin-left: 4rem"></el-input>
            </el-form-item>
          </div>

          <!--<div style="width: 79%">
            <el-form-item class="addJLD-textarea"  label="工程主要内容" prop="gczynr">
              <el-input type="textarea"   v-model="lmshForm.gczynr"
                        :disabled="isseedetail == 2" style=""></el-input>
            </el-form-item>
            <el-form-item class="addJLD-textarea"   label="施工说明" style="">
              <el-input type="textarea"   v-model="lmshForm.sgzbqksm" placeholder="工、料、机准备情况"
                        :disabled="isseedetail == 2" style=""></el-input>
            </el-form-item>
          </div>-->

          <!--<el-form-item  class="addJLD" style="margin-left: 20px;">
            <el-upload
              class="upload-demo"
              :action="$api.uploadFiles"
              multiple
              ref="uploada"
              :disabled="isseedetail == 2"
              :file-list="fileList"
              :limit="2">
              <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
            </el-upload>
          </el-form-item>-->
          <el-form-item  class="addJLD" label="附件" style="margin-left: 62px">
            <el-upload
              class="upload-demo"
              action="111"
              multiple

              :disabled="isseedetail == 2"
              :on-remove="fjRemove"
              :http-request="fjRequest"
              :file-list="fjfildDatas"
              :limit="3">
              <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
            </el-upload>
          </el-form-item>


          <!-- <el-form-item >

              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
          </el-form-item> -->


          <!-- <div class="dialog_footer" v-if="!showxq">
            <el-button size="mini" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit('lmshForm')">保存</el-button>
            <el-button size="mini" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit('lmshForm')">保存</el-button>
            <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
          </div> -->

        </el-form>
      </div>

      <div v-show="showxq" style="padding-left: 15px;"  >
        <div>
          <p class="addJLD">
            <span class="addJLD_tit2">单据编号 ：</span>
            <span>{{lmshForm.djbh}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">项目名称 ：</span>
            <span>{{lmshForm.xmmc}}</span>
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
            <span class="addJLD_tit2">合同名称 ：</span>
            <span>{{lmshForm.htmc}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">路线名称 ：</span>
            <span>{{lmshForm.lxmc}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">方向 ：</span>
            <span>{{lmshForm.fx}}</span>
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
            <span class="addJLD_tit2">爆破阻断位置 ：</span>
            <span>{{lmshForm.bpzdwz}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">主线卡口方向 ：</span>
            <span>{{lmshForm.zxkfx}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">是否限流 ：</span>
            <span>{{lmshForm.isxl}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">是否封道 ：</span>
            <span>{{lmshForm.isfd}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">申请开工日期 ：</span>
            <span>{{lmshForm.sqkgrq}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">预期完工日期 ：</span>
            <span>{{lmshForm.yjwgrq}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">填报单位 ：</span>
            <span>{{lmshForm.tbdw}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">现场负责人 ：</span>
            <span>{{lmshForm.xcfzr}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">联系电话 ：</span>
            <span>{{lmshForm.lxdh}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">填报日期 ：</span>
            <span>{{lmshForm.tbrq}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">审批意见 ：</span>
            <span>{{lmshForm.spyj}}</span>
          </p>
          <p class="addJLD">
            <span class="addJLD_tit2">工程主要内容 ：</span>
            <span>{{lmshForm.gczynr}}</span>
          </p><br />
          <p class="addJLD">
            <span class="addJLD_tit2">施工准备情况说明 ：</span>
            <span>{{lmshForm.sgzbqksm}}</span>
          </p><br />
          <p class="addJLD">
            <span class="addJLD_tit2">附件 ：</span>
            <!--<a v-for="(files,index) in fjFils" style="margin-right: 10px;" target="_blank" :key="index" :href="files.file_path">{{files.file_yname}}
              &lt;!&ndash;<span style="border-left: 1px solid #000;margin-left: 10px"></span>&ndash;&gt;

            </a>-->
            <span>
              <ul style="margin-left: 8.375rem; margin-top: -1.1875rem;">
                <li v-for="(files, index) in fjFils":key="index" >
                  <a target="_blank" :href="files.file_path">{{files.file_yname}}</a>
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
  import {isvalidPhone,validPhone} from '@/util/isvalid.js'
  import { debug, debuglog } from 'util';
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
      if ((value - 0) < 0 || value.indexOf(".") < 0) {
        callback(new Error('起点桩号格式不正确'))
      } else {
        callback()
      }
    }
    return {
      // zll
      //timeDefaultShow:new Date('2022-10-23'),
      rowobj: {},
      isxmmcOfadd: 0,
      htbharr: [],
      tbdwarr: [],
      datearr: [],
      index: '',
      isadd: false,
      addzb: true,
      total: 0,
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
      personelForm: {},
      showDetail: false,
      htList: [],
      htbh: {},
      //fileList: [],
      fjFils:[],
      fjfildDatas:[],
      multipleSelection: [],

      initializationForm: {
        djbh: '',
        xmmc: '',
        htbh: '',
        cbdw: '',
        gldw: '',
        htmc: '',
        lxmc: '',
        fx: '上行',
        qdzh: '',
        zdzh: '',
        bpzdwz: '',
        zxkfx: '',
        isxl: '是',
        isfd: '是',
        sqkgrq: '',
        yjwgrq: '',
        xcfzr: '',
        lxdh: '',
        gczynr: '',
        sgzbqksm: '',
        spyj: '0',
        tbdw: ''
      },
      /*pickerOptionsStart: {
        disabledDate(time) {
          return time.getTime() < new Date(new Date().toLocaleDateString()).getTime();
        }
      },
      pickerOptionsEnd: {},*/

      pickerOptionsStart: {
        disabledDate: time => {

          if (this.lmshForm.yjwgrq) {
            return time.getTime() > new Date(this.lmshForm.yjwgrq).getTime()
          }
          //return time.getTime() < new Date(new Date().toLocaleDateString()).getTime()
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.lmshForm.sqkgrq) {
            return time.getTime() < new Date(this.lmshForm.sqkgrq).getTime() - 86400000
          }
        }
      },

      lmshForm: {},
      userInfo:{
        orgbh:undefined,
        orgid:undefined,
        orgmc:undefined,
        bmbh:undefined,
        bmid:undefined,
        bmmc:undefined,
        yhbm:undefined,
        yhid:undefined,
        yhmc:undefined,
        gldwid:undefined,
        gldw:undefined,
        gldwbm:undefined,
      },
      isseedetail: 0,
      // form表单验证条件
      jldModelRules: {
        xmmc: [
          { message: '请选择项目名称', trigger: 'change' }
        ],
        htbh: [
          {type: 'string', required: true,  message: '请选择项目名称'}
        ],
        sqkgrq: [
          {type: 'string', required: true,  message: '请选择日期', trigger: 'change' }
        ],
        yjwgrq: [
          {type: 'string', required: true,  message: '请选择日期', trigger: 'change' }
        ],
        tbrq: [
          {type: 'string', required: true,  message: '请选择日期', trigger: 'change' }
        ],
        qdzh: [
          { message: '起点桩号为数字类型', trigger: 'blur' },
          {validator: qdzh1111, trigger: 'blur' }
        ],
        zdzh: [
          { message: '起点桩号为数字类型', trigger: 'blur' },
          {validator: qdzh1111, trigger: 'blur' }
        ],
        lxdh: [
          { required: true, trigger: 'blur', message: '请输入正确的手机号',validator: validPhone }//这里需要用到全局变量
        ],
        gczynr: [
          {type: 'string', required: true,  message: '请输入主要内容！', trigger: 'change' }
        ],
      },


      searchForm: {
        xmmc:'',
        xmbh: undefined,
        tbdw: undefined,
        jcrq:'',
        ksrq:'',
        datearr: null,
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible:false,
      restaurants:[ ],
      restaurantsBH:[ ],
      datatypes:'',
      dialogTableTit:{ //ok
          XMMC:'项目名称',XMBH:'项目编号',
        },
      dialogData:[],
    }
  },
  mounted () {
    // zll
    // 获取用户信息
    this.userInfo = returnUserInfo()
    this.getHtbhListarr()
    this.getTBdwarr()

    this.$api.getProjectMsgToCreateMWP().then(res=>{
      if(res.code == 1){
        this.htList = res.data
        }
    })
    this.initqueryXMBH()
    this.initqueryXMMC()

    //this.search(1, 10,)
    this.tableHeight = $('#kgsqd')[0].offsetHeight
  },
  methods: {


   /* //结束时间限制开始时间
    changeStart() {

      this.pickerOptionsStart = Object.assign({}, this.pickerOptionsStart, {
        // 可通过箭头函数的方式访问到this
        disabledDate: (time) => {

          let times = '';
          times = this.lmshForm.yjwgrq < time.getTime() || time.getTime() < new Date(new Date().toLocaleDateString())
            .getTime();

          return times
        }
      })

    },
    //开始时间 控制结束时间
    changeEnd() {

      this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
        disabledDate: (time) => {

          return time.getTime() < this.lmshForm.sqkgrq
        }
      })
    },*/


    // 列表搜索页方法
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

    // 合同编号list
    getHtbhListarr () {
      this.$api.getHtbhList().then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {
          this.htbharr = res.data.data
        }
      }).catch(e => {
         console.log(e)
      })
    },
    // 填报单位
    getTBdwarr () {
      this.$api.getTBdwList().then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {
          this.tbdwarr = res.data.data
        }
      }).catch(e => {
        // console.log(e)
      })
    },
    // 获取附件图片
    /*getfilebyid () {
      console.log(this.lmshForm.id, 'this.lmshForm.id')
      this.$api.getFilesDataById('?id=' + this.lmshForm.id).then(res => {
        this.fileList = res.data.data
        this.fileList.map(item => {
          item.name = item.file_yname
        })
      })
    },
    // doubleclick () {
    //   // this.showDetail = !this.showDetail
    // },
    // 删除附件图片
    handleRemove (fileid) {
      this.$api.deleteFilesById('?ids=' + fileid).then(res => {})
    },
    // 上传附件多张图片
    rukufile () {
      let uploadFiles = []

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
      this.search()
      this.resetForm()
    },*/
    uuid(){
    let str = (((1+Math.random())*0x10000)|0).toString(16).substring(1)
    return (str+str+"-"+str+"-"+str+"-"+str+"-"+str+str+str);
  },
    /*preview (file) {
      if(file.response) {
        let url = file.response.data.file_path
        window.open(url)
      } else {
        let url = file.url
        window.open(url)
      }
    },
    openFile(item){
      window.open(item.url)
    },*/
    fjRemove(file, fileList){
      this.fjfildDatas = fileList
    },
    fjRequest(files){
      let fm = new FormData();
      fm.append('file',files.file);
      this.$api.uploadFile2(fm).then(res=>{
        if(res.code == 1){
          console.log(res.data,'上传文件信息');
          let datas = res.data
          datas.file_remarks = datas.remarks
          delete datas.remarks
          let fildObj = datas
          fildObj.file_id = this.uuidsID
          fildObj.file_id = this.lmshForm.djbh
          fildObj.name = fildObj.file_yname
          this.fjfildDatas.push(fildObj)
        }
      })

    },






    resizeSearch(){
      this.searchForm.htbh = undefined
      this.searchForm.tbdw = undefined
      this.searchForm.datearr = undefined
      this.searchForm.pageNum = 1
    },




    // 点击添加
    showAdd () {
      console.log(config.userInfo,"config.userInfo");

      //this.rowobj = row
      //console.log(row,"row");
      this.lmshForm = _.cloneDeep(this.initializationForm)
      this.lmshForm.tbdw = this.userInfo.daBmmc
      this.isxmmcOfadd = 1

      this.showDetail = !this.showDetail
      // 控制保存按钮
      this.showxq = false
      // 控制是编辑保存还是新增保存
      this.isadd = true

      this.formId = 'kgsqd' + new Date().getTime()
      // 获取单号和日期
      this.lmshForm.djbh = this.formId
      this.lmshForm.tbrq = this.formatDate(new Date())
      this.lmshForm.sqkgrq = this.formatDate(new Date())

      this.uuidsID = this.uuid()
      console.log(this.fjfildDatas,'编辑里的附件列表')
      this.fjfildDatas = []

      this.$api.getmcbhList().then(res=>{
        if(res.code == 1){

          this.xmbhList = res.data
        }
      })
    },
    // 点击编辑
    updateFormDia (row, index) {
      this.isxmmcOfadd = 1
      this.showDetail = !this.showDetail
      this.showxq = false
      this.isadd = false

      this.lmshForm = row
      this.lmshForm.xmmc = row.htmc
      // 无意义


      this.uuidsID = row.djbh
      console.log(row,'==row');
      this.index = index
      // 获取项目名称填充
      this.htbh = {
        htbh: row.htbh
      }
      //this.getfilebyid()
      this.fjfildDatas = []
      this.$api.getFilesDataById2({id:row.djbh}).then(res=>{
        if(res.code == 1){
          let datas = res.data
          datas.forEach(item =>{
            item.name = item.file_yname
              this.fjfildDatas.push(item)

          })
          this.currentFils = res.data
        }else{
          // this.currentFils = []
        }
      })

      // this.doubleclick()

    },
    // 点击详情
    showBhFormDia (row) {
      this.isxmmcOfadd = 1
      this.showDetail = !this.showDetail
      this.showxq = true
      this.isadd = false
      this.lmshForm = row
      this.lmshForm.xmmc = row.htmc

      this.htbh = {
        htbh: row.htbh
      }

      this.isseedetail = 2

      this.fjFils = []
      this.$api.getFilesDataById2({id:row.djbh}).then(res=>{
        if(res.code == 1){
          let datas = res.data
          datas.forEach(item =>{
              this.fjFils.push(item)
          })
          // this.currentFils = res.data
        }else{
          // this.currentFils = []
        }
      })
    },


    // 刷新List列表
    search1(){
      this.search()
    },

    search (val) {
      //this.showSearch = false
      //debugger;

      let {xmbh,htmc,datearr,pageNum,pageSize} = this.searchForm;
      //console.log(this.searchForm,898989)
      let ksrq,jsrq;
      if(datearr&&datearr.length){
        ksrq = datearr[0]
        jsrq = datearr[1]
      }
      let ztparam = ''
      //console.log(JSON.parse(localStorage.userMsg)[0].deptList[0].supplierpk, 800811)
      if (JSON.parse(localStorage.userMsg)[0].deptList[0].userType == '供应商') {
        ztparam = '4'
      } else {
        ztparam = '3,4'
      }
      //console.log(val, 123456)
      let xmbhOfinit = {}
      if (val) {
        xmbhOfinit = val
        console.log(xmbhOfinit, 7777)
      } else {
        //console.log(config.userInfo.userType && config.userInfo.userType == '供应商',78)
        //console.log(config.userInfo.userType ,79)
        if(config.userInfo.userType&&config.userInfo.userType =='供应商') {
          // debugger
          /*if (this.restaurants.length > 1) {
            xmbhOfinit = this.searchForm.xmbh
          } else {*/
            xmbhOfinit = this.restaurants[0]
          //}

        } else {
          xmbhOfinit.XMBH = ''
        }
      }
      //console.log(xmbhOfinit,8888)
      this.$api.kgsqdgetAll({
        htbh: xmbh == undefined ? xmbhOfinit.XMBH : xmbh,
        //htmc: htmc == undefined ? xmbhOfinit.XMMC : htmc,
        // htbh:this.searchForm.xmbh,
        // htmc:this.searchForm.xmmc,
        gldwid:this.userInfo.gldwid,
        ksrq,
        jsrq,
        pageNum,
        pageSize
      }).then(resp => {
        this.loading = false
        if (resp.status === 200) {
          this.tableData = resp.data.data.list
          this.total = resp.data.data.total
          //console.log(this.tableData,9999)

        } else {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        }
      }).catch(e => {
        this.loading = false
      })
    },

    /*search1 () {
      this.showSearch = false
      let {htbh,xmmc,datearr,pageNum,pageSize} = this.searchForm;
      let ksrq,jsrq;
      if(datearr&&datearr.length){
        ksrq = datearr[0]
        jsrq = datearr[1]
      }
      this.$api.kgsqdgetAll({
        htbh:this.searchForm.xmbh,
        htmc:this.searchForm.xmmc,
        gldwid:this.userInfo.gldwid,
        ksrq,
        jsrq,
        pageNum,
        pageSize
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
    },*/
    // 保存新增开单申请
    addSubmit (formName) {
      let self = this
      this.lmshForm.zt = '3501'
      this.$refs[formName].validate((valid) => {

        if (valid) {
          //this.handleRemove(this.lmshForm.id)


          let params = _.assign({},this.lmshForm,this.userInfo)
          console.log(params,'==this.params');
          if(this.fjfildDatas.length){
            let fildDatas = self.fjfildDatas
            this.$api.addFileData(fildDatas).then(res=>{
              self.fjfildDatas = []
              if(res.data.code == 1){
              }else{
                this.$message({
                  message: '附件上传失败',
                  type: 'info'
                });
              }
            })
          }

          this.$api.addKgsqd(params).then(res => {
            if (res.data.code === 1) {
              //this.rukufile()
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
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 编辑开单申请
    updateSubmit (formName) {


      let self = this

      this.$refs[formName].validate((valid) => {
        if (valid) {
        //this.handleRemove(this.lmshForm.id)
          this.$api.deleteFilesById2({ids:self.uuidsID}).then(res=>{
            if(this.fjfildDatas.length){
              let fileDatas = self.fjfildDatas
              this.$api.addFileData(fileDatas).then(res=>{
                self.fjfildDatas = []
                if(res.data.code == 1){
                }else{
                  this.$message({
                    message: '附件上传失败',
                    type: 'info'
                  });
                }
              })
            }
          })




        this.$api.updateKgsqd(this.lmshForm).then(res => {
          if (res.data.code === 1) {
            //this.rukufile()
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
          console.log('error submit!!');
          return false;
        }
      });
    },
    onSeleteState(item,index) {
      if( item.zt != '3501') {
        return false
      }else {
        return true
      }
    },



    // 删除
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
          this.$api.deleteKgsqd('?djbhs=' + djbharr).then(res => {
            if (res.data.code === 1) {
              //this.search()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              //this.handleRemove(this.lmshForm.djbh)
              //this.fjRemove(this.lmshForm.djbh)
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
    // 改变列表内审核状态
    shenhe (row, index, rowobj) {
      this.$confirm('是否确定提交？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let form = JSON.parse(JSON.stringify(row))
        form.zt = '3502'

        //this.$api.createWorkFlow


        let {yhmc,yhid,bmmc,orgmc} = config.userInfo

        console.log(config.userInfo,"config.userInfo");
        this.$api.createWorkFlow({
          pc_initiator:yhmc,
          pc_initiatorid: yhid,
          pc_name: '13',
          pc_project_id: form.djbh,
          pc_remarks: '',
          pc_state: '1',
        },{
          group:bmmc,
          org:orgmc}).then(res=>{
          if(res.code == 1){

            this.$api.updateKgsqd(form).then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '提交审批成功!'
                });
                this.search(this.currentPage, this.pageSize)
                this.resetForm()
              }
            })


          }else{
            this.$message({
              type: 'error',
              message: res.msg
            });
          }
        }).catch( () => {
          this.$message({
            type: 'info',
            message: '已取消提交审批!'
          });
        })


      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消审核'
        })
      })




    },

    // 隐藏编辑和详情栏目
    resetForm () {
      this.showDetail = false
      this.isxmmcOfadd = 0
      this.isseedetail = 0
      this.lmshForm = {
        xcfx: '上行'
      }
      this.htbh = {}

      this.search()
    },
    // 选择项目名称-trigger
    selectHt (value) {

      this.lmshForm.htbh = value.xmbh
      this.lmshForm.htmc = value.xmmc
      // this.lmshForm.gcxm = value.gj_cgxmmc
      // this.lmshForm.lxmc = value.yh_lxmc

      this.lmshForm.cbdw = value.cbdw
      this.lmshForm.gldw = value.gldw
      // 起始终止桩号
      this.lmshForm.qdzh = value.qszh
      this.lmshForm.zdzh = value.zzzh
      console.log(value)

    },





    //重置信息
    resizeDate(){
      this.searchForm.xmmc = undefined
      this.searchForm.xmbh = undefined
      this.searchForm.searchTime = undefined
      this.searchForm.datearr = undefined

      this.search()
    },
    showDialog(bol){ // 点击弹框
      this.dialogVisible = true
      this.datatypes = bol
      //console.log(this.datatypes,'this.datatypes');
      this._getmcbhList()
    },
    _getmcbhList() { //获取数据
      this.$api.getmcbhList().then(res=>{
          if(res.code == 1){

            this.dialogData = res.data&&res.data.length?res.data:[]
            console.log(res.data, 'res.data');
          }else{
            this.dialogData = []
          }
        })
    },

    querySearchBH(queryString, cb) { // 1
        let  restaurants = this.restaurantsBH;
        let results = queryString ? restaurants.filter(this.createFilter(queryString,'XMBH')) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
    handleSelectBH(item){ // 2

        this.$api.getXmbhtomcList({xmbh:item.XMBH}).then(res=>{
          if(res.code == 1){
            this.searchForm.xmmc = res.data?res.data[0].XMMC:''
          }else{
            this.searchForm.xmmc = ''
          }
        })
      },
    querySearchMC(queryString, cb) {
        let restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString,'XMMC')) : restaurants;
        // 调用 callback 返回建议列表的数据

        cb(results);
    },
    handleSelectMC(item,param){
      //getXmmcList
      console.log(item,param, '切换项目名称')
      if (param == 1){

          this.searchForm.xmmc = item.XMMC
          this.searchForm.xmbh = item.XMBH

      } else {
        this.lmshForm.htmc = item.XMMC
        //this.lmshForm.xmmc = item.XMMC

        if (item.XMBH) {
          this.getOnlyXmgkjcxx(item.XMBH)
        }
      }

    },
    createFilter(queryString,val) {
      return (restaurant) => {
        return (restaurant[val].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

//Dialog
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

    initqueryXMMC(){
      //let {outside,daZzid} = this.userInfo

      //if(outside&&outside!=='~'){
        //getXxBySgdw({cbdwid:outside})
        this.$api.getmcbhList().then(res=>{

          if(res.code == 1){
            // console.log(this.restaurants, 8080801111)
            //console.log(res.data, 34)
            this.restaurants = res.data && res.data.length ? res.data : []
            if (config.userInfo.userType&&config.userInfo.userType =='供应商') {
              // debugger
              this.search(this.restaurants[0]) // 获取事件任务清单列表
            } else {
              this.search() // 获取事件任务清单列表
            }
          }else{
            this.restaurants = []
          }
        })
      /*}else {
        this.$api.getmcbhList().then(res => {
          //console.log(res.data, 44)
          if (res.code == 1) {
            this.restaurants = res.data && res.data.length ? res.data : []
          } else {
            this.restaurants = []
          }
        })
      }*/
    },
    initqueryXMBH(){ // 公共查询项目编号
        this.$api.getXmbhList().then(res=>{
          if(res.code == 1){
            this.restaurantsBH = res.data&&res.data.length?res.data:[]
          }else{
            this.restaurantsBH = []
          }

        })
    },

    // 根据项目编号的弹框搜索的项目编号获取项目信息
    getOnlyXmgkjcxx (val) {
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
              console.log(this.lmshForm,'lmshForm');
              this.lmshForm.htbh = res.data[i].xmbh
              this.lmshForm.htmc = res.data[i].xmmc
              this.lmshForm.xmmc = res.data[i].xmmc

              this.lmshForm.cbdw = res.data[i].cbdw
              this.lmshForm.gldw = res.data[i].gldw
              //this.lmshForm.qdzh = res.data[i].lxbm
              this.lmshForm.qdzh = res.data[i].qszh
              this.lmshForm.lxmc = res.data[i].lxmc
              //this.lmshForm.zdzh = res.data[i].cbdw
              this.lmshForm.zdzh = res.data[i].zzzh

            }
          }
        }
      }).catch(e => {
        console.log(e)})
    },

    closeDialog(val){
      this.dialogVisible = false
      if(val){
        console.log(this.isxmmcOfadd, 1111111)
        if (this.isxmmcOfadd == 1) {
          this.lmshForm.htmc = val.XMMC
          this.lmshForm.htbh = val.XMBH
          this.lmshForm.xmmc = val.XMMC
          this.getOnlyXmgkjcxx(this.lmshForm.htbh)
        } else {
          this.searchForm.xmmc = val.XMMC
          this.searchForm.xmbh = val.XMBH
          console.log(this.searchForm.xmmc+'123'+this.searchForm.xmbh)
        }
      }
    },

    // 已注销功能List
    selecttreeBm (node) {
      this.searchForm.bmid = node.bmcode
      this.searchForm.bmname = node.bmname
      if (!this.searchForm.qmbbid) {
        // return
      } else {
        this.search(this.currentPage, this.pageSize)
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #kgsqd{
    /*padding: 10px 15px 0 15px;*/
    position: relative;
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
          &:nth-last-of-type(1),&:nth-last-of-type(2){
            border-bottom: 1px solid #D5D6D7;
          }
          >span{
            width: 100px;
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
