/**
* ----故障报修
*/
<template>
  <div id="gzbx" class="styleSheets" style="height: 100%" v-loading.fullscreen.lock="fullscreenLoading"  v-if="isRouterAlive">
    <div class="bill-header">
  		<div class="bill-title">
  			<span>故障报修</span>
  			 <ul>
	          <li @click="showAdd()" class="Hight_btn">新增</li>
	          <li @click="deleteData()">删除</li>
	        </ul>
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
             <el-select clearable  size="mini" style="width: 148px;" v-model="searchForm.gzlx" value-key="mjbm" placeholder="请选择故障系统">
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
          <el-form-item style="margin-bottom: 0px" prop="" class="">
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
                 :row-style="rowClass"
                @row-dblclick="dbclick" 
                @row-click="sigClic"
                 v-loading="loading"
                @selection-change="handleSelectionChange">
        <!-- <el-table-column
          type="selection"
           :selectable='checkboxInit'
          align="center"
          width="55">
        </el-table-column> -->
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column sortable align="left" prop="gzlx" class-name="column-caoz" label="故障系统" width="80" show-overflow-tooltip></el-table-column>
        <!--<el-table-column align="left" prop="sfbx" label="是否保修" show-overflow-tooltip></el-table-column>-->
       <el-table-column align="left" label="状态" sortable width="80">
        <template scope="scope">
            <span style="color:#D34C42;text-align: left;cursor: pointer;" v-if="scope.row.spzt==='3501'" >自由</span>
            <span style="color:#3EC481;text-align: left;cursor: pointer;" v-if="scope.row.spzt==='3502'">审批中</span>
            <span style="color:#00a2fd;text-align: left;cursor: pointer;" v-if="scope.row.spzt==='3503'">已审批</span>
        </template>
        </el-table-column>
        <el-table-column sortable align="left" prop="ggxh" label="规格型号"></el-table-column>
        <el-table-column align="left" sortable prop="sbmc" label="设备名称" show-overflow-tooltip></el-table-column>
        <el-table-column align="left" sortable width="100"  prop="gzdj" label="故障等级"></el-table-column>
        <el-table-column align="left" sortable width="100"  prop="bzrq" label="报障日期"></el-table-column>
        <el-table-column sortable align="left" prop="bgr" label="报告人"></el-table-column>
        <el-table-column sortable align="left" prop="tbdw" label="填报单位"></el-table-column>
         <el-table-column sortable align="left" prop="tbbm" label="填报部门"></el-table-column>
        <el-table-column align="left" sortable width="100"  prop="tbsj" label="填报日期"></el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="100">
          <template scope="scope">
            <span   v-if="scope.row.spzt == '3501'"  style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span v-if="scope.row.spzt == '3501' && scope.row.bxfs=='自修'"  style="color:#00a2fd;cursor: pointer;text-align: center" @click="shenpi(scope.row, scope.$index)">提交</span>
            
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
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
    
 
    <el-dialog fullscreen :show-close="false" class="data-dialog el-updata-div"  :close-on-click-modal="false" :visible.sync="showDetail" width="580px">
      <span slot="title">
          <span class="titleclasschild"  @click="resetForm('lmshForm')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>故障报修</span>
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
              <span>设备编码: </span>
              <span>{{lmshForm.sbbm}}</span>
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
              <span>报修方式: </span>
              <span>{{lmshForm.bxfs}}</span>
            </p>
            <p   class=" addJLD">
              <span>是否委外: </span>
              <span>{{lmshForm.isww}}</span>
            </p>
            <p   class=" addJLD">
              <span>是否领用设备: </span>
              <span>{{lmshForm.isly}}</span>
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
            <p   class=" addJLD_long">
              <span>备注: </span>
              <span>{{lmshForm.bz}}</span>
            </p>
            <p   class=" addJLD_long">
              <span>附件: </span>
              <span><ul class="fjlist" v-if="showxq">
                  <li class="file_li" v-for="(item,index) in fileList" :key="index" @click="openf(item)">{{item.file_yname}}
                  </li>
                  <div class="clear"></div>
              </ul></span>
            </p>
            
    
      </div>

       <p class="zibiao_title"  v-if="showxq&&showSbb" >领用设备信息</p>
       <el-form :model="lysqForm"  v-if="showxq&&showSbb"   ref="lysqForm" label-width="100px" class="demo-lmshForm">
      <div class="showxq" v-if="showxq" style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>单据编号: </span>
              <span>{{lysqForm.djbh}}</span>
            </p>
            <p  class=" addJLD">
              <span>需用人: </span>
              <span>{{lysqForm.xyr}}</span>
            </p>
            <p   class=" addJLD">
              <span>填报人: </span>
              <span>{{lysqForm.tbr}}</span>
            </p>
            <p   class=" addJLD">
              <span>填报时间: </span>
              <span>{{lysqForm.tbsj}}</span>
            </p>
            <p   class=" addJLD">
              <span>填报单位: </span>
              <span>{{lysqForm.tbdw}}</span>
            </p>
            <p   class=" addJLD">
              <span>填报部门: </span>
              <span>{{lysqForm.tbbm}}</span>
            </p>
            <p   class=" addJLD_long">
              <span>领用说明: </span>
              <span>{{lysqForm.lysm}}</span>
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
              <span>{{lysqForm.bz}}</span>
            </p>
             <el-table
    :data="lysqForm.mx"
    border
    style="width: 90%;">
    <el-table-column
      type="index"
      label="序号"
      align="center"
      width="80">
    </el-table-column>
    <el-table-column
      prop="bjmc"
      label="备件名称"
      >
    </el-table-column>
    <el-table-column
      prop="bjbm"
      label="备件编码">
    </el-table-column>
    <el-table-column
      prop="ggxh"
      label="规格型号">
    </el-table-column>
    <el-table-column
      prop="jldw"
      label="计量单位">
    </el-table-column>
    <el-table-column
      prop="xysl"
      label="需用数量">
    </el-table-column>
    <el-table-column
      prop="bz"
      label="备注">
    </el-table-column>
  </el-table>
      </div>
      </el-form>
      </el-form>
<el-form v-if="!showxq"  :model="lmshForm" :rules="rules" ref="lmshForm" label-width="100px" class="demo-lmshForm">
              <!-- <el-form-item  class=" addJLD"  label="单据编号" prop="djbh">
                <span  class="edit_text">{{lmshForm.djbh}}</span>
              </el-form-item> -->
              <el-form-item class=" addJLD" label="设备名称" prop="sbmc" >
                <el-input size="mini"  v-model="lmshForm.sbmc"  @focus="showDialogZc('zc')" placeholder="请选择"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD"  label="故障系统" prop="gzlx">
                <!-- <el-select  size="mini" style="width: 148px;" v-model="lmshForm.gzlx" value-key="mjbm" placeholder="请选择">
                <el-option v-for="item in qmbbOptions1" :key="item.mjbm" :label="item.mjmc" :value="item.mjmc"></el-option>
              </el-select> -->
                <span class="edit_text">{{lmshForm.gzlx}}</span>
              </el-form-item>
              
              <el-form-item class=" addJLD" label="设备编码" prop="sbbm">
                <span class="edit_text">{{lmshForm.sbbm}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="规格型号" prop="ggxh">
               <span class="edit_text">{{lmshForm.ggxh}}</span>
              </el-form-item>
             <el-form-item class=" addJLD" label="报告人" prop="bgr">
                <span class="edit_text">{{lmshForm.bgr}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="报障日期" prop="bzrq">
                <el-date-picker
                v-model="lmshForm.bzrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
              </el-form-item>
              
               <el-form-item class=" addJLD" label="故障等级" prop="gzdj">
                <el-select  size="mini" v-model="lmshForm.gzdj" value-key="mjbm" placeholder="请选择故障等级">
                <el-option value="一级故障"></el-option>
                <el-option value="二级故障"></el-option>
                <el-option value="三级故障"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item class=" addJLD" label="设备负责人" prop="sbfzr">
                <el-input size="mini"  v-model="lmshForm.sbfzr" ></el-input>
              </el-form-item>
              <el-form-item v-if="isadd" class=" addJLD" label="报修方式" prop="bxfs">
                <!-- <el-select   size="mini" style="width: 148px;" v-model="lmshForm.bxfs"  @change="selectBX">
                <el-option value="上报"></el-option>
                <el-option value="自修"></el-option>
              </el-select> -->
              <el-radio :disable="!isadd" v-model="lmshForm.bxfs" label="上报" @change="selectBX">上报</el-radio>
              <el-radio :disabled="!isadd" v-model="lmshForm.bxfs" label="自修" @change="selectBX">自修</el-radio>
              </el-form-item>
              <el-form-item v-if="!isadd" class=" addJLD" label="报修方式" prop="bxfs">
        
            <span class="edit_text">{{lmshForm.bxfs}}</span>
              </el-form-item>
              <el-form-item v-if="showww" class=" addJLD" label="是否委外" prop="isww">
            
              <el-radio v-if="isadd" v-model="lmshForm.isww" label="是" >是</el-radio>
              <el-radio  v-if="isadd"  v-model="lmshForm.isww" label="否" >否</el-radio>
              <span v-if="!isadd" class="edit_text">{{lmshForm.isww}}</span>
              </el-form-item>
              <el-form-item v-if="showLsb" class=" addJLD" label="是否领用设备" prop="isly">
          
              <el-radio v-if="isadd" v-model="lmshForm.isly" label="是" @change="selectisLy">是</el-radio>
              <el-radio v-if="isadd" v-model="lmshForm.isly" label="否" @change="selectisLy">否</el-radio>
               <span v-if="!isadd" class="edit_text">{{lmshForm.isly}}</span>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="故障描述" prop="gzms">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lmshForm.gzms"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="备注" prop="bz">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lmshForm.bz"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="附件" prop="">
                <p class="up">
              <el-upload
               v-if="!showxq&&isadd"
                class="upload-demo"
                action="http://61.141.223.10:8001/common/uploadFile"
                multiple
                show-file-list
                :file-list="fileList"
                :on-remove='xgfile'
                 accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.doc,.docx,.xls,.xlsx,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.DOC,.DOCX,.XLS,.XLSX"
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
                 accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.doc,.docx,.xls,.xlsx,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.DOC,.DOCX,.XLS,.XLSX"
                multiple
                show-file-list
                :on-remove='xgfile'
                :on-preview="yulan"
                :file-list="fileList"
                :on-success="upload">
                <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
              <a class="clear"></a>
            </p>
              </el-form-item>
              <div v-if="!showxq&&showSbb">
                <p class="zibiao_title">领用设备</p>
                <el-form :model="lysqForm" :rules="rules_ly" ref="lysqForm" label-width="100px" class="demo-lmshForm">
                  <!-- <el-form-item class=" addJLD" label="单据编号" prop="djbh">
                <span  class="edit_text">{{lysqForm.djbh}}</span>
              </el-form-item> -->
              <el-form-item class=" addJLD" label="维修单号" prop="wxdh">
                <span  class="edit_text">{{lysqForm.wxdh}}</span>
              </el-form-item>
               <!-- <el-form-item class=" addJLD" label="备件类型" prop="bjlx">
                <el-select  size="mini"   v-model="lysqForm.bjlx" value-key="mjbm" placeholder="请选择备件类型"  @change="qklx">
                <el-option value="备件类"></el-option>
                <el-option value="资产类"></el-option>
              </el-select>
              </el-form-item> -->
              <el-form-item class=" addJLD" label="需用人" prop="xyr">
                <el-input size="mini"  v-model="lysqForm.xyr" @focus="showDialog('xyr')" ></el-input>
              </el-form-item>
              <!-- <el-form-item class=" addJLD" label="仓库名称" prop="ckmc">
              <el-select clearable  v-model="lysqForm.ckmc"  size="mini"   placeholder="请选择仓库" >
                <el-option v-for="(item,index) in ckOptions" :key="index" :label="item.ssck" :value="item.ssck"></el-option>
              </el-select>
              </el-form-item> -->
              <el-form-item class=" addJLD_long" label="领用说明" prop="lysm">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lysqForm.lysm"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="备注" prop="bz">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lysqForm.bz"></el-input>
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
          <el-button size="small" v-if="isadd&&!showSbb" type="primary"  class="dialog-button bao_cun"  :loading="submitLoading" @click="addSubmit('lmshForm')">保存</el-button>
          <el-button size="small" v-if="isadd&&showSbb" type="primary"  class="dialog-button bao_cun"  :loading="submitLoading" @click="addSubmitPlus('lmshForm')">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit('lmshForm')">保存</el-button>
          <el-button size="small" @click="resetForm('lmshForm')"  class="dialog-button qu_xiao" style="margin-right: 20px">取消</el-button>
        </div>


            </el-form>
    
    </el-dialog>
 <el-dialog fullscreen class="data-dialog el-updata-div" title="维修登记"   :visible.sync="wxdj_show" width="580px"  :show-close="false">
     <span slot="title">
          <span class="titleclasschild"  @click="resetForm('wxdj_lmshForm')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>维修登记</span>
      </span>
    <el-form :rules="wxdj"  :model="wxdjForm" ref="wxdj_lmshForm" label-width="100px" class="demo-lmshForm">
              <el-form-item class=" addJLD"  label="报修单号" prop="bxdh">
              <span class="edit_text">{{wxdjForm.bxdh}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="设备名称" prop="sbmc" >
               <span class="edit_text">{{wxdjForm.sbmc}}</span>
              </el-form-item>
              <el-form-item disabled class=" addJLD" label="规格型号" prop="ggxh">
                <span class="edit_text">{{wxdjForm.ggxh}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="报障日期" prop="bzrq">
              <span class="edit_text">{{wxdjForm.bzrq}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="报告人" prop="bgr">
               <span class="edit_text">{{wxdjForm.bgr}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="维修日期" prop="wxrq">
                <el-date-picker
                v-model="wxdjForm.wxrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
              </el-form-item>
              <el-form-item class=" addJLD" label="现场维修人" prop="xcwxr">
                <el-input size="mini"  v-model="wxdjForm.xcwxr" @focus="showDialog('xcwxr')"></el-input>
              </el-form-item>
              <!-- <el-form-item v-if="wxdjForm.isww==='是'" class=" addJLD" label="立项审批号" prop="lxsph">
               <el-input size="mini" type="text" v-model="wxdjForm.lxsph"></el-input>
              </el-form-item>
              <el-form-item v-if="wxdjForm.isww==='是'" class=" addJLD" label="施工方负责人" prop="fzr">
               <el-input size="mini" type="text" v-model="wxdjForm.fzr"></el-input>
              </el-form-item> -->
              <el-form-item class=" addJLD" label="指定验收人" prop="qrr">
               <el-input size="mini" type="text" v-model="wxdjForm.qrr" @focus="showDialog('zdysr')"></el-input>
              </el-form-item>
              <!-- <el-form-item v-if="wxdjForm.isww==='是'" class=" addJLD_long" label="同行验收人" prop="gzms">
                <el-input size="mini" type="textarea" v-model="wxdjForm.txqrr" @focus="showDialogs"></el-input>
              </el-form-item> -->
              
              <el-form-item class=" addJLD_long" label="现场情况描述" prop="xcqkms">
                 <el-input size="mini" type="textarea" v-model="wxdjForm.xcqkms"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="维修结果描述" prop="wxjgms">
                 <el-input size="mini" type="textarea" v-model="wxdjForm.wxjgms"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="故障描述" prop="gzms">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="wxdjForm.gzms"></el-input>
              </el-form-item>
              <!-- <el-form-item v-if="wxdjForm.isww==='是'" class=" addJLD_long" label="委外主要工作内容" prop="wwzygznr">
                 <el-input size="mini" type="textarea" v-model="wxdjForm.wwzygznr"></el-input>
              </el-form-item>
              <el-form-item v-if="wxdjForm.isww==='是'" class=" addJLD_long" label="施工方意见" prop="sgfyj">
                 <el-input size="mini" type="textarea" v-model="wxdjForm.sgfyj"></el-input>
              </el-form-item> -->
              <el-form-item class=" addJLD_long" label="备注" prop="bz">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="wxdjForm.bz"></el-input>
              </el-form-item>
               <el-form-item class=" addJLD_long" label="附件">
                <p class="up">
              <el-upload
               v-if="!showxq&&isadd"
                class="upload-demo"
                action="http://61.141.223.10:8001/common/uploadFile"
                multiple
                show-file-list
                :file-list="fileList"
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
             <el-form-item> 
              <div class="dialog_footer" v-if="!showxq">
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun"   @click="addSubmit_wxdj('wxdj_lmshForm')">保存</el-button>
 
          <el-button size="small" @click="resetForm('wxdj_lmshForm')"  class="dialog-button qu_xiao" style="margin-right: 20px">取消</el-button>
        </div>
             </el-form-item>
            </el-form>
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
<DialogZc   v-if="showZc"
            :dialogTableTitZc="dialogTableTitZc"
            :btZc="'资产选择'"
            :bmbm="userInfo.daBmbm"
            :dwbm="userInfo.daZzbh"
            :dialogVisibleZc="dialogVisibleZc"
            @closeDialogZc="closeDialogZc"></DialogZc>
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
import DialogZc from './dialogZc.vue' 
import DialogWl from './dialogWl.vue' 
export default {
  components: {Dialog,DialogZc,DialogWl},
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
      typrry:'',
      
      dialogTableTitZc:{ zcmc:'资产名称',zcbm:'资产编码',ggxh:'规格型号',zzmc:'组织名称',cfwz:'存放位置'},
      datatypesZc:'zc',
      dialogVisibleZc:false,
      typeZc:'',
      dialogTableTitWl:{ bjmc:'资产名称',bjbh:'资产编码',ggxh:'规格型号',jldw:'计量单位',kcsl:'库存数量'},
      datatypesWl:'zc',
      showWl:false,
      dialogVisibleWl:false,
      typeWl:'',
      fullscreenLoading: false,
       totals:0,
       showZc:false,
      rules:{
          sbmc: [
            { required: true, message: '设备名称不能为空',trigger: 'blur'},
            { min: 1, message: '请选择设备'}
          ],
          gzlx: [
            { required: true, message: '故障系统不能为空', trigger: 'blur' },
            { min: 1, message: '请选择故障系统', trigger: 'blur' }
          ],
          gzdj: [
            { required: true, message: '故障等级不能为空', trigger: 'blur' },
            { min: 1, message: '请选择故障等级', trigger: 'blur' }
          ],
          bzrq: [
            { required: true, message: '报障日期不能为空', trigger: 'blur' },
            { min: 1, message: '请选择故障日期', trigger: 'blur' }
          ],
          gzms: [
            { required: true, message: '故障描述不能为空', trigger: 'blur' },
            { min: 1, message: '请填写故障描述', trigger: 'blur' }
          ],
        },
      rules_ly:{
        xyr: [
            { required: true, message: '需用人不能为空',trigger: 'blur'},
            { min: 1, message: '请选择需用人',trigger: 'blur'}
          ],  

      },
       wxdj:{
       
          fzr: [
            { required: true, message: '施工方负责人不能为空',trigger: 'blur'},
            { min: 1, message: '请填写施工方负责人'}
          ], 
          xcqkms: [
            { required: true, message: '现场情况描述不能为空',trigger: 'blur'},
            { min: 1, message: '请填写现场情况描述'}
          ], 
          wxjgms: [
            { required: true, message: '维修结果描述不能为空',trigger: 'blur'},
            { min: 1, message: '请填写维修结果描述'}
          ], 
           xcwxr: [
            { required: true, message: '现场维修人不能为空', trigger: 'blur' },
            { min: 1, message: '请选择现场维修人', trigger: 'blur' }
          ],
          qrr: [
            { required: true, message: '指定验收人不能为空',trigger: 'blur'},
            { min: 1, message: '请选择指定验收人'}
          ], 
          wxrq:[
            { required: true, message: '维修日期不能为空',trigger: 'blur'},
            { min: 1, message: '请选择维修日期'}
          ], 
      },
      lmshForm: {
        sbmc:'',
        sbbm:'',
        ggxh:'',
        gzlx:'',
        gzdj: '三级故障',
        tbr:'',
        tbdw:'',
        tbbm:'',
        bgr:'',
        tbsj:'',
        xcfx: '上行',
        bxfs: '自修',
        isly: '否',
        isww: '否',
      },
      lysqForm: {
        mx: [{}]
      },
      
      wxdjForm:{
        qrr:'',
        tbr:'',
        tbdw:'',
        tbbm:'',
        bgr:'',
        tbsj:'',
        bxfs: '',
        isly: '',
        isww: '',
      },
      showXzysr:false,
      showXzTx:false,
      showRy_xc:false,
       multipleRy_xc:[],  
       rytreeList_xc:[],
       xzry_xc:{},
       ryList_xc:[],
       ryPage_xc: 1,
       rySize_xc: 10,
       rytotal_xc:10,
       ckOptions:'',
      defaultRy_xc:{
          children: 'children',
          label: 'text'
        },
       showZb:true,
       wxdj_show:false,
      index: '',
      showSbb: false,
      isadd: false,
      addzb: true,
      submitLoading: false,
      showxq: false,
      showww: true,
      showSearch: false,
      showLsb: true,
      loading: false,
      tableHeight: 300,
      tableData: [],
      showBhForm: false,
      searchCriteria: false,
      roadOptions: [],
      qmbbOptions1: [],
      bjList: '',
      userData:'',
      searchForm: {},
      total: 0,
      sbmc: {
        sbmc: ''
      },
      lyjcindex: 0,
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      multipleSelection: [],
      selectRow: [],
       options4: [],
        value9: '',
        list: [],
        loading: false,
      dataList:[],
      fileList:[],
      tbdwList:[],
      selectDw:'',
      xz:{zcbm:'',zcmc:''},
      zcList:[],
      multipleXz:[],
      zcPage: 1,
      zcSize: 10,
      zctotal:10,
      eidtlysq:false,
      showXzsb:false,
      defaultProps:{
          children: 'children',
          label: 'text'
        },
      deleArr:'',
      zkx:'',
      treedata: [],
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
        defaultTree: {
          children: 'children',
          label: 'text'
        },
      xz0:{zcbm:'',zcmc:''},
      zcList0:[],
      multipleXz0:[],
      zcPage0: 1,
      zcSize0: 10,
      zctotal0:10,
      showXzsb0:false,
      deleArr0:'',
      treedata0: [],
        defaultTree0: {
          children: 'children',
          label: 'text'
        },

      treeList1:[],
       xz1:{zcbm:'',zcmc:'',bmbm:''},
      zcList1:[],
      ysrList1:[],
      zcPage1: 1,
      zcSize1: 10,
      zctotal1:10,
      showXzsb1:false,
      iszd1:false,
      deptCode:'',
      defaultP1:{
          children: 'children',
          label: 'text'
        },
        multipleXz1:[],
      showSbfzr:false,
      fullscreenLoading:false,
      showRy:false,
       multipleRy:[],  
       rytreeList:[],
       xzry:{},
       ryList:[],
       ryPage: 1,
       rySize: 10,
       rytotal:10,
      defaultRy:{
          children: 'children',
          label: 'text'
        },
      isRouterAlive:true,
      isdx:false,
      txArr:[],
      
    }
  },
 async created(){
   this.initUser()
 
 
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
    checkboxInit(row,index){
　　if (row.spzt!='3501')//这个判断根据你的情况而定
　　　　return 0;//不可勾选
　　else
　　　　return 1;//可勾选
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
      showDialogs(type){
        this.typrry=type
     this.dialogVisibles = true
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
            case 'sbfzr':{
              this.lmshForm.sbfzr=val.userName
              break;}
            case 'xcwxr':{
              this.wxdjForm.xcwxr=val.userName
              break;}
            case 'zdysr':{
              this.txArr=[]
              this.wxdjForm.qrr=val.userName
              this.wxdjForm.ysrcode=val.userCode
              let obj={
               ysr:val.userName,
               ysryj:'',
               ysrcode:val.userCode,
               yszt:'未通过',
               yssj:'',
               ysbxdh:this.lmshForm.djbh
            }
            this.txArr.push(obj)
              this.
              break;}
            default:
              break;
          }
            
          }
      },
      showDialogZc(type){
        this.typeZc=type
        this.showZc=true
     this.dialogVisibleZc = true
      
      },
      closeDialogZc(val){
        console.log(val)
        this.dialogVisibleZc= false
        this.showZc=false
        if(val==undefined || val=='undefined'){
          return
        }
        this.lmshForm.sbmc=val.zcmc
        this.lmshForm.sbbm=val.zcbm
        this.lmshForm.ggxh=val.ggxh
        this.lmshForm.jldw=val.jldw
        this.lmshForm.bjlxpk=val.bjlxpk
        this.lmshForm.gzlx=val.ssxt
        this.lmshForm.sbfzr=val.sbfzr
        this.lmshForm.zcpk=val.zcpk
        this.lmshForm.orgpk=val.orgpk
        console.log(this.lmshForm)
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
      if( this.lysqForm.mx.length==0){
           this.lysqForm.mx= [{}]
       } 
      },
    qklx(){
      this.lysqForm.mx=[{}]
    },
    sigClic (row){
  if(row.spzt=='3501'){
    console.log(1)
this.$refs.multipleTable.toggleRowSelection(row)}

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
     saveXMInfo(formName){
        
      },
    clickRow(row){
      //资产
      if(this.isdx){
this.$refs.Table.toggleRowSelection(row)
      }else{
this.$refs.Table.clearSelection(row)
      this.$refs.Table.toggleRowSelection(row)
      }
       
    },
    clickRow1(row){
      //资产
      this.$refs.Table1.clearSelection()
      this.$refs.Table1.toggleRowSelection(row)
    },
    clickRow2(row){
      //资产
 
      this.$refs.Table0.toggleRowSelection(row)
    },
    showAdd () {
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      this.formId = 'gzbx' + new Date().getTime()
      this.lmshForm.djbh = this.formId

      this.lmshForm.bgr =this.userInfo.daYhmc
      this.lmshForm.bzrq= this.formatDate(new Date())
      this.lmshForm.tbsjc= new Date().getTime()
      this.lmshForm.tbdw = this.userInfo.daZzmc
      this.lmshForm.tbr = this.userInfo.daYhmc
      this.lysqForm.xyr = this.userInfo.daYhmc
      this.lysqForm.tbsjc= new Date().getTime()
      this.lmshForm.tbbm =  this.userInfo.daBmmc
      this.fileList=[]
      // }
      this.lmshForm.tbsj=this.formatDate(new Date())
      this.lmshForm.bzrq=this.formatDate(new Date())
    },
 
    updateFormDia (row, index) {
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      if(row.bxfs==='自修'){
      this.showLsb=true
      this.showww=true
      }else{
      this.showLsb=false
      this.showww=false
      }
      if(row.isly==='是'){
        this.$api.getLysqInfoByGZDjbh('?djbh='+row.djbh).then(res=>{
          if(res.data.code==1){
            this.showSbb=true
            if(res.data.data.length>0){
            this.lysqForm=res.data.data[0]
            this.eidtlysq=true
            }else{
            this.eidtlysq=false
              this.$message({
            message: '出错了',
            type: 'error'
          })
          return
            }
          }
        }).catch(e=>{

        })
      1
        
      }else{
        this.eidtlysq=false
        this.showSbb=false
      }

      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.$api.getFilesDataById('?id='+this.lmshForm.djbh).then(res=>{
       if(res.data.code==1){
         this.fileList=res.data.data
         for (let index = 0; index < this.fileList.length; index++) {
           this.fileList[index].name = this.fileList[index].file_yname
         }
         this.dataList=this.fileList
       }
     }).catch(er=>{
     })
      this.value9=this.lmshForm.sbmc
      this.index = index
      this.sbmc = {
        sbmc: row.sbmc
      }
    },
    showBhFormDia (row) {
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.$api.getFilesDataById('?id='+this.lmshForm.djbh).then(res=>{
       if(res.data.code==1){
         this.fileList=res.data.data
       }
     }).catch(er=>{
     })
      this.value9=this.lmshForm.sbmc
      if (this.lmshForm.bxfs=='自修') {
          this.showww=true
          this.showLsb=true
      }else {
          this.showLsb=false
          this.showww=false
      }
      if (this.lmshForm.isly=='是') {
        this.$api.getLysqInfoByGZDjbh('?djbh=' + this.lmshForm.djbh ).then(resp => {
 
        if (resp.data.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
       this.lysqForm=resp.data.data[0]
        }
      }).catch(e => {
      })
          this.showSbb=true
      }else {
          this.showSbb=false
      }
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
      this.value9=this.lmshForm.sbmc
      if (this.lmshForm.bxfs=='自修') {
          this.showww=true
          this.showLsb=true
      }else {
          this.showLsb=false
          this.showww=false
      }
      if (this.lmshForm.isly=='是') {
        this.$api.getLysqInfoByGZDjbh('?djbh=' + this.lmshForm.djbh ).then(resp => {
 
        if (resp.data.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
       this.lysqForm=resp.data.data[0]
        }
      }).catch(e => {
      })
          this.showSbb=true
      }else {
          this.showSbb=false
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
      this.$api.jdwhxjwxgetGzbxList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
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
 
 
    addSubmit_wxdj(){
      this.showDetail = false
this.$refs['wxdj_lmshForm'].validate((valid) => {
          if (valid) {
            if(this.dataList.length>0){
      for (let index = 0; index < this.dataList.length; index++) {
        this.dataList[index].file_id=this.wxdjForm.djbh
      }
       let fileDatas=this.dataList
       this.$api.addFileData(fileDatas).then(res=>{
         if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.dataList=[]
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
       })
      }
      this.wxdjForm.ysrcode+=','+this.wxdjForm.txqrrcode
      this.wxdjForm.mx=[]
       this.wxdjForm.tbdwdm=this.userInfo.daZzbh
      this.wxdjForm.tbbmdm=this.userInfo.daBmbm
      this.$api.jdwhxjwxaddWxdj(this.wxdjForm).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '维修登记成功!'
          })
      this.wxdjForm.yslist=this.txArr
     this.$api.jdwhxjwxaddWxys(this.wxdjForm).then(res => {
        if (res.data.code === 1) {
          this.search(this.currentPage, this.pageSize)
          this.resetForm()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
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
            return false;
          }
        });
    },
    addSubmit (formName) {
       this.showDetail = false
      this.lmshForm.spzt='3501'
       this.$refs[formName].validate((valid) => {
          if (valid) {
        this.lmshForm.id = this.formId
      if(this.dataList.length>0){
      for (let index = 0; index < this.dataList.length; index++) {
        this.dataList[index].file_id=this.lmshForm.id
      }
       let fileDatas=this.dataList
       this.$api.addFileData(fileDatas).then(res=>{
         if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.dataList=[]
          this.resetForm()
          this.search(this.currentPage, this.pageSize)
          
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
       })
      }
      this.lmshForm.tbdwdm=this.userInfo.daZzbh
      this.lmshForm.tbbmdm=this.userInfo.daBmbm
      if(this.lmshForm.bxfs== '上报'){
        
          this.lmshForm.fpry= ''
          this.lmshForm.fpzt='未分配'
          this.lmshForm.spzt='3501'
          console.log(this.lmshForm)
 
          this.$api.jdwhxjwxaddGzbx(this.lmshForm).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.resetForm()
          this.search(this.currentPage, this.pageSize)
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
      }
      if(this.lmshForm.bxfs== '自修'){
         this.lmshForm.fpry=  this.userInfo.daYhmc
          this.lmshForm.fpzt='已分配'
          
          if(this.lmshForm.isww=='是'){
            this.lmshForm.spzt='3501'
            console.log(this.lmshForm)
   
          this.$api.jdwhxjwxaddGzbx(this.lmshForm).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.resetForm()
          this.search(this.currentPage, this.pageSize)
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
          }
          if(this.lmshForm.isww=='否' && this.lmshForm.isly=='是'){
            this.lmshForm.spzt='3501'
            this.$api.jdwhxjwxaddGzbx(this.lmshForm).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.resetForm()
          this.search(this.currentPage, this.pageSize)
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
          }
          if(this.lmshForm.isww=='否' && this.lmshForm.isly=='否'){
            this.lmshForm.spzt='3503'
            console.log(this.lmshForm)
 
            this.$api.jdwhxjwxaddGzbx(this.lmshForm).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          var lmshForm=this.lmshForm
           this.resetForm()
          this.search(this.currentPage, this.pageSize)
          //是否维修登记
          this.$confirm('是否要进行维修登记！', '', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
          center: true
        }).then(() => {
          //维修登记页面
          this.wxdj_show = true
            this.wxdjForm.djbh = 'wxdj' + new Date().getTime()
            this.wxdjForm.bxdh =  lmshForm.djbh
            this.wxdjForm.sbmc =  lmshForm.sbmc
            this.wxdjForm.ggxh =  lmshForm.ggxh
            this.wxdjForm.bzrq =  lmshForm.bzrq
            this.wxdjForm.wxrq =  this.formatDate(new Date())
            this.wxdjForm.bgr =   lmshForm.tbr
            this.wxdjForm.tbrq = this.formatDate(new Date())
            this.wxdjForm.xcwxr= this.userInfo.daYhmc
            this.wxdjForm.gzms = lmshForm.gzms
            this.wxdjForm.tbsjc= new Date().getTime()
            this.wxdjForm.isww = lmshForm.isww
            this.wxdjForm.qrr=''
            this.wxdjForm.ysrcode=''
            this.wxdjForm.txqrr=''
            this.wxdjForm.txqrrcode=''
            this.wxdjForm.tbdw = this.userInfo.daZzmc
            this.wxdjForm.tbr = this.userInfo.daYhmc
            this.fileList=[]
            // this.wxdjForm.qrr = this.userInfo.daYhmc
            // this.wxdjForm.ysrcode= this.userInfo.daYhbm 
            this.wxdjForm.tbbm =  this.userInfo.daBmmc
            this.wxdjForm.tbdwdm=this.userInfo.daZzbh
            this.wxdjForm.tbbmdm=this.userInfo.daBmbm
            this.wxdjForm.tbsj = this.formatDate(new Date())
            this.wxdj_show = true
         
        }).catch(() => {
        })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
          }
      }
    
 
          } else {
            return false;
          }
        });
      
    },
   
 
    addSubmitPlus (formName) {
       this.showDetail = false
      this.lmshForm.spzt='3501'
      this.lysqForm.spzt='3501'
      this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log(this.lysqForm)
       this.$refs['lysqForm'].validate((valid) => {
          if (valid) {
       this.lmshForm.tbdwdm=this.userInfo.daZzbh
      this.lmshForm.tbbmdm=this.userInfo.daBmbm
      this.lmshForm.id = this.formId
      if(this.dataList.length>0){
      for (let index = 0; index < this.dataList.length; index++) {
        this.dataList[index].file_id=this.lmshForm.id   
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
      this.lysqForm.tbr=this.lmshForm.tbr
      this.lysqForm.tbsj=this.lmshForm.tbsj
      this.lysqForm.tbdw=this.lmshForm.tbdw
      this.lysqForm.tbbm=this.lmshForm.tbbm
      this.lysqForm.tbsjc=new Date().getTime()
      this.lysqForm.tbdwdm=this.lmshForm.tbdwdm
      this.lysqForm.tbbmdm=this.lmshForm.tbbmdm
     
      this.lmshForm.id = this.formId
      if(this.lmshForm.isww=="否"){
        if(this.lmshForm.bxfs=='自修'){
          this.lmshForm.fpry=this.userInfo.daYhmc
          this.lmshForm.fpzt='已分配'
        } 
      }else if(this.lmshForm.isww=="是"){
        this.lmshForm.fpry= this.userInfo.daYhmc
        this.lmshForm.fpzt='已分配'
 
      }
      //  if(this.deptCode.length<=5){
      //    this.lmshForm.tyzt='已同意'
      //   this.lysqForm.tyzt='已同意'
      // }
      this.$api.jdwhxjwxaddGzbx(this.lmshForm).then(res => {
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
       this.$api.jdwhbjgladdLysq(this.lysqForm).then(res => {
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
      })}else {
            return false;
          }
        });
          } else {
            return false;
          }
        });
      
    },
    updateSubmit (formName) {
     this.$refs[formName].validate((valid) => {
          if (valid) {
           if(this.dataList.length>0){
      for (let index = 0; index < this.dataList.length; index++) {
        this.dataList[index].file_id=this.lmshForm.djbh
      }
      
       let fileDatas=this.dataList
      if(this.deleArr){
        this.$api.deleteById('?ids='+this.deleArr).then(resp=>{
        if(resp.data.code==1){
          this.deleArr=''
          this.$api.addFileData(fileDatas).then(res=>{
         if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '附件修改成功!'
          })
          this.dataList=[]
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
       })
        }else{
          this.$message({
            type: 'error',
            message: resp.data.msg
          })
        }
       })
      }else{
       this.$api.addFileData(fileDatas).then(res=>{
         if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '附件修改成功!'
          })
          this.dataList=[]
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
       })
      }
    }
      this.$api.jdwhxjwxeditGzbx(this.lmshForm).then(res => {
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
      if(this.showSbb){
        if(this.lysqForm.pzzt=='已批准'){
        this.$message({
            type: 'error',
            message: '领用申请单已批准不能修改'
          })
        }else{
          if(this.eidtlysq){
          
          this.$api.jdwhbjgleditLysq(this.lysqForm).then(res => {
        if (res.data.code === 1) {
          this.search(this.currentPage, this.pageSize)
          this.resetForm()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
          }else{
           this.lysqForm.tbr=this.lmshForm.tbr
          this.lysqForm.tbsj=this.lmshForm.tbsj
          this.lysqForm.tbsjc=new Date().getTime()
           this.lysqForm.tbdw=this.lmshForm.tbdw
           this.lysqForm.tbbm=this.lmshForm.tbbm
          this.lysqForm.tbdwdm=this.lmshForm.tbdwdm
           this.lysqForm.tbbmdm=this.lmshForm.tbbmdm
            if(this.lysqForm.tbbmdm==='YTW06'){
        this.lysqForm.tyzt='已同意'
      }
      this.$api.jdwhbjgladdLysq(this.lysqForm).then(res => {
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
          }
          
        }
        

      }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
     
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
          this.$api.jdwhxjwxdelGzbxByDjbhs('?djbhs=' + djbharr).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
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
 
    upload (response, file, fileList) {
      this.dataList=[]
      for (let index = 0; index < fileList.length; index++) {
        if(fileList[index].response){
          this.dataList.push(fileList[index].response.data)
        }else{
          this.dataList.push(fileList[index])
        }
      }
      console.log(this.dataList)
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
    daochu () {
    },
    rowClass({ row, rowIndex }) {
      if (this.selectRow.includes(row.id)) {
        return { "background-color": "rgba(185, 221, 249, 0.75)" };
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    selectBX (value) {
      console.log(value)
      if (value=='自修') {
          this.showLsb=true
          this.showww=true
          this.lmshForm.fpzt='已分配'
      }else {
          this.showww=false
          this.showLsb=false
          this.showSbb=false
          this.lmshForm.isww='否'
          this.lmshForm.isly='否'
      }
    },
    selectisLy (value) {
      if (value=='是') {
          this.showSbb=true
          this.lysqForm.wxdh=this.lmshForm.djbh
          this.formId = 'lysq' + new Date().getTime()
          this.lysqForm.djbh = this.formId
      }else {
          this.showSbb=false
      }
    },
    selectBj (value) {
      this.lysqForm.mx[this.lyjcindex].bjbm = value.bjbm
      this.lysqForm.mx[this.lyjcindex].jldw = value.jldw
      this.lysqForm.mx[this.lyjcindex].cksl = value.cksl
      this.lysqForm.mx[this.lyjcindex].ggxh = value.ggxh
      this.lysqForm.mx[this.lyjcindex].kcsl = value.kcsl
      this.lysqForm.mx[this.lyjcindex].bjmc = value.bjmc
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
    resetForm (res) {
      this.wxdj_show=false
      this.showZb=true
      this.loading=false
     if(res!==undefined && res.target==undefined){
     if(this.$refs[res] != undefined){
        this.$refs[res].resetFields();
        }
      }
      this.showxq=false
      this.showDetail = false
      this.showXzsb=false
      this.showXzsb0=false
      this.showLsb = true
      this.showSbb = false
      this.value9= ''
      this.showww=true
      this.multipleXz=[]
      this.multipleXz0=[]
      this.wxdjForm={
        qrr:'',
        tbr:'',
        tbdw:'',
        tbbm:'',
        bgr:'',
        tbsj:'',
        bxfs: '',
        isly: '',
        isww: '',
      }
      this.lmshForm={
        sbmc:'',
        sbbm:'',
        ggxh:'',
        gzlx:'',
        gzdj: '三级故障',
        tbr:'',
        tbdw:'',
        tbbm:'',
        bgr:'',
        tbsj:'',
        xcfx: '上行',
        bxfs: '自修',
        isly: '否',
        isww: '否',
      },
      this.lysqForm = {
        mx: [{}]
      }
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
    selectSB (value) {
      this.lmshForm.ggxh = value.ggxh
      this.lmshForm.sbmc = value.sbmc
      this.lmshForm.sbbm = value.bjbm
      this.lmshForm.sbfzr = value.sbfzr
    },
    getQmldbb () {
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
      // this.searchSb0(1,10)
    
    },
 remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options4 = [];
        }
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
        console.log(bmbm)
        this.fullscreenLoading=true
        this.$api.getUserDept2('?dwbm=' +  code+'&bmbm='+ bmbm).then(resp => {
            this.fullscreenLoading=false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
        
           this.tbdwList= resp.data.data
           this.zkx=this.tbdwList[0].id
          this.searchForm.tbdwdm=this.userInfo.daZzbh
          this.searchForm.tbbmdm=this.userInfo.daBmbm
          this.search(this.currentPage, this.pageSize)
          
        }
      }).catch(e => {
        this.fullscreenLoading=false
      })
    },
 
 
    handleNodeClick(data){
      this.selectDw=data.text
      this.searchForm.tbdwdm=this.userInfo.daZzbh
      this.searchForm.tbbmdm=data.id
       $('.tbdw').hide(this.searchForm)
    },
     selectDwTree(){
      $('.tbdw').show()
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
 
 
  },
 
  mounted () {
 
     this.getTbdw(this.userInfo.daZzbh,this.userInfo.daBmbm)
    //  this.searchSb(1,10)
    this.getQmldbb()
    this.$api.jdwhxjwxgetSbInfo().then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
        this.list =resp.data.data.map(item => {
        return { value: item, label: item.sbmc };
      });
        }
      }).catch(e => {
      })
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
  #gzbx{
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    min-width: 1100px;
    overflow: auto;
    .zibiao_title{
      line-height: 36pxt;
    font-size: 16px;
    padding-left: 10px;
    color: black;
    font-weight: 700;
    }
    .cha_xun{
      min-height: 60px;
      padding-top: 10px;
      z-index: 999;
    }
    .conter_table{
      height: calc(100% - 97px);
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
		height:45px;
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
      padding: 20px 35px;
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
