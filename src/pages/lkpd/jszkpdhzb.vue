/**
* ----技术状况评定汇总表
*/
<template>
  <div id="lkpdlmsh" class="styleSheets" style="height: 100%" v-loading="loading">
    <div class="bill-header">
      <div class="bill-title">
        <span>公路技术状况评定汇总表</span>
        <ul>
          <li  id="download" class="Hight_btn" @click="downloadExcel()" style="border:1px solid #D0D0D0;	border-radius:5px">下载</li>
        </ul>
      </div>
      <div class="bill-search" style="">
       <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
           <el-select clearable size="mini" v-model="pdfa" value-key="famc" placeholder="请选择路况评定方案" @change="selectFa">
         <el-option v-for="(item,index) in pdfaMc" :key="index"  :label="item.famc" :value="item"></el-option>
         </el-select>
          </el-form-item>
           <el-form-item v-if="sjly.length>0" style="margin-bottom: 0px" label="" prop="" class="">
            <el-select size="mini"  class="" placeholder="请选择数据来源" value-key="SJLY"  v-model="searchForm.sjly" clearable  >
            <el-option v-for="(item,index) in sjly" :key="index"  :label="item.SJLY" :value="item.SJLY"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button size="mini"  style="background-color: #DF4D4A;border-color:transparent;color: #fff"  @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="conter_table">


   <table border='0' cellpadding='0' id="mytable"   v-loading="loading" cellspacing='0' width='1066' style='border-collapse: 
 collapse;table-layout:fixed;width:799pt;margin:0 auto;'>
 <col class='x21' width='86' style='mso-width-source:userset;width:64.5pt'>
 <col class='x21' width='78' span='2' style='mso-width-source:userset;width:58.5pt'>
 <col class='x21' width='88' style='mso-width-source:userset;width:66pt'>
 <col class='x21' width='46' span='16' style='mso-width-source:userset;width:34.5pt'>
 <tr height='21' style='mso-height-source:userset;height:16.05pt' id='r0'>
<td colspan='20' rowspan='2' height='20' class='x27' width='1020' style='height:15.3pt;border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>公路技术状况汇总表</td>
<!-- <td class='x31' width='46' style='width:34.5pt;'></td> -->
 </tr>
 <tr height='20' style='mso-height-source:userset;height:15.6pt' id='r1'>
<!-- <td height='19' class='x23' style='height:14.85pt;'>所属政区：</td>
<td colspan='2' class='x24' style='border-bottom:1px solid windowtext;'></td>
<td class='x25'>主管单位：</td>
<td colspan='9' class='x24' style='border-bottom:1px solid windowtext;'></td>
<td colspan='2' class='x24' style='border-bottom:1px solid windowtext;'></td>
<td class='x25'>年</td>
<td class='x25'></td>
<td class='x25'>月</td>
<td class='x25'></td>
<td class='x26'>日</td> -->
 </tr>
 <tr height='21' style='mso-height-source:userset;height:16.05pt' id='r2'>
<td rowspan='2' height='54' class='x30' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.95pt;'>路线编码</td>
<td rowspan='2' height='54' class='x30' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.95pt;'>路线名称</td>
<td rowspan='2' height='54' class='x30' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.95pt;'>起点桩号</td>
<td rowspan='2' height='54' class='x30' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.95pt;'>评定长度(km)</td>
<td rowspan='2' height='54' class='x30' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.95pt;'>调查方向</td>
<td rowspan='2' height='54' class='x30' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.95pt;'>技术等级</td>
<td rowspan='2' height='54' class='x30' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.95pt;'>路面类型</td>
<td rowspan='2' height='54' class='x30' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.95pt;'>MQI</td>
<td colspan='4' class='x30' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>MQI分项指标评定结果</td>
<td colspan='5' class='x30' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>MQI 分布 (km)</td>
<td colspan='3' class='x30' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>MQI统计(%)</td>
 </tr>
 <tr height='35' style='mso-height-source:userset;height:26.4pt' id='r3'>
<td class='x29'>SCI</td>
<td class='x29'>PQI</td>
<td class='x29'>BCI</td>
<td class='x29'>TCI</td>
<td class='x29'>优</td>
<td class='x29'>良</td>
<td class='x29'>次</td>
<td class='x29'>中</td>
<td class='x29'>差</td>
<td class='x29'>优等路率</td>
<td class='x29'>优良路率</td>
<td class='x29'>次差路率</td>
 </tr>
 <Tbody v-html="temp" id="cs11">

 </Tbody>

 <tr v-if="hzData.length==0" height='21' style='mso-height-source:userset;height:16.05pt;' id='r7'>
     <td colspan='20'  class='x29' height='41'>暂无数据</td>
 </tr>
</table>
<div class="echart_box" v-if="hzData.length>0">
  <div v-if="showEX" style="width:50%;position:relative"><hzEcharts @changeG="changeG" :data="dataArr" ></hzEcharts></div>
  <div  style="width:50%;position:relative"><Grade v-if="showGr" :data="dataArr" :lxbm="lxbm" :fx="fx" :tit="'MQI分布'"></Grade></div>
   
  </div>
    </div>
  </div>
</template>

<script>
import hzEcharts from './mqiEcharts'
import Grade from './grade'
export default {
  components: {hzEcharts,Grade},
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
      showEX:false,
      showGr:false,
      fx:'',
      lxbm:'',
      lmshForm: {
        xcfx: '上行'
      },
      searchForm: {
        sjly:'',
      },
      lxData: {
        id: '',
        ldname: ''
      },
      src: '',
      index: '',
      bbxxs:'',
      hzData:[],
      sjly:[],
      isadd: false,
      submitLoading: false,
      showxq: false,
      showSearch: false,
      loading: false,
      tableHeight: 300,
      tableData: [],
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      total: 0,
      roadOptions: [],
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      multipleSelection: [],
      qmldbb:'',
      pdfaMc:'',
      dataArr:[],
      temp:'',
      pdfa:{
        bbid:"",
        name:'',
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
    }
  },
  async created(){
   this.initUser()
 
  },
  methods: {
    changeG(val){
     
      this.showGr=false
      this.lxbm=val.lxbm
      this.fx=val.fx
 
     this.$nextTick(() => (this.showGr = true))
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
    downloadExcel(){
        this.tableToExcel("mytable","公路技术状况评定汇总表");
     },
     tableToExcel(tableID, fileName) {
            var excelContent = document.getElementById(tableID).innerHTML;
            // 		alert(excelContent);
            var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='https://www.w3.org/TR/html401/'>";
            excelFile += "<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>sheet1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->";
             excelFile +=`<style type='text/css'> 
             .x29{
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border-top:1px solid windowtext;
 border-right:1px solid windowtext;
 border-bottom:1px solid windowtext;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
  .x21
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 mso-protection:locked visible;
 }
 .x27
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border-top:1px solid windowtext;
 border-right:none;
 border-bottom:none;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
 .x30
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border-top:none;
 border-right:1px solid windowtext;
 border-bottom:1px solid windowtext;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
            </style>`
            excelFile +="</head>"
            excelFile += "<body><table width='10%'  border='0'>";
            excelFile += excelContent;
            excelFile += "</table></body>";
            excelFile += "</html>";
            var link = "data:application/vnd.ms-excel;base64," + this.base64(excelFile);
            var a = document.createElement("a");
            a.download = fileName + ".xls";
            a.href = link;
            a.click();
        },
      base64(content) {
            return window.btoa(unescape(encodeURIComponent(content)));
        },
     selectFa(node){
     this.searchForm.bbid = node.djbh
    this.$api.getSjlyForBbid('?bbid=' +  node.djbh).then(resp => {
        if (resp.data.code !== 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.sjly=resp.data.data
          if(this.sjly.length>0){
            this.searchForm.sjly=this.sjly[0].SJLY
          }
        }
      }).catch(e => {
      })
   
    },
    showAdd () {
      this.showDetail = true
      this.showxq = false
      this.isadd = true
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
    updateSubmit () {

    },
    addSubmit () {

    },
    creatHtml(ar){
      var temmp=""
      for(let i=0;i<ar.length;i++){
        temmp +=  `<tr height='21' style='mso-height-source:userset;height:16.05pt' id='r7'>
<td rowspan='3' height='62' class='x28' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:46.65pt;'>`+ar[i][0].LXBM+`</td>
<td rowspan='3' height='62' class='x28' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:46.65pt;'>`+ar[i][0].LXMC+`</td>
<td rowspan='3' height='62' class='x28' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:46.65pt;'>`+ar[i][0].SZHH+`</td>
<td rowspan='3' height='62' class='x28' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:46.65pt;'>`+ar[i][0].CD+`</td>
<td class='x29'>`+ar[i][0].FX+`</td>
<td class='x29'>`+ar[i][0].JSDJ+`</td>
<td class='x29'>`+ar[i][0].LMLX+`</td>
<td class='x29'>`+ar[i][0].MQI1+`</td>
<td class='x29'>`+ar[i][0].SCI1+`</td>
<td class='x29'>`+ar[i][0].PQI+`</td>
<td class='x29'>`+ar[i][0].BCI1+`</td>
<td class='x29'>`+ar[i][0].TCI1+`</td>
<td class='x29'>`+ar[i][0].YOU+`</td>
<td class='x29'>`+ar[i][0].LIANG+`</td>
<td class='x29'>`+ar[i][0].ZHONG+`</td>
<td class='x29'>`+ar[i][0].CI+`</td>
<td class='x29'>`+ar[i][0].CHA+`</td>
<td class='x29'>`+ar[i][0].YDLL+`</td>
<td class='x29'>`+ar[i][0].YLLL+`</td>
<td class='x29'>`+ar[i][0].CCLL+`</td>
 </tr>
 <tr height='21' style='mso-height-source:userset;height:16.05pt' id='r8'>
<td class='x29'>`+ar[i][1].FX+`</td>
<td class='x29'>`+ar[i][1].JSDJ+`</td>
<td class='x29'>`+ar[i][1].LMLX+`</td>
<td class='x29'>`+ar[i][1].MQI1+`</td>
<td class='x29'>`+ar[i][1].SCI1+`</td>
<td class='x29'>`+ar[i][1].PQI+`</td>
<td class='x29'>`+ar[i][1].BCI1+`</td>
<td class='x29'>`+ar[i][1].TCI1+`</td>
<td class='x29'>`+ar[i][1].YOU+`</td>
<td class='x29'>`+ar[i][1].LIANG+`</td>
<td class='x29'>`+ar[i][1].ZHONG+`</td>
<td class='x29'>`+ar[i][1].CI+`</td>
<td class='x29'>`+ar[i][1].CHA+`</td>
<td class='x29'>`+ar[i][1].YDLL+`</td>
<td class='x29'>`+ar[i][1].YLLL+`</td>
<td class='x29'>`+ar[i][1].CCLL+`</td>
 </tr>
 <tr height='21' style='mso-height-source:userset;height:16.05pt' id='r9'>
<td class='x29'>`+ar[i][2].FX+`</td>
<td class='x29'>`+ar[i][2].JSDJ+`</td>
<td class='x29'>`+ar[i][2].LMLX+`</td>
<td class='x29'>`+ar[i][2].MQI1+`</td>
<td class='x29'>`+ar[i][2].SCI1+`</td>
<td class='x29'>`+ar[i][2].PQI+`</td>
<td class='x29'>`+ar[i][2].BCI1+`</td>
<td class='x29'>`+ar[i][2].TCI1+`</td>
<td class='x29'>`+ar[i][2].YOU+`</td>
<td class='x29'>`+ar[i][2].LIANG+`</td>
<td class='x29'>`+ar[i][2].ZHONG+`</td>
<td class='x29'>`+ar[i][2].CI+`</td>
<td class='x29'>`+ar[i][2].CHA+`</td>
<td class='x29'>`+ar[i][2].YDLL+`</td>
<td class='x29'>`+ar[i][2].YLLL+`</td>
<td class='x29'>`+ar[i][2].CCLL+`</td>
 </tr>`


      }
this.temp=temmp
    },
    search () {
      this.showEX=false
      this.showGr=false
      this.dataArr=[]
      this.loading=true
       this.$api.getHzbForLksjcx( '?' + $.param(this.searchForm)).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
      this.loading=false
     this.hzData=resp.data.data 
     if(this.hzData!=null){
       for(let i=0;i<this.hzData.length;i++){
        let obj=''
         if(i % 3 == 0){
           obj=this.hzData.slice(i,i+3)
        this.dataArr.push(obj)
         }
       

     }
       this.creatHtml(this.dataArr)
       this.lxbm=this.dataArr[0][0].LXBM
       this.fx=this.dataArr[0][0].FX
       this.showEX=true
       this.showGr=true
     }else{
       this.hzData=[]
     }
     
        }
      }).catch(e => {
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
    resetForm () {
      this.showDetail = false
      this.lmshForm = {
        xcfx: '上行'
      }
    },
    submitAddForm () {
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
       this.$api.getFaForLksjcx('?pageNum=' + 1 + '&pageSize=' + 1000000).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.pdfaMc= resp.data.data.list
          // this.pdfa = {
          //   bbid: this.pdfaMc[0].djbh,
          //   famc:this.pdfaMc[0].famc
          // }
        }
      }).catch(e => {
      })
      if (this.qmbbOptions.length > 0) { return }
      this.$api.commongetLd('?bmCode=' + this.userInfo.daZzbh).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else if (resp.data.code === 1) {
          this.qmbbOptions = resp.data.data
          this.lxData = {
            id: this.qmbbOptions[0].id
          }
        }
      }).catch(e => {
      })
    }
  },
  mounted () {
    this.getQmldbb()
     
    // this.getXcRoadOptions()
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
    .echart_box{
      margin-top: 20px;
      display: flex;
      flex-wrap: nowrap;
    }
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    overflow: auto;
    min-width: 1100px;
    .header{}
   .conter_table{
     background-color: #fff;
      min-height: 100%;
      height: auto;
      // min-height: 600px;
      padding:10px 0px;
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
  
  }
 @page
 {
 mso-header-data:"";
 mso-footer-data:"";
 margin:0.75in 0.7in 0.75in 0.7in;
 mso-header-margin:0.3in;
 mso-footer-margin:0.3in;
 mso-page-orientation:Portrait;
 }
tr
 {mso-height-source:auto;
 mso-ruby-visibility:none;}
col
 {mso-width-source:auto;
 mso-ruby-visibility:none;}
br
 {mso-data-placement:same-cell;}
ruby
 {ruby-align:left;}
.style0
 {
 mso-number-format:General;
 text-align:general;
 vertical-align:bottom;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border:none;
 mso-protection:locked visible;
 mso-style-name:Normal;
 mso-style-id:0;}
.font0
 {
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif"; }
.font1
 {
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif"; }
.font2
 {
 color:#000000;
 font-size:9pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","monospace"; }
td
 {mso-style-parent:style0;
 mso-number-format:General;
 text-align:general;
 vertical-align:bottom;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border:none;
 mso-protection:locked visible;
 mso-ignore:padding;}
.style0
 {
 text-align:general;
 vertical-align:bottom;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 mso-protection:locked visible;
 mso-style-name:"Normal";
 }
.style1
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style2
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style3
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style4
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style5
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style6
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style7
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style8
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style9
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style10
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style11
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style12
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style13
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style14
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.x15
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:general;
 vertical-align:bottom;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 mso-protection:locked visible;
 }
.style16
 {
 mso-number-format:"0%";
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 mso-style-name:"Percent";
 }
.style17
 {
 mso-number-format:"_ \0022¥\0022* \#\,\#\#0\.00_ \;_ \0022¥\0022* -\#\,\#\#0\.00_ \;_ \0022¥\0022* \0022-\0022??_ \;_ \@_ ";
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 mso-style-name:"Currency";
 }
.style18
 {
 mso-number-format:"_ \0022¥\0022* \#\,\#\#0_ \;_ \0022¥\0022* -\#\,\#\#0_ \;_ \0022¥\0022* \0022-\0022_ \;_ \@_ ";
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 mso-style-name:"Currency [0]";
 }
.style19
 {
 mso-number-format:"_ * \#\,\#\#0\.00_ \;_ * -\#\,\#\#0\.00_ \;_ * \0022-\0022??_ \;_ \@_ ";
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 mso-style-name:"Comma";
 }
.style20
 {
 mso-number-format:"_ * \#\,\#\#0_ \;_ * -\#\,\#\#0_ \;_ * \0022-\0022_ \;_ \@_ ";
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 mso-style-name:"Comma [0]";
 }
.x21
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 mso-protection:locked visible;
 }
.x22
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border-top:1px solid windowtext;
 border-right:none;
 border-bottom:none;
 border-left:none;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x23
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:general;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border-top:none;
 border-right:none;
 border-bottom:1px solid windowtext;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x24
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border-top:none;
 border-right:none;
 border-bottom:1px solid windowtext;
 border-left:none;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x25
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:general;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border-top:none;
 border-right:none;
 border-bottom:1px solid windowtext;
 border-left:none;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x26
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:general;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border-top:none;
 border-right:1px solid windowtext;
 border-bottom:1px solid windowtext;
 border-left:none;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x27
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border-top:1px solid windowtext;
 border-right:none;
 border-bottom:none;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x28
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border-top:1px solid windowtext;
 border-right:1px solid windowtext;
 border-bottom:1px solid windowtext;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x29
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border-top:1px solid windowtext;
 border-right:1px solid windowtext;
 border-bottom:1px solid windowtext;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x30
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border-top:none;
 border-right:1px solid windowtext;
 border-bottom:1px solid windowtext;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x31
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border-top:1px solid windowtext;
 border-right:1px solid windowtext;
 border-bottom:none;
 border-left:none;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
</style>
