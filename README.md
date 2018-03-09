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


## 容器化运行

```
docker run -it -p 9292:80 -e CONSUL=10.0.0.44:8500 nginx-proxy
```
