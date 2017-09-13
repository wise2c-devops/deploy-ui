<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2">
        <ul class="nav nav-pills nav-stacked">
          <li role="presentation" :class="getActiveClass('hosts')"><router-link :to="hostsUrl"><i class="el-icon-menu"></i>主机</router-link></li>
          <li role="presentation" :class="getActiveClass('components')"><router-link :to="componentsUrl"><i class="el-icon-setting"></i>服务组件</router-link></li>
        </ul>
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
    font-size: 16px;
    li {
      i {
        margin-right: 10px;
      }
    }
  }
</style>
<script>
export default {
  data() {
    return {
      subMenu: 'hosts'
    }
  },
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
  methods: {
    getActiveClass(type) {
      return this.subMenu === type ? 'active' : ''
    }
  },
  mounted() {
    this.$root.$on('clusterPage', (name) => {
      this.subMenu = name
    })
  },
  beforeDestroy() {
    this.$root.$off('clusterPage')
  }
}
</script>
