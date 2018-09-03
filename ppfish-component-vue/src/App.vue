<template>
  <div id="app">
    <wHeader></wHeader>
    <el-row class="app-body">
      <el-col :span="5">
        <navMenu :is-collpase="navCollapse"></navMenu>
      </el-col>
      <el-col :span="19">
        <div class="router-body">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import wHeader from '@/common/header/index.vue'
import navMenu from '@/common/navMenu/index.vue'
export default {
  name: 'app',
  components: {
    wHeader,
    navMenu
  },
  data () {
    return {
      navCollapse: false
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import "./assets/scss/vars.scss";
html, body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #F5F7FA;
  .app-body {
    margin: 24px 60px;
    background: #fff;
    .router-body {
      border-left: 1px solid $border-color;
      min-height: 500px;
      padding: 24px;
    }
  }
}
</style>
