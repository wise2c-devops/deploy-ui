export const validationError = {
  computed: {
    hasError() {
      return this.errors.items.length !== 0
    }
  }
}
