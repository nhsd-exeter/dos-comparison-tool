FROM nginx:latest

RUN set -ex && \
    \
    # Configure system
    apk update && \
    \
    # Configure Nginx
    cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.orig && \
    sed -i "s/worker_processes[ \t]+1/worker_processes 3/g" /etc/nginx/nginx.conf && \
    sed -i "s/#gzip[ \t]+on/gzip on/g" /etc/nginx/nginx.conf && \
    sed -i "s/http {/http {\n    server_tokens off;/" /etc/nginx/nginx.conf && \
    mkdir -p /application && \
    mkdir -p /metadata && \
    \
    # Clean up
    rm -rf /tmp/* /var/tmp/* /var/cache/apk/*

COPY assets/ /

WORKDIR /application
EXPOSE 8443
RUN ["chmod", "+x", "/sbin/entrypoint.sh"]
ENTRYPOINT [ "/sbin/entrypoint.sh" ]
