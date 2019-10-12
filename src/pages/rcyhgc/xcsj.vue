/**
* ----启动巡查
*/
<template>
  <div id="xccsfx" style="height: 100%" v-loading="loading">
    <div class="header">
      <span class="headerTit">巡查事件</span>
      <div class="header_option">
        <!--<div class="jianlimb" @click="showAdd()"><i class="el-icon-download"> 计划申报</i></div>-->
        <ul>
          <!--<li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>-->
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
              @select="handleSelectMC"
              placeholder="请输入项目名称"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.XMMC }}</div>
              </template>
              <i slot="suffix" @click="showDialog('mc')" class="icon iconfont icon-xiangqing1"></i>
            </el-autocomplete>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="状态" prop="" class="">
            <el-select size="mini"  class="" placeholder="请选择"   v-model="searchForm.zt">
              <!--<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>-->
              <el-option label="全部" :value="undefined"></el-option>
              <el-option label="巡查事件" value="1"></el-option>
              <el-option label="指挥中心处理" value="2"></el-option>
              <el-option label="工程部处理" value="3"></el-option>
              <el-option label="施工单位" value="4"></el-option>
              <el-option label="施工单位人员" value="5"></el-option>
              <el-option label="维修中" value="6"></el-option>
              <el-option label="已维修" value="7"></el-option>
              <el-option label="申请验收" value="8"></el-option>
              <el-option label="已验收" value="9"></el-option>
              <el-option label="已归档" value="10"></el-option>
              <el-option label="已计量" value="11"></el-option>
              <el-option label="已支付" value="12"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item style="margin-bottom: 0px" label="日期选择" prop="" class="">
            <el-date-picker
              v-model="searchForm.date"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              size="mini"
              placeholder="开始时间">
            </el-date-picker>


            <!---->
            <!--<el-date-picker-->
              <!--v-model="searchForm.jcrq"-->
              <!--type="daterange"-->
              <!--size="mini"-->
              <!--format="yyyy-MM-dd"-->
              <!--value-format="yyyy-MM-dd"-->
              <!--range-separator="-"-->
              <!--start-placeholder="开始日期"-->
              <!--end-placeholder="结束日期">-->
            <!--</el-date-picker>-->
            <!--<el-select size="mini"  class="" placeholder="请选择日期" v-model="searchForm.jcrq">
              <el-option v-for="(item,index) in qmbbOptions" :key="index" :label="item.bbmc" :value="item.bbid"></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button size="mini" @click="search(1, 10)" style="background-color: #DF4D4A;border-color:transparent;color: #fff">查询</el-button>
            <el-button @click.native="resizeSearch" size="mini">重置</el-button>
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
 <!--       <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>-->
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column align="left" sortable prop="xmmc" label="项目名称" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="gldw" label="管理单位" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="lxmc" label="路线名称" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="xcfx" label="巡查方向" show-overflow-tooltip>
          <template scope="scope">
            <span v-if="scope.row.xcfx == '0301'">上行</span>
            <span v-if="scope.row.xcfx == '0302'">下行</span>
            <span v-if="scope.row.xcfx == '0303'">全幅</span>
          </template>
        </el-table-column>
        <el-table-column align="left" sortable prop="shlxname" label="损坏类型" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="bhname" label="病害类型" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="bhsl" label="病害数量" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="fxsj" label="发现时间" show-overflow-tooltip> </el-table-column>

        <el-table-column align="left" sortable label="状态" show-overflow-tooltip>
          <template scope="scope">
            <!--@click="showAdd(scope.row)"-->
            <span style="color:#D34C42;cursor: pointer;text-align: center" v-if="scope.row.yhrwddjbh === null" >未派发</span>
            <span style="color:#00a2fd;text-align: center" v-else >已派发</span>
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
    <el-dialog class="data-dialog el-updata-div" title="养护任务单审核" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" @close="resetForm">
      <div class="dialog_warp">
        <ul class="zhubnr">
          <li>
            <span>单据编号</span>
            <p>
              <el-input size="mini" disabled type="text" v-model="lmshForm.yhrwddjbh"></el-input>
            </p>
          </li>
          <li>
            <span>路线</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.yhrwdlx"></el-input>
            </p>
          </li>
          <li>
            <span>日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.yhrwdrq"
                size="mini"
                type="date"
                :disabled="showxq"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>月度</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.yhrwdyd"
                size="mini"
                type="date"
                :disabled="showxq"
                format="yyyy-MM"
                value-format="yyyy-MM"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>养护单位</span>
            <p>
              <el-select size="mini"  class="" placeholder="请选择养护单位" v-model="ZZMC" value-key="ZZMC" @change="selectyhdw">
                <!--<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>-->
                <el-option v-for="item in yhdwList" :label="item.ZZMC" :key="item.ZZMC" :value="item"></el-option>
              </el-select>
              <!--<el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.yhrwdyhdw"></el-input>-->
            </p>
          </li>
          <li>
            <span>管理单位</span>
            <p>
              <el-select size="mini"  class="" placeholder="请选择管理单位" v-model="lmshForm.yhrwdgydw">
                <!--<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>-->
                <el-option v-for="item in gldwList" :label="item.HTXX_XMGLDW" :key="item.HTXX_XMGLDW" :value="item.HTXX_XMGLDW"></el-option>
              </el-select>
              <!--<el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.yhrwdgydw"></el-input>-->
            </p>
          </li>
          <div style="clear: both"></div>
        </ul>
        <div class="addzbsj">
          <i @click="addzb=!addzb" :class="addzb?'el-icon-remove-outline':'el-icon-circle-plus-outline'"></i>
        </div>
        <div class="zibnr" v-if="addzb" style="overflow-x: auto;overflow-y: hidden;">
          <ul>
            <li>
              <span>操作</span><span>事件编号</span><span>巡查单位</span><span>巡查方向</span><span>车道</span><span>单位工程</span><span>病害类型</span><span>病害数量</span><span>工程量类型</span><span>桩号</span><span>病害说明</span><span>图片</span>
              <!--<p>
                <i class="el-icon-edit-outline" title="添加"></i><i class="el-icon-delete" title="删除"></i>
              </p>-->
            </li>
            <li v-for="(item, index) in lmshForm.yhrwmxes" :key="index">
              <p>
                <i class="el-icon-delete" title="删除" @click="deletezibiao(index)"></i>
              </p>
              <p>
                <!--<el-select clearable :disabled="showxq" size="mini" style="width: 10px;" v-model="htbh" value-key="RWMX_SJDH" placeholder="" @change="selectHt">
                  <el-option v-for="item in xcsjList" :key="item.RWMX_SJDH" :label="item.RWMX_SJDH" :value="item"></el-option>
                </el-select>-->
                <el-input size="mini" type="text" v-model="item.yhrwdmxdjbh"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.yhrwdxcdw"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.yhrwdxcfx"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.yhrwdcd"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.yhrwddwgc"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.yhrwdbhlx"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.yhrwdbhsl"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" value="二类项目"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.yhrwdzh"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.yhrwdbhsm"></el-input>
              </p>
              <p>
                <el-upload
                  class="upload-demo"
                  :action="$api.uploadFiles"
                  multiple
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  accept=".png,.jpg,.bmp,.jpeg"
                  list-type="picture-card"
                  :limit="1">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </p>
            </li>
            <div style="clear: both"></div>
          </ul>
        </div>
        <div class="dialog_footer" v-if="!showxq">
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="small" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog class="data-dialog el-updata-div" title="清扫任务单审核" :close-on-click-modal="false" :visible.sync="showDetail1" width="580px" @close="resetForm">
      <div class="dialog_warp">
        <ul class="zhubnr">
          <li>
            <span>单据编号</span>
            <p>
              <el-input size="mini" disabled type="text" v-model="lmshForm.qsrwddjbh"></el-input>
            </p>
          </li>
          <li>
            <span>信息来源</span>
            <p>
              <el-input size="mini" disabled type="text" v-model="lmshForm.qsrwdxxly"></el-input>
            </p>
          </li>
          <li>
            <span>事件类型</span>
            <p>
              <el-input size="mini" disabled type="text" v-model="lmshForm.qsrwdsjlx"></el-input>
            </p>
          </li>
          <li>
            <span>事件时间</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.qsrwdsjsj"
                size="mini"
                type="date"
                disabled
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>事件地点</span>
            <p>
              <el-input size="mini" disabled type="text" v-model="lmshForm.qsrwdsjdd"></el-input>
            </p>
          </li>
          <li>
            <span>事件路段</span>
            <p>
              <el-input size="mini" disabled type="text" v-model="lmshForm.qsrwdsjld"></el-input>
            </p>
          </li>
          <li>
            <span>方向</span>
            <p>
              <el-input size="mini" disabled type="text" v-model="lmshForm.qsrwdfx"></el-input>
            </p>
          </li>
          <li>
            <span>桩号</span>
            <p>
              <el-input size="mini" disabled type="text" v-model="lmshForm.qsrwdzh"></el-input>
            </p>
          </li>
          <li>
            <span>联系人</span>
            <p>
              <el-input size="mini" disabled type="text" v-model="lmshForm.qsrwdlxr"></el-input>
            </p>
          </li>
          <li>
            <span>联系电话</span>
            <p>
              <el-input size="mini" disabled type="text" v-model="lmshForm.qsrwdlxdh"></el-input>
            </p>
          </li>
          <li>
            <span>路面结冰撒盐</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.qsrwdlxjbsy"></el-input>
            </p>
          </li>
          <li>
            <span></span>
            <p>
            </p>
          </li>
          <li class="text_line">
            <span>事件说明</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.qsrwdsjsm"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>附件</span>
            <p>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :disabled="showxq"
                :limit="3">
                <i style="color: #00a2fd;" v-if="!showxq" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
            </p>
          </li>
          <li>
            <span>填报人</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.qsrwdtbr"></el-input>
            </p>
          </li>
          <li>
            <span>填报时间</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.qsrwdtbsj"
                size="mini"
                type="date"
                :disabled="showxq"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
              <!--<el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.qsrwdtbsj"></el-input>-->
            </p>
          </li>
          <li>
            <span>填报单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.qsrwdtbdw"></el-input>
            </p>
          </li>
          <li>
            <span>填报部门</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.qsrwdtbbm"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>备注</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.qsrwdbz"></el-input>
            </p>
          </li>
          <div style="clear: both"></div>
        </ul>
        <div class="dialog_footer" v-if="!showxq">
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addqsrwd">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="small" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog class="data-dialog el-updata-div" title="选择事件类型" :close-on-click-modal="false" :visible.sync="showyanshou" width="580px">
      <div class="dialog_warp">
        <el-radio v-model="radio" label="1">养护任务单</el-radio>
        <el-radio v-model="radio" label="2">清扫任务单</el-radio>
        <div class="dialog_footer">
          <el-button size="small" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="yanshou">保存</el-button>
          <el-button size="small" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>
    </el-dialog>
    <Dialog :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :dialogVisible="dialogVisible"
            @searchXMMC="searchXMMC"
            @closeDialog="closeDialog">
    </Dialog>
  </div>
</template>

<script>
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
    return {

      pickerType:'year',
      pickerFormat:'yyyy',
      dialogData:[ ],
      dialogTableTit:{
        XMMC:'项目名称',XMBH:'项目编号',
      },
      datatypes:'',
      dialogVisible:false,
      restaurants:[ ],

      lmshForm: {
        xcfx: '上行',
        yhrwmxes: [{}]
      },
      total: 0,
      radio: '1',
      index: '',
      isadd: false,
      addzb: true,
      submitLoading: false,
      showxq: false,
      showSearch: true,
      loading: false,
      tableHeight: 300,
      tableData: [],
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      roadOptions: [],
      searchForm: {xmmc:'',xmbh:'',zt:'',date:''},
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      showDetail1: false,
      showyanshou: false,
      multipleSelection: [],
      filedata: {
        id: 'yhrwdsh' + new Date().getTime(),
        type: 'lyjc'
      },
      formId: '',
      htList: [],
      gldwList: [],
      yhdwList: [],
      xcsjList: [],
      ZZMC: {},
      rwdobj: {},
      dialogImageUrl: '',
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
        supplierpk:null,
      },
      // dialogVisible: false
    }
  },
  methods: {
    resizeSearch(){
      this.searchForm = {xmmc:'',zt:''}
    },
    initUser(){
      let userInfo = JSON.parse(localStorage.getItem('userMsg'))[0]
      if(userInfo){
        this.userInfo = userInfo
        if(userInfo){
          this.userInfo.yhbm = userInfo.userCode
          this.userInfo.yhid = userInfo.userId
          this.userInfo.yhmc = userInfo.userName
          this.userInfo.userType = userInfo.userType
          let deptList = userInfo.deptList
          let bminfo = deptList[0]

          if(bminfo){

            this.userInfo.supplierpk = bminfo.supplierpk
            this.userInfo.bmbh = bminfo.deptCode
            this.userInfo.bmid = bminfo.deptId
            this.userInfo.bmmc = bminfo.deptName
            let org = bminfo.org
            if(org){

              this.userInfo.orgbh = org.orgCode
              this.userInfo.orgid = org.orgId
              this.userInfo.orgmc = org.orgName
            }
          }
        }
      }
    },
    pickerChange(){
      this.searchForm.ksrq = ''
      this.searchForm.jsrq = ''
      if(this.searchForm.alxcx == 1){
        this.pickerType = 'year'
        this.pickerFormat = 'yyyy'
      }else if(this.searchForm.alxcx == 2){
        this.pickerType = 'month'
        this.pickerFormat = 'yyyy-MM'
      }else if(this.searchForm.alxcx == 3){
        this.pickerType = 'date'
        this.pickerFormat = 'yyyy-MM-dd'
      }
      this.search (this.currentPage, this.pageSize)
    },
    initqueryXMMC(){

        this.$api.getmcbhList().then(res => {
          if (res.code == 1) {
            this.restaurants = res.data && res.data.length ? res.data : []
          } else {
            this.restaurants = []
          }
          this.search(1, 10)
        })

    },
    handleSelectMC(item){
      //getXmmcList
      if(item){
        this.searchForm.xmmc = item.XMMC
        this.searchForm.xmbh = item.XMBH
      }else{
        this.searchForm.xmmc = ''
        this.searchForm.xmbh = ''
      }


    },
    showDialog(bol){
      this.dialogVisible = true
      this.datatypes = bol
      this.$api.getmcbhList().then(res=>{
        if(res.code == 1){
          this.dialogData = res.data&&res.data.length?res.data:[]
        }else{
          this.dialogData = []
        }
      })
    },
    querySearchMC(queryString, cb) {
      let  restaurants = this.restaurants;
      let results = queryString ? restaurants.filter(this.createFilter(queryString,'XMMC')) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString,val) {
      return (restaurant) => {
        return (restaurant[val].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    searchXMMC(val){
      this.$api.getXmmcListt({xmmc:val}).then(res=>{
        if(res.code == 1){
          this.dialogData = res.data&&res.data.length?res.data:[]
        }else{
          this.dialogData = []
        }
      })
    },
    closeDialog(val){
      this.dialogVisible = false
      if(val){
        this.searchForm.xmmc = val.XMMC
        this.searchForm.xmbh = val.XMBH
      }
    },

    yanshou () {
      if (this.radio === '1') {
        this.lmshForm.yhrwddjbh = this.formId
        this.lmshForm.yhrwdrq = this.formatDate(new Date())
        this.lmshForm.yhrwdyd = this.formatMonth(new Date())
        this.lmshForm.yhrwdlx = 'G70'
        this.lmshForm.rwmxIdArr = this.rwdobj.bhid
        this.lmshForm.yhrwmxes[0].yhrwddjbh = this.rwdobj.bhid
        this.lmshForm.yhrwmxes[0].yhrwdxcdw = this.rwdobj.bmmc
        this.lmshForm.yhrwmxes[0].yhrwdxcfx = this.rwdobj.xcfx
        this.lmshForm.yhrwmxes[0].yhrwddwgc = this.rwdobj.dwgc
        this.lmshForm.yhrwmxes[0].yhrwdzh = this.rwdobj.zh
        this.lmshForm.yhrwmxes[0].yhrwdbhsm = this.rwdobj.bhsm
        this.lmshForm.yhrwmxes[0].yhrwdbhlx = this.rwdobj.bhlxname
        this.lmshForm.yhrwmxes[0].yhrwdbhsl = this.rwdobj.bhsl
        this.lmshForm.yhrwmxes[0].yhrwdcd = this.rwdobj.cd
        this.lmshForm.yhrwmxes[0].yhrwdbhlx = this.rwdobj.bhlxname
        this.showDetail = true
      } else {
        this.lmshForm.bhid = this.rwdobj.bhid
        this.lmshForm.qsrwddjbh = this.formId
        this.lmshForm.qsrwdxxly = this.rwdobj.xxly
        this.lmshForm.qsrwdsjlx = this.rwdobj.sjlxname
        this.lmshForm.qsrwdsjsj = this.rwdobj.tbrq
        this.lmshForm.qsrwdsjdd = this.rwdobj.sjdd
        this.lmshForm.qsrwdsjld = this.rwdobj.sjld
        this.lmshForm.qsrwdsjsm = this.rwdobj.sjsm
        this.lmshForm.qsrwdzh = this.rwdobj.zh
        this.lmshForm.qsrwdfx = this.rwdobj.xcfx
        this.lmshForm.qsrwdlxr = this.rwdobj.tbr
        this.lmshForm.qsrwdlxdh = this.rwdobj.tp
        this.showDetail1 = true
      }
    },
    handleRemove (file, fileList) {
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      // this.dialogVisible = true
    },
    changeFile (file, fileList) {},
    showAdd (row) {
      this.showxq = false
      this.isadd = true
      this.rwdobj = row
      this.formId = 'rwdsh' + new Date().getTime()
      this.showyanshou = true
    },
    updateFormDia (row, index) {
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.index = index
    },
    showBhFormDia (row) {
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
    },
    search (currentPage, pageSize) {
      this.showSearch = false
       let {orgid,supplierpk,userType} = this.userInfo
      if(userType&&userType =='供应商'){

        if(this.restaurants.length){
          if(this.restaurants[0].XMBH){
            this.searchForm.xmbh = this.restaurants[0].XMBH
          }
        }
      }
      // this.searchForm.xmbh = this.searchForm.xmmc? this.searchForm.xmbh:undefined
      let {zt,xmbh,date} = this.searchForm
      this.$api.getRcyhgcSjqdList({
        daZzid:orgid,
        zt:zt?zt:undefined,
        xmbh:xmbh?xmbh:undefined,
        yhdwId:supplierpk&&supplierpk !== '~'?supplierpk:undefined,
        startDate:date[0]?date[0]:undefined,
        endDate:date[1]?date[1]:undefined,
        pageNum:currentPage,
        pageSize}).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.tableData = resp.data.data.rows
          this.total = resp.data.data.totle
        }
      }).catch(e => {
        this.loading = false
      })
    },
    addSubmit () {
      this.lmshForm.id = this.formId
      this.lmshForm.yhrwmxes = []
      this.$api.yhrwdshinsert(this.lmshForm).then(res => {
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
    addqsrwd () {
      this.lmshForm.id = this.formId
      this.$api.qsrwdshinsert(this.lmshForm).then(res => {
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
      this.$api.yhrwdshupdate(this.lmshForm).then(res => {
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

          /* let djbharr = {}
           this.multipleSelection.map((item, index) => {

           djbharr[index] = item.djbh
           }) */
          let djbharr = ''
          this.multipleSelection.map((item, index) => {

            djbharr = djbharr + item.yhrwddjbh + ','
          })
          djbharr = djbharr.slice(0, djbharr.length - 1)

          this.$api.yhrwdshdelete('?yhrwddjbh=' + djbharr).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.search(this.currentPage, this.pageSize)
              // this.resetForm()
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
    addzibiao () {
      this.lmshForm.yhrwmxes.push({yhrwdid: this.lmshForm.id})
    },
    deletezibiao (index) {
      this.lmshForm.yhrwmxes.splice(index, 1)
    },
    ceshi () {
      this.$message({
        type: 'error',
        message: '内容格式不符合要求'
      })
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
    resetForm () {
      this.showDetail = false
      this.showDetail1 = false
      this.showyanshou = false
      this.lmshForm = {
        yhrwmxes: [{}]
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
    selectyhdw (value) {
      /* this.$api.rcyhXxrwgetBhListByDW('?dw=' + value).then(res => {
        if (res.status === 200 && res.data.code === 1) {
          this.lmshForm.yhrwmxes = res.data.data
          let arrid = ''
          this.lmshForm.yhrwmxes.map(item => {
            arrid = arrid + item.bhid + ','
          })
          arrid = arrid.slice(0, arrid.length - 1)
          this.lmshForm.rwmxIdArr = arrid
        }
      }).catch(e => {
      }) */
      this.lmshForm.yhrwdyhdw = value.ZZMC
    },
    getQmldbb () {
      if (this.qmbbOptions.length > 0) { return }
      this.$api.commoncreateZzxxList().then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else if (resp.data.code === 1) {
          this.qmbbOptions = resp.data.data
          this.lxData = {
            lxcode: this.qmbbOptions[0].lxcode
          }
          this.searchForm.lxcode = this.qmbbOptions[0].lxcode
          this.searchForm.xcfx = '0301'
          this.search(this.currentPage, this.pageSize)
        }
      }).catch(e => {
      })
    },
    selectHt (value) {
      this.lmshForm.htbh = value.htbh
      this.lmshForm.htmc = value.htmc
      this.lmshForm.yhdwmc = value.yh_cbdw
      this.lmshForm.gldw = value.yh_gldw
      this.lmshForm.xmmc = value.yh_dwgc
    }
  },
  mounted () {
    this.initUser()
    this.initqueryXMMC()
    this.$api.getHtxxRelatedAll('').then(res => {
      this.htList = res.data.data
    })
    this.$api.commoncreateZzxxList().then(res => {
      this.yhdwList = res.data.data
    })
    this.$api.querygldw().then(res => {
      this.gldwList = res.data.data
    })
    this.$api.xcsbgetXcsb('?pageNum=1&pageSize=100').then(res => {
      this.xcsjList = res.data.data.list
    })
    // this.getQmldbb()
    // this.search(this.currentPage, this.pageSize)

    // this.getXcRoadOptions()
    // this.tableHeight = $('#xccsfx')[0].offsetHeight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #xccsfx{
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    overflow: auto;
    .header{}
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
            display: inline-block;
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
      .zibnr,.zibiaonr{
        width: 100%;
        position: relative;
        padding: 15px 0 0 0;
        overflow: hidden;
        text-align: center;
        box-sizing: border-box;
        .el-upload-list--picture-card .el-upload-list__item, .el-upload--picture-card{
          width: 30px!important;
          height: 20px!important;
          border-radius: 0!important;
          line-height: 20px!important;
          margin: 5px 0!important;
          i{
            font-size: 12px!important;
            margin: 0!important;
          }
        }
        .el-upload-list__item-status-label{
          display: none !important;
        }
        >ul{
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 15px;
          >li{
            width: 1800px;
            height: 32px;
            float: left;
            box-sizing: border-box;
            border: 1px solid #D5D6D7;
            color: #52575D!important;
            font-size: 12px;
            border-right: none;
            border-bottom: none;
            &:nth-of-type(1){
              height: 60px;
            }
            &:nth-last-of-type(1),&:nth-last-of-type(2){
              border-bottom: 1px solid #D5D6D7;
            }
            >span{
              width: calc(100%/12);
              display: inline-block;
              height: 100%;
              float: left;
              line-height: 31px;
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
              width: calc(100%/12);
              height: 100%;
              line-height: 32px;
              float: left;
              border-right: 1px solid #D5D6D7;
              .el-input__inner{
                border: none;
                text-align: center;
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
