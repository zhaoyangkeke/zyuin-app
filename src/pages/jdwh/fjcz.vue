/**
* ----废件处置
*/
<template>
  <div id="fjcz" class="styleSheets" style="height: 100%" v-loading.fullscreen.lock="fullscreenLoading"  v-if="isRouterAlive">
   <div class="bill-header">
  		<div class="bill-title">
  			<span>废件处置</span>
  			 <ul>
	          <li @click="showAdd()" class="Hight_btn">新增</li>
	          <li @click="deleteData()">删除</li>
	        </ul>
  		</div>
      <div class="bill-search" style="">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px"  prop="" class="">
             <el-select clearable size="mini" v-model="searchForm.ckmc" placeholder="请选择仓库" value-key="ssck">
          <el-option
           v-for="(item,index) in cklist"
          :key="index"
          :label="item.ssck"
          :value="item.ssck">
         </el-option>
          </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" prop="" class="">
            <div class="tbdw">
              <el-tree :accordion="true" :data="tbdwList" node-key="id" :default-expanded-keys="[zkx]" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
            <el-input   class="selectDw" style="width:200px" v-model="selectDw" size="mini" placeholder="请输选择单位" @focus="selectDwTree">
              <i
    class="el-icon-error"
    slot="suffix"
    @click="handleIconClick">
  </i>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" prop="" class="">
            <el-date-picker
              v-model="searchForm.jcrq"
              type="daterange"
              size="mini"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="填报开始日期"
              end-placeholder="填报结束日期">
            </el-date-picker>
            <!--<el-select size="mini"  class="" placeholder="请选择日期" v-model="searchForm.jcrq">
              <el-option v-for="(item,index) in qmbbOptions" :key="index" :label="item.bbmc" :value="item.bbid"></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" prop="" class="">
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
                v-loading="loading"
                @row-dblclick="dbclick"
                @row-click="sigClic"
                @selection-change="handleSelectionChange">
       <el-table-column
          type="selection"
           :selectable='checkboxInit'
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column type="expand">
          <template scope="scope">
            <el-table class="demo-table-expand"
                      :data="scope.row.mx"
                      border>
             <el-table-column type="index"  label="序号"  align="center"  width="40"></el-table-column>
              <el-table-column prop="bjmc" label="备件名称"></el-table-column>
              <el-table-column prop="ggxh" label="规格型号"></el-table-column>
              <el-table-column prop="czsl" label="处置数量"></el-table-column>
              <el-table-column prop="czdj" label="处置单价"></el-table-column>
              <el-table-column prop="czje" label="处置金额(元)"></el-table-column>
              <el-table-column prop="bz" label="备注"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
       <el-table-column align="center" class-name="column-caoz" label="状态" width="80">
          <template scope="scope">
            <span v-if="scope.row.tjzt!='已提交'" style="color:#D34C42; " >{{scope.row.tjzt}}</span>
            <span v-if="scope.row.tjzt=='已提交'"   >{{scope.row.tjzt}}</span>
          </template>
        </el-table-column>
        <el-table-column sortable align="left" prop="ckmc" label="仓库名称" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="czr" label="处置人" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="czje" label="处置金额(元)" show-overflow-tooltip></el-table-column>
        <el-table-column sortable width="100"  align="left"  prop="czsj" label="处置时间" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="tbr" label="填报人" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="tbdw" label="填报单位" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="tbbm" label="填报部门" show-overflow-tooltip></el-table-column>
        <el-table-column width="100"  align="left" sortable prop="tbsj" label="填报日期" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="100">
          <template scope="scope">
            <span v-if="scope.row.tjzt!='已提交'" style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span v-if="scope.row.tjzt!='已提交'" style="color:#00a2fd;cursor: pointer;text-align: center" @click="tijiaos(scope.row, scope.$index)">提交</span>
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

    <el-dialog fullscreen class="data-dialog el-updata-div"  :close-on-click-modal="false" :visible.sync="showDetail" width="580px"  :show-close="false">
      <span slot="title">
          <span class="titleclasschild"  @click="resetForm('lmshForm')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>废件处置</span>
      </span>
      <el-form v-if="showxq"  :model="lmshForm"   ref="lmshForm" label-width="100px" class="demo-lmshForm">
      <div class="showxq" v-if="showxq" style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>单据编号: </span>
              <span>{{lmshForm.djbh}}</span>
            </p>
            <p   class=" addJLD">
              <span>仓库名称: </span>
              <span>{{lmshForm.ckmc}}</span>
            </p>
            <p  class=" addJLD">
              <span>处置人: </span>
              <span>{{lmshForm.czr}}</span>
            </p>
             <p   class=" addJLD">
              <span>处置金额(元): </span>
              <span>{{lmshForm.czje}}</span>
            </p> 
             <p   class=" addJLD">
              <span>费用金额(元): </span>
              <span>{{lmshForm.fyje}}</span>
            </p> 
             <p   class=" addJLD">
              <span>处置时间: </span>
              <span>{{lmshForm.czsj}}</span>
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
              <span>处置说明: </span>
              <span>{{lmshForm.czsm}}</span>
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
           
            <p class="tab_lable" style="font-size: 14px;text-align: center;margin-top:12px;">
            <span class="Tab" :class="tabindex===0?'tabselect':''" @click="tablable(0)">处置明细</span>
            <span class="Tab" :class="tabindex===1?'tabselect':''" @click="tablable(1)">费用明细</span>
          </p>
            <el-table
      v-if="tabindex===0"
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
      prop="czsl"
      label="处置数量">
    </el-table-column>
    <el-table-column
      prop="czdj"
      label="处置单价(元)">
    </el-table-column>
    <el-table-column
      prop="czje"
      label="处置金额(元)">
    </el-table-column>
    <el-table-column
      prop="bz"
      label="备注">
    </el-table-column>
  </el-table>
     <el-table
      v-if="tabindex===1"
    :data="lmshForm.fymx"
    border
    style="width: 90%;">
    <el-table-column
      type="index"
      label="序号"
      align="center"
      width="80">
    </el-table-column>
    <el-table-column
      prop="fymc"
      label="费用名称"
      >
    </el-table-column>
    <el-table-column
      prop="fyje"
      label="费用金额(元)">
    </el-table-column>
    <el-table-column
      prop="sffp"
      label="是否发票">
    </el-table-column>
    <el-table-column
      prop="fph"
      label="发票号">
    </el-table-column>
    <el-table-column
      prop="sl"
      label="税率">
    </el-table-column>
    <el-table-column
      prop="se"
      label="税额(元)">
    </el-table-column>
    <el-table-column
      prop="bz"
      label="备注">
    </el-table-column>
  </el-table>
      </div>
      </el-form>
      <el-form v-if="!showxq" :model="lmshForm" :rules="fjcz" ref="lmshForm" label-width="100px" class="demo-lmshForm">
                  <!-- <el-form-item class=" addJLD" label="单据编号" prop="djbh">
                <span class="edit_text">{{lmshForm.djbh}}</span>
              </el-form-item> -->
              <el-form-item class=" addJLD" label="仓库名称" prop="ckmc">
                 <el-select clearable :disabled="showxq" size="mini" style="width: 148px;" v-model="lmshForm.ckmc" placeholder="请选择仓库" @change="selectCk">
                <el-option v-for="(item,index) in ckOptions" :key="index" :label="item.ssck" :value="item.ssck"></el-option>
              </el-select>
              </el-form-item>
                <el-form-item class=" addJLD" label="处置人" prop="czr">
                <el-input size="mini" type="text"  v-model="lmshForm.czr" @focus="showDialog('czr')"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD" label="处置时间" prop="czsj">
               <el-date-picker
                v-model="lmshForm.czsj"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
              </el-form-item>
              <el-form-item class=" addJLD" label="处置金额(元)" prop="czje">
               <span class="edit_text">{{lmshForm.czje}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="费用金额(元)" prop="fyje">
               <span class="edit_text">{{lmshForm.fyje}}</span>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="处置说明" prop="czsm">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lmshForm.czsm"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="备注" prop="bz">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lmshForm.bz"></el-input>
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
              <!-- <el-form-item class=" addJLD_long" label="维修厂商" prop="wxcs">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lmshForm.wxcs"></el-input>
              </el-form-item> -->
           <div class="group-form-name hide-form-item"><div class="operator"  @click="showZb=!showZb"><span class="name">废件清单</span><a :class="showZb?'el-icon-minus':'el-icon-plus'" href="javascript:;"   style="color: #999;font-size:12px;text-decoration: none;font-weight:900"></a></div><span class="line"></span></div>
              <div class="dialog_warps" v-if="showZb"> 
              <!-- <div class="addzbsj">
          <i @click="addzb=!addzb" :class="addzb?'el-icon-remove-outline':'el-icon-circle-plus-outline'"></i>
        </div> -->
        <div class="zibnr" v-if="addzb" style="overflow-x: auto;overflow-y: hidden;">
          <p class="tab_lable" style="font-size: 14px;text-align: center;margin-top:12px;">
            <span class="Tab" :class="tabindex===0?'tabselect':''" @click="tablable(0)">处置明细</span>
            <span class="Tab" :class="tabindex===1?'tabselect':''" @click="tablable(1)">费用明细</span>
            <el-button size="small" type="primary"  class="dialog-button bao_cun" style="float:right"  @click="addzibiao">增行</el-button>
          </p>
          <ul v-if="tabindex===0">
            <li>
              <span>操作</span><span>序号</span><span>备件名称</span><span>备件编码</span><span>规格型号</span><span>计量单位</span><span>处置数量</span><span>处置单价(元)</span><span>处置金额(元)</span><span>备注</span>
            </li>
            <li v-for="(item, index) in lmshForm.mx" :key="index">
              <p>
                <i class="el-icon-delete" title="删除" @click="deletezibiao(index)"></i>
              </p>
              <p>
                <span>{{index+1}}</span>
              </p>
              <p>
                <!-- <el-select clearable v-if="!showxq" @focus="fuzhi(item, index)" size="mini" style="width: 98px;" v-model="item.bjmc" value-key="BJMC" placeholder="请选择备件" @change="selectHt" >
                  <el-option v-for="(item,index) in wxfyOptions" :key="index" :label="item.BJMC" :value="item" ></el-option>
                </el-select> -->
                <el-input  size="mini" type="text" v-model="item.bjmc" placeholder="请选择备件" @focus="showDialogWl('fj')"></el-input>
              </p>
              <p>
                <el-input disabled size="mini" type="text" v-model="item.bjbm"></el-input>
              </p>
              <p>
                <el-input disabled size="mini" type="text" v-model="item.ggxh"></el-input>
              </p>
              <p>
                <el-input disabled size="mini"  type="text" v-model="item.jldw"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.czsl" @input="tjje"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.czdj" @input="tjje"></el-input>
              </p>
              <p>
                <el-input size="mini" disabled type="text" v-model="item.czje"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.bz"></el-input>
              </p>
            </li>
            <div style="clear: both"></div>
          </ul>
          <ul class="gchzb" v-if="tabindex===1">
            <li class="fymx">
              <span>操作</span><span>序号</span><span>费用名称</span><span>费用金额(元)</span><span>是否发票</span><span>发票号</span><span>税率</span><span>税额(元)</span><span>备注</span>
            
            </li>
            <li class="fymx" v-for="(item, index) in lmshForm.fymx" :key="index">
              <p>
                <i class="el-icon-delete" title="删除" @click="deletezibiao(index)"></i>
              </p>
              <p>
                <el-input size="mini" type="text" :value="index+1"></el-input>
              </p>
              <p>
             
                <el-input size="mini" type="text" v-model="item.fymc"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.fyje" @input="tjfyje"></el-input>
              </p>
              <p>
               <el-select  size="mini"  v-model="item.sffp" placeholder="请选择">
                <el-option  label="是" value="是"></el-option>
                <el-option  label="否" value="否"></el-option>
              </el-select>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.fph"></el-input>
              </p>
              <p>
               <el-select   size="mini" style="width: 73px;" v-model="item.sl" value-key="mjbm" placeholder="请选择税率"  @change="selectSl">
                  <el-option v-for="item in sloptions" :key="item.mjbm" :label="item.mjmc" :value="item"></el-option>
                </el-select>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.se"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.bz"></el-input>
              </p>
            </li>
            <div style="clear: both"></div>
          </ul>
        </div>       
        </div>
         <div class="dialog_footer" v-if="!showxq">
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun"  :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun"  :loading="submitLoading" @click="addSubmits">保存并提交</el-button>
          <el-button size="small" v-if="!isadd" type="primary"  class="dialog-button bao_cun"  :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary"  class="dialog-button bao_cun"  :loading="submitLoading"  @click="tijiao">提交</el-button>
          <el-button size="small" @click="resetForm('lmshForm')"    class="dialog-button qu_xiao" style="margin-right: 20px">取消</el-button>
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
  <DialogFj   v-if="showWl"
            :dialogTableTitWl="dialogTableTitWl"
            :btWl="'废件列表'"
            :ckmc='ckmc'
            :mx="lmshForm.mx"
            :bmbm="userInfo.daBmbm"
            :dwbm="userInfo.daZzbh"
            :dialogVisibleWl="dialogVisibleWl"
            @closeDialogWl="closeDialogWl"></DialogFj>
  </div>
</template>

<script>
import Dialog from './dialog.vue'
import DialogFj from './dialogFj'
export default {
  components: {Dialog,DialogFj},
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
      ckmc:'',
      dialogTableTitWl:{ sbmc:'资产名称',sbbm:'资产编码',ggxh:'规格型号',jldw:'计量单位',kcsl:'库存数量',ssck:'所属仓库'},
      datatypesWl:'zc',
      showWl:false,
      dialogVisibleWl:false,
      typeWl:'', 

      dialogData:[],
      dialogTableTit:{ userName:'人员名称',userCode:'用户编码',deptList:'部门编码',roleList:'角色信息'},
      datatypes:'ry',
      dialogVisible:false,
      dialogVisibles:false,
      totals:0,
      typrry:'',
      showZb:true,
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
      fullscreenLoading: false,
      fjcz:{
        czr: [
            { required: true, message: '处置人不能为空',trigger: 'blur'},
            { min: 1, message: '请填写处置人'}
          ],
        ckmc: [
            { required: true, message: '仓库名称不能为空',trigger: 'blur'},
            { min: 1, message: '请选择仓库名称'}
          ],
        czsj: [
            { required: true, message: '处置时间不能为空',trigger: 'blur'},
            { min: 1, message: '请选择处置时间'}
          ],  
        czsm: [
            { required: true, message: '处置说明不能为空',trigger: 'blur'},
            { min: 1, message: '请填写处置说明'}
          ],  
      },
      lmshForm: {
        tbr:'',
        tbdw:'',
        tbbm:'',
        tbsj:'',
        fymx: [{htbh: {},fyje:0}],
        mx: [{fpxx: {}}]
      },
      tabindex: 0,
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
      fpOptions: [],
      roadOptions: [],
      searchForm: {},
      ckOptions:'',
      wxfyOptions:'',
      total:10,
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      lyjcindex: 0,
      fpindex: 0,
      multipleSelection: [],
      selectRow: [],
      htbh: {
        wxfydh: ''
      },
      userData:'',
      dataList:[],
      fileList:[],
      deleArr:'',
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
      cklist:[],
      tbdwList:[],
      sloptions:'',
      selectDw:'',
      defaultProps:{
          children: 'children',
          label: 'text'
        },
        TmpwxfyOptions:'',
        tmpArr:'',
        isRouterAlive:true,
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
    showDialogWl(type){
 
       if(this.lmshForm.ckmc==undefined || this.lmshForm.ckmc==''){
         this.$message({
           type: 'error',
           message:'请先选择仓库'
         })
         return
       }
       this.ckmc=this.lmshForm.ckmc
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
          obj.bjmc=val[i].sbmc
          obj.bjbh=val[i].sbbm
          obj.bjbm=val[i].sbbm
          obj.wxbjbh=val[i].sbbm
          obj.ggxh=val[i].ggxh
          obj.jldw=val[i].jldw
          obj.czsl=1
          obj.czdj=0
          obj.czje=0
          this.lmshForm.mx.push(obj)
        }
        for (let i = 0; i < this.lmshForm.mx.length; i++) {
         if(this.lmshForm.mx[i].bjbh=='' || this.lmshForm.mx[i].bjmc==undefined){
            this.lmshForm.mx.splice(i,1)
          }
          
        }
        }
        
       if( this.lmshForm.mx.length==0){
           this.lmshForm.mx= [{bjmc:'',wxfy:0,qtfy:0,wxsl:1}]
       }
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
            case 'czr':{
              this.lmshForm.czr=val.userName
              break;}
            default:
              break;
          }
            
          }
      },
    sigClic (row){
     if(row.tjzt!='已提交'){
this.$refs.multipleTable.toggleRowSelection(row)}
    },
    checkboxInit(row,index){
　　if (row.tjzt!='已提交')//这个判断根据你的情况而定
　　　　return 0;//不可勾选
　　else
　　　　return 1;//可勾选
　　},
    selectSl(val){
       this.lmshForm.fymx[0].sl=val.mjmc
    var n =  val.mjmc;
if(n[ n.length - 1 ] == "%"){
     n = parseFloat(n)/100 ;   
    }
      var sa=Number(this.lmshForm.fymx[0].fyje) * n
      sa=sa.toFixed(4)
     this.lmshForm.fymx[0].se=sa
     console.log( this.lmshForm.fymx[0].se)
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
    handleIconClick (){
      this.searchForm.tbdwdm=this.userInfo.daZzbh
this.searchForm.tbbmdm=this.userInfo.daBmbm
      this.selectDw=''
    },
 
    showAdd () {
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      this.formId = 'gzbx' + new Date().getTime()
      this.lmshForm.djbh = this.formId
      this.lmshForm.tbsj=this.formatDate(new Date())
      this.lmshForm.czsj=this.formatDate(new Date())
      this.fileList=[]
      // if(getQueryString('userCode')){
        this.lmshForm.tbsjc= new Date().getTime()
     this.lmshForm.tbdw = this.userInfo.daZzmc
      this.lmshForm.tbr = this.userInfo.daYhmc
       this.lmshForm.czr = this.userInfo.daYhmc
      this.lmshForm.tbbm =  this.userInfo.daBmmc
      this.lmshForm.tbdwdm=this.userInfo.daZzbh
      // }
    },
    updateFormDia (row, index) {
      this.showDetail = true
      this.isadd = false
      this.showxq = false
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
      this.index = index
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
      this.$api.jdwhbjglgetFjczList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
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
    addSubmits () {
this.$refs['lmshForm'].validate((valid) => {
          if (valid) {
      
           for (let index = 0; index < this.lmshForm.mx.length; index++) {
             if(!this.lmshForm.mx[index].bjmc){
               this.$message({
            type: 'error',
            message: '请选择备件名称!'
          })
          return
             }
        let is=Number(this.lmshForm.mx[index].czsl)
      if(isNaN(is) || is<=0){
        this.$message({
            type: 'error',
            message: '处置数量只能是大于0的整数!'
          })
          return
      }
      if(Number.isInteger(is)==false){
          this.$message({
            type: 'error',
            message: '处置数量只能是大于0的整数!'
          })
          return
      }
     if(isNaN(this.lmshForm.mx[index].czdj) || this.lmshForm.mx[index].czdj<0){
        this.$message({
            type: 'error',
            message: '处置单价只能是大于等于0的数字!'
          })
          return
      }   
      }
      this.lmshForm.id = this.formId
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
      
      this.$api.jdwhbjgladdFjcz(this.lmshForm).then(res => {
        if (res.data.code === 1) {
          this.$api.tjFjcz('?djbhs=' + this.lmshForm.djbh + '&tjzt='+ '已提交').then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
          this.search(this.currentPage, this.pageSize)
          this.resetForm()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
         this.search(this.currentPage, this.pageSize)
          this.resetForm()
        }
      }) 
 
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
 this.$refs['lmshForm'].validate((valid) => {
          if (valid) {
      
           for (let index = 0; index < this.lmshForm.mx.length; index++) {
             if(!this.lmshForm.mx[index].bjmc){
               this.$message({
            type: 'error',
            message: '请选择备件名称!'
          })
          return
             }
        let is=Number(this.lmshForm.mx[index].czsl)
      if(isNaN(is) || is<=0){
        this.$message({
            type: 'error',
            message: '处置数量只能是大于0的整数!'
          })
          return
      }
      if(Number.isInteger(is)==false){
          this.$message({
            type: 'error',
            message: '处置数量只能是大于0的整数!'
          })
          return
      }
     if(isNaN(this.lmshForm.mx[index].czdj) || this.lmshForm.mx[index].czdj<0){
        this.$message({
            type: 'error',
            message: '处置单价只能是大于等于0的数字!'
          })
          return
      }   
      }
      this.lmshForm.id = this.formId
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
      this.$api.jdwhbjgladdFjcz(this.lmshForm).then(res => {
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
    
    tijiao (){
 
     this.$api.tjFjcz('?djbhs=' + this.lmshForm.djbh + '&tjzt='+ '已提交').then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
          this.search(this.currentPage, this.pageSize)
          this.resetForm()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      }).catch(e => {
        this.$message({
            type: 'error',
            message: e
          })
      })
    },
     tijiaos (row){
 
     this.$api.tjFjcz('?djbhs=' + row.djbh + '&tjzt='+ '已提交').then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
          this.search(this.currentPage, this.pageSize)
          this.resetForm()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      }).catch(e => {
        this.$message({
            type: 'error',
            message: e
          })
      })
    },
    updateSubmit () {
       this.$refs['lmshForm'].validate((valid) => {
          if (valid) {
            for (let index = 0; index < this.lmshForm.mx.length; index++) {
        let is=Number(this.lmshForm.mx[index].czsl)
      if(isNaN(is) || is<=0){
        this.$message({
            type: 'error',
            message: '处置数量只能是大于0的整数!'
          })
          return
      }
      if(Number.isInteger(is)==false){
          this.$message({
            type: 'error',
            message: '处置数量只能是大于0的整数!'
          })
          return
      }
     if(isNaN(this.lmshForm.mx[index].czdj) || this.lmshForm.mx[index].czdj<0){
        this.$message({
            type: 'error',
            message: '处置单价只能是大于等于0的数字!'
          })
          return
      }   
      }
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
      this.$api.jdwhbjgleditFjcz(this.lmshForm).then(res => {
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
            } else {
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
          this.$api.jdwhbjgldelFjczByDjbhs('?djbhs=' + djbharr).then(res => {
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
    tablable (num) {
      this.tabindex = num
    },
    tjje () {
      let hjje = 0
      this.lmshForm.mx.map(item => {
        if (item.czsl && item.czdj) {
          hjje += Number(item.czsl) * Number(item.czdj)
          item.czje = Number(item.czsl) * Number(item.czdj)
        }
      })
      this.lmshForm.czje = hjje
      // this.lmshForm.fymx[0].fyje=hjje
    },
    tjfyje () {
      let hjje = 0
      this.lmshForm.fymx.map(item => {
        hjje += Number(item.fyje)
      })
      this.lmshForm.fyje = hjje
    },
    addzibiao () {
      this.lmshForm.mx.push({mid: this.lmshForm.id, htbh: {}})
    },
    deletezibiao (index) {
      this.lmshForm.mx.splice(index, 1)
      this.tmpArr=[]
      console.log(node)
      for(let i=0;i<this.lmshForm.mx.length;i++){
        this.tmpArr.push(this.lmshForm.mx[i])
      }
      this.wxfyOptions=[]
      var [...tmps]=this.TmpwxfyOptions
      this.wxfyOptions=tmps
      console.log(this.tmpArr,this.wxfyOptions)
      for(let i=0;i<this.tmpArr.length;i++){
        for(let j=0;j<this.wxfyOptions.length;j++){
         if(this.tmpArr[i].ID==this.wxfyOptions[j].ID){
           this.wxfyOptions.splice(j,1)
         }
      }
      }
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
      this.showZb=true
      this.loading=false
      if(res!==undefined && res.target==undefined){
     if(this.$refs[res] != undefined){
        this.$refs[res].resetFields();
        }
      }
      this.showxq=false
      this.showDetail = false
      this.lmshForm = {
        tbr:'',
        tbdw:'',
        tbbm:'',
        tbsj:'',
        fymx: [{htbh: {}}],
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
    fuzhi (item, index) {
      this.lyjcindex = index
    },
    fapiao (item, index) {
      this.fpindex = index
    },
    selectHt (node) {
      this.lmshForm.mx[this.lyjcindex].ID = node.ID
      this.lmshForm.mx[this.lyjcindex].bjmc = node.BJMC
      this.lmshForm.mx[this.lyjcindex].ggxh = node.GGXH
      this.lmshForm.mx[this.lyjcindex].bjbm = node.BJBH
      this.lmshForm.mx[this.lyjcindex].jldw = node.JLDW
      this.lmshForm.mx[this.lyjcindex].fjid = node.FJID
      this.tmpArr=[]
      console.log(node)
      for(let i=0;i<this.lmshForm.mx.length;i++){
        this.tmpArr.push(this.lmshForm.mx[i])
      }
      this.wxfyOptions=[]
      var [...tmps]=this.TmpwxfyOptions
      this.wxfyOptions=tmps
      console.log(this.tmpArr,this.wxfyOptions)
      for(let i=0;i<this.tmpArr.length;i++){
        for(let j=0;j<this.wxfyOptions.length;j++){
         if(this.tmpArr[i].ID==this.wxfyOptions[j].ID){
           this.wxfyOptions.splice(j,1)
         }
      }
      }

       
    },
    selectFp (node) {
      this.lmshForm.fymx[this.fpindex].fplx = node.FPLX
      this.lmshForm.fymx[this.fpindex].sl = node.FPSL
      let hjje = 0
      this.lmshForm.mx.map(item => {
        hjje += Number(item.fyje)
      })
      this.lmshForm.fyje = hjje
    },
    selectCk (val) {
      this.lmshForm.mx=[{}]
      this.ckmc=val
      this.$api.jdwhbjglgetShbjInfByDw('?ckmc='+val + '&tbdwdm='+ this.userInfo.daZzbh).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.wxfyOptions = resp.data.data
           var [...tmp]= resp.data.data
          this.TmpwxfyOptions=tmp
        }
      }).catch(e => {})
    },
    getQmldbb () {
      this.$api.jdwhxjwxgetXjType('?mjlxbm=48').then(resp => {

        if (resp.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.sloptions = resp.data
          console.log(this.sloptions)
        }
      }).catch(e => {
      })
      this.$api.jdwhckglgetCkAll().then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
        this.cklist = resp.data.data
        }
      }).catch(e => {
      })
      
      this.$api.jdwhxjwxgetFpInfo().then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.fpOptions = resp.data.data
        }
      }).catch(e => {})
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
    },
    getTbdw(code){
      this.fullscreenLoading=true
        this.$api.getUserDw('?yhdw='+code).then(res=>{
          if(res.data.code===1){
            this.fullscreenLoading=false
          this.tbdwList= res.data.data
          this.zkx=this.tbdwList[0].id
          this.selectDw=this.tbdwList[0].text
          this.searchForm.tbdwdm= this.tbdwList[0].id
           this.searchForm.tbdwdm=this.userInfo.daZzbh
           this.searchForm.tbbmdm=this.userInfo.daBmbm
          this.search(this.currentPage, this.pageSize)
          }
        })
    },
    handleNodeClick(data){
      this.selectDw=data.text
      this.searchForm.tbdwdm= data.id
       $('.tbdw').hide()
    },
     selectDwTree(){
      $('.tbdw').show()
    },
  },
  beforeRouteEnter (to, from, next) {
   next(vm=>{
   let cuserid = getQueryString()
   let match=localStorage.getItem('cuserid')
if(cuserid!='null'&&cuserid){
    if(cuserid != match){
      location.reload()
    }
    }
   })
 },
  mounted () {
    this.getTbdw(this.userInfo.daZzbh,this.userInfo.daBmbm)
    this.getQmldbb()
    // this.tableHeight = $('#fjcz')[0].offsetHeight
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
  #fjcz{
    .tab_lable{
      height: 30px;
    }
    .Tab{
       border: 1px solid #D5D6D7;
      border-radius: 4px;
      padding: 5px 10px;
      cursor: pointer;
    }
    
    .tabselect{
      vertical-align: bottom;
      color: white;
      background-color: #00a2fd;
    }
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    min-width: 1100px;
    overflow: auto;
    .conter_table{
      height: calc(100% - 97px);
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
              width: calc((100% - 100px)/8);
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
              width: calc((100% - 100px)/8);
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
          .fymx{
            width: 100%;
            height: 40px;
            float: left;
            box-sizing: border-box;
            border: 1px solid #D5D6D7;
            color: #52575D!important;
            font-size: 12px;
            border-right: none;
            border-bottom: none;
            &:nth-of-type(1){
              // height: 60px;
            }
            &:nth-last-of-type(1){
              border-bottom: 1px solid #D5D6D7;
            }
            >span{
              width: calc((100% - 100px)/7);
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
