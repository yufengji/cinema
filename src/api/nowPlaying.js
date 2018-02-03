import axios from 'axios'
export function nowPlaying (page, count) {
  const url = 'api/film/now-playing'
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
  const url = 'api/film/coming-soon'
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
