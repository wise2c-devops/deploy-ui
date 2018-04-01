<template>
  <div class="host-index">
    <ul class="nav nav-pills nav-stacked">
      <li role="presentation" :class="getActiveClass('hosts')"><router-link :to="hostsUrl"><i class="el-icon-menu"></i>主机</router-link></li>
      <li role="presentation" :class="getActiveClass('components')"><router-link :to="componentsUrl"><i class="el-icon-setting"></i>服务组件</router-link></li>
      <li role="presentation" :class="getActiveClass('logs')"><router-link :to="logsUrl"><i class="el-icon-document"></i>安装日志</router-link></li>
    </ul>
    <router-view :cluster="cluster" class="host-wrapper"></router-view>
  </div>
</template>

<style lang="scss">
  @import "../assets/stylesheets/variables";
  .host-index{
    .nav-pills {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background: #fff;
      width: 180px;
      padding-top: 20px;
    }
    .host-wrapper {
      padding-left: 180px;
      .add-host {
        margin-right: 0;
      }
    }
  }
</style>
<script>
import {fetchClusterDetail} from '../vuex/modules/cluster'
export default {
  data() {
    return {
      subMenu: 'hosts',
      cluster: {}
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
    },
    logsUrl() {
      return `/clusters/${this.id}/logs`
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
    this.fetchClusterDetail(this.id)
  },
  beforeDestroy() {
    this.$root.$off('clusterPage')
  },
  vuex: {
    actions: {
      fetchClusterDetail
    }
  }
}
</script>
