<template>
  <div>
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
