import axios from 'axios'
axios.defaults.withCredentials = true
const root = process.env.API_ROOT
export function cinema (id) {
  const url = root + '/film/' + id + '/cinema'
  const data = Object.assign({
    _t: 1517477555442
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function areacinema () {
  const url = root + '/cinema'
  const data = Object.assign({
    _t: 1517477555442
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function cinemadetail (cinemaid) {
  const url = root + '/cinema/' + cinemaid
  const data = Object.assign({
    _t: 1517477555442
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function cinemaitem (cinemaid) {
  const url = root + '/cinema/' + cinemaid + '/item'
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
  const url = root + '/schedule'
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
export function seatingChart (scheduleid) {
  const url = root + '/seating-chart/' + scheduleid
  const data = Object.assign({
    _t: 1517477555442
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function scheduleDetail (scheduleid) {
  const url = root + '/schedule/' + scheduleid
  const data = Object.assign({
    _t: 1517477555442
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
