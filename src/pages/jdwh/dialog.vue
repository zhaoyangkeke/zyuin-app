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
               
               <el-form-item class="" label="" prop="">
                <el-input clearable size="mini" type="text"  v-model="searchVal.userName" placeholder="请输入人员名称"> </el-input>
                 </el-form-item>   
            <el-form-item class="" label="" prop="">
              <el-button  size="mini" @click="searchBtn" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
            </el-form-item>
            <el-form-item class="" label="" prop="">
             <el-button size="mini" style="color: #fff;" class="dialog-button bao_cun"  @click="conformClose('save')">确定选择</el-button>
            </el-form-item>
             
          </el-form>
       <div style="height:100%;display: flex;flex-wrap: nowrap;padding-left:16px">
           <div  style="display:inline-block;width:20%;height:100%;vertical-align: top;border:1px solid #edeef0;border-right:none;overflow: auto;">
                <el-tree :default-expand-all="true" :data="treeList"  :props="defaultP" @node-click="handleNodeClickxz" :default-expanded-keys="[zkx]"  node-key="id"></el-tree>
           </div>
           <div style="display:inline-block;width:79%;height:100%;border-left: 1px solid #edeef0;vertical-align: top;border-right: 1px solid #edeef0">
            <el-table ref="tableForm" :data="dialogData" @row-click="rowClick" row-class-name="row_class"  :row-style="rowClass"    style="width: 100%;height: 100%;overflow:auto;"  @selection-change="handleSelectionChange">
 
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="40">
        </el-table-column>
          <el-table-column align="center"  style="background: #afc;" v-for="(tit,titIndex) in dialogTableTit" :prop="titIndex" :label="tit" :key="titIndex"> </el-table-column>
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
          :total="totals">
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
    props:['dialogVisible','dialogData','datatypes','dialogTableTit','bt','totals','dwbm','bmbm'],
    data(){
      return {
        searchVal:{userName:''},
        searchType:'',
        currentPage:1,
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

      }
    },
    watch: {
      dialogVisible:function (newV,oldV) {
      },
    multipleSelection(data) {  //存储选中的row
      this.selectRow = [];
      if (data.length > 0) {
        data.forEach((item, index) => {
          this.selectRow.push(item.userCode);
        });
      }
    }
  },
    created (){
        this.istype=this.datatypes
 
        this.$api.getUserDept2('?dwbm='+ this.dwbm+'&bmbm='+this.bmbm).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
        this.treeList = resp.data.data
        this.zkx=this.treedata0[0].id
        }
      }).catch(e => {
 
      })
    },
    mounted (){
        console.log(this.datatypes)
    },
    methods:{
     handleSelectionChange (val) {
      this.multipleSelection = val
    },
    rowClass({ row, rowIndex }) {
 
      if (this.selectRow.includes(row.userCode)) {
        return { "background-color": "rgba(185, 221, 249, 0.75)" };
      }
    },
    handleNodeClickxz(data){
     this.$emit('searchXMMC',{'userName':this.searchVal.userName,'pageSize':this.pageSize,'currentPage':this.currentPage,bmbm:data.id})
    },
    handleSizeChanges (val) {
      this.pageSize = val
    this.$emit('searchXMMC',{'userName':this.searchVal.userName,'pageSize':this.pageSize,'currentPage':this.currentPage})
    },
    handleCurrentChanges (val) {
      this.currentPage = val
   this.$emit('searchXMMC',{'userName':this.searchVal.userName,'pageSize':this.pageSize,'currentPage':this.currentPage})
    },
      searchBtn(){
        //  let {searchVal,gzdj,jcsj} = this
        let that=this
        switch (this.datatypes){
          case 'ry':
            this.$emit('searchXMMC',{'userName':that.searchVal.userName,'pageSize':that.pageSize,'currentPage':that.currentPage})
            break;
        }
      },
 
      rowClick (row) {
          this.$refs.tableForm.clearSelection()
        this.$refs.tableForm.toggleRowSelection(row)
        this.selectSearch = row
   
      },
      conformClose(type){
        let self = this
        switch (self.istype){
          case 'ry':
             self.$emit('closeDialog',this.selectSearch)
             this.selectSearch=undefined
            break;
 
        }

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
