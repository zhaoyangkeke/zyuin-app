<template>
  <div id="liucheng" style="overflow-y: hidden">
    <div class="header">
      <span class="headerTit" v-if="isupdate === 0">流程管理中心</span>
      <div class="header_option" v-if="isupdate === 0">
        <ul>
          <!--<li><i class="icon iconfont icon-edit_line" @click="servedata"> 保存</i></li>-->
          <li><i class="icon iconfont icon-edit_line" @click="insertmaintable"> 添加</i></li>
          <li><i class="icon iconfont icon-delete" @click="deletemainrow"> 删除</i></li>
        </ul>
      </div>
      <div class="header_option" v-if="isupdate === 1">
        <ul>
          <li><i class="icon iconfont icon-edit_line" @click="servedata"> 保存</i></li>
          <li><i class="icon iconfont icon-edit_line" @click="insertrow"> 添加</i></li>
          <li><i class="icon iconfont icon-delete" @click="deleterows"> 删除</i></li>
        </ul>
      </div>
      <span class="headerTit" v-if="isupdate === 1">
        <i  class="icon iconfont icon-arrow-left titleclasschild" @click="isupdate=0"></i>
        返回
      </span>
    </div>
    <!--查询弹框区域-->
    <div class="conter_table">
      <el-form :inline="true"  v-if="isupdate === 0">
        <el-form-item style="margin-bottom: 0;" label="项目名称" prop="" class="">
          <el-select v-model="selectForm.ywmk"  size="mini" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
          <el-button size="mini" @click="searchXM" style="background-color: #DF4D4A;border-color:transparent;color: #fff">查询</el-button>
          <el-button size="mini" @click="resizeDate">重置</el-button>
        </el-form-item>
      </el-form>
      <p style="font-size: 12px;height: 18px"></p>
      <div  v-show="isupdate === 0">
        <el-table :data="initDatas" tooltip-effect="dark"
                  style="width: 100%;overflow:auto;"
                  height="750"
                  row-class-name="row_class"
                  @selection-change="rowmainchange"
                  border>
          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column align="left" v-for="(labs,item) in maintableLabs" :prop="item" :label="labs" :key="item" show-overflow-tooltip v-if="!isupdate"> </el-table-column>
          <el-table-column align="left" label="操作" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              <span @click="updatedetail(scope.row)" style="color:#00a2fd;cursor: pointer;text-align: center" >编辑</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="isupdate == 1">
        <el-table  :data="updateDatas" tooltip-effect="dark"
                  style="width: 100%;overflow:auto;"
                  row-class-name="row_class"
                  @selection-change="handlechange"
                   border>
          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column align="left" v-for="(labs,item) in updateLabs" :prop="item" :label="labs" :key="item" show-overflow-tooltip>
            <template scope="scope">
              <el-select v-model="scope.row.pcname" placeholder="请选择" v-if="labs == '流程节点'" size="mini" class="inputwidth">
                <el-option
                  v-for="item in pcnameArr"
                  :key="item.mjbm"
                  :label="item.mjmc"
                  :value="item.mjmc">
                </el-option>
              </el-select>
              <el-input v-model="scope.row.username" v-else-if="labs == '用户名称'" @focus="selectFzr(scope.$index)" size="mini" class="inputwidth"></el-input>
              <el-select v-model="scope.row.messagetype" placeholder="请选择" v-else-if="labs == '信息类型'" size="mini" class="inputwidth" @change="changemessage">
                <el-option
                  v-for="item in messagearr"
                  :key="item.mjbm"
                  :label="item.mjmc"
                  :value="item.mjbm">
                </el-option>
              </el-select>
              <el-input v-model="scope.row.endurl" v-else-if="labs == '结束地址'" size="mini" class="inputwidth"></el-input>
              <el-input v-model="scope.row.backurl" v-else-if="labs == '驳回地址'" size="mini" class="inputwidth"></el-input>
              <el-input v-model="scope.row.urlcode" v-else-if="labs == '详情方法名'" size="mini" class="inputwidth" @blur="changewayname(scope.row.urlcode)"></el-input>
              <el-input v-model="scope.row.remark" v-else-if="labs == '备注'" size="mini" style="width: 400px;"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--选择用户名称弹出框-->
    <el-dialog  :close-on-click-modal="false" :show-close="false" :visible.sync="showSbfzr"  :fullscreen="true" >
     <span slot="title">
          <span class="titleclasschild"  @click="showSbfzr=false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>选择用户名称</span>
      </span>
      <div class="xz-header"  v-loading.fullscreen.lock="fullscreenLoading">
        <div class="xz-body" style="height:645px;min-width:1100px">
          <div class="left" style="display:inline-block;width:20%;height:100%">
            <el-tree :default-expand-all="true" :data="treeList1"  :props="defaultP1" @node-click="handleNodeClickxz1"></el-tree>
          </div>
          <div class="right" style="display:inline-block;width:79%;height:100%">
            <div class="xz-search">
              <el-input size="mini" type="text"  v-model="xz1.username" placeholder="请输入人员名称">
              </el-input>
              <el-button size="small" @click="searchSb1(1,10)" type="text" class="xz-btn">查询</el-button>
              <el-button size="small" @click="okBtn_fzr" type="text" class="xz-btn">确定选择</el-button>
            </div>
            <div class="bill-table">
              <el-table  @row-click="clickRow1" ref="Table1" :data="ysrList1" tooltip-effect="dark"
                         style="width: 100%;"
                         row-class-name="row_class"
                         border
                         :row-style="{fontFamily: '宋体', fontSize: '12px'}"
                         @selection-change="handleSelectionXz1">
                >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column align="center" type="index"  width="50" label="序号"  show-overflow-tooltip></el-table-column>
                <el-table-column align="center" prop="userName" label="名称"></el-table-column>
                <el-table-column align="center" prop="userCode" label="用户编码"></el-table-column>
                <el-table-column align="center" prop="deptList" label="部门编码"></el-table-column>
                <el-table-column align="center" prop="roleList" label="角色信息"></el-table-column>

              </el-table>
              <footer class="footer" style="border: 1px solid #D7D8D9;border-top:none">
                <div style="padding: 6px">
                  <el-pagination
                    @size-change="handlezcSizeChange1"
                    @current-change="handlezcCurrentChange1"
                    :current-page="zcPage1"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="zctotal1">
                  </el-pagination>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--添加弹出框-->
    <el-dialog
      title="添加流程"
      :visible.sync="addDialog"
      width="40%"
      :before-close="handleClose">
      <span style="margin-left: 15px;">流程名称</span>：<el-input v-model="addForm.pcname" size="mini" style=" width: 300px;"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="submitdata" size="mini" style="background-color: #DF4D4A;border-color:transparent;color: #fff">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        deleterowarr: [],
        addForm: {
          pcname: '',
          id: '',
          parentid: '0',
          orderid: ''
        },
        messagearr: [],
        pcnameArr: [],
        xz1:{zcbm:'',zcmc:'',bmbm:''},
        updateDatas: [],
        defaultP1:{
          children: 'children',
          label: 'text'
        },
        ysrList1:[],
        zctotal1:10,
        zcPage1:1,
        zcSize1:10,
        fullscreenLoading:false,
        showSbfzr: false,
        treeList1:[],
        isupdate: 0,
        maintableLabs: {pcname: '流程名称'},
        updateLabs: {pcname: '流程节点',username: '用户名称',messagetype: '信息类型', endurl: '结束地址', backurl:'驳回地址',urlcode: '详情方法名',remark: '备注' },
        showFirstPage:true,
        showSecondPage:false,
        showThirdPage:false,
        selectForm:{
          tjsj:'',
          ywmk:'',
        },
        useinfo: {},
        initDatas:[],
        lmshForm: {},
        deleteindex: [],
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
        rowindex: null,
        addDialog: false,
        pjparam: '',
        isadd: 0
      }
    },

    methods: {
      rowmainchange (val) {
        console.log(val, 688)
        let idarr = []
        for (var i = 0; i < val.length; i++) {
          idarr.push(val[i].id)
        }
        this.deleterowarr= idarr
      },
      submitdata () {
        let leng = this.initDatas[this.initDatas.length - 1].id
        this.addForm.id = parseInt(leng) + 1
        this.addForm.orderid = parseInt(leng) + 1
        console.log(this.addForm.id, 12456)
        this.$api.addmenub(JSON.parse(JSON.stringify(this.addForm))).then(res => {
          if (res.code != 1) {
            this.$message({
              message: '添加失败',
              type: 'error'
            })
          } else {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.addDialog = false
            this.getMenuByparentid(0)
          }
        }).catch(e => {
          console.log(e)
        })
      },
      handleClose () {
        this.addDialog = false
      },
      // 增加，删除主列表数据
      insertmaintable () {
        this.addDialog = true
      },
      deletemainrow () {
        let delparam =this.deleterowarr.toString()
        console.log(delparam,'参数')
        this.$api.deleteMenuxx({id:delparam}).then(res => {
          if (res.code != 1) {
            this.$message({
              message: '删除失败',
              type: 'error'
            })
          } else {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getMenuByparentid(0)
          }
        }).catch(e => {
          console.log(e)
        })
      },
      changewayname (val) {
        console.log(val, 98)
        for(var i=0; i< this.updateDatas.length; i++) {
          this.updateDatas[i].urlcode = val
        }
      },
      changemessage (val) {
        console.log(val,89)
        for(var i=0; i< this.updateDatas.length; i++) {
          this.updateDatas[i].messagetype = val
        }
      },
      deleterows () {
        if (this.deleteindex.length === 0) {
          this.$message({
            message: '请选中要删除的数据',
            type: 'error'
          })
        } else {
          console.log(this.deleteindex, 7878)
          console.log(this.updateDatas, 7979)
          this.updateDatas= this.updateDatas.filter(item => !this.deleteindex.some(ele=>ele===item.id));
        }
      },
      handlechange (val) {
        console.log(val,343)
        let indexarr = []
        for (var i = 0; i < val.length; i++) {
          indexarr.push(val[i].id)
        }
        console.log(indexarr);
        this.deleteindex = indexarr
      },
      // 保存表格
      servedata () {
        // console.log(this.updateDatas, 79)
       if (this.isadd === 0) {
        this.addupdatedata()
       } else {
         this.updatesubmit()
       }
      },
      addupdatedata () {
        for (var i = 0; i< this.updateDatas.length; i++) {
          this.updateDatas[i].parentid = this.pjparam
        }
        this.$api.addMenuMore(this.updateDatas).then(res => {
          if (res.code != 1) {
            this.$message({
              message: '添加失败',
              type: 'error'
            })
          } else {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.isupdate = 0
          }
        }).catch(e => {
          console.log(e)
        })
      },
      updatesubmit () {
        this.$api.updateMenuxx(this.updateDatas).then(res => {
          if (res.code != 1) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.isupdate = 0
          }
        }).catch(e => {
          console.log(e)
        })
      },
      // 增加编辑行
      insertrow () {
        let addrowObj ={
          username: '',
          userid: '',
          messagetype: '',
          endurl: '',
          backurl: '',
          urlcode: '',
          remark: '',
          id: '',
          pcname: '',
          parentid:'',
          rolename: '',
          roleid: '',
          orderid: '',
          detialurl: ''
        }
        let rowObj = {}
        console.log(this.updateDatas, 8080111)
        if (this.updateDatas && this.updateDatas.length !== 0) {
          rowObj = this.updateDatas[this.updateDatas.length - 1]
        }
        console.log(rowObj.id, 8008)
        addrowObj.parentid = rowObj.parentid
        this.updateDatas.push(addrowObj)
      },
      // 获取流程节点
      getworkorder (_param) {
        this.$api.jdwhxjwxgetXjType2({mjlxbm: _param}).then(res => {
          if (res.code != 1) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            this.pcnameArr = res.data
          }
        }).catch(e => {
          console.log(e)
        })
      },
      // 获取信息类型
      getTypeOfmessage (_param) {
        this.$api.jdwhxjwxgetXjType2({mjlxbm: _param}).then(res => {
          if (res.code != 1) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
             this.messagearr = res.data
          }
        }).catch(e => {
          console.log(e)
        })
      },
      // 编辑页面
      updatedetail (row) {
        console.log(row,1)
        this.pjparam = row.id
        this.getMenuByparentid(row.id)
      },
      // 获取用户名树结构数据
      selectFzr(row){
        console.log(typeof row,33)
        this.rowindex = row
        this.updateDatas[row].orderid = row+1
        let roworder = row+1
        if (roworder>8) {
          this.updateDatas[row].id = this.pjparam +roworder
        } else {
          this.updateDatas[row].id = this.pjparam + '0'+roworder
        }
        this.showSbfzr = true
        this.fullscreenLoading = true
        this.useinfo = config.userInfo
        // console.log(useinfo,3444)
        this.$api.getUserDept('?dwbm='+ this.useinfo.deptList[0].org.orgCode).then(resp=>{
          this.fullscreenLoading = false
          if (resp.status !== 200) {
            this.$message({
              message: '出错了',
              type: 'error'
            })
          } else {
            this.treeList1 = resp.data.data

            this.xz1.dwbm=this.useinfo.deptList[0].org.orgCode
            this.xz1.username=''
            this.xz1.bmbm=this.useinfo.deptList[0].deptCode
            this.searchSb1(1,10)
          }
        }).catch(e => {
          this.fullscreenLoading=false
        })
      },
      handleNodeClickxz1(data){
        this.xz1.bmbm=data.id
        this.searchSb1(1,10)
      },
      searchSb1 (currentPage, pageSize) {
        this.loading = true
        this.$api.selRyByDwAndBm('?pageNum=' + this.zcPage1 + '&pageSize=' + this.zcSize1 + '&' + $.param(this.xz1)).then(resp => {
          if (resp.status !== 200) {
            this.$message({
              message: '出错了',
              type: 'error'
            })
          } else {

            this.ysrList1 = resp.data.data.list
            this.zctotal1= resp.data.data.total
          }
        }).catch(e => {
        })
      },
      okBtn_fzr (){
        if(this.multipleXz1.length==0){
          this.$message({
            message: '请选择人员',
            type: 'error'
          })
        }else{
          // if(this.multipleXz1.length>1){
          //   this.$message({
          //     message: '只能选择一个设备负责人',
          //     type: 'error'
          //   })
          //   return
          // }
          let userarr = []
          let userIdarr = []
          for (var i = 0; i < this.multipleXz1.length; i++) {
            userarr.push(this.multipleXz1[i].userName)
            userIdarr.push(this.multipleXz1[i].userId)
          }
          console.log(this.multipleXz1, 344)
          this.updateDatas[this.rowindex].username = userarr.toString()
          this.updateDatas[this.rowindex].userid = userIdarr.toString()
          console.log(this.updateDatas[this.rowindex].username, 678)
          this.$refs.Table1.clearSelection()
          this.xz1.dwbm=this.useinfo.deptList[0].org.orgCode
          this.xz1.bmbm=''
          this.xz1.username=''
          this.showSbfzr=false
        }
      },
      clickRow1(row){
        //资产
        this.$refs.Table1.clearSelection()
        this.$refs.Table1.toggleRowSelection(row)
      },
      handleSelectionXz1(val){
        this.multipleXz1 = val
        console.log(this.multipleXz1, 'lastChristmas')
      },
      handlezcSizeChange1 (val) {
        this.zcSize1 = val
        this.searchSb1(this.zctPage, this.zcSize)
      },
      handlezcCurrentChange1 (val) {
        this.zcPage1 = val
        this.searchSb1(this.zcPage, this.zcSize)
      },
      returnBack(arg){
        if(arg == 'two'){
          this.showFirstPage = true
          this.showSecondPage = false
          this.showThirdPage = false
        }else{
          this.showFirstPage = false
          this.showSecondPage = true
          this.showThirdPage = false
        }

      },
      showDetail(row,type){
        if(type === 'detail'){
          this.showFirstPage = false
          this.showSecondPage = true
          this.showThirdPage = false
        }
      },
      getMenuByparentid (_param) {
        this.$api.getMenuByparentid({parentid: _param}).then(res => {
          if (res.code != 1) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            if (_param == 0) {
              this.initDatas = res.data
            } else {
              this.updateDatas = res.data
              if (this.updateDatas.length ===0) {
                this.isadd = 0
              } else {
                this.isadd = 1
              }
              this.isupdate = 1
            }

          }
        }).catch(e => {
          console.log(e)
        })
      },
      searchXM(){

      },
      resizeDate(){

      },
    },
    mounted () {
      this.getMenuByparentid(0)
      this.getTypeOfmessage('44')
      this.getworkorder('51')
    }
  }
</script>
<style lang="scss" scoped>
  #liucheng{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .inputwidth {
      width: 200px;
    }
    .headerTit{
      i{
        font-weight: bold;
        font-size: 16px;
        color: #111;
        cursor: pointer;
      }
    }
    .second_content{
      .second_top{
        padding: 5px 15px;
        display: flex;
        justify-content: space-between;
        .liuchengLeft{
          display: flex;
          align-items: center;
          .Itmes{
            margin-right: 10px;
            .icon-duigou, .icon-user{
              color: #2b47bd;
              font-size: 20px;
              margin-right: 5px;
            }
            .line{
              display: inline-block;
              vertical-align: middle;
              width:51px;
              height: 2px;
              background-color: #2b47bd;
            }
            .dateg{
              color:#999;
              .yj{
                color:#2b47bd;
                border-bottom: 1px solid;
                cursor: pointer;
              }
            }
          }
        }
        .liuchengRight{
          position: relative;
          width: 35%;
          margin-right: 20px;
          .xianzhi{
            position: absolute;
            top: 22px;
            right: 15px;
          }
          textarea{
            width: 100%;
            resize: none;
            padding-left: 5px;
          }
        }
      }
      .second_center{
        .eiconsty{
          padding-right: 10px;
          height: 16px;
          margin-top: 20px;
          margin-bottom: 20px;
          line-height: 16px;
          font-size: 12px;
        }
      }

    }
    .third_content{
      padding: 0 15px;
      .third_tit{
        display: flex;
        justify-content: space-between;
        padding:10px 15px;
        .hoverSt,.hoverSt i{
          font-size: 12px;
          color: #fff;
        }
        .hoverSt:hover,.hoverSt i:hover{
          color:red;
        }
      }
    }
    .conter_table{

      .searchLeft{
        display: flex;
        vertical-align: middle;
        /*margin-top: 10px;*/
        height: 40px;
        line-height: 40px;
        font-size: 13px;
        background: #f7f9fb;
        #selectColor,#selectColor2{
          color:red;
        }
        .currentState{
          display: inline-block;
          cursor: pointer;
          padding-right: 10px;
          color: #555;
          height: 19px;
          line-height: 19px;
          margin-right: 10px;
          border-right: 2px solid #999;
        }
        .currentState:last-child{
          border-right: 0 !important;
        }
        .htTypeList{
          padding-left: 100px;
        }
      }
    }
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

