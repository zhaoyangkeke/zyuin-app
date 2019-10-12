/**
* ----进场准备情况检查表
*/
<template>
  <div id="kgsqd" style="height: 100%" v-loading="loading">
    <div class="header" v-show="!showDetail&&!showAdd">
      <span class="headerTit">进场准备情况检查表</span>
      <div class="header_option">
        <ul>
          <!--<li><i class="icon iconfont icon-export"> 导出</i></li>-->
          <li @click="isAddShow"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="addContent(false)"><i class="el-icon-delete"> 删除</i></li>
        </ul>

      </div>
    </div>
    <!--查询弹框区域-->
    <div class="conter_table" v-if="!showAdd">
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
          align="center"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column align="left" sortable v-for="(tit,titIndex) in tableTits" :prop="titIndex" :label="tit" :key="titIndex"  show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="jcrq" label="检测日期" show-overflow-tooltip></el-table-column>
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
          <el-button size="mini"  v-if="showxq" class="minibtn" @click.native="saveAdd"
                     style="background: #DF4D4A;border-color:transparent;color: #fff;">保存</el-button>
          <el-button v-if="!showxq" size="mini" class="minibtn" @click.native="saveEdit"
                     style="background: #DF4D4A;border-color:transparent;color: #fff;">保存</el-button>
          <el-button size="mini" @click.native="showAdd = false">取消</el-button>
        </div>
      </div>
      <div class="bottomAdd">
        <div style="font-size: 0">
          <p class="addJLD"><span class="addJLD_tit">项目名称 ：</span>
            <el-autocomplete
              class="inline-input"
              size="mini"
              v-model="khbModel.htmc"
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
          <p class="addJLD"><span class="addJLD_tit">施工单位 ：</span><el-input :disabled="true" size="mini" v-model="khbModel.sgdw" placeholder="请输入内容"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">检查人 ：</span><el-input :disabled="true" size="mini"  v-model="khbModel.jcr" placeholder="请输入内容"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">合同金额(万元) ：</span><el-input :disabled="true"  size="mini" v-model="khbModel.htje" placeholder="请输入内容"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">违约罚金合计 ：</span>
            <el-input :disabled="true" size="mini" v-model="khbModel.fj" placeholder="请输入内容"></el-input>
          </p>
          <p class="addJLD"><span class="addJLD_tit">备注 ：</span><el-input size="mini" v-model="khbModel.bz" placeholder="请输入内容"></el-input></p>
          <p>
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
      <div class="topAdd" style="height:calc(100% - 260px)" >
        <el-table  :data="addData" tooltip-effect="dark"
                    height="100%"
                   style="width: calc(100% - 26px);margin:20px auto;overflow-y: auto"
                   border>
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column align="left" label="工程名称" prop="gcmc"> </el-table-column>
          <el-table-column align="left" prop="jcnr" label="考核内容"></el-table-column>
          <el-table-column align="center" label="工程考核情况">
            <template slot-scope="{row}">
              <!-- style="border: 1px solid rgb(169, 169, 169);width: 100%;"-->
              <el-input size="mini" v-model="row.jcqk"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center"  label="罚金(元)" width="150">
            <template slot-scope="{row}">
              <!-- style="border: 1px solid rgb(169, 169, 169);width: 75%"-->
              <el-input size="mini" style="width: 75%"  type="number" @keyup.native="changeFj" v-model="row.fj"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <footer class="footer" v-if="!showAdd">
      <div style="float: right;padding: 6px">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </footer>
    <!--添加新增的弹窗-->
    <div class="tabArea" v-show="showDetail" style="height: 100%">
      <!--详情-->
      <p class="tabAreaTit">
        <span class="titleclasschild" @click="promiseTG('close')"><i class="icon iconfont icon-arrow-left titleclasschild" @click="isShowDetail = false"></i></span>
        <span v-html="detailName"></span>
      </p>

      <el-table  :data="currentMonthData" tooltip-effect="dark"
                 style="width: calc(100% - 26px);margin: auto;"
                 height="calc(100% - 100px)"
                 row-class-name="row_class"
                 border>
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column align="left"   prop="gcmc" label="工程名称"></el-table-column>
        <el-table-column align="left"   prop="jcnr" label="考核内容"   ></el-table-column>
        <el-table-column align="left"   prop="jcqk" label="工程考核情况" ></el-table-column>
        <el-table-column align="left"   prop="fj" label="罚金(元)"></el-table-column>
      </el-table>
      <div style="margin-top: 20px;margin-left: 13px;float: left">
        <span>文件列表 ：</span>
        <a style="margin-right: 20px;" v-for="(files,index) in currentFils" target="_blank" :key="index" :href="files.file_path">{{files.file_yname}}</a>
      </div>
      <div style="padding-left: 20px;margin-top: 20px;float: right;margin-right: 15px;">
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
        tableTits:{xmbh:'项目编号',xmmc:'项目名称',sgdw:'施工单位',
          orgmc:'管理单位',yhmc:'检查人',htje:'合同金额',wyfj:'违约金合计',bz:'备注'},
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
      // 编辑 详情
      updateFormDia (info,row) {
        let self = this
        this.uuidsID = row.id
        this.fildDatas = []
        if(info == 'detail'){
          this.showDetail = true
          this.detailName  = row.xmmc
          this.currentMonthData = [ ]
          this.khr = row.jcr
          this.khrq = row.jcrq

          this.$api.getJczbmxById({id:row.id}).then(res=>{
            if(res.code == 1){
              let arr = res.data
              arr.map(item =>{
                self.currentMonthData.push(Object.assign({},item))
              })
            }
          })
          this.$api.getFilesDataById2({id:row.id}).then(res=>{
            if(res.code == 1){
              self.currentFils = res.data
            }else{
              self.currentFils = []
            }
          })
          this.getSpanArr( this.currentMonthData)
        }
        else if(info == 'edit'){
          this.showxq = false
          this.showAdd = true
          this.khbModel ={
            htbh:row.xmbh,
            htmc:row.xmmc,
            jcrq:row.jcrq,
            sgdw:row.sgdw,
            jcr:row.yhmc,
            htje:row.htje,
            fj:row.wyfj,
            bz:row.bz,
            id:row.id,
            bmbh:row.bmbh,
            bmmc:row.bmmc,
            bmid:row.bmid,
            dwmc:row.dwmc,
            dwbh:row.dwbh,
            dwid:row.dwid,
            gldw:row.gldw,
            spzt:row.spzt,
            tbr:row.tbr,
            tbrid:row.tbrid,
            tbrq:row.tbrq,
            wfid:row.wfid,
          }


          this.$api.getJczbmxById({id:row.id}).then(res=>{
            if(res.code == 1){
              this.addData = res.data
            }
          })
          this.$api.getFilesDataById2({id:row.id}).then(res=>{
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
          if(addData[i].fj){
            num += parseFloat(addData[i].fj)
          }
        }
        this.khbModel.fj = num
      },
      isAddShow(){
        this.uuidsID = this.uuid()
        this.fildDatas = []
        this.showAdd = true
        this.showxq = true
        this.addData = []
        this.khbModel = {
          khqkModel:'', khnrModel:'', khrModel:'', khrqModel:'',
          htbh:'', htmc:'', jcrq:'', sgdw:'', jcr:'', htje:'',
          fj:'', bz:'',
        }
        let myDate = new Date()
        this.khbModel.jcrq = myDate.getFullYear()+'-'+ (myDate.getMonth()+1) + '-' +myDate.getDate()
        this.khbModel.yd = myDate.getFullYear()+'-'+ (myDate.getMonth()+1)
        this.khbModel.jcr = this.userInfo.yhmc;
      },
      saveAdd(){

          if(this.fildDatas.length){
            this.$api.addFileData(this.fildDatas).then(res=>{
              if(res.data.code == 1){
              }else{
                this.$message({
                  message: '上传附件失败！',
                  type: 'info'
                })
              }
            })
          }
          let {htbh, htmc, jcrq, sgdw, jcr, htje, fj, bz} = this.khbModel
          let arr = []
          this.addData.forEach(item=>{
            arr.push({
              fj: item.fj?Number(item.fj):0,
              id: this.uuid(),
              gcmc: item.gcmc?item.gcmc:'',
              jcnr:item.jcnr,
              jcqk:item.jcqk?item.jcqk:'',//后台没有传递过来
              memo: '',
              mid: this.uuidsID
            })
          })
          let self = this
          let params = {
            xmmc: htmc,
            xmbh: htbh,
            wyfj:fj?Number(fj):0,
            wfid:'',
            tbrq: '',
            tbrid: '',
            tbr: '',
            spzt:'',
            sgdw:sgdw,
            jcrq:jcrq,
            id: self.uuidsID,
            htje: htje?Number(htje):0,
            dwmc:'',
            dwid:'',
            dwbh: '',
            bz: bz,
            jcr: jcr,
            jczbmxb:arr,
            ...self.userInfo
          }
           if(htmc){
             this.$api.addJczb2(params).then(res=>{
               if(res.code == 1){
                 this.showAdd = false
                 this.queryYDJHData()
                 this.$message({
                   message: '添加信息成功！',
                   type: 'success'
                 });
               }else{
                 this.$message({
                   message:res.msg,
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
        let arr = []
        let _this = this
        this.addData.forEach(item=>{
          arr.push({
            mid: _this.uuidsID,
            fj: item.fj,
            gcmc: item.gcmc,
            jcnr:  item.jcnr,
            jcqk: item.jcqk,
          })
        })
          let {bz,fj,htbh,htje,htmc,jcr,jcrq,sgdw,id,
            bmbh,bmid,bmmc,dwbh,dwid,dwmc,gldw,spzt,tbr,tbrid,tbrq,wfid} = this.khbModel
          let self = this
          let editParams =   {
            bmbh,
            bmid,
            bmmc,
            dwbh,
            dwid,
            dwmc,
            gldw,
            spzt,
            tbr,
            tbrid,
            tbrq,
            wfid,
            bz: bz,
            htje: htje,
            id:id,
            jcrq: jcrq,
            sgdw: sgdw,
            wyfj: fj,
            xmmc: htmc,
            xmbh: htbh,
            jcr: jcr,
            jczbmxb:arr,
          }

            if(self.fildDatas.length){
              self.$api.addFileData(self.fildDatas).then(res=>{
                self.fildDatas = []
                if(res.data.code == 1){
                }else{
                  self.$message({
                    message: '上传附件失败',
                    type: 'info'
                  });
                }
              })
            }else{
              this.$api.deleteFilesById2({ids:id}).then(res=>{
                if(res.code == 1){
                }else{
                  self.$message({
                    message: '上传附件失败',
                    type: 'info'
                  });
                }
              })
            }


          this.$api.updateJczb2(editParams).then(res=>{
            if(res.code == 1){
              this.showAdd = false
              this.queryYDJHData()
              this.$message({
                message: '更新信息成功!',
                type: 'success'
              });
            }else{
              this.$message({
                message:res.msg,
                type: 'error'
              });
            }
          })
      },
      addSelectMC(item){
        this.khbModel.htmc = item.XMMC
        this.khbModel.htbh = item.XMBH
        this.$api.getOnlyXmgkjcxx({xmbh:item.XMBH}).then(res=>{
          this.fildDatas = []
          if(res.code == 1){
            this.khbModel.sgdw = res.data[0].cbdw
            this.khbModel.htje = res.data[0].htje
          }
        })
        this.$api.getXmgkjczbqkbByhtbh({htbh:item.XMBH}).then(res=>{
          this.addData = []
          if(res.code == 1){
            let datas = res.data
            datas.forEach(item=>{
              this.addData.push({
                gcmc:item.gcxm,
                jcnr:item.khnr,
              })
            })
          }
        })
      },
      selectAddDialog(val){
        this.dialogVisible = false
        this.khbModel.jcr = this.userInfo.yhmc;
        this.uuidsID = this.uuid()
        if(val.constructor === Object){
          this.selectAddXMMC = val
          this.khbModel.htbh = val.XMBH
          this.khbModel.htmc = val.XMMC
          this.showAdd = true
          this.$api.getOnlyXmgkjcxx({xmbh:val.XMBH}).then(res=>{
            this.fildDatas = []
            if(res.code == 1){
              this.khbModel.sgdw = res.data[0].cbdw
              this.khbModel.htje = res.data[0].htje
            }
          })
          this.$api.getXmgkjczbqkbByhtbh({htbh:val.XMBH}).then(res=>{
            if(res.code == 1){
              this.addData = res.data
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
        var fm = new FormData();
        fm.append('file',files.file);
        this.$api.uploadFile2(fm).then(res=>{
          if(res.code == 1){
            let datas = res.data
            datas.file_remarks = datas.remarks
            delete datas.remarks
            let fildObj = datas
            fildObj.file_id = this.uuidsID
            fildObj.name = fildObj.file_yname
            fildObj.file_mjlx = '3302'
            this.fildDatas.push(fildObj)
          }
        })

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
        this.$api.getmcbhList2().then(res=>{
          if(res.code == 1){
            this.restaurants = res.data&&res.data.length?res.data:[]
          }else{
            this.restaurants = []
          }
          this.queryYDJHData()
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
      handleSelectMC(item){
        //getXmmcList
        this.searchForm.htmc = item.XMMC
        this.searchForm.xmbh = item.XMBH
      },

      uuid(){
        let str = (((1+Math.random())*0x10000)|0).toString(16).substring(1)
        return (str+str+"-"+str+"-"+str+"-"+str+"-"+str+str+str);
      },
      initUser(){
        let userInfo = JSON.parse(localStorage.getItem('userMsg'))[0]
        if(userInfo){

          if(userInfo){
            this.userInfo.yhbm = userInfo.userCode
            this.userInfo.yhid = userInfo.userId
            this.userInfo.yhmc = userInfo.userName
            this.userInfo.userType = userInfo.userType
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
      selectionChange(selection){
        this.delIds = selection
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
          if( this.delIds.length){
            this.$confirm('此操作将永久删除该文件, 是否继续?', {
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
                this.$api.deleteJczb2(obj).then(res=>{
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
          else{
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
        this.searchForm.pageNum = 1
        this.queryYDJHData()
      },
      //初始化列表数据
      queryYDJHData(){
        let {bmid,orgid,yhid,userType} = this.userInfo
        if(userType&&userType =='供应商'){
          if(this.restaurants.length){
            if(this.restaurants[0].XMBH){
              this.searchForm.xmbh = this.restaurants[0].XMBH
            }
          }
        }
        let {htmc,selectDate,pageNum,pageSize,xmbh} = this.searchForm;

        let ksrq,jsrq;
        if(selectDate&&selectDate.length){
          ksrq = selectDate[0]
          jsrq = selectDate[1]
        }
        let self = this
        this.loading = true

        this.$api.getJczbAll2({
//          xmmc:htmc?htmc.trim():undefined,
          xmbh:xmbh?xmbh:undefined,
          ksrq, jsrq,
          pageNum,pageSize,yhid:yhid,bmid:bmid,orgid:orgid
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
