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
  background: #F0F2F5;
    // background-image: url('./assets/bg/bg-9.jpg');
    // background-size: cover;
    .bg-content {
      background: rgba(255, 255, 255, 1);
    }
  .my-mt {
    // position: absolute;
    // top: 4rem;
    // left: 0;
    // right: 0;
    // bottom: 0;
    margin-top: 2.2rem;
  }
  .my-pt {
    padding-top: 2rem;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  // 首页骨架
  .index-content {
    .ant-skeleton-header {
      // display: flex;
      // flex-direction: row;
      // align-items: center;
      span {
        margin-top: 2.4rem;
        width: 12.5rem;
        height: 7.6rem;
        border-radius: .2rem;
      }
    }
    .ant-skeleton-content {
      .ant-skeleton-title {
        width: 130% !important;
        margin-left: -13.5rem;
        margin-top: 6px;
      }
      .ant-skeleton-paragraph {
        margin-top: 1rem;
        margin-left: -2.3rem;
        text-align: right;
        li:last-child {
          margin-left: 14.7rem;
        }
      }
    }
  }
  // 详情页骨架
  .detail-skeleton {
    .ant-skeleton {
      .ant-skeleton-paragraph {
        margin-left: -40px;
      }
    }
  }
}

</style>
