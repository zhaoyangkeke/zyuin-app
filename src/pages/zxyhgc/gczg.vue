<template>
  <div id="liucheng" style="overflow-y: hidden">
    <div class="header">
      <span class="headerTit" v-if="isupdate === 0">工程转固</span>
      <div class="header_option" v-if="isupdate === 0">
        <ul>
          <li><i class="icon iconfont icon-edit_line" @click="updatedetail(0,'add')"> 添加</i></li>
          <li><i class="icon iconfont icon-delete" @click="deletemaintable"> 删除</i></li>
        </ul>
      </div>
      <div class="header_option" v-if="isupdate === 1">
        <ul>
          <li><i class="icon iconfont icon-edit_line" @click="addupdatedata" v-if="isadd"> 保存</i></li>
          <li><i class="icon iconfont icon-edit_line" @click="submitupdate" v-if="!isadd"> 保存</i></li>
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
      <p style="font-size: 12px;height: 18px"></p>
      <div  v-show="isupdate === 0">
        <el-table :data="initDatas" tooltip-effect="dark"
                  style="width: 100%;overflow:auto;"
                  height="500"
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
          <el-table-column align="left" prop="billno" label="单据编号" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="billmaker" label="制单人" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="scsj" label="时间" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="zt" label="状态" show-overflow-tooltip>
            <template scope="scope">
              <span v-if="scope.row.zt == '4001'">自由</span>
              <span v-if="scope.row.zt == '4002'">审批中</span>
              <span v-if="scope.row.zt == '4003'">已审批</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="操作" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              <span @click="updatedetail(scope.row,'update')" style="color:#00a2fd;cursor: pointer;text-align: center" >编辑</span>
              <span @click="updatedetail(scope.row,'submit')"  style="color:#00a2fd;cursor: pointer;text-align: center" >提交</span>
              <span @click="updatedetail(scope.row,'detail')" style="color:#00a2fd;cursor: pointer;text-align: center" >详情</span>
            </template>
          </el-table-column>
        </el-table>
        <footer class="footer" >
          <div style="float: right;padding: 6px">
            <el-pagination
              @current-change="handleCurrentChange"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </footer>
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
              <el-input v-model="scope.row.equip_name" v-show="item == 'equip_name' && !issee" size="mini" class="inputwidth"></el-input>
              <el-input v-model="scope.row.quantity" v-show="item == 'quantity' && !issee" size="mini" class="inputwidth"></el-input>
              <el-input v-model="scope.row.purc_price_tax" v-show="item == 'purc_price_tax' && !issee" size="mini" class="inputwidth"></el-input>
              <span v-show="item == 'equip_name' && issee">{{scope.row.equip_name}}</span>
              <span v-show="item == 'quantity' && issee">{{scope.row.quantity}}</span>
              <span v-show="item == 'purc_price_tax' && issee">{{scope.row.purc_price_tax}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        isadd: false,
        issee: false,
        total: 0,
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
        maintableLabs: {billno: '单据编号',billmaker: '制单人',scsj: '时间',zt: '状态'},
        updateLabs: {equip_name: '资产名称',purc_price_tax : '含税价格(元)', quantity: '数量'},
        showFirstPage:true,
        showSecondPage:false,
        showThirdPage:false,
        selectForm:{
          tjsj:'',
          ywmk:'',
        },
        useinfo: {},
        rowObj: {},
        initDatas:[],
        lmshForm: {},
        deleteindex: [],
        rowindex: null,
        pjparam: '',
        isadd: 0,
        searchForm: {
          orgpk: config.userInfo.orgid,
          xmbh: undefined,
          pageNum: 1,
          pageSize: 10
        }
      }
    },

    methods: {
      // 分页展示数据
      handleCurrentChange (val) {
        this.searchForm.pageNum = val
        this.inittableData()
      },
      rowmainchange (val) {
        console.log(val, 688)
        let idarr = []
        for (var i = 0; i < val.length; i++) {
          idarr.push(val[i].id)
        }
        this.deleterowarr= idarr
      },
      submitdata () {
        let leng = this.initDatas.length
        this.addForm.id = leng + 1
        this.addForm.orderid = leng + 1
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
            this.getMenuByparentid(0)
          }
        }).catch(e => {
          console.log(e)
        })
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
          this.updateDatas= this.updateDatas.filter(item => !this.deleteindex.some(ele=>ele===item.idparams));
        }
      },
      handlechange (val) {
        console.log(val,343)
        let indexarr = []
        for (var i = 0; i < val.length; i++) {
          indexarr.push(val[i].idparams)
        }
        console.log(indexarr);
        this.deleteindex = indexarr
      },
      // 保存表格
      addupdatedata () {
        let paramObj = {}
        let sjc =  Math.round(new Date().getTime()/1000).toString()
        let randomId = this.uuid()
        paramObj.billno = 'GCZG' + sjc
        paramObj.id = randomId
        if (config.userInfo) {
          paramObj.billmakerid = config.userInfo.userId
          paramObj.billmaker = config.userInfo.userName
          paramObj.orgpk = config.userInfo.orgid
        }
        if (this.updateDatas && this.updateDatas.length !==0) {
          for (var i =0; i < this.updateDatas.length; i++){
            this.updateDatas[i].mid = randomId
          }
        }
        paramObj.aggvo_mxes = this.updateDatas
        this.$api.addAggvo(JSON.parse(JSON.stringify(paramObj))).then(res => {
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
            this.inittableData()
            this.isupdate = 0
          }
        }).catch(e => {
          console.log(e)
        })
      },
      uuid(){
        let str = (((1+Math.random())*0x10000)|0).toString(16).substring(1)
        return (str+str+"-"+str+"-"+str+"-"+str+"-"+str+str+str+str);
      },
      // 编辑子表数据
      submitupdate () {
        this.rowObj.aggvo_mxes = this.updateDatas
        if(this.updateDatas.length !== 0) {
          for (var i =0; i < this.updateDatas.length; i++) {
            this.updateDatas[i].mid = this.rowObj.id
          }
        }
        this.$api.updateAggvo(JSON.parse(JSON.stringify(this.rowObj))).then(res => {
          if (res.code != 1) {
            this.$message({
              message: '编辑失败',
              type: 'error'
            })
          } else {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.isupdate = 0
          }
        }).catch(e => {
          console.log(e)
        })
      },
      // 删除主表数据
      deletemaintable () {
        let arr = ''
        this.deleterowarr.forEach(item =>{

          arr += item + ','
        })
        let obj = {
          ids:arr
        }
        this.$api.deleteAggvo111(obj).then(res => {
          if(res.code !=1) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.inittableData()
          }
        }).catch(e => {
          console.log(e)
        })
      },
      // 查询主列表
      inittableData () {
        let {orgpk, xmbh, pageNum	, pageSize} = this.searchForm
        this.$api.getAggvo({orgpk, xmbm:xmbh, pageNum	, pageSize}).then(res => {
          if (res.code != 1) {
            this.message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            this.initDatas = res.data.list && res.data.list.length !== 0 ? res.data.list : []
            this.total = res.data.total
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
      // 删除行的唯一表示
      deletId () {
        return Math.ceil(Math.random()*10)
      },
      // 增加编辑行
      insertrow () {
        let idparam = this.deletId()
        let addrowObj ={
          equip_name: '',
          purc_price_tax: '',
          quantity: '',
          idparams: idparam
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
      // 编辑页面
      updatedetail (row,type) {
        if (type == 'add') {
          this.updateDatas = []
          this.isupdate = 1
          this.isadd = true
          this.issee = false
        } else if (type == 'update') {
          this.isadd = false
          this.issee = false
          console.log(row,333)
          if (row) {
            this.rowObj = row
            this.getzbData (row.id)
          }
          this.isupdate = 1
        } else if (type == 'detail') {
          this.issee = true
          if (row) {
            this.getzbData (row.id)
          }
        } else if (type == 'submit') {
          if (row) {
            this.updatestatus (row)
          }
        }
      },
      // 修改状态
      updatestatus (row) {
        let _id = row.id
        let _zt = '4002'
        this.$api.updateAggvozt({id: _id,zt: _zt}).then(res => {
          if (res.code != 1) {
            this.$message({
              message: '网络错误',
              type: 'error'
            })
          } else {
            this.$message({
              message: '提交成功',
              type: 'error'
            })
            this.inittableData()
          }
        }).catch(e => {
          console.log(e)
        })
      },
      getzbData (_param) {
        this.$api.getAggvomxByMid({mid: _param}).then(res => {
          if (res.code != 1) {
            this.$message({
              message: '网络错误',
              type: 'error'
            })
          } else {
            this.updateDatas = res.data && res.data.length !== 0 ? res.data : []
            if (this.updateDatas && this.updateDatas.length !== 0) {
              for (var i = 0; i < this.updateDatas.length; i++) {
                this.updateDatas[i].idparams = this.deletId()
              }
            }
            this.isupdate = 1
          }
        }).catch(e => {
          console.log(e)
        })
      }
    },
    mounted () {
      console.log(config.userInfo, 90)
      this.inittableData()

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

