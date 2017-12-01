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
      <el-button size="mini" type="primary" icon="el-icon-caret-right" @click="install" class="status-icon" :disabled="selectComponents.length === 0">开始安装</el-button>
      <el-button size="mini" type="warning" icon="el-icon-warning" @click="reset" class="status-icon" :disabled="isInitial">重置</el-button>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="addComponentDialog" class="pull-right">添加组件</el-button>
    </div>
    <div class="row hosts-table">
      <el-table :data="components" :stripe="true" @select-all='selectRow' :reserve-selection="true"
          @select='selectRow' ref="multipleTable">
        <el-table-column
          :select-all="true"
          type="selection"
          width="55">
        </el-table-column>
      <!-- <el-table :data="components" :row-class-name="tableRowClassName" :stripe="true"> -->
        <el-table-column align="center" prop="index" label="序号" width="70px">
          <template scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="服务名称" width="120px">
        </el-table-column>
        <el-table-column align="center" prop="version" label="版本" width="120px">
        </el-table-column>
        <el-table-column align="left" label="属性">
          <template scope="scope">
            <div v-html="properties(scope.row)"></div>
          </template>
        </el-table-column>
        <el-table-column align="left" label="主机">
          <template scope="scope">
            <div v-html="simpleHosts(scope.row)"></div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200px">
          <template scope="scope">
            <el-button @click.native.prevent="editComponentDialog(scope.row)" type="primary" size="small" icon="el-icon-edit"></el-button>
            <el-button @click.native.prevent="remove(scope.$index, scope.row.id)" type="danger" size="small" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="row">
      <div class="col-md-4 col-md-offset-4 buttons">
        <el-button size="large" icon="arrow-left" class="pull-left" @click="back">上一步</el-button>
        <el-button size="large" type="success" class="pull-right" icon="arrow-right" @click="next" :disabled="selectComponents.length === 0">下一步</el-button>
      </div>
    </div>
    <component-dialog :dialog-visible.sync="dialogVisible" :add-component="create" :component="component" :types="validComponentTypes" :update-component="update" :hosts="hosts">
    </component-dialog>
  </div>
</template>

<script>
import { getCluster,
  getComponents,
  fetchComponents,
  createComponent,
  fetchHosts,
  getHosts,
  deleteComponent,
  updateComponent,
  deploy,
  resetSlectComponents,
  fetchComponentTypes} from 'vuexPath/modules/cluster'
import ComponentDialog from './common/ComponentDialog'
import { pop } from '../utils/alert'
import { confirmation, promptOnDelete, promptOnAction } from '../utils/prompt'
import { filter, map } from 'lodash'
import { resetProperties } from 'vuexPath/modules/component'
export default {
  components: {
    ComponentDialog
  },
  mounted() {
    this.fetchComponents(this.clusterId, (data)=>{
      this.selectComponents = data.map(item=>item.name)
      this.checked()
    })
    setTimeout(() => {
      this.$root.$emit('clusterPage', 'components')
    }, 300)
    this.fetchHosts(this.clusterId)
    this.fetchComponentTypes()
  },
  methods: {
    checked () {
      this.$nextTick(()=>{
        this.components.forEach(row=>{
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      })
    },
    selectRow(selection) {
      if (selection.length) {
        this.selectComponents = selection.map(item=>item.name)
      }else {
        this.selectComponents = []
      }
    },
    create(component) {
      this.createComponent(this.clusterId, component, () => {
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
      this.install()
    },
    update(component) {
      this.updateComponent(this.clusterId, component, () => {
        pop('更新组件成功')
        this.dialogVisible = false
      })

    },
    addComponentDialog() {
      this.component = {
        name: '',
        version: '',
        properties: {},
        hosts: {}
      }
      this.resetProperties()
      this.dialogVisible = true
    },
    simpleHosts(component) {
      if (!component.hosts || Object.keys(component.hosts).length === 0) {
        return "无"
      }
      let msg = ''
      Object.keys(component.hosts).map((objectKey)=>{
        let value = component.hosts[objectKey].map(item=>item.hostname)
        msg += `<p><b>${objectKey}</b>: ${value.join(', ') || '无'}</p>`
      })
      return msg
    },
    properties(component) {
      if (!component.properties || Object.keys(component.properties).length === 0) {
        return "无"
      }
      var msg = ""
      Object.keys(component.properties).map(function(objectKey) {
        let value = component.properties[objectKey]
        msg += `<p><b>${objectKey}</b>: ${value || '无'}</p>`
      })
      return msg
    },
    install() {
      this.resetSlectComponents(this.selectComponents)
      if (this.cluster.state === 'processing') {
        this.$router.push({
          path: `/clusters/${this.clusterId}/processing`
        })
        return
      }
      //确认安装
      confirmation(this, '确认开始安装集群', () => {
        this.deploy(this.clusterId, this.selectComponents, 'install', () => {
          pop('开始安装')
          this.$router.push({
            path: `/clusters/${this.clusterId}/processing`
          })
        })
      })
    },
    reset() {
      promptOnAction(this, "确认重置该集群到初始状态？", () => {
        this.deploy(this.clusterId, this.selectComponents, 'reset', () => {
          pop('重置成功，系统需要一些时间处理请求，请稍后刷新页面查看。')
        })
      })
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
        return this.existedComponentTypes.indexOf(type) === -1
      })
    },
    isInitial() {
      return this.cluster.state === 'initial' || this.selectComponents.length === 0
    }
  },
  data() {
    return {
      component: {
        name: '',
        hosts: {},
        version: '',
        properties: {}
      },
      selectComponents: [],
      dialogVisible: false
    }
  },
  vuex: {
    actions: {
      fetchComponents,
      createComponent,
      fetchHosts,
      deleteComponent,
      updateComponent,
      deploy,
      resetProperties,
      resetSlectComponents,
      fetchComponentTypes
    },
    getters: {
      cluster: getCluster,
      components: getComponents,
      hosts: getHosts,
      types: state=>state.cluster.types
    }
  }
}
</script>
<style lang="scss">

  .component-container {
    .buttons {
    margin-top: 100px;
  }

  .status-icon {
    margin-top: 7px;
  }
  table {
    tr {
      td {

        p {
          margin-bottom: 1px;
        }
      }
    }
  }
}
</style>
