let config = {
  ip: 'http://192.168.10.234:8002',
  ip2: 'http://192.168.10.234:8003',
  ip3: 'http://192.168.10.234:8001',
  ip4: 'http://192.168.10.234:8004',
  ip5: 'http://192.168.10.234:8006',
  ip6: 'http://192.168.10.234:8005',
  // ip: 'http://172.16.21.182:8002',
  // ip2: 'http://172.16.21.182:8003',
  // ip2: 'http://192.168.1.74:8003',
  // ip3: 'http://192.168.1.74:8001',
  // ip3: 'http://172.16.21.182:8001',
  // ip4: 'http://172.16.21.182:8004',
  // ip5: 'http://172.16.21.182:8006 ',
  bbsrc: 'http://192.168.10.234:8080/WebReport/ReportServer?',
  // bbsrc: 'http://192.168.3.39:8075/WebReport/ReportServer?',
  pageSizes: [10, 15, 20, 30],
  pageSize: 10,
  mapConfig: {
    controls: {
      zoom: true,
      rotate: false,
      loading: false,
      fullScreen: true,
      scaleLine: true,
      zoomSlider: true
    },
    view: {
      center: [110.2587890625, 32.62939453125],
      projection: 'EPSG:4326',
      zoom: 6
    },
    baseLayers: [
      {
        layerName: 'ArcGIS',
        isDefault: true,
        layerType: 'TileXYZ',
        tileGrid: {
          tileSize: 256,
          extent: [54.80680107615214, 2.961069357253247, 155.0039782010715, 54.12425292666519],
          origin: [-400, 399.9999999999998],
          resolutions: [
            0.0624062618086491,
            0.04394531353227711,
            0.021972656766138556,
            0.010986328383069278,
            0.005493164191534639,
            0.0027465809060368165,
            0.0013732916427489112,
            6.866458213744556E-4,
            3.433229106872278E-4,
            1.716614553436139E-4,
            8.582953794130404E-5,
            4.291595870115493E-5,
            2.1457979350577466E-5,
            1.0728989675288733E-5,
            5.363305107141452E-6,
            2.681652553570726E-6
          ]
        },
        layerUrl: 'http://211.101.37.251:6080/arcgis/rest/services/quanguo/QGGS_dan20181224/MapServer/tile/{z}/{y}/{x}'
      },
      {
        layerName: 'WMTS1',
        isDefault: false,
        layerType: 'TileWMTS',
        projection: 'EPSG:4326',
        extent: [-180, -90, 180, 90],
        levels: 19,
        layer: 'ter',
        format: 'tiles',
        matrixSet: 'c',
        layerUrl: 'http://t{0-6}.tianditu.com/ter_c/wmts'
      },
      {
        layerName: 'WMTS2',
        isDefault: false,
        layerType: 'TileWMTS',
        projection: 'EPSG:4326',
        extent: [-180, -90, 180, 90],
        levels: 19,
        layer: 'img',
        format: 'tiles',
        matrixSet: 'c',
        layerUrl: 'http://t{0-6}.tianditu.com/img_c/wmts'
      }
    ]
  },
  layerConfig: {
    qgsyd: {
      layerName: 'qgsyd',
      isDefault: false,
      layerType: 'TileWMS',
      // layerUrl: 'http://60.247.54.34:8862/hdmapserver/wms',
      layerUrl: 'http://211.101.37.251:6080/arcgis/rest/services/quanguo/QGGS_dan20181224/MapServer?f=jsapi',
      // layerUrl: 'http://60.247.54.34:8862/hdmapserver/wms',
      // http://211.101.37.234:8088/hdmapserver/gwc/service/wms?LAYERS=QGSYDMAP&FORMAT=image%2Fpng&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG%3A4326&BBOX=104.0625,33.75,106.875,36.5625&WIDTH=256&HEIGHT=256
      layers: 'QGSYDMAP',
      styles: '',
      projection: 'EPSG:3857',
      srs: 'EPSG:4326',
      version: '1.1.1',
      bbox: '79.92441218557393,18.344250404232827,131.63323891374492,50.40780675038131',
      tiled: true,
      addLayer: true,
      create: true,
      opacity: 0.7,
      cql_filter: '1=1'
    }
  },

  Maps: {},
  mapip: 'http://211.101.37.251:6080/arcgis/rest/services/quanguo/QGGS_dan20181224/MapServer',
  mks: [
    //02路况评定
    {
      mkid: '02',
      fmkid: '',
      mkname: '路况评定',
      name: '招商公路运营管理平台',
      url: '/lkpd',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/Main'
    },
    {
      mkid: '0201',
      fmkid: '',
      mkname: '检测数据导入',
      name: '招商公路运营管理平台',
      url: '/lkpd-jcsjdr',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '020101',
      fmkid: '',
      mkname: '路面损坏(PCI)',
      name: '招商公路运营管理平台',
      url: '/lkpd-lmsh',
      isMenu: true,
      img: 'icon-caidan1',
      zj: '/lkpd/lmsh'
    },
    {
      mkid: '020102',
      fmkid: '',
      mkname: '路面平整度(RQI)',
      name: '招商公路运营管理平台',
      url: '/lkpd-lmpzd',
      isMenu: true,
      img: 'icon-caidan1',
      zj: '/lkpd/lmpzd'
    },
    {
      mkid: '020103',
      fmkid: '',
      mkname: '路面车辙(RDI)',
      name: '招商公路运营管理平台',
      url: '/lkpd-lmcz',
      isMenu: true,
      img: 'icon-caidan1',
      zj: '/lkpd/lmcz'
    },
    {
      mkid: '020104',
      fmkid: '',
      mkname: '抗滑性能(SRI)',
      name: '招商公路运营管理平台',
      url: '/lkpd-khxn',
      isMenu: true,
      img: 'icon-caidan1',
      zj: '/lkpd/khxn'
    },
    {
      mkid: '020105',
      fmkid: '',
      mkname: '结构强度(PSSI)',
      name: '招商公路运营管理平台',
      url: '/lkpd-jgqd',
      isMenu: true,
      img: 'icon-caidan1',
      zj: '/lkpd/jgqd'
    },
    {
      mkid: '020106',
      fmkid: '',
      mkname: '路基(SCI)',
      name: '招商公路运营管理平台',
      url: '/lkpd-lj',
      isMenu: true,
      img: 'icon-caidan1',
      zj: '/lkpd/lj'
    },
    {
      mkid: '020107',
      fmkid: '',
      mkname: '桥隧构造物(BCI)',
      name: '招商公路运营管理平台',
      url: '/lkpd-qsgzw',
      isMenu: true,
      img: 'icon-caidan1',
      zj: '/lkpd/qsgzw'
    },
    {
      mkid: '020108',
      fmkid: '',
      mkname: '沿线设施(TCI)',
      name: '招商公路运营管理平台',
      url: '/lkpd-yxss',
      isMenu: true,
      img: 'icon-caidan1',
      zj: '/lkpd/yxss'
    },
    {
      mkid: '0202',
      fmkid: '',
      mkname: '路况评定',
      name: '招商公路运营管理平台',
      url: '/lkpd-lkpd',
      isMenu: true,
      img: 'icon-caidan1',
      zj: '/Main'
    },
    {
      mkid: '020201',
      fmkid: '',
      mkname: '路况评定方案',
      name: '招商公路运营管理平台',
      url: '/lkpd-lkpdfa',
      isMenu: true,
      img: 'icon-caidan1',
      zj: '/lkpd/lkpdfa'
    },
    {
      mkid: '020202',
      fmkid: '',
      mkname: '技术状况评定明细表',
      name: '招商公路运营管理平台',
      url: '/lkpd-jszkpdmxb',
      isMenu: true,
      img: 'icon-caidan1',
      zj: '/lkpd/jszkpdmxb'
    },
    {
      mkid: '020203',
      fmkid: '',
      mkname: '技术状况评定汇总表',
      name: '招商公路运营管理平台',
      url: '/lkpd-jszkpdhzb',
      isMenu: true,
      img: 'icon-caidan1',
      zj: '/lkpd/jszkpdhzb'
    },
    {
      mkid: '020204',
      fmkid: '',
      mkname: '参数管理',
      name: '招商公路运营管理平台',
      url: '/lkpd-csgl',
      isMenu: true,
      img: 'el-icon-tickets',
      zj: '/lkpd/csgl'
    },





    //03日常养护工程
    {
      mkid: '03',
      fmkid: '',
      mkname: '日常养护工程',
      name: '招商公路运营管理平台',
      url: '/rcyhgc',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/Main'
    },
    {
      mkid: '0301',
      fmkid: '',
      mkname: '履约检查',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-lyjc',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/Main'
    },
    {
      mkid: '030101',
      fmkid: '',
      mkname: '施工单位履约检查表',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-sgdwlyjcb',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/sgdwlyjcb'
    },
    {
      mkid: '030102',
      fmkid: '',
      mkname: '进场准备情况检查表',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-jczbqkjcb',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/jczbqkjcb'
    },
    {
      mkid: '0302',
      fmkid: '',
      mkname: '月度施工计划',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-ydsgjh',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/Main'
    },
    {
      mkid: '030201',
      fmkid: '',
      mkname: '月度施工计划申报',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-ydsgjhsb',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/ydsgjhsb'
    },
    {
      mkid: '030202',
      fmkid: '',
      mkname: '月度施工计划完成情况',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-ydsgjhwcqk',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/ydsgjhwcqk'
    },
    {
      mkid: '0303',
      fmkid: '',
      mkname: '养护巡查',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-yhxc',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/Main'
    },
    {
      mkid: '030301',
      fmkid: '',
      mkname: '巡查次数配置',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-xccspz',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/xccspz'
    },
    /* {
     mkid: '030302',
     fmkid: '',
     mkname: '启动巡查',
     name: '启动巡查',
     url: '/rcyhgc-qdxc',
     isMenu: true,
     img: 'el-icon-remove',
     zj: '/rcyhgc/qdxc'
     },
     {
     mkid: '030303',
     fmkid: '',
     mkname: '巡查上报',
     name: '巡查上报',
     url: '/rcyhgc-xcsb',
     isMenu: true,
     img: 'el-icon-remove',
     zj: '/rcyhgc/xcsb'
     },
     {
     mkid: '030304',
     fmkid: '',
     mkname: '结束巡查',
     name: '结束巡查',
     url: '/rcyhgc-jsxc',
     isMenu: true,
     img: 'el-icon-remove',
     zj: '/rcyhgc/jsxc'
     }, */
    {
      mkid: '030305',
      fmkid: '',
      mkname: '巡查次数分析',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-xccsfx',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/xccsfx'
    },
    {
      mkid: '030306',
      fmkid: '',
      mkname: '巡查监督',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-xcjd',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/xcjd'
    },
    {
      mkid: '030307',
      fmkid: '',
      mkname: '巡查事件',
      name: '巡查事件',
      url: '/rcyhgc-xcsj',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/xcsj'
    },
    {
      mkid: '0304',
      fmkid: '',
      mkname: '小修任务',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-xxrw',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/Main'
    },
    {
      mkid: '030401',
      fmkid: '',
      mkname: '养护任务单审核',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-yhrwdsh',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/yhrwdsh'
    },
    {
      mkid: '030402',
      fmkid: '',
      mkname: '养护任务单验收',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-yhrwdys',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/yhrwdys'
    },
    {
      mkid: '030403',
      fmkid: '',
      mkname: '清扫任务单审核',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-qsrwdsh',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/qsrwdsh'
    },
    {
      mkid: '030404',
      fmkid: '',
      mkname: '维修施工照片记录',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-wxsgzpjl',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/wxsgzpjl'
    },
    {
      mkid: '0305',
      fmkid: '',
      mkname: '日常清扫',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-rcqs',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/Main'
    },
    {
      mkid: '030501',
      fmkid: '',
      mkname: '日常清扫任务',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-rcqsrw',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/rcqsrw'
    },
    /* {
     mkid: '030502',
     fmkid: '',
     mkname: '日常清扫结束',
     name: '日常清扫结束',
     url: '/rcyhgc-rcqsjs',
     isMenu: true,
     img: 'el-icon-remove',
     zj: '/rcyhgc/rcqsjs'
     }, */
    {
      mkid: '030503',
      fmkid: '',
      mkname: '日常养护巡查考核表',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-rcyhxckhb',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/rcyhxckhb'
    },
    {
      mkid: '030504',
      fmkid: '',
      mkname: '事件清扫任务',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-sjqsrw',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/sjqsrw'
    },
    /* {
     mkid: '030505',
     fmkid: '',
     mkname: '到达事故现场',
     name: '到达事故现场',
     url: '/rcyhgc-ddsgxc',
     isMenu: true,
     img: 'el-icon-remove',
     zj: '/rcyhgc/ddsgxc'
     },
     {
     mkid: '030506',
     fmkid: '',
     mkname: '事件清扫结束',
     name: '事件清扫结束',
     url: '/rcyhgc-sjqsjs',
     isMenu: true,
     img: 'el-icon-remove',
     zj: '/rcyhgc/sjqsjs'
     }, */
    {
      mkid: '0306',
      fmkid: '',
      mkname: '绿化养护',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-lhyh',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/Main'
    },
    {
      mkid: '030601',
      fmkid: '',
      mkname: '绿化养护任务',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-lhyhrw',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/lhyhrw'
    },
    /* {
     mkid: '030602',
     fmkid: '',
     mkname: '结束绿化养护',
     name: '结束绿化养护',
     url: '/rcyhgc-jslhyh',
     isMenu: true,
     img: 'el-icon-remove',
     zj: '/rcyhgc/jslhyh'
     }, */
    {
      mkid: '030603',
      fmkid: '',
      mkname: '质量检查评分表',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-zljcpfb',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/zljcpfb'
    },
    {
      mkid: '0307',
      fmkid: '',
      mkname: '计量支付',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-jlzf',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/Main'
    },
    {
      mkid: '030701',
      fmkid: '',
      mkname: '索赔申请书',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-spsqs',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/spsqs'
    },
    {
      mkid: '030702',
      fmkid: '',
      mkname: '工程计量单',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-gcjld',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/gcjld'
    },
    {
      mkid: '030703',
      fmkid: '',
      mkname: '计日工(台班)审批表',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-jrgspb',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/jrgspb'
    },
    {
      mkid: '030704',
      fmkid: '',
      mkname: '中(终)期财务支付证书',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-zqcwzfzs',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/zqcwzfzs'
    },
    {
      mkid: '0308',
      fmkid: '',
      mkname: '养护验收',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-yhys',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/Main'
    },
    {
      mkid: '030801',
      fmkid: '',
      mkname: '工程验收申请单',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-gcyssqd',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/gcyssqd'
    },
    {
      mkid: '030802',
      fmkid: '',
      mkname: '工程验收单',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-gcysd',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/gcysd'
    },
    {
      mkid: '030803',
      fmkid: '',
      mkname: '交工结算书',
      name: '招商公路运营管理平台',
      url: '/rcyhgc-jgjss',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/rcyhgc/jgjss'
    },


    //04专项养护工程
    {
      mkid: '04',
      fmkid: '',
      mkname: '专项养护工程',
      name: '专项养护工程',
      url: '/hhhh',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '0401',
      fmkid: '',
      mkname: '开工申请',
      name: '开工申请',
      url: '/hhhh-kgsq',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '040101',
      fmkid: '',
      mkname: '开工申请单',
      name: '开工申请单',
      url: '/zxyhgc-kgsqd',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/kgsqd'
    },
    {
      mkid: '0402',
      fmkid: '',
      mkname: '履约检查',
      name: '履约检查',
      url: '/zxyhgc-lyjc',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '040201',
      fmkid: '',
      mkname: '施工单位履约检查表',
      name: '施工单位履约检查表',
      url: '/zxyhgc-sgdwlyjcb',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/zxyhgc/sgdwlyjcb'
    },
    {
      mkid: '040202',
      fmkid: '',
      mkname: '进场准备情况检查表',
      name: '进场准备情况检查表',
      url: '/zxyhgc-jczbqkjcb',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/zxyhgc/jczbqkjcb'
    },
    {
      mkid: '0403',
      fmkid: '',
      mkname: '进度管理',
      name: '进度管理',
      url: '/zxyhgc-jdgl',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '040301',
      fmkid: '',
      mkname: '施工总进度计划',
      name: '施工总进度计划',
      url: '/zxyhgc-sgzjdjh',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/sgzjdjh'
    },
    {
      mkid: '040302',
      fmkid: '',
      mkname: '月度施工进度计划',
      name: '月度施工进度计划',
      url: '/zxyhgc-ydsgjdjh',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/ydsgjdjh'
    },
    {
      mkid: '040303',
      fmkid: '',
      mkname: '月度施工进度完成情况',
      name: '月度施工进度完成情况',
      url: '/zxyhgc-ydsgjdwcqk',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/ydsgjdwcqk'
    },
    {
      mkid: '0404',
      fmkid: '',
      mkname: '质量管理',
      name: '质量管理',
      url: '/zxyhgc-zlgl',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '040401',
      fmkid: '',
      mkname: '隐蔽工程检查验收记录',
      name: '隐蔽工程检查验收记录',
      url: '/zxyhgc-ybgcjcysjl',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/ybgcjcysjl'
    },
    {
      mkid: '040402',
      fmkid: '',
      mkname: '工程质量检查整改及复查',
      name: '工程质量检查整改及复查',
      url: '/zxyhgc-gczljczgjfc',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/gczljczgjfc'
    },
    {
      mkid: '0405',
      fmkid: '',
      mkname: '变更管理',
      name: '变更管理',
      url: '/zxyhgc-bggl',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '040501',
      fmkid: '',
      mkname: '工程变更申请表',
      name: '工程变更申请表',
      url: '/zxyhgc-gcbgsqb',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/gcbgsqb'
    },
    {
      mkid: '040502',
      fmkid: '',
      mkname: '工程变更令',
      name: '工程变更令',
      url: '/zxyhgc-gcbgl',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/gcbgl'
    },
    {
      mkid: '040503',
      fmkid: '',
      mkname: '工程变更单',
      name: '工程变更单',
      url: '/zxyhgc-gcbgd',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/gcbgd'
    },
    {
      mkid: '040504',
      fmkid: '',
      mkname: '单价审核表',
      name: '单价审核表',
      url: '/zxyhgc-djshb',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/djshb'
    },
    {
      mkid: '040505',
      fmkid: '',
      mkname: '工程索赔申请书',
      name: '工程索赔申请书',
      url: '/zxyhgc-gcspsqs',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/gcspsqs'
    },
    {
      mkid: '0406',
      fmkid: '',
      mkname: '工程支付',
      name: '工程支付',
      url: '/zxyhgc-gczf',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '040601',
      fmkid: '',
      mkname: '工程计量单',
      name: '工程计量单',
      url: '/zxyhgc-gcjld',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/gcjld'
    },
    {
      mkid: '040602',
      fmkid: '',
      mkname: '中期财务支付证书',
      name: '中期财务支付证书',
      url: '/zxyhgc-zqcwzfzs',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/zqcwzfzs'
    },
    {
      mkid: '0407',
      fmkid: '',
      mkname: '工程验收',
      name: '工程验收',
      url: '/zxyhgc-gcys',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '040701',
      fmkid: '',
      mkname: '工程验收申请单',
      name: '工程验收申请单',
      url: '/zxyhgc-gcyssqd',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/gcyssqd'
    },
    {
      mkid: '040702',
      fmkid: '',
      mkname: '罚金一览表',
      name: '罚金一览表',
      url: '/zxyhgc-fjylb',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/fjylb'
    },
    {
      mkid: '040703',
      fmkid: '',
      mkname: '承包人遗留问题一览表',
      name: '承包人遗留问题一览表',
      url: '/zxyhgc-cbrylwtylb',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/cbrylwtylb'
    },
    {
      mkid: '040704',
      fmkid: '',
      mkname: '交工结算书',
      name: '交工结算书',
      url: '/zxyhgc-jgjss',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/jgjss'
    },
    {
      mkid: '040705',
      fmkid: '',
      mkname: '竣工结算书',
      name: '竣工结算书',
      url: '/zxyhgc-jungjss',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/zxyhgc/jungjss'
    },

    // 05机电养护工程
    {
      mkid: '05',
      fmkid: '',
      mkname: '机电养护工程',
      name: '机电养护工程',
      url: '/jdyhgc',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '0501',
      fmkid: '',
      mkname: '开工申请',
      name: '开工申请',
      url: '/jdyhgc-kgsq',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '050101',
      fmkid: '',
      mkname: '开工申请单',
      name: '开工申请单',
      url: '/jdyhgc-kgsqd',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/kgsqd'
    },
    {
      mkid: '0502',
      fmkid: '',
      mkname: '履约检查',
      name: '履约检查',
      url: '/jdyhgc-lyjc',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '050201',
      fmkid: '',
      mkname: '施工单位履约检查表',
      name: '施工单位履约检查表',
      url: '/jdyhgc-sgdwlyjcb',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/jdyhgc/sgdwlyjcb'
    },
    {
      mkid: '050202',
      fmkid: '',
      mkname: '进场准备情况检查表',
      name: '进场准备情况检查表',
      url: '/jdyhgc-jczbqkjcb',
      isMenu: true,
      img: 'el-icon-remove',
      zj: '/jdyhgc/jczbqkjcb'
    },
    {
      mkid: '0503',
      fmkid: '',
      mkname: '进度管理',
      name: '进度管理',
      url: '/jdyhgc-jdgl',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '050301',
      fmkid: '',
      mkname: '施工总进度计划',
      name: '施工总进度计划',
      url: '/jdyhgc-sgzjdjh',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/sgzjdjh'
    },
    {
      mkid: '050302',
      fmkid: '',
      mkname: '月度施工进度计划',
      name: '月度施工进度计划',
      url: '/jdyhgc-ydsgjdjh',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/ydsgjdjh'
    },
    {
      mkid: '050303',
      fmkid: '',
      mkname: '月度施工进度完成情况',
      name: '月度施工进度完成情况',
      url: '/jdyhgc-ydsgjdwcqk',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/ydsgjdwcqk'
    },
    {
      mkid: '0504',
      fmkid: '',
      mkname: '质量管理',
      name: '质量管理',
      url: '/jdyhgc-zlgl',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '050401',
      fmkid: '',
      mkname: '隐蔽工程检查验收记录',
      name: '隐蔽工程检查验收记录',
      url: '/jdyhgc-ybgcjcysjl',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/ybgcjcysjl'
    },
    {
      mkid: '050402',
      fmkid: '',
      mkname: '工程质量检查整改及复查',
      name: '工程质量检查整改及复查',
      url: '/jdyhgc-gczljczgjfc',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/gczljczgjfc'
    },
    {
      mkid: '0505',
      fmkid: '',
      mkname: '变更管理',
      name: '变更管理',
      url: '/jdyhgc-bggl',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '050501',
      fmkid: '',
      mkname: '工程变更申请表',
      name: '工程变更申请表',
      url: '/jdyhgc-gcbgsqb',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/gcbgsqb'
    },
    {
      mkid: '050502',
      fmkid: '',
      mkname: '工程变更令',
      name: '工程变更令',
      url: '/jdyhgc-gcbgl',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/gcbgl'
    },
    {
      mkid: '050503',
      fmkid: '',
      mkname: '工程变更单',
      name: '工程变更单',
      url: '/jdyhgc-gcbgd',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/gcbgd'
    },
    {
      mkid: '050504',
      fmkid: '',
      mkname: '单价审核表',
      name: '单价审核表',
      url: '/jdyhgc-djshb',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/djshb'
    },
    {
      mkid: '050505',
      fmkid: '',
      mkname: '工程索赔申请书',
      name: '工程索赔申请书',
      url: '/jdyhgc-gcspsqs',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/gcspsqs'
    },
    {
      mkid: '0506',
      fmkid: '',
      mkname: '工程支付',
      name: '工程支付',
      url: '/jdyhgc-gczf',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '050601',
      fmkid: '',
      mkname: '工程计量单',
      name: '工程计量单',
      url: '/jdyhgc-gcjld',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/gcjld'
    },
    {
      mkid: '050602',
      fmkid: '',
      mkname: '中期财务支付证书',
      name: '中期财务支付证书',
      url: '/jdyhgc-zqcwzfzs',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/zqcwzfzs'
    },
    {
      mkid: '0507',
      fmkid: '',
      mkname: '工程验收',
      name: '工程验收',
      url: '/jdyhgc-gcys',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '050701',
      fmkid: '',
      mkname: '工程验收申请单',
      name: '工程验收申请单',
      url: '/jdyhgc-gcyssqd',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/gcyssqd'
    },
    {
      mkid: '050702',
      fmkid: '',
      mkname: '罚金一览表',
      name: '罚金一览表',
      url: '/jdyhgc-fjylb',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/fjylb'
    },
    {
      mkid: '050703',
      fmkid: '',
      mkname: '承包人遗留问题一览表',
      name: '承包人遗留问题一览表',
      url: '/jdyhgc-cbrylwtylb',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/cbrylwtylb'
    },
    {
      mkid: '050704',
      fmkid: '',
      mkname: '交工结算书',
      name: '交工结算书',
      url: '/jdyhgc-jgjss',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/jgjss'
    },
    {
      mkid: '050705',
      fmkid: '',
      mkname: '竣工结算书',
      name: '竣工结算书',
      url: '/jdyhgc-jungjss',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdyhgc/jungjss'
    },


    // 机电维护
    {
      mkid: '06',
      fmkid: '',
      mkname: '机电维护',
      name: '机电维护',
      url: '/jdwh',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '0601',
      fmkid: '',
      mkname: '巡检维修',
      name: '巡检维修',
      url: '/jdwh-xjwx',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '060101',
      fmkid: '',
      mkname: '设备巡检',
      name: '设备巡检',
      url: '/jdwh-sbxj',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdwh/sbxj'
    },
    {
      mkid: '060102',
      fmkid: '',
      mkname: '故障报修',
      name: '故障报修',
      url: '/jdwh-gzbx',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdwh/gzbx'
    },
    {
      mkid: '060103',
      fmkid: '',
      mkname: '任务派发',
      name: '任务派发',
      url: '/jdwh-rwpf',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdwh/rwpf'
    },
    {
      mkid: '060104',
      fmkid: '',
      mkname: '维修任务单',
      name: '维修任务单',
      url: '/jdwh-wxrwd',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdwh/wxrwd'
    },
    {
      mkid: '060105',
      fmkid: '',
      mkname: '维修登记',
      name: '维修登记',
      url: '/jdwh-wxdj',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdwh/wxdj'
    },
    {
      mkid: '060106',
      fmkid: '',
      mkname: '维修验收',
      name: '维修验收',
      url: '/jdwh-wxys',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdwh/wxys'
    },
    {
      mkid: '060107',
      fmkid: '',
      mkname: '维修费用',
      name: '维修费用',
      url: '/jdwh-wxfy',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdwh/wxfy'
    },
    {
      mkid: '060108',
      fmkid: '',
      mkname: '付款申请',
      name: '付款申请',
      url: '/jdwh-fksq',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdwh/fksq'
    },
    {
      mkid: '0602',
      fmkid: '',
      mkname: '备件管理',
      name: '备件管理',
      url: '/jdwh-sbgl',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '060201',
      fmkid: '',
      mkname: '验收入库',
      name: '验收入库',
      url: '/jdwh-ysrk',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdwh/ysrk'
    },
    {
      mkid: '060202',
      fmkid: '',
      mkname: '领用申请',
      name: '领用申请',
      url: '/jdwh-lysq',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdwh/lysq'
    },
    {
      mkid: '060203',
      fmkid: '',
      mkname: '备件出库',
      name: '备件出库',
      url: '/jdwh-bjck',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdwh/bjck'
    },
    {
      mkid: '060204',
      fmkid: '',
      mkname: '废件入库',
      name: '废件入库',
      url: '/jdwh-fjrk',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdwh/fjrk'
    },
    {
      mkid: '060205',
      fmkid: '',
      mkname: '废件维修',
      name: '废件维修',
      url: '/jdwh-fjwx',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdwh/fjwx'
    },
    {
      mkid: '060206',
      fmkid: '',
      mkname: '维修结算',
      name: '维修结算',
      url: '/jdwh-wxjs',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdwh/wxjs'
    },
    {
      mkid: '060207',
      fmkid: '',
      mkname: '废件处置',
      name: '废件处置',
      url: '/jdwh-fjcz',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdwh/fjcz'
    },
    {
      mkid: '060208',
      fmkid: '',
      mkname: '库存管理',
      name: '库存管理',
      url: '/jdwh-kcgl',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/jdwh/kcgl'
    },

    //07 统计报表
    {
      mkid: '07',
      fmkid: '',
      mkname: '统计报表',
      name: '统计报表',
      url: '/tjbb',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '0701',
      fmkid: '',
      mkname: '病害统计',
      name: '病害统计',
      url: '/tjbb-bhtj',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/tjbb/bhtj'
    },
    {
      mkid: '0702',
      fmkid: '',
      mkname: '工程付款记录一览表',
      name: '工程付款记录一览表',
      url: '/tjbb-gcfkjlylb',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/tjbb/gcfkjlylb'
    },
    {
      mkid: '0703',
      fmkid: '',
      mkname: '工程变更资料一览表',
      name: '工程变更资料一览表',
      url: '/tjbb-gcbgzlylb',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/tjbb/gcbgzlylb'
    },
    {
      mkid: '0704',
      fmkid: '',
      mkname: '计量支付汇总表',
      name: '计量支付汇总表',
      url: '/tjbb-jlzfhzb',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/tjbb/jlzfhzb'
    },
    {
      mkid: '0705',
      fmkid: '',
      mkname: '单公里养护成本',
      name: '单公里养护成本',
      url: '/tjbb-dglyhcb',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/tjbb/dglyhcb'
    },
    {
      mkid: '0706',
      fmkid: '',
      mkname: '养护资金对比',
      name: '养护资金对比',
      url: '/tjbb-yhzjdb',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/tjbb/yhzjdb'
    },
    {
      mkid: '0707',
      fmkid: '',
      mkname: '同类项目对比',
      name: '同类项目对比',
      url: '/tjbb-tlxmdb',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/tjbb/tlxmdb'
    },
    //08  应急抢修工程
    {
      mkid: '08',
      fmkid: '',
      mkname: '应急抢修工程',
      name: '应急抢修工程',
      url: '/yjqxgc',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '0801',
      fmkid: '',
      mkname: '应急抢修工程',
      name: '应急抢修工程',
      url: '/yjqxgc-yjqxgc',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/yjqxgc/yjqxgc'
    },


    //10月度计划
    {
      mkid: '09',
      fmkid: '',
      mkname: '月度计划',
      name: '月度计划',
      url: '/ydjh',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/Main'
    },
    {
      mkid: '0901',
      fmkid: '',
      mkname: '主要工作计划编制',
      name: '主要工作计划编制',
      url: '/ydjh-zybz',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/ydjh/zybz'
    },
    {
      mkid: '0902',
      fmkid: '',
      mkname: '月度计划制定',
      name: '月度计划制定',
      url: '/ydjh-ydjhzd',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/ydjh/ydjhzd'
    },
    {
      mkid: '0903',
      fmkid: '',
      mkname: '月度计划审批',
      name: '月度计划审批',
      url: '/ydjh-ydjhsp',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/ydjh/ydjhsp'
    },
    //09 项目概况
    {
      mkid: '10',
      fmkid: '',
      mkname: '项目概况',
      name: '项目概况',
      url: '/xmgk',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/xmgk/xmgk'
    },
 /*   {
      mkid: '1001',
      fmkid: '',
      mkname: '项目概况1',
      name: '项目概况1',
      url: '/xmgk1',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/xmgk/xmgk'
    },
    {
      mkid: '100101',
      fmkid: '',
      mkname: '项目概况1',
      name: '项目概况1',
      url: '/xmgk1',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/xmgk/xmgk'
    },
    {
      mkid: '11',
      fmkid: '',
      mkname: '项目概况1',
      name: '项目概况1',
      url: '/xmgk1',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/xmgk/xmgk'
    },
    {
      mkid: '1101',
      fmkid: '',
      mkname: '项目概况23',
      name: '项目概况23',
      url: '/xm23',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/xmgk/xmgk'
    },
    {
      mkid: '110101',
      fmkid: '',
      mkname: '项目概况234',
      name: '项目概况234',
      url: '/xm234',
      isMenu: true,
      img: 'el-icon-remove-outline',
      zj: '/xmgk/xmgk'
    },*/
  ],
  chunk: function (arr, len) {
    len = parseInt(len)
    var groups = []
    if (len <= 1 || arr.length < len) {
      groups.push(arr)
      return groups
    }
    var loop = Math.ceil(arr.length / len)
    for (var i = 0; i < loop; i++) {
      groups.push(arr.slice(len * i, len * (i + 1)))
    }
    return groups
  },
  uuid: function (len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    var uuid = []
    var i
    radix = radix || chars.length
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
      // rfc4122, version 4 form
      var r

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
      uuid[14] = '4'

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16
          uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
        }
      }
    }
    return uuid.join('')
  }
}
var arr0 = []
var arr1 = []
var arr2 = []

for (let i = 0; i < config.mks.length; i++) {
  if (config.mks[i].mkid.length === 2) {// 二级路由 title == arr0
    arr0.push(config.mks[i])
  } else if (config.mks[i].mkid.length === 4) {//二级路由 arr1
    arr1.push(config.mks[i])
  } else {//三级路由时间    arr2
    arr2.push(config.mks[i])
  }
}

/*
*   02
*   0201
*   0201
*
* */
 // arr0  6个所有的一级菜单  0601-0606   0609 06010
// arr1  下面所有的二级菜单  060101 === 一级菜单+01....  一级菜单+02....
// arr2  下面所有的三级菜单  06010101 === 一级菜单+二级菜单+01

function setSecondLevel(num) {
  num = parseInt(num) - 1;
  return num > 9 ? String(num) : '0' + num;
}

for (let i = 0, j = 1; i < arr0.length; i++) {
  arr0[i].mkid = '06' + setSecondLevel(arr0[i].mkid.slice(0, 2))  //0201变为 n = 1
  j++
}
for (let i = 0; i < arr1.length; i++) {
  let n = setSecondLevel(arr1[i].mkid.slice(0, 2))   //0201变为 n = 1
  let m = arr1[i].mkid[2] + arr1[i].mkid[3] //01变为 n = 01
  arr1[i].mkid = '06' + n + m       //060101
}
for (let i = 0; i < arr2.length; i++) {
  let n = setSecondLevel(arr2[i].mkid.slice(0, 2))
  let m = arr2[i].mkid[2] + arr2[i].mkid[3] + arr2[i].mkid[4] + arr2[i].mkid[5]
  arr2[i].mkid = '06' + n + m
}
/*for (let i = 0, j = 1; i < arr0.length; i++) {
  arr0[i].mkid = '060' + j
  j++
}

for (let i = 0; i < arr1.length; i++) {
  let n = arr1[i].mkid[1] - 1  //0201变为 n = 1
  let m = arr1[i].mkid[2] + arr1[i].mkid[3] //01变为 n = 01
  arr1[i].mkid = '060' + n + m       //060101 === 0201
}

for (let i = 0; i < arr2.length; i++) {
  let n = arr2[i].mkid[1] - 1   //020101 => 1
  let m = arr2[i].mkid[2] + arr2[i].mkid[3] + arr2[i].mkid[4] + arr2[i].mkid[5] //020101 => 0101
  arr2[i].mkid = '060' + n + m //020101 => 060+1+0101 =>06010101
}*/
let newArr = [
  //GIS平台
  {
    mkid: '01',
    fmkid: '',
    mkname: 'GIS平台',
    name: 'GIS平台',
    url: '/GISmap',
    isMenu: true,
    img: 'el-icon-map',
    zj: '/Main'
  },
  //02 计划管理
  {
    mkid: '02',
    fmkid: '',
    mkname: '计划管理',
    name: '计划管理',
    url: '/jhgl',
    isMenu: true,
    img: 'el-icon-map',
    zj: '/Main'
  },
  {
    mkid: '0201',
    fmkid: '',
    mkname: '五年发展规划',
    name: '五年发展规划',
    url: '/jhgl-5nfzgh',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0202',
    fmkid: '',
    mkname: '经营计划',
    name: '经营计划',
    url: '/jhgl-jyjh',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '020201',
    fmkid: '',
    mkname: '年度经营计划',
    name: '年度经营计划',
    url: '/jyjh-ndjyjh',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '0203',
    fmkid: '',
    mkname: '养护计划',
    name: '养护计划',
    url: '/jhgl-yhjh',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '020301',
    fmkid: '',
    mkname: '五年养护计划',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=CM010401&busiCenter=01&isdd=Y',
    name: '五年养护计划',
    url: '/yhjh-5nyhjh',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '020302',
    fmkid: '',
    mkname: '年度养护计划',
    name: '年度养护计划',
    url: '/yhjh-ndyhjh',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '020303',
    fmkid: '',
    mkname: '月度养护计划',
    name: '月度养护计划',
    url: '/yhjh-ydyhjh',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '020304',
    fmkid: '',
    mkname: '年度养护计划执行统计',
    name: '年度养护计划执行统计',
    url: '/yhjh-ndyhtj',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '020305',
    fmkid: '',
    mkname: '月度养护计划执行统计',
    name: '月度养护计划执行统计',
    url: '/yhjh-ydtj',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '0204',
    fmkid: '',
    mkname: '采购计划',
    name: '采购计划',
    url: '/jhgl-cgjh',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '020401',
    fmkid: '',
    mkname: '年度采购计划',
    name: '年度采购计划',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=CM010301&busiCenter=01&isdd=Y',
    url: '/cgjh-ndjh',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '020402',
    fmkid: '',
    mkname: '月度采购计划',
    name: '月度采购计划',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=CM010303&busiCenter=01&isdd=Y',
    url: '/cgjh-ydjh',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '020403',
    fmkid: '',
    mkname: '月度采购计划执行统计',
    name: '月度采购计划执行统计',
    url: '/cgjh-ydtj',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  //03采购管理
  {
    mkid: '03',
    fmkid: '',
    mkname: '采购管理',
    name: '采购管理',
    url: '/cggl',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0301',
    fmkid: '',
    mkname: '采购立项',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=40040200&busiCenter=01&isdd=Y',
    name: '采购立项',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0302',
    fmkid: '',
    mkname: '招采文件',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=EC200010&busiCenter=01&isdd=Y',
    name: '招采文件',
    url: '/cggl-zcwj',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0303',
    fmkid: '',
    mkname: '专家抽取',
    name: '专家抽取',
    url: '/cggl-zjcq',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0304',
    fmkid: '',
    mkname: '确定供应商',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=40040400&busiCenter=01&isdd=Y',
    name: '确定供应商',
    url: '/cggl-qdgys',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  //04合同管理
  {
    mkid: '04',
    fmkid: '',
    mkname: '合同管理',
    name: '合同管理',
    url: '/htgl',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0401',
    fmkid: '',
    mkname: '合同信息',
    name: '合同信息',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '040101',
    fmkid: '',
    mkname: '采购合同',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=40203001&busiCenter=01&isdd=Y',
    name: '采购合同',
    url: '/cggl-cght',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '040102',
    fmkid: '',
    mkname: '非工程项目合同',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=40203001401&busiCenter=01&isdd=Y',
    name: '非工程项目合同',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '040103',
    fmkid: '',
    mkname: '工程项目合同',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=40203001400&busiCenter=01&isdd=Y',
    name: '工程项目合同',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },

  //05资产管理
  {
    mkid: '05',
    fmkid: '',
    mkname: '资产管理',
    name: '资产管理',
    url: '/zcgl',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0501',
    fmkid: '',
    mkname: '资产验收',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=40040800&busiCenter=01&isdd=Y',
    name: '资产验收',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0502',
    fmkid: '',
    mkname: '资产验收查询',
    name: '资产验收查询',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=40040804&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0503',
    fmkid: '',
    mkname: '资产结构树',
    name: '资产结构树',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4510048015&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0504',
    fmkid: '',
    mkname: '公路类卡片信息',
    name: '公路类卡片信息',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '050401',
    fmkid: '',
    mkname: '路产登记',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4510016005404&busiCenter=01&isdd=Y',
    name: '路产登记',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '050402',
    fmkid: '',
    mkname: '路基路面登记',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4510016005409&busiCenter=01&isdd=Y',
    name: '路基路面登记',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '050403',
    fmkid: '',
    mkname: '隧道登记',
    name: '隧道登记',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4510016005405&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '050404',
    fmkid: '',
    mkname: '桥梁登记',
    name: '桥梁登记',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4510016005406&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '050405',
    fmkid: '',
    mkname: '边坡登记',
    name: '边坡登记',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4510016005408&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '0505',
    fmkid: '',
    mkname: '土地/建筑物类卡片信息',
    name: '土地/建筑物类卡片信息',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '050501',
    fmkid: '',
    mkname: '土地类资产登记',
    name: '土地类资产登记',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4510016005400&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '050502',
    fmkid: '',
    mkname: '房屋建筑物类登记',
    name: '房屋建筑物类登记',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4510016005401&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '0506',
    fmkid: '',
    mkname: '机电设备类卡片信息',
    name: '机电设备类卡片信息',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '050601',
    fmkid: '',
    mkname: '机电设备类登记',
    name: '机电设备类登记',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4510016005410&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '050602',
    fmkid: '',
    mkname: '计算机类登记',
    name: '计算机类登记',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4510016005411&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '0507',
    fmkid: '',
    mkname: '运输工具类卡片信息',
    name: '运输工具类卡片信息',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '050701',
    fmkid: '',
    mkname: '运输类登记',
    name: '运输类登记',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4510016005402&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '0508',
    fmkid: '',
    mkname: '公路设施类卡片信息',
    name: '公路设施类卡片信息',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '050801',
    fmkid: '',
    mkname: '公路设施类登记',
    name: '公路设施类登记',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4510016005414&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '0509',
    fmkid: '',
    mkname: '家具类卡片信息',
    name: '家具类卡片信息',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '050901',
    fmkid: '',
    mkname: '家具类登记',
    name: '家具类登记',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4510016005413&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '0510',
    fmkid: '',
    mkname: '其他类卡片信息',
    name: '其他类卡片信息',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '051001',
    fmkid: '',
    mkname: '其他类登记',
    name: '其他类登记',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4510016005403&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '0511',
    fmkid: '',
    mkname: '资产领用',
    name: '资产领用',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '051101',
    fmkid: '',
    mkname: '领用及归还台账',
    name: '领用及归还台账',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520140010&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051102',
    fmkid: '',
    mkname: '领用申请',
    name: '领用申请',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520016005&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051103',
    fmkid: '',
    mkname: '领用退换',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520016010&busiCenter=01&isdd=Y',
    name: '领用退换',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '0512',
    fmkid: '',
    mkname: '资产借用',
    name: '资产借用',
    url: '/cggl-zcjy',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '051201',
    fmkid: '',
    mkname: '借用申请',
    name: '借用申请',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520012005&busiCenter=01&isdd=Y',
    url: '/cggl-jysq',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '051202',
    fmkid: '',
    mkname: '借用归还',
    name: '借用归还',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520012010&busiCenter=01&isdd=Y',
    url: '/cggl-jygh',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0513',
    fmkid: '',
    mkname: '资产转移',
    name: '资产转移',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '051301',
    fmkid: '',
    mkname: '部门转移',
    name: '部门转移',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520024010&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051302',
    fmkid: '',
    mkname: '资产调出',
    name: '资产调出',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520028010&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051303',
    fmkid: '',
    mkname: '资产接收',
    name: '资产接收',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '0514',
    fmkid: '',
    mkname: '资产盘点',
    name: '资产盘点',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '051401',
    fmkid: '',
    mkname: '盘点登记',
    name: '盘点登记',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520036005&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051402',
    fmkid: '',
    mkname: '资产盘盈',
    name: '资产盘盈',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520036010&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051403',
    fmkid: '',
    mkname: '资产盘亏',
    name: '资产盘亏',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520036015&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051404',
    fmkid: '',
    mkname: '盘亏台账',
    name: '盘亏台账',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520140055&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051405',
    fmkid: '',
    mkname: '盘盈台账',
    name: '盘盈台账',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520140050&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051406',
    fmkid: '',
    mkname: '差异调整',
    name: '差异调整',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520036020&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '0515',
    fmkid: '',
    mkname: '资产报废',
    name: '资产报废',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '051501',
    fmkid: '',
    mkname: '报废申请',
    name: '报废申请',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520032010&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051502',
    fmkid: '',
    mkname: '报废处置',
    name: '报废处置',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520032005&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051503',
    fmkid: '',
    mkname: '残值回收',
    name: '残值回收',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051504',
    fmkid: '',
    mkname: '资产捐赠',
    name: '资产捐赠',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520032020&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051505',
    fmkid: '',
    mkname: '处置台账',
    name: '处置台账',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520140025&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051506',
    fmkid: '',
    mkname: '捐赠台账',
    name: '捐赠台账',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520140040&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '0516',
    fmkid: '',
    mkname: '资产保险',
    name: '资产保险',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '051601',
    fmkid: '',
    mkname: '保险查询',
    name: '保险查询',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520140045&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051602',
    fmkid: '',
    mkname: '资产投保',
    name: '资产投保',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520030005&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051603',
    fmkid: '',
    mkname: '资产理赔',
    name: '资产理赔',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=4520030010&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051604',
    fmkid: '',
    mkname: '理赔收款',
    name: '理赔收款',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '0517',
    fmkid: '',
    mkname: '统计报表',
    name: '统计报表',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '051701',
    fmkid: '',
    mkname: '资产采购合同执行统计',
    name: '资产采购合同执行统计',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051702',
    fmkid: '',
    mkname: '设备运行三率统计',
    name: '设备运行三率统计',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051703',
    fmkid: '',
    mkname: '资产巡查统计',
    name: '资产巡查统计',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051704',
    fmkid: '',
    mkname: '运维工作量统计',
    name: '运维工作量统计',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051705',
    fmkid: '',
    mkname: '设备故障统计',
    name: '设备故障统计',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '051706',
    fmkid: '',
    mkname: '报废统计表',
    name: '报废统计表',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=452014404&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  //06养护管理
  {
    mkid: '06',
    fmkid: '',
    mkname: '养护管理',
    name: '养护管理',
    url: '/yhgl',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  //07营运管理
  {
    mkid: '07',
    fmkid: '',
    mkname: '营运管理',
    name: '营运管理',
    url: '/cggl-dlxc',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0701',
    fmkid: '',
    mkname: '道路巡查',
    name: '道路巡查',
    url: '/cggl-dlxc',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0702',
    fmkid: '',
    mkname: '调度指挥',
    name: '调度指挥',
    url: '/cggl-ddzh',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0703',
    fmkid: '',
    mkname: '热线管理',
    name: '热线管理',
    url: '/cggl-rxgl',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0704',
    fmkid: '',
    mkname: '应急管理',
    name: '应急管理',
    url: '/cggl-yjgl',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0705',
    fmkid: '',
    mkname: '清障管理',
    name: '清障管理',
    url: '/cggl-qzgl',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0706',
    fmkid: '',
    mkname: '路损追偿',
    name: '路损追偿',
    url: '/cggl-lszc',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0707',
    fmkid: '',
    mkname: '站务管理',
    name: '站务管理',
    url: '/cggl-zwgl',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0708',
    fmkid: '',
    mkname: '投诉管理',
    name: '投诉管理',
    url: '/cggl-tsgl',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0709',
    fmkid: '',
    mkname: '气象管理',
    name: '气象管理',
    url: '/cggl-qxgl',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0710',
    fmkid: '',
    mkname: '营运分析',
    name: '营运分析',
    url: '/cggl-yyfx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  //08人力资源
  {
    mkid: '08',
    fmkid: '',
    mkname: '人力资源',
    name: '人力资源',
    url: '/rlzy',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0801',
    fmkid: '',
    mkname: '薪资管理',
    name: '薪资管理',
    url: '/rlzy-xcgl',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0802',
    fmkid: '',
    mkname: '考勤管理',
    name: '考勤管理',
    url: '/rlzy-kqgl',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '080201',
    fmkid: '',
    mkname: '排班班次',
    name: '排班班次',
    url: '/kqgl-pbbc',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '080202',
    fmkid: '',
    mkname: '自动排班',
    name: '自动排班',
    url: '/kqgl-zdpb',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '080203',
    fmkid: '',
    mkname: '值班签到',
    name: '值班签到',
    url: '/kqgl-zbxd',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '080204',
    fmkid: '',
    mkname: '调班申请',
    name: '调班申请',
    url: '/kqgl-dbsq',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '080205',
    fmkid: '',
    mkname: '请假申请',
    name: '请假申请',
    url: '/kqgl-qjsq',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '080206',
    fmkid: '',
    mkname: '外出申请',
    name: '外出申请',
    url: '/kqgl-wcsq',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '080207',
    fmkid: '',
    mkname: '补班(加班)申请',
    name: '补班(加班)申请',
    url: '/kqgl-bbsq',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '080208',
    fmkid: '',
    mkname: '值班查询',
    name: '值班查询',
    url: '/kqgl-zbcx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '080209',
    fmkid: '',
    mkname: '考勤查询',
    name: '考勤查询',
    url: '/kqgl-kqcx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  //支付管理
  {
    mkid: '09',
    fmkid: '',
    mkname: '支付管理',
    name: '支付管理',
    url: '/zfgl',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '0901',
    fmkid: '',
    mkname: '个人报销',
    name: '个人报销',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '090101',
    fmkid: '',
    mkname: '差旅费报销',
    name: '差旅费报销',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=20110ETEA&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '090102',
    fmkid: '',
    mkname: '其他费用报销',
    name: '其他费用报销',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=20110ETEA400&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '090103',
    fmkid: '',
    mkname: '借款申请',
    name: '借款申请',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=20110ETLB400&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '090104',
    fmkid: '',
    mkname: '还款',
    name: '还款',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=20110RB&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '0902',
    fmkid: '',
    mkname: '对公报账',
    name: '对公报账',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  {
    mkid: '090201',
    fmkid: '',
    mkname: '合同支付',
    name: '合同支付',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=20110ETEA405&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '090202',
    fmkid: '',
    mkname: '税金计提',
    name: '税金计提',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=20110ETEA403&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '090203',
    fmkid: '',
    mkname: '工资计提',
    name: '工资计提',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=20110ETEA402&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  {
    mkid: '090204',
    fmkid: '',
    mkname: '列账单',
    name: '列账单',
    iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=20110ETEA404&busiCenter=01&isdd=Y',
    url: '/cggl-cglx',
    isMenu: true,
    img: 'icon-caidan',
    zj: '/Main'
  },
  //10KPI管理
  {
    mkid: '10',
    fmkid: '',
    mkname: 'KPI管理',
    name: 'KPI管理',
    url: '/kpigl',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  },
  //11数据管理
  {
    mkid: '11',
    fmkid: '',
    mkname: '数据管理',
    name: '数据管理',
    url: '/sjgl',
    isMenu: true,
    img: 'icon-caidan1',
    zj: '/Main'
  }
]

config.mks = arr0.concat(arr1).concat(arr2).concat(newArr)


// hwl --- 2 ---告警
// ldw --- !=1 ---左偏离或右偏离
// fcw --- 1 ---告警
// pcw --- 1 ---告警
// ufcw --- 1 ---告警
// sdw --- !=0 --- 超速
