<template>
<!-- <a-affix :offsetTop="20" ref="affix" id="affix"> -->
  <div class="card rounded shadow-sm">
    <div class="card-body toc">
      <div v-html="tocHtml"></div>
    </div>
  </div>
<!-- </a-affix> -->
</template>

<script>
export default {
  props: {
    tocHtml: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      top: 10
    }
  },
  mounted () {
    console.log('tocHtml', this.tocHtml)
    // const affix = this.$refs.affix
    // console.log('affix', affix)
  }
}
</script>

<style lang="less">
.toc {
  a {
    color: #636B6F;
  }
  .markdownIt-TOC {
    margin: 0 0 0 -10px;
    padding: 10px 0 0 0;
    font-size: .97rem;
    li {
      // padding: 5px;
      margin: 0;
      ul {
        padding-left: 5px;
        li {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-indent: 2px;
          padding: 2px;
        }
        li:hover {
          background: #eee;
        }
      }
      a {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-indent: 2px;
        padding: 2px;
        display: block;
      }
      a:hover {
        background: #eee;
      }
    }
    // li:hover {
    //   background: #eee;
    // }
    ul,li {
      list-style: none;
    }
  }
}
</style>
