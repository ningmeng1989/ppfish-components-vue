<template>
  <div class="m-tree-select-more" :class="{'m-tree-select-more-empty': !hasSubItem}" @click="onClick">
    <i v-if="hasSubItem" class="el-icon-arrow-right"></i>
  </div>
</template>

<script>
export default {
  name: 'tree-select-more',
  props: {
    hasSubItem: Boolean
  },
  methods: {
    onClick () {
      if (this.hasSubItem) {
        this.$emit('tree-select-more-click')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-icon-arrow-right {
  font-size: 8px;
  color: #999;
}
</style>
