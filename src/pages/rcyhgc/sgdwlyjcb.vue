/**
* ----施工单位履约检查表
*/
<template>
  <div id="kgsqd" style="height: 100%" v-loading="loading">
    <div class="header" v-if="!showDetail&&!showAdd">
      <span class="headerTit">施工单位履约检查表</span>
      <div class="header_option">
        <ul>
          <!--<li><i class="icon iconfont icon-edit1"> 编辑</i></li>-->
          <!--<li><i class="icon iconfont icon-export"> 导出</i></li>-->
          <!--showDialog('add')  -->
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
        <el-table-column align="left" sortable v-for="(tit,titIndex) in tableTits" :prop="titIndex?titIndex:''" :label="tit" :key="titIndex" > </el-table-column>
        <el-table-column align="left" sortable prop="jcrq" label="检测日期"></el-table-column>
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
    <!--添加  -->
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
          <el-button size="mini" @click.native="showAdd = false" >取消</el-button>
        </div>
      </div>
      <div class="bottomAdd">

        <div style="font-size: 0;">
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
             <!--<el-input size="mini" :disabled="true" v-model="khbModel.htmc" placeholder="请输入内容"></el-input>-->
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
          <p class="addJLD"><span class="addJLD_tit">施工单位 ：</span><el-input size="mini" :disabled="true" v-model="khbModel.sgdw" placeholder="请输入内容"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">检查人 ：</span><el-input size="mini"  :disabled="true" v-model="khbModel.jcr" placeholder="请输入内容"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">合同金额(万元) ：</span><el-input size="mini" :disabled="true" v-model="khbModel.htje" placeholder="请输入内容"></el-input></p>
          <p class="addJLD"><span class="addJLD_tit">违约罚金合计 ：</span>
            <el-input size="mini" :disabled="true" v-model="khbModel.fj" placeholder="请输入内容"></el-input>
          </p>
          <p class="addJLD"><span class="addJLD_tit">备注 ：</span><el-input size="mini" v-model="khbModel.bz" placeholder="请输入内容"></el-input></p>
          <p style="font-size: 13px;">
            <el-upload
              class="uploadFiles"
              action="111"
              :on-remove="handleRemove"
              :http-request="handHttpRequest"
              :file-list="fildDatas"
              multiple
              :limit="3">

              <el-button size="small" type="primary">上传附件</el-button>
            </el-upload>
          </p>
        </div>
      </div>
      <div class="topAdd" style="height:calc(100% - 230px)">
        <div style="height: 100%;">
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
              <el-table-column align="left"  label="工程名称" width="230" prop="gcmc"></el-table-column>
              <el-table-column align="left" label="考核内容" prop="jcnr"></el-table-column>
              <el-table-column align="left" label="工程考核情况" prop="jcqk">
                <template slot-scope="{row}">
                  <el-input size="mini" v-model="row.jcqk"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="left"  label="罚金(元)" prop="fj" width="150" >
                <template slot-scope="{row}">
                  <el-input size="mini"  @keyup.native="changeFj"  type="number" style="width: 75%" v-model.number="row.fj"> </el-input>
                </template>
              </el-table-column>
            </el-table>
        </div>
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
                 height="calc(100% - 180px)"
                 row-class-name="row_class"
                 border>

        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column align="left"   prop="gcmc" label="工程名称" width="230"></el-table-column>
        <el-table-column align="left"   prop="jcnr" label="考核内容"></el-table-column>
        <el-table-column align="left"   prop="jcqk" label="工程考核情况"></el-table-column>
        <el-table-column align="left"   prop="fj" label="罚金(元)" width="150"></el-table-column>
      </el-table>
      <div style="float: left;margin-top:20px;margin-left: 13px;">
        <span>文件列表 ：</span>
        <a style="margin-right: 20px;" v-for="(files,index) in currentFils" target="_blank" :key="index" :href="files.file_path">{{files.file_yname}}</a>
      </div>
      <div style="padding-right: 20px;margin-top:20px;text-align: right;float: right;">
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

        khrq:'',
        aa:'',
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
        tableTits:{htbh:'项目编号',htmc:'项目名称',sgdw:'施工单位',
          orgmc:'管理单位',jcr:'检查人',htje:'合同金额',fjhj:'违约金合计',bz:'备注'},
        currentMonthData:[],
        addData:[],
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
      }
    },
    methods: {
      // 编辑 详情
      updateFormDia (info,row) {

        let self = this
        self.fildDatas = [ ]
        if(info == 'detail'){
          this.showDetail = !this.showDetail
          this.currentMonthData = [ ]
          this.khr = row.jcr
          this.khrq = row.jcrq
          this.detailName = row.htmc
          this.currentFils = []
          this.$api.getLyjcbmxByMid({id:row.id}).then(res=>{
            if(res.code == 1){
              let arr = res.data
              arr.map(item =>{
                self.currentMonthData.push(Object.assign({},item))
              })
            }
          })
          this.$api.getFilesDataById2({id:row.id}).then(res=>{
            if(res.code == 1){
              let datas = res.data
              datas.forEach(item =>{
                self.currentFils.push(item)
              })
            }
          })
          this.getSpanArr( this.currentMonthData)
        }
        else if(info == 'edit'){
          this.showxq = false
          this.showAdd = true
          this.khbModel ={
            htbh:row.htbh,
            htmc:row.htmc,
            jcrq:row.jcrq,
            sgdw:row.sgdw,
            jcr:row.jcr,
            htje:row.htje,
            fj:row.fjhj,
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
          this.uuidsID = row.id
          this.$api.getLyjcbmxByMid({id:row.id}).then(res=>{
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
        this.$nextTick(()=>{
          for (var i in addData) {
            if(addData[i].fj){
              num += parseFloat(addData[i].fj)
            }
          }
          this.khbModel.fj = num
        })

      },
      isAddShow(){
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
        this.uuidsID = this.uuid()
      },
      selectAddDialog(val){
        this.dialogVisible = false
        this.uuidsID = this.uuid()
        if(val.constructor === Object){
          this.selectAddXMMC = val
          this.khbModel.htbh = val.XMBH
          this.khbModel.htmc = val.XMMC
          this.showAdd = true

          this.$api.getOnlyXmgkjcxx({xmbh:this.khbModel.htbh}).then(res=>{
            this.fildDatas = []
            if(res.code == 1){
              this.khbModel.sgdw = res.data[0].cbdw
              this.khbModel.htje = res.data[0].htje
            }
          })
          this.$api.getXmgklyzljcByhtbh({htbh:val.XMBH}).then(res=>{
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
        }
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
            htbh, htmc, jcrq, sgdw, jcr, htje, fj, bz
          } = this.khbModel
          let arr = []
          this.addData.forEach(item=>{
            arr.push({
              fj: item.fj?Number(item.fj):0,
              id: this.uuid(),
              gcmc: item.gcmc?item.gcmc:'',
              jcnr:item.jcnr,
              jcqk:item.jcqk?item.jcqk:'',//后台没有传递过来
              memo: '', mid: self.uuidsID})
          })
          let params = {
            bz: bz,
            dwbh: '',
            dwid:'',
            dwmc:'',
            fjhj: fj?Number(fj):0,
            gcmc:'',
            gldw:'',
            htbh: htbh,
            htje: htje?Number(htje):0,
            htmc: htmc,
            id: self.uuidsID,
            jcr: jcr,
            jcrq:jcrq,
            lyjcmxb:arr,
            sgdw:sgdw,
            spzt:'',
            tbr: '',
            tbrid: '',
            tbrq: '',
            wfid:'',
            ...self.userInfo
          }
         if(htmc){
           this.$api.addLyjc2(params).then(res=>{
             if(res.code == 1){
               this.showAdd = false
               this.$message({
                 message: '添加信息成功！',
                 type: 'success'
               });
               this.queryYDJHData()
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
            sgdw: sgdw,
            fjhj: fj,
            htbh: htbh,
            htje: htje,
            htmc: htmc,
            id:id,
            jcr: jcr,
            jcrq: jcrq,
            lyjcmxb:self.addData,
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
              this.$api.deleteFilesById2({ids:id}).then(res=>{
                if(res.code == 1){

                }else{
                  this.$message({
                    message: '上传附件失败',
                    type: 'info'
                  });
                }
              })
            }


        this.$api.updateLyjc2(editParams).then(res=>{
            if(res.code == 1){
              this.queryYDJHData()
              this.showAdd = false
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
            this.khbModel.htje = res.data[0].htje? res.data[0].htje:0
          }
        })
        this.$api.getXmgklyzljcByhtbh({htbh:item.XMBH}).then(res=>{
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

      addReturn(bol){
          this.showAdd = false
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
      initqueryXMMC(){

        this.$api.getmcbhList().then(res=>{

          if(res.code == 1){
            console.log(res,'==res')
            this.restaurants = res.data&&res.data.length?res.data:[]
            this.queryYDJHData()
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
          this.searchForm.xmbh = item.XMBH
        }
      },
      changeBZRQ(){
        let jcrq = this.khbModel.jcrq;
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
            }).then(() => {    let arr = ''
              this.delIds.forEach(item =>{

                arr += item.id+','
              })
              let obj = {
                ids:arr
              }
              if(this.delIds.length){
                this.$api.deleteLyjc2(obj).then(res=>{
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
      queryYDJHData(){
        let {bmid,orgid,yhid,userType} = this.userInfo
        console.log(userType,'===userType')
        if(userType&&userType == '供应商'){
          console.log(this.restaurants,'我是供应商')
          if(this.restaurants.length){
            console.log(this.restaurants,'==this.restaurants')
            if(this.restaurants[0].XMBH){
             console.log(this.restaurants[0].XMBH,'==this.restaurants[0].XMBH')
              this.searchForm.xmbh = this.restaurants[0].XMBH
            }
          }
        }
        let {selectDate,pageNum,pageSize,xmbh} = this.searchForm;

        let ksrq,jsrq;
        if(selectDate&&selectDate.length){
          ksrq = selectDate[0]
          jsrq = selectDate[1]
        }
        this.loading = true
        let self = this

        this.$api.getLyjcAll2({
          htbh:xmbh?xmbh:undefined,
          pageNum,pageSize,ksrq, jsrq,
          bmid:bmid,orgid:orgid,yhid:yhid
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
      this. initqueryXMMC()


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
