/**
* ----领用申请
*/
<template>
  <div id="lysq" class="styleSheets" style="height: 100%" v-loading.fullscreen.lock="fullscreenLoading"  v-if="isRouterAlive">
   <div class="bill-header">
  		<div class="bill-title">
  			<span>领用申请</span>
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
            <el-input clearable class="selectDw" style="width:200px" v-model="selectDw" size="mini" placeholder="请选择单位" @focus="selectDwTree" @change="clears">
              <i
    class="el-icon-error"
    slot="suffix"
    @click="handleIconClick">
  </i>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
             <el-select clearable v-model="searchForm.pzzt" size="mini" placeholder="请选择批准状态">
                <el-option label="未批准" value="未批准"></el-option>
                <el-option label="已批准" value="已批准"></el-option>
             </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
             <el-select clearable v-model="searchForm.lyzt" size="mini" placeholder="请选择领用状态">
                <el-option label="已领用" value="已领用"></el-option>
                <el-option label="未领用" value="未领用"></el-option>
             </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" prop="" class="">
            <el-form-item class="" prop="sbmc">
              <el-input clearable v-model="searchForm.sbmc" size="mini" placeholder="请输入设备名称"></el-input>
            </el-form-item>
          </el-form-item>
          <br>
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
         :selectable='checkboxInit'
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
       
          <!-- <el-table-column sortable align="center" class-name="column-caoz" label="同意状态" width="80" v-if="deptCode.length<=5">
          <template scope="scope">
            <span style="color:#D34C42;cursor: pointer;text-align: center"  v-if="scope.row.tyzt!='已同意'"  @click="tongyi(scope.row, scope.$index)">{{scope.row.tyzt}}</span>
            <span style="text-align: center" v-if="scope.row.tyzt==='已同意'">已同意</span>
          </template>
        </el-table-column>
         <el-table-column align="center" sortable prop="tyzt" label="同意状态" v-if="deptCode.length>5"  width="80" ></el-table-column>
         <el-table-column align="center" sortable class-name="column-caoz" label="批准状态" width="80" v-if="deptCode.length<=5">
          <template scope="scope">
            <span style="color:#D34C42;cursor: pointer;text-align: center"  v-if="scope.row.pzzt==='未批准'"  @click="pizhun(scope.row, scope.$index)">{{scope.row.pzzt}}</span>
            <span style="text-align: center" v-if="scope.row.pzzt==='已批准'">已批准</span>
          </template>
        </el-table-column> -->
        <el-table-column align="left" label="状态" sortable width="80">
        <template scope="scope">
            <span style="color:#D34C42;text-align: left;cursor: pointer;" v-if="scope.row.spzt==='3501'" >自由</span>
            <span style="color:#3EC481;text-align: left;cursor: pointer;" v-if="scope.row.spzt==='3502'">审批中</span>
            <span style="color:#00a2fd;text-align: left;cursor: pointer;" v-if="scope.row.spzt==='3503'">已审批</span>
        </template>
        </el-table-column>
        <!-- <el-table-column align="center" sortable prop="pzzt" label="批准状态" v-if="deptCode.length>5"  width="80" ></el-table-column> -->
        <el-table-column sortable align="left" prop="xyr" label="需用人" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="lysm" label="领用说明" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="tbdw" label="填报单位" show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="tbbm" label="填报部门" show-overflow-tooltip></el-table-column>

        <el-table-column sortable align="left" prop="tbr" label="填报人" show-overflow-tooltip></el-table-column>
        <el-table-column width="100"  sortable align="left" prop="tbsj" label="填报日期"></el-table-column>
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
    
    <el-dialog fullscreen class="data-dialog el-updata-div"  :close-on-click-modal="false" :visible.sync="showDetail" width="580px" :show-close="false" >
 <span slot="title">
          <span class="titleclasschild"  @click="resetForm('lmshForm')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>领用申请</span>
      </span>
       <el-form v-if="showxq"  :model="lmshForm"   ref="lmshForm" label-width="100px" class="demo-lmshForm">
      <div class="showxq" v-if="showxq" style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>单据编号: </span>
              <span>{{lmshForm.djbh}}</span>
            </p>
            <p  v-if="lmshForm.wxdh != undefined" class=" addJLD"   >
              <span>报修单号: </span>
              <span>{{lmshForm.wxdh}}</span>
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
      <el-form v-if="!showxq" :model="lmshForm" :rules="rules_ly" ref="lmshForm" label-width="100px" class="demo-lmshForm">
                  <!-- <el-form-item class=" addJLD" label="单据编号" prop="djbh">
                 <span class="edit_text">{{lmshForm.djbh}}</span>
              </el-form-item> -->
              <!-- <el-form-item class=" addJLD" label="维修单号" prop="wxdh">
              <el-select clearable  @focus="fuzhi(item, index)"  size="mini"   placeholder="" @change="selectCks">
                <el-option v-for="(item,index) in ckOptions" :key="index" :label="item.CKMC" :value="item.CKMC"></el-option>
              </el-select>
              </el-form-item> -->
              <el-form-item class=" addJLD" label="需用人"  prop="xyr">
                <el-input size="mini"  v-model="lmshForm.xyr" @focus="showDialog"></el-input>
              </el-form-item>
              <!-- <el-form-item class=" addJLD" label="仓库名称" prop="ckmc">
              <el-select clearable  v-model="lmshForm.ckmc"  size="mini"   placeholder="" >
                <el-option v-for="(item,index) in ckOptions" :key="index" :label="item.ssck" :value="item.ssck"></el-option>
              </el-select>
              </el-form-item> -->
              <el-form-item class=" addJLD_long" label="领用说明" prop="lysm">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lmshForm.lysm"></el-input>
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
                :on-remove='xgfile'
                 accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.doc,.docx,.xls,.xlsx,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.DOC,.DOCX,.XLS,.XLSX"
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
          <!-- <div class="iconwarp">
            <i class="el-icon-edit-outline" title="添加" @click="addzibiao"></i>
          </div> -->
          <ul>
            <li>
              <span>操作</span><span>序号</span><span>备件名称</span><span>备件编码</span><span>规格型号</span><span>计量单位</span><span>需用数量(必填)</span><span>备注</span>
            </li>
            <li v-for="(item, index) in lmshForm.mx" :key="index">
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
                <el-input size="mini" type="text" v-model="item.bz" ></el-input>
              </p>
            </li>
            <div style="clear: both"></div>
          </ul>
        </div>
        </div>
         <div class="dialog_footer" v-if="!showxq">
          <el-button size="small" v-if="isadd"  type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit('lmshForm')">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary"  class="dialog-button bao_cun"  :loading="submitLoading"  @click="updateSubmit('lmshForm')">保存</el-button>
          <el-button size="small" @click="resetForm('lmshForm')"   class="dialog-button qu_xiao" style="margin-right: 20px">取消</el-button>
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
<DialogWl   v-if="showWl"
            :dialogTableTitWl="dialogTableTitWl"
            :btWl="'物料选择'"
            :mx="lmshForm.mx"
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
       totals:0,
      dialogTableTitWl:{ bjmc:'资产名称',bjbh:'资产编码',ggxh:'规格型号',jldw:'计量单位',kcsl:'库存数量'},
      datatypesWl:'zc',
      showWl:false,
      dialogVisibleWl:false,
      typeWl:'',  
      showZb:true,
      fullscreenLoading: false,
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
      dept:'sadf',
      lmshForm: {
        tbr:'',
        tbdw:'',
        tbbm:'',
        tbsj:'',
        mx: [{}]
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
      tableData1: [],
     
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      roadOptions: [],
      searchForm: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      bjList: '',
      lyjcindex: 0,
      personelForm: {},
      showDetail: false,
      multipleSelection: [],
      selectRow: [],
      tabindex: 0,
      wxdh: {
        DJBH: ''
      },
      ckOptions:'',
      bjmc: {
        bjmc: ''
      },
      sbmcOptions: [],
      userData:[],
      tbdwList:[],
      selectDw:'',
      defaultProps:{
          children: 'children',
          label: 'text'
        },
      dataList:[],
      fileList:[],
      deptCode:'',
      treeList:[],
       xz:{zcbm:'',zcmc:'',bmbm:''},
      ysrList:[],
      zcPage: 1,
      zcSize: 10,
      zctotal:10,
      showXzsb:false,
      defaultP:{
          children: 'children',
          label: 'text'
        },
      deleArr:'',
        multipleXz:[],

      treedata1:[],
       xz1:{zcbm:'',zcmc:'',bmbm:''},
      zcList1:[],
      ysrList1:[],
      zcPage1: 1,
      zcSize1: 10,
      zctotal1:10,
      showXzsb1:false,
      iszd1:false,
      defaultTree1:{
          children: 'children',
          label: 'text'
        },
        multipleXz1:[],
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
  this.deptCode=this.userInfo.daBmbm
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
  beforeRouteEnter (to, from, next) {
    next(vm=>{
    // vm.search(1,10)
    vm.$api.jdwhbjglgetBjLyInfo().then(resp => {
        if (resp.status !== 200) {
          vm.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          vm.bjList = resp.data.data
        }
      }).catch(e => {
      })
      vm.$api.jdwhbjglgetWxdhInfo('').then(resp => {
        if (resp.status !== 200) {
          vm.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          vm.sbmcOptions = resp.data.data
        }
      }).catch(e => {
      })
    })
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
          pc_name: '52',
          pc_project_id: form.djbh,
          pc_remarks: '',
          pc_state: '1',
        },{
          group:bmmc,
          org:orgmc}).then(res=>{
          if(res.code == 1){

            this.$api.pzLysqSpzt('?pzzt='+ 3502 +'&djbhs='+ form.djbh).then(res => {
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

      showDialog(){
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
            this.lmshForm.xyr=val.userName
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
          this.lmshForm.mx.push(obj)
        }
        for (let i = 0; i < this.lmshForm.mx.length; i++) {
         if(this.lmshForm.mx[i].bjmc=='' || this.lmshForm.mx[i].bjmc==undefined){
            this.lmshForm.mx.splice(i,1)
          }
          
        }
        } 
      },
   sigClic (row){
     if(row.spzt=='3501'){
 
this.$refs.multipleTable.toggleRowSelection(row)}
    },
    checkboxInit(row,index){
　　if (row.spzt!='3501')//这个判断根据你的情况而定
　　　　return 0;//不可勾选
　　else
　　　　return 1;//可勾选
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
    showAdd () {
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      this.formId = 'lysq' + new Date().getTime()
      this.lmshForm.djbh = this.formId
      // if(getQueryString('userCode')){
        this.fileList=[]
      this.lmshForm.tbdw = this.userInfo.daZzmc
      this.lmshForm.tbsjc= new Date().getTime()
      this.lmshForm.tbr = this.userInfo.daYhmc
      this.lmshForm.xyr = this.userInfo.daYhmc
      this.lmshForm.tbbm =  this.userInfo.daBmmc
      this.lmshForm.spzt='3501'
      // }
      this.lmshForm.tbsj=this.formatDate(new Date())
    },
    updateFormDia (row, index) {
      if(row.pzzt=='已批准'){
        this.$message({
            message: '已批准改单据，不能修改',
            type: 'error'
          })
        return
      }
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
      this.$api.jdwhbjglgetLysqList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
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
    addSubmit () {
    for (let index = 0; index < this.lmshForm.mx.length; index++) {
        if(isNaN(this.lmshForm.mx[index].xysl)){
          this.$message({
            type: 'error',
            message: '需用数量必须为数字!'
          })
          return
        }else{
         let a=Number(this.lmshForm.mx[index].xysl)

         if(Number.isInteger(a)==false || a<=0){
        this.$message({
            type: 'error',
            message: '需用数量必须为大于0的整数!'
          })
          return
         }
        }
       if(!this.lmshForm.mx[index].bjmc){
         this.$message({
            type: 'error',
            message: '请选择备件'
          })
          return
       }
      }
      this.$refs['lmshForm'].validate((valid) => {
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
      this.lmshForm.tbdwdm=this.userInfo.daZzbh
      this.lmshForm.tbbmdm=this.userInfo.daBmbm
      if(this.lmshForm.tbbmdm==='YTW06'){
        this.lmshForm.tyzt='已同意'
      }
      this.$api.jdwhbjgladdLysq(this.lmshForm).then(res => {
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
    for (let index = 0; index < this.lmshForm.mx.length; index++) {
        if(isNaN(this.lmshForm.mx[index].xysl)){
          this.$message({
            type: 'error',
            message: '需用数量必须为数字!'
          })
          return
        }else{
         let a=Number(this.lmshForm.mx[index].xysl)

         if(Number.isInteger(a)==false || a<=0){
        this.$message({
            type: 'error',
            message: '需用数量必须为大于0的整数!'
          })
          return
         }
        }
       if(!this.lmshForm.mx[index].bjmc){
         this.$message({
            type: 'error',
            message: '请选择备件'
          })
          return
       }
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
      this.$api.jdwhbjgleditLysq(this.lmshForm).then(res => {
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
          this.$api.jdwhbjgldelLysqBydjbhs('?djbhs=' + djbharr).then(res => {
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
    ghbj (row){
      this.$api.ghLysq('?djbhs=' +row.djbh + '&ghzt='+'已归还').then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '归还成功!'
              })
              this.search(this.currentPage, this.pageSize)
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
    
    },
    pizhun (row, index) {
      // console.log(row)
      this.$confirm('是否通过批准？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        size:'small',
        type: 'warning',
        center: true
      }).then(() => {

        this.$api.pzLysq('?pzzt=已批准'+'&djbhs='+row.djbh).then(resp => {
        if (resp.data.code== 0) {
          this.$message({
            message: '库存数量不足，无法批准',
            type: 'error'
          })
        } else {
          this.search(this.currentPage, this.pageSize)
           this.formIds = 'bjck' + new Date().getTime()
          this.lmshForm = row
          this.lmshForm.sqdh=row.djbh
          this.lmshForm.djbh=this.formIds
          this.lmshForm.pzzt='已批准'
          this.lmshForm.tyzt='已同意'
          this.lmshForm.lyzt='已领用'
          this.lmshForm.ghzt='未归还'
          this.lmshForm.cklx='需求计划'
          for(let i=0;i<this.lmshForm.mx.length;i++){
          this.lmshForm.mx[i].cksl= row.mx[i].xysl
             this.lmshForm.mx[i].bjbh= row.mx[i].bjbm
          }
          this.lmshForm.lyr=this.lmshForm.xyr
          this.lmshForm.ckzt='未出库'
 
          this.$api.jdwhbjgladdBjck(this.lmshForm).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
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
      this.$api.tyLysq('?tyzt=已同意'+'&djbhs='+row.djbh).then(resp => {
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
    addzibiao () {
      this.lmshForm.mx.push({})
    },
    deletezibiao (index) {
      this.lmshForm.mx.splice(index, 1)
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
    ceshi () {
      this.$message({
        type: 'error',
        message: '内容格式不符合要求'
      })
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
          this.loading = false
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
      this.showxq=false
      this.lmshForm = {
        tbr:'',
        tbdw:'',
        tbbm:'',
        tbsj:'',
        xcfx: '上行',
        mx:[{}]
      }
    },
    submitAddForm () {},
    selectHt (value) {},
    selectBj (value) {
      this.lmshForm.mx[this.lyjcindex].bjmc = value.bjmc
      this.lmshForm.mx[this.lyjcindex].bjbm = value.bjbm
      this.lmshForm.mx[this.lyjcindex].jldw = value.jldw
      // this.lmshForm.mx[this.lyjcindex].cksl = value.cksl
      this.lmshForm.mx[this.lyjcindex].ggxh = value.ggxh
      // this.lmshForm.mx[this.lyjcindex].bjmc = value.bjmc
    },
    fuzhi (item, index) {
      this.lyjcindex = index
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
      this.$api.selAllWllb().then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.treedata1 = resp.data.data
         
           this.xz1.lxpk=this.treedata1[0].sblbpk
            console.log(this.xz1.lxpk )
        }
      }).catch(e => {
      })
     
      this.$api.jdwhbjglgetWxdhInfo('').then(resp => {
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


    },
    tablable (num) {
      this.tabindex = num
    },
    getTbdw(code,bmbm){
 
      this.fullscreenLoading=true
  this.$api.getUserDept2('?dwbm='+this.userInfo.daZzbh+'&bmbm='+this.userInfo.daBmbm).then(resp => {
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
    clickRow1(row){
      //资产
      this.$refs.Table1.toggleRowSelection(row)
    },
    handleNodeClick(data){
      this.selectDw=data.text
      this.searchForm.tbdwdm=this.userInfo.daZzbh
      this.searchForm.tbbmdm=data.id
      // this.searchForm.tbbmdm= data.id
       $('.tbdw').hide(this.searchForm)
    },
     selectDwTree(){
      $('.tbdw').show()
    },
  },
 
  mounted () {
    this.getTbdw(this.userInfo.daZzbh,this.userInfo.daBmbm)
    this.getQmldbb()
 
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
  #lysq{
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    min-width: 1100px;
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
      height: calc(100% - 142px);
      min-height: 300px;
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
