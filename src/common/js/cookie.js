export function setCookie (cname, cvalue, exdays) {
  let d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  let expires = 'expires=' + d.toGMTString()
  document.cookie = cname + '=' + escape(cvalue) + ';' + expires
}
export function getCookie (name) {
  var _cookie = document.cookie
  var _arr = _cookie.split('; ')
  for (let i = 0; i < _arr.length; i++) {
    let arr = _arr[i].split('=')
    if (arr[0] === name) {
      if (name === 'cityName') {
        return unescape(arr[1])
      }
      return arr[1]
    }
  }
  return ''
}
export function deleteCookie (name) {
  let d = new Date()
  d.setTime(d.getTime() - (24 * 60 * 60 * 1000))
  let expires = 'expires=' + d.toGMTString()
  let delVal = getCookie(name)
  if (delVal !== null) {
    document.cookie = name + '=' + escape(delVal) + ';' + expires
  }
}
