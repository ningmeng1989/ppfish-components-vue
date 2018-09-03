<template>
  <div class="content-wrap">
    <div class="route-view-area">
      <el-form ref="numberValidateForm" label-width="150px" class="demo-ruleForm">
        <el-form-item
            label="请输入一个数字"
            prop="age"
            :rules="[
            { type: 'number', message: '年龄必须为数字值'}
          ]">
          <el-input type="age" v-model.number="inputValue" auto-complete="off" @keyup.enter.native="submit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
        <input style='display:none'/>
      </el-form>
      <number-counter class="number"
        :value="displayValue"
        :commas="commas"
        :timeout="timeout"
        :steps="steps">
      </number-counter>
    </div>
  </div>
</template>

<script>
  import numberCounter from '@/components/numberCounter/index'

  export default {
    name: 'index',
    components: {
      numberCounter
    },
    data () {
      return {
        commas: true,
        timeout: 500,
        steps: 10,
        inputValue: 0,
        displayValue: 0
      }
    },
//    computed: {
//      displayValue: function () {
//        return parseInt(this.inputValue, 10) || 0
//      }
//    },
    methods: {
      submit () {
        this.displayValue = parseInt(this.inputValue, 10) || 0
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .number {
    font-size: 200px;
    text-align: center;
    margin-left: 150px;
  }
</style>
