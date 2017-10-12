<template>
  <div class="log-wrapper logs">
    <div v-for="(log, index) in logs" :key="index" class="log">
      <span class="line-number">{{index + 1}}</span>
      <p v-html="getLog(log)"></p>
    </div>
  </div>
</template>
<script>
import { fetchLogs, getLogs } from 'vuexPath/modules/cluster'
export default {
  computed: {
    clusterId() {
      return this.$route.params.id
    }
  },
  methods: {
    getLog(log) {
      return `${log.time}: [${log.stage}] [${log.host}]  task: ${log.task.name} - ${log.task.state},  message: ${log.data.msg}`
    }
  },
  mounted() {
    setTimeout(() => {
      this.$root.$emit('clusterPage', 'logs')
    }, 100)
    this.fetchLogs(this.clusterId)
  },
  vuex: {
    actions: {
      fetchLogs
    },
    getters: {
      logs: getLogs
    }
  }
}
</script>
<style lang="scss">
@import "../assets/stylesheets/variables";
.log-wrapper {
  background: #fff;
  padding: 20px;
  border: 1px solid $border-color;
  border-radius: 4px;
  margin-top: 50px;
}
</style>

