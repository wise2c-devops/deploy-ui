<template>
  <el-dialog title="添加集群" :visible="dialogVisible" size="small" :close-on-click-modal="false" :show-close="false">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="clusterName">集群名称</label>
        <input type="text" class="form-control" v-validate="'required'" v-model="cluster.name" name="cluster" id="clusterName" autofocus placeholder="请输入集群名字">
        <i v-show="errors.has('cluster')" class="error fa fa-warning">请输入集群名称</i>
      </div>
      <div class="form-group">
        <label for="clusterDescrtipion">集群描述</label>
        <input type="text" class="form-control" v-model="cluster.description" id="clusterDescrtipion" placeholder="描述">
      </div>
    </form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click.prevent="callMethod" :disabled="hasError" native-type="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {validationError} from '../../mixin/error'
import {popWarn} from '../../utils/alert'
export default {
  mixins: [validationError],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    addCluster: Function,
    updateCluster: Function,
    cluster: {
      type: Object,
      default: {
        name: "",
        description: ""
      }
    }
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

        if(!!this.cluster.id) {
          return this.updateCluster(this.cluster)
        }
        return this.addCluster(this.cluster)
      })

    },
    onSubmit() {
      this.callMethod()
    }
  },
  computed: {
    hasError() {
      return this.errors.items.length !== 0
    }
  }
}
</script>

