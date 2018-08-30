FROM alpine:3.7

WORKDIR /root

COPY repositories /etc/apk/
RUN apk update 
RUN apk add curl bash gnupg caddy --no-cache

ADD dist/ /root/ui

COPY entrypoint.sh /root
COPY caddy/Caddyfile /root

RUN chmod +x /root/entrypoint.sh

EXPOSE 80 443

ENTRYPOINT ["/root/entrypoint.sh"]
