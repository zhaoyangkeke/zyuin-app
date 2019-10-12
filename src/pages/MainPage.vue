<template>
  <VerticalLayout hHeightOpen='56px'>
    <div slot="header" class="layout-div main-header" style="z-index: 101">
      <HorizontalLayout lWidthOpen="200px" rWidthOpen="280px" class="main-header-top" style="">
        <div slot="left" class="layout-div" >
          <div class="logo"><img style="position:absolute;left:16px;top:16px" src="../../static/img/new_logo1.png"><div style="position:absolute;left:40px;width:190px;">招商公路运营管理平台</div></div>
        </div>
        <div class="logo_mid">
          <ul>
            <li v-for="(item, index) in lyarr" :key="index" :class="(selectnum===index && isAsideShow)?'select_li':''" @click="goto(item, index)">{{item.name}}</li>
          </ul>
        </div>
        <div slot="right"></div>
      </HorizontalLayout>
    </div>
    <div class="layout-div" v-if="isAsideShow">
      <HorizontalLayout :lWidthOpen="lWidthOpen" lWidthColse="40px" :lIsCollapse="isCollapse">
        <div slot="left"  class="layout-div menu-div menu-theme" style="z-index: 100">
          <el-scrollbar  :noresize="false" :native="false" style="height:calc(100% - 45px);">
            <ul class="menu" v-show="isCollapse" v-if="menu[selectnum]&&menu[selectnum].children">
              <li class="menu-li" :class="getMenuCss(item)" v-for="(item,index) in menu[selectnum].children" v-if="item.isMenu" :key="index" >
                <div class="menu-li-lable" @click.stop="select(item,index)">
                  <i style="font-size: 14px;" class="icon iconfont icon-caidan1"></i>
                  <span v-show="isCollapse" style="font-size: 14px;">{{item.mkname}}</span>
                  <i v-show="isCollapse&&item.children" class="arrow" :class="item.expand?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
                </div>
                <ul class="menu-li-cul" v-if="item.children" v-show="item.expand&&selectindex===index">
                  <li class="menu-li-cli" :class="itemChild.path === $route.path? 'select-menu-li-cli': ''"
                      v-for="(itemChild,index) in item.children"
                      :index="itemChild.path" :key="index"
                      @click.stop="goto(itemSon)" >
                    <div class="menu-li-lable erjicaidan" @click.stop="itemChild.expand=!itemChild.expand;topath(itemChild,'itemChild')">
                      <i style="font-size: 14px;" class="icon iconfont icon-caidan"></i>
                      <span v-show="isCollapse" style="font-size: 12px;">{{itemChild.mkname}}</span>
                      <i v-show="isCollapse&&itemChild.children" class="arrow" :class="itemChild.expand?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
                    </div>
                    <ul class="menu-li-cul" v-if="itemChild.children" v-show="itemChild.expand">
                      <li class="menu-li-cli" :class="itemSon.path === $route.path? 'select-menu-li-cli': ''"
                          v-for="(itemSon,index) in itemChild.children"
                          :index="itemSon.path"
                          :key="index"
                          @click.stop="goto(itemSon)" >
                        <div class="menu-li-lable topathfsdf2343432" @click.stop="topath(itemSon,'itemSon')" style="padding-left:30px;">
                          <span v-show="isCollapse" style="font-size: 10px;">{{itemSon.mkname}}</span>
                          <i v-show="isCollapse&&itemSon.children" class="arrow" :class="itemSon.expand?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            <ul class="menu float-menu" v-show="!isCollapse" v-if="menu[selectnum]&&menu[selectnum].children">
              <li class="menu-li" :class="getMenuCss(item)" v-for="(item,closeIndex) in menu[selectnum].children" v-if="item.isMenu" :key="closeIndex" @mouseenter="collapseShow($event, item)">
                <div class="menu-li-lable">
                  <i style="font-size: 16px;vertical-align:middle;" :class="item.iconFontClass"></i>
                  <span v-show="isCollapse" style="font-size: 16px;">{{item.mkname}}</span>
                  <i v-show="isCollapse" class="arrow" :class="item.expand?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
                </div>
              </li>
            </ul>
          </el-scrollbar>
          <transition name="el-fade-in-linear" mode="out-in">
            <ul v-show="!isCollapse&&isCollapseChildMenuShow" class="menu-li-cul float-child-menu">
              <li  :class="item.path === $route.path? 'select-menu-li-cli': ''" class="menu-li-cli" v-for="(item,index) in isCollapseChildMenu" :index="item.path" :key="index" @click="goto(item.path)">
                <i :class="item.iconFontClass"></i>
                <span >{{item.mkname}}</span>
              </li>
            </ul>
          </transition>
          <div class="menu-collapse-button" style="width: 100%;height: 45px;background-color: #e6ebf0;line-height: 45px;text-align: center">
            <span @click="isCollapse=!isCollapse">
              <i style="color: #1a82ee;cursor: pointer" :class="isCollapse?'el-icon-d-arrow-left':'el-icon-d-arrow-right'"></i>
            </span>
          </div>
        </div>
        <div class="layout-div background_image" :style="isMapTabs()?'':'height: calc(100%); width: calc(100%);'">
          <div v-if="isIfarme" style="width:100%;height:100%">
            <iframe :src="iframePath" frameborder="0" width="100%" height="100%"></iframe>
          </div>
          <!-- <keep-alive> -->
          <router-view/>
          <!-- </keep-alive> -->
        </div>
      </HorizontalLayout>
    </div>
    <!-- <div class="layout-div" v-if="isAsideShow">
      <div class="layout-div background_image" :style="isMapTabs()?'':'height: calc(100%); width: calc(100%);'">
             <div v-if="isIfarme" style="width:100%;height:100%">
                 <iframe :src="iframePath" frameborder="0" width="100%" height="100%"></iframe>
             </div>
             <keep-alive>
               <router-view></router-view>
             </keep-alive>
           </div>
   </div> -->
    <div style="background:rgb(243,246,249);height:100%;width:100%;position:absolute;top:0" v-if="!isAsideShow && !Gismap && isZsgl">
      <charts></charts>
    </div>
    <div style="background:rgb(243,246,249);height:100%;width:100%;position:absolute;top:0" v-if="!isAsideShow && !Gismap && isYh">
      <ChartsYh></ChartsYh>
    </div>
    <div style="height:100%;width:100%;position:absolute;top:0" v-show="Gismap">
      <router-view></router-view>
    </div>
  </VerticalLayout>
</template>
<script>
  import api from '../api/index'
  import HorizontalLayout from '../components/HorizontalLayout.vue'
  import VerticalLayout from '../components/VerticalLayout.vue'
  import Charts from '../components/chartsPage.vue'
  import ChartsYh from '../components/yhMain.vue'
  export default {
    components: {HorizontalLayout, VerticalLayout, Charts, ChartsYh},
    data () {
      return {
        selectindex: 0,
        isZsgl: false,
        isYh: false,
        isJkzx: false,
        isIfarme: false,
        iframePath: '',
        lyarr: [
          {url: '/GISmap', name: 'GIS平台', Gis: '/GISmap'},
          {url: '/jhgl', name: '计划管理', iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=CM010401&busiCenter=01&isdd=Y'},
          {url: '/cggl', name: '采购管理', iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=40040200&busiCenter=01&isdd=Y'},
          {url: '/htgl', name: '合同管理', iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=40203001401&busiCenter=01&isdd=Y'},
          {url: '/zcgl', name: '资产管理', iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=40040800&busiCenter=01&isdd=Y'},
          {url: '/lkpd-lmsh', name: '养护管理'},
          {url: '/cggl-dlxc', name: '营运管理', iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=CM010401&busiCenter=01&isdd=Y'},
          {url: '/rlzy', name: '人力资源', iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=CM010401&busiCenter=01&isdd=Y'},
          {url: '/zfgl', name: '支付管理', iframe: 'http://192.168.10.231:8081/portal/NCSsoServlet?ssoid=xz&nodeid=20110ETEA&busiCenter=01&isdd=Y'},
          {url: '/kpigl', name: 'KPI管理'},
          {url: '/sjgl', name: '数据管理'}
        ],
        navIcons: [
          {url: '', icon: 'icon-message', isNew: true},
          {url: '', icon: 'icon-user', isNew: false},
          {url: 'GIS-link', name: 'GIS平台', icon: 'icon-map', isNew: false}
        ],
        selectnum: 0,
        isAsideShow: false,
        theme: false,
        menu: [],
        isCollapse: true,
        isCollapseChildMenu: [],
        childMenuTop: 0,
        isCollapseChildMenuShow: false,
        selectTab: '/lkpd-lmsh',
        Gismap: false,
        lWidthOpen: '200px'
      }
    },
    methods: {
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
      goto (item, index) {
        this.isIfarme = false
        this.Gismap = false
        this.isAsideShow = true
        let url = item.path || item.url
        if (item.Gis) {
          this.isAsideShow = false
          this.Gismap = true
        }

        this.$router.push({path: url})
        if (index !== 'undefined' && index >= 0) {
          this.selectnum = index
          sessionStorage.setItem('selectnum', index)
          if (item.iframe) {
            this.isIfarme = true
            this.iframePath = item.iframe
          }
        }
      },
      select (item, index) {
        if (item.iframe) {
          this.isIfarme = true
          this.iframePath = item.iframe
        } else {
          if (!item.children) {
            this.$router.push({path: item.path})

          }
        }
        if (item.expand === true) {
          item.expand = false
        } else {

          this.menu[this.selectnum].children.map(o => {
            o.expand = false
          })
          item.expand = true
        }
        this.selectindex = index
      },
      topath (item, index) {
        if (item.iframe) {
          this.isIfarme = true
          this.iframePath = item.iframe
        } else {
          if (!item.children) {
            this.$router.push({path: item.path})
          }
        }
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
        if (this.$route.path === item.path) {
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
    beforeMount () {
      this.menu = JSON.parse(localStorage.getItem('menu'))
    },
    mounted () {
      if (this.$route.path === '/GISmap') {
        this.lWidthOpen = '0px'
      }
      if (sessionStorage.getItem('selectnum') === null || sessionStorage.getItem('selectnum') === 'undefined') {
        this.selectnum = ''
      } else {
        this.selectnum = Number(sessionStorage.getItem('selectnum'))
      }
      switch (sessionStorage.getItem('userRight')) {
        case 'zsgl':
          this.isZsgl = true
          break
        case 'yh':
          this.isYh = true
          break
        default:
          this.isZsgl = true
      }
      // this.menu = JSON.parse(localStorage.getItem('menu'))
      if (this.$route.path === '/mainpage') {
        // let url = this.menu[0].children[0].children[0].url
        // this.goto(url)
      } else {
        this.goto(this.$route.path, this.selectnum)
      }
      $('.float-menu').parent().parent().scroll(() => {
        this.childMenuTop = $('.float-menu').parent().parent().scrollTop()
      })
      window.setTimeout(() => {
        document.addEventListener('click', (event) => {
          let e = event || window.event // 浏览器兼容性
          let elem = e.target || e.srcElement
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .main-header{
    width: 100%;
    height: 56px;
    background-color: #00448b;
    box-shadow: 0px 3px 7px 0px
    rgba(0, 68, 139, 0.35);
    .logo_mid{
      position:absolute;
      left:10%;
      height: 56px;
      line-height: 56px;
      text-align: center;
      ul{
        display: inline-block;
        min-width: 960px;
        height:100%;
        font-size: 14px;
        color: #93b2d1;
        li{
          float: left;
          text-align: center;
          color: #fff;
          padding: 0 16px;
          &:hover{
            background: #4287CD;
            color: #fff;
            cursor: pointer;
          }
        }
        .select_li{
          background: #4287CD;
          color: #fff;
          cursor: pointer;
          height: 56px;
          border-bottom:3px solid #1c9afb;
        }
      }
    }
  }
  .logo{
    height: 56px;
    line-height: 56px;
    font-size: 18px;
    color: #fff;
    text-align: center;
  }
  .logo span{
    font-size: 20px;
    cursor: pointer;
  }
  .logo span:hover{
    color: #f1f1f1;
  }
  .background_image{
    /*font-family: "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "SimSun", "sans-serif";*/
    background-image: url(../../static/img/beijingtu.jpg);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100% 100%;
    padding: 8px 16px;
    height: 100%;
    width: 100%;
    >div{
      background: #fff;
    }
  }
</style>
