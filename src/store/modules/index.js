const state = {
  tags: []
}
const mutations = {
  setTags (state, payload) {
    state.tags = payload
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
