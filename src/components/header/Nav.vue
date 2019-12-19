<template>
  <main class="bg-content">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-withe pl-0">
        <!-- <router-link class="navbar-brand" to="/">shijting</router-link> -->
        <div class="my-navbar-toggler-box">
          <span class="navbar-toggler-icon my-navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></span>
          <a class="navbar-brand hidden-pc" href="/">SHIJTING</a>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto mt-lg-0">
            <li class="nav-item my-2 my-lg-0" v-for="(route, index) in routes" :key="index">
              <router-link class="nav-link" :to="route.path">{{ route.name }}</router-link>
            </li>
          </ul>
          <div class="form-inline my-2 my-lg-0 search-box" v-click-outside="close">
            <i class="fa search-icon" :class="{'fa-search': !toggleSearchIcon, 'fa-spinner': toggleSearchIcon, 'fa-spin': toggleSearchIcon}"></i>
            <input class="form-control" id="search" type="mysearch" placeholder="搜索..." v-model="searchText">
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
  border-top: 4px solid #185886;
  padding: 2px 0;
  border-top-left-radius: .4rem;
  border-top-right-radius: .4rem;
  border-bottom-left-radius: .1rem;
  border-bottom-right-radius: .1rem;
  box-shadow: 0 2px 10px #ccc;
  // height: 55px;
  // position: fixed;
  // top: 0;
  // right: 0;
  // bottom: 0;
  // left: 0;
  // margin: 0 auto;
  // z-index: 2;
}
.container {
  padding: 0;
  .hidden-pc{
    // display: none;
  }
  nav {
    padding: 5px 0;
    .navbar-brand {
      font-weight: 700!important;
      // color: #17a2b8;
      color: #53C1DE;
      font-size: .98rem;
    }
    .router-link-exact-active {
      // font-weight: bold;
      // color: #53C1DE;
    }
    .nav-link {
      padding: .5rem 1rem;
      font-weight: 650!important;
      -webkit-transition: all .6s;
      -o-transition: all .6s;
      transition: all .6s;
    }
    .nav-link:hover {
      // color: #17a2b8;
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
        top: 7px;
        // left: 10px;
        right: 10px;
        color: rgba(0, 0, 0, .5)
      }
      .form-control:focus{
        border-color:#fff;
        webkit-box-shadow: none;
        box-shadow: none;
      }
      input[type='mysearch'] {
        height: 1.85rem;
        border-radius: 20px;
        transition: all .5s;
        -moz-transition: all .5s;
        -webkit-transition: all .5s;
        -o-transition: all .5s;
        padding-right: 28px;
        font-size: .8rem;
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
        top: 38px;
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
        }
      }
      ul {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        li a{
          text-align: left;
          display: flex !important;
          flex-direction: row;
        }
      }
      .search-box {
        // display: none;
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
