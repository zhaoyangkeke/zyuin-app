import Mock from 'mockjs'
export const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '某某',
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
      //09 项目概况
      {
        mkid: '09',
        fmkid: '',
        mkname: '项目概况',
        name: '项目概况',
        url: '/xmgk',
        isMenu: true,
        img: 'el-icon-remove-outline',
        zj: '/xmgk/xmgk'
      },

      //10月度计划
      {
        mkid: '10',
        fmkid: '',
        mkname: '月度计划',
        name: '月度计划',
        url: '/ydjh',
        isMenu: true,
        img: 'el-icon-remove-outline',
        zj: '/ydjh/ydjh'
      },

    ],
  }
]

export const Users = []

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    username: Mock.Random.word(),
    bmcode: Mock.Random.guid(),
    bmname: Mock.Random.word(),
    jsid: Mock.Random.integer(1, 2, 3, 4, 5),
    jsname: Mock.Random.word(),
    phone: Mock.Random.zip(),
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(1, 2),
    state: Mock.Random.integer(0, 1)
  }))
}
