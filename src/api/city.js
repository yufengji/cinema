import axios from 'axios'
import {commonParms} from './config.js'
const root = process.env.API_ROOT
export function city () {
  const url = root + '/city'
  const data = Object.assign({}, commonParms)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
