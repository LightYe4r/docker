#!/bin/bash

if docker ps -a | grep -q "mysql"; then
    docker stop mysql
    docker rm mysql
fi

if docker images | grep -q "mysql-kj2"; then
    tag=$(docker images --format "{{.Tag}}" mysql-kj2 | sort -r | head -n 1)
    tag=$(echo "$tag + 1" | bc)
else
    tag=1.0
fi

docker build -t mysql-kj2:${tag} .
docker run -itd --name mysql \
--restart=always \
-p 3306:3306 \
mysql-kj2:${tag}
