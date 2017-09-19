<template>
  <el-dialog title="服务组件" :visible="dialogVisible" size="tiny" :close-on-click-modal="false" :show-close="false">
    <form>
      <div class="form-group">
        <label for="componentType">组件类型</label>
        <select class="form-control" id="componentType" v-model="component.type" autofocus="true">
          <option label="LB" selected>lb</option>
          <option label="MySql">mysql</option>
          <option label="Kafka">kafka</option>
          <option label="Registry">registry</option>
          <option label="etcd">etcd</option>
          <option label="K8S master">k8smaster</option>
          <option label="K8S node">k8snode</option>
          <option label="WiseCloud">wisecloud</option>
        </select>
      </div>
      <div class="form-group" v-if="component.type !== 'lb'">
        <label for="ip">主机列表</label>
        <br>
        <el-select v-model="component.hosts" multiple placeholder="请选择">
          <el-option v-for="item in hosts" :key="item.id" :label="item.hostname" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="form-group" v-if="component.type === 'lb'">
        <label for="description">K8S VIP</label>
        <input type="text" class="form-control" v-model="component.k8sVip" id="description" placeholder="vip">
      </div>
      <div class="form-group" v-if="component.type === 'lb'">
        <label for="description">ES VIP</label>
        <input type="text" class="form-control" v-model="component.esVip" id="description" placeholder="vip">
      </div>
      <div class="form-group" v-if="component.type === 'lb'">
        <label for="description">Other VIP</label>
        <input type="text" class="form-control" v-model="component.otherVip" id="description" placeholder="vip">
      </div>
    </form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="callMethod" :disabled="hasError">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {validationError} from '../../mixin/error'
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
        type: 'lb',
        hosts: []
      }
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

