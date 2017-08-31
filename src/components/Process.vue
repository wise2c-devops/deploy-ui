<template>
  <div class="process">
    <ul class="clear-style">
      <li class="pull-left" v-for="item in allProcess">
        <div class="box">
          <div>
            <i class="wise-icon-kubernets">xx</i>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        allProcess: ['Etcd', 'K8sMaster', 'K8sNode', 'Mysql', 'LoadBalance', 'Wisecloud']
      }
    }
  }
</script>
<style lang="scss">
  .process {
    margin: 150px 270px;
    li {
      border-top: 1px solid #ddd;
      padding-left: 10%;
      .box {
        width: 70px;
        position: relative;
        top: -30px;
        background: #f5f8fa;
      }
      .box > div {
        margin: auto;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 2px solid #ddd;
        color: #ddd;
      }
      &:first-child {
        padding-left: 0;
      }
    }
  }
</style>