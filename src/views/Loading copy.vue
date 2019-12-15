<template>
  <div class="content bg-white">
    <div class="spinner">
      <div class="rounded"></div>
      <div class="rounded"></div>
      <div class="rounded"></div>
      <div class="rounded"></div>
      <div class="rounded"></div>
      <div class="rounded"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style lang="less" scoped>
body {
  background: white !important;
}
.content{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
}
.spinner {
  margin: 12rem auto;
  // width: 4.125rem;
  width: 5.125rem;
  text-align: center;
  display: flex;
  div {
    background: #16a085;
    // width: .3125rem;
    // height: 6.25rem;
    width: .5rem;
    height: 4rem;
    margin-right: 0.4rem;
    animation: loading 1.2s infinite ease-in-out;
  }
  div:nth-child(2) {
    background: #5cace2;
    animation-delay: -1.1s;
  }
  div:nth-child(3) {
    background: #ae79c4;
    animation-delay: -1s;
  }
  div:nth-child(4) {
    background: #ec6f62;
    animation-delay: -0.9s;
  }
  div:nth-child(5) {
    background: #eb974d;
    animation-delay: -0.8s;
  }
  div:nth-child(6) {
    animation-delay: -0.7s;
  }
}
@keyframes loading {
  0%, 40%, 100% {
    transform: scaleY(0.5);
  }
  20% {
    transform: scaleY(1);
  }
}
</style>
