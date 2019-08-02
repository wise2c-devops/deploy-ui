<template>
  <div class="process-container">
    <ul class="clear-style row m0 process">
      <li class="pull-left" v-for="(item, index) in validStages" :key="index">
        <div class="box">
          <div :class="'text-center ' + item.state">
            <svg-icon :icon-class="item.name" width="45px" height="45px" :fill="getFill(item)"></svg-icon>
            <p class="title">{{item.name}}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="logs-wrapper logs">
      <div v-for="(log, index) in logs" :key="index" class="log">
        <span class="line-number">{{index + 1}}</span>
        <p v-html="computedLog(log)"></p>
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
 /* eslint func-names: 'off' */
  import { pop } from '../utils/alert'
  import { cancel,
           getCluster,
           fetchLogs,
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
      },
      failed() {
        return !!this.cluster && this.cluster.state === 'failed'
      },
      formatLastOneLog() {
        return this.logs[this.logs.length - 1]
      }
    },
    data() {
      return {
        // failed: false,
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
          pop(this.$t('layer.cancelSuccess'))
          this.back()
        })
      },
      getFill(item) {
        if (item.state === 'ok') return '#2ACD98'
        if (item.state === 'failed') return '#f16a64'
        return '#cdd1d9'
      },
      computedLog(log) {
        if (!!log) return `${log.time}: [${log.stage}] [${log.host}]  task: ${log.task.name} - ${log.task.state},  message: ${log.data.msg}`
      },
      listenSoket() {
        let url = `${process.env.VUE_APP_WS_HOST}/v1/stats`
        if (process.env.NODE_ENV === 'production') {
          url = `${process.env.VUE_APP_WS_HOST}/v1/stats`
        }
        const socket = new WebSocket(url)
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
        this.componentTypes.forEach((componentType) => {
          const target = findLast(slectComponents, slectComponent => slectComponent === componentType)
          if (target) {
            this.validStages.push({
              name: target,
              state: ''
            })
          }
        })
      },
      computedStageState() {
        if (this.formatLastOneLog) {
          if (this.isDone) this.validStages[this.validStages.length - 1].state = 'ok'
          const index = findIndex(this.validStages, stage => stage.name.toLowerCase() === this.formatLastOneLog.stage.toLowerCase())
          if (index === -1) return
          this.validStages[index].state = this.formatLastOneLog.state
          for (let tempIndex = 0; tempIndex < index; tempIndex++) {
            this.validStages[tempIndex].state = 'ok'
          }
        }
        // this.fetchClusterStatus(this.clusterId, () => {
        //   // 显示那些组件已经安装了
        //   const index = findIndex(this.validStages, stage => stage.name.toLowerCase() === this.status.currentStage.toLowerCase())
        //   if (!!this.cluster && this.cluster.state !== 'success' && index > 0) {
        //     for (let tempIndex = 0; tempIndex < index; tempIndex++) {
        //       this.validStages[tempIndex].state = 'ok'
        //     }
        //   }
        // })
      }
    },
    created() {
      this.fetchClusterDetail(this.clusterId)
      this.fetchComponentTypes(() => {
        this.formatStages()
        this.computedStageState()
      })
      setTimeout(() => {
        this.fetchLogs(this.clusterId, (res => this.logs = res))
      }, 1500)
    },
    mounted() {
      intervalId = setInterval(() => {
        this.fetchClusterDetail(this.clusterId)
        this.fetchLogs(this.clusterId, (res => this.logs = res))
      }, 3000)
    },
    vuex: {
      actions: {
        cancel,
        fetchLogs,
        fetchClusterDetail,
        fetchClusterStatus,
        fetchComponentTypes
      },
      getters: {
        cluster: getCluster,
        status: getClusterStatus,
        componentTypes: state => state.cluster.types
      }
    },
    watch: {
      'cluster.state': function (val) {
        if (val === 'success' || val === 'failed') {
          clearInterval(intervalId)
          this.computedStageState()
        }
      },
      'formatLastOneLog.stage': function () {
        this.computedStageState()
      }
    },
    beforeDestroy() {
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

</style>
