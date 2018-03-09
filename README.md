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

## Rancher测试API KEY

http://182.140.210.214:8080/v1/projects/1a11

9E626ED85870F41F2134

hHCfYtZGgHXnPzE9WCDrSnaG8oeBid1VnAP5kQkD
