<template>
  <div class="card rounded shadow-sm mb-3 tags">
    <div class="card-header bg-content">
      文章归档
      <!-- <hr /> -->
    </div>
    <div class="card-body first-card-body">
      <dl :style="{height: down ? '5rem': 'auto'}">
        <dd v-for="(h, i) in archive" :key="i" @click="getArticles(h.date)">
          <span>{{h.date}}</span>
          <span>{{h.count}}篇</span>
        </dd>
      </dl>
      <dl>
        <a href="javascript:;" @click="toggleDown">
          <i class="fa" :class="[advanced ? 'fa-angle-double-up' : 'fa-angle-double-down']"></i>
            {{ advanced ? '收起' : '展开'}}
          </a>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    archive: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // 展开/关闭
      advanced: false
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    down () {
      if (this.archive.length > 3 && !this.advanced) {
        return true
      }
      return false
    }
  },
  methods: {
    toggleDown () {
      this.advanced = !this.advanced
    },
    getArticles (date) {
      // 去掉中文
      date = date.replace(/[\u4e00-\u9fa5]/g, '')
      this.$router.push({ name: 'archive', query: { archive: date } })
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  width: 100%;
  padding: 0;
  .card-header {
    width: 100%;
    padding: 0;
    line-height: 2.8rem;
    padding: 0 1.1rem;
    color: #636b6f;
  }
  .card-body {
    padding: 10px 20px !important;
    dl:not(:nth-of-type(2)){
      width: 100%;
      overflow: hidden;
      margin: 0 !important;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      dd {
        text-align: left;
        text-indent: .6rem;
        width: 100%;
        line-height: 1.3rem;
        padding: 0 3px;
        font-size: 14px;
        color: rgba(0,0,0,.4);
        background-clip: content-box;
        -webkit-transition: all .5s;
        -o-transition: all .5s;
        transition: all .5s;
        display: flex;
        justify-content: space-between;
      }
      dd:hover {
        color: blue;
        text-decoration: underline;
        cursor: pointer;
        opacity: 1;
      }
    }
    dl:last-child {
      margin: 10px 0 0 0;
      border-top: 1px solid rgba(0,0,0,.05);
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        -webkit-transition: all .5s;
        -o-transition: all .5s;
        transition: all .5s;
        text-decoration: none;
        color: #989898;
      }
      a:hover {
        text-decoration: none;
        color: #666;
      }
    }
  }
  .first-card-body {
    padding: 10px 10px !important;
  }
}
</style>
