<template>
  <div id="app">
    <!-- <div class="contact-us">
      <a href="http://hk.mikecrm.com/Sf9KvOR" target="_blank">联系我们</a>
    </div> -->
    <div class="content">
      <router-view class="content-body"></router-view>
      <div class="footer">
        开发人员：华相（<a>huaxiang@wise2c.com</a>）、 Ann（<a>weisy@wise2c.com</a>）
      </div>
    </div>
    <loading></loading>
  </div>
</template>
<style lang="scss">
  #app {
    width: 100%;
    min-height: 100vh;
    height: auto;
    position: relative;
    min-width: 290px;
    overflow: hidden;
    // .contact-us {
    //   position: absolute;
    // }
    .content {
      position: absolute;
      left: 0;
      top: 0px;
      right: 0px;
      bottom: 0;
      width: auto;
      > .content-body {
        height: 95%;
        padding: 20px;
      }
    }
  }
  .footer {
    line-height: 31px;
    width: 100%;
    text-align: center;
    position: relative;
    bottom: 0;
  }
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
        showContactUs: true,
        content: ""
      }
    },
    store,
    created () {
      this.showLoading()
      this.hideLoading()
    },
    mounted () {
    },
    computed : {
    },
    methods: {
      goPath(flag, path) {
        this.showContactUs = flag
        this.$router.push({
          path: path
        })
      }
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
