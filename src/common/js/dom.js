export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
export function removeClass (el, className) {
  let _class = el.className.split(' ')
  let newClass = []
  for (let i = 0; i < _class.length; i++) {
    if (_class[i] !== className) {
      newClass.push(_class[i])
    }
  }
  el.className = newClass.join(' ')
}
export function removeArray (index, arr) {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
