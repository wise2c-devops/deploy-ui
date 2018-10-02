<template>
  <el-dialog :title="$t('componets.componentModal.modalTile')" :visible="dialogVisible" size="small" :close-on-click-modal="false" :show-close="false">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="componentType " class="required">{{$t('componets.componentModal.componentType')}}</label>
        <br>
        <el-select v-model="component.name" :disabled="!!component.id" @change="changeComponent">
          <el-option v-for="item in types" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="form-group">
        <label for="componentType " class="required">{{$t('componets.componentModal.version')}}</label>
        <br>
        <el-select v-model="component.version" @change="changeVersion">
          <el-option v-for="version in versions" :key="version" :label="version" :value="version">
          </el-option>
        </el-select>
      </div>
      <!-- <div class="form-group" v-if="!!component.name">
        <label for="ip">主机列表</label>
        <br>
        <el-select v-model="selectedHosts" multiple placeholder="请选择">
          <el-option v-for="item in hosts" :key="item.id" :label="item.hostname" :value="item.id">
          </el-option>
        </el-select>
      </div> -->
      <div class="form-group" v-for="(property, index) in properties" :key="index">
        <label for="ip" :class="property.required? 'required': ''">
          {{property.label}}
          <el-tooltip placement="top">
            <div slot="content">{{property.description}}</div>
            <i class="el-icon-question"></i>
          </el-tooltip>
        </label>
        <div v-if="property.type==='enum'">
          <select class="form-control" v-validate="'required'" :name="property.variable" :placeholder="property.description" v-model="property[property.variable]" v-if="property.required">
            <option v-for="(option, index) in property.options" :key="index">{{option}}</option>
          </select>
          <select class="form-control" :name="property.variable" :placeholder="property.description" v-model="property[property.variable]" v-else>
            <option v-for="(option, index) in property.options" :key="index">{{option}}</option>
          </select>
        </div>
        <div v-if="property.type==='string'">
          <input type="text" class="form-control" v-validate="'required'" :placeholder="property.description" v-model="property[property.variable]" :name="property.variable" v-if="property.required">
          <input type="text" class="form-control" :placeholder="property.description" v-model="property[property.variable]" :name="property.variable" v-else>
        </div>
        <div v-if="property.type==='int'">
          <input type="number" class="form-control" v-validate="'required|numeric'" :placeholder="property.description" v-model.number="property[property.variable]" :name="property.variable" v-if="property.required">
          <input type="number" class="form-control" v-validate="'numeric'" :placeholder="property.description" v-model.number="property[property.variable]" :name="property.variable" v-else>
        </div>
        <div v-if="property.type==='password'">
          <input type="password" class="form-control" v-validate="'required'" :placeholder="property.description" v-model="property[property.variable]" :name="property.variable" v-if="property.required">
          <input type="password" class="form-control" :placeholder="property.description" v-model="property[property.variable]" :name="property.variable" v-else>
        </div>
        <label v-if="property.type==='bool'" class="vip-checkbox">
          <el-checkbox v-model="property[property.variable]"></el-checkbox>
        </label>
        <div v-if="property.type==='host'">
          <el-select v-model="property[property.variable]" multiple :placeholder="property.description" v-validate="'required'" :name="property.variable"  v-if="property.required">
            <el-option v-for="item in hosts" :key="item.id" :label="item.hostname" :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="property[property.variable]" multiple :placeholder="property.description" v-else>
            <el-option v-for="item in hosts" :key="item.id" :label="item.hostname" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <i v-show="property.type!=='bool' && errors.has(property.variable)" class="error fa fa-warning">{{validateTips(property)}}</i>
      </div>

    </form>
     <div slot="footer" class="dialog-footer">
      <el-button @click="close">{{$t('tipsButton.cancel')}}</el-button>
      <el-button type="primary" @click.prevent="callMethod" :disabled="hasError || !component.name || !component.version" native-type="submit">{{$t('tipsButton.ok')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { validationError } from '../../mixin/error'
import {popWarn} from '../../utils/alert'
import {
  getComponentProperties,
  resetProperties,
  fetchComponentVersions,
  getComponentVersions,
  fetchVersionProperties} from 'vuexPath/modules/component'
export default {
  mixins: [validationError],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    hosts: {
      type: Array,
      default: []
    },
    addComponent: Function,
    updateComponent: Function,
    types: {
      type: Array,
      default: []
    },
    component: {
      type: Object,
      default: {
        name: null,
        hosts: {},
        properties: {}
      }
    }
  },
  watch: {
    dialogVisible(newValue) {
      if(newValue && !!this.component.name && !!this.component.version) {
        this.fetchComponentVersions(this.component.name)
        this.fetchVersionProperties(this.component.name, this.component.version, {isEdit: true, component: this.component})
      }
    }
  },
  vuex: {
    actions: {
      resetProperties,
      fetchComponentVersions,
      fetchVersionProperties
    },
    getters: {
      properties: getComponentProperties,
      versions: getComponentVersions
    }
  },
  data() {
    return {
      values: {},
      selectedHosts: {}
    }
  },
  computed: {
    clusterId() {
      return this.$route.params.id
    }
  },
  beforeMount() {
    this.resetProperties()
  },
  methods: {
    close() {
      this.$emit('update:dialogVisible', false)
    },
    validateTips(property) {
      if (property.type==='host') {
        return this.$t('componets.componentModal.hostTips')
      }else {
        return this.$t('componets.componentModal.tips') +`${property.label}`
      }
    },
    callMethod() {
      this.$validator.validateAll().then((result) => {
        if(!result) {
          popWarn(this.$t('layer.warnTips'))
          return
        }
        this.component.hosts = {}
        this.properties.forEach(item=>{
          if (item[item.variable] instanceof Array) {
            this.component.hosts[item.variable] = item[item.variable]
          }else {
            this.component.properties[item.variable] = item[item.variable]
          }
        })
        if (!!this.component.id) {
          return this.updateComponent(this.component)
        }
        return this.addComponent(this.component)
      })
    },
    onSubmit(){
      this.callMethod()
    },
    changeComponent(value) {
      if(!!value && value !== '') {
        this.component.version = ''
        this.resetProperties()
        this.fetchComponentVersions(value)
      }
    },
    changeVersion(value) {
      this.fetchVersionProperties(this.component.name, value, {})
    },
    validHosts(hosts) {
      return hosts.map(host => {
        host.value = host.id
        return host
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 80%;
}
.vip-checkbox{
  padding-left: 20px;
}
.container-fluid {
  .form-group {
    input {
      &.half {
        width: 46%;
        display: inline-block;
      }
      &.form-control {
        width: 80%;
      }
    }

    .vip-label {
      label {
        margin-right: 10px;
      }
      button {
        vertical-align: middle;
        font-size: 8px;
      }
    }
    .vip-data {
      margin-bottom: 10px;

      select {
        display: inline-block;
        width: 46%;
        margin-right: 10px;
      }
    }
  }
}
</style>
