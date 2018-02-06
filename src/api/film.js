import axios from 'axios'
export function DetailFilm (id) {
  const url = 'api/film/' + id
  const data = Object.assign({
    _t: 1517477555442
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
