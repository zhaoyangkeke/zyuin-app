<template>
  <div class="login">
    <div class="header">
      <img src="../static/img/logo-new.png" alt="">
    </div>
    <div class="login-main">
      <div class="login-main-right">
        <el-form :model="form" :rules="formRules" ref="form" label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-container">
          <h3 class="title">用户登录</h3>
          <el-form-item prop="name">
            <el-input type="text" size="small" v-model="form.name" auto-complete="off"
                      prefix-icon="iconfont"
                      placeholder="请输入用户名"
                      ></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input type="password" size="small" v-model="form.pwd" auto-complete="off"
                      prefix-icon="iconfont icon-mima"
                      placeholder="请输入密码"></el-input>
            <span style='color:#f23030;font-size:12px;position:absolute;right:0px;top:0;'>在6-20个字符之间</span>
          </el-form-item>
          <el-form-item prop="yzm">
            <el-input type="password" size="small" auto-complete="off"
                      prefix-icon="iconfont icon-mima"
                      placeholder="请输入验证码"></el-input>
            <img src="../static/img/demo.png" style='width:102px;height:39px;position:absolute;right:0px;top:-7px;'/>
          </el-form-item>
          <div>
            <label>记住密码</label>
            <el-switch
              v-model="isRemember"
              active-color="rgb(0,98,155)"
              inactive-color="#ddd">
            </el-switch>
          </div>
          <el-form-item style="width:100%;margin-top:20px;">
            <el-button type="primary" style="width:100%;background:rgb(0,98,155)!important" @click="onLogin"
                       :loading="loginLoading" @keyup.enter.native="onLogin">登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {mkTree} from './mk'
import { mapActions } from 'vuex'
export default {
  name: 'hello',
  data () {
    return {
      isRemember: false,
      loginLoading: false,
      checked: false,
      form: {
        name: '',
        pwd: ''
      },
      formRules: {
        name: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    checkJs (mks) {
      let menu = mkTree(mks)
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
      sessionStorage.setItem('userRight', this.form.name)
      sessionStorage.getItem('userRight')
      sessionStorage.setItem('Routers', JSON.stringify(addRoutes))
      this.$router.addRoutes(addRoutes)
      if (this.form.name === 'jkzx') {
        location.href = 'http://192.168.10.234:8080/highway/'
      } else {
        if(this.form.name=='admin'){
        TEST_CUSERID='JBb97Pmbd7XfWoDjlQwZp8AUvdxDHjrtHWLA9k9HYv84skki120lvr2W2XEQ3Fyu'
        localStorage.setItem('cid', TEST_CUSERID)
        }else if(this.form.name=='cssfsry'){
       TEST_CUSERID='JBb97Pmbd7XfWoDjlQwZp1W/OK9jO8uaWpTq4xpm5QFuIOnEBfkF0NQwWzlS9q2w' 
        localStorage.setItem('cid', TEST_CUSERID)
        }
        console.log(TEST_CUSERID)
        this.$router.push({path: '/mainpage'})
      
       

      }
    },
    onLogin () {
      // var loginParams = {username: this.form.name, password: this.form.pwd}
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loginLoading = true
          /* this.$api.login(loginParams).then(resp => {
            console.log(resp)
            this.loginLoading = false
            if (resp.status !== 200) {
              this.$message({
                message: '出错了',
                type: 'error'
              })
            } else {
              console.log('resp.data', resp.data.result)
              if (resp.data.code === 500) {
                this.$message({
                  message: resp.data.message,
                  type: 'error'
                })
              } else {
                if (this.checked) {
                  localStorage.setItem('user', JSON.stringify(loginParams))
                } else {
                  localStorage.removeItem('user')
                }
                sessionStorage.setItem('user', JSON.stringify(resp.data.user))
                this.checkJs(resp.data.user.mks) // 数据库数据或者自己测试数据组装页面构成
                // Object.assign(axios.defaults.headers, {'Authorization': resp.data.token})
                // sessionStorage.setItem('token', resp.data.token)
              }
            }
          }).catch(e => {
            this.loginLoading = false
            // this.$message({message: '出错了', type: 'error'})
            console.log(e)
          }) */
          this.checkJs(config.mks)
          // this.getTokenmsg()
        }
      })
    },
    getDict () {
    }
  },
  computed: {},
  mounted () {
    this.form.name = 'admin'
    this.form.pwd = '123'
    // this.onLogin()
    var loginuser = localStorage.getItem('user')
    loginuser = JSON.parse(loginuser)
    if (loginuser !== null) {
      this.checked = true
      this.form.name = loginuser.username
      this.form.pwd = loginuser.password
    }
    document.onkeydown = (e) => {
      if (e.keyCode === 13) {
        this.onLogin()
      }
    }
  }
}
</script>
<!-- scss语法引用是 注:lang="scss" -->
<style lang="scss">
  .login {
    min-height: 600px;
    width:100%;
    height:100%;
    background:#fff;
    overflow: auto;
    .header {
      width: 100%;
      margin:111px auto 37px;
      text-align: center;
    }
    .login-main{
      background-image: url('../static/img/logo-main.png');
      width:1440px;
      height:581px;
      margin:0 auto;
      position:relative;
    }
    .login-footer {
      letter-spacing: 2px;
      position: absolute;
      bottom: 0;
      font-size: 14px;
      font-family: "Microsoft YaHei";
      color: #2d3344;
      width: 100%;
      line-height: 54px;
      height: 54px;
      text-align: center;
      margin: 0 auto;
      color: #333;
    }
    .login-main-left {
      position: relative;
      height: 100%;
      float: left;
      width: 50%;

      img {
        animation: shake;
        animation-iteration-count: infinite;
        animation-duration: 5s;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 10%;
        margin: auto;
      }

    }
    .login-main-right {
      min-width: 360px;
      min-height: 320px;
      height: 100%;
      float: left;
      width: 50%;
    }
    .el-form{
      position: absolute;
      right:262px;
    }
    .login-main-right .el-form .title{
      width: 80px;
      height: 17px;
      font-family: PingFang-SC-Bold;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #333333;
      margin: 0 auto 24px;
    }
    .login-container {
      position: absolute;
      width: 360px;
      height: 420px;
      top: calc(50% - 135px);
      margin: auto;
      top:30%;
      right:200px;
      bottom: calc(50% - 135px);
      -webkit-border-radius: 3px;
      border-radius: 3px;
      -moz-border-radius: 3px;
      background-clip: padding-box;
      padding: 18px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      .el-form-item{
        .el-form-item__content{
          width: 100%!important;
        }
      }
    }
    .remember {
      margin: 15px 0px 15px 0px;
    }
    .remember .el-checkbox__label{
      font-size: 12px!important;
    }
    .remember .el-checkbox__inner{
      width: 12px;
      height: 12px;
    }
    .remember .el-checkbox__inner::after{
      height: 6px!important;
      left: 3px!important;
    }
    .login-container .el-input--small{
      height: 34px!important;
    }
    .login-container .el-input--small .el-input__inner{
      font-size: 12px!important;
      font-family: "宋体"!important;
    }
    .login-container .el-input--prefix .el-input__inner{
      padding-left: 15px!important;
      border:0;
      border-radius: 0 !important;
      border-bottom:1px solid #ddd;
    }
    .login-container .el-input__icon{
      font-size: 14px!important;
    }
    .login-container .el-input__prefix{
      left: 8px!important;
    }
    .el-button.el-button--primary{
      color: #fff;
      background-color: #316ddb!important;
      border-color: #316ddb!important;
    }
    .el-button.el-button--primary:focus, .el-button.el-button--primary:hover{
      background: #63baff!important;
      border-color: #63baff!important;
      color: #fff!important;
    }
  }
</style>
