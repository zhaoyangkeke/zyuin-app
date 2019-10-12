<template>
  <div>
    <div id="hzEcharts" style="height: 400px;width: 100%"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { close } from 'fs';
export default {
  components: {},
  props:['data'],
  data () {
    return {
      chartColumn: null,
      qfArr:[],
      sxArr:[],
      xxArr:[],
      lxxx:[],
     
    }
  },
  created (){
       for (let i = 0; i < this.data.length-1; i++) {
        this.lxxx.push(this.data[i][0].LXBM)
         this.qfArr.push(this.data[i][0].MQI1)
         this.sxArr.push(this.data[i][1].MQI1)  
         this.xxArr.push(this.data[i][2].MQI1)
       }
 
  },
  methods: {
  },
  mounted () {
    this.chartBar1 = echarts.init(document.getElementById('hzEcharts'))
  
let option1 = {
    title: {
        text: 'MQI'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['全幅','上行','下行'],
        right:20,
        
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: this.lxxx,
        triggerEvent:true,
    },
    yAxis: {
        type: 'value',
        data:['PQI'],
        triggerEvent:true,
    },
    series: [
        {
            name:'全幅',
            stack: '全幅',
            data:this.qfArr,
            type: 'bar',
        },
        {
            name:'上行',
            stack: '上行',
            type: 'bar',
            data:this.sxArr,
        },
        {
            name:'下行',
            stack: '下行',
            type: 'bar',
            data:this.xxArr,
        },
         
    ]

}
    this.chartBar1.setOption(option1)
    let _this = this
    this.chartBar1.on('click', function (params) { 
      if(params.seriesType=='bar'){
         
        _this.$emit('changeG',{lxbm:params.name,fx:params.seriesName})
        console.log(11111)
      }
    })
    
    window.addEventListener('resize', function () {
      _this.chartBar1.resize()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
