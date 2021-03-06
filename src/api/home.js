import axios from 'axios'
axios.defaults.withCredentials = true
const root = process.env.API_ROOT
export function billboard () {
  const url = root + '/billboard/home'
  const data = Object.assign({
    _t: 1517477555442
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
