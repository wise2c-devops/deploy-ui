<template>
  <el-dialog :title="$t('host.hostModal.modalTile')" :visible="dialogVisible" size="small" :close-on-click-modal="false" :show-close="false">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="hostName" class="required">{{$t('host.hostModal.hostName')}}</label>
        <input type="text" class="form-control" v-validate="'required'" v-model="host.hostname" name="hostname" id="hostName" autofocus :placeholder="$t('host.hostModal.hostName')">
        <i v-show="errors.has('hostname')" class="error fa fa-warning">{{$t('host.hostModal.hostNameTips')}}</i>
      </div>
      <div class="form-group">
        <label for="ip" class="required">{{$t('host.hostModal.hostIp')}}</label>
        <input type="text" class="form-control" v-model="host.ip" v-validate="'required|ip'" name="ip" id="ip" placeholder="10.0.0.2">
        <i v-show="errors.has('ip')" class="error fa fa-warning">{{$t('host.hostModal.hostIpTips')}}</i>
      </div>
      <div class="form-group">
        <label for="description">{{$t('host.hostModal.hostDescrtipion')}}</label>
        <input type="text" class="form-control" v-model="host.description" id="description" :placeholder="$t('host.hostModal.hostDescrtipion')">
      </div>
    </form>
     <div slot="footer" class="dialog-footer">
      <el-button @click="close">{{$t('tipsButton.cancel')}}</el-button>
      <el-button type="primary" @click.prevent="callMethod" :disabled="hasError" native-type="submit">{{$t('tipsButton.ok')}}</el-button>
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
        this.$validator.validateAll().then((result) => {
          if (!result) {
            popWarn(this.$t('layer.warnTips'), true)
            return
          }

          if (!!this.host.id) {
            return this.updateHost(this.host)
          }
          return this.addHost(this.host)
        })
      },
      onSubmit() {
        this.callMethod()
      }
    }
  }
</script>
