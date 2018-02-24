import axios from 'axios'
import md5 from 'js-md5'
axios.defaults.withCredentials = true
const root = process.env.API_ROOT
export function code (mobile, type) {
  const url = root + '/code'
  const data = Object.assign({
    mobile: mobile,
    type: type
  })
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function loginValideta (code, codeKey, username, pwd) {
  const url = root + '/login'
  const data = Object.assign({
    code: code,
    codeKey: codeKey,
    loginType: 1,
    password: md5(pwd),
    username: username
  })
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function captcha (username, pwd) {
  const url = root + '/login/captcha'
  const data = Object.assign({
    _t: 1517477555442
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
