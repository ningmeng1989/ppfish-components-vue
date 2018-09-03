<template>
  <div class="nav-menu" :class="{collapse: isCollapse}">
    <el-menu :router=true :collapse="isCollapse">
      <template v-for="(navOut, indexOut) in navMenu">
        <el-submenu :index="'' + indexOut" :key="navOut.id" class="custom-submenu" v-if="navOut.hasLeaf">
          <template slot="title">
            <el-menu-item :index="indexOut + '-0'" :route="{path: navOut.path}">
              <i :class="navOut.iconClass"></i>
              <span slot="title">{{ navOut.title }}</span>
            </el-menu-item>
          </template>
          <el-menu-item :index="indexOut + '-' + indexIn" :route="{path: navIn.path}"  v-for="(navIn, indexIn) in navOut.children" :key="navIn.id">
            <i :class="navIn.iconClass"></i>
            <span slot="title">{{ navIn.title }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="'' + indexOut" :key="navOut.id" :route="{path: navOut.path}" v-else>
          <i :class="navOut.iconClass"></i>
          <span slot="title">{{ navOut.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
    <!--<el-menu-->
      <!--:default-active="defaultRouter"-->
      <!--:default-openeds="submenuIndex"-->
      <!--:collapse="isCollapse"-->
      <!--router>-->
      <!--<navItem v-for="(item,index) in navMenu" :itemData="item" :level="index" :key="index"></navItem>-->
    <!--</el-menu>-->
  </div>
</template>

<script>
import frameApi from '@/fetch/frameApi'
// import navItem from '@/common/navMenu/navItem.vue'

export default {
  name: 'nav-menu',
  //  components: {
  //    navItem
  //  },
  props: ['isCollapse'],
  data () {
    return {
      navMenu: [],
      submenuIndex: [],
      defaultRouter: '/'
    }
  },
  created () {
    frameApi.GetNavMenu()
      .then(res => {
        this.navMenu = res.data.navMenu
      })
  },
  methods: {
  }
}
</script>

<style scoped>
.nav-menu, .nav-menu>.el-menu {
  height: 100%;
}
.nav-menu>.el-menu {
  overflow-y: auto;
  overflow-x: hidden;
  border-right: none;
}
.nav-menu.collapse>.el-menu {
  overflow-y: visible;
  overflow-x: visible;
}
.custom-submenu>div>li {
  padding-left: 0!important;
  min-width: 73px;
}
.custom-submenu>div>li:hover {
  background-color: transparent!important;
}
</style>
