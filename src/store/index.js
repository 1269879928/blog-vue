import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import loader from './modules/loader'
import routes from './modules/routes'
import index from './modules/index'
import imgShade from './modules/imgShade'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    user,
    loader,
    routes,
    index,
    imgShade
  }
})
