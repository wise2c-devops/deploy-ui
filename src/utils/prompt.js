export const promptOnDelete = function (vue, description = '提示', callback = {}) {
  if(description === null) description = '提示'
  vue.$confirm(description, vue.$t('layer.tips'), {
    confirmButtonText: vue.$t('tipsButton.ok'),
    cancelButtonText: vue.$t('tipsButton.cancel'),
    type: 'warning'
  }).then(value => {
    callback(value)
  }).catch((value) => {
    value
  })
}


export const promptOnAction = function (vue, description = '确认操作', callback = {}) {
  if(description === null) description = '确认操作'
  vue.$prompt(`${description}，请输入OK`, '确认操作', {
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


export const confirmation = function (vue, description = '确认操作，是否继续？', callback = {}) {
  vue.$confirm(description, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    callback()
  }).catch(() => {
    vue.$message({
      type: 'info',
      message: '已取消'
    })
  })
}
