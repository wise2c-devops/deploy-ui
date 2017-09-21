<template>
  <el-dialog title="服务组件" :visible="dialogVisible" size="tiny" :close-on-click-modal="false" :show-close="false">
    <form>
      <div class="form-group">
        <label for="componentType">组件类型</label>
        <br>
        <el-select v-model="component.name" disabled="!!component.id">
          <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="form-group" v-if="component.name !== 'loadbalancer'">
        <label for="ip">主机列表</label>
        <br>
        <el-select v-model="component.hosts" multiple placeholder="请选择">
          <el-option v-for="item in hosts" :key="item.id" :label="item.hostname" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="form-group" v-if="component.name === 'loadbalancer'">
        <label for="interface">网卡</label>
        <input type="text" class="form-control" v-model="component.properties.netInterface" v-validate="'required'" id="interface" placeholder="interface" name="interface">
        <i v-show="errors.has('interface')" class="error fa fa-warning">请输入有效的网卡</i>
      </div>
      <div class="form-group" v-if="component.name === 'loadbalancer'">
        <label for="netMask">掩码</label>
        <input type="text" class="form-control" v-model="component.properties.netMask" v-validate="'required|numeric'" id="netMask" placeholder="netMask" name="netMask">
        <i v-show="errors.has('netMask')" class="error fa fa-warning">请输入有效的掩码</i>
      </div>

      <div class="form-group" v-if="component.name === 'loadbalancer'">
        <div class="vip-label">
          <label for="vip">VIP</label>
          <el-button size="mini" icon="plus" class="add-button" @click="addVip" :disabled="component.properties.vips.length >= 3"></el-button>
        </div>
        <div class="vip-data" v-for="(vip, index) in component.properties.vips" :key="index">
          <select class="form-control" v-model="vip.type">
            <option v-for="(item, index) in vipTypes" :key="index" :value="item.value">{{item.label}}</option>
          </select>
          <input type="text" class="form-control half inline" v-model="vip.vip" v-validate="'required|ip'" name="vip">
          <el-button size="mini" icon="minus" type="danger" @click="remove(index)"  :disabled="component.properties.vips.length === 1" ></el-button>
        </div>
        <i v-show="errors.has('vip')" class="error fa fa-warning">请输入有效的VIP IP地址</i>
      </div>
    </form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="callMethod" :disabled="hasError">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { validationError } from '../../mixin/error'
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
        hosts: []
      }
    }
  },
  data() {
    return {
      vipTypes: [
        {
          value: 'k8s',
          label: 'K8S'
        },
        {
          value: 'es',
          label: 'ElasticSearch'
        },
        {
          value: 'other',
          label: 'Other'
        }
      ]
    }
  },
  methods: {
    close() {
      this.$emit('update:dialogVisible', false)
    },
    callMethod() {
      if (!!this.component.id) {
        return this.updateComponent(this.component)
      }
      return this.addComponent(this.component)
    },
    addVip() {
      this.component.properties.vips.push({
        type: '',
        vip: ''
      })
    },
    remove(index) {
      this.vips.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 535px;
}

.container-fluid {
  .form-group {
    input {
      &.half {
        width: 46%;
        display: inline-block;
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

