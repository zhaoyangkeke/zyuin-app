/**
* ----库存管理
*/
<template>
  <div id="sbxj" class="styleSheets" style="height: 100%" v-loading.fullscreen.lock="fullscreenLoading"  v-if="isRouterAlive">
    <div class="bill-header">
  		<div class="bill-title">
  			<span>库存管理</span>
  			 <ul>
	          <!-- <li @click="showAdd()"  class="Hight_btn" style="border:1px solid #D0D0D0;border-right:none;	border-radius:5px 0px 0px 5px">调拨</li>
            <li @click="diaobo()"   style="border:1px solid #D0D0D0;	border-radius:0px 5px 5px 0px">调拨记录</li> -->
	        </ul>
  		</div>
      <div class="bill-search" style="">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px" prop="" class="">
            <div class="tbdw">
              <el-tree :accordion="true" :data="tbdwList"  node-key="id" :default-expanded-keys="[zkx]" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
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
            <el-form-item class="" prop="sbmc">
              <el-input clearable v-model="searchForm.sbmc" size="mini" placeholder="请输入设备名称"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px"  prop="" class="">
             <el-select clearable size="mini" v-model="searchForm.ssck" placeholder="请选择仓库" value-key="ssck">
          <el-option
           v-for="(item,index) in cklist"
          :key="index"
          :label="item.ssck"
          :value="item.ssck">
         </el-option>
          </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px"  prop="" class="">
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
                @row-dblclick="dbclick"
                @row-click="sigClic"
               :row-style="{fontFamily: 'Microsoft YaHei', fontSize: '12px'}"
               v-loading="loading"
                 >
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column sortable align="left" prop="sbmc" label="设备名称"  show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="sbbm" label="设备编码" show-overflow-tooltip></el-table-column>
        <el-table-column  sortable align="left" prop="ggxh" label="规格型号" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="jldw" label="计量单位"></el-table-column>
        <el-table-column sortable align="left" prop="kcsl" label="库存数量"></el-table-column>
        <el-table-column sortable align="left" prop="ssck" label="所属仓库" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="150">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
            
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="pandian(scope.row)">盘点</span>
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


    <el-dialog fullscreen class="data-dialog el-updata-div" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" :show-close="false">
      <span slot="title">
        <span class="titleclasschild" @click="resetForm('lmshForm')">
          <i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i>
        </span>
        <span>{{kc_titie}}</span>
      </span>
      <el-form v-if="showxq"  :model="lmshForm"   ref="lmshForm" label-width="100px" class="demo-lmshForm">
      <div class="showxq" v-if="showxq" style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>设备名称: </span>
              <span>{{lmshForm.sbmc}}</span>
            </p>
            <p   class=" addJLD">
              <span>规格型号: </span>
              <span>{{lmshForm.ggxh}}</span>
            </p>
            <p  class=" addJLD">
              <span>计量单位: </span>
              <span>{{lmshForm.jldw}}</span>
            </p>
             <p   class=" addJLD">
              <span>库存数量: </span>
              <span>{{lmshForm.kcsl}}</span>
            </p> 
             <p   class=" addJLD">
              <span>所属仓库: </span>
              <span>{{lmshForm.ssck}}</span>
            </p> 
 
      </div>
      </el-form>

      <el-form v-if="!showxq"
        :model="lmshForm"
        :rules="kcgl"
        ref="lmshForm"
        label-width="100px"
        class="demo-lmshForm"
      >
        <el-form-item  v-if="!showxq" class="addJLD" label="调出仓库" prop="dcck">
          <el-select size="mini" v-model="lmshForm.dcck" placeholder="请选择"
             value-key="ssck"
             @change="selectCk"
             >
          <el-option
           v-for="(item,index) in cklist"
          :key="index"
          :label="item.ssck"
          :value="item.ssck">
         </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  v-if="!showxq" class="addJLD" label="调入仓库" prop="drck">
         <el-select size="mini" v-model="lmshForm.drck" placeholder="请选择" value-key="ssck">
          <el-option
           v-for="(item,index) in cklist"
          :key="index"
          :label="item.ssck"
          :value="item.ssck">
         </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="addJLD" label="设备名称" prop="sbmc">
         <el-input  size="mini" type="text" v-model="lmshForm.sbmc" @focus="Sb" placeholder="请选择设备"></el-input>
        </el-form-item>
        <el-form-item class="addJLD" label="设备编码" prop="sbbm">
          <span class="edit_text">{{lmshForm.sbbm}}</span>
        </el-form-item>
        <el-form-item class="addJLD" label="规格型号" prop="ggxh">
          <span class="edit_text">{{lmshForm.ggxh}}</span>
        </el-form-item>
         <el-form-item class="addJLD" label="计量单位" prop="jldw">
           <span class="edit_text">{{lmshForm.jldw}}</span>
        </el-form-item>
         <el-form-item class="addJLD" label="库存数量" prop="kcsl">
         <span class="edit_text">{{lmshForm.kcsl}}</span>
        </el-form-item>
         <el-form-item  v-if="!showxq" class="addJLD" label="调拨数量" prop="dbsl">
          <el-input size="mini" type="text" v-model="lmshForm.dbsl"></el-input>
        </el-form-item>
        <el-form-item   v-if="showxq" class="addJLD" label="所属仓库" prop="ssck">
          <el-input size="mini" type="text" v-model="lmshForm.ssck"></el-input>
        </el-form-item>
        <el-form-item  v-if="!showxq" class=" addJLD_long" label="调拨说明" prop="bz">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lmshForm.dbsm"></el-input>
        </el-form-item>
        <div class="  dialog_footer " v-if="!showxq">
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit('lmshForm')">保存</el-button>
          <el-button size="small" @click="resetForm('lmshForm')"    class="dialog-button qu_xiao" style="margin-right: 20px">取消</el-button>
        </div>
      </el-form>

      <el-dialog append-to-body :show-close="false" :close-on-click-modal="false" :visible.sync="showSb" width="580px" :class="'jcx_dialog'">
       <span slot="title">
        <span class="titleclasschild" @click="showSb=false">
          <i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i>
        </span>
        <span>选择设备</span>
      </span> 
     

      <div class="jcx_wraps">
       <el-table
    ref="multipleSelectionSb"
    row-class-name="row_class"
     @row-click="clickSbRow"
    :row-style="{fontFamily: '宋体', fontSize: '12px'}"
    :data="Sblist"
    tooltip-effect="dark"
    height="463px"
    style="width: 100%;margin-bottom:15px;"
    @selection-change="handleSelectionSb">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="sbmc"
      label="设备名称"
      >
    </el-table-column>
    <el-table-column
      prop="sbbm"
      label="设备编码"
      >
    </el-table-column>
    <el-table-column
      prop="ggxh"
      label="规格型号"
      >
    </el-table-column>
  </el-table>
   <footer class="footer">
      <div style="padding: 6px;text-align:center">
        <el-pagination
          @size-change="Sb_handleSizeChange"
          @current-change="Sb_handleCurrentChange"
          :current-page="Sb_currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="Sb_total">
        </el-pagination>
      </div>
    </footer>
      <div class="dialog_footer jcxfooter" style="text-align:center;margin-top:0px;height:50px;line-height:50px">
         <el-button size="small" type="primary"  class="dialog-button bao_cun" @click="dbSb">确定</el-button>
         <el-button size="small"  class="dialog-button qu_xiao" @click="cancel">取消</el-button>
      </div>
    </div>
      </el-dialog>

    </el-dialog>
    <el-dialog fullscreen  class="data-dialog el-updata-div  qdjl"  :show-close="false" :close-on-click-modal="false" :visible.sync="showPandian"  >
       <span slot="title">
        <span class="titleclasschild" @click="showPandian=false">
          <i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i>
        </span>
        <span>盘点记录</span>
      </span> 
 
     <!-- <el-form  :inline="true">
              <el-form-item class="" label="" prop="" style="padding-left:16px">
               <el-select clearable  size="mini" style="width: 148px;" v-model="pdlx"   placeholder="请选择盘点类型">
                <el-option  label="盘盈"  value="盘盈"></el-option>
                <el-option  label="盘亏"  value="盘亏"></el-option>
              </el-select>
              </el-form-item>
            <el-form-item class="" label="" prop="" >
              <el-button  size="mini" @click="sc_pd(1,10)" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
            </el-form-item>
             <el-form-item class="" label="" prop="" style="float:right">
              <el-button  size="mini"  @click="addPd" style="background-color: #DF4D4A;border-color: transparent;color: #fff">增加</el-button>
            </el-form-item>
     </el-form> -->

      <div class="jcx_wraps" style="height:100%">
       <el-table
    ref="multipleSelectionpd"
    row-class-name="row_class"
     @row-click="clickSbRow"
    :row-style="{fontFamily: '宋体', fontSize: '12px'}"
    :data="pdlist"
    tooltip-effect="dark"
    :v-loading="loading"
    style="width: 100%;height: calc(100% - 46px);overflow:auto;"
    @selection-change="handleSelectionpd">
    <el-table-column
      type="index"
      label="序号"
      align="center"
      width="55">
    </el-table-column>
    <el-table-column
      prop="sbmc"
      label="设备名称"
      >
    </el-table-column>
    <el-table-column
      prop="pdlx"
      label="盘点类型"
      >
    </el-table-column>
    <el-table-column
      prop="pdsl"
      show-overflow-tooltip
      label="盘点数量"
      >
    </el-table-column>
    <el-table-column
      prop="tbr"
      show-overflow-tooltip
      label="盘点人"
      >
    </el-table-column>
    <el-table-column
      prop="tbsj"
      show-overflow-tooltip
      label="盘点日期"
      >
    </el-table-column>
    <el-table-column
      prop="pdsm"
      show-overflow-tooltip
      label="盘点说明"
      >
    </el-table-column>
   
  </el-table>
   <footer class="footer">
      <div style="padding: 6px;text-align:center">
        <el-pagination
          @size-change="pd_handleSizeChange"
          @current-change="pd_handleCurrentChange"
          :current-page="pd_currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pd_total">
        </el-pagination>
      </div>
    </footer>
 
    </div>
 
      </el-dialog>
          <el-dialog fullscreen class="data-dialog el-updata-div" 
    :close-on-click-modal="false" 
  :visible.sync="showPany"
  :show-close="false"
  >
   <span slot="title">
        <span class="titleclasschild" @click="showPany=false">
          <i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i>
        </span>
        <span>盘点</span>
      </span> 

     <el-form v-if="!showxq" :model="form" :rules="pdsb" ref="pdForm" label-width="100px" class="demo-lmshForm">
              <el-form-item class=" addJLD" label="盘点日期" prop="tbsj">
                <el-date-picker
                v-model="form.tbsj"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
              </el-form-item>
            <el-form-item class="addJLD" label="盘点类型" prop="pdlx">
               <el-select clearable  size="mini"   v-model="form.pdlx"   placeholder="请选择盘点类型">
                <el-option  label="盘盈"  value="盘盈"></el-option>
                <el-option  label="盘亏"  value="盘亏"></el-option>
              </el-select>
              </el-form-item>
              <!-- <el-form-item class=" addJLD" label="盘点人" prop="tbr">
                <el-input size="mini" type="text"  v-model="form.tbr"></el-input>
              </el-form-item> -->
              <el-form-item class="addJLD" label="盘点数量" prop="pdsl" >
              <el-input size="mini"   type="number" v-model="form.pdsl" placeholder="请输入盘点数量"></el-input>
            </el-form-item>
              <el-form-item class="addJLD_long"  label="盘点说明" prop="pdsm"  >
              <el-input type="textarea"  v-model="form.pdsm"></el-input>
            </el-form-item>
          <div class="group-form-name hide-form-item"><div class="operator"  @click="showZb=!showZb"><span class="name">设备信息</span><a :class="showZb?'el-icon-minus':'el-icon-plus'" href="javascript:;"   style="color: #999;font-size:12px;text-decoration: none;font-weight:900"></a></div><span class="line"></span></div>
          <div v-if="showZb">
             <p   class=" addJLD"   >
              <span>设备名称: </span>
              <span>{{form.sbmc}}</span>
            </p>
            <p   class=" addJLD">
              <span>设备编码: </span>
              <span>{{form.sbbm}}</span>
            </p>
            <p  class=" addJLD">
              <span>规格型号: </span>
              <span>{{form.ggxh}}</span>
            </p>
             <p   class=" addJLD">
              <span>库存数量: </span>
              <span>{{form.kcsl}}</span>
            </p> 
            <p   class=" addJLD">
              <span>所属仓库: </span>
              <span>{{form.ssck}}</span>
            </p> 
 
          </div>
      <div class="dialog_footer" v-if="!showxq">
        <el-button size="small" type="primary" @click="addSubmit_pd" class="dialog-button bao_cun">保存</el-button>
         <el-button size="small"   @click="qx_pd" class="dialog-button qu_xiao">取消</el-button>
      </div>
  </el-form>
</el-dialog>
 <el-dialog fullscreen  class="data-dialog el-updata-div"  :show-close="false" :close-on-click-modal="false" :visible.sync="showDb"  >
       <span slot="title">
        <span class="titleclasschild" @click="showDb=false">
          <i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i>
        </span>
        <span>调拨记录</span>
      </span> 
     <el-form  :inline="true">
              <el-form-item class="" label="" prop="" style="padding-left:16px">
                <el-select clearable size="mini" v-model="searchForm.dcck" placeholder="请选择仓库" value-key="ssck">
          <el-option
           v-for="(item,index) in cklist"
          :key="index"
          :label="item.ssck"
          :value="item.ssck">
         </el-option>
          </el-select>
              </el-form-item>
            <el-form-item class="" label="" prop="" >
              <el-button  size="mini" @click="sc_db(1,10)" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
            </el-form-item>
     </el-form>

      <div class="jcx_wraps">
       <el-table
    ref="multipleSelectionpd"
    row-class-name="row_class"
     @row-click="clickSbRow"
    :row-style="{fontFamily: '宋体', fontSize: '12px'}"
    :data="dblist"
    tooltip-effect="dark"
    height="430px"
    style="width: 100% ;"
    :v-loading="loading"
    @selection-change="handleSelectionpd">
    <el-table-column
      type="index"
      label="序号"
      align="center"
      width="55">
    </el-table-column>
    <el-table-column
      prop="sbmc"
      label="设备名称"
      >
    </el-table-column>
    <el-table-column
      prop="ggxh"
      label="规格型号"
      >
    </el-table-column>
    <el-table-column
      prop="dcck"
      show-overflow-tooltip
      label="调出仓库"
      >
    </el-table-column>
    <el-table-column
      prop="drck"
      show-overflow-tooltip
      label="调入仓库"
      >
    </el-table-column>
    <el-table-column
      prop="dbsl"
      label="调拨数量"
      >
    </el-table-column>
    <el-table-column
      prop="dbsm"
      show-overflow-tooltip
      label="调拨说明"
      >
    </el-table-column>
   <el-table-column
      prop="tbr"
      show-overflow-tooltip
      label="操作人"
      >
    </el-table-column>
    <el-table-column
      prop="tbsj"
      show-overflow-tooltip
      label="调拨时间"
      >
    </el-table-column>
    <el-table-column
      prop="tbdw"
      show-overflow-tooltip
      label="所属单位"
      >
    </el-table-column>
    <el-table-column
      prop="tbbm"
      show-overflow-tooltip
      label="所属部门"
      >
    </el-table-column>
  </el-table>
   <footer class="footer">
      <div style="padding: 6px;text-align:center">
        <el-pagination
          @size-change="db_handleSizeChange"
          @current-change="db_handleCurrentChange"
          :current-page="db_currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="db_total">
        </el-pagination>
      </div>
    </footer>
 
    </div>
      </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
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
      form:{},
      pdlx:'',
      showZb:true,
      sbxx:'',
      showDb:false,
      showPandian:false,
       pd_total:0,
      pd_currentPage: 1,
      pdlist:'',
      pd_pageSize: 10,
      db_total:0,
      db_currentPage: 1,
      db_pageSize: 10,
      fullscreenLoading: false,
      Sb_total:0,
      Sb_currentPage: 1,
      Sb_pageSize: 10,
       showSb:false,
      Sblist:'',
       kcgl: {
        dcck: [
          { required: true, message: "调出仓库不能为空", trigger: "blur" },
          { min: 1, message: "请选择调出仓库" }
        ],
        drck: [
          { required: true, message: "调入仓库不能为空", trigger: "blur" },
          { min: 1, message: "请选择调入仓库" }
        ],
        sbmc: [
          { required: true, message: "设备名称不能为空", trigger: "blur" },
          { min: 1, message: "请选择设备名称" }
        ],
        dbsl: [
          { required: true, message: "调拨数量不能为空", trigger: "blur" },
          { min: 1, message: "请输入调拨数量" }
        ],
      },
      pdsb:{
        tbsj: [
          { required: true, message: "盘点时间不能为空", trigger: "blur" },
          { min: 1, message: "请选择盘点时间" }
        ],
        pdlx: [
          { required: true, message: "盘点类型不能为空", trigger: "blur" },
          { min: 1, message: "请选择盘点类型" }
        ],
        pdsl: [
          { required: true, message: "盘点数量不能为空", trigger: "blur" },
          { min: 1, message: "请输入盘点数量" }
        ],
        pdsm: [
          { required: true, message: "盘点说明不能为空", trigger: "blur" },
          { min: 1, message: "请输入盘点说明" }
        ],
      },
      lmshForm: {
      },
      index: '',
      showPany:false,
      showPank:false,
      kc_titie:'',
      isadd: false,
      addzb: true,
      submitLoading: false,
      showxq: false,
      showSearch: false,
      loading: false,
      tableHeight: 300,
      tableData: [],
      tableData1: [],
      dbsl:'',
      showBhForm: false,
      searchCriteria: false,
      roadOptions: [],
      cklist: [],
      sblist: [],
      dblist:[],
      searchForm: {dcck:''},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      htbh: {
        xjlx: ''
      },
      personelForm: {},
      showDetail: false,
      multipleSelection: [],
      tabindex: 0,
      userData:'',
      panForm:{},
      tbdwList:[],
      selectDw:'',
      defaultProps:{
          children: 'children',
          label: 'text'
        },
      multipleSb:[],
      multiplePd:[],
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
    }
  },
 async created(){
   this.initUser()
 
  },
  methods: {
  sigClic (row){
this.$refs.multipleTable.toggleRowSelection(row)
    },
    diaobo () {
      this.showDb=true
      this.loading=true
       this.$api.getDbInfoList('?pageNum=' + this.db_currentPage + '&pageSize=' +  this.db_pageSize ).then(resp => {
        if (resp.data.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.loading=false
          this.dblist = resp.data.data.list
 
          this.db_total=resp.data.data.total
 
        }
      }).catch(e => {
         this.loading=false
      })
    },
    pandian(val){
      this.sbxx=val
      this.form=val
      this.form.pdr= this.userInfo.daYhmc
      this.sbxx.sbid=this.sbxx.id
      this.sbxx.id +=this.sbxx.id
      this.loading=true
      this.form.tbdwdm=this.userInfo.daZzbh
      this.form.tbbmdm=this.userInfo.daBmbm
      this.form.tbdw = this.userInfo.daZzmc
      this.form.tbr = this.userInfo.daYhmc
      this.form.tbbm =  this.userInfo.daBmmc
      this.form.tbsj=this.formatDate(new Date())
      this.form.tbsjc= new Date().getTime()
      this.showPany=true
    
    },
    deletPD (row) {
 
        this.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$api.delPdjlByIds('?ids=' + row.id).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            this.sc_pd(this.pd_currentPage, this.pd_pageSize)
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

    },
       addPd(){
      


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
    addSubmit_pd(){
      this.sbxx.pdlx=this.form.pdlx
       this.sbxx.pdsl=this.form.pdsl
        this.sbxx.pdsm=this.form.pdsm
      this.sbxx.tbdwdm=this.userInfo.daZzbh
      this.sbxx.tbbmdm=this.userInfo.daBmbm
      this.sbxx.tbdw = this.userInfo.daZzmc
      this.sbxx.tbr = this.userInfo.daYhmc
      this.sbxx.tbbm =  this.userInfo.daBmmc
      this.sbxx.tbsj=this.formatDate(new Date())
      this.sbxx.tbsjc= new Date().getTime()
   this.$refs['pdForm'].validate((valid) => {
          if (valid) {
 this.$api.addPdjl(this.sbxx).then(resp => {
        if (resp.data.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.showPany=false
          this.form={}
         this.sc_pd(this.pd_currentPage, this.pd_pageSize)
          this.search(this.currentPage, this.pageSize)
        }
      }).catch(e => {

      })
       } else {
            return false;
          }
        });
    },
    qx_pd(){
  this.showPany=false
  this.$refs['pdForm'].resetFields();
  this.form={}
    },
    handleSelectionpd(val){
      this.multiplePd = val
    },
     handleSelectionSb(val){
      this.multipleSb = val
    },
    sc_pd(currentPage,pageSize){
 this.$api.getPdjlInfoList('?pageNum=' +currentPage + '&pageSize=' +  pageSize +'&sbid='+ this.sbxx.sbid+'&pdlx='+ this.pdlx).then(resp => {
        if (resp.data.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.pdlist = resp.data.data.list
          this.pd_total=resp.data.data.total
        }
      }).catch(e => {
      })
    },
    pd_handleSizeChange (val) {
      this.pd_pageSize = val
      this.sc_pd(this.pd_currentPage, this.pd_pageSize)
    },
    pd_handleCurrentChange (val) {
      this.pd_currentPage = val
      this.sc_pd(this.pd_currentPage, this.pd_pageSize)
    },
    sc_db(currentPage,pageSize){
 this.$api.getDbInfoList('?pageNum=' +currentPage + '&pageSize=' +  pageSize+ '&dcck=' +  this.searchForm.dcck).then(resp => {
        if (resp.data.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.dblist = resp.data.data.list
   
          this.db_total=resp.data.data.total
        }
      }).catch(e => {
      })
    },
     db_handleSizeChange (val) {
      this.db_pageSize = val
      this.sc_db(this.db_currentPage, this.db_pageSize)
    },
    db_handleCurrentChange (val) {
      this.db_currentPage = val
      this.sc_db(this.db_currentPage, this.db_pageSize)
    },
    Sb_handleSizeChange (val) {
      this.Sb_pageSize = val
      this.Sb(this.Sb_currentPage, this.Sb_pageSize)
    },
    Sb_handleCurrentChange (val) {
      this.Sb_currentPage = val
      this.Sb(this.Sb_currentPage, this.Sb_pageSize)
    },
    Sb (currentPage,pageSize ){ 
      if(!this.lmshForm.dcck){
        this.$message({
            message: '请先选择仓库',
            type: 'error'
          })
          return
      }
     this.$api.jdwhckglgetBjAll('?pageNum=' + this.Sb_currentPage + '&pageSize=' +  this.Sb_pageSize +'&ssck=' + this.lmshForm.dcck).then(resp => {
        if (resp.data.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.Sblist = resp.data.data.list
          this.Sb_total=resp.data.data.total
           this.showSb=true
        }
      }).catch(e => {
      })
      
      
    },
     dbSb (){
        if(this.multipleSb.length===0){
          this.$message({
            message: '请先选择设备',
            type: 'error'
          })
          return
        }else{
        this.lmshForm.sbmc=this.multipleSb[0].sbmc
        this.lmshForm.sbbm=this.multipleSb[0].sbbm
        this.lmshForm.kcsl=this.multipleSb[0].kcsl
        this.lmshForm.jldw=this.multipleSb[0].jldw
        this.lmshForm.ggxh=this.multipleSb[0].ggxh
        this.$refs.multipleSelectionSb.clearSelection()
        this.showSb=false
        }
        
    },
    cancel (){
      this.$refs.multipleSelectionSb.clearSelection()
      this.showSb=false
    },
   clickSbRow(row){
      this.$refs.multipleSelectionSb.clearSelection()
      this.$refs.multipleSelectionSb.toggleRowSelection(row)
    },
    addSubmitPand(str){
      this.panForm.ispy=str
      this.panForm.dbsl=this.dbsl
      this.$api.pdBj(this.panForm).then(resp => {

        if (resp.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.showPany=false
          this.showPank=false
         this.search(this.currentPage, this.pageSize)
        }
      }).catch(e => {

      })
    },
 

    handleIconClick (){
      this.searchForm.tbdwdm=this.userInfo.daZzbh
this.searchForm.tbbmdm=this.userInfo.daBmbm
      this.selectDw=''
    },
    showAdd () {
      this.kc_titie='设备调拨'
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      // if(getQueryString('userCode')){
        this.lmshForm.tbdwdm=this.userInfo.daZzbh
      this.lmshForm.tbbmdm=this.userInfo.daBmbm
      this.lmshForm.tbdw = this.userInfo.daZzmc
      this.lmshForm.tbr = this.userInfo.daYhmc
      this.lmshForm.tbbm =  this.userInfo.daBmmc
      this.lmshForm.tbsj=this.formatDate(new Date())
      this.lmshForm.tbsjc= new Date().getTime()
      // }
    },
    showBhFormDia (row) {
      this.kc_titie='设备详情'
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
    },
    dbclick (row){
      this.kc_titie='设备详情'
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
    },
    search (currentPage, pageSize) {
      console.log(1)
      this.loading = true
      this.showSearch = false
      this.$api.jdwhckglgetBjAll('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
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
      if(this.lmshForm.dcck==this.lmshForm.drck){
        this.$message({
            message: '同一仓库，不能调拨',
            type: 'error'
          })
          return
      }
      this.$refs['lmshForm'].validate((valid) => {
          if (valid) {
      let is=Number(this.lmshForm.dbsl)
      if(isNaN(is) || is<=0){
        this.$message({
            type: 'error',
            message: '调拨数量只能是大于0的整数!'
          })
          return
      }
      if(Number.isInteger(is)==false){
          this.$message({
            type: 'error',
            message: '调拨数量只能是大于0的整数!'
          })
          return
      }
           this.$api.jdwhckgldbBj(this.lmshForm).then(resp => {
        if (resp.data.code != 1) {
          this.$message({
            message: resp.data.msg,
            type: 'error'
          })
        } else {
          this.$message({
            message: '调拨成功',
            type: 'success'
          })
          this.search(1, 10)
            this.resetForm()
        }
      }).catch(e => {
      })
            } else {
            return false;
          }
        });
     
        
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
      console.log(this.$refs[res])
      this.loading=false

      if(res!==undefined && res.target==undefined){
        if(this.$refs[res] != undefined){
        this.$refs[res].resetFields();
        }
      }
      this.showxq = false
      this.showDetail = false
      this.lmshForm = {
      }
      this.htbh = {
        xjlx: ''
      }
    },
    submitAddForm () {},
    selectCk(value){
      this.$api.jdwhckglgetBjAllByCkmc('?ssck=' + value).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.sblist = resp.data.data
        }
      }).catch(e => {
      })
    },
    selectSb(value){
        this.lmshForm.sbmc=value.sbmc
        this.lmshForm.ggxh=value.ggxh
        this.lmshForm.id=value.id
        this.lmshForm.jldw=value.jldw
        this.lmshForm.kcsl=value.kcsl
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
    getQmldbb () {
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
    },
    tablable (num) {
      this.tabindex = num
    },
     getTbdw(code){
       this.fullscreenLoading=true
        this.$api.getUserDw('?yhdw='+code).then(res=>{
          if(res.data.code===1){
          this.tbdwList= res.data.data
          this.zkx=this.tbdwList[0].id
          this.selectDw=this.tbdwList[0].text
          this.searchForm.tbdwdm= this.tbdwList[0].id
           this.searchForm.tbdwdm=this.userInfo.daZzbh
           this.searchForm.tbbmdm=this.userInfo.daBmbm
          this.search(this.currentPage, this.pageSize)
          this.fullscreenLoading=false
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
 
  mounted () {
    this.getTbdw(this.userInfo.daZzbh,this.userInfo.daBmbm)
    this.getQmldbb()
    // this.search(1, 10)
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
  #sbxj{
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    min-width: 1100px;
    height: 100%;
    overflow: auto;
    .header{}
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
