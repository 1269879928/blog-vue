<template>
  <div class="home"  style="overflow:auto" ref="scrollList">
      <template v-if="sLoading">
        <div class="bg-content shadow-sm border-gray border rounded mb-3 content index-content" v-for="(s,i) in skeleton" :key="i">
         <a-skeleton active avatar :paragraph="{rows: 3}" />
        </div>
      </template>
      <template v-else-if="!articles.length">
        <div class="bg-content shadow-sm border-gray border rounded mb-3 content">暂无数据</div>
      </template>
      <template v-else>
        <div class="bg-content shadow-sm border-gray border rounded mb-3 content"
          v-for="(article,i) in articles"
          :key="i"
          @click="toDetail(article.id)"
        >
          <div class="card-title"><a href="#" class="category">{{ article.category_name }}</a>{{ article.title }}</div>
          <div class="card-bottom">
            <div class="card-bottom-left col-sm-3 col-3">
              <img class="img-thumbnail image-responsive" v-if="article.cover" :src="article.cover" alt="">
              <img class="img-thumbnail image-responsive" v-else src="https://image.twho.top/default.jpg" alt="">
            </div>
            <div class="card-bottom-right col-sm-9 col-9 pl-sm-3">
              <div class="articl">
                {{ article.description }}
              </div>
              <div class="tools">
                <i class="fa fa-clock-o"></i><span>{{ article.created_at }}</span>
                <i class="fa fa-eye"></i><span>{{ article.views }}</span>
                <i class="fa fa-comments"></i><span>0</span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="loading">
        <p v-show="loading"><i class="fa fa-spinner fa-spin"></i> 数据载入中...</p>
        <p v-show="disabled">总得有个结尾吧</p>
      </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { articles, getAritcleWithTagId, getAritcleWithArchiveId } from '../api/index'
export default {
  components: {
  },
  name: 'articlecontent',
  data () {
    return {
      articles: [
      ],
      skeleton: [0, 1, 2, 3],
      sLoading: true, // 显示骨架
      id: 0,
      loading: false,
      disabled: false, // 是否全部加载完成(为true时显示 没有更多了)
      i: 0,
      pageNo: 1, // 当前页
      pageSize: 8 // 每页显示记录数
    }
  },
  watch: {
    '$route': ['init', 'fetchDate'] // 监听路由
  },
  created () {
    this.pageNo = 1
    this.fetchDate()
    this.loadMore = debounce(this.fetchDate, 1000)
  },
  mounted () {
    // 监听浏览器滚动条
    window.addEventListener('scroll', this.scroll)
  },
  computed: {
  },
  methods: {
    // 路由发生变化时初始化数据
    init () {
      // 内容区域的显示/隐藏动画切换
      // this.$store.commit({
      //   type: 'contentLoader/ToggleContentStatus',
      //   payload: false
      // })
      this.disabled = false
      this.loading = false
      // console.log('init')
      this.pageNo = 1
      this.articles = []
    },
    scroll () {
      let scroll = this.getScrollTop() + this.getWindowHeight() - this.getScrollHeight()
      // console.log(scroll)
      if (scroll > -30 && scroll < -10) { // 滚动到底部了， 异步获取后端数据
        // console.log('loading', this.loading, 'disabled', this.disabled)
        if (!this.loading && !this.disabled) { // 防止反复出现请求接口(必须在本次请求结束后才能进行下次请求)
          // 显示加载中
          this.loading = true
          this.loadMore('scroll')
          console.log('滚动到底部，触发数据交互')
        }
      }
    },
    fetchDate (type) {
      if (type !== 'scroll') {
        this.sLoading = true
      }
      this.id = 0
      const path = this.$route.fullPath.substr(1)
      const name = this.$route.name
      if (name === '首页') {
        // console.log('首页')
        this.getArticlesOfCate()
        return true
      }
      if (path && /^[0-9]+$/.test(path)) { // 获取导航栏的文章
        this.id = path
        // console.log('cate')
        this.getArticlesOfCate()
        return true
      }
      if (name === 'tag' && /^tag\?id=[0-9]+$/.test(path)) { // 获取tag标签的文章
        this.articlesOfTag(this.$route.query.id)
        return true
      }
      const archive = this.$route.query.archive
      if (name === 'archive' && archive.length === 6) { // 获取文章归档的文章
        console.log('archive')
        this.aritclesOfArchive(archive)
        return true
      }
      // this.getArticlesOfCate()
      this.$router.push({ name: 'exception404' })
    },
    getArticlesOfCate () {
      articles({ id: this.id, pageNo: this.pageNo, pageSize: this.pageSize }).then(res => {
        this.articles = this.articles.concat(res.data.articles)
        this.sLoading = false
        // 内容区域的显示/隐藏动画切换
        // setTimeout(() => {
        //   this.$store.commit({
        //     type: 'contentLoader/ToggleContentStatus',
        //     payload: true
        //   })
        // }, 100)

        // 加载完毕
        this.loading = false
        console.log('??', this.pageNo, res.data.totalPage)
        if (this.pageNo >= parseInt(res.data.totalPage)) { // 全部数据加载完毕，显示 没有更多了
          this.disabled = true
        }
        this.pageNo++ // 当前页+1
      }).catch(err => {
        this.loading = false
        console.log('err', err)
      })
    },
    articlesOfTag (id) {
      getAritcleWithTagId({ id: id, pageNo: this.pageNo, pageSize: this.pageSize }).then(res => {
        this.loading = false
        // 内容区域的显示/隐藏动画切换
        // setTimeout(() => {
        //   this.$store.commit({
        //     type: 'contentLoader/ToggleContentStatus',
        //     payload: true
        //   })
        // }, 100)
        if (res.status === 0) {
          const articles = res.data.articles
          document.title = `${articles[0].category_name} - SHIJTING`
          this.articles = this.articles.concat(articles)
          if (this.pageNo >= parseInt(res.data.totalPage)) { // 全部数据加载完毕，显示 没有更多了
            this.disabled = true
          }
          this.pageNo++ // 当前页+1
        } else {
          this.articles = []
        }
        this.sLoading = false
      }).catch(err => {
        this.loading = false
        console.log('get articles of tag error', err)
      })
    },
    aritclesOfArchive (id) {
      this.loading = false
      getAritcleWithArchiveId({ id: id, pageNo: this.pageNo, pageSize: this.pageSize }).then(res => {
        if (res.status === 0) {
          const articles = res.data.articles
          document.title = `2019年11月 - SHIJTING`
          this.articles = this.articles.concat(articles)
          console.log('?archive?', this.pageNo, res.data.totalPage)
          if (this.pageNo >= parseInt(res.data.totalPage)) { // 全部数据加载完毕，显示 没有更多了
            this.disabled = true
          }
          this.pageNo++ // 当前页+1
        } else {
          this.articles = []
        }
        this.sLoading = false
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.loading = false
        console.log('get articles of archive error', err)
      })
    },
    // 跳转到详情页
    toDetail (id) {
      this.$router.push({ name: 'detail', query: { id } })
    },
    // 滚动条在Y轴上的滚动距离
    getScrollTop () {
      let scrollTop = 0
      let bodyScrollTop = 0
      let documentScrollTop = 0
      if (document.body) {
        bodyScrollTop = document.body.scrollTop
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop
      }
      scrollTop = bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop
      // console.log('滚动条在Y轴上的滚动距离,', scrollTop)
      return scrollTop
    },
    // 文档的总高度
    getScrollHeight () {
      let scrollHeight = 0
      let bodyScrollHeight = 0
      let documentScrollHeight = 0
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight
      }
      scrollHeight = bodyScrollHeight - documentScrollHeight > 0 ? bodyScrollHeight : documentScrollHeight
      // console.log('文档的高度,', scrollHeight)
      return scrollHeight
    },
    // 浏览器视口的高度
    getWindowHeight () {
      var windowHeight = 0
      if (document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight
      } else {
        windowHeight = document.body.clientHeight
      }
      // console.log('浏览器窗口的高度,', windowHeight)
      return windowHeight
    }
  }
}
</script >

<style lang="less" scoped>
.content {
  text-align: left;
  line-height: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: .7rem 1.1rem;
  color: #6c757d;
  .card-title {
    font-size: 1.1rem;
    font-weight: 500;
    line-height: 1.5rem;
    // color: #2e3641;
    color: rgba(0, 0, 0, 0.65);
    word-break:break-all;//强制换行
    text-overflow:ellipsis;//显示为省略号
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    overflow: hidden;
    -moz-transition: all .5s;
    -webkit-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
  }
  .card-title a:first-of-type {
    font-weight: normal;
    margin-right: .9rem;
    background-color: #D33632;
    // background-color: #c0c0c0;
    font-size: 12px;
    padding: 2px 9px;
    // color: rgba(0,0,0,.6);
    color: white;
    transition: all .5s;
    -wekit-transition: all .5s;
    -moz-transition: all .5s;
    -o-transition: all .5s;
  }
  .card-title a:first-of-type:hover {
    background-color: #17a2b8;
    // color: rgba(0,0,0,.8);
  }
  .card-title:hover {
    color: #2e3641;
    cursor: pointer;
  }
  .card-bottom {
    display: flex;
    flex-direction: row;
    .card-bottom-left {
      width: 12.5rem;
      height: 7.6rem;
      background: #F0F2F5;
      overflow: hidden;
      padding: 0;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -o-transition: all 0.5s;
        transform: scale(1);
      }
    }
    .card-bottom-right {
      padding: 0;
      flex: 1;
      padding-left: 1rem;
      background-clip: content-box;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .articl {
        font-size: .9rem;
        word-break:break-all;//强制换行
        text-overflow:ellipsis;//显示为省略号
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:4;
        overflow: hidden;
      }
      .tools {
        font-size: .85rem;
        color: silver;
        text-align: right;
        i {
          margin: 0 .2rem 0 .3rem;
        }
        span {
          margin-right: .9rem;
        }
      }
    }
  }
  .card-bottom:hover {
    cursor: pointer;
  }
  // 鼠标经过card-bottom时card-bottom-left img变形
  .card-bottom:hover .card-bottom-left img {
    transform: scale(1.1)
  }
  .loading{
    width: 100%;
    display: flex;
    justify-content: center;
    p {
      color: #636b6f;
      text-align: center;
    }
  }
}
@media screen and(max-width: 768px) {
  .content {
    font-size: .9rem;
    .card-bottom {
      .card-bottom-left {
        width: 7.5rem;
        height: 4.5rem;
      }
      .card-bottom-right {
        .articl {
          font-size: .9rem;
          word-break:break-all;//强制换行
          text-overflow:ellipsis;//显示为省略号
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:3;
          overflow: hidden;
        }
        .tools {
          display: none;
        }
      }
    }
  }
}
</style>
