<template>
  <div id="app">
    <!-- <div class="contact-us">
      <a href="http://hk.mikecrm.com/Sf9KvOR" target="_blank">联系我们</a>
    </div> -->
    <div class="content">
      <router-view class="content-body"></router-view>
      <div class="footer">
        {{$t("Index.developers")}}：华相（huaxiang@wise2c.com）、 Ann（weisy@wise2c.com）
        <span class="split-line">|</span>
        &nbsp;&nbsp;
        <a href="http://hk.mikecrm.com/Sf9KvOR" target="_blank"> {{$t("Index.contact")}}</a>
        &nbsp;&nbsp;
        <span class="split-line">|</span>
        &nbsp;
        <span type="" class="btn " @click="changeI18n">中文 / EN</span>
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
      height: 100%;
      overflow-y: auto;
      > .content-body {
        padding: 20px;
        height: auto;
        width: auto;
        min-height: 95%;
        min-width: 100%;
        overflow: visible;
      }
    }
  }
  .footer {
    line-height: 31px;
    width: 100%;
    text-align: center;
    position: relative;
    bottom: 0;
    // background: rgb(40, 51, 57);
    // color: #fff;
    z-index: 1;
    .split-line {
      color: #ccc;
    }
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
      },
      changeI18n() {
        this.$confirm(this.$t('layer.toggle'), this.$t('layer.tips'), {
          confirmButtonText: this.$t('tipsButton.ok'),
          cancelButtonText: this.$t('tipsButton.cancel'),
          type: 'warning'
        }).then(() => {
          const local = localStorage.getItem('DEPLOYMENT_LANGUAGE')
          if (!local || local === 'zh') {
            localStorage.setItem('DEPLOYMENT_LANGUAGE', 'en')
          }else {
            localStorage.setItem('DEPLOYMENT_LANGUAGE', 'zh')
          }
          this.$i18n.locale = localStorage.getItem('DEPLOYMENT_LANGUAGE')
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          // })
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
