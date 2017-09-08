<template>
  <el-dialog title="添加集群" :visible="dialogVisible" size="tiny" :close-on-click-modal="false" :show-close="false">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="close">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ['dialogVisible'],
  data() {
    return {
      abc: ""
    }
  },
  methods: {
    close() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

