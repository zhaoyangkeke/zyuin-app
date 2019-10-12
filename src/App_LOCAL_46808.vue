<template>
  <div id="app" class="">
    <div class="app_content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import {mkTree} from './mk'
export default {
  name: 'app',
  methods: {
    checkJs (mks) {
      let menu = mkTree(mks)
/*    menu[5].children.push({
      fmkid: "",
      iconFontClass: "el-icon-remove-outline",
      img: "el-icon-remove-outline",
      isMenu: true,
      // mkid: "0609",
      mkname: "aa",
      name: "aa",
      path: "/aa",
      component:() =>import('./pages/aa.vue'),
      children:[{

      }]
      })*/
      localStorage.setItem('mks', JSON.stringify(mks))
      localStorage.setItem('menu', JSON.stringify(menu))
      let addRoutes = [{
        path: '/mainpage',
        component: () => import('./pages/Mainpage.vue'),
        name: '',
        isMenu: true,
        children: menu
      }]
      sessionStorage.setItem('Routers', JSON.stringify(addRoutes))
      this.$router.addRoutes(addRoutes)
      // this.$router.push({path: '/mainpage'})
    }
  },

  mounted () {
    this.checkJs(config.mks)
    let cuserid=encodeURI(getQueryString('cuserid'))
    let test=encodeURI('JJBb97Pmbd7XfWoDjlQwZpyKnUNGoCinDkguZmqUPrVl2Hx3kJBNbgIkJQc5tO7++')
    if(cuserid!='null'){
      test=cuserid
    }console.log(test)
    this.$api.getUserCode('?cuserid='+encodeURIComponent(test)).then(res => {
  if (res.data.code != 1) {
    this.$message({
      message: '出错了',
      type: 'error'
    })
  } else {
    let str='usercode='+res.data.data+';path=/'
         document.cookie=str
    this.$api.getToken('?userCode=' + res.data.data).then(resp=>{
      if (resp.data.code != 1) {
      this.$message({
      message: '出错了',
      type: 'error'
    })
      }else{
        let str='tokens='+resp.data.data+';path=/'
         document.cookie=str
      }
    })
  }
}).catch(e => {
})
  },
}
</script>

<style lang="scss">
  @import "./assets/index.scss";
  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
  }
  body {
    height: 100%;
    margin: 0px;
    padding: 0px;
    font-family: 宋体;
    font-size: 12px;
    color: #19233c;
    -webkit-font-smoothing: antialiased;
  }
  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    overflow: hidden;
    background: #fff;
    /*min-height: 600px;
    min-width: 800px;*/
    .app_content{
      width: calc(100% + 17px);
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
  ::-webkit-input-placeholder{
    font-size: 12px;
    font-family: 宋体;
  }
</style>
