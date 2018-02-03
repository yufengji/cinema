export function setCookie (cname, cvalue, exdays) {
  let d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  let expires = 'expires=' + d.toGMTString()
  document.cookie = cname + '=' + escape(cvalue) + ';' + expires
}
