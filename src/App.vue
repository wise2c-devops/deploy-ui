<template>
  <div id="app">
    <!-- <div class="contact-us">
      <a href="http://hk.mikecrm.com/Sf9KvOR" target="_blank">联系我们</a>
    </div> -->
    <div class="content">
      <router-view class="content-body"></router-view>
      <div class="footer">
        {{$t("Index.developers")}}：睿云智合 (Wise2C)
        <span class="split-line">|</span>
        &nbsp;&nbsp;
        <a href="http://hk.mikecrm.com/Sf9KvOR" target="_blank"> {{$t("Index.contact")}}</a>
        &nbsp;&nbsp;
        <span class="split-line">|</span>
        &nbsp;
        <el-dropdown  @command="changeI18n">
          <span class="el-dropdown-link">
            {{lang}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="'中文'">中文</el-dropdown-item>
            <el-dropdown-item :command="'English'">English</el-dropdown-item>
            <el-dropdown-item :command="'Français'">Français</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
  import {getDocmentTitle, getDefaultLang} from 'utils/string'
  // import {showLoading, hideLoading} from './vuex/actions'
  import store from './vuex/store'
  // 导入 mapActions
  import { mapActions } from 'vuex'

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
        content: "",
        lang: this.getPlayLang()
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
    methods: Object.assign(
      // 使用 mapActions 映射 Vuex actions 到组件方法
      mapActions(['showLoading', 'hideLoading']),
      {
        getPlayLang() {
          const lang = getDefaultLang()
          if (lang === 'en') return 'English'
          if (lang === 'fr') return 'Français'
          else return '中文'
        },
        goPath(flag, path) {
          this.showContactUs = flag
          this.$router.push({
            path: path
          })
        },
        changeI18n(langType) {
          this.lang = langType

          switch (langType) {
            case 'English':
              window.sessionStorage.setItem('DEPLOYMENT_LANGUAGE', 'en')
              break
            case 'Français':
              window.sessionStorage.setItem('DEPLOYMENT_LANGUAGE', 'fr')
              break
            default:
              window.sessionStorage.setItem('DEPLOYMENT_LANGUAGE', 'zh')
              break
          }
          this.$i18n.locale = window.sessionStorage.getItem('DEPLOYMENT_LANGUAGE')
          document.title = `Kubernetes ${getDocmentTitle(window.sessionStorage.getItem('DEPLOYMENT_LANGUAGE'))}`
        }
      }
    )
    // 删除旧的vuex配置
    // vuex: {
    //   actions: {
    //     showLoading,
    //     hideLoading
    //   }
    // }
  }
</script>

<style lang="scss">
  @import "./assets/stylesheets/variables";
  @import "./assets/stylesheets/main.scss";
  @import "./assets/vendor/bootstrap/stylesheets/bootstrap.scss";
  @import "./assets/vendor/font-awesome/scss/font-awesome.scss";
  @import "./assets/stylesheets/theme";
</style>
