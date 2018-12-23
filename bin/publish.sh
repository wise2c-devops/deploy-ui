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
docker build --build-arg buildInfo=$(date +'%Y%m%d-%H%M%S') -t wise2c/deploy-ui:$TRAVIS_BRANCH .
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
docker push wise2c/deploy-ui:$TRAVIS_BRANCH
echo "===========SUCCESS=========="