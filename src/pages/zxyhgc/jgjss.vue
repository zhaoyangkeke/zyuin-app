/**
* ----交工结算书
*/
<template>
  <div id="zqcwzfzs" style="height: 100%;overflow-x: hidden;" v-loading="loading">
    <div class="header" v-show="!showDetail">
      <span class="headerTit">交工结算书</span>
      <div class="header_option">
        <ul>
          <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
          <li @click="showAdd();seeDetails = 0"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table" v-show="!showDetail">
      <div class="chaxun">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">

          <el-form-item class="" label="项目名称" prop="xmmc">
            <el-autocomplete
              class="inline-input"
              size="mini"
              v-model="searchForm.xmmc"
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
          <el-form-item style="margin-bottom: 0px" label="日期选择" prop="" class="">
            <el-date-picker
              v-model="searchForm.jcrq"
              type="daterange"
              size="mini"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <!--<el-select size="mini"  class="" placeholder="请选择日期" v-model="searchForm.jcrq">
              <el-option v-for="(item,index) in qmbbOptions" :key="index" :label="item.bbmc" :value="item.bbid"></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button size="mini" @click="search(1, 10)"  style="background-color: #DF4D4A;border-color: transparent;color: #fff">查询</el-button>
            <el-button @click.native="resizeSearch" size="mini">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                style="width: 100%;"
                row-class-name="row_class"
                border
                :height="showSearch?'calc(100% - 59px)':'calc(100% - 18px)'"
                :row-style="{fontFamily: '宋体', fontSize: '12px'}"
                @selection-change="handleSelectionChange">
        <el-table-column
          align="center"
          :selectable='selectable2'
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="50">
        </el-table-column>

        <el-table-column align="left" sortable prop="jssbh" label="结算书编号" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="gcmc" label="项目名称" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="htbh" label="合同编号" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="cjdw" label="承包单位" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="jldw" label="监理单位" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="gldw" label="管理单位" show-overflow-tooltip> </el-table-column>
        <el-table-column align="left" sortable prop="htzdje" label="合同暂定金额" show-overflow-tooltip> </el-table-column>
        <!--<el-table-column align="left" sortable prop="bz" label="备注" show-overflow-tooltip> </el-table-column>-->
        <el-table-column align="left" sortable label="状态"  show-overflow-tooltip>
          <template scope="scope">
            <span style="color:#D34C42;cursor: pointer;text-align: center" v-if="scope.row.spzt==='1'">申请</span>
            <span style="color:#D34C42;cursor: pointer;text-align: center" v-if="scope.row.spzt==='1.1'">审批中</span>
            <span style="color:#00a2fd;text-align: center" v-if="scope.row.spzt==='2'">已通过</span>
          </template>
        </el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="120">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" v-if="scope.row.spzt==='1'" @click="updateFormDia(scope.row, scope.$index);seeDetails = 0">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row);seeDetails = 1">详情</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" v-if="scope.row.spzt==='1'" @click="shenhe(scope.row, scope.$index)">提交</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <footer class="footer" v-show="!showDetail" >
      <div style="float: right;padding: 6px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </footer>
    <div class="tabArea" v-if="showDetail"  @close="resetForm">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild"  @click="showDetail = false;activeName2 = 'first'"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>交工结算书</span>
        </p>
      </div>

      <div class="dialog_warp">
        <div  style="font-size: 0" >
          <p class="addJLD2">
            <span class="addJLD_tit3">结算书编号 ：</span>
            <el-input size="mini" v-if="seeDetails === 0" :disabled="true" type="text" v-model="lmshForm.jssbh"></el-input>
            <span v-else>{{lmshForm.jssbh}}</span>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">工程名称 ：</span>
            <el-select v-if="seeDetails === 0" :disabled="showxq" size="mini" style="width: 100%;" v-model="htbh" value-key="XMMC" placeholder="请选择" @change="selectHt">
              <el-option v-for="(item,index) in htList" :key="index" :label="item.XMMC" :value="item"> </el-option>
            </el-select>
            <span v-else>{{lmshForm.gcmc}}</span>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">合同编号 ：</span>
            <el-input v-if="seeDetails === 0" size="mini" :disabled="true" type="text" v-model="lmshForm.htbh"> </el-input>
            <span v-else>{{lmshForm.htbh}}</span>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">承包单位 ：</span>
            <el-input v-if="seeDetails === 0" size="mini" :disabled="true" type="text" v-model="lmshForm.cjdw"> </el-input>
            <span v-else>{{lmshForm.cjdw}}</span>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">管理单位 ：</span>
            <el-input v-if="seeDetails === 0" size="mini" :disabled="true" type="text" v-model="lmshForm.gldw"> </el-input>
            <span v-else>{{lmshForm.gldw}}</span>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">监理单位 ：</span>
            <el-input v-if="seeDetails === 0" size="mini" :disabled="true" type="text" v-model="lmshForm.jldw"> </el-input>
            <span v-else>{{lmshForm.jldw}}</span>
          </p>
          <div>
            <span style="font-size:14px;display: inline-block;width: 100px;">各章节工程合计</span>
            <p style="display:inline-block;vertical-align:middle;width: calc(100% - 100px);height:1px;border: 1px dashed #DCDFE6;margin-bottom: 10px;"></p>
          </div>
          <p class="addJLD2">
            <span class="addJLD_tit3">合同金额(元) ：</span>
            <el-input v-if="seeDetails === 0"  size="mini" :disabled="true" type="text" v-model="lmshForm.gzjhtje"></el-input>
            <span v-else>{{lmshForm.gzjhtje}}</span>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">计量金额(元) ：</span>
            <el-input v-if="seeDetails === 0" size="mini" :disabled="true" type="text" v-model="lmshForm.gzjjlje"> </el-input>
            <span v-else>{{lmshForm.gzjjlje}}</span>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">交工结算金额(元) ：</span>
            <el-input v-if="seeDetails === 0"  size="mini" :disabled="true" type="text" v-model="lmshForm.gzjjsje"></el-input>
            <span v-else>{{lmshForm.gzjjsje}}</span>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">备注 ：</span>
            <el-input v-if="seeDetails === 0" class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.gzjgchjBz"></el-input>
            <span v-else>{{lmshForm.gzjgchjBz}}</span>
          </p>

          <div>
            <span style="font-size:14px;display: inline-block;width: 60px;">暂定金额</span>
            <p style="display:inline-block;vertical-align:middle;width: calc(100% - 60px);height:1px;border: 1px dashed #DCDFE6;margin-bottom: 10px;"></p>
          </div>
          <p class="addJLD2">
            <span class="addJLD_tit3">合同金额(元) ：</span>
            <el-input v-if="seeDetails === 0" size="mini" :disabled="true" type="text" v-model="lmshForm.htzdje"></el-input>
            <span v-else>{{lmshForm.htzdje}}</span>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">计量金额(元) ：</span>
            <el-input v-if="seeDetails === 0"  size="mini" :disabled="true" type="text" v-model="lmshForm.jlzdje"> </el-input>
            <span v-else>{{lmshForm.jlzdje}}</span>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">交工结算金额(元) ：</span>
            <el-input v-if="seeDetails === 0"  size="mini" :disabled="true" type="text" v-model="lmshForm.jgjszdje"> </el-input>
            <span v-else>{{lmshForm.jgjszdje}}</span>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">备注 ：</span>
            <el-input v-if="seeDetails === 0" class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.zdjeBz"></el-input>
            <span v-else>{{lmshForm.zdjeBz}}</span>
          </p>

          <div>
            <span style="font-size:14px;display: inline-block;width: 60px;">索赔费用</span>
            <p style="display:inline-block;vertical-align:middle;width:calc(100% - 60px);height:1px;border: 1px dashed #DCDFE6;margin-bottom: 10px;"></p>
          </div>
          <p class="addJLD2">
            <span class="addJLD_tit3">金额(元) ：</span>
            <el-input v-if="seeDetails === 0" size="mini" :disabled="true" type="text" v-model="lmshForm.spfy"> </el-input>
            <span v-else>{{lmshForm.spfy}}</span>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">备注 ：</span>
            <el-input v-if="seeDetails === 0" class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.spfyBz"></el-input>
            <span v-else>{{lmshForm.spfyBz}}</span>
          </p>
          <div>
            <span style="font-size:14px;display: inline-block;width: 28px;">罚金</span>
            <p style="display:inline-block;vertical-align:middle;width:calc(100% - 28px);height:1px;border: 1px dashed #DCDFE6;margin-bottom: 10px;"></p>
          </div>
          <p class="addJLD2">
            <span class="addJLD_tit3">金额(元) ：</span>
            <el-input v-if="seeDetails === 0" size="mini" :disabled="true" type="text" v-model="lmshForm.fj"> </el-input>
            <span v-else>{{lmshForm.fj}}</span>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">备注 ：</span>
            <el-input v-if="seeDetails === 0" class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.fjBz"></el-input>
            <span v-else>{{lmshForm.fjBz}}</span>
          </p>
          <div>
            <span style="font-size:14px;display: inline-block;width: 90px;">交工结算金额</span>
            <p style="display:inline-block;vertical-align:middle;width:calc(100% - 90px);height:1px;border: 1px dashed #DCDFE6;margin-bottom: 10px;"></p>
          </div>
          <p class="addJLD2">
            <span class="addJLD_tit3">交工结算总价格 ：</span>
            <el-input v-if="seeDetails === 0" size="mini" :disabled="true" type="text" v-model="lmshForm.jgjszj"> </el-input>
            <span v-else>{{lmshForm.jgjszj}}</span>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">应扣留的质量保证金(元) ：</span>
            <el-input v-if="seeDetails === 0" size="mini" :disabled="showxq" type="text" v-model="lmshForm.zlbzj"> </el-input>
            <span v-else>{{lmshForm.zlbzj}}</span>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">累计已支付工程价款(元) ：</span>
            <el-input v-if="seeDetails === 0"  size="mini" :disabled="showxq" type="text" v-model="lmshForm.ljzfgck"></el-input>
            <span v-else>{{lmshForm.ljzfgck}}</span>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">应支付的交工付款金额(元) ：</span>
            <el-input v-if="seeDetails === 0"  size="mini" :disabled="showxq" type="text" v-model="lmshForm.yzfkk"></el-input>
            <span v-else>{{lmshForm.yzfkk}}</span>
          </p>
          <p class="addJLD2">
            <span class="addJLD_tit3">备注 ：</span>
            <el-input v-if="seeDetails === 0" class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.jgjszjBz"></el-input>
            <span v-else>{{lmshForm.jgjszjBz}}</span>
          </p>
          <p style="font-size: 13px"  v-if="seeDetails === 0">
            <el-upload
              style="display: inline-block"
              class="upload-demo"
              action="111"
              :file-list="fildDatas"
              :on-remove="fjRemove"
              :http-request="handHttpRequest"
              multiple
              :disabled="showxq"
              :limit="3">
              <el-button  v-if="!showxq" size="mini" type="primary">添加附件</el-button>
            </el-upload>
          </p>
          <div v-else style="margin-top:20px;margin-left: 13px;font-size: 14px;">
            <span>文件列表 ：</span>
            <a style="margin-right: 20px;" v-for="(files,index) in fildDatas" target="_blank" :key="index" :href="files.file_path">{{files.file_yname}}</a>
          </div>

        </div>
        <div class="zibnr" v-if="seeDetails === 1" style="overflow-x: auto;overflow-y: hidden;">
          <el-tabs   v-model="activeName2" >
            <el-tab-pane style="height: calc(100%);" label="工程交工结算费用计算表" name="first">
              <el-table  :data="gcjgjs" tooltip-effect="dark"
                         style="width: calc(100% - 26px);margin: auto;"
                         row-class-name="row_class"
                         border>
                <el-table-column
                  type="index"
                  align="center"
                  label="序号"
                  width="50">
                </el-table-column>
                <el-table-column align="center"  prop="zmbh" label="子目号"></el-table-column>
                <el-table-column align="center"  prop="zmmc" label="子目名称"></el-table-column>
                <el-table-column align="center"  prop="dw" label="单位"></el-table-column>
                <el-table-column align="center"  prop="dj" label="合同单价"></el-table-column>
                <el-table-column align="center"   label="原合同">
                  <el-table-column align="center"  prop="htsl" label="数量"></el-table-column>
                  <el-table-column align="center"  prop="htje" label="金额"></el-table-column>
                </el-table-column>
                <el-table-column align="center" label="实际计量">
                  <el-table-column align="center"  prop="jlsl" label="数量"></el-table-column>
                  <el-table-column align="center"  prop="jlje" label="金额"></el-table-column>
                </el-table-column>
                <el-table-column align="center"  prop="dsqmwc" label="交工结算">
                  <el-table-column align="center"  prop="jgjssl" label="数量"></el-table-column>
                  <el-table-column align="center"  prop="jgjsje" label="金额"></el-table-column>
                </el-table-column>
                <el-table-column align="center"   label="与实际计量比较增加或减少">
                  <el-table-column align="center"  prop="bjsl" label="数量"></el-table-column>
                  <el-table-column align="center"  prop="bjje" label="金额"></el-table-column>
                </el-table-column>
                <el-table-column align="center"  prop="bz" label="备注"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="索赔费用一览表" name="second">
              <el-table  :data="spfyData" tooltip-effect="dark"
                         style="width: calc(100% - 26px);margin: auto;"
                         row-class-name="row_class"
                         border>
                <el-table-column
                  type="index"
                  align="center"
                  label="序号"
                  width="50">
                </el-table-column>
                <el-table-column align="left" v-for="(finTit,finIndex) in spfyTit" :prop="finIndex" :label="finTit"   show-overflow-tooltip> </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="罚金一览表" name="third">
              <el-table  :data="fjData" tooltip-effect="dark"
                         style="width: calc(100% - 26px);margin: auto;"
                         row-class-name="row_class"
                         border>
                <el-table-column
                  type="index"
                  align="center"
                  label="序号"
                  width="50">
                </el-table-column>
                <el-table-column align="center"  prop="NR" label="项目内容"></el-table-column>
                <el-table-column align="center"  prop="JE" label="金额（元）"></el-table-column>
                <el-table-column align="center"  prop="zmbh" label="依据或证明材料">
                  <template slot-scope="{row}">
                    <span v-html="row.YJCLHZM"></span>
                  </template>
                </el-table-column>
                <el-table-column align="center"  prop="BZ" label="备注"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="工程付款记录一览表" name="four">
              <el-table  :data="gcfkData" tooltip-effect="dark"
                         style="width: calc(100% - 26px);margin: auto;"
                         row-class-name="row_class"
                         border>
                <el-table-column
                  type="index"
                  align="center"
                  label="序号"
                  width="50">
                </el-table-column>
                <el-table-column align="center"  prop="zfqh" label="支付证书期号"></el-table-column>
                <el-table-column align="center"  prop="jlje" label="计量金额（元）"></el-table-column>
                <el-table-column align="center"  prop="yzfje" label="已支付金额（元）"></el-table-column>
                <el-table-column align="center"  prop="bz" label="备注"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="dialog_footer" v-if="!showxq">
          <el-button size="mini" v-if="isadd"style="background-color: #DF4D4A;border-color: transparent;color: #fff"   class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="mini" v-if="!isadd" style="background-color: #DF4D4A;border-color: transparent;color: #fff"  class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>
    </div>
    <Dialog :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :dialogVisible="dialogVisible"
            @searchXMMC="searchXMMC"
            @closeDialog="closeDialog">
    </Dialog>
    <!--</el-dialog>-->
  </div>
</template>

<script>
  import Dialog from '@/components/Dialog.vue'
  export default {
    components: {Dialog},
    props: {
      hasMenu: {
        type: Boolean,
        default: false
      },
      clickHide: {
        type: Function
      }
    },
    data () {
      return {
        uuidsID:'',
        fildDatas:[],
        gcjgjs:[],
        spfyData:[],
        fjData:[],
        gcfkData:[],
        datatypes:'',
        dialogData:[],
        dialogTableTit:{
          XMMC:'项目名称',XMBH:'项目编号',
        },
        dialogVisible:false,
        restaurants:[],
        namesObj: {
          jssbh: '结算书编号',
          xmmc: '工程名称',
          htbh: '合同编号',
          cjdw: '承包单位',
          gldw: '管理单位',
          jldw: '监理单位',
          // fj: '附件',
          bz: '备注',
          gzjhtje: '各章节工程合同金额(元)',
          gzjjlje: '各章节工程计量金额(元)',
          gzjjsje: '各章节工程交工结算金额(元)',
          htzdje: '合同暂定金额(元)',
          jlzdje: '计量暂定金额(元)',
          jgjszdje: '交工结算暂定金额(元)',
          spfy: '索赔费用(元)',
          fj: '罚金(元)',
          zlbzj: '应扣留的质量保证金(元)',
          ljzfgck: '累计已支付工程价款(元)',
          yzfkk: '应支付的交工付款金额(元)',
          yzfkkdx: '应支付的交工付款金额(大写)',
          dwmc: '编制单位',
          bmmc: '编制部门'
        },
        seeDetails: 2,
        spfyTit:{spsqsbh:'索赔申请书编号',spscyjsbh:'索赔审查意见书编号',spspyjs:'索赔审批意见书编号',spsjjs:'索赔事件简述',spje:'审批金额(元)',bz:'备注'},
        activeName2:'first',

        lmshForm: {
          jssbh:'',
          jgjszjBz:'',
          yzfkk:'',
          ljzfgck:'',
          zlbzj:'',
          jgjszj:'',
          fjBz:'',
          fj:'',
          spfyBz:'',
          spfy:'',
          zdjeBz:'',
          jgjszdje:'',
          jlzdje:'',
          htzdje:'',
          gzjgchjBz:'',
          gzjjsje:'',
          gzjjlje:'',
          gzjhtje:'',
          jldw:'',
          gldw:'',
          cjdw:'',
          htbh:'',
          gcmc:'',
        },
        index: '',
        isadd: false,
        addzb: true,
        submitLoading: false,
        showxq: false,
        showSearch: false,
        loading: false,
        tableHeight: 300,
        tableData: [],
        tableData1: [],
        showBhForm: false,
        searchCriteria: false,
        qmbbOptions: [],
        roadOptions: [],
        fileList: [],
        searchForm: {xmmc:'',jcrq:''},
        currentPage: 1,
        pageSize: 10,
        total: 0,
        personelForm: {},
        showDetail: false,
        multipleSelection: [],
        htbh: {},
        htList: [],
        tabindex: 0,
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
      }
    },
    methods: {
      fjRemove(file, fileList){
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
            this.fildDatas.push(fildObj)

          }
        })
      },
      selectable2(row, index){   //禁用第四个
        if(row.spzt == 1){
          return true
        }else{
          return false
        }
      },
      selectHt (value) {
        this.lmshForm.spzt = "1"
        this.lmshForm.gcmc = value.XMMC
        this.lmshForm.htje = value.HTJE
        this.lmshForm.htbh = value.XMBH
        this.lmshForm.cjdw = value.CBDW
        this.lmshForm.gldw = value.GLDW
        this.lmshForm.jldw = value.JLDW
        let self = this
        this.$api.getJgjssBasicData2({xmbh:value.XMBH}).then(res=>{
          if(res.code == 1){
            console.log(res.data)
            self.lmshForm.htzdje = res.data.htzdje
            self.lmshForm.jlzdje = res.data.jlzdje
            self.lmshForm.jgjszdje = res.data.jgjszdje
            self.lmshForm.gzjhtje = res.data.gzjhtje
            self.lmshForm.gzjjlje = res.data.gzjjlje
            self.lmshForm.gzjjsje = res.data.gzjjsje
            self.lmshForm.spfy = res.data.spfy
            self.lmshForm.fj = res.data.fj
            self.lmshForm.jgjszj = res.data.jgjszj
            // this.lmshForm.jldw = value.JLDW
          }
        })

        /* this.lmshForm.pmmtjgjss_htmc = value.pmmtjgjss_htmc
        this.lmshForm.pmmtjgjss_htbh = value.pmmtjgjss_htbh
        this.lmshForm.pmmtjgjss_gcmc = value.pmmtjgjss_gcmc
        this.lmshForm.pmmtjgjss_cbdw = value.pmmtjgjss_cbdw
        this.lmshForm.pmmtjgjss_gldw = value.pmmtjgjss_gldw
        this.lmshForm.pmmtjgjss_jldw = value.pmmtjgjss_jldw
        this.lmshForm.zmbs = value.zmbs */
      },
      handleSelectMC(item){
        //getXmmcList
        this.searchForm.xmmc = item.XMMC
        this.searchForm.xmbh = item.XMBH
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
      closeDialog(val){
        this.dialogVisible = false
        if(val){
          this.searchForm.xmmc = val.XMMC
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
          this.searchForm.xmmc = val.XMMC
          this.searchForm.xmbh = val.XMBH
        }
      },
      initqueryXMMC(){
        this.$api.getmcbhList2().then(res=>{
          if(res.code == 1){
            this.restaurants = res.data&&res.data.length?res.data:[]
          }else{
            this.restaurants = []
          }
          this.search(1, 10)
        })
      },
      initUser(){
        let userInfo = JSON.parse(localStorage.getItem('userMsg'))[0]
        if(userInfo){
          if(userInfo){
            this.userInfo.daYhbm = userInfo.userCode
            this.userInfo.daYhid = userInfo.userId
            this.userInfo.daYhmc = userInfo.userName
            this.userInfo.userType = userInfo.userType
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
      resizeSearch(){
        this.searchForm = {lxcode:'',xcfx:'',jcrq:''}
      },
      getfilebyid () {
        this.$api.getFilesDataById('?id=' + this.lmshForm.djbh).then(res => {
          this.fileList = res.data.data
          this.fileList.map(item => {
            item.name = item.file_yname
          })
        })
      },
      handleRemove (fileid) {
        this.$api.deleteFilesById('?ids=' + fileid).then(res => {})
      },
      rukufile () {
        let uploadFiles = []
        if (this.$refs.uploada.uploadFiles.length > 0) {
          this.$refs.uploada.uploadFiles.map(item => {
            if (item.response) {
              item.response.data.file_id = this.lmshForm.djbh
              uploadFiles.push(item.response.data)
            } else {
              uploadFiles.push(item)
            }
          })
          this.$api.addFileData({dataList: uploadFiles}).then(resp => {
            if (resp.data.code === 1) {
            }
          })
        }
        this.search(this.currentPage, this.pageSize)
        this.resetForm()
      },
      changeFile (file, fileList) {},
      showAdd () {
        this.lmshForm = {
          jssbh:'',
          jgjszjBz:'',
          yzfkk:'',
          ljzfgck:'',
          zlbzj:'',
          jgjszj:'',
          fjBz:'',
          fj:'',
          spfyBz:'',
          spfy:'',
          zdjeBz:'',
          jgjszdje:'',
          jlzdje:'',
          htzdje:'',
          gzjgchjBz:'',
          gzjjsje:'',
          gzjjlje:'',
          gzjhtje:'',
          jldw:'',
          gldw:'',
          cjdw:'',
          htbh:'',
          gcmc:'',
        }
        this.showDetail = true
        this.showxq = false
        this.isadd = true
        this.uuidsID = this.uuid()
        this.lmshForm.id = this.uuidsID
        let {daBmmc,daZzmc} = this.userInfo
        this.lmshForm.dwmc = daZzmc
        this.lmshForm.bmmc = daBmmc
        this.formId = 'jgjss' + new Date().getTime()
        this.lmshForm.jssbh = this.formId
        this.$api.getmcbhList2().then(res=>{
          if(res.code == 1){
            this.htList = res.data
          }else{
            this.htList = []
          }
        })
      },
      updateFormDia (row, index) {
        this.fildDatas = []
        this.uuidsID = row.id
        this.showDetail = true
        this.isadd = false
        this.showxq = false
        this.lmshForm = row
        this.htbh = row.gcmc
        this.$api.getFilesDataById2({id:row.id}).then(res=>{
          if(res.code == 1){
            let datas = res.data
            datas.forEach(item =>{
              item.name = item.file_yname
              this.fildDatas.push(item)
            })
          }else{
          }
        })
        this.$api.getmcbhList2().then(res=>{
          if(res.code == 1){
            this.htList = res.data

          }
        })
        // this.lmshForm = JSON.parse(JSON.stringify(row))
        this.index = index
        // this.htbh = {
        //   pmmtjgjss_htbh: this.lmshForm.pmmtjgjss_htbh
        // }
      },
      showBhFormDia (row) {
        this.fildDatas = []
        this.showDetail = true
        this.showxq = true
        this.lmshForm = JSON.parse(JSON.stringify(row))
        this.htbh = row.gcmc
        this.$api.getFilesDataById2({id:row.id}).then(res=>{
          if(res.code == 1){
            let datas = res.data
            datas.forEach(item =>{
              item.name = item.file_yname
              this.fildDatas.push(item)
            })
          }else{
          }
        })
        this.$api.getJgjssDetailed2({id:row.id}).then(res=>{

          if(res.code == 1){
            this.gcjgjs = res.data.gcjgjsfyjsbList
            this. spfyData = res.data.spfyylbList
            this.fjData = res.data.fjylbList
            this.gcfkData = res.data.gcfkjlylbList

          }else{
            this.gcjgjs = []
            this. spfyData = []
            this.fjData = []
            this.gcfkData = []
          }
        })
      },
      search (currentPage, pageSize) {

        let {daZzid,daBmid,daYhid,userType} = this.userInfo
        if(userType&&userType =='供应商'){
          if( this.restaurants.length){
            if(this.restaurants[0].XMBH){
              this.searchForm.xmbh = this.restaurants[0].XMBH
            }else{
              this.searchForm.xmbh = undefined
            }
          }
        }
        this.searchForm.xmbh = this.searchForm.xmmc?this.searchForm.xmbh:undefined
        this.showSearch = false
        if (this.searchForm.jcrq) {
          this.searchForm.ksrq = this.searchForm.jcrq[0]
          this.searchForm.jsrq = this.searchForm.jcrq[1]
        }else{
          this.searchForm.ksrq = undefined
          this.searchForm.jsrq = undefined
        }

        let {ksrq,jsrq,xmbh} = this.searchForm
        //daBmid,daYhid,
        this.$api.getJgjssList3({pageNum:currentPage,pageSize,daZzid,startDate:ksrq,endDate:jsrq,xmbh}).then(resp => {
          this.loading = false
          if(resp.code == 1){

            this.tableData = resp.data.rows
            this.total = resp.data.totle
          }else{
            this.tableData = []
            this.total = 0
          }
        }).catch(e => {
          this.loading = false
        })
      },
      addSubmit () {
        this.lmshForm.tbr = this.userInfo.daYhmc
        var now = new Date()
        var year = now.getFullYear() //年
        var month = now.getMonth() + 1 //月
        var day = now.getDate() //日
        var clock = year + "-"
        if(month < 10)
          clock += "0"
        clock += month + "-"
        if(day < 10)
          clock += "0"
        clock += day + " "
        this.lmshForm.tbrq = clock
        this.lmshForm.djbh = 'jgjss' + Date.now()
        Object.assign(this.lmshForm,this.userInfo)
        if(this.fildDatas.length){
          this.$api.addFileData(this.fildDatas).then(res=>{
            if(res.data.code == 1){
            }else{
              this.$message({
                message: '文件上传失败',
                type: 'info'
              });
            }
          })
        }
        if(this.lmshForm.gcmc){
          this.$api.insertJgjss2(this.lmshForm).then(res => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.search(this.currentPage, this.pageSize)
              this.activeName2 = 'first'
              this.resetForm()
            } else {
              this.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        }else{
          this.$message({
            message: '请先选择项目',
            type: 'info'
          });
        }

      },
      updateSubmit () {
        if(this.fildDatas.length){

          this.$api.addFileData(this.fildDatas).then(res=>{

            this.fildDatas = []
            if(res.data.code == 1){
            }else{
              this.$message({
                message: '图片上传失败',
                type: 'info'
              });
            }
          })
        }
        else{
          this.$api.deleteFilesById2({ids:this.lmshForm.id}).then(res=>{

            if(res.code == 1){

            }else{
              this.$message({
                message: '图片上传失败',
                type: 'info'
              });
            }
          })
        }
        this.$api.updateJgjss2(this.lmshForm).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '编辑成功!'
            })
            this.search(this.currentPage, this.pageSize)
            this.activeName2 = 'first'
            this.resetForm()
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      },
      deleteData () {
        let self = this
        if (self.multipleSelection.length > 0) {
          self.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {

            let djbharr = ''
            self.multipleSelection.map((item, index) => {
              djbharr = djbharr + item.id + ','
            })
            self.$api.deleteJgjss2({id:djbharr}).then(res => {
              if (res.code === 1) {
                self.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                self.search(this.currentPage, this.pageSize)
              } else {
                self.$message({
                  type: 'error',
                  message: res.msg
                })
              }
            })
          }).catch(() => {

            self.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else {
          self.$message({type: 'error', message: '请选选择要删除的数据'})
        }
      },
      shenhe (row, index) {
        let {yhmc,yhid,bmmc,orgmc} = config.userInfo
        this.$confirm('是否通过审核？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let form = JSON.parse(JSON.stringify(row))
          form.pmmtjgjssmx_spzt = '已下发'
          this.$api.createWorkFlow({
            pc_initiator:yhmc,
            pc_initiatorid: yhid,
            pc_name: '11',
            pc_project_id: row.id,
            pc_remarks: '',
            pc_state: '',
          },{
            group:bmmc,
            org:orgmc}).then(resp=>{
            if(resp.code == 1){
              this.$api.updateJgjssSpzt2({id:row.id,spzt:"1.1"}).then(res => {
                if (res.code === 1) {
                  this.$message({
                    type: 'success',
                    message: '提交成功!'
                  })
                  this.search(this.currentPage, this.pageSize)
                  this.resetForm()
                }else{
                  this.$message({
                    type: 'info',
                    message: res.msg
                  })
                }
              })
            }else{
              this.$message({
                type: 'info',
                message: res.msg
              })
            }

          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消审核'
          })
        })
      },
      daochu () {
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.search(this.currentPage, this.pageSize)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.search(this.currentPage, this.pageSize)
      },

      resetForm () {
        this.showDetail = false
        this.activeName2 = 'first'
        this.htbh = {}
      },

      ceshi () {
        this.$message({
          type: 'error',
          message: '内容格式不符合要求'
        })
      },
      submitAddForm () {
      },
      getXcRoadOptions () {
        this.$api.requestLdbqueryCombos().then(resp => {
          if (resp.status !== 200) {
            this.$message({
              message: '出错了',
              type: 'error'
            })
          } else {
            this.roadOptions = resp.data
          }
        }).catch(e => {
        })
      },
      selecttreeBm (node) {
        this.searchForm.bmid = node.bmcode
        this.searchForm.bmname = node.bmname
        if (!this.searchForm.qmbbid) {
          // return
        } else {
          this.search(this.currentPage, this.pageSize)
        }
      },
      getQmldbb () {
        if (this.qmbbOptions.length > 0) { return }
        this.$api.requestLkpdbbkQueryQmldbb('0201').then(resp => {
          if (resp.status !== 200) {
            this.$message({
              message: '出错了',
              type: 'error'
            })
          } else {
            this.qmbbOptions = resp.data
            this.searchForm.qmbbid = this.qmbbOptions[0].bbid
            if (!this.searchForm.bmid) {
              // return
            } else {
              this.search(this.currentPage, this.pageSize)
            }
          }
        }).catch(e => {
        })
      },
      tablable (num) {
        this.tabindex = num
      },
      uuid(){
        let str = (((1+Math.random())*0x10000)|0).toString(16).substring(1)
        return (str+str+"-"+str+"-"+str+"-"+str+"-"+str+str+str);
      },

    },
    mounted () {
      this.initUser()
      this.initqueryXMMC()

      /*    this.$api.getHtJgInfoByBm('').then(res => {
            this.htList = res.data.data
          })*/

      // this.tableHeight = $('#zqcwzfzs')[0].offsetHeight
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #zqcwzfzs{
    position: relative;
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    overflow: auto;
    .gjzjje{
      input{
        height: 55px;
      }
    }
    .header{}
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
    .dialog_warp{
      background: #fff;
      /*padding: 20px 40px;*/
      .tab_lable{
        margin-bottom: 10px;
        font-size: 12px;
        text-align: left;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #f1f4f7;
        padding: 0 15px;
        p{
          text-align: left;
        }
        span{
          display: inline-block;
          /*border-bottom: 2px solid #00a2fd;*/
          height: 38px;
          margin-right: 20px;
          &:hover{
            border-bottom: 2px solid #00a2fd;
            cursor: pointer;
          }
        }
        .tabselect{
          border-bottom: 2px solid #00a2fd;
        }
      }
      .zhubnr{
        li{
          width: 50%;
          height: 32px;
          float: left;
          border: 1px solid #D5D6D7;
          border-bottom: none;
          color: #52575D!important;
          font-size: 12px;
          &:nth-of-type(2n+1){
            border-right: none;
          }
          &:nth-last-of-type(1),&:nth-last-of-type(2){
            border-bottom: 1px solid #D5D6D7;
          }
          >span{
            width: 100px;
            display: inline-block;
            padding:0 5px;
            height: 100%;
            line-height: 31px;
            border-right: 1px solid #D5D6D7;
            background: #F7F8F9;
            float: left;
          }
          p{
            width: calc(100% - 100px);
            height: 100%;
            float: left;
            .el-input__inner{
              border: none;
              text-align: center;
            }
          }
          .radio_line{
            /*span{
              display: inline-block;
              width: 50%;
            }*/
            padding: 0 5px;
            .el-radio__label{
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
        .zbxx{
          height: 60px;
        }
        .tow_line,.three_line,.four_line{
          width: 100%;
          border-right: 1px solid #D5D6D7!important;
          .el-input--mini{
            width: calc(100% - 60px);
          }
          p{
            >span{
              border-bottom: 1px solid #D5D6D7;
              &:last-child{
                border-bottom: none;
              }
              i{
                display: inline-block;
                width: 60px;
                height: 100%;
                font-style: normal;
                background: #F7F8F9;
                float: left;
                line-height: 32px;
                text-align: center;
              }
            }
          }
        }
        .text_line{
          width: 100%;
          border-right: 1px solid #D5D6D7!important;
          min-height: 64px;
          height: auto;
          >span{
            min-height: 64px;
            height: 100% !important;
          }
          p{
            min-height: 64px;
          }
          .el-upload-list__item{
            border: none;
          }
        }
      }
      .zibnr,.zibiaonr{
        width: 100%;
        position: relative;
        padding: 15px 0 0 0;
        overflow: hidden;
        text-align: center;
        box-sizing: border-box;
        ul{
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 15px;
          li{
            /*width: 1000px;*/
            width: 100%;
            height: 32px;
            float: left;
            box-sizing: border-box;
            border: 1px solid #D5D6D7;
            color: #52575D!important;
            font-size: 12px;
            border-right: none;
            border-bottom: none;
            &:nth-of-type(1){
              height: 60px;
            }
            &:nth-last-of-type(1){
              border-bottom: 1px solid #D5D6D7;
            }
            >span{
              width: calc(100%/10);
              display: inline-block;
              height: 100%;
              float: left;
              line-height: 31px;
              text-align: center;
              background: #F7F8F9;
              border-right: 1px solid #D5D6D7;
              div{
                height: 50%;
              }
              span{
                width: 50%;
                height: 50%;
                display: inline-block;
                float: left;
                border-top: 1px solid #D5D6D7;
                border-right: 1px solid #D5D6D7;
                &:nth-last-of-type(1){
                  border-right: none;
                }
              }
            }
            p{
              width: calc(100%/10);
              height: 100%;
              line-height: 32px;
              float: left;
              border-right: 1px solid #D5D6D7;
              .el-input__inner{
                border: none;
                text-align: center;
              }
              i{
                color: #00a2fd;
                margin:0 5px;
              }
            }
            .tow_linep{
              .el-input{
                width: 50%!important;
                float: left;
                &:nth-of-type(1){
                  border-right: 1px solid #D5D6D7;
                }
                .el-input__inner{
                  padding: 0!important;
                }
              }
            }
          }
        }
        .gchzb{
          li{
            width: 600px;
            >span,p{
              width: calc(100%/6);
            }
          }
        }
      }
      .zibiaonr{
        margin-top: 20px;
        li{
          width: calc(100%/6);
          height: 64px;
          float: left;
          border: 1px solid #D5D6D7;
          color: #52575D!important;
          font-size: 12px;
          border-right: none;
          &:nth-last-of-type(1){
            border-right: 1px solid #D5D6D7;
          }
          >span{
            width: 100%;
            display: inline-block;
            height: 50%;
            line-height: 31px;
            text-align: center;
            background: #F7F8F9;
            border-bottom: 1px solid #D5D6D7;
          }
          p{
            width: calc(100%);
            height: 50%;
            float: left;
            .el-input__inner{
              border: none;
              text-align: center;
            }
            i{
              color: #00a2fd;
              margin:0 5px;
            }
          }
        }
      }
      .addzbsj{
        text-align: center;
        color: #1CA4FA;
        padding: 10px 0;
      }
      .iconwarp{
        text-align: right;
        height: 14px;
        overflow: hidden;
        i{
          color: #1CA4FA;
          margin-left: 10px;
        }
      }
    }
  }
</style>
