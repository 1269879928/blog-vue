<template>
  <div class="mt-3">
    <div class="container mt-5">
      <div class="row">
        <div  class="col-12 col-sm-9 pr-sm-3 home pl-0">
          <router-view></router-view>
        </div>
        <Sidebar></Sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/sidebar/Sidebar'
export default {
  name: 'ContentLayout',
  components: {
    Sidebar
  },
  created () {
    // console.log('status1', this.status)
  },
  computed: {
    getStatus () {
      let status = this.$store.state.contentLoader.showContent
      console.log('status', status)
      return status
    }
  }
}
</script>

<style  lang="less" scoped>
.container {
  padding: 0;
}
</style>
