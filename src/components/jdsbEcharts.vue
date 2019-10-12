<template>
  <div>
    <div id="jdsbEcharts" style="height: 12vw;width: 100%"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  components: {},
  data () {
    return {
      chartColumn: null,
      gsgldata: {
        title: {
          text: '',
          subtext: '',
          top: 10,
          left: 'center',
          textStyle: {
            // 文字颜色
            color: '#4d4d4d',
            // 字体风格,'normal','italic','oblique'
            fontStyle: 'normal',
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: 'normal',
            // 字体大小
            fontSize: 12,
            // 字体系列
            fontFamily: '"Microsoft Yahei", "微软雅黑", "Helvetica Neue", "Arial,sans-serif"'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        grid: {
          x: 50
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 1],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#1671d7'
            }
          },
          splitLine: {
            show: false, // 默认显示，属性show控制显示与否
            // onGap: null,
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
              color: ['#1c3667'],
              width: 1,
              type: 'solid'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['入库', '出库', '维修'],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#bed1f7'
            }
          },
          splitLine: {
            show: true, // 默认显示，属性show控制显示与否
            // onGap: null,
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
              color: ['#1c3667'],
              width: 1,
              type: 'solid'
            }
          }
        },
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: 8,
            data: [100, 53, 80],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [ {offset: 0, color: '#15d3da'}, {offset: 1, color: '#138ffa'} ]),
                barBorderRadius: 4
              }
            }
          }
        ]
      }
    }
  },
  methods: {
  },
  mounted () {
    this.chartBar1 = echarts.init(document.getElementById('jdsbEcharts'))
    this.chartBar1.setOption(this.gsgldata)
    let _this = this
    window.addEventListener('resize', function () {
      _this.chartBar1.resize()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
