<template>
  <div>
    <div class="charts-top-con">
      <div class="charts-con">
        <div class="chart-title">
          合同占比
        </div>
        <div class="chart-span"></div>
        <div v-if="chartOneSuccess"  style="width:90%;margin:0 auto;">
          <div id="myChart1" style="width:100%;height:330px"></div>
        </div>
        <div v-else style="width:100%;height:330px;text-align: center;padding-top: 36%">
          <span>{{chartOneMsg}}</span>
        </div>
      </div>
      <div class="charts-con">
        <div class="chart-title">
          合同占比
        </div>
        <div class="chart-span"></div>
        <div v-if="chartTwoSuccess" style="width:90%;margin:0 auto;">
          <div id="myChart2" style="width:100%;height:330px"></div>
        </div>
        <div v-else style="width:100%;height:330px;text-align: center;padding-top: 36%">
          <span>{{chartTwoMsg}}</span>
        </div>
      </div>
      <div class="charts-con">
        <div class="chart-title">
          项目类型占比
        </div>
        <div class="chart-span"></div>
        <div v-if="chartThreeSuccess" style="width:90%;margin:0 auto;">
          <div id="myChart3" style="width:100%;height:330px"></div>
        </div>
        <div v-else style="width:100%;height:330px;text-align: center;padding-top: 36%">
          <span>{{chartThreeMsg}}</span>
        </div>
      </div>
    </div>
    <div class="bottom-left">
      <div class="charts-con" style="width: 50%">
        <div class="chart-title">
          项目任务单数量
        </div>
        <div class="chart-span"></div>
        <div v-if="chartFourSuccess" style="width:90%;margin:0 auto;">
          <div id="myChart4" style="width:100%; height:330px"></div>
        </div>
        <div v-else style="width:100%;height:330px;text-align: center;padding-top: 36%">
          <span>{{chartFourMsg}}</span>
        </div>
      </div>
      <div class="charts-con" style="width: 50%">
        <div class="chart-title">
          路况评定优良中差结果占比
        </div>
        <div class="chart-span"></div>
        <div v-if="chartFiveSuccess" style="width:90%;margin:0 auto;">
          <div id="myChart5" style="width:100%; height:370px"></div>
        </div>
        <div v-else style="width:100%;height:330px;text-align: center;padding-top: 36%">
          <span>{{chartFiveMsg}}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        mychart1: null,
        chartOneSuccess: true,
        chartOneMsg: '暂无数据',
        mychart2: null,
        chartTwoSuccess: true,
        chartTwoMsg: '暂无数据',
        mychart3: null,
        chartThreeSuccess: true,
        chartThreeMsg: '暂无数据',
        mychart4: null,
        chartFourSuccess: true,
        chartFourMsg: '暂无数据',
        mychart5: null,
        chartFiveSuccess: true,
        chartFiveMsg: '暂无数据',
        userInfo: {
          daZzbh: undefined,
          daZzid: undefined,
          daZzmc: undefined,
          daBmbm: undefined,
          daBmid: undefined,
          daBmmc: undefined,
          daYhbm: undefined,
          daYhid: undefined,
          daYhmc: undefined
        }
      }
    },
    async created () {
      this.initUser()
    },
    mounted () {
      this.createChart1()
      this.createChart2()
      this.createChart3()
      this.createChart4()
      this.createChart5()
      var _this = this
      $(window).trigger('resize')
      window.onresize = function () {
        if (_this.mychart1) {
          _this.mychart1.resize()
          _this.mychart2.resize()
          _this.mychart3.resize()
          _this.mychart4.resize()
          _this.mychart5.resize()
        }
      }
    },
    methods: {
      initUser () {
        let userInfo = config.jd_infor[0]
        if(userInfo) {
          if(userInfo) {
            this.userInfo.daYhbm = userInfo.userCode
            this.userInfo.daYhid = userInfo.userId
            this.userInfo.daYhmc = userInfo.userName
            let deptList = userInfo.deptList
            let bminfo = deptList[0]

            if(bminfo) {
              this.userInfo.daBmbm = bminfo.deptCode
              this.userInfo.daBmid = bminfo.deptId
              this.userInfo.daBmmc = bminfo.deptName
              let org = bminfo.org
              if(org) {
                this.userInfo.daZzbh = org.orgCode
                this.userInfo.daZzid = org.orgId
                this.userInfo.daZzmc = org.orgName
              }
            }
          }
        }
      },
      timeNow () {
        return this.$moment.utc().format('YYYY-MM-DD')
      },
      // 绘制合同占比饼图
      createChart1 () {
        let myChart = this.$echarts.init(document.getElementById('myChart1'))
        myChart.showLoading()
        // 请求后台接口
        this.$api.getXmylZt({orgId: this.userInfo.daZzid}).then(res => {
          myChart.hideLoading()
          // 获取数据成功，绘制饼图
          if (res.code === 1) {
            // 数据
            let listData = res.data
            if (listData.length > 0) {
              this.chartOneSuccess = true

              // 图例
              let legend = []
              for (let i = 0; i < listData.length; i++) {
                legend[i] = listData[i].name
              }
              // 绘制图表
              let option = {
                tooltip: {
                  formatter: '{b}:{a}{c}个（{d}%）'
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
                  data: legend
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
                        formatter: '{c}个',
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
                    data: listData
                  }
                ]
              }
              myChart.setOption(option)
              this.mychart1 = myChart
            } else {
              this.chartOneSuccess = false
              this.chartOneMsg = '暂无数据'
            }
          } else { // 获取数据失败
            this.chartOneSuccess = false
            this.chartOneMsg = '获取数据失败'
          }
        }).catch(err => {
          this.chartOneSuccess = false
          if (err && err.response) {
            switch (err.response.status) {
              case 400:
                this.chartOneMsg = '请求错误'
                break

              case 401:
                this.chartOneMsg = '未授权，请重新登录'
                break

              case 403:
                this.chartOneMsg = '拒绝访问'
                break

              case 404:
                this.chartOneMsg = '请求出错'
                break

              case 408:
                this.chartOneMsg = '请求超时'
                break

              case 500:
                this.chartOneMsg = '服务器错误'
                break

              case 501:
                this.chartOneMsg = '服务未实现'
                break

              case 502:
                this.chartOneMsg = '网络错误'
                break

              case 503:
                this.chartOneMsg = '服务不可用'
                break

              case 504:
                this.chartOneMsg = '网络超时'
                break

              case 505:
                this.chartOneMsg = 'HTTP版本不受支持'
                break

              default:
                this.chartOneMsg = `连接出错!`
              // case 401: case 403:
              // 返回 401 清除token信息并跳转到登录页面
              // sessionStorage.clear()
              // window.location.href = '/'
            }
          } else {
            // error.message = '连接服务器失败!'
            this.chartOneMsg = '连接服务器失败'
          }
        })
      },
      // 绘制合同占比柱状图
      createChart2 () {
        let myChart = this.$echarts.init(document.getElementById('myChart2'))
        myChart.showLoading()
        // 获取数据
        this.$api.getXmylXmzt({orgId: this.userInfo.daZzid}).then(res => {
          myChart.hideLoading()
          // 获取数据成功
          if (res.code === 1) {
            let xData = res.data.xdata
            let yData = res.data.ydata

            if (xData.length < 1) {
              this.chartTwoSuccess = false
              this.chartTwoMsg = '暂无数据'
              return
            }

            if (yData.length < 1) {
              this.chartTwoSuccess = false
              this.chartTwoMsg = '暂无数据'
              return
            }

            this.chartTwoSuccess = true
            myChart.setOption({
              color: ['#83bff6', '#188df0', '#188df0'],
              tooltip: {
                trigger: 'axis',
                formatter: '{b}:{c}个'
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
                  interval: 0
                },
                boundaryGap: true,
                data: xData
              },
              yAxis: {
                type: 'value',
                name: '(个)'
              },
              series: [{
                  name: '合同数量',
                  type: 'bar',
                  barWidth: 20,
                  data: yData,
                  itemStyle: {
                    normal: {
                      color: this.$echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                          {offset: 0, color: '#83bff6'},
                          {offset: 0.5, color: '#188df0'},
                          {offset: 1, color: '#188df0'}
                        ]
                      )
                    },
                    emphasis: {
                      color: this.$echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                          {offset: 0, color: '#2378f7'},
                          {offset: 0.7, color: '#2378f7'},
                          {offset: 1, color: '#83bff6'}
                        ]
                      )
                    }
                  }
                }]
            })
            this.mychart2 = myChart
          } else {
            this.chartTwoSuccess = false
            this.chartTwoMsg = '获取数据失败'
          }
        }).catch(err => {
          this.chartTwoSuccess = false
          if (err && err.response) {
            switch (err.response.status) {
              case 400:
                this.chartTwoMsg = '请求错误'
                break

              case 401:
                this.chartTwoMsg = '未授权，请重新登录'
                break

              case 403:
                this.chartTwoMsg = '拒绝访问'
                break

              case 404:
                this.chartTwoMsg = '请求出错'
                break

              case 408:
                this.chartTwoMsg = '请求超时'
                break

              case 500:
                this.chartTwoMsg = '服务器错误'
                break

              case 501:
                this.chartTwoMsg = '服务未实现'
                break

              case 502:
                this.chartTwoMsg = '网络错误'
                break

              case 503:
                this.chartTwoMsg = '服务不可用'
                break

              case 504:
                this.chartOneMsg = '网络超时'
                break

              case 505:
                this.chartTwoMsg = 'HTTP版本不受支持'
                break

              default:
                this.chartOneMsg = `连接出错!`
              // case 401: case 403:
              // 返回 401 清除token信息并跳转到登录页面
              // sessionStorage.clear()
              // window.location.href = '/'
            }
          } else {
            this.chartTwoMsg = '连接服务器失败'
          }
        })
      },
      // 绘制项目类型占比饼图
      createChart3 () {
        let myChart = this.$echarts.init(document.getElementById('myChart3'))
        myChart.showLoading()
        this.$api.getXmylSglx({orgId: this.userInfo.daZzid}).then(res => {
          myChart.hideLoading()
          if (res.code === 1) {
            // 数据
            let listData = res.data
            if (listData.length < 1) {
              this.chartThreeSuccess = false
              this.chartThreeMsg = '暂无数据'
              return
            }

            this.chartThreeSuccess = true
            // 图例
            let legend = []
            for (let i = 0; i < listData.length; i++) {
              legend[i] = listData[i].name
            }
            myChart.setOption({
              color: ['rgb(136,159,255)', 'rgb(143,199,246)', 'rgb(248,209,54)', 'rgb(1436,219,189)', 'rgb(220,221,225)', '#FE725B', '#00629B', '#37D07D', '#00FFFF', '#FF00FF'],
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}个({d}%)'
              },
              grid: {
                left: '5%', // 与容器左侧的距离
                right: '5%' // 与容器右侧的距离
                // top: '5%',   // 与容器顶部的距离
                // bottom: '5%', // 与容器底部的距离
              },
              legend: {
                x: 'center',
                y: 'bottom',
                padding: 0,
                itemGap: 15,
                itemWidth: 12,
                itemHeight: 12,
                data: legend
              },
              calculable: true,
              series: [
                {
                  name: '项目类型',
                  type: 'pie',
                  radius: ['55%', '70%'],
                  center: ['50%', '40%'],
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
                  data: listData
                }
              ]
            })

            // 解决饼图的点击事件两次响应的问题
            // 首先取消饼图的点击事件
            myChart.off('click')
            // 然后再注册饼图的点击事件
            myChart.on('click', function (params) {
              // window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.data.xmlx))
              alert('预留的点击事件处理')
            })
            this.mychart3 = myChart
          } else {
            this.chartThreeSuccess = false
            this.chartThreeMsg = '获取数据失败'
          }
        }).catch(err => {
          this.chartThreeSuccess = false
          if (err && err.response) {
            switch (err.response.status) {
              case 400:
                this.chartThreeMsg = '请求错误'
                break

              case 401:
                this.chartThreeMsg = '未授权，请重新登录'
                break

              case 403:
                this.chartThreeMsg = '拒绝访问'
                break

              case 404:
                this.chartThreeMsg = '请求出错'
                break

              case 408:
                this.chartThreeMsg = '请求超时'
                break

              case 500:
                this.chartThreeMsg = '服务器错误'
                break

              case 501:
                this.chartThreeMsg = '服务未实现'
                break

              case 502:
                this.chartThreeMsg = '网络错误'
                break

              case 503:
                this.chartThreeMsg = '服务不可用'
                break

              case 504:
                this.chartThreeMsg = '网络超时'
                break

              case 505:
                this.chartThreeMsg = 'HTTP版本不受支持'
                break

              default:
                this.chartThreeMsg = `连接出错!`
              // case 401: case 403:
              // 返回 401 清除token信息并跳转到登录页面
              // sessionStorage.clear()
              // window.location.href = '/'
            }
          } else {
            this.chartThreeMsg = '连接服务器失败'
          }
        })
      },
      // 绘制项目任务单数量柱状图
      createChart4 () {
        let myChart = this.$echarts.init(document.getElementById('myChart4'))
        myChart.showLoading()
        this.$api.getXmylShlx({currentYear: this.timeNow(), orgId: this.userInfo.daZzid}).then(res => {
          myChart.hideLoading()
          if (res.code === 1) {
            let xData = res.data.xdata
            let yData = res.data.ydata

            if (xData.length < 1) {
              this.chartFourSuccess = false
              this.chartFourMsg = '暂无数据'
              return
            }

            if (yData.length < 1) {
              this.chartFourSuccess = false
              this.chartFourMsg = '暂无数据'
              return
            }

            this.chartFourSuccess = true
            myChart.setOption({
              color: ['#188df0', '#83bff6', '#188df0'],
              tooltip: {
                trigger: 'axis',
                formatter: '{a} <br/>{b} : {c}个'
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
                  interval: 0
                },
                boundaryGap: true,
                data: xData
              },
              yAxis: {
                type: 'value',
                name: '(个)'
              },
              series: [
                {
                  name: '项目任务单',
                  type: 'bar',
                  barWidth: 20,
                  itemStyle: {
                    normal: {
                      color: this.$echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                          {offset: 0, color: '#83bff6'},
                          {offset: 0.5, color: '#188df0'},
                          {offset: 1, color: '#188df0'}
                        ]
                      )
                    },
                    emphasis: {
                      color: this.$echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                          {offset: 0, color: '#2378f7'},
                          {offset: 0.7, color: '#2378f7'},
                          {offset: 1, color: '#83bff6'}
                        ]
                      )
                    }
                  },
                  data: yData
                }]
            })
            this.mychart4 = myChart
          } else {
            this.chartFourSuccess = false
            this.chartFourMsg = '获取数据失败'
          }
        }).catch(err => {
          this.chartFourSuccess = false
          if (err && err.response) {
            switch (err.response.status) {
              case 400:
                this.chartFourMsg = '请求错误'
                break

              case 401:
                this.chartFourMsg = '未授权，请重新登录'
                break

              case 403:
                this.chartFourMsg = '拒绝访问'
                break

              case 404:
                this.chartFourMsg = '请求出错'
                break

              case 408:
                this.chartFourMsg = '请求超时'
                break

              case 500:
                this.chartFourMsg = '服务器错误'
                break

              case 501:
                this.chartFourMsg = '服务未实现'
                break

              case 502:
                this.chartFourMsg = '网络错误'
                break

              case 503:
                this.chartFourMsg = '服务不可用'
                break

              case 504:
                this.chartFourMsg = '网络超时'
                break

              case 505:
                this.chartFourMsg = 'HTTP版本不受支持'
                break

              default:
                this.chartFourMsg = `连接出错!`
              // case 401: case 403:
              // 返回 401 清除token信息并跳转到登录页面
              // sessionStorage.clear()
              // window.location.href = '/'
            }
          } else {
            this.chartFourMsg = '连接服务器失败'
          }
        })
      },
      // 绘制路况评定优良中差结果占比图
      createChart5 () {
        let myChart = this.$echarts.init(document.getElementById('myChart5'))
        myChart.showLoading()
        this.$api.getXmylLkpd({orgId: this.userInfo.daZzbh}).then(res => {
          myChart.hideLoading()
          if (res.code === 1) {
            let data = res.data

            if (data.length < 1) {
              this.chartFiveSuccess = false
              this.chartFiveMsg = '暂无数据'
              return
            }

            this.chartFiveSuccess = true

            // Y轴数据
            let yAxis = []
            // 总里程数组
            let ZLCs = []
            // 优等路里程数组
            let YDLs = []
            // 差等路里程数组
            let CHDLs = []
            // 中等路里程数组
            let ZDLs = []
            // 良等路里程数组
            let LDLs = []
            // 次等路里程数组
            let CDLs = []
            for (let i = 0; i < data.length; i++) {
              yAxis[i] = data[i].LXBM
              ZLCs[i] = data[i].ZLC
              YDLs[i] = data[i].YDL
              CHDLs[i] = data[i].CHDL
              ZDLs[i] = data[i].ZDL
              LDLs[i] = data[i].LDL
              CDLs[i] = data[i].CDL
            }
            // 绘制图表
            myChart.setOption(
              {
                color: ['rgb(0,98,155)', 'rgb(50,114,233)', 'rgb(117,184,254)', 'rgb(249,182,62)', 'rgb(254,114,91)'],
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
                      if (i === 5) {
                        result += '总里程：' + value.toFixed(2) + '公里'
                      }
                    })
                    return result
                  }
                },
                legend: {
                  data: ['优', '良', '中', '次', '差'],
                  right: '4%',
                  itemGap: 15,
                  itemWidth: 12,
                  itemHeight: 12
                },
                grid: {
                  right: '13%',
                  left: '2%',
                  containLabel: true
                },
                xAxis: {
                  type: 'value',
                  name: '(公里)',
                  show: true
                },
                yAxis: {
                  type: 'category',
                  data: yAxis
                },
                series: [
                  {
                    name: '优',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 20,
                    label: {
                      normal: {
                        // show: true,
                        //   position: 'insideRight'
                      }
                    },
                    data: YDLs
                  },
                  {
                    name: '良',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 20,
                    label: {
                      normal: {
                        // show: true,
                        position: 'insideRight'
                      }
                    },
                    data: LDLs
                  },
                  {
                    name: '中',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 20,
                    label: {
                      normal: {
                        // show: true,
                        position: 'insideRight'
                      }
                    },
                    data: ZDLs
                  },
                  {
                    name: '次',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 20,
                    label: {
                      normal: {
                        // show: true,
                        position: 'insideRight'
                      }
                    },
                    data: CDLs
                  },
                  {
                    name: '差',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 20,
                    label: {
                      normal: {
                        // show: false,
                        position: 'insideRight'
                      }
                    },
                    data: CHDLs
                  }
                ]
              })
            this.mychart5 = myChart
          } else {
            this.chartFiveSuccess = false
            this.chartFiveMsg = '获取数据失败'
          }
        }).catch(err => {
          this.chartFiveSuccess = false
          if (err && err.response) {
            switch (err.response.status) {
              case 400:
                this.chartFiveMsg = '请求错误'
                break

              case 401:
                this.chartFiveMsg = '未授权，请重新登录'
                break

              case 403:
                this.chartFiveMsg = '拒绝访问'
                break

              case 404:
                this.chartFiveMsg = '请求出错'
                break

              case 408:
                this.chartFiveMsg = '请求超时'
                break

              case 500:
                this.chartFiveMsg = '服务器错误'
                break

              case 501:
                this.chartFiveMsg = '服务未实现'
                break

              case 502:
                this.chartFiveMsg = '网络错误'
                break

              case 503:
                this.chartFiveMsg = '服务不可用'
                break

              case 504:
                this.chartFiveMsg = '网络超时'
                break

              case 505:
                this.chartFiveMsg = 'HTTP版本不受支持'
                break

              default:
                this.chartFourMsg = `连接出错!`
              // case 401: case 403:
              // 返回 401 清除token信息并跳转到登录页面
              // sessionStorage.clear()
              // window.location.href = '/'
            }
          } else {
            this.chartFiveMsg = '连接服务器失败'
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-input__inner {
    /* background: #d5e1ea !important; */
    outline: none !important;
  }

  .el-date-editor span.el-input__prefix {
    top: 5px !important;
  }

  .charts-top-con {
    background: #fff;
    margin: 1%;
    width: 98%;
    /* min-width:1392px; */
    height: 430px;
    border-radius: 4px 4px 0px 0px;
    box-shadow: 0px 4px 10px 0px rgba(31, 38, 46, 0.08);
  }

  .header {
    width: 100%;
    height: 40px;
    background-color: #d5e1ea;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #1f262e;
    line-height: 40px;
    text-indent: 16px;
    position: relative;
  }

  .header span {
    font-size: 12px;
  }

  .charts-top-con .charts-con {
    height: 400px;
    width: 33%;
  }

  .charts-con {
    float: left;
  }

  .charts-con .chart-title {
    margin: 16px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #1f262e;
    border-left: 3px solid #005e9a;
    text-indent: 8px;
  }

  .charts-con .chart-info {
    margin-top: 15px;
    font-family: ArialMT;
    font-size: 36px;
    color: #1f262e;
    text-indent: 27px;
  }

  .charts-con .chart-span {
    margin-top: 5px;
    font-size: 14px;
    color: #a9b1ba;
    text-indent: 29px;
  }

  .bottom-left {
    float: left;
    margin: 0 1%;
    width: 66%;
    /*min-width: 920px;*/
    height: 400px;
    background-color: #ffffff;
    box-shadow: 0px 4px 10px 0px rgba(31, 38, 46, 0.08);
    border-radius: 4px;
  }

  .bottom-right {
    margin: 0 1% 1% 0px;
    width: 30%;
    /*min-width: 456px;*/
    height: 343px;
    background-color: #ffffff;
    box-shadow: 0px 4px 10px 0px rgba(31, 38, 46, 0.08);
    border-radius: 4px;
    float: left;
    position: relative;
  }

  .todo-con {
    width: 90%;
    margin: 12px auto;
  }

  .todo-list {
    position: relative;
    /* margin:7px 5px; */
    width: 15%;
    height: 84px;
    text-align: center;
    display: inline-block;
  }

  .todo-list:first-child {
    margin-left: 5%;
  }

  /* .todo-list div:last-child{
      font-family: 'SimSun';
      font-size: 12px;
      color:#1f262e;
  } */
  .todo-list span {
    position: absolute;
    top: 26%;
    font-size: 12px;
    right: 47%;
  }

  .todo-infos ul {
    width: 96%;
    margin: 2% auto;
  }

  .todo-infos ul li {
    position: relative;
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #ddd;
    text-indent: 10px;
  }

  .todo-infos ul li:last-child {
    border: 0
  }

  .todo-infos ul li::before {
    content: "";
    position: absolute;
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #fe715b;
    top: 16px;
    left: 0;
  }

  .todo-infos ul li.flag::before {
    background: #7a86ff;
  }

  .todo-infos ul li span {
    float: left;
    font-family: "SimSun";
    font-size: 12px;
    color: #4e5258
  }

  .todo-infos ul li span:last-child {
    float: right;
  }

  .process {
    margin: 50px auto;
    width: 430px;
    position: relative
  }

  .process-con {
    margin-top: 52px;
    text-align: center;
    width: 100%;
  }

  .process span:first-child {
    position: absolute;
    left: 0;
    top: -30px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #4e5258;
  }

  .process span:last-child {
    font-family: AdobeHeitiStd-Regular;
    font-size: 15px;
    color: #4e5258;
    position: absolute;
    right: 0;
    top: -30px;
  }
</style>
