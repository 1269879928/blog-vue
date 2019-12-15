const state = {
  imgShade: false
}
const mutations = {
  ToggleContentStatus (state, { payload }) {
    state.imgShade = payload
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
