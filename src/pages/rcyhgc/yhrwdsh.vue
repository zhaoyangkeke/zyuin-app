/**
* ----养护任务单
*/
<template>
  <div id="kgsqd" style="height: 100%;position:relative;" >
    <div class="header"  v-show="!showDetail" >
      <span class="headerTit">养护任务单</span>
      <div class="header_option">
        <ul>
          <!--<li><i class="el-icon-search"> 查询</i></li>-->
          <!--<li><i class="icon iconfont icon-export"> 导出</i></li>-->
          <li @click="updateFormDia('add');isseedetail = 0"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleterows"><i class="el-icon-delete"> 删除</i></li>
        </ul>

      </div>
    </div>

    <div class="conter_table"  v-show="!showDetail" >
      <!--查询信息-->
      <div class="chaxun">
        <el-form  :inline="true"  style="display: inline-block;" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="项目名称">
              <!--<el-input v-model="searchForm.sjdh" size="mini"></el-input>-->
              <!--<el-select v-model="jldModel.xmmc" placeholder="输入项目名称" size="mini">-->
              <!--<el-option v-for="(item, index) in xmmcarr" :key="index" :label="item.XMMC" :value="item.XMMC"></el-option>-->
              <!--</el-select>-->
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="searchForm.xmmc"
                :fetch-suggestions="querySearchMC"
                @select="handleSelectMC($event, 1)"
                placeholder="请输入项目名称"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.XMMC }}</div>
                </template>
                <i slot="suffix" @click="showDialog('mc')" class="icon iconfont icon-xiangqing1"></i>
              </el-autocomplete>
            </el-form-item>
            <!--<el-form-item class="" label="月度" prop="htbh">-->
              <!--<el-date-picker-->
                <!--size="mini"-->
                <!--v-model="searchForm.yd"-->
                <!--type="month"-->
                <!--placeholder="选择日期"-->
                <!--format="MM 月"-->
                <!--value-format="MM">-->
              <!--</el-date-picker>-->
            <!--</el-form-item>-->
            <el-form-item class="" label="日期" prop="htbh">
              <el-date-picker
                size="mini"
                v-model="searchForm.selectDate"
                type="daterange"
                placeholder="选择日期"
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
      <el-table  :data="YDJHData" tooltip-effect="dark"
                 style="width: calc(100% - 19px);"
                 row-class-name="row_class"
                 @selection-change="isselect"
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
        <el-table-column align="left" sortable :prop="zt" label="状态" show-overflow-tooltip>
          <template scope="scope">
            <span v-if="scope.row.zt == 1">巡查事件</span>
            <span v-if="scope.row.zt == 2">指挥中心处理</span>
            <span v-if="scope.row.zt == 3">工程部处理</span>
            <span v-if="scope.row.zt == 4">施工单位</span>
            <span v-if="scope.row.zt == 5">施工单位人员</span>
            <span v-if="scope.row.zt == 6">维修中</span>
            <span v-if="scope.row.zt == 7">已维修</span>
            <span v-if="scope.row.zt == 8">申请验收</span>
            <span v-if="scope.row.zt == 9">已验收</span>
            <span v-if="scope.row.zt == 10">已归档</span>
            <span v-if="scope.row.zt == 11">已计量</span>
            <span v-if="scope.row.zt == 12">已支付</span>
          </template>
        </el-table-column>
        <el-table-column align="left" sortable prop="fxsjStr" label="发现时间" show-overflow-tooltip></el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="290">
          <template scope="scope">
            <!--{{scope.row.state}}-->
            <span   v-if="scope.row.state !=1" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="seedetail('detail',scope.row)">详情</span>
            <span   v-if="scope.row.daYhid == usermsgObj.daYhid" style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="updatejobOrder('update',scope.row);isseedetail = 0">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;" @click="getrowId(scope.row);">指派</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;" @click="getrowId(scope.row,1);" v-if="scope.row.zt==4 ? true : false">打回</span>
            <span   style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="isshowmap = true;">定位</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--指派弹框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose">
      <div style="padding-bottom: 20px;text-align: center">
      <span>指派给：</span>
      <div class="zpcontent" style="display: inline-block;">
        <el-button @click="sendZpparam({id:rowobjId,zt:4})" size="mini" class="btn" v-show="rowObjzt != 4">施工单位</el-button>
        <el-button @click="sendZpparam({id:rowobjId,zt:3})" size="mini" class="btn" v-show="rowObjzt < 3">工程部</el-button>
        <el-button @click="sendZpparam({id:rowobjId,zt:5})" size="mini" class="btn" v-show="rowObjzt != 3">施工人员</el-button>
      </div>
      </div>
    </el-dialog>
    <!--打回任务弹出框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose">
      <span>确定要将任务打回？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="sendZpparam({id:rowobjId,zt:backstatus},1);dialogVisible2 = false">确 定</el-button>
  </span>
    </el-dialog>
    <!--分页区域-->
    <footer class="footer" v-show="!showDetail" >
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
          <span class="titleclasschild"  @click="showDetail = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>{{firstItemTit}}</span>
        </p>
        <div class="SPState">
          <el-button size="mini" class="minibtn"  v-if="isseedetail == 0 && isupdate == false"  @click="addjobOrder('jldModel')"
                     style="display:block;background: #DF4D4A; margin: auto; border-color:transparent;color: #fff;">保存</el-button>
          <el-button size="mini" class="minibtn"  v-if="isseedetail == 0 && isupdate == true" @click="submitjobOrder('jldModel')"
                     style="display:block;background: #DF4D4A; margin: auto; border-color:transparent;color: #fff;">保存</el-button>
        </div>
      </div>
      <div v-show="isseedetail == 0">
        <div style="padding-left: 15px;">
          <el-form  :model="jldModel" :rules="jldModelRules" ref="jldModel" class="taskorder" label-width="100px" style="font-size: 0;">
            <el-form-item class="addJLD" label="项目名称">
              <el-autocomplete
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
            </el-form-item>
            <el-form-item class="addJLD" label="路线名称" prop="lxmc">
              <!--<el-select  size="mini" v-model="jldModel.lxmc" placeholder="输入路线名称" @change="handlechangelxbh">-->
                <!--<el-option-->
                  <!--v-for="item in lxmcarr"-->
                  <!--:key="item.id"-->
                  <!--:label="item.ldname"-->
                  <!--:value="item.ldcode">-->
                <!--</el-option>-->
              <!--</el-select>-->
              <el-input  v-model="jldModel.lxmc" size="mini"  placeholder="请输入内容" disabled></el-input>
            </el-form-item>
            <el-form-item class="addJLD" size="mini" label="养护单位" prop="yhdw">
            <el-input  v-model="jldModel.yhdw"  placeholder="请输入内容" disabled></el-input>
          </el-form-item><el-form-item class="addJLD" label="管理单位" prop="gldw">
            <el-input  v-model="jldModel.gldw" size="mini"  placeholder="请输入内容" disabled></el-input>
          </el-form-item>
            <el-form-item class="addJLD" label="月度" prop="yd">
              <el-date-picker
                size="mini"
                :disabled="isseedetail == 1"
                v-model="jldModel.yd"
                type="month"
                placeholder="选择日期"
                format="MM 月"
                value-format="MM">
              </el-date-picker>
            </el-form-item><el-form-item class="addJLD" label="日期" prop="fxsj">
            <el-date-picker
              size="mini"
              :disabled="isseedetail == 1"
              v-model="jldModel.fxsj"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          </el-form>
        </div>
        <div class="eiconsty">
          <span class="iconfont icon-zhifuguanli" style="font-size: 12px;padding-right: 10px;"></span><span>事件信息</span>
        </div>
        <div style="padding-left: 15px;">
          <el-form :model="jldModel" :rules="jldModelRules" ref="jldModel" label-width="100px" style="font-size: 0;">
            <el-form-item class="addJLD" label="巡查单位" prop="czfs">
              <el-input  size="mini" v-model="jldModel.czfs"  placeholder="请输入内容" disabled></el-input>
            </el-form-item><el-form-item class="addJLD" label="巡查方向" prop="xcfx">
            <el-select  size="mini" v-model="jldModel.xcfx" placeholder="请选择" @change="handlechangexcfx" :disabled="isseedetail == 1">
              <el-option
                v-for="item in xcvaluearr"
                :key="item.meijubm"
                :label="item.meijumc"
                :value="item.meijubm"
              >
              </el-option>
            </el-select>
          </el-form-item><el-form-item class="addJLD" label="车道" prop="cd">
            <!--<el-input  v-model="jldModel.cd"  placeholder="请输入内容" :disabled="isseedetail == 1"></el-input>-->
            <el-select size="mini" v-model="jldModel.cd" placeholder="请选择" :disabled="isseedetail == 1">
              <el-option v-for="(item, index) in cdarr" :key="index" :label="item.cd" :value="item.cd"></el-option>
            </el-select>
          </el-form-item><el-form-item class="addJLD" label="单位工程" prop="dwgc">
            <el-input size="mini"  v-model="jldModel.dwgc"  placeholder="请输入内容" :disabled="isseedetail == 1"></el-input>
          </el-form-item><el-form-item class="addJLD" label="损坏类型" prop="shlx">
            <el-select size="mini" v-model="jldModel.shlx" placeholder="请选择" @change="handlechangeshlx" :disabled="isseedetail == 1">
              <el-option
                v-for="item in shlxarr"
                :key="item.meijubm"
                :label="item.meijumc"
                :value="item.meijubm"
              >
              </el-option>
            </el-select>
          </el-form-item><el-form-item size="mini" class="addJLD" label="病害类型" prop="bhlx">
            <el-cascader
              size="mini"
              v-if="isseedetail == 0"
              :options="bhlxarr"
              :props="props"
              v-model="bhlx1"
              :show-all-levels="false"
              @change="changeBhlx"
            ></el-cascader>
            <el-input v-if="isseedetail == 1"  v-model="jldModel.bhlx"  placeholder="请输入内容" :disabled="isseedetail == 1"></el-input>
          </el-form-item>
            <el-form-item class="addJLD" label="病害数量" prop="bhsl">
              <el-input size="mini"  v-model.number="jldModel.bhsl"   placeholder="请输入内容" :disabled="isseedetail == 1"></el-input>
            </el-form-item>
            <el-form-item class="addJLD" label="病害单位" prop="bhdw">
              <el-input size="mini"  v-model="jldModel.bhdw" placeholder="请输入内容" :disabled="isseedetail == 1" disabled></el-input>
            </el-form-item><el-form-item class="addJLD" label="工程量类型" prop="gcllx">
            <el-select size="mini" v-model="jldModel.gcllx" placeholder="请选择" @change="handlechangecllx" :disabled="isseedetail == 1">
              <el-option
                v-for="item in gcllxarr"
                :key="item.meijubm"
                :label="item.meijumc"
                :value="item.meijubm"
              >
              </el-option>
            </el-select>
          </el-form-item>
            <el-form-item class="addJLD" label="起点桩号" prop="qzh"
            :rules="[
            {type: 'number', message: '起点桩号为数字', trigger: 'blur' },
            {validator: rule_compare, trigger: 'blur'},
            {validator: rule_compare2, trigger: 'blur'}
            ]"
            >
            <el-input size="mini"  v-model.number="jldModel.qzh"   placeholder="请输入内容" :disabled="isseedetail == 1"></el-input>
            </el-form-item>
            <el-form-item class="addJLD" label="止点桩号" prop="zzh"
            :rules="[
            {type: 'number', message: '止点桩号为数字', trigger: 'blur' },
            {validator: rule_compare, trigger: 'blur'},
            {validator: rule_compare3, trigger: 'blur'}
            ]"
            >
              <el-input size="mini"  v-model.number="jldModel.zzh"   placeholder="请输入内容" :disabled="isseedetail == 1"></el-input>
            </el-form-item>
            <div class="bhsm">
              <el-form-item prop="bhsm" label="病害说明">
                <el-input  v-model="jldModel.bhsm" type="textarea" placeholder="请输入内容" class="addJLD-textarea"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div  v-show="isseedetail == 1">
        <div style="padding-left: 15px;font-size: 0;">
          <p class="addJLD">
            <span class="inputlabel">项目名称 ：</span>
            <span class="spanwidth">{{jldModel.xmmc}}</span>
          </p>
          <p class="addJLD">
            <span class="inputlabel">路线名称 ：</span>
            <span class="spanwidth">{{jldModel.lxmc}}</span>
          </p>
          <p class="addJLD">
            <span class="inputlabel">养护单位 ：</span>
            <span class="spanwidth">{{jldModel.yhdw}}</span>
          </p>
          <p class="addJLD">
            <span class="inputlabel">管理单位 ：</span>
            <span class="spanwidth">{{jldModel.gldw}}</span>
          </p>
          <p class="addJLD">
            <span class="inputlabel">月度 ：</span>
            <span class="spanwidth">{{jldModel.yd}}</span>
          </p>
          <p class="addJLD">
            <span class="inputlabel">日期 ：</span>
            <span class="spanwidth">{{jldModel.fxsj}}</span>
          </p>
        </div>
        <div class="eiconsty" style="margin-bottom: 15px;margin-top: 5px;">
          <span class="iconfont icon-zhifuguanli" style="font-size: 12px;padding-right: 10px;"></span><span>事件信息</span>
        </div>
        <div style="padding-left: 15px;font-size: 0;">
          <p class="addJLD">
            <span class="inputlabel">巡查单位 ：</span>
            <span class="spanwidth">{{jldModel.czfs}}</span>
          </p>
          <p class="addJLD">
            <span class="inputlabel">巡查方向 ：</span>
            <span class="spanwidth" v-if="jldModel.xcfx == '0301'">上行</span>
            <span class="spanwidth" v-if="jldModel.xcfx == '0302'">下行</span>
            <span class="spanwidth" v-if="jldModel.xcfx == '0303'">全幅</span>
          </p>
          <p class="addJLD">
            <span class="inputlabel">车道 ：</span>
            <span class="spanwidth">{{jldModel.cd}}</span>
          </p>
          <p class="addJLD">
            <span class="inputlabel">单位工程 ：</span>
            <span class="spanwidth">{{jldModel.dwgc}}</span>
          </p>
          <p class="addJLD">
            <span class="inputlabel">损坏类型 ：</span>
            <span class="spanwidth">{{jldModel.shlxname}}</span>
          </p>
          <p class="addJLD">
            <span class="inputlabel">病害类型 ：</span>
            <span class="spanwidth">{{jldModel.bhname}}</span>
          </p>
          <p class="addJLD">
            <span class="inputlabel">病害数量 ：</span>
            <span class="spanwidth">{{jldModel.bhsl}} {{jldModel.bhdw}}</span>
          </p>
          <p class="addJLD">
            <span class="inputlabel">工程量类型 ：</span>
            <span class="spanwidth">{{jldModel.gcllxname}}</span>
          </p>
          <p class="addJLD">
            <span class="inputlabel">起点桩号 ：</span>
            <span class="spanwidth">{{jldModel.qzh}}</span>
          </p>
          <p class="addJLD">
            <span class="inputlabel">止点桩号 ：</span>
            <span class="spanwidth">{{jldModel.zzh}}</span>
          </p>
          <p class="addJLD" style="display: block;width: 85%;">
            <span class="inputlabel">病害说明 ：</span>
            <span style="width: 80%;vertical-align: middle;">{{jldModel.bhsm}}</span>
          </p>
        </div>
      </div>
    </div>
    <!--地图页面-->
    <div class="tabArea" v-if="isshowmap">
      <p class="tabAreaTit">
        <span class="titleclasschild"  @click="isshowmap = false;"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
        <span>返回</span>
      </p>
      <div style="height: 100%;margin-top: -15px;margin-left: -16px;">
        <el-amap vid="amapDemo" ref="map" :center="center"  :map-manager="amapManager" :zoom="zoom" :events="events" :plugin="plugins" id="container"
                 style="width: 100%;">
          <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events"></el-amap-marker>
          <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
        </el-amap>
        <div class="leftpanel">
          <el-table  :data="YDJHData" tooltip-effect="dark"
                     style="width: 100%;"
                     row-class-name="row_class"
                     @selection-change="clickmap"
                     border>
            <el-table-column
              type="selection"
              align="center"
              width="40">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="40">
            </el-table-column>
            <el-table-column align="center" prop="xmmc" label="项目名称"></el-table-column>
            <el-table-column align="center" prop="bhname" label="病害类型"></el-table-column>
            <el-table-column align="center" prop="" label="起止点桩号" width="150">
              <template scope="scope">
                <span>{{scope.row.qzh}}K - {{scope.row.zzh}}K</span>
              </template>
            </el-table-column>
          </el-table>
          <footer class="footer" style="width: 97%;">
            <div style="float: right;padding: 6px">
              <el-pagination
                @current-change="handleCurrentChange"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </footer>
        </div>
      </div>
    </div>
    <Dialog :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :dialogVisible="dialogVisible"
            @searchXMMC="searchXMMC"
            @searchXMBH="searchXMBH"
            @closeDialog="closeDialog">
    </Dialog>
  </div>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
import { AMapManager } from 'vue-amap'
export default {
 components: {Dialog},
 data () {
    return {
      qdzhparam: null,
      zdzhparam: null,
      rowObjzt: '',
      cdarr: [{cd: 1}, {cd: 2}, {cd: 4}, {cd: 6}],
      jldModelRules: {
        xmbh: [
          {required: true, message: '请选择项目编号', trigger: 'change' }
        ],
        lxbh: [
          {type: 'string', required: true,  message: '请选择路线名称', trigger: 'change' }
        ],
        fxsj: [
          {type: 'string', required: true,  message: '请选择日期', trigger: 'change' }
        ],
        // yd: [
        //   {type: 'string', required: true,  message: '请选择月度', trigger: 'change' }
        // ],
        yhdw: [
          {required: true, message: '养护单位不能为空', trigger: 'blur' }
        ],
        gldw: [
          {type: 'string', message: '请输入汉字', trigger: 'blur' }
        ],
        czfs: [
          {type: 'string', message: '请输入汉字', trigger: 'blur' }
        ],
        xcfx: [
          {type: 'string', required: true,  message: '请选择巡查方向', trigger: 'change' }
        ],
        dwgc: [
          {type: 'string', message: '请输入汉字', trigger: 'blur' }
        ],
        shlx: [
          {type: 'string', required: true,  message: '请选择损坏类型', trigger: 'change' }
        ],
        bhlx: [
          {type: 'string', required: true,  message: '请选择病害类型', trigger: 'change' }
        ],
        bhsl: [
          {type: 'number',  message: '请输入数字', trigger: 'blur' }
        ],
        bhdw: [
          {disable: true}
        ],
        gcllx: [
          {type: 'string', message: '请选择工程量类型', trigger: 'change' }
        ]
      },
      usermsgObj: {
        daBmbm: JSON.parse(localStorage.userMsg)[0].deptList[0].deptCode,
        daBmid: JSON.parse(localStorage.userMsg)[0].deptList[0].deptId,
        daBmmc: JSON.parse(localStorage.userMsg)[0].deptList[0].deptName,
        daYhbm: JSON.parse(localStorage.userMsg)[0].userCode,
        daYhid: JSON.parse(localStorage.userMsg)[0].userId,
        daYhmc: JSON.parse(localStorage.userMsg)[0].userName,
        daZzid: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgId,
        daZzbh: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgCode,
        daZzmc: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgName,
      },
      isshowmap: false,
      plugins: [],
      amapManager: new AMapManager(),
      zoom: 13,
      center: [121.5482123, 29.78034647],
      markers: [],
      windows: [],
      window: '',
      events: {
        // init: (map) => {
        //   var marker = new AMap.Marker({
        //     icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        //     position: [121.5482123, 29.78034647]
        //   })
        //   map.add(marker);
        //   // this.initData(this.gjlist)
        // },
        'click': (e) => {
        }
      },
      gjlist: [
        [121.170417, 28.379594],
        [121.160317, 28.371584],
        [121.152217, 28.365574],
        [121.148517, 28.349564]
      ],
      dialogData: [],
      dialogTableTit:{
        XMMC:'项目名称',XMBH:'项目编号',
      },
      datatypes:'',
      restaurants:[],
      wxorderobj: [],
      tabList: [],
      isShowwxcontent: false,
      activeName: '420310a1-b4ca-4fc9-88c8-22c432912dc1',
      showwxzbDetail: false,
      rowobjId: '',
      backstatus: '',
      dialogVisible1: false,
      dialogVisible2: false,
      isopendelete: false,
      lxmcarr: [],
      deleteIds: '',
      pathname: '',
      xmarr: [{value: 'XM01', label: '项目A'}, {value: 'XM02', label: '项目B'}, {value: 'XM03', label: '项目C'}],
      shlxarr: '',
      gcllxarr: '',
      xcvalue: '',
      xcvaluearr: [],
      isupdate: false,
      props: {
        label: 'text',
        value: 'id',
        children: 'children'
      },
      bhlxarr: [],
      isseedetail: 0,
      tasktitle: '',
      // me
      fileList4: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        status: 'finished'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        status: 'finished'
      }],
      selectRwd: ['601-1-1_一波波形护栏板', '601-1-2_二波波形护栏板', '601-1-3_三波波形护栏板'],
      fileList3: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }
      ],
      dialogImageUrl: '',
      dialogVisible: false,
      bhlx1: [],
      jldModel: {
        xmbh: '',
        xmmc: '',
        sjdh: '',
        lxbh: '',
        fxsj: '',
        yd: '',
        yhdw: '',
        gldw: '',
        czfs: '',
        xcfx: '',
        cd: '',
        dwgc: '',
        shlx: '',
        bhlx: '',
        bhsl: null,
        bhdw: '',
        gcllx: '',
        qzh: null,
        zzh: null,
        bhsm: ''
      },
      BasicInfo: {
        zfzmh: '支付子目号:',
        zmmc: '子目名称:',
        qzzh: '起止桩号:',
        bw: '部位:',
        th: '图号:',
        zjdbh: '质检单编号:',
        cbdw: '承包单位:'
      },
      searchInputVal: '',
      options: [{
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
      tableTits: {
        xmmc: '项目名称',
        // fxsjStr: '发现时间',
        bhname: '病害类型',
        bhsl: '病害数量',
        yhdw: '养护单位'
      },
      zt: '',
      FinsdetailTit: {xmbh: '项目编号', xmmc: '项目名称', wcsj: '完成时间', bz: '备注'},
      stateList: [
        {name: '全部', val: undefined},
        {name: '编制中', val: '1'},
        {name: '工程技术部审核', val: '2'},
        {name: '经营发展部审核', val: '3'},
        {name: '公司分管领导审核', val: '4'},
        {name: '公司领导审批', val: '5'},
        {name: '审批完成', val: '6'}
      ],

      total: 0,
      state: ['', '编制中', '工程技术部审核', ' 经营发展部审核', '公司分管领导审核', '公司领导审批', '审批完成'],
      showFirstItemWindow: false,
      firstItemTit: '',
      showPlan: false,
      searchForm: {
        sjdh: undefined,
        lxmc: undefined,
        xmmc:undefined,
        selectDate: null,
        xmbh: undefined,
        pageNum: 1,
        pageSize: 10,
        daZzid: JSON.parse(localStorage.userMsg)[0].deptList[0].org.orgId
      },
      // 任务清单的数据
      YDJHData: [],
      detailItemInfo: [], // 本月完成情况详情数据
      showDetail: false
    }
  },
  methods: {
    rule_compare (rule,value,callback) {
      console.log(value, 90)
      if (value < this.qdzhparam || value > this.zdzhparam) {
        return callback(new Error('请在'+this.qdzhparam+'-'+this.zdzhparam+'区间内输入'))
      }
      callback ()
    },
    rule_compare2 (rule,value,callback) {
      console.log(value, 90)
      if (value > this.jldModel.zzh) {
        return callback(new Error('起点桩号不能大于止点桩号'))
      }
      callback ()
    },
    rule_compare3 (rule,value,callback) {
      console.log(value, 90)
      if (value < this.jldModel.qzh) {
        return callback(new Error('止点桩号不能小于起点桩号'))
      }
      callback ()
    },
    // 默认显示月度
    getyearAndmonth () {
      // debugger
      let theCurrentMonth = new Date().getMonth()
      theCurrentMonth = theCurrentMonth + 1
      theCurrentMonth =(theCurrentMonth<10 ? "0"+theCurrentMonth:theCurrentMonth);
      this.jldModel.yd = (theCurrentMonth).toString()
      console.log(this.jldModel.yd, '时间')
    },
    // 默认显示年份
    getYear () {
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
      console.log(clock,22)
      this.jldModel.fxsj = clock
    },
    // 点击行标点
    switchWindow(row) {
      let markers = [];
      let windows = [];
      let self = this;
      for (var i = 0; i < row.length; i++) {

        let cent = {};
        cent ={
          position: [row[i].ptx, row[i].pty],
          content: `<div class="prompt" style="width:200px;height:100px;">项目名称:` + row[i].xmmc + `<br />养护单位：` + row[i].yhdw + `<br />病害类型：` + row[i].bhlx + `<br />病害数量：` + row[i].bhsl + `<br />发现时间：` + row[i].fxsj + `<br /></div>`,
          visible: false
        };
        console.log(row[i].ptx, row[i].pty, 3467)
        markers.push({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: [row[i].ptx, row[i].pty],
          events: {
            click() {
              self.windows.forEach(window => {
                window.visible = false;
              });
              console.log(i, 'one day, you will be remember')
              console.log(windows, 'one day, you will be remember')
              self.window = cent;
              // console.log(e,454)
              self.$nextTick(() => {
                // console.log(e, 'belong me')
                self.window.visible = true;
              });
            }
          }
        });


        this.center = [row[i].ptx, row[i].pty]
        if (row.length >1) {
          this.zoom =  6
        }else {
          this.zoom =  9
        }


      }
      this.markers = markers;
      this.windows = windows;
      console.log(this.markers, this.windows, 80)
    },
    clickmap (row) {
      console.log(row, 781);
      if (row && row.length !== 0 ) {
        this.switchWindow(row)
      }
      // this.switchWindow(row)
    },
    // 远程搜索项目名称list
    initqueryXMMC(){
      this.$api.getmcbhList2().then(res=>{
        if(res.code == 1){
          // console.log(this.restaurants, 8080801111)
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
    initData (list) {
      if (list.length === 0) { return }
      AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], (PathSimplifier, $) => {
        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！')
          return
        }

        this.pathSimplifierIns = new PathSimplifier({
          zIndex: 100,
          autoSetFitView: true,
          map: this.$refs.map.$$getInstance(), // 所属的地图实例

          getPath: (pathData, pathIndex) => { // 注意：此处为坐标点的转化
            var lnglatList = []
            pathData.points.map((item, index) => {
              lnglatList.push([item[0], item[1]])
            })
            return lnglatList
          },
          getHoverTitle: (pathData, pathIndex, pointIndex) => {
          },
          renderOptions: {
            pathLineStyle: {
              dirArrowStyle: true
            },
            getPathStyle: (pathItem, zoom) => {
              return {
                pathLineStyle: {
                  strokeStyle: '#316ddb',
                  lineWidth: 5
                },
                pathLineSelectedStyle: {
                  lineWidth: 5 + 2
                },
                pathNavigatorStyle: {
                  fillStyle: '#6ae0b0'
                }
              }
            },
            renderAllPointsIfNumberBelow: 100 // 绘制路线节点，如不需要可设置为-1
          }
        })

        window.pathSimplifierIns = this.pathSimplifierIns
        // initRoutesContainer(d);
        this.pathSimplifierIns.setData([{points: list, name: 'xxxxx'}])

        this.navg = this.pathSimplifierIns.createPathNavigator(0, {
          loop: true,
          speed: 1000,
          pathNavigatorStyle: {
            width: 32,
            height: 32,
            // 使用图片
            content: PathSimplifier.Render.Canvas.getImageContent('./static/img/guiji.png', () => { this.pathSimplifierIns.renderLater() }, (e) => { console.log(e) })
          }
        })
        this.navg.start()
      })
    },
    // 远程搜索项目名称
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
    handleSelectMC(event, param){
      console.log(event,param, '切换项目名称')
      if (param == 1) {
        this.searchForm.xmbh = event.XMBH
        this.searchForm.xmmc = event.XMMC
      } else {
        this.jldModel.xmmc = event.XMMC
        // this.jldModel.xmbh = event.XMBH
        if (event) {
          this.getOnlyXmgkjcxx(event)
        }
      }
    },
    // 项目名称和项目编号的模糊搜索
    searchXMMC(val){
      this.$api.getXmmcListt({xmmc:val}).then(res=>{
        if(res.code == 1){
          this.dialogData = res.data&&res.data.length?res.data:[]
        }else{
          this.dialogData = []
        }
      })
    },
    searchXMBH(val){
      this.$api.getXmbhmhList({xmbh:val}).then(res=>{
        if(res.code == 1){
          this.dialogData = res.data&&res.data.length?res.data:[]
        }else{
          this.dialogData = []
        }
      })
    },
    // 关闭弹窗
    closeDialog(val){
      this.dialogVisible = false
      console.log(val)
      if(val){
        if (this.isseedetail == 0) {
          this.jldModel.xmmc = val.XMMC
          this.jldModel.xmbh = val.XMBH
          this.getOnlyXmgkjcxx(val)
        } else {
          this.searchForm.xmmc = val.XMMC
          this.searchForm.xmbh = val.XMBH
        }
      }
    },
    // 根据项目编号的弹框搜索的项目编号获取项目信息
    getOnlyXmgkjcxx (val) {
      this.jldModel.gldw = val.GLDW
      this.jldModel.yhdw = val.CBDW
      this.jldModel.xmbh = val.XMBH
      this.jldModel.lxmc = val.LXMC
      this.jldModel.lxbm = val.LXBM
      this.qdzhparam = parseFloat(val.QSZH)
      this.zdzhparam = parseFloat(val.ZZZH)
      this.jldModel.qzh = parseFloat(val.QSZH)
      this.jldModel.czfs = val.CBDW
      this.jldModel.zzh = parseFloat(val.ZZZH)
      this.jldModel.yhdwId = val.CBDWID
    },
    // 打开搜索弹窗
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
    // 切换维修记录
    handleClick (tab, event) {
      console.log(tab, event, 8181)
      let _param = tab.name
      this.$api.getRcyhgcWcrwdZbListByWcrwdId('?id=' + _param).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {
          // console.log(res.data, '每一条维修记录子表')
          this.wxorderobj = res.data.data
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 点击指派对象
    sendZpparam (obj, val) {
      this.$api.updateRcyhgcSjqd(JSON.stringify(obj)).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错了',
            type: 'error'
          })
        } else {
          if (val == 1) {
            // debugger
            this.$message({
              message: '已将任务打回',
              type: 'success'
            })
          } else {
            this.$message({
              message: '任务指派成功',
              type: 'success'
            })
          }
          this.dialogVisible1 = false
          this.queryYDJHData()
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 打开指派任务对话框传参
    getrowId (row,isback) {
      console.log(row, '指派获取对象')
      this.rowobjId = row.id
      this.rowObjzt  = row.zt
      this.backstatus = row.zt - 1
      // if (row.zt == 4 || row.zt == 5) {
      //   this.backstatus = row.zt - 1
      // } else {
      //   this.backstatus = 6
      // }
      this.open(this.rowobjId, this.rowObjzt)
      if (isback) {
        this.openback(this.rowobjId,this.backstatus)
      }
    },
    // 打开指派任务窗口
    open(rowId, zt) {
      const h = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '点击确认系统将自动将任务指派给'),
          h('i', { style: 'color: teal' },zt == '3' ? '施工单位': '施工人员')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            this.sendZpparam({id: rowId,zt: parseInt(zt) + 1})
            done();
            setTimeout(() => {
              instance.confirmButtonLoading = false;
            }, 300);
            // setTimeout(() => {
            //
            // }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      }).catch(e => {
        console.log(e)
      });
    },
    // 打开任务打回按钮
    openback(rowId, zt) {
      const h = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '点击确认系统将自动将任务打回到'),
          h('i', { style: 'color: teal' }, '工程部')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            this.sendZpparam({id: rowId,zt: zt}, 1)
            done();
            setTimeout(() => {
              instance.confirmButtonLoading = false;
            }, 300);
            // setTimeout(() => {
            //
            // }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      }).catch(e => {
        console.log(e)
      });
    },
    // 关闭指派任务对话框
    handleClose (done) {
      this.dialogVisible1 = false
      this.dialogVisible2 = false
    },
    // 选中表格行
    isselect (row) {
      console.log(row)
      // deleteIds
      let idarr = []
      for (var i = 0; i < row.length; i++) {
        idarr.push(row[i].id)
      }
      // console.log(idarr.toString(), 'id集合')
      this.deleteIds = idarr.toString()
    },
    // 病害类型选择是触发的方法
    changeBhlx (data) {
      console.log(data, '病害类型')
      if (data && data.length !=0) {
        this.bhlx1 = data
        this.jldModel.bhlx = this.bhlx1[this.bhlx1.length -1]
        console.log(this.jldModel.bhlx, '病害传值')
        this.getbhDwbybhlx(this.jldModel.bhlx)
      }
    },
    getbhDwbybhlx (param) {
      this.$api.getBhDwByBhid({bhid: param}).then(res => {
        if(res.status !=200) {
          this.$message({
            message: '网络错误',
            type: 'error'
          })
        } else {
          this.jldModel.bhdw = res.data ? res.data : ''
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 获取路段信息
    getlxmessage () {
      let _param = '0101'
      this.$api.getlxId('?bmCode=' + _param).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错了',
            type: 'error'
          })
        } else {
          console.log(res.data, 4648)
          this.lxmcarr = res.data.data
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 巡查方向
    handlechangexcfx (val) {
      // console.log(val)
      this.jldModel.xcfx = val
      console.log(this.jldModel.xcfx)
    },
    handlechangeshlx (val) {
      this.jldModel.shlx = val
    },
    handlechangecllx (val) {
      this.jldModel.gcllx = val
    },
    // 项目编号及名称
    handlexmbh (val) {
      console.log(val, 23)
      this.jldModel.xmbh = val.value
      this.jldModel.xmmc = val.label
    },
    // 切换路段
    handlechangelxbh (val) {
      this.jldModel.lxbm = val
      console.log(this.jldModel.lxbm, 7979)
    },
    handleChange (file, fileList) {
      console.log(file, '===files')
      console.log(fileList, '===fileList')
      console.log(this.fileList4, '===this.fileList4')
      // this.fileList4 = fileList.slice(-3);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handHttpRequest (a) {
      // 上传图片
      console.log(a, '===上传图片')
    },
    handleSelectionChange (row) {
      this.selectRwd = [ ]
      row.forEach(item => {
        this.selectRwd.push(item.zmmc)
      })
    },
    delRwd (index) {
      this.selectRwd.splice(index, 1)
    },
    handleRemove (file, fileList) {
      // 删除图片
      console.log('删除图片')
    },
    handlePictureCardPreview (file) {
      // 放大图片查看
      console.log('放大图片查看')
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
    },
    selectable2: function (row, index) { // 禁用第四个
      // return true
      if (row.daYhid == JSON.parse(localStorage.userMsg)[0].userId) {
        return true
      } else {
        return false
      }
    },
    resizeSearch () {
      this.searchForm.sjdh = undefined
      this.searchForm.lxmc = undefined
      this.searchForm.xmbh = undefined
      this.searchForm.xmmc = undefined
      this.searchForm.selectDate = undefined
      this.searchForm.pageNum = 1
    },
    deleterows () {
      let _param = this.deleteIds
      if(_param){
        this.$api.deleteRcyhgcSjqd('?id=' + _param).then(res => {
          if (res.status !== 200) {
            this.$message({
              message: '网络出错了',
              type: 'error'
            })
          } else {
            this.$confirm('此操作将删除该选中数据, 是否继续？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.queryYDJHData()
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          }
        }).catch(e => {
          console.log(e)
        })
      }else{
        this.$message({
          message: '请选择要删除的内容',
          type: 'warning'
        });
      }

    },
    // 详情内 点击
    handOneRowSecod (row, event, column) {
      this.detailItemInfo = [
        {zmmc: '二波波形护栏板', zmh: '602-1-1', dw: 'm', sl: '880'},
        {zmmc: '二波波形护栏板', zmh: '602-1-1', dw: '根', sl: '880'},
        {zmmc: '二波波形护栏板', zmh: '602-1-1', dw: '根', sl: '880'},
        {zmmc: '二波波形护栏板', zmh: '602-1-1', dw: 'm', sl: '880'}
      ]
      this.showFirstItemWindow = true
    },
    // 操作通过打回等按钮
    promiseTG (bol) {
      // 详情查看
      this.showDetail = false
      this.showFirstItemWindow = false
      this.isShowwxcontent = false
    },
    // 获取想要的枚举（工程量类型，损坏类型，巡查方向）
    getMeijulxbm () {
      let _param = '03,08,09'
      this.$api.getEnumByMeijulxbm('?meijulxbm=' + _param).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {
          console.log(res.data, 6767)
          let valuearr = {}
          valuearr = res.data.data.rows
          for (let item in valuearr) {
            console.log(item, 888)
            if (item == '03') {
              this.xcvaluearr = valuearr[item]
            } else if (item == '08') {
              this.shlxarr = valuearr[item]
            } else if (item == '09') {
              this.gcllxarr = valuearr[item]
            }
          }
          console.log(this.xcvaluearr, '巡查方向数据')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 修改任务单保存
    submitjobOrder (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 桩号转经纬度
          if (this.jldModel.qzh && this.jldModel.zzh) {
            let fparam = 'LXDM='+this.jldModel.lxbm+' AND SXXFX='+this.jldModel.xcfx
            let mparam = (parseInt(this.jldModel.qzh)+ parseInt(this.jldModel.zzh))/2

            // let paramsObj = {
            //   params: {
            //     layerName: 'GIS_LX',
            //     filter:"LXDM=" +"\'G15\'" + 'AND SXXFX=1',
            //     m: '1504.2'
            //   }
            // }
            let paramsObj = {
              params: {
                layerName: 'GIS_LX',
                filter: fparam,
                m: mparam
              }
            }
            this.$api.getLonLatByPos({params: JSON.stringify(paramsObj.params)}).then(res => {
              if (res.status !== 200) {
                this.$message({
                  message: '网络出错',
                })
              } else {

                if(res.data != null) {
                  this.jldModel.lat = res.data.lat
                  this.jldModel.lon = res.data.lon
                }
              }
            }).catch(e => {
              console.log(e)
            })
          }
          this.$api.updateRcyhgcSjqd(this.jldModel).then(res => {
            if (res.status !== 200) {
              this.$message({
                message: '网络出错了',
                type: 'error'
              })
            } else {
              console.log(res.data, '修改任务单')
              this.$message({
                message: '信息修改成功',
                type: 'success'
              })
              this.showDetail = false
              this.queryYDJHData()
            }
          }).catch()
        }
      })
    },
    // 编辑任务单
    updatejobOrder (type, row) {
      this.jldModel = row
      this.updateFormDia(type, row)
    },
    // 查看详情
    seedetail (type, row) {
      console.log(row, 23)
      this.jldModel = row
      this.isseedetail = 1
      this.rowobjId = row.id
      this.updateFormDia(type, row)
      this.getservicerecord()
    },
    // 获取事件清单列表的每个事件对应的维修记录
    getservicerecord () {
      this.$api.getRcyhgcWcrwdListBySjqdId('?id=' + this.rowobjId).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错了',
            type: 'error'
          })
        } else {
          console.log(res.data, '获取维修列表数据')
          this.tabList = res.data.data
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 用于添加任务单的病害类型
    getbhlxarr () {
      this.$api.createBhlxTree().then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错了',
            type: 'error'
          })
        } else {
          console.log(res.data, 4848)
          this.bhlxarr = res.data.data
          this.dealdata(res.data.data)
        }
      })
    },
    // 处理病害类型级联数据
    dealdata (_data) {
      for (var i = 0; i < _data.length; i++) {
        if (_data[i].children.length < 1) {
          _data[i].children = undefined
        } else {
          this.dealdata(_data[i].children)
        }
      }
      return _data
    },

    // 添加事件任务单，养护任务单，任务单验收
    addjobOrder (formName) {
  // debugger
  this.$refs[formName].validate((valid) => {
    if (valid) {
      if (this.jldModel.qzh && this.jldModel.zzh) {
        let fparam = 'LXDM='+this.jldModel.lxbm+' AND SXXFX='+this.jldModel.xcfx
        let mparam = (parseInt(this.jldModel.qzh)+ parseInt(this.jldModel.zzh))/2
        console.log(fparam, mparam, '彩虹屁')
        // let paramsObj = {
        //    params: {
        //      layerName: 'GIS_LX',
        //      filter:"LXDM=" +"\'G15\'" + 'AND SXXFX=1',
        //      m: '1504.2'
        //    }
        // }
        let paramsObj = {
          params: {
            layerName: 'GIS_LX',
            filter: fparam,
            m: mparam
          }
        }
        this.$api.getLonLatByPos({params: JSON.stringify(paramsObj.params)}).then(res => {
          if (res.status !== 200) {
            this.$message({
              message: '网络出错',
            })
          } else {
            console.log(res.data, 1111)
            if(res.data != null) {
              this.jldModel.lat = res.data.lat
              this.jldModel.lon = res.data.lon
            }
          }
        }).catch(e => {
          console.log(e)
        })
      }
      let paramObj = this.jldModel
      let timeStr = (new Date()).getTime()
      paramObj.sjdh = 'sjdh' + timeStr
      paramObj = Object.assign(this.usermsgObj,this.jldModel)
      // console.log(this.qszh1,this.zzzh2, 77070)
      // console.log(paramObj, 7070)
      let usertype = config.userInfo.userType
      if (usertype == '供应商') {
        paramObj.zt = 4
      } else {
        paramObj.zt = 3
      }
      this.$api.insertRcyhgcSjqd(paramObj).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错了',
            type: 'error'
          })
        } else {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.showDetail = false
          this.queryYDJHData()
        }
      }).catch(e => {
        console.log(e)
      })
    }
  })
},
    // 编辑 详情  本月完成情况 下月计划
    updateFormDia (type, row) {
      console.log(row, 8080)
      if (type == 'add') {
        this.tasktitle = '添加任务单'
        this.firstItemTit = '添加任务单'
        this.isupdate = false
        this.bhlx1 = []
        this.jldModel = {
          xmbh: '',
          xmmc: '',
          sjdh: '',
          lxbh: '',
          fxsj: '',
          yd: '',
          yhdw: '',
          gldw: '',
          czfs: '',
          xcfx: '',
          cd: '',
          dwgc: '',
          shlx: '',
          bhlx: '',
          bhsl: null,
          bhdw: '',
          gcllx: '',
          qzh: null,
          zzh: null,
          bhsm: ''
        }
        this.getyearAndmonth()
        this.getYear()
      } else if (type == 'detail') {
        this.tasktitle = '任务单详情'
        this.firstItemTit = '任务单详情'
      } else if (type == 'update') {
        this.tasktitle = '任务单编辑'
        this.firstItemTit = '任务单编辑'
        this.isupdate = true
        console.log(row)
        this.qdzhparam = row.qzh
        this.zdzhparam = row.zzh
        if (row.bhlx) {
          let bharr =[]
          if (row.bhlx.length == 2) {
            bharr.push(row.bhlx)
          } else if (row.bhlx.length == 4) {
            bharr.push(row.bhlx.slice(0,2))
            bharr.push(row.bhlx)
          } else if (row.bhlx.length == 6) {
            bharr.push(row.bhlx.slice(0,2))
            bharr.push(row.bhlx.slice(0,4))
            bharr.push(row.bhlx)
          } else if (row.bhlx.length == 8) {
            bharr.push(row.bhlx.slice(0,2))
            bharr.push(row.bhlx.slice(0,4))
            bharr.push(row.bhlx.slice(0,6))
            bharr.push(row.bhlx)
          }
          console.log(bharr, 789111)
          this.bhlx1 = bharr
        }
        row.bhsl = parseInt(row.bhsl)
        row.qzh = parseFloat(row.qzh)
        row.zzh = parseFloat(row.zzh)
        this.jldModel = row
      }
      this.showDetail = !this.showDetail
      this.showPlan = true
    },
    // 分页展示数据
    handleCurrentChange (val) {
      this.searchForm.pageNum = val
      this.queryYDJHData()
    },
    // 初始化查询
    searchYDJH () {
      this.queryYDJHData()
    },
    // 初始化列表数据
    queryYDJHData (val) {
      let {xmmc,xmbh,selectDate, pageNum, pageSize, daZzid} = this.searchForm
      let startDate, endDate
      if (selectDate && selectDate.length) {
        startDate = selectDate[0]
        endDate = selectDate[1]
      }
      let ztparam = ''
      if (config.userInfo.userType && config.userInfo.userType== '供应商') {
        ztparam = '4'
      } else {
        ztparam = '3'
      }
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
      console.log(xmbhOfinit,8888)
      this.$api.getRcyhgcSjqdList({
        xmbh: xmbh == undefined ? xmbhOfinit.XMBH : xmbh,
        startDate: startDate,
        endDate: endDate, pageNum, pageSize, daZzid,
        zt: ztparam
      }).then(res => {
        // debugger
        console.log(res)
        if (res.status === 200) {
          this.YDJHData = res.data.data.rows
          this.total = res.data.data.totle
        } else {
          this.$message({
            message: '网络出错了',
            type: 'error'
          })
        }
      })
    }
  },
  mounted () {
    this.getbhlxarr() // 病害类型
    this.getMeijulxbm() // 获取枚举数据
    this.getlxmessage() // 获取路段信息
    this.initqueryXMMC() // 获取项目名称列表
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
  .middleInput{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 101px 0 10px;
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
  .wxtabArea {
    width: 100%;
    height:calc(100% - 370px);
    overflow-y: auto;
    padding-left: 31px;
    background: #fff;
  }
 .eiconsty {
   padding-right: 10px;
   height: 16px;
   /*margin-top: 10px;*/
   margin-bottom: 10px;
   line-height: 16px;
   font-size: 12px;
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
  .SPState{
    position: absolute;
    right: 26px;
    top: 17px;
    z-index: 999;
    cursor: pointer;
    p{
      display: inline-block;
      padding: 0 5px;
      height: 30px;
      -webkit-border-radius:5px;
      -moz-border-radius:5px;
      border-radius:5px;
      font-size: 14px;
      cursor: pointer;
      text-align: center;
      line-height: 30px;
      border: 1px solid #e6ecf5;
    }
  }
</style>
