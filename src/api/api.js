import axios from 'axios'

let base = config.ip
// let base = 'http://192.168.0.126:8002'
let base2 = config.ip2
let base3 = config.ip3
let base4 = config.ip4
let base5 = config.ip5
// let base5='http://192.168.0.126:8006'
let base6 = config.ip6
let base7 = config.ip7
// let base7 = 'http://192.168.0.126:8010'
// let baseingUrl = config.baseurl
let base8 = config.ip8
let base9 = config.ip9
let baseLanurl = config.lanUrl
// let base10 = config.ip10
let base11 = config.ip11
let base12 = config.ip12

let startBaseUrl = 'http://192.168.1.143:8004'
let startBaseUrl_LIRui = 'http://lrlucky:8004'


const defaults = {
  baseURL: base + '',
  headers: {
    'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE1MjU4NDk1NjY2OTQsImV4cCI6NzU3Mzg0OTU2Nn0.y0lCnkgdsraWApVraBbGBAvUa8hhtN-id6e6Nq1Jbe20oi478cnfXQSohDUUoYPhgeTXxyQTopy_fyP-fDHT9g',
    'No-Cache': '',
    'X-Requested-With': '',
    'If-Modified-Since': '',
    'Pragma': '',
    'Last-Modified': '',
    'Cache-Control': '',
    'Expires': '',
    'Content-Type': 'application/json',
    'X-E4M-With': '',
    post: {
      'Content-Type': 'application/json'
    },
    get: {
      'Content-Type': 'application/json'
    },
    put:{
      'Content-Type': 'multipart/form-data'
    }
  }
}
Object.assign(axios.defaults, defaults)
axios.interceptors.request.use(
  config => {
    if (getCookie('tokens')) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = getCookie('tokens')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {

    if (error && error.response) {

      switch (error.response.status) {
        case 400: error.message = '请求错误(400)' ; break;
        case 401: error.message = '未授权，请重新登录(401)'; break;
        case 403: error.message = '拒绝访问(403)'; break;
        case 404: error.message = '请求出错(404)'; break;
        case 408: error.message = '请求超时(408)'; break;
        case 500: error.message = '服务器错误(500)'; break;
        case 501: error.message = '服务未实现(501)'; break;
        case 502: error.message = '网络错误(502)'; break;
        case 503: error.message = '服务不可用(503)'; break;
        case 504: error.message = '网络超时(504)'; break;
        case 505: error.message = 'HTTP版本不受支持(505)'; break;
        default: error.message = `连接出错(${error.response.status})!`;
        // case 401: case 403:
        // 返回 401 清除token信息并跳转到登录页面
        // sessionStorage.clear()
        // window.location.href = '/'
      }
    } else {
         // error.message = '连接服务器失败!'
         console.log(error)
    }
    return Promise.reject(error.response) // 返回接口返回的错误信息
  })

export const  deleteXmgkjcxx = (urlpart) => { return axios.delete(base2 + `/Gcxmgk/deleteXmgkjcxx11`,{params:urlpart}).then(res => res.data) }//删除

export const updateXmgkjcxxztxx = (urlpart) => { return axios.post(base2 + `/Gcxmgk/updateXmgkjcxxztxx`,urlpart).then(res => res.data) }  //更新项目概况状态

/* 项目总览 */
// 获取合同占比（支付状态）
export const getXmylZt = (param) => { return axios.get(base9 + '/common/contractScaleToPie', {params: param}).then(res => res.data).catch(err => err) }
// 获取合同占比（项目状态）
export const getXmylXmzt = (param) => { return axios.get(base9 + '/common/contractScaleToBar', {params: param}).then(res => res.data).catch(err => err) }
// 获取项目类型占比
export const getXmylSglx = (param) => { return axios.get(base9 + '/common/projectTypeToBar', {params: param}).then(res => res.data).catch(err => err) }
// 获取项目任务单数量
export const getXmylShlx = (param) => { return axios.get(base9 + '/common/damageTypeToBar', {params: param}).then(res => res.data).catch(err => err) }
// 获取路况评定优良中差结果占比
export const getXmylLkpd = (param) => { return axios.get(base + '/lkpd/cx/getLkdcMxbLchz', {params: param}).then(res => res.data).catch(err => err) }

//获取合同信息
export const gethtxx = (param) => { return axios.get(base7 + `/commonuse/gethtxx`, {params:param}).then(res => res.data) }  //获取合同信息
export const getgysxx2 = (param) => { return axios.get(base7 + `/commonuse/getgysxx`, {params:param}).then(res => res.data) }  //获取合同信息
export const getZzmm = (param) => { return axios.get(base7 + `/commonuse/getZzmm`, {params:param}).then(res => res.data) }  //获取合同信息



export const insertJgjss = (urlpart) => { return axios.post(base2 + `/rcyhgcJgJung/insertJgjss`,urlpart).then(res => res.data) } //添加交工结算书
//审批中心
export const getTodoList = (param) => { return axios.get(base9 + `/common/getTodoList`, {params:param}).then(res => res.data) }  // 审核主表(暂时由移动端做用友来做)
export const getProcessInfoAll = (param) => { return axios.get(base9 + `/common/getProcessInfoAll`,{params:param}).then(res => res.data) } //审核流程走向
export const getHistoryList = (param) => { return axios.get(base9 + `/common/getHistoryList`,{params:param}).then(res => res.data) } //历史审核记录
export const tySP = (url,param) => {
  return axios.get('http://61.141.223.10:' +url+param).then(res => res.data) } //历史审核记录

// 流程管理中心
export const getMenuByparentid = (param) => { return axios.get(base3 + `/common/getMenuByparentid`, {params:param}).then(res => res.data) } // 查询流程管理中心列表数据
export const updateMenuxx = (param) => { return axios.post(base3 + `/common/updateMenuxx`, param).then(res => res.data) } // 查询流程管理中心列表数据
export const getmenuByorder0 = () => { return axios.get(base3 + `/common/getmenuByorder0`).then(res => res.data) } // 查询流程管理中心列表数据
export const addmenub = (param) => { return axios.post(base3 + `/common/addmenub`, param).then(res => res.data) } // 添加流程主列表
export const deleteMenuxx = (param) => { return axios.delete(base3 + `/common/deleteMenuxx`,{params:param}).then(res => res.data) } // 添加流程主列表
export const addMenuMore = (param) => { return axios.post(base3 + `/common/addMenuMore`,param).then(res => res.data) } // 添加流程主列表

// export const processPass = (urlpart) => { return axios.post(base9 + `/common/processPass`,urlpart).then(res => res.data) } //审核通过或者驳回
export const processPass = (urlpart,param) => {
  return axios.post(base9 + `/common/processPass`,urlpart,{params:param}).then(res => res.data) } //审核通过或者驳回

export const createWorkFlow = (urlpart,param) => {
  return axios.post(base9 + `/common/createWorkFlow`, urlpart, {params:param}).then(res => res.data) } //流程发起


//盘点
export const  pdBj = (urlpart) => { return axios.post(base5 + `/jdwh/kcgl/pdBj`,urlpart).then(res => res.data) }

//公共类查询方法getXxBySgdw
export const getXmmList = (urlpart) => {
  return config.userInfo.userType &&config.userInfo.userType == '供应商'?
    axios.get(base2 + `/Gcxmgk/getXxBySgdw`,{params:{cbdwid:config.userInfo.supplierpk}}).then(res => res.data):
    axios.get(base2 + `/Gcxmgk/getXxBySgdw`,{params:{gldwid:config.userInfo.orgid}}).then(res => res.data) }//查询项目名称
export const getXmbhList = (urlpart) => {
  return config.userInfo.userType&&config.userInfo.userType =='供应商'?
    axios.get(base2 + `/Gcxmgk/getXxBySgdw`,{params:{cbdwid:config.userInfo.supplierpk,gldwid:config.userInfo.orgid}}).then(res => res.data):
    axios.get(base2 + `/Gcxmgk/getXxBySgdw`,{params:{gldwid:config.userInfo.orgid}}).then(res => res.data) }//查询项目编号
export const getXmbhtomcList = (urlpart) => { return axios.get(base2 + `/Gcxmgk/getXmbhtomcList`,{params:urlpart}).then(res => res.data) }//根据编号查询名称
export const getXmmctoxmbhList = (urlpart) => { return axios.get(base2 + `/Gcxmgk/getXmmctoxmbhList`,{params:urlpart}).then(res => res.data) }//查询名称查编号
// 目前项目概况和其他除日常外共用的项目名称和项目编号共用的接口
export const getmcbhList = (urlpart) => {
  if(config.userInfo.userType &&config.userInfo.userType =='供应商'){
    console.log(config.userInfo.supplierpk,'==supplierpk')
  }else{
    console.log(config.userInfo,'==orgid')
  }
  return config.userInfo.userType&&config.userInfo.userType =='供应商'?
    axios.get(base2 + `/Gcxmgk/getXxBySgdw`,{params:{cbdwid:config.userInfo.supplierpk}}).then(res => res.data):
    axios.get(base2 + `/Gcxmgk/getXxBySgdw`,{params:{gldwid:config.userInfo.orgid}}).then(res => res.data) }//编号名称同时查询

// 日常项目编号项目名称和编号共用的接口
export const getmcbhList2 = (urlpart) => {
  if(config.userInfo.userType &&config.userInfo.userType =='供应商'){
    console.log(config.userInfo.supplierpk,'==supplierpk')
  }else{
    console.log(config.userInfo,'==orgid')
  }
  return config.userInfo.userType&&config.userInfo.userType =='供应商'?
    axios.get(base2 + `/Gcxmgk/getXxBySgdw`,{params:{cbdwid:config.userInfo.supplierpk,sglx:'hm'}}).then(res => res.data):
    axios.get(base2 + `/Gcxmgk/getXxBySgdw`,{params:{gldwid:config.userInfo.orgid,sglx:'hm'}}).then(res => res.data) }//编号名称同时查询

export const getXmbhmhList = (urlpart) => { return axios.get(base2 + `/Gcxmgk/getXmbhmhList`,{params:urlpart}).then(res => res.data) }//项目编号模糊搜索

export const getXmmcListt = (urlpart) => { return axios.get(base2 + `/Gcxmgk/getXmmcList`,{params:urlpart}).then(res => res.data) }//项目名称模糊搜索
export const getXxBySgdw = (urlpart) => {return axios.get(base2 + `/Gcxmgk/getXxBySgdw`,{params:urlpart}).then(res => res.data)}//项目名称模糊搜索
export const getZqcwzfzsByXmbh = (urlpart) => { return axios.get(base2 + `/rcyhgcJgJung/getZqcwzfzsByXmbh`,{params:urlpart}).then(res => res.data) } // 根据编号列表查询中期财务支付证书
export const  updateJung = (urlpart) => { return axios.put(base2 + `/rcyhgcJgJung/updateJung`,urlpart).then(res => res.data) }//编辑更新

export const getXxfromDwmc = (urlpart) => { return axios.get(base2 + `/Gcxmgk/getXxfromDwmc1`,{params:urlpart}).then(res => res.data) }//项目名称查单位名称
export const getJgjssList2 = (urlpart) => { return axios.get(base2 + `/rcyhgcJgJung/getJgjssList`,{params:urlpart}).then(res => res.data) } // 获取交工结算书
export const getJgjssDetailed = (urlpart) => { return axios.get(base2 + `/rcyhgcJgJung/getJgjssDetailed`,{params:urlpart}).then(res => res.data) } // 获取交工结算书
export const getJungDetailed = (urlpart) => { return axios.get(base2 + `/rcyhgcJgJung/getJungDetailed`,{params:urlpart}).then(res => res.data) } // 获取交工结算书
export const insertJung = (urlpart) => { return axios.post(base2 + `/rcyhgcJgJung/insertJung`,urlpart).then(res => res.data) } // 添加竣工结算书

export const getJungList2 = (urlpart) => { return axios.get(base2 + `/rcyhgcJgJung/getJungList`,{params:urlpart}).then(res => res.data) } // 获取交工结算书
export const getDwList = (urlpart) => { return axios.get(base2 + `/Gcxmgk/getDwList`,{params:urlpart}).then(res => res.data) }//查询单位名称
export const getLxList = (urlpart) => { return axios.get(base2 + `/rcyh/rcqs/getLxList`,{params:urlpart}).then(res => res.data) }//查询路线列表
export const getZqcwzfzsById = (urlpart) => { return axios.get(base2 + `/rcyhgcJgJung/getZqcwzfzsById`,{params:urlpart}).then(res => res.data) } // 根据id列表查询中期财务支付证书
// 通过起止点桩号和路线编号获取经纬度
export const getLonLatByPos = (param) => { return axios.get(baseLanurl + `/geoserver-sde/rest/action/getLonLatByPos`, {params:param}).then(res => res) }  // 查询经纬度
//工程计量单
export const  getRcyhGcjld = (urlpart) => { return axios.post(base2 + `/rcyhGcjlV2/getRcyhGcjld`,urlpart).then(res => res.data) }//工程计量单列表
export const deleteRcyhGcjld = (urlpart) => { return axios.delete(base2 + `/rcyhGcjlV2/deleteRcyhGcjld`,{params:urlpart}).then(res => res.data) }//删除
export const  updateRcyhGcjld = (urlpart) => { return axios.put(base2 + `/rcyhGcjlV2/updateRcyhGcjld`,urlpart).then(res => res.data) }//编辑更新
export const  updateRcyhGcjldZtByGcjlId = (urlpart) => { return axios.get(base2 + `/rcyhGcjlV2/updateRcyhGcjldZtByGcjlId`,{params:urlpart}).then(res => res.data) }//审批
export const  insertRcyhGcjld = (urlpart) => { return axios.post(base2 + `/rcyhGcjlV2/insertRcyhGcjld`,urlpart).then(res => res.data) }//添加工程计量单
export const  getSjqd = (urlpart) => { return axios.post(base2 + `/rcyhGcjlV2/getSjqd`,urlpart).then(res => res.data) }//任务单列表
export const getFilesDataById2 = (urlpart) => { return axios.get(base3 + `/common/getFilesDataById`,{params:urlpart}).then(res => res.data) }//根据关联id查找对应图片
//计日工台班
export const createZmxxRootNode2 = (urlpart) => { return axios.get(base2 + `/util/createZmxxRootNode`,{params:urlpart}).then(res => res.data) }//根据关联id查找对应图片
export const  insertJrg = (urlpart) => { return axios.post(base2 + `/rcyhJrgV2/insertJrg`,urlpart).then(res => res.data) }//添加计日工台班
export const  getJrgByParam = (urlpart) => { return axios.post(base2 + `/rcyhJrgV2/getJrgByParam`,urlpart).then(res => res.data) }//初始化查询
export const  updateJrg = (urlpart) => { return axios.put(base2 + `/rcyhJrgV2/updateJrg`,urlpart).then(res => res.data) }//编辑更新
export const deleteJrgByJrgid = (urlpart) => { return axios.delete(base2 + `/rcyhJrgV2/deleteJrgByJrgid`,{params:urlpart}).then(res => res.data) }//删除
export const updateJrgZtByJrgid = (urlpart) => { return axios.get(base2 + `/rcyhJrgV2/updateJrgZtByJrgid`,{params:urlpart}).then(res => res.data) }//根据关联id查找对应图片

//工程计量汇总表
export const  getRcyhGcjlListToGcjlhz = (urlpart) => { return axios.post(base2 + `/rcyhGcjlV2/getRcyhGcjlListToGcjlhz`,urlpart).then(res => res.data) }//添加工程计量子目信息
export const  getRcyhJrgtbToGcjlhz = (urlpart) => { return axios.post(base2 + `/rcyhGcjlV2/getRcyhJrgtbToGcjlhz`,urlpart).then(res => res.data) }//添加计日工信息
export const  batchInsertRcyhGcjlhzb_Free = (urlpart) => { return axios.post(base2 + `/rcyhGcjlV2/batchInsertRcyhGcjlhzb`,urlpart).then(res => res.data) }//添加汇总列表
export const getRcyhGcjlhzbToDataGridList = (urlpart) => { return axios.post(base2 + `/rcyhGcjlV2/getRcyhGcjlhzbToDataGridList`,urlpart).then(res => res.data) }//初始化列表查询

export const deleteRcyhGcjlhzb = (urlpart) => { return axios.delete(base2 + `/rcyhGcjlV2/deleteRcyhGcjlhzb`,{params:urlpart}).then(res => res.data) }//删除列表
export const getRcyhGcjlhzbByXmbhANDQc = (urlpart) => { return axios.post(base2 + `/rcyhGcjlV2/getRcyhGcjlhzbByXmbhANDQc`,urlpart).then(res => res.data) }//详情
export const  updateRcyhGcjlhzb = (urlpart) => { return axios.put(base2 + `/rcyhGcjlV2/updateRcyhGcjlhzb`,urlpart).then(res => res.data) }//编辑更新
export const updateRcyhGcjlhzbZtByGcjlhzId = (urlpart) => { return axios.get(base2 + `/rcyhGcjlV2/updateRcyhGcjlhzbZtByGcjlhzId`,{params:urlpart}).then(res => res.data) }//审批
//中期财务支付证书
export const getRcyhZqcwzfzs = (urlpart) => { return axios.post(base2 + `/rcyhGcjlV2/getRcyhZqcwzfzs`,urlpart).then(res => res.data) }//列表
export const  updateRcyhZqcwzfzs = (urlpart) => { return axios.put(base2 + `/rcyhGcjlV2/updateRcyhZqcwzfzs`,urlpart).then(res => res.data) }//编辑更新
export const deleteRcyhZqcwzfzs = (urlpart) => { return axios.delete(base2 + `/rcyhGcjlV2/deleteRcyhZqcwzfzs`,{params:urlpart}).then(res => res.data) }//删除列表
export const insertRcyhZqcwzfzs = (urlpart) => { return axios.post(base2 + `/rcyhGcjlV2/insertRcyhZqcwzfzs`,urlpart).then(res => res.data) }//添加
export const  getGcjlhzToZqcwzf = (urlpart) => { return axios.post(base2 + `/rcyhGcjlV2/getGcjlhzToZqcwzf`,urlpart).then(res => res.data) }//添加工程计量汇总子目信息
export const getJgjssByHtbh2 = (urlpart) => { return axios.get(base2 + `/rcyhGcjlV2/getJgjssByHtbh`,{params:urlpart}).then(res => res.data) }
export const updateRcyhZqcwzfzsZt = (urlpart) => { return axios.get(base2 + `/rcyhGcjlV2/updateRcyhZqcwzfzsZt`,{params:urlpart}).then(res => res.data) }
export const getSpfyByXmbhAndZqcwzfzsId = (urlpart) => { return axios.get(base2 + `/rcyhGcjlV2/getSpfyByXmbhAndZqcwzfzsId`,{params:urlpart}).then(res => res.data) }//添加的索赔费用获取
export const getFjByXmbhAndZqcwzfzsId = (urlpart) => { return axios.get(base2 + `/rcyhGcjlV2/getFjByXmbhAndZqcwzfzsId`,{params:urlpart}).then(res => res.data) }//罚金

//aaa 道路巡查
   // 巡查监督
export const getYhxc = (urlpart) => { return axios.get(base2 + `/yhxc/getYhxc`,{params:urlpart}).then(res => res.data) }//数据
export const getXcgj = (urlpart) => { return axios.get(base2 + `/yhxc/getXcgj`,{params:urlpart}).then(res => res.data) }//轨迹
   // 巡查次数配置
     export const getXccspzAll = (urlpart) => { return axios.get(base2 + `/xccspz/getXccspzAll` ,{params:urlpart}).then(res => res) } // 查询所有信息
    export const addxccspz = (urlpart) => { return axios.post(base2 + `/xccspz/insert`, urlpart).then(res => res.data) } // 添加
    export const updatexccspz = (urlpart) => { return axios.post(base2 + `/xccspz/update`, urlpart).then(res => res.data) } // 修改
    export const xccspzqueryOne = (urlpart) => { return axios.get(base2 + `/xccspz/queryOne` + urlpart).then(res => res) } // 根据id查询

    export const xccspzdelete = (urlpart) => { return axios.delete(base2 + `/xccspz/delete` + urlpart).then(res => res) } // 删除
    export const xccspzdeletes = (urlpart) => { return axios.delete(base2 + `/xccspz/deletes` + urlpart).then(res => res) } // 批量删除
    // 巡查次数分析
    export const xccsfxqueryDay = (urlpart) => { return axios.get(base2 + `/xccsfx/queryDay/`,{params:urlpart}).then(res => res) } // 查询日次数
    export const xccsfxqueryMonth = (urlpart) => { return axios.get(base2 + `/xccsfx/queryMonth/`,{params:urlpart}).then(res => res) } // 查询月次数
    export const xccsfxqueryYear = (urlpart) => { return axios.get(base2 + `/xccsfx/queryYear/` ,{params:urlpart}).then(res => res) } // 查询年次数


//履约检查
export const  getLyjcAll2 = (urlpart) => { return axios.get(base2 + `/lyjc/getLyjcAll`,{params:urlpart}).then(res => res.data) }//履约检查初始化
export const  deleteLyjc2 = (urlpart) => { return axios.delete(base2 + `/lyjc/deleteLyjc`,{params:urlpart}).then(res => res.data) }//删除
export const  getLyjcbmxByMid = (urlpart) => { return axios.get(base2 + `/lyjc/getLyjcbmxByMid`,{params:urlpart}).then(res => res.data) }//详情
export const  getXmgkyhxc = (urlpart) => { return axios.get(base2 + `/Gcxmgk/getXmgkyhxc`,{params:urlpart}).then(res => res.data) }//添加的详情初始化
export const  addLyjc2 = (urlpart) => { return axios.post(base2 + `/lyjc/addLyjc`,urlpart).then(res => res.data) }//添加方法
export const  updateLyjc2 = (urlpart) => { return axios.put(base2 + `/lyjc/updateLyjc`,urlpart).then(res => res.data) }//编辑更新


// 专项的履约检查

export const lyjcgetLyjc = (urlpart) => { return axios.get(base4 + `/zxyh/lyjc/getLyjcAll`, {params:urlpart}).then(res => res.data) }//初始化
export const LyjcbmxByMid = (urlpart) => { return axios.get(base4 + `/zxyh/lyjc/getLyjcbmxByMid` ,{params:urlpart}).then(res => res.data) }//详情
export const  zxaddLyjc = (urlpart) => { return axios.post(base4 + `/zxyh/lyjc/addLyjc`,urlpart).then(res => res.data) }//添加方法
export const zxdeleteLyjc = (urlpart) => { return axios.delete(base4 + `/zxyh/lyjc/deleteLyjc`,{params:urlpart}).then(res => res.data) }//删除
export const  zxupdateLyjc = (urlpart) => { return axios.put(base4 + `/zxyh/lyjc/updateLyjc`,urlpart).then(res => res.data) }//编辑更新
// 机电的履约检查
export const jdgetLyjcAll = (urlpart) => { return axios.get(base8 + `/jdyh/lyjc/getLyjcAll`, {params:urlpart}).then(res => res.data) }//初始化
export const jdgetLyjcbmxByMid = (urlpart) => { return axios.get(base8 + `/jdyh/lyjc/getLyjcbmxByMid` ,{params:urlpart}).then(res => res.data) }//详情
export const jdaddLyjc = (urlpart) => { return axios.post(base8 + `/jdyh/lyjc/addLyjc`,urlpart).then(res => res.data) }//添加方法
export const jddeleteLyjc = (urlpart) => { return axios.delete(base8 + `/jdyh/lyjc/deleteLyjc`,{params:urlpart}).then(res => res.data) }//删除
export const  jdupdateLyjc = (urlpart) => { return axios.put(base8 + `/jdyh/lyjc/updateLyjc`,urlpart).then(res => res.data) }//编辑更新

//进场准备
export const  getJczbAll2 = (urlpart) => { return axios.get(base2 + `/lyjc/getJczbAll`,{params:urlpart}).then(res => res.data) }//初始化
export const  getJczbmxById = (urlpart) => { return axios.get(base2 + `/lyjc/getJczbmxById`,{params:urlpart}).then(res => res.data) }//详情
export const  addJczb2 = (urlpart) => { return axios.post(base2 + `/lyjc/addJczb`,urlpart).then(res => res.data) }//添加方法
export const  deleteJczb2 = (urlpart) => { return axios.delete(base2 + `/lyjc/deleteJczb`,{params:urlpart}).then(res => res.data) }//删除
export const  updateJczb2 = (urlpart) => { return axios.put(base2 + `/lyjc/updateJczb`,urlpart).then(res => res.data) }//编辑更新

//专项的进场准备
export const  zxgetJczbAll = (urlpart) => { return axios.get(base4 + `/zxyh/lyjc/getJczbAll`,{params:urlpart}).then(res => res.data) }//初始化
export const  zxgetJczbmxById = (urlpart) => { return axios.get(base4 + `/zxyh/lyjc/getJczbmxById`,{params:urlpart}).then(res => res.data) }//详情
export const  zxaddJczb = (urlpart) => { return axios.post(base4 + `/zxyh/lyjc/addJczb`,urlpart).then(res => res.data) }//添加方法
export const  zxdeleteJczb = (urlpart) => { return axios.delete(base4 + `/zxyh/lyjc/deleteJczb`,{params:urlpart}).then(res => res.data) }//删除
export const  zxupdateJczb = (urlpart) => { return axios.put(base4 + `/zxyh/lyjc/updateJczb`,urlpart).then(res => res.data) }//编辑更新
//工程验收单
export const  getGcyhysdList = (urlpart) => { return axios.get(base2 + `/rcyhYhys/getGcyhysdList`,{params:urlpart}).then(res => res.data) }//初始化
export const  insertGcyhysd = (urlpart) => { return axios.post(base2 + `/rcyhYhys/insertGcyhysd`,urlpart).then(res => res.data) }//添加方法
export const  getGcyssqdByXmbh = (urlpart) => { return axios.get(base2 + `/rcyhYhys/getGcyssqdByXmbh`,{params:urlpart}).then(res => res.data) }//是否可添加
export const  updateGcyhysdYjAndZt = (urlpart) => { return axios.get(base2 + `/rcyhYhys/updateGcyhysdYjAndZt`,{params:urlpart}).then(res => res.data) }//更新状态
// export const  updateGcyhysd = (urlpart) => { return axios.get(base2 + `/rcyhYhys/updateGcyhysd`,{params:urlpart}).then(res => res.data) }//更新状态
export const deleteJgjss = (urlpart) => { return axios.delete(base2 + `/rcyhgcJgJung/deleteJgjss`,{params:urlpart}).then(res => res.data) }//删除
export const deleteJung = (urlpart) => { return axios.delete(base2 + `/rcyhgcJgJung/deleteJung`,{params:urlpart}).then(res => res.data) }//删除
export const updateJgjssSpzt = (urlpart) => { return axios.get(base2 + `/rcyhgcJgJung/updateJgjssSpzt`,{params:urlpart}).then(res => res.data) } // 审批意见
export const getJgjssBasicData = (urlpart) => { return axios.get(base2 + `/rcyhgcJgJung/getJgjssBasicData`,{params:urlpart}).then(res => res.data) } // 审批意见
export const getJungBasicData = (urlpart) => { return axios.get(base2 + `/rcyhgcJgJung/getJungBasicData`,{params:urlpart}).then(res => res.data) } // 审批意见

//专项交工
export const getJgjssBasicData2 = (urlpart) => { return axios.get(base4 + `/ZxyhJgJung/getJgjssBasicData`,{params:urlpart}).then(res => res.data) } // 审批意见
export const getJgjssDetailed2 = (urlpart) => { return axios.get(base4 + `/ZxyhJgJung/getJgjssDetailed`,{params:urlpart}).then(res => res.data) } // 获取交工结算书
export const getJgjssList3 = (urlpart) => { return axios.get(base4 + `/ZxyhJgJung/getJgjssList`,{params:urlpart}).then(res => res.data) } // 获取交工结算书
export const insertJgjss2 = (urlpart) => { return axios.post(base4 + `/ZxyhJgJung/insertJgjss`,urlpart).then(res => res.data) } //添加交工结算书
export const  updateJgjss2 = (urlpart) => { return axios.put(base4 + `/ZxyhJgJung/updateJgjss`,urlpart).then(res => res.data) }//编辑更新
export const deleteJgjss2 = (urlpart) => { return axios.delete(base4 + `/ZxyhJgJung/deleteJgjss`,{params:urlpart}).then(res => res.data) }//删除
export const updateJgjssSpzt2 = (urlpart) => { return axios.get(base4 + `/ZxyhJgJung/updateJgjssSpzt`,{params:urlpart}).then(res => res.data) } // 审批意见

//哈哈哈
//专项竣工
export const getJungDetailed2 = (urlpart) => { return axios.get(base4 + `/ZxyhJgJung/getJungDetailed`,{params:urlpart}).then(res => res.data) } // 获取交工结算书
export const getJungList3 = (urlpart) => { return axios.get(base4 + `/ZxyhJgJung/getJungList`,{params:urlpart}).then(res => res.data) } // 获取交工结算书
export const insertJung2 = (urlpart) => { return axios.post(base4 + `/ZxyhJgJung/insertJung`,urlpart).then(res => res.data) } // 添加竣工结算书
export const  updateJung2 = (urlpart) => { return axios.put(base4 + `/ZxyhJgJung/updateJung`,urlpart).then(res => res.data) }//编辑更新
export const deleteJung2 = (urlpart) => { return axios.delete(base4 + `/ZxyhJgJung/deleteJung`,{params:urlpart}).then(res => res.data) }//删除
export const  updateJungSpzt2 = (urlpart) => { return axios.get(base4 + `/ZxyhJgJung/updateJungSpzt`,{params:urlpart}).then(res => res.data) }//更新状态
export const getJungBasicData2 = (urlpart) => { return axios.get(base4 + `/ZxyhJgJung/getJungBasicData`,{params:urlpart}).then(res => res.data) } // 审批意见


//工程验收申请单
export const  getGcyssqdList2 = (urlpart) => { return axios.get(base2 + `/rcyhYhys/getGcyssqdList`,{params:urlpart}).then(res => res.data) }//初始化
export const  insertGcyssqd = (urlpart) => { return axios.post(base2 + `/rcyhYhys/insertGcyssqd`,urlpart).then(res => res.data) }//添加方法
export const  deleteGcyssqdq = (urlpart) => { return axios.delete(base2 + `/rcyhYhys/deleteGcyssqd`,{params:urlpart}).then(res => res.data) }//删除
export const  updateGcyssqdYjAndZt = (urlpart) => { return axios.get(base2 + `/rcyhYhys/updateGcyssqdYjAndZt`,{params:urlpart}).then(res => res.data) }//更新状态
export const  updateJungSpzt = (urlpart) => { return axios.get(base2 + `/rcyhgcJgJung/updateJungSpzt`,{params:urlpart}).then(res => res.data) }//更新状态

// 下拉枚举
export const getTBdwList = () => { return axios.get(base4 + `/kgsqd/getTBdwList`).then(res => res) } // 申请填报单位
export const getHtbhList = () => { return axios.get(base4 + `/kgsqd/getHtbhList`).then(res => res) } // 合同编号
export const getXmmcList = () => { return axios.get(base4 + `/zxyh/lyjc/getXmmcList`).then(res => res) } // 施工单位项目名称
export const getXmmcJcList = () => { return axios.get(base4 + `/zxyh/lyjc/getXmmcJcList`).then(res => res) } // 进场项目名称列表
export const getDjbhList = () => { return axios.get(base4 + `/sgzjdjh/getDjbhList`).then(res => res) } // 施工总进度单据编号列表
export const getydDjbhList = () => { return axios.get(base4 + `/ydjh/getDjbhList`).then(res => res) } // 月度计划单据编号
export const getGldwList = () => { return axios.get(base4 + `/sgzjdjh/getGldwList`).then(res => res) } // 施工总进度管理单位列表
export const getYhdwList = () => { return axios.get(base4 + `/ydjh/getYhdwList`).then(res => res) } // 月度计划养护单位列表
export const getydWcDjbhList = () => { return axios.get(base4 + `/ydwc/getDjbhList`).then(res => res) } // 月度完成单据编号列表
export const getydWcYhdwList = () => { return axios.get(base4 + `/ydwc/getYhdwList`).then(res => res) } // 月度完成养护单位列表
export const getYbgcHtbhList = () => { return axios.get(base4 + `/ybgc/getHtbhList`).then(res => res) } // 隐蔽工程合同编号列表
export const getYbgcGldwList = () => { return axios.get(base4 + `/ybgc/getGldwList`).then(res => res) } // 隐蔽工程管理单位





//机电的进场准备
export const  jdgetJczbAll = (urlpart) => { return axios.get(base8 + `/jdyh/lyjc/getJczbAll`,{params:urlpart}).then(res => res.data) }//初始化
export const  jdgetJczbmxById = (urlpart) => { return axios.get(base8 + `/jdyh/lyjc/getJczbmxById`,{params:urlpart}).then(res => res.data) }//详情
export const  jdaddJczb = (urlpart) => { return axios.post(base8 + `/jdyh/lyjc/addJczb`,urlpart).then(res => res.data) }//添加方法
export const  jddeleteJczb = (urlpart) => { return axios.delete(base8 + `/jdyh/lyjc/deleteJczb`,{params:urlpart}).then(res => res.data) }//删除
export const  jdupdateJczb = (urlpart) => { return axios.put(base8 + `/jdyh/lyjc/updateJczb`,urlpart).then(res => res.data) }//编辑更新
export const  updateJgjss = (urlpart) => { return axios.put(base2 + `/rcyhgcJgJung/updateJgjss`,urlpart).then(res => res.data) }//编辑更新



// 项目概况

export const  getXmgkjcxx = (urlpart) => { return axios.get(base2 + `/Gcxmgk/getXmgkjcxx`,{params:urlpart}).then(res => res.data) }//项目概况初始化
export const  getXmgkzzxxByhtbh = (urlpart) => { return axios.get(base2 + `/Gcxmgk/getXmgkzzxxByhtbh`,{params:urlpart}).then(res => res.data) }//子目信息

export const  getLhyhzljcpfb = (urlpart) => { return axios.get(base2 + `/Gcxmgk/getLhyhzljcpfb`,{params:urlpart}).then(res => res.data) }//考核细则-绿化养护
export const  getXmgklhzljcByhtbh = (urlpart) => { return axios.get(base2 + `/Gcxmgk/getXmgklhzljcByhtbh`,{params:urlpart}).then(res => res.data) }//绿化保存信息查询
export const  getXmgklyzljcByhtbh = (urlpart) => { return axios.get(base2 + `/Gcxmgk/getXmgklyzljcByhtbh`,{params:urlpart}).then(res => res.data) }//履约信息查询

export const  getZlglkh = (urlpart) => { return axios.get(base2 + `/Gcxmgk/getZlglkh`,{params:urlpart}).then(res => res.data) }//考核细则-履约质量+//考核细则-养护巡查
export const  getXmgkyhxcjcxxByhtbh = (urlpart) => { return axios.get(base2 + `/Gcxmgk/getXmgkyhxcjcxxByhtbh`,{params:urlpart}).then(res => res.data) }//合同编号查养护
export const  getOnlyXmgkjcxx = (urlpart) => { return axios.get(base2 + `/Gcxmgk/getOnlyXmgkjcxx`,{params:urlpart}).then(res => res.data) }//根据合同编号查询基本信息
export const  getryxxb = (urlpart) => { return axios.get(base2 + `/Gcxmgk/getryxxb`,{params:urlpart}).then(res => res.data) }//获取人员信息
export const  getXmgkjczbqkbByhtbh = (urlpart) => { return axios.get(base2 + `/Gcxmgk/getXmgkjczbqkbByhtbh`,{params:urlpart}).then(res => res.data) }//获取人员信息

export const addXmgkjcxx = (urlpart) => { return axios.post(base2 +`/Gcxmgk/addXmgkjcxx`, urlpart).then(res => res.data) }// 添加项目概况主表信息
export const addXmgkzzmm = (urlpart) => { return axios.post(base2 +`/Gcxmgk/addXmgkzzmm`, urlpart).then(res => res.data) }// 添加项目概况主表信息
export const addryxxb = (urlpart) => { return axios.post(base2 +`/Gcxmgk/addryxxb`, urlpart).then(res => res.data) }// 添加项目概况人员管理信息



export const addXmgklhzljc = (urlpart) => { return axios.post(base2 +`/Gcxmgk/addXmgklhzljc`, urlpart).then(res => res.data) }// 考核细则-绿化养护-添加进场
export const addXmgkjczbqkb = (urlpart) => { return axios.post(base2 +`/Gcxmgk/addXmgkjczbqkb`, urlpart).then(res => res.data) }// 考核细则-绿化养护-添加进场
export const addXmgklyzljc = (urlpart) => { return axios.post(base2 +`/Gcxmgk/addXmgklyzljc`, urlpart).then(res => res.data) }// 考核细则-履约质量-添加进场
export const addXmgkyhxc = (urlpart) => { return axios.post(base2 +`/Gcxmgk/addXmgkyhxc`, urlpart).then(res => res.data) }// 考核细则-养护巡查-添加进场
export const getToken = (urlpart) => { return axios.get(base7 + `/token/getToken` + urlpart).then(res => res) } ///获取token
export const getUserBytoken = (urlpart) => { return axios.get(base7 + `/token/getUser` + urlpart).then(res => res) } ///获取用户
export const getUserCode = (urlpart) => { return axios.get(base7 + `/token/getUserCode` + urlpart).then(res => res) } ///获取用户
export const  updateXmgkjcxx = (urlpart,param) => { return axios.post(base2 + `/Gcxmgk/updateXmgkjcxx`,urlpart,{params:param}).then(res => res.data) }//项目信息更新编辑
export const  updateXmgklhjcxx = (urlpart) => { return axios.put(base2 + `/Gcxmgk/updateXmgklhjcxx`,urlpart).then(res => res.data) }//更新绿化信息
export const  updateXmgklyjcxx = (urlpart) => { return axios.put(base2 + `/Gcxmgk/updateXmgklyjcxx`,urlpart).then(res => res.data) }//更新履约质量检查
export const  updateXmgkjczbqkb = (urlpart) => { return axios.put(base2 + `/Gcxmgk/updateXmgkjczbqkb`,urlpart).then(res => res.data) }//更新履约质量检查
export const  updateXmgkyhxcjcxx = (urlpart) => { return axios.put(base2 + `/Gcxmgk/updateXmgkyhxcjcxx`,urlpart).then(res => res.data) }//更新养护巡查信息

//新月度计划
//项目公司
export const getMPList = (urlpart) => { return axios.post( base2 + `/MP/getMPList`, urlpart).then(res => res.data) }// 初始化列表
export const createMonthlyPlan = (urlpart) => { return axios.post( base2 +`/MP/createMonthlyPlan`, urlpart).then(res => res.data) }// 添加下月计划
export const  deleteMonthlyPlan = (urlpart) => { return axios.get( base2 + `/MP/deleteMonthlyPlan`,{params:urlpart}).then(res => res.data) }//删除本月计划

export const  getKTCByMPAID = (urlpart) => { return axios.get( base2 + `/MP/getKTCByMPAID`,{params:urlpart}).then(res => res.data) }//本月计划完成情况(本月计划详情)
export const  getMKDRByKtcsid = (urlpart) => { return axios.get( base2 + `/MP/getMKDRByKtcsid`,{params:urlpart}).then(res => res.data) }//本月计划详情之详细信息
export const  getMWPByMPAID = (urlpart) => { return axios.get( base2 + `/MP/getMWPByMPAID`,{params:urlpart}).then(res => res.data) }//下个月计划详情
// export const  getMDRByMwpsid = (urlpart) => { return axios.get( base2 + `/MP/getMDRByMwpsid`,{params:urlpart}).then(res => res.data) }//下个月计划详情之详细信息
export const updateKDR = (urlpart) => { return axios.post( base2 + `/MP/updateKDR`, urlpart).then(res => res.data) }// 本月的通过打回按钮
export const updateMDR = (urlpart) => { return axios.post( base2 + `/MP/updateMDR `, urlpart).then(res => res.data) }// 下个月的通过打回按钮
export const createMWP = (urlpart) => { return axios.post( base2 + `/MP/createMWP `, urlpart).then(res => res.data) }// 创建月度计划
export const updateMWP = (urlpart) => { return axios.post( base2 + `/MP/updateMWP `, urlpart).then(res => res.data) }// 更新月度计划
export const getProjectMsgToCreateMWP = (urlpart) => { return axios.get( base2 + `/MP/getProjectMsgToCreateMWP`,{params: urlpart}).then(res => res.data) }//获取对应的合同名称
// 月度计划下月计划详情
export const getMDRByXmbhAndMonth = (param) => { return axios.get(base2 + `/MP/getMDRByXmbhAndMonth`,{params:param}).then(res => res.data) }  // 根据项目编号和年、月度查询（外协单位）月度计划详细信息
// 任务单管理
export const getRcyhgcSjqdList = (param) => { return axios.post(base2 + `/RcyhgcV2/getRcyhgcSjqdList`, param).then(res => res) } // 事件清单列表,养护任务单，任务单验收列表
export const insertRcyhgcSjqd = (param) => { return axios.post(base2  + `/RcyhgcV2/insertRcyhgcSjqd`, param).then(res => res) } // 事件清单，养护任务单，任务单验收添加接口
export const createBhlxTree = () => { return axios.get(base2  + `/RcyhgcV2/createBhlxTree`).then(res => res) } // 构建病害类型树结构 - 用于添加《事件清单》时选择“病害类型
export const updateRcyhgcSjqd = (param) => { return axios.put(base2  + `/RcyhgcV2/updateRcyhgcSjqd`, param).then(res => res) } // 编辑日常养护工程 - 事件清单数据
export const getEnumByMeijulxbm = (param) => { return axios.get(base2  + `/util/getEnumByMeijulxbm` + param).then(res => res) } // 根据枚举类型编码获取枚举信息
export const deleteRcyhgcSjqd = (param) => { return axios.delete(base2  + `/RcyhgcV2/deleteRcyhgcSjqd` + param).then(res => res) } // 删除事件清单列表数据
export const getWxsgzpjl = (param) => { return axios.get(base2  + `/RcyhgcV2/getWxsgzpjl` ,{params: param}).then(res => res.data) } // 维修记录照片查询
export const getBhDwByBhid = (param) => { return axios.get(base2  + `/util/getBhDwByBhid` ,{params: param}).then(res => res) } // 通过病害类型查询病害单位


// 项目编号list
// export const getXmbhList = () => { return axios.get(base2 + `/Gcxmgk/getXmbhList`).then(res => res) } // 项目编号list
export const getZhList = (param) => { return axios.get(base2 + `/Gcxmgk/getZhList` + param).then(res => res) } // 根据项目编号查询起止点桩号
// export const getXmbhtomcList = (param) => { return axios.get(base2 + `/Gcxmgk/getXmbhtomcList` + param).then(res => res) } // 根据项目编号查询项目名称
export const getXmmList2 = () => { return axios.get(base2 + `/Gcxmgk/getXmmList`).then(res => res) } // 项目名称list
// export const getXmmctoxmbhList2 = (param) => { return axios.get(base2 + `/Gcxmgk/getXmmctoxmbhList` + param).then(res => res) } // 根据项目名称查询项目编号
// 养护任务单维修记录（完成任务单）
export const getRcyhgcWcrwdListBySjqdId = (param) => { return axios.get(base2  + `/RcyhgcV2/getRcyhgcWcrwdListBySjqdId` + param).then(res => res) } // 根据事件清单ID查询其下的《完成任务单》列表
export const getRcyhgcWcrwdZbListByWcrwdId = (param) => { return axios.get(base2  + `/RcyhgcV2/getRcyhgcWcrwdZbListByWcrwdId` + param).then(res => res) } // 根据完成任务单ID查询其下的《完成任务单 - 子表》列表
export const insertYhrwysd = (param) => { return axios.post(base2  + `/RcyhgcV2/insertYhrwysd`, param).then(res => res) } // 添加一条养护任务验收单数据并将其所属事件清单的状态为：申请验收
export const batchUpdateRcyhgcWcrwdZb = (param) => { return axios.put(base2  + `/RcyhgcV2/batchUpdateRcyhgcWcrwdZb`, param).then(res => res) } // 批量编辑日常养护工程完成任务单子表数据（添加子目信息)
export const createZmxxRootNode = (param) => { return axios.get(base2  + `/util/createZmxxRootNode` + param).then(res => res) } // 根据项目编号创建子目信息树
export const insertRcyhgcWcrwdAndZb = (param) => { return axios.post(base2 + `/RcyhgcV2/insertRcyhgcWcrwdAndZb`, param).then(res => res.data) } // 添加日常养护工程完成任务单+子表数据
export const getHMMPGcnrByXmbhAndMonth = (param) => { return axios.get(base2 + `/RcyhgcV2/getHMMPGcnrByXmbhAndMonth`, {params: param}).then(res => res.data) } // 根据项目编号和年月查询月度计划工程内容
export const updateRcyhgcWcrwdAndZb = (param) => { return axios.put(base2 + `/RcyhgcV2/updateRcyhgcWcrwdAndZb`, param).then(res => res.data) } // 编辑日常养护工程完成任务单子表数据（外层完成任务单数据只传ID即可）
// 路线编码
export const getlxId = (param) => { return axios.get(base3+`/common/getLd` + param).then(res => res) } // 获取路段信息
// 外协数据POST /MP/updateKeyTasksCompletionDetailed
export const getKTCSLidt = (urlpart) => { return axios.post(base2 + `/MP/getKTCSLidt`, urlpart).then(res => res.data) }// 月度总结初始化
export const getMWPSLidt = (urlpart) => { return axios.post( base2 + `/MP/getMWPSLidt`, urlpart).then(res => res.data) }// 月度计划初始化
export const createKeyTasksCompletionDetailed = (urlpart) => { return axios.post( base2 + `/MP/createKeyTasksCompletionDetailed`, urlpart).then(res => res.data) }//月度总结没数据提交提交
export const updateKeyTasksCompletionDetailed = (urlpart) => { return axios.post( base2 + `/MP/updateKeyTasksCompletionDetailed`, urlpart).then(res => res.data) }//月度总结有数据提交
export const createDetailedMonthlyPlans = (urlpart) => { return axios.post( base2 + `/MP/createDetailedMonthlyPlans`, urlpart).then(res => res.data) }//月度计划没数据提交提交
export const updateDetailedMonthlyPlans = (urlpart) => { return axios.post( base2 + `/MP/updateDetailedMonthlyPlans`, urlpart).then(res => res.data) }//月度计划有数据提交
export const getMDRByParam = (urlpart) => { return axios.post( base2 + `/MP/getMDRByParam`, urlpart).then(res => res.data) }//月度计划指定月度计划列表
export const canInsertMp = (urlpart) => { return axios.get( base2 + `/MP/canInsertMp`,{params:urlpart}).then(res => res.data) }//根据项目编号查询外协单位当前月是还可以制定月度计划

// 领导数据
export const updateMPA = (urlpart) => { return axios.post( base2 + `/MP/updateMPA`, urlpart).then(res => res.data) }// 领导审核通过



// 调试修修改
export const login = (urlpart) => { return axios.post(`/login`, urlpart).then(res => res) }// 登录
export const userPageList = (urlpart) => { return axios.post(`/user/listpage`, urlpart).then(res => res) }// 用户分页
export const userDetails = (id) => { return axios.post(`/user/details`, {id: id}).then(res => res) }// 用户详情
export const userDelect = (id) => { return axios.post(`/user/remove`, {id: id}).then(res => res) }// 用户删除
export const userAdd = (urlpart) => { return axios.post(`/user/add`, urlpart).then(res => res) }// 用户添加
export const userUpdate = (urlpart) => { return axios.post(`/user/edit`, urlpart).then(res => res) }// 用户修改
export const getJurisdsGroup = () => { return axios.post(`/getJurisdsGroup`).then(res => res) }// 系统权限组
export const getAllJurisds = () => { return axios.post(`/getAllJurisds`).then(res => res) }// 系统所有权限
export const treedata = () => { return axios.post(`/treedata`).then(res => res) }// 系统所有权限

export const getUserDw = (urlpart) => { return axios.get(base7 + `/commonuse/selAllUnit` + urlpart).then(res => res) } ///获取单位
export const getUserDept = (urlpart) => { return axios.get(base7+ `/commonuse/selAllDept` + urlpart).then(res => res) } ///获取部门
export const getUserDept2 = (urlpart) => { return axios.get(base7+ `/commonuse/selAllDept2` + urlpart).then(res => res) } ///获取部门
export const wxjssq = (urlpart) => { return axios.post('http://61.141.223.10:8081/uapws/service/nc.cmet.yhtornc.cmpapply.ICmpApplyToYH' , urlpart).then(res => res) } ///维修结算申请
export const getZcList = (urlpart) => { return axios.get(base7 + `/commonuse/getZcList` + urlpart).then(res => res) }
export const getWlList = (urlpart) => { return axios.get(base7 + `/commonuse/getWlList` + urlpart).then(res => res) }
export const selAllWllb = (urlpart) => { return axios.get(base7 + `/commonuse/selAllWllb`).then(res => res) }
export const selAllZclb = (urlpart) => { return axios.get(base7 + `/commonuse/selAllZclb`).then(res => res) }
export const selAllDepts = (urlpart) => { return axios.get(base7+'/commonuse/selAllDepts'+ urlpart).then(res => res) }
export const selRyByDwAndBm = (urlpart) => { return axios.get(base7+'/commonuse/selRyByDwAndBm' + urlpart).then(res => res) }

//立项审批号
export const getLxspList = (urlpart) => { return axios.get(base7+'/commonuse/getLxspList'+ urlpart).then(res => res) }

// 路况评定
export const addFaForLksjcx = (urlpart) => { return axios.post(`/lkpd/cx/addFaForLksjcx`, urlpart).then(res => res) } // 添加路况评定方案数据
export const getFaForLksjcx = (urlpart) => { return axios.get(`/lkpd/cx/getFaForLksjcx` + urlpart).then(res => res) } // 获取技术状况评定方案数据
export const createMxbDataForLksjcx = (urlpart) => {return axios.post(`/lkpd/cx/createMxbDataForLksjcx` + urlpart).then(res => res) } // 生成路况评定方案数据
export const importLksjcx = (urlpart) => { return axios.post(`/lkpd/cx/import`+ urlpart).then(res => res) } // 导入路况评定方案数据
export const getFamc = (urlpart) => { return axios.get(`/lkpd/cx/getFamc` + urlpart).then(res => res) } // 获取方案名称
export const getDjbhForLksjcx = () => { return axios.get(`/lkpd/cx/getDjbhForLksjcx`).then(res => res) } // 获取技术状况评定单据编号
export const getHzbForLksjcx = (urlpart) => { return axios.get(`/lkpd/cx/getHzbForLksjcx` + urlpart).then(res => res) } // 获取技术状况评定汇总表数据
export const getHzbForLksjcxTwo = (urlpart) => { return axios.get(`/lkpd/cx/getHzbForLksjcxTwo` + urlpart).then(res => res) } // 获取技术状况评定汇总表数据
export const getMxbForLksjcx = (urlpart) => { return axios.get(`/lkpd/cx/getMxbForLksjcx` + urlpart).then(res => res) } // 获取技术状况评定明细表数据
export const editFaForLksjcx = (urlpart) => { return axios.put(`/lkpd/cx/editFaForLksjcx`, urlpart).then(res => res) } // 编辑路况评定方案数据
export const delFaForLksjcx = (urlpart) => { return axios.delete(`/lkpd/cx/delFaForLksjcx` + urlpart).then(res => res) } // 删除路况评定方案数据(通过单据编号数组)

//检查项管理

export const getXclxmxjList = (urlpart) => { return axios.get(base5+ `/jdwh/xjwx/getXclxmxjList` + urlpart).then(res => res) } //获取检查项列表
export const editXclxjcx = (urlpart) => { return axios.put(base5+`/jdwh/xjwx/editXclxjcx`, urlpart).then(res => res) }
export const delXclxjcxByIds = (urlpart) => { return axios.delete(base5+`/jdwh/xjwx/delXclxjcxByIds` + urlpart).then(res => res) }
export const addXclxjcx = (urlpart) => { return axios.post(base5+`/jdwh/xjwx/addXclxjcx`, urlpart).then(res => res) }


export const getPciForLksjdr = (urlpart) => { return axios.get(base+`/lkpd/dr/getPciForLksjdr` + urlpart).then(res => res) } // 获取检测数据导入-PCI
export const getBciForLksjdr = (urlpart) => { return axios.get(`/lkpd/dr/getBciForLksjdr` + urlpart).then(res => res) } // 获取检测数据导入-BCI
export const getPssiAllList = (urlpart) => { return axios.get(`/lkpd/cx/getPssiAllList` + urlpart).then(res => res) } // 获取检测数据导入-PSSI
export const getRdiForLksjdr = (urlpart) => { return axios.get(`/lkpd/dr/getRdiForLksjdr` + urlpart).then(res => res) } // 获取检测数据导入-RDI
export const getRqiForLksjdr = (urlpart) => { return axios.get(`/lkpd/dr/getRqiForLksjdr` + urlpart).then(res => res) } // 获取检测数据导入-RQI
export const getSciForLksjdr = (urlpart) => { return axios.get(`/lkpd/dr/getSciForLksjdr` + urlpart).then(res => res) } // 获取检测数据导入-SCI
export const getSriForLksjdr = (urlpart) => { return axios.get(`/lkpd/dr/getSriForLksjdr` + urlpart).then(res => res) } // 获取检测数据导入-SRI
export const getTciForLksjdr = (urlpart) => { return axios.get(`/lkpd/dr/getTciForLksjdr` + urlpart).then(res => res) } // 获取检测数据导入-TCI
// 路线
export const commongetLd = (urlpart) => { return axios.get(base3 + `/common/getLd` + urlpart).then(res => res) } // 获取路段信息
// 文件上传
export const uploadFiles = base3 + `/common/uploadFile`// 文件上传
export const  uploadFile2 = (urlpart) => { return axios.post(base3 + `/common/uploadFile`,urlpart).then(res => res.data) }//工程计量单列表
export const deleteFilesById2 = (urlpart) => { return axios.delete(base3 + `/common/deleteFilesDataById`, {params:urlpart}).then(res => res.data) } // 根据外键ID删除文件


export const deleteFilesById = (urlpart) => { return axios.delete(base3 + `/common/deleteFilesDataById` + urlpart).then(res => res) } // 根据外键ID删除文件
export const deleteById = (urlpart) => { return axios.delete(base3 + `/common/deleteFileDataById` + urlpart).then(res => res) } // 根据ID删除文件
export const getFilesDataById = (urlpart) => { return axios.get(base3 + `/common/getFilesDataById` + urlpart).then(res => res) } // 根据ID获取文件信息
export const addFileData = (urlpart) => { return axios.post(base3 + `/common/addFileDataToFiles`, urlpart).then(res => res) } // 保存文件信息

// 履约检查
export const addLyjc = (urlpart) => { return axios.post(base2 + `/lyjc/addLyjc`, urlpart).then(res => res) } // 添加履约检查信息
export const getLyjcbmxById = (urlpart) => { return axios.get(base2 + `/lyjc/getLyjcbmxById` + urlpart).then(res => res) } // 根据id查询履约检查表信息
export const getLyjcAll = (urlpart) => { return axios.get(base2 + `/lyjc/getLyjcAll` + urlpart).then(res => res) } // 查询施工单位履约检查表所有信息
export const updateLyjc = (urlpart) => { return axios.put(base2 + `/lyjc/updateLyjc`, urlpart).then(res => res) } // 更新履约检查信息
export const deleteLyjc = (urlpart) => { return axios.delete(base2 + `/lyjc/deleteLyjc` + urlpart).then(res => res) } // 删除履约检查信息

// 进场准备检查
export const addJczb = (urlpart) => { return axios.post(base2 + `/lyjc/addJczb`, urlpart).then(res => res) } // 添加进场准备检查信息
export const getJczbbmxById = (urlpart) => { return axios.get(base2 + `/lyjc/getJczbbmxById` + urlpart).then(res => res) } // 根据id查询进场准备检查表信息
export const getJczbAll = (urlpart) => { return axios.get(base2 + `/lyjc/getJczbAll` + urlpart).then(res => res) } // 查询施工单位进场准备检查表所有信息
export const updateJczb = (urlpart) => { return axios.put(base2 + `/lyjc/updateJczb`, urlpart).then(res => res) } // 更新进场准备检查信息
export const deleteJczb = (urlpart) => { return axios.delete(base2 + `/lyjc/deleteJczb` + urlpart).then(res => res) } // 删除进场准备检查信息

// 月度施工计划申报
export const addSgjh = (urlpart) => { return axios.post(base2 + `/sgjh/addSgjh`, urlpart).then(res => res) } // 添加履约检查信息
export const getSgjhmxById = (urlpart) => { return axios.get(base2 + `/sgjh/getSgjhmxById` + urlpart).then(res => res) } // 根据id查询履约检查表信息
export const getSgjhAll = (urlpart) => { return axios.get(base2 + `/sgjh/getSgjhAll` + urlpart).then(res => res) } // 查询施工单位履约检查表所有信息
export const upateSgjh = (urlpart) => { return axios.put(base2 + `/sgjh/upateSgjh`, urlpart).then(res => res) } // 更新履约检查信息
export const deleteSgjh = (urlpart) => { return axios.delete(base2 + `/sgjh/deleteSgjh` + urlpart).then(res => res) } // 删除履约检查信息

// 月度施工完成情况
export const addWcSgjh = (urlpart) => { return axios.post(base2 + `/sgjh/addWcSgjh`, urlpart).then(res => res) } // 添加进场准备检查信息
export const getWcSgjhmxById = (urlpart) => { return axios.get(base2 + `/sgjh/getWcSgjhmxById` + urlpart).then(res => res) } // 根据id查询进场准备检查表信息
export const getWcSgjhAll = (urlpart) => { return axios.get(base2 + `/sgjh/getWcSgjhAll` + urlpart).then(res => res) } // 查询施工单位进场准备检查表所有信息
export const rcyhXxrwgetCreateYhjdwcmxByYfAndHtbh = (urlpart) => { return axios.get(base2 + `/rcyhXxrw/getCreateYhjdwcmxByYfAndHtbh` + urlpart).then(res => res) } // 查询施工单位进场准备检查表所有信息
export const upateWcSgjh = (urlpart) => { return axios.put(base2 + `/sgjh/upateWcSgjh`, urlpart).then(res => res) } // 更新进场准备检查信息
export const deleteWcSgjh = (urlpart) => { return axios.delete(base2 + `/sgjh/deleteWcSgjh` + urlpart).then(res => res) } // 删除进场准备检查信息

// 养护验收申请单
export const xcsbgetXcsb = (urlpart) => { return axios.get(base2 + `/xcsb/getXcsb` + urlpart).then(res => res) } // 查询巡查上报信息
export const querygldw = () => { return axios.get(base2 + `/yhrwdsh/querygldw/`).then(res => res) } // 查询管理单位
export const queryyhdw = () => { return axios.get(base2 + `/yhrwdsh/queryyhdw`).then(res => res) } // 查询养护单位

export const getGcyssqdAll = (urlpart) => { return axios.get(base2 + `/yhyc/getGcyssqdAll` + urlpart).then(res => res) } // 获取所有养护验收申请单信息
export const updateGcyssqd = (urlpart) => { return axios.put(base2 + `/rcyhYhys/updateGcyssqd`, urlpart).then(res => res) } // 根据单据编号更新养护验收申请单
export const addGcyssqd = (urlpart) => { return axios.post(base2 + `/yhyc/addGcyssqd`, urlpart).then(res => res) } // 添加养护验收申请单
export const rcyhXxrwupdateXxrwYhrwd = (urlpart) => { return axios.post(base2 + `/rcyhXxrw/updateXxrwYhrwd` + urlpart).then(res => res) }
export const deleteGcyssqd = (urlpart) => { return axios.delete(base2 + `/yhyc/deleteGcyssqd` + urlpart).then(res => res) } // 删除养护工程验收申请单数据

// 养护验收验收单
export const getGcyhysdAll = (urlpart) => { return axios.get(base2 + `/yhyc/getGcyhysdAll`,{params:urlpart}).then(res => res.data) } // 获取养护工程验收单所有数据
export const rcyhYhrwysdgetYsdList = (urlpart) => { return axios.get(base2 + `/rcyhYhrwysd/getYsdList` + urlpart).then(res => res) } // 获取养护工程验收单所有数据
export const rcyhYhrwysdgetHtxxList = () => { return axios.get(base2 + `/rcyhYhrwysd/getHtxxList`).then(res => res) } // 获取养护工程验收单工程项目
export const rcyhYhrwysdgetBhListByHtxxID = (urlpart) => { return axios.get(base2 + `/rcyhYhrwysd/getBhListByHtxxID` + urlpart).then(res => res) } // 获取养护工程验收单工程项目
export const rcyhYhrwysdupdateYhrwysdYS = (urlpart) => { return axios.get(base2 + `/rcyhYhrwysd/updateYhrwysdYS` + urlpart).then(res => res) } // 获取养护工程验收单工程项目
export const updateGcyhysd = (urlpart) => { return axios.put(base2 + `/rcyhYhys/updateGcyhysd`, urlpart).then(res => res) } // 根据单据编号更新养护验收申请单
export const rcyhYhrwysdinsertYhrwysd = (urlpart) => { return axios.post(base2 + `/rcyhYhrwysd/insertYhrwysd`, urlpart).then(res => res) } // 添加养护验收申请单
// export const deleteGcyhysd = (urlpart) => { return axios.delete(base2 + `/yhyc/deleteGcyhysd` + urlpart).then(res => res) } // 删除养护工程验收申请单数据
export const deleteGcyhysd = (urlpart) => { return axios.delete(base2 + `/rcyhYhys/deleteGcyhysd` + urlpart).then(res => res) } // 删除养护工程验收申请单数据

// // 巡查次数配置
// export const addxccspz = (urlpart) => { return axios.post(base2 + `/xccspz/insert`, urlpart).then(res => res) } // 添加
// export const updatexccspz = (urlpart) => { return axios.post(base2 + `/xccspz/update`, urlpart).then(res => res) } // 修改
// export const xccspzqueryOne = (urlpart) => { return axios.get(base2 + `/xccspz/queryOne` + urlpart).then(res => res) } // 根据id查询
// export const getXccspzAll = (urlpart) => { return axios.get(base2 + `/xccspz/getXccspzAll` + urlpart).then(res => res) } // 查询所有信息
// export const xccspzdelete = (urlpart) => { return axios.delete(base2 + `/xccspz/delete` + urlpart).then(res => res) } // 删除
// export const xccspzdeletes = (urlpart) => { return axios.delete(base2 + `/xccspz/deletes` + urlpart).then(res => res) } // 批量删除



// 日常清扫
export const getRcqsrwList = (urlpart) => { return axios.get(base2 + `/rcyh/rcqs/getRcqsrwList` ,{params:urlpart}).then(res => res.data) } // 日常清扫
export const getRcqsgj = (urlpart) => { return axios.get(base2 + `/rcyh/rcqs/getRcqsgj` ,{params:urlpart}).then(res => res.data) } // 日常清扫轨迹

// 绿化养护
export const getLhyhrwList = (urlpart) => { return axios.get(base2 + `/rcyh/lhyh/getLhyhrwList`,{params:urlpart}).then(res => res) } // 绿化养护
export const getLhyhgj = (urlpart) => { return axios.get(base2 + `/rcyh/lhyh/getLhyhgj`,{params:urlpart}).then(res => res.data) } // 绿化养护轨迹

export const getQsrwdList = (urlpart) => { return axios.get(base2 + `/qsrwdsh/getQsrwdList` + urlpart).then(res => res) } // 获取清扫任务单
export const qsrwdshupdate = (urlpart) => { return axios.post(base2 + `/qsrwdsh/update`, urlpart).then(res => res) } // 编辑清扫任务单
export const qsrwdshinsert = (urlpart) => { return axios.post(base2 + `/rcyhXxrw/insertXxrwQsrwd`, urlpart).then(res => res) } // 新增清扫任务单
export const qsrwdshdelete = (urlpart) => { return axios.delete(base2 + `/qsrwdsh/delete` + urlpart).then(res => res) } // 删除清扫任务单
/* export const getQsrwdList = (urlpart) => { return axios.get(base2 + `/qsrwdsh/getQsrwdList` + urlpart).then(res => res) } // 获取清扫任务单
export const getQsrwdList = (urlpart) => { return axios.get(base2 + `/qsrwdsh/getQsrwdList` + urlpart).then(res => res) } // 获取清扫任务单
export const getQsrwdList = (urlpart) => { return axios.get(base2 + `/qsrwdsh/getQsrwdList` + urlpart).then(res => res) } // 获取清扫任务单 */

// 索赔申请书
export const getSpsqdList = (urlpart) => { return axios.get(base2 + `/rcyh/jlzf/getSpsqdList`,{params:urlpart}).then(res => res) } // 获取
export const editSpsqsForJlzf = (urlpart) => { return axios.put(base2 + `/rcyh/jlzf/editSpsqsForJlzf`, urlpart).then(res => res) } // 编辑
export const spSpsqsForJlzf = (urlpart,param) => { return axios.put(base2 + `/rcyh/jlzf/spSpsqsForJlzf`,urlpart,{params:param}).then(res => res.data) } // 审批
export const delSpsqsForJlzf = (urlpart) => { return axios.delete(base2 + `/rcyh/jlzf/delSpsqsForJlzf` + urlpart).then(res => res) } // 删除
export const addSpsqsForJlzf = (urlpart) => { return axios.post(base2 + `/rcyh/jlzf/addSpsqsForJlzf`, urlpart).then(res => res) } // 添加

// 计日工审批表
export const getJgrspList = (urlpart) => { return axios.get(base2 + `/rcyh/jlzf/getJgrspList` + urlpart).then(res => res) } // 获取
export const editJrgspForJlzf = (urlpart) => { return axios.put(base2 + `/rcyh/jlzf/editJrgspForJlzf`, urlpart).then(res => res) } // 编辑
export const spJgrspForJlzf = (urlpart) => { return axios.put(base2 + `/rcyh/jlzf/spJgrspForJlzf` + urlpart).then(res => res) } // 编辑
export const delJgrspForJlzf = (urlpart) => { return axios.delete(base2 + `/rcyh/jlzf/delJgrspForJlzf` + urlpart).then(res => res) } // 删除
export const addJrgspForJlzf = (urlpart) => { return axios.post(base2 + `/rcyh/jlzf/addJrgspForJlzf`, urlpart).then(res => res) } // 添加

// 工程计量单
export const getGcjldList = (urlpart) => { return axios.get(base2 + `/rcyh/jlzf/getGcjldList` + urlpart).then(res => res) } // 获取
export const editGcjldForJlzf = (urlpart) => { return axios.put(base2 + `/rcyh/jlzf/editGcjldForJlzf`, urlpart).then(res => res) } // 编辑
export const spGcjldForJlzf = (urlpart) => { return axios.put(base2 + `/rcyh/jlzf/spGcjldForJlzf` + urlpart).then(res => res) } // 审批工程计量单
export const delGcjldForJlzf = (urlpart) => { return axios.delete(base2 + `/rcyh/jlzf/delGcjldForJlzf` + urlpart).then(res => res) } // 删除
export const addGcjldForJlzf = (urlpart) => { return axios.post(base2 + `/rcyh/jlzf/addGcjldForJlzf`, urlpart).then(res => res) } // 添加

// 中(终)期财务支付证书
export const getZqcwzfList = (urlpart) => { return axios.get(base2 + `/rcyh/jlzf/getZqcwzfList` + urlpart).then(res => res) } // 获取中(终)期财务支付证书
export const editZqcwzfForJlzf = (urlpart) => { return axios.put(base2 + `/rcyh/jlzf/editZqcwzfForJlzf`, urlpart).then(res => res) } // 编辑中(终)期财务支付证书
export const spZqcwzfForJlzf = (urlpart) => { return axios.put(base2 + `/rcyh/jlzf/spZqcwzfForJlzf` + urlpart).then(res => res) } // 审批中(终)期财务支付证书
export const delZqcwzfForJlzf = (urlpart) => { return axios.delete(base2 + `/rcyh/jlzf/delZqcwzfForJlzf` + urlpart).then(res => res) } // 删除中(终)期财务支付证书
export const addZqcwzfForJlzf = (urlpart) => { return axios.post(base2 + `/rcyh/jlzf/addZqcwzfForJlzf`, urlpart).then(res => res) } // 添加计量支付-中(终)期财务支付证书数据

// 合同信息
export const getHtxxRelatedAll = (urlpart) => { return axios.get(base3 + `/common/getHtxxRelatedAll` + urlpart).then(res => res) } // 合同信息
export const getCgHtxxRelatedAll = (urlpart) => { return axios.get(base3 + `/common/getCgHtxxRelatedAll` + urlpart).then(res => res) } // 合同信息
export const getZjHtxxRelatedAll = (urlpart) => { return axios.get(base3 + `/common/getZjHtxxRelatedAll` + urlpart).then(res => res) } // 合同信息
export const getHtxxRelated = (urlpart) => { return axios.get(base3 + `/common/getHtxxRelatedAll?htbh=` + urlpart).then(res => res) } // 合同信息
export const getHtxxLyjcAll = (urlpart) => { return axios.get(base3 + `/common/getHtxxLyjcAll` + urlpart).then(res => res) } // 合同信息
export const commoncreateZzxxList = () => { return axios.get(base3 + `/common/createZzxxList`).then(res => res) }
export const commoncreateRyxxList = (urlpart) => { return axios.get(base3 + `/common/createRyxxList` + urlpart).then(res => res) }
export const getHtInfo = (urlpart) => { return axios.get(base2 + `/rcyh/jlzf/getHtInfo` + urlpart).then(res => res) } // 合同信息
export const getHtXxInfoByBm = (urlpart) => { return axios.get(base2 + `/rcyh/jlzf/getHtXxInfoByBm` + urlpart).then(res => res) } // 合同信息
export const getHtCwInfoByBm = (urlpart) => { return axios.get(base2 + `/rcyh/jlzf/getHtCwInfoByBm` + urlpart).then(res => res) } // 财务支付证书合同信息

// 交工结算书
export const getJgjssList = (urlpart) => { return axios.get(base2 + `/rcyh/jgjszf/getJgjssList` + urlpart).then(res => res) } // 获取交工结算书
export const getJgjssInfoByDjbh = (urlpart) => { return axios.get(base2 + `/rcyh/jgjszf/getJgjssInfoByDjbh` + urlpart).then(res => res) } // 通过结算书编号交工结算书
export const getHtJgInfoByBm = (urlpart) => { return axios.get(base2 + `/rcyh/jgjszf/getHtJgInfoByBm` + urlpart).then(res => res) } // 获取合同详细信息(交工结算)
export const editJgjssForJgjs = (urlpart) => { return axios.put(base2 + `/rcyh/jgjszf/editJgjssForJgjs`, urlpart).then(res => res) } // 编辑交工结算书
export const spJgjssForJgjs = (urlpart) => { return axios.put(base2 + `/rcyh/jgjszf/spJgjssForJgjs` + urlpart).then(res => res) } // 审批交工结算书
export const delJgjssForJgjs = (urlpart) => { return axios.delete(base2 + `/rcyh/jgjszf/delJgjssForJgjs` + urlpart).then(res => res) } // 删除交工结算书
export const addJgjssForJgjs = (urlpart) => { return axios.post(base2 + `/rcyh/jgjszf/addJgjssForJgjs`, urlpart).then(res => res) } // 添加交工结算书

// 小修任务
export const getYhrwdshList = (urlpart) => { return axios.get(base2 + `/rcyhXxrw/getXxrwYhrwdList` + urlpart).then(res => res) } // 获取养护任务单审核列表数据
export const rcyhXxrwgetBhList = (urlpart) => { return axios.get(base2 + `/rcyhXxrw/getBhList`,{params:urlpart}).then(res => res)}
export const rcyhXxrwgetBhListByDW = (urlpart) => { return axios.get(base2 + `/rcyhXxrw/getBhListByDW` + urlpart).then(res => res) } // 根据单位查询待下任务单的病害事件
export const rcyhXxrwgetWxsgzpjl = (urlpart) => { return axios.get(base2 + `/rcyhXxrw/getWxsgzpjl` + urlpart).then(res => res) }
export const yhrwdshupdate = (urlpart) => { return axios.post(base2 + `/yhrwdsh/update`, urlpart).then(res => res) } // 编辑养护任务单
export const yhrwdshupdateshzt = (urlpart) => { return axios.post(base2 + `/yhrwdsh/updateshzt` + urlpart).then(res => res) } // 修改审核状态
export const yhrwdshupdateyszt = (urlpart) => { return axios.post(base2 + `/yhrwdsh/updateyszt` + urlpart).then(res => res) } // 修改验收状态
export const yhrwdshdelete = (urlpart) => { return axios.delete(base2 + `/yhrwdsh/delete` + urlpart).then(res => res) } // 删除中(终)期财务支付证书
export const yhrwdshinsert = (urlpart) => { return axios.post(base2 + `/rcyhXxrw/insertXxrwYhrwd`, urlpart).then(res => res) } // 主表添加一条信息
export const rcyhXxrwupdateXxrwQsrwdShQszt = (urlpart) => { return axios.post(base2 + `/rcyhXxrw/updateXxrwQsrwdShQszt` + urlpart).then(res => res) }

// 质量检测评分表
export const lhyhpfbgetLhyhrwList = (urlpart) => { return axios.get(base2 + `/lhyhpfb/getLhyhrwList`,{params:urlpart}).then(res => res) } // 获取养护任务单审核列表数据
export const lhyhpfbupdat = (urlpart) => { return axios.post(base2 + `/lhyhpfb/update`, urlpart).then(res => res.data) } // 编辑养护任务单
export const lhyhpfbupdaeshzt = (urlpart) => { return axios.post(base2 + `/lhyhpfb/updateshzt` + urlpart).then(res => res) } // 修改审核状态
export const lhyhpfbdelete = (urlpart) => { return axios.delete(base2 + `/lhyhpfb/delete`,{params:urlpart}).then(res => res.data) } // 删除中(终)期财务支付证书
export const lhyhpfbinert = (urlpart) => { return axios.post(base2 + `/lhyhpfb/insert`, urlpart).then(res => res.data) }

// 养护任务单审核列表
export const rcyhxckhbdelete = (urlpart) => { return axios.delete(base2 + `/rcyhxckhb/delete`,{params:urlpart}).then(res => res.data) } // 删除中(终)期财务支付证书
export const getRcyhxckhbList = (urlpart) => { return axios.get(base2 + `/rcyhxckhb/getRcyhxckhbList`,{params:urlpart}).then(res => res.data) }
export const rcyhxckhbinsert = (urlpart) => { return axios.post(base2 + `/rcyhxckhb/insert`, urlpart).then(res => res.data) }
export const rcyhxckhbupdate = (urlpart) => { return axios.post(base2 + `/rcyhxckhb/update`, urlpart).then(res => res.data) } // 编辑养护任务单
export const rcyhXxrwinsertRwdSubsidiary = (urlpart) => { return axios.post(base2 + `/rcyhXxrw/insertRwdSubsidiary`, urlpart).then(res => res) }

// 专项养护
// 开工申请
export const deleteKgsqd = (urlpart) => { return axios.delete(base4 + `/kgsqd/deleteKgsqd` + urlpart).then(res => res) } // 删除开工申请单
//export const kgsqdgetAll = (urlpart) => { return axios.get(base4 + `/kgsqd/getAll` ,{params:urlpart}).then(res => res) } // 获取开工申请单
export const kgsqdgetAll = (urlpart) => {  return axios.get(base4 + `/kgsqd/getAll`, {params:urlpart}).then(res => res) } // 获取开工申请单
// export const addKgsqd = (urlpart) => { return axios.post(base4 + `/kgsqd/addKgsqd`, urlpart).then(res => res) } // 增加开工申请单
export const addKgsqd = (urlpart) => { return axios.post(base4 + `/kgsqd/addKgsqd`, urlpart).then(res => res) } // 增加开工申请单
export const updateKgsqd = (urlpart) => { return axios.put(base4 + `/kgsqd/updateKgsqd`, urlpart).then(res => res) } // 编辑开工申请单

// 工程变更申请表
export const delBgsqbForBggl = (urlpart) => { return axios.delete(base4 + `/zxyh/bgglgcbg/delBgsqbForBggl` + urlpart).then(res => res) } // 删除工程变更申请表数据
export const getBgsqbList = (urlpart) => { return axios.get(base4 + `/zxyh/bgglgcbg/getBgsqbList` + urlpart).then(res => res) } // 查询工程变更申请表数据
export const addBgsqbForBggl = (urlpart) => { return axios.post(base4 + `/zxyh/bgglgcbg/addBgsqbForBggl`, urlpart).then(res => res) } // 添加工程变更申请表数据
export const editBgsqbForBggl = (urlpart) => { return axios.put(base4 + `/zxyh/bgglgcbg/editBgsqbForBggl`, urlpart).then(res => res) } // 编辑工程变更申请表数据
export const spBgsqbForBggl = (urlpart) => { return axios.put(base4 + `/zxyh/bgglgcbg/spBgsqbForBggl` + urlpart).then(res => res) } // 审批工程变更申请表

// 工程变更令
export const delBglForBggl = (urlpart) => { return axios.delete(base4 + `/zxyh/bgglgcbg/delBglForBggl` + urlpart).then(res => res) } // 删除工程变更令
export const getBglList = (urlpart) => { return axios.get(base4 + `/zxyh/bgglgcbg/getBglList` + urlpart).then(res => res) } // 查询工程变更令
export const getBglBgsqbInfo = () => { return axios.get(base4 + `/zxyh/bgglgcbg/getBglBgsqbInfo`).then(res => res) } // 查询工程变更令
export const addBglForBggl = (urlpart) => { return axios.post(base4 + `/zxyh/bgglgcbg/addBglForBggl`, urlpart).then(res => res) } // 添加工程变更令
export const editBglForBggl = (urlpart) => { return axios.put(base4 + `/zxyh/bgglgcbg/editBglForBggl`, urlpart).then(res => res) } // 编辑工程变更令
export const spBglForBggl = (urlpart) => { return axios.put(base4 + `/zxyh/bgglgcbg/spBglForBggl` + urlpart).then(res => res) } // 审批工程变更令

// 工程变更单
export const delBgdForBggl = (urlpart) => { return axios.delete(base4 + `/zxyh/bgglgcbg/delBgdForBggl` + urlpart).then(res => res) } // 删除工程变更单
export const getBgdList = (urlpart) => { return axios.get(base4 + `/zxyh/bgglgcbg/getBgdList` + urlpart).then(res => res) } // 查询工程变更单
export const zxyhbgglgcbggetHtBgdInfoByBm = (urlpart) => { return axios.get(base4 + `/zxyh/bgglgcbg/getHtBgdInfoByBm` + urlpart).then(res => res) } // 获取合同详细信息
export const addBgdForBggl = (urlpart) => { return axios.post(base4 + `/zxyh/bgglgcbg/addBgdForBggl`, urlpart).then(res => res) } // 添加工程变更单数据
export const editBgdForBggl = (urlpart) => { return axios.put(base4 + `/zxyh/bgglgcbg/editBgdForBggl`, urlpart).then(res => res) } // 编辑工程变更单数据
export const spBgdForBggl = (urlpart) => { return axios.put(base4 + `/zxyh/bgglgcbg/spBgdForBggl` + urlpart).then(res => res) } // 审批工程变更单

export const rcyhXxrwgetJlgcMx2ByHtAndYd = (urlpart) => { return axios.get(base2 + `/rcyhXxrw/getJlgcMx2ByHtAndYd` + urlpart).then(res => res) }
export const rcyhXxrwgetWxsgzpjlByHtAndYd = (urlpart) => { return axios.get(base2 + `/rcyhXxrw/getWxsgzpjlByHtAndYd` + urlpart).then(res => res) }

// 单价审核表控制器
export const delDjshForGcys = (urlpart) => { return axios.delete(base4 + `/zxyh/gcysjung/delDjshForGcys` + urlpart).then(res => res) }
export const getDjshList = (urlpart) => { return axios.get(base4 + `/zxyh/gcysjung/getDjshList` + urlpart).then(res => res) }
export const getHtDjshInfoByBm = (urlpart) => { return axios.get(base4 + `/zxyh/gcysjung/getHtDjshInfoByBm` + urlpart).then(res => res) }
export const getHtInfoByZmh = (urlpart) => { return axios.get(base4 + `/zxyh/gcysjung/getHtInfoByZmh` + urlpart).then(res => res) }
export const addDjshForGcys = (urlpart) => { return axios.post(base4 + `/zxyh/gcysjung/addDjshForGcys`, urlpart).then(res => res) }
export const editDjshForGcys = (urlpart) => { return axios.put(base4 + `/zxyh/gcysjung/editDjshForGcys`, urlpart).then(res => res) }
export const spDjshForGcys = (urlpart) => { return axios.put(base4 + `/zxyh/gcysjung/spDjshForGcys` + urlpart).then(res => res) }

// 索赔申请书
export const delSpsqsForBggl = (urlpart) => { return axios.delete(base4 + `/zxyh/bgglspsq/delSpsqsForBggl` + urlpart).then(res => res) }
// export const bgglspsqgetSpsqdList = (urlpart) => { return axios.get(base4 + `/zxyh/bgglspsq/getSpsqdList`,{params:urlpart}).then(res => res) }
export const bgglspsqgetSpsqdList = (urlpart) => { return axios.get(base4 + `/zxyh/bgglspsq/getSpsqdList` + urlpart).then(res => res) }
export const addSpsqsForBggl = (urlpart) => { return axios.post(base4 + `/zxyh/bgglspsq/addSpsqsForBggl`, urlpart).then(res => res) }
export const editSpsqsForBggl = (urlpart) => { return axios.put(base4 + `/zxyh/bgglspsq/editSpsqsForBggl`, urlpart).then(res => res) }
export const spSpsqsForBggl = (urlpart) => { return axios.put(base4 + `/zxyh/bgglspsq/spSpsqsForBggl` + urlpart).then(res => res) }

// 专项养护承包人遗留问题
export const delCbrylwtForGcys = (urlpart) => { return axios.delete(base4 + `/zxyh/gcyscbr/delCbrylwtForGcys` + urlpart).then(res => res) }
export const getCbrylwtList = (urlpart) => { return axios.get(base4 + `/zxyh/gcyscbr/getCbrylwtList` ,{params:urlpart}).then(res => res) }
export const addCbrylwtForGcys = (urlpart) => { return axios.post(base4 + `/zxyh/gcyscbr/addCbrylwtForGcys`, urlpart).then(res => res) }// 添加
export const editCbrylwtForGcys = (urlpart) => { return axios.put(base4 + `/zxyh/gcyscbr/editCbrylwtForGcys`, urlpart).then(res => res) }
export const spCbrylwtForGcys = (urlpart) => { return axios.put(base4 + `/zxyh/gcyscbr/spCbrylwtForGcys` + urlpart).then(res => res) }

export const getCbrylwtInfoByDjbh = (urlpart) => { return axios.get(base4 + `/zxyh/gcyscbr/getCbrylwtInfoByDjbh`,{params:urlpart}).then(res => res) }// 添加子表内容


// 工程验收罚金一览表   /zxyh/fjylb/getFjylbList
export const getGcysFjylbList = (urlpart) => { return axios.get(base4 + `/zxyh/fjylb/getFjylbList` ,{params:urlpart}).then(res => res) }

// 专项养护工程验收申请单 base4
export const delGcyssqdForGcys = (urlpart) => { return axios.delete(base4 + `/zxyh/gcyssqd/delGcyssqdForGcys` + urlpart).then(res => res) }
export const getGcyssqdList = (urlpart) => { return axios.get(base4 + `/zxyh/gcyssqd/getGcyssqdList`,{params:urlpart}).then(res => res) }
export const addGcyssqdForGcys = (urlpart) => { return axios.post(base4 + `/zxyh/gcyssqd/addGcyssqdForGcys`, urlpart).then(res => res) }// 添加
export const editGcyssqdForGcys = (urlpart) => { return axios.put(base4 + `/zxyh/gcyssqd/editGcyssqdForGcys`, urlpart).then(res => res) }// 编辑
export const spGcyssqdForGcys = (urlpart) => { return axios.put(base4 + `/zxyh/gcyssqd/spGcyssqdForGcys` + urlpart).then(res => res) }

//专项养护 交工结算   startBaseUrl_LIRui
export const delJiaogForGcys = (urlpart) => { return axios.delete(base4 + `/zxyh/gcysjiaog/delJiaogForGcys` + urlpart).then(res => res) }
export const getJiaogList = (urlpart) => { return axios.get(base4 + `/zxyh/gcysjiaog/getJiaogList` ,{params:urlpart}).then(res => res) }// 查询
export const getHtJiaogInfoByBm = (urlpart) => { return axios.get(base4 + `/zxyh/gcysjiaog/getHtJiaogInfoByBm` + urlpart).then(res => res) }
export const addJiaogForGcys = (urlpart) => { return axios.post(base4 + `/zxyh/gcysjiaog/addJiaogForGcys`, urlpart).then(res => res) }// 添加
export const editJiaogForGcys = (urlpart) => { return axios.put(base4 + `/zxyh/gcysjiaog/editJiaogForGcys`, urlpart).then(res => res) }
export const spJiaogForGcys = (urlpart) => { return axios.put(base4 + `/zxyh/gcysjiaog/spJiaogForGcys` + urlpart).then(res => res) }

export const getLastQcZqcwzfzsByXmbh = (urlpart) => { return axios.get(base4 + `/zxyhGczf/getLastQcZqcwzfzsByXmbh` , {params:urlpart}).then(res => res) }// 回显子目


// 专项养护竣工结算
export const delJungForGcys = (urlpart) => { return axios.delete(base4 + `/zxyh/gcysjung/delJungForGcys` + urlpart).then(res => res) }
export const getJungList = (urlpart) => { return axios.get(base4 + `/zxyh/gcysjung/getJungList` ,{params:urlpart}).then(res => res) }
export const getHtJungInfoByBm = (urlpart) => { return axios.get(base4 + `/zxyh/gcysjung/getHtJungInfoByBm` + urlpart).then(res => res) }
export const addJungForGcys = (urlpart) => { return axios.post(base4 + `/zxyh/gcysjung/addJungForGcys`, urlpart).then(res => res) }//  添加
export const editJungForGcys = (urlpart) => { return axios.put(base4 + `/zxyh/gcysjung/editJungForGcys`, urlpart).then(res => res) }
export const spJungForGcys = (urlpart) => { return axios.put(base4 + `/zxyh/gcysjung/spJungForGcys` + urlpart).then(res => res) }

// 专项养护工程计量单/zxyhGczf/getGcjldList
export const delGcjldForGczf = (urlpart) => { return axios.delete(base4 + `/zxyhGczf/deleteGcjld` + urlpart).then(res => res) } // 删除
export const gczfgetGcjldList = (urlpart) => { return axios.get(base4 + `/zxyhGczf/getGcjldList` ,{params:urlpart}).then(res => res) } // 查询
export const gczfgetHtXxInfoByBm = (urlpart) => { return axios.get(base4 + `/zxyh/gczf/getHtXxInfoByBm` + urlpart).then(res => res) }
export const addGcjldForGczf = (urlpart) => { return axios.post(base4 + `/zxyhGczf/insertGcjld`, urlpart).then(res => res) } //  添加
export const editGcjldForGczf = (urlpart) => { return axios.put(base4 + `/zxyhGczf/updateGcjld`, urlpart).then(res => res) } //编辑
export const spGcjldForGczf = (urlpart) => { return axios.get(base4 + `/zxyhGczf/updateGcjldSpzt` + urlpart).then(res => res) } //  状态
export const getYbgcToInsertGcjld = (urlpart) => { return axios.get(base4 + `/zxyhGczf/getYbgcToInsertGcjld`,{params:urlpart}).then(res => res) } // 添加隐蔽工程列表
export const getYbgcMxByYbgcIds = (urlpart) => { return axios.get(base4 + `/zxyhGczf/getYbgcMxByYbgcIds`,{params:urlpart}).then(res => res) } // 添加隐蔽工程id




// 专项养护中期财务支付证书   editZqcwzfForGczf editZqcwzfForGczf
export const delZqcwzfForGczf = (urlpart) => { return axios.delete(base4 + `/zxyhGczf/deleteZqcwzfzs` + urlpart).then(res => res) } // 删除
export const gczfgetZqcwzfList = (urlpart) => { return axios.get(base4 + `/zxyhGczf/getZqcwzfzsList`,{params:urlpart}).then(res => res) } // 查询
export const gczfgetHtCwInfoByBm = (urlpart) => { return axios.get(base4 + `/zxyh/gczf/getHtCwInfoByBm` + urlpart).then(res => res) }
export const getJgjssByHtbh = (urlpart) => { return axios.get(base4 + `/rcyhGcjlV2/getJgjssByHtbh`,{params:urlpart}).then(res => res) }
export const addZqcwzfForGczf = (urlpart) => { return axios.post(base4 + `/zxyhGczf/insertZqcwzfzs`, urlpart).then(res => res) } //  添加
export const editZqcwzfForGczf = (urlpart) => { return axios.put(base4 + `/zxyhGczf/updateZqcwzfzs`, urlpart).then(res => res) }//  编辑
export const updateZqcwzfzsZt = (urlpart) => { return axios.get(base4 + `/zxyhGczf/updateZqcwzfzsZt` + urlpart).then(res => res) }//  状态

export const getGcjldToInsertZqcwzfzs = (urlpart) => { return axios.get(base4 + `/zxyhGczf/getGcjldToInsertZqcwzfzs` + urlpart).then(res => res) }
export const getGcjlMxByGcjlIds = (urlpart) => { return axios.get(base4 + `/zxyhGczf/getGcjlMxByGcjlIds` + urlpart).then(res => res) }

// 专项工程转固接口
export const addAggvo = (param) => { return axios.post(base4 + `/zxyh/aggvo/addAggvo`, param).then( res => res.data) } // 工程转固添加
export const getAggvo = (param) => { return axios.get(base4 + `/zxyh/aggvo/getAggvo`, {params: param}).then( res => res.data) } // 工程转固查询
export const updateAggvozt = (param) => { return axios.get(base4 + `/zxyh/aggvo/updateAggvozt`, {params: param}).then( res => res.data) } // 根据工程转固id修改表单状态
export const getAggvomxByMid = (param) => { return axios.get(base4 + `/zxyh/aggvo/getAggvomxByMid`, {params: param}).then( res => res.data) } // 根据工程转固id修改表单状态
export const updateAggvo = (param) => { return axios.put(base4 + `/zxyh/aggvo/updateAggvo`, param).then( res => res.data) } // 根据工程转固id修改表单状态
export const delYjqxgcByIds = (param) => { return axios.delete(base4 + `/zxyh/aggvo/updateAggvo`, {params: param}).then( res => res.data) } // 根据工程转固id修改表单状态
export const deleteAggvo111 = (param) => { return axios.delete(base4 + `/zxyh/aggvo/deleteAggvo111`, {params: param}).then( res => res.data) } // 根据工程转固id修改表单状态


// 进场准备情况
export const jczbdeleteJczbqkb = (urlpart) => { return axios.delete(base4 + `/zxyh/lyjc/deleteJczb` + urlpart).then(res => res) }
export const jczbgetJczbqkb = (urlpart) => { return axios.get(base4 + `/zxyh/lyjc/getJczbAll` + urlpart).then(res => res) }
export const jczbaddJczbqkb = (urlpart) => { return axios.post(base4 + `/zxyh/lyjc/addJczb`, urlpart).then(res => res) }
export const jczbupdateJczbqkb = (urlpart) => { return axios.put(base4 + `/zxyh/lyjc/updateJczb`, urlpart).then(res => res) }

// 开工申请
export const kgsqddeleteKgsqd = (urlpart) => { return axios.delete(base4 + `/kgsqd/deleteKgsqd` + urlpart).then(res => res) }
export const kgsqdgetAllKgsqd = (urlpart) => { return axios.get(base4 + `/kgsqd/getAll` + urlpart).then(res => res) }
export const kgsqdaddKgsqd = (urlpart) => { return axios.post(base4 + `/kgsqd/addKgsqd`, urlpart).then(res => res) }
export const kgsqdupdateKgsqd = (urlpart) => { return axios.put(base4 + `/kgsqd/updateKgsqd`, urlpart).then(res => res) }

// 履约检查
/*export const lyjcdeleteLyjc = (urlpart) => { return axios.delete(base4 + `/zxyh/lyjc/deleteLyjc` + urlpart).then(res => res) }
export const lyjcgetLyjc = (urlpart) => { return axios.get(base4 + `/zxyh/lyjc/getLyjcAll` + urlpart).then(res => res) }//
export const getLyjcbmxByMid = (urlpart) => { return axios.get(base4 + `/zxyh/lyjc/getLyjcbmxByMid` + urlpart).then(res => res) }//
export const lyjcaddLyjc = (urlpart) => { return axios.post(base4 + `/zxyh/lyjc/addLyjc`, urlpart).then(res => res) }
export const lyjcupdateLyjc = (urlpart) => { return axios.put(base4 + `/zxyh/lyjc/updateLyjc`, urlpart).then(res => res) }*/

// 施工总进度计划
export const sgzjdjhdeleteSgzjdjh = (urlpart) => { return axios.delete(base4 + `/sgzjdjh/deleteSgzjdjh` + urlpart).then(res => res) }
export const sgzjdjhgetSgzjdjh = (urlpart) => { return axios.get(base4 + `/sgzjdjh/getSgzjdjh`,{params: urlpart}).then(res => res) }
export const sgzjdjhaddSgzjdjh = (urlpart) => { return axios.post(base4 + `/sgzjdjh/addSgzjdjh`, urlpart).then(res => res) }
export const sgzjdjhupdateSgzjdjh = (urlpart) => { return axios.put(base4 + `/sgzjdjh/updateSgzjdjh`, urlpart).then(res => res) }
export const sgzjdjhspSgzjdjh = (urlpart) => { return axios.put(base4 + `/sgzjdjh/spSgzjdjh` + urlpart).then(res => res) }

// 月度计划
export const ydjhdeleteYdjh = (urlpart) => { return axios.delete(base4 + `/ydjh/deleteYdjh` + urlpart).then(res => res) }
export const ydjhgetYdjh = (urlpart) => { return axios.get(base4 + `/ydjh/getYdjh`,{params: urlpart}).then(res => res) }
export const ydjhgetZjdHtInfo = (urlpart) => { return axios.get(base4 + `/ydjh/getZjdHtInfo` + urlpart).then(res => res) } // 获取已下发总进度合同信息
export const ydjhgetZjdHtCzfs = (urlpart) => { return axios.get(base4 + `/ydjh/getZjdHtCzfs` + urlpart).then(res => res) } // 获取总进度处置方式
export const ydjhaddYdjh = (urlpart) => { return axios.post(base4 + `/ydjh/addYdjh`, urlpart).then(res => res) }
export const ydjhupdateYdjh = (urlpart) => { return axios.put(base4 + `/ydjh/updateYdjh`, urlpart).then(res => res) }
export const ydjhspYdjh = (urlpart) => { return axios.put(base4 + `/ydjh/spYdjh` + urlpart).then(res => res) }
//月度计划单独区域

// export const ydjhspYdjh2 = (urlpart) => { return axios.get(base2 + `/sgjh/getSgjhAll`,{params:urlpart}).then(res => res) }
export const getWcSgjhAll2 = (urlpart) => { return axios.get(base2 + `/sgjh/getWcSgjhAll`,{params:urlpart}).then(res => res) }




// 月度完成
export const ydwcdeleteYdwc = (urlpart) => { return axios.delete(base4 + `/ydwc/deleteYdwc` + urlpart).then(res => res) }
export const ydwcgetYdwc = (urlpart) => { return axios.get(base4 + `/ydwc/getYdwc`,{params: urlpart}).then(res => res) }
export const ydwcgetYdjhHtInfo = (urlpart) => { return axios.get(base4 + `/ydwc/getYdjhHtInfo` + urlpart).then(res => res) }
export const ydwcgetZbInfoByHtAndYd = (urlpart) => { return axios.get(base4 + `/ydwc/getZbInfoByHtAndYd` + urlpart).then(res => res) }
export const ydwcaddYdwc = (urlpart) => { return axios.post(base4 + `/ydwc/addYdwc`, urlpart).then(res => res) }
export const ydwcupdateYdwc = (urlpart) => { return axios.put(base4 + `/ydwc/updateYdwc`, urlpart).then(res => res) }
export const ydwcspYdwc = (urlpart) => { return axios.put(base4 + `/ydwc/spYdwc` + urlpart).then(res => res) }

// 隐蔽工程
export const ybgcdeleteYbgc = (urlpart) => { return axios.delete(base4 + `/ybgc/deleteYbgc` + urlpart).then(res => res) }
export const ybgcgetYbgc = (urlpart) => { return axios.get(base4 + `/ybgc/getYbgc`, {params: urlpart}).then(res => res) }
export const ybgcaddYbgc = (urlpart) => { return axios.post(base4 + `/ybgc/addYbgc`, urlpart).then(res => res) }
export const ybgcupdateYbgc = (urlpart) => { return axios.put(base4 + `/ybgc/updateYbgc`, urlpart).then(res => res) }
export const ybgcspYbgc = (urlpart) => { return axios.put(base4 + `/ybgc/spYbgc` + urlpart).then(res => res) }
// 获取供应商的项目列表
export const getXmListBySpk = () => {
  return axios.get(base2 + `/Gcxmgk/getXxBySgdw`, {params: {cbdwid: config.userInfo.supplierpk}}).then(res => res.data) }

// 工程现场检查
export const gcxcjcdeleteGcxczljc = (urlpart) => { return axios.delete(base4 + `/gcxcjc/deleteGcxczljc` + urlpart).then(res => res) }
export const gcxcjcgetGcxczljc = (urlpart) => { return axios.get(base4 + `/gcxcjc/getGcxczljc`, {params: urlpart}).then(res => res) }
export const gcxcjcaddGcxczljc = (urlpart) => { return axios.post(base4 + `/gcxcjc/addGcxczljc`, urlpart).then(res => res) }
export const gcxcjcupdateGcxczljc = (urlpart) => { return axios.put(base4 + `/gcxcjc/updateGcxczljc`, urlpart).then(res => res) }
export const gcxcjcspGcxczljc = (urlpart) => { return axios.put(base4 + `/gcxcjc/spGcxczljc` + urlpart).then(res => res) }
// 外企整改项目
export const gcxcjcgetZgOfGcxczljc = (urlpart) => { return axios.get(base4 + `/gcxcjc/insertZgOfGcxczljc` + urlpart).then(res => res) }
// 工程部复查项目
export const gcxcjcgetFcOfGcxczljc = (urlpart) => { return axios.get(base4 + `/gcxcjc/insertFcOfGcxczljc` + urlpart).then(res => res) }


// 机电维护
export const spWxfkSpzt = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/spWxfkSpzt`+ urlpart).then(res => res) }
export const pzLysqSpzt = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/pzLysqSpzt`+ urlpart).then(res => res) }
export const spWxfyByDjbh = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/spWxfyByDjbh`+ urlpart).then(res => res) }

// 故障报修
export const jdwhxjwxdelGzbxByDjbhs = (urlpart) => { return axios.delete(base5 + `/jdwh/xjwx/delGzbxByDjbhs` + urlpart).then(res => res) }
export const jdwhxjwxgetGzbxList = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/getGzbxList` + urlpart).then(res => res) }
export const jdwhxjwxgetSbInfo = () => { return axios.get(base5 + `/jdwh/xjwx/getSbInfo`).then(res => res) }
export const jdwhxjwxaddGzbx = (urlpart) => { return axios.post(base5 + `/jdwh/xjwx/addGzbx`, urlpart).then(res => res) }
export const jdwhxjwxeditGzbx = (urlpart) => { return axios.put(base5 + `/jdwh/xjwx/editGzbx`, urlpart).then(res => res) }

// 领用申请
export const jdwhbjgldelLysqBydjbhs = (urlpart) => { return axios.delete(base5 + `/jdwh/bjgl/delLysqBydjbhs` + urlpart).then(res => res) }
export const jdwhbjglgetLysqList = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getLysqList` + urlpart).then(res => res) }
export const jdwhbjglgetBjLyInfo = () => { return axios.get(base5 + `/jdwh/bjgl/getBjLyInfo`).then(res => res) }
export const jdwhbjgladdLysq = (urlpart) => { return axios.post(base5 + `/jdwh/bjgl/addLysq`, urlpart).then(res => res) }
export const jdwhbjgleditLysq = (urlpart) => { return axios.put(base5 + `/jdwh/bjgl/editLysq`, urlpart).then(res => res) }
export const getLysqInfoByDjbh = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getLysqInfoByDjbh`+urlpart).then(res => res) }
export const getLysqInfoByGZDjbh = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getLysqInfoByGZDjbh`+urlpart).then(res => res) }
export const ghLysq = (urlpart) => { return axios.put(base5 + `/jdwh/bjgl/ghLysq`+urlpart).then(res => res) }
export const ghBjck = (urlpart) => { return axios.put(base5 + `/jdwh/bjgl/ghBjck`+urlpart).then(res => res) }


export const tyLysq = (urlpart) => { return axios.put(base5 + `/jdwh/bjgl/tyLysq`+urlpart).then(res => res) }
export const pzLysq = (urlpart) => { return axios.put(base5 + `/jdwh/bjgl/pzLysq`+ urlpart).then(res => res) }
// 日常巡检
export const jdwhxjwxdelRcxjByIds = (urlpart) => { return axios.delete(base5 + `/jdwh/xjwx/delRcxjByIds` + urlpart).then(res => res) }
export const jdwhxjwxgetRcxjList = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/getRcxjList` + urlpart).then(res => res) }
export const jdwhxjwxgetXjType = (urlpart) => { return axios.get(base3 + `/common/getMjxx`+ urlpart).then(res => res.data) }
export const jdwhxjwxgetXjType2 = (urlpart) => { return axios.get(base3 + `/common/getMjxx`,{params:urlpart} ).then(res => res.data) }
export const jdwhxjwxgetXjMx = (urlpart) => {return axios.post(base5 + `/jdwh/xjwx/getXjType` ,urlpart).then(res => res) }
export const jdwhxjwxaddRcxj = (urlpart) => { return axios.post(base5 + `/jdwh/xjwx/addRcxj`, urlpart).then(res => res) }
export const jdwhxjwxeditRcxj = (urlpart) => { return axios.put(base5 + `/jdwh/xjwx/editRcxj`, urlpart).then(res => res) }
export const editRcxjZtByIds = (urlpart) => { return axios.put(base5 + `/jdwh/xjwx/editRcxjZtByIds`+ urlpart).then(res => res) }

// 维修登记
export const jdwhxjwxdelWxdjByDjbhs = (urlpart) => { return axios.delete(base5 + `/jdwh/xjwx/delWxdjByDjbhs` + urlpart).then(res => res) }
export const jdwhxjwxgetWxdjList = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/getWxdjList` + urlpart).then(res => res) }
export const jdwhxjwxgetBxdInfo = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/getBxdInfo` + urlpart).then(res => res) }
export const jdwhxjwxgetInfoByIDjbh = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/getWxdjInfoByWxdh` + urlpart).then(res => res) }
export const jdwhxjwxaddWxdj = (urlpart) => { return axios.post(base5 + `/jdwh/xjwx/addWxdj`, urlpart).then(res => res) }
export const jdwhxjwxeditWxdj = (urlpart) => { return axios.put(base5 + `/jdwh/xjwx/editWxdj`, urlpart).then(res => res) }

export const getWxdjInfoByIDjbh = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/getWxdjInfoByIDjbh` + urlpart).then(res => res) }

// 任务派发
export const jdwhxjwxgetDfprwdList = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/getDfprwdList` + urlpart).then(res => res) }
export const jdwhxjwxgetWxrwdList = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/getWxrwdList` + urlpart).then(res => res) }
export const jdwhxjwxgetWxzrrInfo = () => { return axios.get(base5 + `/jdwh/xjwx/getWxzrrInfo`).then(res => res) }
export const jdwhxjwxfpWxrwd = (urlpart) => { return axios.put(base5 + `/jdwh/xjwx/fpWxrwd` + urlpart).then(res => res) }
export const jdwhxjwxhtfpzt = (urlpart) => { return axios.put(base5 + `/jdwh/xjwx/czfpWxrwd` + urlpart).then(res => res) }
export const tyRwpf = (urlpart) => { return axios.put(base5 + `/jdwh/xjwx/tyRwpf` + urlpart).then(res => res) }
export const spRwpf = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/spRwpf` + urlpart).then(res => res) }
// 维修验收
export const jdwhxjwxdelWxysByDjbhs = (urlpart) => { return axios.delete(base5 + `/jdwh/xjwx/delWxysByDjbhs` + urlpart).then(res => res) }
export const jdwhxjwxgetWxysList = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/getWxysList` + urlpart).then(res => res) }
export const jdwhxjwxgetDjBxdInfo = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/getDjBxdInfo` + urlpart).then(res => res) }
export const jdwhxjwxaddWxys = (urlpart) => { return axios.post(base5 + `/jdwh/xjwx/addWxys`, urlpart).then(res => res) }
export const jdwhxjwxeditWxys = (urlpart) => { return axios.put(base5 + `/jdwh/xjwx/editWxys`, urlpart).then(res => res) }
export const jdwhxjwxspWxysByDjbh = (urlpart) => { return axios.put(base5 + `/jdwh/xjwx/spWxysByDjbh` + urlpart).then(res => res) }

// 维修费用
export const jdwhxjwxdelWxfyByDjbhs = (urlpart) => { return axios.delete(base5 + `/jdwh/xjwx/delWxfyByDjbhs` + urlpart).then(res => res) }
export const jdwhxjwxgetWxfyList = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/getWxfyList` + urlpart).then(res => res) }
export const jdwhxjwxgetDfdwInfo = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/getDfdwInfo` + urlpart).then(res => res) }
export const jdwhxjwxgetWxsbInfo = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/getWxsbInfo` + urlpart).then(res => res) }
export const jdwhxjwxaddWxfy = (urlpart) => { return axios.post(base5 + `/jdwh/xjwx/addWxfy`, urlpart).then(res => res) }
export const jdwhxjwxeditWxfy = (urlpart) => { return axios.put(base5 + `/jdwh/xjwx/editWxfy`, urlpart).then(res => res) }
// export const jdwhxjwxspWxfyByDjbh = (urlpart) => { return axios.put(base5 + `/jdwh/xjwx/spWxfyByDjbh` + urlpart).then(res => res) }
export const getWxfyInfoByIWxdh = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/getWxfyInfoByIWxdh` + urlpart).then(res => res) }


// 付款申请
export const jdwhxjwxdelWxfkByDjbhs = (urlpart) => { return axios.delete(base5 + `/jdwh/xjwx/delWxfkByDjbhs` + urlpart).then(res => res) }
export const jdwhxjwxgetWxfkList = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/getWxfkList` + urlpart).then(res => res) }
export const jdwhxjwxgetWxfyChooseList = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/getWxfyChooseList` + urlpart).then(res => res) }
export const jdwhxjwxgetFpInfo = () => { return axios.get(base5 + `/jdwh/xjwx/getFpInfo`).then(res => res) }
export const jdwhxjwxaddWxfk = (urlpart) => { return axios.post(base5 + `/jdwh/xjwx/addWxfk`, urlpart).then(res => res) }
export const getLjjsAndLjzfByHtbh = (urlpart) => { return axios.get(base5 + `/jdwh/xjwx/getLjjsAndLjzfByHtbh`+urlpart).then(res => res) }
export const jdwhxjwxeditWxfk = (urlpart) => { return axios.put(base5 + `/jdwh/xjwx/editWxfk`, urlpart).then(res => res) }
export const getHtxxAll = () => { return axios.get(base3 + `/common/getHtxxAll`).then(res => res) }
// 验收入库
export const jdwhbjgldelYsrkBydjbhs = (urlpart) => { return axios.delete(base5 + `/jdwh/bjgl/delYsrkBydjbhs` + urlpart).then(res => res) }
export const jdwhbjglgetYsrkList = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getYsrkList` + urlpart).then(res => res) }
export const jdwhbjglgetCkInfo = () => { return axios.get(base5 + `/jdwh/bjgl/getCkInfo`).then(res => res) }
export const jdwhbjglgetHtBjInfo = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getHtBjInfo` + urlpart).then(res => res) }
export const jdwhbjglgetWxBjInfo = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getWxBjInfo` + urlpart).then(res => res) }
export const jdwhbjglgetWxdhInfo = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getWxdhInfo` + urlpart).then(res => res) }
export const jdwhbjgladdYsrk = (urlpart) => { return axios.post(base5 + `/jdwh/bjgl/addYsrk`, urlpart).then(res => res) }
export const jdwhbjgleditYsrk = (urlpart) => { return axios.put(base5 + `/jdwh/bjgl/editYsrk`, urlpart).then(res => res) }

// 备件出库
export const jdwhbjgldelBjckBydjbhs = (urlpart) => { return axios.delete(base5 + `/jdwh/bjgl/delBjckBydjbhs` + urlpart).then(res => res) }
export const jdwhbjglgetBjckList = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getBjckList` + urlpart).then(res => res) }
export const jdwhbjglgetBjInfoByLySqd = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getBjInfoByLySqd` + urlpart).then(res => res) }
export const jdwhbjglgetBjLySqdInfo = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getBjLySqdInfo` + urlpart).then(res => res) }
export const jdwhbjgladdBjck = (urlpart) => { return axios.post(base5 + `/jdwh/bjgl/addBjck`, urlpart).then(res => res) }
export const jdwhbjgleditBjck = (urlpart) => { return axios.put(base5 + `/jdwh/bjgl/editBjck`, urlpart).then(res => res) }
export const ckBjck = (urlpart) => { return axios.put(base5 + `/jdwh/bjgl/ckBjck`, urlpart).then(res => res) }

// 废件入库
export const jdwhbjgldelFjrkBydjbhs = (urlpart) => { return axios.delete(base5 + `/jdwh/bjgl/delFjrkBydjbhs` + urlpart).then(res => res) }
export const jdwhbjglgetFjrkList = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getFjrkList` + urlpart).then(res => res) }
export const jdwhbjglgetWxdhInfByDw = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getWxdhInfByDw` + urlpart).then(res => res) }
export const jdwhbjgladdFjrk = (urlpart) => { return axios.post(base5 + `/jdwh/bjgl/addFjrk`, urlpart).then(res => res) }
export const jdwhbjgleditFjrk = (urlpart) => { return axios.put(base5 + `/jdwh/bjgl/editFjrk`, urlpart).then(res => res) }
export const getFjrkInfoByWxdh = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getFjrkInfoByWxdh` + urlpart).then(res => res) }


// 废件维修
export const jdwhbjgldelFjwxBydjbhs = (urlpart) => { return axios.delete(base5 + `/jdwh/bjgl/delFjwxBydjbhs` + urlpart).then(res => res) }
export const jdwhbjglgetFjwxList = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getFjwxList` + urlpart).then(res => res) }
export const jdwhbjglgetShbjInfByDw = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getShbjInfByDw`+urlpart).then(res => res) }
export const jdwhbjgladdFjwx = (urlpart) => { return axios.post(base5 + `/jdwh/bjgl/addFjwx`, urlpart).then(res => res) }
export const jdwhbjgleditFjwx = (urlpart) => { return axios.put(base5 + `/jdwh/bjgl/editFjwx`, urlpart).then(res => res) }
export const getShFjList = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getShFjList`+urlpart).then(res => res) }
export const tjFjwx = (urlpart) => { return axios.put(base5 + `/jdwh/bjgl/tjFjwx`+urlpart).then(res => res) }



// 维修结算
export const jdwhbjgldelFjwxjsByids = (urlpart) => { return axios.delete(base5 + `/jdwh/bjgl/delFjwxjsByids` + urlpart).then(res => res) }
export const jdwhbjglgetFjwxjsList = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getFjwxjsList` + urlpart).then(res => res) }
export const jdwhbjglgetFjwxdInfByDw = () => { return axios.get(base5 + `/jdwh/bjgl/getFjwxdInfByDw`).then(res => res) }
export const jdwhbjglgetFjwxdBjInfByDw = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getFjwxdBjInfByDw` + urlpart).then(res => res) }
export const jdwhbjgladdFjwxjs = (urlpart) => { return axios.post(base5 + `/jdwh/bjgl/addFjwxjs`, urlpart).then(res => res) }
export const jdwhbjgleditFjwxjs = (urlpart) => { return axios.put(base5 + `/jdwh/bjgl/editFjwxjs`, urlpart).then(res => res) }

// 废件处置
export const jdwhbjgldelFjczByDjbhs = (urlpart) => { return axios.delete(base5 + `/jdwh/bjgl/delFjczByDjbhs` + urlpart).then(res => res) }
export const jdwhbjglgetFjczList = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getFjczList` + urlpart).then(res => res) }
export const jdwhbjgladdFjcz = (urlpart) => { return axios.post(base5 + `/jdwh/bjgl/addFjcz`, urlpart).then(res => res) }
export const jdwhbjgleditFjcz = (urlpart) => { return axios.put(base5 + `/jdwh/bjgl/editFjcz`, urlpart).then(res => res) }
export const spFjczByDjbh = (urlpart) => { return axios.put(base5 + `/jdwh/bjgl/spFjczByDjbh`, urlpart).then(res => res) }
export const tjFjcz = (urlpart) => { return axios.put(base5 + `/jdwh/bjgl/tjFjcz`+urlpart).then(res => res) }


// 库存管理
export const jdwhckglgetBjAll = (urlpart) => { return axios.get(base5 + `/jdwh/kcgl/getCkBjAll` + urlpart).then(res => res) }
export const jdwhckglgetBjAllByCkmc = (urlpart) => { return axios.get(base5 + `/jdwh/kcgl/getCkBjAllByCkmc` + urlpart).then(res => res) }
export const jdwhckglgetCkAll = () => { return axios.get(base5 + `/jdwh/kcgl/getCkAll`).then(res => res) }
export const jdwhckgldbBj = (urlpart) => { return axios.post(base5 + `/jdwh/kcgl/dbBj`,urlpart).then(res => res) }
export const getDbInfoList = (urlpart) => { return axios.get(base5 + `/jdwh/kcgl/getDbInfoList` + urlpart).then(res => res) }
export const getKcslByBjInfo = (urlpart) => { return axios.get(base5 + `/jdwh/bjgl/getKcslByBjInfo` + urlpart).then(res => res) }

//盘点
export const addPdjl = (urlpart) => { return axios.post(base5 + `/jdwh/kcgl/addPdjl`,urlpart).then(res => res) }
export const editPdjl = (urlpart) => { return axios.post(base5 + `/jdwh/kcgl/editPdjl`,urlpart).then(res => res) }
export const getPdjlInfoList = (urlpart) => { return axios.get(base5 + `/jdwh/kcgl/getPdjlInfoList`+urlpart).then(res => res) }
export const delPdjlByIds = (urlpart) => { return axios.delete(base5 + `/jdwh/kcgl/delPdjlByIds` + urlpart).then(res => res) }

// 仓库管理
export const getCkInfoList = (urlpart) => { return axios.get(base5 + `/jdwh/kcgl/getCkInfoList` + urlpart).then(res => res) }
export const addCk = (urlpart) => { return axios.post(base5 + `/jdwh/kcgl/addCk`,urlpart).then(res => res) }
export const editCk = (urlpart) => { return axios.post(base5 + `/jdwh/kcgl/editCk`,urlpart).then(res => res) }
export const delCkByIds = (urlpart) => { return axios.delete(base5 + `/jdwh/kcgl/delCkByIds` + urlpart).then(res => res) }

//千米路段版本管理
export const getQmldbh = () => { return axios.get(base + `/lkpd/cx/getQmldbh`).then(res => res) }
export const addQmldList = (urlpart) => { return axios.post(base + `/lkpd/cx/addQmldList`,urlpart).then(res => res) }
export const getQmldListType = (urlpart) => { return axios.get(base + `/lkpd/cx/getQmldBbType`+urlpart).then(res => res) }
export const editQmldList = (urlpart) => { return axios.put(base + `/lkpd/cx/editQmldList`, urlpart).then(res => res) }
export const delQmldByIds = (urlpart) => { return axios.delete(base + `/lkpd/cx/delQmldByIds` + urlpart).then(res => res) }
export const getSjlyForBbid = (urlpart) => { return axios.get(base + `/lkpd/cx/getSjlyForBbid`+urlpart).then(res => res) }

//千米路段明细
export const getQmldmxList = (urlpart) => { return axios.get(base + `/lkpd/cx/getQmldmxList`+urlpart).then(res => res) }

// pci 模板下载
export const getPciList = (urlpart) => { return axios.get(base + `/lkpd/mbdr/getPciList`+urlpart,{responseType: 'blob'}).then(res => res) }
// rqi 模板下载
export const getRqiList = (urlpart) => { return axios.get(base + `/lkpd/mbdr/getRqiList`+urlpart,{responseType: 'blob'}).then(res => res) }
// rdi 模板下载
export const getRdiList = (urlpart) => { return axios.get(base + `/lkpd/mbdr/getRdiList`+urlpart,{responseType: 'blob'}).then(res => res) }
// sri 模板下载
export const getSriList = (urlpart) => { return axios.get(base + `/lkpd/mbdr/getSriList`+urlpart,{responseType: 'blob'}).then(res => res) }
// sci 模板下载
export const getSciList = (urlpart) => { return axios.get(base + `/lkpd/mbdr/getSciList`+urlpart,{responseType: 'blob'}).then(res => res) }
export const getPssiList = (urlpart) => { return axios.get(base + `/lkpd/mbdr/getPssiList`+urlpart,{responseType: 'blob'}).then(res => res) }
// bci 模板下载
export const getBciList = (urlpart) => { return axios.get(base + `/lkpd/mbdr/getBciList`+urlpart,{responseType: 'blob'}).then(res => res) }
// tci 模板下载
export const getTciList = (urlpart) => { return axios.get(base + `/lkpd/mbdr/getTciList`+urlpart,{responseType: 'blob'}).then(res => res) }
// pbi 模板下载
export const getPbiList = (urlpart) => { return axios.get(base + `/lkpd/mbdr/getPbiList`+urlpart,{responseType: 'blob'}).then(res => res) }
// pwi 模板下载
export const getPwiList = (urlpart) => { return axios.get(base + `/lkpd/mbdr/getPwiList`+urlpart,{responseType: 'blob'}).then(res => res) }
//模板下载
// export const getPcidcList = () => { return axios.get(base + `/lkpd/dcmb/getPcidcList`).then(res => res) }
// export const getPbidcList = () => { return axios.get(base + `/lkpd/dcmb/getPbidcList`).then(res => res) }
// export const getPssidcList = () => { return axios.get(base + `/lkpd/dcmb/getPssidcList`).then(res => res) }
// export const getPwidcList = () => { return axios.get(base + `/lkpd/dcmb/getPwidcList`).then(res => res) }
// export const getBcidcList = () => { return axios.get(base + `/lkpd/dcmb/getBcidcList`).then(res => res) }
// export const getRdidcList = () => { return axios.get(base + `/lkpd/dcmb/getRdidcList`).then(res => res) }
// export const getRqidcList = () => { return axios.get(base + `/lkpd/dcmb/getRqidcList`).then(res => res) }
// export const getScidcList = () => { return axios.get(base + `/lkpd/dcmb/getScidcList`).then(res => res) }
// export const getSridcList = () => { return axios.get(base + `/lkpd/dcmb/getSridcList`).then(res => res) }
// export const getTcidcList = () => { return axios.get(base + `/lkpd/dcmb/getTcidcList`).then(res => res) }
//导入模板


// 路线管理
export const delHtglldbLdcode = (urlpart) => { return axios.delete(base + `/lkpd/ht/delHtglldbLdcode` + urlpart).then(res => res) }
export const getHtglldbAll = (urlpart) => { return axios.get(base + `/lkpd/ht/getHtglldbAll` + urlpart).then(res => res) }
export const addHtglldbList = (urlpart) => { return axios.post(base + `/lkpd/ht/addHtglldbList`, urlpart).then(res => res) }
export const editHtglldbList = (urlpart) => { return axios.put(base + `/lkpd/ht/editHtglldbList`, urlpart).then(res => res) }

//模板查询
export const getPciAllList = (urlpart) => { return axios.get(base + `/lkpd/cx/getPciAllList`+urlpart).then(res => res) }
export const getBciAllList = (urlpart) => { return axios.get(base + `/lkpd/cx/getBciAllList`+urlpart).then(res => res) }
export const getPbiAllList = (urlpart) => { return axios.get(base + `/lkpd/cx/getPbiAllList`+urlpart).then(res => res) }
export const getPwiAllList = (urlpart) => { return axios.get(base + `/lkpd/cx/getPwiAllList`+urlpart).then(res => res) }
export const getRdiAllList = (urlpart) => { return axios.get(base + `/lkpd/cx/getRdiAllList`+urlpart).then(res => res) }
export const getRqiAllList = (urlpart) => { return axios.get(base + `/lkpd/cx/getRqiAllList`+urlpart).then(res => res) }
export const getSciAllList = (urlpart) => { return axios.get(base + `/lkpd/cx/getSciAllList`+urlpart).then(res => res) }
export const getSriAllList = (urlpart) => { return axios.get(base + `/lkpd/cx/getSriAllList`+urlpart).then(res => res) }
export const getTciAllList = (urlpart) => { return axios.get(base + `/lkpd/cx/getTciAllList`+urlpart).then(res => res) }

export const getPciXiang = (urlpart) => { return axios.get(base + `/lkpd/cx/getPciXiang`+urlpart).then(res => res) }
export const getBciXiang = (urlpart) => { return axios.get(base + `/lkpd/cx/getBciXiang`+urlpart).then(res => res) }
export const getPbiXiang = (urlpart) => { return axios.get(base + `/lkpd/cx/getPbiXiang`+urlpart).then(res => res) }
export const getPwiXiang = (urlpart) => { return axios.get(base + `/lkpd/cx/getPwiXiang`+urlpart).then(res => res) }
export const getRdiXiang = (urlpart) => { return axios.get(base + `/lkpd/cx/getRdiXiang`+urlpart).then(res => res) }
export const getRqiXiang = (urlpart) => { return axios.get(base + `/lkpd/cx/getRqiXiang`+urlpart).then(res => res) }
export const getSciXiang = (urlpart) => { return axios.get(base + `/lkpd/cx/getSciXiang`+urlpart).then(res => res) }
export const getPssiXiang = (urlpart) => { return axios.get(base + `/lkpd/cx/getPssiXiang`+urlpart).then(res => res) }
export const getSriXiang = (urlpart) => { return axios.get(base + `/lkpd/cx/getSriXiang`+urlpart).then(res => res) }
export const getTciXiang = (urlpart) => { return axios.get(base + `/lkpd/cx/getTciXiang`+urlpart).then(res => res) }


//编辑
export const editPciList = (urlpart) => { return axios.put(base + `/lkpd/cx/editPciList`, urlpart).then(res => res) }
export const editBciList = (urlpart) => { return axios.put(base + `/lkpd/cx/editBciList`, urlpart).then(res => res) }
export const editPbiList = (urlpart) => { return axios.put(base + `/lkpd/cx/editPbiList`, urlpart).then(res => res) }
export const editPwiList = (urlpart) => { return axios.put(base + `/lkpd/cx/editPwiList`, urlpart).then(res => res) }
export const editRdiList = (urlpart) => { return axios.put(base + `/lkpd/cx/editRdiList`, urlpart).then(res => res) }
export const editRqiList = (urlpart) => { return axios.put(base + `/lkpd/cx/editRqiList`, urlpart).then(res => res) }
export const editPssiList = (urlpart) => { return axios.put(base + `/lkpd/cx/editPssiList`, urlpart).then(res => res) }
export const editSciList = (urlpart) => { return axios.put(base + `/lkpd/cx/editSciList`, urlpart).then(res => res) }
export const editSriList = (urlpart) => { return axios.put(base + `/lkpd/cx/editSriList`, urlpart).then(res => res) }
export const editTciList = (urlpart) => { return axios.put(base + `/lkpd/cx/editTciList`, urlpart).then(res => res) }
// 应急抢修
export const yjqxdelYjqxgcByIds = (urlpart) => { return axios.delete(base6 + `/yjqx/delYjqxgcByIds` + urlpart).then(res => res) }
export const yjqxgetYjqxgcList = (urlpart) => { return axios.get(base6 + `/yjqx/getYjqxgcList`,{params:urlpart} ).then(res => res.data) }
export const yjqxaddYjqxgc = (urlpart) => { return axios.post(base6 + `/yjqx/addYjqxgc`, urlpart).then(res => res) }
export const yjqxeditYjqxgc = (urlpart) => { return axios.put(base6 + `/yjqx/editYjqxgc`, urlpart).then(res => res) }
export const updateYjqxSfztByIds = (param) => { return axios.get(base6 + `/yjqx/updateYjqxSfztByIds`,{params: param}).then(res => res.data) }  // 修改状态
// 审批流程详情页面的接口
export const getData = (param) => { return axios.get(base3 + `/DisplayDetails/SjqdRwd/getData`,{params: param}).then(res => res.data) }  // 最复杂模板——事件（模板）
export const getDatatable = (param) => { return axios.get(base3 + `/DisplayDetails/RcyhGcjld/getData`,{params: param}).then(res => res.data) }  // 下面带表格的模板


// 获取供应商枚举
export const getgysxx = (param) => { return axios.get(base7 + `/commonuse/getgysxx`,{params: param}).then(res => res.data) } // 应急获取供应商
const CancelToken = axios.CancelToken
let cancel
export const getVideoList = (key) => {
  return axios.get('/driver/qeryByQCNum' + key, {
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}
export const cancelRequest = () => {
  // 第一次执行videoService.cancelRequest()时还未发送getVideoList请求，会报错，添加如下判断
  if (typeof cancel === 'function') {
    // 取消请求
    cancel()
  }
}
