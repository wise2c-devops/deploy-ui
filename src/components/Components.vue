<template>
  <div class="component-container">
    <div class="row add-host">
      <ol class="breadcrumb pull-left">
        <li>
          <router-link to="/clusters">集群</router-link>
        </li>
        <li class="active-breadcrumb">
          <router-link to="">{{cluster.name}}</router-link>
        </li>
      </ol>
      <el-button size="mini" type="primary" icon="caret-right" @click="addComponentDialog" class="status-icon">开始安装</el-button>
      <el-button size="small" type="primary" icon="plus" @click="addComponentDialog" class="pull-right">添加组件</el-button>
    </div>
    <div class="row hosts-table">
      <el-table :data="components" :row-class-name="tableRowClassName" :stripe="true">
        <el-table-column align="center" prop="index" label="序号">
          <template scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="服务名称">
        </el-table-column>
        <el-table-column align="center" label="属性">
          <template scope="scope">
            {{properties(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="主机">
          <template scope="scope">
            {{simpleHosts(scope.row.hosts)}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template scope="scope">
            <el-button @click.native.prevent="editComponentDialog(scope.row)" type="primary" size="small" icon="edit"></el-button>
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
    <component-dialog :dialog-visible.sync="dialogVisible" :add-component="create" :component="component" :types="validComponentTypes"
    :update-component="update" :hosts="hosts">
    </component-dialog>
  </div>
</template>

<script>
import { getCluster, getComponents, fetchComponents, createComponent, fetchHosts, getHosts, deleteComponent, updateComponent} from 'vuexPath/modules/cluster'
import ComponentDialog from './common/ComponentDialog'
import { pop } from '../utils/alert'
import { promptOnDelete } from '../utils/prompt'
import {filter, map} from 'lodash'
export default {
  components: {
    ComponentDialog
  },
  mounted() {
    this.fetchComponents(this.clusterId)
    setTimeout(() => {
      this.$root.$emit('clusterPage', 'components')
    }, 100)
    this.fetchHosts(this.clusterId)
  },
  methods: {
    create(component) {
      this.createComponent(this.clusterId, component, ()=> {
        this.dialogVisible = false
        pop('创建服务组件成功')
      })
    },
    editComponentDialog(component) {
      this.component = Object.assign({}, component)
      this.dialogVisible = true
    },
    remove(index, componentId) {
      promptOnDelete(this, "如确认删除该服务", () => {
        this.deleteComponent(this.clusterId, componentId, index, () => {
          pop('删除主机成功')
        })
      })
    },
    back() {
      this.$router.go(-1)
    },
    next() {
      this.$router.push({
        path: `/clusters/${this.clusterId}/processing`
      })
    },
    update(component) {
      if(component.name === 'loadbalancer') {
        component.hosts = []
      }else {
        component.properties = {}
      }
      this.updateComponent(this.clusterId, component, ()=> {
        pop('更新组件成功')
        this.dialogVisible = false
      })

    },
    addComponentDialog() {
      this.component = {
        name: "",
        hosts: [],
        properties: {
          netInterface: "",
          netMask: "",
          vips: [{
            type: '',
            vip: ''
          }]
        }
      }
      this.dialogVisible = true
    },
    simpleHosts(hosts) {
      if(hosts.length === 0) {
        return "无"
      }
      var hostsStr = ""
      hosts.forEach((item) => {
        hostsStr += item.hostname + ","
      })
      return hostsStr.substring(0, hostsStr.length - 1)
    },
    properties(component) {
      if(!component.properties || !component.properties.netMask || component.properties.netMask === "") {
        return "无"
      }
      return component.properties
    }
  },
  computed: {
    clusterId() {
      return this.$route.params.id
    },
    existedComponentTypes() {
      return map(this.components, (component) => {
        return component.name
      })
    },
    validComponentTypes() {
      return filter(this.types, (type) => {
        return this.existedComponentTypes.indexOf(type.value) === -1
      })
    }
  },
  data() {
    return {
      component: {},
      dialogVisible: false,
      types: [{
        value: 'loadbalancer',
        label: 'Load Balancer'
      }, {
        value: 'mysql',
        label: 'MySql'
      }, {
        value: 'kafka',
        label: 'Kafka'
      }, {
        value: 'registry',
        label: 'Registry'
      }, {
        value: 'etcd',
        label: 'etcd'
      }, {
        value: 'k8smaster',
        label: 'K8S master'
      }, {
        value: 'k8snode',
        label: 'K8S node'
      },
      {
        value: 'wisecloud',
        label: 'WiseCloud'
      }]
    }
  },
  vuex: {
    actions: {
      fetchComponents,
      createComponent,
      fetchHosts,
      deleteComponent,
      updateComponent
    },
    getters: {
      cluster: getCluster,
      components: getComponents,
      hosts: getHosts
    }
  }
}
</script>
<style lang="scss" scoped>
.buttons {
  margin-top: 100px;
}

.status-icon {
  margin-top: 7px;
}
</style>
