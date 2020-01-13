<template>
  <main class="" id="nav-main">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light pl-0" id="my-navbar">
        <!-- <router-link class="navbar-brand" to="/">shijting</router-link> -->
        <div class="my-navbar-toggler-box">
          <span class="navbar-toggler-icon my-navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></span>
          <a class="navbar-brand hidden-pc logo" href="/">
            <!-- <section class="logo-top">{</section> -->
            <section class="logo-main">
              <span class="logo-tag">{-)</span>
              <span class="logo-keyword">trim</span>
              <span class="logo-title">('嗷')</span>
              <span class="logo-keyword">;</span>
            </section>
            <!-- <section class="logo-bottom">}</section> -->
          </a>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto mt-lg-0">
            <li class="nav-item my-lg-0" v-for="(route, index) in routes" :key="index">
              <router-link class="nav-link" :to="route.path">{{ route.name }}</router-link>
            </li>
          </ul>
          <div class="form-inline my-2 my-lg-0 search-box" v-click-outside="close" style="display: block;">
            <i class="fa search-icon" :class="{'fa-search': !toggleSearchIcon, 'fa-spinner': toggleSearchIcon, 'fa-spin': toggleSearchIcon}"></i>
            <input class="form-control" id="search" type="mysearch" placeholder="找找看..." v-model="searchText">
            <div class="search-result" v-show="showSearchRes">
              <div class="card" style="width: 18rem;">
                <ul class="list-group list-group-flush">
                  <template  v-if="searchRes.length" >
                    <li class="list-group-item" v-for="res in searchRes" :key="res.id" @click="detail(res.id)">{{ res.title }}</li>
                  </template>
                  <template v-else>
                    <li class="list-group-item no-data">暂无搜索结果</li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </main>
</template>

<script>
import debounce from 'lodash/debounce'
import { search } from '../../api/search'
export default {
  name: 'route-nav',
  directives: { // 指令是一个方法，指令有自己的生命周期，具体请看指令相关文档
    clickOutside: {
      inserted (el, bindings, vnode) { // el：挂载的真实dom元素
        document.addEventListener('click', function (e) { // 事件源
          if (e.target === el || el.contains(e.target)) {
            return
          }
          bindings.value() // 执行绑定的事件 close
        })
      },
      unbind () { // 指令卸载时执行
        // todo
      }
    }
  },
  data () {
    return {
      routes: [],
      searchText: '',
      searchRes: [
      ],
      showSearchRes: false,
      toggleSearchIcon: false // fa-search, true: fa-spinner
    }
  },
  created () {
    this.routes = this.getNav
    this.search = debounce(this.searching, 700)
  },
  watch: {
    searchText (newval, oldval) {
      if (this.toggleSearchIcon === false) {
        this.toggleSearchIcon = true
        this.showSearchRes = false
      }
      this.search()
    }
  },
  methods: {
    searching () {
      // this.search()
      this.toggleSearchIcon = false
      if (this.searchText.trim() !== '') {
        search({ searchText: this.searchText }).then(res => {
          this.searchRes = res.data.searchRes
          setTimeout(() => {
            this.showSearchRes = true
          }, 100)
        }).catch(err => {
          this.showSearchRes = true
          console.log('search error', err.response.data.message)
        })
      }
    },
    detail (id) {
      this.$router.push({ name: 'detail', query: { id: id } })
      this.searchText = ''
    },
    close () {
      this.showSearchRes = false
    }
  },
  computed: {
    getNav () {
      let routes = this.$router.options.routes[0].children[0].children
      return routes.filter((route) => {
        if (route.isNav !== undefined && route.isNav === true) {
          return true
        }
        return false
      })
    }
  }
}
</script>

<style lang="less" scoped>
// linear-gradient(to right,  #17a2b8, #ddd,  #17a2b8)

main {
  -webkit-transition: all .5s;
  -o-transition: all .5s;
  -moz-transition: all .5s;
  transition: all .5s;
  // border-top: 4px solid #185886;
  padding:0;
  // border-top-left-radius: .3rem;
  // border-top-right-radius: .3rem;
  // border-bottom-left-radius: .1rem;
  // border-bottom-right-radius: .1rem;
  box-shadow: 0 2px 10px #999;
  // background: white;
  // background: #3A3A3A;
  background: #384548;
  line-height: 3.2rem;
  height: 3.2rem;
  // position: fixed;
  // top: 0;
  // right: 0;
  // bottom: 0;
  // left: 0;
  // margin: 0 auto;
  // z-index: 999;
}
.nav-fixed {
  position: fixed;
}
.container {
  padding: 0;
  .hidden-pc{
    // display: none;
  }
  nav {
    line-height: 3.2rem;
    height: 3.2rem;
    padding: 0;
    margin: 0 -0.6rem;
    .navbar-brand {
      margin-right: 0px;
      font-weight: 600;
      // color: #17a2b8;
      // color: #53C1DE;
      // color: #00e0e0;
      font-size: .98rem;
      padding: 0;
    }
    .logo {
      color: #fdd257;
      text-align: left;
      font-size: 1.1rem;
      font-weight: 650;
      padding-left: 5px;
      padding-right: 5px;
      // background: #ccc;
      // height: 100%;
      background-image: url('../../assets/logo_bg.png');
      background-position: left top;
      -webkit-transition: all .5s;
      -o-transition: all .5s;
      -moz-transition: all .5s;
      transition: all .5s;
      .logo-top {
        margin: 0 0 -1.2rem 0;
      }
      .logo-main {
        .logo-tag{
          // color: #A9B7C6;
        }
        // margin-left: .35rem;
        .logo-keyword {
          // font-size: 1.3rem;
          // color: #66d9ef;
          // color: rgba(0, 0, 0, .5);
          color: #17a2b8;
        }
        .logo-title {
          // color: #629755;
        }
      }
      .logo-bottom {
        text-align: right;
        margin: -1.2rem -0.5rem 0 0;
      }
    }
    .logo:hover {
      // background: #333;
      background-position: right bottom;
    }
    .router-link-exact-active, .router-link-exact-active {
      // font-weight: bold;
      color: #fff;
    }
    .nav-link {
      padding: 0 1rem;
      color: #A9B7C6;
      font-weight: 650!important;
      -webkit-transition: all .6s;
      -o-transition: all .6s;
      -moz-transition: all .6s;
      transition: all .6s;
    }
    .nav-link:hover {
      // color: #17a2b8;
      color: #fff;
    }
    .my-navbar-toggler-box {
      display: flex;
      align-items: center;
      .my-navbar-toggler{
        margin: 0 6rem 0 1rem;
        display: none
      }
    }
    .search-box {
      position: relative;
      .search-icon {
        position: absolute;
        top: 1.3rem;
        right: 12px;
        // top: 0;
        // bottom: 0;
        // left: 0;
        // right: 0;
        // margin: 0 auto;
        color: rgba(0, 0, 0, .5)
      }
      .form-control:focus{
        border-color:#fff;
        webkit-box-shadow: none;
        box-shadow: none;
      }
      input[type='mysearch'] {
        // border-radius: 20px;
        border-radius: 5px;
        transition: all .5s;
        -moz-transition: all .5s;
        -webkit-transition: all .5s;
        -o-transition: all .5s;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-right: 28px;
        font-size: .8rem;
        background: #E9E9E9;
      }
      input[type='mysearch']:focus {
        border-color: #17a2b8;
        // border: none;
      }
      // .btn-box {
      //   position: relative;
      //   .search-btn {
      //     background: #D33632;
      //     color: white;
      //     .search-btn-hover {
      //       transition: all .5s linear;
      //       position: absolute;
      //       top: 0;
      //       left: 0;
      //       width: 100%;
      //       height: 100%;
      //       background: rgba(0, 0, 0, 0)
      //     }
      //   }
      //   .search-btn:hover .search-btn-hover {
      //     background: rgba(0, 0, 0, .2)
      //   }
      // }
      .search-result {
        // display: none;
        position: absolute;
        top: 3rem;
        left: 0;
        z-index: 99;
        text-align: left;
        color: #6c757d;
        .card {
          ul {
            li {
              line-height: 2em;
              display: block;
              padding: 4px 12px;
              border: 0;
              text-indent: .3rem;
              background-clip: content-box !important;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            li:hover {
              background: #eee;
              cursor: pointer;
            }
            .no-data {
              line-height: 3rem;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
@media screen and(max-width: 900px) {
  .container {
    nav {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: relative;
      .my-navbar-toggler-box {
        .hidden-pc {
          text-align: center;
          margin: 0;
          flex: 1;
        }
        .my-navbar-toggler {
          width: 26px;
          margin: 0;
          margin-top: 2px;
          display: block !important;
          position: absolute;
          left: 1rem;
          color: #A9B7C6 !important;
        }
      }
      #navbarSupportedContent {
        position: relative;
        z-index: 5;
        background: #eee;
      }
      ul {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        li {
          display: block;
          width: 100%;
          margin: 0;
          padding-left: .5rem;
          border-bottom: 1px solid #ccc;
          a{
            color: #444 !important;
            text-align: left;
            display: flex !important;
            flex-direction: row;
          }
        }
        li:last-child {
          border-bottom: none;
        }
      }
      .search-box {
        display: none !important;
        margin: 0 2rem;
        .search-result {
          // width: 100vw;
          // .card {
          //   //  width: 100% !important;
          //   // margin-right: 2rem !important;
          // }
        }
      }
    }
  }
}
</style>
