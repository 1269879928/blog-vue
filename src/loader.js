import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })// NProgress Configuration
// 页面第一次加载，显示加载loading页面
store.commit({
  type: 'loader/ToggleLoading',
  payload: true
})

let loadStatus = store.state.loader.showLoadingPage
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  next()
})
router.afterEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (loadStatus) {
    setTimeout(() => {
      store.commit({
        type: 'loader/ToggleLoading',
        payload: false
      })
      loadStatus = false
      // console.log('loadStatus2， 一次加载结束', loadStatus)
    }, 1000)
  }
  // console.log('loadStatus', loadStatus)
  NProgress.done()
})
