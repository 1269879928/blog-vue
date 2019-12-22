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
import $ from 'jquery'
export default {
  props: {
    tocHtml: {
      type: String,
      required: true
    },
    tocActive: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      top: 10
    }
  },
  watch: {
    tocActive (n) {
      // console.log('active', n)
      const href = '#' + n
      const dom = $("a[href='" + encodeURI(href) + "']")
      dom.removeClass('toc-active')
      dom.parent().parent().parent().find('a').removeClass('toc-active')
      dom.prevAll('a').removeClass('toc-active')
      dom.parent().parent().parent().siblings('li').find('a').removeClass('toc-active')
      dom.addClass('toc-active')
    }
  },
  mounted () {
    // this.$nextTick(() => {
    // })
  },
  methods: {
  }
}
</script>

<style lang="less">
.toc {
  .toc-active {
    background: #eee;
  }
  a {
    transition: all .5s;
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
          margin: 1px 0 1px -5px;
          border-radius: .1rem;
          a {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-indent: 2px;
            padding: 3px 2px 3px 8px;
          }
          a:hover {
            background: #eee;
          }
        }
      }
      a {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-indent: 2px;
        padding: 3px;
        display: block;
        border-radius: .1rem;
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
