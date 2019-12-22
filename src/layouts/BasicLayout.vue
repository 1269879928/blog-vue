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
  // background: #EEEEEE;
  // background: #F0F2F5;
  .el-backtop {
    -webkit-transition: all .5s;
    -o-transition: all .5s;
    -moz-transition: all .5s;
    transition: all .5s;
    z-index: 3;
    background: rgba(255, 255, 255, .9);
    color: #384548 !important;
    border-radius: .3rem;
  }
  .el-backtop:hover {
    background: rgba(255, 255, 255, .6);
    // background: #A9B7C6;
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
