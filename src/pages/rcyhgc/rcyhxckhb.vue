/**
* ----巡查考核表
*/
<template>
  <div id="kgsqd" style="height: 100%" v-loading="loading">
    <div class="header" v-if="!showDetail&&!showAdd">
      <span class="headerTit">巡查考核表</span>
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
      <div class="bottomAdd">
        <div style="font-size: 0;">
          <p class="addJLD"><span class="addJLD_tit">项目名称 ：</span>
            <el-autocomplete
              class="inline-input"
              size="mini"
              v-model="khbModel.xmmc"
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
            <span class="addJLD_tit">考核日期 ：</span>
            <el-date-picker
              v-model="khbModel.rcyhxckhbkhrq"
              type="date"
              size="mini"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </p>
          <p class="addJLD"><span class="addJLD_tit">施工单位 ：</span><el-input size="mini" :disabled="true" v-model="khbModel.rcyhxckhbsgdw" placeholder="请输入内容"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">管理单位 ：</span><el-input size="mini" :disabled="true" v-model="khbModel.rcyhxckhbgldw" placeholder="请输入内容"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">扣款合计 ：</span><el-input size="mini" :disabled="true" v-model="khbModel.rcyhxckhbbykkhj" placeholder="请输入内容"></el-input></p>
          <p style="font-size: 13px">
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
      </div>
      <div class="topAdd" style="height: calc(100% - 240px);">
          <el-table  :data="addData" tooltip-effect="dark"
                     height="100%"
                     style="width: calc(100% - 26px);margin:20px auto;"
                     border>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50">
            </el-table-column>
            <el-table-column align="left"  label="工程项目" prop="rcyhxckhbgcxm"> </el-table-column>
            <el-table-column align="left"  label="考核内容" prop="rcyhxckhbkhnr"> </el-table-column>
             <el-table-column align="left"  label="本月扣款" width="150">
              <template slot-scope="{row}">
                <el-input style="width: 75%" size="mini" @keyup.native="changeFj" type="number" v-model.number="row.rcyhxckhbbykk"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="left"  label="备注及要求"  >
              <template slot-scope="{row}">
                <el-input size="mini" style="width: 75%" v-model.number="row.rcyhxckhbbzjyq"> </el-input>
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
    <div class="tabArea" v-show="showDetail">
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
          align="center"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column align="left"   prop="rcyhxckhbgcxm" label="工程名称"   show-overflow-tooltip> </el-table-column>
        <el-table-column align="left"   prop="rcyhxckhbkhnr" label="考核内容"   show-overflow-tooltip> </el-table-column>
        <el-table-column align="left"   prop="rcyhxckhbbykk" label="本月扣款"   show-overflow-tooltip> </el-table-column>
        <el-table-column align="left"   prop="rcyhxckhbbzjyq" label="备注及要求"   show-overflow-tooltip> </el-table-column>
      </el-table>
      <div style="margin-top: 20px;float: left;margin-left: 13px;">
        <span>文件列表 ：</span>
        <a style="margin-right: 20px;" v-for="(files,index) in currentFils"  target="_blank" :key="index" :href="files.file_path">{{files.file_yname}}</a>
      </div>
      <div style="padding-right: 20px;margin-top: 20px;text-align: right;float: right;">
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
        uuidsID:'',
        currentFils:[],
        fildDatas:[],
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
          khqkModel:'',
          khnrModel:'',
          khrModel:'',
          khrqModel:'',
          xmbh:'',
          xmmc:'',
          rcyhxckhbkhrq:'',
          rcyhxckhbsgdw:'',
          rcyhxckhbgldw:'',
          rcyhxckhbbykkhj:'',
        },
        searchInputVal:'',
        tableTits:{xmbh:'单据编号',rcyhxckhbyd:'月度',rcyhxckhbgcmc:'工程名称',rcyhxckhbsgdw:'施工单位',
          rcyhxckhbgldw:'管理单位',rcyhxckhbkhrq:'考核日期',rcyhxckhbbykkhj:'本月扣款合计'},
        currentMonthData:[],
        addData:[],
        editData:[],
        editzynr:{
          xmbh:'',
          xmmc:'',

          rcyhxckhbkhrq:'',
          rcyhxckhbsgdw:'',
          rcyhxckhbgldw:'',
          rcyhxckhbbykkhj:'',
        },
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
          zt:null,
          pageNum:1,
          pageSize:10
        },
        YDJHData:[ ],
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
      // 编辑 详情
      updateFormDia (info,row) {

        let self = this
        this.fildDatas = []
        if(info == 'detail'){
          this.showDetail = !this.showDetail
          this.currentMonthData = row.rcyhxckhbmxes
          this.khr = row.yhmc
          this.khrq = row.rcyhxckhbkhrq
          this.detailName = row.xmmc
          this.$api.getFilesDataById2({id:row.fileid}).then(res=>{
            if(res.code == 1){
              this.currentFils = res.data
            }else{
              this.currentFils = []
            }
          })

        }else if(info == 'edit'){
          self.fildDatas = []
          this.showxq = false
          //再次查询一遍ID
          this.khbModel = row
          this.addData = row.rcyhxckhbmxes
          this.uuidsID = row.fileid
          this.showAdd = true
          this.$api.getFilesDataById2({id:row.fileid}).then(res=>{
            if(res.code == 1){
              let datas = res.data
              datas.forEach(item =>{
                item.name = item.file_yname
                self.fildDatas.push(item)
              })
            }
          })

        }


      },
      changeFj(val){
        let {addData} = this
        let num = 0
        for (var i in addData) {
          if(addData[i].rcyhxckhbbykk){
            num += parseFloat(addData[i].rcyhxckhbbykk)
          }
        }
        this.khbModel.rcyhxckhbbykkhj = num
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
          xmbh:'',
          xmmc:'',
          rcyhxckhbkhrq:'',
          rcyhxckhbsgdw:'',
          rcyhxckhbgldw:'',
          rcyhxckhbbykkhj:'',
        }
        let myDate = new Date()
        this.khbModel.rcyhxckhbkhrq = myDate.getFullYear()+'-'+ (myDate.getMonth()+1) + '-' +myDate.getDate()
        this.khbModel.yd = myDate.getFullYear()+'-'+ (myDate.getMonth()+1)
        this.khbModel.jcr = this.userInfo.yhmc;
      },
      saveAdd(){
        let self = this
          if(this.fildDatas.length){
            this.$api.addFileData(this.fildDatas).then(res=>{
              if(res.data.code == 1){
              }else{
                this.$message({
                  message: '上传附件失败',
                  type: 'info'
                });
              }
            })
          }
          let {
            xmbh, xmmc, rcyhxckhbkhrq, rcyhxckhbsgdw, rcyhxckhbbykkhj,rcyhxckhbgldw
          } = this.khbModel
          let arr = []
          this.addData.forEach(item=>{
            arr.push({
              rcyhxckhbbykk:item.rcyhxckhbbykk,
              rcyhxckhbbzjyq:item.rcyhxckhbbzjyq,
              rcyhxckhbgcxm: xmmc,
              rcyhxckhbid: self.uuid(),
              rcyhxckhbkhnr: item.rcyhxckhbkhnr,
              rcyhxckhbmxdjbh: 'djbh' +Date.now(),
              rcyhxckhbsjbh: undefined,
            })
          })
          let params = {
            rcyhxckhbbykkhj,
            rcyhxckhbdjbh: 'djbh'+Date.now(),
            rcyhxckhbgcmc: xmmc,
            rcyhxckhbgldw: rcyhxckhbgldw,
            rcyhxckhbkhrq: rcyhxckhbkhrq,
            rcyhxckhbsgdw: rcyhxckhbsgdw,
            xmbh,
            xmmc,
            rcyhxckhbmxes:arr,
            fileid: self.uuidsID,
            ...self.userInfo
          }
          if(xmmc){
            console.log(JSON.stringify(params))
            this.$api.rcyhxckhbinsert(params).then(res=>{
              if(res.code == 1){
                this.showAdd = false
                this.queryYDJHData()
                this.$message({
                  message: '添加信息成功！',
                  type: 'success'
                });

              }else{
                this.$message({
                  message: res.msg,
                  type: 'error'
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
          let {xmbh,xmmc,rcyhxckhbkhrq,rcyhxckhbsgdw,rcyhxckhbgldw,rcyhxckhbbykkhj,fileid,rcyhxckhbdjbh} = this.khbModel
          let editParams =   {
            rcyhxckhbbykkhj: rcyhxckhbbykkhj,
            rcyhxckhbdjbh: rcyhxckhbdjbh,
            rcyhxckhbgcmc: xmmc,
            rcyhxckhbgldw: rcyhxckhbgldw,
            rcyhxckhbkhrq: rcyhxckhbkhrq,
            rcyhxckhbsgdw: rcyhxckhbsgdw,
            xmbh: xmbh,
            xmmc:xmmc,
            fileid:fileid,
            rcyhxckhbmxes:self.addData,
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
             this.$api.deleteFilesById2({ids:self.uuidsID}).then(res=>{
               if(res.code == 1){

               }else{
                 this.$message({
                   message: '上传附件失败!',
                   type: 'info'
                 });
               }
              })
            }

          this.$api.rcyhxckhbupdate(editParams).then(res=>{
            if(res.code == 1){
              this.showAdd = false
              this.queryYDJHData()
              this.$message({
                message: '修改成功!',
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
        this.khbModel.xmmc = item.XMMC
        this.khbModel.xmbh = item.XMBH
        this.$api.getOnlyXmgkjcxx({xmbh:item.XMBH}).then(res=>{

          this.fildDatas = []
          if(res.code == 1){
            this.khbModel.rcyhxckhbsgdw = res.data[0].cbdw
            this.khbModel.rcyhxckhbgldw = res.data[0].gldw
          }
        })
        this.$api.getXmgklyzljcByhtbh({htbh:item.XMBH}).then(res=>{
          this.addData = []
          if(res.code == 1){
            let datas = res.data
            datas.forEach(item=>{
              this.addData.push({
                rcyhxckhbgcxm:item.gcxm,
                rcyhxckhbkhnr:item.khnr,
              })
            })
          }else{
            this.addData = []
          }
        })
      },
      selectAddDialog(val){
        this.dialogVisible = false
        this.uuidsID = this.uuid()
        if(val.constructor === Object){
          this.selectAddXMMC = val
          this.khbModel.xmbh = val.XMBH
          this.khbModel.xmmc = val.XMMC
          this.showAdd = true
          this.$api.getXmgklyzljcByhtbh({htbh:val.XMBH}).then(res=>{
            if(res.code == 1){
              let datas = res.data
              datas.forEach(item=>{
                this.addData.push({
                  rcyhxckhbgcxm:item.gcxm,
                  rcyhxckhbkhnr:item.khnr,
                })
              })
            }else{
              this.addData = []
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
              this.queryYDJHData(this.restaurants[0]) // 获取事件任务清单列表
            } else {
              this.queryYDJHData() // 获取事件任务清单列表
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
      changeBZRQ(){
        let jcrq = this.khbModel.rcyhxckhbkhrq;
        this.khbModel.yd = jcrq.substring(0,10)
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
        this.searchForm.zt = undefined
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

          if(this.delIds.length){
            this.$confirm('确定要删除吗', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              let arr = ''
              this.delIds.forEach(item =>{

                arr += item.rcyhxckhbdjbh + ','
              })
              let obj = {
                rcyhxckhbdjbh:arr
              }
              if(this.delIds.length){
                this.$api.rcyhxckhbdelete(obj).then(res=>{
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
          }else{
            this.$message({
              message: '请选择要删除的内容',
              type: 'warning'
            });
          }



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
        let {htmc,selectDate,pageNum,pageSize,zt,xmbh} = this.searchForm;
        let ksrq,jsrq;
        if(selectDate&&selectDate.length){
          ksrq = selectDate[0]
          jsrq = selectDate[1]
        }
        this.loading = true
        let self = this
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
        this.$api.getRcyhxckhbList({
          pageNum,pageSize,ksrq,jsrq,
          xmbh: xmbh == undefined ? xmbhOfinit.XMBH : xmbh,
          orgid:self.userInfo.orgid,
          bmid: self.userInfo.bmid,
          yhid:self.userInfo.yhid
        }).then(res=>{

          this.loading = false
          if(res.code == 1){

            if(res.data){
              this.YDJHData = res.data.list
              this.total = res.data.total
            }else{
              this.YDJHData = []
              this.total = 0
            }
          }
        }).catch(err=>{
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
