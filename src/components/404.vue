<template>
  <div class="container error-container">
    <div class="float-left"><img src="../assets/images/404.png" alt=""></div>
    <div class="float-left">
      <p class="error-title">404</p>
      <p class="info">杯具了，访问的页面不存在：（</p>
      <p class="time">{{time}}秒之后<router-link to="/" class="back-btn">返回</router-link>首页</p>
    </div>
  </div>
</template>
<style lang="scss">
  .container.error-container {
    padding-left: 4%;
    text-align: center;
    img {
      width: 40%;
      margin-top: 5%;
    }
    p {
      margin: 0px;
    }
    .error-title{
      font-size: 200px;
      font-weight: bold;
      font-style: oblique;
      color: #2c98f0;
    }
    .info {
      font-size: 20px;
      font-weight: bold;
      margin-top: -30px;
    }
    .time {
      padding-top: 20px
    }
  }
</style>
<script tyee="text/javscript">
  let timer
  export default {
    data() {
      return {
        time: 5
      }
    },
    mounted() {
      timer = setInterval(() => {
        if (this.time === 0) {
          clearInterval()
          this.$router.push({ path: '/' })
        } else {
          this.time -= 1
        }
      }, 1000)
    },
    destroyed() {
      clearInterval(timer)
    }
  }
</script>
