import axios from 'axios'
axios.defaults.withCredentials = true
export function me () {
  const url = 'api/me'
  const data = Object.assign({
    _t: 1517477555442
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
