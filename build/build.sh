#!/bin/bash

docker login

docker build --no-cache -f Dockerfile-f-proxy -t kijung2/docker-run-nginx .
docker build --no-cache -f Dockerfile-f-compose-proxy -t kijung2/docker-compose-nginx .
docker build --no-cache -f Dockerfile-b-proxy -t kijung2/docker-run-haproxy
docker build --no-cache -f Dockerfile-b-compose-proxy kijung2/docker-compose-haproxy

docker push kijung2/docker-run-nginx
docker push kijung2/docker-compose-nginx
docker push kijung2/docker-run-haproxy
docker push kijung2/docker-compose-haproxy