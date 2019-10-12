/**
* ----参数管理
*/
<template>
  <div id="csgl" class="styleSheets" style="height: 100%" v-loading="loading">
    <div class="header">
      <div class="header_option">
      </div>
    </div>
    <div class="conter_table">
      <p class="tab_lable" style="">
        <span :class="tabindex===0?'tabselect':''" @click="tablable(0)">MQI</span>
        <span :class="tabindex===1?'tabselect':''" @click="tablable(1)">PQI</span>
        <span :class="tabindex===2?'tabselect':''" @click="tablable(2)">PCI</span>
        <span :class="tabindex===3?'tabselect':''" @click="tablable(3)">RQI</span>
        <span :class="tabindex===4?'tabselect':''" @click="tablable(4)">RDI</span>
        <span :class="tabindex===5?'tabselect':''" @click="tablable(5)">SRI</span>
        <span :class="tabindex===6?'tabselect':''" @click="tablable(6)">PSSI</span>
        <span :class="tabindex===7?'tabselect':''" @click="tablable(7)">SCI</span>
        <span :class="tabindex===10?'tabselect':''" @click="tablable(10)">PBI</span>
        <span :class="tabindex===11?'tabselect':''" @click="tablable(11)">PWI</span>
        <span :class="tabindex===8?'tabselect':''" @click="tablable(8)">BCI</span>
        <span :class="tabindex===9?'tabselect':''" @click="tablable(9)">TCI</span>
      </p>
      <div v-if="tabindex===0">
        <div style="text-align: center">
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
      <div v-if="tabindex===1">
        <div style="text-align: center">
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
      <div v-if="tabindex===2">
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
      <div v-if="tabindex===3">
        <div style="text-align: center;white-space: pre">
          <img src="../../../static/img/RQI.png" style="height:80px;"  alt="">
          <p style="white-space: pre;font-size: 18px;">
            IRI ——国际平整度指数(International Roughness Index，m/km);
            a0 ——高速公路和一级公路采用 0.026，其他等级公路采用 0.0185;
            a1 ——高速公路和一级公路采用 0.65，其他等级公路采用 0.58。
          </p>
        </div>
      </div>
      <div v-if="tabindex===4">
        <div style="text-align: center;white-space: pre">
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
      <div v-if="tabindex===5">
        <div style="text-align: center;white-space: pre">
          <img src="../../../static/img/SRI.png" style="height:100px;"  alt="">
          <p style="white-space: pre;font-size: 18px">
            SFC ——横向力系数(Side-way Force Coefficient);
            SRImin ——标定参数，采用 35.0;
            a0 ——模型参数，采用 28.6;
            a1 ——模型参数，采用-0.105。
          </p>
        </div>
      </div>
      <div v-if="tabindex===6">
        <div style="text-align: center;white-space: pre">
          <img src="../../../static/img/PSSI.png" style="height:120px;"  alt="">
          <p style="white-space: pre;font-size: 18px">
            SSI ——路面结构强度系数(Structure Strength Coefficient)，为路面 设计弯沉与实测代表弯沉之比;
            ld ——路面设计弯沉(mm); l0 ——实测代表弯沉(mm);
            a0 ——模型参数，采用 15.71;
            a1 ——模型参数，采用-5.19。
          </p>
        </div>
      </div>
      <div v-if="tabindex===7">
        <div style="text-align: center;white-space: pre">
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
      <div v-if="tabindex===8">
        <div style="text-align: center;white-space: pre">
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
      <div v-if="tabindex===9">
        <div style="text-align: center;white-space: pre">
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
      <div  v-if="tabindex===10">
       
        <div class="context" style="text-align: center;white-space: pre">
          <img src="../../../static/img/PBI.png" style="height:80px;"  alt="">
          <p style="white-space: pre;font-size: 18px">
            式中：PBi —— 第i类程度的路路⾯面跳⻋车数。 
             ai —— 第i类程度的路路⾯面跳⻋车单位扣分，按表7.4.9的规定取值；
             i —— 路路⾯面跳⻋车程度；
             i0 —— 路路⾯面跳⻋车程度总数，取3。
          </p>
        </div>
        <h4 style="text-align:center">表7.4.9 路路⾯面跳⻋车扣分标准 </h4>
        <el-table
              :data="tableData10"
             :span-method="SpanMethod10"
              border
              style="width: calc(100% - 30px); margin: 15px">
              <el-table-column type="index" width="80px" label="类型（i）"></el-table-column>
              <el-table-column prop="tccd" label="跳车程度"></el-table-column>
              <el-table-column prop="jldw" label="计量单位"></el-table-column>
              <el-table-column prop="dwkf" label="单位扣分"></el-table-column>
 
            </el-table>
      </div>
     <div  v-if="tabindex===11">
 
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
    </div>
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
      tableData11:[{
       jczb:'路路⾯面纵断⾯面⾼高差（Δh） ，cm',
       qd:'>=2,<5',
       md:'>=5,<8',
       zd:'>=8'
     }],
     tableData10:[{
         tccd:'轻',
         jldw:'处',
         dwkf:'0',
     },
     {
         tccd:'中',
         jldw:'25',
 
     },
     {
         tccd:'重',
         jldw:'50',
 
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
      lmshForm: {},
      index: '',
      isadd: false,
      addzb: true,
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
      searchForm: {},
      currentPage: 1,
      tabindex: 0,
      personelForm: {},
      showDetail: false,
      multipleSelection: []
    }
  },
  methods: {
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
    SpanMethod10 ({ row, column, rowIndex, columnIndex }) {
      if(columnIndex ==2 ){
          if(rowIndex==0){
              return [3, 1]
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
    updateFormDia (row, index) {
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.index = index
    },
    showBhFormDia (row) {
      this.showDetail = true
      this.showxq = true
      this.lmshForm = JSON.parse(JSON.stringify(row))
    },
    search () {
      this.showSearch = false
      for (var i = this.tableData.length - 1; i >= 0; i--) {
        if ((this.searchForm.lxcode && this.searchForm.lxcode !== this.tableData[i].lxcode) || (this.searchForm.xcfx && this.searchForm.xcfx !== this.tableData[i].xcfx)) {
          this.tableData.splice(i, 1)
        }
      }
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
    shenhe (row, index) {
      this.$confirm('是否通过审核？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.tableData.splice(0, this.multipleSelection.length)
        this.$message({
          type: 'success',
          message: '审核通过!'
        })
        row.sfsh = '1'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消审核'
        })
      })
    },
    daoru () {
      for (var i = 0; i < 4; i++) {
        this.tableData.push({
          djbh: '234243415',
          famc: '路况评定',
          sjxx: '2018/12/11',
          sjsx: '2018/12/11',
          tbr: '张三',
          tbsj: '2018/12/11',
          tbdw: '甬台温高速',
          tbbm: '技术部',
          bz: '11111',
          sfsh: '0',
          tableData1: []
        })
      }
      this.$message({
        type: 'success',
        message: '导入成功!'
      })
    },
    daochu () {},
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
    getPage (currentPage, pageSize) {
      this.loading = true
      this.$api.requestLkpdLkdcQueryPage('/' + currentPage + '/' + pageSize).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.tableData = resp.data.content
          this.total = resp.data.totalElements
        }
      }).catch(e => {
        this.loading = false
      })
    },
    resetForm () {
      this.showDetail = false
      this.lmshForm = {
        xcfx: '上行'
      }
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
    }
  },
  mounted () {
    // this.getQmldbb()
    // this.search(this.currentPage, this.pageSize)
    this.tableData = []
    for (let i = 0; i < 2; i++) {
      let djbh = 111485300 + i
      this.tableData.push(
        {
          djbh: djbh,
          gcmc: '甬台温公司工程',
          htmc: '甬台温公司合同',
          cbdw: '甬台温公司',
          tbrq: '2018/12'
        }
      )
    }
    // this.getXcRoadOptions()
    this.tableHeight = $('#csgl')[0].offsetHeight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #csgl{
    /*padding: 10px 15px 0 15px;*/
    .cell{
      padding: 0!important;
      .xgqz{
        .el-input__inner{
          border: none!important;
          text-align: center;
        }
      }
    }
    .el-table tr td{
      border-right: 1px solid #f5f7fa!important;
    }
    font-size: 12px;
    height: 100%;
    overflow: auto;
    .header{}
    .conter_table{
      >div{
        height: calc(100% - 48px);
        overflow-y: auto;
        overflow-x: hidden;
      }
      height: calc(100% - 91px);
      min-height: 300px;
      .tab_lable{
        margin-bottom: 10px;
        font-size: 12px;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #f1f4f7;
        padding: 0 15px;
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
