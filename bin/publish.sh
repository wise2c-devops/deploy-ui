#!/bin/bash
cd $ROOT_PATH
VERSION=$1
# cnpm install
# npm run build
docker build --build-arg buildInfo=$(date +'%Y%m%d-%H%M%S') -t registry.cn-hangzhou.aliyuncs.com/wise2c-dev/deploy-ui:$VERSION .
echo -n "Wise2c2017" | docker login -u=wise2cdev --password-stdin registry.cn-hangzhou.aliyuncs.com
docker push registry.cn-hangzhou.aliyuncs.com/wise2c-dev/deploy-ui:$VERSION
echo "===========SUCCESS=========="
