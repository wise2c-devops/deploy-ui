<template>
  <div>
  </div>
</template>
<style lang="scss" scoped>

</style>
<script type="text/javascript">

export default {
  components: {
  },
  vuex: {
  },
  created() {
    this.$root.eventHub.$emit('UPDATE_TITLE', '首页')
  }
}
</script>
