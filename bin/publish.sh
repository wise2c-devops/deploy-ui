#!/bin/bash
echo "============================="
SCRIPT_PATH=$(cd `dirname $0`; pwd)
echo "scriptPath: "$SCRIPT_PATH
ROOT_PATH=$(dirname $SCRIPT_PATH)
echo "WORKSPACE:"$ROOT_PATH
VERSION=$1
echo "PUBLISH VERSION"$VERSION

cd $ROOT_PATH
cnpm install
npm run build
docker build --build-arg buildInfo=$(date +'%Y%m%d-%H%M%S') -t registry.cn-hangzhou.aliyuncs.com/wise2c/wisebuild-fronted:$VERSION .
docker login -u="zhengyl@aliyun.com" -p="wise2c2017" registry.cn-hangzhou.aliyuncs.com
docker push registry.cn-hangzhou.aliyuncs.com/wise2c/wisebuild-fronted:$VERSION
echo "===========SUCCESS=========="