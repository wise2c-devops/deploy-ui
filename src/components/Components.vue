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
      <el-button size="mini" type="primary" icon="caret-right" @click="addComponentDialog" class="status-icon">开始安装</el-button>
      <el-button size="small" type="primary" icon="plus" @click="addComponentDialog" class="pull-right">添加组件</el-button>
    </div>
    <div class="row hosts-table">
      <el-table :data="components" :row-class-name="tableRowClassName" :stripe="true" >
        <el-table-column align="center" prop="index" label="序号" >
          <template scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="服务名称" >
        </el-table-column>
        <el-table-column align="center" prop="name" label="属性" >
        </el-table-column>
        <el-table-column align="center" prop="hosts" label="主机" >
        </el-table-column>
        <el-table-column align="center" label="操作" >
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
    <component-dialog :dialog-visible.sync="dialogVisible" :add-component="create" :component="component" :update-component="update" :hosts="hosts"></component-dialog>
  </div>
</template>

<script>
import {getCluster, getComponents, fetchComponents, createComponent, fetchHosts, getHosts} from 'vuexPath/modules/cluster'
import ComponentDialog from './common/ComponentDialog'
import {pop} from '../utils/alert'
export default {
  components: {
    ComponentDialog
  },
  mounted() {
    this.fetchComponents(this.clusterId)
    setTimeout(()=>{
      this.$root.$emit('clusterPage', 'components')
    }, 100)
  },
  methods: {
    create(component){
      if(component.type === 'lb') {
        component.name = 'loadbalancer'
      }
      this.createComponent(this.clusterId, component, ()=> {
        this.dialogVisible = false
        pop('创建服务组件成功')
      })
    },
    editComponentDialog(component){
      this.component = Object.assign({}, component)
      this.dialogVisible = true
    },
    remove(index, componentId) {

    },
    back() {
      this.$router.go(-1)
    },
    next () {
      this.$router.push({
        path: `/clusters/${this.clusterId}/processing`
      })
    },
    addComponentDialog() {
      this.component = {
        type: "lb",
        hosts: []
      }
      this.dialogVisible = true
    }
  },
  computed: {
    clusterId() {
      return this.$route.params.id
    }
  },
  data() {
    return {
      component: {},
      dialogVisible: false
    }
  },
  vuex: {
    actions: {
      fetchComponents,
      createComponent,
      fetchHosts
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
.add-host {
  margin-bottom: 10px;
}
.buttons {
  margin-top: 100px;
  padding: 0 80px;
}
.status-icon {
  margin-top: 7px;
}
</style>
