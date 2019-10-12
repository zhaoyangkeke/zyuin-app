/**
* ----库存管理
*/
<template>
  <div id="sbxj" class="styleSheets" style="height: 100%" v-loading.fullscreen.lock="fullscreenLoading"  v-if="isRouterAlive">
    <div class="bill-header">
  		<div class="bill-title">
  			<span>盘点记录</span>
  			 <ul>
	          <!-- <li @click="showAdd()"  class="Hight_btn" style="border:1px solid #D0D0D0;border-right:none;	border-radius:5px 0px 0px 5px">调拨</li>
            <li @click="diaobo()"   style="border:1px solid #D0D0D0;	border-radius:0px 5px 5px 0px">调拨记录</li> -->
	        </ul>
  		</div>
      <div class="bill-search" style="">
        <el-form  :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
              <el-form-item  style="margin-bottom: 0px"  class="" label="" prop="" >
               <el-select clearable  size="mini" style="width: 148px;" v-model="searchForm.pdlx"   placeholder="请选择盘点类型">
                <el-option  label="盘盈"  value="盘盈"></el-option>
                <el-option  label="盘亏"  value="盘亏"></el-option>
              </el-select>
              </el-form-item>
               <el-form-item   style="margin-bottom: 0px" class="" prop=" ">
              <el-input clearable v-model="searchForm.sbmc" size="mini" placeholder="请输入设备名称"></el-input>
  
          </el-form-item>
           <el-form-item   style="margin-bottom: 0px" class="" prop=" ">
          <el-date-picker
              v-model="searchForm.tbsj"
              size="mini"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请选择调拨日期">
            </el-date-picker>
  
          </el-form-item>
            <el-form-item  style="margin-bottom: 0px" class="" label="" prop="" >
              <el-button  size="mini" @click="search(1,10)" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
            </el-form-item>
  
     </el-form>
      </div>
  	</div>
    <div class="conter_table">
       <el-table
    ref="multipleSelectionpd"
    row-class-name="row_class"
    @row-dblclick="dbclick"
    :row-style="{fontFamily: '宋体', fontSize: '12px'}"
    :data="pdlist"
    tooltip-effect="dark"
    :v-loading="loading"
    style="width: 100%;height: calc(100% - 46px)!important;overflow:auto;"
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
     <el-table-column align="center" class-name="column-caoz" label="操作" width="100">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
          </template>
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
   <el-dialog fullscreen class="data-dialog el-updata-div"  :visible.sync="showpdxq" width="580px" >
      <span slot="title">
          <span class="titleclasschild"  @click="showpdxq=false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>盘点详情</span>
      </span>
      <el-form v-if="showxq"  :model="lmshForm"   ref="lmshForm" label-width="100px" class="demo-lmshForm">
      <div class="showxq" v-if="showxq" style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>设备名称: </span>
              <span>{{lmshForm.sbmc}}</span>
            </p>
            <p   class=" addJLD"   >
              <span>设备编码: </span>
              <span>{{lmshForm.sbbm}}</span>
            </p>
            <p   class=" addJLD"   >
              <span>规格型号: </span>
              <span>{{lmshForm.ggxh}}</span>
            </p>
            <p   class=" addJLD"   >
              <span>所属仓库: </span>
              <span>{{lmshForm.ssck}}</span>
            </p>
            <p  class=" addJLD">
              <span>盘点类型: </span>
              <span>{{lmshForm.pdlx}}</span>
            </p>
            <p   class=" addJLD">
              <span>盘点数量: </span>
              <span>{{lmshForm.pdsl}}</span>
            </p>
            <p   class=" addJLD">
              <span>盘点人: </span>
              <span>{{lmshForm.tbr}}</span>
            </p>
            <p   class=" addJLD">
              <span>盘点时间: </span>
              <span>{{lmshForm.tbsj}}</span>
            </p>
            <p   class=" addJLD">
              <span>所属单位: </span>
              <span>{{lmshForm.tbdw}}</span>
            </p>
            <p   class=" addJLD">
              <span>所属部门: </span>
              <span>{{lmshForm.tbbm}}</span>
            </p>
            
            <p   class=" addJLD_long">
              <span>盘点说明: </span>
              <span>{{lmshForm.pdsm}}</span>
            </p>
  
    
      </div>
      </el-form>
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
      showpdxq:false,
      showPandian:false,
       pd_total:0,
      pd_currentPage: 1,
      pdlist:[],
      pd_pageSize: 10,
      db_total:0,
      db_currentPage: 1,
      db_pageSize: 10,
      fullscreenLoading: false,
       showSb:false,
      Sblist:'', 
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
    search (val){
      this.loading=true
       this.$api.getPdjlInfoList('?pageNum=' + this.pd_currentPage + '&pageSize=' +  this.pd_pageSize + '&'+ $.param(this.searchForm) ).then(resp => {
        if (resp.data.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.loading=false
          this.pdlist = resp.data.data.list
          this.pd_total=resp.data.data.total
           this.showPandian=true
           this.pdlx=''
        }
      }).catch(e => {
        this.loading=false
      })
    
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
    handleSelectionpd(val){
      this.multiplePd = val
    },
     handleSelectionSb(val){
      this.multipleSb = val
    },
 
    pd_handleSizeChange (val) {
      this.pd_pageSize = val
      this.search(this.pd_currentPage, this.pd_pageSize)
    },
    pd_handleCurrentChange (val) {
      this.pd_currentPage = val
      this.search(this.pd_currentPage, this.pd_pageSize)
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
    showBhFormDia (row) {
      this.showpdxq = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
    },
    dbclick (row){
      this.showpdxq = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
    },
    resetForm (res) {
 
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
