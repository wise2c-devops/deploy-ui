<template>
  <div class="process-container">
    <ul class="clear-style row m0 process">
      <li class="pull-left" v-for="(item, index) in validStages" :key="index">
        <div class="box">
          <div class="text-center">
            <i :class="getIconClass(item)"></i>
            <p class="title">{{item.name}}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="logs">
      <div v-for="(log, index) in logs" :key="index" class="log">
        {{log}}
      </div>
    </div>
    <div class="btn-wrapper row">
      <div class="col-md-2 col-md-offset-4">
        <el-button size="large" icon="arrow-left" class="pull-left " @click="back" v-if="false">返回</el-button>
      </div>
      <div class="col-md-2">
        <el-button size="large" icon="close" type="danger" @click="cancelDeployment">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { pop } from '../utils/alert'
import { cancel, getCluster, fetchClusterDetail } from 'vuexPath/modules/cluster'
import { findLast, filter } from 'lodash'
export default {
  computed: {
    clusterId() {
      return this.$route.params.id
    },
    validStages() {
      return filter(this.stages, (stage) => {
        var target = findLast(this.cluster.components, (component) => {
          return component.name === stage.value
        })
        return !!target
      })
    }
  },
  data() {
    return {
      logs: [],
      stages: [
        { name: 'Registry', icon: 'wise-icon-registry', value: 'registry', enabled: false },
        { name: 'Etcd', icon: 'wise-icon-etcd', value: 'etcd', enabled: false },
        { name: 'Mysql', icon: 'wise-icon-mysql', value: 'mysql', enabled: false },
        { name: 'LoadBalance', icon: 'wise-icon-lb-service', value: 'loadbalancer', enabled: false },
        { name: 'K8sMaster', icon: 'wise-icon-kubernets', value: 'k8smaster', enabled: false },
        { name: 'K8sNode', icon: 'wise-icon-kubernets', value: 'k8snode', enabled: false },
        { name: 'Wisecloud', icon: 'wise-icon-wisecloud', value: 'wisecloud', enabled: false }
      ]
    }
  },
  methods: {
    back() {
      this.$router.push({
        path: `/clusters/${this.clusterId}/hosts`
      })
    },
    cancelDeployment() {
      this.cancel(this.clusterId, () => {
        pop('取消安装成功')
        this.back()
      })
    },
    getIconClass(item) {
      return [item.icon, item.enabled ? "enabled" : ""]
    }
  },
  mounted() {
    this.fetchClusterDetail(this.clusterId)
    var socket = new WebSocket(`${process.env.WEBSOCKET_HOST}/v1/stats`)
    socket.onopen = (event) => {
      console.info('Success link to backend server')
    }
    socket.onmessage = (event) => {
      var json = JSON.parse(event.data)
      console.log(json)
      this.logs.push(`${json.now}: 【${json.stage}】${json.data.msg}`)
      if (json.state === 'ok') {
        var stage = findLast(this.stages, (stage) => {
          return stage.value === json.stage
        })
        stage.enabled = true
      }
    }
  },
  vuex: {
    actions: {
      cancel,
      fetchClusterDetail
    },
    getters: {
      cluster: getCluster
    }
  }
}
</script>
<style lang="scss">
@import "../assets/stylesheets/variables";
.process-container {
  width: 80%;
  margin: 0 auto;
  margin-top: 100px;
  .process {
    margin-left: 50px;
    height: 150px;
    li {
      border-top: 1px solid #cdd1d9;
      padding-left: 10%;
      .box {
        width: 70px;
        position: relative;
        top: -30px;
        background: #f5f8fa;
      }
      .box>div {
        margin: auto;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 2px solid #cdd1d9;
        color: #cdd1d9;
        i {
          font-size: 40px;
          &.enabled {
            color: $green-color;
          }
        }
        p.title {
          color: $main-font-color;
          margin-top: 10px;
          font-size: 14px;
        }
      }
      &:first-child {
        padding-left: 0;
      }
    }
    .btn-wrapper {
      padding-top: 50px;
      margin: auto;
    }
  }
  .logs {
    width: 70%;
    margin: 50px auto;
    padding: 20px;
    border-top: 30px solid #b3b3b3;
    background: lighten(#000, 15%);
    border-radius: 8px;
    color: #fff;
    counter-reset: subsection;
    .log {
      font-size: 14px;
      margin-bottom: 5px;
      &:before {
        counter-increment: subsection;
        content: counter(subsection);
        margin-right: 10px;
        color: #666;
      }
    }
  }
}
</style>
