/**
 *  var a = '/api/projects/$1/pipelines/$2'
 *  formatString(a, 'abc', 'sdfs')
 * @param str
 * @param placeholders
 */
export const formatString = function (str, ...placeholders) {
  for (var index = 0; index < placeholders.length; index++) {
    str = str.replace(`$${index + 1}`, placeholders[index])
  }
  return str
}

/**
 * parameter must be string
 * validate the str is
 * null  OR undefined OR str.trim() is ''
 * @param str
 */
export const isNilOrEmpty = function (str) {
  let isNil = str === null || str === void 0
  if (isNil) return isNil
  if (toString.call(str) === '[object Object]') {
    return false
  }
  if (toString.call(str) === '[object Number]'){
    return false
  }
  if (toString.call(str) !== '[object String]'){
    throw Error('parameter should be string or number')
  }
  return str.trim() === ''
}
