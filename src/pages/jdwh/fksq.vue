/**
* ----路面损坏
*/
<template>
  <div id="fksq" class="styleSheets" style="height: 100%" v-loading.fullscreen.lock="fullscreenLoading"  v-if="isRouterAlive">
    <div class="bill-header">
  		<div class="bill-title">
  			<span>付款申请</span>
  			 <ul>
	          <li @click="showAdd()" class="Hight_btn">新增</li>
	          <li @click="deleteData()">删除</li>
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
          <el-form-item style="margin-bottom: 0px"  prop="" class="">
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
        <el-table-column
          type="selection"
           :selectable='checkboxInit'
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="40">
        </el-table-column>
        <el-table-column type="expand">
          <template scope="scope">
            <el-table class="demo-table-expand"
                      :data="scope.row.jsmx"
                      border>
              <el-table-column type="index"  label="序号"  align="center"  width="40"></el-table-column>
              <el-table-column prop="wxfydh" label="维修费用单号"></el-table-column>
              <el-table-column prop="zcmc" label="资产名称"></el-table-column>
              <el-table-column prop="jsje" label="结算金额(元)"></el-table-column>
              <el-table-column prop="fysm" label="费用说明"></el-table-column>
              <el-table-column prop="bz" label="备注"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="left" label="状态" sortable width="80">
        <template scope="scope">
            <span style="color:#D34C42;text-align: left;cursor: pointer;" v-if="scope.row.spzt==='3501'" >自由</span>
            <span style="color:#3EC481;text-align: left;cursor: pointer;" v-if="scope.row.spzt==='3502'">审批中</span>
            <span style="color:#00a2fd;text-align: left;cursor: pointer;" v-if="scope.row.spzt==='3503'">已审批</span>
        </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="djbh" label="单据编号"  show-overflow-tooltip></el-table-column> -->
        <!-- <el-table-column sortable align="left" prop="dfdw" label="对方单位" show-overflow-tooltip></el-table-column> -->
        <!-- <el-table-column align="left" prop="ssyh" label="所属银行" show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="yhzh" label="银行账户" show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="zhm" label="账户名" show-overflow-tooltip></el-table-column> -->
        <el-table-column sortable align="left" width="100" prop="jsje" label="结算金额(元)" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column sortable align="left" prop="ssht" label="所属合同" show-overflow-tooltip></el-table-column> -->
        <el-table-column sortable align="left" prop="tbr" label="填报人" show-overflow-tooltip></el-table-column>
        <el-table-column width="100"  sortable align="left" prop="tbsj" label="填报日期" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="tbdw" label="填报单位" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="tbbm" label="填报部门" show-overflow-tooltip></el-table-column>
         <el-table-column align="center" class-name="column-caoz" label="操作" width="100">
          <template scope="scope">
            <span  v-if="scope.row.spzt == '3501'" style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
             <span v-if="scope.row.spzt == '3501'"  style="color:#00a2fd;cursor: pointer;text-align: center" @click="shenpi(scope.row, scope.$index)">提交</span>
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
    
    <el-dialog fullscreen class="data-dialog el-updata-div" :close-on-click-modal="false" :visible.sync="showDetail" width="580px"  :show-close="false">
       <span slot="title">
          <span class="titleclasschild"  @click="resetForm('lmshForm')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>维修付款申请</span>
      </span>
       <el-form v-if="showxq"  :model="lmshForm"   ref="lmshForm" label-width="100px" class="demo-lmshForm">
      <div class="showxq" v-if="showxq" style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>单据编号: </span>
              <span>{{lmshForm.djbh}}</span>
            </p>
            <!-- <p   class=" addJLD">
              <span>对方单位: </span>
              <span>{{lmshForm.dfdw}}</span>
            </p> -->
            <p   class=" addJLD">
              <span>结算金额(元): </span>
              <span>{{lmshForm.jsje}}</span>
            </p>
            <p   class=" addJLD">
              <span>本次申请金额(元): </span>
              <span>{{lmshForm.bcsqje}}</span>
            </p> 
            <!-- <p   class=" addJLD">
              <span>所属合同: </span>
              <span>{{lmshForm.ssht}}</span>
            </p>
            <p   class=" addJLD">
              <span>合同金额(元): </span>
              <span>{{lmshForm.htje}}</span>
            </p> -->
            <!-- <p   class=" addJLD">
              <span>累计结算金额(元): </span>
              <span>{{lmshForm.ljjsje}}</span>
            </p>
            <p   class=" addJLD">
              <span>累计支付金额(元): </span>
              <span>{{lmshForm.ljzfje}}</span>
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
           
            <p class="tab_lable" style="font-size: 14px;text-align: center;margin-top:12px;">
            <span class="Tab" :class="tabindex===0?'tabselect':''" @click="tablable(0)">结算明细</span>
            <span class="Tab" :class="tabindex===1?'tabselect':''" @click="tablable(1)">发票明细</span>
          </p>
         <el-table
      v-if="tabindex===0"
    :data="lmshForm.jsmx"
    border
    style="width: 90%;">
    <el-table-column
      type="index"
      label="序号"
      align="center"
      width="80">
    </el-table-column>
    <el-table-column
      prop="wxfydh"
      label="维修费用单号"
      >
    </el-table-column>
    <el-table-column
      prop="lxsph"
      label="立项审批号"
      >
    </el-table-column>
    <el-table-column
      prop="zcmc"
      label="资产名称">
    </el-table-column>
    <el-table-column
      prop="jsje"
      label="结算金额(元)">
    </el-table-column>
    <el-table-column
      prop="fysm"
      label="费用说明">
    </el-table-column>
    <el-table-column
      prop="bz"
      label="备注">
    </el-table-column>
  </el-table>
     <el-table
      v-if="tabindex===1"
    :data="lmshForm.fpmx"
    border
    style="width: 90%;">
    <el-table-column
      type="index"
      label="序号"
      align="center"
      width="80">
    </el-table-column>
    <el-table-column
      prop="fplx"
      label="发票类型"
      >
    </el-table-column>
    <el-table-column
      prop="fph"
      label="发票号">
    </el-table-column>
    <el-table-column
      prop="hsje"
      label="含税金额(元)">
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
      <el-form v-if="!showxq" :model="lmshForm" :rules="fksq" ref="lmshForm" label-width="100px" class="demo-lmshForm">
                  <!-- <el-form-item class=" addJLD" label="单据编号" prop="djbh">
               <span class="edit_text">{{lmshForm.djbh}}</span>
              </el-form-item> -->
              <!-- <el-form-item class=" addJLD" label="对方单位" prop="dfdw">
                <el-select clearable size="mini" style="width: 148px;" v-model="lmshForm.dfdw" value-key="dwmc" placeholder="请选择对方单位" @change="selectdwmc">
                <el-option v-for="item in dfdwOptions" :key="item.dwmc" :label="item.dwmc" :value="item"></el-option>
              </el-select>
              </el-form-item> -->
              <!-- <el-form-item class=" addJLD" label="所属合同" prop="ssht">
                <el-select clearable :disabled="showxq" size="mini" style="width: 148px;" v-model="lmshForm.ssht" value-key="ssht" placeholder="请选择所属合同" @change="selectHts">
                <el-option v-for="(item,index) in htlist" :key="index" :label="item.htmc" :value="item"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item class=" addJLD" label="合同金额(元)" prop="htje">
               <span class="edit_text">{{lmshForm.htje}}</span>
              </el-form-item> -->
               <el-form-item class=" addJLD" label="结算金额(元)" prop="jsje">
               <span class="edit_text">{{lmshForm.jsje}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="本次申请金额(元)" prop="bcsqje">
              <span class="edit_text">{{lmshForm.bcsqje}}</span>
              </el-form-item>
              <!-- <el-form-item class=" addJLD" label="累计结算金额(元)" prop="ljjsje">
             <span class="edit_text">{{lmshForm.ljjsje}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="累计支付金额(元)" prop="ljzfje">
               <span class="edit_text">{{lmshForm.ljzfje}}</span>
              </el-form-item> -->
          
              <el-form-item class=" addJLD_long" label="费用说明" prop="fysm">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lmshForm.fysm"></el-input>
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
             <div class="group-form-name hide-form-item"><div class="operator"  @click="showZb=!showZb"><span class="name">详细清单</span><a :class="showZb?'el-icon-minus':'el-icon-plus'" href="javascript:;"   style="color: #999;font-size:12px;text-decoration: none;font-weight:900"></a></div><span class="line"></span></div>
              <div class="dialog_warps" v-if="showZb">
           <!-- <div class="addzbsj">
          <i @click="addzb=!addzb" :class="addzb?'el-icon-remove-outline':'el-icon-circle-plus-outline'"></i>
        </div> -->
        <div class="zibnr" v-if="addzb" style="overflow-x: auto;overflow-y: hidden;">
          <p class="tab_lable" style="">
            <span class="Tab" :class="tabindex===0?'tabselect':''" @click="tablable(0)">结算明细</span>
            <span class="Tab" :class="tabindex===1?'tabselect':''" @click="tablable(1)">发票明细</span>
             <el-button v-if="tabindex===0" size="small" type="primary"  class="dialog-button bao_cun" style="float:right"  @click="addzibiao">增行</el-button>
          </p>
          <!-- <div v-if="tabindex===0" class="iconwarp">
            <i style="float: right" class="el-icon-edit-outline" title="添加" @click="addzibiao"></i>
            <el-upload
              class="upload-demo"
              action=""
              style="float: right"
              multiple
              :limit="3"
              :on-change="ceshi">
              <i class="el-icon-download" title="导入"></i>
            </el-upload>
          </div> -->
          <ul v-if="tabindex===0">
            <li class="jsmx">
              <span>操作</span><span>序号</span><span>维修费用单号</span><span>立项审批号</span><span>资产名称</span><span>结算金额(元)</span><span>费用说明</span><span>备注</span>
              <!--<p>
                <i class="el-icon-edit-outline" title="添加"></i><i class="el-icon-delete" title="删除"></i>
              </p>-->
            </li>
            <li class="jsmx" v-for="(item, index) in lmshForm.jsmx" :key="index">
              <p>
                <i class="el-icon-delete" title="删除" @click="deletezibiaojs(index,item)"></i>
              </p>
              <p>
                <span>{{index+1}}</span>
              </p>
              <p>
                <el-input  size="mini" type="text" v-model="item.wxfydh" @focus=" showDialog('wx',index)" ></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.lxsph" disabled></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.zcmc" disabled></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.jsje" disabled></el-input>
              </p>
              <p>
                <!--<input type="text" @change="tongjije(item, index)" v-model="item.jrgmx_sl">-->
                <el-input size="mini" type="text" v-model="item.fysm" disabled></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.bz"></el-input>
              </p>
            </li>
            <div style="clear: both"></div>
          </ul>
          <ul class="gchzb" v-if="tabindex===1">
            <li>
              <span>序号</span><span>发票类型</span><span>发票号</span><span>含税金额(元)</span><span>税率</span><span>税额(元)</span><span>备注</span>
              <!--<p>
                <i class="el-icon-edit-outline" title="添加"></i><i class="el-icon-delete" title="删除"></i>
              </p>-->
            </li>
            <li v-for="(item, index) in lmshForm.fpmx" :key="index">
     
              <p>
                <el-input size="mini" type="text" :value="index+1"></el-input>
              </p>
              <p>
                <el-select clearable v-if="!showxq" @focus="fapiao(item, index)" size="mini" style="width: 73px;" v-model="item.fplx" value-key="mjmc" placeholder="请选择发票类型" @change="selectFp">
                  <el-option v-for="item in fpoptions" :key="item.mjbm" :label="item.mjmc" :value="item"></el-option>
                </el-select>
                <el-input v-if="showxq" size="mini" type="text" v-model="item.fplx"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.fph"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.hsje" @input="computed"></el-input>
              </p>
              <p>
                <!--<input type="text" @change="tongjije(item, index)" v-model="item.jrgmx_sl">-->
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
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="small" @click="resetForm('lmshForm')"   class="dialog-button qu_xiao" style="margin-right: 20px">取消</el-button>
        </div>
  </el-form>
      
    </el-dialog>
    <Dialog :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :bt="'维修单信息'"
            :gzlx="''"
            :wxfs="''"
            :fksq="tbdwList"
            :dialogVisible="dialogVisible"
            @searchXMMC="searchXMMC"
            @closeDialog="closeDialog">
    </Dialog>
  </div>
</template>

<script>
import Dialog from '@/components/jd_dx.vue'
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
      fpoptions:'',
      showZb:true,
      restaurants:[ ],
      restaurantsBH:[ ],
      datatypes:'',
      gzlx:'',
       dialogTableTit:{
         lxsph:'立项审批号',sbmc:'设备名称',tbr:'填报人',tbdw:'填报单位',tbbm:'填报部门',tbsj:'填报时间'
        },
      totals: 0,
      dialogData:[],
      dialogVisible:false,
      fullscreenLoading: false,
      fksq:{
          ssht:[
            { required: true, message: '所属合同不能为空',trigger: 'blur'},
            { min: 1, message: '请选择所属合同'}
          ], 
          fysm:[
            { required: true, message: '费用说明不能为空',trigger: 'blur'},
            { min: 1, message: '请填写费用说明'}
          ], 
      },
      lmshForm: {
        tbr:'',
        tbdw:'',
        tbbm:'',
        tbsj:'',
        ljjsje:0,
        ljzfje:0,
        fpmx: [{hsje:0}],
        jsmx: [{}],
      },
      dwmc: {
        dwmc: ''
      },
      sloptions:'',
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
      htlist: [],
      showBhForm: false,
      total: 0,
      searchCriteria: false,
      qmbbOptions: [],
      fpOptions: [],
      roadOptions: [],
      dfdwOptions: [],
      searchForm: {},
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      lyjcindex: 0,
      fpindex: 0,
      wxfyOptions:'',
      TmpwxfyOptions:'',
      tmpArr:[],
      userData:'',
      multipleSelection: [],
      selectRow: [],
      dataList:[],
      fileList:[],
      htbh: {
        wxfydh: ''
      },
      deleArr:'',
      tbdwList:[],
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
      selectDw:'',
      defaultProps:{
          children: 'children',
          label: 'text'
        },
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
    checkboxInit(row,index){
　　if (row.spzt!='3501')//这个判断根据你的情况而定
　　　　return 0;//不可勾选
　　else
　　　　return 1;//可勾选
　　},
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
          pc_name: '53',
          pc_project_id: form.djbh,
          pc_remarks: '',
          pc_state: '1',
        },{
          group:bmmc,
          org:orgmc}).then(res=>{
          if(res.code == 1){

            this.$api.spWxfkSpzt('?spzt='+ 3502 +'&djbhs='+ form.djbh).then(res => {
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
   sigClic (row){
     if(row.spzt=='3501'){
this.$refs.multipleTable.toggleRowSelection(row)}
    },
    selectSl(val){
       this.lmshForm.fpmx[0].sl=val.mjmc
var n =  val.mjmc;
if(n[ n.length - 1 ] == "%"){
     n = parseFloat(n)/100 ;   
}
      var sa=Number(this.lmshForm.fpmx[0].hsje) * n
      sa=sa.toFixed(4)
     this.lmshForm.fpmx[0].se=sa
     console.log( this.lmshForm.fpmx[0].se)
    },
     searchXMMC(val){
      console.log(val)
      let sea={
      gzlx:val.gzlx,
      gzdj:val.gzdj,
      jcsj:val.jcsj,
      tbbmdm:val.tbbm,
      tbdwdm:this.userInfo.daZzbh,
    }
    if (sea.jcsj) {
        sea.ksrq = sea.jcsj[0]
        sea.jsrq = sea.jcsj[1]
      } else {
        sea.ksrq = ''
        sea.jsrq = ''
      }
         this.$api.jdwhxjwxgetWxfyList('?pageNum=' + val.currentPage + '&pageSize=' + val.pageSize+'&spzt=3503'+ '&' + $.param(sea)).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
         this.dialogData = resp.data.data.list
          this.totals = resp.data.data.total
        }
      }).catch(e => {
        this.loading = false
      })
      },

      showDialog(bol,index){
         this.lyjcindex = index
         this.datatypes = bol
      this.$api.jdwhxjwxgetWxfyList('?pageNum=' + 1 + '&pageSize=' + 10+'&tbbmdm=' + this.userInfo.daBmbm+'&tbdwdm=' + this.userInfo.daZzbh+'&spzt=3503').then(resp => {
       
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
 
         this.dialogData = resp.data.data.list
          this.totals= resp.data.data.total
          for(let i=0;i<this.lmshForm.jsmx.length;i++){
        for(let j=0;j<this.dialogData.length;j++){
         if(this.lmshForm.jsmx[i].wxfydh==this.dialogData[j].djbh){
           this.dialogData.splice(j,1)
         }
        }
         }
 
       this.dialogVisible = true
        }
      }).catch(e => {
        this.loading = false
      })
      },
      closeDialog(val){
        this.lyjcindex 
        this.dialogVisible = false
        if(val){
  for (let index = 0; index < val.length; index++) {
        val[index].wxfydh=val[index].djbh;
        val[index].lxsph=val[index].lxsph;
        val[index].zcmc=val[index].sbmc
      this.lmshForm.jsmx.push(val[index])
  }
      if(this.lmshForm.jsmx[this.lyjcindex].wxfydh== undefined){
        this.lmshForm.jsmx.splice(this.lyjcindex,1)
      }
     if(this.lmshForm.jsmx.length>0){
        var jsSum=0
        for(let i=0;i<this.lmshForm.jsmx.length;i++){
            if(this.lmshForm.jsmx[i].jsje){
              jsSum+=Number(this.lmshForm.jsmx[i].jsje)
            }
        }
       this.lmshForm.jsje=jsSum
       this.lmshForm.fpmx[0].hsje=jsSum
       this.lmshForm.bcsqje=jsSum

      }
        }else{
          this.lmshForm.jsmx=[{}]  
        }
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
    ceshi(){

    },
     computed(){
       var n=this.lmshForm.fpmx[0].sl
       if(n[ n.length - 1 ] == "%"){
     n = parseFloat(n)/100 ;   
      }
    this.lmshForm.fpmx[0].se=(Number(this.lmshForm.fpmx[0].hsje))* n
      this.lmshForm.bcsqje=this.lmshForm.fpmx[0].hsje
 
    },
    showAdd () {
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      this.formId = 'gzbx' + new Date().getTime()
      this.lmshForm.djbh = this.formId
      this.lmshForm.tbsjc= new Date().getTime()
      // if(getQueryString('userCode')){
        this.fileList=[]
     this.lmshForm.tbdw = this.userInfo.daZzmc
      this.lmshForm.tbr = this.userInfo.daYhmc
      this.lmshForm.tbbm =  this.userInfo.daBmmc
      this.lmshForm.tbdwdm=this.userInfo.daZzbh
      this.lmshForm.tbbmdm=this.userInfo.daBmbm
      this.lmshForm.spzt='3501'
      // }
      this.lmshForm.tbsj=this.formatDate(new Date())
    },
    updateFormDia (row, index) {
      console.log(row)
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
      console.log(this.searchForm)
      this.$api.jdwhxjwxgetWxfkList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
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
      for (let index = 0; index < this.lmshForm.jsmx.length; index++) {
       if(!this.lmshForm.jsmx[index].wxfydh){
        this.$message({
            type: 'error',
            message: '请选择维修费用单号!'
          })
          return
       }

      }
     
      if(!this.lmshForm.fpmx[this.fpindex].fplx||!this.lmshForm.fpmx[this.fpindex].hsje||!this.lmshForm.fpmx[this.fpindex].fph){
        this.$message({
            type: 'error',
            message: '请将发票明细表填写完整'
          })
          return
      }
       if(isNaN(this.lmshForm.fpmx[this.fpindex].hsje) || this.lmshForm.fpmx[this.fpindex].hsje<0){
        this.$message({
            type: 'error',
            message: '函税金额只能是大于0的数字!'
          })
          return
      }
      this.$refs['lmshForm'].validate((valid) => {
          if (valid) {
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
      this.lmshForm.ljjsje+=Number(this.lmshForm.jsje)
      this.lmshForm.ljzfje+=Number(this.lmshForm.bcsqje)
      this.$api.jdwhxjwxaddWxfk(this.lmshForm).then(res => {
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
      for (let index = 0; index < this.lmshForm.jsmx.length; index++) {
       if(!this.lmshForm.jsmx[index].wxfydh){
        this.$message({
            type: 'error',
            message: '请选择维修费用单号!'
          })
          return
       }

      }
     
      if(!this.lmshForm.fpmx[this.fpindex].fplx||!this.lmshForm.fpmx[this.fpindex].hsje||!this.lmshForm.fpmx[this.fpindex].fph){
        this.$message({
            type: 'error',
            message: '请将发票明细表填写完整'
          })
          return
      }
       if(isNaN(this.lmshForm.fpmx[this.fpindex].hsje) || this.lmshForm.fpmx[this.fpindex].hsje<0){
        this.$message({
            type: 'error',
            message: '函税金额只能是大于0的数字!'
          })
          return
      }
      this.$refs['lmshForm'].validate((valid) => {
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
      this.$api.jdwhxjwxeditWxfk(this.lmshForm).then(res => {
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
          this.$api.jdwhxjwxdelWxfkByDjbhs('?djbhs=' + djbharr).then(res => {
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
    selectHts(value){
      this.lmshForm.ssht=value.htmc
      this.lmshForm.htje=value.htjehs
      this.lmshForm.sshtbh=value.yh_wh
    this.$api.getLjjsAndLjzfByHtbh('?htbh='+this.lmshForm.sshtbh).then(res => {
        if (res.data.code === 1) {
         if(res.data.data){
            this.lmshForm.ljjsje=res.data.data.ljjsje
           this.lmshForm.ljzfje=res.data.data.ljzfje
         }else{
           this.lmshForm.ljjsje=0
           this.lmshForm.ljzfje=0
         }
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
    addzibiao () {
      this.lmshForm.jsmx.push({mid: this.lmshForm.id})
    },
    deletezibiaojs (index,item) {
      this.lmshForm.jsmx.splice(index, 1)
      if(item.wxfydh){
        this.wxfyOptions.push(item)
      }
    },
    deletezibiaofp (index) {
      this.lmshForm.fpmx.splice(index, 1)
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
      this.wxfyOptions=this.TmpwxfyOptions
      this.lmshForm = {
        tbr:'',
        tbdw:'',
        tbbm:'',
        tbsj:'',
        ljjsje:0,
        ljzfje:0,
        fpmx: [{}],
        jsmx: [{}]
      }
    },
    submitAddForm () {
    },
    selectdwmc (value) {
      this.lmshForm.ssyh = value.ssyh
      this.lmshForm.dfdw = value.dwmc
      this.lmshForm.zhm = value.zhm
      this.lmshForm.yhzh = value.yhzh
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
// 
      // this.lmshForm.jsmx[this.lyjcindex].wxfydh = node.djbh
      // this.lmshForm.jsmx[this.lyjcindex].zcmc = node.sbmc
      // this.lmshForm.jsmx[this.lyjcindex].jsje = node.jsje
      // this.lmshForm.jsmx[this.lyjcindex].fysm = node.fysm
      console.log(this.lmshForm.jsmx)
      if(this.lmshForm.jsmx.length>0){
        var jsSum=0
        for(let i=0;i<this.lmshForm.jsmx.length;i++){
            if(this.lmshForm.jsmx[i].jsje){
              jsSum+=Number(this.lmshForm.jsmx[i].jsje)
            }
        }
       this.lmshForm.jsje=jsSum
       console.log(this.lmshForm.jsje)
      }
      // this.tmpArr=[]
      // for(let i=0;i<this.lmshForm.jsmx.length;i++){
      //   this.tmpArr.push(this.lmshForm.jsmx[i])
      // }
      // this.wxfyOptions=[]
      // var [...tmps]=this.TmpwxfyOptions
      // this.wxfyOptions=tmps
      // for(let i=0;i<this.tmpArr.length;i++){
      //   for(let j=0;j<this.wxfyOptions.length;j++){
      //    if(this.tmpArr[i].wxfydh==this.wxfyOptions[j].wxfydh){
      //      this.wxfyOptions.splice(j,1)
      //    }
      // }
      // }
    },
    selectFp (node) {
      this.lmshForm.fpmx[this.fpindex].fplx = node.mjmc
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
    getQmldbb () {
      this.$api.jdwhxjwxgetXjType('?mjlxbm=48').then(resp => {

        if (resp.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.sloptions = resp.data
   
        }
      }).catch(e => {
      })
 
      this.$api.jdwhxjwxgetWxfyChooseList('').then(resp => {
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
      this.$api.jdwhxjwxgetXjType('?mjlxbm=53').then(resp => {

        if (resp.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.fpoptions = resp.data
  
        }
      }).catch(e => {
      })
      // this.$api.jdwhxjwxgetDfdwInfo('').then(resp => {
      //   if (resp.status !== 200) {
      //     this.$message({
      //       message: '出错了',
      //       type: 'error'
      //     })
      //   } else {
      //     this.dfdwOptions = resp.data.data
      //   }
      // }).catch(e => {
      // })
    }, 
    getTbdw(code,bmbm){
        this.fullscreenLoading=true
        this.$api.getUserDept2('?dwbm=' +  code+'&bmbm='+ bmbm).then(resp => {
        if (resp.status !== 200) {
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
    // this.tableHeight = $('#fksq')[0].offsetHeight
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
  #fksq{
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
              width: calc((100% - 130px)/5);
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
                width: 80px;
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
              width: calc((100% - 130px)/5);
              height: 100%;
              line-height: 39px;
              float: left;
              border-right: 1px solid #D5D6D7;
              &:nth-of-type(1){
                width: 50px;
              }
              &:nth-of-type(2){
                width: 80px;
              }
              i{
                color: #00a2fd;
                margin:0 5px;
              }
            }
          }
          .jsmx{
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
