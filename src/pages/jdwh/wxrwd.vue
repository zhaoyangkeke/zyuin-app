/**
* ----维修任务单
*/
<template>
  <div id="wxrwd" class="styleSheets" style="height: 100%" v-loading.fullscreen.lock="fullscreenLoading"  v-if="isRouterAlive">
    <div class="bill-header">
      <div class="bill-title">
        <span>维修任务单</span>
        <ul>
          <li ><i class="el-icon-search" @click="showAdd"> 维修登记</i></li>
          <!-- <li @click="wxys"><i class="el-icon-search"> 维修验收</i></li> -->
          <li @click="lysq" style="border-left:none"><i class="el-icon-search"> 备件领用</i></li>
          <li @click="fjrk" style="border-left:none"><i class="el-icon-search"> 废件入库</i></li>
          <li @click="wxfy"><i class="el-icon-search"> 维修费用结算</i></li>
        </ul>
      </div>
      <div class="bill-search" style="">
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
             <el-select clearable size="mini" style="width: 148px;" v-model="searchForm.gzdj" value-key="mjbm" placeholder="请选择故障等级">
                <el-option value="一级故障"></el-option>
                <el-option value="二级故障"></el-option>
                <el-option value="三级故障"></el-option>
              </el-select>
            </el-form-item>
          <!-- <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-tree :accordion="true" :data="ysrList" :props="defaultP" @node-click="handleNodeClick"></el-tree>
          </el-form-item> -->
          <!-- <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class=""  prop="lxbh">
             <el-select clearable v-model="searchForm.djzt" size="mini" placeholder="请选择登记状态">
                <el-option label="未登记" value="未登记"></el-option>
                <el-option label="已登记" value="已登记"></el-option>
             </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" prop="lxbh">
             <el-select clearable v-model="searchForm.yszt" size="mini" placeholder="请选择验收状态">
                <el-option label="未验收" value="未验收"></el-option>
                <el-option label="已验收" value="已验收"></el-option>
             </el-select>
            </el-form-item>
          </el-form-item> -->
          <el-form-item style="margin-bottom: 0px" prop="" class="">
            <el-date-picker
              clearable
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
      <div  class="searchLeft" >
        <div >
          <em>当前状态:</em>
          <span class="currentState" @click="handleHtState(state.val,index)"
                :id="searchForm.stateIndex==index?'selectColor2':''"
                v-for="(state,index) in djState" :key="index">{{state.name}}</span>
      
        </div>
        <!-- <div class="htTypeList">
          <em>合同类型:</em>
          <span class="currentState" @click="handleHtType(type.val,index)" :id="searchForm.typeIndex==index?'selectColor':''" v-for="(type,index) in httype" :key="index">{{type.name}}</span>
        </div> -->
      </div>
      <el-table   ref="multipleTable" :data="tableData" tooltip-effect="dark"
                style="width: 100%;height: calc(100% - 46px)!important;overflow:auto;"
                border
                :row-class-name="tableRowClassName"
                @row-click="clickRow_wxrwd"
                 :row-style="rowClass"
                v-loading="loading"
               @row-dblclick="dbclick"
                @selection-change="handleSelectionChange">
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="40">
        </el-table-column>
        <el-table-column sortable align="left" prop="djzt" width="100" label="登记状态" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="yszt" width="100" label="验收状态" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="center" class-name="column-caoz" label="备件状态" width="100">
          <template scope="scope">
            <span v-if="scope.row.isly=='是'">{{scope.row.bjzt}}</span>
            <span v-if="scope.row.isly!='是'">否</span>
          </template>
        </el-table-column>
         <el-table-column sortable align="left" prop="isww" width="100" label="是否委外" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="gzlx" label="故障系统" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="sbmc" label="设备名称" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" width="100"  prop="gzdj" label="故障等级" ></el-table-column>
        <el-table-column sortable align="left" prop="bzrq" width="100" label="报障日期"></el-table-column>
        <!-- <el-table-column  sortable align="left" prop="bgr" label="报告人" show-overflow-tooltip></el-table-column> -->
         <el-table-column  sortable align="left" prop="tbbm" label="报障部门" show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="tbdw" label="报障单位"></el-table-column>
        <el-table-column sortable align="left" prop="sbfzr" label="设备负责人" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="gzms" label="故障描述" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="100">
          <template scope="scope">
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
    
    <el-dialog fullscreen class="data-dialog el-updata-div"  :visible.sync="showwxrwd" width="580px" >
      <span slot="title">
          <span class="titleclasschild"  @click="resetForm"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>维修任务单</span>
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
      <el-form v-if="!showxq"  :model="lmshForm" ref="lmshForm" label-width="100px" class="demo-lmshForm">
              <el-form-item  class=" addJLD"  label="单据编号" prop="djbh">
               <span class="edit_text">{{lmshForm.djbh}}</span>
              </el-form-item>
              <el-form-item class=" addJLD"  label="故障系统" prop="gzlx">
                <el-input disabled size="mini"  v-model="lmshForm.gzlx"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD" label="设备名称" prop="sbmc" >
                <el-input size="mini"  v-model="lmshForm.sbmc"></el-input>
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
              <el-form-item  v-if="showxq" class=" addJLD" label="填报部门" prop="tbbm">
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
    <el-dialog fullscreen class="data-dialog el-updata-div" :show-close="false"   :close-on-click-modal="false" :visible.sync="showDetail" width="580px">
      <span slot="title">
          <span class="titleclasschild"  @click="resetForm('wxdj_lmshForm')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>维修登记</span>
      </span>
      <el-form :rules="wxdj"  :model="lmshForm" ref="wxdj_lmshForm" label-width="100px" class="demo-lmshForm">
              <el-form-item class=" addJLD"  label="报修单号" prop="bxdh">
              <span class="edit_text">{{lmshForm.bxdh}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="设备名称" prop="sbmc" >
               <span class="edit_text">{{lmshForm.sbmc}}</span>
              </el-form-item>
              <el-form-item disabled class=" addJLD" label="规格型号" prop="ggxh">
                <span class="edit_text">{{lmshForm.ggxh}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="报障日期" prop="bzrq">
              <span class="edit_text">{{lmshForm.bzrq}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="报告人" prop="bgr">
               <span class="edit_text">{{lmshForm.bgr}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="维修日期" prop="wxrq">
                <el-date-picker
                v-model="lmshForm.wxrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
              </el-form-item>
              <el-form-item class=" addJLD" label="现场维修人" prop="xcwxr">
                <el-input size="mini"  v-model="lmshForm.xcwxr" @focus="showDialog('xcwxr')"></el-input>
              </el-form-item>
              <el-form-item v-if="lmshForm.isww==='是'" class=" addJLD" label="立项审批号" prop="lxsph">
               <el-input size="mini" type="text" v-model="lmshForm.lxsph" placeholder="请选择立项审批号" @focus="showDialogSp('lx')"></el-input>
              </el-form-item>
              <el-form-item v-if="lmshForm.isww==='是'" class=" addJLD" label="施工方负责人" prop="fzr">
               <el-input size="mini" type="text" v-model="lmshForm.fzr"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD" label="指定验收人" prop="qrr">
               <el-input size="mini" type="text" v-model="lmshForm.qrr" @focus="showDialog('zdysr')"></el-input>
              </el-form-item>
              <el-form-item v-if="lmshForm.isww==='是'" class=" addJLD" label="同行验收人" prop="gzms">
                <el-input size="mini" type="text" v-model="lmshForm.txqrr" @focus="showDialogs"></el-input>
              </el-form-item>
              
              <el-form-item class=" addJLD_long" label="现场情况描述" prop="xcqkms">
                 <el-input size="mini" type="textarea" v-model="lmshForm.xcqkms"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="维修结果描述" prop="wxjgms">
                 <el-input size="mini" type="textarea" v-model="lmshForm.wxjgms"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="故障描述" prop="gzms">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lmshForm.gzms"></el-input>
              </el-form-item>
              <el-form-item v-if="lmshForm.isww==='是'" class=" addJLD_long" label="委外主要工作内容" prop="wwzygznr">
                 <el-input size="mini" type="textarea" v-model="lmshForm.wwzygznr"></el-input>
              </el-form-item>
              <el-form-item v-if="lmshForm.isww==='是'" class=" addJLD_long" label="施工方意见" prop="sgfyj">
                 <el-input size="mini" type="textarea" v-model="lmshForm.sgfyj"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="备注" prop="bz">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lmshForm.bz"></el-input>
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
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun"   @click="addSubmit">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary"  class="dialog-button bao_cun"  @click="updateSubmit">保存</el-button>
          <el-button size="small" @click="resetForm('wxdj_lmshForm')"  class="dialog-button qu_xiao" style="margin-right: 20px">取消</el-button>
        </div>
             </el-form-item>
            </el-form>
    </el-dialog>
    <el-dialog fullscreen class="data-dialog el-updata-div"    :visible.sync="showDetail2" width="580px"  :show-close="false">
      <span slot="title">
          <span class="titleclasschild"  @click="resetForm('lysqForm')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>领用申请</span>
      </span>
      <el-form :model="lysqForm" :rules="rules_ly" ref="lysqForm" label-width="100px" class="demo-lmshForm">
                  <!-- <el-form-item class=" addJLD" label="单据编号" prop="djbh">
               <span class="edit_text">{{lysqForm.djbh}}</span>
              </el-form-item> -->
              <el-form-item class=" addJLD" label="维修单号" prop="wxdh">
               <span class="edit_text">{{lysqForm.wxdh}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="需用人"  prop="xyr">
                <el-input size="mini"  v-model="lysqForm.xyr" @focus="showDialog('xyr')"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="领用说明" prop="lysm">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lysqForm.lysm"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="备注" prop="bz">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lysqForm.bz"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="附件" >
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
              <div class="group-form-name hide-form-item"><div class="operator"  @click="showZb=!showZb"><span class="name">设备清单</span><a :class="showZb?'el-icon-minus':'el-icon-plus'" href="javascript:;"   style="color: #999;font-size:12px;text-decoration: none;font-weight:900"></a></div><span class="line"></span></div>
            <div class="dialog_warps" v-if="showZb">
             <div class="zibnr"  style="overflow-x: auto;overflow-y: hidden;">
                <div class="iconwarp" style="text-algin:right; ">
             <el-button size="small" type="primary"  class="dialog-button bao_cun" style=" " @click="addzibiao">增行</el-button>
          </div>
          <ul class="lyzibiao">
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
  
                <el-input  size="mini" type="text" v-model="item.bjmc" @focus="showDialogWl('wl')" placeholder="请选择"></el-input>
              </p>
              <p>
                <el-input disabled size="mini" type="text" v-model="item.bjbm"></el-input>
              </p>
              <p>
                <el-input disabled size="mini" type="text" v-model="item.ggxh"></el-input>
              </p>
              <p>
                <el-input disabled size="mini" type="text" v-model="item.jldw"></el-input>
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
        <div class="dialog_footer">
          <el-button size="small" type="primary"  class="dialog-button bao_cun"  :loading="submitLoading" @click="addlysq">保存</el-button>
          <el-button size="small" @click="resetForm('lysqForm')"   class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
                </el-form>
    </el-dialog>
    <el-dialog fullscreen class="data-dialog el-updata-div"   :visible.sync="showDetail3" width="580px" :show-close="false">
      <span slot="title">
          <span class="titleclasschild"  @click="resetForm('fjrkForm')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>废件入库</span>
      </span>
 
      <el-form :model="fjrkForm" :rules="fjrkrules" ref="fjrkForm" label-width="100px" class="demo-lmshForm">
                  <!-- <el-form-item class=" addJLD" label="单据编号" prop="djbh">
               <span class="edit_text">{{fjrkForm.djbh}}</span>
              </el-form-item> -->
              <el-form-item class=" addJLD" label="维修单号" prop="wxdh">
             <span class="edit_text">{{fjrkForm.wxdh}}</span>
              </el-form-item>
               <el-form-item class=" addJLD" label="业务期间" prop="ywqj">
               <el-date-picker
              v-model="fjrkForm.ywqj"
              size="mini"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
              </el-form-item>     
             <el-form-item class=" addJLD" label="退库人" prop="tkr">
                <el-input size="mini"  v-model="fjrkForm.tkr" @focus="showDialog('tkr')"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD" label="仓库名称" prop="ckmc">
                <el-select clearable size="mini" style="width: 148px;" v-model="fjrkForm.ckmc" placeholder="请选择仓库">
              <el-option v-for="(item,index) in ckOptions" :key="index" :label="item.ssck" :value="item.ssck"></el-option>
            </el-select>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="退库说明" prop="tksm">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="fjrkForm.tksm"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="备注" prop="bz">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="fjrkForm.bz"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="附件" >
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
                 <div class="group-form-name hide-form-item"><div class="operator"  @click="showZb=!showZb"><span class="name">设备清单</span><a :class="showZb?'el-icon-minus':'el-icon-plus'" href="javascript:;"   style="color: #999;font-size:12px;text-decoration: none;font-weight:900"></a></div><span class="line"></span></div>
              <div class="dialog_warps" v-if="showZb">
             <!-- <div class="addzbsj">
        <i @click="addzb=!addzb" :class="addzb?'el-icon-remove-outline':'el-icon-circle-plus-outline'"></i>
      </div> -->
      <div class="zibnr" v-if="addzb" style="overflow-x: auto;overflow-y: hidden;">
        <div class="iconwarp">
          <el-button size="small" type="primary"  class="dialog-button bao_cun" style=" " @click="addzibiao_fj">增行</el-button>
        </div>
        <ul class="fjzibiao">
          <li>
             <span>操作</span><span>序号</span><span>备件名称</span><span>备件编码</span><span>规格型号</span><span>计量单位</span><span>退库数量</span><span>备件状态</span><span>备注</span>
            </li>
          <li v-for="(item, index) in fjrkForm.mx" :key="index">
            <p>
                <i class="el-icon-delete" title="删除" @click="deletezibiao_fj(index)"></i>
              </p>
            <p>
              <el-input size="mini" type="text" :value="index+1"></el-input>
            </p>
            <p>
              <el-input size="mini" type="text" v-model="item.bjmc" placeholder="请选择设备" @focus="showDialogWl('fj')"></el-input>
            </p>
            <p>
              <el-input   size="mini" type="text" v-model="item.bjbh"></el-input>
            </p>
            <p>
              <el-input   size="mini" type="text" v-model="item.ggxh"></el-input>
            </p>
            <p>
              <el-input   size="mini" type="text" v-model="item.jldw"></el-input>
            </p>
            <p>
              <el-input size="mini" type="text" v-model="item.tksl"></el-input>
            </p>
            <p>
              <el-input size="mini" type="text" v-model="item.bjzt"></el-input>
            </p>
            <p>
              <el-input size="mini" type="text" v-model="item.bz"></el-input>
            </p>
          </li>
          <div style="clear: both"></div>
        </ul>
      </div>
        </div>
        <div class="dialog_footer">
        <el-button size="small" type="primary"  class="dialog-button bao_cun"   :loading="submitLoading" @click="addfjrk">保存</el-button>
        <el-button size="small" @click="resetForm('fjrkForm')"   class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
      </div>
  </el-form>

  </el-dialog>
    <el-dialog fullscreen class="data-dialog el-updata-div"  :visible.sync="showDetail4" width="580px" :show-close="false">
      <span slot="title">
          <span class="titleclasschild"  @click="resetForm('wxfyForm')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>维修费用</span>
      </span>
      <el-form :model="wxfyForm" :rules="wxfyForms" ref="wxfyForm" label-width="100px" class="demo-lmshForm">
                  <!-- <el-form-item class=" addJLD" label="单据编号" prop="djbh">
              <span class="edit_text">{{wxfyForm.djbh}}</span>
              </el-form-item> -->
              <el-form-item class=" addJLD" label="维修单号" prop="wxdh">
               <span class="edit_text">{{wxfyForm.wxdh}}</span>
              </el-form-item>
             <el-form-item class=" addJLD" label="设备名称" prop="sbmc">
               <span class="edit_text">{{wxfyForm.sbmc}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="立项审批号" prop="lxsph">
                <span class="edit_text">{{wxfyForm.lxsph}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="结算金额(元)" prop="jsje">
                <el-input size="mini" type="text"  v-model="wxfyForm.jsje"></el-input>
              </el-form-item>
              
              <!-- <el-form-item class=" addJLD" label="所属合同" prop="ssht">
                <el-select clearable :disabled="showxq" size="mini" style="width: 148px;" v-model="wxfyForm.ssht" value-key="htbh" placeholder="请选择合同" @change="selectHts">
                <el-option v-for="(item,index) in htList" :key="index" :label="item.htmc" :value="item.htmc"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item class=" addJLD" label="对方单位" prop="dfdw">
                <el-select size="mini" type="text" v-model="wxfyForm.dfdw">
                <el-option v-for="(item,index) in dfdwOptions" :key="index" :label="item.dwmc" :value="item.dwmc"></el-option>
              </el-select>
              </el-form-item> -->
              <el-form-item class=" addJLD_long" label="费用说明" prop="fysm">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="wxfyForm.fysm"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="备注" prop="bz">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="wxfyForm.bz"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="附件" >
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
        <div class="dialog_footer">
          <el-button size="small" type="primary"  class="dialog-button bao_cun"  :loading="submitLoading" @click="addwxfy">保存</el-button>
          <el-button size="small" @click="resetForm('wxfyForm')"    class="dialog-button qu_xiao" style="margin-right: 20px">取消</el-button>
        </div>
  </el-form>
    </el-dialog>
  <el-dialog fullscreen class="data-dialog el-updata-div"  :visible.sync="wxdj_xq" width="580px" :show-close="false">
      <span slot="title">
          <span class="titleclasschild"  @click="resetForm()"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>维修登记</span>
      </span>
    <el-form    :model="lmshForm"   ref="wxdj_xq" label-width="100px" class="demo-lmshForm">
      <div class="showxq"  style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>单据编号: </span>
              <span>{{lmshForm.djbh}}</span>
            </p>
            <p   class=" addJLD"   >
              <span>报修单号: </span>
              <span>{{lmshForm.bxdh}}</span>
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
              <span>报障日期: </span>
              <span>{{lmshForm.bzrq}}</span>
            </p>
            <p   class=" addJLD">
              <span>报告人: </span>
              <span>{{lmshForm.bgr}}</span>
            </p>
            <p   class=" addJLD">
              <span>维修日期: </span>
              <span>{{lmshForm.wxrq}}</span>
            </p>
            <p   class=" addJLD">
              <span>现场维修人: </span>
              <span>{{lmshForm.xcwxr}}</span>
            </p> 
            <p  v-if="lmshForm.isww==='是'"  class=" addJLD">
              <span>立项审批号: </span>
              <span>{{lmshForm.lxsph}}</span>
            </p> 
            <p  v-if="lmshForm.isww==='是'"  class=" addJLD">
              <span>施工方负责人: </span>
              <span>{{lmshForm.fzr}}</span>
            </p> 
            <p   class=" addJLD">
              <span>指定验收人: </span>
              <span>{{lmshForm.qrr}}</span>
            </p>
            <p v-if="lmshForm.isww==='是'"  class=" addJLD">
              <span>同行验收人: </span>
              <span>{{lmshForm.txqrr}}</span>
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
              <span>现场情况描述: </span>
              <span>{{lmshForm.xcqkms}}</span>
            </p>
            <p   class=" addJLD_long">
              <span>维修结果描述: </span>
              <span>{{lmshForm.wxjgms}}</span>
            </p>
            
           
            <p v-if="lmshForm.isww==='是'"  class=" addJLD_long">
              <span>委外主要工作内容: </span>
              <span>{{lmshForm.wwzygznr}}</span>
            </p>
            <p v-if="lmshForm.isww==='是'"  class=" addJLD_long">
              <span>施工方意见: </span>
              <span>{{lmshForm.sgfyj}}</span>
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
      </el-form>
    </el-dialog>
  <el-dialog fullscreen class="data-dialog el-updata-div"  :visible.sync="lysq_xq" width="580px" :show-close="false">
      <span slot="title">
          <span class="titleclasschild"  @click="resetForm()"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>领用申请</span>
      </span>
     <el-form   :model="lmshForm"   ref="lmshForm" label-width="100px" class="demo-lmshForm">
      <div class="showxq"  style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>单据编号: </span>
              <span>{{lmshForm.djbh}}</span>
            </p>
            <p  class=" addJLD">
              <span>需用人: </span>
              <span>{{lmshForm.xyr}}</span>
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
              <span>领用说明: </span>
              <span>{{lmshForm.lysm}}</span>
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
            
             <el-table
    :data="lmshForm.mx"
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
    </el-dialog>
    <el-dialog fullscreen class="data-dialog el-updata-div"  :visible.sync="fjrk_xq" width="580px" :show-close="false">
      <span slot="title">
          <span class="titleclasschild"  @click="resetForm()"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>废件入库</span>
      </span>
    <el-form   :model="lmshForm"   ref="lmshForm" label-width="100px" class="demo-lmshForm">
      <div class="showxq"  style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>单据编号: </span>
              <span>{{lmshForm.djbh}}</span>
            </p>
            <p  class=" addJLD">
              <span>业务期间: </span>
              <span>{{lmshForm.ywqj}}</span>
            </p>
             <p   class=" addJLD">
              <span>维修单号: </span>
              <span>{{lmshForm.wxdh}}</span>
            </p>
            <p   class=" addJLD">
              <span>退库人: </span>
              <span>{{lmshForm.tkr}}</span>
            </p>
            <p   class=" addJLD">
              <span>仓库名称: </span>
              <span>{{lmshForm.ckmc}}</span>
            </p>
            
          
            <p   class=" addJLD_long">
              <span>退库说明: </span>
              <span>{{lmshForm.tksm}}</span>
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
            
             <el-table
    :data="lmshForm.mx"
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
      prop="bjbh"
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
      prop="tksl"
      label="退库数量">
    </el-table-column>
    <el-table-column
      prop="bjzt"
      label="备件状态">
    </el-table-column>
 
    <el-table-column
      prop="bz"
      label="备注">
    </el-table-column>
  </el-table>
      </div>
      </el-form>
    </el-dialog>
<el-dialog fullscreen class="data-dialog el-updata-div"  :visible.sync="wxfy_xq" width="580px" :show-close="false">
      <span slot="title">
          <span class="titleclasschild"  @click="resetForm()"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>维修费用</span>
      </span>
   <el-form  :model="lmshForm"   ref="lmshForm" label-width="100px" class="demo-lmshForm">
      <div class="showxq"  style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>单据编号: </span>
              <span>{{lmshForm.djbh}}</span>
            </p>
            <p   class=" addJLD"   >
              <span>维修单号: </span>
              <span>{{lmshForm.wxdh}}</span>
            </p>
             <p   class=" addJLD"   >
              <span>立项审批号: </span>
              <span>{{lmshForm.lxsph}}</span>
            </p> 
            <p   class=" addJLD">
              <span>设备名称: </span>
              <span>{{lmshForm.sbmc}}</span>
            </p>
            <p   class=" addJLD">
              <span>结算金额(元): </span>
              <span>{{lmshForm.jsje}}</span>
            </p>
            <!-- <p   class=" addJLD">
              <span>所属合同: </span>
              <span>{{lmshForm.ssht}}</span>
            </p>
            <p   class=" addJLD">
              <span>对方单位: </span>
              <span>{{lmshForm.dfdw}}</span>
            </p> -->
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
              <span>费用说明: </span>
              <span>{{lmshForm.fysm}}</span>
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
<Dialogs :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :bt="'人员选择'"
            :totals="totals"
            :bmbm="userInfo.daBmbm"
            :dwbm="userInfo.daZzbh"
            :dialogVisible="dialogVisibles"
            @searchXMMC="searchXMMC"
            @closeDialogs="closeDialogs"></Dialogs>
<DialogWl   v-if="showWl"
            :dialogTableTitWl="dialogTableTitWl"
            :btWl="'物料选择'"
            :mx="lysqForm.mx"
            :bmbm="userInfo.daBmbm"
            :dwbm="userInfo.daZzbh"
            :dialogVisibleWl="dialogVisibleWl"
            @closeDialogWl="closeDialogWl"></DialogWl>
<DialogSp   v-if="showSp"
            :dialogTableTitSp="dialogTableTitSp"
            :btSp="'立项审批列表'"       
            :bmbm="userInfo.daBmbm"
            :dwbm="userInfo.daZzbh"
            :dialogVisibleSp="dialogVisibleSp"
            @closeDialogSp="closeDialogSp"></DialogSp>
  </div>
</template>

<script>
import Dialog from './dialog.vue'
import Dialogs from './dialogs.vue'
import { setTimeout } from 'timers';
import DialogWl from './dialogWl.vue' 
import DialogSp from './dialogSp.vue'
export default {
  components: {Dialog,Dialogs,DialogWl,DialogSp},
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
      dialogTableTitSp:{ lxbh:'立项编号',lxmc:'立项名称',xmlxmc:'项目类型名称',ysje:'预算金额' },
      datatypesSp:'zc',
      showSp:false,
      dialogVisibleSp:false,
      typeSP:'',
      showZb:true,
        showRy:false,
       multipleRy:[],  
       rytreeList:[],
       xzry:{},
       ryList:[],
       ryPage: 1,
       rySize: 10,
       rytotal:10,
       wxdj_xq:false,
       lysq_xq:false,
       wxfy_xq:false,
       fjrk_xq:false,
      defaultRy:{
          children: 'children',
          label: 'text'
        },
      showRy_xc:false,
       multipleRy_xc:[],  
       rytreeList_xc:[],
       xzry_xc:{},
       ryList_xc:[],
       ryPage_xc: 1,
       rySize_xc: 10,
       rytotal_xc:10,
      defaultRy_xc:{
          children: 'children',
          label: 'text'
        },
      fullscreenLoading:false,
      rules_ly:{
        xyr: [
            { required: true, message: '需用人不能为空',trigger: 'blur'},
            { min: 1, message: '请选择需用人'}
          ],
        lysm: [
            { required: true, message: '领用说明不能为空',trigger: 'blur'},
            { min: 1, message: '请填写领用说明'}
          ], 
        
      },
      wxdj:{
          lxsph: [
            { required: true, message: '立项审批号不能为空',trigger: 'blur'},
            { min: 1, message: '请填写立项审批号'}
          ], 
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
          qrr: [
            { required: true, message: '指定验收人不能为空',trigger: 'blur'},
            { min: 1, message: '请选择指定验收人'}
          ], 
          wxrq:[
            { required: true, message: '维修日期不能为空',trigger: 'blur'},
            { min: 1, message: '请选择维修日期'}
          ], 
      },
      fjrkrules:{
        tkr: [
            { required: true, message: '退库人不能为空',trigger: 'blur'},
            { min: 1, message: '请填写退库人'}
          ], 
        tksm: [
            { required: true, message: '退库说明不能为空',trigger: 'blur'},
            { min: 1, message: '请填写退库说明'}
          ], 
          ckmc:[
            { required: true, message: '仓库名称不能为空',trigger: 'blur'},
            { min: 1, message: '请选择仓库名称'}
          ], 
          ywqj:[
            { required: true, message: '业务期间不能为空',trigger: 'blur'},
            { min: 1, message: '请选择业务期间'}
          ],
      },
      wxfyForms:{
        fysm: [
            { required: true, message: '费用说明不能为空',trigger: 'blur'},
            { min: 1, message: '请填写费用说明'}
          ], 
        jsje: [
            { required: true, message: '结算金额不能为空',trigger: 'blur'},
            { min: 1, message: '请填写结算金额'}
          ], 
          ssht:[
            { required: true, message: '所属合同不能为空',trigger: 'blur'},
            { min: 1, message: '请选择所属合同'}
          ], 
 
      },
      lmshForm: {
        tbr:'',
        tbdw:'',
        tbbm:'',
        bgr:'',
        tbrq:''
      },
      wxysForm: {},
      wxfyForm: {
        tbr:'',
        tbdw:'',
        tbbm:'',
        tbsj:'',
      },
      fjrkForm: {
        tbr:'',
        tbdw:'',
        tbbm:'',
        tbsj:'',
        mx: [{
          tksl:''
        }]
      },
      lysqForm: {
        tbr:'',
        tbdw:'',
        tbbm:'',
        tbsj:'',
        mx: [{}]
      },
      bjmc: {
        bjmc: ''
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
      sbmcOptions: [],
      qmbbOptions1: [],
      bjList: [],
      htList:[],
      ckOptions: [],
      searchForm: {
        djzt:'未登记',
        fpzt:'已分配',
        stateIndex:2,
        yszt:'',
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      personelForm: {},
      showDetail: false,
      showDetail1: false,
      showDetail2: false,
      showDetail3: false,
      showDetail4: false,
      showwxrwd: false,
      userData:'',
      htbh: {
        bxdh: ''
      },
      multipleSelection: [],
      selectRow: [],
      dataList:[],
      fileList:[],
      tbdwList:[],
      selectDw:'',
      defaultProps:{
          children: 'children',
          label: 'text'
        },
      deleArr:'',
      getIndex:'',
      zkx:'',
      treeList:[],
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
       xz:{zcbm:'',zcmc:'',bmbm:''},
      zcList:[],
      ysrList:[],
      zcPage: 1,
      zcSize: 10,
      zctotal:10,
      showXzsb:false,
      showXzxyr:false,
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
      showXzTx: false,
        defaultTree0: {
          children: 'children',
          label: 'text'
        },
      isRouterAlive:true,
      currentRow:'',
      djState:[
          {name:'全部',val:'0000'},
          {name:'已登记',val:'0001'},
          {name:'未登记',val:'0010'},
          {name:'已验收',val:'0011'},
          {name:'未验收',val:'0100'},
        ],
      txArr:[],
      zdArr:[],

       
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
            case 'tkr':{
              this.fjrkForm.tkr=val.userName
              break;}
            case 'sbfzr':{
              this.lmshForm.sbfzr=val.userName
              break;}
            case 'xcwxr':{
              this.lmshForm.xcwxr=val.userName
              break;}
            case 'zdysr':{
              this.lmshForm.qrr=val.userName
              this.lmshForm.ysrcode=val.userCode
               let obj={
               ysr:val.userName,
               ysryj:'',
               ysrcode:val.userCode,
               yszt:'未通过',
               yssj:'',
               ysbxdh:this.lmshForm.djbh
            }
            this.zdArr=obj
           
              break;}
            default:
              break;
          }
            
          }
      },
       closeDialogs(val){
        this.dialogVisibles = false
        this.txArr=[]
        if(val==undefined || val=='undefined'){
          return
        }
          this.lmshForm.txqrr=''
          for(let i=0;i< val.length;i++){
            let obj={
              ysr:val[i].userName,
            ysryj:'',
            ysrcode:val[i].userCode,
            yszt:'未通过',
            yssj:'',
            ysbxdh:this.lmshForm.djbh
            }
            this.txArr.push(obj)
            if(i!=val.length-1){
              this.lmshForm.txqrr+=val[i].userName+','
            this.lmshForm.txqrrcode+=val[i].userCode+','
            }else{
              this.lmshForm.txqrr+=val[i].userName
            this.lmshForm.txqrrcode+=val[i].userCode
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
        if(this.typeWl=='wl'){
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
        if(this.typeWl=='fj'){
          for(let i=0;i<val.length;i++){
          let obj={}
          obj.bjmc=val[i].bjmc
          obj.bjbh=val[i].bjbh
          obj.bjbm=val[i].bjbh
          obj.ggxh=val[i].ggxh
          obj.jldw=val[i].jldw
          obj.tksl=1
           obj.bjzt='损坏'
          this.fjrkForm.mx.push(obj)
        }
        for (let i = 0; i < this.fjrkForm.mx.length; i++) {
         if(this.fjrkForm.mx[i].bjmc=='' || this.fjrkForm.mx[i].bjmc==undefined){
            this.fjrkForm.mx.splice(i,1)
          }
          
        }
        this.lysqForm.mx=this.fjrkForm.mx
        
        }
        } 
      },
    showDialogSp(type){
        this.typeSp=type
        this.showSp=true
     this.dialogVisibleSp = true
      
      },
      closeDialogSp(val){
        this.showSp=false
        this.dialogVisibleSp= false
        if(val==undefined || val=='undefined'){
          return
        }
 
        if(this.typeSp=='lx'){
        this.lmshForm.lxsph=val.lxbh
        }
        if(this.typeSp=='fy'){
        this.wxfyForm.lxsph=val.lxbh
        }
      },
    rowClass({ row, rowIndex }) {
      if (this.selectRow.includes(row.id)) {
        return { "background-color": "rgba(185, 221, 249, 0.75)" };
      }
    },
    reload () {
 
     this.isRouterAlive = false
     this.$nextTick(() => (this.isRouterAlive = true))
   },
    tableRowClassName ({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;
      },
    selectedHighlight({row, rowIndex}) {
        if ((this.getIndex) === rowIndex ) {
          return {
            "background-color": "#d5d5d5"
          };
        }
      },
    handleIconClick (){
    this.searchForm.ssdwdm=this.userInfo.daZzbh
      this.searchForm.tbbmdm=this.userInfo.daBmbm
      this.selectDw=''
    },
    clears (){
      if(this.selectDw == ''){
        this.searchForm.tbdwdm=this.userInfo.daZzbh
      this.searchForm.tbbmdm= this.userInfo.daBmbm
      }
    },
    clickRow_wxrwd (row){
      this.getIndex=row.index
      this.$refs.multipleTable.clearSelection()
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    clickRow2(row){
      this.$refs.Table.clearSelection()
      this.$refs.Table.toggleRowSelection(row)
    },
    clickRow2_tx(row){
      this.$refs.Table_tx.toggleRowSelection(row)
    },
    selectHts () {
    },
    dfdwOptions () {
    },
    daoru () {
    },
 
    lysq () {
      if (this.multipleSelection.length === 1) {
     if(this.multipleSelection[0].yszt=='已验收'){
          this.$message({
              message: '该任务单已验收不能领用设备',
              type: 'error'
            })
            return
      }
        if(this.multipleSelection[0].isly==='是'){
        this.$api.getLysqInfoByGZDjbh('?djbh=' + this.multipleSelection[0].djbh).then(resp => {
          if (resp.data.code !== 1) {
            this.$message({
              message: '出错了',
              type: 'error'
            })
          } else {
             console.log(resp.data.data[0])
            this.lysq_xq=true
            this.lmshForm=resp.data.data[0]
           
            this.$api.getFilesDataById('?id='+this.lmshForm.djbh).then(res=>{
           if(res.data.code==1){
         this.fileList=res.data.data
         }
     }).catch(er=>{
     })
          }

       }).catch(e=>{

       })   
       
       return
      }
        this.showDetail2 = true
        this.fileList=[]
        this.formId = 'lysq' + new Date().getTime()
        this.lysqForm.djbh = this.formId
        this.lysqForm.tbdw = this.userInfo.daZzmc
      this.lysqForm.tbr = this.userInfo.daYhmc
      this.lysqForm.tbbm =  this.userInfo.daBmmc
      this.lysqForm.tbdwdm=this.userInfo.daZzbh
       this.lysqForm.xyr = this.userInfo.daYhmc
       this.lysqForm.tbsjc= new Date().getTime()
      this.lysqForm.tbbmdm=this.userInfo.daBmbm
        this.lysqForm.wxdh = this.multipleSelection[0].djbh
        this.lysqForm.tbsj = this.formatDate(new Date())
      } else if (this.multipleSelection.length === 0) {
        this.$message({type: 'error', message: '请先选择维修任务单'})
      } else if (this.multipleSelection.length > 1) {
        this.$message({type: 'error', message: '最多选择一条任务单'})
      }
    },
    fjrk () {
      if (this.multipleSelection.length === 1) {
      if(this.multipleSelection[0].isly!='是'){
          this.$message({
              message: '未领用设备，不能废件入库',
              type: 'error'
            })
            return
      }
      if(this.multipleSelection[0].bjzt!='已出库'){
          this.$message({
              message: '设备未出库，不能废件入库',
              type: 'error'
            })
            return
      }
      if(this.multipleSelection[0].fjkzt==='已入库'){
    this.$api.getFjrkInfoByWxdh('?wxdh=' + this.multipleSelection[0].djbh).then(resp => {
          if (resp.data.code !== 1) {
            this.$message({
              message: '出错了',
              type: 'error'
            })
          } else {
            this.fjrk_xq=true
            this.lmshForm=resp.data.data
            this.$api.getFilesDataById('?id='+this.lmshForm.djbh).then(res=>{
           if(res.data.code==1){
         this.fileList=res.data.data
         }
     }).catch(er=>{
     })
          }

       }).catch(e=>{

       })   
       
       return
      }
        this.$api.getLysqInfoByGZDjbh('?djbh=' + this.multipleSelection[0].djbh).then(res => {
          if (res.status !== 200) {
            this.$message({
              message: '出错了',
              type: 'error'
            })
          } else {
            this.showDetail3 = true
            this.fileList=[]
            this.formId = 'fjrk' + new Date().getTime()
            this.fjrkForm.djbh = this.formId
            this.fjrkForm.wxdh = this.multipleSelection[0].djbh
             this.fjrkForm.tkr= this.userInfo.daYhmc
            this.fjrkForm.tbdw = this.userInfo.daZzmc
      this.fjrkForm.tbr = this.userInfo.daYhmc
      this.fjrkForm.tbsjc= new Date().getTime()
      this.fjrkForm.tbbm =  this.userInfo.daBmmc
      this.fjrkForm.tbdwdm=this.userInfo.daZzbh
      this.fjrkForm.tbbmdm=this.userInfo.daBmbm
      this.fjrkForm.ywqj = this.formatDate(new Date())
           this.fjrkForm.tbsj = this.formatDate(new Date())
      this.fjrkForm.mx=[]
           for (let i = 0; i <  res.data.data[0].mx.length; i++) {
             let obj={}
           obj.bjmc = res.data.data[0].mx[i].bjmc
           obj.bjbh = res.data.data[0].mx[i].bjbm
           obj.bjbm = res.data.data[0].mx[i].bjbm
           obj.ggxh = res.data.data[0].mx[i].ggxh
           obj.jldw = res.data.data[0].mx[i].jldw
           obj.tksl = res.data.data[0].mx[i].xysl
           obj.bjzt = '损坏'
             this.fjrkForm.mx.push(obj)
           }
         this.lysqForm.mx=this.fjrkForm.mx   
         console.log(this.lysqForm.mx)
          }
        })
      } else if (this.multipleSelection.length === 0) {
        this.$message({type: 'error', message: '请先选择维修任务单'})
      } else if (this.multipleSelection.length > 1) {
        this.$message({type: 'error', message: '最多选择一条任务单'})
      }
    },
    wxfy () {
      if (this.multipleSelection.length === 1) {
        

        if(this.multipleSelection[0].isww!='是'){
          this.$message({type: 'error', message: '只有委外项目才能进行维修费用结算'})
          return
        }
        if(this.multipleSelection[0].yszt!='已验收'){
          this.$message({type: 'error', message: '只有验收后的项目才能进行维修费用结算'})
          return
        }
        if(this.multipleSelection[0].sfwxjs==='已结算'){
        this.$api.getWxfyInfoByIWxdh('?wxdh=' + this.multipleSelection[0].djbh).then(resp => {
          if (resp.data.code !== 1) {
            this.$message({
              message: '出错了',
              type: 'error'
            })
          } else {
            this.wxfy_xq=true
            this.lmshForm=resp.data.data
            this.$api.getFilesDataById('?id='+this.lmshForm.djbh).then(res=>{
           if(res.data.code==1){
         this.fileList=res.data.data
         }
     }).catch(er=>{
     })
          }

       }).catch(e=>{

       })   
       
       return
      }
        this.showDetail4 = true
        this.fileList=[]
        this.formId = 'wxfy' + new Date().getTime()
        this.wxfyForm.djbh = this.formId
        this.wxfyForm.wxdh = this.multipleSelection[0].djbh
        this.wxfyForm.lxsph = this.multipleSelection[0].lxsph
        this.wxfyForm.tbdw = this.userInfo.daZzmc
      this.wxfyForm.tbr = this.userInfo.daYhmc
      this.wxfyForm.tbsjc= new Date().getTime()
      this.wxfyForm.tbbm =  this.userInfo.daBmmc
      this.wxfyForm.tbdwdm=this.userInfo.daZzbh
      this.wxfyForm.tbbmdm=this.userInfo.daBmbm
      this.wxfyForm.spzt='3501'
        this.wxfyForm.sbmc = this.multipleSelection[0].sbmc
        this.wxfyForm.tbsj = this.formatDate(new Date())
      } else if (this.multipleSelection.length === 0) {
        this.$message({type: 'error', message: '请先选择维修任务单'})
      } else if (this.multipleSelection.length > 1) {
        this.$message({type: 'error', message: '最多选择一条任务单'})
      }
    },
    showAdd () {
      
      this.showxq = false
      this.isadd = true
      this.formId = 'wxdj' + new Date().getTime()
      if (this.multipleSelection.length === 1) {
        if(this.multipleSelection[0].bjzt!='已出库' && this.multipleSelection[0].isly=='是'){
        this.$message({
              message: '备件未出库，不能登记',
              type: 'error'
            })
        return
      }
        if(this.multipleSelection[0].djzt==='已登记'){
       this.$api.getWxdjInfoByIDjbh('?djbh=' + this.multipleSelection[0].djbh).then(resp => {
          if (resp.data.code !== 1) {
            this.$message({
              message: '出错了',
              type: 'error'
            })
          } else {
            this.wxdj_xq=true
            this.lmshForm=resp.data.data
            this.$api.getFilesDataById('?id='+this.lmshForm.djbh).then(res=>{
            if(res.data.code==1){
                this.fileList=res.data.data
              }
            }).catch(er=>{
              })
          }

       }).catch(e=>{

       })   
       
       return
      }
        this.$api.jdwhxjwxgetInfoByIDjbh('?djbh=' + this.multipleSelection[0].djbh).then(resp => {
          if (resp.status !== 200) {
            this.$message({
              message: '出错了',
              type: 'error'
            })
          } else {
            this.fileList=[]
            this.lmshForm.djbh = this.formId
            this.lmshForm.bxdh = this.multipleSelection[0].djbh
            this.lmshForm.sbmc = resp.data.data.sbmc
            this.lmshForm.ggxh = resp.data.data.ggxh
            this.lmshForm.bzrq = resp.data.data.bzrq
            this.lmshForm.wxrq = this.formatDate(new Date())
            this.lmshForm.bgr = resp.data.data.tbr
            this.lmshForm.tbrq = this.formatDate(new Date())
            this.lmshForm.xcwxr= this.userInfo.daYhmc
            this.lmshForm.gzms = resp.data.data.gzms
            this.lmshForm.tbsjc= new Date().getTime()
            this.lmshForm.isww = resp.data.data.isww
            this.lmshForm.qrr=''
            this.lmshForm.ysrcode=''
            this.lmshForm.txqrr=''
            this.lmshForm.txqrrcode=''
           this.lmshForm.tbdw = this.userInfo.daZzmc
      this.lmshForm.tbr = this.userInfo.daYhmc
      //  this.lmshForm.qrr = this.userInfo.daYhmc
      //  this.lmshForm.ysrcode= this.userInfo.daYhbm 
      this.lmshForm.tbbm =  this.userInfo.daBmmc
      this.lmshForm.tbdwdm=this.userInfo.daZzbh
      this.lmshForm.tbbmdm=this.userInfo.daBmbm
      this.lmshForm.tbsj = this.formatDate(new Date())

            // }
            this.showDetail = true
          }
        }).catch(e => {})
      } else if (this.multipleSelection.length === 0) {
        this.$message({type: 'error', message: '请先选择维修任务单'})
      } else if (this.multipleSelection.length > 1) {
        this.$message({type: 'error', message: '最多选择一条任务单'})
      }
    },
    updateFormDia (row, index) {
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.index = index
    },
    showBhFormDia (row) {
      this.showwxrwd = true
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
     this.showwxrwd = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
       this.$api.getFilesDataById('?id='+this.lmshForm.djbh).then(res=>{
       if(res.data.code==1){
         this.fileList=res.data.data
       }
     }).catch(er=>{
     })
    },
     handleHtState(val,index){
       this.searchForm.stateIndex=index
         switch (val) {
           case '0000':
             {
            this.searchForm.djzt=''
            this.searchForm.yszt=''
             break;}
           case '0001':
             {
            this.searchForm.djzt='已登记'
            this.searchForm.yszt=''
             break;}
            case '0010':
             {
            this.searchForm.djzt='未登记'
            this.searchForm.yszt=''
             break;}
             case '0011':
             {
            this.searchForm.yszt='已验收'
            this.searchForm.djzt=''
             break;}
             case '0100':
             {
            this.searchForm.yszt='未验收'
            this.searchForm.djzt=''
             break;}
              default:
             break;
         }
        //  console.log(this.searchForm)
          this.search(1,10)
      },
    search (currentPage, pageSize) {
      this.getIndex=''
      this.multipleSelection = []
      this.loading = true
      this.showSearch = false
      if (this.searchForm.jcrq) {
        this.searchForm.ksrq = this.searchForm.jcrq[0]
        this.searchForm.jsrq = this.searchForm.jcrq[1]
      } else {
        this.searchForm.ksrq = ''
        this.searchForm.jsrq = ''
      }
       this.searchForm.spzt='3503'
      this.$api.jdwhxjwxgetWxrwdList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.tableData = resp.data.data.list
          console.log(this.tableData)
          this.total = resp.data.data.total
        }
      }).catch(e => {
        this.loading = false
      })
    },
    // addWxys () {
    //   this.$api.jdwhxjwxaddWxys(this.wxysForm).then(res => {
    //     if (res.data.code === 1) {
    //       this.$message({
    //         type: 'success',
    //         message: '添加成功!'
    //       })
    //       this.search(this.currentPage, this.pageSize)
    //       this.resetForm()
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: res.data.msg
    //       })
    //     }
    //   })
    // },
    addlysq () {
      this.lysqForm.spzt='3501'
      for (let index = 0; index < this.lysqForm.mx.length; index++) {
        if(isNaN(this.lysqForm.mx[index].xysl)){
          this.$message({
            type: 'error',
            message: '需用数量必须为数字!'
          })
          return
        }else{
         let a=Number(this.lysqForm.mx[index].xysl)

         if(Number.isInteger(a)==false || a<=0){
        this.$message({
            type: 'error',
            message: '需用数量必须为大于0的整数!'
          })
          return
         }
        }
       if(!this.lysqForm.mx[index].bjmc){
         this.$message({
            type: 'error',
            message: '请选择备件'
          })
          return
       }
      }
this.$refs['lysqForm'].validate((valid) => {
          if (valid) {
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
      if(this.lysqForm.tbbmdm==='YTWO6'){
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
            } else {
            return false;
          }
        });

     
    },
    addSubmit () {
    
     this.$refs['wxdj_lmshForm'].validate((valid) => {
          if (valid) {
            if(this.dataList.length>0){
      for (let index = 0; index < this.dataList.length; index++) {
        this.dataList[index].file_id=this.lmshForm.djbh
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
      this.lmshForm.ysrcode+=','+this.lmshForm.txqrrcode
      this.lmshForm.mx=[]
      this.$api.jdwhxjwxaddWxdj(this.lmshForm).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '维修登记成功!'
          })
          this.lmshForm.yslist=this.txArr
          this.lmshForm.yslist.unshift(this.zdArr)
          console.log(this.lmshForm.yslist)
          this.$api.jdwhxjwxaddWxys(this.lmshForm).then(res => {
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
    addfjrk () {
     this.$refs['fjrkForm'].validate((valid) => {
          if (valid) {
        for (let index = 0; index < this.fjrkForm.mx.length; index++) {
        if(isNaN(this.fjrkForm.mx[index].tksl)){
          this.$message({
            type: 'error',
            message: '退库数量必须为数字!'
          })
          return
        }else{
         let a=Number(this.fjrkForm.mx[index].tksl)

         if(Number.isInteger(a)==false || a<=0){
        this.$message({
            type: 'error',
            message: '退库数量必须为大于0的整数!'
          })
          return
         }
        }
        }
            if(this.dataList.length>0){
      for (let index = 0; index < this.dataList.length; index++) {
        this.dataList[index].file_id=this.fjrkForm.djbh
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
      this.$api.jdwhbjgladdFjrk(this.fjrkForm).then(res => {
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
            return false;
          }
        });
      
    },
    addwxfy () {
      if(isNaN(this.wxfyForm.jsje)){
          this.$message({
            type: 'error',
            message: '结算金额必须为数字!'
          })
          return
        }else{
         let a=Number(this.wxfyForm.jsje)
         if(a<0){
        this.$message({
            type: 'error',
            message: '需用数量必须为大于0!'
          })
          return
         }
        }
       this.$refs['wxfyForm'].validate((valid) => {
          if (valid) {
            if(this.dataList.length>0){
      for (let index = 0; index < this.dataList.length; index++) {
        this.dataList[index].file_id=this.wxfyForm.djbh
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
      this.$api.jdwhxjwxaddWxfy(this.wxfyForm).then(res => {
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
            return false;
          }
        });
      
    },
    updateSubmit () {
      this.$api.jdwhxjwxeditWxdj(this.lmshForm).then(res => {
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
    shenhe (row, index) {
      this.$confirm('是否通过审核？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.tableData.splice(0, this.multipleSelection.length)
        this.$message({
          type: 'success',
          message: '审核通过!'
        })
        row.sfsh = '1'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消审核'
        })
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
    addzibiao () {
      this.lysqForm.mx.push({})
    },
     addzibiao_fj () {
      this.fjrkForm.mx.push({})
    },
    deletezibiao (index) {
      this.lysqForm.mx.splice(index, 1)
    },
    deletezibiao_fj (index) {
      this.fjrkForm.mx.splice(index, 1)
    },
    fuzhi (item, index) {
      this.lyjcindex = index
    },
    setCurrent(row) {
        this.$refs.multipleTable.setCurrentRow(row);
      },
    handleSelectionChange (val) {
      this.$refs.multipleTable.clearSelection()
      this.multipleSelection = val
      this.currentRow = val;
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.search(this.currentPage, this.pageSize)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.search(this.currentPage, this.pageSize)
    },
    selectBj (value) {
      this.lysqForm.mx[this.lyjcindex].bjbm = value.bjbm
      this.lysqForm.mx[this.lyjcindex].jldw = value.jldw
      this.lysqForm.mx[this.lyjcindex].ggxh = value.ggxh
      this.lysqForm.mx[this.lyjcindex].bjmc = value.bjmc
    },
    resetForm (res) {
      this.wxdj_xq=false
      this.lysq_xq=false
      this.wxfy_xq=false
      this.fjrk_xq=false
      this.showZb=true
      this.loading=false
      if(res!==undefined && res.target==undefined){
     if(this.$refs[res] != undefined){
        this.$refs[res].resetFields();
        }
      }
      
      this.showxq=false
      this.showDetail = false
      this.showwxrwd=false
      this.showXzsb=false
      this.showDetail1 = false
      this.showDetail2 = false
      this.showDetail3 = false
      this.showDetail4 = false
      this.lmshForm = {
        tbr:'',
        tbdw:'',
        tbbm:'',
        bgr:'',
        tbrq:''
      }
      this.lysqForm={
        tbr:'',
        tbdw:'',
        tbbm:'',
        tbsj:'',
        mx:[{
          xysl:''
        }]
      }
      this.fjrkForm= {
        tbr:'',
        tbdw:'',
        tbbm:'',
        tbsj:'',
        mx: [{
          tksl:''
        }]
      }
      this.wxfyForm={
        tbr:'',
        tbdw:'',
        tbbm:'',
        tbsj:'',
      }
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
    clickRow3(row){
      //资产
      this.$refs.Table0.toggleRowSelection(row)
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
      this.$api.getHtxxRelatedAll('').then(resp => {
        if (resp.data.code === 1) {
          this.htList = resp.data.data
        }
      })
      this.$api.jdwhxjwxgetDfdwInfo('').then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.dfdwOptions = resp.data.data
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
       this.searchForm.ssdwdm=this.userInfo.daZzbh
      this.searchForm.tbbmdm=this.userInfo.daBmbm
    },
  },
 
  mounted () {
    this.getTbdw(this.userInfo.daZzbh,this.userInfo.daBmbm)
 
    this.getQmldbb()
    // this.tableHeight = $('#wxrwd')[0].offsetHeight
    document.onclick=function(e){
      if(e.target&&e.target.className!='el-input__inner'){
         $('.tbdw').hide()
      }
    }
    // this.search(this.currentPage, this.pageSize)
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
  #wxrwd{
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    min-width: 1100px;
    height: 100%;
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
    .cha_xun{
      min-height: 60px;
      padding-top: 10px;
      z-index: 999;
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
		height:auto;
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
        padding: 0px 0 0 0;
        overflow: hidden;
        text-align: center;
        box-sizing: border-box;
        .lyzibiao{
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
        .fjzibiao{
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
              width:calc((100% - 100px)/7);
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
              width: calc((100% - 100px)/7);
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
        // margin-top: 20px;
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
 
        right: 0px;
        top: 0;
        i{
          color: #1CA4FA;
          margin-left: 10px;
        }
      }
    }
    .searchLeft{
      display: flex;
      vertical-align: middle;
      /*margin-top: 10px;*/
      height: 40px;
      line-height: 40px;
      font-size: 13px;
      background: #f7f9fb;
      #selectColor,#selectColor2{
        color:red;
      }
      .currentState{
        display: inline-block;
        cursor: pointer;
        padding-right: 10px;
        color: #555;
        height: 19px;
        line-height: 19px;
        margin-right: 10px;
        border-right: 2px solid #999;
      }
      .currentState:last-child{
        border-right: 0 !important;
      }
      .htTypeList{
        padding-left: 100px;
      }
    }
  }
</style>
