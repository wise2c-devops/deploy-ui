<template>
  <el-dialog title="主机" :visible="dialogVisible" size="tiny" :close-on-click-modal="false" :show-close="false">
    <form>
      <div class="form-group">
        <label for="hostName">主机名称</label>
        <input type="text" class="form-control" v-model="host.hostname" id="hostName" placeholder="hostname">
      </div>
      <div class="form-group">
        <label for="clusterDescrtipion">主机 IP</label>
        <input type="text" class="form-control" v-model="host.ip" id="clusterDescrtipion" placeholder="10.0.0.2">
      </div>
    </form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="callMethod">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
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
        hostname: "",
        description: ""
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
    }
  }
}
</script>

