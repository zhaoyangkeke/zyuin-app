/**
* ----路面损坏
*/
<template>
  <div id="wxdj" class="styleSheets" style="height: 100%" v-loading.fullscreen.lock="fullscreenLoading"  v-if="isRouterAlive">
    <div class="bill-header">
  		<div class="bill-title">
  			<span>维修登记</span>
  			 <ul>
	          <!-- <li @click="deleteData()" style="border:1px solid #D0D0D0;	border-radius:5px">删除</li> -->
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
             <el-select clearable  size="mini" style="width: 148px;" v-model="searchForm.gzxt" value-key="mjbm" placeholder="请选择故障系统">
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
             <el-select clearable v-model="searchForm.yszt" size="mini" placeholder="请选择验收状态">
                <el-option label="未验收" value="未验收"></el-option>
                <el-option label="已验收" value="已验收"></el-option>
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
              start-placeholder="登记开始日期"
              end-placeholder="登记结束日期">
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
                v-loading="loading"
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
        <!-- <el-table-column align="center" prop="djbh" label="单据编号"  show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="bxdh" label="报修单号" show-overflow-tooltip></el-table-column> -->
        <el-table-column sortable align="center" class-name="column-caoz" label="验收状态" width="80">
          <template scope="scope">
            <span style="color:#D34C42; " v-if="scope.row.yszt==='已验收'">已验收</span>
            <span style="color:#454C53; " v-if="scope.row.yszt==='未验收'">未验收</span>
          </template>
        </el-table-column>
        <el-table-column sortable  align="left" prop="gzlx" label="故障系统" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="sbmc" label="设备名称" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" width="100"  prop="gzdj" label="故障等级" show-overflow-tooltip></el-table-column>
        <el-table-column sortable width="100"  align="left" prop="bzrq" label="报障日期"></el-table-column>
        <el-table-column sortable align="left" prop="bgr" label="报告人" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="xcwxr" label="现场维修人" show-overflow-tooltip></el-table-column>
       <el-table-column sortable align="left" prop="tbdw" label="填报单位" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="tbbm" label="填报部门" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="gzms" label="故障描述" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" width="80"  class-name="column-caoz" label="操作" >
          <template scope="scope">
            <span v-if="scope.row.yszt!='已验收'" style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
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
    
   <el-dialog fullscreen class="data-dialog el-updata-div" title="维修登记"   :visible.sync="showDetail" width="580px"  :show-close="false">
     <span slot="title">
          <span class="titleclasschild"  @click="resetForm('wxdj_lmshForm')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>维修登记</span>
      </span>
      <el-form v-if="showxq"  :model="lmshForm"   ref="wxdj_lmshForm" label-width="100px" class="demo-lmshForm">
      <div class="showxq" v-if="showxq" style="font-size:0px" >
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
      <el-form v-if="!showxq" :rules="wxdj"  :model="lmshForm" ref="wxdj_lmshForm" label-width="100px" class="demo-lmshForm">
              <!-- <el-form-item  class=" addJLD"  label="单据编号" prop="djbh">
               <span class="edit_text">{{lmshForm.djbh}}</span>
              </el-form-item> -->
              <el-form-item class=" addJLD"  label="报修单号" prop="bxdh">
               <span class="edit_text">{{lmshForm.bxdh}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="设备名称" prop="sbmc" >
               <span class="edit_text">{{lmshForm.sbmc}}</span>
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
              <el-form-item class=" addJLD_long" label="故障描述" prop="gzms">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lmshForm.gzms"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="现场情况描述" prop="xcqkms">
                 <el-input size="mini" type="textarea" v-model="lmshForm.xcqkms"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD_long" label="维修结果描述" prop="wxjgms">
                 <el-input size="mini" type="textarea" v-model="lmshForm.wxjgms"></el-input>
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
              
              <div class="dialog_footer" v-if="!showxq">
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun"  @click="addSubmit('wxdj_lmshForm')">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary"  class="dialog-button bao_cun"   @click="updateSubmit('wxdj_lmshForm')">保存</el-button>
          <el-button size="small" @click="resetForm('wxdj_lmshForm')"   class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
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
import DialogSp from './dialogSp.vue'
export default {
  components: {Dialog,Dialogs,DialogSp},
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
      dialogTableTitSp:{ lxbh:'立项编号',lxmc:'立项名称',xmlxmc:'项目类型名称',ysje:'预算金额' },
      datatypesSp:'zc',
      showSp:false,
      dialogVisibleSp:false,
      typeSP:'',

       dialogData:[],
      dialogTableTit:{ userName:'人员名称',userCode:'用户编码',deptList:'部门编码',roleList:'角色信息'},
      datatypes:'ry',
      dialogVisible:false,
      dialogVisibles:false,
      totals:0,
      typrry:'',
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
      fullscreenLoading: false,
       wxdj:{
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
      },
      index: '',
      isadd: false,
      addzb: true,
      showXzTx:false,
      submitLoading: false,
      showxq: false,
      showSearch: false,
      loading: false,
      tableHeight: 300,
      tableData: [],
      showBhForm: false,
      searchCriteria: false,
      sbmcOptions: [],
      roadOptions: [],
      searchForm: {},
      htbh: {
        bxdh: ''
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      personelForm: {},
      showDetail: false,
      userData:'',
      multipleSelection: [],
      selectRow: [],
      dataList:[],
      fileList:[],
      qmbbOptions1: [],
      tbdwList:[],
      selectDw:'',
      defaultProps:{
          children: 'children',
          label: 'text'
        },
      deleArr:'',
      showXzsb:false,
      treeList:[],
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
      fullscreenLoading:false,
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
        this.lmshForm.lxsph=val.lxbh
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
            case 'xcwxr':{
              this.lmshForm.xcwxr=val.userName
              break;}
            case 'zdysr':{
              this.lmshForm.qrr=val.userName
              this.lmshForm.ysrcode=val.userCode
              break;}
            default:
              break;
          }
            
          }
      },
       closeDialogs(val){
        this.dialogVisibles = false
        if(val==undefined || val=='undefined'){
          return
        }
       this.lmshForm.txqrr=''
          for(let i=0;i< val.length;i++){
            if(i!=val.length-1){
              this.lmshForm.txqrr+=val[i].userName+','
            this.lmshForm.txqrrcode+=val[i].userCode+','
            }else{
              this.lmshForm.txqrr+=val[i].userName
            this.lmshForm.txqrrcode+=val[i].userCode
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
    showAdd () {
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      this.formId = 'wxdj' + new Date().getTime()
      this.lmshForm.tbsjc= new Date().getTime()
      this.lmshForm.djbh = this.formId
    },
    updateFormDia (row, index) {
      console.log(row)
      if(row.yszt=='已验收'){
          this.$message({
            type: 'error',
            message: '已验收的任务单不能编辑'
          })
          return
      }
      this.$api.jdwhxjwxgetInfoByIDjbh('?djbh=' + row.bxdh).then(res => {
        if (res.data.code === 1) {
         this.lmshForm = JSON.parse(JSON.stringify(row))
          this.lmshForm.isww=res.data.data.isww
           this.showDetail = true
          this.isadd = false
          this.showxq = false
          this.index = index
          this.$api.getFilesDataById('?id='+row.djbh).then(res=>{
       if(res.data.code==1){
         this.fileList=res.data.data
         for (let index = 0; index < this.fileList.length; index++) {
           this.fileList[index].name = this.fileList[index].file_yname
         }
         this.dataList=this.fileList
       }
     }).catch(er=>{
     })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })

    },
    showBhFormDia (row) {
    this.$api.jdwhxjwxgetInfoByIDjbh('?djbh=' + row.bxdh).then(res => {
        if (res.data.code === 1) {
         this.lmshForm = JSON.parse(JSON.stringify(row))
         console.log(this.lmshForm)
          this.lmshForm.isww=res.data.data.isww
           this.showDetail = true
           this.showxq = true
           this.$api.getFilesDataById('?id='+row.djbh).then(res=>{
            if(res.data.code==1){
                this.fileList=res.data.data
              }
            }).catch(er=>{
              })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    dbclick (row){
      this.$api.jdwhxjwxgetInfoByIDjbh('?djbh=' + row.bxdh).then(res => {
        if (res.data.code === 1) {
         this.lmshForm = JSON.parse(JSON.stringify(row))
         console.log(this.lmshForm)
          this.lmshForm.isww=res.data.data.isww
           this.showDetail = true
           this.showxq = true
           this.$api.getFilesDataById('?id='+row.djbh).then(res=>{
            if(res.data.code==1){
                this.fileList=res.data.data
              }
            }).catch(er=>{
              })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
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
      this.$api.jdwhxjwxgetWxdjList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
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
    addSubmit () {
      this.$api.jdwhxjwxaddWxdj(this.lmshForm).then(res => {
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
    },
    updateSubmit () {
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
          this.$api.jdwhxjwxdelWxdjByDjbhs('?djbhs=' + djbharr).then(res => {
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
        let form = JSON.parse(JSON.stringify(row))
        form.spzt = '已下发'
        this.$api.upateSgjh(form).then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: '审核通过!'
            })
            this.search(this.currentPage, this.pageSize)
            this.resetForm()
          }
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
      this.loading=false
      if(res!==undefined && res.target==undefined){
      if(this.$refs[res] != undefined){
        this.$refs[res].resetFields();
        }
      }
      this.showxq=false
      this.showDetail = false
      this.lmshForm = {
        xcfx: '上行'
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
    selectHt (value) {
      this.lmshForm.bxdh = value.bxdh
      this.lmshForm.sbmc = value.sbmc
      this.lmshForm.ggxh = value.ggxh
      this.lmshForm.bzrq = value.bzrq
      this.lmshForm.bgr = value.bgr
      this.lmshForm.gzms = value.gzms
      this.lmshForm.xcqkms = value.xcqkms
    },
    getQmldbb () {
      // this.$api.selRyByDwAndBm('?pageNum=' + this.zcPage + '&pageSize=' + this.zcSize + '&' + $.param(this.xz)).then(resp => {
      //   if (resp.status !== 200) {
      //     this.$message({
      //       message: '出错了',
      //       type: 'error'
      //     })
      //   } else {
      //     this.ysrList = resp.data.data.list
      //     this.zctotal= resp.data.data.total
      //   }
      // }).catch(e => {
      // })
      this.$api.jdwhxjwxgetBxdInfo('').then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.sbmcOptions = resp.data.data
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
           this.searchForm.tbdwdm=this.userInfo.daZzbh
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
      this.searchForm.tbdwdm=this.userInfo.daZzbh
      this.searchForm.tbbmdm=data.id
       $('.tbdw').hide(this.searchForm)
    },
     selectDwTree(){
      $('.tbdw').show()
    },
  },
 
  mounted () {
 
    this.getTbdw(this.userInfo.daZzbh,this.userInfo.daBmbm)
    this.getQmldbb()
    // this.tableHeight = $('#wxdj')[0].offsetHeight
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
  #wxdj{
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    min-width: 1200px;
    overflow: auto;
    .header{}
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
            // text-indent: 1em;
            text-align: center;
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
              width: calc(100%/8);
              display: inline-block;
              height: 100%;
              float: left;
              line-height: 39px;
              text-align: center;
              background: #F7F8F9;
              border-right: 1px solid #D5D6D7;
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
              width: calc(100%/8);
              height: 100%;
              line-height: 39px;
              float: left;
              border-right: 1px solid #D5D6D7;

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
