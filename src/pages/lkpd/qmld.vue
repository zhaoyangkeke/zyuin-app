/**
* ----路面损坏
*/
<template>
  <div id="lkpdlmsh"  class="qmld styleSheets" style="height: 100%" v-loading="loading">
    <div class="bill-header">
      <div class="bill-title">
        <span>千米路段划分明细</span>
 
        <ul>
          <li  class="Hight_btn"><a href="http://61.141.223.10:9080/yygl/static/qmld.xlsx"><i class="el-icon-download"> 模版下载</i></a></li>
          <li @click="chaxBtn"><i class="el-icon-search"> 查询</i></li>
          <li @click="drBtn"><i class="el-icon-download"> 导入</i></li>
          <!--<li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>-->
          <!-- <li @click="deleteData()"><i class="el-icon-delete">删除数据</i></li> -->
        </ul>

      </div>
      <div class="bill-search" v-if="showdrxz">
          <el-form :inline="true" :model="drForm" ref="drForm" class="drForm">
            <el-form-item style="margin-bottom: 0px" label="版本名称" prop="" class="">
              <el-select clearable size="mini" style="width: 150px;" v-model="bbxx" value-key="bbmc" placeholder="版本名称" @change="changeBb">
                <el-option v-for="item in qmldbb" :key="item.id" :label="item.bbmc" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px" label="路线名称" prop="" class="">
            <el-select clearable size="mini" style="width: 150px;" v-model="lxDatas" value-key="id" placeholder="路线名称" @change="changeLx">
              <el-option v-for="item in qmbbOptions" :key="item.id" :label="item.ldname" :value="item"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item style="margin-bottom: 0px" label="调查方向" prop="" class="">
              <el-select size="mini"  class="" style="width: 150px;" placeholder="请选择方向" v-model="drForm.fx">
                <!--<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>-->
                <el-option label="上行" value="上行"></el-option>
                <el-option label="下行" value="下行"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px" label="选择文件" prop="" class="">
            <el-upload
             class="upload-demo special"
                 ref="uploads"
                 action=""
                 :file-list="excelList"
                 :http-request="url"
                 :auto-upload="false">
               <div style="position:relative;width:150px;height:28px;border: 1px solid #D5D6D7;border-radius:4px;"></div>
                </el-upload> 
            </el-form-item>
            <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <!-- <el-button size="small" type="text" @click="showdrxz=false" style="width: 64px;height: 28px;background-color: #F2F3F5;border-radius: 4px;color: #666A6F">取消</el-button> -->
              <el-button size="mini" @click="showAdd()" style="background-color: #3288f3;border-color:transparent;color: #fff">导入</el-button>
            </el-form-item>
          </el-form>
        </div>
      <div class="bill-search" style="" v-if="showSearch">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <el-select clearable size="mini" style="width: 150px;" v-model="bbxxs" value-key="bbmc" placeholder="版本名称" @change="changeBbs">
                <el-option v-for="item in qmldbb" :key="item.id" :label="item.bbmc" :value="item"></el-option>
              </el-select>
            </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-select clearable size="mini" style="width: 150px;" v-model="lxData" value-key="id" placeholder="路线名称" @change="changeLxs">
              <el-option v-for="item in qmbbOptions" :key="item.id" :label="item.ldname" :value="item"></el-option>
            </el-select>
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
          align="center"
          label="序号"
          width="40">
        </el-table-column>
        <el-table-column align="left" prop="bbmc" label="版本名称"  show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" width="100" prop="lxbm" label="路线编码"  show-overflow-tooltip></el-table-column>
        <!--<el-table-column align="center" prop="qmldb.lxname" label="路线名称" width="80" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="qmldb.fx" label="方向"></el-table-column>-->
        <el-table-column sortable align="left" prop="lxmc" label="路线名称"  show-overflow-tooltip></el-table-column>
        <el-table-column align="left"  width="150" prop="qdzh" label="起点桩号" show-overflow-tooltip>
          <template scope="scope">
            <span v-if="scope.row.qdzh.toString().indexOf('.') >= 0">K{{scope.row.qdzh.toString().replace('.', '+')}}</span>
            <span v-if="scope.row.qdzh.toString().indexOf('.') < 0">K{{scope.row.qdzh}}+000</span>
 
          </template>
        </el-table-column>
        <el-table-column sortable align="left"  width="150" prop="zdzh" label="止点桩号" show-overflow-tooltip>
          <template scope="scope">
            <span v-if="scope.row.zdzh.toString().indexOf('.') >= 0">K{{scope.row.zdzh.toString().replace('.', '+')}}</span>
            <span v-if="scope.row.zdzh.toString().indexOf('.') < 0">K{{scope.row.zdzh}}+000</span>
 
          </template>
        </el-table-column>
        <el-table-column  sortable align="left"  width="80" prop="fx" label="方向"></el-table-column>
        <el-table-column sortable align="left"  width="100" prop="lmlx" label="路面类型"></el-table-column>
        <el-table-column sortable align="left"  width="100" prop="lmkd" label="路面宽度(m)"></el-table-column>
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
    
    <el-dialog fullscreen class="data-dialog el-updata-div" title="" :close-on-click-modal="false" :visible.sync="showDetail" width="720px"  @close="resetForm">
      <div style="width: 700px;height: 600px;margin:0 auto">
        <iframe :src="src" frameborder="0" style="width: calc(100%);height: 100%;"></iframe>
      </div>

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
      src: '',
      lmshForm: {
        xcfx: '上行'
      },
      index: '',
      isadd: false,
      submitLoading: false,
      showxq: false,
      showSearch: true,
      loading: false,
      tableHeight: 300,
      tableData: [],
      qmldbb:'',
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      lxData: {
        id: '',
        ldname: ''
      },
      bbxx:{
        bbmc:''
      },
      bbxxs:{
        bbmc:''
      },
      roadOptions: [],
      searchForm: {
         fx: '上行'
      },
      drForm:{
        fx: '上行'
      },
      lxDatas: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      personelForm: {},
      showDetail: false,
      showdrxz: false,
      multipleSelection: [],
      excelList:[],
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
  async created(){
   this.initUser()
 
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
    chaxBtn(){
      this.showSearch=true;
      this.showdrxz=false
    },
    drBtn(){
      this.showSearch=false;
      this.showdrxz=true
    },
    showAdd () {
      this.$refs.uploads.submit();
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
    sigClic (row){
this.$refs.multipleTable.toggleRowSelection(row)
    },
      dbclick (row){
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
    },
    addSubmit () {
      this.tableData.push(this.lmshForm)
      this.resetForm()
    },
    updateSubmit () {
      this.tableData.splice(this.index, 1, this.lmshForm)
      this.resetForm()
    },
    deleteData () {
      if (this.multipleSelection.length > 0) {
        this.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.tableData.splice(0, this.multipleSelection.length)
          this.$message({
            type: 'success',
            message: '删除成功!'
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
      this.$api.getQmldmxList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
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
      this.lmshForm = {
        xcfx: '上行'
      }
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
    getQmldbb () {
      // if (this.qmbbOptions.length > 0) { return }
      this.$api.commongetLd('?bmCode=' + this.userInfo.daZzbh).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else if (resp.data.code === 1) {
          this.qmbbOptions = resp.data.data
          this.search(this.currentPage, this.pageSize)
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
    },
    changeBb (val){
     this.drForm.pid=val.bbid
     this.drForm.bbmc=val.bbmc
    },
    changeBbs (val){
     this.searchForm.bbid=val.bbid
    },
    changeLx (val){
      this.drForm.lxbm=val.lxcode
      this.drForm.lxmc=val.ldname
    },
    changeLxs (val){
      this.searchForm.lxbm=val.lxcode
      
    },
    url(param){
      if(!this.drForm.lxbm || !this.drForm.pid){
        this.$message({
            message: '请选择千米路段版本和路线名称',
            type: 'error'
          })
        return
      }
    var fileObj = param.file;
    // 接收上传文件的后台地址
    var form = new FormData();
    // 文件对象
    form.append("file", fileObj);
    // 其他参数
    form.append("pid", this.drForm.pid);
    form.append("lxbm", this.drForm.lxbm);
    form.append("lxmc", this.drForm.lxmc);
    form.append("fx", this.drForm.fx);
   axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
   axios.defaults. baseURL='http://61.141.223.10:8002'; 
    axios({
    method:"post",
    url:'/lkpd/cx/importqmldmx',
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
        this.search(this.currentPage, this.pageSize)
      }
})
    },
  },
  mounted () {
    this.getQmldbb()
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
    .dialog_warp{
      background: #fff;
      padding: 20px 40px;
      ul{
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
          &:nth-last-of-type(1){
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
        .tow_line{
          height: 64px;
          p{
            >span{
              display: block;
              height: 50%;
            }
          }
        }
        .three_line{
          height: 96px;
          p{
            span{
              display: block;
              height: calc(100%/3);
            }
          }
        }
        .four_line{
          height: 128px;
          p{
            span{
              display: block;
              height: 25%;
            }
          }
        }
      }
    }
  }
</style>
