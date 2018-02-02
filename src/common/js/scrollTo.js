export function down (pheight) {
  var start = 0
  var scroDIST = 100
  var stime = 10
  var d = setInterval(function () {
    window.scrollTo(start, start + scroDIST)
    start = start + scroDIST
    if (start >= pheight) {
      clearInterval(d)
    }
  }, stime)
}
