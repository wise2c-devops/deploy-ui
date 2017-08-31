node('swarm') {

  stage 'Checkout'


  git credentialsId: 'dc4c25c5-5700-4208-9759-3222f9527da7', url: 'git@git.wise2c.com:jwzhao/wisebuild-frontend.git'

  stage 'Build'

  try {
     // Run the maven build
     sh "docker run -l io.rancher.container.network=true -v `pwd`:/app/ registry.aliyuncs.com/wise2c/vue-build-base sh -c 'cd /app && npm --registry=https://registry.npm.taobao.org install cnpm && cnpm install && npm run build'"
  } catch (error) {
     emailext attachLog: true, body: "Build failed (see ${env.BUILD_URL}): ${error}", subject: "[JENKINS] ${env.JOB_NAME} failed", recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'UpstreamComitterRecipientProvider']]
     throw error
  }

  try {
     sh 'docker build -t registry.aliyuncs.com/wise2c/wisebuild-fronted:BUILD-$BUILD_NUMBER . '
     sh 'docker tag -f registry.aliyuncs.com/wise2c/wisebuild-fronted:BUILD-$BUILD_NUMBER registry.aliyuncs.com/wise2c/wisebuild-fronted'
     sh 'docker login -u="zhengyl@aliyun.com" -p="qwer1234" -e="zhengyl@aliyun.com" registry.aliyuncs.com'
     sh 'docker push registry.aliyuncs.com/wise2c/wisebuild-fronted:BUILD-$BUILD_NUMBER'
     sh 'docker push registry.aliyuncs.com/wise2c/wisebuild-fronted'

     // clean up docker images
     sh 'docker rmi registry.aliyuncs.com/wise2c/wisebuild-fronted:BUILD-$BUILD_NUMBER'
     sh 'docker rmi registry.aliyuncs.com/wise2c/wisebuild-fronted'

  } catch(error) {
     emailext attachLog: true, body: "Build failed (see ${env.BUILD_URL}): ${error}", subject: "[JENKINS] ${env.JOB_NAME} failed", recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'UpstreamComitterRecipientProvider']]
     throw error
  }

}

stage 'Deploy To Dev'

node('swarm') {
  try {
     sh '/usr/local/rancher-compose-v0.8.4/rancher-compose --env-file .rancher-env-dev --url http://182.140.210.213 --access-key 608A13B92FE62F8BE1E6 --secret-key iEaXFB9r7V5EixbtALfp9MJSWcWqaDrPiMKnM3aj -p Wise2BuildDev up -u -d -p'
     sh '/usr/local/rancher-compose-v0.8.4/rancher-compose --env-file .rancher-env-dev --url http://182.140.210.213 --access-key 608A13B92FE62F8BE1E6 --secret-key iEaXFB9r7V5EixbtALfp9MJSWcWqaDrPiMKnM3aj -p Wise2BuildDev up -c -d'
  } catch(error) {
     emailext attachLog: true, body: "Build failed (see ${env.BUILD_URL}): ${error}", subject: "[JENKINS] ${env.JOB_NAME} failed", recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'UpstreamComitterRecipientProvider']]
     throw error
  }
}

stage 'Deploy To UAT'

timeout(time:5, unit:'DAYS') {
 input('是否部署到UAT环境')
}

node('swarm') {

  try {
     sh '/usr/local/rancher-compose-v0.8.4/rancher-compose --env-file .rancher-env-uat --url http://182.140.210.213 --access-key 608A13B92FE62F8BE1E6 --secret-key iEaXFB9r7V5EixbtALfp9MJSWcWqaDrPiMKnM3aj -p Wise2BuildUAT up -u -d -p'
     sh '/usr/local/rancher-compose-v0.8.4/rancher-compose --env-file .rancher-env-uat --url http://182.140.210.213 --access-key 608A13B92FE62F8BE1E6 --secret-key iEaXFB9r7V5EixbtALfp9MJSWcWqaDrPiMKnM3aj -p Wise2BuildUAT up -c -d'
  } catch (error) {
     emailext attachLog: true, body: "Build failed (see ${env.BUILD_URL}): ${error}", subject: "[JENKINS] ${env.JOB_NAME} failed", recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'UpstreamComitterRecipientProvider']]
     throw error
  }

  emailext attachLog: true, body: "UAT Deploy Success (see http://182.140.210.217/#/)", subject: "[JENKINS] ${env.JOB_NAME} UAT Deploy Success", recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'UpstreamComitterRecipientProvider']]

}
