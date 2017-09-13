<template>
  <div class="container">
    <div class="row add-host">
      <el-button size="small" type="primary" icon="plus" @click="addHostDialog">添加主机</el-button>
    </div>
    <div class="row hosts-table">
      <el-table :data="hosts" :row-class-name="tableRowClassName" :stripe="true">
        <el-table-column align="center" prop="index" label="序号" >
          <template scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="ip" label="IP" >
        </el-table-column>
        <el-table-column align="center" prop="hostname" label="名称" >
        </el-table-column>
        <el-table-column align="center" prop="description" label="描述" >
        </el-table-column>
        <el-table-column align="center" label="操作" >
          <template scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, hosts)" type="text" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="row">
      <div class="col-md-4 col-md-offset-4 buttons">
        <el-button size="large" icon="arrow-left" class="pull-left" @click="back">上一步</el-button>
        <el-button size="large" type="success" class="pull-right" icon="arrow-right" @click="next">下一步</el-button>
      </div>
    </div>
    <host-dialog :dialog-visible.sync="dialogVisible" :add-host="create" :host="host" :update-host="updateHost"></host-dialog>
  </div>
</template>

<script>
import {fetchHosts, getHosts, addHost} from 'vuexPath/modules/cluster'
import HostDialog from './common/HostDialog'
import {pop} from '../utils/alert'
export default {
  components: {
    HostDialog
  },
  mounted() {
    this.$root.$emit('clusterPage', 'hosts')
    this.fetchHosts(this.$route.params.id)
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    back() {
      this.$router.push({name: 'clusters'})
    },
    next () {
      this.$router.push({
        path: 'globalConfig'
      })
    },
    addHostDialog() {
      this.host = {
        name: "",
        description: ""
      }
      this.dialogVisible = true
    },
    create(host) {
      this.addHost(this.$route.params.id, host, () => {
        pop('添加主机成功')
        this.dialogVisible = false
      })
    }
  },
  vuex: {
    getters: {
      hosts: getHosts
    },
    actions: {
      fetchHosts,
      addHost
    }
  },
  data() {
    return {
      dialogVisible: false,
      host: {}
    }
  }
}
</script>
<style lang="scss" scoped>
.add-host {
  margin-bottom: 10px;
}
.buttons {
  margin-top: 100px;
  padding: 0 80px;
}
</style>
