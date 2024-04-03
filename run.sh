#!/bin/bash
database-image=
backend-image=
haproxy-image=
frontend-image=
nginx-image=

### MYSQL ###
if docker ps -a | grep -q "docker-db"; then
    docker stop docker-db
    docker rm docker-db
fi

docker run -itd --name docker-db \
--restart=always \
-p 3306:3306
${database-image}

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
--restart=always
-p 5001:5000
${backend-image}

docker run -itd --name docker-backend-2 \
--restart=always
-p 5002:5000
${backend-image}

docker run -itd --name docker-backend-3 \
--restart=always
-p 5003:5000
${backend-image}

### HAPROXY ###
if docker ps -a | grep -q "docker-haproxy"; then
    docker stop docker-haproxy
    docker rm docker-haproxy
fi

docker run -itd --name docker-haproxy \
--restart=always
-p 8080:8080
${haproxy-image}


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
--restart=always
-p 3001:80
${frontend-image}

docker run -itd --name docker-frontend-2 \
--restart=always
-p 3002:80
${frontend-image}

docker run -itd --name docker-frontend-3 \
--restart=always
-p 3003:80
${frontend-image}

### NGINX ###
if docker ps -a | grep -q "docker-nginx"; then
    docker stop docker-nginx
    docker rm docker-nginx
fi

docker run -itd --name docker-nginx \
--restart=always
-p 80:80
${nginx-image}