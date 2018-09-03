<template>
  <el-submenu :index="itemData.id" v-if="hasChild" class="nav-submenu">
    <template  slot="title">
      <span class="icon-space"><i class="iconfont" :class="itemData.iconClass"></i></span>
      <span class="text-space">{{ itemData.title }}</span>
    </template>
    <nav-item v-for="(currData,index) in itemData.children" :itemData="currData" :key="currData.id"></nav-item>
  </el-submenu>
  
  <el-menu-item :index="itemData.path" v-else class="nav-item">
    <span class="icon-space"><i class="iconfont" :class="itemData.iconClass"></i></span>
    <span class="text-space">{{itemData.title}}</span>
  </el-menu-item>
</template>

<script>
import navItem from '@/common/navMenu/navItem.vue'

export default {
  name: 'nav-item',
  components: {
    navItem
  },
  props: ['itemData', 'level'],
  computed: {
    hasChild () {
      let children = this.itemData.children
      if (children == null) {
        return false
      } else {
        return true
      }
    }
  },
  mounted () {
//      if (this.hasChild) {
//        let navSubmenus = document.querySelectorAll('.nav-menu .el-submenu__title')
//        for (let i = 0; i < navSubmenus.length; i++) {
//          navSubmenus[i].style.lineHeight = '40px'
//          navSubmenus[i].style.height = '40px'
//          navSubmenus[i].style.paddingLeft = '16px'
//        }
//        let navArrowDownIcon = document.querySelectorAll('.nav-menu .el-submenu__icon-arrow')
//        for (let i = 0; i < navArrowDownIcon.length; i++) {
//          navArrowDownIcon[i].style.marginTop = '-5px'
//        }
//        // 将submenu的index传给父组件，用于默认展开
//        this.$emit('getSubmenuIndex', this.itemData.id)
//      }
  },
  methods: {
//      navItemClickFn () {
//        if (this.$el.className.indexOf('is-active') === -1) {
//          let contentCol = document.querySelector('.content-col')
//          contentCol.scrollTop = 0
//        }
//      }
  }
}
</script>

<style scoped>
  .nav-submenu {
    line-height: 40px;
    padding: 0;
  }
  .nav-submenu div {
    line-height: 40px;
  }
  .nav-submenu i {
    margin-top: -5px;
  }
  .nav-item {
    height: 40px;
    line-height: 40px;
    color: #d9dbde;
  }
  .nav-item {
    padding: 0 0 0 16px !important;
  }
  .nav-item:hover,
  .el-submenu__title:hover {
    background-color: #03a9f5 !important;
    color: #fff !important;
  }
  .nav-item:hover i,
  .el-submenu__title:hover i {
    color: #fff;
  }
  .nav-item .icon-space,
  .nav-submenu .icon-space {
    display: inline-block;
    width: 16px;
    height: 40px;
  }
  .nav-item .text-space,
  .nav-submenu .text-space {
    display: inline-block;
    margin-left: 5px;
  }
  .is-active {
    background-color: #03a9f5 !important;
    color: #fff !important;
  }
</style>
