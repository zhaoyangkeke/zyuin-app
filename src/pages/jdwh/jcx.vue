<template>
     <div  id="sbxj" class="xz-body styleSheets"  style="width:100%;height:100%;min-width:1100px" v-loading.fullscreen.lock="fullscreenLoading"  v-if="isRouterAlive">
         <div class="bill-header">
  		<div class="bill-title">
  			<span>检查项编辑</span>
  			 <ul>
	          <li @click="showAdd()" class="Hight_btn">新增</li>
	          <li @click="deleteData()">删除</li>
	        </ul>
  		</div>
      <div class="bill-search">
          <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
            <el-form-item style="margin-bottom: 0px" prop="" class="">
            <el-select clearable  size="mini" style="width: 148px;" v-model="searchForm.xclxid" value-key="mjbm" placeholder="请选择巡检类型">
                <el-option v-for="item in qmbbOptions" :key="item.mjbm" :label="item.mjmc" :value="item.mjmc"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px" prop="" class="">
            <el-select clearable  size="mini" style="width: 148px;" v-model="searchForm.xczq" value-key="mjbm" placeholder="请选择巡检周期">
                <el-option v-for="item in qmbbOptions1" :key="item.mjbm" :label="item.mjmc" :value="item.mjmc"></el-option>
              </el-select>
            </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button size="mini"  style="background-color: #DF4D4A;border-color:transparent;color: #fff" @click="search(1,10)">查询</el-button>
          </el-form-item>
        </el-form>
    		</div>
  	</div>
    <div class="conter_table" style="background:#fff">
       <div class="left" style="display:inline-block;width:20%; ">
            <el-tree
        :data="tbdwList"
       :props="defaultTree"
       :highlight-current="true"
       :default-expanded-keys="['1']"
       :default-checked-keys="['101']"
       :accordion="true"
       @node-click="handleNodeClick"
       node-key="id">
      </el-tree>
          </div>
       <div class="right" style="display:inline-block;width:79%;height: 100% ;overflow:auto;">
     <el-table  ref="multipleTable" :data="zcList" tooltip-effect="dark"
                style="width: 100%;height:100% ;overflow:auto;"
                row-class-name="row_class"
                border
                :row-style="{fontFamily: 'Microsoft YaHei', fontSize: '12px'}"
                 @row-dblclick="dbclick"
                 @row-click="sigClic"
                 @selection-change="handleSelectionChange"
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
        <el-table-column width="100"  sortable align="left" prop="xclxid" label="巡检类型"></el-table-column>
        <el-table-column width="100"  sortable align="left" prop="xczq" label="巡检周期"></el-table-column>
        <el-table-column sortable align="left" prop="jcx" label="检查项" show-overflow-tooltip></el-table-column>
        <el-table-column sortable width="200" align="left" prop="ssdw" label="所属单位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="80">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
          </template>
        </el-table-column>
      </el-table>
       </div>
    
    </div>
    <footer class="footer" style="border: 1px solid #D7D8D9;border-top:none">
      <div style="padding: 6px">
        <el-pagination
          @size-change="handlezcSizeChange"
          @current-change="handlezcCurrentChange"
          :current-page="zcPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="zctotal">
        </el-pagination>
      </div>
    </footer>
        <!-- <div class="conter_table">
          <div class="left" style="display:inline-block;width:20%;height:100%">
            <el-tree
        :data="tbdwList"
       :props="defaultTree"
       :highlight-current="true"
       :default-expanded-keys="['1']"
       :default-checked-keys="['101']"
       :accordion="true"
       @node-click="handleNodeClick"
       node-key="id">
      </el-tree>
          </div>
        <div class="right" style="display:inline-block;width:79%;height:100%">
        <div class="bill-table">
    		
      
    </div>
    </div>
     </div> -->
      <el-dialog class="data-dialog el-updata-div"   fullscreen :close-on-click-modal="false" :visible.sync="showDetail" width="580px" :show-close="false">
         <span slot="title">
        <span class="titleclasschild" @click="resetForm('formData')">
          <i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i>
        </span>
        <span>检查项</span>
      </span>
      <el-form v-if="showxq"  :model="formData"   ref="formData" label-width="100px" class="demo-lmshForm">
      <div class="showxq" v-if="showxq" style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>所属单位: </span>
              <span>{{formData.ssdw}}</span>
            </p>
            <p   class=" addJLD">
              <span>巡检类型: </span>
              <span>{{formData.xclxid}}</span>
            </p>
            <p  class=" addJLD">
              <span>巡检周期: </span>
              <span>{{formData.xczq}}</span>
            </p>
            
            <!-- <p   class=" addJLD">
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
            </p> -->
             <p   class=" addJLD_long">
              <span>检查项内容: </span>
              <span>{{formData.jcx}}</span>
            </p>
            <!--<p   class=" addJLD_long">
              <span>附件: </span>
              <span><ul class="fjlist" v-if="showxq">
                  <li class="file_li" v-for="(item,index) in fileList" :key="index" @click="openf(item)">{{item.file_yname}}
                  </li>
                  <div class="clear"></div>
              </ul></span>
            </p>
            <p   class=" addJLD_long">
              <span>备注: </span>
              <span>{{lmshForm.bz}}</span>
            </p> -->
            
      </div>
      </el-form>
      <el-form
      v-if="!showxq"
        :model="formData"
        :rules="jcx"
        ref="formData"
        label-width="100px"
        class="demo-lmshForm"
      >
        <el-form-item class="addJLD" label="所属单位" prop="ssdw">
           <span class="edit_text">{{formData.ssdw}}</span>
        </el-form-item>
        <el-form-item class="addJLD" label="巡检类型" prop="xclxid">
          <el-select clearable :disabled="showxq" size="mini" style="width: 148px;" v-model="formData.xclxid" value-key="mjbm" placeholder="请选择巡检类型">
                <el-option v-for="item in qmbbOptions" :key="item.mjbm" :label="item.mjmc" :value="item.mjmc"></el-option>
              </el-select>
        </el-form-item>
        <el-form-item class="addJLD" label="巡检周期" prop="xczq">
          <el-select clearable :disabled="showxq" size="mini" style="width: 148px;" v-model="formData.xczq" value-key="mjbm" placeholder="请选择巡检周期">
                <el-option v-for="item in qmbbOptions1" :key="item.mjbm" :label="item.mjmc" :value="item.mjmc"></el-option>
              </el-select>
        </el-form-item>

        <!-- <el-form-item v-if="showxq" class="addJLD" label="填报人" prop="tbr">
          <el-input size="mini" v-model="formData.tbr"></el-input>
        </el-form-item>
        <el-form-item v-if="showxq" class="addJLD" label="填报时间" prop="tbsj">
          <el-input size="mini" v-model="formData.tbsj"></el-input>
        </el-form-item>
        <el-form-item v-if="showxq" class="addJLD" label="填报单位" prop="tbdw">
          <el-input size="mini" v-model="formData.tbdw"></el-input>
        </el-form-item>
        <el-form-item v-if="showxq" class="addJLD" label="填报部门" prop="tbbm">
          <el-input size="mini" v-model="formData.tbbm"></el-input>
        </el-form-item> -->
        <el-form-item class=" addJLD_long" label="检查项内容" prop="jcx">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="formData.jcx"></el-input>
         </el-form-item>
         <div class="dialog_footer">
         <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun"   @click="addSubmit('formData')">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary"  class="dialog-button bao_cun"  @click="updateSubmit('formData')">保存</el-button>
          <el-button size="small" @click="resetForm('formData')"  class="dialog-button qu_xiao" style="margin-right: 20px">取消</el-button>
        </div>
      </el-form>
      <!-- <div class="dialog_warps">
        <ul class="zhubnr">
          <li>
            <span>所属单位</span>
            <p>
              <el-input disabled size="mini" type="text" v-model="formData.ssdw"></el-input>
            </p>
          </li>
          <li>
            <span>巡检类型</span>
            <p>
              <el-select clearable :disabled="showxq" size="mini" style="width: 148px;" v-model="formData.xclxid" value-key="mjbm" placeholder="请选择巡检类型">
                <el-option v-for="item in qmbbOptions" :key="item.mjbm" :label="item.mjmc" :value="item.mjmc"></el-option>
              </el-select>
            </p>
          </li>
          <li>
            <span>巡检周期</span>
            <p>
              <el-select clearable :disabled="showxq" size="mini" style="width: 148px;" v-model="formData.xczq" value-key="mjbm" placeholder="请选择巡检周期">
                <el-option v-for="item in qmbbOptions1" :key="item.mjbm" :label="item.mjmc" :value="item.mjmc"></el-option>
              </el-select>
            </p>
          </li>
          <li class="text_line">
            <span>检查项</span>
            <p>
             <textarea class="textarea"  v-model="formData.jcx"></textarea>
            </p>
          </li>
          <div style="clear: both"></div>
        </ul>
        <div class="dialog_footer">
         <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun"  @click="addSubmit">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary" class="dialog-button bao_cun"   @click="updateSubmit">保存</el-button>
          <el-button size="small" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div> -->
    </el-dialog>
  	</div>
</template>
<script>
export default {
    data(){
        return{
          fullscreenLoading: false,
      jcx: {
        xclxid: [
          { required: true, message: "巡检类型不能为空", trigger: "blur" },
          { min: 1, message: "请选择巡检类型" }
        ],
        xczq: [
          { required: true, message: "巡检周期不能为空", trigger: "blur" },
          { min: 1, message: "请选择巡检周期" }
        ],
        jcx: [
          { required: true, message: "检查项不能为空", trigger: "blur" },
          { min: 1, message: "请填写检查项" }
        ],

      },
      showDetail:false,
      isadd:false,
      showxq:false,
      searchForm:{xclxid:'',xczq:'',ssdwid:''},
      formData:{},
      zcList:[],
      multipleSelection:[],
      loading:false,
      tbdwList:[],
      multipleXz:[],
      qmbbOptions: [],
      qmbbOptions1: [],
      userData:'',
      zcPage: 1,
      zcSize: 10,
      zctotal:10,
        defaultTree: {
          children: 'children',
          label: 'text'
        },
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
      zkx:'',
      isRouterAlive:true,
        }
    },
 async created(){
   this.initUser()
 
  },
    methods: {
      handleSelectionChange (val) {
      this.multipleSelection = val
    },
    sigClic (row){
this.$refs.multipleTable.toggleRowSelection(row)
    },
      resetForm(res){
        this.loading=false
        if(res!==undefined && res.target==undefined){
      if(this.$refs[res] != undefined){
        this.$refs[res].resetFields();
        }
      }
        this.showDetail=false
        this.formData={}
      },
    showAdd (){
      this.showDetail=true
      this.isadd=true
      this.formData.ssdwid=this.userInfo.daZzbh
      this.formData.tbsjc= new Date().getTime()
      this.formData.ssdw = this.userInfo.daZzmc 
    },
    updateFormDia (row){
      this.showDetail=true
      this.isadd = false
      this.showxq = false
      this.formData = JSON.parse(JSON.stringify(row))
    },
    deleteData (){
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
          this.$api.delXclxjcxByIds('?ids=' + djbharr).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.search(this.zcPage, this.zcSize)
          this.resetForm()
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
    showBhFormDia (row){
       this.showDetail=true
      this.isadd = false
      this.showxq = true
      this.formData = JSON.parse(JSON.stringify(row))
    },
    dbclick (row){
       this.showDetail=true
      this.isadd = false
      this.showxq = true
      this.formData = JSON.parse(JSON.stringify(row))
    },
    addSubmit (){
      this.$refs['formData'].validate((valid) => {
          if (valid) {
            this.$api.addXclxjcx(this.formData).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.search(this.zcPage, this.zcSize)
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
    updateSubmit (){
      this.$refs['formData'].validate((valid) => {
          if (valid) {
             this.$api.editXclxjcx(this.formData).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          this.search(this.zcPage, this.zcSize)
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
    search (currentPage,pageSize){
      this.loading = true
      this.$api.getXclxmxjList('?pageNum=' + currentPage + '&pageSize=' + pageSize+'&' + $.param(this.searchForm)).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.loading=false
          this.zcList = resp.data.data.list
          this.zctotal= resp.data.data.total
        }
      }).catch(e => {
      }) 
    },
    handleSelectionXz(val){
      this.multipleXz = val
    },
    handlezcSizeChange (val) {
      this.zcSize = val
      this.search(this.zctPage, this.zcSize)
    },
    handlezcCurrentChange (val) {
      this.zcPage = val
      this.search(this.zcPage, this.zcSize)
    },
    handleNodeClick(data){
      if(data.children.length==0){
          this.searchForm.ssdwid=data.id
          this.search(1,10)
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
    getTbdw(code,bmbm){
      this.fullscreenLoading=true
    this.$api.getUserDw('?yhdw='+code).then(res=>{
          if(res.data.code===1){
          this.tbdwList= res.data.data
          this.zkx=this.tbdwList[0].id
          this.searchForm.ssdwid=code
           this.searchForm.tbdwdm=this.userInfo.daZzbh
           this.searchForm.tbbmdm=this.userInfo.daBmbm
          this.search(1,10)
          this.fullscreenLoading=false
          }
        }) 
    },
    getCs(){
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
      
      
    }
    },
    beforeRouteEnter (to, from, next) {
   next(vm=>{
   let cuserid = getQueryString()
   let match=localStorage.getItem('cuserid')
if(cuserid!='null'&&cuserid){
    if(cuserid != match){
      location.reload()
    }
    }
   })
 },
    mounted(){
    this.getTbdw(this.userInfo.daZzbh,this.userInfo.daBmbm)
       this.getCs()   
    }
}

</script>
<style lang="scss" scoped>
.background_image{
  >div{
    background: none;
  }
}
.xz-body{
  font-size: 12px;
    min-width: 1100px;
    height: 100%;
    overflow: auto;
    >div{
        font-size: 0px;
    }
    .left{
 
        width: 100%;
      border: none;
      overflow:auto;
      height: 100%;
      border: 1px solid #edeef0;
     border-right: none;
    }
}
.conter_table{
      height: calc(100% - 146px);
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
            .textarea{
              border: none;
              height: 79px!important;
              width: 100%;
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
</style>
