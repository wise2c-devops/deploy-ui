/**
 *  var a = '/api/projects/$1/pipelines/$2'
 *  formatString(a, 'abc', 'sdfs')
 * @param str
 * @param placeholders
 */
export const formatString = (str, ...placeholders) => {
  for (let index = 0; index < placeholders.length; index++) {
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
export const isNilOrEmpty = (str) => {
  const isNil = str === null || str === void 0
  if (isNil) return isNil
  if (toString.call(str) === '[object Object]') {
    return false
  }
  if (toString.call(str) === '[object Number]') {
    return false
  }
  if (toString.call(str) !== '[object String]') {
    throw Error('parameter should be string or number')
  }
  return str.trim() === ''
}

export const getDocmentTitle = (lang) => {
  let title = ''
  switch (lang) {
    case 'fr':
      title = 'Centre de déploiement'
      break
    case 'en':
      title = 'Deployment Center'
      break
    default:
      title = '部署中心'
      break
  }
  return title
}

export const getDefaultLang = () => {
  let lang = 'zh'
  if (!!navigator.language) lang = navigator.language.split('-')[0]
  return window.sessionStorage.getItem('DEPLOYMENT_LANGUAGE') || lang
}
