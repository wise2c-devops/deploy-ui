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
        <span class="line-number">{{index + 1}}</span>
        <p v-html="log"></p>
      </div>
    </div>
    <div class="btn-wrapper row">
      <div class="col-md-3 col-md-offset-5">
        <el-button size="large" icon="arrow-left" class="pull-left " @click="back">{{$t('tipsButton.back')}}</el-button>
        <el-button size="large" icon="close" type="danger" @click="cancelDeployment" v-if="!isDone">{{$t('tipsButton.cancel')}}</el-button>
        <el-button size="large" icon="check" type="primary" @click="back" v-if="isDone">{{$t('tipsButton.done')}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { pop } from '../utils/alert'
import { cancel, getCluster, fetchClusterDetail, getClusterStatus, fetchClusterStatus } from 'vuexPath/modules/cluster'
import { findLast, findIndex, sortBy } from 'lodash'
export default {
  computed: {
    clusterId() {
      return this.$route.params.id
    },
    validStages() {
      const slectComponents = JSON.parse(localStorage.getItem('selectComponents'))
      let result = []
      slectComponents.forEach(component=>{
        var target = findLast(this.stages, stage=>stage.value === component)
        if(target) {
          result.push(target)
        }else {
          const obj = {
            name: component,
            icon: 'wise-icon-sys-operating--evn',
            enabled: false,
            sort: this.stages.length + 1
          }
          result.push(obj)
          this.stages.push(obj)
        }
      })
      return sortBy(result, v=>v.sort)
    },
    isDone() {
      if (this.failed || (!!this.cluster && this.cluster.state === 'success')) {
        return true
      }
      if (this.validStages.length > 0) {
        return this.validStages[this.validStages.length - 1].enabled
      }
      return false
    }
  },
  data() {
    return {
      failed: false,
      logs: [],
      stages: [
        { name: 'Docker', icon: 'wise-icon-docker-three', value: 'docker', enabled: false, sort: 1 },
        { name: 'Harbor', icon: 'wise-icon-harbor', value: 'harbor', enabled: false, sort: 2 },
        { name: 'LoadBalancer', icon: 'wise-icon-lb-service', value: 'loadbalancer', enabled: false, sort: 3 },
        { name: 'Etcd', icon: 'wise-icon-etcd', value: 'etcd', enabled: false, sort: 4 },
        { name: 'Kubernetes', icon: 'wise-icon-kubernets', value: 'kubernetes', enabled: false, sort: 5 },
        { name: 'Prometheus', icon: 'wise-icon-prometheus', value: 'prometheus', enabled: false, sort: 6 },
        { name: 'Mysql', icon: 'wise-icon-mysql', value: 'mysql', enabled: false, sort: 7 },
        { name: 'Redis', icon: 'wise-icon-redis', value: 'redis', enabled: false, sort: 8 },
        { name: 'Consul', icon: 'wise-icon-consul', value: 'consul', enabled: false, sort: 9 },
        { name: 'Rabbitmq', icon: 'wise-icon-rabbitmq', value: 'rabbitmq', enabled: false, sort: 10 },
        { name: 'Nats', icon: 'wise-icon-sys-operating--evn', value: 'nats', enabled: false, sort: 11 },
        { name: 'Wisecloud', icon: 'wise-icon-wisecloud', value: 'wisecloud', enabled: false, sort: 12 },
        { name: 'Helm', icon: 'wise-icon-helm', value: 'helm', enabled: false, sort: 13 },
        { name: 'Contour', icon: 'wise-icon-contour', value: 'contour', enabled: false, sort: 14 },
        { name: 'Istio', icon: 'wise-icon-istio', value: 'istio', enabled: false, sort: 15 },
        { name: 'Jaeger', icon: 'wise-icon-jaeger', value: 'jaeger', enabled: false, sort: 16 },
        { name: 'Kong', icon: 'wise-icon-kong', value: 'kong', enabled: false, sort: 17 },
        { name: 'Ambassador', icon: 'wise-icon-ambassador', value: 'ambassador', enabled: false, sort: 18 },
        { name: 'ElasticCloud', icon: 'wise-icon-elasticcloud', value: 'elasticcloud', enabled: false, sort: 19 }
        { name: 'CRIO', icon: 'wise-icon-crio', value: 'crio', enabled: false, sort: 20 }
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
        const msg = this.$i18n.locale === 'zh'? '取消安装成功': 'Uninstall success'
        pop(msg)
        this.back()
      })
    },
    getIconClass(item) {
      return [item.icon, item.enabled ? "enabled" : ""]
    }
  },
  created() {
    this.fetchClusterDetail(this.clusterId)
  },
  mounted() {
    if (this.cluster.state === 'processing'){
      this.fetchClusterStatus(this.clusterId, () => {
        //显示那些组件已经安装了
        const index = findIndex(this.stages, (stage) => {
          return stage.value === this.status.currentStage
        })
        if(!!this.cluster && this.cluster.state !== 'success' && index > 0 ) {
          for(var tempIndex = 0; tempIndex < index; tempIndex ++) {
            this.stages[tempIndex].enabled = true
          }
        }
      })
    }
    var url = `${process.env.WEBSOCKET_HOST}/v1/stats`
    if (process.env.NODE_ENV === 'production') {
      url = `ws://${location.host}/v1/stats`
    }
    var socket = new WebSocket(url)
    socket.onopen = (event) => {
      console.info('Success link to backend server', event)
    }
    socket.onmessage = (event) => {
      var json = JSON.parse(event.data)
      if (json.state === 'failed') {
        this.failed = true
      }

      this.logs.push(`${json.time}: [${json.stage}] [${json.host}]  task: ${json.task.name} - ${json.task.state},  message: ${json.data.msg}`)
      if (json.state === 'ok') {
        var stage = findLast(this.stages, (stage) => {
          return stage.value === json.stage
        })
        if (!!stage) {
          stage.enabled = true
        }
      }
    }
  },
  vuex: {
    actions: {
      cancel,
      fetchClusterDetail,
      fetchClusterStatus
    },
    getters: {
      cluster: getCluster,
      status: getClusterStatus
      // selectComponents: state=>state.cluster.selectComponents
    }
  }
}
</script>
<style lang="scss">
@import "../assets/stylesheets/variables";
.process-container {
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  .process {
    width: 76%;
    margin: 0 auto;
    height: auto;
    li {
      border-top: 1px solid #cdd1d9;
      padding-left: 7%;
      margin-top: 60px;
      .box {
        width: 70px;
        position: relative;
        top: -30px;
        background: #f5f8fa;
      }
      &:last-child {
        .box>div {
          padding-right: 8px;
          padding-top: 6px;
          i {
            font-size: 35px;
          }
        }
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
}

.logs {
  width: 80%;
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
    span {
      display: inline-block;
      color: #666;
      text-align: right;
      width: 30px;
      margin-right: 10px;
    }
    p {
      display: inline-block;
      text-overflow: ellipsis;
      width: 92%;
    }
  }
}
</style>
