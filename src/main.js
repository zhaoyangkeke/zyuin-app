// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import api from './api/index'
import VueAMap from 'vue-amap'
import promise from 'es6-promise'
// import Mock from './mock/mock'
import {mkTree} from './mk'
import echarts from 'echarts'
import moment from 'moment'
import lodash from 'lodash'
Vue.prototype.$echarts = echarts

// Mock.bootstrap()

promise.polyfill()
Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  key: '1d454d32947a8f76d4cb19def2b3124d',
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.Geolocation', 'AMap.CircleEditor', 'AMap.MouseTool', 'AMap.PolyEditor', 'AMap.MarkerClusterer'],
  uiVersion: '1.0',
})

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
moment.locale('zh-cn')

Vue.prototype.$api = api
Vue.prototype.$moment = moment
Vue.prototype._ = lodash
// async function as(){
//   let cuserid = getQueryString()
//   let test=encodeURI('JBb97Pmbd7XfWoDjlQwZpyHEqMp52ga+GCz4Pt143zUqm2tJ2R8l+LeU1sSLHgaj')
//   if(cuserid!='null'&&cuserid){
//     test=cuserid
//   }
//   localStorage.setItem('cuserid', JSON.stringify(test))
//   let res1 = await api.getUserCode('?cuserid='+test)
//   let str1='usercode='+res1.data.data+';path=/'
//        document.cookie=str1
//   let res2= await api.getToken('?userCode=' + res1.data.data)      
//   let str='tokens='+res2.data.data+';path=/'
//              document.cookie=str
//   let msg= await  api.getUserBytoken('?token=' + res2.data.data)
//   let userMsg = msg.data.data
//    localStorage.setItem('userMsg', JSON.stringify(userMsg))
 
// }
// as()

const router = new VueRouter({
  routes
})
let permission = sessionStorage.getItem('user')
if (permission) {
  let addRoutes = [{
    path: '/mainpage',
    component: require('./pages/MainPage.vue'),
    name: '',
    isMenu: true,
    children: mkTree(JSON.parse(localStorage.getItem('mks')))
  }]
 
 
  router.addRoutes(addRoutes)
}


router.beforeEach((to, from, next) => {
  if (to.path != '/login'&&to.path != ''&&to.path != '/') {
    // var usercode=getCookie('usercode')
  }
  // console.log(to,from)
  if (to.path === '/login') {
    delCookie('tokens')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('Routers')
    sessionStorage.removeItem('userryb')
    sessionStorage.removeItem('token')
    localStorage.removeItem('menu')
    localStorage.removeItem('mks')
  }
  let title = to.name === '' ? '系统' : to.name
  document.title = title
  if (to.path === '/' || to.path === '') {
    next({ path: '/login'})
    sessionStorage.removeItem('user')
    localStorage.removeItem('menu')
    delCookie('tokens')
  } else {
    // if(to.name==null){
    //   next({path:'/404'})
    
    // }

    next()
  }
})
// 报表用编码
Vue.prototype.cjkEncode = function (text) {
  if (text === null) {
    return ''
  }
  let newText = ''
  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i)
    if (code >= 128 || code === 91 || code === 93) {
      newText += '[' + code.toString(16) + ']'
    } else {
      newText += text.charAt(i)
    }
  }
  return newText
}
// 转换时间格式
Vue.prototype.formatDate = function (date) {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}
Vue.prototype.formatMonth = function (date) {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  return y + '-' + m
}
// 转换参数格式
Vue.prototype.canShu = function (form) {
  let param = ''
  for (let key in form) {
    if (form[key]) {
      param = param + key + '=' + form[key] + '&'
    }
  }
  param = param.slice(0, param.length - 1)
  return param
}
Vue.prototype.getuuid = function () {
  let d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now()
  }
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
