FROM nginx:1.11.10

ADD consul-template /usr/local/bin

# templates
RUN mkdir /etc/consul-templates
ADD nginx.tpl /etc/consul-templates/nginx.tpl
ENV CT_FILE /etc/consul-templates/nginx.tpl

# target file
ENV NX_FILE /etc/nginx/conf.d/default.conf

ENV SERVICE identity

ARG buildInfo=1.0.0
ENV DOCKER_BUILD_INFO ${buildInfo}
COPY dist /usr/share/nginx/html
COPY 502.json /usr/share/nginx/html

RUN mkdir -p /data/cache

CMD /usr/sbin/nginx -c /etc/nginx/nginx.conf  \
  & CONSUL_TEMPLATE_LOG=debug \
  consul-template -consul-addr=$CONSUL_URL:$CONSUL_PORT -template "$CT_FILE:$NX_FILE:/usr/sbin/nginx -s reload";
