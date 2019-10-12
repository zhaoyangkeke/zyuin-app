/**
* ----任务派发
*/
<template>
  <div id="rwpf" class="styleSheets" style="height: 100%" v-loading.fullscreen.lock="fullscreenLoading"  v-if="isRouterAlive">
   <div class="bill-header">
  		<div class="bill-title">
  			<span>任务派发</span>
  		</div>
      <div class="bill-search">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
       <el-form-item style="margin-bottom: 0px" prop="" class="">
            <div class="tbdw">
              <el-tree :accordion="true" :data="tbdwList" node-key="id" :default-expanded-keys="[zkx]" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
            <el-input clearable class="selectDw" style="width:200px" v-model="selectDw" size="mini" placeholder="请选择填报部门" @focus="selectDwTree" @change="clears">
              <i
    class="el-icon-error"
    slot="suffix"
    @click="handleIconClick">
  </i>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" prop="" class="">
             <el-select clearable size="mini" style="width: 148px;" v-model="searchForm.gzlx" value-key="mjbm" placeholder="请选择故障系统">
                <el-option v-for="item in qmbbOptions1" :key="item.mjbm" :label="item.mjmc" :value="item.mjmc"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px" prop="" class="">
             <el-select clearable  size="mini" style="width: 148px;" v-model="searchForm.gzdj" value-key="mjbm" placeholder="请选择故障等级">
                <el-option value="一级故障"></el-option>
                <el-option value="二级故障"></el-option>
                <el-option value="三级故障"></el-option>
              </el-select>
            </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
             <el-select clearable v-model="searchForm.fpzt" size="mini" placeholder="请选择派发状态">
                <el-option label="未分配" value="未分配"></el-option>
                <el-option label="已分配" value="已分配"></el-option>
             </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
             <el-select clearable v-model="searchForm.djzt" size="mini" placeholder="请选择登记状态">
                <el-option label="未登记" value="未登记"></el-option>
                <el-option label="已登记" value="已登记"></el-option>
             </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
             <el-select clearable v-model="searchForm.yszt" size="mini" placeholder="请选择验收状态">
                <el-option label="未验收" value="未验收"></el-option>
                <el-option label="已验收" value="已验收"></el-option>
             </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px"  prop="" class="">
            <el-date-picker
              v-model="searchForm.jcrq"
              type="daterange"
              size="mini"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="报障开始日期"
              end-placeholder="报障结束日期">
            </el-date-picker>
            <!--<el-select size="mini"  class="" placeholder="请选择日期" v-model="searchForm.jcrq">
              <el-option v-for="(item,index) in qmbbOptions" :key="index" :label="item.bbmc" :value="item.bbid"></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button size="mini"  style="background-color: #DF4D4A;border-color:transparent;color: #fff" @click="search(1,10)">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
  	</div>
    <div class="conter_table">
      <el-table   ref="multipleTable" :data="tableData" tooltip-effect="dark"
                style="width: 100%;height: calc(100% - 46px)!important;overflow:auto;"
                row-class-name="row_class"
                border 
                v-loading="loading"
                 :row-style="rowClass"
                @row-dblclick="dbclick"
                @row-click="sigClic"
                @selection-change="handleSelectionChange">
        <!-- <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column> -->
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="40">
        </el-table-column>
      <el-table-column sortable align="left" width="80" class-name="column-caoz" label="状态" >
          <template scope="scope">
            <span style="color:#D34C42;text-align: center" v-if="scope.row.fpzt!=='已分配'">{{scope.row.fpzt}}</span>
            <span style="color:#81D741;cursor: pointer;text-align: center" v-if="scope.row.fpzt==='已分配'" >已分配</span>
          </template>
        </el-table-column>  
        <!--
          @click="resetFp(scope.row,scope.$index)"
        <el-table-column sortable align="left" width="80" class-name="column-caoz" label="片区同意"  v-if="deptCode.length<=5">
          <template scope="scope">
            <span style="color:#D34C42;cursor: pointer;text-align: center"  v-if="scope.row.tyzt!='已同意'"  @click="tongyi(scope.row, scope.$index)">{{scope.row.tyzt}}</span>
            <span style="text-align: center" v-if="scope.row.tyzt==='已同意'">已同意</span>
          </template>
        </el-table-column>
         <el-table-column sortable align="left" width="80" prop="tyzt" label="片区同意" v-if="deptCode.length>5"></el-table-column>
         <el-table-column sortable align="left" width="80" class-name="column-caoz" label="批准状态" v-if="deptCode.length<=5">
          <template scope="scope">
            <span style="color:#D34C42;cursor: pointer;text-align: center"  v-if="scope.row.spzt!='已批准'"  @click="pizhun(scope.row, scope.$index)">{{scope.row.spzt}}</span>
            <span style="text-align: center" v-if="scope.row.spzt==='已批准'">已批准</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column align="left" sortable width="80" prop="spzt" label="批准状态" v-if="deptCode.length>5"></el-table-column> -->
        <!-- <el-table-column align="center" prop="djbh" label="单据编号" show-overflow-tooltip></el-table-column> -->
        <el-table-column align="left" label="审批状态" sortable width="80">
        <template scope="scope">
            <span style="color:#D34C42;text-align: left;cursor: pointer;" v-if="scope.row.spzt==='3501'" >自由</span>
            <span style="color:#3EC481;text-align: left;cursor: pointer;" v-if="scope.row.spzt==='3502'">审批中</span>
            <span style="color:#00a2fd;text-align: left;cursor: pointer;" v-if="scope.row.spzt==='3503'">已审批</span>
        </template>
        </el-table-column>
        <el-table-column align="left" sortable prop="sbmc" label="设备名称" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" width="80" prop="isww" label="是否委外" show-overflow-tooltip></el-table-column>
        <el-table-column align="left" sortable prop="gzlx" label="故障系统" show-overflow-tooltip></el-table-column>
        <el-table-column align="left" width="100"  sortable prop="gzdj" show-overflow-tooltip label="故障等级"></el-table-column>
        <el-table-column align="left" width="100"  sortable prop="bzrq" label="报障日期"></el-table-column>
        <el-table-column sortable align="left" prop="bgr" label="报告人"></el-table-column>
        
        <el-table-column sortable align="left" prop="tbdw" label="填报单位" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="tbbm" label="填报部门" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="120">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
            <span v-if="scope.row.spzt == '3501' && scope.row.isww=='是' &&scope.row.fpzt=='已分配'"  style="color:#00a2fd;cursor: pointer;text-align: center" @click="shenpi(scope.row, scope.$index)">提交</span>
            <!-- <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhPf(scope.row,scope.$index)">派发</span> -->
            <span v-if="scope.row.fpzt=='未分配' " style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhSl(scope.row,scope.$index)">申领</span>
            <!-- <span v-if="scope.row.fpry!=''" style="color:#52575D;text-align: center">申领</span> -->
          </template>
        </el-table-column>
      </el-table>
      <footer class="footer">
      <div style="padding: 6px">
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
    
    <el-dialog fullscreen :show-close="false" class="data-dialog el-updata-div" :close-on-click-modal="false" :visible.sync="showDetail" width="580px">
      <span slot="title">
          <span class="titleclasschild"  @click="resetForm('lmshForm')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>任务派发</span>
      </span>
      <el-form v-if="showxq"  :model="lmshForm"   ref="lmshForm" label-width="100px" class="demo-lmshForm">
      <div class="showxq" v-if="showxq" style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>单据编号: </span>
              <span>{{lmshForm.djbh}}</span>
            </p>
            <p  class=" addJLD">
              <span>故障系统: </span>
              <span>{{lmshForm.gzlx}}</span>
            </p>
            <p   class=" addJLD">
              <span>设备名称: </span>
              <span>{{lmshForm.sbmc}}</span>
            </p>
            <p   class=" addJLD">
              <span>规格型号: </span>
              <span>{{lmshForm.ggxh}}</span>
            </p>
            <p   class=" addJLD">
              <span>故障等级: </span>
              <span>{{lmshForm.gzdj}}</span>
            </p>
            <p   class=" addJLD">
              <span>报障日期: </span>
              <span>{{lmshForm.bzrq}}</span>
            </p>
            <p   class=" addJLD">
              <span>报告人: </span>
              <span>{{lmshForm.bgr}}</span>
            </p>
            <p   class=" addJLD">
              <span>设备负责人: </span>
              <span>{{lmshForm.sbfzr}}</span>
            </p>
            <p   class=" addJLD">
              <span>填报人: </span>
              <span>{{lmshForm.tbr}}</span>
            </p>
            <p   class=" addJLD">
              <span>填报时间: </span>
              <span>{{lmshForm.tbsj}}</span>
            </p>
            <p   class=" addJLD">
              <span>填报单位: </span>
              <span>{{lmshForm.tbdw}}</span>
            </p>
            <p   class=" addJLD">
              <span>填报部门: </span>
              <span>{{lmshForm.tbbm}}</span>
            </p>
            <p   class=" addJLD_long">
              <span>故障描述: </span>
              <span>{{lmshForm.gzms}}</span>
            </p>
            <!-- <p   class=" addJLD_long">
              <span>附件: </span>
              <span><ul class="fjlist" v-if="showxq">
                  <li class="file_li" v-for="(item,index) in fileList" :key="index" @click="openf(item)">{{item.file_yname}}
                  </li>
                  <div class="clear"></div>
              </ul></span>
            </p> -->
            <p   class=" addJLD_long">
              <span>备注: </span>
              <span>{{lmshForm.bz}}</span>
            </p>
    
      </div>
      </el-form>
      <el-form v-if="!showxq"  :model="lmshForm" :rules="rules" ref="lmshForm" label-width="100px" class="demo-lmshForm">
              <el-form-item  class=" addJLD"  label="单据编号" prop="djbh">
                <el-input disabled size="mini"  v-model="lmshForm.djbh"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD"  label="故障系统" prop="gzlx">
                <el-input size="mini"  v-model="lmshForm.gzlx" ></el-input>
              </el-form-item>
              <el-form-item class=" addJLD" label="设备名称" prop="sbmc" >
                <el-input size="mini"  v-model="lmshForm.sbmc" ></el-input>
              </el-form-item>
              <el-form-item class=" addJLD" label="规格型号" prop="ggxh">
                <el-input size="mini"  v-model="lmshForm.ggxh"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD" label="故障等级" prop="gzdj">
                <el-select  size="mini" style="width: 148px;" v-model="lmshForm.gzdj" value-key="mjbm" placeholder="请选择故障等级">
                <el-option value="一级故障"></el-option>
                <el-option value="二级故障"></el-option>
                <el-option value="三级故障"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item class=" addJLD" label="报障日期" prop="bzrq">
                <el-input size="mini"  v-model="lmshForm.bzrq"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD" label="报告人" prop="bgr">
                <el-input size="mini"  v-model="lmshForm.bgr"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD" label="设备负责人" prop="sbfzr">
                <el-input size="mini"  v-model="lmshForm.sbfzr"></el-input>
              </el-form-item>
              <el-form-item v-if="showxq" class=" addJLD" label="填报人" prop="tbr">
                <el-input size="mini"  v-model="lmshForm.tbr"></el-input>
              </el-form-item>
              <el-form-item v-if="showxq" class=" addJLD" label="填报时间" prop="tbsj">
                <el-input size="mini"  v-model="lmshForm.tbsj"></el-input>
              </el-form-item>
              <el-form-item v-if="showxq" class=" addJLD" label="填报单位" prop="tbdw">
                <el-input size="mini"  v-model="lmshForm.tbdw"></el-input>
              </el-form-item>
              <el-form-item v-if="showxq" class=" addJLD" label="填报部门" prop="tbbm">
                <el-input size="mini"  v-model="lmshForm.tbbm"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="故障描述" prop="gzms">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lmshForm.gzms"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="备注" prop="bz">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lmshForm.bz"></el-input>
              </el-form-item>
            </el-form>
    </el-dialog>
    <el-dialog fullscreen class="data-dialog el-updata-div" :close-on-click-modal="false" :visible.sync="showyanshou" width="580px" :show-close="false">
    <span slot="title" >
          <span class="titleclasschild"  @click="resetForm"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>任务分配</span>
      </span>
          <el-form :model="fpForm"  ref="fpForm" label-width="100px" class="demo-lmshForm">
            <el-form-item  class=" addJLD" label="维修人员" prop="fpry">
              <el-input  size="mini" style="" disabled :value="fpForm.fpry"></el-input>
              </el-form-item>
            <el-form-item  class=" addJLD" label="是否委外" prop="isww">
                <el-select   size="mini" style="width: 148px;" v-model="fpForm.isww" placeholder="">
                <el-option value="是"></el-option>
                <el-option value="否"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item  class=" addJLD" label="是否领用设备" prop="isly">
                <el-select   size="mini" style="width: 148px;" v-model="fpForm.isly" @change="selectisLy">
                <el-option value="是"></el-option>
                <el-option value="否"></el-option>
              </el-select>
              </el-form-item>
              
          </el-form>
   
        <!-- <ul class="zhubnr">
          <li style="border-bottom:1px solid #D5D6D7">
            <span>维修人员</span>
            <p>
             <el-select clearable v-if="!sl" size="mini" style="" v-model="htbh" value-key="fpry" placeholder="请选择维修人员" @change="selectHt">
          <el-option v-for="(item,index) in qmbbOptions" :key="index" :label="item.fpry" :value="item"></el-option>
        </el-select>
        <el-select v-if="sl" size="mini" style="" disabled :value="lmshForm.fpry">
        </el-select>
            </p>
          </li>
          <li style="border-bottom:1px solid #D5D6D7">
             <span>是否委外</span>
             <p>
             <el-radio style="height: 100%;line-height: 31px;margin-left:30px" v-model="lmshForm.isww" label="是" @change="selectisWw">是</el-radio>
            <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.isww" label="否" @change="selectisWw">否</el-radio>
            </p>
          </li>
          <li  style="border-bottom:1px solid #D5D6D7">
             <span>是否领用设备</span>
             <p>
             <el-radio style="height: 100%;line-height: 31px;margin-left:30px" v-model="lmshForm.isly" label="是" @change="selectisLy">是</el-radio>
        <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.isly" label="否" @change="selectisLy">否</el-radio>
            </p>
          </li>
        </ul> -->
      <div v-if="showSbb">
                <p class="zibiao_title">领用设备</p>
                <el-form :model="lysqForm" :rules="rules_ly" ref="lysqForm" label-width="100px" class="demo-lmshForm">
                  <!-- <el-form-item class=" addJLD" label="单据编号" prop="djbh">
                <el-input size="mini"  v-model="lysqForm.djbh"></el-input>
              </el-form-item> -->
              <el-form-item class=" addJLD" label="维修单号" prop="wxdh">
                <el-input disabled size="mini"  v-model="lysqForm.wxdh"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD" label="需用人" prop="xyr">
                <el-input size="mini"  v-model="lysqForm.xyr"  @focus="showDialog('xyr')"></el-input>
              </el-form-item>
               <!-- <el-form-item class=" addJLD" label="仓库名称" prop="ckmc">
              <el-select clearable  v-model="lysqForm.ckmc"  size="mini"   placeholder="" >
                <el-option v-for="(item,index) in ckOptions" :key="index" :label="item.ssck" :value="item.ssck"></el-option>
              </el-select>
              </el-form-item> -->
              <el-form-item class=" addJLD_long" label="领用说明" prop="lysm">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lysqForm.lysm"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="备注" prop="bz">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lysqForm.bz"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="附件" prop="">
                <p class="up">
              <el-upload
               v-if="!showxq&&isadd"
                class="upload-demo"
                action="http://61.141.223.10:8001/common/uploadFile"
                multiple
                show-file-list
                 accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.doc,.docx,.xls,.xlsx,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.DOC,.DOCX,.XLS,.XLSX"
                :on-remove='xgfile'
                :on-preview="yulan"
                :on-success="upload">
                <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
              <ul class="fjlist" v-if="showxq">
                  <li class="file_li" v-for="(item,index) in fileList" :key="index" @click="openf(item)">{{item.file_yname}}
                  </li>
                  <div class="clear"></div>
              </ul>
              <el-upload
               v-if="!isadd&&!showxq"
                class="upload-demo"
                action="http://61.141.223.10:8001/common/uploadFile"
                multiple
                show-file-list
                 accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.doc,.docx,.xls,.xlsx,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.DOC,.DOCX,.XLS,.XLSX"
                :on-remove='xgfile'
                :on-preview="yulan"
                :file-list="fileList"
                :on-success="upload">
                <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
              <a class="clear"></a>
            </p>
              </el-form-item>
            <div class="group-form-name hide-form-item"><div class="operator"  @click="showZb=!showZb"><span class="name">设备清单</span><a :class="showZb?'el-icon-minus':'el-icon-plus'" href="javascript:;"   style="color: #999;font-size:12px;text-decoration: none;font-weight:900"></a></div><span class="line"></span></div>
              <div class="dialog_warps" v-if="showZb">
             <div class="zibnr"  style="overflow-x: auto;overflow-y: hidden;">
          <div class="iconwarp" style="text-algin:right; ">
             <el-button size="small" type="primary"  class="dialog-button bao_cun" style=" " @click="addzibiao">增行</el-button>
          </div>
          <ul>
            <li>
              <span>操作</span><span>序号</span><span>备件名称</span><span>备件编码</span><span>规格型号</span><span>计量单位</span><span>需用数量(必填)</span><span>备注</span>
            </li>
            <li v-for="(item, index) in lysqForm.mx" :key="index">
              <p>
                <i class="el-icon-delete" title="删除" @click="deletezibiao(index)"></i>
              </p>
              <p>
                <el-input size="mini" type="text" :value="index+1"></el-input>
              </p>
              <p>
  
                <el-input :disabled="showxq" size="mini" type="text" v-model="item.bjmc" @focus="showDialogWl('wl')" placeholder="请选择"></el-input>
              </p>
              <p>
                <el-input size="mini" disabled type="text" v-model="item.bjbm"></el-input>
              </p>
              <p>
                <el-input size="mini" disabled type="text" v-model="item.ggxh"></el-input>
              </p>
              <p>
                <el-input size="mini" disabled type="text" v-model="item.jldw"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.xysl"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.bz"></el-input>
              </p>
            </li>
            <div style="clear: both"></div>
          </ul>
        </div>
        </div>
                </el-form>
              </div>
        <div class="dialog_footer" v-if="!showxq">
           <el-button size="small"  v-if="sl&&!showSbb"   @click.native="shenling()"
                         type="primary"  class="dialog-button bao_cun">保存</el-button>
            <el-button size="small"  v-if="sl&&showSbb"   @click.native="shenlingPlus('lysqForm')"
                          type="primary"  class="dialog-button bao_cun">保存</el-button>
            <el-button size="small" @click="resetForm"  class="dialog-button qu_xiao" style="margin-right: 20px">取消</el-button>
        </div>
  
    </el-dialog>
   <el-dialog class="data-dialog el-updata-div" title="重新分配" :close-on-click-modal="false" :visible.sync="cxfp" width="580px">
      <div class="dialog_warps" style="width:580px;min-width:500px">
        <div class="diaog_body">
          当前维修人员：<span style="color:#D34C42;text-align: center">{{sbfzr}} </span> &nbsp; &nbsp;  是否回退待分配状态？
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="resetfenpei">是</el-button>
          <el-button size="small" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">否</el-button>
        </div>
      </div>
    </el-dialog>
    <Dialog :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :bt="'人员选择'"
            :totals="totals"
            :bmbm="userInfo.daBmbm"
            :dwbm="userInfo.daZzbh"
            :dialogVisible="dialogVisible"
            @searchXMMC="searchXMMC"
            @closeDialog="closeDialog"></Dialog>
<DialogWl   v-if="showWl"
            :dialogTableTitWl="dialogTableTitWl"
            :btWl="'物料选择'"
            :mx="lysqForm.mx"
            :bmbm="userInfo.daBmbm"
            :dwbm="userInfo.daZzbh"
            :dialogVisibleWl="dialogVisibleWl"
            @closeDialogWl="closeDialogWl"></DialogWl>
  </div>
</template>

<script>
import Dialog from './dialog.vue'
import DialogWl from './dialogWl.vue' 
export default {
  components: {Dialog,DialogWl},
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
       dialogData:[],
      dialogTableTit:{ userName:'人员名称',userCode:'用户编码',deptList:'部门编码',roleList:'角色信息'},
      datatypes:'ry',
      dialogVisible:false,
      dialogVisibles:false,
      totals:0,
      typrry:'',
      dialogTableTitWl:{ bjmc:'资产名称',bjbh:'资产编码',ggxh:'规格型号',jldw:'计量单位',kcsl:'库存数量'},
      datatypesWl:'zc',
      showWl:false,
      dialogVisibleWl:false,
      typeWl:'',      
      showZb:true,
      fullscreenLoading: false,
       rules:{
          
        },
      rules_ly:{
        xyr: [
            { required: true, message: '需用人不能为空',trigger: 'blur'},
            { min: 1, message: '请选择需用人'}
          ],  

      },
      fpForm: {
        isww:'否',
        isly:'否',
      },
      lmshForm: {
        xcfx: '上行',
        isww:'否',
        isly:'否',
      },
      lysqForm: {
        xyr:'',
        mx:[{}]
      },
      index: '',
      isadd: false,
      addzb: true,
      cxfp:false,
      ckOptions:'',
      sbfzr:'',
      submitLoading: false,
      showxq: false,
      sl: false,
      bjList:[],
      showSearch: false,
      loading: false,
      tableHeight: 300,
      tableData: [],
      showBhForm: false,
      searchCriteria: false,
      showyanshou: false,
      showSbb: false,
      qmbbOptions: [],
      roadOptions: [],
      bjList: [],
      searchForm: {
        fpzt:'未分配'
      },
      total: 0,
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      multipleSelection: [],
      selectRow: [],
      userData:'',
      dataList:[],
      fileList:[],
      htbh: {
        wxrid: ''
      },
      qmbbOptions1: [],
      tbdwList:[],
      selectDw:'',
      defaultProps:{
          children: 'children',
          label: 'text'
        },
      deptCode:'',
      treeList:[],
       xz:{zcbm:'',zcmc:'',bmbm:''},
      zcList:[],
      ysrList:[],
      zcPage: 1,
      zcSize: 10,
      zctotal:10,
      showXzsb:false,
      iszd:false,
      defaultP:{
          children: 'children',
          label: 'text'
        },
      deleArr:'',
        multipleXz:[],
      xz0:{zcbm:'',zcmc:''},
      zcList0:[],
      multipleXz0:[],
      zcPage0: 1,
      zcSize0: 10,
      zctotal0:10,
      showXzsb0:false,
      deleArr0:'',
      treedata0: [],
      deptCode:'',
        defaultTree0: {
          children: 'children',
          label: 'text'
        },
    zkx:'',
    userInfo:{
        daZzbh:undefined,
        daZzid:undefined,
        daZzmc:undefined,
        daBmbm:undefined,
        daBmid:undefined,
        daBmmc:undefined,
        daYhbm:undefined,
        daYhid:undefined,
        daYhmc:undefined,
      },
      isRouterAlive:true
    }
  },
 async created(){
   this.initUser()
  this.deptCode=this.userInfo.daBmbm
  console.log(this.deptCode)
  },
  watch: {
    multipleSelection(data) {  //存储选中的row
      this.selectRow = [];
      if (data.length > 0) {
        data.forEach((item, index) => {
          this.selectRow.push(item.id);
        });
      }
    }
  },
  methods: {
     shenpi (row, index, rowobj) {
      if(row.fpry==undefined){
        this.$message({
            message: '请先申领该任务单',
            type: 'error'
          })
          return
      }
      this.$confirm('是否确定提交？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let form = JSON.parse(JSON.stringify(row))
        form.spzt = '3502'
 
        let {yhmc,yhid,bmmc,orgmc} = config.userInfo
 
        this.$api.createWorkFlow({
          pc_initiator:yhmc,
          pc_initiatorid: yhid,
          pc_name: '51',
          pc_project_id: form.djbh,
          pc_remarks: '',
          pc_state: '1',
        },{
          group:bmmc,
          org:orgmc}).then(res=>{
          if(res.code == 1){

            this.$api.spRwpf('?spzt='+ 3502 +'&djbhs='+ form.djbh).then(res => {
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
     searchXMMC(val){
       let bm=this.userInfo.daBmbm
      if(val.bmbm){
        bm= val.bmbm
      }
      if(val.userName==undefined || val.userName==''){
        val.userName=''
      }
        this.$api.selRyByDwAndBm('?pageNum=' + val.currentPage + '&pageSize=' + val.pageSize + '&bmbm=' + bm +'&dwbm=' + this.userInfo.daZzbh + '&username='+ val.userName).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
       
         this.dialogData = resp.data.data.list
          this.totals= resp.data.data.total
        }
      }).catch(e => {
      })  
      },

      showDialog(type){
        this.typrry=type
     this.dialogVisible = true
      this.$api.selRyByDwAndBm('?pageNum=' + 1 + '&pageSize=' +10 + '&bmbm=' + this.userInfo.daBmbm+'&dwbm=' + this.userInfo.daZzbh).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
       
         this.dialogData = resp.data.data.list
          this.totals= resp.data.data.total
        }
      }).catch(e => {
      })  
      },
      closeDialog(val){
        this.dialogVisible = false
        if(val==undefined || val=='undefined'){
          return
        }
        if (val.userName) {
          switch (this.typrry) {
            case 'xyr':{
              this.lysqForm.xyr=val.userName
              break;}
            default:
              break;
          }
            
          }
      },
     showDialogWl(type){
        this.typeWl=type
        this.showWl=true
     this.dialogVisibleWl = true
      
      },
      closeDialogWl(val){
        this.showWl=false
        this.dialogVisibleWl= false
        if(val==undefined || val=='undefined'){
          return
        }
      if(val.length>0){
        for(let i=0;i<val.length;i++){
          let obj={}
          obj.bjmc=val[i].bjmc
          obj.bjbm=val[i].bjbh
          obj.ggxh=val[i].ggxh
          obj.jldw=val[i].jldw
          obj.xysl=1
          this.lysqForm.mx.push(obj)
        }
        for (let i = 0; i < this.lysqForm.mx.length; i++) {
         if(this.lysqForm.mx[i].bjmc=='' || this.lysqForm.mx[i].bjmc==undefined){
            this.lysqForm.mx.splice(i,1)
          }
          
        }
        } 
      },
   sigClic (row){
this.$refs.multipleTable.toggleRowSelection(row)
    },
    handleIconClick (){
     this.searchForm.tbdwdm=this.userInfo.daZzbh
     this.searchForm.tbbmdm=this.userInfo.daBmbm
      this.selectDw=''
    },
    clears (){
      if(this.selectDw == ''){
        this.searchForm.tbdwdm=this.userInfo.daZzbh
      this.searchForm.tbbmdm= this.userInfo.daBmbm
      }
    },
    daoru () {
    },
    
    clickRow2(row){
      //资产
      
      this.$refs.Table0.toggleRowSelection(row)
    },
    showBhFormDia (row) {
      console.log(row.fpry)
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.$api.getFilesDataById('?id='+this.lmshForm.djbh).then(res=>{
       if(res.data.code==1){
         this.fileList=res.data.data
       }
     }).catch(er=>{
     })
    },
    dbclick (row){
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.$api.getFilesDataById('?id='+this.lmshForm.djbh).then(res=>{
       if(res.data.code==1){
         this.fileList=res.data.data
       }
     }).catch(er=>{
     })
    },
    showBhPf (row) {
      if(row.fpzt==='待分配'){
      this.showyanshou = true
      this.lmshForm.djbh = row.djbh
      }else{
        alert('任务已分配')
      }
    },
    selectisWw (value) {
      this.lmshForm.isww=value
    },
    selectisLy (value) {
      this.lmshForm.isly=value
      if (value=='是') {
          this.showSbb=true
           this.lysqForm.wxdh=this.fpForm.djbh
          this.formId = 'lysq' + new Date().getTime()
          this.lysqForm.djbh = this.formId
          this.lysqForm.tbsj = this.formatDate(new Date())
          // if(getQueryString('userCode')){
           this.lmshForm.tbdw = this.userInfo.daZzmc
      this.lmshForm.tbr = this.userInfo.daYhmc
      this.lmshForm.tbbm =  this.userInfo.daBmmc
            // }
      }else {
          this.showSbb=false
      }
    },
    resetFp (row){
      this.lmshForm.djbh = row.djbh
      this.sbfzr = row.sbfzr
      this.cxfp=true

    },
    resetfenpei () {
      this.$api.jdwhxjwxhtfpzt('?djbh=' + this.lmshForm.djbh).then(res=>{
        if(res.data.code==1){
        this.$message({
              type: 'success',
              message: '回退成功'
            })}else{
        this.$message({
              type: 'error',
              message: '操作失败'
            })
            }
        this.search(this.currentPage, this.pageSize)
        this.resetForm()
      })
    },
    showBhSl (row) {
      if(row.fpzt!='已分配'){
      this.sl = true
      this.showSbb=false
      this.showyanshou = true
      this.fpForm.djbh = row.djbh
      this.fpForm.fpry = this.userInfo.daYhmc
      this.fpForm.wxrid=this.userInfo.daYhid
      console.log(this.sl&&!this.showSbb)
      }else{
        alert('任务已分配')
      }
    },
    search (currentPage, pageSize) {
      this.loading = true
      this.showSearch = false
      if (this.searchForm.jcrq) {
        this.searchForm.ksrq = this.searchForm.jcrq[0]
        this.searchForm.jsrq = this.searchForm.jcrq[1]
      } else {
        this.searchForm.ksrq = ''
        this.searchForm.jsrq = ''
      }
      this.searchForm.spzt=''
      this.$api.jdwhxjwxgetWxrwdList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.loading = false
          this.tableData = resp.data.data.list
 
          this.total = resp.data.data.total
        }
      }).catch(e => {
        this.loading = false
      })
    },
 
    shenhe (row, index) {
      this.showyanshou = true
      this.lmshForm.djbh = row.djbh
    },
    shenling () {
      // 不领用设备
      // console.log(1)
      if(this.fpForm.isww=='否'){
        this.$api.jdwhxjwxfpWxrwd('?djbh=' + this.fpForm.djbh + '&fpry=' + this.fpForm.fpry + '&wxrid=' + this.fpForm.wxrid+'&isww=' + this.fpForm.isww+'&isly=' + this.fpForm.isly).then(res => {
        if (res.data.code === 1) {
          this.$api.spRwpf('?spzt=3503'+'&djbhs='+this.fpForm.djbh).then(resp => {
        if (resp.data.code== 0) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.search(this.currentPage, this.pageSize)
          this.resetForm()
        }
      }).catch(e => {
      })
     
        }
      })

      }else{
     if(this.fpForm.isww=='是'){
        this.$api.jdwhxjwxfpWxrwd('?djbh=' + this.fpForm.djbh + '&fpry=' + this.fpForm.fpry + '&wxrid=' + this.fpForm.wxrid+'&isww=' + this.fpForm.isww+'&isly=' + this.fpForm.isly).then(res => {
        if (res.data.code === 1) {
       this.$api.spRwpf('?spzt=3501'+'&djbhs='+this.fpForm.djbh).then(resp => {
        if (resp.data.code== 0) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.search(this.currentPage, this.pageSize)
          this.resetForm()
        }
      }).catch(e => {
      })
        }
      })
      }

    }
    },
    shenlingPlus (formName) {
      // 领用设备
      this.lysqForm.spzt='3501'
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.fpForm.isww=='否'){
        this.$api.jdwhxjwxfpWxrwd('?djbh=' + this.fpForm.djbh + '&fpry=' + this.fpForm.fpry + '&wxrid=' + this.fpForm.wxrid+'&isww=' + this.fpForm.isww+'&isly=' + this.fpForm.isly).then(res => {
        if (res.data.code === 1) {
          this.$api.spRwpf('?spzt=3503'+'&djbhs='+this.fpForm.djbh).then(resp => {
        if (resp.data.code== 0) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.search(this.currentPage, this.pageSize)
          this.resetForm()
        }
      }).catch(e => {
      })
       
        }
      })

      }else{
     if(this.fpForm.isww=='是'){
        this.$api.jdwhxjwxfpWxrwd('?djbh=' + this.fpForm.djbh + '&fpry=' + this.fpForm.fpry + '&wxrid=' + this.fpForm.wxrid+'&isww=' + this.fpForm.isww+'&isly=' + this.fpForm.isly).then(res => {
        if (res.data.code === 1) {
      this.$api.spRwpf('?spzt=3501'+'&djbhs='+this.fpForm.djbh).then(resp => {
        if (resp.data.code== 0) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.search(this.currentPage, this.pageSize)
          this.resetForm()
        }
      }).catch(e => {
      })
        }
      })
      }

    }
      if(this.dataList.length>0){
      for (let index = 0; index < this.dataList.length; index++) {
        this.dataList[index].file_id=this.lysqForm.djbh
      }
       let fileDatas=this.dataList
       this.$api.addFileData(fileDatas).then(res=>{
         if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.dataList=[]
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
      this.lysqForm.tbdwdm=this.userInfo.daZzbh
      this.lysqForm.tbbmdm=this.userInfo.daBmbm
      if(this.deptCode.length<=5){
        this.lysqForm.tyzt='已同意'
      }
      this.lysqForm.tbdw = this.userInfo.daZzmc
      this.lysqForm.tbsjc= new Date().getTime()
      this.lysqForm.tbr = this.userInfo.daYhmc
      this.lysqForm.tbbm =  this.userInfo.daBmmc
this.lysqForm.tbsj=this.formatDate(new Date())
      this.lmshForm.tbsj=this.formatDate(new Date())
       this.$api.jdwhbjgladdLysq(this.lysqForm).then(res => {
        //  console.log(res)
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '设备领用成功!'
          })
           this.resetForm()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
            } else {
            return false;
          }
        });
       
    },
    fenpei () {
      this.$api.jdwhxjwxfpWxrwd('?djbh=' + this.lmshForm.djbh + '&fpry=' + this.lmshForm.fpry + '&wxrid=' + this.lmshForm.wxrid).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '分配成功!'
          })
          this.showyanshou = false
          this.search(this.currentPage, this.pageSize)
          this.resetForm()
        }
      })
    },
    upload (response, file, fileList) {
      this.dataList=[]
      for (let index = 0; index < fileList.length; index++) {
        if(fileList[index].response){
          this.dataList.push(fileList[index].response.data)
        }else{
          this.dataList.push(fileList[index])
        }
      }
    },
    xgfile( file, fileList){
      this.deleArr+=file.id+','
    if(!this.showxq){
    this.dataList=[]
      for (let index = 0; index < fileList.length; index++) {
        if(fileList[index].response){
          this.dataList.push(fileList[index].response.data)
        }else{
          this.dataList.push(fileList[index])
        }
      }
      }
    },
    yulan(file){
      if(file.response){
      let url=file.response.data.file_path
        window.open(url)
      }else{
        let url=file.file_path
        window.open(url)
      }

    },
    openf(item){
      window.open(item.file_path)
    },
    deleteFile(item,index,event){
       if(event) {
        event.stopPropagation ? event.stopPropagation(): event.cancelBubble = true;
          }
      this.deleArr.push(item.id)
      $('.file_li').eq(index).remove()
    },
    rowClass({ row, rowIndex }) {
      if (this.selectRow.includes(row.id)) {
        return { "background-color": "rgba(185, 221, 249, 0.75)" };
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
    resetForm (res) {
      this.showZb=true
      this.loading=false
      if(res!==undefined && res.target==undefined){
      if(this.$refs[res] != undefined){
        this.$refs[res].resetFields();
        }
      }
      this.showxq=false
      this.loading=false
      this.showyanshou = false
      this.sl = false
      this.cxfp = false
      this.showDetail = false
      this.showSbb=false
      this.lmshForm = {
        xcfx: '上行',
        isww:'否',
        isly:'否',
      }
      this.fpForm={
        isww:'否',
        isly:'否',
      }
      this.lysqForm={
        xyr:'',
          mx:[{}]
      }
         },
    openf(item){
      window.open(item.file_path)
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
    pizhun (row, index) {
      if(row.fpry==undefined){
        this.$message({
            message: '请先申领该任务单',
            type: 'error'
          })
          return
      }
      this.$confirm('是否通过批准？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$api.spRwpf('?spzt=已批准'+'&djbhs='+row.djbh).then(resp => {
        if (resp.data.code== 0) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
           this.search(this.currentPage, this.pageSize)
          this.$message({
          type: 'success',
          message: '批准通过!'
        })
        }
      }).catch(e => {
      })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消批准'
        })
      })
    },
    tongyi (row, index) {
      this.$confirm('是否同意该申请？', '', {
        confirmButtonText: '同意',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
      this.$api.tyRwpf('?tyzt=已同意'+'&djbhs='+row.djbh).then(resp => {
        if (resp.data.code== 0) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.search(this.currentPage, this.pageSize)
          this.$message({
          type: 'success',
          message: '已同意!'
        })
        }
      }).catch(e => {
      })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        })
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
    selectHt (value) {
      this.lmshForm.wxrid = value.wxrid
      this.lmshForm.fpry = value.fpry
    },
    selectBj (value) {
      this.lysqForm.mx[this.lyjcindex].bjbm = value.bjbm
      this.lysqForm.mx[this.lyjcindex].jldw = value.jldw
      this.lysqForm.mx[this.lyjcindex].cksl = value.cksl
      this.lysqForm.mx[this.lyjcindex].ggxh = value.ggxh
      this.lysqForm.mx[this.lyjcindex].kcsl = value.kcsl
      this.lysqForm.mx[this.lyjcindex].bjmc = value.bjmc
    },
    handleSelectionXz0(val){
      this.multipleXz0 = val
    },
    fuzhi (item, index) {
      this.lyjcindex = index
    },
    addzibiao () {
      this.lysqForm.mx.push({})
    },
    deletezibiao (index) {
      this.lysqForm.mx.splice(index, 1)
    },
    getTbdw(code,bmbm){
        // this.$api.getUserDw('?yhdw='+code).then(res=>{
        //   if(res.data.code===1){
        //   this.tbdwList= res.data.data
        //   // this.selectDw=this.tbdwList[0].text
        //   this.searchForm.tbdwdm= this.tbdwList[0].id
        //   this.search(this.currentPage, this.pageSize)
        //   }
        // })
        this.fullscreenLoading=true
        this.$api.getUserDept2('?dwbm=' +  code+'&bmbm='+ bmbm).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
           this.tbdwList= resp.data.data
           this.zkx=this.tbdwList[0].id
           this.searchForm.ssdwdm=this.userInfo.daZzbh
            this.searchForm.tbbmdm=this.userInfo.daBmbm
          this.search(this.currentPage, this.pageSize)
          this.fullscreenLoading=false
        }
      }).catch(e => {
        this.fullscreenLoading=false
      })
    },
    initUser(){
     let userInfo = config.jd_infor[0]
      if(userInfo){
        if(userInfo){
          this.userInfo.daYhbm = userInfo.userCode
          this.userInfo.daYhid = userInfo.userId
          this.userInfo.daYhmc = userInfo.userName
          let deptList = userInfo.deptList
          let bminfo = deptList[0]

          if(bminfo){
            this.userInfo.daBmbm = bminfo.deptCode
            this.userInfo.daBmid = bminfo.deptId
            this.userInfo.daBmmc = bminfo.deptName
            let org = bminfo.org
            if(org){
              this.userInfo.daZzbh = org.orgCode
              this.userInfo.daZzid = org.orgId
              this.userInfo.daZzmc = org.orgName
            }
          }
        }

      }
      this.searchForm.tbdwdm=this.userInfo.daZzbh
      this.searchForm.tbbmdm=this.userInfo.daBmbm
    },
    handleNodeClick(data){
      this.selectDw=data.text
      this.searchForm.ssdwdm=this.userInfo.daZzbh
      this.searchForm.tbbmdm=data.id
      // this.searchForm.tbbmdm= data.id
       $('.tbdw').hide(this.searchForm)
    },
     selectDwTree(){
      $('.tbdw').show()
    },
    getQmldbb () {
      this.$api.jdwhckglgetCkAll('?dwbm='+this.userInfo.daZzbh+'&bmbm='+this.userInfo.daBmbm).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.ckOptions = resp.data.data
        }
      }).catch(e => {
      })
      this.$api.jdwhxjwxgetWxzrrInfo().then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.qmbbOptions = resp.data.data
        }
      }).catch(e => {})
      this.$api.jdwhbjglgetBjLyInfo().then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.bjList = resp.data.data
        }
      }).catch(e => {
      })
      this.$api.jdwhxjwxgetXjType('?mjlxbm=25').then(resp => {
        if (resp.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.qmbbOptions1 = resp.data
        }
      }).catch(e => {
      })
    },
     selectDwTree(){
      $('.tbdw').show()
    },
    
  },
 
  mounted () {
 
    this.getTbdw(this.userInfo.daZzbh,this.userInfo.daBmbm)
    this.getQmldbb()
    // this.tableHeight = $('#rwpf')[0].offsetHeight
    document.onclick=function(e){
      if(e.target&&e.target.className!='el-input__inner'){
         $('.tbdw').hide()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.background_image{
  >div{
    background: none;
  }
}
  #rwpf{
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    min-width: 1100px;
    overflow: auto;
    .header{}
    .conter_table{
      height: calc(100% - 142px);
      min-height: 300px;
    }
     .tbdw{
          display:none;
          width: 200px;
          max-height: 500px;
          overflow-y: scroll;
          border: 1px solid #D5D6D7;
          position: absolute;
          top:40px;
          z-index: 999;
        }
      .selectDw{
        display: inline-block;
          width: 150px;
          height: 30px;
          vertical-align: top;
      }
        .el-tree{
          min-width: 120px;
          position: relative;

        }
        .el-tree__empty-text,.el-tree__empty-block{
          position: relative;
          width: 120px;
          height: 26px;
          min-height: 26px;
          line-height: 26px;
          top: 0px;
        }
    .bill-header{
		width: 100%;
		border-radius:5px;
		margin-bottom:5px;
	}
	.bill-title{
		height:46px;
		line-height: 45px;
		width: 100%;
		padding: 0 20px;
		background-color: #F6F6F6;
		> span{
			font-size: 16px;
			font-weight: 600;
		}
	    > ul{
	   	  float:right;
	   	  display:inline-block;
	   	  padding-top: 7px;
	   	  > li{
	   	  	float: left;
	   	  	margin-left: 0 !important;
		    font-size: 13px;
		    font-weight: 400;
		    height: 32px;
		    line-height: 2.2;
		    min-width: 60px;
		    padding: 0 14px;
		    border: 1px solid #D0D0D0;
		    cursor: pointer;
	   	  }
	   	 > li:first-child{
	   	 	border-radius: 5px 0 0 5px;
	   	 }
	   	  > li:last-child{
	   	 	border-radius:  0 5px 5px 0;
	   	 	border-left: 0 solid #D0D0D0;
	   	 }
	   }
	}
	.bill-search{
		height:90px;
		width: 100%;
		padding: 0 20px;
	  background-color: #fff;
  }
    .footer{
       height: 45px;
       background: #fff;
       position: relative;
       text-align: center;

    }
   .dialog_warps{
      background: #fff;
      padding: 20px 80px;
      .zhubnr{
        li{
          width: calc(100% / 3);
          height: 40px;
          float: left;
          border: 1px solid #D5D6D7;
          border-right:none;
          border-bottom: none;
          color: #52575D!important;
          font-size: 16px;
          &:nth-of-type(3n){
            border-right:1px solid #D5D6D7;
          }
          &:nth-last-of-type(1){
            border-bottom: 1px solid #D5D6D7;
          }
          >span{
            width: 100px;
            display: inline-block;
            height: 100%;
            line-height: 39px;
            text-indent: 1em;
            font-size: 12px;
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
              vertical-align: top;
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
          height: 80px;
          overflow: hidden;
          >span{
            height: 80px;
            height: 100% !important;
          }
          p{
             height: 80px;
             overflow: hidden;
            .el-textarea__inner{
              border: none;
              height: 79px!important;
            }
          }
          .up{
           overflow: auto;
          }
          .el-upload-list__item{
            border: none;
          }
          .el-upload-list__item{
            line-height: 32px;
            margin: 0px;
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
            height: 40px;
            float: left;
            box-sizing: border-box;
            border: 1px solid #D5D6D7;
            color: #52575D!important;
            font-size: 12px;
            border-right: none;
            border-bottom: none;
            &:nth-last-of-type(1){
              border-bottom: 1px solid #D5D6D7;
            }
            >span{
              width: calc((100% - 100px)/6);
              display: inline-block;
              height: 100%;
              float: left;
              line-height: 39px;
              text-align: center;
              background: #F7F8F9;
              border-right: 1px solid #D5D6D7;
              &:nth-of-type(1){
                width: 50px;
              }
              &:nth-of-type(2){
                width: 50px;
              }
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
              width: calc((100% - 100px)/6);
              height: 100%;
              line-height: 39px;
              float: left;
              border-right: 1px solid #D5D6D7;
              &:nth-of-type(1){
                width: 50px;
              }
              &:nth-of-type(2){
                width: 50px;
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
              vertical-align: top;
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
