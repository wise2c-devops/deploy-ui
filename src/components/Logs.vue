<template>
  <div class="cluster-logs">
    <ol class="breadcrumb">
      <li>
        <router-link to="/clusters">集群</router-link>
      </li>
      <li class="active-breadcrumb">
        <router-link to="">{{cluster.name}}</router-link>
      </li>
    </ol>
    <div class="log-wrapper logs">
      <div v-for="(log, index) in logs" :key="index" class="log">
        <span class="line-number">{{index + 1}}</span>
        <p v-html="getLog(log)"></p>
      </div>
    </div>
  </div>
</template>
<script>
import { fetchLogs, getLogs, getCluster } from "vuexPath/modules/cluster"
export default {
  computed: {
    clusterId() {
      return this.$route.params.id
    }
  },
  methods: {
    getLog(log) {
      return `${log.time}: [${log.stage}] [${log.host}]  task: ${log.task
        .name} - ${log.task.state},  message: ${log.data.msg}`
    }
  },
  mounted() {
    setTimeout(() => {
      this.$root.$emit("clusterPage", "logs")
    }, 100)
    this.fetchLogs(this.clusterId)
  },
  vuex: {
    actions: {
      fetchLogs
    },
    getters: {
      logs: getLogs,
      cluster: getCluster
    }
  }
}
</script>
<style lang="scss">
@import "../assets/stylesheets/variables";
.cluster-logs {
  .logs{
    margin: 20px 0;
  }
}
</style>

