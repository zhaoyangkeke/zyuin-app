/**
* ----工程计量单
*/
<template>
  <div id="kgsqd" style="height: 100%" >
    <div class="header">
      <span class="headerTit">工程计量单 </span>
      <div class="header_option">
        <ul>

          <!--<li><i class="el-icon-search"> 查询</i></li>-->
          <!--<li><i class="icon iconfont icon-export"> 导出</i></li>-->
          <li @click="updateFormDia('add');isxmmcOfadd = 1"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="delContent(false)"><i class="el-icon-delete"> 删除</i></li>
        </ul>

      </div>
    </div>
    <!--查询弹框区域-->
    <div class="conter_table">
      <!--查询信息-->
      <div class="chaxun">
        <el-form  :inline="true"  style="display: inline-block;" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">

            <el-form-item class="" label="项目名称" prop="htbh">
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="searchForm.xmmc"
                :fetch-suggestions="querySearchMC"
                @select="handleSelectMC($event,1)"
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
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-form-item>

          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button @click="searchYDJH" size="mini"  style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button @click.native="resizeSearch" size="mini">重置</el-button>
          </el-form-item>

        </el-form>
      </div>
      <el-table  :data="YDJHData" tooltip-effect="dark"
                 style="width: calc(100% - 19px);"
                 row-class-name="row_class"
                 @selection-change="selectZB"
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
        <el-table-column align="left" sortable v-for="(tit,titIndex) in tableTits" :prop="titIndex" :label="tit" :key="titIndex"> </el-table-column>
        <el-table-column align="left" sortable label="状态">
          <template slot-scope="{row,$index}">
            <span v-if="row.zt == 1">已计量</span>
            <span v-if="row.zt == 1.1">审批中</span>
            <span v-if="row.zt == 2">已审核</span>
            <span v-if="row.zt == 3">已汇总</span>
            <span v-if="row.zt == 4">已支付</span>
          </template>
        </el-table-column>
        <el-table-column align="left" sortable  prop="rq" label="填报日期"> </el-table-column>

        <el-table-column align="left" class-name="column-caoz" label="操作">
          <template scope="scope">
            <span    style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="updateFormDia('detail',scope.row)">详情</span>
            <span  style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="updateFormDia('edit',scope.row);isxmmcOfadd = 1">编辑</span>
            <span   v-if="scope.row.zt ==1" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="updateFormDia('sp',scope.row)">提交</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页区域-->
    <footer class="footer">
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
          <span class="titleclasschild"  @click="promiseTG(true);isxmmcOfadd = 0"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span v-show="showPlan" >{{firstItemTit}}</span>
        </p>
        <div class="SPState" v-if="showStyle">
          <el-button size="mini" v-if="showStyle" style="display:block;margin: auto;background-color: #DF4D4A;border-color:transparent;color: #fff" @click="addSave();isxmmcOfadd = 0">保存</el-button>
        </div>
      </div>
      <!--详情-->
      <div style="padding-left: 15px;font-size: 0;"  v-show="!showFirstItemWindow">
        <p class="addJLD">
          <span class="addJLD_tit">单据编号 ：</span>
          <el-input size="mini" v-if="showStyle" v-model="detailList.djbh" :disabled="true"  placeholder="请输入内容"></el-input>
          <span v-else>{{detailList.djbh}}</span>
        </p>
        <p class="addJLD">
          <span class="addJLD_tit">项目名称 ：</span>
          <el-autocomplete
            v-if="showStyle"
            class="inline-input"
            size="mini"
            v-model="jldModel.xmmc"
            :fetch-suggestions="querySearchMC"
            @select="handleSelectMC($event, 0)"
            placeholder="请输入项目名称"
          >
            <template slot-scope="{ item }">
              <div class="name">{{ item.XMMC }}</div>
            </template>
            <i slot="suffix" @click="showDialog('mc')" class="icon iconfont icon-xiangqing1"></i>
          </el-autocomplete>
          <span v-else>{{detailList.htmc}}</span>
        </p>
        <p class="addJLD">
          <span class="addJLD_tit">支付项目编号 ：</span>
          <el-input size="mini" v-if="showStyle" v-model="detailList.zfxmbh"  placeholder="请输入内容"></el-input>
          <span v-else>{{detailList.zfxmbh}}</span>
        </p>

        <p class="addJLD">
          <span class="addJLD_tit">支付项目名称 ：</span>
          <el-input size="mini" v-if="showStyle" v-model="detailList.zfxmmc"  placeholder="请输入内容"></el-input>
          <span v-else>{{detailList.zfxmmc}}</span>
        </p>
        <p class="addJLD">
          <span class="addJLD_tit">起止桩号 ：</span>
          <el-input size="mini" v-if="showStyle" v-model="detailList.qzzh"  placeholder="请输入内容"></el-input>
          <span v-else>{{detailList.qzzh}}</span>
        </p>
        <p class="addJLD">
          <span class="addJLD_tit">部位 ：</span>
          <el-input size="mini" v-if="showStyle" v-model="detailList.bw"  placeholder="请输入内容"></el-input>
          <span v-else>{{detailList.bw}}</span>
        </p>
        <p class="addJLD">
          <span class="addJLD_tit">图号 ：</span>
          <el-input size="mini" v-if="showStyle" v-model="detailList.th"  placeholder="请输入内容"></el-input>
          <span v-else>{{detailList.th}}</span>
        </p>
        <p class="addJLD">
          <span class="addJLD_tit">质检单编号 ：</span>
          <el-input size="mini" v-if="showStyle" v-model="detailList.zjdbh"  placeholder="请输入内容"></el-input>
          <span v-else>{{detailList.zjdbh}}</span>
        </p>
        <p class="addJLD">
          <span class="addJLD_tit">承包单位 ：</span>
          <el-input size="mini" v-if="showStyle" v-model="detailList.dwmc"  :disabled="true"  placeholder="请输入内容"></el-input>
          <span v-else>{{detailList.dwmc}}</span>
        </p>
        <p class="addJLD">
          <span class="addJLD_tit">编制日期 ：</span>
          <el-date-picker
            size="mini"
            v-if="showStyle"
            v-model="detailList.rq"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
          <span v-else>{{detailList.rq}}</span>
        </p>
      </div>
      <div class="middleInput" style="font-size: 13px;">
        <p style="width:50%;margin-bottom: 10px;">
          <span class="addJLD_tit" style="display: inline-block;vertical-align: top;width: 100px">计算式及简图 ：</span>
          <textarea  v-if="showStyle" v-model="detailList.jtsm" class="textArea" style="" rows="3"  placeholder="请输入内容"></textarea>
          <span v-if="!showStyle" >{{detailList.jtsm}}</span>
        </p>
        <p class="upImg" v-if="!showStyle" style="margin-bottom: 20px;">
          <span>图片 ：</span>
          <img style="width: 75px;vertical-align: middle" v-for="(imgS,index) in currentImage" :src="imgS.file_path" :key="index" :alt="imgS.file_yname">
        </p>
        <p v-if="showStyle" style="display: inline-block;margin-bottom: 20px;" class="upImg">
          上传图片 ：
          <el-upload
            action="111"
            multiple
            list-type="picture-card"
            :limit="2"
            :file-list="imgFileData"
            :on-remove="imgfileRemove"
            :http-request="upImgHand"
            class="updateImg">
            <i class="el-icon-plus"></i>
          </el-upload>
        </p>
      </div>
      <div style="padding-left: 15px;font-size: 0;" >
        <p class="addJLD">
          <span class="addJLD_tit">承包人 ：</span>
          <el-input size="mini" v-if="showStyle" v-model="detailList.cbr"  placeholder="请输入内容"></el-input>
          <span v-else>{{detailList.cbr}}</span>
        </p>
        <p class="addJLD">
          <span class="addJLD_tit">监理 ：</span>
          <el-input size="mini" v-if="showStyle" v-model="detailList.jl"  placeholder="请输入内容"></el-input>
          <span v-else>{{detailList.jl}}</span>
        </p>
        <p class="addJLD">
          <span class="addJLD_tit">工程技术部 ：</span>
          <el-input size="mini" v-if="showStyle" v-model="detailList.gcjsfzr"  placeholder="请输入内容"></el-input>
          <span v-else>{{detailList.gcjsfzr}}</span>
        </p>
        <p class="addJLD">
          <span class="addJLD_tit">经营发展部 ：</span>
          <el-input size="mini" v-if="showStyle" v-model="detailList.jyfzfzr"  placeholder="请输入内容"></el-input>
          <span v-else>{{detailList.jyfzfzr}}</span>
        </p>
        <p class="addJLD" v-if="showTgld">
          <span class="addJLD_tit">是否为托管单位 ：</span>
          <el-select  v-if="showStyle" size="mini" v-model="detailList.sfwtgld" placeholder="请选择">
            <el-option
              label="是"
              value="是">
            </el-option>
            <el-option
              label="否"
              value="否">
            </el-option>
          </el-select>

          <span v-else>{{detailList.sfwtgld}}</span>
        </p>
        <div v-if="!showStyle" style="margin-top: 20px;font-size: 13px">
          <span>文件列表 ：</span>
          <a v-for="(files,index) in currentFils" target="_blank" :key="index" :href="files.file_path">{{files.file_yname}}</a>
        </div>

        <div style="font-size: 13px" v-if="showStyle" >
          <el-upload
            action="111"
            :file-list="FileupData"
            :on-remove="fileRemove"
            :http-request="handHttpRequest"
            class="uploadFiles"
            multiple
            :limit="3">
            <el-button size="small" type="primary">上传附件 ：</el-button>
          </el-upload>
        </div>
      </div>
      <div v-if="showStyle">
        <div style="width: calc(100% + 17px);margin-left: -17px;margin-right: 0px;padding-left: 0px; padding-right: 0px;height:4px;background-color: #c0cad6;"></div>
        <div class="header" style="width: calc(100% + 16px);margin-left: -16px;height: 36px;line-height: 36px;padding-top: 0px;">
          <span class="headerTit" style="text-align: left;">任务单</span>
          <el-button size="mini" @click="handOneRowSecod(true)" style="background-color: #DF4D4A;border-color: transparent;color: #fff;float: right;margin-top: 3px;" class="dialog-button bao_cun">
            <i style="color: #fff;" class="icon iconfont icon-past"></i>
            添加任务单
          </el-button>
        </div>
        <el-table  :data="selectMxList" tooltip-effect="dark"
                  style="width: 95%;margin: 20px auto"
                  row-class-name="row_class"
                  border>
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column align="center" sortable label="子目编号"  show-overflow-tooltip>
            <template slot-scope="{row,$index}">
               <span>{{row.zmbh?row.zmbh:row.zmh}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" sortable  prop="zmmc" label="子目名称" show-overflow-tooltip> </el-table-column>
          <el-table-column align="center" sortable  prop="dw" label="单位"> </el-table-column>
          <el-table-column align="center" sortable  prop="sl" label="数量">
            <template slot-scope="{row,$index}">
              <span>{{row.sl?row.sl:row.wcsl}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
       <!--二层弹窗-->
      <div class="tabArea" v-show="showFirstItemWindow" >
        <div style="position:relative;">
          <p class="tabAreaTit">
            <span class="titleclasschild"  @click="promiseTG(false)"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
            <span v-show="showPlan" >{{firstItemTit}}</span>
          </p>
          <div class="SPState" >
            <el-button size="mini" style="display:block;margin: auto;background-color: #DF4D4A;border-color:transparent;color: #fff" @click="showFirstItemWindow = false">
              <i style="color:#fff;" class="icon iconfont icon-past"></i>保存
            </el-button>
          </div>
        </div>
        <el-table v-if="showFirstItemWindow&&showStyle"  :data="detailItemInfo" tooltip-effect="dark"
                  ref="multipleTable"
                  style="width: calc(100% - 23px);max-height: 250px;overflow-y: auto"
                  row-class-name="row_class"
                  @selection-change="handleSelectionChange"
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

          <el-table-column align="left" prop="xmbh" label="项目编号" show-overflow-tooltip> </el-table-column>
          <el-table-column align="left" prop="xmmc" label="项目名称" show-overflow-tooltip> </el-table-column>
          <el-table-column align="left" prop="bhlx" label="病害类型" show-overflow-tooltip> </el-table-column>
          <el-table-column align="left" prop="yd" label="月度" show-overflow-tooltip> </el-table-column>
        </el-table>
        <el-table v-if="showFirstItemWindow&&!showStyle"  :data="detailItemInfo" tooltip-effect="dark"
                  style="width: calc(100% - 23px);max-height: 250px;overflow-y: auto"
                  row-class-name="row_class"
                  @selection-change="handleSelectionChange"
                  border>
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column align="left" prop="zmmc" label="子目名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column align="left" prop="zmh" label="子目号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column align="left" prop="dw" label="单位" show-overflow-tooltip>
          </el-table-column>
          <el-table-column align="left" prop="wcsl" label="数量" show-overflow-tooltip>

          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :visible.sync="showUp" size="tiny">
      <div style="width: 100%">
        <img style="width: 100%" :src="dialogImageUrl" alt="">
      </div>

    </el-dialog>
    <Dialog :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :dialogVisible="dialogVisible"
            @searchXMMC="searchXMMC"
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
        imgFileData:[],
        imgFileData2:[],

        FileupData:[],

        isxmmcOfadd: 0,
        rowobj: {},
        isAdd:false,
        selectMxList:[],
        showUp:false,
        dialogData: [],
        dialogTableTit:{
          XMMC:'项目名称',XMBH:'项目编号',
        },
        datatypes:'',
        restaurants:[],
        //me
        zbzt:['已计量','已审核','已汇总','已支付',],
        currentFils:[],
        currentImage:[],
        fildDatas:[],
        uuidsID:'',
        showTgld:false,
        detailList:{rq:'',sfwtgld:'否'},
        zbSelect:null,
        xmbhList:[],
        showStyle:false,
        fileList4: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }],

        fileList3: [],
        dialogImageUrl: '',
        dialogVisible: false,

        jldModel:{
          zfzmh:'',
          zmmc:'',
          qzzh:'',
          bw:'',
          th:'',
          zjdbh:'',
          xmmc:'',
          cbdw:'',
          jssjjt:'',
          cbr:'',
          jl:'',
          gcjsb:'',
          jyfzb:'',

          djbh:'',
          htbh:'',

          bzrq:'',
        },
        BasicInfo:{
          zfzmh:'支付子目号:',
          zmmc:'子目名称:',
          qzzh:'起止桩号:',
          bw:'部位:',
          th:'图号:',
          zjdbh:'质检单编号:',
          cbdw:'承包单位:',
        },
        searchInputVal:'',
        tableTits:{
          zfxmbh:'支付子目号',
          zfxmmc:'子目名称',
          qzzh:'起止桩号',
          bw:'部位',
          th:'图号',
          zjdbh:'质检单编号',
          dwmc:'承包单位',
          cbr:'承包人',
        },
        FinsdetailTit:{xmbh:'项目编号',xmmc:'项目名称',wcsj:'完成时间',bz:'备注',},
        stateList:[
          {name:'全部',val:undefined},
          {name:'编制中',val:'1'},
          {name:'工程技术部审核',val:'2'},
          {name:'经营发展部审核',val:'3'},
          {name:'公司分管领导审核',val:'4'},
          {name:'公司领导审批',val:'5'},
          {name:'审批完成',val:'6'},
        ],

        total:0,
        state:['','编制中','工程技术部审核','经营发展部审核','公司分管领导审核','公司领导审批','审批完成'],
        showFirstItemWindow:false,
        firstItemTit:'工程计量单',
        showPlan:false,
        searchForm:{
          xmmc:undefined,
          xmbh:undefined,
          zfqh:undefined,
          selectDate:null,
          pageNum:1,
          pageSize:10
        },
        YDJHData:[ ],
        detailItemInfo:[],//本月完成情况详情数据
        showDetail:false,
        mxList:[],
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
      // 编辑 详情  本月完成情况 下月计划
      updateFormDia (type,row) {
        let {yhmc,yhid,bmmc,orgmc} = config.userInfo
       if(row){
         this.rowobj = row
         this.uuidsID = row.id
       }
        this.firstItemTit = '工程计量单'
        if(type == 'add'){
          this.getYear()
          this.isAdd = true
          this.showDetail = true
          this.showStyle = true
          this.selectMxList = []
          this.detailList.djbh = 'djbh' +  Date.now()
          let {orgbh,orgid,orgmc,bmbh,bmid,bmmc,yhbm,yhid,yhmc} = this.userInfo
          this.detailList.cbr = yhmc
        }
        else if(type == 'detail'){
          this.detailItemInfo = row.mxList
          this.showStyle = false
          this.showDetail = !this.showDetail
          this.detailList = row
          this.currentImage = []
          this.currentFils = []


          this.$api.getFilesDataById2({id:row.id}).then(res=>{
            if(res.code == 1){
              let datas = res.data
              datas.forEach(item =>{
                if(item.file_mjlx== '3301'){
                  this.currentImage.push(item)
                }else{
                  this.currentFils.push(item)
                }
              })
            }
          })
        }
        else if(type == 'edit'){
          this.isAdd = false

          this.selectMxList = row.mxList
          this.detailItemInfo = row.mxList
          this.showDetail = !this.showDetail
          this.showStyle = true
          this.detailList = row
          this.imgFileData = []
          this.FileupData = []
          this.$api.getFilesDataById2({id:row.id}).then(res=>{
            if(res.code == 1){
              let datas = res.data
              datas.forEach(item =>{
                if(item.file_mjlx== '3301'){
                  this.imgFileData.push(item)
                }else{
                  item.name =  item.file_yname
                  this.FileupData.push(item)

                }
              })
            }
          })
        }
        else if(type == 'sp'){

          this.$confirm('是否提交审批?',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.createWorkFlow({
              pc_initiator:yhmc,
              pc_initiatorid: yhid,
              pc_name: '07',
              pc_project_id: row.id,
              pc_remarks: '',
              pc_state: '',
            },{
              group:bmmc,
              org:orgmc}).then(resp=>{
                if(resp.code == 1){
                  this.$api.updateRcyhGcjldZtByGcjlId({id:row.id,zt:'1.1'})
                    .then(res=>{
                      if(res.code == 1){
                        this.queryYDJHData()
                        this.$message({
                          type: 'success',
                          message: '提交成功!'
                        });
                      }else{
                        this.$message({
                          type: 'info',
                          message: '提交失败!'
                        });
                      }
                    })
                  // this.enterworkFlow(this.rowobj)
                }else{
                  this.$message({
                    type: 'warning',
                    message: resp.msg
                  });
                }
            })

          })
            .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交审批'
            });
          });

        }

        this.showPlan = true
      },
      addSave(){


        // let {zfzmh,zmmc,qzzh,bw,th,zjdbh ,jssjjt,cbr,jl,gcjsb,jyfzb,djbh,bzrq,xmmc}  = this.jldModel
        if(this.isAdd){
          let {zfxmbh,bw,th,zjdbh,dwmc,htmc,djbh,htbh,rq,jtsm,cbr,jl,gcjsfzr,jyfzfzr, zfxmmc,qzzh,sfwtgld}  = this.detailList

          if(this.imgFileData.length||this.FileupData.length){
            let fildDatas = this.imgFileData.concat(this.FileupData)
            this.$api.addFileData(fildDatas).then(res=>{
              if(res.data.code == 1){
              }else{
                this.$message({
                  message: '图片上传失败',
                  type: 'info'
                });
              }
            })
          }
          let {mxList} = this
          let strIds = ''
          let mxListArr = []

          mxList.forEach(item =>{
            strIds+=item.id+','
            item.wcrwdZbList.forEach(ZbList=>{
              mxListArr.push({
                dw:ZbList.dw,
                htbh:item.xmmc,
                wcsl:ZbList.sl,
                zmh:ZbList.zmbh,
                zmid:ZbList.zmid,
                zmmc:ZbList.zmmc
              })
            })
          })

          if(mxListArr.length){
            let {orgbh,orgid,orgmc,bmbh,bmid,bmmc,yhbm,yhid,yhmc} = this.userInfo

            this.$api.insertRcyhGcjld(
              {
                id:this.uuidsID,bw, cbr,djbh,dwmc:dwmc?dwmc:'',gcjsfzr:gcjsfzr,htbh:htbh,jl,jtsm:jtsm,jyfzfzr:jyfzfzr,qzzh,rq:rq,
                sjqdIds:strIds, th,zfxmbh:zfxmbh, zfxmmc:zfxmmc,zjdbh,htmc:this.jldModel.xmmc,
                sfwtgld:sfwtgld,
                mxList:mxListArr,
                daBmbm:bmbh ,
                daBmid:bmid ,
                daBmmc:bmmc ,
                daYhbm: yhbm,
                daYhid:yhid ,
                daYhmc: yhmc,
                daZzbh:orgbh ,
                daZzid:orgid ,
                daZzmc:orgmc ,

              }
            ).then(res=>{
              if(res.code == 1){
                this.mxList = []

                this.$message({
                  message: '添加信息成功！',
                  type: 'success'
                });
                this.queryYDJHData()
              }else{
                this.mxList = []
                this.$message({
                  message: '添加信息失败！',
                  type: 'info'
                });
              }
              this.showDetail = false
            })
          }else{
            this.$message({
              message: '请先选择添加任务单！',
              type: 'info'
            });
          }
        }
        else{
          let idStr = ''
          if(this.imgFileData.length||this.FileupData.length){
            let fildDatas = this.imgFileData.concat(this.FileupData)
            this.$api.addFileData(fildDatas).then(res=>{
              this.imgFileData = []
              this.FileupData = []
              if(res.data.code == 1){
              }else{
                this.$message({
                  message: '图片上传失败',
                  type: 'info'
                });
              }
            })
          }else{
            this.$api.deleteFilesById2({ids:this.uuidsID}).then(res=>{
              if(res.code == 1){

              }else{
                this.$message({
                  message: '图片上传失败',
                  type: 'info'
                });
              }
            })
          }
          if( this.mxList.length){
            this.mxList.forEach(item=>{
              idStr +=item.id+','
            })
            this.detailList.sjqdIds = idStr.substring(0,idStr.length-1)
          }

          this.$api.updateRcyhGcjld(this.detailList).then(res=>{
            this.showDetail = false
            if(res.code == 1){
              this.$message({
                message: '编辑信息成功！',
                type: 'success'
              });
            }else{
              this.$message({
                message: '编辑信息失败！',
                type: 'error'
              });
            }
          })
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
      handleSelectMC(event,param){

        if (param == 1) {
          this.searchForm.xmbh = event.XMBH
          this.searchForm.xmmc = event.XMMC
        } else {

          this.jldModel.xmmc = event.XMMC
          this.detailList.qzzh = event.QSZH
          this.detailList.sfwtgld = event.SFWTGLD
          this.showTgld = event.SFWTGLD === '是'?true:false
          // this.jldModel.xmbh = event.XMBH
          if (event) {
            this.getOnlyXmgkjcxx(event)
          }
        }

      },
      // 切换项目名称带出其他信息
      getOnlyXmgkjcxx (val) {

        this.detailList.dwmc = val.CBDW
        this.detailList.htbh = val.XMBH
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
      closeDialog(val){
        this.dialogVisible = false
        if(val){
          if (this.isxmmcOfadd == 1) {
            this.getOnlyXmgkjcxx(val)
          } else {

            this.searchForm.xmmc = val.XMMC
            this.searchForm.xmbh = val.XMBH
          }
        }

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
      getYear () {
        let now = new Date()
        let year = now.getFullYear() //年
        let month = now.getMonth() + 1 //月
        let day = now.getDate() //日
        let clock = year + "-"
        if(month < 10)
          clock += "0"
        clock += month + "-"
        if(day < 10)
          clock += "0"
        clock += day + " "
        this.detailList.rq = clock
      },
      changeSelectXmmc(val){
        this.detailList.dwmc = val.cbdw
        this.detailList.htbh = val.xmbh
      },


      // 调流程接口
      // 调流程接口进入审批流程
      enterworkFlow (rowobj) {
        let {yhmc,yhid,bmmc,orgmc} = config.userInfo
        this.$api.createWorkFlow({
          pc_initiator:yhmc,
          pc_initiatorid: yhid,
          pc_name: '07',
          pc_project_id: rowobj.id,
          pc_remarks: '',
          pc_state: '',
        },{
          group:bmmc,
          org:orgmc}).then(res=>{
          if(res.code == 1){
            this.$message({
              type: 'success',
              message: '提交审批成功!'
            });
          }else{
            this.$message({
              type: 'error',
              message: res.msg
            });
          }
        }).catch( () => {
          this.$message({
            type: 'info',
            message: '已取消提交审批!'
          });
        })
      },
      uuid(){
        let str = (((1+Math.random())*0x10000)|0).toString(16).substring(1)
        return (str+str+"-"+str+"-"+str+"-"+str+"-"+str+str+str);
      },
      selectZB(row){
        this.zbSelect = row
      },

      handleExceed(files, fileList){
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      fileRemove(file, fileList){
        this.FileupData = fileList
      },
      imgfileRemove(file, fileList){
        this.imgFileData  = fileList
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
            this.FileupData.push(fildObj)
          }
        })
      },
      upImgHand(files){
        var fm = new FormData();
        fm.append('file',files.file);
        console.log(files.file)
        this.$api.uploadFile2(fm).then(res=>{
          if(res.code == 1){
            console.log(res,'===res')
            let datas = res.data
            datas.file_remarks = datas.remarks
            datas.url = datas.file_path
            delete datas.remarks
            let fildObj = datas
            fildObj.file_id = this.uuidsID
            fildObj.name = fildObj.file_yname
            fildObj.type = fildObj.file_type
            fildObj.webkitRelativePath = fildObj.file_path
            fildObj.lastModified = parseFloat(fildObj.file_date)
            fildObj.size = parseFloat(fildObj.file_dx)*100
            fildObj.file_mjlx = '3301'
            this.imgFileData.push(fildObj)

          }
        })
      },
      handleSelectionChange(row){

        this.mxList = row
        let self = this
        this.mxList.forEach(item=>{
          if(JSON.stringify(self.selectMxList).indexOf(JSON.stringify(...item.wcrwdZbList)) == -1){
            self.selectMxList.push(...item.wcrwdZbList)
          }

        })

      },
      delRwd(index){
        this.mxList.splice(index,1)
      },
      handleRemove(file, fileList) {
        //删除图片


      },
      handlePictureCardPreview(file) {
        //放大图片查看
        this.dialogImageUrl = file.url;
        this.showUp = true;
      },
      selectable2(row, index){   //禁用第四个
        if(row.zt == 1){
          return true
        }else{
          return false
        }
      },
      resizeSearch(){
        this.searchForm.xmmc = undefined
        this.searchForm.xmbh = undefined
        this.searchForm.zfqh = undefined
        this.searchForm.selectDate = undefined
      },
      delContent(bol){
        if(this.zbSelect&&this.zbSelect.length>1){
              this.$message({
                message: '一次只能删除一条！',
                type: 'warning'
              });
        }else if(!this.zbSelect){
          this.$message({
            message: '请选择要删除的数据！',
            type: 'warning'
          });
        }
        this.$api.deleteRcyhGcjld({id:this.zbSelect[0].id}).then(res=>{

          if(res.code == 1){
            this.queryYDJHData()
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
          }else{
            this.$message({
              message: '删除失败！',
              type: 'info'
            });
          }
        })
      },
      //详情内 点击
      handOneRowSecod(bol){
        if(bol){
          if(this.isAdd){
            let selectVal =  this.detailList.htbh
            if(!selectVal){
              this.$message({
                message: '请选择相对应的项目编号',
                type: 'warning'
              });
            }else{
              this.showFirstItemWindow = true
              let {orgid} = this.userInfo
              this.$api.getSjqd({xmbh:selectVal,daZzid:orgid}).then(res=>{
                if(res.code == 1){
                  if(res.data){
                    this.detailItemInfo = res.data
                  }
                }
              })
            }
          }else{
            let selectVal =  this.detailList.htbh
            let self = this
            if(!selectVal){
              this.$message({
                message: '请选择相对应的项目编号',
                type: 'warning'
              });
            }else{
              this.showFirstItemWindow = true
              let {orgid} = this.userInfo
              this.$api.getSjqd({id:self.detailList.id,xmbh:selectVal,daZzid:orgid}).then(res=>{
                if(res.code == 1){
                  if(res.data){
                    this.detailItemInfo = res.data
                         self.detailItemInfo.filter((item,index)=>{
                           if(self.detailList.sjqdIds.indexOf(item.id) != -1){
                             self.$nextTick(()=>{
                               self.$refs.multipleTable.toggleRowSelection(item,true);
                             })
                           }
                         })
                  }
                }
              })
            }
          }
        }else{
          this.showFirstItemWindow = true
        }


      },
      //操作通过打回等按钮
      promiseTG(bol){
        // 详情查看
         if(bol){
           this.showDetail = false
           this.showFirstItemWindow = false
         }else{
           this.showFirstItemWindow = false
         }

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
        let {xmmc,zfqh,selectDate,pageNum,pageSize,xmbh} = this.searchForm
        let YearDate,MonthDate;

        let {orgid,yhid,bmid} = this.userInfo
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
        this.$api.getRcyhGcjld({pageNum,pageSize,
          zfqh,daZzid:orgid,daYhid:yhid,daBmid:bmid,xmbh: xmbh == undefined ? xmbhOfinit.XMBH : xmbh,startDate:selectDate}).then(res=>{
          if(res.code == 1){
            if(res.data){
              this.YDJHData = res.data.rows
              this.total = res.data.totle

              // this.detailItemInfo = res.data.rows[0].mxList
            }else{
              this.YDJHData = [ ]
              this.total = 0

            }
          }else{
            this.YDJHData = [ ]
            this.total = 0
            // this.detailItemInfo = []
          }

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
  .el-upload-list__item{
    padding-top: 0;
  }
  .uploadFiles{
      display: flex;
      align-self: center;
      margin-top: 20px;
     .el-upload-list{
       margin-left: 10px;
       /*display: flex;*/
       align-self: center;
       background: #f7f9fb;
       height: 36px;
       li{
         height: 100%;
         margin-right: 20px;
         margin-top: 0px;
         padding-top: 5px;
       }
     }
  }
  .rwd{
    display: inline-block;
    width: calc(100% - 120px);
    background: #f7f9fb;
    border-radius:4px;
    height: 36px;
    line-height: 36px;
    padding-left: 8px;
    span{
      position: relative;
      display: inline-block;
      margin-right: 30px;
       i{
         position: absolute;
         top: -5px;
         right:-14px;
       }
    }
  }
  .updateImg{
    .el-upload-list{
      li{
        width: 64px;
        height: 64px;
      }
    }
    .el-upload{
      width: 64px;
      height: 64px;
      line-height: 74px;
    }
  }
  @media screen and (max-width: 1280px) {
    .copyaddJLD {
      width: 66.666%;
    }
  }
  @media (min-width: 1280px)and (max-width: 1920px) {
    .copyaddJLD {
      width: 50%;
    }
  }
  @media screen and (min-width: 1920px) {
    .copyaddJLD {
      width: 40%;
    }
  }

  .middleInput{
    padding-left: 15px;
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: space-between;*/
    /*padding: 0 101px 0 10px;*/
    .copyaddJLD{
      display: inline-block;
      margin-bottom: 12px;
      text-align: right;
      white-space: nowrap;
    }

    .textArea{
      width: calc(100% - 105px);
      outline: none;
      border:1px solid #DCDFE6;
      vertical-align: top;
      padding-left: 5px;
    }
    .upImg{
      .updateImg{
        display: inline-block;
        vertical-align: top;
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

