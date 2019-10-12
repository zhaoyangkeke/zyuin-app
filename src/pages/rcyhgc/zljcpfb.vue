/**
* ----质量检查评分表
*/
<template>
  <div id="kgsqd" style="height: 100%" v-loading="loading">
    <div class="header" v-if="!showDetail&&!showAdd">
      <span class="headerTit">质量检查评分表</span>
      <div class="header_option">
        <ul>
          <!--<li><i class="icon iconfont icon-edit1"> 编辑</i></li>-->
          <!--<li><i class="icon iconfont icon-export"> 导出</i></li>-->
          <li @click="isAddShow"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="addContent(false)"><i class="el-icon-delete"> 删除</i></li>
        </ul>

      </div>
    </div>
    <!--查询弹框区域-->
    <div class="conter_table" v-if="!showAdd&&!showDetail">
      <!--查询信息-->
      <div class="chaxun" v-if="!showDetail">
        <el-form  :inline="true"  style="display: inline-block;" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="项目名称">
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
            <el-form-item style="margin-bottom: 0px" label="状态" prop="" class="">
              <el-select size="mini"  class="" placeholder="请选择状态" v-model="searchForm.spzt">
                <!--<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>-->
                <el-option label="未处理" value="1001"> </el-option>
                <el-option label="不处理" value="1002"> </el-option>
                <el-option label="已下发" value="1003"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="" label="日期选择">
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
          align="center"
          label="序号"
          width="60">
        </el-table-column>

        <el-table-column align="left" sortable v-for="(tit,titIndex) in tableTits" :prop="titIndex?titIndex:''" :label="tit" :key="titIndex"  show-overflow-tooltip> </el-table-column>
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
      <div style="position:relative;" >
        <p class="tabAreaTit">
          <span class="titleclasschild" @click="addReturn(true)"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span >返回</span>
        </p>
        <div style="position:absolute;right: 10px;top: 10px;">
          <el-button size="mini"  v-if="showxq" class="minibtn" @click.native="saveAdd"
                     style="background: #DF4D4A;border-color:transparent;color: #fff;">保存</el-button>
          <el-button v-if="!showxq" size="mini" class="minibtn" @click.native="saveEdit"
                     style="background: #DF4D4A;border-color:transparent;color: #fff;">保存</el-button>
          <el-button size="mini" @click.native="showAdd = false">取消</el-button>
        </div>
      </div>
      <div style="font-size: 0">
        <p class="addJLD"><span class="addJLD_tit">项目名称 ：</span>
          <el-autocomplete
            class="inline-input"
            size="mini"
            v-model="khbModel.lhyhgcmc"
            :fetch-suggestions="querySearchMC"
            @select="addSelectMC"
            placeholder="请输入项目名称"
          >
            <template slot-scope="{ item }">
              <div class="name">{{ item.XMMC }}</div>
            </template>
            <i slot="suffix" @click="showDialog('add')" class="icon iconfont icon-xiangqing1"></i>
          </el-autocomplete>
        </p>
        <p class="addJLD">
          <span class="addJLD_tit">编制日期 ：</span>
          <el-date-picker
            v-model="khbModel.lhyhkhrq"
            @change="changeBZRQ(true)"
            type="date"
            size="mini"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </p>
        <p class="addJLD"> <span class="addJLD_tit">施工单位 ：</span><el-input size="mini" v-model="khbModel.lhyhsgdw" placeholder="请输入内容" disabled> </el-input></p>
        <p class="addJLD"> <span class="addJLD_tit">检查人 ：</span><el-input size="mini"  :disabled="true" v-model="khbModel.jcr" placeholder="请输入内容"> </el-input></p>
        <p class="addJLD"> <span class="addJLD_tit">总分 ：</span>
          <el-input size="mini" :disabled="true"  v-model="khbModel.lhyhfzzj" placeholder="请输入内容"></el-input>
        </p>

        <p class="addJLD"> <span class="addJLD_tit">月度 ：</span>
          <el-date-picker
            :disabled="true"
            v-model="khbModel.lhyhyd"
            type="date"
            size="mini"
            placeholder="选择日期"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM">
          </el-date-picker>
        <p class="addJLD"> <span class="addJLD_tit">备注 ：</span><el-input size="mini" v-model="khbModel.bz" placeholder="请输入内容"> </el-input></p>
        <p style="font-size: 13px;">
          <el-upload
            class="uploadFiles"
            action="111"
            :on-remove="handleRemove"
            :http-request="handHttpRequest"
            :file-list="fildDatas"
            multiple
            :limit="3">
            <span>附件:</span>
            <el-button size="small" type="primary">上传附件</el-button>
          </el-upload>
        </p>
      </div>
      <div class="topAdd" style="height: calc(100% - 260px )">
        <el-table  :data="addData" tooltip-effect="dark"
                   height="100%"
                   style="width: calc(100% - 26px);margin:20px auto;"
                   border>
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="50">
          </el-table-column>
          <el-table-column align="left" prop="lhyhnrjyq" label="检查内容及要求"> </el-table-column>
          <el-table-column align="left" prop="lhyhpfbf" label="评分办法"> </el-table-column>
          <el-table-column align="left" label="扣分" width="100">
            <template slot-scope="{row}">
              <el-input  @keyup.native="changeFj" type="number" size="mini" style="width: 95%" v-model.number="row.lhyhdffz"></el-input>
            </template>
          </el-table-column>

          <el-table-column align="left" width="160"  label="扣分原因" >
            <template slot-scope="{row}">
              <el-input style="width:83%" size="mini" v-model="row.lhyhkfyy"></el-input>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>


    <footer class="footer" v-if="!showDetail&&!showAdd">
      <div style="float: right;padding: 6px">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </footer>
    <!--添加新增的弹窗-->
    <div class="tabArea" v-if="showDetail">
      <!--详情-->
      <p class="tabAreaTit">
        <span class="titleclasschild" @click="promiseTG('close')"><i class="icon iconfont icon-arrow-left titleclasschild"></i></span>
        <span v-html="detailName"></span>
      </p>

      <el-table  :data="currentMonthData" tooltip-effect="dark"
                 style="width: calc(100% - 26px);margin: auto;"
                 row-class-name="row_class"
                 border>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column align="left"   prop="lhyhnrjyq" label="检查内容及要求"   show-overflow-tooltip> </el-table-column>
        <el-table-column align="left"   prop="lhyhpfbf" label="评分办法"   show-overflow-tooltip> </el-table-column>
        <el-table-column align="left"   prop="lhyhdffz" label="扣分"  width="50"  show-overflow-tooltip> </el-table-column>
        <el-table-column align="left"   prop="lhyhkfyy" label="扣分原因"   show-overflow-tooltip> </el-table-column>
      </el-table>
      <div style="margin-top: 20px;float: left;margin-left: 13px;">
        <span>文件列表 ：</span>
        <a  style="margin-right: 20px;" v-for="(files,index) in currentFils"   target="_blank" :key="index" :href="files.file_path">{{files.file_yname}}</a>
      </div>
      <div style="margin-right: 20px;margin-top: 20px;float: right;">
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
        showxq:false,
        currentFils:[],
        editId:'',

        //dialog
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
        fileList4: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            status: 'finished'
          },],
        input:'',
        khbModel:{
          xmgkxmbh:'',
          lhyhgcmc:'',
          lhyhkhrq:'',
          lhyhsgdw:'',
          jcr:'',
          lhyhfzzj:'',
          lhyhyd:'',
          bz:'',
        },
        searchInputVal:'',
        tableTits:{lhyhdjbh:'单据编号',lhyhyd:'月度',lhyhgcmc:'工程名称',
          lhyhsgdw:'施工单位',orgmc:'管理单位',lhyhkhrq:'考核日期',lhyhfzzj:'得分'},
        currentMonthData:[],
        addData:[],


        FinsdetailTit:{gcmc:'工程名称',jcnr:'考核内容',jcqk:'工程考核情况',fj:'罚金(元)'},
        total:0,
        state:['','编制中','工程技术部审核','经营发展部审核','公司分管领导审核','公司领导审批','审批完成'],
        showFirstItemWindow:false,
        firstItemTit:'G15沈海高速公路温州段详情',
        showAdd:false,
        searchForm:{
          htmc:undefined,
          xmbh: undefined,
          selectDate:null,
          pageNum:1,
          pageSize:10
        },
        YDJHData:[ ],
        detailItemInfo:[],//本月完成情况详情数据
        showDetail:false,
        spanArr:[],
        detailName:'',
        uuidsID:'',
        fildDatas:[],
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
        selectAddXMMC:{},
      }
    },
    methods: {
      // 编辑 详情
      updateFormDia (info,row) {
        let self = this
        this.fildDatas = []
        if(info == 'detail'){
          this.showDetail = !this.showDetail
          this.currentMonthData = row.lhyhpfbmxes
          this.khr = row.yhmc
          this.khrq = row.lhyhkhrq
          this.detailName = row.lhyhgcmc
          this.$api.getFilesDataById2({id:row.id}).then(res=>{
            if(res.code == 1){
              this.currentFils = res.data
            }else{
              this.currentFils = []
            }
          })
        }
        else if(info == 'edit'){
          self.fildDatas = []
          this.showxq = false
          this.showAdd = true
          this.addData = row.lhyhpfbmxes
          this.editId = row.id
          this.khbModel = {
            lhyhdjbh:row.lhyhdjbh,
            lhyhgcmc:row.lhyhgcmc,
            lhyhsgdw:row.lhyhsgdw,
            yhmc:row.yhmc,
            lhyhfzzj:row.lhyhfzzj,
            lhyhyd:row.lhyhyd,
            bz:row.bz,
            lhyhkhrq:row.lhyhkhrq
          }
        }
        this.showxq = false
        this.uuidsID = row.id
        this.$api.getFilesDataById2({id:row.id}).then(res=>{
          if(res.code == 1){
            let datas = res.data
            datas.forEach(item =>{
              item.name = item.file_yname
              self.fildDatas.push(item)
            })
          }
        })
      },
      changeFj(val){
        let {addData} = this
        let num = 0

        for (var i in addData) {
          if(addData[i].lhyhdffz){
            num += parseFloat(addData[i].lhyhdffz)
          }
        }

        this.khbModel.lhyhfzzj = 100 - num

      },
      isAddShow(){
        this.uuidsID = this.uuid()
        this.fildDatas = []
        this.showAdd = true
        this.showxq = true
        this.addData = []
        this.khbModel = {
          khqkModel:'',
          khnrModel:'',
          khrModel:'',
          khrqModel:'',
          lhyhfzzj:'',

          xmbh:'',
          xmmc:'',
          lhyhkhrq:'',
          rcyhxckhbkhrq:'',
          rcyhxckhbsgdw:'',
          rcyhxckhbgldw:'',
          rcyhxckhbbykkhj:'',
        }
        let myDate = new Date()
        this.khbModel.lhyhkhrq = myDate.getFullYear()+'-'+ (myDate.getMonth()+1) + '-' +myDate.getDate()
        this.khbModel.lhyhyd = myDate.getFullYear()+'-'+ (myDate.getMonth()+1)
        this.khbModel.jcr = this.userInfo.yhmc;
      },
      saveAdd(){

        if(this.fildDatas.length){
          this.$api.addFileData(this.fildDatas).then(res=>{
            this.fildDatas = []
            if(res.data.code == 1){

            }else{
              this.$message({
                message: '上传附件失败!',
                type: 'info'
              });
            }
          })
        }
        let {
          xmgkxmbh, lhyhgcmc, lhyhkhrq, lhyhsgdw, jcr, bz,lhyhyd,lhyhfzzj
        } = this.khbModel
        let {orgbh, orgid, orgmc, bmbh,
          bmid, bmmc, yhbm, yhid, yhmc,
        } = this.userInfo
        let arrData = []
        this.addData.forEach(item=>{
          let obj = {
            lhyhdffz: item.lhyhdffz,
            lhyhid: this.uuid(),
            lhyhmxdjbh:'djbh'+Date.now(),
            lhyhnrjyq: item.lhyhnrjyq,
            lhyhpfbf: item.lhyhpfbf,
            lhyhkfyy: item.lhyhkfyy,
            mid: this.uuidsID,
          }
          arrData.push(obj)
        })
        let self = this
        let params = {
          lhyhgcmc: lhyhgcmc,
          lhyhdjbh: 'djbh'+Date.now(),
          xmgkxmbh: xmgkxmbh,
          bz:bz,
          lhyhfzzj: lhyhfzzj,
          id: self.uuidsID,
          lhyhgldw:self.userInfo.orgid,
          lhyhkhrq: lhyhkhrq,
          jcr: jcr,
          lhyhyd: lhyhyd,
          lhyhsgdw: lhyhsgdw,
          lhyhpfbmxes: arrData,
          bmbm: bmbh,
          bmid: bmid,
          bmmc: bmmc,
          orgbh: orgbh,
          orgid: orgid,
          orgmc: orgmc,
          yhbm: yhbm,
          yhid: yhid,
          yhmc: yhmc
        }
        if(xmgkxmbh){
          this.$api.lhyhpfbinert(params).then(res=>{
            if(res.code == 1){
              this.showAdd = false
              this.queryYDJHData()
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
            }else{
              this.$message({
                type: 'error',
                message: res.msg
              });
            }
          })
        }else{
          this.$message({
            message:'请先选择项目名称',
            type: 'info'
          });
        }


      },
      saveEdit(){
        let self = this
          let {xmgkxmbh,lhyhgcmc,lhyhsgdw,jcr,lhyhfzzj,khbModel,bz,lhyhkhrq} = this.khbModel
          let {editId,addData} = this
          let editParams =   {
            bz: bz,
            id:editId ,
            jcr: jcr,
            lhyhdjbh:'djbh' + Date.now(),
            lhyhfzzj: lhyhfzzj,
            lhyhgcmc: lhyhgcmc,
            lhyhkhrq: lhyhkhrq,
            lhyhpfbmxes:addData,
            lhyhsgdw: lhyhsgdw,
            lhyhyd: khbModel,
            xmgkxmbh: xmgkxmbh,
          }

            if(self.fildDatas.length){
              self.$api.addFileData(this.fildDatas).then(res=>{
                self.fildDatas = []
                if(res.data.code == 1){

                }else{
                  this.$message({
                    message: '上传附件失败',
                    type: 'info'
                  });
                }
              })
            }else{
              this.$api.deleteFilesById2({ids:this.uuidsID}).then(res=>{
                if(res.code == 1){

                }else{
                  this.$message({
                    message: '上传附件失败!',
                    type: 'info'
                  });
                }
              })
            }

          this.$api.lhyhpfbupdat(editParams).then(res=>{
            this.showAdd = false
            if(res.code == 1) {
              this.$message({
                message: '更新信息成功!',
                type: 'success'
              });
            }else{
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
          })

      },
      addSelectMC(item){
        this.khbModel.xmgkxmbh = item.XMBH
        this.khbModel.lhyhgcmc = item.XMMC
        this.$api.getOnlyXmgkjcxx({xmbh:item.XMBH}).then(res=>{
          this.fildDatas = []
          if(res.code == 1){
            this.khbModel.xmgkxmbh = res.data[0].xmbh
            this.khbModel.lhyhsgdw = res.data[0].sjdw
          }
        })
        this.$api.getXmgklhzljcByhtbh({htbh:item.XMBH}).then(res=>{
          this.addData = []
          if(res.code == 1){
            let datas = res.data
            datas.forEach(item=>{
              this.addData.push({
                lhyhnrjyq:item.jcnrjyq,
                lhyhpfbf:item.pfbf,
              })
            })
          }else{
            this.addData = []
          }
        })
      },
      selectAddDialog(val){
        this.dialogVisible = false
        this.khbModel.jcr = this.userInfo.yhmc
        this.uuidsID = this.uuid()
        if(val){
          this.selectAddXMMC = val
          this.khbModel.xmgkxmbh = val.XMBH
          this.khbModel.lhyhgcmc = val.XMMC
          this.showAdd = true
          this.$api.getXmgklhzljcByhtbh({htbh:val.XMBH}).then(res=>{
            this.addData = []
            if(res.code == 1){
              let datas = res.data
              datas.forEach(item=>{
                this.addData.push({
                  lhyhnrjyq:item.jcnrjyq,
                  lhyhpfbf:item.pfbf,
                })
              })
            }else{
              this.addData = []
            }
          })
          this.$api.getOnlyXmgkjcxx({xmbh: val.XMBH}).then(res => {
            if(res.code ==1) {
              if (res.data && res.data.length !== 0) {
                this.khbModel.lhyhsgdw = res.data[0].cbdw
              }
            }
          })
        }
      },










      addReturn(bol){
            this.showAdd = false
      },
      handleRemove(file, fileList){
        this.fildDatas = fileList
      },
      handHttpRequest(files){
        let fm = new FormData();
        fm.append('file',files.file);
        let self = this
        this.$api.uploadFile2(fm).then(res=>{
          if(res.code == 1){
            let datas = res.data
            datas.file_remarks = datas.remarks
            delete datas.remarks
            let fildObj = datas
            fildObj.file_id = self.uuidsID
            fildObj.name = fildObj.file_yname
            fildObj.file_mjlx = '3302'
            this.fildDatas.push(fildObj)
          }
        })

      },
      changeBZRQ(bol){
        if(bol){
          let lhyhkhrq = this.khbModel.lhyhkhrq;
          this.khbModel.lhyhyd = lhyhkhrq.substring(0,7)
        }else{
          let lhyhkhrq = this.editzynr.lhyhkhrq;
          this.editzynr.lhyhyd = lhyhkhrq.substring(0,7)
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
      initqueryXMMC(){
        this.$api.getmcbhList2().then(res=>{
          if(res.code == 1){
            this.restaurants = res.data&&res.data.length?res.data:[]
            if (config.userInfo.userType&&config.userInfo.userType =='供应商') {
              this.queryYDJHData(this.restaurants[0])
            } else {
              this.queryYDJHData()
            }
          }else{
            this.restaurants = []
          }

        })
      },
      handleSelectMC(item){
        //getXmmcList
        this.searchForm.htmc = item.XMMC
        this.searchForm.xmbh = item.XMBH
      },
      showDialog(bol){
        this.dialogVisible = true
        this.datatypes = bol
        this.$api.getmcbhList2().then(res=>{
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
      searchXMMC(val){
        this.$api.getXmmcListt({xmmc:val}).then(res=>{
          if(res.code == 1){
            this.dialogData = res.data&&res.data.length?res.data:[]
          }else{
            this.dialogData = []
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

      uuid(){
        let str = (((1+Math.random())*0x10000)|0).toString(16).substring(1)
        return (str+str+"-"+str+"-"+str+"-"+str+"-"+str+str+str);
      },
      selectionChange(selection){
        this.delIds = selection
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
      selectable2(row, index){   //禁用第四个
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
        this.searchForm.spzt = undefined
        this.searchForm.pageNum = 1
      },
      addContent(){

        if(this.delIds.length){
          this.$confirm('确定要删除吗', {
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
              id:arr
            }
            if(this.delIds.length){
              this.$api.lhyhpfbdelete(obj).then(res=>{
                if(res.code == 1){
                  this.queryYDJHData()
                  this.$message({
                    message: '删除信息成功！',
                    type: 'success'
                  });
                }else{
                  this.$message({
                    type: 'error',
                    message: '删除失败'
                  });
                }
              })
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else{
          this.$message({
            message: '请选择要删除的内容',
            type: 'warning'
          });
        }





      },
      //操作通过打回等按钮
      promiseTG(bol){
        // 详情查看
        this.showDetail = false
        this.showFirstItemWindow = false
      },

      //分页展示数据
      handleCurrentChange (val) {
        this.searchForm.pageNum = val
        this.queryYDJHData()
      },
      //月度计划初始化查询
      searchYDJH(){
        this.queryYDJHData()
      },
      //初始化列表数据
      queryYDJHData(val){
        this.showSearch = false
        if (this.searchForm.selectDate) {
          this.searchForm.ksrq = this.searchForm.selectDate[0]
          this.searchForm.jsrq = this.searchForm.selectDate[1]
        }
        let {ksrq,jsrq,pageNum,pageSize,xmbh,spzt} = this.searchForm
        let userInfo = this.userInfo
        let xmbhOfinit = {}
        if (val) {
          xmbhOfinit = val
        } else {
          if(config.userInfo.userType&&config.userInfo.userType =='供应商') {
            xmbhOfinit = this.restaurants[0]
          } else {
            xmbhOfinit.XMBH = ''
          }
        }
        this.$api.lhyhpfbgetLhyhrwList({
          htbh:xmbh == undefined ? xmbhOfinit.XMBH : xmbh,spzt,
          pageNum,pageSize,ksrq,jsrq,
          orgid:userInfo.orgid,
          yhid:userInfo.yhid,
          bmid:userInfo.bmid}).then(resp => {
          this.loading = false

          if (resp.status !== 200) {
            this.$message({
              message: '出错了',
              type: 'error'
            })
          } else {
            this.YDJHData = resp.data.data.list
            this.total = resp.data.data.total
          }
        }).catch(e => {
          this.loading = false
        })
      },
    },
    mounted () {
      this.initUser()
      this.initqueryXMMC()


    }
  }
</script>

<style lang="scss">

  .topAdd{
    /*padding-left: 24px;*/
    /*padding-top: 15px;*/
    .goReturn{
      font-size: 14px;
      color: #32353c;
      margin-bottom: 24px;
      cursor: pointer;
    }
    .itemS{
      input,textarea{
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
  .closeBTN{
    position: absolute;
    left:0;
    right: 0;
    width: 20px;
    margin: auto;
    top: -38px;
    z-index: 999;
    font-size:60px;
    color: #D5D6D7;
    cursor: pointer;
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
