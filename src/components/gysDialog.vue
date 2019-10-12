<template>
  <el-dialog
    title="项目信息"
    :visible="dialogVisible"
    :show-close="false"
    class="xmmcDialog"
    style="z-index: 999;height: 100%;"
    width="60%">
    <div>
      <span  class="closeBtn"  @click="conformClose('cancel')">×</span>
      <el-form  :inline="true">
        <el-form-item class="" label="" prop="">
          <el-input  @keyup.enter.native="searchBtn" size="mini" v-model="searchVal" :placeholder="placeHolder"></el-input>
        </el-form-item>
        <el-form-item class="" label="" prop="">
          <el-button  size="mini" @click="searchBtn" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="dialogData" @row-click="rowClick" :row-class-name="tableRowClassName" :row-style="selectedHighlight" @row-dblclick="hh" class="aaa" height="240" style="width: 100%;">
        <el-table-column
          class="aaaa"
          type="index"
          align="center"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column align="center"  style="background: #afc;" v-for="(tit,titIndex) in dialogTableTit" :prop="titIndex" :label="tit" :key="titIndex"> </el-table-column>
      </el-table>
      <div style="text-align: center;margin-top: 10px;">
        <el-button size="mini" style="color: #fff;" class="dialog-button bao_cun"  @click="conformClose('save')">保存</el-button>
        <el-button size="mini" @click="conformClose('cancel')">取消</el-button>
      </div>
    </div>

  </el-dialog>
</template>

<script>
  export default {
    props:['dialogVisible','dialogData','datatypes','dialogTableTit'],
    data(){
      return {
        searchVal:undefined,
        searchType:'',
        getIndex:undefined,
        selectSearch:[],
        placeHolder:'',
        isAdd:''
      }
    },
    watch:{

      dialogData:function (a) {

      },
      dialogVisible:function (newV,oldV) {
      },
      datatypes:function (newV,oldV) {
        switch (newV){
          case 'mc':
            this.isAdd = 'ty'
            this.placeHolder = '请输入供应商名称'
            break;
          case 'bh':
            this.isAdd = 'ty'
            this.placeHolder = '请输入项目编号'
            break;
          case 'dw':
            this.placeHolder = '请输入单位名称'
            this.isAdd = 'ty'
            break;
          case 'add':
            this.isAdd = 'add'
            this.placeHolder = '请输入项目名称'
            break;
          case 'lxbh':
            this.isAdd = 'lxbh'
            this.placeHolder = '请输入路线编码'
            break;
        }
      }
    },
    methods:{
      hh(row, event){
        this.searchVal = undefined
        let self = this
        switch (self.isAdd){
          case 'ty':
            self.$emit('closeDialog',row)
            break;
          case 'add':
            self.$emit('selectAddDialog',row)
            break;
          case 'lxbh':
            self.$emit('selectLXBH',row)
            break;
        }
      },
      searchBtn(){
        let {searchVal} = this
        switch (this.datatypes){
          case 'mc':
            this.$emit('searchXMMC',searchVal.trim())
            break;
          case 'bh':
            this.$emit('searchXMBH',searchVal.trim())
            break;
          case 'lxbh':
            this.$emit('searchLXBH',searchVal.trim())
            break;
          case 'gys':
            this.$emit('searchGYS',searchVal.trim())
            break;
        }
      },
      tableRowClassName ({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;
      },
      selectedHighlight({row, rowIndex}) {
        if ((this.getIndex) === rowIndex ) {
          return {
            "background-color": "#d5d5d5"
          };
        }
      },
      rowClick (row) {
        this.selectSearch = row
        this.getIndex=row.index
      },
      conformClose(type){
        this.searchVal = undefined
        let self = this
        switch (self.isAdd){
          case 'ty':
            type == 'cancel'?self.$emit('closeDialog',null): self.$emit('closeDialog',this.selectSearch)
            break;
          case 'add':
            type == 'cancel'?self.$emit('selectAddDialog',null): self.$emit('selectAddDialog',this.selectSearch)
            break;
          case 'lxbh':
            type == 'cancel'?self.$emit('selectLXBH',null): self.$emit('selectLXBH',this.selectSearch)
            break;
        }

      }
    },
  }
</script>

<style lang="scss">
  .closeBtn{
    position: absolute;
    top: -5px;
    right: 10px;
    font-size: 26px;
    font-weight: bold;
    cursor: pointer;
  }
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
