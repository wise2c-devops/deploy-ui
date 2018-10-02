<template>
  <div id="contact">
    <iframe id="mainIframe" width='100%' height='100%' frameborder='0' name="mainIframe" src="http://hk.mikecrm.com/Sf9KvOR"></iframe>
  </div>
</template>
<script>
  export default {
    mounted() {
      // console.log(iframe.height, document.body)
      // this.$nextTick(()=>{
      //   const iframe = document.getElementById('mainIframe')
      //   iframe.height=document.getElementById('contact').clientHeight -50
      //   console.log(iframe, document.getElementById('contact').clientHeight)
      // })
    }
  }
</script>
<style lang="scss">
  #contact{
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 50px;
    height: 100%;
  }
</style>