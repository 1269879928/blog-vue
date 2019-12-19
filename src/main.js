import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './loader'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/scss/bootstrap.scss'
// import 'bootstrap/dist/js/bootstrap.min.js'
// import 'font-awesome/css/font-awesome.min.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

import { Backtop, Icon, Tooltip, Divider } from 'element-ui'
import { Skeleton, Affix } from 'ant-design-vue'
Vue.use(Skeleton)
Vue.use(Affix)
Vue.use(Backtop)
Vue.use(Icon)
Vue.use(Tooltip)
Vue.use(Divider)

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
