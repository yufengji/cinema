import axios from 'axios'
axios.defaults.withCredentials = true
export function cinema (id) {
  const url = 'api/film/' + id + '/cinema'
  const data = Object.assign({
    _t: 1517477555442
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function schedule (film, cinema) {
  const url = 'api/schedule'
  const data = Object.assign({
    _t: 1517477555442,
    film: film,
    cinema: cinema
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
