<template>
  <div class="install-config">
    <div class="row m0 mb-lg">
      <h4 class="pull-left pl-sm">全局配置</h4>
      <div class="pull-right pr-sm">
        <button class="btn btn-default" @click="goBack">返回</button>
        <button class="btn btn-success">
          <router-link tag="span" :to="'process'">下一步</router-link>
        </button>
      </div>
    </div>
    <div class="row m0 bg-white">
      <div class="col-sm-6">
        <div class="form-group mt-sm">
          <label for="">Interface</label>
          <input type="text" class="form-control">
        </div>
        <div class="form-group">
          <label for="">K8s</label>
          <input type="text" class="form-control">
        </div>
        <div class="form-group">
          <label for="">Registry</label>
          <input type="text" class="form-control">
        </div>
      </div>
      <div class="col-sm-6">
         <div class="form-group mt-sm">
          <label for="">NetMask</label>
          <input type="text" class="form-control">
        </div>
        <div class="form-group">
          <label for="">ElasticSearch</label>
          <input type="text" class="form-control">
        </div>
        <div class="form-group">
          <label for="">Other</label>
          <input type="text" class="form-control">
        </div>
      </div>
    </div>
    <div class="split-line row">
      <span>安装选项</span>
    </div>
    <div class="bg-white row ml0 mr0 mt-lg foot">
      <ul class="clear-style m0">
        <li class="pull-left pt-sm pb-sm" v-for="item in changeInstall">
          <el-checkbox class="m0"></el-checkbox> <label class="m0">{{item}}</label>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        changeInstall: ['Etcd', 'K8sMaster', 'K8sNode', 'Mysql', 'LoadBalance', 'Wisecloud']
      }
    },
    methods: {
      goBack () {
        window.history.back()
      }
    }
  }
</script>
<style lang="scss">
  .install-config {
    margin: 50px 270px 0 270px;
    .split-line {
      height: 1px;
      border-top: 1px solid #ddd;
      text-align: center;
      margin-top: 32px;
      span {
        position: relative;
        top: -12px;
        background: #f3f7f8;
        padding: 0 20px;
        color: #aab2bd;
      }
    }
    .foot {
      li {
        padding-left: 8%;
        &:first-child {
          padding-left: 15px;
        }
      }
    }
  }
</style>