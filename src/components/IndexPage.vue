<template>
  <div class="row">
    <div class="col-md-8 col-md-offset-2 welcome">
      <h1>欢迎使用 Wisecloud 组件部署系统</h1>
      <a class="btn btn-primary btn-lg">开始</a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .welcome {
    text-align: center;
  }
</style>
<script type="text/javascript">

export default {
  components: {
  },
  vuex: {
  },
  created() {
    this.$root.eventHub.$emit('UPDATE_TITLE', '首页')
  }
}
</script>
