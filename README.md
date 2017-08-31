# wisebuild-frontend

> WiseBuild 前端项目

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 使用svg生成我们自己的icon
![官网](http://fontello.com/)

* 首先点击页面左上方的扳手图标导入 工程 src/assets/wise-icons 目录下的config.json，
* 然后将本次需要生成的svg 文件拖入页面。没有错的话就成功了
* 然后点击download 就可以 下载新的font 压缩包文件了。
* 将font 目录对之前的font 目录进行替换，
* 将fonttello.css 文件替换
* 将config.json 进行替换
你已经可以开心的使用这些图标了。

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 容器化运行

```
docker run -it -p 9292:80 -e CONSUL=10.0.0.44:8500 nginx-proxy
```

## Rancher测试API KEY

http://182.140.210.214:8080/v1/projects/1a11

9E626ED85870F41F2134

hHCfYtZGgHXnPzE9WCDrSnaG8oeBid1VnAP5kQkD
