import axios from 'axios'
const root = process.env.API_ROOT
axios.defaults.withCredentials = true
export function me () {
  const url = root + '/me'
  const data = Object.assign({
    _t: 1517477555442
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
