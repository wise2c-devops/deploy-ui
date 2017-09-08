<template>
  <div class="container">
    <div class="col-md-2 col-lg-pr-2">
      <div class="app-item add-item" @click="addCluster">
        <div class="add">
          <i class="fa fa-plus"></i>
        </div>
      </div>
    </div>
    <div class="col-md-2 col-lg-pr-2" v-for="(cluster, index) in clusters">
      <a class="app-item" @click="showCluster(cluster)">
        <div class="icon-container">
          <i class="app-icon fa fa-apple" style="font-size:60px"></i>
          </br>
        </div>
        <span class="app-name">{{cluster.name}}</span>
        <span class="hint--top help app-edit" aria-label="编辑应用">
          <i class="fa fa-cog app-edit" @click.prevent.stop="editProduct(cluster)"></i>
        </span>
        <span class="hint--top help app-delete" aria-label="删除应用">
          <i class="fa fa-trash" @click.prevent.stop="deleteCluster"></i>
        </span>
      </a>
    </div>
    <cluster-dialog :dialog-visible="dialogVisible"></cluster-dialog>
  </div>
</template>

<script type="text/javascript">
import ClusterDialog from './common/ClusterDialog'
export default {
  components: {ClusterDialog},
  data() {
    return {
      dialogVisible: false,
      clusters: [{
        name: "DevOps"
      }, {
        name: "平安 POC"
      }]
    }
  },
  methods: {
    deleteCluster() {

    },
    editCluster(cluster) {

    },
    showCluster(cluster) {

    },
    addCluster() {
      this.dialogVisible = true
      return
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/stylesheets/variables";
.icon-app {
  // border-radius:5px;
  width: 90%;
  height: 140px;
  margin: 18px 0 10px 0; // box-shadow: 2px 2px 5px 1px #ddd
}

.app-item.add-item {
  border-style: dashed;
  line-height: 215px;
  &:hover {
    background: lighten($blue-color, 43%); // border: 1px solid $blue-color;
    transition: 0.5s;
  }
}

.app-item {
  background: #FFF;
  cursor: pointer;
  display: inline-block;
  border: 1px solid $border-color;
  padding: 0 10px;
  width: 100%;
  height: 200px;
  text-align: center;
  vertical-align: middle;
  font-size: 16px;
  margin-bottom: 30px;
  color: $main-font-color;
  border-radius: 5px;
  span.app-name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    position: absolute;
    bottom: 5px;
    left: 30px;
    margin-bottom: 30px;
    margin-right: 40px;
  }
  i.app-icon {
    margin-top: 60px;
    margin-bottom: 10px;
    font-size: 50px;
  }
  &:hover {
    box-shadow: 0 0 30px 5px $border-hover-color;
    color: $blue-color;
    transition: .5s;
    text-decoration: none;
    span.app-edit,
    span.app-delete,
    span.stream-map {
      visibility: visible;
    }
  }

  span.app-delete {
    visibility: hidden;
    position: absolute;
    bottom: 5px;
    right: 0;
    margin-bottom: 30px;
    margin-right: 23px;
    color: $red-color;
  }

  span.app-edit {
    visibility: hidden;
    position: absolute;
    bottom: 5px;
    right: 0;
    margin-bottom: 30px;
    margin-right: 40px;
    color: $gray-color;
  }
}

.product-wrapper {
  @media(min-width: 1368px) {
    li {
      width:14.285714%;
    }
  }
  @media(min-width: 1528px) {
    li {
      width: 12.5%;
    }
  }
  @media(min-width: 1712px) {
    li {
      width: 11.11111111%;
    }
  }
  li {
    float: left;
    position: relative;
    text-align: center;
    padding: 10px 15px;
  }
  li .item {
    border: 1px solid $border-color;
    background: white;
    height: 200px;
    padding: 15px;
    &:hover {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }
  }
  .create-product-wrapper {
    font-size: 50px;
    i {
      position: relative;
      top: 35%;
      color: $border-color;
      cursor: pointer;
    }
  }
  .img-wrapper {
    width: 50%;
    height: 100px;
    background: $border-color;
    margin: 15px auto 10px;
  }
  .operation-wrapper {
    font-size: 16px;
    i {
      cursor: pointer;
    }
  }
}
</style>
