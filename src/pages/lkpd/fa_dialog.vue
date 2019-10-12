<template>
    <el-dialog
    fullscreen class="data-dialog el-updata-div  jqk" 
      :visible="dialogVisible"
      :show-close="false"
      style="z-index: 999;height: 100%;"
      width="60%">
        <span slot="title">
          <span class="titleclasschild"  @click="conformClose('cancel')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>{{bt}}</span>
      </span>
      <div >
          <el-form  :inline="true" style="padding-left:16px">
             <el-form-item   label="路线名称" prop="" class="">
            <el-select clearable size="mini" style="width: 150px;" v-model="lxDatas" value-key="id" placeholder="路线名称" @change="changeLx">
              <el-option v-for="item in lxxx" :key="item.id" :label="item.ldname" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-select size="mini"  class="" placeholder="请选择数据来源"  v-model="sjlx" clearable @change="changesjlx">
              <el-option label="导入数据" value="导入数据"></el-option>
              <el-option label="生成数据" value="生成数据"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item class="" label="" prop="">
              <el-button  size="mini" @click="searchZc(1,10)" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
            </el-form-item>
    
          </el-form>
       <div style="height:100%;display: flex;flex-wrap: nowrap;padding-left:16px;overflow: hidden;">
 
 
            <el-table ref="tableForm" :data="dialogDataZc" @row-click="rowClick" row-class-name="row_class"  :row-style="rowClass"    style="width: 100%;height: 100%;overflow:auto;"  @selection-change="handleSelectionChange" v-loading="loading">
 
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="40">
        </el-table-column>
          <el-table-column sortable align="left" prop="bbmc" label="评定方案"  show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="lxbm" label="路线编号"  show-overflow-tooltip></el-table-column>
        <!-- <el-table-column sortable align="left" prop="lxbm" label="等级"  show-overflow-tooltip></el-table-column> -->
        <el-table-column sortable align="left" prop="lxmc" label="路线名称"  show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="sjly" label="数据来源"  show-overflow-tooltip></el-table-column>
       <el-table-column align="left" width="150" sortable prop="qdzh" label="起点桩号" show-overflow-tooltip>
          <template scope="scope">
            <div v-if="scope.row.qdzh >= 0">
            <span v-if="scope.row.qdzh.toString().indexOf('.') >= 0">K{{scope.row.qdzh.toString().replace('.', '+')}}</span>
            <span v-if="scope.row.qdzh.toString().indexOf('.') < 0">K{{scope.row.qdzh}}+000</span>
            </div>
            <div v-if="scope.row.qdzh < 0">
            <span v-if="scope.row.qdzh.toString().indexOf('.') >= 0">-K{{scope.row.qdzh.toString().split('.')[0].replace('-', '')}}+{{scope.row.qdzh.toString().split('.')[1]}}</span>
            <span v-if="scope.row.qdzh.toString().indexOf('.') < 0">-K{{scope.row.qdzh}}+000</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" width="150" sortable prop="zdzh" label="终点桩号" show-overflow-tooltip>
          <template scope="scope">
            <div v-if="scope.row.zdzh >= 0">
            <span v-if="scope.row.zdzh.toString().indexOf('.') >= 0">K{{scope.row.zdzh.toString().replace('.', '+')}}</span>
            <span v-if="scope.row.zdzh.toString().indexOf('.') < 0">K{{scope.row.zdzh}}+000</span>
            </div>
            <div v-if="scope.row.zdzh < 0">
            <span v-if="scope.row.zdzh.toString().indexOf('.') >= 0">-K{{scope.row.zdzh.toString().split('.')[0].replace('-', '')}}+{{scope.row.zdzh.toString().split('.')[1]}}</span>
            <span v-if="scope.row.zdzh.toString().indexOf('.') < 0">-K{{scope.row.zdzh}}+000</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column sortable align="left" width="100"  prop="fx" label="行车方向"></el-table-column>
        <el-table-column sortable align="left" prop="lmcd" width="100"  label="长度（M）"></el-table-column>
        <!-- <el-table-column sortable align="left" prop="mqidj" width="100"  label="评定等级"></el-table-column> -->
        <el-table-column align="center" class-name="column-caoz" label="评定等级" width="80">
          <template scope="scope">
            <span style="color:#FF4500 ;" v-if="scope.row.mqidj==1">优</span>
            <span style="color:#FF8C00 ;" v-if="scope.row.mqidj==2">良</span>
            <span style="color:#CD853F ;" v-if="scope.row.mqidj==3">中</span>
            <span style="color:#BDB76B ;" v-if="scope.row.mqidj==4">次</span>
            <span style="color:#696969 ;" v-if="scope.row.mqidj==5">差</span>
          </template>
        </el-table-column>
        <el-table-column sortable align="left" prop="mqi" label="MQI"></el-table-column>
         <el-table-column sortable align="left" prop="sci" label="路基SCI"></el-table-column>
        <el-table-column align="left" sortable prop="pqi" label="路面PQI"></el-table-column>
        <el-table-column align="center"  label="路面分项指标" show-overflow-tooltip>
          <el-table-column align="left" sortable prop="pci" label="PCI" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" sortable prop="rqi" label="RQI" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" sortable prop="rdi" label="RDI" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" sortable prop="pbi" label="PBI" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" sortable prop="pwi" label="PWI" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" sortable prop="sri" label="SRI" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" sortable prop="pssi" label="PSSI" width="80" show-overflow-tooltip></el-table-column>
        </el-table-column>
        <el-table-column align="left" width="120px" sortable prop="bci" label="桥隧构造物BCI"></el-table-column>
        <el-table-column align="left"  width="120px" sortable prop="tci" label="沿线设施TCI"></el-table-column>
        <el-table-column align="left" sortable prop="pdsj" label="评定时间"></el-table-column>
        </el-table>
 
       </div>
        
          <footer class="footer">
      <div style="padding: 6px;text-align:center">
        <el-pagination
          @size-change="handleSizeChanges"
          @current-change="handleCurrentChanges"
          :current-page="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalsZc">
        </el-pagination>
      </div>
    </footer>
        <!-- <div style="text-align: center;margin-top: 10px;height:50px;line-height:50px">
         
          <el-button size="mini" @click="conformClose('cancel')">取消</el-button>
        </div> -->
  
  </div>
    </el-dialog>
</template>

<script>
  export default {
    props:['dialogVisible','lxxx','bbid','dialogTableTit','bt','bmbm','dwbm','sjlx'],
    data(){
      return {
          lxDatas:{},
        searchVal:{userName:''},
        searchType:'',
        currentPage:1,
        dialogDataZc:[],
        totalsZc:0,
        pageSize: 10,
        getIndex:undefined,
        multipleSelection:[],
        placeHolder:'',
        istype:'',
        gzdj:'',
        zkx:'',
        jcrq:'',
        cklist:[],
        selectRow:[],
        ckmc:'',
         treeList:[],
          defaultP:{
          children: 'children',
          label: 'text'
        },
        loading:false

      }
    },
    watch: {
      dialogVisibleZc:function (newV,oldV) {
      },
    multipleSelection(data) {  //存储选中的row
      this.selectRow = [];
      if (data.length > 0) {
        data.forEach((item, index) => {
          this.selectRow.push(item.ldid);
        });
      }
    }
  },
    created (){
        this.istype=this.datatypes
        this.searchVal.sjly=this.sjlx
        this.searchVal.bbid=this.bbid
         this.searchZc(1,10)     
    },
    mounted (){
    },
    methods:{
      changesjlx(val){
          this.searchVal.sjly= val
      },
      changeLx(val){
          this.searchVal.lxcode=val.lxcode
      },
      searchZc(currentPage,pageSize){
    this.loading=true

       this.$api.getMxbForLksjcx('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchVal)).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
             this.loading=false
          this.dialogDataZc = resp.data.data.list
          this.totalsZc= resp.data.data.total
        }
      }).catch(e => {
      })  
      },
     handleSelectionChange (val) {
      this.multipleSelection = val
    },
    rowClass({ row, rowIndex }) {
   
      if (this.selectRow.includes(row.ldid)) {
        return { "background-color": "rgba(185, 221, 249, 0.75)" };
      }
    },
    handleNodeClickxz(data){
       this.searchVal.lxpk=data.sblbpk
          this.searchZc(this.currentPage, this.pageSize)
    },
    handleSizeChanges (val) {
      this.pageSize = val
    this.searchZc(this.currentPage, this.pageSize)
    },
    handleCurrentChanges (val) {
      this.currentPage = val
   this.searchZc(this.currentPage, this.pageSize)
    },
 
      rowClick (row) {
          this.$refs.tableForm.clearSelection()
        this.$refs.tableForm.toggleRowSelection(row)
        this.selectSearch = row
   
      },
      conformClose(type){
 
             this.$emit('closeDialog',this.selectSearch)
             this.selectSearch=undefined
 

      }
    }
  }
</script>

<style lang="scss">
  .xmmcDialog{
    .el-dialog__body{
      padding: 0 10px 10px !important;
    }
    .el-form{
      padding: 5px 0;
      .el-form-item{
        margin-bottom: 0px;
      }
    }

  }
</style>
