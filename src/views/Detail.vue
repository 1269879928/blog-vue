<template>
  <div class="home">
    <!-- <div id="shade"></div> -->
    <div class="bg-content shadow-sm border-gray border rounded mb-3 box col-12">
      <div class="col-12 pl-0 pr-0 head">
        <div class="article-title col-12">{{ article.title }}</div>
        <div class="col-12 meta mb-1">
          <span class="mr-2">
            <router-link to="/">
              <el-tooltip class="item" effect="light" content="返回首页" placement="top">
                <span><i class="fa fa-home mr-1"></i><span>首页</span></span>
              </el-tooltip>
            </router-link>
            <el-divider direction="vertical"></el-divider>
          </span>
          <span class="mr-2">
            <router-link :to="`/${article.category_id}`">
              <el-tooltip class="item" effect="light" content='返回首页' placement="top">
                <span>
                  <i class="fa fa-reorder  mr-1"></i>
                  {{ article.category_name }}
                </span>
              </el-tooltip>
            </router-link>
            <el-divider direction="vertical"></el-divider>
          </span>
          <span class="mr-2">
            <el-tooltip class="item" effect="dark" :content="article.created_at" placement="top">
              <span><i class="fa fa-clock-o  mr-1"></i>{{ article.CreatedTimeDiffForHumans }}</span>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
          </span>
          <span class="mr-2">
            <i class="fa fa-eye  mr-1"></i>{{ article.views ? article.views : 0 }}
            <el-divider direction="vertical"></el-divider>
          </span>
          <span class="mr-2">
            <i class="fa fa-comments  mr-1"></i>0
            <el-divider direction="vertical" v-if="article.updated_at"></el-divider>
          </span>
          <span v-if="article.updated_at">
            <el-tooltip class="item" effect="dark" :content="article.updated_at" placement="top">
              <span>更新于{{ article.updatedTimeDiffForHumans }}</span>
            </el-tooltip>
          </span>
        </div>
      </div>
      <div class="col-12 pt-3 article-content">
        <article v-html="compiledMarkdown" v-if="compiledMarkdown" v-click-img="imgClick"></article>
      </div>
    </div>
  </div>
</template>

<script>
import { detail } from '../api/article'
// import $ from 'jquery'
var hljs = require('highlight.js')
var emoji = require('markdown-it-emoji')
var md = require('markdown-it')({
  linkify: true,
  html: false,
  xhtmlOut: false,
  breaks: true,
  langPrefix: 'language-',
  typographer: true,
  quotes: '“”‘’',
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>'
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})
md.use(emoji)
md.use(require('markdown-it-emphasis-alt'))
md.use(require('markdown-it-mark'))
md.use(require('markdown-it-block-embed'))
md.use(require('markdown-it-implicit-figures'))
md.use(require('markdown-it-footnote'))
md.use(require('markdown-it-imsize'))
md.use(require('markdown-it-sub'))
md.use(require('markdown-it-sup'))
md.use(require('markdown-it-abbr'))
md.use(require('markdown-it-deflist'))
md.use(require('markdown-it-task-lists'))
// md.use(require('markdown-it-anchor'), { permalink: true, permalinkBefore: true, permalinkSymbol: '§' })
// md.use(require('markdown-it-toc-done-right'))
// md.use(require('slack-markdown-it'))
md.use(require('markdown-it-link-attributes'), {
  target: '_blank',
  rel: 'noopener'
})
// md.use(markdownItTocAndAnchor)
export default {
  directives: {
    clickImg: {
      inserted (el, bindings, vnode) {
        // console.log(el.childNodes[16])
        document.addEventListener('click', function (e) {
          const target = e.target.outerHTML
          var pattern = /^<img\s+src=/
          if (target.match(pattern)) {
            bindings.value(e.target)
          }
        })
      }
    }
  },
  components: {
  },
  data () {
    return {
      article: {
        id: 0,
        title: '',
        content: '',
        created_at: '',
        updated_at: '',
        views: 0,
        CreatedTimeDiffForHumans: '',
        updatedTimeDiffForHumans: '',
        category: { id: 0, name: '' }
      },
      id: 0,
      imgClickFlag: false
    }
  },
  watch: {
    '$route': 'getId'
  },
  created () {
    this.getId()
  },
  mounted () {
    // this.$nextTick(() => {
    //   const blocks = document.querySelectorAll('figure')
    //   console.log(212, blocks)
    //   blocks.forEach((block) => {
    //     console.log(123, block)
    //   })
    // })
  },
  computed: {
    compiledMarkdown () {
      return md.render(this.article.content)
    }
  },
  methods: {
    getId () {
      const id = this.$route.query.id
      if (parseInt(id) > 0 && /^[0-9]+$/.test(id)) {
        this.id = id
        this.fetchData(id)
      } else {
        this.$router.push({ name: '404' })
      }
    },
    fetchData (id) {
      detail({ id: id }).then(res => {
        if (res.status === 0) {
          const article = res.data.article
          document.title = `${article.title} - SHIJTING`
          this.article = article
        }
      }).catch(err => {
        console.log('err', err)
      })
    },
    imgClick (e) {
      const windowWidth = window.screen.width
      if (!this.imgClickFlag) {
        const figure = e.parentNode
        figure.style.height = e.height + 'px'
        e.classList.add('zoom-out')
        if (windowWidth >= 1024) { // pc端
          // $('#shade').fadeIn()
          e.classList.add('zoom-in-pc')
        } else { // 移动端
          e.classList.add('zoom-in-mobile')
        }
      } else {
        // $('#shade').fadeOut()
        if (windowWidth >= 1024) {
          e.classList.remove('zoom-in-pc')
        } else {
          e.classList.remove('zoom-in-mobile')
        }
        // e.classList.add('zoom-in-mobile')
        e.classList.remove('zoom-out')
      }
      this.imgClickFlag = !this.imgClickFlag
    }
  }
}
</script>

<style lang="less">
#shade {
  transition: all .6s;
  display: none;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, .8);
  z-index: 2;
}
// .container {
//   width: 1500px !important;
// }
.box {
  text-align: left;
  padding-bottom: 1.2rem;
  padding: 30px 20px 0 20px;
  // overflow: hidden;
  .head {
    border-bottom: 1px solid #DCDFE6;
    padding-bottom: 5px;
    .article-title {
      line-height: 2.5em;
      color: #636b6f;
      font-weight: 400;
      font-size: 1.5rem;
    }
    a {
      color: #999;
    }
    .meta {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      font-size: .9rem;
      color: #999;
      line-height: 2em;
      span:hover, span a:hover {
        cursor: pointer;
      }
      .bias {
        font-size: 90%;
        margin: 0 2px;
      }
    }
  }
  .article-content {
    z-index: 1 !important;
    margin: 0 !important;
    line-height: 2em;
    article {
      color: #7D8688;
      h1,h2,h3,h4,h5,h6 {
        color: #636b6f;
      }
      h2,h3,h4 {
        padding-bottom: 10px;
        border-bottom: 1px solid #dfe2e5;
      }
      p {
        text-indent: 2em;
      }
      table {
        border-spacing: 0;
        border-collapse: collapse;
        border-color: grey;
        thead {
          display: table-header-group;
          vertical-align: middle;
          border-color: inherit;
        }
        td, th {
          padding: 6px 13px;
          border: 1px solid #dfe2e5;
        }
      }
      // 代码高亮修改
      pre {
        // margin-top: 1.5rem !important;
        // margin-bottom: 1.5rem !important;
        background: #384548 !important;
        padding: 15px 36px;
        margin: 1.5rem -36px;
        font-size: 100%;
        line-height: 1.5em;
      }
      pre:last-child {
        margin-bottom: 0 !important;
      }
      .hljs {
        // margin: 0 -35px;
        color: #f8f8f2;
        .hljs-doctag {
          color: #a0a1a7;
        }
        .hljs-title, .hljs-meta {
          color: gold;
        }
        .hljs-keyword, .hljs-number {
          color: #00e0e0;
        }
        .hljs-comment {
          color: #8a9496
        }
        .hljs-params {
        }
      }
      figure {
        display: inline-block;
        margin: 1.2rem auto;
        position: relative;
        text-align: center;
        width: auto;
        // border: 2px solid red;
        z-index: 18 !important;
        img {
          z-index: 3 !important;
          // position: absolute;
          // left: 50%;
          max-width: 49rem;
          // max-height: 80%;
          // margin: 1.2rem auto;
          box-shadow: 0 0 40px #999;
          -webkit-transition: opacity 0s 0s,-webkit-transform .6s 0s;
          transition: opacity 0s 0s,-webkit-transform .6s 0s;
          transition: opacity 0s 0s,transform .6s 0s;
          transition: opacity 0s 0s,transform .6s 0s,-webkit-transform .6s 0s;
        }
        img:hover {
          cursor: pointer;
          cursor: -webkit-zoom-in;
          cursor: zoom-in;
        }
      }
    }
    .md-body {
      color: #636b6f;
      text-indent: 2em;
      line-height: 2.1em;
      font-size: .93rem;
      padding-bottom: 1.4rem;
    }
  }
}
// 图片处理
.zoom-in-pc {
  transform: scale(1.5) translateX(6.6rem);
}
.zoom-in-mobile {
  transform: scale(1.1);
}
.zoom-out {
  cursor: pointer;
  cursor: -webkit-zoom-out;
  cursor: zoom-out !important;
}
@keyframes zoom {
  0% {
     transform: translate(0px, 0px);
     transform: scale(1);
  }
  100% {
    transform: translate(100px, 0px);
    transform: scale(1.5);
    animation-play-state:paused;
  }
}
@media screen and (max-width: 1024px)  {
  img {
    width: 100%;
    height: 100%;
  }
}
@media screen and (max-width: 767px)  {
  .box {
    margin: 0 .9rem;
    padding: 0 !important;
    pre {
      background: #384548 !important;
      margin: 1.5rem .8rem 1.5rem 0 !important;
      padding: .9rem !important;
      font-size: 100%;
      line-height: 1.5em;
      border-radius: .2rem;
    }
  }
}
</style>
