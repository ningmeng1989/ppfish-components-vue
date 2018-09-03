<template>
  <div v-if="pane.visible" class="m-tree-select-depth" ref="pane" :class="[mTreeSelectDepthClass, zWithoutScrollbarFlg ? 'z-without-scrollbar' : '']">
    <div v-for="item in pane.items" :key="item.key" class="clearfix m-tree-select-item" :class="{'current': item.current && item.key !== 'select-all'}">
      <el-checkbox v-model="item.selected" :indeterminate="item.indeterminate" @change="setSelected($event, item.key)"></el-checkbox>
      <div class="m-tree-select-text" @click="setCurrent(item.key)">{{ item.text }}</div>
      <tree-select-more :has-sub-item="!!item.children && item.key !== 'select-all'" @tree-select-more-click="setCurrent(item.key)"></tree-select-more>
    </div>
  </div>
</template>

<script>
import treeSelectMore from './treeSelectMore'

export default {
  name: 'tree-pane',
  components: {
    treeSelectMore
  },
  props: {
    pane: Object,
    depth: Number
  },
  data () {
    return {
      zWithoutScrollbarFlg: false
    }
  },
  computed: {
    mTreeSelectDepthClass: function () {
      return 'm-tree-select-depth' + this.depth
    }
  },
  mounted () {
    this.addClsIfNeed()
  },
  updated () {
    this.addClsIfNeed()
  },
  methods: {
    addClsIfNeed () {
      const pane = this.$refs.pane
      if (pane && (pane.scrollHeight <= pane.clientHeight)) {
        this.zWithoutScrollbarFlg = true
      }
    },
    setSelected (value, key) {
      this.$emit('tree-pane-on-select', key, value)
    },
    setCurrent (key) {
      this.$emit('tree-pane-on-current', key)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-tree-select-depth {
  flex: 1;
  margin-left: -1px;
  overflow-y: auto;
}
.m-tree-select-depth.z-without-scrollbar {
  border-left: 1px solid #dedede;
}
.m-tree-select-item {
  display: flex;
  padding: 0 20px;
  height: 50px;
  line-height: 50px;
  border-left: 1px solid #dedede;
  border-right: 1px solid #dedede;
  cursor: pointer;
}
.m-tree-select-item.current {
  background-color: #f7f8fa;
}
.m-tree-select-depth.z-without-scrollbar .m-tree-select-item {
  border-left: none;
  border-right: none;
}
.m-tree-select-text {
  margin-left: 8px;
  flex: 1;
}
</style>
