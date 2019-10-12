<template>
    <el-dialog
    fullscreen class="data-dialog el-updata-div jqk" 
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
              <el-form-item v-if="gzlx!=''" class="" label="" prop="">
               <el-select clearable   size="mini" style="width: 148px " v-model="searchVal" value-key="mjbm" placeholder="请选择故障系统">
                <el-option v-for="item in gzlx" :key="item.mjbm" :label="item.mjmc" :value="item.mjmc"></el-option>
              </el-select>
              <!-- <el-input  v-if="gzlx==''" style="margin-left:16px"  size="mini" type="text" v-model="searchVal" placeholder="请输入资产名称"></el-input> -->
              </el-form-item>
              <el-form-item v-if="wxfs!=''" class="" label="" prop="">
               <el-select clearable   size="mini" style="width: 148px;margin-right:16px" v-model="searchVal" value-key="mjbm" placeholder="请选择维修方式">
                <el-option v-for="item in wxfs" :key="item.mjbm" :label="item.mjmc" :value="item.mjmc"></el-option>
              </el-select>
              
              </el-form-item>
               <el-form-item  v-if="wxfs!=''" style="margin-bottom: 0px;margin-right:16px"  prop=""  label="" class="">
             <el-select clearable size="mini" v-model="ckmc" placeholder="请选择仓库" value-key="ssck">
          <el-option
           v-for="(item,index) in cklist"
          :key="index"
          :label="item.ssck"
          :value="item.ssck">
         </el-option>
          </el-select>
          </el-form-item>
              <el-form-item v-if="gzlx!=''" style="margin-bottom: 0px;margin-right:16px"  label="" prop="" class="">
             <el-select clearable  size="mini" style="width: 148px;" v-model="gzdj" value-key="mjbm" placeholder="请选择故障等级">
                <el-option value="一级故障"></el-option>
                <el-option value="二级故障"></el-option>
                <el-option value="三级故障"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item v-if="fksq!=''" style="margin-bottom: 0px;margin-right:16px"  label="" prop="" class="">
            <el-input  style="margin-left:16px"  size="mini" type="text" v-model="searchVal" placeholder="请输入资产名称"></el-input>
            </el-form-item> -->
          <el-form-item  style="margin-bottom: 0px" prop=""  label="" class="">
            <el-date-picker
              v-model="jcrq"
              type="daterange"
              size="mini"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="报障开始日期"
              end-placeholder="报障结束日期">
            </el-date-picker>
            <!--<el-select size="mini"  class="" placeholder="请选择日期" v-model="searchForm.jcrq">
              <el-option v-for="(item,index) in qmbbOptions" :key="index" :label="item.bbmc" :value="item.bbid"></el-option>
            </el-select>-->
          </el-form-item>
            <el-form-item class="" label="" prop="">
              <el-button  size="mini" @click="searchBtn" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
            </el-form-item>
            <el-form-item class="" label="" prop="">
             <el-button size="mini" style="color: #fff;" class="dialog-button bao_cun"  @click="conformClose('save')">确定选择</el-button>
            </el-form-item>
             
          </el-form>
        <el-table :data="dialogData" @row-click="rowClick" :row-class-name="tableRowClassName" :row-style="selectedHighlight" @row-dblclick="hh" class="aaa"   style="width: 100%;height:100%;overflow:auto;">
          <el-table-column
            class="aaaa"
            type="index"
            align="center"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column align="center"  style="background: #afc;" v-for="(tit,titIndex) in dialogTableTit" :prop="titIndex" :label="tit" :key="titIndex"> </el-table-column>
        </el-table>
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
    props:['dialogVisible','dialogData','datatypes','dialogTableTit','bt',"gzlx",'totals','wxfs','fksq'],
    data(){
      return {
        searchVal:undefined,
        searchType:'',
        currentPage:1,
        pageSize: 10,
        getIndex:undefined,
        selectSearch:[],
        placeHolder:'',
        isAdd:'',
        gzdj:'',
        jcrq:'',
        cklist:[],
        ckmc:''
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
            this.placeHolder = '请输入项目名称'
            break;
         case 'bx':
            this.isAdd = 'ty'
            this.placeHolder = '请选择故障类型'
            break;
        case 'wx':
            this.isAdd = 'ty'
            this.placeHolder = '请选择维修方式'
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
    mounted (){
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
    methods:{
    handleSizeChanges (val) {
      this.pageSize = val
    this.$emit('searchXMMC',{gzlx:this.searchVal,ckmc:this.ckmc,gzdj:this.gzdj,jcsj:this.jcrq,'pageSize':this.pageSize,'currentPage':this.currentPage})
    },
    handleCurrentChanges (val) {
      this.currentPage = val
   this.$emit('searchXMMC',{gzlx:this.searchVal,ckmc:this.ckmc,gzdj:this.gzdj,jcsj:this.jcrq,'pageSize':this.pageSize,'currentPage':this.currentPage})
    },
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
        //  let {searchVal,gzdj,jcsj} = this
        let that=this
        switch (this.datatypes){
          case 'mc':
            this.$emit('searchXMMC',searchVal)
            break;
          case 'bx':
            this.$emit('searchXMMC',{gzlx:that.searchVal,gzdj:that.gzdj,jcsj:that.jcrq,'pageSize':that.pageSize,'currentPage':that.currentPage})
            break;
        case 'wx':
            this.$emit('searchXMMC',{gzlx:that.searchVal,ckmc:that.ckmc,jcsj:that.jcrq,'pageSize':that.pageSize,'currentPage':that.currentPage})
            break;
          case 'bh':
            this.$emit('searchXMBH',searchVal.trim())
            break;
          case 'lxbh':
            this.$emit('searchLXBH',searchVal.trim())
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
          case 'bx':
            type == 'cancel'?self.$emit('selectLXBH',null): self.$emit('selectLXBH',this.selectSearch)
            break;
        case 'wx':
            type == 'cancel'?self.$emit('selectLXBH',null): self.$emit('selectLXBH',this.selectSearch)
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
