<template>
  <div id="app">
    <Nav />
    <router-view></router-view>
    <Footer />
    <el-backtop></el-backtop>
    <div class="shade"></div>
  </div>
</template>
<script>
import Nav from '../components/header/Nav'
import Footer from '../components/Footer'
export default {
  components: {
    Nav,
    Footer
    // Content
  }
}
</script>

<style lang="scss" scoped>
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI" ,Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "NotoColor Emoji" ;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0; margin: 0;
  // background: #F3F3EF;
  background: #EEEEEE;
  // background: #F0F2F5;
  // background: rgba($color: #ffffff, $alpha: .5)
  .el-backtop {
    z-index: 3;
    background: rgba(255, 255, 255, .9);
    color: #384548 !important;
    border-radius: .3rem;
  }
  .shade {
    // width: 100%;
    // height: 100%;
    // background: rgba(255, 255, 255, .8);
    // position: fixed;
    // top: 0;
    // left: 0;
    // z-index: 2;
  }
}

</style>
