<template>
  <div class="container mt-3 pt-3">
    <div class="row">
      <div class="col-12 col-sm-9 pl-0 bt-content">
        <div class="home">
          <div class="bg-content shadow-sm border-gray border rounded mb-3 box col-12">
            <div class="col-12 pl-0 pr-0 head">
              <div class="article-title col-12 detail-skeleton" v-if="sLoading">
                <a-skeleton active :paragraph="{rows: 1}" />
              </div>
              <div class="article-title col-12" v-else>{{ article.title }}</div>
              <div class="col-12 meta mb-1" v-if="!sLoading">
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
            <div class="col-12 pt-3 article-content detail-skeleton" v-if="sLoading">
              <a-skeleton active :paragraph="{rows: 20}" />
            </div>
            <div class="col-12 pt-3 article-content" v-else>
              <article v-html="compiledMarkdown" v-if="article" v-click-img="imgClick"></article>
              <!-- <div class="article-tags">
                标签
              </div> -->
            </div>
          </div>
          <div ref="shade" id="shade" class="shade"></div>
        </div>
      </div>
      <Sidebar :tocHtml="tocHtml" :tocActive="tocActive"></Sidebar>
    </div>
  </div>
</template>

<script>
import { detail } from '../api/article'
import Sidebar from '../components/sidebar/Sidebar'
import markdownItTocAndAnchor from 'markdown-it-toc-and-anchor'
// import $ from 'jquery'
var hljs = require('highlight.js')
var emoji = require('markdown-it-emoji')

var md = require('markdown-it')({
  linkify: true,
  html: false,
  xhtmlOut: true,
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
// md.use(require('markdown-it-toc-done-right'))
// md.use(require('markdown-it-anchor'), { permalink: true, permalinkBefore: true, permalinkSymbol: '§' })
// md.use(require('markdown-it-toc-done-right'))
// md.use(require('slack-markdown-it'))
// md.use(require('markdown-it-link-attributes'), {
//   target: '_blank',
//   rel: 'noopener'
// })
md.use(markdownItTocAndAnchor)
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
    Sidebar
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
      sLoading: true, // 显示骨架
      tocHtml: '',
      tocArray: [],
      tocArr: [],
      id: 0,
      imgClickFlag: false,
      tocActive: '' // 滚动式激活的目录
    }
  },
  watch: {
    '$route': 'getId',
    tocArray (newTocArr) {
      const arr = []
      newTocArr.forEach(item => {
        arr.push(item.anchor)
      })
      this.scrollToc(arr)
    }
  },
  created () {
    this.getId()
  },
  mounted () {
  },
  computed: {
    compiledMarkdown () {
      return md.render(this.article.content)
    }
  },
  beforeDestroy () {
    // 销毁监听的滚动事件
    document.removeEventListener('scroll', this.handleScrollToc)
  },
  methods: {
    // 监听滚动条 ，目录随着滚动条的变化而变化
    scrollToc (tocArr) {
      const tocLength = tocArr.length
      if (tocLength <= 0) {
        return
      }
      this.tocArr = tocArr
      document.addEventListener('scroll', this.handleScrollToc)
    },
    handleScrollToc () {
      const tocArr = this.tocArr
      const tocLength = tocArr.length
      for (let index = 0; index < tocLength; index++) {
        const item = tocArr[index]
        const dom = document.querySelector('#' + item)
        // console.log('dom', dom, item)
        if (dom) {
          const currItemOffsetTop = this.getRect(dom).top
          if (currItemOffsetTop <= 2) {
            this.tocActive = item
            // console.log('active:', item, currItemOffsetTop)
          }
        }
      }
    },
    getId () {
      const id = this.$route.query.id
      // 如果url是锚点，停止往下执行
      const hash = this.$route.hash
      if (hash) {
        return
      } else { // 不是锚点 销毁监听的滚动事件
        document.removeEventListener('scroll', this.handleScrollToc)
      }
      if (parseInt(id) > 0 && /^[0-9]+$/.test(id)) {
        this.id = id
        this.fetchData(id)
      } else {
        this.$router.push({ name: '404' })
      }
    },
    fetchData (id) {
      this.sLoading = true
      detail({ id: id }).then(res => {
        if (res.status === 0) {
          const article = res.data.article
          document.title = `${article.title} - SHIJTING`
          md.set({
            tocCallback: (tocMarkdown, tocArray, tocHtml) => {
              const filter = tocHtml.replace(/\*<br\s+\/>/g, '')
              this.tocHtml = filter.replace(/\*/g, '')
              this.tocArray = tocArray
            }
          })
          this.article = article
          this.sLoading = false
        }
      }).catch(err => {
        console.log('err', err)
      })
    },
    getRect (elements) { // elements: dom元素节点
      var rect = elements.getBoundingClientRect()
      var clientTop = document.documentElement.clientTop
      var clientLeft = document.documentElement.clientLeft
      return { // 兼容ie多出的两个px
        top: rect.top - clientTop, // 距离顶部的位置
        // bottom: rect.bottom - clientTop, // 距离顶部加上元素本身的高度就等于bottom的位置
        left: rect.left - clientLeft // 距离左边的位置
        // right: rect.right - clientLeft // 距离右边的位置就是 距离左边的位置加上元素本身的宽度
      }
    },
    imgClick (e) {
      const rect = this.getRect(e)
      // this.getElemDis(e)
      // 浏览器窗口的宽度 document.documentElement.clientWidth(不包括滚动条的宽度)
      const windowWidth = window.screen.width // 包括滚动条的宽度
      const shade = this.$refs.shade
      if (!this.imgClickFlag) {
        const figure = e.parentNode
        figure.style.height = e.height + 'px'
        e.classList.add('zoom-out')
        if (windowWidth > 1024) { // pc端
          e.classList.add('zoom-in-pc')
          e.style.zIndex = 999
          // 打开遮罩层
          shade.style.display = 'block'
          // 解决display 与opacity 一起用会导致transition 过渡失效问题
          setTimeout(() => {
            shade.style.opacity = '0.9'
          }, 20)
          /**
           * 图片X轴居中：浏览器X轴中心 - 图片中心距离浏览器左边的距离 = X位移距离
           * 图片Y轴居中：浏览器Y轴中心 - 图片中心距离浏览器上边的距离 = Y位移距离
           */
          // 浏览器窗口工作区的高度
          const windowHeight = document.documentElement.clientHeight
          // 图片中心点距离浏览器窗口左边的距离
          const imgX = rect.left + (e.width / 2)
          // 浏览器窗口y轴的中心
          const windowXCenter = windowWidth / 2
          const translateX = windowXCenter - imgX
          // 图片中心坐标距离浏览器窗口上边边的距离
          const imgY = rect.top + (e.height / 2)
          // 浏览器工作区y轴中心
          const translateY = (windowHeight / 2) - imgY
          e.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px) scale(1.2)'
        } else { // 移动端
          e.classList.add('zoom-in-mobile')
        }
      } else {
        if (windowWidth > 1024) {
          e.classList.remove('zoom-in-pc')
          e.style.transform = 'translate(0, 0) scale(1)'
          // 移除遮罩层
          shade.style.opacity = '0'
          setTimeout(() => {
            e.style.zIndex = 0
            shade.style.display = 'none'
          }, 600)
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
.shade {
  transition: all .6s;
  display: none;
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  background: white;
  opacity: 0;
  z-index: 2;
}
.box {
  text-align: left;
  padding-bottom: 1.2rem;
  padding: 30px 20px 20px 20px;
  // overflow: hidden;
  .head {
    border-bottom: 1px solid #DCDFE6;
    // border-bottom: 1px solid rgba(0, 0, 0, 0.05);
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
    margin: 0;
    padding: 1rem;
    line-height: 2em;
    article {
      color: #7D8688;
      h1,h2,h3,h4,h5,h6 {
        color: #636b6f;
      }
      h1,h2,h3,h4 {
        margin-top: 1.2em;
        margin-bottom: 20px;
        padding-bottom: .7rem;
      }
      h1 {
        border-bottom: 1px solid #eee;
        font-size: 1.4rem;
      }
      h2 {
        font-size: 1.1rem;
      }
      p {
        text-indent: 2em;
      }
      blockquote {
        font-size: 0.9em;
        border: 1px dashed #dce0e4;
        border-radius: 5px;
        padding: 13px 25px;
        margin: 20px 0 !important;
        background-color: #f5f8fc;
        color: #8796a8;
        p {
          text-indent: 0em;
          margin: 0;
        }
      }
      .markdownIt-Anchor, .markdownIt-TOC {
        display: none
      }
      table {
        margin-right: 1rem;
        border-spacing: 0;
        border-collapse: collapse;
        border-color: grey;
        thead {
          display: table-header-group;
          vertical-align: middle;
          border-color: inherit;
        }
        td, th {
          padding: 0 .8rem;
          border: 1px solid #dfe2e5;
        }
        tr {
          transition: all .3s;
        }
        tr:hover {
          background: #eee;
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
        margin-bottom: -20px !important;
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
        width: auto;
        img {
          position: relative;
          height: auto;
          max-width: 49rem;
          box-shadow: 0 0 30px #999;
          border: 1px solid #bbb;
          border-radius: .2rem;
          transition: all .6s;
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
// 图片处理 TODO 动画过渡效果
.zoom-in-pc {
  box-shadow: 0 0 50px #222 !important;
}
.zoom-in-mobile {
  transform: scale(1.1);
}
.zoom-out {
  cursor: pointer;
  cursor: -webkit-zoom-out;
  cursor: zoom-out !important;
}
@media screen and (max-width: 1024px)  {
  figure {
    // margin-right: 1rem !important;
    text-align: center;
    border: 1px solid red;
    img {
      width: 100%;
      height: auto;
      // max-width: 100%;
    }
  }
}
@media screen and (max-width: 767px)  {
  .bt-content {
    padding-right: 0 !important;
    .box {
      // margin: 0 .9rem;
      padding: 0 !important;
      pre {
        margin: 1.5rem .1rem 1.5rem 0 !important;
        padding: .9rem !important;
        border-radius: .2rem;
      }
    }
  }
}
</style>
