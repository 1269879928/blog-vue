const state = {
  myroutes: {}
}
const mutations = {
  setRoutes (state, payload) {
    console.log('mutations in:', payload)
    state.myroutes = payload
  }
}
const actions = {
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
