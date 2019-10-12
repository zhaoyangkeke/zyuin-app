<template>
  <div  id="sbxj" class="xz-body styleSheets" style="width:100%;height:100%;min-width:1100px" v-loading.fullscreen.lock="fullscreenLoading"  v-if="isRouterAlive">
    <div class="bill-header">
      <div class="bill-title">
        <span>仓库管理</span>
        <ul>
          <li @click="showAdd()" class="Hight_btn">新增</li>
          <li @click="deleteData()">删除</li>
        </ul>
      </div>
      <div class="bill-search">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
 
          <el-form-item style="margin-bottom: 0px" prop class>
            <el-input  clearable v-model="searchForm.ckmc" size="mini" placeholder="请输入仓库名称"></el-input>
          </el-form-item>-->
          <el-form-item style="margin-bottom: 0px" label prop class>
            <el-button
              size="mini"
              style="background-color: #DF4D4A;border-color:transparent;color: #fff"
              @click="search(1,10)"
            >查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="conter_table"  style="background:#fff">
       <div class="left" style="display:inline-block;width:20% ">
        <el-tree
          :data="tbdwList"
          :props="defaultTree"
          :highlight-current="true"
          :default-expanded-keys="['1']"
          :default-checked-keys="['101']"
          :accordion="true"
          @node-click="handleNodeClick"
          node-key="id"
        ></el-tree>
      </div>
      <div class="right" style="display:inline-block;width:79%;height:100%;overflow:auto">
      <el-table
            ref="multipleTable" :data="zcList" tooltip-effect="dark"
                style="width: 100%;height:100%;overflow:auto;"
                row-class-name="row_class"
                border
                :row-style="{fontFamily: 'Microsoft YaHei', fontSize: '12px'}"           
                 v-loading="loading"
               @row-dblclick="dbclick"
               @row-click="sigClic"
            @selection-change="handleSelectionXz"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="40" align="center"></el-table-column>
            <el-table-column sortable align="left" prop="ckmc" label="仓库名称" show-overflow-tooltip></el-table-column>
            <el-table-column sortable align="left" prop="ckbm" label="仓库编码" show-overflow-tooltip></el-table-column>
            <el-table-column sortable align="left" prop="ckwz" label="仓库位置" show-overflow-tooltip></el-table-column>
            <el-table-column sortable align="left" prop="sybm" label="使用部门" show-overflow-tooltip></el-table-column>
            <el-table-column sortable align="left" prop="ssdw" label="所属单位" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" class-name="column-caoz" label="操作" width="80">
              <template scope="scope">
                <span
                  style="color:#00a2fd;cursor: pointer;text-align: center"
                  @click="updateFormDia(scope.row, scope.$index)"
                >编辑</span>
                <span
                  style="color:#00a2fd;cursor: pointer;text-align: center"
                  @click="showBhFormDia(scope.row)"
                >详情</span>
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
                :total="zctotal"
              ></el-pagination>
            </div>
          </footer>
    <!-- <div>
     
      
        <div class="bill-table">
         
          
        </div>
      </div>
    </div> -->
    <el-dialog
      class="data-dialog el-updata-div"
      fullscreen
      :close-on-click-modal="false"
      :visible.sync="showDetail"
      width="580px"
      :show-close="false"
    >
      <span slot="title">
        <span class="titleclasschild" @click="resetForm('formData')">
          <i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i>
        </span>
        <span>仓库管理</span>
      </span>
      <el-form v-if="showxq"  :model="formData"   ref="formData" label-width="100px" class="demo-lmshForm">
      <div class="showxq" v-if="showxq" style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>仓库名称: </span>
              <span>{{formData.ckmc}}</span>
            </p>
            <p   class=" addJLD">
              <span>仓库编码: </span>
              <span>{{formData.ckbm}}</span>
            </p>
            <p  class=" addJLD">
              <span>仓库位置: </span>
              <span>{{formData.ckwz}}</span>
            </p>
             <p  class=" addJLD">
              <span>使用部门: </span>
              <span>{{formData.sybm}}</span>
            </p>
             <p  class=" addJLD">
              <span>所属单位: </span>
              <span>{{formData.ssdw}}</span>
            </p>
            <!-- <p   class=" addJLD">
              <span>填报人: </span>
              <span>{{formData.tbr}}</span>
            </p>
            <p   class=" addJLD">
              <span>填报时间: </span>
              <span>{{formData.tbsj}}</span>
            </p>
            <p   class=" addJLD">
              <span>填报单位: </span>
              <span>{{formData.tbdw}}</span>
            </p>
            <p   class=" addJLD">
              <span>填报部门: </span>
              <span>{{formData.tbbm}}</span>
            </p> -->
           
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
        :rules="ckgl"
        ref="formData"
        label-width="100px"
        class="demo-lmshForm"
      >
        <el-form-item class="addJLD" label="仓库名称" prop="ckmc">
          <el-input size="mini" type="text" v-model="formData.ckmc"></el-input>
        </el-form-item>
        <el-form-item class="addJLD" label="仓库编码" prop="ckbm">
          <el-input size="mini" type="text" v-model="formData.ckbm"></el-input>
        </el-form-item>
        <el-form-item class="addJLD" label="仓库位置" prop="ckwz">
          <el-input size="mini" type="text" v-model="formData.ckwz"></el-input>
        </el-form-item>
        <el-form-item class="addJLD" label="使用部门" prop="sybm">
          <el-input size="mini" type="text" v-model="formData.sybm" @focus="selectBmTree" placeholder="请选择"></el-input>
          <div class="sybm">
            <el-tree
              :accordion="true"
              :data="tbbmList"
              :default-expanded-keys="[zkx_bm]"
              node-key="id"
              :props="defaultProps"
              @node-click="handleBmNodeClick"
            ></el-tree>
          </div>
        </el-form-item>
        <el-form-item class="addJLD" label="所属单位" prop="ssdw">
          <el-input
          placeholder="请选择"
            class="ssdw_inner"
            size="mini"
            type="text"
            v-model="formData.ssdw"
            @focus="selectDwTree"
          ></el-input>
          <div class="ssdw">
            <el-tree
              :accordion="true"
              :default-expanded-keys="[zkx]"
              node-key="id"
              :data="tbdwList"
              :props="defaultTree"
              @node-click="handleDwNodeClick"
            ></el-tree>
          </div>
        </el-form-item>

       
        <div class="dialog_footer" v-if="!showxq">
          <el-button
            size="small"
            v-if="isadd"
            type="primary"  class="dialog-button bao_cun"
            @click="addSubmit"
          >保存</el-button>
          <el-button
            size="small"
            v-if="!isadd"
           type="primary"  class="dialog-button bao_cun"
            @click="updateSubmit"
          >保存</el-button>
          <el-button
            size="small"
          class="dialog-button qu_xiao"
            style="margin-right: 20px"
            @click="resetForm('formData')"
          >取消</el-button>
        </div>
      </el-form>
      <!-- <div class="dialog_warps">
        <ul class="zhubnr">
          <li>
            <span>仓库名称</span>
            <p>
              <el-input size="mini" type="text" v-model="formData.ckmc"></el-input>
            </p>
          </li>
          <li>
            <span>仓库编码</span>
            <p>
              <el-input size="mini" type="text" v-model="formData.ckbm"></el-input>
            </p>
          </li>
          <li>
            <span>仓库位置</span>
            <p>
              <el-input size="mini" type="text" v-model="formData.ckwz"></el-input>
            </p>
          </li>
          <li  style="border-bottom:1px solid #D5D6D7;position:relative">
            <span>使用部门</span>
            <p>
              <el-input size="mini" type="text" v-model="formData.sybm" @focus="selectBmTree"></el-input>
            </p>
            <div class="sybm">
              <el-tree :accordion="true" :data="tbbmList" :props="defaultProps" @node-click="handleBmNodeClick"></el-tree>
            </div>
          </li>
          <li style="border-bottom:1px solid #D5D6D7;position:relative">
            <span>所属单位</span>
            <p>
              <el-input class="ssdw_inner" size="mini" type="text" v-model="formData.ssdw" @focus="selectDwTree"></el-input>
            </p>
            <div class="ssdw">
              <el-tree :accordion="true" :default-expanded-keys="['1']"  node-key="id" :data="tbdwList" :props="defaultTree" @node-click="handleDwNodeClick"></el-tree>
            </div>
          </li>
            <li></li>
          <div style="clear: both"></div>
        </ul>
        <div class="dialog_footer" v-if="!showxq">
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" @click="addSubmit">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary"  class="dialog-button bao_cun" @click="updateSubmit">保存</el-button>
          <el-button size="small"  class="dialog-button qu_xiao"  style="margin-right: 20px" @click="resetForm">取消</el-button>
        </div>
      </div>-->
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      ckgl: {
        ckbm: [
          { required: true, message: "仓库编码不能为空", trigger: "blur" },
          { min: 1, message: "请填写仓库编码" }
        ],
        ckmc: [
          { required: true, message: "仓库名称不能为空", trigger: "blur" },
          { min: 1, message: "请选择仓库名称" }
        ],
        ckwz: [
          { required: true, message: "仓库位置不能为空", trigger: "blur" },
          { min: 1, message: "请填写仓库位置" }
        ],
        sybm: [
          { required: true, message: "使用部门不能为空", trigger: "blur" },
          { min: 1, message: "请选择使用部门" }
        ],
        ssdw: [
          { required: true, message: "所属单位不能为空", trigger: "blur" },
          { min: 1, message: "请选择所属单位" }
        ]
      },
      showDetail: false,
      isadd: false,
      showxq: false,
      searchForm: { ckmc: "", ssdwdm: "" },
      formData: { sybm: "", ssdw: "" },
      zcList: [],
      tbdwList: [],
      tbbmList: [],
      multipleXz: [],
      qmbbOptions: [],
      qmbbOptions1: [],
      loading:false,
      userData:[],
      zcPage: 1,
      zcSize: 10,
      zctotal: 10,
      defaultTree: {
        children: "children",
        label: "text"
      },
      zkx:'',
      zkx_bm:'',
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
      defaultProps: {
        children: "children",
        label: "text"
      },
      isRouterAlive:true,
    };
  },
 async created(){
   this.initUser()
    // this.reload()
  },
  methods: {
    sigClic (row){
this.$refs.multipleTable.toggleRowSelection(row)
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
    resetForm(res) {
      this.loading=false
      if(res!==undefined && res.target==undefined){
     if(this.$refs[res] != undefined){
        this.$refs[res].resetFields();
        }
      }
      this.showDetail = false;
      this.formData = { sybm: "", ssdw: "" };
    },
    showAdd() {
      this.showDetail = true;
      this.isadd = true;
      this.formData.tbsjc= new Date().getTime()
    },
    updateFormDia(row) {
      this.showDetail = true;
      this.isadd = false;
      this.showxq=false
      this.formData = JSON.parse(JSON.stringify(row));
    },
    showBhFormDia(row) {
      this.showDetail = true;
      this.showxq = true;
       this.isadd = false;
      this.formData = JSON.parse(JSON.stringify(row));
    },
    dbclick (row){
    this.showDetail = true;
      this.showxq = true;
       this.isadd = false;
      this.formData = JSON.parse(JSON.stringify(row));
    },
    updateSubmit() {
      this.$refs["formData"].validate(valid => {
        if (valid) {
          this.$api
            .editCk(this.formData)
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "编辑成功!"
                });
                this.search(this.zcPage, this.zcSize);
                this.resetForm();
              } else {
                this.$message({
                  type: "error",
                  message: res.data.msg
                });
              }
            })
            .catch(e => {});
        } else {
          return false;
        }
      });
    },
    deleteData() {
      if (this.multipleXz.length > 0) {
        this.$confirm("确定删除选中的信息吗？删除后数据无法恢复！", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            let djbharr = "";
            this.multipleXz.map((item, index) => {
              djbharr = djbharr + item.id + ",";
            });
            djbharr = djbharr.slice(0, djbharr.length - 1);
            this.$api.delCkByIds("?ids=" + djbharr).then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.search(this.zcPage, this.zcSize);
              } else {
                this.$message({
                  type: "error",
                  message: res.data.msg
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message({ type: "error", message: "请选选择要删除的数据" });
      }
    },
    
    addSubmit() {
      this.$refs["formData"].validate(valid => {
        if (valid) {
          this.$api
            .addCk(this.formData)
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
                this.search(this.zcSize, this.zcSize);
                this.resetForm();
              } else {
                this.$message({
                  type: "error",
                  message: res.data.msg
                });
              }
            })
            .catch(e => {});
        } else {
          return false;
        }
      });
    },

    search(currentPage, pageSize) {
      this.loading = true;
      this.$api
        .getCkInfoList(
          "?pageNum=" +
            currentPage +
            "&pageSize=" +
            pageSize +
            "&" +
            $.param(this.searchForm)
        )
        .then(resp => {
          if (resp.status !== 200) {
            this.$message({
              message: "出错了",
              type: "error"
            });
          } else {
            this.loading = false;
            this.zcList = resp.data.data.list;
            this.zctotal = resp.data.data.total;
          }
        })
        .catch(e => {});
    },
    handleBmNodeClick(data) {
      this.formData.sybm = data.text;
      this.formData.sybmdm = data.id;
      $(".sybm").hide(this.searchForm);
    },
    selectBmTree() {
      $(".sybm").show();
    },
    handleDwNodeClick(data) {
      this.formData.ssdw = data.text;
      this.formData.ssdwdm = data.id;
      $(".ssdw").hide(this.searchForm);
    },
    selectDwTree() {
      $(".ssdw").show();
    },
    handleSelectionXz(val) {
      this.multipleXz = val;
    },
    handlezcSizeChange(val) {
      this.zcSize = val;
      this.search(this.zctPage, this.zcSize);
    },
    handlezcCurrentChange(val) {
      this.zcPage = val;
      this.search(this.zcPage, this.zcSize);
    },
    handleNodeClick(data) {
      if (data.children.length == 0) {
        this.searchForm.ssdwdm = data.id;
      }
      this.search(this.zcPage, this.zcSize);
    },
  getTbdw(code,bmbm){
    this.fullscreenLoading=true
    this.$api.getUserDw('?yhdw='+code).then(res=>{
      this.fullscreenLoading=false
          if(res.data.code===1){
          this.tbdwList= res.data.data
          this.zkx=this.tbdwList[0].id
           this.searchForm.tbdwdm=this.userInfo.daZzbh
           this.searchForm.tbbmdm=this.userInfo.daBmbm
          this.search(1,10)
          }
        }) 
    },
    getCs() {
      this.$api
        .jdwhxjwxgetXjType("?mjlxbm=23")
        .then(resp => {
          if (resp.code !== 1) {
            this.$message({
              message: "出错了",
              type: "error"
            });
          } else {
            this.qmbbOptions = resp.data;
          }
        })
        .catch(e => {});
      this.$api
        .jdwhxjwxgetXjType("?mjlxbm=24")
        .then(resp => {
          if (resp.code !== 1) {
            this.$message({
              message: "出错了",
              type: "error"
            });
          } else {
            this.qmbbOptions1 = resp.data;
          }
        })
        .catch(e => {});
      // this.$api
      //   .getCkInfoList("?pageNum=" + this.zcPage + "&pageSize=" + this.zcSize)
      //   .then(resp => {
      //     if (resp.status !== 200) {
      //       this.$message({
      //         message: "出错了",
      //         type: "error"
      //       });
      //     } else {
      //       this.zcList = resp.data.data.list;
      //       this.zctotal = resp.data.data.total;
      //     }
      //   })
      //   .catch(e => {});
      
      // this.$api
      //   .getUserDw("?yhdw=" + 1)
      //   .then(res => {
      //     if (res.data.code === 1) {
      //       this.tbdwList = res.data.data;
      //     }
      //   })
      //   .catch(e => {});
    }
  },
 
  mounted() {
    
    this.getTbdw(this.userInfo.daZzbh,this.userInfo.daBmbm)
     this.$api
        .getUserDept2('?dwbm=' +  this.userInfo.daZzbh +'&bmbm='+ this.userInfo.daBmbm)
        .then(resp => {
          if (resp.status !== 200) {
            this.$message({
              message: "出错了",
              type: "error"
            });
          } else {
            this.tbbmList = resp.data.data;
            this.zkx_bm = this.tbbmList[0].id
            
          }
        })
        .catch(e => {})
    this.getCs();
    document.onclick = function(e) {
      //  console.log(e.path[1].className)
      if (e.target && e.target.className != "el-input__inner") {
        $(".tbdw").hide();
        $(".sybm").hide();
        $(".ssdw").hide();
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.background_image {
  > div {
    background: none;
  }
}

.sybm {
  display: none;
  width: 200px;
  max-height: 500px;
  overflow-y: scroll;
  border: 1px solid #d5d6d7;
  position: absolute;
  top: 40px;
  left: 0px;
  z-index: 999;
}
.ssdw {
  display: none;
  width: 200px;
  max-height: 500px;
  overflow-y: scroll;
  border: 1px solid #d5d6d7;
  position: absolute;
  top: 40px;
  left: 0px;
  z-index: 999;
}
.xz-body {
 font-size: 12px;
    min-width: 1100px;
    height: 100%;
    overflow: auto;
  > div {
    font-size: 0px;
  }
  .left {
    // height: 544px !important;
    width: 100%;
    height: 100%;
    border: none;
    overflow: auto;
     border: 1px solid #edeef0;
     border-right: none;
  }
}
.conter_table{
      height: calc(100% - 146px);
    }
.bill-header {
  width: 100%;
  border-radius: 5px;
  margin-bottom: 5px;
}
.bill-title {
  height: 46px;
  line-height: 45px;
  width: 100%;
  padding: 0 20px;
  background-color: #f6f6f6;
  > span {
    font-size: 16px;
    font-weight: 600;
  }
  > ul {
    float: right;
    display: inline-block;
    padding-top: 7px;
    > li {
      float: left;
      margin-left: 0 !important;
      font-size: 13px;
      font-weight: 400;
      height: 32px;
      line-height: 2.2;
      min-width: 60px;
      padding: 0 14px;
      border: 1px solid #d0d0d0;
      cursor: pointer;
    }
    > li:first-child {
      border-radius: 5px 0 0 5px;
    }
    > li:last-child {
      border-radius: 0 5px 5px 0;
      border-left: 0 solid #d0d0d0;
    }
  }
}
.bill-search {
  height: 45px;
  width: 100%;
  padding: 0 20px;
  background-color: #fff;
}
.footer {
  height: 45px;
  background: #fff;
  position: relative;
  text-align: center;
}
.dialog_warps {
  background: #fff;
  padding: 20px 80px;
  .zhubnr {
    li {
      width: calc(100% / 3);
      height: 40px;
      float: left;
      border: 1px solid #d5d6d7;
      border-right: none;
      border-bottom: none;
      color: #52575d !important;
      font-size: 16px;
      &:nth-of-type(3n) {
        border-right: 1px solid #d5d6d7;
      }
      &:nth-last-of-type(1) {
        border-bottom: 1px solid #d5d6d7;
      }
      > span {
        width: 100px;
        display: inline-block;
        height: 100%;
        line-height: 39px;
        text-indent: 1em;
        font-size: 12px;
        border-right: 1px solid #d5d6d7;
        background: #f7f8f9;
        float: left;
      }
      p {
        width: calc(100% - 100px);
        height: 100%;
        float: left;
        .el-input__inner {
          border: none;
          text-align: center;
          vertical-align: top;
        }
      }
      .radio_line {
        /*span{
              display: inline-block;
              width: 50%;
            }*/
        padding: 0 5px;
        .el-radio__label {
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
    .tow_line,
    .three_line,
    .four_line {
      width: 100%;
      border-right: 1px solid #d5d6d7 !important;
      .el-input--mini {
        width: calc(100% - 60px);
      }
      p {
        > span {
          border-bottom: 1px solid #d5d6d7;
          &:last-child {
            border-bottom: none;
          }
          i {
            display: inline-block;
            width: 60px;
            height: 100%;
            font-style: normal;
            background: #f7f8f9;
            float: left;
            line-height: 32px;
            text-align: center;
          }
        }
      }
    }
    .text_line {
      width: 100%;
      border-right: 1px solid #d5d6d7 !important;
      height: 80px;
      overflow: hidden;
      > span {
        height: 80px;
        height: 100% !important;
      }
      p {
        height: 80px;

        overflow: hidden;
        .textarea {
          border: none;
          height: 79px !important;
          width: 100%;
        }
      }
      .up {
        overflow: auto;
      }
      .el-upload-list__item {
        border: none;
      }
      .el-upload-list__item {
        line-height: 32px;
        margin: 0px;
      }
      .fjlist {
        li {
          list-style: none;
          border: none;
          height: 32px;
          line-height: 32px;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:hover {
            background: #d5d6d7;
          }
          i {
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
  .zibnr,
  .zibiaonr {
    width: 100%;
    position: relative;
    padding: 15px 0 0 0;
    overflow: hidden;
    text-align: center;
    box-sizing: border-box;
    ul {
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 15px;
      li {
        width: 100%;
        height: 40px;
        float: left;
        box-sizing: border-box;
        border: 1px solid #d5d6d7;
        color: #52575d !important;
        font-size: 12px;
        border-right: none;
        border-bottom: none;
        &:nth-of-type(1) {
          height: 60px;
        }
        &:nth-last-of-type(1) {
          border-bottom: 1px solid #d5d6d7;
        }
        > span {
          width: calc(100% / 8);
          display: inline-block;
          height: 100%;
          float: left;
          line-height: 39px;
          text-align: center;
          background: #f7f8f9;
          border-right: 1px solid #d5d6d7;
          div {
            height: 50%;
          }
          span {
            width: 50%;
            height: 50%;
            display: inline-block;
            float: left;
            border-top: 1px solid #d5d6d7;
            border-right: 1px solid #d5d6d7;
            &:nth-last-of-type(1) {
              border-right: none;
            }
          }
        }
        p {
          width: calc(100% / 8);
          height: 100%;
          line-height: 39px;
          float: left;
          border-right: 1px solid #d5d6d7;

          i {
            color: #00a2fd;
            margin: 0 5px;
          }
        }
      }
    }
  }
  .zibiaonr {
    margin-top: 20px;
    li {
      width: calc(100% / 6);
      height: 64px;
      float: left;
      border: 1px solid #d5d6d7;
      color: #52575d !important;
      font-size: 12px;
      border-right: none;
      &:nth-last-of-type(1) {
        border-right: 1px solid #d5d6d7;
      }
      > span {
        width: 100%;
        display: inline-block;
        height: 50%;
        line-height: 31px;
        text-align: center;
        background: #f7f8f9;
        border-bottom: 1px solid #d5d6d7;
      }
      p {
        width: calc(100%);
        height: 50%;
        float: left;
        .el-input__inner {
          border: none;
          text-align: center;
          vertical-align: top;
        }
        i {
          color: #00a2fd;
          margin: 0 5px;
        }
      }
    }
  }
  .addzbsj {
    text-align: center;
    color: #1ca4fa;
    padding: 10px 0;
  }
  .iconwarp {
    text-align: right;
    position: absolute;
    right: 0px;
    top: 0;
    i {
      color: #1ca4fa;
      margin-left: 10px;
    }
  }
}
</style>
