<template>
  <div id="liucheng">
    <div class="second_content">
      <!--<div style="width:100%;height:4px;background-color: #c0cad6;"></div>-->
      <div class="second_center" style="width: 100%;overflow-x:hidden;">
        <div style="position:relative;">
          <p class="tabAreaTit" style="width: 100%;height: 46px;background-color: #F6F6F6;padding-left: 15px;line-height: 46px">
            <span >{{parentData.bigTitle}}</span>
          </p>
        </div>
        <div style="padding-left: 31px;">
          <!--{{parentData}}-->
          <p class="addJLD" v-for="(item,itemval) in parentData.firstObj" :key="item">
            <span class="inputlabel">{{itemval}} ：</span><span>{{item}}</span>
          </p>
        </div>
        <div class="eiconsty" style="padding-left: 16px;">
          <span class="iconfont icon-zhifuguanli" style="font-size: 12px;padding-right: 10px;"></span><span v-if="parentData.subTitle != ''">{{parentData.subTitle}}</span>
        </div>
        <div style="padding-left: 31px;">
          <p class="addJLD" v-for="(item,itemval) in parentData.secondObj" :key="item">
            <span class="inputlabel">{{itemval}} ：</span><span>{{item}}</span>
          </p>
        </div>
        <!--<div style="width:100%;margin-left: 0;margin-right: 0px;padding-left: 0px; padding-right: 0px;height:4px;background-color: #c0cad6;"></div>-->
        <!--维修记录-->
        <div class="eiconsty"  style="padding-left: 16px;">
          <span class="iconfont icon-sanjiaoxing" style="font-size: 13px;padding-left: 10px;" @click="isShowwxcontent = true" v-if="isShowwxcontent === false"></span>
          <span class="iconfont icon-sanjiao01" style="font-size: 13px;padding-left: 10px;" @click="isShowwxcontent = false" v-if="isShowwxcontent === true"></span>
          <span v-if="parentData.zbTitle != ''">{{parentData.zbTitle}}</span>
        </div>
        <!--维修记录子表内容-->

        <div class="wxtabArea" style="padding-left: 15px;" v-show="isShowwxcontent">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="item"  v-for="(item, index) in parentData.tab" :name="'first'+ index" :key="index"></el-tab-pane>
          </el-tabs>
          <!--{{parentData.listArr}}-->
          <div style="padding-left: 15px;">
            <div v-for="(item, index) in parentData.listArr" :key="index" style="font-size:0;margin-bottom: 15px;border-bottom: 1px solid #f1f4f7;">
              <p class="addJLD" v-for="(keys, val) in item" :key="val" v-if="val != 'ID'">{{val}} ：<span>{{keys}}</span></p>
              <p class="addJLD">施工前照片 ：<span>1</span></p>
              <p class="addJLD">施工中照片 ：<span>1</span></p>
              <p class="addJLD">施工后照片 ：<span>1</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    props:{
      'parentData': Object
    },
    data () {
      return {
        isShowwxcontent: false,
        activeName: 'first0',
        listDataArr: []
      }
    },
    watch: {
      parentData:{
        handler (val) {
          console.log(val, '监听值')
        },
        deep: true
      }
    },
    methods: {
      handleClick (val) {
        console.log(val,11)
        if (val) {
          this.parentData.listArr = this.parentData.tabList[val.index]
          console.log(this.parentData.listArr,789)
        }
      },
      // 通过fileId获取上传过的照片
      getFilesDataById (paramId) {
        this.$api.getFilesDataById2({id: paramId}).then(res => {
          if (res.code !== 1) {
            this.$message({
              message: '网络错误',
              type: 'error'
            })
          } else {
            console.log(res.data)
            if (res.data && res.data.length) {
              this.beforeImg = []
              this.duringImg = []
              this.afterImg = []
              for (var i=0; i<res.data.length;i++) {
                if (res.data[i].file_mjlx == '3001' && paramId == res.data[i].file_id) {
                  this.beforeImg.push(res.data[i].file_path)
                } else if(res.data[i].file_mjlx == '3002' && paramId == res.data[i].file_id) {
                  // debugger
                  this.duringImg.push(res.data[i].file_path)
                } else {
                  this.afterImg.push(res.data[i].file_path)
                }
              }
              console.log(this.beforeImg, this.duringImg, this.afterImg, 700700)
            }
          }
        }).catch(e => {
          console.log(e)})
      },
    },
    mounted() {
      console.log(this.parentData, 24)
      if (this.parentData.listArr && this.parentData.listArr.length !==0) {
        for (var i = 0; i < this.parentData.listArr.length; i++) {
          this.getFilesDataById(this.parentData.listArr.ID)
        }
      }
    }
  }
</script>
<style lang="scss">
  #liucheng{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .headerTit{
      i{
        font-weight: bold;
        font-size: 16px;
        color: #111;
        cursor: pointer;
      }
    }
    .second_content{
      .second_top{
        padding: 5px 15px;
        display: flex;
        justify-content: space-between;
        .liuchengLeft{
          display: flex;
          align-items: center;
          .Itmes{
            margin-right: 10px;
            .icon-duigou, .icon-user{
              color: #2b47bd;
              font-size: 20px;
              margin-right: 5px;
            }
            .line{
              display: inline-block;
              vertical-align: middle;
              width:51px;
              height: 2px;
              background-color: #2b47bd;
            }
            .dateg{
              color:#999;
              .yj{
                color:#2b47bd;
                border-bottom: 1px solid;
                cursor: pointer;
              }
            }
          }
        }
        .liuchengRight{
          position: relative;
          width: 35%;
          margin-right: 20px;
          .xianzhi{
            position: absolute;
            top: 22px;
            right: 15px;
          }
          textarea{
            width: 100%;
            resize: none;
            padding-left: 5px;
          }
        }
      }
      .second_center{
        .eiconsty{
          padding-right: 10px;
          height: 16px;
          margin-top: 20px;
          margin-bottom: 20px;
          line-height: 16px;
          font-size: 12px;
        }
      }

    }
    .third_content{
      padding: 0 15px;
      .third_tit{
        display: flex;
        justify-content: space-between;
        padding:10px 15px;
        .hoverSt,.hoverSt i{
          font-size: 12px;
          color: #fff;
        }
        .hoverSt:hover,.hoverSt i:hover{
          color:red;
        }
      }
    }
    .conter_table{

      .searchLeft{
        display: flex;
        vertical-align: middle;
        /*margin-top: 10px;*/
        height: 40px;
        line-height: 40px;
        font-size: 13px;
        background: #f7f9fb;
        #selectColor,#selectColor2{
          color:red;
        }
        .currentState{
          display: inline-block;
          cursor: pointer;
          padding-right: 10px;
          color: #555;
          height: 19px;
          line-height: 19px;
          margin-right: 10px;
          border-right: 2px solid #999;
        }
        .currentState:last-child{
          border-right: 0 !important;
        }
        .htTypeList{
          padding-left: 100px;
        }
      }
    }
  }
</style>
