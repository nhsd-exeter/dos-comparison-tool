FROM nginx:1.25.0

ENV DEBIAN_FRONTEND="noninteractive" \
    TZ="Europe/London" \
    LANG="en_GB.UTF-8" \
    LC_ALL="en_GB.UTF-8"

RUN set -ex && \
    \
    # configure system
    echo "APT::Install-Recommends 0;\nAPT::Install-Suggests 0;" >> /etc/apt/apt.conf.d/01norecommends && \
    apt-get --yes update && \
    apt-get --yes install \
    locales && \
    echo "$LANG UTF-8" > /etc/locale.gen && locale-gen && \
    usermod -u 1000 nginx && \
    groupmod -g 1000 nginx && \
    \
    # configure Nginx
    cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.orig && \
    sed -i "s/worker_processes[ \t]+1/worker_processes 3/g" /etc/nginx/nginx.conf && \
    sed -i "s/#gzip[ \t]+on/gzip on/g" /etc/nginx/nginx.conf && \
    mkdir -p /application && \
    mkdir -p /metadata && \
    mkdir -p /var/log/application && \
    chmod 1777 /var/log/application && \
    \
    echo "nginx" > /application/index.html && \
    \
    # clean up
    rm -rf /tmp/* /var/tmp/* /var/lib/apt/lists/* /var/cache/apt/*

ADD assets/sbin/ /sbin/
ADD assets/etc/ /etc/

WORKDIR /application
EXPOSE 8081
ENTRYPOINT [ "/sbin/entrypoint.sh" ]

ADD assets/ui-app.tar.gz /application
ADD assets/certificate /certificate
