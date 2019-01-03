<template>
  <div class="process-container">
    <ul class="clear-style row m0 process">
      <li class="pull-left" v-for="(item, index) in validStages" :key="index">
        <div class="box">
          <div :class="'text-center ' + item.state">
            <svg-filler :path="`/static/components/${item.name}-playbook/${item.name}.svg`" :fill="getFill(item)" width="45px" height="45px"/>
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
        <el-button size="large" icon="close" type="default" @click="cancelDeployment" v-if="!isDone && !failed">{{$t('tipsButton.cancel')}}</el-button>
        <el-button size="large" icon="close" type="danger" @click="back" v-if="failed">{{$t('tipsButton.fail')}}</el-button>
        <el-button size="large" icon="check" type="primary" @click="back" v-if="isDone">{{$t('tipsButton.done')}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import SvgFiller from 'vue-svg-filler'
import { pop } from '../utils/alert'
import { cancel,
  getCluster,
  fetchClusterDetail,
  getClusterStatus,
  fetchClusterStatus,
  fetchComponentTypes } from 'vuexPath/modules/cluster'
import { findLast, findIndex } from 'lodash'
let intervalId

export default {
  computed: {
    clusterId() {
      return this.$route.params.id
    },
    isDone() {
      return !!this.cluster && this.cluster.state === 'success'
    }
  },
  components: {
    SvgFiller
  },
  data() {
    return {
      failed: false,
      logs: [],
      validStages: []
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
    getFill(item) {
      if (item.state === 'ok') return '#2ACD98'
      else if (item.state === 'failed') return '#f16a64'
      return '#cdd1d9'
      // return item.enabled ? "#4CAF50" : '#cdd1d9'
    },
    listenSoket() {
      var url = `${process.env.WEBSOCKET_HOST}/v1/stats`
      if (process.env.NODE_ENV === 'production') {
        url = `ws://${location.host}/v1/stats`
      }
      var socket = new WebSocket(url)
      socket.onopen = (event) => {
        console.info('Success link to backend server', event)
      }
      socket.onmessage = (event) => {

        const json = JSON.parse(event.data)
        const stage = findLast(this.validStages, stage => stage.name.toLowerCase() === json.stage.toLowerCase())

        if (json.state === 'failed') {
          this.failed = true
          stage.state = 'failed'
        }

        this.logs.push(`${json.time}: [${json.stage}] [${json.host}]  task: ${json.task.name} - ${json.task.state},  message: ${json.data.msg}`)
        if (json.state === 'ok') {
          // var stage = findLast(this.validStages, stage => stage.name.toLowerCase() === json.stage.toLowerCase())
          if (!!stage) {
            stage.state = 'ok'
            // stage.enabled = true
          }
        }
      }
    },
    formatStages() {
      const slectComponents = JSON.parse(localStorage.getItem('selectComponents'))
      this.componentTypes.forEach(componentType=>{
        var target = findLast(slectComponents, slectComponent=>slectComponent === componentType)
        if(target) {
          this.validStages.push({
            name: target,
            state: ''
          })
        }
      })
    },
    computedStageState() {
      this.fetchClusterStatus(this.clusterId, () => {
        //显示那些组件已经安装了
        const index = findIndex(this.validStages, stage => stage.name.toLowerCase() === this.status.currentStage.toLowerCase())
        if(!!this.cluster && this.cluster.state !== 'success' && index > 0 ) {
          for(var tempIndex = 0; tempIndex < index; tempIndex ++) {
            this.validStages[tempIndex].state = 'ok'
          }
        }
      })
    }
  },
  created() {
    this.fetchComponentTypes(()=>{
      this.formatStages()
    })
    this.fetchClusterDetail(this.clusterId)
  },
  mounted() {
    if (this.cluster.state === 'processing'){
      this.computedStageState()
    }
    this.listenSoket()

    intervalId = setInterval(()=>{
      this.fetchClusterDetail(this.clusterId)
    }, 3000)

  },
  vuex: {
    actions: {
      cancel,
      fetchClusterDetail,
      fetchClusterStatus,
      fetchComponentTypes
    },
    getters: {
      cluster: getCluster,
      status: getClusterStatus,
      componentTypes: state=>state.cluster.types
    }
  },
  watch: {
    'cluster.state': function(val) {
      if (val === 'success' || val === 'failed') clearInterval(intervalId)
      else if ( !!val && val === 'processing') {
        this.computedStageState()
      }
    }
  },
  beforeDestroy () {
    clearInterval(intervalId)
  }
}
</script>
<style lang="scss">
@import "~assets/stylesheets/variables";
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
        top: -35px;
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
        &.ok {
          border: 2px solid $green-color;
        }
        &.failed {
          border: 2px solid $error-color;
        }
        p.title {
          color: $main-font-color;
          font-size: 14px;
          position: absolute;
          bottom: -30px;
          transform: translateX(-50%);
          left: 50%;
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
