/**
* ----路况评定方案
*/
<template>
  <div id="lkpdlmsh" class="styleSheets" style="height: 100%" >
    <div class="bill-header">
      <div class="bill-title">
        <span>路线管理</span>
        <ul>
          <li class="Hight_btn" @click="showAdd()"><i class="el-icon-edit-outline">添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
      <div class="bill-search" style="">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="">
              <el-input clearable v-model="searchForm.ldname" size="mini" placeholder="请输入路线名称"></el-input>
            </el-form-item>
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
        
        <el-table-column align="left" sortable prop="ldname" label="路线名称" show-overflow-tooltip></el-table-column>
        <el-table-column sortable width="100" align="left" prop="ldcode" label="路线编码" show-overflow-tooltip></el-table-column>
        <el-table-column sortable width="100"  align="left" prop="szhh" label="起点桩号"></el-table-column>
        <el-table-column sortable  width="100" align="left" prop="ezhh" label="止点桩号"></el-table-column>
        <el-table-column sortable  width="120" align="left" prop="mileage" label="路线长度（m）"></el-table-column>
        <el-table-column sortable align="left" prop="tbdw" label="所属单位"></el-table-column>
         <el-table-column sortable align="left" prop="tbsj" label="创建时间"></el-table-column>
          <el-table-column sortable align="left" prop="tbr" label="创建人"></el-table-column>
        <el-table-column sortable align="left" prop="bz" label="备注"></el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="150">
          <template scope="scope" >
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
    
    <el-dialog fullscreen class="data-dialog el-updata-div" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" :show-close="false">
       <span slot="title">
          <span class="titleclasschild"  @click="resetForm('lmshForm')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>路线管理</span>
      </span>
      <el-form v-if="showxq"  :model="lmshForm"   ref="lmshForm" label-width="100px" class="demo-lmshForm">
      <div class="showxq" v-if="showxq" style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>单据编号: </span>
              <span>{{lmshForm.djbh}}</span>
            </p>
            <p   class=" addJLD"   >
              <span>路线名称: </span>
              <span>{{lmshForm.ldname}}</span>
            </p>
            <p   class=" addJLD"   >
              <span>路线编码: </span>
              <span>{{lmshForm.ldcode}}</span>
            </p>
            <p   class=" addJLD"   >
              <span>起点桩号: </span>
              <span>{{lmshForm.szhh}}</span>
            </p>
            <p   class=" addJLD"   >
              <span>止点桩号: </span>
              <span>{{lmshForm.ezhh}}</span>
            </p>
            <p   class=" addJLD"   >
              <span>所属单位: </span>
              <span>{{lmshForm.tbdw}}</span>
            </p>
            <p   class=" addJLD"   >
              <span>创建人: </span>
              <span>{{lmshForm.tbr}}</span>
            </p>
            <p   class=" addJLD_long">
              <span>备注: </span>
              <span>{{lmshForm.bz}}</span>
            </p>
  
      </div>
      </el-form>
        <el-form v-if="!showxq" :model="lmshForm" :rules="lkpdfa" ref="lmshForm" label-width="100px" class="demo-lmshForm">
                  <el-form-item class=" addJLD" label="单据编号" prop="djbh">
                 <span class="edit_text">{{lmshForm.djbh}}</span>
              </el-form-item>
              <el-form-item class=" addJLD" label="路线名称" prop="ldname">
                <el-input size="mini" type="text" v-model="lmshForm.ldname"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD" label="路线编码" prop="ldcode">
                <el-input size="mini" type="text" v-model="lmshForm.ldcode"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD" label="起点桩号" prop="szhh">
                <el-input size="mini" type="text" v-model="lmshForm.szhh"></el-input>
              </el-form-item>
              <el-form-item class=" addJLD" label="止点桩号" prop="ezhh">
                <el-input size="mini" type="text" v-model="lmshForm.ezhh"></el-input>
              </el-form-item>
    
               <el-form-item class=" addJLD_long" label="备注" prop="remark">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="lmshForm.bz"></el-input>
              </el-form-item>
    
 
         <div class="dialog_footer" v-if="!showxq">
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="small" @click="resetForm('lmshForm')" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
  </el-form>

    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
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
      this.isadd = true
      this.showDetail = true
      this.showxq = false
      this.lmshForm.tbsjc= new Date().getTime()
      this.lmshForm.tbr = this.userInfo.daYhmc
      this.lmshForm.bmcode=this.userInfo.daZzbh
      this.lmshForm.tbdw= this.userInfo.daZzmc
      this.formId = 'lxgl' + new Date().getTime()
      this.lmshForm.djbh = this.formId
 
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
 
      this.$api.getHtglldbAll('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
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

            this.$api.addHtglldbList(this.lmshForm).then(res => {
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
            } else {
            return false;
          }
        });

        
      
    },
    updateSubmit () {
      this.$api.editHtglldbList(this.lmshForm).then(res => {
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
      console.log(this.multipleSelection)
      if (this.multipleSelection.length > 0) {
        this.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let djbharr = ''
          this.multipleSelection.map((item, index) => {
            djbharr = djbharr + item.ldcode + ','
          })
          djbharr = djbharr.slice(0, djbharr.length - 1)
          this.$api.delHtglldbLdcode('?ldcodes=' + djbharr).then(res => {
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
    var fileObj = param.file;
    // 接收上传文件的后台地址
    var form = new FormData();
    // 文件对象
    form.append("file", fileObj);
    // 其他参数
    form.append("bbid", this.fzindex.djbh);
    form.append("pdsj", this.fzindex.tbsj);
   axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    axios({
    method:"post",
    url:'/lkpd/cx/import',
    data:form,
    headers:{
        'Content-Type': 'multipart/form-data'
    }
}).then(res=>{
      if(res.data.code==0){
        this.$message({
          type: 'error',
          message: res.data.msg
        })
      }else if(res.data.code==1){

        this.$message({
                type: 'success',
                message: res.data.msg
            })
            this.search(1,10)
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
        tbr: '',
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
      if (this.qmbbOptions.length > 0) { return }
      this.$api.requestLkpdbbkQueryQmldbb('0201').then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.qmbbOptions = resp.data
          this.searchForm.qmbbid = this.qmbbOptions[0].bbid
  
            this.search(this.currentPage, this.pageSize)

        }
      }).catch(e => {
      })
    },
    getTbdw(code){

        this.$api.getUserDw('?yhdw='+code).then(res=>{
          if(res.data.code===1){
          this.tbdwList= res.data.data
          this.selectDw=this.tbdwList[0].text
          this.searchForm.bmcode= this.tbdwList[0].id
          this.search(1, 10)
          }
        })
    },
    fuzhu(e){
      this.fzindex=this.tableData[e]
    },
    
  },
  mounted () {
    // this.getQmldbb()
    this.initUser()
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
  
  }
</style>
