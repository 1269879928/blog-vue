<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="site">
            <h1>
              shijting的个人站点
              <small>分享我的编程心得,记录了我的后端工程师学习历程</small>
            </h1>
          </div>
        </div>
      </div>
  </div>
  </main>
</template>

<script>
export default {
  name: 'top'
}
</script>

<style lang="less" scoped>
main {
  height: 75px;
  background-color: #2e3641;
  text-align: left;
  display: flex;
  align-items: center;
}
.container {
  padding: 0;
}
.site {
   color: white;
   line-height: 75px;
   h1 {
     font-size: 28px;
     overflow: hidden;
     display: flex;
     flex-direction: row;
     align-items: center;
     small { color: silver; font-size: 15px; padding-left: .8rem}
   }
}
@media screen and (max-width: 900px) {
  main {
    display: none;
  }
}
</style>
