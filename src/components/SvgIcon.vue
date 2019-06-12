<template>
  <svg :class="svgClass + 'svg-icon'">
    <use :xlink:href="iconName"/>
  </svg>
</template>
<script>
  export default {
    name: 'svgIcon',
    props: ['className', 'iconClass'],
    computed: {
      iconName() {
        return '#icon-' + this.iconClass
      },
      svgClass() {
        if (this.className) return 'svg-icon' + this.className
        return 'svg-icon'
      }
    }
  }
</script>

<style lang="scss">
.svg-icon {
  // width: 1em;
  // height: 1em;
  overflow: hidden;
}
</style>
