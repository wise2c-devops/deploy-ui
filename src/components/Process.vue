<template>
  <div class="process middle">
    <ul class="clear-style row m0">
      <li class="pull-left" v-for="(item, index) in allProcess" :key="index">
        <div class="box">
          <div class="text-center">
            <i :class="item.icon"></i>
            <p class="title">{{item.name}}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="btn-wrapper row">
      <div class="col-md-2 col-md-offset-4">
        <el-button size="large" icon="arrow-left" class="pull-left " @click="back">返回</el-button>
      </div>
      <div class="col-md-2">
        <el-button size="large" icon="close" type="danger" @click="cancelDeployment">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {pop} from '../utils/alert'
  import {cancel} from 'vuexPath/modules/cluster'
  import SockJS from 'sockjs-client'
  export default {
    computed: {
      clusterId() {
        return this.$route.params.id
      }
    },
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
    },
    methods: {
      back () {
        this.$router.push({
          path: `/clusters/${this.clusterId}/hosts`
        })
      },
      cancelDeployment() {
        this.cancel(this.clusterId, () => {
          pop('取消安装成功')
          this.back()
        })
      }
    },
    mounted() {
      // var socket = new SockJS(`${process.env.WEBSOCKET_HOST}/v1/stats`)
      var socket = new WebSocket(`${process.env.WEBSOCKET_HOST}/v1/stats`, "ws")
      socket.onopen = (event) => {
        console.log('--------open,', event)
      }
      socket.onmessage = (event) => {
        console.log(event.data)
      }
    },
    vuex: {
      actions: {
        cancel
      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/stylesheets/variables";
  .process {
    width:80%;
    height: 150px;
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
        p.title {
          color: $main-font-color;
          margin-top: 10px;
          font-size: 14px;
        }
      }
      &:first-child {
        padding-left: 0;
      }
    }
    .btn-wrapper {
      padding-top: 50px;
      margin: auto;
    }
  }
</style>
