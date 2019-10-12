<template>
  <div class="my-map-top" style="width:100%;height:100%">
    <div id="map" style="width: 100%; height: 100%; margin: 0;" ></div>
    <div class='map-content-up'>
      <div class='header'>专题查询</div>
      <div class='content-con'>
        <div class='info-list-con'>
          <div class='list-header'>资产专题</div>
            <div class='list-div'>
              <div class='list-div-header'>基础数据</div>
              <div class='list-div-content'>
                <div><span>路线</span></div>
                <div><span @click="changeMapShow">桥梁</span></div>
                <div><span @click="changeMapShow">隧道</span></div>
                <div><span @click="changeMapShow">收费站</span></div>
                <div><span @click="changeMapShow">服务区</span></div>
              </div>
            </div>
            <div class='list-div'>
              <div class='list-div-header'>专题图</div>
              <div class='list-div-content'>
                <div><span>按路线行政区划分</span></div>
                <div><span @click="changeMapShow">按桥梁跨度</span></div>
              </div>
            </div>
          </div>
        <div class='info-list-con'>
          <div class='list-header'>养护专题</div>
          <div class='list-div'>
            <div class='list-div-header'>基础数据</div>
            <div class='list-div-content'>
              <div><span @click="changeMapShow">日常养护</span></div>
              <div><span @click="changeMapShow">小修任务</span></div>
              <div><span @click="changeMapShow">绿化任务</span></div>
              <div><span @click="changeMapShow">应急抢修</span></div>
            </div>
          </div>
          <div class='list-div'>
            <div class='list-div-header'>路线信息</div>
            <div class='list-div-content'>
              <div><span @click="changeMapShow">甬台温高速</span></div>
              <div><span @click="changeMapShow">九瑞高速</span></div>
              <div><span @click="changeMapShow">贵黄高速</span></div>
              <div><span @click="changeMapShow">鄂东长江公路</span></div>
              <div><span>北仑港高速</span></div>
              <div><span>桂林高速</span></div>
              <div><span>京津塘高速</span></div>
              <div><span>重庆沪渝高速</span></div>
              <div><span>重庆渝黔高速</span></div>
              <div><span>毫阜高速</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='map-content-down' v-show="isChartShow">
      <div class='header'>
        <span v-show="chartNum===0">按桥梁跨度</span>
        <span v-show="chartNum===1">甬台温高速</span>
        <span v-show="chartNum===2">九瑞高速</span>
        <span v-show="chartNum===3">贵黄高速</span>
        <span v-show="chartNum===4">鄂东长江公路</span>
        <i class="el-icon-close" style="position:absolute;right:6px;top:8px;cursor:pointer;" @click="changeChartShow"></i>
      </div>
      <div>
        <div v-show="chartFlag0">
          <div id='myChart0' style='width:260px;height:240px'></div>
        </div>
        <div v-show="chartFlag1">
          <div id='myChart1' style='width:260px;height:240px'></div>
        </div>
        <div v-show="chartFlag2">
          <div id='myChart2' style='width:260px;height:240px'></div>
        </div>
        <div v-show="chartFlag3">
          <div id='myChart3' style='width:260px;height:240px'></div>
        </div>
        <div v-show="chartFlag4">
          <div id='myChart4' style='width:260px;height:240px'></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let Map = null
export default {
  data () {
    return {
      chartNum: 0,
      isChartShow: true,
      isShow: false,
      num: 0,
      isflag: true,
      lyarr: [
        {url: '/lkpd-lmsh', name: '', icon: 'icon-home', isNew: false},
        {url: '', name: '', icon: 'icon-message', isNew: true},
        {url: '', name: '', icon: 'icon-user', isNew: false},
        {url: 'GIS-link', name: 'GIS平台', icon: 'icon-map', isNew: false}
      ],
      nowDate: '',
      isCurrent: false,
      window: '',
      isCustom: true,
      chartData0: [
        {value: 335, name: '特大桥'},
        {value: 310, name: '大桥'},
        {value: 234, name: '中桥'},
        {value: 135, name: '小桥'},
        {value: 70, name: '未分类'}
      ],
      chartData1: [
        {value: 90, name: '优'},
        {value: 10, name: '良'},
        {value: 0, name: '中'},
        {value: 0, name: '次'},
        {value: 0, name: '差'}
      ],
      chartData2: [
        {value: 90, name: '优'},
        {value: 10, name: '良'},
        {value: 0, name: '中'},
        {value: 0, name: '次'},
        {value: 0, name: '差'}
      ],
      chartData3: [
        {value: 90, name: '优'},
        {value: 10, name: '良'},
        {value: 0, name: '中'},
        {value: 0, name: '次'},
        {value: 0, name: '差'}
      ],
      chartData4: [
        {value: 90, name: '优'},
        {value: 10, name: '良'},
        {value: 0, name: '中'},
        {value: 0, name: '次'},
        {value: 0, name: '差'}
      ],
      chartFlag0: true,
      chartFlag1: true,
      chartFlag2: true,
      chartFlag3: true,
      chartFlag4: true,
      searchOption: {
        city: '上海',
        citylimit: true
      }
    }
  },
  created () {
    this.getNowFormatDate()
  },
  mounted () {
    this.isChartShow = false
    this.init()
    // this.drawLine('myChart0',this.chartData0)
    this.drawLine('myChart0', this.chartData0)
    this.drawLine('myChart1', this.chartData1)
    this.drawLine('myChart2', this.chartData2)
    this.drawLine('myChart3', this.chartData3)
    this.drawLine('myChart4', this.chartData4)
  },
  methods: {
    init () {
      let self = this
      Map = new HMap('map', config.mapConfig)
      /* let Maps = new HMap.Map()
      Maps.initMap('map', config.mapConfig)
      Maps.on('click', function (event) {
      }) */
      let informationWindow = null
      Map.on('feature:onselect', event => {
        Map.removeOverlay(informationWindow)
        informationWindow = new HMap.Popover(Map.getMap(), {
          showCloser: true,
          showMarkFeature: false,
          showMinimize: false
        })
        Map.addOverlay(informationWindow)
        let content = '<div style="width: auto;padding: 10px">' +
          '<div style="white-space: nowrap">' + self.content.name + ':' + event.value.N.name + '</div>' +
          '<p style="white-space: nowrap">' + self.content.dw + ':' + event.value.N.jianzhu + '</p>' +
          '</div>'
        informationWindow.show(event.originEvent.coordinate, content)
      })
      config.Maps = Map
      let control = new ol.control.LayerSwitcher({
        itemWidth: 86,
        itemHeight: 60,
        layers: [
          {
            layerName: 'ArcGIS',
            name: '矢量',
            icon: 'static/img/shiliang.png'
          },
          {
            layerName: 'WMTS2',
            name: '影像',
            icon: 'static/img/yingxiang.png'
          },
          {
            layerName: 'WMTS1',
            name: '地形',
            icon: 'static/img/dixing.png'
          }
        ]
      })
      Map.addControl(control)
      self.flag = false
    },
    getNowFormatDate () {
      let date = new Date()
      let seperator1 = '-'
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour
      }
      if (minute >= 0 && minute <= 9) {
        minute = '0' + minute
      }
      if (second >= 0 && second <= 9) {
        second = '0' + second
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + hour + ':' + minute + ':' + second
      this.nowDate = currentdate
      setTimeout(() => {
        this.getNowFormatDate()
      }, 1000)
    },
    goto (url, index) {
      this.$router.push({path: url})
    },
    removeFeatureByLayerName (_layerName) {
      if (!Map) return
      Map.removeFeatureByLayerName(_layerName)
    },
    changeMapShow (event) {
      let el = event.currentTarget
      $(el).parents('.content-con').find('span').removeClass('current')
      $(el).addClass('current')
      this.removeFeatureByLayerName('qiaoliang')
      this.removeFeatureByLayerName('suidao')
      this.removeFeatureByLayerName('shoufeizhan')
      this.removeFeatureByLayerName('fuwuqu')
      this.removeFeatureByLayerName('richangyanghu')
      this.chartFlag0 = false
      this.chartFlag1 = false
      this.chartFlag2 = false
      this.chartFlag3 = false
      this.chartFlag4 = false
      let arr = []
      let points = []
      switch ($(el).text()) {
        case '桥梁':
          arr = [
            {pt: [115.52425, 29.723505], name: '罗城畈分离立交桥', type: '中交第一航务局'},
            {pt: [115.82790071, 29.59058468], name: '九江西互通A匝道上跨主线桥', type: '中交第一航务局'},
            {pt: [115.77602422, 29.61288044], name: '新合2号高架桥', type: '中交第一航务局'},
            {pt: [115.64062849, 29.6484427], name: '大塘分离立交桥', type: '中交第一航务局'},
            {pt: [115.68134833, 29.63442833], name: '涌泉高架桥', type: '中交第一航务局'},
            {pt: [115.51631666, 29.73200833], name: '南阳分离立交桥', type: '中交第一航务局'},
            {pt: [115.875895, 29.56634], name: '沙河高架桥', type: '中交第一航务局'},
            {pt: [115.750495, 29.61102666], name: '高粱铺中桥', type: '中交第一航务局'}
          ]
          config.Maps.map.getView().setCenter(arr[0].pt)
          config.Maps.map.getView().setZoom(10)
          this.content = {name: '桥梁名称', dw: '建造单位'}
          for (let i = 0; i < arr.length; i++) {
            let obj = {}
            obj['attributes'] = {
              id: (i + 1).toString(),
              name: arr[i].name,
              jianzhu: arr[i].type
            }
            obj['geometry'] = 'POINT (' + arr[i].pt[0] + ' ' + arr[i].pt[1] + ')'
            points.push(obj)
          }
          Map.addPoints(points, {
            layerName: 'qiaoliang',
            zoomToExtent: false,
            selectable: true,
            highLight: true,
            style: {
              image: {
                type: 'icon',
                image: {
                  imageSrc: 'static/img/qiaoliang.png',
                  imageAnchor: [0.5, 1]
                }
              }
            },
            selectStyle: {
              image: {
                type: 'icon',
                image: {
                  imageSrc: 'static/img/qiaoliang.png',
                  imageAnchor: [0.5, 1]
                }
              }
            }
          })
          this.isChartShow = false
          break
        case '隧道':
          arr = [
            {pt: [110.45005863000, 24.70314107], name: '高田隧道', type: '中铁十七局二公司'},
            {pt: [110.47077139, 24.70043769], name: '岩碑隧道（下行）', type: '中铁十七局二公司'},
            {pt: [110.63280965, 24.65827695], name: '白竹塘隧道（下行）', type: '中铁一局集团有限公司'},
            {pt: [110.568462, 24.68496701], name: '道其龙隧道(上行)', type: '中铁三局集团有限公司'},
            {pt: [110.62748598, 24.66390045], name: '白竹塘隧道(上行)', type: '中铁三局集团有限公司'},
            {pt: [110.47255845, 24.70081622], name: '白竹塘隧道(上行)', type: '中铁三局集团有限公司'},
            {pt: [110.57333296, 24.6820682], name: '白竹塘隧道(上行)', type: '中铁三局集团有限公司'}
          ]
          config.Maps.map.getView().setCenter(arr[0].pt)
          config.Maps.map.getView().setZoom(10)
          for (let i = 0; i < arr.length; i++) {
            let obj = {}
            obj['attributes'] = {
              id: (i + 1).toString(),
              name: arr[i].name,
              jianzhu: arr[i].type
            }
            obj['geometry'] = 'POINT (' + arr[i].pt[0] + ' ' + arr[i].pt[1] + ')'
            points.push(obj)
          }
          Map.addPoints(points, {
            layerName: 'suidao',
            zoomToExtent: false,
            selectable: true,
            highLight: true,
            style: {
              image: {
                type: 'icon',
                image: {
                  imageSrc: 'static/img/suidao.png',
                  imageAnchor: [0.5, 1]
                }
              }
            },
            selectStyle: {
              image: {
                type: 'icon',
                image: {
                  imageSrc: 'static/img/suidao.png',
                  imageAnchor: [0.5, 1]
                }
              }
            }
          })
          this.content = {name: '隧道名称', dw: '建造单位'}
          /* Map.on('feature:onselect', event => {
            Map.removeOverlay(informationWindow)
            informationWindow = new HMap.Popover(Map.getMap(), {
              showCloser: true,
              showMarkFeature: false,
              showMinimize: false
            })
            Map.addOverlay(informationWindow)
            let content = '<div style="width: auto;padding: 10px">' +
              '<div style="white-space: nowrap">隧道名称: ' + event.value.N.name + '</div>' +
              '<p  style="white-space: nowrap">建造单位: ' + event.value.N.jianzhu + '</p>' +
              '</div>'
            informationWindow.show(event.originEvent.coordinate, content)
          }) */
          this.isChartShow = false
          break
        case '收费站':
          arr = [
            {pt: [115.49798692, 29.74605077], name: '南阳收费站', type: '九江市'},
            {pt: [115.47387676, 29.7552765], name: '省界收费站', type: '九江市'},
            {pt: [115.63007459, 29.65353546], name: '瑞昌收费站', type: '九江市'},
            {pt: [115.8284271, 29.59490822], name: '狮子收费站', type: '九江市'},
            {pt: [110.30287954, 25.40878539], name: '灵川西收费站', type: '桂林市'},
            {pt: [110.64121301, 24.64755515], name: '平乐收费站', type: '桂林市'},
            {pt: [110.28072766, 24.98175755], name: '临桂六塘收费站', type: '桂林市'}
          ]
          for (let i = 0; i < arr.length; i++) {
            let obj = {}
            obj['attributes'] = {
              id: (i + 1).toString(),
              name: arr[i].name,
              jianzhu: arr[i].type
            }
            obj['geometry'] = 'POINT (' + arr[i].pt[0] + ' ' + arr[i].pt[1] + ')'
            points.push(obj)
          }
          Map.addPoints(points, {
            layerName: 'shoufeizhan',
            zoomToExtent: true,
            selectable: true,
            highLight: true,
            style: {
              image: {
                type: 'icon',
                image: {
                  imageSrc: 'static/img/shoufeizhan.png',
                  imageAnchor: [0.5, 1]
                }
              }
            },
            selectStyle: {
              image: {
                type: 'icon',
                image: {
                  imageSrc: 'static/img/shoufeizhan.png',
                  imageAnchor: [0.5, 1]
                }
              }
            }
          })
          this.content = {name: '收费站名称', dw: '所在地'}
          this.isChartShow = false
          break
        case '服务区':
          arr = [
            {pt: [115.68919852, 29.62658991], name: '涌泉服务区', type: '18870206896'},
            {pt: [110.71721887, 24.64539665], name: '平乐服务区', type: '0773-6979620'},
            {pt: [110.25144531, 25.09154041], name: '会仙服务区', type: '0773-3221911'},
            {pt: [110.42825699, 24.75243374], name: '高田服务区', type: '0773-3221911'},
            {pt: [110.29064397, 25.38026605], name: '灵川服务区', type: '0773-3193338'},
            {pt: [110.32239657, 24.92802501], name: '东山停车区', type: '0773-3221911'}
          ]
          config.Maps.map.getView().setCenter(arr[0].pt)
          config.Maps.map.getView().setZoom(10)
          for (let i = 0; i < arr.length; i++) {
            let obj = {}
            obj['attributes'] = {
              id: (i + 1).toString(),
              name: arr[i].name,
              jianzhu: arr[i].type
            }
            obj['geometry'] = 'POINT (' + arr[i].pt[0] + ' ' + arr[i].pt[1] + ')'
            points.push(obj)
          }
          Map.addPoints(points, {
            layerName: 'fuwuqu',
            zoomToExtent: false,
            selectable: true,
            highLight: true,
            style: {
              image: {
                type: 'icon',
                image: {
                  imageSrc: 'static/img/fuwuqu.png',
                  imageAnchor: [0.5, 1]
                }
              }
            },
            selectStyle: {
              image: {
                type: 'icon',
                image: {
                  imageSrc: 'static/img/fuwuqu.png',
                  imageAnchor: [0.5, 1]
                }
              }
            }
          })
          this.content = {name: '服务区名称', dw: '联系方式'}
          this.isChartShow = false
          break
        case '日常养护':
          arr = [
            {pt: [115.52425, 29.723505], name: '日常清扫', type: '杭瑞高速'},
            {pt: [115.82790071, 29.59058468], name: '日常清扫', type: '杭瑞高速'},
            {pt: [115.77602422, 29.61288044], name: '日常清扫', type: '杭瑞高速'},
            {pt: [115.64062849, 29.6484427], name: '日常清扫', type: '杭瑞高速'}
          ]
          config.Maps.map.getView().setCenter(arr[0].pt)
          config.Maps.map.getView().setZoom(10)
          this.content = {name: '养护类型', dw: '路线名称'}
          for (let i = 0; i < arr.length; i++) {
            let obj = {}
            obj['attributes'] = {
              id: (i + 1).toString(),
              name: arr[i].name,
              jianzhu: arr[i].type
            }
            obj['geometry'] = 'POINT (' + arr[i].pt[0] + ' ' + arr[i].pt[1] + ')'
            points.push(obj)
          }
          Map.addPoints(points, {
            layerName: 'richangyanghu',
            zoomToExtent: false,
            selectable: true,
            highLight: true,
            style: {
              image: {
                type: 'icon',
                image: {
                  imageSrc: 'static/img/richangyanghu.png',
                  imageAnchor: [0.5, 1]
                }
              }
            },
            selectStyle: {
              image: {
                type: 'icon',
                image: {
                  imageSrc: 'static/img/richangyanghu.png',
                  imageAnchor: [0.5, 1]
                }
              }
            }
          })
          this.isChartShow = false
          break
        case '小修任务':
          arr = [
            {pt: [115.52425, 29.723505], name: '路面修复', type: '杭瑞高速'},
            {pt: [115.82790071, 29.59058468], name: '护栏修复', type: '杭瑞高速'},
            {pt: [115.77602422, 29.61288044], name: '路面修复', type: '杭瑞高速'},
            {pt: [115.64062849, 29.6484427], name: '路面修复', type: '杭瑞高速'}
          ]
          config.Maps.map.getView().setCenter(arr[0].pt)
          config.Maps.map.getView().setZoom(10)
          this.content = {name: '养护类型', dw: '路线名称'}
          for (let i = 0; i < arr.length; i++) {
            let obj = {}
            obj['attributes'] = {
              id: (i + 1).toString(),
              name: arr[i].name,
              jianzhu: arr[i].type
            }
            obj['geometry'] = 'POINT (' + arr[i].pt[0] + ' ' + arr[i].pt[1] + ')'
            points.push(obj)
          }
          Map.addPoints(points, {
            layerName: 'richangyanghu',
            zoomToExtent: false,
            selectable: true,
            highLight: true,
            style: {
              image: {
                type: 'icon',
                image: {
                  imageSrc: 'static/img/richangyanghu.png',
                  imageAnchor: [0.5, 1]
                }
              }
            },
            selectStyle: {
              image: {
                type: 'icon',
                image: {
                  imageSrc: 'static/img/richangyanghu.png',
                  imageAnchor: [0.5, 1]
                }
              }
            }
          })
          this.isChartShow = false
          break
        case '绿化任务':
          arr = [
            {pt: [115.52425, 29.723505], name: '绿植养护', type: '杭瑞高速'},
            {pt: [115.82790071, 29.59058468], name: '绿植养护', type: '杭瑞高速'},
            {pt: [115.77602422, 29.61288044], name: '绿植养护', type: '杭瑞高速'},
            {pt: [115.64062849, 29.6484427], name: '绿植养护', type: '杭瑞高速'}
          ]
          config.Maps.map.getView().setCenter(arr[0].pt)
          config.Maps.map.getView().setZoom(10)
          this.content = {name: '养护类型', dw: '路线名称'}
          for (let i = 0; i < arr.length; i++) {
            let obj = {}
            obj['attributes'] = {
              id: (i + 1).toString(),
              name: arr[i].name,
              jianzhu: arr[i].type
            }
            obj['geometry'] = 'POINT (' + arr[i].pt[0] + ' ' + arr[i].pt[1] + ')'
            points.push(obj)
          }
          Map.addPoints(points, {
            layerName: 'richangyanghu',
            zoomToExtent: false,
            selectable: true,
            highLight: true,
            style: {
              image: {
                type: 'icon',
                image: {
                  imageSrc: 'static/img/lvhuarenwu.png',
                  imageAnchor: [0.5, 1]
                }
              }
            },
            selectStyle: {
              image: {
                type: 'icon',
                image: {
                  imageSrc: 'static/img/lvhuarenwu.png',
                  imageAnchor: [0.5, 1]
                }
              }
            }
          })
          this.isChartShow = false
          break
        case '应急抢修':
          arr = [
            {pt: [115.52425, 29.723505], name: '护栏抢修', type: '杭瑞高速'},
            {pt: [115.82790071, 29.59058468], name: '护栏抢修', type: '杭瑞高速'},
            {pt: [115.77602422, 29.61288044], name: '护栏抢修', type: '杭瑞高速'},
            {pt: [115.64062849, 29.6484427], name: '护栏抢修', type: '杭瑞高速'}
          ]
          config.Maps.map.getView().setCenter(arr[0].pt)
          config.Maps.map.getView().setZoom(10)
          this.content = {name: '养护类型', dw: '路线名称'}
          for (let i = 0; i < arr.length; i++) {
            let obj = {}
            obj['attributes'] = {
              id: (i + 1).toString(),
              name: arr[i].name,
              jianzhu: arr[i].type
            }
            obj['geometry'] = 'POINT (' + arr[i].pt[0] + ' ' + arr[i].pt[1] + ')'
            points.push(obj)
          }
          Map.addPoints(points, {
            layerName: 'richangyanghu',
            zoomToExtent: false,
            selectable: true,
            highLight: true,
            style: {
              image: {
                type: 'icon',
                image: {
                  imageSrc: 'static/img/yingjiqiangxiu.png',
                  imageAnchor: [0.5, 1]
                }
              }
            },
            selectStyle: {
              image: {
                type: 'icon',
                image: {
                  imageSrc: 'static/img/yingjiqiangxiu.png',
                  imageAnchor: [0.5, 1]
                }
              }
            }
          })
          this.isChartShow = false
          break
        case '按桥梁跨度':
          this.chartNum = 0
          this.chartFlag0 = true
          for (let i = 0; i < this.markers.length; i++) {
            this.$set(this.markers[i], 'visible', false)
          }
          this.isChartShow = true
          break
        case '甬台温高速':
          config.Maps.map.getView().setCenter([120.37445068359375, 27.5042724609375])
          config.Maps.map.getView().setZoom(8)
          this.chartNum = 1
          this.chartFlag1 = true
          this.center = [121.690138, 29.827425]
          this.$set(this.markers[5], 'visible', true)
          this.isChartShow = true
          break
        case '九瑞高速':
          config.Maps.map.getView().setCenter([115.833254, 29.603772])
          config.Maps.map.getView().setZoom(8)
          this.chartNum = 2
          this.chartFlag2 = true
          this.center = [115.635317, 29.647577]
          this.$set(this.markers[6], 'visible', true)
          this.isChartShow = true
          break
        case '贵黄高速':
          config.Maps.map.getView().setCenter([106.903691, 28.830676])
          config.Maps.map.getView().setZoom(8)
          this.chartNum = 3
          this.chartFlag3 = true
          this.center = [106.669353, 26.559465]
          this.$set(this.markers[7], 'visible', true)
          this.isChartShow = true
          break
        case '鄂东长江公路':
          config.Maps.map.getView().setCenter([115.009675, 30.310488])
          config.Maps.map.getView().setZoom(8)
          this.chartNum = 4
          this.chartFlag4 = true
          this.center = [115.075206, 30.258284]
          this.$set(this.markers[8], 'visible', true)
          this.isChartShow = true
          break
      }
    },
    drawLine (el, chartData) {
      let data = []
      for (let i = 0; i < chartData.length; i++) {
        data.push(chartData[i].name)
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(el))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{d}%'
        },
        legend: {
          orient: 'horizontal',
          y: 'bottom',
          padding: 10,
          tooltip: {
            show: true
          },
          data: data
        },
        color: ['rgb(136,159,255)', 'rgb(143,199,246)', 'rgb(248,209,54)', 'rgb(1436,219,189)', 'rgb(220,221,225)'],
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                formatter: '{b}: {c}%',
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
            data: chartData
          }
        ]
      })
    },
    changeChartShow () {
      this.isChartShow = false
    },
    createInfosDiv () {
      let self = this
      for (let i = 0; i < this.markers.length; i++) {
        this.$set(this.markers[i], 'visible', false)
        this.$set(this.markers[i], 'events', {
          click () {
            if (self.window.visible) {
              self.window.visible = false
            } else {
              self.windows.forEach(window => {
                window.visible = false
              })
              self.window = self.windows[i]
              self.window.visible = true
            }
          }
        })
        if (this.windows[i].visible) {
          this.markers[i].events.click()
        }
      }
    }
  }
}
</script>

<style lang="scss">
.my-map-top{
  .hmap-control-zoom{
    bottom: 8.5em!important;
  }
  .header-div{
    width: 100%;
    height: 56px;
    background-color: #00448b;
    box-shadow: 0px 3px 7px 0px
    rgba(0, 68, 139, 0.35);
    position:fixed;
    top:0;
    z-index:1000;
    color:#fff;
  }
  ul{
    height: 100%;
    padding-top:18px;
    margin-left:94px;
    position:absolute;
    right:0px;
  }
  ul li{
    float:left;
    height: 16px;
    border-left:1px solid rgb(206,218,231);
    width:45px;
    text-align:center;
    position:relative;
  }
  ul li i{
    position:absolute;
    top:-2px;
    right:15px;
  }
  ul li span{
    display:inline-block;
    height:6px;
    width:6px;
    background:red;
    border-radius:50%;
    position:absolute;
    top:0;
    right:10px;
  }
  .amap-GIS{
    width:100%;
    height:100%;
    z-index:100;
  }
  .logo .logo-text{
    position:absolute;
    left:40px;
    text-align:center;
    width:190px;
    height:100%;
    line-height:56px;
    font-size:18px;
    font-family:Avenir,Helvetica,Arial,sans-serif;
  }
  .map-content-up{
    width:300px;
    height:500px;
    background:#fff;
    position:fixed;
    top:calc(56px + 1%);
    left:1%;
    border-radius: 5px;
  }
  .map-content-up span{
    padding:3px 5px;
    cursor: pointer;
    user-select: none;
  }
  .header{
    background: rgb(49,134,240);
    height:28px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    color:#fff;
    line-height: 28px;
    text-indent: 10px;
  }
  .map-content-up .list-header{
    font-weight: bold;
    text-indent: 10px;
    padding:5px 0;
  }
  .map-content-up .list-div .list-div-header{
    color:blue;
    margin-left: 10px;
    position:relative;
    // border-left:2px solid blue;
    text-indent:15px;
  }
  .map-content-up .list-div .list-div-header::before{
    content:"";
    position:absolute;
    top:3px;
    left:9px;
    display: inline-block;
    width:2px;
    height:11px;
    background:blue;
  }
  .map-content-up .list-div .list-div-content{
    margin:0px 0px 10px 20px;
  }
  .map-content-up .list-div .list-div-content div{
    display: inline-block;
    margin-right:54px;
    margin-top:10px;
    position: relative;
  }
  .map-content-up .list-div .list-div-content div:nth-child(4){
    margin-right:43px;
  }
  .map-content-down{
    width:260px;
    height:268px;
    background:#fff;
    position:fixed;
    bottom:3%;
    right:10%;
    border-radius: 5px;
  }
  .info-list-con:first-child .list-div:last-child .list-div-content div{
    margin-right:30px;
  }
  .info-list-con:nth-child(2) .list-div-content div{
    margin-right:30px;
  }
  .info-list-con:nth-child(2) .list-div-content div{
    margin-right:30px;
  }
  .info-list-con:nth-child(2) .list-div:last-child .list-div-content div{
    margin-right:50px;
    width: 82px;
  }
  .amap-info{
    width:0 !important;
    height:0 !important;
  }
  .window-info-con{
    background:#fff;
    position: relative;
    float:left;
    padding: 10px;
    top:-43px;
  }
  .window-info-con::before{
    content:"";
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 15px solid #fff;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    position:absolute;
    top:100%;
    left:45%;
  }
  .current{
    color: blue;
    background:#ddd;
    padding:3px 5px;
  }
  .el-vue-search-box-container{
    top: 65px;
    left: 325px;
  }
}
</style>
