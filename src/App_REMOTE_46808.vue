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
    },
    saveUserMsg (token) {
      // let token = getCookie('tokens')
      // let token = localStorage.getItem('tokenkey')

      this.$api.getUserBytoken('?token=' + token).then(res => {
        if (res.status !== 200) {
          this.$message({
            message: '网络出错',
            type: 'error'
          })
        } else {

          // debugger
          let userMsg = res.data.data
          localStorage.setItem('userMsg', JSON.stringify(userMsg))

        }
      }).catch(e => {
        console.log(e)
      })
    }
  },
  mounted () {
    this.checkJs(config.mks)
    let cuserid=encodeURI(getQueryString('cuserid'))
    let test=encodeURI('JBb97Pmbd7XfWoDjlQwZpyKnUNGoCinDkguZmqUPrVl2Hx3kJBNbgIkJQc5tO7++')
    if(cuserid!='null'){
      test=cuserid
    }
    this.$api.getUserCode('?cuserid='+encodeURIComponent(test)).then(res => {
      if (res.data.code != 1) {
        this.$message({
          message: '出错了',
          type: 'error'
        })
      } else {
        let str='usercode='+res.data.data+';path=/'

        document.cookie=str
        let userCode = getCookie('usercode')
        if(userCode){
          this.$api.getToken('?userCode='+res.data.data).then(res => {  // + res.data.data
          // this.$api.getToken('?userCode='+ res.data.data).then(res => {  //
            if (res.status !== 200) {
              this.$message({
                message: '出错了',
                type: 'error'
              })
            } else {
              let str='tokens='+res.data.data+';path=/'
              document.cookie=str
              this.saveUserMsg(res.data.data)
            }
          }).catch(e => {
          })
        }else{
          delCookie('tokens')
        }
      }
    }).catch(e => {
    })
  }
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
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif!important;
    font-size: 13px;
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
    min-width: 1200px;
    /*max-width: 1860px;*/
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
    font-size: 13px;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif!important;
  }
</style>
