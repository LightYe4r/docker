#!/bin/bash

### kijungle <kijung982@gmail.com> 
### Ki Jung Lee ### kj2 ###

front_net="frontend"
back_net="backend"
database_image="kijung2/docker-mysql:latest"
backend_image="docker-flask:latest"
haproxy_image="haproxy-test:1.0"
frontend_image="frontend-test:1.0"
nginx_image="test-nginx-proxy:1.0"
database_ip="172.31.1.100"

### DATABASE-MYSQL ###
if docker ps -a | grep -q "docker-db"; then
    docker stop docker-db
    docker rm docker-db
fi

docker run -itd --name docker-db \
--restart=always \
--network=${back_net} \
--ip ${database_ip} \
${database_image}

### BACKEND-FLASK ###
if docker ps -a | grep -q "docker-backend"; then
    docker stop docker-backend-1
    docker stop docker-backend-2
    docker stop docker-backend-3
    docker rm docker-backend-1
    docker rm docker-backend-2
    docker rm docker-backend-3
fi

docker run -itd --name docker-backend-1 \
--restart=always \
--network=${back_net} \
-e MYSQL_HOST=${database_ip} \
${backend_image}
# -p 5001:5000 \

docker run -itd --name docker-backend-2 \
--restart=always \
--network=${back_net} \
${backend_image}
# -p 5001:5000 \

docker run -itd --name docker-backend-3 \
--restart=always \
--network=${back_net} \
${backend_image}
# -p 5001:5000 \

### HAPROXY ###
if docker ps -a | grep -q "docker-haproxy"; then
    docker stop docker-haproxy
    docker rm docker-haproxy
fi

docker run -itd --name docker-haproxy \
--restart=always \
--network=${front_net} \
--network=${back_net} \
-p 8080:8080 \
${haproxy_image}


### FRONTEND-NEXTJS ###
if docker ps -a | grep -q "docker-frontend"; then
    docker stop docker-frontend-1
    docker rm docker-frontend-1
    docker stop docker-frontend-2
    docker rm docker-frontend-2
    docker stop docker-frontend-3
    docker rm docker-frontend-3
fi

docker run -itd --name docker-frontend-1 \
--restart=always \
--network=${front_net} \
${frontend_image}
# -p 3001:80 \

docker run -itd --name docker-frontend-2 \
--restart=always \
--network=${front_net} \
${frontend_image}
# -p 3002:80

docker run -itd --name docker-frontend-3 \
--restart=always \
--network=${front_net} \
${frontend_image}
# -p 3003:80

### NGINX ###
if docker ps -a | grep -q "docker-nginx"; then
    docker stop docker-nginx
    docker rm docker-nginx
fi

docker run -itd --name docker-nginx \
--restart=always \
--network=${front_net} \
-p 80:80 \
${nginx_image}