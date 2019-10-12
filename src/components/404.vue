<template>
    <div id="main">
<div class="point floatL">
        <div class="expression">
            ε(┬┬﹏┬┬)3
        </div>
        <div class="error_text">
            404
        </div>
        <div class="text">
            页面找不到了
        </div>
        <div class="return">
            <a href="javascript:void(0)" @click="goback">返回上一级</a >
        </div>
        <!--跟随footer-->
        
    </div>
    </div>
</template>
<script>
export default {
    methods:{
        goback(){
            this.$router.go(-1)
        }
    }
}
</script>
 
 <style lang="scss" scoped>
 
 #main .point {
     margin-top: 50px;
    text-align: center;
    width: 100%;
    color: #5c5c5c;
}
 #main .point .expression {
    font-size: 48px;
    line-height: 50px;
    margin-bottom: 50px;
}
#main .point .error_text {
    font-size: 64px;
    line-height: 80px;
}
#main .point .text {
    font-size: 36px;
    line-height: 72px;
    font-weight: 700;
}
#main .point .return {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: 0;
}
 </style>
 