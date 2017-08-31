export const showLoading = function ({ dispatch }, success = null) {
  dispatch('UPDATE_LOADING', true)
  if (success !== null) success()
  //强制清除 loading
  setTimeout(() => {
    dispatch('UPDATE_LOADING', false)
  }, 20000)

}

export const hideLoading = function ({ dispatch }, success = null) {
  setTimeout(() => {
    dispatch('UPDATE_LOADING', false)
    if (success !== null) success()
  }, 500)
}
