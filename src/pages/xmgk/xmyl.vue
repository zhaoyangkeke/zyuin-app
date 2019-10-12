
<template>
  <div id="kgsqd" style="height: 100%" >
    <div class="header">
      <span class="headerTit">项目总览</span>
      <xmylChart></xmylChart>
    </div>
  </div>
</template>

<script>
  import xmylChart from '../../components/xmylEcharts.vue'
  export default {
    components: {xmylChart},
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
