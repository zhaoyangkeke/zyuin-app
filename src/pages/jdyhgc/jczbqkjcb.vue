/**
* ----进场准备情况检查表
*/
<template>
  <div id="kgsqd" style="height: 100%"  v-loading="loading">
    <div class="header" v-if="!showDetail&&!showAdd&&!showEdit">
      <span class="headerTit">进场准备情况检查表</span>
      <div class="header_option">
        <ul>
          <!--<li><i class="icon iconfont icon-edit1"> 编辑</i></li>-->
          <!--<li><i class="icon iconfont icon-export"> 导出</i></li>-->
          <li @click="showDialog('add')"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="addContent(false)"><i class="el-icon-delete"> 删除</i></li>
        </ul>

      </div>
    </div>
    <!--查询弹框区域-->
    <div class="conter_table" v-if="!showDetail&&!showAdd&&!showEdit">
      <!--查询信息-->
      <div class="chaxun">
        <el-form  :inline="true"  style="display: inline-block;" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="项目名称" prop="htbh">
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="searchForm.htmc"
                :fetch-suggestions="querySearchMC"
                @select="handleSelectMC"
                placeholder="请输入项目名称"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.XMMC }}</div>
                </template>
                <i slot="suffix" @click="showDialog('mc')" class="icon iconfont icon-xiangqing1"></i>
              </el-autocomplete>
            </el-form-item>
            <el-form-item class="" label="日期" prop="htbh">
              <el-date-picker
                size="mini"
                v-model="searchForm.selectDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-form-item>

          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button @click="searchYDJH" size="mini"  style="background-color: #DF4D4A;border-color:transparent;color: #fff">查询</el-button>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button @click.native="resizeSearch" size="mini">重置</el-button>
          </el-form-item>

        </el-form>
      </div>
      <el-table :data="YDJHData" tooltip-effect="dark"
                style="width: calc(100% - 19px);"
                row-class-name="row_class"
                @selection-change="selectionChange"
                border>
        <el-table-column
          type="selection"
          align="center"
          :selectable='selectable2'
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column align="left" sortable v-for="(tit,titIndex) in tableTits" :prop="titIndex" :label="tit" :key="titIndex"  show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="100">
          <template scope="scope">
            <span   v-if="scope.row.state !=1" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="updateFormDia('detail',scope.row)">详情</span>
            <span   v-if="scope.row.state !=1" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="updateFormDia('edit',scope.row)">编辑</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--添加-->
    <div class="tabArea" v-if="showAdd">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild" @click="addReturn(true)"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span >返回</span>
        </p>
        <div style="position:absolute;right: 10px;top: 10px;">
          <el-button size="mini" style="background: #DF4D4A;border-color:transparent;color: #fff;" class="dialog-button bao_cun" @click.native="saveAdd">保存</el-button>
          <el-button size="mini"  @click="showAddItem?showAddItem = false:showAdd=false">取消</el-button>
        </div>
      </div>
      <div class="topAdd" v-show="!showAddItem">
         <el-table  :data="addData" tooltip-effect="dark"
                   height="300"
                   style="width: calc(100% - 26px);margin:20px auto;overflow-y: auto"
                   border>
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column align="left" label="工程名称"   show-overflow-tooltip>
            <template slot-scope="{row,$index}">
              <span>{{row.gcxm}}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="考核内容">
            <template slot-scope="{row,$index}">
              <p style="text-align: left;">
                {{row.khnr}}
              </p>
            </template>
          </el-table-column>
          <el-table-column align="left" label="工程考核情况">
            <template slot-scope="scope">
              <div  class="itemS">
                <input  style="border: 1px solid rgb(169, 169, 169);" v-model="addData[scope.$index].khqk">

              </div>
            </template>
          </el-table-column>
          <el-table-column align="center"  label="罚金(元)"   show-overflow-tooltip>
            <template slot-scope="scope">
              <input style="padding-left: 16px;" v-model="addData[scope.$index].fj">
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="bottomAdd" v-show="showAddItem">
     <!--   <div style="position:relative;" v-show="showAddItem">
          <p class="tabAreaTit">
            <span class="titleclasschild" @click="showAddItem=false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
            <span >进场准备情况检查表</span>
          </p>
        </div>-->
        <div style="font-size: 0;">
          <p class="addJLD"><span class="addJLD_tit">项目编号 ：</span><el-input size="mini" :disabled="true" v-model="khbModel.htbh" placeholder="自动编号"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">项目名称 ：</span><el-input size="mini" :disabled="true" v-model="khbModel.htmc" placeholder="请输入内容"></el-input></p>
          <p class="addJLD">
            <span class="addJLD_tit">检测日期 ：</span>
            <el-date-picker
            v-model="khbModel.jcrq"
            type="date"
            size="mini"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
          </p>
          <p class="addJLD"><span class="addJLD_tit">施工单位 ：</span><el-input size="mini" :disabled="true" v-model="khbModel.sgdw" placeholder="请输入内容"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">检查人 ：</span><el-input size="mini"  :disabled="true" v-model="khbModel.jcr" placeholder="请输入内容"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">合同金额(万元) ：</span><el-input  :disabled="true"  size="mini" v-model="khbModel.htje" placeholder="请输入内容"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">违约罚金合计 ：</span><el-input size="mini"  :disabled="true" v-model="khbModel.fj" placeholder="请输入内容"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">备注 ：</span><el-input size="mini" v-model="khbModel.bz" placeholder="请输入内容"></el-input></p>
          <p style="font-size: 13px">
            <el-upload
              class="uploadFiles"
              :action="$api.uploadFiles"
              multiple
              :limit="3"
              :on-change="handleChange">
              <span>附件:</span>
              <el-button size="small" type="primary">上传附件</el-button>
            </el-upload>
          </p>
        </div>
      </div>

    </div>
    <!--编辑-->
    <div class="tabArea" v-if="showEdit">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild" @click="addReturn(false)"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span >返回</span>
        </p>
        <div style="position:absolute;right: 10px;top: 10px;">
          <el-button size="mini" style="background: #DF4D4A;border-color:transparent;color: #fff;" class="dialog-button bao_cun" @click.native="saveEdit">保存</el-button>
          <el-button size="mini" @click="showAddItem?showAddItem = false:showEdit=false">取消</el-button>
        </div>
      </div>
      <div class="topAdd" v-show="!showAddItem">
        <el-table  :data="editData" tooltip-effect="dark"
                   style="width: calc(100% - 26px);margin:20px auto;max-height: 300px;overflow-y: auto"
                   border>
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column align="left" prop="gcmc" label="工程名称"   show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="jcnr" label="考核内容"></el-table-column>
          <el-table-column align="left" prop="jcqk" label="工程考核情况">
            <template slot-scope="scope">
              <div  class="itemS">
                <input style="padding-left: 16px;" v-model="editData[scope.$index].jcqk" />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="fj"  label="金额(元)"   show-overflow-tooltip>
            <template slot-scope="scope">
              <div  class="itemS">
                <input style="padding-left: 16px;" v-model="editData[scope.$index].fj"/>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="bottomAdd" v-show="showAddItem">
        <div v-show="showAddItem" style="font-size: 0">
          <p class="addJLD"><span class="addJLD_tit">项目编号 ：</span><el-input size="mini" :disabled="true"   v-model="editzynr.htbh" placeholder="自动编号"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">项目名称 ：</span><el-input size="mini":disabled="true"   v-model="editzynr.htmc" placeholder="请输入内容"></el-input></p>
          <p class="addJLD">
            <span class="addJLD_tit">检测日期 ：</span>
          <el-date-picker
            v-model="editzynr.jcrq"
            type="date"
            size="mini"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
          </p>
          <p class="addJLD"><span class="addJLD_tit">施工单位 ：</span><el-input size="mini":disabled="true"     v-model="editzynr.sgdw" placeholder="请输入内容"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">检查人 ：</span><el-input size="mini" :disabled="true"   v-model="editzynr.jcr" placeholder="请输入内容"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">合同金额(万元) ：</span><el-input size="mini":disabled="true"   v-model="editzynr.htje" placeholder="请输入内容"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">违约罚金合计 ：</span><el-input size="mini":disabled="true"   v-model="editzynr.fj" placeholder="请输入内容"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">备注 ：</span><el-input size="mini" v-model="editzynr.bz" placeholder="请输入内容"></el-input></p>
          <p style="font-size: 13px">
            <el-upload
              class="uploadFiles"
              :action="$api.uploadFiles"
              multiple
              :limit="3"
              :on-change="handleChange">
              <span>附件:</span>
              <el-button size="mini" type="primary">上传附件</el-button>
            </el-upload>
          </p>
        </div>
      </div>

    </div>

    <footer class="footer" v-if="!showDetail&&!showAdd&&!showEdit">
      <div style="float: right;padding: 6px">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </footer>
    <!--添加新增的弹窗-->
    <div class="tabArea" v-show="showDetail">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild"  @click="promiseTG('close')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>{{detailName}}</span>
        </p>
      </div>
      <!--详情-->

      <el-table  :data="currentMonthData" tooltip-effect="dark"
                 style="width: calc(100% - 26px);margin: auto;"
                 row-class-name="row_class"
                 border>
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column align="left"   prop="gcmc" label="工程名称"  style="white-space: normal"  show-overflow-tooltip></el-table-column>
        <el-table-column align="left"   prop="jcnr" label="考核内容" style="white-space: normal"  show-overflow-tooltip>  </el-table-column>
        <el-table-column align="left"   prop="jcqk" label="工程考核情况"   show-overflow-tooltip></el-table-column>
        <el-table-column align="left"   prop="fj" label="罚金(元)"   show-overflow-tooltip></el-table-column>
      </el-table>
      <div style="padding-left: 20px;margin-top: 20px">
        <span style="display: inline-block;margin-right: 20px;">考核人：{{khr}}</span>
        <span>考核日期：{{khrq}}</span>
      </div>
    </div>
    <Dialog :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :dialogVisible="dialogVisible"
            @searchXMMC="searchXMMC"
            @selectAddDialog="selectAddDialog"
            @closeDialog="closeDialog">
    </Dialog>
  </div>
</template>

<script>
  import Dialog from '@/components/Dialog.vue'
  export default {
    components: {Dialog},
    data () {
      return {
        uuidsID:'',
        fildDatas:[],
        dialogData:[ ],
        dialogTableTit:{
          XMMC:'项目名称',XMBH:'项目编号',
        },
        datatypes:'',
        dialogVisible:false,
        restaurants:[ ],
        //me
        loading: false,
        khr:'',
        showEdit:false,
        khrq:'',
        aa:'哈哈哈哈',
        delIds:[],
        showAddItem:false,
        fileList4: [],
        input:'',
        khbModel:{
          khqkModel:'',
          khnrModel:'',
          khrModel:'',
          khrqModel:'',
          htbh:'',
          htmc:'',
          jcrq:'',
          sgdw:'',
          jcr:'',
          htje:'',
          fj:'',
          bz:'',
        },
        searchInputVal:'',
        tableTits:{htbh:'项目编号',jcrq:'检查日期',htmc:'项目名称',sgdw:'施工单位',
          gldw:'管理单位',tbr:'检查人',htje:'合同金额',wyfj:'违约金合计',bz:'备注'},
        currentMonthData:[],
        addData:[],
        editData:[],
        editzynr:{},
        FinsdetailTit:{gcmc:'工程名称',jcnr:'考核内容',jcqk:'工程考核情况',fj:'罚金(元)'},
        total:0,
        state:['','编制中','工程技术部审核','经营发展部审核','公司分管领导审核','公司领导审批','审批完成'],
        showFirstItemWindow:false,
        firstItemTit:'G15沈海高速公路温州段详情',
        showAdd:false,
        searchForm:{
          htmc:undefined,
          selectDate:null,
          pageNum:1,
          pageSize:10
        },

        YDJHData:[],
        detailItemInfo:[],//本月完成情况详情数据
        showDetail:false,
        spanArr:[],
        detailName:'',
        userInfo:{
          orgbh:undefined,
          orgid:undefined,
          orgmc:undefined,
          bmbh:undefined,
          bmid:undefined,
          bmmc:undefined,
          yhbm:undefined,
          yhid:undefined,
          yhmc:undefined,
        },
      }
    },
    methods: {
      addReturn(bol){
        if( this.showAddItem){
          this.showAddItem = false
        }else{
          if(bol){
            this.showAdd = false
            this.showAddItem = false
          }else{
            this.showEdit = false
            this.showAddItem = false
          }

        }


      },
      initUser(){
        let userInfo = JSON.parse(localStorage.getItem('userMsg'))[0]
        if(userInfo){

          if(userInfo){
            this.userInfo.yhbm = userInfo.userCode
            this.userInfo.yhid = userInfo.userId
            this.userInfo.yhmc = userInfo.userName
            let deptList = userInfo.deptList
            let bminfo = deptList[0]

            if(bminfo){
              this.userInfo.bmbh = bminfo.deptCode
              this.userInfo.bmid = bminfo.deptId
              this.userInfo.bmmc = bminfo.deptName
              let org = bminfo.org
              if(org){
                this.userInfo.orgbh = org.orgCode
                this.userInfo.orgid = org.orgId
                this.userInfo.orgmc = org.orgName
              }
            }
          }

        }
      },
      searchXMMC(val){
        this.$api.getXmmcListt({xmmc:val}).then(res=>{
          if(res.code == 1){
            this.dialogData = res.data&&res.data.length?res.data:[]
          }else{
            this.dialogData = []
          }
        })
      },

      initqueryXMMC(){
        this.$api.getmcbhList().then(res=>{
          if(res.code == 1){
            this.restaurants = res.data&&res.data.length?res.data:[]
          }else{
            this.restaurants = []
          }
        })
      },
      querySearchMC(queryString, cb) {
        let  restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString,'XMMC')) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString,val) {
        return (restaurant) => {

          return (restaurant[val].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      selectAddDialog(val){
        this.dialogVisible = false
        this.khbModel.jcr = this.userInfo.yhmc;

        if(val.constructor === Object){
          this.selectAddXMMC = val
          this.khbModel.htbh = val.XMBH
          this.khbModel.htmc = val.XMMC
          this.showAdd = true
          this.$api.getXmgklyzljcByhtbh({htbh:val.XMBH}).then(res=>{
            if(res.code == 1){

              this.addData = res.data
            }
          })
        }
      },
      showDialog(bol){
        this.dialogVisible = true
        this.datatypes = bol
        this.$api.getmcbhList().then(res=>{
          if(res.code == 1){
            this.dialogData = res.data&&res.data.length?res.data:[]
          }else{
            this.dialogData = []
          }
        })
      },
      closeDialog(val){
        this.dialogVisible = false
        if(val){
          this.searchForm.htmc = val.XMMC
          this.searchForm.xmbh = val.XMBH
        }
      },
      handleSelectMC(item){
        //getXmmcList
        this.searchForm.htmc = item.XMMC
        this.searchForm.xmbh = item.XMBH
      },
      selectionChange(selection){
        this.delIds = selection
      },
      saveAdd(){
        let {showAddItem} = this
        if(!showAddItem){//添加第一次

          let num = 0
          this.addData.forEach(item =>{
            num += Number(item.fj)?Number(item.fj):0
          })
          this.khbModel.fj =  num?num:0;
          let myDate = new Date()
          this.khbModel.jcrq = myDate.getFullYear()+'-'+ (myDate.getMonth()+1) + '-' +myDate.getDate()
          this.khbModel.yd = myDate.getFullYear()+'-'+ (myDate.getMonth()+1)
          this.$api.getOnlyXmgkjcxx({xmbh:this.khbModel.htbh}).then(res=>{
            if(res.code == 1){
              this.khbModel.sgdw = res.data[0].cbdw
              this.khbModel.htje = res.data[0].htje
            }
          })
          this.showAddItem = true
        }else{

          let {
            htbh, htmc, jcrq, sgdw, jcr, htje, fj, bz
          } = this.khbModel
          let arr = []
          let randomId = 'JCZB'+ Math.ceil(Math.random()*100000000)
          this.addData.forEach(item=>{
            if(item.fj||item.khqk){
              arr.push({
                bh:'',
                fj: item.fj?Number(item.fj):0,
                id: '',
                jcnr:item.khnr,
                gcmc:item.gcxm?item.gcxm:'',
                jcqk:item.khqk?item.khqk:'',//后台没有传递过来
                memo: '',
                mid: randomId})
            }
          })
          let self = this
          let params = {
            bmbh:'',
            bmid: '',
            bmmc: '',
            bz:bz,
            dwbh: '',
            dwid:'',
            dwmc:'',
            gldw:self.userInfo.orgmc,
            htbh: htbh,
            htje: htje?Number(htje):0,
            htmc:htmc,
            id:randomId,
            jcr:jcr?jcr:'',
            jcrq:jcrq,
            jczbmxb:arr,
            sgdw:sgdw,
            spzt:'',
            tbr: jcr?jcr:'',
            tbrid: '',
            tbrq: '',
            wfid:'',
            wyfj:fj?Number(fj):0,
            xmmc:htmc,
            ...self.userInfo
          }

          this.$api.jdaddJczb(params).then(res=>{
            if(res.code == 1){
              this.$message({
                message: '添加信息成功！',
                type: 'success'
              });
              this.showAddItem = false
              this.showAdd = false
              this.queryYDJHData()
            }

          })

        }
      },
      saveEdit(){
        let self = this
        if(!this.showAddItem){
          this.showAddItem = true
          let num = 0
          this.editData.forEach(item =>{
            num += Number(item.fj)?Number(item.fj):0
          })
          this.editzynr.fj = num?num:0
        }else{

          let {bz,fj,htbh,htje,htmc,jcr,jcrq,sgdw,id} = this.editzynr
          let editParams = {
            bmbh: undefined,
            bmid: undefined,
            bmmc:undefined,
            bz: bz,
            dwbh:undefined,
            dwid:undefined,
            dwmc: undefined,
            gldw:undefined,
            htbh: htbh,
            htje: htje,
            htmc: htmc,
            id:id,
            jcr: jcr,
            jcrq: jcrq,
            jczbmxb:self.editData,
            sgdw: sgdw,
            spzt: undefined,
            tbr: undefined,
            tbrid: undefined,
            tbrq: undefined,
            wfid: undefined,
            wyfj: fj,
            xmmc:htmc
          }
          this.$api.jdupdateJczb(editParams).then(res=>{
            if(res.code == 1){
              this.$message({
                message: '更新信息成功!',
                type: 'success'
              });
              this.showAddItem = false
              this.showEdit = false
            }
          })
        }
      },
      handleChange(file, fileList){


      },
      getSpanArr(data) {
        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            this.spanArr.push(1);
            this.pos = 0
          } else {
            // 判断当前元素与上一个元素是否相同
            if (data[i].name === data[i - 1].name) {
              this.spanArr[this.pos] += 1;
              this.spanArr.push(0);
            } else {
              this.spanArr.push(1);
              this.pos = i;
            }
          }
        }
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }){
        if (columnIndex === 2) {
          const _row = this.spanArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;

          return {
            rowspan: _row,
            colspan: _col
          }

        }
      },
      selectable2:function(row, index){   //禁用第四个
        return true
        // if(row.canDel == 1){
        //   return true
        // }else{
        //   return false
        // }
      },
      resizeSearch(){
        this.searchForm.sjdh = undefined
        this.searchForm.htmc = undefined
        this.searchForm.xmbh = undefined
        this.searchForm.lxmc = undefined
        this.searchForm.selectDate = undefined
        this.searchForm.pageNum = 1
      },
      addContent(bol){
        if(bol){
          this.showAdd = true
          this.showDetail = false
          this.$api.getXmgkyhxc({pageNum:1,pageSize:100}).then(res=>{
            if(res.code == 1){
              this.addData = res.data.list
            }
          })
        }else{//删除
          this.$confirm('此操作将永久删除该文件, 是否继续?',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            let arr = ''
            this.delIds.forEach(item =>{

              arr += item.id+','
            })
            let obj = {
              ids:arr
            }
            if(this.delIds.length){
              this.$api.jddeleteJczb(obj).then(res=>{
                if(res.code == 1){
                  this.$message({
                    message: '删除信息成功！',
                    type: 'success'
                  });
                  this.queryYDJHData()
                }

              })
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });



        }

      },
      //操作通过打回等按钮
      promiseTG(bol){
        // 详情查看
        this.showDetail = false
        this.showFirstItemWindow = false
      },
      // 编辑 详情
      updateFormDia (info,row) {
        if(info == 'detail'){
          this.showDetail = !this.showDetail
          this.detailName  = row.xmmc
          this.currentMonthData = [ ]
          this.khr = row.jcr
          this.khrq = row.jcrq
          this.currentMonthData = row.jczbmxb
          // this.$api.jdgetJczbmxById({id:row.id}).then(res=>{
          //   if(res.code == 1){
          //     let arr = res.data
          //     arr.map(item =>{
          //       this.currentMonthData.push(Object.assign({},item))
          //     })
          //   }
          // })

        }else if(info == 'edit'){
          this.showEdit = true
          //再次查询一遍ID

          this.editzynr ={
            htbh:row.htbh,
            htmc:row.htmc,
            jcrq:row.jcrq,
            sgdw:row.sgdw,
            jcr:row.jcr,
            htje:row.htje,
            fj:row.wyfj,
            bz:row.bz,
            id:row.id
          }
          this.editData = row.jczbmxb
    /*      this.$api.zxgetJczbmxById({id:row.id}).then(res=>{
            if(res.code == 1){
              let arr = res.data
              arr.forEach(item=>{
                item.xmmc = row.sgdw
                this.editData.push(item)
              })
            }
          })*/


        }


      },
      //分页展示数据
      handleCurrentChange (val) {
        this.searchForm.pageNum = val
        this.queryYDJHData()
      },
      //月度计划初始化查询
      searchYDJH(){
        this.searchForm.pageNum = 1
        this.queryYDJHData()
      },
      //初始化列表数据
      queryYDJHData(){
        let {htmc,selectDate,pageNum,pageSize,xmbh} = this.searchForm;
        let ksrq,jsrq;
        if(selectDate&&selectDate.length){
          ksrq = selectDate[0]
          jsrq = selectDate[1]
        }
        this.loading = true
        let self = this
        this.$api.jdgetJczbAll({
          htbh:xmbh?xmbh.trim():undefined, ksrq, jsrq,
          pageNum,pageSize,yhid:self.userInfo.yhid,bmid:self.userInfo.bmid,orgid:self.userInfo.orgid
        }).then(res=>{
          this.loading = false
          if(res.code == 1){
            this.YDJHData = res.data.list
            this.total = res.data.total
          }
        }).catch(err=>{
          this.loading = false
        })
      },
    },
    mounted () {
      this.initUser()
      this.initqueryXMMC()
      this.queryYDJHData()

    }
  }
</script>

<style lang="scss">
  .topAdd{

    .goReturn{
      font-size: 14px;
      color: #32353c;
      margin-bottom: 24px;
      cursor: pointer;
    }
    .itemS{
      input{
        width: 100%;
        height: 36px;
        border: 0;
      }
    }
  }
  .bottomAdd{
    position: relative;
    /*border-top: 1px solid #dfe1e4;*/
    /*margin-top: 20px;*/
    /*padding-left: 24px;*/
    .addItem{
      display: inline-block;
      vertical-align: middle;
      width: 23%;
      margin-bottom: 20px;
      .el-input{
        width: calc(100% - 60px);
        display: inline-block;
        vertical-align: middle;
      }
    }
    .uploadFiles{
      .el-upload-list{
        .el-upload-list__item{
          width: 30%;
        }
      }
    }

  }
  .searchInputVal input{
    height: 30px;
  }

  .goDetail{
    margin-top: 20px;
    margin-bottom: 20px;
    i{
      color: #1f262e;
      margin-right: 10px;
    }
  }
  .buttons>span{
    cursor: pointer;
  }
  .windowAramFirst{
    position: absolute;
    top:0;
    width: calc(100% - 19px);
    height: 100%;
    z-index:999;
    margin: auto;
    background: #fff;
    padding-bottom:30px;
    /*border-top: 1px solid #dfe1e4;*/
    .detailItem_tit{
      border-left: 2px solid #409eff;
      padding-left: 10px;
      height:16px;
      line-height: 16px;
      margin-bottom: 20px;
    }
  }
  .detailItem_tit{
    border-left: 2px solid #409eff;
    padding-left: 10px;
    height:16px;
    margin-top: 20px;
    margin-bottom: 20px;
    line-height: 16px;
  }

  #kgsqd{
    /*padding: 10px 15px 0 15px;*/
    position: relative;
    font-size: 12px;
    height: 100%;
    overflow: auto;

    .conter_table{
      height: calc(100% - 91px);
      min-height: 300px;
      padding: 0 15px;
    }
    .footer{
      height: 45px;
      background: #fff;
      position: relative;
      z-index: 100;
    }
  }
</style>
