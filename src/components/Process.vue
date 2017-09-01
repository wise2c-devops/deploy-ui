<template>
  <div class="process">
    <ul class="clear-style row m0">
      <li class="pull-left" v-for="item in allProcess">
        <div class="box">
          <div class="text-center">
            <el-tooltip class="item" effect="dark" :content="item.name" placement="top">
              <i :class="item.icon"></i>
            </el-tooltip>
          </div>
        </div>
      </li>
    </ul>
    <div class="mt-lg text-center">
      <btton class="btn btn-default pt-lg">
        <router-link tag="span" :to="'/'">取消</router-link>
      </btton>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        allProcess: [
          {name: 'Etcd', icon: 'wise-icon-etcd'},
          {name: 'K8sMaster', icon: 'wise-icon-kubernets'},
          {name: 'K8sNode', icon: 'wise-icon-kubernets'},
          {name: 'Mysql', icon: 'wise-icon-mysql'},
          {name: 'LoadBalance', icon: 'wise-icon-lb-service'},
          {name: 'Wisecloud', icon: 'wise-icon-wisecloud'},
          {name: 'Registry', icon: 'wise-icon-registry'}
        ]
      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/stylesheets/variables";
  .process {
    margin: 150px 270px;
    li {
      border-top: 1px solid #cdd1d9;
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
        border: 2px solid #cdd1d9;
        color: #cdd1d9;
        i {
          font-size: 40px;

        }
      }
      &:first-child {
        padding-left: 0;
      }
    }
  }
</style>