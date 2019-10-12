<template>
  <div>
    <div id="zdtjcxlEcharts" style="height: 12vw"></div>
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
        series: [
          {
            type: 'pie',
            radius: ['50%', '65%'],
            center: ['50%', '50%'],
            label: {
              normal: {
                show: false,
                formatter: '{d}%',
                position: 'inner'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            color: ['#9f33be', '#1671d7'],
            data: [
              {value: 25, name: '执法任务'},
              {value: 75, name: '在岗人员'}
            ]
          }
        ]
      }
    }
  },
  methods: {
  },
  mounted () {
    this.chartBar1 = echarts.init(document.getElementById('zdtjcxlEcharts'))
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
