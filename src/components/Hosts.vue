<template>
  <div class="hosts-container">
    <div class="row add-host">
      <ol class="breadcrumb pull-left">
        <li>
          <router-link to="/clusters">集群</router-link>
        </li>
        <li class="active-breadcrumb">
          <router-link to="">{{cluster.name}}</router-link>
        </li>
      </ol>
      <el-button size="small" type="primary" icon="plus" @click="addHostDialog" class="pull-right">添加主机</el-button>
    </div>
    <div class="row hosts-table">
      <el-table :data="hosts" :row-class-name="tableRowClassName" :stripe="true">
        <el-table-column align="center" prop="index" label="序号">
          <template scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="ip" label="IP">
        </el-table-column>
        <el-table-column align="center" prop="hostname" label="名称">
        </el-table-column>
        <el-table-column align="center" prop="description" label="描述">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template scope="scope">
            <el-button @click.native.prevent="editHostDialog(scope.row)" type="primary" size="small" icon="edit"></el-button>
            <el-button @click.native.prevent="remove(scope.$index, scope.row.id)" type="danger" size="small" icon="delete"></el-button>
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
    <host-dialog :dialog-visible.sync="dialogVisible" :add-host="create" :host="host" :update-host="update"></host-dialog>
  </div>
</template>

<script>
import { fetchHosts, getHosts, addHost, deleteHost, updateHost, getCluster } from 'vuexPath/modules/cluster'
import HostDialog from './common/HostDialog'
import { pop } from '../utils/alert'
import { promptOnDelete } from '../utils/prompt'
export default {
  components: {
    HostDialog
  },
  mounted() {
    this.$root.$emit('clusterPage', 'hosts')
    this.fetchHosts(this.clusterId)
  },
  computed: {
    clusterId() {
      return this.$route.params.id
    }
  },
  methods: {
    remove(index, id) {
      promptOnDelete(this, "如确认删除该主机", () => {
        this.deleteHost(this.clusterId, id, index, () => {
          pop('删除主机成功')
        })
      })
    },
    back() {
      this.$router.push({ name: 'clusters' })
    },
    next() {
      this.$router.push({
        path: `/clusters/${this.clusterId}/components`
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
      this.addHost(this.clusterId, host, () => {
        pop('添加主机成功')
        this.dialogVisible = false
      })
    },
    editHostDialog(host) {
      this.host = Object.assign({}, host)
      this.dialogVisible = true
    },
    update(host) {
      this.updateHost(this.$route.params.id, host, () => {
        pop('更新主机成功')
        this.dialogVisible = false
      })
    }
  },
  vuex: {
    getters: {
      hosts: getHosts,
      cluster: getCluster
    },
    actions: {
      fetchHosts,
      addHost,
      deleteHost,
      updateHost
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
.container {
  .buttons {
    margin-top: 100px;
  }
}
</style>
