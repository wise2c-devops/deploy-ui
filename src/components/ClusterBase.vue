<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <router-link :to="hostsUrl"><i class="el-icon-menu"></i>主机</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link :to="componentsUrl"><i class="el-icon-setting"></i>服务组件</router-link>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="col-md-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  ul {
    padding-top: 100px;
    padding-bottom: 100px;
  }
</style>
<script>
export default {
  computed: {
    id() {
      return this.$route.params.id
    },
    hostsUrl() {
      return `/clusters/${this.id}/hosts`
    },
    componentsUrl() {
      return `/clusters/${this.id}/components`
    }
  },
  mounted() {
    console.log(this.$route)
  }
}
</script>
