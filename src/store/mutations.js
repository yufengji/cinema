import * as types from './mutations-type.js'
const mutations = {
  [types.SET_TITLE](state,title) {
    state.title = title
  }
}
export default mutations
