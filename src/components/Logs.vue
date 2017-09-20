<template>
  <div class="log-wrapper">
    Logs
  </div>
</template>
<script>
export default {
  mounted() {
    setTimeout(()=>{
      this.$root.$emit('clusterPage', 'logs')
    }, 100)
  }
}
</script>
<style lang="scss">
  @import "../assets/stylesheets/variables";
  .log-wrapper {
    background: #fff;
    padding: 20px;
    border: 1px solid $border-color;
    border-radius: 4px;
    margin-top: 50px;
  }
</style>

