/**
* ----施工单位履约检查表
*/
<template>
  <div id="kgsqd" style="height: 100%"  v-loading="loading">
    <div class="header" v-if="!showDetail&&!showAdd">
      <span class="headerTit">施工单位履约检查表</span>
      <div class="header_option">
        <ul>
          <!--<li><i class="icon iconfont icon-edit1"> 编辑</i></li>-->
          <!-- <li><i class="icon iconfont icon-export"> 导出</i></li> -->
          <li @click="isAddShow"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="addContent(false)"><i class="el-icon-delete"> 删除</i></li>
        </ul>

      </div>
    </div>
    <!--查询弹框区域-->
    <div class="conter_table" v-if="!showDetail&&!showAdd">
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
            <el-button @click="searchYDJH" size="mini" style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
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
          :selectable='selectable2'
          align="center"
          width="60">
        </el-table-column>
         <el-table-column
          type="index"
          label="序号"
          align="center"
          width="60">
        </el-table-column>

        <!-- <el-table-column align="left" v-for="(tit,titIndex) in tableTits" :prop="titIndex" :label="tit" :key="titIndex" sortable show-overflow-tooltip></el-table-column> -->
        <el-table-column align="left" prop="htmc" label="项目名称" sortable show-overflow-tooltip></el-table-column>
        <!-- <el-table-column align="left" prop="htbh" label="项目编号" sortable show-overflow-tooltip></el-table-column> -->
        <el-table-column align="left" prop="sgdw" label="施工单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="gldw" label="管理单位" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="jcr" label="检查人" sortable show-overflow-tooltip width="80"></el-table-column>
        <el-table-column align="left" prop="htje" label="项目金额(元)" sortable show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="left" prop="fjhj" label="违约金合计(元)" width="130" sortable show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="jcrq" label="检查日期" sortable show-overflow-tooltip  width="100"></el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="100">
          <template scope="scope">
            <span   v-if="scope.row.state !== 1" style="color:#00a2fd;cursor: pointer;text-align: left;margin-right: 10px;"
                    @click="updateFormDia('edit',scope.row)">编辑</span>
            <span   v-if="scope.row.state !== 1" style="color:#00a2fd;cursor: pointer;text-align: left;margin-right: 10px;"
                    @click="updateFormDia('detail',scope.row)">详情</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--添加-->
    <div class="tabArea" v-if="showAdd">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild"  @click="addReturn(true)"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>施工单位履约检查表</span>
        </p>
        <div style="position:absolute;right: 10px;top: 10px;">
          <el-button size="mini"  v-if="showxq" class="minibtn" @click.native="saveAdd"
                     style="background: #DF4D4A;border-color:transparent;color: #fff;">保存</el-button>
          <el-button v-if="!showxq" size="mini" class="minibtn" @click.native="saveEdit"
                     style="background: #DF4D4A;border-color:transparent;color: #fff;">保存</el-button>
          <el-button size="mini" @click.native="showAdd = false" >取消</el-button>
        </div>
      </div>

      <div>
        <div style="padding-left: 15px;">
          <el-form :model="khbModel" :rules="jldModelRules" ref="khbModel" label-width="140px">
            <el-form-item class="addJLD" style="width: 30%;" label="项目名称" prop="htmc">
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="khbModel.htmc"
                :fetch-suggestions="querySearchMC"
                @select="addSelectMC"
                placeholder="请输入项目名称">
                <template slot-scope="{ item }">
                  <div class="name">{{ item.XMMC }}</div>
                </template>
                <i slot="suffix" @click="showDialog('add')" class="icon iconfont icon-xiangqing1"></i>
              </el-autocomplete>
            </el-form-item>

            <el-form-item class="addJLD" style="width: 30%;" label="检测日期" prop="jcrq">
              <el-date-picker
                v-model="khbModel.jcrq"
                type="date"
                size="mini"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>

            <el-form-item class="addJLD" style="width: 30%;" label="施工单位">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{khbModel.sgdw}}</label>
            </el-form-item>

            <el-form-item class="addJLD" style="width: 30%;" label="检查人">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{khbModel.jcr}}</label>
            </el-form-item>

            <el-form-item class="addJLD" style="width: 30%;" label="合同金额(万元)">
              <label style="padding-left: 1.168em;color: #606266;font-size: 13px">{{khbModel.htje}}</label>
            </el-form-item>

            <el-form-item class="addJLD" style="width: 30%;" label="违约罚金合计(元)">
              <el-input :disabled="true"  size="mini" v-model="khbModel.fjhj"></el-input>
            </el-form-item>

            <div style="width: 81%;">
              <el-form-item class="addJLD-textarea" label="备注">
                <el-input type="textarea" v-model="khbModel.bz"
                          style="width: 100%;display: block;"></el-input>
              </el-form-item>
            </div>

            <el-form-item class="addJLD" style="width: 30%;" label="附件">
              <el-upload
                :action="$api.uploadFiles"
                multiple
                ref="uploada"
                :fileList="fileList"
                :on-success="handleUploadFile"
                :on-preview="preview"
                :on-remove="removeFile">
                <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
            </el-form-item>
          </el-form>
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
          <el-table-column align="left"  label="工程名称" prop="gcmc"  show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="jcnr" label="考核内容"> </el-table-column>
          <el-table-column align="left" label="工程考核情况">
            <template slot-scope="scope">
              <el-input style="padding-left: 8px" v-model="addData[scope.$index].jcqk" size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="left"  label="罚金(元)"   show-overflow-tooltip>
            <template slot-scope="scope">
              <input style="padding-left: 8px" type="number" @keyup="changeFj" v-model.number="addData[scope.$index].fj" size="mini"/>
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
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild"  @click="promiseTG('close')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>施工单位履约检查表</span>
        </p>
      </div>
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
        <el-table-column align="left"   prop="gcmc" label="工程名称"   show-overflow-tooltip></el-table-column>
        <el-table-column align="left"   prop="jcnr" label="考核内容"   show-overflow-tooltip></el-table-column>
        <el-table-column align="left"   prop="jcqk" label="工程考核情况"   show-overflow-tooltip></el-table-column>
        <el-table-column align="left"   prop="fj" label="罚金(元)"   show-overflow-tooltip></el-table-column>
      </el-table>
      <div style="margin-top: 20px;display: inline-block;margin-left: 13px;">
        <span>文件列表 ：</span>
        <span>
          <ul class="fjlist" style="margin-left: 75px; margin-top: -25px;">
            <li class="file_li" :key="index" v-for="(file, index) in fileList" @click="openFile(file)">
              <a><i aria-hidden="true"></i>{{file.name}}</a>
            </li>
          </ul>
        </span>
      </div>
      <div style="float: right;padding-right: 20px;margin-top: 20px">
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
        fildDatas:[],
        dialogData:[ ],
        dialogTableTit:{
          XMMC:'项目名称',XMBH:'项目编号',
        },
        datatypes:'',
        dialogVisible:false,
        restaurants:[ ],
        // zll
        xmmcarr: [],
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
          htbh:'',
          htmc:'',
          jcrq:'',
          sgdw:'',
          jcr:'',
          htje:'',
          fjhj:'',
          bz:'',
        },
        searchInputVal:'',
        tableTits:{htbh:'项目编号',jcrq:'检查日期',htmc:'项目名称',sgdw:'施工单位',
          gldw:'管理单位',jcr:'检查人',htje:'合同金额',fjhj:'违约金合计',bz:'备注'},
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
          xmmc: '',
          xmbh: '',
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
        userInfo:{
          orgbh:undefined,
          gldwid:undefined,
          orgmc:undefined,
          bmbh:undefined,
          bmid:undefined,
          bmmc:undefined,
          yhbm:undefined,
          yhid:undefined,
          yhmc:undefined,
        },
        defaultHtbh: '', // 外协单位默认的合同编号
        defaultHtmc: '', // 外协单位默认的合同名称
        outside: true,
        jldModelRules: {
          htmc: [
            {required: true, message: '请选择项目名称', trigger: 'change'}
          ],
          jcrq: [
            {type: 'string', required: true, message: '请选择日期', trigger: 'change'}
          ]
        },
        files: [],
        fileList: []
      }
    },
    methods: {
      // 编辑 详情
      updateFormDia (info,row) {
        let self = this
        if(info == 'detail'){
          this.showDetail = !this.showDetail
          this.detailName  = row.htmc
          this.currentMonthData = [ ]
          this.khr = row.jcr
          this.khrq = row.jcrq
          this.currentMonthData = row.lyjcmxb
          // 获取附件信息
          this.getFilesDataById(row.id)
        }
        else if(info == 'edit'){
          self.fildDatas = []
          this.showxq = false
          this.showAdd = true
          //再次查询一遍ID

          this.khbModel ={
            htbh:row.htbh,
            htmc:row.htmc,
            jcrq:row.jcrq,
            sgdw:row.sgdw,
            jcr:row.jcr,
            htje:row.htje,
            fjhj:row.fjhj,
            bz:row.bz,
            id:row.id
          }
          this.addData = row.lyjcmxb
          this.uuidsID = row.id
          // 获取附件信息
          this.getFilesDataById(row.id)
        }
      },
      saveAdd(){
          let self = this
          self.uuidsID = this.uuid()
          let {
            htbh, htmc, jcrq, sgdw, jcr, htje, fjhj, bz
          } = this.khbModel
          let arr = []
          let randomID = this.uuidsID

        // 有附件，保存文件信息
        if (this.files.length > 0) {
          this.saveFileData(randomID)
        }

          this.addData.forEach(item=>{
            arr.push({
              bh:'',
              fj: item.fj?Number(item.fj):0,
              gcmc: item.gcmc?item.gcmc:'',
              id: '',
              jcnr:item.jcnr,
              jcqk:item.jcqk?item.jcqk:'',
              memo: '', mid: randomID})
          })
          let params = {
            bmbh:'',
            bmid: '',
            bmmc: '',
            dwbh: '',
            dwid:'',
            dwmc:'',
            fjhj: fjhj?Number(fjhj):0,
            // gcmc:'',
            gldw:self.userInfo.orgmc,
            htbh,jcrq,htmc,sgdw,jcr, bz,
            htje: htje?Number(htje):0,
            id: randomID,
            lyjcmxb:arr,
            spzt:'',
            tbr: '',
            tbrid: '',
            tbrq: '',
            wfid:'',
            ...self.userInfo
          }
          if(htmc){
            this.$api.zxaddLyjc(params).then(res=>{
              if(res.code == 1){
                this.showAdd = false
                this.queryYDJHData()
                this.$message({
                  message: '添加信息成功！',
                  type: 'success'
                })
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
          let {bz,fjhj,htbh,htje,htmc,jcr,jcrq,sgdw,id} = this.khbModel
          let editParams =   {
            bmbh: '',
            bmid: '',
            bmmc:'',
            dwbh:'',
            dwid:'',
            dwmc: '',
            gldw:'',
            spzt: '',
            tbr: '',
            tbrid: '',
            tbrq: '',
            wfid: '',
            bz: bz,
            sgdw: sgdw,
            fjhj: fjhj,
            htbh: htbh,
            htje: htje,
            htmc: htmc,
            id:id,
            jcr: jcr,
            jcrq: jcrq,
            lyjcmxb:self.addData,
          }

        // 有附件，保存文件信息
        if (this.files.length > 0) {
          this.saveFileData(id)
        } else { // 无附件，调用删除接口
          this.deleteFilesData(id)
        }

          this.$api.zxupdateLyjc(editParams).then(res=>{
            if(res.code == 1){
              this.queryYDJHData()
              this.showAdd = false
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
      selectAddDialog(val){
        this.dialogVisible = false
        this.khbModel.jcr = this.userInfo.yhmc
        this.uuidsID = this.uuid()
        if (val) {
          if(val.constructor === Object){
            this.selectAddXMMC = val
            this.khbModel.htbh = val.XMBH
            this.khbModel.htmc = val.XMMC
            this.showAdd = true
            this.$api.getOnlyXmgkjcxx({xmbh:val.XMBH}).then(res=>{
              this.fildDatas = []
              if(res.code === 1){
                this.khbModel.sgdw = res.data[0].cbdw
                this.khbModel.htje = res.data[0].htje
              }
            })
            this.$api.getXmgklyzljcByhtbh({htbh:val.XMBH}).then(res=>{
              this.addData = []
              if(res.code == 1){
                let datas = res.data
                datas.forEach(item=>{
                  this.addData.push({
                    gcmc:item.gcxm,
                    jcnr:item.khnr
                  })
                })
              }
            })
          }
        }
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
        this.$api.getXmgklyzljcByhtbh({htbh:item.XMBH}).then(res=>{
          this.addData = []
          if(res.code == 1){
            let datas = res.data
            datas.forEach(item=>{
              this.addData.push({
                gcmc:item.gcxm,
                jcnr:item.khnr
              })
            })
          }
        })
      },
      isAddShow(){
        this.fileList = []
        this.showAdd = true
        this.showxq = true
        this.addData = []
        this.khbModel = {
          khqkModel:'', khnrModel:'', khrModel:'', khrqModel:'',
          htbh:'', htmc:'', jcrq:'', sgdw:'', jcr:'', htje:'',
          fjhj:'', bz:'',
        }
        let myDate = new Date()
        this.khbModel.jcrq = myDate.getFullYear()+'-'+ (myDate.getMonth()+1) + '-' +myDate.getDate()
        this.khbModel.yd = myDate.getFullYear()+'-'+ (myDate.getMonth()+1)
        this.khbModel.jcr = this.userInfo.yhmc;
      },
      changeFj(val){
        let {addData} = this
        let num = 0
        for (var i in addData) {
          if(addData[i].fj){
            num += parseFloat(addData[i].fj)
          }
        }
        this.khbModel.fjhj = num.toString()
      },
      addReturn(bol){
            this.showAdd = false
      },
      uuid(){
        let str = (((1+Math.random())*0x10000)|0).toString(16).substring(1)
        return (str+str+"-"+str+"-"+str+"-"+str+"-"+str+str+str);
      },
      handleRemove(file, fileList){
        this.fildDatas = fileList
      },
      handHttpRequest(files){
        let fm = new FormData();
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
                this.userInfo.gldwid = org.orgId
                this.userInfo.orgmc = org.orgName
              }
            }
          }

        }
      },
      createFilter(queryString,val) {
        return (restaurant) => {
          return (restaurant[val].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      initqueryXMMC(){
        this.$api.getmcbhList().then(res=>{
          if(res.code == 1){
            this.restaurants = res.data&&res.data.length?res.data:[]
          }else{
            this.restaurants = []
          }
          this.queryYDJHData()
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
      // zll
      // 项目名称下拉列表

      getXmmcarr () {
        this.$api.getXmmcList().then(res => {
          if (res.status !== 200) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            this.xmmcarr = res.data.data
          }
        }).catch()
      },
      selectionChange(selection){
        this.delIds = selection
      },

      handleChange(file, fileList){

        // this.fileList4 = fileList.slice(-3);
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
        this.searchForm.xmbh = this.defaultHtbh
        this.searchForm.htmc = this.defaultHtmc
        this.searchForm.sjdh = undefined
        this.searchForm.lxmc = undefined
        this.searchForm.selectDate = undefined
        this.searchForm.pageNum = 1

        this.queryYDJHData()
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
              this.$api.zxdeleteLyjc(obj).then(res=>{
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
        let {bmid,yhid,userType,gldwid} = this.userInfo
        let {htmc,selectDate,pageNum,pageSize,xmbh} = this.searchForm;
        let ksrq,jsrq;
        if(selectDate&&selectDate.length){
          ksrq = selectDate[0]
          jsrq = selectDate[1]
        }
        this.loading = true
        let self = this
        this.$api.lyjcgetLyjc({
          htbh:xmbh?xmbh.trim():undefined, ksrq, jsrq,
          pageNum,pageSize,
          // bmid:bmid,
          gldwid:gldwid
          // yhid:yhid
        }).then(res=>{
          this.loading = false
          if(res.code == 1){
            this.YDJHData = res.data.list
            this.total = res.data.total
          }
        }).catch(res=>{
          this.loading = false
        })
      },
      // 处理文件上传成功后的数据
      handleUploadFile (res, file, files) {
        if (res.code === 1) {
          this.files = files
        }
      },
      // 文件预览
      preview (file) {
        if(file.response) {
          let url = file.response.data.file_path
          window.open(url)
        } else {
          let url = file.url
          window.open(url)
        }
      },
      // 保存文件数据
      saveFileData (uuid) {
        // 处理文件数据
        let filesData = []
        this.files.forEach(item => {
          let file = {}
          let data = item.response.data
          file.file_yname = data.file_yname
          file.file_path = data.file_path
          file.file_depict = data.file_depict
          file.file_date = data.file_date
          file.file_status = data.file_status
          file.file_type = data.file_type
          file.file_name = data.file_name
          file.file_mjlx = data.file_mjlx
          file.id = data.id
          file.file_dx = data.file_dx
          file.file_remarks = data.remarks
          file.file_id = uuid
          filesData.push(file)
        })
        this.$api.addFileData(filesData).then(res => {
          if (res.data.code !== 1) {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })
      },
      /**
       * 根据UUID删除附件
       * @param id UUID
       */
      deleteFilesData (id) {
        this.$api.deleteFilesById('?ids=' + id).then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: res.data.data,
              type: 'message'
            })
          }
        })
      },
      // 通过ID获取文件信息
      getFilesDataById (id) {
        this.fileList = []
        this.files = []
        // 获取文件信息
        this.$api.getFilesDataById('?id=' + id).then(res => {
          if (res.data.code === 1) {
            if (res.data.data.length > 0) {
              res.data.data.forEach(item => {
                let file = {
                  status: 'success',
                  name: item.file_yname,
                  url: item.file_path,
                  response: {
                    data: item
                  }
                }
                this.files.push(file)
                this.fileList.push(file)
              })
            }
          }
        })
      },
      // 详情页面打开附件
      openFile(item){
        window.open(item.url)
      },
      // 处理移除附件的逻辑
      removeFile(file,fileList){
        this.files = fileList
      }
    },
    mounted () {
      this.initUser()
      // 当前登录为外协单位时，获取合同编号，默认取第一个
      if (this.userInfo.userType === '供应商') {
        this.outside = true
        this.$api.getXmListBySpk().then(res => {
          if (res.code === 1) {
            let data = res.data
            if (data.length > 0) {
              this.defaultHtbh = data[0].XMBH
              this.defaultHtmc = data[0].XMMC
              this.searchForm.xmbh = this.defaultHtbh
              this.searchForm.htmc = this.defaultHtmc
              this.initqueryXMMC()
            }
          }
        })
      } else {
        this.outside = false
        this.initqueryXMMC()
      }
      this.getXmmcarr()
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
      input{
        width: 100%;
        height: 36px;
        border: 0;
      }
    }
  }
  .bottomAdd{
    position: relative;

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

  .fjlist{
    li{
      list-style: none;
      border: none;
      height: 32px;
      line-height: 32px;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &:hover{
        background: #D5D6D7;
      }
      i{
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
</style>
