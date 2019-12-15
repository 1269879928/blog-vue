<template>
  <div class="container">
    <h1>404 page </h1>
    <small>开发中..... </small>
    <div class="content">
      <button class="btn" @click="back()">返回上一页</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
