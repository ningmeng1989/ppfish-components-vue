<template>
  <div class="w-header">
    <el-row>
      <el-col :span="18">
        <img alt="logo" src="../../assets/images/logo.png">
      </el-col>
      <el-col :span="6" class="tip">
        组件
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'w-header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.w-header {
  background: #fff;
}
img {
  display: block;
  height: 40px;
  margin: 20px 0 20px 60px;
}
.tip {
  font-size: 16px;
  line-height: 80px;
  font-weight: 400;
  text-align: center;
}
</style>
