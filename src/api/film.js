import axios from 'axios'
const root = process.env.API_ROOT
export function DetailFilm (id) {
  const url = root + '/film/' + id
  const data = Object.assign({
    _t: 1517477555442
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function CinemaFilm (cinemaid) {
  const url = root + '/cinema/' + cinemaid + '/film'
  const data = Object.assign({
    _t: 1518415239215
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
