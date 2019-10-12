/**
* ----养护任务单
*/
<template>
  <div id="kgsqd" style="height: 100%;position:relative;overflow-x: hidden;" >
    <div class="header"  v-show="!showDetail" >
      <span class="headerTit">养护任务单(人员)</span>
      <div class="header_option">
        <ul>
          <!--<li><i class="el-icon-search"> 查询</i></li>-->
          <!--<li @click="updateFormDia('add');isseedetail = 0"><i class="el-icon-edit-outline"> 添加</i></li>-->
          <!--<li @click="deleterows"><i class="el-icon-delete"> 删除</i></li>-->
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
                @select="handleSelectMC"
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
        <el-table-column align="left" sortable prop="fxsjStr" label="日期"></el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="290">
          <template scope="scope">
            <span   style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="seedetail('detail',scope.row);getservicerecord(scope.row);isshowdetailOfseewx = 0;isShowwxcontent = true">详情</span>
            <span   style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="seedetail('detail',scope.row,1); isshowdetailOfseewx = 1;">维修</span>
            <span   style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="seedetail('detail',scope.row,1);getservicerecord(scope.row);showzbdetail = true" v-if="scope.row.wcrwdsl != 0">编辑</span>
            <span   style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="finishTask(scope.row)"
                   v-if="scope.row.wcrwdsl != 0"
            >完成</span>
            <span   style="color:#00a2fd;cursor: pointer;text-align: center;margin-right: 10px;"
                    @click="isshowmap = true;">定位</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      <!--详情-->
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild"  @click="showDetail = false; isShowwxcontent = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>{{firstItemTit}}</span>
        </p>
      </div>
      <div style="padding-left: 31px;">
        <p class="addJLD" v-for = '(item, keyname) in nameObj1'>
          <span class="inputlabel">{{item}} ：</span>
          <span class="spanwidth">{{jldModel[keyname]}}</span>
        </p>
      </div>
      <div class="eiconsty" style="padding-left: 16px;">
        <span class="iconfont icon-zhifuguanli" style="font-size: 12px;padding-right: 10px;"></span><span>事件信息</span>
      </div>
      <div style="padding-left: 31px;">
        <p class="addJLD" v-for = '(item, keyname) in eventname' :style="keyname == 'bhsm' ? 'width: 85%;' : ''">
          <span class="inputlabel">{{item}} ：</span>
          <span class="spanwidth" v-if="keyname == 'bhsm'" style="width: 80%;vertical-align: middle;">{{jldModel[keyname]}}</span>
          <span class="spanwidth" v-else>{{jldModel[keyname]}}</span>
        </p>
      </div>
      <div style="width: calc(100% + 18px);margin-left: -18px;margin-right: 0px;padding-left: 0px; padding-right: 0px;height:4px;background-color: #c0cad6;"></div>
      <!--查看详情的维修记录-->
      <div v-show="isshowdetailOfseewx === 0">
         <div class="wxstyle eiconsty" style="cursor: pointer;">
           <span class="iconfont icon-sanjiaoxing" style="font-size: 13px;padding-left: 10px;" @click="isShowwxcontent = true" v-if="isShowwxcontent === false"></span>
           <span class="iconfont icon-sanjiao01" style="font-size: 13px;padding-left: 10px;" @click="isShowwxcontent = false" v-if="isShowwxcontent === true"></span>
           <span>维修记录</span>
         </div>
         <!--维修记录子表内容-->
         <div class="wxtabArea" v-show="isShowwxcontent">
           <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-right: 16px;">
             <el-tab-pane :label="item.wcsj" :name="'active'+ index" v-for="(item, index) in tabList" :key="index"></el-tab-pane>
           </el-tabs>
           <div style="padding-left: 15px;">
             <div v-for="(item, index) in wxorderobj" :key="index" style="margin-bottom: 15px;border-bottom: 1px solid #f1f4f7;font-size: 0;">
               <!--{{item}}-->
               <p class="addJLD"><span class="wxinputlabel">月度计划工程内容 ：</span><span>{{item.gcnr}}</span></p>
               <p class="addJLD"><span class="wxinputlabel">病害类型 ：</span><span>{{item.bhname}}</span></p>
               <p class="addJLD"><span class="wxinputlabel">数&nbsp;&nbsp;&nbsp;&nbsp;量 ：</span><span>{{item.sl}} {{item.dw}}</span></p>
               <p class="addJLD">
                 <span class="wxinputlabel">施工前照片 ：</span>
                 <span v-for="(item, index) in beforeImg" :key="index" @click="openBigimg(item, '施工前照片')">
                    <img :src="item" alt="" class="workimg">
                 </span>
               </p>
               <p class="addJLD">
                 <span class="wxinputlabel">施工中照片 ：</span>
                 <span v-for="(item, index) in duringImg" :key="index" @click="openBigimg(item, '施工中照片')">
                    <img :src="item" alt="" class="workimg">
                 </span>
               </p>
               <p class="addJLD">
                 <span class="wxinputlabel">施工后照片 ：</span>
                 <span v-for="(item, index) in afterImg" :key="index" @click="openBigimg(item, '施工后照片')">
                    <img :src="item" alt="" class="workimg">
                 </span>
               </p>
               <p class="addJLD" style="width: 69%;margin-bottom: 24px;"><span class="wxinputlabel">备&nbsp;&nbsp;注 ：</span><span>{{item.bz}}</span></p>
             </div>
           </div>
         </div>
       </div>
      <!--点击维修下的维修记录页面-->
      <div v-show="isshowdetailOfseewx === 1">
        <div class="wxstyle eiconsty" style="cursor: pointer;">
          <span class="iconfont icon-zhifuguanli" style="font-size: 12px;padding-right: 10px;"></span>
          <span>维修记录</span>
          <span style="position: relative;left: 62%;">
            完成时间&nbsp;&nbsp;
            <el-date-picker
              v-model="wxFormData.wcsj"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              size="mini"
              placeholder="选择日期时间">
          </el-date-picker>
          </span>
        </div>
        <div class="wxheader_option">
          <ul>
            <li><i class="iconfont icon-save" style="font-size: 12px;padding-right: 10px;" @click="insertRcyhgcWcrwdAndZb"> 保存</i></li>
            <li @click="addwxOfrowObj"><i class="el-icon-edit-outline"> 添加</i></li>
            <li @click="deletewxOfrowObj"><i class="el-icon-delete"> 删除</i></li>
          </ul>
          <div style="clear: both;display: inline-block;"></div>
        </div>
        <!--维修记录子表内容-->
        <el-form style="padding-left: 31px;" class="labelwidth">
          <div v-for="(item, index) in wxAddObj" :key="index" :class="checkborder.indexOf(index) != -1 ? 'wxbox': 'nobox'">
            <span :style=" 'position: absolute;left: 26px;'+'top: calc(100% - 449px);'*(index+1)"><el-checkbox  @change="isshowchecked($event,index)"></el-checkbox></span>
            <el-form-item label="月度计划工程内容" class="addJLD">
              <!--<el-input size="mini" placeholder="请输入内容" v-model="item.gcnr"></el-input>-->
              <el-select v-model="item.gcnr" placeholder="请选择" size="mini" @change="changegcnr($event, index)">
                <el-option
                  v-for="(item, index) in gcnrList"
                  :key="index"
                  :label="item.GCNR"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="病害类型" class="addJLD">
              <el-cascader
                v-model="item.bhlxarr"
                size="mini"
                :options="wxbhlxarr"
                :props="props"
                :show-all-levels="false"
                @change="changeBhlxOfwx($event, index, 1)"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="病害数量" class="addJLD">
              <el-input size="mini" placeholder="请输入内容" v-model="item.sl"></el-input>
            </el-form-item>
            <el-form-item label="病害单位" class="addJLD">
              <el-input size="mini"  v-model="item.dw"   placeholder="请输入内容" disabled></el-input>
            </el-form-item>
            <el-form-item label="施工前照片" class="addJLD">
              <!--<el-input size="mini" placeholder="请输入内容"></el-input>-->
              <div @click="clickparam('3001', index)">
                <el-upload
                  action="111"
                  multiple
                  list-type="picture-card"
                  :limit="2"
                  :file-list="fildDatas"
                  :on-remove="handleRemove"
                  :http-request="handHttpRequest"
                  class="wxupdateImg">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item label="施工中照片" class="addJLD">
              <div @click="clickparam('3002', index)">
                <el-upload
                  action="111"
                  multiple
                  list-type="picture-card"
                  :limit="2"
                  :file-list="fildDatas2"
                  :on-remove="handleRemove2"
                  :http-request="handHttpRequest2"
                  class="wxupdateImg">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item label="施工后照片" class="addJLD">
              <div @click="clickparam('3003', index)">
                <el-upload
                  action="111"
                  multiple
                  list-type="picture-card"
                  :limit="2"
                  :file-list="fildDatas3"
                  :on-remove="handleRemove3"
                  :http-request="handHttpRequest3"
                  class="wxupdateImg">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item class="addJLD" style="display: block;width: 80%;" label="备注">
              <el-input  v-model="item.bz" type="textarea"  placeholder="请输入内容" style="width: 40.5%;vertical-align: middle;"></el-input>
            </el-form-item>
          </div>
        </el-form>
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
    <!--修改维修单子表页面-->
    <div class="tabArea" v-if="showzbdetail">
      <div style="position:relative;">
        <p class="tabAreaTit">
          <span class="titleclasschild"  @click="showzbdetail = false;showDetail = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>{{firstItemTit}}</span>
        </p>
      </div>
      <div style="padding-left: 31px;">
        <p class="addJLD" v-for = '(item, keyname) in nameObj1'>
          <span class="inputlabel">{{item}} ：</span>
          <span class="spanwidth">{{jldModel[keyname]}}</span>
        </p>
      </div>
      <div class="eiconsty" style="padding-left: 16px;">
        <span class="iconfont icon-zhifuguanli" style="font-size: 12px;padding-right: 10px;"></span><span>事件信息</span>
      </div>
      <div style="padding-left: 31px;">
        <p class="addJLD" v-for = '(item, keyname) in eventname' :style="keyname == 'bhsm' ? 'width: 85%;' : ''">
          <span class="inputlabel">{{item}} ：</span>
          <span class="spanwidth" v-if="keyname == 'bhsm'" style="width: 80%;vertical-align: middle;">{{jldModel[keyname]}}</span>
          <span class="spanwidth" v-else-if="keyname == 'xcfx' && jldModel[keyname] == '0301'">上行</span>
          <span class="spanwidth" v-else-if="keyname == 'xcfx' && jldModel[keyname] == '0302'">下行</span>
          <span class="spanwidth" v-else-if="keyname == 'xcfx' && jldModel[keyname] == '0303'">全幅</span>
          <span class="spanwidth" v-else>{{jldModel[keyname]}}</span>
        </p>
      </div>
      <div style="width: calc(100% + 16px);margin-left: -16px;margin-right: 0px;padding-left: 0px; padding-right: 0px;height:4px;background-color: #c0cad6;"></div>
      <div>
        <div class="wxstyle eiconsty" style="cursor: pointer;">
          <span class="iconfont icon-zhifuguanli" style="font-size: 12px;padding-right: 10px;"></span>
          <span>维修记录</span>
          <span style="position: relative;left: 63%;">
            完成时间&nbsp;&nbsp;
            <el-select v-model="value" placeholder="请选择" @change="changeTimeList" size="mini">
              <el-option
                v-for="item in tabList"
                :key="item.id"
                :label="item.wcsj"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </span>
        </div>
        <div>
          <div class="wxheader_option">
            <ul>
              <li><i class="iconfont icon-save" style="font-size: 12px;padding-right: 10px;" @click="updateRcyhgcWcrwdAndZb"> 保存</i></li>
              <li @click="addwxupdateObj"><i class="el-icon-edit-outline"> 添加</i></li>
              <li @click="deleteupdateOfrow"><i class="el-icon-delete"> 删除</i></li>
            </ul>
            <div style="clear: both;display: inline-block;"></div>
          </div>
          <el-form style="padding-left: 31px;" class="labelwidth">
            <div v-for="(item, index) in wxupdateObj" :key="index" :class="checkborder.indexOf(index) != -1 ? 'wxbox': 'nobox'">
              <span :style=" 'position: absolute;left: 26px;'+'top: calc(100% - 449px);'*(index+1)"><el-checkbox  @change="isshowchecked($event,index)"></el-checkbox></span>
              <el-form-item label="月度计划工程内容" class="addJLD">
                <!--<el-input size="mini" placeholder="请输入内容" v-model="item.gcnr"></el-input>-->
                <el-select v-model="item.gcnr" placeholder="请选择" size="mini" @change="getupdategcnrList($event, index)">
                  <el-option
                    v-for="(item, index) in gcnrList"
                    :key="index"
                    :label="item.GCNR"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <!--{{item.bhlxarr}}-->
              <el-form-item label="病害类型" class="addJLD">
                <el-cascader
                  v-model="item.bhlxarr"
                  size="mini"
                  :options="wxbhlxarr"
                  :props="props"
                  :show-all-levels="false"
                  @change="changeBhlxOfwx($event, index, 0)"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="病害数量" class="addJLD">
                <el-input size="mini" placeholder="请输入内容" v-model="item.sl" @blur="uploadOfrowindex = index"></el-input>
              </el-form-item>
              <el-form-item label="病害单位" class="addJLD">
                <el-input size="mini"  v-model="item.dw"   placeholder="请输入内容" disabled></el-input>
              </el-form-item>
              <el-form-item label="施工前照片" class="addJLD">
                <!--<el-input size="mini" placeholder="请输入内容"></el-input>-->
                <div @click="clickparam('3001', index)">
                  <el-upload
                    action="111"
                    multiple
                    :limit="2"
                    list-type="picture-card"
                    :file-list="fildDatas"
                    :on-remove="handleRemove"
                    :http-request="handHttpRequest1"
                    class="wxupdateImg">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </div>
              </el-form-item>
              <el-form-item label="施工中照片" class="addJLD">
                <div @click="clickparam('3002', index)">
                  <el-upload
                    action="111"
                    multiple
                    list-type="picture-card"
                    :limit="2"
                    :file-list="fildDatas2"
                    :on-remove="handleRemove2"
                    :http-request="handHttpRequest2"
                    class="wxupdateImg">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </div>
              </el-form-item>
              <el-form-item label="施工后照片" class="addJLD">
                <div @click="clickparam('3003', index)">
                  <el-upload
                    action="111"
                    multiple
                    list-type="picture-card"
                    :limit="2"
                    :file-list="fildDatas3"
                    :on-remove="handleRemove3"
                    :http-request="handHttpRequest3"
                    class="wxupdateImg">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </div>
              </el-form-item>
              <el-form-item class="addJLD" style="display: block;width: 80%;" label="备注">
                <el-input  v-model="item.bz" type="textarea"  placeholder="请输入内容" style="width: 40.5%;vertical-align: middle;" @blur="uploadOfrowindex = index"></el-input>
              </el-form-item>
            </div>
          </el-form>
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
    <!--大图片的窗口-->
    <el-dialog
      :title="titlename"
      :visible.sync="showbigImg"
      width="53%"
      :before-close="closeBigimg">
      <img :src="bigImgsrc" alt="" style="width: 100%;">
    </el-dialog>
  </div>
</template>

<script>
  import Dialog from '@/components/Dialog.vue'
  import { AMapManager } from 'vue-amap'
  export default {
    components: {Dialog},
    data () {
      return {
        uploadArr1:[],
        uploadArr2:[],
        uploadArr3:[],
        // iscompelte: false,
        nameObj1: {
          xmbh: '项目编号',
          xmmc: '项目名称',
          lxmc: '路线名称',
          yhdw: '养护单位',
          gldw: '管理单位',
          yd: '月度',
          fxsj: '日期',
        },
        eventname: {
          czfs: '巡查单位',
          xcfx: '巡查方向',
          cd: '车道',
          dwgc: '单位工程',
          shlxname: '损坏类型',
          bhname: '病害类型',
          bhsl: '病害数量',
          bhdw: '病害单位',
          gcllxname: '工程量类型',
          qzh: '起点桩号',
          zzh: '止点桩号',
          bhsm: '病害说明'
        },
        uploadOfrowindex: null,
        value: '',
        timeList: [],
        showzbdetail: false,
        showbigImg: false,
        bigImgsrc: '',
        titlename: '',
        beforeImg: [],
        duringImg: [],
        afterImg: [],
        bhdwparam: '',
        gcnrList: [],
        fileMjlx: '',
        fildDatas:[],
        fildDatas2:[],
        fildDatas3:[],
        uuidsID:'',
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
          //   // console.log(map, 'aaa')
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
        isshowmap: false,
        // checkborder: null,
        checkborder:[],
        wxAddObj: [
          {
            bhlxarr: [],
            dw: '',
            gcnr: '',
            sl: '',
            bz: '',
            lx: '',
            id: ''
          }
        ],
        wxupdateObj:[],
        wxFormData:{
          wcsj: ''// new Date().toLocaleString('chinese', { hour12: false }).replace(new RegExp('/','g'), '-')
        },
        wxupdateFormData: {},
          isshowdetailOfseewx: 0,
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
        dialogData: [],
        dialogTableTit:{
          XMMC:'项目名称',XMBH:'项目编号',
        },
        datatypes:'',
        restaurants:[],
        wxorderobj: [],
        tabList: [],
        isShowwxcontent: true,
        activeName: 'active0',
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
        // dataObj: {},
        bhlxarr: [],
        wxbhlxarr:[],
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
        wxbhlx1: [],
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
          bhsl: '',
          bhdw: '',
          gcllx: '',
          qzh: '',
          zzh: '',
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
        options: [],
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
        state: ['', '编制中', '工程技术部审核', '经营发展部审核', '公司分管领导审核', '公司领导审批', '审批完成'],
        showFirstItemWindow: false,
        firstItemTit: '',
        showPlan: false,
        searchForm: {
          sjdh: undefined,
          lxmc: undefined,
          xmmc: undefined,
          xmbh: undefined,
          selectDate: null,
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

      // 默认显示年份
      getYear () {
        // var now = new Date()
        // var year = now.getFullYear() //年
        // var month = now.getMonth() + 1 //月
        // var day = now.getDate() //日
        // var clock = year + "-"
        // if(month < 10)
        //   clock += "0"
        // clock += month + "-"
        // if(day < 10)
        //   clock += "0"
        // clock += day + " "
        // console.log(clock,22)
        // this.wxFormData.wcsj = clock
        var date = new Date();
        var month = date.getMonth() + 1;

        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var hours = date.getHours();
        if (hours >=0 && hours <= 9) {
          if (hours == 0) {
            hours = "00";
          } else{
            hours = "0" + hours;
          }
        }
        var minutes = date.getMinutes();
        if (minutes >=0 && minutes <= 9) {
          if (minutes == 0) {
            minutes = "00";
          } else{
            minutes = "0" + minutes;
          }
        }
        var seconds = date.getSeconds();
        if (seconds >=0 && seconds <= 9) {
          if (seconds == 0) {
            seconds = "00"
          } else{
            seconds = "0" + seconds
          }
        }
        var currentdate = date.getFullYear()+"-"+ month+"-"+strDate+" "+hours+":"+minutes+ ":"+seconds;
        this.wxFormData.wcsj = currentdate
        console.log(currentdate, '输出完成时间')
        console.log(this.wxFormData.wcsj, '输出完成时间')
      },
      // 点击完成修改状态值
      finishTask (row) {
        row.zt = '7'
        this.$api.updateRcyhgcSjqd(JSON.stringify(row)).then(res => {
          if (res.status !== 200) {
            this.$message({
              message: '网络出错了',
              type: 'error'
            })
          } else {
            this.$message({
              message: '已完成维修任务',
              type: 'success'
            })
            this.queryYDJHData()
          }
        }).catch(e => {
          console.log(e)
        })
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
      changeTimeList(val) {
        console.log(val, 1)
        this.wxupdateFormData.id = val
        this.getupdateContent(val)
      },
      // 获取维修记录编辑页面数据
      getupdateContent (val) {
        this.$api.getRcyhgcWcrwdZbListByWcrwdId('?id=' + val).then(res => {
          if (res.status !== 200) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            console.log(res.data.data, '每一条维修记录子表')
            this.wxupdateObj = res.data.data
            if (this.wxupdateObj && this.wxupdateObj.length !==0) {
              for (var i = 0; i< this.wxupdateObj.length; i++) {
                let bharr =[]
                if (this.wxupdateObj[i].lx.length == 2) {
                  bharr.push(this.wxupdateObj[i].lx)
                } else if (this.wxupdateObj[i].lx.length == 4) {
                  bharr.push(this.wxupdateObj[i].lx.slice(0,2))
                  bharr.push(this.wxupdateObj[i].lx)
                } else if (this.wxupdateObj[i].lx.length == 6) {
                  bharr.push(this.wxupdateObj[i].lx.slice(0,2))
                  bharr.push(this.wxupdateObj[i].lx.slice(0,4))
                  bharr.push(this.wxupdateObj[i].lx)
                } else if (this.wxupdateObj[i].lx.length == 8) {
                  bharr.push(this.wxupdateObj[i].lx.slice(0,2))
                  bharr.push(this.wxupdateObj[i].lx.slice(0,4))
                  bharr.push(this.wxupdateObj[i].lx.slice(0,6))
                  bharr.push(this.wxupdateObj[i].lx)
                }
                this.wxupdateObj[i].bhlxarr = bharr
                console.log(this.wxupdateObj[i].bhlxarr,79)
                this.getFilesDataById(this.wxupdateObj[i].id)
              }
            }
          }
        }).catch(e => {
          console.log(e)
        })
      },
      closeBigimg () {
        this.showbigImg = false
      },
      // 打开施工前，施工中，施工后的放大照片
      openBigimg (param, name) {
        this.showbigImg = true
        this.bigImgsrc = param
        this.titlename = name
      },
      // 通过fileId获取上传过的照片
      getFilesDataById (paramId) {
        this.$api.getFilesDataById2({id: paramId}).then(res => {
          if (res.code !== 1) {
            this.$message({
              message: '网络错误',
              type: 'error'
            })
          } else {
            console.log(res.data)
            if (res.data && res.data.length) {
              this.beforeImg = []
              this.fildDatas = []
              this.duringImg = []
              this.fildDatas2 = []
              this.afterImg = []
              this.fildDatas3 = []
              for (var i=0; i<res.data.length;i++) {
                if (res.data[i].file_mjlx == '3001' && paramId == res.data[i].file_id) {
                  this.beforeImg.push(res.data[i].file_path)
                  res.data[i].url = res.data[i].file_path
                  this.fildDatas.push(res.data[i])
                } else if(res.data[i].file_mjlx == '3002' && paramId == res.data[i].file_id) {
                  this.duringImg.push(res.data[i].file_path)
                  res.data[i].url = res.data[i].file_path
                  this.fildDatas2.push(res.data[i])
                } else if (res.data[i].file_mjlx == '3003' && paramId == res.data[i].file_id){
                  this.fildDatas3.push(res.data[i])
                  res.data[i].url = res.data[i].file_path
                  this.afterImg.push(res.data[i].file_path)
                }
              }
              console.log(this.fildDatas2, 700700)
              console.log(this.beforeImg, this.duringImg, this.afterImg, 700700)
            }
          }
        }).catch(e => {
          console.log(e)})
      },
      changegcnr (event, index) {
        console.log(event, 99)
        // this.bhdwparam = val.GCNR
        this.wxAddObj[index].gcnr = event.GCNR
        this.wxAddObj[index].gcid = event.GCNRID
        this.wxAddObj[index].xmmc = this.jldModel.xmmc
        this.wxAddObj[index].xmbh = this.jldModel.xmbh
        console.log(this.wxAddObj[index].gcid, 66)
        console.log(this.wxAddObj[index].gcnr, 77)
      },
      getupdategcnrList (event, index) {
        this.wxupdateObj[index].gcnr = event.GCNR
        this.wxupdateObj[index].gcid = event.GCNRID
        this.uploadOfrowindex = index
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
      // 保存维修记录的接口
      insertRcyhgcWcrwdAndZb () {
        this.wxFormData.daBmbm = this.jldModel.daBmbm
        this.wxFormData.daBmid = this.jldModel.daBmid
        this.wxFormData.daBmmc = this.jldModel.daBmmc
        this.wxFormData.daYhbm = this.jldModel.daYhbm
        this.wxFormData.daYhid = this.jldModel.daYhid
        this.wxFormData.daYhmc = this.jldModel.daYhmc
        this.wxFormData.daZzbh = this.jldModel.daZzbh
        this.wxFormData.daZzid = this.jldModel.daZzid
        this.wxFormData.daZzmc = this.jldModel.daZzmc
        this.wxFormData.xmbh = this.jldModel.xmbh
        this.wxFormData.xmmc = this.jldModel.xmmc
        if (this.wxAddObj && this.wxAddObj.length !== 0) {
          for(var i = 0; i < this.wxAddObj.length; i++) {
            this.wxAddObj[i].id = this.uuidsID
          }
          console.log(this.wxAddObj)
        }
        this.wxFormData.wcrwdZbList = this.wxAddObj
        this.wxFormData.rwmxId = this.jldModel.id
        console.log(this.wxFormData, 353535)
        this.submitOfwx()
        this.$api.insertRcyhgcWcrwdAndZb(this.wxFormData).then(res => {
          console.log(res, 7979888)
          if (res.code !== 1) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            console.log(res.data)
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.showDetail = !this.showDetail
            this.queryYDJHData()
          }
        }).catch(e => {
          console.log(e)
        })
      },
      // 编辑保存维修记录接口
      updateRcyhgcWcrwdAndZb () {
        this.wxupdateFormData.wcrwdZbList = this.wxupdateObj
        // this.wxupdateFormData.id = this.jldModel.id
        console.log(this.wxupdateFormData, 353535)
        let self = this
        console.log(this.wxupdateObj, 77979)
        console.log(this.uploadOfrowindex, 898989)
        let id = this.wxupdateObj && this.wxupdateObj.length ? this.wxupdateObj[this.uploadOfrowindex].id : ''
        console.log(id, '获取删除的id')
        console.log(self.fildDatas, '删除前的上传文件')
        this.$api.deleteFilesById2({ids:id}).then(res=>{
          console.log(self.fildDatas, '删除后的上传文件')
          let fildDataArr = self.fildDatas.concat(self.fildDatas2,self.fildDatas3)
          console.log(fildDataArr, 7979)
          if(fildDataArr.length){
            self.$api.addFileData(fildDataArr).then(res=>{
              self.fildDatas = []
              self.fildDatas2 = []
              self.fildDatas3 = []
              if(res.data.code == 1){

              }else{
                this.$message({
                  message: '图片上传失败',
                  type: 'info'
                });
              }
            })
          }
        })

        this.$api.updateRcyhgcWcrwdAndZb(this.wxupdateFormData).then(res => {
          console.log(res, '修改维修子表信息')
          if (res.code !== 1) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })

          } else {
            console.log(res.data)
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.showzbdetail = false
            this.showDetail = false
          }
        }).catch(e => {
          console.log(e)
        })
      },
      // 删除上传照片保存
      deleteFilesById () {
        let self = this
        console.log(this.wxupdateObj, 77979)
        console.log(this.uploadOfrowindex, 898989)
        let id = this.wxupdateObj && this.wxupdateObj.length ? this.wxupdateObj[this.uploadOfrowindex].id : ''
        console.log(id, '获取删除的id')
        console.log(self.fildDatas, '删除前的上传文件')
        this.$api.deleteFilesById2({ids:id}).then(res=>{
          console.log(self.fildDatas, '删除后的上传文件')
          if(self.fildDatas.length){
            self.$api.addFileData(this.fildDatas).then(res=>{
              self.fildDatas = []
              if(res.data.code == 1){

              }else{
                this.$message({
                  message: '图片上传失败',
                  type: 'info'
                });
              }
            })
          }
        })
      },
      // 根据项目编号和年月查询月度计划工程内容
      getgcnrOfmonth () {
        this.$api.getHMMPGcnrByXmbhAndMonth({xmbh: 'LrTestXmId'}).then(res => {
          if (res.code !== 1) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            this.gcnrList = res.data && res.data.length != 0 ? res.data : []
            // console.log(this.gcnrList, 8080111)
          }
        }).catch(e => {
          console.log(e)
        })
      },
      // 保存维修记录页面数据
      submitOfwx () {
        // console.log(this.fildDatas, 666611)
        let fileDatasArr = this.fildDatas.concat(this.fildDatas2, this.fildDatas3)
        if(fileDatasArr.length){
          this.$api.addFileData(fileDatasArr).then(res=>{
            if(res.data.code == 1){
              console.log(res.data, '保存文件后返回的数据')
            }
          })
        }
      },
      uuid(){
        let str = (((1+Math.random())*0x10000)|0).toString(16).substring(1)
        return (str+str+"-"+str+"-"+str+"-"+str+"-"+str+str+str);
      },
      clickparam (param, index) {
        this.uploadOfrowindex = index
        console.log(this.uploadOfrowindex, 7878)
        this.fileMjlx = param
      },
      handHttpRequest(files){
        console.log(files, '文件')
        // console.log(param, '参数')
        //上传图片
        //通过FormData对象 异步提交文件 返回提交结果
        var fm = new FormData();
        fm.append('file',files.file);
        this.$api.uploadFile2(fm).then(res=>{
          // debugger
          console.log(res,2299)
          if(res.code == 1){
            let datas = res.data
            datas.file_remarks = datas.remarks
            delete datas.remarks
            let fildObj = datas
            fildObj.file_id = this.uuidsID
            fildObj.file_mjlx = this.fileMjlx
            fildObj.url = fildObj.file_path
            // fildObj.fname = '3001'
            // console.log(fildObj, '文件id')
            this.fildDatas.push(fildObj)
            console.log(this.fildDatas, '照片信息数组')
          }
        })
        // return false
      },
      handHttpRequest1(files){
        console.log(files, '文件')
        // console.log(param, '参数')
        //上传图片
        //通过FormData对象 异步提交文件 返回提交结果
        var fm = new FormData();
        fm.append('file',files.file);
        this.$api.uploadFile2(fm).then(res=>{
          // debugger
          console.log(res,2299)
          if(res.code == 1){
            let datas = res.data
            datas.file_remarks = datas.remarks
            delete datas.remarks
            let fildObj = datas
            fildObj.file_id = this.wxupdateObj[this.uploadOfrowindex].id
            fildObj.file_mjlx = this.fileMjlx
            // fildObj.fname = '3001'
            console.log(fildObj, '文件id')
            fildObj.url = fildObj.file_path
            console.log(fildObj.file_path,1111)
            this.fildDatas.push(fildObj)
            this.uploadArr1 = this.fildDatas

            console.log(this.fildDatas, '照片信息数组')
          }
        })
        // return false
      },
      handHttpRequest2(files){
        console.log(files, '文件')
        // console.log(param, '参数')
        //上传图片
        //通过FormData对象 异步提交文件 返回提交结果
        var fm = new FormData();
        fm.append('file',files.file);
        this.$api.uploadFile2(fm).then(res=>{
          // debugger
          console.log(res,2299)
          if(res.code == 1){
            let datas = res.data
            datas.file_remarks = datas.remarks
            delete datas.remarks
            let fildObj = datas
            fildObj.file_mjlx = this.fileMjlx
            fildObj.url = fildObj.file_path
            if (this.wxupdateObj && this.wxupdateObj.length !== 0) {
              fildObj.file_id = this.wxupdateObj[this.uploadOfrowindex].id
            } else {
              fildObj.file_id = this.uuidsID
            }
            // fildObj.fname = '3001'
            console.log(fildObj, '文件id')
            this.fildDatas2.push(fildObj)
            console.log(this.fildDatas2, '照片信息数组')
          }
        })
        // return false
      },
      handHttpRequest3(files){
        console.log(files, '文件')
        // console.log(param, '参数')
        //上传图片
        //通过FormData对象 异步提交文件 返回提交结果
        var fm = new FormData();
        fm.append('file',files.file);
        this.$api.uploadFile2(fm).then(res=>{
          // debugger
          console.log(res,2299)
          if(res.code == 1){
            let datas = res.data
            datas.file_remarks = datas.remarks
            delete datas.remarks
            let fildObj = datas
            fildObj.file_mjlx = this.fileMjlx
            fildObj.url = fildObj.file_path
            if (this.wxupdateObj && this.wxupdateObj.length !== 0) {
              fildObj.file_id = this.wxupdateObj[this.uploadOfrowindex].id
            } else {
              fildObj.file_id = this.uuidsID
            }
            // fildObj.fname = '3001'
            console.log(fildObj, '文件id')
            this.fildDatas3.push(fildObj)
            console.log(this.fildDatas3, '照片信息数组')
          }
        })
        // return false
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
      // 维修记录复选框
      isshowchecked (event,index) {
        console.log(event,index, 'checkboxofval')
        if (event == true) {
          this.checkborder.push(index)
        } else {
          this.checkborder.splice(this.checkborder.indexOf(index), 1)
          // this.checkborder = null
        }
      },
      // 删除维修单条或者多条记录
      deletewxOfrowObj () {
        // this.checkborder
        // this.wxAddObj= this.wxAddObj.filter(() => !this.checkborder.some(() => {this.judge()}));
        for (var i =0; i < this.wxAddObj.length; i++) {
          if(this.checkborder.some(ele=> ele == i)) {
            this.wxAddObj.splice(this.wxAddObj.indexOf(i), 1)
          }
        }
      },
      deleteupdateOfrow () {
        for (var i =0; i < this.wxupdateObj.length; i++) {
          if(this.checkborder.some(ele=> ele == i)) {
            this.wxupdateObj.splice(this.wxupdateObj.indexOf(i), 1)
          }
        }
      },
      // judge () {},
      // 添加维修单条记录
      addwxOfrowObj () {
        let obj  = {
          lx: '',
          dw: '',
          gcnr: '',
          sl: '',
          bz: ''
        }
        this.wxAddObj.push(obj)
      },
      addwxupdateObj () {
        let obj  = {
          lx: '',
          dw: '',
          gcnr: '',
          sl: '',
          bz: ''
        }
        this.wxupdateObj.push(obj)
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
          return (restaurant[val].toLowerCase().indexOf(queryString.toLowerCase()) == 0);
        };
      },
      handleSelectMC(item){
        //getXmmcList
        this.searchForm.xmmc = item.XMMC
        this.searchForm.xmbh = item.XMBH
        // this.$api.getXmmctoxmbhList({xmmc:item.XMMC}).then(res=>{
        //   if(res.code == 1){
        //     this.searchForm.xmbh = res.data?res.data[0].XMBH:''
        //   }else{
        //     this.searchForm.xmbh = ''
        //   }
        // })
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
          this.searchForm.xmmc = val.XMMC
          this.searchForm.xmbh = val.XMBH
        }
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
        let _param = this.tabList[tab.index].id
        this.beforeImg = []
        this.duringImg = []
        this.afterImg = []
        this.getwxContent(_param)
      },
      // 详情页维修记录
      getwxContent (_param) {
        this.$api.getRcyhgcWcrwdZbListByWcrwdId('?id=' + _param).then(res => {
          if (res.status !== 200) {
            this.$message({
              message: '网络出错',
              type: 'error'
            })
          } else {
            console.log(res.data.data, '每一条维修记录子表')
            this.wxorderobj = res.data.data
            this.wxupdateObj = res.data.data
            if (this.wxorderobj && this.wxorderobj.length !==0) {
              for (var i = 0; i< this.wxorderobj.length; i++) {
                this.getFilesDataById(this.wxorderobj[i].id)
              }
            }
          }
        }).catch(e => {
          console.log(e)
        })
      },
      // 关闭指派任务对话框
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
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
      changeBhlxOfwx (event,index, param) {
        console.log(event, 6767)
        console.log(index, 6767)
        this.uploadOfrowindex = index
        if (event && event.length !=0) {
          if (param == 1) {
            this.wxAddObj[index].lx = event && event.length ? event[event.length-1]: ''
            this.getbhDwbybhlx(this.wxAddObj[index].lx, index,param)
          } else {
            this.wxupdateObj[index].lx = event && event.length ? event[event.length-1]: ''
            this.getbhDwbybhlx(this.wxupdateObj[index].lx,index,param)
          }
        }
      },
      getbhDwbybhlx (param,index,type) {
        this.$api.getBhDwByBhid({bhid: param}).then(res => {
          if(res.status !=200) {
            this.$message({
              message: '网络错误',
              type: 'error'
            })
          } else {
            if (type == 1) {
              this.wxAddObj[index].dw = res.data ? res.data : ''
            } else {
              this.wxupdateObj[index].dw = res.data ? res.data : ''
            }
            console.log(this.wxAddObj[index].dw, 79)
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
        // console.log('删除图片')
        this.fildDatas = fileList
        this.uploadArr1 = this.fildDatas
      },
      handleRemove2 (file, fileList) {
        // 删除图片
        // console.log('删除图片')
        this.fildDatas2 = fileList
      },
      handleRemove3 (file, fileList) {
        // 删除图片
        // console.log('删除图片')
        this.fildDatas3 = fileList
      },
      handlePictureCardPreview (file) {
        // 放大图片查看
        console.log('放大图片查看')
        // this.dialogImageUrl = file.url;
        // this.dialogVisible = true;
      },
      selectable2: function (row, index) { // 禁用第四个
        return true
        // if(row.canDel == 1){
        //   return true
        // }else{
        //   return false
        // }
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
              // console.log(item, 888)
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
      submitjobOrder () {
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
      },
      // 编辑任务单
      updatejobOrder (type, row) {
        this.jldModel = row
        this.updateFormDia(type, row)
      },
      // 查看详情
      seedetail (type, row, iswx) {
        console.log(row, 23)
        let yeay=new Date().toLocaleString('chinese', { hour12: false }).replace(new RegExp('/','g'), '-')
        console.log(yeay, 999)
        this.jldModel = row
        if (iswx == 1) {
          this.wxAddObj =  [
            {
              bhlxarr: [],
              dw: '',
              gcnr: '',
              sl: '',
              bz: '',
              lx: '',
              id: ''
            }
          ]
          this.fildDatas = []
          this.fildDatas2 = []
          this.fildDatas3 = []
          this.wxorderobj = []
          this.getYear()
        }
        this.isseedetail = 1
        this.rowobjId = row.id
        this.uuidsID = this.uuid()
        if (iswx == 1) {
          this.getgcnrOfmonth()
        }
        this.wxupdateObj = []
        this.value= ''
        this.updateFormDia(type, row)
        // this.openupdate()
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
            if (this.tabList && this.tabList.length !== 0) {
              this.value = this.tabList[0].wcsj
              this.getwxContent(this.tabList[0].id)
              this.getupdateContent(this.tabList[0].id)
            }
          }
        }).catch(e => {
          console.log(e)
        })
      },
      // 暂时不用
      openupdate () {
        if (this.tabList && this.tabList.length !==0) {
          this.getupdateContent(this.tabList[0].id)
          this.value = this.tabList[0].wcsj
        }
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
            console.log(res.data.data, 49491)
            this.bhlxarr = res.data.data
            this.wxbhlxarr = res.data.data
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
      addjobOrder () {
        let paramObj = this.jldModel
        paramObj = Object.assign(this.usermsgObj,this.jldModel)
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
      },
      // 编辑 详情  本月完成情况 下月计划
      updateFormDia (type, row) {
        console.log(row, 8080)
        if (type == 'add') {
          this.tasktitle = '添加任务单'
          this.firstItemTit = '添加任务单'
          this.isupdate = false
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
            bhsl: '',
            bhdw: '',
            gcllx: '',
            qzh: 0,
            zzh: '',
            bhsm: ''
          }
        } else if (type == 'detail') {
          this.tasktitle = '任务单详情'
          this.firstItemTit = '任务单详情'
        } else if (type == 'update') {
          this.tasktitle = '任务单编辑'
          this.firstItemTit = '任务单编辑'
          this.isupdate = true
        }
        this.showDetail = !this.showDetail
        this.showPlan = true
      },
      // 分页展示数据
      handleCurrentChange (val) {
        this.searchForm.pageNum = val
        this.queryYDJHData()
      },
      // 月度计划初始化查询
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
        this.$api.getRcyhgcSjqdList({xmbh: xmbh == undefined ? xmbhOfinit.XMBH : xmbh,startDate: startDate, endDate: endDate, pageNum, pageSize, daZzid, zt: '5,6'}).then(res => {
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
      // this.queryYDJHData() // 获取事件任务清单列表
      this.getbhlxarr() // 病害类型
      this.getMeijulxbm() // 获取枚举数据
      this.getlxmessage() // 获取路段信息
      this.initqueryXMMC() // 获取项目名称列表
      // this.wxFormData.wcsj = this.wxFormData.wcsj.toLocaleString('chinese', { hour12: false }).replace(new RegExp('/','g'), '-')
      // console.log(this.wxFormData.wcsj, 99)
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
  .wxupdateImg{
    .el-upload-list{
      li{
        width: 42px;
        height: 26px;
        line-height: 26px;
        vertical-align: middle;
        img {
          width: 42px;
          height: 26px;
        }
      }
    }
    .el-upload{
      width: 42px;
      height: 26px;
      line-height: 26px;
      i {
        font-size: 14px !important;
      }
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
    margin-top: 10px;
    margin-bottom: 13px;
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
  .wxischecked {
    position: absolute;
    left: 26px;
    top: calc(100% - 449px);
  }
  .wxbox {
    border: 1px solid #409eff;
    /* width: 100%; */
    padding-left: 10px;
    padding-top: 7px;
    border-radius: 5px;
    margin-bottom: 5px;
    margin-top: 16px;
  }
  .nobox {
    padding-left: 10px;
    padding-top: 7px;
    border-radius: 5px;
    margin-bottom: 5px;
    margin-top: 16px;
  }
  .workimg {
    width: 30px;
    height: 20px;
    margin-right: 10px;
    vertical-align: middle;
    cursor: pointer;
  }
</style>
