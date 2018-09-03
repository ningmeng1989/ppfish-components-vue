<template>
  <span v-if="visible">
    {{ currentVal }}
  </span>
</template>

<script>
  const thousandSplit = (str, format = ',') => {
    if (typeof str !== 'number') return str
    return ('' + str).replace(/(?!^)(?=([0-9]{3})+$)/g, `${format}`)
  }

  export default {
    name: 'number-counter',
    props: {
      value: {
        type: Number,
        default: 0
      },
      timeout: {
        type: Number,
        default: 500
      },
      steps: {
        type: Number,
        default: 10
      },
      commas: {
        type: Boolean,
        default: true
      },
      visible: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        _interval: undefined,
        currentVal: 0,
        originalVal: 0,
        targetVal: 0,
        currentStep: 0
      }
    },
    created () {
      this.currentVal = this.value
      this.originalVal = this.value
      this.targetVal = this.value
    },
    watch: {
      value: function (newVal, oldVal) {
        this.currentStep = 0
//        this.originalVal = this.currentVal
        this.originalVal = oldVal
        this.targetVal = newVal

        clearInterval(this._interval)

        let _this = this
        let timeInterval = this.timeout / this.steps
        this._interval = setInterval(() => {
          if (_this.currentStep >= _this.steps) {
            clearInterval(_this._interval)
          }
          let tempVal = Math.round(_this.getValue(_this.currentStep / _this.steps))
          if (_this.commas) {
            tempVal = thousandSplit(tempVal)
          }
          _this.currentVal = tempVal
          _this.currentStep++
        }, timeInterval)
      }
    },
    beforeDestroy () {
      clearInterval(this._interval)
    },
    methods: {
      getValue (percent) {
        const diff = this.targetVal - this.originalVal
        return this.originalVal + (diff * percent)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
