/**
* ----设备巡检
*/
<template>
  <div id="sbxj" class="styleSheets" style="height: 100%"  v-loading.fullscreen.lock="fullscreenLoading"  v-if="isRouterAlive">
    <div class="bill-header">
  		<div class="bill-title">
  			<span>设备巡检</span>
  			 <ul>
	          <li @click="showAdd()" class="Hight_btn">新增</li>
	          <li @click="deleteData()">删除</li>
	        </ul>
  		</div>
      <div class="bill-search">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px" prop="" class="">
            <div class="tbdw">
              <el-tree :accordion="true" node-key="id" :default-expanded-keys="[zkx]" :data="tbdwList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
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
            <el-select clearable  size="mini" style="width: 148px;" v-model="searchForm.xjlx" value-key="mjbm" placeholder="请选择巡检类型">
                <el-option v-for="item in qmbbOptions" :key="item.mjbm" :label="item.mjmc" :value="item.mjmc"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px" prop="" class="">
            <el-select clearable  size="mini" style="width: 148px;" v-model="searchForm.xjzq" value-key="mjbm" placeholder="请选择巡检周期">
                <el-option v-for="item in qmbbOptions1" :key="item.mjbm" :label="item.mjmc" :value="item.mjmc"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item style="margin-bottom: 0px" prop="" class="">
          <el-select clearable  size="mini" style="width: 148px;" v-model="searchForm.tjzt"  placeholder="请选择提交状态">
                <el-option label="已提交" value="已提交"></el-option>
                <el-option label="未提交" value="未提交"></el-option>
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
              start-placeholder="检查开始日期"
              end-placeholder="检查结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button size="mini"  style="background-color: #DF4D4A;border-color:transparent;color: #fff" @click="search(1,10)">查询</el-button>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button @click.native="resizeDate" size="mini">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
  	</div>
    <div class="conter_table">
      <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"
                style="width: 100%;height: calc(100% - 46px)!important;overflow:auto;"
                row-class-name="row_class"
                border
                @row-click="sigClic"
                @row-dblclick="dbclick"
                v-loading="loading"
                :row-style="rowClass"
                @selection-change="handleSelectionChange">
 
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
              <el-table-column align="left" prop="mx_jcx" label="检查项"></el-table-column>
              <el-table-column prop="mx_jcjg" width="80" label="检查结果"></el-table-column>
              <el-table-column prop="mx_bz" label="备注"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="tjzt"  width="80" label="状态"  show-overflow-tooltip></el-table-column> -->
        <el-table-column align="center" class-name="column-caoz" label="状态" width="80">
          <template scope="scope">
            <span v-if="scope.row.tjzt!='已提交'" style="color:#D34C42; " >{{scope.row.tjzt}}</span>
            <span v-if="scope.row.tjzt=='已提交'"   >{{scope.row.tjzt}}</span>
          </template>
        </el-table-column>
        <el-table-column sortable align="left" width="120" prop="xjlx" label="巡检类型" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" width="100" prop="xjzq" label="巡检周期" show-overflow-tooltip></el-table-column>
        <el-table-column align="left" sortable width="100"  prop="jcsj" label="检查时间"></el-table-column>
        <el-table-column align="left" prop="xjr" width="130" label="巡检人"  ></el-table-column>
         <el-table-column align="left" sortable width="100"  prop="tbsj" label="填报日期"></el-table-column>
        <el-table-column sortable align="left" prop="tbbm" label="填报部门" show-overflow-tooltip></el-table-column>
        <el-table-column  sortable align="left" prop="tbdw" label="填报单位" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="xjms" label="巡检描述" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="100">
          <template scope="scope">
            <span v-if="scope.row.tjzt!='已提交'" style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span v-if="scope.row.tjzt!='已提交'" style="color:#00a2fd;cursor: pointer;text-align: center" @click="tijiao(scope.row, scope.$index)">提交</span>
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
    
    <el-dialog :show-close="false" fullscreen class="data-dialog el-updata-div"  :close-on-click-modal="false" :visible.sync="showDetail" width="580px" >
      <span slot="title">
          <span class="titleclasschild"  @click="resetForm('lmshForm')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>日常巡检</span>
      </span>
      <el-dialog append-to-body title="检查项列表" :close-on-click-modal="false" :visible.sync="showjcx" width="580px" :class="'jcx_dialog'">
        
      <div class="jcx_wraps">
       <el-table
    ref="multipleSelectionjcx"
    row-class-name="row_class"
     @row-click="clickjcxRow"
    :row-style="{fontFamily: '宋体', fontSize: '12px'}"
    :data="jcxlist"
    tooltip-effect="dark"
    height="463px"
    style="width: 100%;margin-bottom:15px;"
    @selection-change="handleSelectionJcx">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="jcx"
      label="检查项内容"
      >
    </el-table-column>
    <el-table-column
      prop="ssdw"
      label="所属单位"
       width="100"
      >
    </el-table-column>
  </el-table>
   <footer class="footer">
      <div style="padding: 6px;text-align:center">
        <el-pagination
          @size-change="jcx_handleSizeChange"
          @current-change="jcx_handleCurrentChange"
          :current-page="jcx_currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="jcx_total">
        </el-pagination>
      </div>
    </footer>
      <div class="dialog_footer jcxfooter" style="text-align:center;margin-top:0px;height:50px;line-height:50px">
         <el-button size="small"  type="primary"  class="dialog-button bao_cun" @click="selectJcx">确定</el-button>
         <el-button size="small"  class="dialog-button qu_xiao" @click="cancel">取消</el-button>
      </div>
    </div>
      </el-dialog>
       <el-form v-if="showxq"  :model="lmshForm"   ref="lmshForm" label-width="100px" class="demo-lmshForm">
      <div class="showxq" v-if="showxq" style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>单据编号: </span>
              <span>{{lmshForm.id}}</span>
            </p>
            <p  class=" addJLD">
              <span>巡检类型: </span>
              <span>{{lmshForm.xjlx}}</span>
            </p>
            <p   class=" addJLD">
              <span>巡检周期: </span>
              <span>{{lmshForm.xjzq}}</span>
            </p>
            <p   class=" addJLD">
              <span>巡检周期: </span>
              <span>{{lmshForm.xjzq}}</span>
            </p>
            <p   class=" addJLD">
              <span>检查时间: </span>
              <span>{{lmshForm.jcsj}}</span>
            </p>
            <p   class=" addJLD">
              <span>巡检人: </span>
              <span>{{lmshForm.xjr}}</span>
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
              <span>巡检描述: </span>
              <span>{{lmshForm.xjms}}</span>
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
      prop="mx_jcx"
      label="检查项"
      >
    </el-table-column>
    <el-table-column
      prop="mx_jcjg"
      width="100"
      label="检查结果">
    </el-table-column>
    <el-table-column
     width="400"
      prop="mx_bz"
      label="备注">
    </el-table-column>
  </el-table>
      </div>
      </el-form>
      <el-form v-if="!showxq"  :model="lmshForm" :rules="rules" ref="lmshForm" label-width="100px" class="demo-lmshForm">
              <!-- <el-form-item  class=" addJLD"  label="单据编号" prop="id">
                <span class="edit_text">{{lmshForm.id}}</span>
              </el-form-item> -->
              <el-form-item class=" addJLD"  label="巡检类型" prop="xjlx">
               <el-select clearable  size="mini"  v-model="lmshForm.xjlx" value-key="mjbm" placeholder="请选择" @change="selectHt">
                <el-option v-for="item in qmbbOptions" :key="item.mjbm" :label="item.mjmc" :value="item.mjmc"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item class=" addJLD" label="巡检周期" prop="xjzq" >
                 <el-select clearable  size="mini" style="width: 148px;" v-model="lmshForm.xjzq" value-key="mjbm" placeholder="请选择巡检周期">
                <el-option v-for="item in qmbbOptions1" :key="item.mjbm" :label="item.mjmc" :value="item.mjmc"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item class=" addJLD" label="检查时间" prop="jcsj">
                <el-date-picker
               
                v-model="lmshForm.jcsj"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
              </el-form-item>
              <el-form-item class=" addJLD" label="巡检人" prop="xjr">
                <el-input size="mini" type="text" v-model="lmshForm.xjr" @focus="showDialog('xjr')"></el-input>
              </el-form-item>
            
              <el-form-item class=" addJLD_long" label="巡检描述" prop="xjms">
                <el-input size="mini" type="textarea" v-model="lmshForm.xjms"></el-input>
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
                 accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.doc,.docx,.xls,.xlsx,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.DOC,.DOCX,.XLS,.XLSX"
                :on-remove='xgfile'
                :on-preview="yulan"
                :on-success="upload">
                <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
              
              <el-upload
               v-if="!isadd&&!showxq"
                class="upload-demo"
                action="http://61.141.223.10:8001/common/uploadFile"
                multiple
                accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.doc,.docx,.xls,.xlsx,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.DOC,.DOCX,.XLS,.XLSX"
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
          <div class="group-form-name hide-form-item"><div class="operator"  @click="showZb=!showZb"><span class="name">检查项</span><a :class="showZb?'el-icon-minus':'el-icon-plus'" href="javascript:;"   style="color: #999;font-size:12px;text-decoration: none;font-weight:900"></a></div><span class="line"></span></div>
              <div class="dialog_warps" v-if="showZb"> 
             <div class="zibnr" v-if="addzb" style="overflow-x: auto;overflow-y: hidden;">
          <div class="iconwarp" style="text-algin:right; ">
             <el-button size="small" type="primary"  class="dialog-button bao_cun" style=" " @click="addzibiao">增行</el-button>
          </div>
          <ul>
            <li>
              <span>操作</span><span>序号</span><span>检查项</span><span>检查结果</span><span>备注</span>
            </li>
            <li v-for="(item, index) in lmshForm.mx" :key="index">
              <p>
                <i class="el-icon-delete" title="删除" @click="deletezibiao(index)"></i>
              </p>
              <p>
                <el-input size="mini" type="text" :value="index+1"></el-input>
              </p>
              <p>

                <el-input v-if="!showxq" autosize size="mini" type="textarea" v-model="item.mx_jcx" placeholder="请选择" @focus="showDialogWl('jcx')" @input.native="onResize"></el-input> 

              </p>
              <p>
                <el-select  clearable   size="mini" style="height:29px;" v-model="item.mx_jcjg" value-key="mjbm" placeholder="请选择">
                <el-option v-for="(item,index) in qmbbOptions2" :key="index" :label="item.mjmc" :value="item.mjmc"></el-option>
              </el-select>
              </p>
              <p>
                <el-input size="mini" autosize type="textarea" v-model="item.mx_bz" @input.native="onResize"></el-input>
              </p>
            </li>
            <div style="clear: both"></div>
          </ul>
        </div>
        </div>
        
         <div class="dialog_footer" v-if="!showxq">
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit('lmshForm')">保存</el-button>
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit_up('lmshForm')">保存并提交</el-button>
          <el-button size="small" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit('lmshForm')">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit_up('lmshForm')">提交</el-button>
          <el-button size="small" @click="resetForm('lmshForm')" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
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
  <DialogJcx   v-if="showWl"
            :dialogTableTitWl="dialogTableTitWl"
            :btWl="'检查项选择'"
            :mx="lmshForm.mx"
            :bmbm="userInfo.daBmbm"
            :dwbm="userInfo.daZzbh"
            :dialogVisibleWl="dialogVisibleWl"
            @closeDialogWl="closeDialogWl"></DialogJcx>
 
  </div>
</template>
<script>
import Dialog from './dialog.vue'
import Api from '@/mock/index'
import DialogJcx from './dialogJcx' 
export default {

  components: {Dialog,DialogJcx},
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
      dialogTableTitWl:{ jcx:'检查项内容',ssdw:'所属单位' },
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
      showZb:true,
      fullscreenLoading:false,
      rules:{
          xjzq: [
            { required: true, message: '巡检周期不能为空',trigger: 'blur'},
            { min: 1, message: '请选择巡检周期',trigger: 'blur'}
          ],
          xjlx: [
            { required: true, message: '巡检类型不能为空', trigger: 'blur' },
            { min: 1, message: '请选择巡检类型  ', trigger: 'blur' }
          ],
          xjr: [
            { required: true, message: '巡检人不能为空', trigger: 'blur' },
            { min: 1, message: '请选择巡检人  ', trigger: 'blur' }
          ],
          xjms: [
            { required: true, message: '巡检描述不能为空', trigger: 'blur' },
            { min: 1, message: '请填写巡检描述', trigger: 'blur' }
          ],
          jcsj: [
            { required: true, message: '检查时间不能为空', trigger: 'blur' },
            { min: 1, message: '请选择检查时间  ', trigger: 'blur' }
          ],
        
        },
      lmshForm: {
        xjlx:'',
        tbr:'',
        tbdw:'',
        tbbm:'',
        xjr:'',
        tbsj:'',
        mx: [{
          mx_jcjg:'正常'
        }],
        xjzq:''
      },
      index: '',
      isadd: false,
      addzb: true,
      submitLoading: false,
      showxq: false,
      showSearch: false,
      showjcx: false,
      jcxIndex:0,
      loading: false,
      tableHeight: 300,
      tableData: [],
      tableData1: [],
      jcxlist:[],
      showBhForm: false,
      searchCriteria: false,
      userData: '',
      qmbbOptions: [],
      qmbbOptions1: [],
      qmbbOptions2: [],
      qmbbOptions3: [],
      roadOptions: [],
      searchForm: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      jcx_total:0,
      jcx_currentPage: 1,
      jcx_pageSize: 10,
      htbh: {
        xjlx: ''
      },
      personelForm: {},
      dataList:[],
      fileList:[],
      showDetail: false,
      multipleSelection: [],
       selectRow: [],
      multipleSelectionjcx:[],
      deleArr:[],
      tabindex: 0,
      tbdwList:[],
      selectDw:'',
      defaultProps:{
          children: 'children',
          label: 'text'
        },
      infor:{
        tbr:'',
        tbdw:'',
        tbbm:'',
        xjr:'',
        tbsj:''
      },

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
      isRouterAlive:true,
      currentRow:''
    }
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
    resizeDate(){
      this.selectDw = ''
      this.searchForm={}

      this.search(1,10)
    },
    showDialogWl(type){
      //  this.jcxIndex=index
      this.$refs['lmshForm'].validate((valid) => {
          if (valid) {
      this.typeWl=type
        this.showWl=true
     this.dialogVisibleWl = true
   
             } else {
            return false;
          }
        });
        
      
      },
      closeDialogWl(val){
        this.showWl=false
        this.dialogVisibleWl= false
        if(val==undefined || val=='undefined'){
          return
        }
      if(val.length>0){
        console.log(1111)
        for(let i=0;i<val.length;i++){
          let obj={}
          obj.mx_jcx=val[i].jcx
          obj.id=val[i].id
           obj.mx_jcjg= '正常'
          this.lmshForm.mx.push(obj)
        }
        
        for (let i = 0; i < this.lmshForm.mx.length; i++) {
         if(this.lmshForm.mx[i].mx_jcx=='' || this.lmshForm.mx[i].mx_jcx==undefined){
            this.lmshForm.mx.splice(i,1)
          }
          
        }
        } 
      },
    clears (){
      if(this.selectDw == ''){
        this.searchForm.tbdwdm=this.userInfo.daZzbh
      this.searchForm.tbbmdm= this.userInfo.daBmbm
      }
    },
    checkboxInit(row,index){
　　if (row.tjzt=='已提交')//这个判断根据你的情况而定
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
      closeDialog(val){
        this.dialogVisible = false
 
        if(val==undefined || val=='undefined'){
          return
        }
        if (val.userName) {
          switch (this.typrry) {
            case 'xjr':{
              this.lmshForm.xjr=val.userName
              break;}
            default:
              break;
          }
            
          }
      },
    rowClass({ row, rowIndex }) {
      if (this.selectRow.includes(row.id)) {
        return { "background-color": "rgba(185, 221, 249, 0.75)" };
      }
    },
    sigClic (row){
      if(row.tjzt!='已提交'){
this.$refs.multipleTable.toggleRowSelection(row)}
    },
    dbclick (row){
     this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
     this.$api.getFilesDataById('?id='+this.lmshForm.id).then(res=>{
       if(res.data.code==1){
         this.fileList=res.data.data
       }
     }).catch(er=>{
     })
    },
    handleIconClick (data){
      this.searchForm.tbdwdm=this.userInfo.daZzbh
      this.searchForm.tbbmdm=data.id
      this.selectDw=''
    },
    onResize (e) {
        let h=e.target.clientHeight+'px'
        console.log(e.target.parentElement.parentElement.parentElement)
      e.target.parentElement.parentElement.parentElement.style.height=h
    },

    jcx (index,currentPage,pageSize,formName){ 
       this.jcxIndex=index
      this.$refs[formName].validate((valid) => {
          if (valid) {
          this.loading=true
      this.$api.getXclxmxjList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&xclxid='+this.lmshForm.xjlx+'&xczq='+this.lmshForm.xjzq+
      '&ssdwid='+'').then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.loading=false
         this.jcxlist=resp.data.data.list
         for(let i=0;i<this.lmshForm.mx.length;i++){
        for(let j=0;j<this.jcxlist.length;j++){
         if(this.lmshForm.mx[i].id==this.jcxlist[j].id){
           this.jcxlist.splice(j,1)
         }
      }
      }
     
         this.showjcx=true
      for (let i = 0; i < this.lmshForm.mx.length; i++) {
        if(this.lmshForm.mx[i].mx_jcx=='' || this.lmshForm.mx[i].mx_jcx==undefined){
            this.lmshForm.mx.splice(i,1)
          }
      }
       this.jcx_total= resp.data.data.total - this.lmshForm.mx.length
    
        }
      }).catch(e => {
        this.loading=false
      })  
             } else {
            return false;
          }
        });

      
      
    },
    handleSelectionJcx(val){
      this.multipleSelectionjcx = val;
    },
    clickjcxRow(row){
      this.$refs.multipleSelectionjcx.toggleRowSelection(row)
    },

    selectJcx (){
        if(this.multipleSelectionjcx.length===0){
          this.$message({
            message: '请先选择检查项',
            type: 'error'
          })
          return
        }else{
        for(let i=0;i<this.multipleSelectionjcx.length;i++){
          let obj={}
          obj.mx_jcx=this.multipleSelectionjcx[i].jcx
          obj.id=this.multipleSelectionjcx[i].id
           obj.mx_jcjg= '正常'
          this.lmshForm.mx.push(obj)
        }

        for (let index = 0; index < this.lmshForm.mx.length; index++) {
       if(this.lmshForm.mx[index].mx_jcx== undefined){
        this.lmshForm.mx.splice(index,1)
      }
          
        }
        
        this.$refs.multipleSelectionjcx.clearSelection()
        this.showjcx=false
        }
       
    },
    cancel (){
      this.$refs.multipleSelectionjcx.clearSelection()
      this.showjcx=false
    },
 
    showAdd () {
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      this.formId = 'sbxj' + new Date().getTime()
      this.lmshForm.id = this.formId
      this.lmshForm.tbsjc= new Date().getTime()
      // if(getQueryString('userCode')){
      this.lmshForm.jcsj= this.formatDate(new Date())
      this.lmshForm.xjr = this.userInfo.daYhmc
       this.lmshForm.xjrcode =  this.userInfo.daYhbm
     this.lmshForm.tbdw = this.userInfo.daZzmc
      this.lmshForm.tbr = this.userInfo.daYhmc
      this.lmshForm.tbbm =  this.userInfo.daBmmc
      this.fileList=[]
      // }
      this.lmshForm.tbsj=this.formatDate(new Date())
    },
    updateFormDia (row, index) {
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.$api.getFilesDataById('?id='+this.lmshForm.id).then(res=>{
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
      this.htbh = {
        xjlx: row.xjlx
      }
    },
    showBhFormDia (row) {
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
     this.$api.getFilesDataById('?id='+this.lmshForm.id).then(res=>{
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
      this.$api.jdwhxjwxgetRcxjList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
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
    tijiao (row){
    let obj={
        ids:row.id,
        tjzt:'已提交'
      }
this.$api.editRcxjZtByIds('?'+$.param(obj)).then(res => {
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
      })
    },
    addSubmit_up(formName){
      if(this.lmshForm.mx==[]){
        this.$message({
            type: 'error',
            message: '请选择检查项!'
          })
          return
      }
      for (let index = 0; index < this.lmshForm.mx.length; index++) {
       if(!this.lmshForm.mx[index].mx_jcx){
         this.$message({
            type: 'error',
            message: '检查项不能为空!'
          })
          return
       }
      }
      this.$refs[formName].validate((valid) => {
          if (valid) {
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
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
       })
      }
      this.lmshForm.tbdwdm= this.userInfo.daZzbh
      this.lmshForm.tbbmdm=this.userInfo.daBmbm
      this.lmshForm.tjzt= '已提交'
      this.$api.jdwhxjwxaddRcxj(this.lmshForm).then(res => {
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
    addSubmit (formName) {
      if(this.lmshForm.mx==[]){
        this.$message({
            type: 'error',
            message: '请选择检查项!'
          })
          return
      }
      for (let index = 0; index < this.lmshForm.mx.length; index++) {
       if(!this.lmshForm.mx[index].mx_jcx){
         this.$message({
            type: 'error',
            message: '检查项不能为空!'
          })
          return
       }
      }
      this.$refs[formName].validate((valid) => {
          if (valid) {
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
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
       })
      }
      this.lmshForm.tbdwdm= this.userInfo.daZzbh
      this.lmshForm.tbbmdm=this.userInfo.daBmbm
      this.lmshForm.tjzt= '未提交'
      this.$api.jdwhxjwxaddRcxj(this.lmshForm).then(res => {
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
    updateSubmit_up (formName){
      let obj={
        ids:this.lmshForm.id,
        tjzt:'已提交'
      }
this.$api.editRcxjZtByIds('?'+$.param(obj)).then(res => {
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
      })
    },
    updateSubmit (formName) {
       this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.dataList.length>0){
      for (let index = 0; index < this.dataList.length; index++) {
        this.dataList[index].file_id=this.lmshForm.id
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
      this.$api.jdwhxjwxeditRcxj(this.lmshForm).then(res => {
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
            djbharr = djbharr + item.id + ','
          })
          djbharr = djbharr.slice(0, djbharr.length - 1)
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if(this.multipleSelection[i].tjzt=='已提交'){
          this.$message({
                type: 'error',
                message:'已提交的任务单不能删除'
              })
          return
        };
        
      }
          this.$api.jdwhxjwxdelRcxjByIds('?ids=' + djbharr).then(res => {
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
    addzibiao () {
      this.lmshForm.mx.push({mx_jcjg:'正常'})
    },
    deletezibiao (index) {
      this.lmshForm.mx.splice(index,1)
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
      this.$message({
        type: 'success',
        message: '导入成功!'
      })
    },
    daochu () {
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
    jcx_handleSizeChange (val) {
      this.jcx_pageSize = val
      this.jcx(this.jcxIndex,this.jcx_currentPage, this.jcx_pageSize)
    },
    jcx_handleCurrentChange (val) {
      this.jcx_currentPage = val
      this.jcx(this.jcxIndex,this.jcx_currentPage, this.jcx_pageSize)
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
        xjr:'',
        tbsj:'',
        xcfx: '上行',
        xjzq:'',
        mx: [{
          mx_jcjg:'正常'
        }]
      }
      this.htbh = {
        xjlx: ''
      }
    },
    submitAddForm () {},
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
    getQmldbb () {
      this.$api.jdwhxjwxgetXjType('?mjlxbm=23').then(resp => {

        if (resp.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.qmbbOptions = resp.data
          
        }
      }).catch(e => {
      })
      this.$api.jdwhxjwxgetXjType('?mjlxbm=24').then(resp => {
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
      this.$api.jdwhxjwxgetXjType('?mjlxbm=26').then(resp => {
        if (resp.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.qmbbOptions2 = resp.data
        }
      }).catch(e => {
      })
    },
    tablable (num) {
      this.tabindex = num
    },
    selectHt (value) {
      this.lmshForm.xjzq=''
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
        if (resp.data.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.fullscreenLoading=false
           this.tbdwList= resp.data.data
           this.zkx=this.tbdwList[0].id
           this.searchForm.tbdwdm=this.userInfo.daZzbh
            this.searchForm.tbbmdm=this.userInfo.daBmbm
          this.search(this.currentPage, this.pageSize)
        }
      }).catch(e => {
      })
    },
    handleNodeClick(data){
      this.selectDw=data.text
      this.searchForm.tbdwdm=this.userInfo.daZzbh
      this.searchForm.tbbmdm=data.id
      // console.log(this.searchForm,data)
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
      this.searchForm.tbdwdm=this.userInfo.daZzbh
      this.searchForm.tbbmdm=this.userInfo.daBmbm
    },
  },
 async created(){
   this.initUser()
//  this.$store.dispatch('saveUser','wangqiang')
    // console.log(this.$store.getters.getUser)
  },
  mounted () {
    
    this.getTbdw(this.userInfo.daZzbh,this.userInfo.daBmbm)
    this.getQmldbb()
    // this.tableHeight = $('#sbxj')[0].offsetHeight
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
.jcxfooter{
      text-align: center;
      height: 50px;
      line-height: 50px;
    }
  #sbxj{
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    overflow: auto;
    min-width: 1100px;
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
          z-index: 99;
        }
        .el-tree__empty-text,.el-tree__empty-block{
          position: relative;
          width: 120px;
          height: 26px;
          min-height: 26px;
          line-height: 26px;
          top: 0px;
        }
    .conter_table{
      height: calc(100% - 97px);
      min-height: 300px;
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
        position: relative;
        padding: 0 15px 0 0 0;
        overflow: hidden;
        text-align: center;
        box-sizing: border-box;
        ul{
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 15px;
          li{
             width: 100%;
            min-height: 39px;
            float: left;
            vertical-align: middle;
            box-sizing: border-box;
            border: 1px solid #D5D6D7;
            color: #52575D!important;
            font-size: 12px;
            border-right: none;
            overflow: hidden;
            border-bottom: none;
            &:nth-last-of-type(1){
              border-bottom: 1px solid #D5D6D7;
            }
            >span{
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
              &:nth-of-type(3){
                width: 50%;
              }
              &:nth-of-type(4){
                width: 100px;
              }
              &:nth-of-type(5){
                width:  calc(50% - 200px);
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
              height: 100%;
              line-height: 39px;
              float: left;
              border-right: 1px solid #D5D6D7;
              &:nth-of-type(1){
                width: 50px;
              }
              &:nth-of-type(2){
                width:50px;
              }
              &:nth-of-type(3){
                width: 50%;
              }
              &:nth-of-type(4){
                width: 100px;
              }
              &:nth-of-type(5){
                width: calc(50% - 200px);
              }
              i{
                color: #00a2fd;
                margin:0 5px;
              }
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
