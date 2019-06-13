REPO_DEV=registry.cn-hangzhou.aliyuncs.com/wise2c-dev/deploy-ui
REPO_TEST=registry.cn-hangzhou.aliyuncs.com/wise2c-test/deploy-ui
VERSION?=v0.5.7
TIMEINFO=$(shell date +'%Y%m%d-%H%M%S')

.PHONY:build push_dev push_test push release run
build:
	# cnpm install
	npm run build
	docker build --build-arg buildInfo=${TIMEINFO} -t deploy-ui:latest .

push_dev:
	docker tag deploy-ui:latest $(REPO_DEV):latest
	docker tag deploy-ui:latest $(REPO_DEV):$(VERSION)
	docker push $(REPO_DEV):latest
	docker push $(REPO_DEV):$(VERSION)

push_test:
	docker tag deploy-ui:latest $(REPO_TEST):$(VERSION)
	docker push $(REPO_TEST):$(VERSION)

push: push_dev push_test
release_dev: build  push_dev
release: build push


run:
	-docker rm -f deploy-ui
	docker run -d --name deploy-ui -p 3000:80 $(REPO):$(VERSION)

