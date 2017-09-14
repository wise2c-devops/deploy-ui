<template>
  <div class="container">
    <div class="row add-host">
      <ol class="breadcrumb pull-left">
        <li>
          <router-link to="/clusters">集群</router-link>
        </li>
        <li class="active-breadcrumb">
          <router-link to="">{{cluster.name}}</router-link>
        </li>
      </ol>
      <el-button size="small" type="primary" icon="plus" @click="addComponentDialog" class="pull-right">添加组件</el-button>
    </div>
    <div class="row hosts-table">
      <el-table :data="hosts" :row-class-name="tableRowClassName" :stripe="true">
        <el-table-column align="center" prop="index" label="序号" >
          <template scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="host" label="IP" >
        </el-table-column>
        <el-table-column align="center" prop="name" label="名称" >
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
    <component-dialog :dialog-visible.sync="dialogVisible" :add-component="create" :component="component" :update-component="update"></component-dialog>
  </div>
</template>

<script>
import {getCluster} from 'vuexPath/modules/cluster'
import ComponentDialog from './common/ComponentDialog'
export default {
  components: {
    ComponentDialog
  },
  mounted() {
    this.$root.$emit('clusterPage', 'components')
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    back() {
      this.$router.go(-1)
    },
    next () {
      this.$router.push({
        path: 'globalConfig'
      })
    },
    addComponentDialog() {
      this.component = {
        type: "",
        hosts: []
      }
      this.dialogVisible = true
    }
  },
  data() {
    return {
      component: {},
      dialogVisible: false,
      hosts: [{
        host: '10.0.2.100',
        name: "dev4",
        description: "睿云开发4"
      }, {
        host: '10.0.2.199',
        etcd: true,
        name: "dev2",
        description: "睿云开发2"
      }]
    }
  },
  vuex: {
    getters: {
      cluster: getCluster
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
