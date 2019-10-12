<template>
    <el-dialog
    fullscreen class="data-dialog el-updata-div  jqk" 
      :visible="dialogVisibleWl"
      :show-close="false"
      style="z-index: 999;height: 100%;"
      width="60%">
        <span slot="title">
          <span class="titleclasschild"  @click="conformClose('cancel')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>{{btWl}}</span>
      </span>
      <div >
          <el-form  :inline="true" style="padding-left:16px">
               
               <el-form-item class="" label="" prop="">
                <el-input clearable size="mini" type="text"  v-model="searchVal.wlmc" placeholder="请输入资产名称" class="space-blank">
			  </el-input>
                 </el-form-item>   
                <el-form-item class="" label="" prop="">
               <el-input clearable size="mini" type="text"  v-model="searchVal.wlbm" placeholder="请输入资产编码">
			  </el-input>
                 </el-form-item>   
            <el-form-item class="" label="" prop="">
              <el-button  size="mini" @click="searchWl(1,10)" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
            </el-form-item>
            <el-form-item class="" label="" prop="">
             <el-button size="mini" style="color: #fff;" class="dialog-button bao_cun"  @click="conformClose('save')">确定选择</el-button>
            </el-form-item>
             
          </el-form>
       <div style="height:100%;display: flex;flex-wrap: nowrap;padding-left:16px;overflow: hidden;">
           <div  style="display:inline-block;width:20%;height:100%;vertical-align: top;border:1px solid #edeef0;border-right:none;overflow: auto;">
                <el-tree :default-expand-all="true" :data="treeList"  :props="defaultP" @node-click="handleNodeClickxz" :default-expanded-keys="[zkx]"  node-key="id"></el-tree>
           </div>
           <div style="display:inline-block;width:79%;height:100%;border-left: 1px solid #edeef0;vertical-align: top;border-right: 1px solid #edeef0">
            <el-table ref="tableForm" :data="dialogDataWl" @row-click="rowClick" row-class-name="row_class"  :row-style="rowClass"    style="width: 100%;height: 100%;overflow:auto;"  @selection-change="handleSelectionChange" v-loading="loading">
 
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="40">
        </el-table-column>
          <el-table-column align="center"  style="background: #afc;" v-for="(tit,titIndex) in dialogTableTitWl" :prop="titIndex" :label="tit" :key="titIndex"> </el-table-column>
        </el-table>
           </div>
       </div>
        
          <footer class="footer">
      <div style="padding: 6px;text-align:center">
        <el-pagination
          @size-change="handleSizeChanges"
          @current-change="handleCurrentChanges"
          :current-page="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalsWl">
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
    props:['dialogVisibleWl','datatypesWl','dialogTableTitWl','btWl','dwbm','bmbm','mx'],
    data(){
      return {
        searchVal:{userName:''},
        searchType:'',
        currentPage:1,
        dialogDataWl:[],
        totalsWl:0,
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
      dialogVisibleWl:function (newV,oldV) {
      },
    multipleSelection(data) {  //存储选中的row
      this.selectRow = [];
      if (data.length > 0) {
        data.forEach((item, index) => {
          this.selectRow.push(item.bjbh);
        });
      }
    }
  },
    created (){
      console.log(this.mx)
        this.istype=this.datatypesWl
     this.$api.selAllWllb().then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.treeList = resp.data.data 
           this.zkx=this.treeList[0].id
           this.searchVal.lxpk=this.treeList[0].sblbpk
           this.searchWl(1,10)
        }
      }).catch(e => {
      }) 
    },
    mounted (){
    },
    methods:{
      searchWl(currentPage,pageSize){
    this.loading=true
      this.$api.getWlList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&'+ $.param(this.searchVal)).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.dialogDataWl = resp.data.data.list
        for (let i = 0; i < this.mx.length; i++) {
         if(this.mx[i].bjmc=='' || this.mx[i].bjmc==undefined){
            this.mx.splice(i,1)
          }
        }
        for(let i=0;i<this.mx.length;i++){
        for(let j=0;j<this.dialogDataWl.length;j++){
         if(this.mx[i].bjmc==this.dialogDataWl[j].bjmc && this.mx[i].bjbm==this.dialogDataWl[j].bjbh && this.mx[i].ggxh==this.dialogDataWl[j].ggxh && this.mx[i].jldw==this.dialogDataWl[j].jldw){
           this.dialogDataWl.splice(j,1)
         }
        }
         }
          this.totalsWl= resp.data.data.total - this.mx.length
        }
      }).catch(e => {
        this.loading = false
      }) 
      },
     handleSelectionChange (val) {
      this.multipleSelection = val
    },
    rowClass({ row, rowIndex }) {
 
      if (this.selectRow.includes(row.bjbh)) {
        return { "background-color": "rgba(185, 221, 249, 0.75)" };
      }
    },
    handleNodeClickxz(data){
       this.searchVal.lxpk=data.sblbpk
          this.searchWl(this.currentPage, this.pageSize)
    },
    handleSizeChanges (val) {
      this.pageSize = val
    this.searchWl(this.currentPage, this.pageSize)
    },
    handleCurrentChanges (val) {
      this.currentPage = val
   this.searchWl(this.currentPage, this.pageSize)
    },
 
      rowClick (row) { 
        this.$refs.tableForm.toggleRowSelection(row)
        this.selectSearch = row
   
      },
      conformClose(type){
 
             this.$emit('closeDialogWl',this.multipleSelection)
             this.multipleSelection=[]
 

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
