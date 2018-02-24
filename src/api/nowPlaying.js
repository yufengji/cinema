import axios from 'axios'
const root = process.env.API_ROOT
export function nowPlaying (page, count) {
  const url = root + '/film/now-playing'
  const data = Object.assign({
    page: page,
    count: count
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function comingSoon (page, count) {
  const url = root + '/film/coming-soon'
  const data = Object.assign({
    page: page,
    count: count
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
