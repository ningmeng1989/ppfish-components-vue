<template>
  <div class="m-tree-select-container">
    <tree-pane v-for="(pane, i) in paneArr"
     :key="i"
     :pane="pane"
     :depth="i"
     @tree-pane-on-select="handlePaneSelect"
     @tree-pane-on-current="handlePaneCurrent">
    </tree-pane>
  </div>
</template>

<script>
import treePane from './treePane'

// 树面板class对象
class Pane {
  constructor (parent, items) {
    this.parent = parent
    this.items = items
    this.visible = false
    this.cache = {}
  }
  setItems (items) {
    this.items = items
  }
  setVisible (visible) {
    this.visible = visible
  }
  // 设置默认显示的pane
  setDefaultVisible (key) {
    const item = this.getItemByKey(key)
    if (item) {
      item.setPanelBackVisible()
      // 没有匹配到key，显示第一级
    } else {
      this.setVisible(true)
    }
  }

  getItemByKey (key) {
    const cacheItem = this.cache[key]
    if (cacheItem) {
      // componentLog(`从cache中匹配到key：${key}`, cacheItem);
      return cacheItem
    }
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      if (item.key === key) {
        // componentLog(`匹配到key：${key}`, item);
        this.cache[key] = item
        return item
      }
      if (item.children) {
        const result = item.children.getItemByKey(key)
        if (result) {
          return result
        }
      }
    }
    return null
  }

  // 单选Item，往后遍历全选其子树，往前遍历设置父树勾选状态
  setItemSelected (key, value) {
    const item = this.getItemByKey(key)
    if (item) {
      item.setSelected(value, false)
      item.setForwardSelected(value)
      if (item.pane) {
        item.pane.setItemBackSelected()
      }
    }
  }

  // 全选Item
  setAllItemSelected (checked) {
    const items = this.items
    if (!items) {
      return
    }
    items.forEach(it => {
      this.setItemSelected(it.key, checked)
    })
  }

  // 往前遍历设置父树勾选状态，检查当前层级节点是否全部选中/全不选/部分选中，修改上一级勾选状态
  setItemBackSelected (indeterminate) {
    const parent = this.parent
    if (!parent) {
      return
    }
    const countLen = (items, key) => {
      return items.reduce((sum, item) => {
        return (item[key] ? 1 : 0) + sum
      }, 0)
    }
    // 不传indeterminate时，执行计算
    if (typeof indeterminate === 'undefined') {
      const selectedLen = countLen(this.items, 'selected')
      const indeterminateLen = countLen(this.items, 'indeterminate')
      // 全选
      if (selectedLen === this.items.length) {
        parent.setSelected(true, false)
        // 遍历父树检查
        parent.pane.setItemBackSelected()
        // 全不选
      } else if (indeterminateLen === 0 && selectedLen === 0) {
        parent.setSelected(false, false)
        // 遍历父树全不选
        parent.pane.setItemBackSelected()
        // 部分选中
      } else {
        parent.setSelected(false, true)
        // 遍历父树部分选中
        parent.pane.setItemBackSelected(true)
      }
      // 跳过计算，直接循环遍历部分选中
    } else {
      parent.setSelected(false, true)
      parent.pane.setItemBackSelected(true)
    }
  }

  // 设置Item选中状态，设置子树显示状态
  setItemCurrent (key) {
    if (!key) {
      return
    }
    const item = this.getItemByKey(key)
    if (item) {
      // 设置Item选中状态
      item.pane.items.forEach(it => it.setCurrent(false))
      item.setCurrent(true)
      // 设置子树显示状态
      item.pane.setForwardVisible(false)
      if (item.children) {
        item.children.setVisible(true)
      }
    }
  }

  // 往后遍历设置显示状态
  setForwardVisible (visible) {
    const items = this.items
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.children) {
          item.children.setVisible(visible)
          item.children.setForwardVisible(visible)
        }
      }
    }
  }

  // 获取当前选中的值
  getSelected (returned = []) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      // 全选
      if (item.selected) {
        // componentLog(`找到勾选项目：${item.selected}`, item.key);
        returned.push(item)
        // 部分选中
      } else if (item.indeterminate) {
        if (item.children) {
          item.children.getSelected(returned)
        }
        // 全不选
      } else {
        // do nothing
      }
    }
    return returned
  }
}

// 树项目class对象
class Item {
  constructor (children, pane, key, text) {
    this.children = children // Pane
    this.pane = pane // Pane
    this.selected = false
    this.indeterminate = false
    this.key = key
    this.text = text
    this.current = false
  }

  setChildren (children) {
    this.children = children
  }

  setSelected (value, indeterminate) {
    this.selected = value
    this.indeterminate = indeterminate
  }

  setCurrent (value) {
    this.current = value
  }

  // 往前遍历设置面板显示状态
  setPanelBackVisible () {
    this.pane.setVisible(true)
    if (this.pane.parent) {
      this.pane.parent.setPanelBackVisible()
    }
  }

  // 往后遍历全选其子树
  setForwardSelected (value) {
    const pane = this.children
    if (!pane) {
      return
    }
    for (let i = 0; i < pane.items.length; i++) {
      const item = pane.items[i]
      item.setSelected(value, false)
      item.setForwardSelected(value)
    }
  }
}
// 实例化根树
const createPane = (tree, parentItem = null) => {
  const items = []
  // items后面设置
  const pane = new Pane(parentItem, null)
  for (let i = 0; i < tree.length; i++) {
    const treeI = tree[i]
    // children后面设置
    const item = new Item(null, pane, treeI.key, treeI.text)
    if (treeI.values && treeI.values.length) {
      const nextPane = createPane(treeI.values, item)
      // 设置children
      item.setChildren(nextPane)
    }
    // 设置items
    items.push(item)
  }
  pane.setItems(items)
  return pane
}
// 分组成适合UI展示的多维数组结构
const generatePaneArr = (pane, depth = 0, returned = []) => {
  if (pane) {
    returned[depth] = returned[depth] || []
    returned[depth].push(pane)
  }
  if (pane.items) {
    for (let i = 0; i < pane.items.length; i++) {
      let item = pane.items[i]
      if (item.children) {
        depth++
        generatePaneArr(item.children, depth, returned)
        depth--
      }
    }
  }
  return returned
}

const generatePaneArrPlat = (pane) => {
  let generatedPaneArrOrign = generatePaneArr(pane)
  let generatedPaneArr = []

  if (generatedPaneArrOrign.length > 2) {
    generatedPaneArr[0] = []
    generatedPaneArr[0][0] = {
      visible: true,
      items: [generatedPaneArrOrign[0][0].items[0]]
    }
    for (let i = 0; i < generatedPaneArrOrign[1][0].items.length; i++) {
      generatedPaneArr[0][0].items.push(generatedPaneArrOrign[1][0].items[i])
    }
    for (let i = 2; i < generatedPaneArrOrign.length; i++) {
      generatedPaneArr[i - 1] = generatedPaneArrOrign[i]
    }
    // generatedPaneArr[1] = generatedPaneArrOrign[2]
  } else {
    generatedPaneArr = generatedPaneArrOrign
  }

  let result = []
  for (let i = 0; i < generatedPaneArr.length; i++) {
    for (let j = 0; j < generatedPaneArr[i].length; j++) {
      if (generatedPaneArr[i][j].visible) {
        result.push(generatedPaneArr[i][j])
      }
    }
  }
  return result
}

export default {
  name: 'tree-select',
  components: {
    treePane
  },
  props: {
    data: Array,
    defaultSelectedMap: [Boolean, Object],
    selectedObj: [Boolean, Object],
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      pane: undefined,
      paneArr: []
    }
  },
  created () {
    this.initTreeSelect()
  },
  watch: {
    data: function () {
      this.initTreeSelect()
    },
    selectedObj: {
      handler (newSelectedObj, oldSelectedObj) {
        this.setItemSelectedByKeys(this.pane, newSelectedObj)
      },
      deep: true
    }
  },
  methods: {
    initTreeSelect () {
      this.pane = createPane([{
        key: 'select-all',
        text: '全部',
        values: this.data
      }])
      let firstKey
      if (typeof this.defaultSelectedMap === 'object') {
        firstKey = Object.keys(this.defaultSelectedMap)[0]
      }
      // 设置默认勾选状态
      this.setItemSelectedByKeys(this.pane, this.defaultSelectedMap)
      // 设置面板显示状态
      this.pane.setDefaultVisible(firstKey)
      this.pane.setItemCurrent(firstKey)

      this.paneArr = generatePaneArrPlat(this.pane)
    },
    setItemSelectedByKeys (pane, selectedObj) {
      if (typeof selectedObj === 'object') {
        for (let key in selectedObj) {
          pane.setItemSelected(key, selectedObj[key])
        }
        // 全选
      } else if (selectedObj) {
        pane.setAllItemSelected(true)
        // 全不选
      } else {
        pane.setAllItemSelected(false)
      }
      return pane
    },
    handlePaneSelect (key, value) {
      this.pane.setItemSelected(key, value)
      this.pane.setItemCurrent(key)
      this.$emit('tree-on-select', this.pane.getSelected(), key, value)
      this.paneArr = generatePaneArrPlat(this.pane)
    },
    handlePaneCurrent (key) {
      this.pane.setItemCurrent(key)

      this.paneArr = generatePaneArrPlat(this.pane)
    },
    clearSelected () {
      this.initTreeSelect()
      //        this.pane.setAllItemSelected(false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-tree-select-container {
   display: flex;
   border: 1px solid #DEDEDE;
   max-height: 400px;
}
</style>
