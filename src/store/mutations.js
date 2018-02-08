import * as types from './mutations-type.js'
const mutations = {
  [types.SET_TITLE] (state, title) {
    state.title = title
  },
  [types.SET_CITY] (state, city) {
    state.city = city
  },
  [types.SET_GO_SEATS] (state, goseats) {
    state.goseats = goseats
  },
  [types.SET_SCHEDULE_ID] (state, scheduleid) {
    state.scheduleid = scheduleid
  }
}
export default mutations
