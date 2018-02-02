import axios from 'axios'
export function billboard () {
  const url = 'api/billboard/home'
  const data = Object.assign({
    _t: 1517477555442
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function nowPlayig () {
  const url = 'api/film/now-playing'
  const data = Object.assign({
    page: 1,
    count: 7
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
