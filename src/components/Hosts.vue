<template>
  <div class="hosts-container">
    <div class="row add-host">
      <ol class="breadcrumb pull-left">
        <li>
          <router-link to="/clusters">{{$t("clusters.routerName")}}</router-link>
        </li>
        <li class="active-breadcrumb">
          <router-link to="">{{cluster.name}}</router-link>
        </li>
      </ol>
      <el-button size="small" type="primary" icon="plus" @click="addHostDialog" class="pull-right">{{$t("host.addHostButton")}}</el-button>
    </div>
    <div class="panel-body">
      <div class="row hosts-table">
        <el-table :data="hosts" :stripe="true">
        <!-- <el-table :data="hosts" :row-class-name="tableRowClassName" :stripe="true"> -->
          <el-table-column align="center" prop="index" :label="$t('host.table.num')">
            <template scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="hostname" :label="$t('host.table.name')">
          </el-table-column>
          <el-table-column align="center" prop="ip" label="IP">
          </el-table-column>
          <el-table-column align="center" prop="description" :label="$t('host.table.des')">
          </el-table-column>
          <el-table-column align="center" :label="$t('host.table.operate')">
            <template scope="scope">
              <el-button @click.native.prevent="editHostDialog(scope.row)" type="primary" size="small" icon="el-icon-edit"></el-button>
              <el-button @click.native.prevent="remove(scope.$index, scope.row.id)" type="danger" size="small" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="row">
        <div class="col-md-4 col-md-offset-4 buttons">
          <el-button size="large" icon="arrow-left" class="pull-left" @click="back">{{$t('tipsButton.prev')}}</el-button>
          <el-button size="large" type="success" class="pull-right" icon="arrow-right" @click="next">{{$t('tipsButton.next')}}</el-button>
        </div>
      </div>
    </div>
    <host-dialog :dialog-visible.sync="dialogVisible" :add-host="create" :host="host" :update-host="update"></host-dialog>
  </div>
</template>

<script>
import { fetchHosts, getHosts, addHost, deleteHost, updateHost, getCluster } from '../vuex/modules/cluster'
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
      promptOnDelete(this, this.$t('host.delteTips'), () => {
        this.deleteHost(this.clusterId, id, index, () => {
          pop(this.$t('layer.deleteSuccess'))
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
        pop(this.$t('layer.createSuccess'))
        this.dialogVisible = false
      })
    },
    editHostDialog(host) {
      this.host = Object.assign({}, host)
      this.dialogVisible = true
    },
    update(host) {
      this.updateHost(this.$route.params.id, host, () => {
        pop(this.$t('layer.editSuccess'))
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
.hosts-container {
  .buttons {
    margin-top: 50px;
  }
}
</style>
