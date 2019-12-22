<template>
  <div class="col-12 col-sm-12 col-md-3 side" id="side">
    <div class="col-12 side">
      <!-- tags -->
      <Tags :data="tags" v-if="$route.name !== 'detail'"></Tags>
      <!-- 文章推荐 -->
      <top-articles :data="topArticles"></top-articles>
      <!-- 最新评论 -->
      <comment v-if="$route.name !== 'detail'"></comment>
      <!-- 文章归档 -->
      <archive :archive="archive"></archive>
      <!-- 目录 -->
      <a-affix :offsetTop="10" ref="affix" id="affix">
        <toc v-bind="$attrs" v-if="$route.name === 'detail'"></toc>
      </a-affix>
      <!-- 友链 -->
      <friends-link :links="friendsLink" v-if="$route.name !== 'detail'"></friends-link>
    </div>
  </div>
</template>

<script>
import { side } from '../../api/index'
import Tags from './Tags'
import TopArticles from './TopArticles'
import Comment from './Comment'
import Toc from './Toc.vue'
import Archive from './Archive.vue'
import FriendsLink from './FriendsLink.vue'
export default {
  name: 'sidebar',
  inheritAttrs: false,
  // props: {
  //   tocHtml: {
  //     type: String
  //   },
  //   tocActive: {
  //     type: String
  //   }
  // },
  components: {
    Tags,
    TopArticles,
    Comment,
    Toc,
    Archive,
    FriendsLink
  },
  data () {
    return {
      topArticles: [
        // { title: '', id: 0 }
      ],
      tags: [],
      archive: [
      ],
      friendsLink: []
    }
  },
  created () {
    this.fetchDate()
  },
  computed: {
  },
  methods: {
    fetchDate () {
      side().then(res => {
        if (res.status === 0) {
          let tags = res.data.tags
          tags.map(item => {
            item.count = item.article_tags.length
            // item.colors = this.randomColor()
          })
          this.tags = tags
          // 置顶文章
          this.topArticles = res.data.tops
          // 文章归档
          this.archive = res.data.archive
          // 友链
          this.friendsLink = res.data.friendsLink
        }
      }).catch(err => {
        console.log('err', err)
      })
    }
  }
}
</script>

<style lang="less">
 #side {
  // background: aquamarine;
  background-clip: content-box;
  box-sizing: border-box;
  padding-right: 0;
  padding: 0;
  text-align: left;
}
.side {
  padding: 0;
  .card {
    width: 100%;
    padding: 0;
    .card-header {
      width: 100%;
      padding: 0;
      line-height: 2.8rem;
      padding: 0 1.1rem;
      color: #636b6f;
      // border-bottom: 0;
      // box-sizing: border-box;
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    }
    .card-body {
      // border-bottom: 1px solid silver;
      // padding-top: 0;
      padding: 10px 20px !important;
      // dl{
      //   width: 100%;
      //   margin: 0 !important;
      //   // margin-left: -10px !important;
      //   // margin-right: -10px !important;
      //   display: flex;
      //   flex-direction: row;
      //   flex-wrap: wrap;
      //   justify-content: flex-start;
      //   dd {
      //     text-align: left;
      //     text-indent: .6rem;
      //     width: 50%;
      //     line-height: 1.3rem;
      //     padding: 0 3px;
      //     font-size: 14px;
      //     opacity: .7;
      //     color: white;
      //     background-clip: content-box;
      //     -webkit-transition: all .5s;
      //     -o-transition: all .5s;
      //     transition: all .5s;
      //   }
      //   dd:hover {
      //     cursor: pointer;
      //     opacity: 1;
      //   }
      //   // dd:nth-child(2n) {
      //   //   margin-left:10px;
      //   //   margin-right:10px;
      //   // }
      // }

    }
    .first-card-body {
      padding: 10px 10px !important;
    }
    .top {
      padding-top: 0 !important;
      ul {
        li {
          padding: 0 0 10px 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          .top-left {
            padding: 0;
            overflow: hidden;
            text-align: center;
            .thumbnail {
              width:100%;
              height: 55px;
            }
          }
          .top-right {
            padding: 0 0 0 10px;
            overflow: hidden;
            text-align: left;
            .top-title {
              color: #6c757d;
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
            .top-title:hover {
              color: #0d8a72;
              cursor: pointer;
            }
            .common-author {
              color: rgba(0,0,0,.5)!important;
              font-size: 80%;
              font-weight: 400;
              span {
                padding-right: 8px;
              }
            }
          }
        }
        li:not(first-child) {
          padding-top: 10px;
        }
        li:last-child {
          border-bottom: none;
        }
        .list-group-item {
          border: none;
        }
        .my-list {
          border-bottom: 1px solid rgba(0, 0, 0, 0.09);
        }
      }
    }
    .comment{
      padding-top: 0 !important;
      ul {
        li {
          padding: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          border-bottom: 1px solid rgba(0, 0, 0, .09);
          .comment-left {
            padding: 0;
            overflow: hidden;
            text-align: center;
            .avatar {
              width: 45px;
              height: 45px;
            }
          }
          .comment-right {
            padding: 0;
            overflow: hidden;
            text-align: left;
            .comment-title {
              color: #6c757d;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              -moz-transition: all .5s;
              -webkit-transition: all .5s;
              -o-transition: all .5s;
              transition: all .5s;
            }
            .comment-title:hover {
              color: #0d8a72;
              cursor: pointer;
            }
            .common-author {
              color: rgba(0,0,0,.5)!important;
              font-size: 80%;
              font-weight: 400;
              span {
                padding-right: 8px;
              }
            }
          }
        }
        li:not(first-child) {
          padding: 10px 0;
        }
        li:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
@media screen and(max-width: 767px) {
  #side {
    display: none;
  }
}
</style>
