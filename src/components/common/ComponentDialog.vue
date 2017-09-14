<template>
  <el-dialog title="服务组件" :visible="dialogVisible" size="tiny" :close-on-click-modal="false" :show-close="false">
    <form>
      <div class="form-group">
        <label for="componentType">组件类型</label>
        <select class="form-control" id="componentType" v-model="component.type">
          <option>LB</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <div class="form-group">
        <label for="ip">主机列表</label>
        <br>
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in hosts" :key="item.id" :label="item.hostname" :value="item.ip">
          </el-option>
        </el-select>
      </div>
      <!-- <div class="form-group">
        <label for="description">描述信息</label>
        <input type="text" class="form-control" v-model="component.attribute" id="description" placeholder="描述信息">
      </div> -->
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
    addComponent: Function,
    updateComponent: Function,
    component: {
      type: Object,
      default: {
        type: '',
        hosts: []
      }
    }
  },
  data(){
    return {
      hosts: []
    }
  },
  methods: {
    close() {
      this.$emit('update:dialogVisible', false)
    },
    callMethod() {
      if (!!this.component.id) {
        return this.updateComponent(this.host)
      }
      return this.addComponent(this.host)
    }
  }
}
</script>

