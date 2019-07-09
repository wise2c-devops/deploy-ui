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


if [[ -z $ALIYUN_USERNAME ]] || [[ -z $ALIYUN_PASSWORD ]]; then
    echo "before publish.sh, please input github.com user and password"
    echo "export ALIYUN_USERNAME=<<aliyun_username>>"
    echo "export ALIYUN_PASSWORD=<<aliyun_password>>"
    exit 1
fi


# cnpm install
# npm run build
docker build --build-arg buildInfo=$(date +'%Y%m%d-%H%M%S') -t registry.cn-hangzhou.aliyuncs.com/wise2c-dev/deploy-ui:$VERSION .
echo -n "$ALIYUN_PASSWORD" | docker login --username=$ALIYUN_USERNAME --password-stdin registry.cn-hangzhou.aliyuncs.com
docker push registry.cn-hangzhou.aliyuncs.com/wise2c-dev/deploy-ui:$VERSION
echo "===========SUCCESS=========="
