<template>
  <div>
    <div id="hzEcharts" style="height: 400px;width: 100%"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
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
         this.qfArr.push(this.data[i][0].PQI1)
         this.sxArr.push(this.data[i][1].PQI1)  
         this.xxArr.push(this.data[i][2].PQI1)
       }
console.log(this.qfArr,this.sxArr,this.xxArr)
  },
  methods: {
  },
  mounted () {
    this.chartBar1 = echarts.init(document.getElementById('hzEcharts'))
  let  option = {
   
    xAxis: {
        type: 'category',
        data: ['PCI', 'RQI', 'RDI', 'PBI', 'PWI', 'SRI', 'PSSI']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        itemStyle:{
                //通常情况下：
                normal:{  
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组中的颜色
                    color: function (params){
                        var colorList = [
                              '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                               '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                        return colorList[params.dataIndex];
                    },
                    // color: '#a453f7',  //设置所有柱状图颜色
                },
 
        }
    }]
};
let option1 = {
    title: {
        text: 'PQI'
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
    },
    yAxis: {
        type: 'value',
        data:['PQI']
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
    window.addEventListener('resize', function () {
      _this.chartBar1.resize()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
