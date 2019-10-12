<template>
  <div>
    <div id="grade" style="height: 400px;width: 100%"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  components: {},
  props:['data','fx','lxbm','tit'],
  data () {
    return {
      chartColumn: null,
      qfArr:[],
      sxArr:[],
      xxArr:[],
      lxxx:[],
      temp:[],
    }
  },
  created (){
 
      if(this.fx==''){
          this.fx='全幅'
      }
 for (let i = 0; i < this.data.length-1; i++) {
     if(this.lxbm==this.data[i][0].LXBM){
          this.qfArr=[
                {value:this.data[i][0].YOU, name:'优'},
                {value:this.data[i][0].LIANG, name:'良'},
                {value:this.data[i][0].ZHONG, name:'中'},
                {value:this.data[i][0].CI, name:'次'},
                {value:this.data[i][0].CHA, name:'差'}
            ]
         this.sxArr=[
                {value:this.data[i][1].YOU, name:'优'},
                {value:this.data[i][1].LIANG, name:'良'},
                {value:this.data[i][1].ZHONG, name:'中'},
                {value:this.data[i][1].CI, name:'次'},
                {value:this.data[i][1].CHA, name:'差'}
            ]
         this.xxArr=[
                {value:this.data[i][2].YOU, name:'优'},
                {value:this.data[i][2].LIANG, name:'良'},
                {value:this.data[i][2].ZHONG, name:'中'},
                {value:this.data[i][2].CI, name:'次'},
                {value:this.data[i][2].CHA, name:'差'}
            ]
     }
        
       }
 
  },
  methods: {
  },
  mounted () {
    switch (this.fx) {
        case '全幅':{
            this.temp=this.qfArr
            break;}
        case '上行':{
            this.temp=this.sxArr
            break;}
        case '下行':{
            this.temp=this.xxArr
            break;}
        default:
            break;
    }
    this.chartBar1 = echarts.init(document.getElementById('grade'))
  
let option = {
    title : {
        text: this.tit+ '('+this.lxbm +')',
      
    },
    tooltip : {
        trigger: 'item',
        formatter: "{b} : {c} km"
    },
    legend: {
        data: ['优','良','中','次','差'],
        right:20
    },
    series : [
        {
            name: '分布',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data: this.temp,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label: {
 
                normal: {
                    formatter: "{b} : {c} km ({d}%)"
                }
            }
        } 
    ]
};
    this.chartBar1.setOption(option)
 
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
