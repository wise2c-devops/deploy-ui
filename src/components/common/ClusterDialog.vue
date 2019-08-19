<template>
  <el-dialog :title="$t('clusters.add.modalTile')" :visible="dialogVisible" size="small" :close-on-click-modal="false" :show-close="false">
    <form @submit.prevent="onSubmit">
      <div class="form-group" >
        <label for="clusterName" class="required">{{$t("clusters.add.clusterName")}}</label>
        <input type="text" class="form-control" v-validate="'required'" v-model="cluster.name" name="cluster" id="clusterName" autofocus :placeholder="$t('clusters.add.clusterNameTips')">
        <i v-show="errors.has('cluster')" class="error fa fa-warning">{{$t("clusters.add.clusterNameTips")}}</i>
      </div>
      <div class="form-group">
        <label for="clusterDescrtipion">{{$t("clusters.add.clusterDescrtipion")}}</label>
        <input type="text" class="form-control" v-model="cluster.description" id="clusterDescrtipion" :placeholder="$t('clusters.add.clusterDescrtipion')">
      </div>
    </form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">{{$t("tipsButton.cancel")}}</el-button>
      <el-button type="primary" @click.prevent="callMethod" :disabled="hasError" native-type="submit">{{$t("tipsButton.ok")}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import { validationError } from '../../mixin/error'
  import { popWarn } from '../../utils/alert'

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
        default: () => ({ name: '', description: '' })
      }
    },
    methods: {
      close() {
        this.$emit('update:dialogVisible', false)
      },
      callMethod() {
        this.$validator.validateAll().then((result) => {
          if (!result) {
            popWarn(this.$t('layer.warnTips'), true)
            return
          }

          if (!!this.cluster.id) {
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
