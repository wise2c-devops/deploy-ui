<template>
  <div id="app">
    <router-view ></router-view>
    <loading></loading>
  </div>
</template>
<style lang="scss">

</style>
<script type="text/javascript">
  import Loading from './components/Loading.vue'
  import {showLoading, hideLoading} from './vuex/actions'
  import store from './vuex/store'
  export default {
    components: {
      Loading
    },
    data() {
      return {
        title: 'Deployment UI',
        collapse: true,
        mainCollsapn: {key: false},
        showMainNav: false,
        content: ""
      }
    },
    store,
    // watch: {
    //   '$route'(to) {
    //     this.mainCollsapn.key = false
    //   }
    // },
    created () {
      this.showLoading()
      this.hideLoading()
    },
    mounted () {
    },
    computed : {
    },
    methods: {
    },
    vuex: {
      actions: {
        showLoading,
        hideLoading
      }
    }
  }
</script>

<style lang="scss">
  @import "./assets/stylesheets/variables";
  @import "./assets/stylesheets/main.scss";
  @import "./assets/vendor/bootstrap/stylesheets/bootstrap.scss";
  @import "./assets/vendor/font-awesome/scss/font-awesome.scss";
  @import "./assets/stylesheets/theme";
</style>
