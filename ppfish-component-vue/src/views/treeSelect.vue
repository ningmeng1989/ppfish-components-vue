<template>
  <div class="tree-select">
    <tree-select
      :multiple="multiple"
      :data="data"
      :default-selected-map="defaultSelectedMap"
      :selected-obj="selectedObj"
      @tree-on-select="handleGetSelected">
    </tree-select>
  </div>
</template>

<script>
import treeSelect from '@/components/treeSelect/index'

export default {
  name: 'index',
  components: {
    treeSelect
  },
  data () {
    return {
      multiple: true,
      data: [
        {
          text: '浙江',
          key: '232ddsds',
          values: [
            {
              text: '杭州',
              key: '232ddsd1',
              values: [
                {
                  text: '萧山',
                  key: 'kk12111',
                  values: []
                },
                {
                  text: '滨江',
                  key: 'kk12112',
                  values: []
                },
                {
                  text: '下沙',
                  key: 'kk12113',
                  values: []
                },
                {
                  text: '上城',
                  key: 'kk12114',
                  values: []
                }
              ]
            },
            {
              text: '温州',
              key: '232ddsd2',
              values: []
            },
            {
              text: '金华',
              key: '232ddsd3',
              values: []
            }
          ]
        },
        {
          text: '江西',
          key: '13232dad1',
          values: [
            {
              text: '南昌',
              key: '13232dad2',
              values: []
            },
            {
              text: '赣州',
              key: '13232dad3',
              values: []
            },
            {
              text: '合肥',
              key: '13232dad4',
              values: []
            }
          ]
        }
      ],
      defaultSelectedMap: {
        'kk12112': true,
        '13232dad2': true
      },
      selectedObj: null
      // selectedItems: [{text: '滨江', key: 'kk12112'}, {text: '南昌', key: '13232dad2'}]
    }
  },
  methods: {
    handleGetSelected (selectedItems, key, value) {
      console.log(selectedItems)
      console.log(key)
      console.log(value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
