REPO?=registry.cn-hangzhou.aliyuncs.com/wise2c-dev/deploy-ui
VERSION=latest
DEV_VERSION=v0.5.2

.PHONY:build push
build:
	docker build -t $(REPO):$(VERSION) .

push:
	docker tag $(REPO):$(VERSION) $(REPO):$(DEV_VERSION)
	docker push $(REPO):$(VERSION)
	docker push $(REPO):$(DEV_VERSION)

run:
	-docker rm -f deploy-ui
	docker run -d --name deploy-ui -p 3000:80 $(REPO):$(VERSION)
