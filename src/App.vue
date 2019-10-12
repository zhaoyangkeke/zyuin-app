<template>
  <div id="app" class="">
    <div class="app_content">
      <router-view  v-if="show_view"/>
    </div>
  </div>
</template>

<script>
import {mkTree} from './mk'

export default {
  name: 'app',
  data(){
    return {
      show_view:false,
      userInfo:{}
    }
  },
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
      addRoutes.push({
      path:'*',
      name:'页面找不到了',
      component: () => import('@/components/404')
    })
      sessionStorage.setItem('Routers', JSON.stringify(addRoutes))
      this.$router.addRoutes(addRoutes)
      // this.$router.push({path: '/mainpage'})
    },
    saveUserMsg (token) {
       let self = this
          let userInfo = token[0]
          if(userInfo){
            this.userInfo = userInfo
            if(userInfo){
              this.userInfo.yhbm = userInfo.userCode
              this.userInfo.yhid = userInfo.userId
              this.userInfo.yhmc = userInfo.userName
              this.userInfo.userType = userInfo.userType
              this.userInfo.supplierpk = userInfo.supplierpk
              let deptList = userInfo.deptList
              let bminfo = deptList[0]
              if(bminfo){
                this.userInfo.bmbh = bminfo.deptCode
                this.userInfo.bmid = bminfo.deptId
                this.userInfo.bmmc = bminfo.deptName
                let org = bminfo.org
                if(org){
                  this.userInfo.orgbh = org.orgCode
                  this.userInfo.orgid = org.orgId
                  this.userInfo.orgmc = org.orgName
                }
              }
            }
          }
          localStorage.setItem('userInfo', JSON.stringify(self.userInfo))
          config.userInfo =  this.userInfo

      //   }
      // }).catch(e => {

      // })
    },

  },
  async created (){
    let cuserid = getQueryString()
    // let test=encodeURI('JBb97Pmbd7XfWoDjlQwZp3grUHMdk/C5KOUPmr7eVSXPjb3UBbk+oF3UvVIUyP1U')
    // JBb97Pmbd7XfWoDjlQwZp8AUvdxDHjrtHWLA9k9HYv84skki120lvr2W2XEQ3Fyu
    // JBb97Pmbd7XfWoDjlQwZpwY4ZzEIKUc1C3Ecl4O9E6iUPoVYUjnQ+En8kBf+mJlc  JBb97Pmbd7XfWoDjlQwZp3grUHMdk/C5KOUPmr7eVSXPjb3UBbk+oF3UvVIUyP1U
    let test=''
    let receiveid = ''
    // let test=encodeURI('JBb97Pmbd7XfWoDjlQwZp4I1jm7mjXxC/LkElq0ZeYrnX7we9Dpu1rARG4odUygM')//供应商
    console.log(cuserid, 1010)
    if(cuserid != 'YH110101A01_page' && cuserid){
      console.log(1122)
      test =cuserid
    }else{
      console.log(3344)
      let spzxurl = window.location.href
      // let spzxurl = 'http://61.141.223.10:9080/yygl/index.html#/liucheng-spzx?appcode=YH110101A&status=add&pagecode=YH110101A01_page&billid=kgsqd1564998602418&billno=ZxyhKgsqd&receive=1001A21000000000JV34&scene=todo&c=YH110101A&p=YH110101A01_page'

      console.log(spzxurl, '进入else')
      // var spzxurl = 'http://61.141.223.10:9080/yygl/index.html#/liucheng-spzx?appcode=YH110101A&status=add&pagecode=YH110101A01_page&billid=kgsqd1564986828779&billno=ZxyhKgsqd&receive=1001A21000000000JV34&scene=todo&c=YH110101A&p=YH110101A01_page'
      let idparams = ''
      if (spzxurl.indexOf('?') == -1) {
        idparams = ''
      } else {
        idparams = spzxurl.split('?')[1]
      }
      if (idparams.indexOf('receive') == -1) {
        console.log(cuserid, '没有receive')
        test=encodeURI('JBb97Pmbd7XfWoDjlQwZp9bDbBUeu3lacK9GnE3KHQI1w3vOncOaKDoWh4StEl7c')
      } else {
        if (spzxurl.indexOf('?') != -1) {
          var reg2 = new RegExp('(^|&)' + 'receive' + '=([^&]*)(&|$)', 'i');
          let billidparam = idparams.substr(1).match(reg2)
          console.log(billidparam, 12345)
          receiveid = unescape(billidparam[2])
          console.log(receiveid, 90090)
        }
      }
    }

    localStorage.setItem('cuserid', JSON.stringify(test))
  let res1 = await this.$api.getUserCode('?cuserid='+test)
  let str1='usercode='+res1.data.data+';path=/'

    document.cookie=str1
    if (receiveid == undefined) {
      receiveid = ''
    } else {
       receiveid = receiveid
    }
    if (res1.data.data === null) {
      res1.data.data = ''
    }
  let res2= await this.$api.getToken('?userCode=' + res1.data.data + '&userId=' + receiveid)  // '?userCode=' + res1.data.data
  let str='tokens='+res2.data.data+';path=/'
             document.cookie=str

  let msg= await  this.$api.getUserBytoken('?token=' + res2.data.data)
  this.show_view=true

  let userMsg = msg.data.data

    config.jd_infor=userMsg
   localStorage.setItem('userMsg', JSON.stringify(userMsg))

    this.saveUserMsg(userMsg)
  },
    mounted () {
    this.checkJs(config.mks)


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
