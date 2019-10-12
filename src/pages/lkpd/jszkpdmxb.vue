/**
* ----路面损坏
*/
<template>
  <div id="jszkpdmxb" class="styleSheets" style="height: 100%" v-loading="loading">
    <div class="bill-header">
      <div class="bill-title">
        <span>技术状况评定明细表</span>
        <ul>
          <li style="border:none;cursor:inherit"></li>
          <!-- <li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li> -->
        </ul>
      </div>
      <div class="bill-search" style="">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-select clearable size="mini" style="width: 150px;" v-model="lxData" value-key="id" placeholder="路线名称" @change="changelx">
              <el-option v-for="item in qmbbOptions" :key="item.id" :label="item.ldname" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-select clearable size="mini"  class="" placeholder="请选择方向" v-model="searchForm.xcfx">
              <el-option label="上行" value="上行"></el-option>
              <el-option label="下行" value="下行"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-select size="mini"  class="" placeholder="请选择数据来源"  v-model="searchForm.sjly" clearable>
              <el-option label="导入数据" value="导入数据"></el-option>
              <el-option label="生成数据" value="生成数据"></el-option>
            </el-select>
          </el-form-item>
         <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
        <el-select clearable size="mini" v-model="searchForm.pdfamc" value-key="famc" placeholder="路况评定方案" @change="selectFa">
         <el-option v-for="(item,index) in pdfaMc" :key="index"  :label="item.famc" :value="item"></el-option>
         </el-select>
         </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-select clearable size="mini"  class="" placeholder="请选择指标类型" v-model="searchForm.zblx" style="width:120px!important">
              <el-option label="MQI" value="MQI"></el-option>
              <el-option label="SCI" value="SCI"></el-option>
              <el-option label="PCI" value="PCI"></el-option>
              <el-option label="PQI" value="PQI"></el-option>
              <el-option label="RQI" value="RQI"></el-option>
              <el-option label="RDI" value="RDI"></el-option>
              <el-option label="PBI" value="PBI"></el-option>
              <el-option label="PWI" value="PWI"></el-option>
              <el-option label="SRI" value="SRI"></el-option>
              <el-option label="PSSI" value="PSSI"></el-option>
              <el-option label="BCI" value="BCI"></el-option>
              <el-option label="TCI" value="TCI"></el-option>
            </el-select> : 
            <input type="text" placeholder="请输入指标下限" v-model="searchForm.zbfzmin" style="width:100px;height:28px;line-height:28px;border-radius: 4px;border: 1px solid #DCDFE6;">-<input type="text" v-model="searchForm.zbfzmax" placeholder="请输入指标上限" style="width:100px;height:28px;line-height:28px;border-radius: 4px;border: 1px solid #DCDFE6;">
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <input type="text" placeholder="请输入起点桩号" v-model="searchForm.szhh" style="width:100px;height:28px;line-height:28px;border-radius: 4px;border: 1px solid #DCDFE6;">-<input type="text" v-model="searchForm.ezhh" placeholder="请输入止点桩号" style="width:100px;height:28px;line-height:28px;border-radius: 4px;border: 1px solid #DCDFE6;">
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
           <el-button size="mini"  style="background-color: #DF4D4A;border-color:transparent;color: #fff" @click="search(1,10)">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="conter_table">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
               style="width: 100%;height: calc(100% - 46px)!important;overflow:auto;"
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
        <el-table-column align="center" class-name="column-caoz" label="操作" width="100">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="desc(scope.row)">情况说明</span>
          </template>
        </el-table-column>
        <el-table-column sortable align="left" prop="bbmc" label="评定方案"  show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="lxbm" label="路线编号"  show-overflow-tooltip></el-table-column>
        <!-- <el-table-column sortable align="left" prop="lxbm" label="等级"  show-overflow-tooltip></el-table-column> -->
        <el-table-column sortable align="left" prop="lxmc" label="路线名称"  show-overflow-tooltip></el-table-column>
        <el-table-column sortable align="left" prop="sjly" label="数据来源"  show-overflow-tooltip></el-table-column>
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
        <el-table-column sortable align="left" width="100"  prop="fx" label="行车方向"></el-table-column>
        <el-table-column sortable align="left" prop="lmcd" width="100"  label="长度（M）"></el-table-column>
        <!-- <el-table-column sortable align="left" prop="mqidj" width="100"  label="评定等级"></el-table-column> -->
        <el-table-column align="center" class-name="column-caoz" label="评定等级" width="80">
          <template scope="scope">
            <span style="color:#FF4500 ;" v-if="scope.row.mqidj==1">优</span>
            <span style="color:#FF8C00 ;" v-if="scope.row.mqidj==2">良</span>
            <span style="color:#CD853F ;" v-if="scope.row.mqidj==3">中</span>
            <span style="color:#BDB76B ;" v-if="scope.row.mqidj==4">次</span>
            <span style="color:#696969 ;" v-if="scope.row.mqidj==5">差</span>
          </template>
        </el-table-column>
        <el-table-column  align="left" prop="mqi" column-key="mqi"   sortable>
          <template slot="header" slot-scope="scope" >
             <span >MQI</span><i id="mqi" class="el-icon-question"></i>
         </template>
        </el-table-column>
        <el-table-column sortable align="left" prop="sci" >
          <template slot="header" slot-scope="scope">
             <span >SCI</span><i id="sci" class="el-icon-question"></i>
         </template>
        </el-table-column>
        <el-table-column sortable align="left" prop="pqi" >
          <template slot="header" slot-scope="scope">
             <span >PQI</span><i id="pqi" class="el-icon-question"></i>
         </template>
        </el-table-column>
        <el-table-column align="center"  label="路面分项指标" show-overflow-tooltip>
          <el-table-column align="left" sortable prop="pci"  width="80" show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
             <span >PCI</span><i id="pci" class="el-icon-question"></i>
         </template>
          </el-table-column>
          <el-table-column align="left" sortable prop="rqi"   width="80" show-overflow-tooltip>
            <template slot="header" slot-scope="scope">
             <span >RQI</span><i id="rqi" class="el-icon-question"></i>
         </template>
          </el-table-column>
          <el-table-column align="left" sortable prop="rdi"  width="80" show-overflow-tooltip>
            <template slot="header" slot-scope="scope">
             <span >RDI</span><i id="rdi" class="el-icon-question"></i>
         </template>
          </el-table-column>
          <el-table-column align="left" sortable prop="pbi"   width="80" show-overflow-tooltip>
            <template slot="header" slot-scope="scope">
             <span >PBI</span><i id="pbi" class="el-icon-question"></i>
         </template>
          </el-table-column>
          <el-table-column align="left" sortable prop="pwi"   width="80" show-overflow-tooltip>
            <template slot="header" slot-scope="scope">
             <span >PWI</span><i id="pwi" class="el-icon-question"></i>
         </template>
          </el-table-column>
          <el-table-column align="left" sortable prop="sri"   width="80" show-overflow-tooltip>
            <template slot="header" slot-scope="scope">
             <span >SRI</span><i id="sri" class="el-icon-question"></i>
         </template>
          </el-table-column>
          <el-table-column align="left" sortable prop="pssi"   width="80" show-overflow-tooltip>
            <template slot="header" slot-scope="scope">
             <span >PSSI</span><i id="pssi" class="el-icon-question"></i>
         </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="left"   sortable prop="bci" >
          <template slot="header" slot-scope="scope">
             <span >BCI</span><i id="bci" class="el-icon-question"></i>
         </template>
        </el-table-column>
        <el-table-column align="left"    sortable prop="tci"  >
          <template slot="header" slot-scope="scope">
             <span >TCI</span><i id="tci" class="el-icon-question"></i>
         </template>
        </el-table-column>
        <el-table-column align="left" sortable prop="pdsj" label="评定时间"></el-table-column>
        
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
    
    <el-dialog fullscreen class="data-dialog el-updata-div"  :close-on-click-modal="false" :visible.sync="showDetail" width="580px" :show-close="false">
      <span slot="title">
          <span class="titleclasschild"  @click="resetForm('lmshForm')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>路况评定明细</span>
      </span>
       <el-form v-if="showxq"  :model="lmshForm"   ref="lmshForm" label-width="100px" class="demo-lmshForm">
      <div class="showxq" v-if="showxq" style="font-size:0px" >
        <p   class=" addJLD"   >
              <span>评定方案: </span>
              <span>{{lmshForm.bbmc}}</span>
            </p>
            <p  class=" addJLD">
              <span>路线编码: </span>
              <span>{{lmshForm.lxbm}}</span>
            </p>
            <p   class=" addJLD">
              <span>路线名称: </span>
              <span>{{lmshForm.lxmc}}</span>
            </p>
            <p   class=" addJLD">
              <span>数据来源: </span>
              <span>{{lmshForm.sjly}}</span>
            </p>
            <p   class=" addJLD">
              <span>起点桩号: </span>
              <span>{{lmshForm.qdzh}}</span>
            </p>
            <p   class=" addJLD">
              <span>终点桩号: </span>
              <span>{{lmshForm.zdzh}}</span>
            </p>
            <p   class=" addJLD">
              <span>行车方向: </span>
              <span>{{lmshForm.fx}}</span>
            </p>
            <p   class=" addJLD">
              <span>长度: </span>
              <span>{{lmshForm.lmcd}}</span>
            </p>
 
      </div>
      <el-table ref="multipleTable" :data="arr" tooltip-effect="dark"
                style="width: 90%;height: calc(100% - 46px);overflow:auto;"
                row-class-name="row_class"
                border
                :row-style="{fontFamily: 'Microsoft YaHei', fontSize: '12px'}"  
         >
        <el-table-column   align="center"   prop="mqi" label="MQI"></el-table-column>
         <el-table-column   align="center"   prop="sci" label="路基SCI"></el-table-column>
        <el-table-column align="center"      prop="pqi" label="路面PQI"></el-table-column>
        <el-table-column align="center"  label="路面分项指标" show-overflow-tooltip>
          <el-table-column align="center"   prop="pci" label="PCI" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column align="center"   prop="rqi" label="RQI" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column align="center"   prop="rdi" label="RDI" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column align="center"   prop="pbi" label="PBI" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column align="center"   prop="pwi" label="PWI" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column align="center"   prop="sri" label="SRI" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column align="center"   prop="pssi" label="PSSI" width="80" show-overflow-tooltip></el-table-column>
        </el-table-column>
        <el-table-column align="center"    prop="bci" label="桥隧构造物BCI"></el-table-column>
        <el-table-column align="center"     prop="tci" label="沿线设施TCI"></el-table-column>
 
        
      </el-table>
      </el-form>
  
    </el-dialog>
    <div  id="tab2">
       <div  style="text-align: right;font-size:18px"><span id="close2" class="el-icon-close  close"></span></div>
       <div class="context">
        <div  style="text-align: center">
          <img src="../../../static/img/PQI.png" style="height:60px;"  alt="">
          <!--PQI = wPCI*PCI + wRQI*RQI + wRDI*RDI + wSRI*SRI-->
          <p style="white-space: pre;font-size: 18px">
            wPCI ——PCI 在 PQI 中的权重，按表取值;
            wRQI ——RQI在PQI中的权重，按表取值;
            wRDI ——RDI在PQI中的权重，按表取值;
            wSRI ——SRI在PQI中的权重，按表取值。
          </p>
        </div>
        <el-table
          :data="tableData1"
          :span-method="objectSpanMethod"
          border
          style="width: calc(100% - 30px); margin: 15px">
          <el-table-column prop="lmlx" label="路面类型"></el-table-column>
          <el-table-column prop="qz" label="权重"></el-table-column>
          <el-table-column prop="yjgl" label="高速、一级公路">
            <template scope="scope">
              <el-input v-model="scope.row.yjgl" class="xgqz"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="ejgl" label="二、三、四级公路">
            <template scope="scope">
              <el-input v-model="scope.row.ejgl" class="xgqz"></el-input>
            </template>
          </el-table-column>
        </el-table>
        </div>
      </div>
      <div id="tab3">
         <div  style="text-align: right;font-size:18px"><span id="close3" class="el-icon-close  close"></span></div>
       <div  class="context"> 
        <div style="text-align: center;white-space: pre">
         <img src="../../../static/img/PCI.png" style="height:100px;"  alt="">
          <p style="white-space: pre;font-size: 18px">
            DR —— 路面破损率(Pavement Distress Ratio)，
                  为各种损坏的折合损坏面积之和与路面调查面积之百分比(%);
            Ai —— 第 i 类路面损坏的面积(m2);
            A —— 调查的路面面积(调查长度与有效路面宽度之积，m2);
            wi —— 第 i 类路面损坏的权重，沥青路面按表 6.2.1-2 取值，
            a0 ——沥青路面采用 15.00;
            a1 ——沥青路面采用 0.412;
            i ——考虑损坏程度(轻、中、重)的第 i 项路面损坏类型;
            i0 ——包含损坏程度(轻、中、重)的损坏类型总数，沥青路面取21。
          </p>
        </div>
        <ul>
          <li style="width: calc(100% - 30px); margin: 15px">
            <h4 style="text-align: center">表 6.2.1-2 沥青路面损坏类型和权重</h4>
            <el-table
              :data="tableData2"
              :span-method="SpanMethod"
              border>
              <el-table-column type="index" width="80px" label="类型（i）"></el-table-column>
              <el-table-column prop="shmc" label="损坏名称"></el-table-column>
              <el-table-column prop="shcd" label="损坏程度"></el-table-column>
              <el-table-column prop="qz" label="权重（Wi）"></el-table-column>
              <el-table-column prop="jldw" label="计量单位"></el-table-column>
            </el-table>
          </li>
          <!-- <li style="width: calc((100% - 60px)/3); margin-left: 15px;float: left">
            <h4 style="text-align: center">水泥混凝土路面损坏类型和权重</h4>
            <el-table
              :data="tableData3"
              :span-method="SpanMethod1"
              border>
              <el-table-column type="index" width="80px" label="类型（i）"></el-table-column>
              <el-table-column prop="shmc" label="损坏名称"></el-table-column>
              <el-table-column prop="shcd" label="损坏程度"></el-table-column>
              <el-table-column prop="qz" label="权重（Wi）"></el-table-column>
              <el-table-column prop="jldw" label="计量单位"></el-table-column>
            </el-table>
          </li>
          <li style="width: calc((100% - 60px)/3); margin-left: 15px;float: left">
            <h4 style="text-align: center">砂石路面损坏类型和权重</h4>
            <el-table
              :data="tableData4"
              border>
              <el-table-column type="index" width="80px" label="类型（i）"></el-table-column>
              <el-table-column prop="shmc" label="损坏名称"></el-table-column>
              <el-table-column prop="qz" label="权重（Wi）"></el-table-column>
              <el-table-column prop="jldw" label="计量单位"></el-table-column>
            </el-table>
          </li> -->
        </ul>
        </div>
      </div>
      <div id="tab4">
         <div  style="text-align: right;font-size:18px"><span id="close4" class="el-icon-close  close"></span></div>
        <div class="context" style="text-align: center;white-space: pre">
          <img src="../../../static/img/RQI.png" style="height:80px;"  alt="">
          <p style="white-space: pre;font-size: 18px;">
            IRI ——国际平整度指数(International Roughness Index，m/km);
            a0 ——高速公路和一级公路采用 0.026，其他等级公路采用 0.0185;
            a1 ——高速公路和一级公路采用 0.65，其他等级公路采用 0.58。
          </p>
        </div>
      </div>
      <div id="tab5">
         <div  style="text-align: right;font-size:18px"><span id="close5" class="el-icon-close  close"></span></div>
        <div class="context" style="text-align: center;white-space: pre">
          <img src="../../../static/img/RDI.png" style="height:100px;"  alt="">
          <p style="white-space: pre;font-size: 18px">
            RD ——车辙深度(Rutting Depth，mm);
            RDa ——车辙深度参数，采用 10 mm;
            RDb ——车辙深度限值，采用 40 mm;
            a0 ——模型参数，采用 1.0;
            a1 ——模型参数，采用 3.0。
          </p>
        </div>
      </div>
      <div id="tab6">
         <div  style="text-align: right;font-size:18px"><span id="close6" class="el-icon-close  close"></span></div>
        <div class="context" style="text-align: center;white-space: pre">
          <img src="../../../static/img/SRI.png" style="height:100px;"  alt="">
          <p style="white-space: pre;font-size: 18px">
            SFC ——横向力系数(Side-way Force Coefficient);
            SRImin ——标定参数，采用 35.0;
            a0 ——模型参数，采用 28.6;
            a1 ——模型参数，采用-0.105。
          </p>
        </div>
      </div>
      <div id="tab7">
         <div  style="text-align: right;font-size:18px"><span id="close7" class="el-icon-close  close"></span></div>
        <div class="context" style="text-align: center;white-space: pre">
          <img src="../../../static/img/PSSI.png" style="height:120px;"  alt="">
          <p style="white-space: pre;font-size: 18px">
            SSI ——路面结构强度系数(Structure Strength Coefficient)，为路面 设计弯沉与实测代表弯沉之比;
            ld ——路面设计弯沉(mm); l0 ——实测代表弯沉(mm);
            a0 ——模型参数，采用 15.71;
            a1 ——模型参数，采用-5.19。
          </p>
        </div>
      </div>
      <div id="tab8">
         <div  style="text-align: right;font-size:18px"><span id="close8" class="el-icon-close  close"></span></div>
      <div class="context">
        <div  style="text-align: center;white-space: pre">
          <img src="../../../static/img/SCI.png" style="height:80px;"  alt="">
          <p style="white-space: pre;font-size: 18px">
            GDiSCI —— 第 i 类路基损坏的总扣分(Global Deduction)，
                  最高分 值为 100，按表 6.2.2 的规定计算;
            wi —— 第 i 类路基损坏的权重，按表 6.2.2 取值;
            i ——路基损坏类型。
          </p>
        </div>
        <el-table
          :data="tableData5"
          :span-method="SpanMethod2"
          border
          style="width: calc(100% - 30px); margin: 15px">
          <el-table-column type="index" label="类型(i)"></el-table-column>
          <el-table-column prop="shmc" label="损坏名称"></el-table-column>
          <el-table-column prop="shcd" label="损坏程度"></el-table-column>
          <el-table-column prop="jldw" label="计量单位"></el-table-column>
          <el-table-column prop="dwkf" label="单位扣分"></el-table-column>
          <el-table-column prop="qz" label="权重"></el-table-column>
        </el-table>
      </div>
      </div>
      <div id="tab9">
         <div  style="text-align: right;font-size:18px"><span id="close9" class="el-icon-close  close"></span></div>
      <div class="context">
        <div   style="text-align: center;white-space: pre">
          <img src="../../../static/img/BCI.png" style="height:50px;"  alt="">
          <p style="white-space: pre;font-size: 18px">
            GDiSCI —— 第 i 类路基损坏的总扣分(Global Deduction)，
            最高分 值为 100，按表 6.2.2 的规定计算;
            wi —— 第 i 类路基损坏的权重，按表 6.2.2 取值;
            i ——路基损坏类型。
          </p>
        </div>
        <h4 style="text-align:center" >表 6.2.2 桥隧构造物扣分标准 </h4>
        <el-table
          :data="tableData6"
          :span-method="SpanMethod3"
          border
          style="width: calc(100% - 30px); margin: 15px">
          <el-table-column type="index" label="类型(i)"></el-table-column>
          <el-table-column prop="xm" label="项目"></el-table-column>
          <el-table-column prop="jszkpddj" label="技术状况评定等级"></el-table-column>
          <el-table-column prop="jldw" label="计量单位"></el-table-column>
          <el-table-column prop="dwkf" label="单位扣分"></el-table-column>
        </el-table>
         </div>
      </div>
     <div id="tab10">
        <div  style="text-align: right;font-size:18px"><span id="close10" class="el-icon-close  close"></span></div>
      <div class="context">
        <div   style="text-align: center;white-space: pre">
          <img src="../../../static/img/TCI.png" style="height:50px;"  alt="">
          <p style="white-space: pre;font-size: 18px">
            GDiSCI —— 第 i 类路基损坏的总扣分(Global Deduction)，
            最高分 值为 100，按表 6.2.2 的规定计算;
            wi —— 第 i 类路基损坏的权重，按表 6.2.2 取值;
            i ——路基损坏类型。
          </p>
        </div>
        <h4 style="text-align:center" >表 6.2.2 沿线设施扣分标准</h4>
        <el-table
          :data="tableData7"
          :span-method="SpanMethod4"
          border
          style="width: calc(100% - 30px); margin: 15px">
          <el-table-column type="index" label="类型(i)"></el-table-column>
          <el-table-column prop="shmc" label="损坏名称"></el-table-column>
          <el-table-column prop="shcd" label="损坏程度"></el-table-column>
          <el-table-column prop="jldw" label="计量单位"></el-table-column>
          <el-table-column prop="dwkf" label="单位扣分"></el-table-column>
          <el-table-column prop="qz" label="权重"></el-table-column>
        </el-table>
        </div>
      </div>

    <div id="tab1">
      <div  style="text-align: right;font-size:18px"><span id="close1" class="el-icon-close  close"></span></div>
        <div class="context" style="text-align: center">
          <img src="../../../static/img/MQI.png" style="height:40px;"  alt="">
          <!--MQI = wPQI*PQI + wSCI*SCI + wBCI*BCI + wTCI*TCI-->
          <p style="white-space: pre;font-size: 18px">
            wPQI ——PQI 在 MQI 中的权重，取值为 0.70;
            wSCI ——SCI 在 MQI 中的权重，取值为 0.08;
            wBCI ——BCI 在 MQI 中的权重，取值为 0.12;
            wTCI ——TCI 在 MQI 中的权重，取值为 0.10。
          </p>
        </div>
        </div>
      <div id="tab11">
         <div  style="text-align: right;font-size:18px"><span id="close11" class="el-icon-close  close"></span></div>
       <div class="context">
        <div  style="text-align: center;white-space: pre">
          <img src="../../../static/img/PBI.png" style="height:80px;"  alt="">
          <p style="white-space: pre;font-size: 18px">
            式中：PBi —— 第i类程度的路路⾯面跳⻋车数。路路⾯面跳⻋车计算⽅方法⻅见附录B；
             ai —— 第i类程度的路路⾯面跳⻋车单位扣分，按表7.4.9的规定取值；
             i —— 路路⾯面跳⻋车程度；
             i0 —— 路路⾯面跳⻋车程度总数，取3。
          </p>
        </div>
        <el-table
          :data="tableData11"
          
          border
          style="width: calc(100% - 30px); margin: 15px">
          <el-table-column  prop="jczb" label="检测指标"></el-table-column>
          <el-table-column prop="qd" label="轻度"></el-table-column>
          <el-table-column prop="md" label="中度"></el-table-column>
          <el-table-column prop="zd" label="重度"></el-table-column>
 
        </el-table>
         </div>
      </div>
     <div id="tab12">
      <div  style="text-align: right;font-size:18px"><span id="close12" class="el-icon-close  close"></span></div>
        <div class="context" style="text-align: center">
          <img src="../../../static/img/PWI1.png" style="height:40px;"  alt=""> <br/>
          <img src="../../../static/img/PWI2.png" style="height:70px;"  alt="">
          <p style="white-space: pre;font-size: 18px">
            WR —— 路路⾯面磨耗率（%）;
            a0 —— 模型参数，采⽤用1.696 ;
            a1 —— 模型参数，采⽤用0.785 ;
            MPD —— 路路⾯面构造深度（mm）; 
            MPDC —— 路路⾯面构造深度基准值，采⽤用⽆无磨损的⻋车道中线路路⾯面构造深度（mm）;
            MPDL —— 左轮迹带的路路⾯面构造深度（mm）;
            MPDR —— 右轮迹带的路路⾯面构造深度（mm） 。
          </p>
        </div>
        </div>
      <el-dialog :show-close="false" fullscreen class="data-dialog el-updata-div"  :close-on-click-modal="false" :visible.sync="showQk" width="580px" >
        <span slot="title">
          <span class="titleclasschild"  @click="resetForm('lmshForm')"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>情况说明</span>
      </span>
       <el-form  :model="lmshForm"  ref="lmshForm" label-width="100px" class="demo-lmshForm">
              <el-form-item class=" addJLD_long" label="情况说明" prop="qksm">
                <el-input size="mini" type="textarea" v-model="lmshForm.czsm"></el-input>
              </el-form-item>
 
              <el-form-item class=" addJLD_long" label="附件" prop="">
                <p class="up">
 
              <el-upload
 
                class="upload-demo"
                action="http://61.141.223.10:8001/common/uploadFile"
                multiple
                accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.doc,.docx,.xls,.xlsx,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.DOC,.DOCX,.XLS,.XLSX"
                show-file-list
                :on-remove='xgfile'
                :on-preview="yulan"
                :file-list="fileList"
                :on-success="upload">
                <i style="color: #00a2fd;" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
              <a class="clear"></a>
            </p>
              </el-form-item>
          
        
         <div class="dialog_footer" >
          <el-button size="small" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit('lmshForm')">保存</el-button>
 
          <el-button size="small" @click="resetForm('lmshForm')" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>

            </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
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
      dataList:[],
      fileList:[],
      showQk:false,
      lmshForm: {
        xcfx: '上行'
      },
      searchForm: {
         xcfx: '上行'
      },
      lxData: {
        id: '',
        ldname: ''
      },
      index: '',
      isadd: false,
      submitLoading: false,
      showxq: false,
      showSearch: false,
      loading: false,
      tableHeight: 300,
      tableData: [],
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      roadOptions: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      personelForm: {},
      showDetail: false,
      pdfaMc:'',
      multipleSelection: [],
      arr:[],
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
     tableData11:[{
       jczb:'路路⾯面纵断⾯面⾼高差（Δh） ，cm',
       qd:'>=2,<5',
       md:'>=5,<8',
       zd:'>=8'
     }],
     tableData1: [
        {
          lmlx: '沥青路面',
          qz: 'wPCI',
          yjgl: '0.35',
          ejgl: '0.60'
        },
        {
          lmlx: '沥青路面',
          qz: 'wRQI',
          yjgl: '0.40',
          ejgl: '0.40'
        },
        {
          lmlx: '沥青路面',
          qz: 'wRDI',
          yjgl: '0.15',
          ejgl: '-'
        },
        {
          lmlx: '沥青路面',
          qz: 'wSRI',
          yjgl: '0.10',
          ejgl: '-'
        },
        {
          lmlx: '水泥混凝土路面',
          qz: 'wPCI',
          yjgl: '0.50',
          ejgl: '0.60'
        },
        {
          lmlx: '水泥混凝土路面',
          qz: 'wRQI',
          yjgl: '0.40',
          ejgl: '0.40'
        },
        {
          lmlx: '水泥混凝土路面',
          qz: 'wSRI',
          yjgl: '0.10',
          ejgl: '-'
        }
      ],
      tableData2: [
        {
          shmc: '龟裂',
          qz: '0.6',
          jldw: '面积 m2',
          shcd: '轻'
        },
        {
          shmc: '龟裂',
          qz: '0.8',
          jldw: '面积 m2',
          shcd: '中'
        },
        {
          shmc: '龟裂',
          qz: '1.0',
          jldw: '面积 m2',
          shcd: '重'
        },
        {
          shmc: '块状裂缝',
          qz: '0.6',
          jldw: '面积 m2',
          shcd: '轻'
        },
        {
          shmc: '块状裂缝',
          qz: '0.8',
          jldw: '面积 m2',
          shcd: '重'
        },
        {
          shmc: '纵向裂缝',
          qz: '0.6',
          jldw: '长度m',
          shcd: '轻'
        },
        {
          shmc: '纵向裂缝',
          qz: '1.0',
          jldw: '长度m',
          shcd: '重'
        },
        {
          shmc: '横向裂缝',
          qz: '0.6',
          jldw: '长度m',
          shcd: '轻'
        },
        {
          shmc: '横向裂缝',
          qz: '1.0',
          jldw: '长度m',
          shcd: '重'
        },
        {
          shmc: '坑槽',
          qz: '0.8',
          jldw: '面积 m2',
          shcd: '轻'
        },
        {
          shmc: '坑槽',
          qz: '1.0',
          jldw: '面积 m2',
          shcd: '重'
        },
        {
          shmc: '松散',
          qz: '0.6',
          jldw: '面积 m2',
          shcd: '轻'
        },
        {
          shmc: '松散',
          qz: '1.0',
          jldw: '面积 m2',
          shcd: '重'
        },
        {
          shmc: '沉陷',
          qz: '0.6',
          jldw: '面积 m2',
          shcd: '轻'
        },
        {
          shmc: '沉陷',
          qz: '1.0',
          jldw: '面积 m2',
          shcd: '重'
        },
        {
          shmc: '车辙',
          qz: '0.6',
          jldw: '长度m',
          shcd: '轻'
        },
        {
          shmc: '车辙',
          qz: '1.0',
          jldw: '长度m',
          shcd: '重'
        },
        {
          shmc: '波浪拥包',
          qz: '0.6',
          jldw: '面积 m2',
          shcd: '轻'
        },
        {
          shmc: '波浪拥包',
          qz: '1.0',
          jldw: '面积 m2',
          shcd: '重'
        },
        {
          shmc: '泛油',
          qz: '0.2',
          jldw: '面积 m2',
          shcd: ''
        },
        {
          shmc: '修补',
          qz: '0.1',
          jldw: '面积 m2',
          shcd: ''
        }
      ],
      tableData3: [
        {
          shmc: '裂缝',
          qz: '0.6',
          jldw: '长度m',
          shcd: '轻'
        },
        {
          shmc: '裂缝',
          qz: '0.8',
          jldw: '长度m',
          shcd: '中'
        },
        {
          shmc: '裂缝',
          qz: '1.0',
          jldw: '长度m',
          shcd: '重'
        },
        {
          shmc: '板角断裂',
          qz: '0.6',
          jldw: '面积 m2',
          shcd: '轻'
        },
        {
          shmc: '板角断裂',
          qz: '0.8',
          jldw: '面积 m2',
          shcd: '中'
        },
        {
          shmc: '板角断裂',
          qz: '1.0',
          jldw: '面积 m2',
          shcd: '重'
        },
        {
          shmc: '边角剥落',
          qz: '0.6',
          jldw: '长度m',
          shcd: '轻'
        },
        {
          shmc: '边角剥落',
          qz: '0.8',
          jldw: '长度m',
          shcd: '中'
        },
        {
          shmc: '边角剥落',
          qz: '1.0',
          jldw: '长度m',
          shcd: '重'
        },
        {
          shmc: '破碎板',
          qz: '0.8',
          jldw: '面积 m2',
          shcd: '轻'
        },
        {
          shmc: '破碎板',
          qz: '1.0',
          jldw: '面积 m2',
          shcd: '重'
        },
        {
          shmc: '错台',
          qz: '0.6',
          jldw: '长度m',
          shcd: '轻'
        },
        {
          shmc: '错台',
          qz: '1.0',
          jldw: '长度m',
          shcd: '重'
        },
        {
          shmc: '接缝料损坏',
          qz: '0.4',
          jldw: '长度m',
          shcd: '轻'
        },
        {
          shmc: '接缝料损坏',
          qz: '0.6',
          jldw: '长度m',
          shcd: '重'
        },
        {
          shmc: '唧泥',
          qz: '1.0',
          jldw: '长度m',
          shcd: ''
        },
        {
          shmc: '坑洞',
          qz: '1.0',
          jldw: '面积 m2',
          shcd: ''
        },
        {
          shmc: '拱起',
          qz: '1.0',
          jldw: '面积 m2',
          shcd: ''
        },
        {
          shmc: '露骨',
          qz: '0.3',
          jldw: '面积 m2',
          shcd: ''
        },
        {
          shmc: '修补',
          qz: '0.1',
          jldw: '面积 m2',
          shcd: ''
        }
      ],
      tableData4: [
        {
          shmc: '路拱不适',
          qz: '0.1',
          jldw: '长度m',
          shcd: ''
        },
        {
          shmc: '沉陷',
          qz: '0.8',
          jldw: '面积 m2',
          shcd: ''
        },
        {
          shmc: '波浪搓板',
          qz: '1.0',
          jldw: '面积 m2',
          shcd: ''
        },
        {
          shmc: '车辙',
          qz: '1.0',
          jldw: '长度m',
          shcd: ''
        },
        {
          shmc: '坑槽',
          qz: '1.0',
          jldw: '面积 m2',
          shcd: ''
        },
        {
          shmc: '露骨',
          qz: '0.8',
          jldw: '面积 m2',
          shcd: ''
        }
      ],
      tableData5: [
        {
          shmc: '路见边沟不洁',
          qz: '0.05',
          jldw: 'm',
          shcd: '',
          dwkf: '0.5'
        },
        {
          shmc: '路肩损坏',
          qz: '0.10',
          jldw: 'm2',
          dwkf: '1',
          shcd: '轻'
        },
        {
          shmc: '路肩损坏',
          qz: '0.10',
          jldw: 'm2',
          dwkf: '2',
          shcd: '重'
        },
        {
          shmc: '边坡坍塌',
          qz: '0.25',
          jldw: '处',
          dwkf: '20',
          shcd: '轻'
        },
        {
          shmc: '边坡坍塌',
          qz: '0.25',
          jldw: '处',
          dwkf: '30',
          shcd: '中'
        },
        {
          shmc: '边坡坍塌',
          qz: '0.25',
          jldw: '处',
          dwkf: '50',
          shcd: '重'
        },
        {
          shmc: '水毁冲沟',
          qz: '0.25',
          jldw: '处',
          dwkf: '20',
          shcd: '轻'
        },
        {
          shmc: '水毁冲沟',
          qz: '0.25',
          jldw: '处',
          dwkf: '30',
          shcd: '中'
        },
        {
          shmc: '水毁冲沟',
          qz: '0.25',
          jldw: '处',
          dwkf: '50',
          shcd: '重'
        },
        {
          shmc: '路基构造物损坏',
          qz: '0.10',
          jldw: '处',
          dwkf: '20',
          shcd: '轻'
        },
        {
          shmc: '路基构造物损坏',
          qz: '0.10',
          jldw: '处',
          dwkf: '30',
          shcd: '中'
        },
        {
          shmc: '路基构造物损坏',
          qz: '0.10',
          jldw: '处',
          dwkf: '50',
          shcd: '重'
        },
        {
          shmc: '路缘石缺损',
          qz: '0.05',
          jldw: 'm',
          dwkf: '4',
          shcd: ''
        },
        {
          shmc: '路基沉降',
          qz: '0.10',
          jldw: '处',
          dwkf: '20',
          shcd: '轻'
        },
        {
          shmc: '路基沉降',
          qz: '0.10',
          jldw: '处',
          dwkf: '30',
          shcd: '中'
        },
        {
          shmc: '路基沉降',
          qz: '0.10',
          jldw: '处',
          dwkf: '50',
          shcd: '重'
        },
        {
          shmc: '排水系统淤塞',
          qz: '0.10',
          jldw: 'm',
          dwkf: '1',
          shcd: '轻'
        },
        {
          shmc: '排水系统淤塞',
          qz: '0.10',
          jldw: '处',
          dwkf: '20',
          shcd: '重'
        }
      ],
      tableData6: [
        {
          xm: '桥梁',
          jszkpddj: '一、二',
          jldw: '座',
          dwkf: '0'
        },
        {
          xm: '桥梁',
          jszkpddj: '三',
          jldw: '座',
          dwkf: '40'
        },
        {
          xm: '桥梁',
          jszkpddj: '四',
          jldw: '座',
          dwkf: '70'
        },
        {
          xm: '桥梁',
          jszkpddj: '五',
          jldw: '座',
          dwkf: '100'
        },
        {
          xm: '隧道',
          jszkpddj: 'S: 无异常',
          jldw: '座',
          dwkf: '0'
        },
        {
          xm: '隧道',
          jszkpddj: 'B: 有异常',
          jldw: '座',
          dwkf: '50'
        },
        {
          xm: '隧道',
          jszkpddj: 'A: 有危险',
          jldw: '座',
          dwkf: '100'
        },
        {
          xm: '涵洞',
          jszkpddj: '好、较好',
          jldw: '道',
          dwkf: '0'
        },
        {
          xm: '涵洞',
          jszkpddj: '较差',
          jldw: '道',
          dwkf: '40'
        },
        {
          xm: '涵洞',
          jszkpddj: '差',
          jldw: '道',
          dwkf: '70'
        },
        {
          xm: '涵洞',
          jszkpddj: '危险',
          jldw: '道',
          dwkf: '100'
        }
      ],
      tableData7: [
        {
          shmc: '防护设施缺损',
          shcd: '轻',
          qz: '0.25',
          jldw: '处',
          dwkf: '10'
        },
        {
          shmc: '防护设施缺损',
          shcd: '重',
          qz: '0.25',
          jldw: '处',
          dwkf: '30'
        },
        {
          shmc: '隔离栅损坏',
          shcd: '',
          qz: '0.10',
          jldw: '处',
          dwkf: '20'
        },
        {
          shmc: '标志缺损',
          shcd: '',
          qz: '0.25',
          jldw: '处',
          dwkf: '20'
        },
        {
          shmc: '标线缺损',
          shcd: '',
          qz: '0.20',
          jldw: 'm',
          dwkf: '0.1'
        },
        {
          shmc: '绿化管理不善',
          shcd: '',
          qz: '0.20',
          jldw: 'm',
          dwkf: '0.1'
        }
      ],
      tabindex: 0,
      showtable:false,
      t:'',
      l:''

    }
  },
  async created(){
   this.initUser()
 
  },
  methods: {
    desc(row){
      this.$api.getFilesDataById('?id='+this.lmshForm.id).then(res=>{
       if(res.data.code==1){
         this.fileList=res.data.data
         for (let index = 0; index < this.fileList.length; index++) {
           this.fileList[index].name = this.fileList[index].file_yname
         }
         this.dataList=this.fileList
       }
     }).catch(er=>{
     })
      this.showQk=true
    },
     upload (response, file, fileList) {
      this.dataList=[]
      for (let index = 0; index < fileList.length; index++) {
        if(fileList[index].response){
          this.dataList.push(fileList[index].response.data)
        }else{
          this.dataList.push(fileList[index])
        }
      }
    },
    xgfile( file, fileList){
      this.deleArr+=file.id+','
    if(!this.showxq){
    this.dataList=[]
      for (let index = 0; index < fileList.length; index++) {
        if(fileList[index].response){
          this.dataList.push(fileList[index].response.data)
        }else{
          this.dataList.push(fileList[index])
        }
      }
      }
    },
    yulan(file){
      if(file.response){
      let url=file.response.data.file_path
        window.open(url)
      }else{
        let url=file.file_path
        window.open(url)
      }

    },
    openf(item){
      window.open(item.file_path)
    },
    deleteFile(item,index,event){
       if(event) {
        event.stopPropagation ? event.stopPropagation(): event.cancelBubble = true;
          }
      this.deleArr.push(item.id)
      $('.file_li').eq(index).remove()
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 4 === 0) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    SpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1 || columnIndex === 4) {
        // 合并第二行
        if (rowIndex === 0) {
          // 从第二列开始
          return [3, 1]
          // 这里返回的是行和列的合并数量,可以返回一个数组,也可以返回一个对象,效果一样
          // 这里rowspan为1是行有一行合并,colspan为3是列有3列合并,你要合并几行几列就写上相应的数字
          // return {
          //    rowspan: 1,
          //    colspan: 3
          //  }
          // 这里要写一个else的判断,不然被合并列的原始数据会填充到合并之后的表格里
          // 这个判断是把合并的第3列,第4列的值省略,在合并的表格右边直接填原先第5列的值,合并了几列,就省略几列的值
        } else if (rowIndex === 2 || rowIndex === 1 || (rowIndex % 2 === 0 && rowIndex <= 18 && rowIndex > 3)) {
          return [0, 0]
        } else if (rowIndex % 2 !== 0 && rowIndex <= 18) {
          return [2, 1]
        }
      }
    },
    SpanMethod1 ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1 || columnIndex === 4) {
        // 合并第二行
        if (rowIndex === 0 || rowIndex === 3 || rowIndex === 6) {
          // 从第二列开始
          return [3, 1]
          // 这里返回的是行和列的合并数量,可以返回一个数组,也可以返回一个对象,效果一样
          // 这里rowspan为1是行有一行合并,colspan为3是列有3列合并,你要合并几行几列就写上相应的数字
          // return {
          //    rowspan: 1,
          //    colspan: 3
          //  }
          // 这里要写一个else的判断,不然被合并列的原始数据会填充到合并之后的表格里
          // 这个判断是把合并的第3列,第4列的值省略,在合并的表格右边直接填原先第5列的值,合并了几列,就省略几列的值
        } else if ((rowIndex % 3 !== 0 && rowIndex < 9) || (rowIndex % 2 === 0 && rowIndex >= 9 && rowIndex < 15)) {
          return [0, 0]
        } else if (rowIndex % 2 !== 0 && rowIndex >= 9 && rowIndex < 15) {
          return [2, 1]
        }
      }
    },
    SpanMethod2 ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1 || columnIndex === 3 || columnIndex === 5) {
        if ((rowIndex === 1 || rowIndex === 16)) {
          if (rowIndex === 1 || (rowIndex === 16 && columnIndex !== 3)) {
            return [2, 1]
          } else if (rowIndex === 16 && columnIndex === 3) {
            return [1, 1]
          }
        } else if (rowIndex === 3 || rowIndex === 6 || rowIndex === 9 || rowIndex === 13) {
          return [3, 1]
        } else if (rowIndex === 0 || rowIndex === 12 || rowIndex === 18) {
          return [1, 1]
        } else if (rowIndex === 17 && columnIndex === 3) {
          return [1, 1]
        } else {
          return [0, 0]
        }
      }
    },
    SpanMethod3 ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1 || columnIndex === 3) {
        if (rowIndex === 0 || rowIndex === 7) {
          return [4, 1]
        } else if (rowIndex === 4) {
          return [3, 1]
        } else {
          return [0, 0]
        }
      }
    },
    SpanMethod4 ({ row, column, rowIndex, columnIndex }) {
      if ((columnIndex === 1 || columnIndex === 3)) {
        if (rowIndex === 0) {
          return [2, 1]
        } else if (rowIndex === 1) {
          return [0, 0]
        }
      }
    },
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
    showBhFormDia (row) {
     this.arr=[]
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.arr.push(this.lmshForm)
    },
    sigClic (row){
this.$refs.multipleTable.toggleRowSelection(row)
    },
    dbclick (row){
      this.arr=[]
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.arr.push(this.lmshForm)
      console.log(arr)
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
      this.$api.getMxbForLksjcx('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.tableData = resp.data.data.list
          console.log(this.tableData)
          this.total = resp.data.data.total
        }
      }).catch(e => {
        this.loading = false
      })
    },
    resetForm () {
      this.showDetail = false
      this.showQk=false
      this.lmshForm = {
      }
    },
    changelx (value) {
      this.searchForm.lxcode = value.lxcode
      this.searchForm.xcfx = '上行'
      // this.searchForm.szhh = value.szhh
      // this.searchForm.ezhh = value.ezhh
    },
    selectFa(node){
    this.searchForm.bbid = node.djbh
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
          this.searchForm.lxcode = this.qmbbOptions[0].lxcode
          this.searchForm.xcfx = '上行'
          // this.searchForm.bbid = '10228'
          // this.searchForm.szhh = this.qmbbOptions[0].szhh
          // this.searchForm.ezhh = this.qmbbOptions[0].ezhh
          this.search(this.currentPage, this.pageSize)
        }
      }).catch(e => {
      })
      this.$api.getFaForLksjcx('?pageNum=' + 1 + '&pageSize=' + 1000000).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.pdfaMc= resp.data.data.list
        }
      }).catch(e => {
      })
    }
  },
  mounted () {
    this.getQmldbb()
    // this.tableHeight = $('#jszkpdmxb')[0].offsetHeight
    
  $(document).ready(function(){
 
 $("#mqi").click(function(e){
   let t=e.pageY - $(".horizontalLayout-main").offset().top - 8
   let l=($("#jszkpdmxb").width() - $("#tab1").width())/2

  $("#tab1").css({top:t+'px',left:l+ 'px'})
  $("#tab1").show()
   e.stopPropagation();
  });
  $("#close1").click(function(){
  $("#tab1").hide();
  });

   $("#sci").click(function(e){
   let t=e.pageY - $(".horizontalLayout-main").offset().top - 8
   let l=($("#jszkpdmxb").width() - $("#tab8").width())/2

  $("#tab8").css({top:t+'px',left:l+ 'px'})
  $("#tab8").show();
  e.stopPropagation();
  });
  $("#close8").click(function(){
  $("#tab8").hide();
  });

  $("#pqi").click(function(e){
   let t=e.pageY - $(".horizontalLayout-main").offset().top - 8
   let l=($("#jszkpdmxb").width() - $("#tab2").width())/2

  $("#tab2").css({top:t+'px',left:l+ 'px'})
  $("#tab2").show();
  e.stopPropagation();
  });
  $("#close2").click(function(){
  $("#tab2").hide();
  });

  $("#pci").click(function(e){
   let t=e.pageY - $(".horizontalLayout-main").offset().top - 8
   let l=($("#jszkpdmxb").width() - $("#tab3").width())/2

  $("#tab3").css({top:t+'px',left:l+ 'px'})
  $("#tab3").show();
  e.stopPropagation();
  });
  $("#close3").click(function(){
  $("#tab3").hide();
  });

  $("#rqi").click(function(e){
   let t=e.pageY - $(".horizontalLayout-main").offset().top - 8
   let l=($("#jszkpdmxb").width() - $("#tab4").width())/2

  $("#tab4").css({top:t+'px',left:l+ 'px'})
  $("#tab4").show();
  e.stopPropagation();
  });
  $("#close4").click(function(){
  $("#tab4").hide();
  });

  $("#rdi").click(function(e){
   let t=e.pageY - $(".horizontalLayout-main").offset().top - 8
   let l=($("#jszkpdmxb").width() - $("#tab5").width())/2

  $("#tab5").css({top:t+'px',left:l+ 'px'})
  $("#tab5").show();
  e.stopPropagation();
  });
  $("#close5").click(function(){
  $("#tab5").hide();
  });

  $("#sri").click(function(e){
   let t=e.pageY - $(".horizontalLayout-main").offset().top - 8
   let l=($("#jszkpdmxb").width() - $("#tab6").width())/2

  $("#tab6").css({top:t+'px',left:l+ 'px'})
  $("#tab6").show();
  e.stopPropagation();
  });
  $("#close6").click(function(){
  $("#tab6").hide();
  });

  $("#pssi").click(function(e){
   let t=e.pageY - $(".horizontalLayout-main").offset().top - 8
   let l=($("#jszkpdmxb").width() - $("#tab7").width())/2

  $("#tab7").css({top:t+'px',left:l+ 'px'})
  $("#tab7").show();
  e.stopPropagation();
  });
  $("#close7").click(function(){
  $("#tab7").hide();
  });

  $("#bci").click(function(e){
   let t=e.pageY - $(".horizontalLayout-main").offset().top - 8
  let l=($("#jszkpdmxb").width() - $("#tab9").width())/2

  $("#tab9").css({top:t+'px',left:l+ 'px'})
  $("#tab9").show();
  e.stopPropagation();
  });
  $("#close9").click(function(){
  $("#tab9").hide();
  });

  $("#tci").click(function(e){
   let t=e.pageY - $(".horizontalLayout-main").offset().top - 8
   let l=($("#jszkpdmxb").width() - $("#tab10").width())/2

  $("#tab10").css({top:t+'px',left:l+ 'px'})
  $("#tab10").show();
  e.stopPropagation();
  });
  $("#close10").click(function(){
  $("#tab10").hide();
  });


  $("#pbi").click(function(e){
   let t=e.pageY - $(".horizontalLayout-main").offset().top - 8
   let l=($("#jszkpdmxb").width() - $("#tab11").width())/2

  $("#tab11").css({top:t+'px',left:l+ 'px'})
  $("#tab11").show();
  e.stopPropagation();
  });
  $("#close11").click(function(){
  $("#tab11").hide();
  });
  $("#pwi").click(function(e){
   let t=e.pageY - $(".horizontalLayout-main").offset().top - 8
   let l=($("#jszkpdmxb").width() - $("#tab12").width())/2

  $("#tab12").css({top:t+'px',left:l+ 'px'})
  $("#tab12").show();
  e.stopPropagation();
  });
  $("#close12").click(function(){
  $("#tab12").hide();
  });

});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#tab1,#tab2,#tab3,#tab4,#tab5,#tab6,#tab7,#tab8,#tab9,#tab10,#tab11,#tab12{
  display: none;
  z-index: 99999;
  border: 1px solid #52575D;
  padding: 8px 16px;
  height: auto;
  max-height: 400px;
  overflow: hidden;
  background-color: white;
  position: absolute;
 .context{
 height: 350px;
 overflow: auto;
 }
}
.show{
  display: block;
}
.close:hover{
color: red;
}
.background_image{
  >div{
    background: none;
  }
}
  #jszkpdmxb{
   position: relative;
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    overflow: auto;
    min-width: 1100px;
    .conter_table{
      height: calc(100% - 98px);
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
    .dialog_warps{
      background: #fff;
      padding: 20px 40px;
      ul{
        li{
          width:calc(100% / 3);
          height: 40px;
          float: left;
          border: 1px solid #D5D6D7;
          border-bottom: none;
          border-right: none;
          color: #52575D!important;
          font-size: 12px;
          &:nth-of-type(3n){
            border-right: 1px solid #D5D6D7;
          }
          &:nth-last-of-type(1){
            border-bottom: 1px solid #D5D6D7;
          }
          >span{
            width: 100px;
            display: inline-block;
            height: 100%;
            line-height: 38px;
            text-indent: 1em;
            border-right: 1px solid #D5D6D7;
            background: #F7F8F9;
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
        .tow_line,.three_line,.four_line,.five_line{
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
        .five_line{
          height: 200px;
          p{
            span{
              display: block;
              height: 20%;
            }
          }
        }
      }
    }
  }
</style>
