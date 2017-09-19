<template>
  <el-dialog title="服务组件" :visible="dialogVisible" size="tiny" :close-on-click-modal="false" :show-close="false">
    <form>
      <div class="form-group">
        <label for="componentType">组件类型</label>
        <br>
        <el-select v-model="component.name" :disabled="!!component.id">
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
        <input type="text" class="form-control" v-model="component.interface" id="interface" placeholder="interface">
      </div>
      <div class="form-group" v-if="component.name === 'loadbalancer'">
        <label for="netMask">掩码</label>
        <input type="text" class="form-control" v-model="component.netMask" id="netMask" placeholder="netMask">
      </div>
      <div class="form-group" v-if="component.name === 'loadbalancer'">
        <label for="registryIP">Registry IP</label>
        <input type="text" class="form-control" v-model="component.registryIP" id="registryIP" placeholder="registryIP">
      </div>
      <div class="form-group" v-if="component.name === 'loadbalancer'">
        <label for="k8sVip">K8S VIP</label>
        <input type="text" class="form-control" v-model="component.k8sVip" id="k8sVip" placeholder="k8sVip">
      </div>
      <div class="form-group" v-if="component.name === 'loadbalancer'">
        <label for="k8sPort">K8S Port</label>
        <input type="text" class="form-control" v-model="component.k8sPort" id="k8sPort" placeholder="k8sPort">
      </div>
      <div class="form-group" v-if="component.name === 'loadbalancer'">
        <label for="description">ES VIP</label>
        <input type="text" class="form-control" v-model="component.esVip" id="description" placeholder="esVip">
      </div>
      <div class="form-group" v-if="component.name === 'loadbalancer'">
        <label for="esPort">ES Port</label>
        <input type="text" class="form-control" v-model="component.esPort" id="esPort" placeholder="esPort">
      </div>
      <div class="form-group" v-if="component.name === 'loadbalancer'">
        <label for="description">Other VIP</label>
        <input type="text" class="form-control" v-model="component.otherVip" id="description" placeholder="vip">
      </div>
      <div class="form-group" v-if="component.name === 'loadbalancer'">
        <label for="otherPort">Other Port</label>
        <input type="text" class="form-control" v-model="component.otherPort" id="otherPort" placeholder="otherPort">
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
    component: {
      type: Object,
      default: {
        name: 'loadbalancer',
        hosts: []
      }
    }
  },
  data() {
    return {
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
  methods: {
    close() {
      this.$emit('update:dialogVisible', false)
    },
    callMethod() {
      if (!!this.component.id) {
        return this.updateComponent(this.component)
      }
      return this.addComponent(this.component)
    }
  }
}
</script>

