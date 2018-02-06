import * as types from './mutations-type.js'
const mutations = {
  [types.SET_TITLE] (state, title) {
    state.title = title
  },
  [types.SET_CITY] (state, city) {
    state.city = city
  }
}
export default mutations
