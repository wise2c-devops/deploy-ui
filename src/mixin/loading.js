export default {
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    showLoading() {
      this.isLoading = true
    },
    hideLoading() {
      this.isLoading = false
    }
  }
}
