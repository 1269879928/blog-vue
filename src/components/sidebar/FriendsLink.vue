<template>
  <div class="card rounded shadow-sm mb-3 tags">
    <div class="card-header bg-content">
      友情链接
      <!-- <hr /> -->
    </div>
    <div class="card-body first-card-body">
      <dl :style="{height: down ? '7rem': 'auto'}">
        <dd @click="getArticleWithTagId(tag.id)" v-for="(link, i) in links" :key="i">
          <a :href="link.link" target="_brank">{{link.title}}</a>
        </dd>
      </dl>
      <dl v-if="links.length > 6">
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
    links: {
      type: Array
      // required: true
    }
  },
  data () {
    return {
      advanced: false
    }
  },
  computed: {
    down () {
      if (this.links.length > 6 && !this.advanced) {
        return true
      }
      return false
    }
  },
  methods: {
    toggleDown () {
      this.advanced = !this.advanced
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
      // width: calc(100% + 10px);
      margin: 0 !important;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      overflow: hidden;
      dd {
        text-align: center;
        text-indent: .6rem;
        width: 8rem;
        line-height: 1.3rem;
        padding: 8px 5px;
        margin: 0 3px;
        font-size: 14px;
        background-clip: content-box;
        -webkit-transition: all .5s;
        -o-transition: all .5s;
        transition: all .5s;
        border-bottom: 1px solid rgba(0, 0, 0, .09);
        a {
          display: block;
          -moz-transition: all .5s;
          -o-transition: all .5s;
          -webkit-transition: all .5s;
          transition: all .5s;
          color: rgba(0,0,0,.4);
        }
      }
      // dd:last-child {
      //   flex: 0;
      // }
      dd:hover>a {
        cursor: pointer;
        // opacity: 1;
        color: rgba(0,0,0,.6);
      }
      dd:hover {
        border-bottom: 1px solid rgba(0, 0, 0, .2);
      }
    }
    dl:nth-child(2) {
      margin: 10px 0 0 0;
      border-top: 1px solid rgba(0,0,0,.06);
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
  // .first-card-body {
  //   padding: 10px 10px !important;
  // }
}
</style>
