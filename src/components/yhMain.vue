<template>
  <div class="yhpage">
    <div class="charts-top-con" style="width:30%;margin-right:0">
      <div class="header">
        养护维修工程计划
        <div class="block" style="float:right;">
          <el-date-picker v-model="chackdata" type="month" placeholder="2019-01" size ="mini" style="width:95px;" @change="dataChange0"> </el-date-picker>
        </div>
      </div>
      <div class="chart-con">
        <div id="myChart0" style="width:100%;height:100%;"></div>
      </div>
    </div>
    <div class="charts-top-con" style="width:26%;margin-right:0">
      <div class="header">
        养护病害
        <div class="block" style="float:right;">
          <el-date-picker v-model="chackdata" type="year" placeholder="2019" size ="mini" style="width:95px;" @change="dataChange1"> </el-date-picker>
        </div>
      </div>
      <div class="chart-con">
        <div id="myChart1" style="width:100%;height:100%;"></div>
      </div>
    </div>
    <div class="charts-top-con" style="width:40%;">
      <div class="header">
        日常养护统计
        <div class="block" style="float:right;">
          <el-date-picker v-model="chackdata" type="year" placeholder="2019" size ="mini" style="width:95px;" @change="dataChange2"> </el-date-picker>
        </div>
      </div>
      <div class="chart-con" style="position:absolute;padding-left:100px;box-sizing: border-box;">
        <div id="myChart2" style="width:100%;height:100%;"></div>
      </div>
      <div style="position:absolute;top:30%;left:5%;">
        <div class="chart-div" style="top:90px;border-bottom:1px solid #ddd;width:80px;text-align:center;padding:10px;">
          <span style="margin:10px auto;display:inline-block">总时间</span><br/>
          {{totalTime}}h
        </div>
        <div class="chart-div" style="top:180px;border-bottom:1px solid #ddd;width:80px;text-align:center;padding:10px;">
          <span style="margin:10px auto;display:inline-block">总路程</span><br/>
          {{totalDis}}Km
        </div>
        <div class="chart-div" style="top:280px;text-align:center;padding:10px;">
          <span style="margin:10px auto;display:inline-block;">总次数</span><br/>
          {{totalNum}}
        </div>
      </div>
      <div style="position:absolute;top:15%;left:30%;">
        <el-row>
          <el-button size="mini" round @click="changeChart2(item)" v-for="(item,index) in changeChart2Datas" :key="index">{{item.name}}</el-button>
        </el-row>
      </div>
    </div>
    <div class="charts-top-con" style="width:32%;margin-right:0;margin-top:0;height:400px">
      <div class="header">
        巡查统计
        <span style="position:absolute;left:70px;color: #1f262e;font-size:12px">（总次数：<b>{{chart3Datatotal}}次</b>）</span>
        <div class="block" style="float:right;">
          <el-date-picker v-model="chackdata" type="year" placeholder="2019" size ="mini" style="width:95px;" @change="dataChange3"> </el-date-picker>
        </div>
      </div>
      <div class="chart-con" style="">
        <div id="myChart3" style="width:100%;height:100%;"></div>
      </div>

    </div>
    <div class="charts-top-con" style="width:32%;margin-right:0;margin-top:0;height:400px">
      <div class="header">
        沥青路面病害类型统计
        <div class="block" style="float:right;">
          <el-date-picker v-model="chackdata" type="year" placeholder="2019" size ="mini" style="width:95px;" @change="dataChange4"> </el-date-picker>
        </div>
      </div>
      <div class="chart-con">
        <div id="myChart4" style="width:100%;height:100%;"></div>
      </div>
    </div>
    <div class="charts-top-con" style="width:32%;margin-top:0;height:400px">
      <div class="header">
        待办事项
        <span style="position:absolute;left:70px;color: #1f262e;font-size:12px">（数量：<b>21个</b>）</span>
        <span style="position:absolute;right:20px;color: #1f262e;font-size:12px">更多&nbsp;&nbsp;<i class="icon iconfont icon-xialajiantou"></i></span>
      </div>
      <div class="todo-infos">
        <ul>
          <li v-for="(item,index) in infos" :key="index" @click="topath(item.url)" :class="{'flag':!item.flag}" @mouseenter="mouseEnter(index)">
            <span>{{item.info}}</span>
            <span>{{item.date}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      infos: [
        {
          info: '2018年12月度计划申请',
          date: '2018-12-26 12:04:57',
          url: '/rcyhgc-ydsgjhsb',
          flag: true
        },
        {
          info: '2018年12月度施工完成计划',
          date: '2018-12-26 09:24:56',
          url: '/rcyhgc-ydsgjhwcqk',
          flag: true
        },
        {
          info: '桥梁塌陷事件上报',
          date: '2018-12-25 17:26:02',
          flag: false
        },
        {
          info: '标识牌索赔申请书',
          date: '2018-12-25 10:12:27',
          flag: false
        },
        {
          info: '清扫任务单审核',
          date: '2018-12-24 13:57:09',
          flag: false
        },
        {
          info: '工程验收申请单',
          date: '2018-12-23 16:57:09',
          flag: false
        },
        {
          info: '标识牌脱落事件上报',
          date: '2018-12-23 11:50:02',
          flag: false
        },
        {
          info: '护栏损坏事件上报',
          date: '2018-12-23 09:57:15',
          flag: false
        }
      ],
      initChart2Dataindex: 1,
      initChart2Data0: [50, 42, 51, 54, 60, 53, 58, 56, 69, 53, 65, 23],
      initChart2Data1: [40, 42, 41, 34, 40, 63, 47, 36, 59, 53, 45, 33],
      changeChart2Datas: [
        {
          name: '道路巡查',
          data: [54, 49, 55, 60, 58, 54, 64, 52, 59, 62, 60, 63],
          num: ['902', '13.7', '690']
        },
        {
          name: '绿化养护',
          data: [10, 50, 21, 23, 47, 31, 13, 39, 31, 12, 40, 20],
          num: ['789', '10.7', '337']
        },
        {
          name: '日常清扫',
          data: [58, 57, 62, 53, 47, 61, 53, 46, 53, 62, 66, 59],
          num: ['436', '9.7', '677']
        }
      ],
      totalTime: 870,
      totalDis: 19.3,
      totalNum: 534,
      chackdata: '',
      chart3Data: [
        {value: 137, name: '营运巡查'},
        {value: 125, name: '专项巡查'},
        {value: 179, name: '普通巡查'}
      ],
      chart3Datatotal: '441',
      chart4Data: [63, 89, 97, 82, 105, 59, 74, 127, 90]
    }
  },
  mounted () {
    this.createChart0()
    this.createChart1()
    this.createChart2(this.initChart2Data0)
    this.createChart3()
    this.createChart4()
  },
  methods: {
    topath (url) {
      this.$router.push({path: url})
    },
    dataChange0 () {
      this.createChart0()
    },
    dataChange1 () {
      this.createChart1()
    },
    dataChange2 () {
      if (this.initChart2Dataindex === 0) {
        this.createChart2(this.initChart2Data0)
        this.totalTime = 870
        this.totalDis = 19.3
        this.totalNum = 534
        this.initChart2Dataindex = 1
      } else {
        this.createChart2(this.initChart2Data1)
        this.totalTime = 800
        this.totalDis = 12.9
        this.totalNum = 523
        this.initChart2Dataindex = 0
      }
    },
    dataChange3 () {
      this.chart3Data = [
        {value: (137 * Math.random()).toFixed(0), name: '营运巡查'},
        {value: (125 * Math.random()).toFixed(0), name: '专项巡查'},
        {value: (179 * Math.random()).toFixed(0), name: '普通巡查'}
      ]
      this.chart3Datatotal = parseInt(this.chart3Data[0].value) + parseInt(this.chart3Data[1].value) + parseInt(this.chart3Data[2].value)
      this.createChart3()
    },
    dataChange4 () {
      this.chart4Data = [(123 * Math.random()).toFixed(0),
        (89 * Math.random()).toFixed(0), (97 * Math.random()).toFixed(0), (102 * Math.random()).toFixed(0), (105 * Math.random()).toFixed(0), (99 * Math.random()).toFixed(0), (78 * Math.random()).toFixed(0), (137 * Math.random()).toFixed(0), (90 * Math.random()).toFixed(0)
      ]
      this.createChart4()
    },
    createChart0 () {
      let myChart = this.$echarts.init(document.getElementById('myChart0'))
      window.addEventListener('resize', function () {
        myChart.resize()
      })
      // 绘制图表
      myChart.setOption({
        color: ['#59a0c9', '#cccccc'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{a} <br/>{b} : {c}万元'
        },
        legend: {
        },
        grid: {
          top: '15%',
          bottom: '12%',
          right: '7%',
          left: '7%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['路基工程', '路面工程', '桥梁隧道工程', '交通附属设施', '绿化'],
          'axisLabel': {
            interval: 0,
            rotate: -30
          }
        },
        yAxis: {
          type: 'value',
          name: '万元'
        },
        series: [
          {
            name: '计划工程量',
            type: 'bar',
            stack: '总量',
            barWidth: 20,
            label: {
              normal: {
                // show: true,
                //   position: 'insideRight'
              }
            },
            data: [(33 * Math.random()).toFixed(0), (40 * Math.random()).toFixed(0), (36 * Math.random()).toFixed(0), (15 * Math.random()).toFixed(0), (56 * Math.random()).toFixed(0)]
          }
        ]
      })
    },
    createChart1 () {
      let myChart = this.$echarts.init(document.getElementById('myChart1'))
      window.addEventListener('resize', function () {
        myChart.resize()
      })
      // 绘制图表
      myChart.setOption({
        color: ['#f5b780', '#5cd595', '#59a0c9', '#dddddd', '#39b7bc'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}个 ({d}%)'
        },
        legend: {
          left: '7%',
          right: '7%',
          top: '5%',
          data: ['绿化', '交安', '桥涵', '路基', '其他'],
          itemGap: 15,
          itemWidth: 20,
          itemHeight: 12
        },
        series: [
          {
            name: '养护病害',
            type: 'pie',
            radius: '55%',
            center: ['50%', '58%'],
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {show: false}
            },
            data: [
              {value: (100 * Math.random()).toFixed(0), name: '绿化'},
              {value: (100 * Math.random()).toFixed(0), name: '交安'},
              {value: (100 * Math.random()).toFixed(0), name: '桥涵'},
              {value: (100 * Math.random()).toFixed(0), name: '路基'},
              {value: (100 * Math.random()).toFixed(0), name: '其他'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    createChart2 (data) {
      let myChart = this.$echarts.init(document.getElementById('myChart2'))
      window.addEventListener('resize', function () {
        myChart.resize()
      })
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          },
          formatter: '{b}:{c}次'
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        grid: {
          top: '28%',
          bottom: '10%',
          right: '7%',
          left: '5%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          interval: 20,
          max: 80,
          name: '(次)'
        },
        series: [{
          data: data,
          type: 'line',
          // smooth: true,
          lineStyle: {
            normal: {
              color: '#fff',
              opacity: 0
            }
          },
          areaStyle: {
            normal: {
              color: '#59a0c9',
              opacity: 1
            }
          }
        }]
      })
    },
    createChart3 () {
      let myChart = this.$echarts.init(document.getElementById('myChart3'))
      window.addEventListener('resize', function () {
        myChart.resize()
      })
      // 绘制图表
      myChart.setOption({
        color: ['#59a0c9', '#f5b780', '#5cd595'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}次 ({d}%)'
        },
        grid: {
          top: '5%',
          bottom: '5%',
          right: '5%',
          left: '5%',
          containLabel: true
        },
        legend: {
          x: 'center',
          y: 'bottom',
          padding: 40,
          itemGap: 15,
          itemWidth: 20,
          itemHeight: 12,
          data: ['普通巡查', '专项巡查', '营运巡查']
        },
        calculable: true,
        series: [
          {
            name: '巡查统计',
            type: 'pie',
            radius: [20, 85],
            center: ['50%', '40%'],
            roseType: 'radius',
            calculable: true,
            label: {
              normal: {
                show: true,
                formatter: '{c}次({d}%)'
              },
              emphasis: {
                show: true
              }
            },
            lableLine: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: this.chart3Data
          }
        ]
      })
    },
    createChart4 () {
      let myChart = this.$echarts.init(document.getElementById('myChart4'))
      window.addEventListener('resize', function () {
        myChart.resize()
      })
      // 绘制图表
      myChart.setOption({
        color: ['#59a0c9', '#f5b780', '#5cd595'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{a} <br/>{b} : {c}个'
        },
        grid: {
          top: '15%',
          bottom: '15%',
          right: '10%',
          left: '7%',
          containLabel: true
        },
        //   calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['泛油', '坑槽', '车辙', '龟裂', '块状裂缝', '纵向裂缝', '松散', '沉陷', '波浪拥包'],
            axisLabel: {
              interval: 0,
              rotate: -30
            }
          }
        ],
        yAxis: {
          type: 'value',
          name: '(个)',
          interval: 30,
          max: 150
        },
        series: [
          {
            name: '病害类型数量',
            type: 'bar',
            barWidth: 20, // 柱图宽度
            //   barGap: 0,
            data: this.chart4Data
          }
        ]
      })
    },
    changeChart2 (item) {
      this.createChart2(item.data)
      this.totalTime = item.num[0]
      this.totalDis = item.num[1]
      this.totalNum = item.num[2]
    }
  }
}
</script>

<style scoped>
  .yhpage {
    height: 100%;
    overflow-y:auto;
  }
  .charts-top-con{
    background: #fff;
    float:left;
    margin:1%;
    height:380px;
    border-radius: 4px 4px 0px 0px;
    box-shadow: 0px 4px 10px 0px
    rgba(31, 38, 46, 0.08);
    position:relative;
  }
  .header{
    width: 100%;
    height: 40px;
    background-color: #d5e1ea;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #1f262e;
    line-height: 40px;
    position:relative;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .header span{
    font-size:12px;
  }
  .charts-top-con .charts-con{
    height: 390px;
    width:25%;
    border-right:1px solid #ddd;
  }
  .chart-con{
    position:relative;
    width: 100%;
    height: 90%;
    box-sizing: border-box;
  }
  .todo-con{
    margin-top: 12px;
    margin-left:5%
  }
  .todo-list{
    position:relative;
    margin:7px 5px;
    width:60px;
    height:84px;
    text-align: center;
    display: inline-block;
  }
  .todo-list div:first-child{
    width:58px;
    height:58px;
  }
  .todo-list div:last-child{
    font-family: 'SimSun';
    font-size: 12px;
    color:#1f262e;
  }
  .todo-list span{
    position: absolute;
    top: 20px;
    font-size: 12px;
    right: 27px;
  }
  .todo-infos ul{
    width:100%;
    padding: 2% 5%;
    box-sizing: border-box;
  }
  .todo-infos ul li{
    position:relative;
    height:36px;
    line-height: 36px;
    border-bottom: 1px solid #eee;
    text-indent:10px;
  }
  .libackg {
    background-color: #eee;
  }
  .todo-infos ul li:last-child{
    border:0
  }
  .todo-infos ul li::before{
    content:"";
    position:absolute;
    display:inline-block;
    width:4px;
    height:4px;
    border-radius: 50%;
    background:#fe715b;
    top:16px;
    left:0;
  }
  .todo-infos ul li.flag::before{
    background: #7a86ff;
  }
  .todo-infos ul li span{
    float: left;
    font-family: "SimSun";
    font-size: 12px;
    color: #4e5258
  }
  .todo-infos ul li span:last-child{
    float: right;
  }
</style>
