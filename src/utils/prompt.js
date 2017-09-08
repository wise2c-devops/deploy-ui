export const promptOnDelete = function (vue, description = '确认删除', callback = {}) {
  if(description === null) description = '确认删除'
  vue.$prompt(`${description}，请输入OK`, '确认删除', {
    inputErrorMessage: '输入不正确',
    inputValidator(value) {
      if (value === null) return false
      if ('ok' === value.toLowerCase()) return true
      return false
    }
  }).then(value => {
    callback(value)
  }).catch((value) => {
    value
  })
}
