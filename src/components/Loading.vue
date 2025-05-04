<template type="html">
  <transition name="fade">
    <div class="loading-container" v-if="loading">
      <div class="sk-cube-grid loading">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
  @import "../assets/stylesheets/variables";
  .loading-container {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 99999;
    background: rgba(0, 0, 0, 0.25);
    top: 0;
    left: 0;
    .loading {
      margin-top: 20%;
      width: 50px;
      height: 50px;
      .sk-cube {
        background-color: $green-color;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
<script type="text/javascript">
  import {hideLoading} from '../vuex/actions'
  var timer
  export default{
    vuex: {
      getters: {
        loading: (state) => state.loading
      },
      actions: {
        hideLoading
      }
    },
    mounted() {
      timer = setInterval(() => {
        let error = localStorage.getItem('error')
        if(!!error){
          this.hideLoading()
          localStorage.removeItem('error')
        }
      }, 1000)
    },
    beforeDestroy() {
      clearInterval(timer)
    }
  }
</script>
