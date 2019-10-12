<template>
  <div style="height: 100%">
    <div id="lrqkEcharts" style="height: 100%"></div>
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
        color: ['#9f33fb'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 0,
          left: 'center',
          data: ['执法任务', '在岗人员'],
          itemWidth: 8,
          itemHeight: 8,
          borderRadius: 4,
          textStyle: { // 图例文字的样式
            color: '#bed1f7'
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#1671d7'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#1671d7'
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
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }]
      }
    }
  },
  methods: {
  },
  mounted () {
    this.chartBar1 = echarts.init(document.getElementById('lrqkEcharts'))
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
