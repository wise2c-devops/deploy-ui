<template>
  <div class="component-container">
    <div class="row add-host">
      <ol class="breadcrumb pull-left">
        <li>
          <router-link to="/clusters">{{$t("clusters.routerName")}}</router-link>
        </li>
        <li class="active-breadcrumb">
          <router-link to="">{{cluster.name}}</router-link>
        </li>
      </ol>
      <el-button size="mini" type="primary" icon="el-icon-caret-right" @click.native.stop.prevent="install" class="status-icon" :disabled="selectComponents.length === 0">{{$t('componets.startInstallButton')}}</el-button>
      <el-button size="mini" type="warning" icon="el-icon-warning" @click.native.stop.prevent="reset" class="status-icon" :disabled="isInitial">{{$t('componets.resets')}}</el-button>
      <el-button size="small" type="primary" icon="el-icon-plus" @click.native.stop.prevent="addComponentDialog" class="pull-right">{{$t('componets.addComponentsButton')}}</el-button>
    </div>
    <div class="panel-body">
      <div class="row hosts-table">
        <el-table :data="components" :stripe="true" @select-all='selectRow' :reserve-selection="true"
            @select='selectRow' ref="multipleTable">
          <el-table-column
            :select-all="true"
            type="selection"
            width="40">
          </el-table-column>
        <!-- <el-table :data="components" :row-class-name="tableRowClassName" :stripe="true"> -->
          <el-table-column align="center" prop="index" :label="$t('componets.table.num')" width="80px">
            <template scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" :label="$t('componets.table.serviceName')" width="120px">
          </el-table-column>
          <el-table-column align="center" prop="version" :label="$t('componets.table.version')" width="120px">
          </el-table-column>
          <el-table-column align="left" :label="$t('componets.table.attribute')">
            <template scope="scope">
              <div v-html="properties(scope.row)"></div>
            </template>
          </el-table-column>
          <el-table-column align="left" :label="$t('componets.table.host')">
            <template scope="scope">
              <div v-html="simpleHosts(scope.row)"></div>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('componets.table.operate')" width="200px">
            <template scope="scope">
              <el-button @click.native.prevent="editComponentDialog(scope.row)" type="primary" size="small" icon="el-icon-edit"></el-button>
              <el-button @click.native.prevent="remove(scope.$index, scope.row)" type="danger" size="small" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="row">
        <div class="col-md-4 col-md-offset-4 buttons">
          <el-button size="large" icon="arrow-left" class="pull-left" @click="back">{{$t('tipsButton.prev')}}</el-button>
          <el-button size="large" type="success" class="pull-right" icon="arrow-right" @click="next" :disabled="selectComponents.length === 0">{{$t('tipsButton.next')}}</el-button>
        </div>
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
import { promptOnDelete } from '../utils/prompt'
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
      this.createComponent(this.clusterId, component, (data) => {
        this.dialogVisible = false
        this.$refs.multipleTable.toggleRowSelection(data)
        this.selectComponents.push(data.name)
        pop(this.$t('layer.createSuccess'))
      })
    },
    editComponentDialog(component) {
      this.component = Object.assign({}, component)
      this.dialogVisible = true
    },
    remove(index, component) {
      promptOnDelete(this, this.$t('componets.delteTips'), () => {
        this.deleteComponent(this.clusterId, component.id, index, () => {
          this.selectComponents = this.selectComponents.filter(item=>item !== component.name)
          pop(this.$t('layer.deleteSuccess'))
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
        pop(this.$t('layer.editSuccess'))
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
        return "--"
      }
      let msg = ''
      Object.keys(component.hosts).map((objectKey)=>{
        let value = component.hosts[objectKey].map(item=>item.hostname)
        msg += `<p><b>${objectKey}</b>: ${value.join(', ') || '--'}</p>`
      })
      return msg
    },
    properties(component) {
      if (!component.properties || Object.keys(component.properties).length === 0) {
        return "--"
      }
      var msg = ""
      Object.keys(component.properties).map(function(objectKey) {
        let value = component.properties[objectKey]
        if (objectKey.includes('password') || objectKey.includes('pwd')) {
          value = '*****'
        }
        msg += `<p><b>${objectKey}</b>: ${value || '--'}</p>`
      })
      return msg
    },
    install() {
      localStorage.setItem('selectComponents', JSON.stringify(this.selectComponents))
      // this.resetSlectComponents(this.selectComponents)
      if (this.cluster.state === 'processing') {
        this.$router.push({
          path: `/clusters/${this.clusterId}/processing`
        })
        return
      }
      //确认安装
      promptOnDelete(this, this.$t('componets.startInstallCulsterTips'), () => {
        this.deploy(this.clusterId, this.q, 'install', () => {
          pop(this.$t('componets.startInstallButton'))
          this.$router.push({
            path: `/clusters/${this.clusterId}/processing`
          })
        })
      })
    },
    reset() {
      promptOnDelete(this, this.$t('componets.resetTips'), () => {
        this.deploy(this.clusterId, this.selectComponents, 'reset', () => {
          pop(this.$t('componets.resetSuccessMsg'))
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
    margin-top: 50px;
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
