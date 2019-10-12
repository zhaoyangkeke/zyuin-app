/**
* ----路况评定方案
*/
<template>
  <div id="lkpdlmsh" class="styleSheets" style="height: 100%" >
    <div class="bill-header">
      <div class="bill-title">
        <span>路况评定方案</span>
        <!--<div class="jianlimb" @click="showAdd()"><i class="el-icon-download"> 建立方案</i></div>-->
        <ul>
          <li  class="Hight_btn"><a href="http://61.141.223.10:8002/lkpd/dcmb/getJszkmxbList"><i class="el-icon-download"> 模版下载</i></a></li>
          <li @click="showAdd()"><i class="el-icon-edit-outline">建立方案</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
      <div class="bill-search" style="">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="">
              <el-input clearable v-model="searchForm.famc" size="mini" placeholder="请输入方案名称"></el-input>
              <!--<selectTree class="selectTree" v-model="searchForm.bmname" :isDefaultselect="true" :urlFunc="$api.requestBmtreeAll" :dataKey="{name: 'bmname'}" placeholder="请选择部门" @treeSelect="selecttreeBm"></selectTree>-->
            </el-form-item>
          </el-form-item>
          <!--<el-form-item style="margin-bottom: 0px" label="行车方向" prop="" class="">
            <el-select size="mini"  class="" placeholder="请选择方向" v-model="searchForm.xcfx">
              &lt;!&ndash;<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>&ndash;&gt;
              <el-option label="上行" value="上行"></el-option>
              <el-option label="下行" value="下行"></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-date-picker
              v-model="searchForm.jcrq"
              type="daterange"
              size="mini"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="时间上限"
              end-placeholder="时间下限">
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
                v-loading="loading"
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
        
      <el-table-column align="left" class-name="column-caoz" label="方案名称" >
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center;text-decoration: underline;" @click="showDialog('bb',scope.row, scope.$index)">{{scope.row.famc}}</span>
          </template>
        </el-table-column>
        <el-table-column sortable width="100" align="left" prop="sjsjxx" label="时间上限" show-overflow-tooltip></el-table-column>
        <el-table-column sortable width="100"  align="left" prop="sjsjsx" label="时间下限"></el-table-column>
        <el-table-column sortable align="left" prop="tbr" label="填报人"></el-table-column>
        <el-table-column sortable width="100"  align="left" prop="tbsj" label="填报时间"></el-table-column>
        <el-table-column sortable align="left" prop="tbdw" label="填报单位"></el-table-column>
        <el-table-column sortable align="left" prop="tbbm" label="填报部门"></el-table-column>
        <!-- <el-table-column align="left" prop="sl" label="附件数量"></el-table-column> -->
        <el-table-column sortable align="left" prop="remark" label="备注"></el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="150">
          <template scope="scope" >
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="creatDate(scope.row)">生成数据</span>
            <el-upload
            class="upload-demo"
             :http-request="url"
              :show-file-list='false'
               action="">
      <div class="el-upload__text" style="color:#00a2fd;cursor: pointer;text-align: center"><em @click="fuzhu(scope.$index)">导入数据</em></div>
      </el-upload>
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
    
    <el-dialog fullscreen class="data-dialog el-updata-div" title="路况评定方案" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" :show-close="false">
       <span slot="title">
          <span class="titleclasschild"  @click="resetForm('lmshForm')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>路况评定方案</span>
      </span>
      <el-form v-if="showxq"  :model="lmshForm"   ref="lmshForm" label-width="100px" class="demo-lmshForm">
      <div class="showxq" v-if="showxq" style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>单据编号: </span>
              <span>{{lmshForm.djbh}}</span>
            </p>
            <p   class=" addJLD"   >
              <span>方案名称: </span>
              <span>{{lmshForm.famc}}</span>
            </p>
            
            <p   class=" addJLD">
              <span>数据时间下限: </span>
              <span>{{lmshForm.sjsjxx}}</span>
            </p>
            <p   class=" addJLD">
              <span>数据时间上限: </span>
              <span>{{lmshForm.sjsjsx}}</span>
            </p>
            <p   class=" addJLD">
              <span>填报人: </span>
              <span>{{lmshForm.tbr}}</span>
            </p>
            <p   class=" addJLD">
              <span>填报单位: </span>
              <span>{{lmshForm.tbdw}}</span>
            </p>
            <p   class=" addJLD">
              <span>填报部门: </span>
              <span>{{lmshForm.tbbm}}</span>
            </p>
            <p   class=" addJLD">
              <span>填报时间: </span>
              <span>{{lmshForm.tbsj}}</span>
            </p>
            <p   class=" addJLD_long">
              <span>备注: </span>
              <span>{{lmshForm.remark}}</span>
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
                  <el-form-item class=" addJLD" label="单据编号" prop="djbh">
                 <span class="edit_text">{{lmshForm.djbh}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="方案名称" prop="famc">
                <el-input size="mini" type="text" v-model="lmshForm.famc"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD" label="数据时间上限" prop="sjsjxx">
               <el-date-picker
     
                v-model="lmshForm.sjsjxx"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :onchange="selectSj">
              </el-date-picker>
              </el-form-item>
              <el-form-item class=" addJLD" label="数据时间下限" prop="sjsjsx">
                 <el-date-picker
               
                v-model="lmshForm.sjsjsx"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :onchange="selectSj">
              </el-date-picker>
              </el-form-item>
             
              
              

               <el-form-item class=" addJLD_long" label="备注" prop="remark">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lmshForm.remark"></el-input>
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
             

         <div class="dialog_footer" v-if="!showxq">
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="small" @click="resetForm('lmshForm')" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
  </el-form>

    </el-dialog>
    <DialogFa  v-if="showDialogs"
            :bt="'技术状况评定明细表'"
            :bbid="bbid"
            :sjlx="sjlx"
            :lxxx="lxdatas"
            :bmbm="userInfo.daBmbm"
            :dwbm="userInfo.daZzbh"
            :dialogVisible="dialogVisible"
            @closeDialog="closeDialog"></DialogFa>
  </div>
</template>

<script>
import DialogFa  from './fa_dialog'
import axios from 'axios'
export default {
  components: {DialogFa},
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
      sjlx:'',
      dialogVisible:false,
      bbid:'',
      showDialogs:false,
      typeZc:'',
      lxdatas:[],
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
      lmshForm: {
        djbh:'',
        famc:'',
        tbsj: this.formatDate(new Date())
      },
      total: 0,
      index: '',
      fzindex:'',
      isadd: false,
      submitLoading: false,
      inuptloading: false,
      showxq: false,
      showSearch: true,
      loading: false,
      tableHeight: 300,
      tableData: [],
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      roadOptions: [],
      searchForm: {},
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      multipleSelection: [],
      filedata: {
        'id': '',
        'type': 'lkpdfa'
      },
      fileList: [],
      pdfa: {},
      dataList:[],
      fileList:[],
      tbdwList:[],
      dwbm:'102',
      userData:'',
      selectDw:'',
      defaultProps:{
          children: 'children',
          label: 'text'
        },
      deleArr:'',
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
        this.bbid=row.djbh
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
    showAdd () {
      this.fileList=[]
      this.isadd = true
      this.showDetail = true
      this.inuptloading = true
      this.showxq = false
      this.$api.getDjbhForLksjcx().then(res => {
        if ( res.data.code === 1) {
          this.filedata.id = res.data.data.DJBH
          console.log(res.data.data.DJBH)
          this.lmshForm.djbh = res.data.data.DJBH
          this.inuptloading = false

      this.lmshForm.tbsjc= new Date().getTime()
      this.lmshForm.tbdw = this.userInfo.daZzmc
      this.lmshForm.tbr = this.userInfo.daYhmc
      this.lmshForm.tbbm =  this.userInfo.daBmmc
      this.lmshForm.tbdwdm=this.userInfo.daZzbh
      this.lmshForm.tbbmdm=this.userInfo.daBmbm
      this.showDetail = true

        } else {
          this.$message({type: 'error', message: '单据编号获取失败'})
        }
      }).catch(() => {
        this.$message({type: 'error', message: '单据编号获取失败'})
      })
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
      this.getfilebyid()
    },
    getfilebyid () {
      this.$api.getFilesDataById('?id=' + this.lmshForm.djbh).then(res => {
        this.fileList = res.data.data
        this.fileList.map(item => {
          item.name = item.file_yname
        })
      })
    },
    handleRemove (fileid) {
      // this.$api.deleteFilesById('?ids=' + fileid).then(res => {})
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
      this.getfilebyid()
    },
    sigClic (row){
this.$refs.multipleTable.toggleRowSelection(row)
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
      this.getfilebyid()
    },
    search (currentPage, pageSize) {
      this.showSearch = false
      if (this.searchForm.jcrq) {
        this.searchForm.sjsjsx = this.searchForm.jcrq[1]
        this.searchForm.sjsjxx = this.searchForm.jcrq[0]
      }else{
        this.searchForm.sjsjsx=''
        this.searchForm.sjsjxx=''
      }
      this.$api.getFaForLksjcx('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
        console.log(resp)
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
      this.$refs['lmshForm'].validate((valid) => {
          if (valid) {
if (new Date(Date.parse(this.lmshForm.sjsjxx)) > new Date(Date.parse(this.lmshForm.sjsjsx))) {
          this.$message({
            message: '上限时间晚于下限时间',
            type: 'error'
          })
        } else {

          this.$api.getFamc('?famc=' + this.lmshForm.famc).then(res => {
            if (res.data.code === 1) {
              this.pdfa = res.data.data
               if (res.data.data !=  null ||res.data.data!=undefined) {
            this.$message({
              type: 'error',
              message: '方案名称已存在!'
            })
            return
          } else {
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
            this.$api.addFaForLksjcx(this.lmshForm).then(res => {
              if (res.data.code === 1) {
                // this.rukufile()
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
          
          })
          
         
        }
            } else {
            return false;
          }
        });

        
      
    },
    updateSubmit () {
      this.handleRemove(this.lmshForm.djbh)
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
      this.$api.editFaForLksjcx(this.lmshForm).then(res => {
        if (res.data.code === 1) {
          // this.rukufile()
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
          this.$api.delFaForLksjcx('?djbhs=' + djbharr).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.handleRemove(this.lmshForm.djbh)
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
    creatDate (row){
     this.dwbm=this.userInfo.daZzbh
     let obj={
       bbid: row.djbh,
       pdsj:row.tbsj,
       dwbm:this.dwbm
     }
     this.loading=true
     this.$api.createMxbDataForLksjcx('?bbid='+row.djbh+'&pdsj='+row.tbsj+'&dwbm='+this.dwbm).then(resp => {
        if (resp.data.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.loading=false
         this.$message({
            message: '生成数据成功',
            type: 'success'
          }) 
 
        this.typeZc='bb'
        this.sjlx='生成数据'
        this.bbid=row.djbh
 
        this.showDialogs=true
 
       this.dialogVisible = true
 
        }
      }).catch(e => {
      })
    },
    selectSj () {
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
    url(param){
    this.loading=true
    var fileObj = param.file;
    // 接收上传文件的后台地址
    var form = new FormData();
    // 文件对象
    form.append("file", fileObj);
    // 其他参数
    form.append("bbid", this.fzindex.djbh);
    form.append("pdsj", this.fzindex.tbsj);
    form.append("dwbm", this.userInfo.daZzbh);
    form.append("dwmc", this.userInfo.daZzmc);
    form.append("czr", this.userInfo.daYhmc);
     form.append("tbsjc", new Date().getTime());
   axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    axios({
    method:"post",
    url:'/lkpd/cx/import',
    data:form,
    headers:{
        'Content-Type': 'multipart/form-data'
    }
}).then(res=>{
  this.loading=false
      if(res.data.code==0){
        this.$message({
          type: 'error',
          message: res.data.msg
        })
      }else if(res.data.code==1){

        this.$message({
                type: 'success',
                message: '导入成功'
            })
         this.typeZc='bb'
        this.sjlx='导入数据'
        this.bbid=row.djbh
 
        this.showDialogs=true
 
       this.dialogVisible = true
      }
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
    /* getPage (currentPage, pageSize) {
      this.loading = true
      this.$api.getFaForLksjcx('?pageNum=' + currentPage + '&pageSize=' + pageSize).then(resp => {
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
    }, */
    resetForm (res) {
      this.showDetail = false
      this.loading=false
      if(res!==undefined && res.target==undefined){
      if(this.$refs[res] != undefined){
        this.$refs[res].resetFields();
        }
      }
      this.lmshForm = {
        djbh:'',
        tbr: '',
        famc:'',
        tbdw: '',
        tbbm: '',
        tbsj: this.formatDate(new Date())
      }
      this.fileList = []
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
    getQmldbb () {
      this.$api.commongetLd('?bmCode=' + this.userInfo.daZzbh).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else if (resp.data.code === 1) {
          this.lxdatas = resp.data.data
        console.log(this.lxdatas)
 
        }
      }).catch(e => {
      })
      // this.$api.requestLkpdbbkQueryQmldbb('0201').then(resp => {
      //   if (resp.status !== 200) {
      //     this.$message({
      //       message: '出错了',
      //       type: 'error'
      //     })
      //   } else {
      //     this.qmbbOptions = resp.data
      //     this.searchForm.qmbbid = this.qmbbOptions[0].bbid
      //   }
      // }).catch(e => {
      // })
    },
    getTbdw(code){

        this.$api.getUserDw('?yhdw='+code).then(res=>{
          if(res.data.code===1){
          this.tbdwList= res.data.data
          this.selectDw=this.tbdwList[0].text
          this.searchForm.tbdwdm= this.tbdwList[0].id
          this.search(1, 10)
          }
        })
    },
    fuzhu(e){
      this.fzindex=this.tableData[e]
    },
    
  },
  mounted () {
    this.initUser()
    this.getQmldbb()
    this.getTbdw(this.userInfo.daZzbh,this.userInfo.daBmbm)
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
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    min-width: 1100px;
    overflow: auto;
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
