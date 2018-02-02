import axios from 'axios'
import {commonParms} from './config.js'
export function city () {
  const url = 'api/city'
  const data = Object.assign({}, commonParms)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
