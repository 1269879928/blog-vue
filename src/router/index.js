import Vue from 'vue'
import VueRouter from 'vue-router'
// import routes from './routers'
import myrouter from './myrouter'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: myrouter
})
export default router
