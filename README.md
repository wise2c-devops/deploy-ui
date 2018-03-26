# deploy-ui

> deploy-ui 前端项目

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

## 制作镜像

```bash
npm run build
docker build deployment-ui .

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

