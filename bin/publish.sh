#!/bin/bash
cd $ROOT_PATH
cnpm install
npm run build
docker build --build-arg buildInfo=$(date +'%Y%m%d-%H%M%S') -t registry.cn-hangzhou.aliyuncs.com/wise2c-dev/deploy-ui:$VERSION .
docker login -u="wise2cdev" -p="Wise2c2017" registry.cn-hangzhou.aliyuncs.com
# echo "wise2c2017" | docker login -u="wise2cdev" registry.cn-hangzhou.aliyuncs.com
docker push registry.cn-hangzhou.aliyuncs.com/wise2c-dev/deploy-ui:$VERSION
echo "===========SUCCESS=========="
