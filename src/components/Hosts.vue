<template>
  <div class="container">
    <div class="row add-host">
      <el-button size="small" type="primary" icon="plus" @click="addRow">添加主机</el-button>
    </div>
    <div class="row hosts-table">
      <el-table :data="hosts" style="width: 100%" :row-class-name="tableRowClassName" :stripe="true">
        <el-table-column align="center" prop="index" label="序号" width="70">
          <template scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="host" label="Node" width="150">
          <template scope="scope">
            <el-input v-model="scope.row.host" placeholder="请输入IP"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="etcd" label="etcd" width="70">
          <template scope="scope">
            <el-checkbox v-model="scope.row.etcd"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="mysqlSlave1" label="mysqlSlave1" width="130">
          <template scope="scope">
            <el-checkbox v-model="scope.row.mysqlSlave1"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="mysqlSlave2" label="mysqlSlave2" width="130">
          <template scope="scope">
            <el-checkbox v-model="scope.row.mysqlSlave2"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="mysqlSlave3" label="mysqlSlave3" width="130">
          <template scope="scope">
            <el-checkbox v-model="scope.row.mysqlSlave3"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="loadBalancer" label="LoadBalancer">
          <template scope="scope">
            <el-checkbox v-model="scope.row.loadBalancer"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="k8sMaster" label="K8sMaster">
          <template scope="scope">
            <el-checkbox v-model="scope.row.k8sMaster"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="registry" label="Registry" width="100">
          <template scope="scope">
            <el-checkbox v-model="scope.row.registry"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="control" label="WisecloudControl/k8sNode">
          <template scope="scope">
            <el-checkbox v-model="scope.row.control"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="normal" label="Normal/k8sNode">
          <template scope="scope">
            <el-checkbox v-model="scope.row.normal"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="70">
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
        <el-button size="large" type="success" class="pull-right" icon="arrow-right">
          <router-link :to="'globalConfig'" >下一步</router-link>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    back() {
      this.$router.go(-1)
    },
    addRow() {
      this.hosts.push({
        host: '10.0.0.100',
        etcd: false,
        mysqlSlave1: false,
        mysqlSlave2: false,
        mysqlSlave3: false,
        loadBalancer: false,
        k8sMaster: false,
        registry: false,
        control: false,
        normal: false
      })
    }
  },
  data() {
    return {
      hosts: [{
        host: '10.0.2.100',
        etcd: true,
        mysqlSlave1: true,
        mysqlSlave2: true,
        mysqlSlave3: true,
        loadBalancer: true,
        k8sMaster: false,
        registry: false,
        control: true,
        normal: false
      }, {
        host: '10.0.2.199',
        etcd: true,
        mysqlSlave1: true,
        mysqlSlave2: false,
        mysqlSlave3: true,
        loadBalancer: true,
        k8sMaster: false,
        registry: false,
        control: true,
        normal: false
      }]
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
