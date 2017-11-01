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
      <div class="form-group" v-for="(property, index) in properties" :key="index">
        <label for="ip">{{property.label}}</label><br>
        <div v-if="property.type==='enum'">
          <el-select :placeholder="property.description" v-model="values[property.variable]">
            <el-option v-for="(option, index) in property.options" :key="index" :label="option" :value="option">
            </el-option>
          </el-select>
        </div>
        <div v-if="property.type==='string'">
          <input type="text" class="form-control" v-validate="'required'" :placeholder="property.description" v-model="values[property.variable]" :name="property.variable" v-if="property.required">
          <input type="text" class="form-control" v-validate="'required'" :placeholder="property.description" v-model="values[property.variable]" :name="property.variable" v-else>
        </div>
        <div v-if="property.type==='int'">
          <input type="number" class="form-control" v-validate="'required|numeric'" :placeholder="property.description" v-model="values[property.variable]" :name="property.variable" v-if="property.required">
          <input type="number" class="form-control" v-validate="'required|numeric'" :placeholder="property.description" v-model="values[property.variable]" :name="property.variable" v-else>
        </div>
        <div v-if="property.type==='password'">
          <input type="password" class="form-control" v-validate="'required'" :placeholder="property.description" v-model="values[property.variable]" :name="property.variable" v-if="property.required">
          <input type="password" class="form-control" v-validate="'required'" :placeholder="property.description" v-model="values[property.variable]" :name="property.variable" v-else>
        </div>
        <div v-if="property.type==='host'">
          <el-select v-model="values[property.variable]" multiple :placeholder="property.description">
            <el-option v-for="item in hosts" :key="item.id" :label="item.hostname" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <i v-show="errors.has(property.variable)" class="error fa fa-warning">{{`请输入有效的${property.label}值`}}</i>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click.prevent="callMethod" :disabled="hasError" native-type="submit">确 定</el-button>
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
        name: '',
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
        Object.keys(this.component.properties).map((key, index) => {
          this.values[key] = this.component.properties[key]
        })
      }else {
        newProperties.forEach((item) => {
          if(item.type === 'host') {
            this.values[item.variable] = []
            return
          }
          this.values[item.variable] = ''
        })
      }

      console.log(this.values)
    },
    component(newComponent) {
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
      values: {}
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
      // if(this.component.name !== 'loadbalancer' && this.component.hosts.length === 0) {
      //   popWarn('请选择主机后再保存')
      //   return
      // }
      this.component.properties = this.values
      if (!!this.component.id) {
        return this.updateComponent(this.component)
      }
      return this.addComponent(this.component)
    },
    onSubmit(){
      this.callMethod()
    },
    addVip() {
      this.component.properties.vips.push({
        type: '',
        vip: ''
      })
    },
    remove(index) {
      this.component.properties.vips.splice(index, 1)
    },
    onChange(value) {
      if(!!value && value !== '') {
        this.fetchComponentProperties(value)
      }
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

