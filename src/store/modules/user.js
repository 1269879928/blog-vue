const state = {
  count: 22
}
const mutations = {
  INCREMENT (state, { payload }) {
    console.log('mutations in:', payload)
    state.count += payload.number
  },
  DECREMENT (state, { payload }) {
    console.log('mutations de:', payload)
    state.count -= payload
  }
}
const actions = {
  asyncIncrement ({ commit }, { payload }) {
    console.log('actions in:', payload)
    commit('INCREMENT', { payload })
  },
  asyncDecrement ({ commit }, { payload }) {
    console.log('actions de ', payload)
    commit('DECREMENT', { payload })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
