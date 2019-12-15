<template>
  <div id="app" ref="app">
    <Loading v-if="getLoadStatus" />
    <!-- <transition mode="out-in"> -->
    <transition name="fade">
      <router-view  v-show="showRouteView"/>
    </transition>
  </div>
</template>
<script>
import Loading from './views/Loading'
export default {
  data () {
    return {
      showRouteView: false
    }
  },
  components: {
    Loading
  },
  computed: {
    getLoadStatus () {
      const status = this.$store.state.loader.showLoadingPage
      this.toggleLoadStatus(status)
      return status
    }
  },
  methods: {
    toggleLoadStatus (status) {
      if (!status) {
        setTimeout(() => { // 为了加载状态结束后有100ms的空白过渡
          this.showRouteView = true
        }, 100)
      } else {
        this.showRouteView = false
      }
    }
  }
}
</script>

<style lang="scss">
html {
  // font-family: -apple-system, BlinkMacSystemFont, "Segoe UI" ,Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "NotoColor Emoji" ;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
  // 页面出现滚动条的时候让滚动条不影响页面宽度
  overflow-y: scroll;
  overflow-x: hidden;
  // overflow-y:hidden;
  // position: relative;
}
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  color: #636b6f;
  // padding: 0; margin: 0;
  // background: #F3F3EF;
  // background: #EEE;
  // background: #F0F2F5;
    // background-image: url('./assets/bg/bg-9.jpg');
    // background-size: cover;
    .bg-content {
      background: rgba(255, 255, 255, 1);
    }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}

</style>
