<template>
  <div style="height:1500px !important">
    <div class="charts-top-con">
      <div class="header">
        资产类
        <el-dropdown trigger="click" style="position:absolute;right:140px;color: #1f262e;" @command="assetsCommand">
          <span class="el-dropdown-link">
           {{aCompany}} <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="全部项目公司">全部项目公司</el-dropdown-item>
            <el-dropdown-item command="北仑港高速">北仑港高速</el-dropdown-item>
            <el-dropdown-item command="九瑞高速">九瑞高速</el-dropdown-item>
            <el-dropdown-item command="桂林公司">桂林公司</el-dropdown-item>
            <el-dropdown-item command="京津塘高速">京津塘高速</el-dropdown-item>
            <el-dropdown-item command="贵黄公路">贵黄公路</el-dropdown-item>
            <el-dropdown-item command="鄂东大桥">鄂东大桥</el-dropdown-item>
            <el-dropdown-item command="重庆沪渝">重庆沪渝</el-dropdown-item>
            <el-dropdown-item command="重庆渝黔">重庆渝黔</el-dropdown-item>
            <el-dropdown-item command="毫阜高速">毫阜高速</el-dropdown-item>
            <el-dropdown-item command="甬台温高速">甬台温高速</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-date-picker style="position:absolute;right:16px;color: #1f262e; width:110px;top: -1px;"
                        @change="assetsChange"
                        v-model="assetsDate"
                        type="year"
                        format="yyyy年"
                        placeholder="选择年"
        >
        </el-date-picker>
        <!-- <span style="position:absolute;right:100px;color: #1f262e;">
          全部项目公司&nbsp;&nbsp;<i class="icon iconfont icon-xialajiantou"></i></span>
        <span style="position:absolute;right:20px;color: #1f262e;">2018&nbsp;&nbsp;<i class="icon iconfont icon-xialajiantou"></i></span> -->
      </div>
      <div class="charts-con">
        <div class="chart-title">
          今日收入
        </div>
        <div class="chart-info">
          8921.31<span style="font-size:16px;">万元</span>
        </div>
        <div class="chart-span">
        </div>
        <div style="width:90%;margin:0 auto;">
          <div id="myChart0" style="width:100%;height:250px"></div>
        </div>
      </div>
      <div class="charts-con">
        <div class="chart-title">
          交通流量统计
        </div>
        <div style="width:90%;margin:0 auto;">
          <div id="myChart1" style="width:100%;height:320px"></div>
        </div>
      </div>
      <div class="charts-con">
        <div class="chart-title">
          合同概况
        </div>
        <div class="chart-info">
          {{assets2}}<span style="font-size:16px;">万元</span>
        </div>
        <div class="chart-span">
          合同总额
        </div>
        <div style="width:90%;margin:0 auto;">
          <div id="myChart2" style="width:100%;height:250px"></div>
        </div>
      </div>
      <div class="charts-con">
        <div class="chart-title">
          收支情况<span></span>
        </div>
        <div style="width:90%;margin:0 auto;">
          <div id="myChart3" style="width:100%; height:320px"></div>
        </div>
      </div>
    </div>
    <div class="bottom-left">
      <div class="header">
        养护类
        <el-dropdown trigger="click" style="position:absolute;right:140px;color: #1f262e;" @command="maintainanceCommand">
          <span class="el-dropdown-link">
           {{mCompany}} <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="全部项目公司">全部项目公司</el-dropdown-item>
            <el-dropdown-item command="北仑港高速">北仑港高速</el-dropdown-item>
            <el-dropdown-item command="九瑞高速">九瑞高速</el-dropdown-item>
            <el-dropdown-item command="桂林公司">桂林公司</el-dropdown-item>
            <el-dropdown-item command="京津塘高速">京津塘高速</el-dropdown-item>
            <el-dropdown-item command="贵黄公路">贵黄公路</el-dropdown-item>
            <el-dropdown-item command="鄂东大桥">鄂东大桥</el-dropdown-item>
            <el-dropdown-item command="重庆沪渝">重庆沪渝</el-dropdown-item>
            <el-dropdown-item command="重庆渝黔">重庆渝黔</el-dropdown-item>
            <el-dropdown-item command="毫阜高速">毫阜高速</el-dropdown-item>
            <el-dropdown-item command="甬台温高速">甬台温高速</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-date-picker style="position:absolute;right:15px;color: #1f262e; width:110px;top:-1px;"
                        @change="maintainanceChange"
                        v-model="maintainanceDate"
                        type="year"
                        placeholder="选择年"
                        format="yyyy年"
        >
        </el-date-picker>
        <!-- <span style="position:absolute;right:100px;color: #1f262e;">全部项目公司&nbsp;&nbsp;<i class="icon iconfont icon-xialajiantou"></i></span>
        <span style="position:absolute;right:20px;color: #1f262e;">2018&nbsp;&nbsp;<i class="icon iconfont icon-xialajiantou"></i></span> -->
      </div>
      <div class="charts-con" style="height:303px;width:50%;border-right:1px solid #ddd" v-show="isAll">
        <div class="chart-title">
          路况评定
          <span style="position:absolute;left:100px;color: #7a7e88;">(总里程：<b style="color:#000">898.72公里</b>)</span>
        </div>
        <div style="margin-left:15px;">
          <div id="myChart4"  style="width:100%; height:250px"></div>
        </div>
      </div>
      <div  class="charts-con" style="height:303px;width:50%;border-right:1px solid #ddd" v-show="!isAll">
        <div class="chart-title">
          路况评定
          <span style="position:absolute;left:100px;color: #7a7e88;">({{spanTitle}}总里程：<b style="color:#000">{{totalNum.total}}公里</b>)</span>
        </div>
        <div class="process-con">
          <div class="process">
            <span>优等</span>
            <el-progress :percentage="totalNum.ap" color="rgb(0,98,155)" :show-text='isShowData'></el-progress>
            <span>{{totalNum.a}}公里</span>
          </div>
          <div class="process">
            <span>良</span>
            <el-progress :percentage="totalNum.bp" color="rgb(0,98,155)" :show-text='isShowData'></el-progress>
            <span>{{totalNum.b}}公里</span>
          </div>
          <div class="process">
            <span>中</span>
            <el-progress :percentage="totalNum.cp" color="rgb(0,98,155)" :show-text='isShowData'></el-progress>
            <span>{{totalNum.c}}公里</span>
          </div>
          <div class="process">
            <span>差</span>
            <el-progress :percentage="totalNum.dp" color="rgb(0,98,155)" :show-text='isShowData'></el-progress>
            <span>{{totalNum.d}}公里</span>
          </div>
        </div>

      </div>
      <div class="charts-con" style="height:303px;width:50%">
        <div class="chart-title">
          养护工程统计
        </div>
        <div style="margin-left:15px;">
          <div id="myChart5" style="width:100%; height:250px"></div>
        </div>
      </div>
    </div>
    <div class="bottom-right">
      <div class="header">
        待办事项
        <span style="position:absolute;left:70px;color: #7a7e88;">(数量：<b style="color:#000">21个</b>)</span>
        <span style="position:absolute;right:20px;color: #1f262e;">更多&nbsp;&nbsp;<i class="icon iconfont icon-gengduojiantou"></i></span>
      </div>
      <div class="todo-con">
        <div class="todo-list">
          <div style="transform:rotate(300deg);">
            <el-progress type="circle" status="text" :percentage="15" color="rgb(254,113,91)" :width="58"></el-progress>
          </div>
          <div>
            计划管理
          </div>
          <span>
                2
            </span>
        </div
        ><div class="todo-list">
        <div style="transform:rotate(280deg);">
          <el-progress type="circle" status="text" :percentage="20" color="rgb(249,186,76)" :width="58"></el-progress>
        </div>
        <div style="">
          采购管理
        </div>
        <span>
                3
            </span>
      </div
      ><div class="todo-list">
        <div style="transform:rotate(300deg);">
          <el-progress type="circle" status="text" :percentage="0" color="rgb(254,113,91)" :width="58"></el-progress>
        </div>
        <div style="">
          合同管理
        </div>
        <span>
                0
            </span>
      </div
      ><div class="todo-list">
        <div style="transform:rotate(245deg);">
          <el-progress type="circle" status="text" :percentage="30" color="rgb(118,184,253)" :width="58"></el-progress>
        </div>
        <div>
          支付管理
        </div>
        <span>
                5
            </span>
      </div
      ><div class="todo-list">
        <div style="transform:rotate(245deg);">
          <el-progress type="circle" status="text" :percentage="30" color="rgb(50,136,243)" :width="58"></el-progress>
        </div>
        <div style="">
          资产管理
        </div>
        <span>
                5
            </span>
      </div
      ><div class="todo-list">
        <div style="transform:rotate(230deg);">
          <el-progress type="circle" status="text" :percentage="35" color="rgb(122,134,255)" :width="58"></el-progress>
        </div>
        <div style="">
          养护管理
        </div>
        <span>
                6
            </span>
      </div>
      </div>
      <div class="todo-infos">
        <ul>
          <li v-for="(item,index) in infos" :key="index" :class="{'flag':!item.flag}">
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
      mychart0: null,
      mychart1: null,
      mychart2: null,
      mychart3: null,
      mychart4: null,
      mychart5: null,
      isAll: true,
      isShowData: false,
      spanTitle: '',
      totalNum: {},
      assetsDate: '2018',
      maintainanceDate: '2018',
      assets1: '12,129,122.00',
      assets2: '25,128,784.00',
      aCompany: '全部项目公司',
      mCompany: '全部项目公司',
      infos: [
        {
          info: '2019年度总工程计划申请',
          date: '2018-12-26 12:04:57',
          flag: true
        },
        {
          info: '计划管理申请单',
          date: '2018-12-26 09:24:56',
          flag: true
        },
        {
          info: '项目编号0012的《工程结算书申请表》',
          date: '2018-12-26 09:24:56',
          flag: false
        },
        {
          info: '2018年11月《月度施工总计划申请表》',
          date: '2018-12-25 10:12:27',
          flag: false
        },
        {
          info: '履约检查申请',
          date: '2018-12-24 16:57:09',
          flag: false
        }
      ]
    }
  },
  mounted () {
    this.creatChart0()
    this.creatChart1()
    this.creatChart2()
    this.creatChart3()
    this.creatChart4()
    this.creatChart5()
    var _this = this
    $(window).trigger('resize')
    window.onresize = function () {
      if (_this.mychart0) {
        _this.mychart0.resize()
        _this.mychart1.resize()
        _this.mychart2.resize()
        _this.mychart3.resize()
        _this.mychart4.resize()
        _this.mychart5.resize()
      }
    }
  },
  methods: {
    assetsCommand (command) {
      this.aCompany = command
      if (command === '全部项目公司') {
        this.creatChart0()
        this.creatChart1()
        this.creatChart2()
        this.creatChart3()
      } else {
        this.creatChart0('data')
        this.creatChart1('data')
        this.creatChart2('data')
        this.creatChart3('data')
      }
    },
    maintainanceCommand (command) {
      if (command === '全部项目公司') {
        // this.creatChart1()
        this.isAll = true
        this.creatChart4()
        // this.creatChart3()
        this.creatChart5()
      } else {
        this.isAll = false
        this.spanTitle = command
        this.creatChart5('data')
        switch (command) {
          case '甬台温高速':
            this.totalNum.total = 140.172
            this.totalNum.a = 99
            this.totalNum.b = 34
            this.totalNum.c = 5.06
            this.totalNum.d = 2.11
            this.totalNum.ap = 90
            this.totalNum.bp = 10
            this.totalNum.cp = 5
            this.totalNum.dp = 1
            break
          case '北仑港高速':
            this.totalNum.total = 51.426
            this.totalNum.a = 31.4
            this.totalNum.b = 10.02
            this.totalNum.c = 8.003
            this.totalNum.d = 2.003
            this.totalNum.ap = 80
            this.totalNum.bp = 15
            this.totalNum.cp = 8
            this.totalNum.dp = 5
            break
          case '九瑞高速':
            this.totalNum.total = 48.14
            this.totalNum.a = 28.6
            this.totalNum.b = 11
            this.totalNum.c = 7.5
            this.totalNum.d = 1.04
            this.totalNum.ap = 82
            this.totalNum.bp = 11
            this.totalNum.cp = 9
            this.totalNum.dp = 2
            break
          case '桂林公司':
            this.totalNum.total = 201.28
            this.totalNum.a = 150.2
            this.totalNum.b = 31.08
            this.totalNum.c = 18
            this.totalNum.d = 2
            this.totalNum.ap = 91
            this.totalNum.bp = 13
            this.totalNum.cp = 6
            this.totalNum.dp = 3
            break
          case '京津塘高速':
            this.totalNum.total = 142.69
            this.totalNum.a = 109.4
            this.totalNum.b = 25.29
            this.totalNum.c = 6
            this.totalNum.d = 2
            this.totalNum.ap = 80
            this.totalNum.bp = 15
            this.totalNum.cp = 8
            this.totalNum.dp = 5
            break
          case '贵黄公路':
            this.totalNum.total = 25.24
            this.totalNum.a = 16
            this.totalNum.b = 6
            this.totalNum.c = 2.9
            this.totalNum.d = 0.34
            this.totalNum.ap = 92
            this.totalNum.bp = 11
            this.totalNum.cp = 4
            this.totalNum.dp = 1
            break
          case '鄂东大桥':
            this.totalNum.total = 15.15
            this.totalNum.a = 8
            this.totalNum.b = 4
            this.totalNum.c = 2.5
            this.totalNum.d = 0.65
            this.totalNum.ap = 89
            this.totalNum.bp = 12
            this.totalNum.cp = 8
            this.totalNum.dp = 3
            break
          case '重庆沪渝':
            this.totalNum.total = 83.325
            this.totalNum.a = 68.3
            this.totalNum.b = 10.02
            this.totalNum.c = 4.005
            this.totalNum.d = 1
            this.totalNum.ap = 80
            this.totalNum.bp = 12
            this.totalNum.cp = 6
            this.totalNum.dp = 4
            break
          case '重庆渝黔':
            this.totalNum.total = 90
            this.totalNum.a = 70
            this.totalNum.b = 11
            this.totalNum.c = 7
            this.totalNum.d = 2
            this.totalNum.ap = 82
            this.totalNum.bp = 13
            this.totalNum.cp = 8
            this.totalNum.dp = 5
            break
          case '毫阜高速':
            this.totalNum.total = 101.3
            this.totalNum.a = 84
            this.totalNum.b = 14
            this.totalNum.c = 2.3
            this.totalNum.d = 1
            this.totalNum.ap = 81
            this.totalNum.bp = 13
            this.totalNum.cp = 7
            this.totalNum.dp = 4
            break
          default:
            break
        }
      }
      this.mCompany = command
    },
    assetsChange () {
      if (this.assetsDate) {
        if (this.aCompany === '全部项目公司') {
          this.creatChart0()
          this.creatChart1('adata')
          this.creatChart2()
          this.creatChart3('adata')
        } else {
          this.creatChart0('data')
          this.creatChart1('adata')
          this.creatChart2('data')
          this.creatChart3('adata')
        }
      }
    },
    maintainanceChange () {
      if (this.mCompany === '全部项目公司') {
        this.creatChart4()
        this.creatChart5()
      } else {
        this.creatChart4()
        this.creatChart5('data')
      }
    },
    creatChart0 (data) {
      let myChart = this.$echarts.init(document.getElementById('myChart0'))
      let n0 = ''
      let n1 = ''
      let n2 = ''
      let n3 = ''
      let n4 = ''
      let n5 = ''
      if (data === undefined) {
        n0 = parseFloat((1067 + 100 * Math.random()).toFixed(2))
        n1 = parseFloat((913 + 130 * Math.random()).toFixed(2))
        n2 = parseFloat((977 + 30 * Math.random()).toFixed(2))
        n3 = parseFloat((910 + 30 * Math.random()).toFixed(2))
        n4 = parseFloat((1032 + 80 * Math.random()).toFixed(2))
        n5 = parseFloat((804 + 189 * Math.random()).toFixed(2))
        let total = (n0 + n1 + n2 + n3 + n4 + n5).toFixed(2)
        this.assets1 = total.substring(0, 2) + ',' + total.substring(2, 5) + ',' + total.substring(5)
      } else {
        n0 = parseFloat((835000 + 100 * Math.random()).toFixed(2))
        n1 = parseFloat((310000 + 130 * Math.random()).toFixed(2))
        n2 = parseFloat((234000 + 300 * Math.random()).toFixed(2))
        n3 = parseFloat((135000 + 30 * Math.random()).toFixed(2))
        n4 = parseFloat((70000 + 80 * Math.random()).toFixed(2))
        n5 = parseFloat((70000 + 189 * Math.random()).toFixed(2))
        let total = (n0 + n1 + n2 + n3 + n4 + n5).toFixed(2)
        this.assets1 = total.substring(0, 1) + ',' + total.substring(1, 4) + ',' + total.substring(4)
      }
      // 绘制图表
      let option = {
        tooltip: {
          formatter: '{b}:{a}{c}万元（{d}%）'
        },
        grid: {
          left: '5%', // 与容器左侧的距离
          right: '5%' // 与容器右侧的距离
          // top: '5%',   // 与容器顶部的距离
          // bottom: '5%', // 与容器底部的距离
        },
        legend: {
          orient: 'horizontal',
          y: 'bottom',
          padding: 0,
          itemGap: 15,
          itemWidth: 12,
          itemHeight: 12,
          tooltip: {
            show: true
          },
          data: ['甬台温高速', '北仑港高速', '九瑞高速', '桂林高速', '京津塘高速', '贵黄公路', '鄂东大桥', '重庆沪渝', '重庆渝黔', '毫阜高速']
        },
        color: ['rgb(136,159,255)', 'rgb(143,199,246)', 'rgb(248,209,54)', 'rgb(1436,219,189)', 'rgb(220,221,225)', '#FE725B', '#00629B', '#37D07D', '#00FFFF', '#FF00FF'],
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['55%', '70%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                formatter: '{c}万元',
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: n0, name: '甬台温高速'},
              {value: n1, name: '北仑港高速'},
              {value: n2, name: '九瑞高速'},
              {value: n3, name: '桂林高速'},
              {value: n4, name: '京津塘高速'},
              {value: n5, name: '贵黄公路'},
              {value: n5, name: '鄂东大桥'},
              {value: n5, name: '重庆沪渝'},
              {value: n5, name: '重庆沪黔'},
              {value: n5, name: '毫阜高速'}
            ]
          }
        ]
      }
      myChart.setOption(option)
      this.mychart0 = myChart
    },
    creatChart1 (data) {
      let myChart = this.$echarts.init(document.getElementById('myChart1'))
      // 绘制图表
      let xdata = []
      let data1 = []
      let data2 = []
      let interval = 0
      if (data === undefined) {
        xdata = ['0-5', '6-8', '9-10', '11-12', '13-14', '15-16', '17-18', '19-20', '21-24']
        data1 = [5.4, 10.03, 16.22, 14.32, 13.09, 14.13, 15.91, 13.08, 5.84]
        data2 = [5.5, 10.02, 15.85, 15.72, 13.23, 14.41, 16.05, 14.17, 6.63]
        interval = 2000
      } else if (data === 'data') {
        xdata = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        data1 = [(191 + 12 * Math.random()).toFixed(2), (202 + 12 * Math.random()).toFixed(2), (201 + 12 * Math.random()).toFixed(2), (194 + 12 * Math.random()).toFixed(2), (201 + 12 * Math.random()).toFixed(2), (193 + 12 * Math.random()).toFixed(2), (200 + 16 * Math.random()).toFixed(2), (189 + 12 * Math.random()).toFixed(2), (200 + 12 * Math.random()).toFixed(2), (200 + 12 * Math.random()).toFixed(2), (209 + 12 * Math.random()).toFixed(2), (193 + 12 * Math.random()).toFixed(2)]
        data2 = [(160 + 12 * Math.random()).toFixed(2), (190 + 12 * Math.random()).toFixed(2), (181 + 12 * Math.random()).toFixed(2), (168 + 12 * Math.random()).toFixed(2), (190 + 12 * Math.random()).toFixed(2), (190 + 12 * Math.random()).toFixed(2), (193 + 12 * Math.random()).toFixed(2), (170 + 12 * Math.random()).toFixed(2), (190 + 12 * Math.random()).toFixed(2), (189 + 12 * Math.random()).toFixed(2), (180 + 12 * Math.random()).toFixed(2), (190 + 12 * Math.random()).toFixed(2)]
        interval = 50
      } else {
        xdata = ['甬台温高速', '北仑港高速', '九瑞高速', '桂林公司', '京津塘高速', '贵黄公路', '鄂东大桥', '重庆沪渝', '重庆渝黔', '毫阜高速']
        data1 = [(9000 + 1200 * Math.random()).toFixed(2), (10200 + 1200 * Math.random()).toFixed(2), (9090 + 1200 * Math.random()).toFixed(2), (9900 + 1200 * Math.random()).toFixed(2), (11000 + 1200 * Math.random()).toFixed(2), (11000 + 1200 * Math.random()).toFixed(2), (10000 + 1200 * Math.random()).toFixed(2), (10100 + 1200 * Math.random()).toFixed(2), (10000 + 1200 * Math.random()).toFixed(2), (10000 + 1200 * Math.random()).toFixed(2)]
        data2 = [(8100 + 1200 * Math.random()).toFixed(2), (7080 + 1200 * Math.random()).toFixed(2), (8100 + 1200 * Math.random()).toFixed(2), (8770 + 1200 * Math.random()).toFixed(2), (10100 + 1200 * Math.random()).toFixed(2), (9330 + 1200 * Math.random()).toFixed(2), (9390 + 1200 * Math.random()).toFixed(2), (8970 + 1200 * Math.random()).toFixed(2), (9021 + 1200 * Math.random()).toFixed(2), (8930 + 1200 * Math.random()).toFixed(2)]
        interval = 2000
      }
      myChart.setOption({
        title: {},
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let result = params[0].name + '</br>'
            params.forEach(function (item) {
              result += item.marker + ' ' + item.seriesName + ' : ' + item.value + '万辆' + '</br>'
            })
            return result
          }
        },
        legend: {
          data: ['今天', '昨天'],
          right: '4%'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: xdata
        },
        yAxis: {
          type: 'value',
          name: '(万辆)',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '今天',
            type: 'line',
            data: data1,
            symbol: 'circle', // 折线点设置为实心点
            symbolSize: 10, // 折线点的大小
            itemStyle: {
              normal: {
                color: 'rgb(0,94,154)', // 折线点的颜色
                lineStyle: {
                  color: 'rgb(0,94,154)'// 折线的颜色
                }
              }
            }
          },
          {
            name: '昨天',
            type: 'line',
            data: data2,
            symbol: 'circle', // 折线点设置为实心点
            symbolSize: 10, // 折线点的大小
            itemStyle: {
              normal: {
                color: 'rgb(117,184,254)', // 折线点的颜色
                lineStyle: {
                  color: 'rgb(117,184,254)' // 折线的颜色
                }
              }
            }
          }
        ]
      })
      this.mychart1 = myChart
    },
    creatChart2 (data) {
      let myChart = this.$echarts.init(document.getElementById('myChart2'))
      let n0 = ''
      let n1 = ''
      let n2 = ''
      let n3 = ''
      let n4 = ''
      if (data === undefined) {
        n0 = parseFloat((10400 + 100 * Math.random()).toFixed(2))
        n1 = parseFloat((10300 + 100 * Math.random()).toFixed(2))
        n2 = parseFloat((7800 + 100 * Math.random()).toFixed(2))
        n3 = parseFloat((11200 + 100 * Math.random()).toFixed(2))
        n4 = parseFloat((6800 + 100 * Math.random()).toFixed(2))
        let total = (n0 + n1 + n2 + n3 + n4).toFixed(2)
        this.assets2 = total.substring(0, 2) + ',' + total.substring(2)
      } else {
        n0 = parseFloat((1040 + 100 * Math.random()).toFixed(2))
        n1 = parseFloat((1030 + 100 * Math.random()).toFixed(2))
        n2 = parseFloat((780 + 100 * Math.random()).toFixed(2))
        n3 = parseFloat((1120 + 100 * Math.random()).toFixed(2))
        n4 = parseFloat((680 + 100 * Math.random()).toFixed(2))
        let total = (n0 + n1 + n2 + n3 + n4).toFixed(2)
        this.assets2 = total.substring(0, 1) + ',' + total.substring(1)
      }
      // 绘制图表
      myChart.setOption({
        color: ['rgb(254,114,91)', 'rgb(251,182,63)', 'rgb(55,208,125)', 'rgb(0,98,155)'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}万元({d}%)'
        },
        legend: {
          x: 'center',
          y: 'bottom',
          padding: 0,
          itemGap: 15,
          itemWidth: 12,
          itemHeight: 12,
          data: ['采购类', '销售类', '建设项目类', '租赁类', '劳动关系类']
        },
        calculable: true,
        series: [
          {
            name: '合同金额',
            type: 'pie',
            radius: [20, 80],
            center: ['55%', '40%'],
            roseType: 'radius',
            calculable: true,
            label: {
              normal: {
                show: false
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
            data: [
              {value: n0, name: '采购类'},
              {value: n1, name: '销售类'},
              {value: n2, name: '建设项目类'},
              {value: n3, name: '租赁类'},
              {value: n4, name: '劳动关系类'}
            ]
          }
        ]
      })
      this.mychart2 = myChart
    },
    creatChart3 (data) {
      let myChart = this.$echarts.init(document.getElementById('myChart3'))
      // 绘制图表
      let xdata = []
      let data1 = []
      let data2 = []
      let interval = 0
      if (data === undefined) {
        xdata = ['甬台温高速', '北仑港高速', '九瑞高速', '桂林公司', '京津塘高速', '贵黄公路', '鄂东大桥', '重庆沪渝', '重庆渝黔', '毫阜高速']
        data1 = [1340.01, 1650.12, 1600.32, 1490.43, 1470.21, 1530.32, 1620.08, 1680.43, 1520.87, 1560.89]
        data2 = [1040.02, 1170.21, 1070.13, 1150.65, 1180.23, 1050.53, 1170.21, 1020.27, 1120.45, 1070.04]
        interval = 200
      } else if (data === 'data') {
        xdata = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        data1 = [(110 + 12 * Math.random()).toFixed(2), (112 + 12 * Math.random()).toFixed(2), (101 + 12 * Math.random()).toFixed(2), (114 + 12 * Math.random()).toFixed(2), (120 + 12 * Math.random()).toFixed(2), (102 + 12 * Math.random()).toFixed(2), (110 + 12 * Math.random()).toFixed(2), (120 + 12 * Math.random()).toFixed(2), (110 + 12 * Math.random()).toFixed(2), (110 + 12 * Math.random()).toFixed(2), (120 + 12 * Math.random()).toFixed(2), (119 + 12 * Math.random()).toFixed(2)]
        data2 = [(91 + 10 * Math.random()).toFixed(2), (90 + 10 * Math.random()).toFixed(2), (81 + 10 * Math.random()).toFixed(2), (98 + 10 * Math.random()).toFixed(2), (101 + 10 * Math.random()).toFixed(2), (93 + 10 * Math.random()).toFixed(2), (93 + 10 * Math.random()).toFixed(2), (89 + 10 * Math.random()).toFixed(2), (99 + 10 * Math.random()).toFixed(2), (90 + 10 * Math.random()).toFixed(2), (80 + 10 * Math.random()).toFixed(2), (100 + 10 * Math.random()).toFixed(2)]
        interval = 20
      } else {
        xdata = ['甬台温高速', '北仑港高速', '九瑞高速', '桂林公司', '京津塘高速', '贵黄公路', '鄂东大桥', '重庆沪渝', '重庆渝黔', '毫阜高速']
        data1 = [(1300 + 12 * Math.random()).toFixed(2), (1420 + 12 * Math.random()).toFixed(2), (1410 + 12 * Math.random()).toFixed(2), (1140 + 12 * Math.random()).toFixed(2), (1200 + 12 * Math.random()).toFixed(2), (1200 + 12 * Math.random()).toFixed(2), (1100 + 12 * Math.random()).toFixed(2), (1100 + 12 * Math.random()).toFixed(2), (1200 + 12 * Math.random()).toFixed(2), (1190 + 12 * Math.random()).toFixed(2)]
        data2 = [(910 + 10 * Math.random()).toFixed(2), (900 + 10 * Math.random()).toFixed(2), (1010 + 10 * Math.random()).toFixed(2), (980 + 10 * Math.random()).toFixed(2), (930 + 10 * Math.random()).toFixed(2), (890 + 10 * Math.random()).toFixed(2), (909 + 10 * Math.random()).toFixed(2), (900 + 10 * Math.random()).toFixed(2), (800 + 10 * Math.random()).toFixed(2), (1000 + 10 * Math.random()).toFixed(2)]
        interval = 200
      }
      myChart.setOption({
        color: ['rgb(0,98,155)', 'rgb(177,184,254)'],
        title: {},
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let result = params[0].name + '</br>'
            params.forEach(function (item) {
              result += item.marker + ' ' + item.seriesName + ' : ' + item.value + '万元' + '</br>'
            })
            return result
          }
        },
        legend: {
          data: ['收入', '支出'],
          right: '4%'
        },
        grid: {
          //   left: '8%',
          //   right: '0%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            formatter: function (value) {
              if (value.indexOf('月') >= 0) {
                return value.split('月').join('\n') + '月'
              }
              return value.split('').join('\n')
            }
          },
          boundaryGap: true,
          data: xdata
        },
        yAxis: {
          type: 'value',
          name: '(万元)',
          interval: interval
        },
        series: [
          {
            name: '收入',
            type: 'bar',
            data: data1,
            symbol: 'circle', // 折线点设置为实心点
            symbolSize: 10, // 折线点的大小
            itemStyle: {
              normal: {
                color: 'rgb(0,94,154)', // 折线点的颜色
                lineStyle: {
                  color: 'rgb(0,94,154)'// 折线的颜色
                }
              }
            }
          },
          {
            name: '支出',
            type: 'bar',
            data: data2,
            symbol: 'circle', // 折线点设置为实心点
            symbolSize: 10, // 折线点的大小
            itemStyle: {
              normal: {
                color: 'rgb(117,184,254)', // 折线点的颜色
                lineStyle: {
                  color: 'rgb(117,184,254)' // 折线的颜色
                }
              }
            }
          }
        ]
      })
      this.mychart3 = myChart
    },
    creatChart4 () {
      let myChart = this.$echarts.init(document.getElementById('myChart4'))
      // 绘制图表
      myChart.setOption(
        {
        color: ['rgb(0,98,155)', 'rgb(117,184,254)', 'rgb(249,182,62)', 'rgb(254,114,91)'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            let result = params[0].name + '</br>'
            let value = 0
            let i = 0
            params.forEach(function (item) {
              i++
              value += item.value
              result += item.marker + ' ' + item.seriesName + ' : ' + item.value + '公里' + '</br>'
              if (i === 4) {
                result += '总里程：' + value.toFixed(2) + '公里'
              }
            })
            return result
          }
        },
        legend: {
          data: ['优', '良', '中', '差'],
          right: '4%',
          itemGap: 15,
          itemWidth: 12,
          itemHeight: 12
        },
        grid: {
          top: '14%',
          right: '20%',
          //   left:'10%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          name: '(公里)',
          show: true,
          interval: 40,
          max: 240

        },
        yAxis: {
          type: 'category',
          data: ['毫阜高速', '重庆渝黔', '重庆沪渝', '鄂东大桥', '贵黄公路', '京津塘高速', '桂林公司', '九瑞高速', '北仑港高速', '甬台温高速']
        },
        series: [
          {
            name: '优',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                // show: true,
                //   position: 'insideRight'
              }
            },
            data: [99, 31.4, 28.6, 150.2, 109.4, 16, 8, 68.3, 70, 84]
          },
          {
            name: '良',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                // show: true,
                position: 'insideRight'
              }
            },
            data: [34, 10.02, 11, 31.08, 25.29, 6, 4, 10.02, 11, 14]
          },
          {
            name: '中',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                // show: true,
                position: 'insideRight'
              }
            },
            data: [5.06, 8.003, 7.5, 18, 6, 2.9, 2.5, 4.005, 7, 2.3]
          },
          {
            name: '差',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                // show: false,
                position: 'insideRight'
              }
            },
            data: [2.11, 2.003, 1.04, 2, 2, 0.34, 0.65, 1, 2, 1]
          }
        ]
      })
      this.mychart4 = myChart
    },
    creatChart5 (data) {
      let myChart = this.$echarts.init(document.getElementById('myChart5'))
      let chartData0 = ''
      let chartData1 = ''
      let interval = ''
      if (data === undefined) {
        chartData0 = [(402 + 3 * Math.random()).toFixed(2), (272 + 6 * Math.random()).toFixed(2), (130 + 9 * Math.random()).toFixed(2)]
        chartData1 = [(101 + 6 * Math.random()).toFixed(2), (113 + 8 * Math.random()).toFixed(2), (120 + 9 * Math.random()).toFixed(2)]
        interval = 100
      } else {
        chartData0 = [(40 + 3 * Math.random()).toFixed(2), (27 + 6 * Math.random()).toFixed(2), (13 + 9 * Math.random()).toFixed(2)]
        chartData1 = [(10 + 6 * Math.random()).toFixed(2), (11 + 8 * Math.random()).toFixed(2), (12 + 9 * Math.random()).toFixed(2)]
        interval = 10
      }
      // 绘制图表
      myChart.setOption({
        color: ['rgb(0,98,155)', 'rgb(143,199,246)'],
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let result = params[0].name + '</br>'
            params.forEach(function (item) {
              result += item.marker + ' ' + item.seriesName + ' : ' + item.value + '万元' + '</br>'
            })
            return result
          }
        },
        legend: {
          data: ['工程计划量', '实际工程量'],
          right: '1%'
        },
        //   calculable: true,
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              interval: 0
            },
            data: ['日常养护工程', '专项养护工程', '应急抢修工程']
          }
        ],
        yAxis: {
          type: 'value',
          name: '(万元)',
          axisLabel: {
            formatter: function (value, index) {
              let value1
              if (value >= 1000) {
                value1 = value / 1000 + 'k'
              } else if (value < 1000) {
                value1 = value
              }
              return value1
            }
          },
          interval: interval
        },
        series: [
          {
            name: '工程计划量',
            type: 'bar',
            stack: '总量',
            barWidth: 40, // 柱图宽度
            //   barGap: 0,
            data: chartData0,
            itemStyle: {
              normal: {
                label: {
                  show: true, // 开启显示
                  position: 'center', // 在上方显示
                  textStyle: { // 数值样式
                    color: '#ffffff',
                    fontSize: 12
                  }
                }
              }
            }
          },
          {
            name: '实际工程量',
            type: 'bar',
            barWidth: 40, // 柱图宽度
            stack: '总量',
            data: chartData1,
            itemStyle: {
              normal: {
                label: {
                  show: true, // 开启显示
                  position: 'center', // 在上方显示
                  textStyle: { // 数值样式
                    color: '#00629b',
                    fontSize: 12
                  }
                }
              }
            }
          }
        ]
      })
      this.mychart5 = myChart
    }

  }
}
</script>

<style scoped>
  .el-input__inner{
    /* background: #d5e1ea !important; */
    outline:none !important;
  }
  .el-date-editor span.el-input__prefix{
    top: 5px !important;
  }
  .charts-top-con{
    background: #fff;
    margin:1%;
    width:98%;
    /* min-width:1392px; */
    height:430px;
    border-radius: 4px 4px 0px 0px;
    box-shadow: 0px 4px 10px 0px
    rgba(31, 38, 46, 0.08);
  }
  .header{
    width: 100%;
    height: 40px;
    background-color: #d5e1ea;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #1f262e;
    line-height: 40px;
    text-indent:16px;
    position:relative;
  }
  .header span{
    font-size:12px;
  }
  .charts-top-con .charts-con{
    height: 390px;
    width:25%;
    border-right:1px solid #ddd;
  }
  .charts-con{
    float:left;
  }
  .charts-con .chart-title{
    margin:16px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #1f262e;
    border-left:3px solid #005e9a;
    text-indent: 8px;
  }
  .charts-con .chart-info{
    margin-top:15px;
    font-family: ArialMT;
    font-size: 36px;
    color: #1f262e;
    text-indent:27px;
  }
  .charts-con .chart-span{
    margin-top:5px;
    font-size: 14px;
    color: #a9b1ba;
    text-indent:29px;
  }
  .bottom-left{
    float:left;
    margin:0 1%;
    width:67%;
    /*min-width: 920px;*/
    height: 343px;
    background-color: #ffffff;
    box-shadow: 0px 4px 10px 0px
    rgba(31, 38, 46, 0.08);
    border-radius: 4px;
  }
  .bottom-right{
    margin:0 1% 1% 0px;
    width:30%;
    /*min-width: 456px;*/
    height: 343px;
    background-color: #ffffff;
    box-shadow: 0px 4px 10px 0px
    rgba(31, 38, 46, 0.08);
    border-radius: 4px;
    float: left;
    position: relative;
  }
  .todo-con{
    width:90%;
    margin:12px auto;
  }
  .todo-list{
    position:relative;
    /* margin:7px 5px; */
    width:15%;
    height:84px;
    text-align: center;
    display: inline-block;
  }
  .todo-list:first-child{
    margin-left:5%;
  }
  /* .todo-list div:last-child{
      font-family: 'SimSun';
      font-size: 12px;
      color:#1f262e;
  } */
  .todo-list span{
    position: absolute;
    top: 26%;
    font-size: 12px;
    right: 47%;
  }
  .todo-infos ul{
    width:96%;
    margin:2% auto;
  }
  .todo-infos ul li{
    position:relative;
    height:36px;
    line-height: 36px;
    border-bottom:1px solid #ddd;
    text-indent:10px;
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
  .process{
    margin:50px auto;
    width:430px;
    position:relative
  }
  .process-con{
    margin-top:52px;
    text-align: center;
    width:100%;
  }
  .process span:first-child{
    position:absolute;
    left:0;
    top:-30px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #4e5258;
  }
  .process span:last-child{
    font-family: AdobeHeitiStd-Regular;
    font-size: 15px;
    color: #4e5258;
    position:absolute;
    right:0;
    top:-30px;
  }
</style>
