<template>
  <el-dialog title="服务组件" :visible="dialogVisible" size="small" :close-on-click-modal="false" :show-close="false">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="componentType">组件类型</label>
        <br>
        <el-select v-model="component.name" :disabled="!!component.id" @change="onChange">
          <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="form-group">
        <label for="componentType">版本</label>
        <br>
        <el-select v-model="component.version">
          <el-option key="v0.1" label="v0.1" value="v0.1">
          </el-option>
        </el-select>
      </div>
      <div class="form-group" v-if="!!component.name">
        <label for="ip">主机列表</label>
        <br>
        <el-select v-model="selectedHosts" multiple placeholder="请选择">
          <el-option v-for="item in hosts" :key="item.id" :label="item.hostname" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="form-group" v-for="(property, index) in properties" :key="index" v-if="property.type!=='host'">
        <label for="ip">{{property.label}}</label><br>
        <div v-if="property.type==='enum'">
          <select class="form-control" v-validate="'required'" :name="property.variable" :placeholder="property.description" v-model="values[property.variable]" v-if="property.required">
            <option v-for="(option, index) in property.options" :key="index">{{option}}</option>
          </select>
          <select class="form-control" :name="property.variable" :placeholder="property.description" v-model="values[property.variable]" v-else>
            <option v-for="(option, index) in property.options" :key="index">{{option}}</option>
          </select>
        </div>
        <div v-if="property.type==='string'">
          <input type="text" class="form-control" v-validate="'required'" :placeholder="property.description" v-model="values[property.variable]" :name="property.variable" v-if="property.required">
          <input type="text" class="form-control" v-validate="'required'" :placeholder="property.description" v-model="values[property.variable]" :name="property.variable" v-else>
        </div>
        <div v-if="property.type==='int'">
          <input type="number" class="form-control" v-validate="'required|numeric'" :placeholder="property.description" v-model.number="values[property.variable]" :name="property.variable" v-if="property.required">
          <input type="number" class="form-control" v-validate="'required|numeric'" :placeholder="property.description" v-model.number="values[property.variable]" :name="property.variable" v-else>
        </div>
        <div v-if="property.type==='password'">
          <input type="password" class="form-control" v-validate="'required'" :placeholder="property.description" v-model="values[property.variable]" :name="property.variable" v-if="property.required">
          <input type="password" class="form-control" v-validate="'required'" :placeholder="property.description" v-model="values[property.variable]" :name="property.variable" v-else>
        </div>
        <i v-show="errors.has(property.variable)" class="error fa fa-warning">{{`请输入有效的${property.label}值`}}</i>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click.prevent="callMethod" :disabled="hasError || !component.name" native-type="submit">确 定</el-button>
      </div>
    </form>
  </el-dialog>
</template>
<script>
import { validationError } from '../../mixin/error'
import {popWarn} from '../../utils/alert'
import {fetchComponentProperties, getComponentProperties, resetProperties} from 'vuexPath/modules/component'
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
        hosts: [],
        properties: {}
      }
    }
  },
  watch: {
    dialogVisible(newValue) {
      if(newValue && !!this.component.name) {
        this.fetchComponentProperties(this.component.name)
      }
    },
    properties(newProperties) {
      this.values = {}
      if(!!this.component.id) {
        this.selectedHosts = this.component.hosts.map(item => {
          return item.id
        })
        Object.keys(this.component.properties).map((key) => {
          this.values[key] = this.component.properties[key]
        })
      }else {
        this.selectedHosts = []
        newProperties.forEach((item) => {
          if(item.type === 'host') {
            this.values[item.variable] = []
            return
          }
          this.values[item.variable] = ''
        })
      }
    }
  },
  vuex: {
    actions: {
      fetchComponentProperties,
      resetProperties
    },
    getters: {
      properties: getComponentProperties
    }
  },
  data() {
    return {
      values: {},
      selectedHosts: []
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
    callMethod() {
      this.$validator.validateAll().then((result) => {
        if(!result) {
          popWarn('请填充必须参数后再进行提交')
          return
        }
        Object.keys(this.values).map((objectKey)=> {
        //处理值为主机的情况
          if(this.values[objectKey] instanceof Array) {
            let newArray = this.values[objectKey].map(item => {
              return item.id
            })
            this.values[objectKey] = newArray
          }
        })
        this.component.properties = this.values
        this.component.hosts = this.selectedHosts
        // this.component.name = this.name
        if (!!this.component.id) {
          return this.updateComponent(this.component)
        }
        return this.addComponent(this.component)
      })

    },
    onSubmit(){
      this.callMethod()
    },
    onChange(value) {
      if(!!value && value !== '') {
        this.fetchComponentProperties(value)
      }
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
