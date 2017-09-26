<template>
  <el-dialog title="主机" :visible="dialogVisible" size="tiny" :close-on-click-modal="false" :show-close="false">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="hostName">主机名称</label>
        <input type="text" class="form-control" v-validate.initial="'required'" v-model="host.hostname" name="hostname" id="hostName" autofocus placeholder="主机名称">
        <i v-show="errors.has('hostname')" class="error fa fa-warning">请输入主机名称</i>
      </div>
      <div class="form-group">
        <label for="ip">主机 IP</label>
        <input type="text" class="form-control" v-model="host.ip" v-validate="'required|ip'" name="ip" id="ip" placeholder="10.0.0.2">
        <i v-show="errors.has('ip')" class="error fa fa-warning">请输入有效的IP地址</i>
      </div>
      <div class="form-group">
        <label for="description">描述信息</label>
        <input type="text" class="form-control" v-model="host.description" id="description" placeholder="描述信息">
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click.prevent="callMethod" :disabled="hasError" native-type="submit">确 定</el-button>
      </div>
    </form>
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
    addHost: Function,
    updateHost: Function,
    host: {
      type: Object,
      default: {
        hostname: '',
        ip: '',
        description: ''
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:dialogVisible', false)
    },
    callMethod() {
      if(!!this.host.id) {
        return this.updateHost(this.host)
      }
      return this.addHost(this.host)
    },
    onSubmit() {
      this.callMethod()
    }
  }
}
</script>

