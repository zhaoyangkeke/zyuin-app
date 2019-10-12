<template>
  <div class="dp">
    <el-container style="height: 100%">
      <el-header style="height: 5.37%">
        <div class="title">
          <span class="title_left">{{date}}</span>
          <img src="../../static/img/biaoti.png" alt="">
          <span class="title_right">
            <i class="icon iconfont icon-xiaoxitixing" style="color: #ff953b;font-size: 1.6vw;vertical-align: middle;margin-right: 0.5vw"></i><span>XX路段发生交通事故</span>
          </span>
        </div>
      </el-header>
      <el-main style="height: 57.96%;">
        <ul class="ul_warp">
          <li>
            <h3>公路资产</h3>
            <img src="../../static/img/img_top.png" alt="">
            <div class="hengxian">
              <p>总里程</p>
              <span v-for="(text, index) in string" :key="index" :class="text!='.'?'num_warp':''">{{text}}</span>公里，双向<span style="color: #ff953b">6</span>车道
              <ul class="zclx">
                <li><i class="iconfont icon-qiaoliang"></i><span>{{zcdata.ql}}座</span><span class="name">桥梁</span></li>
                <li><i class="iconfont icon-suidao"></i><span>{{zcdata.sd}}条</span><span class="name">隧道</span></li>
                <li><i class="iconfont icon-fuwuqu"></i><span>{{zcdata.fwq}}个</span><span class="name">服务区</span></li>
                <li><i class="iconfont icon-shoufeizhan"></i><span>{{zcdata.sfz}}个</span><span class="name">收费站</span></li>
              </ul>
              <p>人员情况</p>
              <Echarts ref="echarts"></Echarts>
            </div>
            <img src="../../static/img/img_bottom.png" alt="">
          </li>
          <li>
            <h3>机电设备</h3>
            <img src="../../static/img/mkdb.png" alt="">
            <div style="position: absolute;width: 100%;height: 12vw;padding:0 0.5vw">
              <jdsbEcharts ref="echarts"></jdsbEcharts>
            </div>
            <h3>养护任务</h3>
            <img src="../../static/img/img_top.png" alt="">
            <div class="hengxian">
              <ul class="yhrw">
                <li><span>100m²</span><br/><span>小修</span></li>
                <li><span>200m²</span><br/><span>绿化</span></li>
                <li><span>300m²</span><br/><span>清扫</span></li>
              </ul>
              <yhrwEcharts></yhrwEcharts>
            </div>
            <img src="../../static/img/img_bottom.png" alt="">
          </li>
          <li>
            <h3>地图</h3>
            <img src="../../static/img/img_top_left.png" alt="" >
            <span class="top_shuxian"></span>
            <img src="../../static/img/img_top_right.png" alt="">
            <div class="hengxian" >
              <el-amap vid="amapDemo" ref="map" :center="center" :map-manager="amapManager" :zoom="zoom" :mapStyle='mapStyle'
                       style="width: 100%;height: 100%;position: relative">
              </el-amap>
            </div>
            <img src="../../static/img/img_bottom_left.png" alt="">
            <span class="bottom_shuxian"></span>
            <img src="../../static/img/img_bottom_right.png" alt="">
          </li>
          <li>
            <h3>今日预警</h3>
            <img src="../../static/img/mkdb.png" alt="">
            <div style="position: absolute;width: 100%;height: 12vw;padding:0 0.5vw">
              <ul class="jryj">
                <li><i>1</i>预警事件：<span>100</span>起</li>
                <li><i>2</i>预警处理事件：<span>100</span>起</li>
                <li><i>3</i>预警上报事件：<span>100</span>起</li>
              </ul>
            </div>
            <h3>视频</h3>
            <img src="../../static/img/img_top.png" alt="">
            <div class="hengxian">
              <!--<video :src="videourl"></video>-->
              <img src="../../static/img/shiping.png" alt="">
            </div>
            <img src="../../static/img/img_bottom.png" alt="">
          </li>
        </ul>
      </el-main>
      <el-footer style="height: 38.88%;">
        <ul>
          <li>
            <h3>利润情况</h3>
            <img src="../../static/img/img_top_left.png" alt="">
            <span class="top_shuxian"></span>
            <img src="../../static/img/img_top_right.png" alt="">
            <div class="hengxian">
              <LrqkEcharts ref="echarts"></LrqkEcharts>
            </div>
            <img src="../../static/img/img_bottom_left.png" alt="">
            <span class="bottom_shuxian"></span>
            <img src="../../static/img/img_bottom_right.png" alt="">
          </li>
          <li>
            <h3>收支情况</h3>
            <img src="../../static/img/img_top_left.png" alt="">
            <span class="top_shuxian"></span>
            <img src="../../static/img/img_top_right.png" alt="">
            <div class="hengxian">
              <szqkEcharts ref="echarts"></szqkEcharts>
            </div>
            <img src="../../static/img/img_bottom_left.png" alt="">
            <span class="bottom_shuxian"></span>
            <img src="../../static/img/img_bottom_right.png" alt="">
          </li>
        </ul>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import HorizontalLayout from '../components/HorizontalLayout.vue'
import VerticalLayout from '../components/VerticalLayout.vue'
import Echarts from '../components/Echarts.vue'
import LrqkEcharts from '../components/lrqkEcharts.vue'
import szqkEcharts from '../components/szqkEcharts.vue'
import jdsbEcharts from '../components/jdsbEcharts.vue'
import yhrwEcharts from '../components/yhrwEcharts.vue'
import { AMapManager } from 'vue-amap'
export default {
  components: {HorizontalLayout, VerticalLayout, Echarts, LrqkEcharts, szqkEcharts, jdsbEcharts, yhrwEcharts},
  data () {
    return {
      videourl: '',
      string: [],
      zcdata: {
        ql: 200,
        sd: 100,
        fwq: 10,
        sfz: 20
      },
      theme: false,
      date: new Date().toLocaleString(),
      menu: [],
      isCollapse: true,
      isCollapseChildMenu: [],
      childMenuTop: 0,
      isCollapseChildMenuShow: false,
      selectTab: '/home-page',
      tabsItem: [
        {name: '看板', path: '/home-page', closable: false}
      ],
      amapManager: new AMapManager(),
      zoom: 5,
      mapStyle: 'amap://styles/darkblue', // blue darkblue
      center: [116.29, 31.197646],
      events: {
        init: (map) => {
          this.trafficLayer.setMap(map)
          this.trafficLayer.hide()
        },
        'click': (e) => {
        }
      },
      markers: [],
      infoWindows: [],
      showingInfowindowsIndex: -1,
      markdata: []
    }
  },
  methods: {
    getMarkerWindows (list) {
      this.markers = []
      list.map((item, index) => {
        let imgurl = ''
        if (item.iconSkin === 'zc') {
          imgurl = './static/img/right.png'
        } else if (item.iconSkin === 'bj') {
          imgurl = './static/img/jb.png'
        } else if (item.iconSkin === 'yw') {
          imgurl = './static/img/wh.png'
        } else {
          imgurl = './static/img/p.png'
        }
        let s = `<div class="map-marker-div"><img src="${imgurl}" alt="" style=""></div>`
        let a = {
          key: item.plateNumber,
          position: [item.longitude, item.latitude],
          value: item,
          events: {
            init: (o) => {
            },
            click: () => {
              this.infoWindows.map(window => {
                window.visible = false
              })
              this.showingInfowindowsIndex = -1
              this.$nextTick(() => {
                this.showingInfowindowsIndex = index
                this.infoWindows[index].visible = true
              })
            }
          },
          template: `${s}`
        }
        this.markers.push(a)
        this.infoWindows.push({
          key: item.plateNumber,
          value: item,
          position: [item.longitude, item.latitude],
          visible: false
        })
      })
    },
    selfAdaption () {
      let _this = this
      setTimeout(() => {
        window.addEventListener('resize', function () {
          _this.$refs.echarts.resize()
        })
      }, 10)
    },
    getdate () {
      let self = this
      setInterval(function () {
        self.date = new Date().toLocaleString()
      }, 1000)
    },
    addTheme () {
      if (this.theme) {
        $('#app').removeClass('themeA')
      } else {
        $('#app').addClass('themeA')
      }
      this.theme = !this.theme
    },
    openApi (command) {
      window.open(command)
    },
    goto (url) {
      let hasTabs = false
      this.tabsItem.map(item => {
        if (item.path === url) {
          hasTabs = true
        }
      })
      this.$router.push({path: url})
      setTimeout(() => {
        if (!hasTabs) {
          if (url !== '/home-page') {
            if (!this.isMapTabs()) {
              this.tabsItem.push({name: this.$route.name, path: url, closable: true})
              sessionStorage.setItem('mainPageTabs', JSON.stringify(this.tabsItem))
            }
          }
        }
        this.selectTab = url
      }, 50)
    },
    collapseShow (event, item) {
      $('.float-child-menu').css('top', ($(event.target)[0].offsetTop + 40 - this.childMenuTop) + 'px')
      $('.float-child-menu').css('bottom', '')
      this.isCollapseChildMenuShow = true
      this.isCollapseChildMenu = item.children
      setTimeout(() => {
        if (($(window).height() - $('.float-child-menu').offset().top - $('.float-child-menu').height()) < 0) {
          $('.float-child-menu').css('top', '')
          $('.float-child-menu').css('bottom', '0px')
        }
      }, 100)
    },
    collapseHide () {
      this.isCollapseChildMenuShow = false
      this.isCollapseChildMenu = []
    },
    getMenuCss (item) {
      // path命名规范父子之间 - 分割
      if (this.$route.path.split('-')[0] === item.path) {
        return 'select-menu-li'
      }
    },
    tabClick (tab) {
      this.goto(tab.name)
    },
    tabsItemRemove (targetName) {
      this.tabsItem.map((item, index) => {
        if (item.path === targetName) {
          if (this.selectTab === targetName) {
            this.goto(this.tabsItem[index - 1].path)
          }
          this.tabsItem.splice(index, 1)
        }
      })
      sessionStorage.setItem('mainPageTabs', JSON.stringify(this.tabsItem))
    },
    // 判断是否为地图插件
    isMapTabs () {
      if (this.$route.path.indexOf('map') > -1) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.selfAdaption()
    this.string = '888.88'.split('')
    this.getdate()
    let tabs = JSON.parse(sessionStorage.getItem('mainPageTabs'))
    if (tabs) {
      this.tabsItem = tabs
    }
    if (this.$route.path === '/mainpage') {
      this.goto('/home-page')
    } else {
      this.goto(this.$route.path)
    }
    $('.float-menu').parent().parent().scroll(() => {
      this.childMenuTop = $('.float-menu').parent().parent().scrollTop()
    })
    window.setTimeout(() => {
      document.addEventListener('click', (event) => {
        var e = event || window.event // 浏览器兼容性
        var elem = e.target || e.srcElement
        let ischick = false
        while (elem) { // 循环判断至跟节点，防止点击的是div子元素
          if (elem.className && elem.className === 'el-scrollbar') {
            ischick = true
            return
          }
          if ((elem.className && elem.className === 'menu-li-cul float-child-menu')) {
            ischick = true
            return
          }
          elem = elem.parentNode
        }
        if (!ischick) {
          this.collapseHide()
        }
        document.removeEventListener('click', () => {
        }, false)
      }, false)
    }, 100)
    this.menu = JSON.parse(localStorage.getItem('menu'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .dp{
    background: #060b21;
    height: 56.25vw;
    color:#c7d9ff;
    font-size: 0.8vw;
    .el-header{
      padding: 0;
      .title{
        position: relative;
        font-size: 1.05vw;
        font-weight: bold;
        width: 100%;
        height: 100%;
        align-items:center;
        justify-content:center;
        line-height:1;
        margin: 0 auto;
        color: #c7d9ff;
        display: flex;
        .title_left{
          display: inline-block;
          color: #c7d9ff;
          height: 3vw;
          line-height: 3vw;
          position: absolute;
          left: 2vw;
        }
        img{
          width: 24.16vw;
        }
        .title_right{
          display: inline-block;
          color: #c7d9ff;
          height: 3vw;
          line-height: 3vw;
          position: absolute;
          right: 10vw;
        }
      }
    }
    .el-main{
      padding: 0.5vw;
      overflow: hidden;
      .ul_warp{
        height: 100%;
        >li{
          height: 100%;
          position: relative;
          float: left;
          margin-right: 0.5vw;
          width: 20.82vw;
          list-style: none;
          &:nth-child(1){
            img{
              height: auto;
              width: 100%;
            }
          }
          &:nth-child(2),&:nth-child(4){
            img{
              width: 100%;
              &:nth-of-type(1){
                margin-bottom: 0.5vw;
              }
            }
            h3{
              &:nth-of-type(2){
                top:13vw;
              }
            }
            .hengxian{
              height: calc(100% - 16.7vw);
            }
          }
          &:nth-child(3){
            width: 34.89vw;
            img{
              float: left;
              &:nth-of-type(1),&:nth-of-type(2){
                height: 3.825vw;
              }
              &:nth-of-type(3),&:nth-of-type(4){
                height: 1.825vw;
              }
              &:nth-of-type(2n){
                float: right;
              }
              width: auto;
            }
            .hengxian{
              height: calc(100% - 4.4vw);
            }
          }
          &:nth-child(4){
            margin-right: 0;
          }
          h3{
            font-size: 1vw;
            position: absolute;
            left: 2.2vw;
            top: 1vw;
          }
          img{
            height: auto;
            float: left;
          }
          .hengxian{
            background: url('../../static/img/img_hengxian.png') repeat-y;
            width: 100%;
            padding: 0 1vw;
            height: calc(100% - 4.2vw);
            background-size: 100% 100%;
            float: left;
          }
          .num_warp{
            display: inline-block;
            width: 1vw;
            margin: 0 0.3vw;
            text-align: center;
            height: 1.3vw;
            background: #185cb7;
            border-radius: 0.1vw;
          }
          .zclx{
            li{
              width: 7vw;
              height: 3vw;
              border: 1px solid #0f2e69;
              float: left;
              margin: 1vw 1.2vw;
              position: relative;
              i{
                display: inline-block;
                width: 1.8vw;
                height: 1.8vw;
                line-height: 1.8vw;
                text-align: center;
                border-radius: 50%;
                background: #fff;
                position: absolute;
                top: 0.6vw;
                left: 1vw;
              }
              span{
                position: absolute;
                top: 0.3vw;
                left: 3.6vw;
              }
              .name{
                color: #1671d7;
                top: 1.5vw;
              }
              &:nth-of-type(1){
                i{
                  background: rgba(77, 153, 50, 0.3);
                  color: #4d9932;
                }
              }
              &:nth-of-type(2){
                i{
                  background: rgba(49, 59, 255, 0.3);
                  color: #313bff;
                }
              }
              &:nth-of-type(3){
                i{
                  background: rgba(251, 142, 60, 0.3);
                  color: #fb8e3c;
                }
              }
              &:nth-of-type(4){
                i{
                  background: rgba(159, 51, 190, 0.3);
                  color: #9f33be;
                }
              }
            }
          }
          .yhrw{
            li{
              width: 5vw;
              height: 3vw;
              background: url("../../static/img/ditu.png") no-repeat;
              background-size: 100% 100%;
              float: left;
              margin: 0.6vw;
              position: relative;
              text-align: center;
              span{
                line-height: 1.5vw;
              }
            }
          }
          .jryj{
            position: absolute;
            left: 2vw;
            top: 3vw;
            li{
              height: 1.6vw;
              line-height: 1.6vw;
              i{
                font-style: normal;
                display: inline-block;
                width: 1.2vw;
                text-align: center;
                height: 1.2vw;
                line-height: 1.2vw;
                margin-right: 0.5vw;
                border-radius: 50%;
                background: #1a3084;
              }
              span{
                color: #ff953b;
                margin-right: 0.3vw;
              }
              &:nth-of-type(1){
                span{
                  color: #de1717;
                }
              }
            }
          }
        }
      }
    }
    .el-footer{
      padding: 0.5vw;
      overflow: hidden;
      width: 100vw;
      ul{
        height: 100%;
        li{
          height: 100%;
          position: relative;
          float: left;
          margin-right: 0.5vw;
          width: 49.25vw;
          list-style: none;
          h3{
            font-size: 1vw;
            position: absolute;
            left: 2.2vw;
            top: 1vw;
          }
          img{
            float: left;
            &:nth-of-type(1),&:nth-of-type(2){
              height: 3.825vw;
            }
            &:nth-of-type(3),&:nth-of-type(4){
              height: 1.825vw;
            }
            &:nth-of-type(2n){
              float: right;
            }
          }
          .hengxian{
            background: url('../../static/img/img_hengxian.png') repeat-y;
            width: 100%;
            height: calc(100% - 4.4vw);
            background-size: 100% 100%;
            float: left;
          }
          .top_shuxian{
            width: 36.11vw;
          }
          .bottom_shuxian{
            width: 45.6vw;
          }
          &:nth-of-type(2){
            margin-right: 0;
          }
        }
      }
    }
    .top_shuxian{
      display: inline-block;
      background: url('../../static/img/img_top_shuxian.png') repeat-x;
      height: 3.8vw;
      width: 21.75vw;
      background-size: 100% 100%;
      float: left
    }
    .bottom_shuxian{
      display: inline-block;
      background: url('../../static/img/img_bottom_shuxian.png') repeat-x;
      height: 1.1vw;
      width: 31.24vw;
      background-size: 100% 100%;
      float: left;
    }
  }
</style>
