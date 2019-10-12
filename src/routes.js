import Login from './Login.vue'
import MainPage from './pages/MainPage.vue'
import Dp from './pages/Dp.vue'
import gisMap from './pages/GIS-map'
// import Main from './pages/Main.vue'

let routes = [
  {
    path: '/login',
    component: Login,
    name: '招商公路运营管理平台'
  },
  {
    path: '/mainpage',
    component: MainPage,
    name: '招商公路运营管理平台',
    children: [
      {
        path: '/Gismap',
        component: gisMap,
        name: 'gisMap'
      }
    ]
  },
  {
    path: '/dp',
    component: Dp,
    name: '大屏'
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/components/404')
    }
   
]

export default routes
