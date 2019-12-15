<template>
  <div class="col-sm-3 col-12 side" id="side">
    <div class="col-12 side">
      <div class="card rounded shadow-sm mb-3 tags">
        <div class="card-header bg-content">
          标签云
          <!-- <hr /> -->
        </div>
        <div class="card-body first-card-body">
          <dl>
            <dd class="rounded" @click="getArticleWithTagId(tag.id)" v-for="tag in tags" :key="tag.id"  :style="{backgroundColor: colors[randomColor()]}">
              <!-- <el-tooltip class="item" placement="top" effect="light">
                <template slot="content">
                  {{ tag.count }} 个话题
                </template>
                <span>
                  {{ tag.name }}（{{tag.count}}）
                </span>
              </el-tooltip> -->
              {{ tag.name }}（{{tag.count}}）
            </dd>
          </dl>
        </div>
      </div>
      <div class="card rounded shadow-sm mb-3">
        <div class="card-header bg-content">
          置顶推荐
        </div>
        <div class="card-body top">
          <ul class="list-group list-group-flush">
            <template>
              <li class="list-group-item row" v-for="topArticle in topArticles" :key="topArticle.id">
                <div class="top-left col-4">
                  <img class="thumbnail" v-if="topArticle.cover" :src="topArticle.cover" alt="">
                  <img class="thumbnail" v-else src="https://image.twho.top/default.jpg" alt="">
                </div>
                <div class="top-right col-8">
                  <div class="top-title" @click="detail(topArticle.id)">{{ topArticle.title }}</div>
                  <div class="common-author">
                    <span><i class="fa fa-clock-o mr-1"></i>{{ topArticle.created_at }}</span>
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="card rounded shadow-sm">
        <div class="card-header bg-content">
          最新评论
        </div>
        <div class="card-body comment">
          <ul class="list-group list-group-flush">
            <li class="list-group-item row">
              <div class="comment-left col-3">
                <img class="avatar rounded-circle img-thumbnail" src="https://cuiqingcai.com/wp-content/themes/Yusi/timthumb.php?src=https://qiniu.cuiqingcai.com/wp-content/uploads/2015/09/wallpaper_5265780-e1454442805684.jpg&h=123&w=200&q=90&zc=1&ct=1" alt="">
              </div>
              <div class="comment-right col-9">
                <div class="comment-title">评论功能开发中开发中开发中开发中</div>
                <div class="common-author">
                  <span>lison</span>
                  <span><i class="fa fa-clock-o mr-1"></i>三天前</span>
                </div>
              </div>
            </li>
            <li class="list-group-item row">
              <div class="comment-left col-3">
                <img class="avatar rounded-circle img-thumbnail" src="https://cuiqingcai.com/wp-content/themes/Yusi/timthumb.php?src=https://qiniu.cuiqingcai.com/wp-content/uploads/2015/09/wallpaper_5265780-e1454442805684.jpg&h=123&w=200&q=90&zc=1&ct=1" alt="">
              </div>
              <div class="comment-right col-9">
                <div class="comment-title">评论功能开发中开发中开发中开发中</div>
                <div class="common-author">
                  <span>lison</span>
                  <span><i class="fa fa-clock-o mr-1"></i>三天前</span>
                </div>
              </div>
            </li>
            <li class="list-group-item row">
              <div class="comment-left col-3">
                <img class="avatar rounded-circle img-thumbnail" src="https://cuiqingcai.com/wp-content/themes/Yusi/timthumb.php?src=https://qiniu.cuiqingcai.com/wp-content/uploads/2015/09/wallpaper_5265780-e1454442805684.jpg&h=123&w=200&q=90&zc=1&ct=1" alt="">
              </div>
              <div class="comment-right col-9">
                <div class="comment-title">评论功能开发中开发中开发中开发中</div>
                <div class="common-author">
                  <span>lison</span>
                  <span><i class="fa fa-clock-o mr-1"></i>三天前</span>
                </div>
              </div>
            </li>
            <li class="list-group-item row">
              <div class="comment-left col-3">
                <img class="avatar rounded-circle img-thumbnail" src="https://cuiqingcai.com/wp-content/themes/Yusi/timthumb.php?src=https://qiniu.cuiqingcai.com/wp-content/uploads/2015/09/wallpaper_5265780-e1454442805684.jpg&h=123&w=200&q=90&zc=1&ct=1" alt="">
              </div>
              <div class="comment-right col-9">
                <div class="comment-title">评论功能开发中开发中开发中开发中</div>
                <div class="common-author">
                  <span>lison</span>
                  <span><i class="fa fa-clock-o mr-1"></i>三天前</span>
                </div>
              </div>
            </li>
            <li class="list-group-item row">
              <div class="comment-left col-3">
                <img class="avatar rounded-circle img-thumbnail" src="https://cuiqingcai.com/wp-content/themes/Yusi/timthumb.php?src=https://qiniu.cuiqingcai.com/wp-content/uploads/2015/09/wallpaper_5265780-e1454442805684.jpg&h=123&w=200&q=90&zc=1&ct=1" alt="">
              </div>
              <div class="comment-right col-9">
                <div class="comment-title">评论功能开发中开发中开发中开发中</div>
                <div class="common-author">
                  <span>lison</span>
                  <span><i class="fa fa-clock-o mr-1"></i>三天前</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { side } from '../../api/index'
export default {
  name: 'sidebar',
  data () {
    return {
      tags: [
        { name: '深度学习', id: 0 }
      ],
      topArticles: [
        { title: '', id: 0 }
      ],
      colors: [
        '#1abc9c',
        '#2ecc71',
        '#3498db',
        '#9b59b6',
        '#34495e',
        '#f1c40f',
        '#e67e22',
        '#e74c3c',
        '#4caf50',
        '#9c27b0',
        '#f1c40f',
        '#ff9800',
        '#95a5a6',
        '#2196f3',
        '#00bcd4',
        '#009688',
        '#f44336',
        '#58B19F',
        '#FD7272',
        '#B33771',
        '#40407a',
        '#17a2b8',
        '#17c0eb',
        '#f60',
        '#b37333'
      ]
    }
  },
  created () {
    this.fetchDate()
  },
  computed: {
  },
  methods: {
    randomColor () {
      const i = Math.floor(Math.random() * this.colors.length)
      // return this.colors[i]
      return i
    },
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
        }
      }).catch(err => {
        console.log('err', err)
      })
    },
    detail (id) {
      this.$router.push({ name: 'detail', query: { id: id } })
    },
    getArticleWithTagId (tagId) {
      this.$router.push({ name: 'tag', query: { id: tagId } })
    },
    mouseover (colorObj) {
      console.log(colorObj)
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
    }
    .card-body {
      // border-bottom: 1px solid silver;
      // padding-top: 0;
      padding: 10px 20px !important;
      dl{
        width: 100%;
        margin: 0 !important;
        // margin-left: -10px !important;
        // margin-right: -10px !important;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        dd {
          text-align: left;
          text-indent: .6rem;
          width: 50%;
          line-height: 1.3rem;
          padding: 0 3px;
          font-size: 14px;
          opacity: .7;
          color: white;
          background-clip: content-box;
          -webkit-transition: all .5s;
          -o-transition: all .5s;
          transition: all .5s;
        }
        dd:hover {
          cursor: pointer;
          opacity: 1;
        }
        // dd:nth-child(2n) {
        //   margin-left:10px;
        //   margin-right:10px;
        // }
      }

    }
    .first-card-body {
      padding: 10px 10px !important;
    }
    .top {
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
      }
    }
    .comment{
      ul {
        li {
          padding: 0 0 10px 0;
          display: flex;
          flex-direction: row;
          align-items: center;
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
          padding-top: 10px;
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
@media screen and (min-width: 768px) and (max-width: 1024px) {
  #side {
      // display: none;
      .tags {
        .card-body {
          dl{
            width: 100%;
            padding: 0;
            margin: 0;
            // display: flex;
            // flex-direction: row;
            // flex-wrap: wrap;
            // justify-content: flex-start;
          dd {
            text-align: left;
            text-indent: .6rem;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
