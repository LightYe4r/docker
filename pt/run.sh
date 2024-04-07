#!/bin/bash

### kijungle <kijung982@gmail.com> 
### Ki Jung Lee ### kj2 ###

cd ../

front_net="frontend"
back_net="backend"
database_image="kijung2/docker-mysql:latest"
backend_image="seonxx/docker-flask:latest"
haproxy_image="kijung2/docker-run-haproxy:latest"
frontend_image="kijung2/docker-nextjs:latest"
nginx_image="kijung2/docker-run-nginx:latest"
database_ip="172.31.1.100"

### NETWORK ###
if ! docker network ls | grep -q ${front_net}; then
    docker network create \
    --driver=bridge \
    --subnet=172.30.1.0/24 \
    --ip-range=172.30.1.0/24 \
    --gateway=172.30.1.1 \
    ${front_net}
fi

if ! docker network ls | grep -q ${back_net}; then
    docker network create \
    --driver=bridge \
    --subnet=172.31.1.0/24 \
    --ip-range=172.31.1.0/24 \
    --gateway=172.31.1.1 \
    ${backn_net}
fi

### DATABASE-MYSQL ###
if docker ps -a | grep -q "docker-db"; then
    docker stop docker-db
    docker rm docker-db
fi

docker run -d --name docker-db \
--cap_add=SYS_NICE \
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

docker run -d --name docker-backend-1 \
--restart=always \
--network=${back_net} \
-e MYSQL_HOST=${database_ip} \
${backend_image}

docker run -d --name docker-backend-2 \
--restart=always \
--network=${back_net} \
-e MYSQL_HOST=${database_ip} \
${backend_image}

docker run -d --name docker-backend-3 \
--restart=always \
--network=${back_net} \
-e MYSQL_HOST=${database_ip} \
${backend_image}

### HAPROXY ###
if docker ps -a | grep -q "docker-haproxy"; then
    docker stop docker-haproxy
    docker rm docker-haproxy
fi

docker run -d --name docker-haproxy \
--restart=always \
--network=${front_net} \
--network=${back_net} \
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

docker run -d --name docker-frontend-1 \
--restart=always \
--network=${front_net} \
${frontend_image}


docker run -d --name docker-frontend-2 \
--restart=always \
--network=${front_net} \
${frontend_image}

docker run -d --name docker-frontend-3 \
--restart=always \
--network=${front_net} \
${frontend_image}

### NGINX ###
if docker ps -a | grep -q "docker-nginx"; then
    docker stop docker-nginx
    docker rm docker-nginx
fi

docker run -d --name docker-nginx \
--restart=always \
--network=${front_net} \
-p 80:80 \
${nginx_image}