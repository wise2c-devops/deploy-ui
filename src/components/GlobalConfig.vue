<template>
  <div class="install-config">
    <div class="row m0">
      <h4 class="mb-lg">全局配置</h4>
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
        <li class="pull-left pt-sm pb-sm" v-for="item in changeInstall" :key="item">
          <el-checkbox class="m0"></el-checkbox> <label class="m0">{{item}}</label>
        </li>
      </ul>
    </div>
    <div class="row mt-lg">
      <div class="col-md-4 col-md-offset-4 buttons">
        <el-button size="large" icon="arrow-left" class="pull-left" @click="back">上一步</el-button>
        <el-button size="large" type="success" class="pull-right" icon="arrow-right" @click="next">下一步</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        changeInstall: ['Etcd', 'K8sMaster', 'K8sNode', 'Mysql', 'LoadBalance', 'Wisecloud']
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      next() {
        this.$router.push({
          path: 'process'
        })
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
