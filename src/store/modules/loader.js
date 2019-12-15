const state = {
  showLoadingPage: false
}
const mutations = {
  ToggleLoading (state, { payload }) {
    state.showLoadingPage = payload
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
