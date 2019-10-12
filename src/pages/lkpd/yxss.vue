/**
* ----路面损坏
*/
<template>
  <div id="lkpdlmsh" class="styleSheets" style="height: 100%" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="bill-header">

      <div class="bill-title">
        <span>沿线设施</span>
        <ul>
         <li  class="Hight_btn"><a href="http://61.141.223.10:8002/lkpd/dcmb/getTcidcList" class="el-icon-download"> 模版下载</a></li>
          <li @click="chaxBtn"><i class="el-icon-search"> 查询</i></li>
          <li @click="xzBtn"><i class="el-icon-download"> 导入</i></li>
          <!-- <li><el-upload
  class="upload-demo"
  action="http://61.141.223.10:8002/lkpd/cx/importTci"
  :show-file-list='false'
  accept=".xls,.xlsx,.XLS,.XLSX"
  :on-success='daoru'
  :on-progress='progress'
  :file-list="drfileList">
  <span>导入</span>
</el-upload></li> -->
        </ul>

      </div>
      <div class="drxz bill-search" v-if="showdrxz">
         <el-form :inline="true" :model="xzForm" ref="xzForm" class="xzForm">
            <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <el-select clearable size="mini" style="width: 150px;" v-model="bbxx"    placeholder="版本名称" @change="changeBb">
                <el-option v-for="item in qmldbb" :key="item.id" :label="item.bbmc" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <el-select clearable size="mini" style="width: 150px;" v-model="lxDatas" value-key="ldname"  placeholder="路线名称" @change="changelxdr">
                <el-option v-for="item in qmbbOptions" :key="item.id" :label="item.ldname" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item style="margin-bottom: 0px" label="桩号范围" prop="" class="">
            <input type="text" placeholder="请输入起点桩号" v-model="xzForm.qdzh" style="width:100px;height:28px;line-height:28px;border-radius: 4px;border: 1px solid #DCDFE6;">-<input type="text" v-model="xzForm.zdzh" placeholder="请输入止点桩号" style="width:100px;height:28px;line-height:28px;border-radius: 4px;border: 1px solid #DCDFE6;">
          </el-form-item>  -->
            <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <el-select clearable size="mini"  class="" style="width: 80px;" placeholder="请选择方向" v-model="xzForm.fx">
                <!--<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>-->
                <el-option label="上行" value="上行"></el-option>
                <el-option label="下行" value="下行"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <el-select size="mini"  class="" style="width: 150px;" placeholder="请选择车道" v-model="xzForm.jccd">
                <el-option label="慢车道" value="慢车道"></el-option>
                <el-option label="快车道" value="快车道"></el-option>
                <el-option label="超车道" value="超车道"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item style="margin-bottom: 0px; "  label="" prop="" class="">
             <el-date-picker
                v-model="xzForm.dcsj"
                size="mini"
                 
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择调查日期">
              </el-date-picker>
          </el-form-item>
          <!-- <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <el-input size="mini" type="text" v-model="xzForm.dcry"  placeholder="请输入调查人员"></el-input>
          </el-form-item> -->
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <el-input clearable size="mini" type="text" v-model="xzForm.lmkd"  placeholder="调查路面宽度"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-upload
             class="upload-demo special"
                 ref="uploads"
                 action=""
                :http-request="url"
                 :on-change="files"
                 :on-remove="removes"
                 :auto-upload="false">
               <div style="position:relative;width:150px;height:28px;border: 1px solid #D5D6D7;border-radius:4px;line-height: 28px;overflow: hidden;color:#D0D0D0;text-align: left;text-indent: 10px;font-size: 13px;" >请选择文件</div>
                </el-upload> 
            </el-form-item>
             <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <el-select size="mini"  clearable class="" style="width: 150px;" placeholder="数据类型" v-model="xzForm.sjlx">
                <el-option label="千米版" value="千米版"></el-option>
                <el-option label="百米版" value="百米版"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px;text-align: center;" label="" prop="" class="">
              <el-button size="mini"  @click="download()"  style="background-color: #00a2fd;border-color:transparent;color: #fff;">导入</el-button>
            </el-form-item>
          </el-form>
        </div>
      <div class="bill-search" style="" v-if="showSearch">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-select clearable size="mini" style="width: 150px;" v-model="lxData" value-key="id" placeholder="路线名称" @change="changelx">
              <el-option v-for="item in qmbbOptions" :key="item.id" :label="item.ldname" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-select clearable size="mini"  class="" placeholder="请选择方向" v-model="searchForm.fx">
              <!--<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>-->
              <el-option label="上行" value="上行"></el-option>
              <el-option label="下行" value="下行"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-date-picker
              v-model="searchForm.dcsj"
              type="daterange"
              size="mini"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="调查开始日期"
              end-placeholder="调查结束日期">
            </el-date-picker>
            <!--<el-select size="mini"  class="" placeholder="请选择日期" v-model="searchForm.jcrq">
              <el-option v-for="(item,index) in qmbbOptions" :key="index" :label="item.bbmc" :value="item.bbid"></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
           <el-button size="mini"  style="background-color: #DF4D4A;border-color:transparent;color: #fff" @click="search(1,10)">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="conter_table">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
               style="width: 100%;height: calc(100% - 46px);overflow:auto;"
                row-class-name="row_class"
                 @row-dblclick="dbclick"
                  @row-click="sigClic"
                border
                :row-style="{fontFamily: 'Microsoft YaHei', fontSize: '12px'}"
              
                @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="40">
        </el-table-column>
        
        <el-table-column width="100" align="left" sortable prop="lxbm" label="路线编号"  show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="lxmc" sortable label="路线名称"  show-overflow-tooltip></el-table-column>
        <!--<el-table-column align="left" prop="qmldb.lxname" label="路线名称" width="80" show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="qmldb.fx" label="方向"></el-table-column>-->
      <el-table-column align="left" width="150" sortable prop="qdzh" label="起点桩号" show-overflow-tooltip>
          <template scope="scope">
            <div v-if="scope.row.qdzh >= 0">
            <span v-if="scope.row.qdzh.toString().indexOf('.') >= 0">K{{scope.row.qdzh.toString().replace('.', '+')}}</span>
            <span v-if="scope.row.qdzh.toString().indexOf('.') < 0">K{{scope.row.qdzh}}+000</span>
            </div>
            <div v-if="scope.row.qdzh < 0">
            <span v-if="scope.row.qdzh.toString().indexOf('.') >= 0">-K{{scope.row.qdzh.toString().split('.')[0].replace('-', '')}}+{{scope.row.qdzh.toString().split('.')[1]}}</span>
            <span v-if="scope.row.qdzh.toString().indexOf('.') < 0">-K{{scope.row.qdzh}}+000</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" width="150" sortable prop="zdzh" label="终点桩号" show-overflow-tooltip>
          <template scope="scope">
            <div v-if="scope.row.zdzh >= 0">
            <span v-if="scope.row.zdzh.toString().indexOf('.') >= 0">K{{scope.row.zdzh.toString().replace('.', '+')}}</span>
            <span v-if="scope.row.zdzh.toString().indexOf('.') < 0">K{{scope.row.zdzh}}+000</span>
            </div>
            <div v-if="scope.row.zdzh < 0">
            <span v-if="scope.row.zdzh.toString().indexOf('.') >= 0">-K{{scope.row.zdzh.toString().split('.')[0].replace('-', '')}}+{{scope.row.zdzh.toString().split('.')[1]}}</span>
            <span v-if="scope.row.zdzh.toString().indexOf('.') < 0">-K{{scope.row.zdzh}}+000</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="80" align="left" sortable prop="fx" label="行车方向"></el-table-column>
        <el-table-column width="100" align="left" sortable prop="jccd" label="车道"  show-overflow-tooltip></el-table-column>
        <el-table-column width="100" align="left" sortable prop="dcsj" label="检测日期"></el-table-column>
        <!-- <el-table-column align="left" prop="jcsb" label="检测设备"></el-table-column> -->
        <el-table-column align="left" prop="dcry" sortable label="记录人员"></el-table-column>
        <el-table-column width="100" align="left" sortable prop="lmkd" label="检测宽度"></el-table-column>
        <!-- <el-table-column align="center" label="防护设施缺损(处)" show-overflow-tooltip>
          <el-table-column align="center" prop="fhssqs1" label="轻" width="45" show-overflow-tooltip>
            <template scope="scope">
              <p v-if="scope.row.lkdcfb.length>0">{{ scope.row.lkdcfb[0].ljsj }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="fhssqs2" label="重" width="45" show-overflow-tooltip>
            <template scope="scope">
              <p v-if="scope.row.lkdcfb.length>0">{{ scope.row.lkdcfb[1].ljsj }}</p>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" prop="glssh" label="隔离栅损坏(处)" show-overflow-tooltip>
          <template scope="scope">
            <p v-if="scope.row.lkdcfb.length>0">{{ scope.row.lkdcfb[2].ljsj }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="bzsh" label="标志损坏(处)" show-overflow-tooltip>
          <template scope="scope">
            <p v-if="scope.row.lkdcfb.length>0">{{ scope.row.lkdcfb[3].ljsj }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="bxsh" label="标线损坏(m)" show-overflow-tooltip>
          <template scope="scope">
            <p v-if="scope.row.lkdcfb.length>0">{{ scope.row.lkdcfb[4].ljsj }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="lhglbs" label="绿化管理不善(m)" show-overflow-tooltip>
          <template scope="scope">
            <p v-if="scope.row.lkdcfb.length>0">{{ scope.row.lkdcfb[5].ljsj }}</p>
          </template>
        </el-table-column> -->
        <el-table-column align="center" class-name="column-caoz" label="操作" width="80">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
          </template>
        </el-table-column>
      </el-table>
      <footer class="footer">
      <div style="padding: 6px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </footer>
    </div>
    
    <!--<el-dialog class="data-dialog el-updata-div" title="添加" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" @close="resetForm">
      <div class="dialog_warp">
        <ul>
          <li>
            <span>路线编号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.lxcode"></el-input>
            </p>
          </li>
          <li>
            <span>起点桩号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.qdzh"></el-input>
            </p>
          </li>
          <li>
            <span>终点桩号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.zdzh"></el-input>
            </p>
          </li>
          <li>
            <span>检测日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.jcrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>行车方向</span>
            <p class="radio_line">
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.xcfx" label="上行">上行</el-radio>
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.xcfx" label="下行">下行</el-radio>
            </p>
          </li>
          <li>
            <span>泛油(㎡)</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.fy"></el-input>
            </p>
          </li>
          <li>
            <span>修补(㎡)</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.xb"></el-input>
            </p>
          </li>
          <li>
            <span></span>
            <p>
            </p>
          </li>
          <li class="three_line">
            <span>龟裂(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.jl1"></el-input></span>
              <span><i>中</i><el-input size="mini" type="text" v-model="lmshForm.jl2"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.jl3"></el-input></span>
            </p>
          </li>
          <li class="tow_line">
            <span>块状裂缝(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.kzlf1"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.kzlf2"></el-input></span>
            </p>
          </li>
          <li class="tow_line">
            <span>纵裂(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.zl1"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.zl2"></el-input></span>
            </p>
          </li>
          <li  class="tow_line">
            <span>横裂(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.hl1"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.hl2"></el-input></span>
            </p>
          </li>
          <li class="tow_line">
            <span>坑槽(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.kc1"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.kc2"></el-input></span>
            </p>
          </li>
          <li class="tow_line">
            <span>松散(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.ss1"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.ss2"></el-input></span>
            </p>
          </li>
          <li class="tow_line">
            <span>沉陷(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.cx1"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.cx2"></el-input></span>
            </p>
          </li>
          <li class="tow_line">
            <span>车辙(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.cz1"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.cz2"></el-input></span>
            </p>
          </li>
          <li class="tow_line">
            <span>波浪拥包(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.blyb1"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.blyb2"></el-input></span>
            </p>
          </li>
          <div style="clear: both"></div>
        </ul>
        <div class="dialog_footer" v-if="!showxq">
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="small" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>
    </el-dialog>-->
    <el-dialog fullscreen class="data-dialog el-updata-div"  :show-close="false" :close-on-click-modal="false" :visible.sync="showDetail" width="720px"  @close="resetForm">
      <span slot="title">
          <span class="titleclasschild"  @click="showDetail=false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>沿线设施调查详情</span>
      </span>
      <!--<div class="dialog_warp">
        <ul>
          <li>
            <span>路线编号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.lxcode"></el-input>
            </p>
          </li>
          <li>
            <span>起点桩号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.qdzh"></el-input>
            </p>
          </li>
          <li>
            <span>终点桩号</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.zdzh"></el-input>
            </p>
          </li>
          <li>
            <span>检测日期</span>
            <p>
              <el-date-picker
                style="width:100%"
                v-model="lmshForm.jcrq"
                size="mini"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </p>
          </li>
          <li>
            <span>行车方向</span>
            <p class="radio_line">
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.xcfx" label="上行">上行</el-radio>
              <el-radio style="height: 100%;line-height: 31px" v-model="lmshForm.xcfx" label="下行">下行</el-radio>
            </p>
          </li>
          <li>
            <span>泛油(㎡)</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.fy"></el-input>
            </p>
          </li>
          <li>
            <span>修补(㎡)</span>
            <p>
              <el-input size="mini" type="text" v-model="lmshForm.xb"></el-input>
            </p>
          </li>
          <li>
            <span></span>
            <p>
            </p>
          </li>
          <li class="three_line">
            <span>龟裂(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.jl1"></el-input></span>
              <span><i>中</i><el-input size="mini" type="text" v-model="lmshForm.jl2"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.jl3"></el-input></span>
            </p>
          </li>
          <li class="tow_line">
            <span>块状裂缝(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.kzlf1"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.kzlf2"></el-input></span>
            </p>
          </li>
          <li class="tow_line">
            <span>纵裂(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.zl1"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.zl2"></el-input></span>
            </p>
          </li>
          <li  class="tow_line">
            <span>横裂(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.hl1"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.hl2"></el-input></span>
            </p>
          </li>
          <li class="tow_line">
            <span>坑槽(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.kc1"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.kc2"></el-input></span>
            </p>
          </li>
          <li class="tow_line">
            <span>松散(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.ss1"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.ss2"></el-input></span>
            </p>
          </li>
          <li class="tow_line">
            <span>沉陷(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.cx1"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.cx2"></el-input></span>
            </p>
          </li>
          <li class="tow_line">
            <span>车辙(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.cz1"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.cz2"></el-input></span>
            </p>
          </li>
          <li class="tow_line">
            <span>波浪拥包(㎡)</span>
            <p>
              <span><i>轻</i><el-input size="mini" type="text" v-model="lmshForm.blyb1"></el-input></span>
              <span><i>重</i><el-input size="mini" type="text" v-model="lmshForm.blyb2"></el-input></span>
            </p>
          </li>
          <div style="clear: both"></div>
        </ul>
        <div class="dialog_footer" v-if="!showxq">
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="small" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>-->
     <!-- <div style="width: 100%;height: 600px;">
        <iframe :src="src" frameborder="0" style="width: calc(100%);height: 100%;"></iframe>
      </div> -->
      <yxssmb :data="lmshForm" @childByValue="childByValue"  @editOk="editOk" v-if="showDetail"></yxssmb>

    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import yxssmb from './mb/yxssmb.vue'
export default {
  components: {yxssmb},
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
      upUrl:'',
      Floading:'',
      fullscreenLoading:false,
      excelList:[],
      src: '',
      lmshForm: {
        fx: '上行'
      },
      index: '',
      isadd: false,
      submitLoading: false,
      showxq: false,
      showSearch: true,
      loading: false,
      tableHeight: 300,
      tableData: [],
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      lxData: {
        id: '',
        ldname: ''
      },
      roadOptions: [],
      searchForm: {
         fx: '上行'
      },
      xzForm:{
        fx: '上行'
      },
      lxDatas: '',
      currentPage: 1,
      pageSize: 10,
      total: 10,
      personelForm: {},
      showDetail: false,
      showdrxz: false,
      multipleSelection: [],
      qmldbb:'',
      bbxx:'',
      drfileList:[],
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
  async created(){
   this.initUser()
 
  },
  methods: {
    initUser(){
     let userInfo = config.jd_infor[0]
      if(userInfo){
        if(userInfo){
          this.userInfo.daYhbm = userInfo.userCode
          this.userInfo.daYhid = userInfo.userId
          this.userInfo.daYhmc = userInfo.userName
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
    progress (e) {
      this.loading=true 
    },
    daoru (e) {
      this.loading=false
    if(e.code==1){
      this.$message({
        type: 'success',
        message: '导入成功!'
      })}else{
        this.$message({
        type: 'error',
        message: '导入失败!'
      })
      }
    },
    childByValue(val){
      this.showDetail=false
    },
    chaxBtn(){
      this.showSearch=true;
      this.showdrxz=false
    },
    xzBtn(){
      this.showSearch=false;
      this.showdrxz=true
    },
    showAdd () {
      if(!this.drForm.lxcode){
        this.$message({
         type: 'error',
          message: '请选择路线'
        })
        return
      }
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      this.src = config.bbsrc + encodeURI('reportlet=/zsxz/路况调查模板.cpt&op=write&dcry=管理员&bbid=10220&condition=and qm.lmlx=1&lxid=04&lxcode=') + this.drForm.lxcode + '&szhh=' + this.drForm.szhh + '&ezhh=' + this.drForm.ezhh + '&fx=' + this.drForm.xcfx
      // this.showdrxz = false
    },
    editOk (){
  this.showDetail=false
  this.$message({
            message: '编辑成功',
            type: 'success'
          })
  this.search(this.currentPage, this.pageSize)
    },
    updateFormDia (row, index) {
     this.$api.getBciXiang('?dcid='+row.dcid).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else if (resp.data.code === 1) {
        
      this.lmshForm=JSON.parse(JSON.stringify(row))
      this.lmshForm.lkdcfb=resp.data.data.list
      this.lmshForm.isxq=false
      this.showDetail = true
        }
      }).catch(e => {
      })
      // this.isadd = false
      // this.showxq = false
      // let dcid = ''
      // if (row.dcid === null || row.dcid === '') {
      //   dcid = this.getuuid()
      // } else {
      //   dcid = row.dcid
      // }
      // this.src = config.bbsrc + 'reportlet=/zsxz/lkdc.cpt&op=write&dcry=管理员&dcbbid=10220&lxid=04&ldid=' + row.ldid + '&dcid=' + dcid
      // this.index = index
    },
    showBhFormDia (row) {
      this.$api.getBciXiang('?dcid='+row.dcid).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else if (resp.data.code === 1) {
        
      this.lmshForm=JSON.parse(JSON.stringify(row))
      this.lmshForm.lkdcfb=resp.data.data.list
      this.lmshForm.isxq=true
      this.showDetail = true
        }
      }).catch(e => {
      })
    
    },
    sigClic (row){
this.$refs.multipleTable.toggleRowSelection(row)
    },
    dbclick (row){
      this.$api.getBciXiang('?dcid='+row.dcid).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else if (resp.data.code === 1) {
        
      this.lmshForm=JSON.parse(JSON.stringify(row))
      this.lmshForm.lkdcfb=resp.data.data.list
      this.lmshForm.isxq=true
      this.showDetail = true
        }
      }).catch(e => {
      })
      
    },
    addSubmit () {
      this.tableData.push(this.lmshForm)
      this.resetForm()
    },
    updateSubmit () {
      this.tableData.splice(this.index, 1, this.lmshForm)
      this.resetForm()
    },
    deleteData () {
      if (this.multipleSelection.length > 0) {
        this.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.tableData.splice(0, this.multipleSelection.length)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({type: 'error', message: '请选选择要删除的数据'})
      }
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
    search (currentPage, pageSize) {
      this.loading = true
      if (this.searchForm.dcsj) {
        this.searchForm.ksrq = this.searchForm.dcsj[0]
        this.searchForm.jsrq = this.searchForm.dcsj[1]
      } else {
        this.searchForm.ksrq = ''
        this.searchForm.jsrq = ''
      }
      this.$api.getTciAllList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.tableData = resp.data.data.list
          this.total = resp.data.data.total
        }
      }).catch(e => {
        this.loading = false
      })
    },
    resetForm () {
      this.showDetail = false
      this.lmshForm = {
        fx: '上行'
      }
      this.search(1,10)
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
    changelxdr (value) {
      this.drForm.ldcode = value.ldcode
      this.drForm.lxcode = value.lxcode
      this.drForm.bbid = '10220'
      this.drForm.szhh = value.szhh
      this.drForm.ezhh = value.ezhh
    },
    changelx (value) {
      this.searchForm.ldcode = value.ldcode
      this.searchForm.lxbm = value.lxcode
      this.searchForm.fx = '上行'
    },
    getQmldbb () {
      if (this.qmbbOptions.length > 0) { return }
      this.$api.commongetLd('?bmCode=' + this.userInfo.daZzbh).then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else if (resp.data.code === 1) {
          this.qmbbOptions = resp.data.data
          this.lxData = {
            id: this.qmbbOptions[0].id
          }
          this.searchForm.ldcode = this.qmbbOptions[0].ldcode
          this.searchForm.lxbm = this.qmbbOptions[0].lxcode
          this.searchForm.fx = '上行'
          this.searchForm.szhh = this.qmbbOptions[0].szhh
          this.searchForm.ezhh = this.qmbbOptions[0].ezhh
          this.search(this.currentPage, this.pageSize)
        }
      }).catch(e => {
      })
     this.$api.getQmldListType('?pageNum=' + 1 + '&pageSize=' + 1000000+ '&dwbm='+ this.userInfo.daZzbh).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.qmldbb= resp.data.data.list
        }
      }).catch(e => {
      })
    },
    changeBb (val){
      this.bbxx=val.bbmc
     this.xzForm.pid=val.bbid
     this.xzForm.bbmc=val.bbmc
    },
    changelxdr (value) {
      this.xzForm.ldcode = value.ldcode
      this.xzForm.lxbm = value.lxcode
      this.xzForm.lxmc = value.ldname
      this.xzForm.qdzh = value.szhh
      this.xzForm.zdzh = value.ezhh
    },
    download (){ 
      if(!this.xzForm.pid){
        this.$message({
            message: '请选择千米路段版本',
            type: 'error'
          })
        return
      }
       if(!this.xzForm.lxbm){
        this.$message({
            message: '请选择路线名称',
            type: 'error'
          })
        return
      }
      if(!this.xzForm.jccd){
        this.$message({
            message: '请选择检测车道',
            type: 'error'
          })
        return
      }
      if(!this.xzForm.dcsj){
        this.$message({
            message: '请选择调查时间',
            type: 'error'
          })
        return
      }
      if(!this.xzForm.dcry){
        this.$message({
            message: '请填写调查人员',
            type: 'error'
          })
        return
      }
      var regx=/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/g
      if(this.xzForm.lmkd==0){
        this.$message({
            message: '路面宽度必须大于0',
            type: 'error'
          })
        return
      }
      if(regx.test(this.xzForm.lmkd) == false ){
        this.$message({
            message: '路面宽度必须大于0',
            type: 'error'
          })
        return
      }
     
      if(this.excelList.length==0){
        this.$message({
            message: '请选择调查数据',
            type: 'error'
          })
        return
      } 
      if(!this.xzForm.sjlx){
        this.$message({
            message: '请选择数据类型',
            type: 'error'
          })
        return
      }
      if(this.xzForm.sjlx=='千米版'){
        this.upUrl='http://61.141.223.10:8002/lkpd/drmb/importTciList'
      }else{
        this.upUrl='http://61.141.223.10:8002/lkpd/drmb/importTciBMList'
      }
      this.$refs.uploads.submit();
      // this.$api.getTciList('?' + $.param(this.xzForm)).then(resp => {
      //   this.loading = true
      //   if (resp.status !== 200) {
      //     this.$message({
      //       message: '出错了',
      //       type: 'error'
      //     })
      //   } else {    
      //  if(resp.data.type=='application/ms-excel'){
      //    var blob = new Blob([resp.data],{type : 'application/vnd.ms-excel'});
      //       let downloadElement = document.createElement('a')
      //       let href = window.URL.createObjectURL(blob); //创建下载的链接
      //       downloadElement.href = href;
      //       downloadElement.download = `沿线设施模板`; //下载后文件名
      //       downloadElement.click(); //点击下载
      //       this.loading = false
      //       this.$message({
      //       message: '下载成功',
      //       type: 'success'
      //     })
      //       window.URL.revokeObjectURL(href); //释放blob对象
      //   }else{
      //     this.$message({
      //       message: '未查询到对应的千米路段数据',
      //       type: 'error'
      //     })
      //      this.loading = false
      //   }

      //   }
      // }).catch(e => {
      //   this.loading = false
      // })
    },
    removes (){
      this.excelList=[]
    },
    files (val){
      this.excelList=[1]
    },
    openFullScreen() {
        this.Floading = this.$loading({
          lock: true,
          text: '数据处理中，请稍后',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
    closeFullScreen() {
       this.Floading.close();
    },
    url(param){
    this.openFullScreen()
    var fileObj = param.file;
    // 接收上传文件的后台地址
    var form = new FormData();
    // 文件对象
    form.append("file", fileObj);
    // 其他参数
    form.append("pid", this.xzForm.pid);
    form.append("lxbm", this.xzForm.lxbm);
    form.append("fx", this.xzForm.fx);
    form.append("lxmc", this.xzForm.lxmc);
    form.append("jccd", this.xzForm.jccd);
    form.append("dcsj", this.xzForm.dcsj);
    form.append("dcry", this.xzForm.dcry);
    form.append("lmkd", this.xzForm.lmkd);
   axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    axios({
    method:"post",
    url:this.upUrl,
    data:form,
    headers:{
        'Content-Type': 'multipart/form-data'
    }
}).then(res=>{
  this.closeFullScreen()
      if(res.data.code==0){
        this.$message({
          type: 'error',
          message: res.data.msg
        })
      }else if(res.data.code==1){
        this.$message({
                type: 'success',
                message: res.data.msg
            })
        this.search(this.currentPage, this.pageSize)
      }
})
    },
  },
  mounted () {
    this.getQmldbb()
    this.xzForm.dcry=this.userInfo.daYhmc
    this.tableHeight = $('#lkpdlmsh')[0].offsetHeight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.background_image{
  >div{
    background: none;
  }
}
  #lkpdlmsh{
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    overflow: auto;
    min-width: 1100px;
    .header{}
    .conter_table{
      height: calc(100% - 97px);
      min-height: 300px;
      padding: 0px;
    }
    .bill-header{
		width: 100%;
		border-radius:5px;
		margin-bottom:5px;
	}
	.bill-title{
		height:46px;
		line-height: 45px;
		width: 100%;
		padding: 0 20px;
		background-color: #F6F6F6;
		> span{
			font-size: 16px;
			font-weight: 600;
		}
	    > ul{
	   	  float:right;
	   	  display:inline-block;
	   	  padding-top: 7px;
	   	  > li{
	   	  	float: left;
	   	  	margin-left: 0 !important;
		    font-size: 13px;
		    font-weight: 400;
		    height: 32px;
		    line-height: 2.2;
		    min-width: 60px;
		    padding: 0 14px;
		    border: 1px solid #D0D0D0;
        cursor: pointer;
         &:nth-of-type(1){
          border-right: 0 solid #D0D0D0;
        }
        a{
          color: white;
        }
	   	  }
	   	 > li:first-child{
	   	 	border-radius: 5px 0 0 5px;
	   	 }
	   	  > li:last-child{
	   	 	border-radius:  0 5px 5px 0;
	   	 	border-left: 0 solid #D0D0D0;
	   	 }
	   }
	}
	.bill-search{
		height:90px;
		width: 100%;
		padding: 0 20px;
	  background-color: #fff;
  }
    .footer{
       height: 45px;
       background: #fff;
       position: relative;
       text-align: center;

    }
    .dialog_warp{
      background: #fff;
      padding: 20px 40px;
      ul{
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
          &:nth-last-of-type(1){
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
        .tow_line{
          height: 64px;
          p{
            >span{
              display: block;
              height: 50%;
            }
          }
        }
        .three_line{
          height: 96px;
          p{
            span{
              display: block;
              height: calc(100%/3);
            }
          }
        }
        .four_line{
          height: 128px;
          p{
            span{
              display: block;
              height: 25%;
            }
          }
        }
      }
    }
  }
</style>
