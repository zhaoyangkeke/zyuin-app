
<template>
  <div id="kgsqd" style="height: 100%" >
    <div class="header">
       <span class="headerTit">项目概况</span>
      <div class="header_option">
        <ul>
          <li @click="addXMGK"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="delXMGK"><i class="el-icon-delete"> 删除</i></li>
        </ul>

      </div>
    </div>
    <!--查询弹框区域-->
    <div class="conter_table"  v-if="!isShowDetail">
        <el-form :inline="true"   ref="searchForm" style="display: inline-block;" class="searchForm chaxun">

          <el-form-item style="margin-bottom: 0;" label="项目名称" prop="" class="">
            <el-autocomplete
              class="inline-input"
              size="mini"
              v-model="searchForm.xmmc"
              :fetch-suggestions="querySearchMC"
              @select="handleSelectMC"
              placeholder="请输入项目名称">
              <template slot-scope="{ item }">
                <div class="name">{{item.XMMC }}</div>
              </template>
              <i slot="suffix" @click="showDialog('mc')" class="icon iconfont icon-xiangqing1"></i>
            </el-autocomplete>
          </el-form-item>

          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button size="mini" @click="searchXM" style="background-color: #DF4D4A;border-color:transparent;color: #fff">查询</el-button>
            <el-button size="mini" @click="resizeDate">重置</el-button>
           </el-form-item>

        </el-form>
        <div  class="searchLeft" >
        <div >
          <em>当前状态:</em>
          <span class="currentState" @click="handleHtState(state.val,index)"
                :id="searchForm.stateIndex==index?'selectColor2':''"
                v-for="(state,index) in htState" :key="index">{{state.name}}</span>
        </div>
        <div class="htTypeList">
          <em>合同类型:</em>
          <span class="currentState" @click="handleHtType(type.val,index)" :id="searchForm.typeIndex==index?'selectColor':''" v-for="(type,index) in httype" :key="index">{{type.name}}</span>
        </div>
      </div>
      <!--</div>-->
      <p style="font-size: 12px;height: 18px"></p>
      <el-table :data="initDatas" tooltip-effect="dark"
                style="width: 100%;height: calc(100% - 115px);overflow:auto;"
                row-class-name="row_class"
                border
                @selection-change="ListSelect">
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

        <el-table-column align="left" prop="xmbh" label="项目编号" sortable ></el-table-column>
        <el-table-column align="left" prop="xmmc" label="项目名称" sortable ></el-table-column>
        <el-table-column align="left" prop="lxmc" label="路线名称" sortable ></el-table-column>
        <el-table-column align="left" prop="gcfl" label="施工类型" sortable >
            <template scope="scope">
              <span style="text-align: center;">{{scope.row.sglx == 'hm' ? '日常养护工程' : scope.row.gcfl == 'sm' ? '专项养护工程' : '机电养护工程'}}</span>
            </template>
        </el-table-column>
        <el-table-column align="left" prop="sprq" label="审批日期" sortable></el-table-column>
        <el-table-column align="left" prop="cbdw" label="承包单位" sortable ></el-table-column>
        <el-table-column align="left" prop="xmlxr" label="项目联系人" sortable width="110"></el-table-column>
        <el-table-column align="left" label="状态" width="80" sortable >
          <template slot-scope="scope">
            <span style="color:#3EC481;text-align: center" v-if="scope.row.zt == '3801'">待完善</span>
            <!--<span style="color:#3EC481;text-align: center" v-if="scope.row.zt == '3802'">已完善</span>-->
            <span style="color:#3EC481;text-align: center" v-if="scope.row.zt == '3803'">审核中</span>
            <span style="color:#3EC481;text-align: center" v-if="scope.row.zt == '3804'">已审核</span>
          </template>
        </el-table-column>
        <el-table-column align="left" class-name="column-caoz" label="操作" width="120">
          <template slot-scope="scope">
            <span @click="showDetail(scope,'edit')" style="color:#00a2fd;cursor: pointer;text-align: center">编辑</span>
            <span @click="showDetail(scope,'detail')" style="color:#00a2fd;cursor: pointer;text-align: center">详情</span>
            <span v-if="scope.row.zt == '3801'&&userInfo.isWaixie" @click="showDetail(scope,'update')" style="color:#00a2fd;cursor: pointer;text-align: center">提交</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
   <!--分页区域-->
    <footer v-if="!isShowDetail" class="footer">
      <div style="float: right;padding: 6px">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="initDataTotal">
        </el-pagination>
      </div>
    </footer>
    <!--添加新增的弹窗-->
    <div class="tabArea" v-if="isShowDetail" >
       <p class="tabAreaTit">
         <span class="titleclasschild"><i class="icon iconfont icon-arrow-left titleclasschild" @click="isShowDetail = false;activeName2 = 'first';activeName = 'first'"></i></span>
         <span v-html="windowTit"></span>
         <el-button v-if="basicData.zt=='3801'&&!userInfo.isWaixie&&isEdit" size="mini" class="minibtn"  @click="saveEdit"
                    style="float:right;margin: 10px 10px 0 0;background: #DF4D4A;border-color:transparent;color: #fff;">保存</el-button>
       </p>
        <div  v-if=" basicData.zt=='3801'&&!userInfo.isWaixie&&isEdit">
          <el-form  :model="lmshForm" style="font-size: 0;" :rules="xmgkRules" ref="lmshForm" label-width="100px">
            <el-form-item class="addJLD" label="合同名称" prop="htmc">
              <el-autocomplete
                disabled
                class="inline-input"
                size="mini"
                v-model="lmshForm.htmc"
                :fetch-suggestions="querySearchHtmc"
                @select="handleSelectHtinfo"
                placeholder="请输入合同名称"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{item.HTMC}}</div>
                </template>
                <i slot="suffix"   class="icon iconfont icon-xiangqing1"></i>
              </el-autocomplete>
            </el-form-item>
            <el-form-item class="addJLD" label="项目名称" prop="xmmc">
              <el-input  v-model="lmshForm.xmmc" size="mini"  placeholder="请输入项目名称"></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="路线编码" prop="lxbm">
              <el-select
                v-model="lmshForm.lxbm"
                value-key="LXCODE"
                filterable
                placeholder="请选择路线编码"
                @change="selectLxBm"
                size="mini">
                <el-option
                  v-for="(item,index) in lxbmList"
                  :key="index"
                  :label="item.LXCODE"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item class="addJLD" label="路线名称" prop="lxmc">
              <el-input  v-model="lmshForm.lxmc" size="mini"  placeholder="请输入路线名称" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item class="addJLD" label="长度(米)" prop="cd">
              <el-input  v-model="lmshForm.cd" size="mini"  placeholder="请输入长度"></el-input>
            </el-form-item>
            <el-form-item class="addJLD" label="起始桩号" prop="qszh">
              <el-input  v-model="lmshForm.qszh" size="mini"  placeholder="请输入起始桩号"></el-input>
            </el-form-item>
            <el-form-item class="addJLD" label="终止桩号" prop="zzzh">
              <el-input  v-model="lmshForm.zzzh" size="mini"  placeholder="请输入终止桩号"></el-input>
            </el-form-item>
            <el-form-item class="addJLD" label="工程类型" prop="gclx">
              <el-select size="mini" v-model="lmshForm.gclx" placeholder="请选择工程类型">
                <el-option
                  label="小修"
                  value="4101">
                </el-option>
                <el-option
                  label="中修"
                  value="4102">
                </el-option>
                <el-option
                  label="大修"
                  value="4103">
                </el-option>
              </el-select>
              <!--<el-input  v-model="lmshForm.gclx" size="mini"  placeholder="请输入内容"></el-input>-->
            </el-form-item>
            <el-form-item class="addJLD" label="单位工程">
              <el-select size="mini" v-model="lmshForm.dwgc" placeholder="请选择单位工程">
                <el-option
                  v-for="(item,index) in dwgcData"
                  :key="item"
                  :label="item"
                  :value="index">
                </el-option>
              </el-select>
              <!--<el-input  v-model="lmshForm.gclx" size="mini"  placeholder="请输入内容"></el-input>-->
            </el-form-item>

            <el-form-item class="addJLD" label="合同开工日期" prop="htkgrq">
              <el-date-picker
                disabled
                v-model="lmshForm.htkgrq"
                size="mini"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>

            <el-form-item class="addJLD" label="合同完工日期" prop="htwgrq">
              <el-date-picker
                disabled
                v-model="lmshForm.htwgrq"
                size="mini"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>

            <el-form-item class="addJLD" label="合同工期" prop="htgq">
              <el-input  v-model="lmshForm.htgq" size="mini"  placeholder="请输入内容" disabled></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="实际开工日期" prop="sjkgrq">
              <el-date-picker
                v-model="lmshForm.sjkgrq"
                size="mini"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item class="addJLD" label="实际完工日期" prop="sjwgrq">
              <el-date-picker
                v-model="lmshForm.sjwgrq"
                size="mini"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>

            <el-form-item class="addJLD" label="文号" prop="wh">
              <el-input  v-model="lmshForm.wh" size="mini"  placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="审批日期 " prop="sprq">
              <el-date-picker
                v-model="lmshForm.sprq"
                size="mini"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>

            <el-form-item class="addJLD" label="质量监督部门"  prop="zljdbm">
              <el-input  v-model="lmshForm.zljdbm" size="mini"  placeholder="请输入内容" ></el-input>
            </el-form-item>

            <el-form-item class="addJLD" label="施工类型" prop="sglx">
              <el-select
                v-model="lmshForm.sglx"
                value-key="lxbm"
                filterable
                placeholder="请选择路线编码"
                size="mini">
                <el-option
                  label="日常养护工程"
                  value="hm">
                </el-option>
                <el-option
                  label="专项养护工程"
                  value="sm">
                </el-option>
                <el-option
                  label="机电养护工程"
                  value="mee">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="addJLD" label="承包单位" prop="cbdw">
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="lmshForm.cbdw"
                :fetch-suggestions="querySearchCBDW"
                @select="handleSelectGYS"
                placeholder="请输入合同名称"
              >
                <template slot-scope="{item}">
                  <div class="name">{{item.gysmc}}</div>
                </template>
                <i slot="suffix"  @click="showgysDialog('cbdw')" class="icon iconfont icon-xiangqing1"></i>
              </el-autocomplete>
            </el-form-item>
            <el-form-item class="addJLD" label="监理单位" prop="jldw">
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="lmshForm.jldw"
                :fetch-suggestions="querySearchCBDW"
                @select="handleSelectJLDW"
                placeholder="请输入监理单位"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.gysmc }}</div>
                </template>
                <i slot="suffix"  @click="showgysDialog('jldw')" class="icon iconfont icon-xiangqing1"></i>
              </el-autocomplete>
            </el-form-item>
            <el-form-item class="addJLD" label="设计单位" prop="sjdw">
              <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="lmshForm.sjdw"
                :fetch-suggestions="querySearchCBDW"
                @select="handleSelectSJDW"
                placeholder="请输入设计单位"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.gysmc }}</div>
                </template>
                <i slot="suffix"  @click="showgysDialog('sjdw')" class="icon iconfont icon-xiangqing1"></i>
              </el-autocomplete>
            </el-form-item>
            <!--参照机电=>项目维修页面编写联系人-->
            <el-form-item class="addJLD" label="联系人" prop="lxr">
              <el-input  v-model="lmshForm.lxr" size="mini"  @focus="selectFzr"  placeholder="请选择联系人"></el-input>
            </el-form-item>
            <el-form-item class="addJLD" label="联系电话" prop="lxdh">
              <el-input  v-model="lmshForm.lxdh" size="mini"  placeholder="请选择联系电话"></el-input>
            </el-form-item>
            <el-form-item class="addJLD" label="项目介绍" prop="xmjs">
              <el-input  v-model="lmshForm.xmjs" size="mini"  placeholder="请添加项目介绍"></el-input>
            </el-form-item>
            <el-form-item class="addJLD" label="暂定金额(元)" prop="zdje">
              <el-input  v-model.number="lmshForm.zdje" size="mini"    placeholder="请添加暂定金额"></el-input>
            </el-form-item>
            <el-form-item class="addJLD" label="质保金比例(%)" prop="zbjbl">
              <el-input  v-model.number="lmshForm.zbjbl" size="mini"    placeholder="请添加质保金比例"></el-input>
            </el-form-item>
            <el-form-item class="addJLD" label="保留金比例(%)" prop="bljbl">
              <el-input  v-model.number="lmshForm.bljbl" size="mini"    placeholder="请添加保留金比例"></el-input>
            </el-form-item>
            <el-form-item class="addJLD"  label="是否为托管路段" prop="sfwtgld">
              <el-select size="mini"  @change="istgLD" v-model="lmshForm.sfwtgld" placeholder="请选择">
                <el-option
                  label="是"
                  value="是">
                </el-option>
                <el-option
                  label="否"
                  value="否">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="showWtdwmc"  class="addJLD" label="委托单位名称" prop="wtdwmc">
              <el-input  v-model ="lmshForm.wtdwmc" size="mini"    placeholder="请输入委托单位名称"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-else>
         <p class="addJLD" v-for="(Basic,index) in BasicInfo" :key="index">
           <span class="addJLD_tit">{{Basic}} ：</span>
           <span  v-if="index != 'sglx'&&index != 'gcfl'">{{basicData[index]}}</span>
           <span  v-if="index == 'sglx'" >{{basicData.sglx == 'hm' ? '日常养护工程' : basicData.sglx == 'sm' ? '专项养护工程' : '机电养护工程'}}</span>
           <span  v-if="index == 'gcfl'" >{{basicData.gcfl == '4101' ? '小修' : basicData.gcfl == '4102' ? '中修' : '大修'}}</span>
         </p>
        </div>
      <div style="position: relative;height: calc(100% - 310px)">
         <el-tabs class="xmgkTabs"  style="height: 100%;"  v-model="activeName" @tab-click="handleClick('edit')">
        <el-tab-pane label="人员管理" style="height: 100%" name="first">
          <el-table  :data="editRyData"
                     height="100%"
                     style="width: calc(100% - 16px);"
                     row-class-name="row_class"
                     border
                     @selection-change="editSelectionChange">
            <el-table-column
              v-if="isEdit"
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
            <el-table-column align="left" label="人员名称">
              <template  slot-scope="scope">
                <el-input v-if="isEdit" size="mini" type="text" v-model="scope.row.rymc"></el-input>
                <span v-else>{{scope.row.rymc}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="联系电话" >
              <template  slot-scope="scope">
                <el-input v-if="isEdit" size="mini" type="text" v-model="scope.row.rydh"></el-input>
                <span v-else>{{scope.row.rydh}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="职位名称">
              <template  slot-scope="scope">
                <el-select v-if="isEdit" size="mini" v-model="scope.row.zwmc" placeholder="请选择">
                  <el-option
                    label="管理员"
                    value="5001">
                  </el-option>
                  <el-option
                    label="内业人员"
                    value="5002">
                  </el-option>
                  <el-option
                    label="外业人员"
                    value="5003">
                  </el-option>
                </el-select>
                <span v-else>{{scope.row.zwmc}}</span>

              </template>
            </el-table-column>
            <el-table-column align="left" label="供应商类型">
              <template  slot-scope="scope">

                <el-select v-if="isEdit" size="mini" v-model="scope.row.gyslx" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in gysMjData"
                    :label="item.mjmc"
                    :value="item.mjbm">
                  </el-option>
                </el-select>
                <span v-else>{{scope.row.gyslx}}</span>
              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="考核细则" style="height: 100%" class="contenddd" name="second">
          <el-tabs v-model="activeName2"  style="height: calc(100% - 60px )" type="card" @tab-click="handleClick('edit')">
            <el-tab-pane style="height: calc(100% - 20px);" label="进场准备情况考核表" name="fourth">
              <el-table
                ref="multipleTable4"
                @selection-change="jchandTableSelect"
                :data="jczbInfo"
                class="tableZDY"
                height="100%"
                border>
                <el-table-column
                  v-if="isEdit"
                  type="selection"
                  align="center"
                  width="55">
                </el-table-column>
                <el-table-column type="index"  label="序号" align="center" width="50"></el-table-column>

                <el-table-column prop="gcxm" label="工程项目" width="180"></el-table-column>
                <el-table-column prop="khnr" label="考核内容" width="180"></el-table-column>
                <el-table-column prop="bzyq"  label="标准、要求"> </el-table-column>
                <!--<el-table-column prop="khpl" label="考核频率"> </el-table-column>-->
                <!--<el-table-column prop="khfs" label="考核方式" style="text-align: left"> </el-table-column>-->
                <el-table-column prop="cfbz" label="处罚标准" style="text-align: left"> </el-table-column>
                <el-table-column  label="备注" >
                  <template slot-scope="scope">
                    <p style="padding-right: 20px;"  class="bzzzzz">{{scope.row.bz}}</p>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane style="height: 100%;" label="绿化养护质量检测考核表" name="first">
             <el-table
                ref="multipleTable"
                align="left"
                @selection-change="lvhandTableSelect"
                :data="lvInfo"
                class="tableZDY"
                height="calc(100% - 20px)"
                border
                style="width: calc(100% - 20px);">
                <el-table-column
                  v-if="isEdit"
                  type="selection"
                  align="center"
                  width="55">
                </el-table-column>
                <el-table-column prop="px" label="序号" align="center" width="50" style="line-height: 100%;" class="px"></el-table-column>
                <!--isSaved     -->

                <el-table-column prop="jcnrjyq" label="检查内容及要求"></el-table-column>
                <el-table-column prop="pfbf" label="评分办法"> </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane style="height: 100%;" label="履约质量检测考核表"  name="second">
              <el-table
                ref="multipleTable2"
                @selection-change="lyhandTableSelect"
                :data="lyzlInfo"
                class="tableZDY"
                height="calc(100% - 20px)"
                border
                style="width: calc(100% - 19px);">
                <el-table-column
                  v-if="isEdit"
                  type="selection"
                  align="center"
                  width="55">
                </el-table-column>
                <el-table-column type="index"  label="序号" align="center" width="50"></el-table-column>

                <el-table-column prop="gcxm" label="工程项目" width="180"></el-table-column>
                <el-table-column prop="khnr" label="考核内容" width="180"></el-table-column>
                <el-table-column prop="bzyq"  label="标准、要求"> </el-table-column>
                <!--<el-table-column prop="khpl" label="考核频率"> </el-table-column>-->
                <!--<el-table-column prop="khfs" label="考核方式" style="text-align: left"> </el-table-column>-->
                <el-table-column prop="cfbz" label="处罚标准" style="text-align: left"> </el-table-column>
                <el-table-column  label="备注" >
                  <template slot-scope="scope">
                    <p style="padding-right: 20px;"  class="bzzzzz">{{scope.row.bz}}</p>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane style="height: 100%;" label="养护巡查考核表" name="third">
              <el-table
                :data="yhInfo"
                ref="multipleTable3"
                @selection-change="yhhandTableSelect"
                class="tableZDY"
                height="calc(100% - 20px)"
                border
                style="width: calc(100% - 19px);">
                <el-table-column
                  v-if="isEdit"
                  type="selection"
                  align="center"
                  width="55">
                </el-table-column>
                <el-table-column type="index"  label="序号" width="50" align="center">  </el-table-column>
                <el-table-column prop="gcxm" label="工程项目"></el-table-column>
                <el-table-column prop="khnr" label="考核内容" ></el-table-column>
                <el-table-column prop="bzyq" label="标准、要求"></el-table-column>
                <!--<el-table-column prop="khpl" label="考核频率" width="180"></el-table-column>-->
                <!--<el-table-column prop="khfs" label="考核方式" width="100"></el-table-column>-->
                <el-table-column prop="cfbz" label="处罚标准"></el-table-column>
                <el-table-column  label="备注"  width="180">
                  <template slot-scope="scope">
                    <p style="padding-right: 20px;"  class="bzzzzz">{{scope.row.bz}}</p>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
          <div style="text-align: center">
            <el-button size="mini" class="minibtn"  v-if="isEdit&&editlv&&basicData.zt != '3803'"  @click.native="editInfo"
                       style="background: #DF4D4A;border-color:transparent;color: #fff;">修改</el-button>
            <el-button size="mini" class="minibtn"  v-if="isEdit&&!editlv&&basicData.zt != '3803'"  @click.native="saveSelect"
                       style="background: #DF4D4A;border-color:transparent;color: #fff;">保存</el-button>
            <el-button size="mini" class="minibtn"  v-if="isEdit&&!editlv&&basicData.zt != '3803'"  @click.native="handleClick('edit')"
                       style="background: #DF4D4A;border-color:transparent;color: #fff;">取消</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane style="height: calc(100% - 20px)" label="子目清单" v-if="!isEdit" name="third">
          <el-table  :data="zmInfo"
                     style="width: calc(100% - 16px);"
                     height="100%"
                     row-class-name="row_class"
                     border>
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column align="left" prop="zmh" label="子目号" width="100"></el-table-column>
            <el-table-column align="left" prop="zmmc" label="子目名称"></el-table-column>
            <el-table-column align="left" prop="xmbh" label="项目编号"></el-table-column>
            <el-table-column align="left" prop="xmmc" label="项目名称"></el-table-column>
            <el-table-column align="left" prop="dw" label="单位" width="100"></el-table-column>
            <el-table-column align="left" prop="sl" label="数量" width="100" ></el-table-column>
            <el-table-column align="left" prop="dj" label="单价(元)" width="100"> </el-table-column>
            <el-table-column align="left" prop="hj" label="合价(元)" width="100"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane style="height: calc(100% - 20px)" label="变更记录" v-if="!isEdit" name="four">
          <el-table  :data="tableData"
                     height="100%"
                     style="width: calc(100% - 16px);"
                     row-class-name="row_class"
                     border>
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column align="left" label="子目号" prop="zmh" width="100"  show-overflow-tooltip></el-table-column>
            <el-table-column align="left" label="子目名称" prop="zmmc"  show-overflow-tooltip></el-table-column>
            <el-table-column align="left" prop="tbdw" label="变更内容" show-overflow-tooltip></el-table-column>
            <el-table-column align="left" prop="djbh" width="120" label="变更前金额(元)" show-overflow-tooltip></el-table-column>
            <el-table-column align="left" prop="cbdw" width="120" label="变更后金额(元)" show-overflow-tooltip></el-table-column>
            <el-table-column align="left" prop="htbh" width="120" label="变更前数量" show-overflow-tooltip></el-table-column>
            <el-table-column align="left" prop="gcxm" width="120" label="变更后数量" show-overflow-tooltip></el-table-column>
            <el-table-column align="left" prop="gldw" width="100" label="备注" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
        <div v-if="activeName == 'first'&&isEdit" style="position:absolute;top:0;right: 5px;">
          <el-button size="mini" v-if="!(basicData.zt=='3801'&&!userInfo.isWaixie)"  @click="editpromiseTG('save')">
            <i class="icon iconfont icon-save"></i>
            保存</el-button>
          <el-button size="mini" @click="editpromiseTG('add')"><i class="icon iconfont icon-add"></i> 添加</el-button>
          <el-button size="mini"  @click="editpromiseTG('del')"><i class="icon iconfont icon-delete"></i> 删除</el-button>
        </div>
      </div>
    </div>
    <div class="tabArea" v-if="isShowAdd">
      <p class="tabAreaTit">
        <span class="titleclasschild"><i class="icon iconfont icon-arrow-left titleclasschild" @click="isShowAdd = false;"></i></span>
        <span>返回</span>
        <el-button size="mini" class="minibtn"  @click="saveAdd"
                   style="float:right;margin: 10px 10px 0 0;background: #DF4D4A;border-color:transparent;color: #fff;">保存</el-button>
      </p>
      <div>
        <el-form  :model="lmshForm" style="font-size: 0;" :rules="xmgkRules" ref="lmshForm" label-width="100px">
          <el-form-item class="addJLD" label="合同名称" prop="htmc">
            <el-autocomplete
              class="inline-input"
              size="mini"
              v-model="lmshForm.htmc"
              :fetch-suggestions="querySearchHtmc"
              @select="handleSelectHtinfo"
              placeholder="请输入合同名称"
            >
              <template slot-scope="{ item }">
                <div class="name">{{item.HTMC}}</div>
              </template>
              <i slot="suffix"  @click="showhtDialog" class="icon iconfont icon-xiangqing1"></i>
            </el-autocomplete>
          </el-form-item>
          <el-form-item class="addJLD" label="项目名称" prop="xmmc">
            <el-input  v-model="lmshForm.xmmc" size="mini"  placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item class="addJLD" label="路线编码" prop="lxbm">
            <el-select
              v-model="lmshForm.lxbm"
              value-key="LXCODE"
              filterable
              placeholder="请选择路线编码"
              @change="selectLxBm"
              size="mini">
              <el-option
                v-for="(item,index) in lxbmList"
                :key="index"
                :label="item.LXCODE"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="addJLD" label="路线名称" prop="lxmc">
            <el-input  v-model="lmshForm.lxmc" size="mini"  placeholder="请输入内容" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="addJLD" label="长度(米)" prop="cd">
            <el-input  v-model="lmshForm.cd" size="mini"  placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item class="addJLD" label="起始桩号" prop="qszh">
            <el-input  v-model="lmshForm.qszh" size="mini"  placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item class="addJLD" label="终止桩号" prop="zzzh">
            <el-input  v-model="lmshForm.zzzh" size="mini"  placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item class="addJLD" label="工程类型" prop="gclx">
            <el-select size="mini" v-model="lmshForm.gclx" placeholder="请选择工程类型">
              <el-option
                label="小修"
               value="4101">
              </el-option>
              <el-option
                label="中修"
               value="4102">
              </el-option>
              <el-option
                label="大修"
               value="4103">
              </el-option>
            </el-select>
            <!--<el-input  v-model="lmshForm.gclx" size="mini"  placeholder="请输入内容"></el-input>-->
          </el-form-item>
          <el-form-item class="addJLD" label="单位工程">
            <el-select size="mini" v-model="lmshForm.dwgc" placeholder="请选择单位工程">
              <el-option
                v-for="(item,index) in dwgcData"
                :key="item"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
            <!--<el-input  v-model="lmshForm.gclx" size="mini"  placeholder="请输入内容"></el-input>-->
          </el-form-item>

          <el-form-item class="addJLD" label="合同开工日期" prop="htkgrq">
            <el-date-picker
              disabled
              v-model="lmshForm.htkgrq"
              size="mini"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="addJLD" label="合同完工日期" prop="htwgrq">
            <el-date-picker
              disabled
              v-model="lmshForm.htwgrq"
              size="mini"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="addJLD" label="合同工期" prop="htgq">
            <el-input  v-model="lmshForm.htgq" size="mini"  placeholder="请输入内容" disabled></el-input>
          </el-form-item>

          <el-form-item class="addJLD" label="实际开工日期" prop="sjkgrq">
            <el-date-picker
              v-model="lmshForm.sjkgrq"
              size="mini"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="addJLD" label="实际完工日期" prop="sjwgrq">
            <el-date-picker
              v-model="lmshForm.sjwgrq"
              size="mini"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="addJLD" label="文号" prop="wh">
            <el-input  v-model="lmshForm.wh" size="mini"  placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item class="addJLD" label="审批日期 " prop="sprq">
            <el-date-picker
              v-model="lmshForm.sprq"
              size="mini"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="addJLD" label="质量监督部门"  prop="zljdbm">
            <el-input  v-model="lmshForm.zljdbm" size="mini"  placeholder="请输入内容" ></el-input>
          </el-form-item>

          <el-form-item class="addJLD" label="施工类型" prop="sglx">
            <el-select
              v-model="lmshForm.sglx"
              value-key="lxbm"
              filterable
              placeholder="请输入施工类型"
              size="mini">
              <el-option
                label="日常养护工程"
                value="hm">
              </el-option>
              <el-option
                label="专项养护工程"
                value="sm">
              </el-option>
              <el-option
                label="机电养护工程"
                value="mee">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="addJLD" label="承包单位" prop="cbdw">
            <el-autocomplete
              class="inline-input"
              size="mini"
              v-model="lmshForm.cbdw"
              :fetch-suggestions="querySearchCBDW"
              @select="handleSelectGYS"
              placeholder="请输入承包单位"
            >
              <template slot-scope="{item}">
                <div class="name">{{item.gysmc}}</div>
              </template>
              <i slot="suffix"  @click="showgysDialog('cbdw')" class="icon iconfont icon-xiangqing1"></i>
            </el-autocomplete>
          </el-form-item>
          <el-form-item class="addJLD" label="监理单位" prop="jldw">
            <el-autocomplete
              class="inline-input"
              size="mini"
              v-model="lmshForm.jldw"
              :fetch-suggestions="querySearchCBDW"
              @select="handleSelectJLDW"
              placeholder="请输入监理单位"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.gysmc }}</div>
              </template>
              <i slot="suffix"  @click="showgysDialog('jldw')" class="icon iconfont icon-xiangqing1"></i>
            </el-autocomplete>
          </el-form-item>
          <el-form-item class="addJLD" label="设计单位" prop="sjdw">
            <el-autocomplete
              class="inline-input"
              size="mini"
              v-model="lmshForm.sjdw"
              :fetch-suggestions="querySearchCBDW"
              @select="handleSelectSJDW"
              placeholder="请输入设计单位"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.gysmc }}</div>
              </template>
              <i slot="suffix"  @click="showgysDialog('sjdw')" class="icon iconfont icon-xiangqing1"></i>
            </el-autocomplete>
          </el-form-item>
          <!--参照机电=>项目维修页面编写联系人-->
          <el-form-item class="addJLD" label="联系人" prop="lxr">
            <el-input  v-model="lmshForm.lxr" size="mini"  @focus="selectFzr"  placeholder="请选择联系人"></el-input>
          </el-form-item>
          <el-form-item class="addJLD" label="联系电话" prop="lxdh">
            <el-input  v-model="lmshForm.lxdh" size="mini"  placeholder="请选择联系电话"></el-input>
          </el-form-item>
          <el-form-item class="addJLD" label="项目介绍" prop="xmjs">
            <el-input  v-model="lmshForm.xmjs" size="mini"    placeholder="请添加项目介绍"></el-input>
          </el-form-item>
          <el-form-item class="addJLD" label="暂定金额(元)" prop="zdje">
            <el-input  v-model.number="lmshForm.zdje" size="mini"  disabled    placeholder="请添加暂定金额"></el-input>
          </el-form-item>
          <el-form-item class="addJLD" label="质保金比例(%)" prop="zbjbl">
            <el-input  v-model.number="lmshForm.zbjbl" size="mini"    placeholder="请添加质保金比例"></el-input>
          </el-form-item>
          <el-form-item class="addJLD" label="保留金比例(%)" prop="bljbl">
            <el-input  v-model.number="lmshForm.bljbl" size="mini"    placeholder="请添加保留金比例"></el-input>
          </el-form-item>
          <el-form-item class="addJLD" label="是否为托管路段" prop="sfwtgld">
            <el-select size="mini"  @change="istgLD" v-model="lmshForm.sfwtgld" placeholder="请选择">
              <el-option
                label="是"
                value="是">
              </el-option>
              <el-option
                label="否"
                value="否">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="showWtdwmc" class="addJLD" label="委托单位名称" prop="wtdwmc">
            <el-input  v-model ="lmshForm.wtdwmc" size="mini"    placeholder="请添加委托单位名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="position: relative;height:calc(100% - 310px);">
        <el-tabs class="xmgkTabs"  style="height: calc(100% - 40px);"  @tab-click="addKHclick" v-model="addtabsModel">
          <el-tab-pane style="height: calc(100% - 20px)" label="人员管理" name="first">
            <el-table  :data="ryData"
                       style="width: calc(100% - 16px);"
                       height="100%"
                       row-class-name="row_class"
                       border
                       @selection-change="handleSelectionChange">
              <el-table-column
                type="index"
                align="center"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                type="selection"
                align="center"
                width="55">
              </el-table-column>
              <el-table-column align="left" label="人员名称">
                <template  slot-scope="scope">
                  <el-input size="mini" type="text" v-model="scope.row.rymc"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="left" label="联系电话" >
                <template  slot-scope="scope">
                  <el-input size="mini" type="text" v-model="scope.row.rydh"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="left" label="职位名称">
                <template  slot-scope="scope">
                  <el-select size="mini" v-model="scope.row.zwmc" placeholder="请选择">
                    <el-option
                      label="管理员"
                      value="5001">
                    </el-option>
                    <el-option
                      label="内业人员"
                      value="5002">
                    </el-option>
                    <el-option
                      label="外业人员"
                      value="5003">
                    </el-option>
                  </el-select>
                  <!--<el-input type="text" v-model="scope.row.zwmc"></el-input>-->
                </template>
              </el-table-column>
              <el-table-column align="left" label="供应商类型">
                <template  slot-scope="scope">
                  <el-select size="mini" v-model="scope.row.gyslx" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in gysMjData"
                      :label="item.mjmc"
                      :value="item.mjbm">
                    </el-option>
                  </el-select>
                  <!--<el-input size="mini" type="text" v-model="scope.row.gyslx"></el-input>-->
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="考核细则" style="height: 100%" class="contenddd" name="second">
            <el-tabs v-model="addkhxzModel"  style="height: calc(100% - 60px )" type="card" @tab-click="addKHclick">
              <el-tab-pane style="height: 100%;" label="进场准备情况考核表" name="fourth">
                <el-table
                  ref="multipleTable4"
                  @selection-change="addjcSelect"
                  :data="jczbInfo"
                  class="tableZDY"
                  height="100%"
                  border>
                  <el-table-column
                    type="selection"
                    align="center"
                    width="55">
                  </el-table-column>
                  <el-table-column type="index"  label="序号" align="center" width="50"></el-table-column>

                  <el-table-column prop="gcxm" label="工程项目" width="180"></el-table-column>
                  <el-table-column prop="khnr" label="考核内容" width="180"></el-table-column>
                  <el-table-column prop="bzyq"  label="标准、要求"> </el-table-column>
                  <!--<el-table-column prop="khpl" label="考核频率"> </el-table-column>-->
                  <!--<el-table-column prop="khfs" label="考核方式" style="text-align: left"> </el-table-column>-->
                  <el-table-column prop="cfbz" label="处罚标准" style="text-align: left"> </el-table-column>
                  <el-table-column  label="备注" >
                    <template slot-scope="scope">
                      <p style="padding-right: 20px;"  class="bzzzzz">{{scope.row.bz}}</p>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane style="height: 100%;" label="绿化养护质量检测考核表" name="first">
                <el-table
                  ref="multipleTable"
                  align="left"
                  @selection-change="addlvSelect"
                  :data="lvInfo"
                  class="tableZDY"
                  height="calc(100% - 20px)"
                  border
                  style="width: calc(100% - 20px);">
                  <el-table-column
                    type="selection"
                    align="center"
                    width="55">
                  </el-table-column>
                  <el-table-column prop="px" label="序号" align="center" width="50" style="line-height: 100%;" class="px"></el-table-column>
                  <!--isSaved     -->

                  <el-table-column prop="jcnrjyq" label="检查内容及要求"></el-table-column>
                  <el-table-column prop="pfbf" label="评分办法"> </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane style="height: 100%;" label="履约质量检测考核表"  name="second">
                <el-table
                  ref="multipleTable2"
                  @selection-change="addlySelect"
                  :data="lyzlInfo"
                  class="tableZDY"
                  height="calc(100% - 20px)"
                  border
                  style="width: calc(100% - 19px);">
                  <el-table-column
                    type="selection"

                    align="center"
                    width="55">
                  </el-table-column>
                  <el-table-column type="index"  label="序号" align="center" width="50"></el-table-column>

                  <el-table-column prop="gcxm" label="工程项目" width="180"></el-table-column>
                  <el-table-column prop="khnr" label="考核内容" width="180"></el-table-column>
                  <el-table-column prop="bzyq"  label="标准、要求"> </el-table-column>
                  <!--<el-table-column prop="khpl" label="考核频率"> </el-table-column>-->
                  <!--<el-table-column prop="khfs" label="考核方式" style="text-align: left"> </el-table-column>-->
                  <el-table-column prop="cfbz" label="处罚标准" style="text-align: left"> </el-table-column>
                  <el-table-column  label="备注" >
                    <template slot-scope="scope">
                      <p style="padding-right: 20px;"  class="bzzzzz">{{scope.row.bz}}</p>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane style="height: 100%;" label="养护巡查考核表" name="third">
                <el-table
                  :data="yhInfo"
                  ref="multipleTable3"
                  @selection-change="addyhSelect"
                  class="tableZDY"
                  height="calc(100% - 20px)"
                  border
                  style="width: calc(100% - 19px);">
                  <el-table-column
                    type="selection"

                    align="center"
                    width="55">
                  </el-table-column>
                  <el-table-column type="index"  label="序号" width="50" align="center">  </el-table-column>
                  <el-table-column prop="gcxm" label="工程项目"></el-table-column>
                  <el-table-column prop="khnr" label="考核内容" ></el-table-column>
                  <el-table-column prop="bzyq" label="标准、要求"></el-table-column>
                  <!--<el-table-column prop="khpl" label="考核频率" width="180"></el-table-column>-->
                  <!--<el-table-column prop="khfs" label="考核方式" width="100"></el-table-column>-->
                  <el-table-column prop="cfbz" label="处罚标准"></el-table-column>
                  <el-table-column  label="备注"  width="180">
                    <template slot-scope="scope">
                      <p style="padding-right: 20px;"  class="bzzzzz">{{scope.row.bz}}</p>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>

          </el-tab-pane>
        </el-tabs>

        <div v-if="addtabsModel == 'first'" style="position:absolute;top:0;right: 5px;">
          <el-button size="mini" @click="promiseTG('add')"><i class="icon iconfont icon-add"></i> 添加</el-button>
          <el-button size="mini"  @click="promiseTG('del')"><i class="icon iconfont icon-delete"></i> 删除</el-button>
        </div>
      </div>
    </div>
    <Dialog :dialogData="dialogData"
            :dialogTableTit="dialogTableTit"
            :datatypes="datatypes"
            :dialogVisible="dialogVisible"
            @searchXMMC="searchXMMC"
            @searchgys="searchgys"
            @searchXMBH="searchXMBH"
            @searchHTinfo="searchHTinfo"
            @closeDialog="closeDialog"
            @closeMask="closeMask"
            @closegysMask="closegysMask"
    >
    </Dialog>
    <el-dialog  :close-on-click-modal="false" :show-close="false" :visible.sync="showSbfzr"  :fullscreen="true" >
     <span slot="title">
          <span class="titleclasschild"  @click="showSbfzr=false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>选择设备负责人</span>
      </span>
      <div class="xz-header"  v-loading.fullscreen.lock="fullscreenLoading">
        <div class="xz-body" style="height:645px;min-width:1100px">
          <div class="left" style="display:inline-block;width:20%;height:100%">
            <el-tree :default-expand-all="true" :data="treeList1"  :props="defaultP1" @node-click="handleNodeClickxz1"></el-tree>
          </div>
          <div class="right" style="display:inline-block;width:79%;height:100%">
            <div class="xz-search">
              <el-input size="mini" type="text"  v-model="xz1.username" placeholder="请输入人员名称">
              </el-input>
              <el-button size="small" @click="searchSb1(1,10)" type="text" class="xz-btn">查询</el-button>
              <el-button size="small" @click="okBtn_fzr" type="text" class="xz-btn">确定选择</el-button>
            </div>
            <div class="bill-table">
              <el-table  @row-click="clickRow1" ref="Table1" :data="ysrList1" tooltip-effect="dark"
                         style="width: 100%;"
                         row-class-name="row_class"
                         border
                         height="550px"
                         :row-style="{fontFamily: '宋体', fontSize: '12px'}"
                         @selection-change="handleSelectionXz1">
                >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column align="center" type="index"  width="50" label="序号"  show-overflow-tooltip></el-table-column>
                <el-table-column align="center" prop="userName" label="名称"></el-table-column>
                <el-table-column align="center" prop="userCode" label="用户编码"></el-table-column>
                <el-table-column align="center" prop="deptList" label="部门编码"></el-table-column>
                <el-table-column align="center" prop="roleList" label="角色信息"></el-table-column>

              </el-table>
              <footer class="footer" style="border: 1px solid #D7D8D9;border-top:none">
                <div style="padding: 6px">
                  <el-pagination
                    @size-change="handlezcSizeChange1"
                    @current-change="handlezcCurrentChange1"
                    :current-page="zcPage1"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="zctotal1">
                  </el-pagination>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Dialog from '@/components/Dialog.vue'
  import {isvalidPhone,validPhone} from '@/util/isvalid.js'

  export default {
    components: {Dialog},
    data () {
      return {
        showWtdwmc:false,
        gysMjData:[],
        dwgcData:{'4201':'路基','4202':'路面','4203':'桥梁涵洞','4204':'隧道','4205':'交通安全措施',
          '4206':'绿化及环境保护措施','4207':'高边坡'},
        editSelectRy:[],
        zmData:[],
        indexDataList:[],
        LHAddSelect:[],
        LyAddSelect:[],
        jcAddSelect:[],
        yhAddSelect:[],
        currentZJ:[],
        ryData:[],
        editRyData:[],
        multipleXz1:[],
        xz1:{zcbm:'',zcmc:'',bmbm:''},
        fullscreenLoading:false,
        treeList1:[],
        defaultP1:{
          children: 'children',
          label: 'text'
        },
        showSbfzr:false,
        // zll
        iscontrollGYS:'',
        addkhxzModel:'fourth',
        addtabsModel:'first',
        htmcInfos:[ ],
        gysInfos:[ ],
        lxbmList:[ ],
        lmshForm: {htmc:'',xmmc:'',lxbm:'',lxmc:'',cd:'',qszh:'',zzzh:'',gclx:'',
          htkgrq:'',htwgrq:'',htgq:'',sjkgrq:'',sjwgrq:'',wh:'',sprq:'',zljdbm:'',sglx:'',
          cbdw:'',jldw:'',sjdw:'',lxr:'',lxdh:'',xmjs:'',sfwtgld:'否',},
        xmgkRules: {
          htmc: [
            { required: true, message: '请选择合同名称'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          xmmc: [
            { required: true, message: '项目名称不能为空'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          lxbm: [
            {required: true,  message: '请选择路线编码', trigger: 'blur' },
          ],
          lxmc: [
            {required: true,  message: '请输入路线名称'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          cd: [
            {required: true,  message: '请输入长度', trigger: 'blur' },

          ],
          qszh: [
            { required: true,  message: '请输入起始桩号', trigger: 'blur' },

          ],
          zzzh: [
            { required: true,  message: '请输入终止桩号', trigger: 'blur' },

          ],
          gclx: [
            { required: true,  message: '请输入工程类型' },
            { min: 1, message: '输入内容不能为空', trigger: 'change' }
          ],
  /*        htkgrq: [
            {type: 'string', required: true,  message: '请输入合同开工日期'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          htwgrq: [
            {required: true,  message: '请输入合同完工日期'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],*/
       /*   htgq: [
            {required: true,  message: '请输入合同工期', trigger: 'blur' },

          ],*/
          sjkgrq: [
            { required: true,  message: '请输入实际开工日期'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          sjwgrq: [
            {required: true,  message: '请输入实际完工日期'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          wh: [
            { required: true,  message: '请输入文号'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          sprq: [
            { required: true,  message: '请输入审批日期'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          zljdbm: [
            {required: true,  message: '请输入质量监督部门'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          sglx: [
            {required: true,  message: '请输入施工类型'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          cbdw: [
            { required: true,  message: '请输入承包单位'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          jldw: [
            {required: true,  message: '请输入监理单位'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          sjdw: [
            {required: true,  message: '请输入设计单位'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          lxr: [
            { required: true,  message: '请输入联系人'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          lxdh: [
            { required: true, trigger: 'blur', message: '请输入正确的手机号',validator: validPhone }//这里需要用到全局变量
          ],
          zdje: [
            {type: 'number', required: false,  message: '输入内容必须为数字'},
          ],
          zbjbl: [
            {type: 'number', required: true,  message: '输入内容必须为数字'},
          ],
          bljbl: [
            {type: 'number', required: true,  message: '输入内容必须为数字'},
          ],
          sfwtgld: [
            { required: true,  message: '请选择是否为托管路段'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          wtdwmc: [
            { required: true,  message: '请输入托管单位名称'},
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],

        },
        addBase:{
          htmc:'合同名称',
          xmmc:'项目名称',
          lxbm:'路线编码',
          lxmc:'路线名称',
          cd:'长度',
          qszh:'起始桩号',
          zzzh:'终止桩号',
          dwgc:'单位工程',
          gcfl:'工程类型',
          htkgrq:'合同开工日期',
          htwgrq:'合同完工日期',
          htgq:'合同工期',
          sjkgrq:'实际开工日期',
          sjwgrq:'实际完工日期',
          zgspdw:'主管审批单位',
          wh:'文号',
          sprq:'审批日期',
          lljdbm:'质量监督部门',
          sglx:'施工类型',
          gldw:'管理单位',
          cbdw:'承包单位',
          jldw:'监理单位',
        },
        isShowAdd:false,
        Selectxmlx:[],
         editlv:true,
        scopeInfo:{},
        scopetype:null,
        rules:{
          xmlxr: [
            { required: true, message: '项目联系人不能为空', trigger: 'blur' },
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          lxdh: [
            { required: true, trigger: 'blur', message: '请输入正确的手机号',validator: validPhone }//这里需要用到全局变量
          ],
          xmjs: [
            { required: false, message: '输入内容不能为空', trigger: 'blur' },
            { min: 1, message: '输入内容不能为空', trigger: 'blur' }
          ],
          xmlx: [
            { required: true, message: '输入内容不能为空', trigger: 'blur' },
            { min:1, message: '输入内容不能为空', trigger: 'blur' }
          ],
        },
        ruleForm: {
          xmlxr:'',
          lxdh: '',
          xmjs: '',
          zt: '',
          xmlx: '',
        },

        //you
        datatypes:'', // ok
        dialogTableTit:{ //ok
          XMMC:'项目名称',XMBH:'项目编号',
        },
        dialogData:[ // ok
          {xmmc:'甬台温',xmbh:'G48'},
          {xmmc:'贵黄',xmbh:'G56'},
          {xmmc:'桂林',xmbh:'G99'},
        ],
        dialogVisible:false, // ok
        restaurants:[ ],
        restaurantsBH:[ ],
        //me
        windowTit:'fdsf',
        searchForm:{
          xmmc:'',
          xmbh:'',
          searchTime:'',
          selectType:undefined,
          typeIndex:0,
          selectState:undefined,
          stateIndex:0,
          pageNum:1,
          pageSize:10,
        },
        initDatas:[],

        basicData:{},
        jczbInfo:[],//进场准备情况数据
        lvInfo:[],//绿化信息
        lyzlInfo:[],//履约质量检测
        yhInfo:[],//养护质量检测
        zmInfo:[],//子目信息
        initDataTotal:100,
        httype:[
          {name:'全部',val:undefined},
          {name:'日常养护工程',val: 'hm'},
          {name:'专项养护工程',val: 'sm'},
          {name:'机电养护工程',val: 'mee'},
        ],
        htState:[
          {name:'全部',val:undefined},
          {name:'待完善',val:3801},
          // {name:'已完善',val:3802},
          {name:'审核中',val:3803},
          {name:'已审核',val:3804},
        ],
        stateData:{
          3801:'待完善',
          // 3802:'已完善',
          3803:'审核中',
          3804:'已审核',
        },
        isShowDetail:false,//展示详情区域
        isEdit:false,
        showSearch:true,//展示查询区域
        activeName2:'fourth',
        xmInfo:{
          xmlxr:'项目联系人',
          lxdh:'联系电话',
          xmlx:'项目类型',
          // xmjs:'项目介绍',
        },
        BasicInfo:{
          xmbh:'项目编码',
          xmmc:'项目名称',
          lxbm:'路线编码',
          lxmc:'路线名称',
          cd:'长度',
          qszh:'起始桩号',
          zzzh:'终止桩号',
          dwgc:'单位工程',
          gcfl:'工程类型',
          htkgrq:'合同开工日期',
          htwgrq:'合同完工日期',
          htgq:'合同工期',
          sjkgrq:'实际开工日期',
          sjwgrq:'实际完工日期',
          zgspdw:'主管审批单位',
          wh:'文号',
          sprq:'审批日期',
          lljdbm:'质量监督部门',
          sglx:'施工类型',
          gldw:'管理单位',
          cbdw:'承包单位',
          jldw:'监理单位',
          xmlxr:'项目联系人',
          lxdh:'联系电话',
          xmlx:'项目类型',
          xmjs:'项目介绍',
          zbjbl:'质保金比例',
          bljbl:'保留金比例',
          sfwtgld:'是否为托管路段',
          // zt:'状态',
          // xmlx:'项目类型',
        },//基础信息
        tableData: [
          // {
          //   zmh:'502-4',
          //   zmmc:'支护修复',
          //   tbdw:'1',
          //   djbh:'1',
          //   htbh:'1',
          //   gcxm:'1',
          //   cbdw:'1',
          //   gldw:'1',
          //   htmc:'甬台温高速专项合同1',
          // },
        ],
        activeName:'first',
        lvSelection:[],
        lySelection:[],
        jcSelection:[],
        yhSelection:[],
        selectXMBH:'',

        saveLH:{
           lh:[],
           ly:[],
           yh:[],
           jc:[],

        },
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
          supplierpk:null,
          isWaixie:false,
        },
        kexzIsSelet:{
           lh:null,
          ly:null,
          yh:null,
          jc:null
        },
        ysrList1:[],
        zctotal1:10,
        zcPage1:1,
        zcSize1:10,
      }
    },

    methods: {
      aa(){
        let self = this

        //哈哈
        switch (this.addkhxzModel){
          case 'first':
            // //考核细则之--绿化养护质量检测
            self.$api.getLhyhzljcpfb().then(res=>{
              if(res.code == 1){
                self.lvInfo = res.data.list
                self.lvInfo.forEach((item,index)=>{
                  // if(self.saveLH.lh.indexOf(item.px) != -1){
                    self.$nextTick(()=>{
                      self.$refs.multipleTable.toggleRowSelection(item,true);
                    })
                  // }
                })
              }
            })
            break;
          case 'second':
            self.$api.getZlglkh().then(res=>{
              if(res.code == 1){
                self.lyzlInfo = res.data.list
                self.lyzlInfo.forEach((item,index)=>{
                  // if(self.saveLH.ly.indexOf(item.px) != -1){
                    self.$nextTick(()=>{
                      self.$refs.multipleTable2.toggleRowSelection(item,true);
                    })
                  // }
                })
              }
            })
            break;
          case 'third':
            self.$api.getZlglkh().then(res=>{
              if(res.code == 1){
                self.yhInfo = res.data.list
                self.yhInfo.forEach((item,index)=>{
                  // if(self.saveLH.yh.indexOf(item.px) != -1){
                    self.$nextTick(()=>{
                      self.$refs.multipleTable3.toggleRowSelection(item,true);
                    })
                  // }
                })
              }
            })
            break;
          case 'fourth':
            self.$api.getZlglkh().then(res=>{
              if(res.code == 1){
                self.jczbInfo = res.data.list
                self.jczbInfo.forEach((item,index)=>{
                  // if(self.saveLH.yh.indexOf(item.px) != -1){
                    self.$nextTick(()=>{
                      self.$refs.multipleTable4.toggleRowSelection(item,true);
                    })
                  // }
                })
              }
            })
            // addXmgkjczbqkb
            break;
        }
      },
      istgLD(val){
         if(val == '是'){
           this.showWtdwmc = true
         }else{
           this.showWtdwmc = false
         }
      },
      initDate(){
        let date = new Date()
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let day = date.getDate();
        this.lmshForm.sprq = year+'-'+month+'-'+day

      },
      ListSelect(selection,row){
        this.indexDataList = selection

      },
      addlvSelect(selection,row){
        this.LHAddSelect = selection
      },
      addlySelect(selection,row){
        this.LyAddSelect = selection
      },
      addjcSelect(selection,row){
        this.jcAddSelect = selection
      },
      addyhSelect(selection,row){
        this.yhAddSelect = selection
      },
      saveAdd(){
        let {orgbh,orgid,orgmc,supplierpk} = this.userInfo
        let {htje,xmjs,xmzt,xmlx,xmmc,cbdw,cbdwbh,sjdwbh,cbdwid,sjdwid,jldwid,
          jldwbh,htbh,lxbm,lxmc,cd,qszh,zzzh,gclx,htkgrq,htwgrq,zgspdw,
          htgq,sjkgrq,sjwgrq,wh,sprq,sglx,jldw,sjdw,lxr,lxdh,zljdbm,dwgc,zbjbl,bljbl,sfwtgld,wtdwmc,zdje} = this.lmshForm

        let {LXCODE} = lxbm
      this.ryData.forEach(item=>{
          item.xmmc = xmmc
          item.xmbh = htbh
          item.rybm = ''
          item.ryid = ''
          item.zwbm = ''
        })
        let self = this
        this.$refs['lmshForm'].validate((valid,aa) => {
          if(valid){

            if(self.zmData&&self.zmData.length){
              console.log(JSON.stringify(self.zmData))
              this.$api.addXmgkzzmm(self.zmData).then(res=>{

              })
            }
            if(self.LHAddSelect&&self.LHAddSelect.length){
              let str = ''
              self.LHAddSelect.forEach(item=>{
                str += item.px+','
              })
              self.$api.addXmgklhzljc({xmbh:htbh,pxArray:str.substring(0,str.length-1)}).then(res=>{
                if(res.code == 1){

                }
              })
            }
           if(self.LyAddSelect&&self.LyAddSelect.length){
              let lyStr = ''
             self.LyAddSelect.forEach( item =>{
               lyStr += item.px+','
             })
             self.$api.addXmgklyzljc({xmbh:htbh,pxArray:lyStr.substring(0,lyStr.length-1)}).then(res=>{

             })
           }
           if(self.yhAddSelect&&self.yhAddSelect.length){
             let yhStr = ''
             self.yhAddSelect.forEach(item => {
               yhStr += item.px + ','
             })
             self.$api.addXmgkyhxc({xmbh:htbh,pxArray:yhStr.substring(0,yhStr.length-1)}).then(res=>{

             })
           }
           if(self.jcAddSelect&&self.jcAddSelect.length){
             let jcStr = ''
             self.jcAddSelect.forEach(item => {
               jcStr += item.px + ','
             })
             self.$api.addXmgkjczbqkb({xmbh:htbh,pxArray:jcStr.substring(0,jcStr.length-1)}).then(res=>{

             })
           }

            self.$api.addXmgkjcxx({
              cbdw: cbdw,
              cbdwbh: cbdwbh,
              cbdwid: cbdwid,
              cd: cd,

              dwgc:dwgc,
              gcfl: gclx,
              gldw: orgmc,
              gldwbh:orgbh,
              gldwid:orgid,
              gysid:cbdwid,
              gysmc:cbdw,
              htgq: htgq,
              htje: htje,
              htkgrq: htkgrq,
              htwgrq:htwgrq,
              jldw: jldw,
              jldwbh:jldwbh,
              jldwid:jldwid,
              lljdbm:zljdbm,
              lxbm: LXCODE,
              lxdh: lxdh,
              lxmc: lxmc,
              qszh: qszh,
              sglx:sglx,
              sjdw: sjdw,
              sjdwbh: sjdwbh,
              sjdwid:sjdwid,
              sjkgrq:sjkgrq,
              sjwgrq:sjwgrq,
              sprq:sprq,
              tbsj: "",
              wh: wh,
              xmbh: htbh,
              xmjs: xmjs,
              xmlx:xmlx,
              xmlxr: lxr,
              xmmc:xmmc,
              xmzt: '0502',
              zgspdw:zgspdw,
              zt: "3801",
              zzzh:zzzh,
              ryxxbs: self.ryData,
              zbjbl,
              bljbl,
              zdje,
              sfwtgld:sfwtgld?sfwtgld:'否',
              wtdwmc:wtdwmc? wtdwmc:undefined,
            }).then(res=>{
              self.isShowAdd = false
              this.searchXM()
              if(res.code){
                this.$message({
                  message: '添加成功!',
                  type: 'success'
                });
              }else{
                this.$message({
                  message: res.msg,
                  type: 'info'
                });
              }
            })
          }

        });
      },
      saveEdit(){
        let {orgbh,orgid,orgmc,supplierpk} = this.userInfo
        let {htje,xmjs,xmzt,xmlx,xmmc,cbdw,cbdwbh,sjdwbh,cbdwid,sjdwid,jldwid,
          jldwbh,htbh,lxbm,lxmc,cd,qszh,zzzh,gclx,htkgrq,htwgrq,zgspdw,
          htgq,sjkgrq,sjwgrq,wh,sprq,sglx,jldw,sjdw,lxr,lxdh,zljdbm,dwgc,zbjbl,bljbl,sfwtgld,wtdwmc,zdje} = this.lmshForm

        let {LXCODE} = lxbm

 /*       this.ryData.forEach(item=>{
          item.xmmc = xmmc
          item.xmbh = htbh
          item.rybm = ''
          item.ryid = ''
          item.zwbm = ''
        })*/
        let self = this
        this.$refs['lmshForm'].validate((valid,aa) => {
          if(valid){
            if(self.editRyData&&self.editRyData.length){

              this.editRyData.forEach(item=>{
                item.xmmc = xmmc
                item.xmbh = htbh
                item.rybm = ''
                item.ryid = ''
                item.zwbm = ''
              })

              this.$api.addryxxb(self.editRyData).then(res=>{

              }).catch(err=>{
                alert('err')
              })
            }else{

            }
            self.$api.updateXmgkjcxx({
              cbdw: cbdw,
              zdje,
              cbdwbh: cbdwbh,
              cbdwid: cbdwid,
              cd: cd,
              dwgc:dwgc,
              gcfl: gclx,
              gldw: orgmc,
              gldwbh:orgbh,
              gldwid:orgid,
              gysid:cbdwid,
              gysmc:cbdw,
              htgq: htgq,
              htje: htje,
              htkgrq: htkgrq,
              htwgrq:htwgrq,
              jldw: jldw,
              jldwbh:jldwbh,
              jldwid:jldwid,
              lljdbm:zljdbm,
              lxbm: LXCODE,
              lxdh: lxdh,
              lxmc: lxmc,
              qszh: qszh,
              sglx:sglx,
              sjdw: sjdw,
              sjdwbh: sjdwbh,
              sjdwid:sjdwid,
              sjkgrq:sjkgrq,
              sjwgrq:sjwgrq,
              sprq:sprq,
              tbsj: "",
              wh: wh,
              xmbh: htbh,
              xmjs: xmjs,
              xmlx:xmlx,
              xmlxr: lxr,
              xmmc:xmmc,
              xmzt: '0502',
              zgspdw:zgspdw,
              zt: "3801",
              zzzh:zzzh,
              // ryxxbs: self.editRyData,
              zbjbl,
              bljbl,
              sfwtgld:sfwtgld?sfwtgld:'否',
              wtdwmc
            },{xmbh:htbh}).then(res=>{
              self.isShowDetail = false
              this.searchXM()
              if(res.code == 1){
                this.$message({
                  message: '编辑成功!',
                  type: 'success'
                });
              }else{
                this.$message({
                  message: '编辑失败!',
                  type: 'info'
                });
              }
            }).catch(err=>{
              this.$message({
                message: '编辑失败!',
                type: 'info'
              });
            })

          }
        });
      },
      promiseTG(type){

        let self = this

        switch (type) {
          case 'update':
            break;
          case 'add':
            let obj = {
            number: this.ryData&&this.ryData.length?Number(this.ryData[this.ryData.length - 1].number) + 1:1,
             rymc:'',
             rydh:'',
             zwmc:'',
             gyslx:'',
            }
            this.ryData.push(obj)
          case 'del':
            let currentZJ = self.currentZJ;
            let ryData = self.ryData
            this.ryData= ryData.filter(item => !currentZJ.some(ele=>ele.number===item.number));
            break;
        }
      },
      editpromiseTG(type){
        let self = this
        switch (type) {
          case 'save':

            this.editRyData.forEach(item=>{
              item.xmbh = this.basicData.xmbh
              item.xmmc = this.basicData.xmmc
            })
              this.$api.addryxxb(this.editRyData).then(res=>{
                if(res.code == 1){
                  this.$message({
                    showClose: true,
                    message: '人员保存成功',
                    type: 'success'
                  });
                }
              })
            if(this.basicData.zt == '3801'){
              this.$api.updateXmgkjcxxztxx({xmbh:this.basicData.xmbh,zt:'3802'}).then(res=>{

              })
            }
            break;
          case 'add':
            let obj = {
             id: this.editRyData&&this.editRyData.length?this.editRyData.length:1,
             rymc:'',
             lxdh:'',
             zwmc:'',
             gys:'',
            }
            this.editRyData.push(obj)
          case 'del':
            let editSelectRy = self.editSelectRy;
            let editRyData = self.editRyData
            this.editRyData= editRyData.filter(item => !editSelectRy.some(ele=>ele.id===item.id));
            break;
        }
      },
      addKHclick(){

        this.aa()
      },

      okBtn_fzr (){
        if(this.multipleXz1.length==0){
          this.$message({
            message: '请选择人员',
            type: 'error'
          })
        }else{
          if(this.multipleXz1.length>1){
            this.$message({
              message: '只能选择一个设备负责人',
              type: 'error'
            })
            return
          }

          this.lmshForm.lxr=this.multipleXz1[0].userName
//          this.lysqForm.sbfzrcode=this.multipleXz1[0].userCode
          this.$refs.Table1.clearSelection()
          this.xz1.dwbm=this.userInfo.bmbh
          this.xz1.bmbm=''
          this.xz1.username=''
          this.showSbfzr=false
        }
      },
      handlezcCurrentChange1 (val) {
        this.zcPage1 = val
        this.searchSb1(this.zcPage, this.zcSize)
      },
      handlezcSizeChange1 (val) {
        this.zcSize1 = val
        this.searchSb1(this.zctPage, this.zcSize)
      },
      handleSelectionXz1(val){
        this.multipleXz1 = val
      },
      clickRow1(row){
        //资产
        this.$refs.Table1.clearSelection()
        this.$refs.Table1.toggleRowSelection(row)
      },
      handleNodeClickxz1(data){
        this.xz1.bmbm=data.id
        this.searchSb1(1,10)
      },
      searchSb1 (currentPage, pageSize) {
        this.loading = true
        this.$api.selRyByDwAndBm('?pageNum=' + this.zcPage1 + '&pageSize=' + this.zcSize1 + '&' + $.param(this.xz1)).then(resp => {
          if (resp.status !== 200) {
            this.$message({
              message: '出错了',
              type: 'error'
            })
          } else {

            this.ysrList1 = resp.data.data.list
            this.zctotal1= resp.data.data.total
          }
        }).catch(e => {
        })
      },
      selectFzr(){
        this.showSbfzr = true
        this.fullscreenLoading = true
        this.$api.getUserDept('?dwbm='+this.userInfo.orgbh).then(resp=>{
          this.fullscreenLoading = false
          if (resp.status !== 200) {
            this.$message({
              message: '出错了',
              type: 'error'
            })
          } else {
            this.treeList1 = resp.data.data

            this.xz1.dwbm=this.userInfo.orgbh
            this.xz1.username=''
            this.xz1.bmbm=this.userInfo.bmbh
            this.searchSb1(1,10)
          }
        }).catch(e => {
          this.fullscreenLoading=false
        })
      },
      searchHTinfo(val){
        console.log(val,'===val')
        this.$api.gethtxx({pageNum:1,pageSize:300,zzpk:'0001A210000000009733',htmc:val}).then(res => {
          if (res.code == 1) {
            this.dialogData = res.data
          } else {
            this.dialogData = []
          }
        })

      },
      initqueryGYS(){
        this.$api.getgysxx2({pageNum:1,pageSize:20}).then(res=>{

          if(res.code == 1){
            this.gysInfos = res.data
          }else{
            this.gysInfos = []
          }

        })
      },
      querySearchCBDW(queryString, cb,c){
        let  restaurants = this.gysInfos;
        let results = queryString ? restaurants.filter(this.createFilter(queryString,'gysmc')) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      selectLxBm(val){
        this.lmshForm.lxmc = val.LXNAME
        this.lmshForm.cd = val.MILEAGE
        this.lmshForm.qszh = val.SZHH
        this.lmshForm.zzzh = val.EZHH
      },
      initqueryhtInfo(){
        this.$api.gethtxx({pageNum:1,pageSize:300,zzpk:'0001A210000000009733'}).then(res => {
          if (res.code == 1) {
              this.htmcInfos = res.data
          } else {
            this.htmcInfos = []
          }
        })
      },
      querySearchHtmc(queryString, cb) {
        let  restaurants = this.htmcInfos;
        let results = queryString ? restaurants.filter(this.createFilter(queryString,'HTMC')) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      handleSelectHtinfo(item){
        this.lmshForm.htzt = item.HTZT
        this.lmshForm.xmjs = item.XMJS
        this.lmshForm.htje = item.HTJE?item.HTJE:0
        this.lmshForm.xmlx = item.HTLBMC
        this.lmshForm.zgspdw = item.ZGSPDW
        this.lmshForm.zdje =  item.ZDJE?parseFloat(item.ZDJE):0
        this.lmshForm.htmc = item.HTMC

        this.lmshForm.htbh = item.HTBH
        this.lmshForm.htkgrq = item.HTKGSJ
        this.lmshForm.htwgrq = item.HTWGRQ
        this.lmshForm.htgq = item.HTGQ
        this.$api.getZzmm({htdjpk:item.HTDJPK}).then(res=>{
          if(res.code == 1){

            this.zmData = res.data
            this.zmData.forEach(val=>{
              val.xmmc = val.htmc
              val.xmbh = item.HTBH
              val.dw = val.jldwpk
              val.hj = val.je
            })
          }
        })

      },
      handleSelectGYS(event){
            this.lmshForm.cbdw = event.gysmc
            this.lmshForm.cbdwbh = event.gysbm
            this.lmshForm.cbdwid = event.gyspk
      },
      handleSelectJLDW(event){
            this.lmshForm.jldw = event.gysmc
            this.lmshForm.jldwbh = event.gysbm
            this.lmshForm.jldwid = event.gyspk
      },
      handleSelectSJDW(event){
            this.lmshForm.sjdw = event.gysmc
            this.lmshForm.sjdwbh = event.gysbm
            this.lmshForm.sjdwid = event.gyspk
      },
      addXMGK(){
        this.addtabsModel = 'first'
        this.isShowAdd = true
        this.sfwtgld = false
        this.ryData = []
        this.lmshForm = {htmc:'',xmmc:'',lxbm:'',lxmc:'',cd:'',qszh:'',zzzh:'',gclx:'',
          htkgrq:'',htwgrq:'',htgq:'',sjkgrq:'',sjwgrq:'',wh:'',sprq:'',zljdbm:'',sglx:'',
          cbdw:'',jldw:'',sjdw:'',lxr:'',lxdh:'',xmjs:'',sfwtgld:'否',}
        this.initqueryhtInfo()
        this.initqueryGYS()
        this.aa()
        this.initDate()

        this.$api.getLxList().then(res=>{
          if(res.code == 1){
            this.lxbmList = res.data

          }
        })
        this.$api.jdwhxjwxgetXjType2({mjlxbm:"49"}).then(res=>{
               console.log(res,'===gongyings ')
          if(res.code == 1){
            this.gysMjData = res.data
          }else{
            this.gysMjData = []
          }
        })
      },
      delXMGK(){
        if(!(this.indexDataList&&this.indexDataList.length)){
          this.$message({
            message: '请先选择要删除的项目',
            type: 'warning'
          });
        }else {
//          xmbh
          let arr = ''
          this.indexDataList.forEach(item=>{
            arr+=item.xmbh + ','
          })
          let obj = {
            xmbh:arr.substring(0,arr.length-1)
          }
          this.$api.deleteXmgkjcxx(obj).then(res=>{

            if(res.code == 1){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }
            this.searchXM()
          })
        }
      },
       initqueryXMLX(){
         this.$api.jdwhxjwxgetXjType2({mjlxbm:28}).then(res=>{
           if(res.code == 1){
           this.Selectxmlx = res.data
           }

         })
       },
      //详情
      initUser(){
        let userInfo = JSON.parse(localStorage.getItem('userMsg'))[0]
        if(userInfo){
          this.userInfo = userInfo
          if(userInfo){
            this.userInfo.yhbm = userInfo.userCode
            this.userInfo.yhid = userInfo.userId
            this.userInfo.yhmc = userInfo.userName
            this.userInfo.userType = userInfo.userType
            if(userInfo.userType == '供应商'){
              this.userInfo.isWaixie = true
            }else{
              this.userInfo.isWaixie = false
            }
            let deptList = userInfo.deptList
            let bminfo = deptList[0]
            if(bminfo){
              this.userInfo.supplierpk = bminfo.supplierpk

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
      showDetail(scope,type){
          this.scopeInfo = scope
        this.scopetype = type
        this.editlv = true
          this.queryTabData(scope,type)
      },
      editInfo(){
        this.editlv = false
        let self = this
        switch (this.activeName2){
          case 'first':
            // //考核细则之--绿化养护质量检测
            self.$api.getLhyhzljcpfb().then(res=>{
              if(res.code == 1){
                self.lvInfo = res.data.list
                self.lvInfo.filter((item,index)=>{
                  if(self.saveLH.lh.indexOf(item.px) != -1){
                    self.$nextTick(()=>{
                      self.$refs.multipleTable.toggleRowSelection(item,true);
                    })
                  }
                })
              }
            })
            break;
          case 'second':
            self.$api.getZlglkh().then(res=>{
              if(res.code == 1){
                self.lyzlInfo = res.data.list
                self.lyzlInfo.filter((item,index)=>{
                  if(self.saveLH.ly.indexOf(item.px) != -1){
                    self.$nextTick(()=>{
                      self.$refs.multipleTable2.toggleRowSelection(item,true);
                    })
                  }
                })
              }
            })
            break;
          case 'third':
            self.$api.getZlglkh().then(res=>{
              if(res.code == 1){
                self.yhInfo = res.data.list
                self.yhInfo.filter((item,index)=>{
                  if(self.saveLH.yh.indexOf(item.px) != -1){
                    self.$nextTick(()=>{
                      self.$refs.multipleTable3.toggleRowSelection(item,true);
                    })
                  }
                })
              }
            })
            break;
          case 'fourth':
            self.$api.getZlglkh().then(res=>{
              if(res.code == 1){
                self.jczbInfo = res.data.list
                self.jczbInfo.filter((item,index)=>{
                  if(self.saveLH.jc.indexOf(item.px) != -1){
                    self.$nextTick(()=>{
                      self.$refs.multipleTable4.toggleRowSelection(item,true);
                    })
                  }
                })
              }
            })
            break;
        }
      },
      saveSelect(){
        let self = this
        switch (this.activeName2){
          case 'first':
            let lvSelection = self.lvSelection
            let pxStr = ''
            if(self.lvSelection.length) {
              lvSelection.forEach( item =>{
                pxStr += item.px+','
              })
              if (this.kexzIsSelet.lh) {

                this.$api.addXmgklhzljc({xmbh:self.selectXMBH,pxArray:pxStr.substring(0,pxStr.length-1)}).then(res=>{
                  this.isShowDetail = false
                  if(res.code == 1){
                    this.$message({
                      message: '添加信息成功！',
                      type: 'success'
                    });

                  }else{
                    this.$message({
                      message: '添加信息失败！',
                      type: 'info'
                    });
                  }
                })
              }else{
                this.$api.updateXmgklhjcxx({xmbh:self.selectXMBH,pxArray:pxStr.substring(0,pxStr.length-1)}).then(res=>{
                  this.isShowDetail = false
                  if(res.code == 1){
                    this.$message({
                      message: '添加信息成功！',
                      type: 'success'
                    });
                  }else{
                    this.$message({
                      message: '添加信息失败！',
                      type: 'info'
                    });
                  }
                })
              }
            } else{
              this.$message({
                message: '请先选择数据！',
                type: 'info'
              });
            }
            break;
          case 'second':

            if(self.lySelection.length){
              let lvSelection = self.lySelection
              let pxStr = ''
              if(self.lySelection.length){
                lvSelection.forEach( item =>{
                  pxStr += item.px+','
                })

                if (this.kexzIsSelet.ly) {
                  this.$api.addXmgklyzljc({xmbh:self.selectXMBH,pxArray:pxStr.substring(0,pxStr.length-1)}).then(res=>{
                    this.isShowDetail = false
                    if(res.code == 1){
                      this.$message({
                        message: '添加信息成功！',
                        type: 'success'
                      });
                    }else{

                    }
                  })

                }else{
                  this.$api.updateXmgklyjcxx({xmbh:self.selectXMBH,pxArray:pxStr.substring(0,pxStr.length-1)}).then(res=>{
                    this.isShowDetail = false
                    if(res.code == 1){
                      this.$message({
                        message: '添加信息成功！',
                        type: 'success'
                      });
                    }else{

                    }
                  })
                }
              }else{
                this.$message({
                  message: '请先选择数据！',
                  type: 'info'
                });
              }
            }else{
              this.$message({
                message: '请先选择数据！',
                type: 'info'
              });
            }

            break;
          case 'third':

            if(self.yhSelection) {
              let yhSelection = self.yhSelection
              let pxStr = ''
              if (self.yhSelection.length) {
                yhSelection.forEach(item => {
                  pxStr += item.px + ','
                })
                if (this.kexzIsSelet.yh) {
                  this.$api.addXmgkyhxc({
                    xmbh: self.selectXMBH,
                    pxArray: pxStr.substring(0, pxStr.length - 1)
                  }).then(res => {
                    this.isShowDetail = false
                    if(res.code == 1){
                      this.$message({
                        message: '添加信息成功！',
                        type: 'success'
                      });
                    }else{
                      this.$message({
                        message: '添加信息失败！',
                        type: 'info'
                      });
                    }
                  })

                }else{
                  this.$api.updateXmgkyhxcjcxx({
                    xmbh: self.selectXMBH,
                    pxArray: pxStr.substring(0, pxStr.length - 1)
                  }).then(res => {
                    this.isShowDetail = false
                    if(res.code == 1){
                      this.$message({
                        message: '添加信息成功！',
                        type: 'success'
                      });
                    }else{
                      this.$message({
                        message: '添加信息失败！',
                        type: 'info'
                      });
                    }
                  })
                }

              }else{
                this.$message({
                  message: '请先选择数据！',
                  type: 'info'
                });
              }
            }else{
              this.$message({
                message: '请先选择数据！',
                type: 'info'
              });
            }
            break;
          case 'fourth':
            if(self.jcSelection.length){
              let jcSelection = self.jcSelection
              let pxStr = ''
              if(self.jcSelection.length){
                jcSelection.forEach( item =>{
                  pxStr += item.px+','
                })

                if (this.kexzIsSelet.jc) {
                  this.$api.addXmgkjczbqkb({xmbh:self.selectXMBH,pxArray:pxStr.substring(0,pxStr.length-1)}).then(res=>{
                    this.isShowDetail = false
                    if(res.code == 1){
                      this.$message({
                        message: '添加信息成功！',
                        type: 'success'
                      });
                    }else{

                    }
                  })

                }else{
                  this.$api.updateXmgkjczbqkb({xmbh:self.selectXMBH,pxArray:pxStr.substring(0,pxStr.length-1)}).then(res=>{
                    this.isShowDetail = false
                    if(res.code == 1){
                      this.$message({
                        message: '添加信息成功！',
                        type: 'success'
                      });
                    }else{

                    }
                  })
                }
              }else{
                this.$message({
                  message: '请先选择数据！',
                  type: 'info'
                });
              }
            }else{
              this.$message({
                message: '请先选择数据！',
                type: 'info'
              });
            }

            break;
        }
      },
      queryTabData(scope,type){
         let self = this
        if(scope){
          let BMinfo = scope.row.xmbh
          self.selectXMBH = BMinfo
          let {yhmc,yhid,bmmc,orgmc} = this.userInfo
          self.windowTit = scope.row.xmmc +'&nbsp;&nbsp;'+ scope.row.xmbh
          if(type == 'edit'){
            self.isShowDetail = true
            self.isEdit = true
            switch (self.activeName){
              case 'first':
                //人员信息
                let xmlx = {hm:'日常养护工程',sm:'专项养护工程',mee:'机电养护工程',}
                self.$api.getOnlyXmgkjcxx({xmbh:BMinfo}).then(res=>{

                  if(res.code == 1){
                    self.basicData = res.data[0]
                    self.lmshForm = res.data[0]
                    self.lmshForm.htmc = res.data[0].xmmc
                    self.lmshForm.lxr = res.data[0].xmlxr
                    self.lmshForm.gclx = res.data[0].gcfl
                    self.lmshForm.zljdbm = res.data[0].lljdbm
                    self.lmshForm.htbh = res.data[0].xmbh
                    self.lmshForm.zdje = res.data[0].zdje?parseFloat(res.data[0].zdje):0
                    self.lmshForm.zbjbl = parseFloat(res.data[0].zbjbl)
                    self.lmshForm.bljbl =  parseFloat(res.data[0].bljbl)
                    if(res.data[0].sfwtgld == '是'){
                      self.showWtdwmc = true
                    }else{
                      self.showWtdwmc = false
                    }
                    self.ruleForm = {
                      xmlxr:self.basicData.xmlxr,
                      lxdh: self.basicData.lxdh,
                      xmjs:self.basicData.xmjs,
                      xmlx: xmlx[self.basicData.xmlx],
                    }
                  }
                })
                this.$api.getryxxb({xmbh:BMinfo}).then(res=>{

                  if(res.code == 1){
                    this.editRyData = res.data
                  }else{
                    this.editRyData = []
                  }
                })
                this.$api.jdwhxjwxgetXjType2({mjlxbm:"49"}).then(res=>{
                  if(res.code == 1){
                    this.gysMjData = res.data
                  }else{
                    this.gysMjData = []
                  }
                })
                break;
              case 'second':
                switch (this.activeName2){
                  case 'first':

                    // kexzIsSelet:{
                    //   lh:null,
                    //     ly:null,
                    //     yh:null
                    // }
                    //查询绿化养护质量保存的信息
                    this.$api.getXmgklhzljcByhtbh({htbh:BMinfo}).then(res=>{
                      if(res.code == 1){
                        if(res.data&&res.data){
                          this.lvInfo = res.data
                          this.kexzIsSelet.lh = false
                        }else{
                          this.lvInfo = []
                          this.kexzIsSelet.lh = true
                        }
                        res.data.forEach(item=>{
                          this.saveLH.lh.push(item.px)
                        })
                      }else{
                        this.lvInfo = []
                        this.kexzIsSelet.lh = true
                      }
                    })

                    break;
                  case 'second':
                    this.$api.getXmgklyzljcByhtbh({htbh:BMinfo}).then(res=>{
                      if(res.code == 1){
                        if(res.data&&res.data){
                          this.lyzlInfo = res.data
                          this.kexzIsSelet.ly = false
                        }else{
                          this.lyzlInfo = []
                          this.kexzIsSelet.ly = true
                        }
                        res.data.forEach(item=>{
                          this.saveLH.ly.push(item.px)
                        })
                      }else{
                        this.lyzlInfo = []
                        this.kexzIsSelet.ly = true
                      }
                    })
                    //考核细则之--履约质量检测考核表

                    break;
                  case 'third':
                    //同履约检查
                    this.$api.getXmgkyhxcjcxxByhtbh({htbh:BMinfo}).then(res=>{
                      if(res.code == 1){
                        if(res.data&&res.data){
                          this.yhInfo = res.data
                          this.kexzIsSelet.yh = false
                          res.data.forEach(item=>{
                            this.saveLH.yh.push(item.px)
                          })
                        }else{
                          this.yhInfo = []
                          this.kexzIsSelet.yh = true
                        }

                      }else{
                        this.yhInfo = []
                        this.kexzIsSelet.yh = true
                      }
                    })
                    break;
                  case'fourth':
                    this.$api.getXmgkjczbqkbByhtbh({htbh:BMinfo}).then(res=>{
                      if(res.code == 1){
                        if(res.data&&res.data){
                          this.jczbInfo = res.data
                          this.kexzIsSelet.jc = false
                          res.data.forEach(item=>{
                            this.saveLH.jc.push(item.px)
                          })
                        }else{
                          this.jczbInfo = []
                          this.kexzIsSelet.jc = true
                        }

                      }else{
                        this.jczbInfo = []
                        this.kexzIsSelet.jc = true
                      }
                    })
                    break;
                }
                break;
              case'third':
                //子目信息
                this.$api.getXmgkzzxxByhtbh({htbh:BMinfo}).then(res=>{
                  if(res.code == 1){
                    console.log(res,'==子目详情')
                    this.zmInfo = res.data?res.data:[]
                  }
                })


                break;

            }
          }
          else if(type == 'detail'){
            self.isShowDetail = true
            self.isEdit = false
            switch (self.activeName){
              case 'first':
                //人员信息
                let xmlx = {hm:'日常养护工程',sm:'专项养护工程',mee:'机电养护工程',}
                self.$api.getOnlyXmgkjcxx({xmbh:BMinfo}).then(res=>{

                  if(res.code == 1){
                    self.basicData = res.data[0]
                    self.ruleForm = {
                      xmlxr:self.basicData.xmlxr,
                      lxdh: self.basicData.lxdh,
                      xmjs:self.basicData.xmjs,
                      xmlx: xmlx[self.basicData.xmlx],
                    }

                  }
                })
                this.$api.getryxxb({xmbh:BMinfo}).then(res=>{

                  if(res.code == 1){
                    this.editRyData = res.data
                  }
                })
                break;
              case 'second':
                switch (this.activeName2){
                  case 'first':
                    //查询绿化养护质量保存的信息
                    this.$api.getXmgklhzljcByhtbh({htbh:BMinfo}).then(res=>{
                      if(res.code == 1){
                        if(res.data&&res.data){
                          this.lvInfo = res.data
                          this.kexzIsSelet.lh = false
                        }else{
                          this.lvInfo = []
                          this.kexzIsSelet.lh = true
                        }
                        res.data.forEach(item=>{
                          this.saveLH.lh.push(item.px)
                        })
                      }else{
                        this.lvInfo = []
                        this.kexzIsSelet.lh = true
                      }
                    })

                    break;
                  case 'second':
                    this.$api.getXmgklyzljcByhtbh({htbh:BMinfo}).then(res=>{
                      if(res.code == 1){
                        if(res.data&&res.data){
                          this.lyzlInfo = res.data
                          this.kexzIsSelet.ly = false
                        }else{
                          this.lyzlInfo = []
                          this.kexzIsSelet.ly = true
                        }
                        res.data.forEach(item=>{
                          this.saveLH.ly.push(item.px)
                        })
                      }else{
                        this.lyzlInfo = []
                        this.kexzIsSelet.ly = true
                      }
                    })
                    //考核细则之--履约质量检测考核表

                    break;
                  case 'third':

                    this.$api.getXmgkyhxcjcxxByhtbh({htbh:BMinfo}).then(res=>{
                      if(res.code == 1){
                        if(res.data&&res.data){
                          this.yhInfo = res.data
                          this.kexzIsSelet.yh = false
                          res.data.forEach(item=>{
                            this.saveLH.yh.push(item.px)
                          })
                        }else{
                          this.yhInfo = []
                          this.kexzIsSelet.yh = true
                        }

                      }else{
                        this.yhInfo = []
                        this.kexzIsSelet.yh = true
                      }
                    })
                    break;
                  case'fourth':
                    this.$api.getXmgkjczbqkbByhtbh({htbh:BMinfo}).then(res=>{
                      if(res.code == 1){
                        if(res.data&&res.data){
                          this.jczbInfo = res.data
                          this.kexzIsSelet.jc = false
                          res.data.forEach(item=>{
                            this.saveLH.jc.push(item.px)
                          })
                        }else{
                          this.jczbInfo = []
                          this.kexzIsSelet.jc = true
                        }

                      }else{
                        this.jczbInfo = []
                        this.kexzIsSelet.jc = true
                      }
                    })
                    break;
                }
                break;
              case'third':
                //子目信息
                this.$api.getXmgkzzxxByhtbh({htbh:BMinfo}).then(res=>{
                  console.log(res,'==子目详情')
                  if(res.code == 1){
                    this.zmInfo = res.data?res.data:[]
                  }
                })


                break;

            }
          }
          else{
            this.$confirm('是否提交?',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {

              this.$api.createWorkFlow({
                pc_initiator:yhmc,
                pc_initiatorid: yhid,
                pc_name: '27',
                pc_project_id:BMinfo,
                pc_remarks: '',
                pc_state: '',
              },{
                group:bmmc,
                org:orgmc}).then(res=>{
                  if(res.code == 1){
                    this.$api.updateXmgkjcxxztxx({xmbh:BMinfo,zt:'3803'}).then(res=>{
                      if(res.code == 1){
                        this.searchXM()
                        this.$message({
                          type: 'success',
                          message: '提交成功!'
                        });
                      }else{
                        this.$message({
                          type: 'info',
                          message: res.msg
                        });
                      }
                    })
                  }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消提交'
              });
            });

          }

        }
      },
      //tab切换触发
      handleClick(type){
        if(type == 'edit'){
          this.editlv = true
          this.queryTabData(this.scopeInfo,this.scopetype)
        }
      },
      searchXMMC(val){ // ok
          this.$api.getXmmcListt({xmmc:val}).then(res=>{
            if(res.code == 1){
              this.dialogData = res.data&&res.data.length?res.data:[]
            }else{
              this.dialogData = []
            }
          })
      },
      searchgys(val){ // ok
        console.log(val,'==searchgys')
        this.$api.getgysxx2({pageNum:1,pageSize:20,gysmc:val}).then(res=>{

          if(res.code == 1){
            this.dialogData = res.data
          }else{
            this.dialogData = []
          }

        })
      },
      searchXMBH(val){ // ok
        this.$api.getXmbhmhList({xmbh:val}).then(res=>{
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
          this.$api.getmcbhList().then(res=>{
            if(res.code == 1){
              this.dialogData = res.data&&res.data.length?res.data:[]
            }else{
              this.dialogData = []
            }
          })
      },
      showgysDialog(bol){
         this.dialogVisible = true
         this.datatypes = 'gys'
         this.dialogTableTit ={ gysmc:'供应商名称',gysbm:'供应商编号',}
         this.dialogData = this.gysInfos
        this.iscontrollGYS = bol
      },
      showhtDialog(bol){
        this.dialogVisible = true
        this.datatypes = 'ht'
        this.dialogData = this.htmcInfos
        this.dialogTableTit ={ HTMC:'项目名称',HTBH:'项目编号',}
      },
      closeDialog(val){ //ok
        this.dialogVisible = false
        if(val){
          this.searchForm.xmmc = val.XMMC
          this.searchForm.xmbh = val.XMBH
        }
      },
      closeMask(val){
        this.dialogVisible = false
        if(val){
          this.lmshForm.htmc = val.HTMC
          this.lmshForm.htbh = val.HTBH
          this.lmshForm.htkgrq = val.HTKGSJ
          this.lmshForm.htwgrq = val.HTWGRQ
          this.lmshForm.xmjs = val.XMJS
          this.lmshForm.htgq = val.HTGQ
          this.lmshForm.xmlx = val.HTLBMC
          this.lmshForm.zgspdw = val.ZGSPDW
          this.lmshForm.htzt = val.HTZT
          this.lmshForm.htje = val.HTJE?val.HTJE:0
          this.lmshForm.zdje =  val.ZDJE?parseFloat(val.ZDJE):0
          this.$api.getZzmm({htdjpk:val.HTBH}).then(res=>{
            if(res.code == 1){
              this.zmData = res.data
              this.zmData.forEach(item=>{
                item.xmmc = item.htmc
                item.xmbh = val.HTBH
                item.dw = item.jldwpk
                item.hj = item.je
              })
            }
          })
        }
      },
      closegysMask(val){
        this.dialogVisible = false
        if(val){
          switch(this.iscontrollGYS){
            case 'cbdw':
              this.lmshForm.cbdw = val.gysmc
              this.lmshForm.cbdwbh = val.gysbm
              this.lmshForm.cbdwid = val.gyspk
              break;
            case 'jldw':
              this.lmshForm.jldw = val.gysmc
              this.lmshForm.jldwbh = val.gysbm
              this.lmshForm.jldwid = val.gyspk
              break;
            case 'sjdw':
              this.lmshForm.sjdw = val.gysmc
              this.lmshForm.sjdwbh = val.gysbm
              this.lmshForm.sjdwid = val.gyspk
              break;
          }

        }
      },
      querySearchBH(queryString, cb) {
        let  restaurants = this.restaurantsBH;
        let results = queryString ? restaurants.filter(this.createFilter(queryString,'XMBH')) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
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
      handleSelectMC(item){
        //getXmmcList
        this.searchForm.xmmc = item.XMMC
        this.$api.getXmmctoxmbhList({xmmc:item.XMMC}).then(res=>{
          if(res.code == 1){
            this.searchForm.xmbh = res.data?res.data[0].XMBH:''
          }else{
            this.searchForm.xmbh = ''
          }
        })
      },
      handleSelectBH(item){
        this.searchForm.xmbh = item.XMBH
        this.$api.getXmbhtomcList({xmbh:item.XMBH}).then(res=>{
          if(res.code == 1){
            this.searchForm.xmmc = res.data?res.data[0].XMMC:''
          }else{
            this.searchForm.xmmc = ''
          }
        })
      },
      lvhandTableSelect(selection, row){
         this.lvSelection = selection
      },
      lyhandTableSelect(selection, row){


        for (var i in selection) {
          let select = selection[i]
          for (var j in select) {
            if((typeof (select[j] ))!= 'string'){
              select[j] = ''
            }
          }
        }
        this.lySelection = selection
      },
      jchandTableSelect(selection, row){
        this.jcSelection = selection
      },
      yhhandTableSelect(selection, row){
         this.yhSelection = selection
      },
     /* saveXMInfo(formName){
        let {xmlxr,lxdh,xmjs,xmlx} = this.ruleForm

        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$api.updateXmgkjcxx({
               xmlxr,lxdh,xmjs,xmlx,zt:'3802',xmbh:this.selectXMBH,
             }).then(res=>{
               this.searchXM()
               if(res.code == 1){
                 this.isShowDetail = false
                 this.$message({
                   message: '更新成功',
                   type: 'success'
                 });
               }
             })
          }
        });
      },*/
      //选择当前状态
      handleHtState(val,index){
           this.searchForm.selectState = val
          this.searchForm.stateIndex = index
          this.searchXM()
      },
      //选择合同类型
      handleHtType(val,index){
        this.searchForm.selectType = val
        this.searchForm.typeIndex = index
        this.searchXM()
      },
      //查询详细情况
      searchXM(){

        let deptList = this.userInfo.deptList[0]
        let {supplierpk,bmid,userType} = this.userInfo
        let randoms = parseInt(100*Math.random())
        if(userType&&userType =='供应商'){
          if( this.restaurants.length){
            if(this.restaurants[0].XMBH){
              this.searchForm.xmbh = this.restaurants[0].XMBH
            }
          }

        }
        if(deptList){

          let {xmmc,xmbh,selectState,selectType,pageNum,pageSize} = this.searchForm
          this.$api.getXmgkjcxx({
            gldwid:deptList.org.orgId,
            zt:selectState, sglx:selectType,
            xmbh:xmbh?xmbh.trim():undefined,
//            xmmc:xmmc?xmmc.trim():undefined,
//            cbdwid:supplierpk&&supplierpk!=='~'?supplierpk:undefined,
            cbdwid:userType&&userType =='供应商'?supplierpk:undefined,
            pageNum,
            pageSize,
            randoms: randoms
          }).then(res=>{
            if(res.code == 1){
              this.initDatas = res.data.list
              this.initDataTotal = res.data.total
            }
          })
        }

      },
      initqueryXMMC(){
          this.$api.getmcbhList().then(res => {
            if (res.code == 1) {
              this.restaurants = res.data && res.data.length ? res.data : []
            } else {
              this.restaurants = []
            }
            this.searchXM()
          })
      },
      initqueryXMBH(){
        this.$api.getmcbhList().then(res => {
            if (res.code == 1) {
              this.restaurantsBH = res.data && res.data.length ? res.data : []
            } else {
              this.restaurantsBH = []
            }

          })

      },
      //重置信息
      resizeDate(){
        this.searchForm.xmmc = undefined
        this.searchForm.xmbh = undefined
        this.searchForm.searchTime = undefined
      },
      //table表格发生改变时触发
      handleSelectionChange(selection){
        this.currentZJ = selection
      },
      editSelectionChange(selection){
        this.editSelectRy = selection
      },
      //分页
      handleCurrentChange(val){
          this.searchForm.pageNum = val
           this.searchXM()
      },
    },
    created(){
      this.initUser()
    },
    mounted () {

      this.initqueryXMMC()
// this.initqueryXMBH()
      this.initDate()
      this.initqueryXMLX()

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .notMargin{
      .el-form-item__content{
        margin-left: 0 !important;
      }
  }
  .gkDate{
    width: 200px !important;
  }
  .tableZDY{
     .el-table__body-wrapper{
       .el-table__row  td{
         border-right: 1px solid #edeef0  !important;
       }
     }

   }
  .conter_table{
    .searchLeft{
      display: flex;
      vertical-align: middle;
      /*margin-top: 10px;*/
      height: 40px;
      line-height: 40px;
      font-size: 13px;
      background: #f7f9fb;
      #selectColor,#selectColor2{
        color:red;
      }
      .currentState{
        display: inline-block;
        cursor: pointer;
        padding-right: 10px;
        color: #555;
        height: 19px;
        line-height: 19px;
        margin-right: 10px;
        border-right: 2px solid #999;
      }
      .currentState:last-child{
        border-right: 0 !important;
      }
      .htTypeList{
        padding-left: 100px;
      }
    }
  }
.xmgkTabs{
  .el-tabs__content{
    height: calc(100% - 40px);
  }
}

  #kgsqd{
    /*padding: 10px 15px 0 15px;*/
    position: relative;
    font-size: 12px;
    height: 100%;
    overflow-y: auto;
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
      padding: 20px 40px;
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
            height: 100%;
            line-height: 31px;
            text-indent: 1em;
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
      .zibnr{
        li{
          width: 25%;
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
          }
        }
      }
      .addzbsj{
        text-align: center;
        color: #1CA4FA;
        padding: 10px 0;
      }
    }
  }
</style>
