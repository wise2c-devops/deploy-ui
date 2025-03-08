<template>
  <div>
    <div class="welcome middle">
      <img src="../assets/images/index.png" alt="" width="100%">
      <h1 class="heading">{{$t("Index.title")}}</h1>
      <router-link to="/clusters"  class="btn btn-primary btn-lg">{{$t("Index.button")}}</router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .welcome {
    margin-top: 0px;
    text-align: center;
    a {
      color: #fff;
    }
  }
</style>
<script type="text/javascript">
</script>
