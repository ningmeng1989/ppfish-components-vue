<template>
  <div class="quick-loc-wrap" :class="{'active': quickLocActive}" @mouseover="mouseover" @mouseout="mouseout">
    <ul>
      <li v-for="(item, $index) in quickLocData" @click="quickLoc(item.elId, $index, item.title)" :class="{'active': currentIndex === $index}">{{ item.title }}</li>
    </ul>
    <i class="quick-loc-toggle iconfont icon-zhankaiIcon" @click="toggle"></i>
  </div>
</template>

<script>
  export default {
    name: 'quick-loc',
    props: {
      logTitle: {
        type: String
      },
      quickLocData: {
        type: Array
      },
      scrollBodyId: {
        type: String
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
    },
    data () {
      return {
        currentIndex: 0,
        quickLocActive: false,
        scrollBody: undefined,
        liClickOccupied: false,
        toggleOccupied: false
      }
    },
    mounted () {
      this.scrollBody = document.querySelector('#' + this.scrollBodyId)
      this.scrollBody.addEventListener('scroll', this.bindScroll)
    },
    beforeDestroy () {
      this.scrollBody.removeEventListener('scroll', this.bindScroll)
    },
    methods: {
      //
      bindScroll () {
        this.quickLocActive = true
        let posEls = document.querySelectorAll('.quick-loc-item')
        // 如果有外部的组件需要组件滚动的距离
        if (this.listenScroll) {
          this.$emit('scroll-change', this.scrollBody.scrollTop)
        }
        if (this.liClickOccupied) {
          return
        }
        for (let i = (posEls.length - 1); i >= 0; i--) {
          if (posEls[i].offsetTop - this.scrollBody.scrollTop - this.scrollBody.clientHeight < -30) {
            this.currentIndex = i >= 0 ? i : 0
            break
          }
        }
        window.clearTimeout(this.scrollTimeout)
        this.scrollTimeout = setTimeout(() => {
          this.quickLocActive = false
        }, 3000)
      },
      quickLoc (elId, index, title) {
        let el = document.querySelector('#' + elId)
        let top = el.offsetTop
        this.scrollBody.scrollTop = top - 60
        this.currentIndex = index
        this.liClickOccupied = true
        setTimeout(() => {
          this.liClickOccupied = false
        }, 1000)
      },
      mouseover () {
        if (this.toggleOccupied) {
          return
        }
        window.clearTimeout(this.scrollTimeout)
        this.quickLocActive = true
      },
      mouseout () {
        window.clearTimeout(this.scrollTimeout)
        this.scrollTimeout = setTimeout(() => {
          this.quickLocActive = false
        }, 3000)
      },
      toggle () {
        this.quickLocActive = !this.quickLocActive
        this.toggleOccupied = true
        setTimeout(() => {
          this.toggleOccupied = false
        }, 2000)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul, li {
  list-style: none;
}
ul {
  background: #fff;
  box-shadow: inset 0 -1px 0 0 #EBEBEB;
  border: 1px solid #F5F5F5;
}
.quick-loc-wrap {
  position: fixed;
  right: -132px;
  top: 50%;
  transform: translateY(-50%);
  width: 164px;
  padding-left: 32px;
  transition: right 1s;
  z-index: 3000;
  box-sizing: border-box;
}
.quick-loc-wrap.active {
  right: 0;
}
.quick-loc-wrap .quick-loc-toggle {
  cursor: pointer;
  position: absolute;
  z-index: -1;
  left: 8px;
  top: 50%;
  margin-top: -16px;
  width: 24px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border: 1px solid #F5F5F5;
  background: #fff;
  box-shadow: 0 0 16px 0 rgba(0,0,0,0.04);
  color: #03A9F5;
}
.quick-loc-wrap.active .quick-loc-toggle {
  transform: rotate(180deg);
}
.quick-loc-wrap li {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  padding-left: 28px;
  padding-right: 22px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.quick-loc-wrap li.active {
  color: #03A9F5;
  position: relative;
  font-weight: bold;
}
.quick-loc-wrap li.active:before {
  position: absolute;
  top: 13px;
  left: 16px;
  content: '';
  width: 4px;
  height: 4px;
  background: #03A9F5;
  border-radius: 50%;
}
</style>
