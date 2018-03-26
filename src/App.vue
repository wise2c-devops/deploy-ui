<template>
  <div id="app">
    <div class="header">
      <a href="http://hk.mikecrm.com/Sf9KvOR" target="_blank">联系我们</a>
    </div>
    <router-view ></router-view>
    <loading></loading>
    <div class="footer">
      开发人员：华相（<a>huaxiang@wise2c.com</a>）、 Ann（<a>weisy@wise2c.com</a>）
    </div>
  </div>
</template>
<style lang="scss">
  #app {
    margin-top: 100px;
  }
  .header {
    height: 50px;
    border-bottom: 1px solid #ccc;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: white;
    a {
      display: inline-block;
      color: #545454;
      position: absolute;
      width: 150px;
      right: 0;
      text-align: center;
      font-size: 16px;
      border-left: 1px solid #ccc;
      line-height: 50px;
    }
  }
  .footer {
    text-align: center;
    position: fixed;
    bottom: 15px;
    left: 0;
    right: 0;
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
