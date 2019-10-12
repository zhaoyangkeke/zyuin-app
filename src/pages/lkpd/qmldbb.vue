/**
* ----路面损坏
*/
<template>
  <div id="lkpdlmsh" class="styleSheets" style="height: 100%" v-loading="loading">
    <div class="bill-header">
      <div class="bill-title">
        <span>千米路段版本管理</span>

        <ul>
            <!-- <li @click="showAdd"><i class="el-icon-download">新增</i></li> -->
            <li @click="showAdd()" class="Hight_btn">新增</li>
         <li @click="deleteData()">删除</li>
        </ul>

      </div>
      <div class="bill-search" v-if="showdrxz">
          <el-form :inline="true" :model="drForm" ref="drForm" class="drForm">
            <el-form-item style="margin-bottom: 0px" label="路线名称" prop="" class="">
              <el-select clearable size="mini" style="width: 150px;" v-model="lxDatas" value-key="id" placeholder="路线名称" @change="changelxdr">
                <el-option v-for="item in qmbbOptions" :key="item.id" :label="item.ldname" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px" label="行车方向" prop="" class="">
              <el-select clearable size="mini"  class="" style="width: 150px;" placeholder="请选择方向" v-model="drForm.xcfx">
                <!--<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>-->
                <el-option label="上行" value="上行"></el-option>
                <el-option label="下行" value="下行"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <!-- <el-button size="small" type="text" @click="showdrxz=false" style="width: 64px;height: 28px;background-color: #F2F3F5;border-radius: 4px;color: #666A6F">取消</el-button> -->
              <el-button size="mini" @click="showAdd()" style="background-color: #3288f3;border-color:transparent;color: #fff">导入</el-button>
            </el-form-item>
          </el-form>
        </div>
      <div class="bill-search" style="" v-if="showSearch">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <!-- <el-form-item style="margin-bottom: 0px" label="路线名称" prop="" class="">
            <el-select clearable size="mini" style="width: 150px;" v-model="lxData" value-key="id" placeholder="路线名称" @change="changelx">
              <el-option v-for="item in qmbbOptions" :key="item.id" :label="item.ldname" :value="item"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
           <el-input clearable size="mini" type="text" v-model="searchForm.bbmc" placeholder="请输入版本名称"></el-input>
          </el-form-item>
      <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-date-picker
              v-model="searchForm.bbsj"
              type="daterange"
              size="mini"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="版本开始日期"
              end-placeholder="版本结束日期">
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
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                style="width: 100%;height: calc(100% - 46px);overflow:auto;"
                row-class-name="row_class"
                 @row-dblclick="dbclick"
                  @row-click="sigClic"
                border
                :row-style="{fontFamily: 'Microsoft YaHei', fontSize: '12px'}"
                @selection-change="handleSelectionChange">
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
        
        <el-table-column sortable align="left" prop="bbid" label="版本编码"  show-overflow-tooltip></el-table-column>
          <el-table-column align="left" class-name="column-caoz" label="版本名称" >
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center;text-decoration: underline;" @click="showDialog('bb',scope.row, scope.$index)">{{scope.row.bbmc}}</span>
          </template>
        </el-table-column>
        <el-table-column  sortable align="left" width="100" prop="bbsj" label="版本时间"></el-table-column>
        <el-table-column sortable align="left" prop="czr" label="操作人"></el-table-column>
        <el-table-column sortable align="left" prop="dwmc" label="单位名称"></el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="80">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
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
    
   <el-dialog fullscreen class="data-dialog el-updata-div"   :close-on-click-modal="false" :visible.sync="showDetail" width="580px" :show-close="false">
     <span slot="title">
          <span class="titleclasschild"  @click="resetForm('lmshForm')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>千米路段版本</span>
      </span>
      <el-form v-if="showxq"  :model="lmshForm"   ref="lmshForm" label-width="100px" class="demo-lmshForm">
      <div class="showxq" v-if="showxq" style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>版本编码: </span>
              <span>{{lmshForm.bbid}}</span>
            </p>
            <p   class=" addJLD"   >
              <span>版本名称: </span>
              <span>{{lmshForm.bbmc}}</span>
            </p>
            
            <p   class=" addJLD">
              <span>版本时间: </span>
              <span>{{lmshForm.bbsj}}</span>
            </p>
            <p   class=" addJLD">
              <span>操作人: </span>
              <span>{{lmshForm.czr}}</span>
            </p>
            <p   class=" addJLD">
              <span>单位名称: </span>
              <span>{{lmshForm.dwmc}}</span>
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
        <el-form v-if="!showxq" :model="lmshForm" :rules="lkpdfa" ref="lmshForm" label-width="100px" class="demo-lmshForm">
                  <el-form-item class=" addJLD" label="版本编码" prop="bbid">
                 <span class="edit_text">{{lmshForm.bbid}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="版本名称" prop="bbmc">
                <el-input size="mini" type="text" v-model="lmshForm.bbmc"></el-input>
              </el-form-item>
             <el-form-item class=" addJLD" label="版本时间" prop="bbsj">
               <el-date-picker
               
                v-model="lmshForm.bbsj"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                >
              </el-date-picker>
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
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="small" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
  </el-form>
     
    </el-dialog>
    <DialogBb  v-if="showDialogs"
            :dialogTableTit="dialogTableTit"
            :bt="'千米路段明细'"
            :bbid="bbid"
            :lxxx="qmbbOptions"
            :bmbm="userInfo.daBmbm"
            :dwbm="userInfo.daZzbh"
            :dialogVisible="dialogVisible"
            @closeDialog="closeDialog"></DialogBb>
  </div>
</template>

<script>
import DialogBb  from './qm_dialog'
export default {
  components: {DialogBb},
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
      dialogTableTit:{ bbmc:'版本名称',lxbm:'路线编码',lxmc:'路线名称',qdzh:'起点桩号',zdzh:'止点桩号',fx:'方向',lmlx:'路面类型',lmkd:'路面宽度'},
      dialogVisible:false,
      bbid:'',
      showDialogs:false,
      typeZc:'',

      upUrl:'',
      lkpdfa:{
        famc: [
            { required: true, message: '方案名称不能为空',trigger: 'blur'},
            { min: 1, message: '请填写方案名称'}
          ], 
        sjsjsx: [
            { required: true, message: '时间上限不能为空',trigger: 'blur'},
            { min: 1, message: '请填写时间上限'}
          ],
        sjsjxx : [
            { required: true, message: '时间下限不能为空',trigger: 'blur'},
            { min: 1, message: '请填写时间下限'}
          ],
     
      },
      src: '',
      lmshForm: {
        bbbm:'',
        czr:''
      },
      index: '',
      isadd: false,
      submitLoading: false,
      showxq: false,
      showSearch: true,
      loading: false,
      tableHeight: 300,
      tableData: [],
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      lxData: {
        id: '',
        ldname: ''
      },
      roadOptions: [],
      searchForm: {
         xcfx: '上行'
      },
      drForm:{
        xcfx: '上行'
      },
      lxDatas: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      personelForm: {},
      showDetail: false,
      showdrxz: false,
      multipleSelection: [],
      dataList:[],
      fileList:[],
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
      
    }
  },
  methods: {
    showDialog(type,row,index){
        this.typeZc=type
        this.bbid=row.bbid
        this.showDialogs=true
     this.dialogVisible = true
      
      },
      closeDialog(val){
        this.dialogVisible= false
        this.showDialogs=false
        if(val==undefined || val=='undefined'){
          return
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
    },
    chaxBtn(){
      this.showSearch=true;
      this.showdrxz=false
    },
    drBtn(){
      this.showSearch=false;
      this.showdrxz=true
    },
    showAdd () {
      
      this.showxq = false
      this.isadd = true
      this.$api.getQmldbh().then(res => {

        if (res.data.code == 1) {
          this.showDetail = true
          this.lmshForm.bbid = res.data.data.BBID
          this.lmshForm.czr = this.userInfo.daYhmc
          this.lmshForm.dwmc =  this.userInfo.daZzmc
          this.lmshForm.dwbm = this.userInfo.daZzbh
          this.lmshForm.bbsj = this.formatDate(new Date())
          this.lmshForm.tbsjc= new Date().getTime()
                  console.log(this.lmshForm)
        } else {
          this.$message({type: 'error', message: '版本编号获取失败'})
        }
      }).catch((e) => {
  
      })
    },
    updateFormDia (row, index) {
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.$api.getFilesDataById('?id='+this.lmshForm.bbid).then(res=>{
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
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.$api.getFilesDataById('?id='+this.lmshForm.bbid).then(res=>{
       if(res.data.code==1){
         this.fileList=res.data.data
 
         this.showDetail = true
        this.showxq = true
       }
     }).catch(er=>{
     })
      
    },
    sigClic (row){
this.$refs.multipleTable.toggleRowSelection(row)
    },
    dbclick (row){
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.$api.getFilesDataById('?id='+this.lmshForm.bbid).then(res=>{
       if(res.data.code==1){
         this.fileList=res.data.data
 
         this.showDetail = true
        this.showxq = true
       }
     }).catch(er=>{
     })
    },
    addSubmit () {
      if(this.dataList.length>0){
      for (let index = 0; index < this.dataList.length; index++) {
        this.dataList[index].file_id=this.lmshForm.bbid   
      }
       let fileDatas=this.dataList
       this.$api.addFileData(fileDatas).then(res=>{
         if (res.data.code === 1) {
           
          this.dataList=[]
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
       })
      }
     this.$api.addQmldList(this.lmshForm).then(res => {
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
        this.dataList[index].file_id=this.lmshForm.bbid 
      }
       let fileDatas=this.dataList
       console.log(fileDatas)
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
    }else{

    }
      this.$api.editQmldList(this.lmshForm).then(res => {
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
            djbharr = djbharr + item.ldid + ','
          })
          djbharr = djbharr.slice(0, djbharr.length - 1)
          this.$api.delQmldByIds('?ldid=' + djbharr).then(res => {
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
    search (currentPage, pageSize) {
      this.loading = true
      if (this.searchForm.bbsj) {
        this.searchForm.ksrq = this.searchForm.bbsj[0]
        this.searchForm.jsrq = this.searchForm.bbsj[1]
      } else {
        this.searchForm.ksrq = ''
        this.searchForm.jsrq = ''
      }
     this.$api.getQmldListType('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
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
    resetForm () {
      this.showDetail = false
      this.isadd=false
      this.showxq=false
      this.lmshForm = {
        bbbm:'',
        czr:''
      }
      this.drForm={
        xcfx: '上行'
      }
      this.lxDatas = {}
      this.search(1,10)
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
    changelxdr (value) {
      this.drForm.ldcode = value.ldcode
      this.drForm.lxcode = value.lxcode
      this.drForm.bbid = '10220'
      this.drForm.szhh = value.szhh
      this.drForm.ezhh = value.ezhh
    },
    changelx (value) {
      this.searchForm.ldcode = value.ldcode
      this.searchForm.lxcode = value.lxcode
      this.searchForm.xcfx = '上行'
      this.searchForm.bbid = '10220'
      this.searchForm.szhh = value.szhh
      this.searchForm.ezhh = value.ezhh
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
     
    },
    getQmldbb () {
 
      this.$api.commongetLd('?bmCode=' + this.userInfo.daZzbh).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else if (resp.data.code === 1) {
          this.qmbbOptions = resp.data.data
 
        }
      }).catch(e => {
      })
      this.$api.getQmldListType('?pageNum=' + 1 + '&pageSize=' + 1000000+ '&dwbm='+ this.userInfo.daZzbh).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.qmldbb= resp.data.data.list
        }
      }).catch(e => {
      })
    }
  },
  mounted () {
    this.initUser()
    // this.getTbdw(this.userInfo.daZzbh,this.userInfo.daBmbm)
    this.searchForm.dwdm=  this.userInfo.daZzbh
    this.getQmldbb()
    this.search(1,10)
    this.tableHeight = $('#lkpdlmsh')[0].offsetHeight
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
  #lkpdlmsh{
    .el-dialog__header{
      height: 100%;
    }
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    overflow: auto;
    min-width: 1100px;
    .header{}
    .conter_table{
      height: calc(100% - 97px);
      min-height: 300px;
      padding: 0px;
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
         &:nth-of-type(1){
          border-right: 0 solid #D0D0D0;
        }
        a{
          color: white;
        }
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
      padding: 20px 40px;
      ul{
        li{
          width: calc(100% / 3);
          height: 40px;
          float: left;
          border: 1px solid #D5D6D7;
          border-bottom: none;
          border-right: none;
          color: #52575D!important;
          font-size: 12px;
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
            line-height: 38px;
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
    }
  }
</style>
