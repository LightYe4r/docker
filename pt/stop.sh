#!/bin/bash

### kijungle <kijung982@gmail.com> 
### Ki Jung Lee ### kj2 ###

front_net="frontend"
back_net="backend"
docker stop docker-db
docker rm docker-db
docker stop docker-backend-1
docker stop docker-backend-2
docker stop docker-backend-3
docker rm docker-backend-1
docker rm docker-backend-2
docker rm docker-backend-3
docker stop docker-haproxy
docker rm docker-haproxy
docker stop docker-frontend-1
docker rm docker-frontend-1
docker stop docker-frontend-2
docker rm docker-frontend-2
docker stop docker-frontend-3
docker rm docker-frontend-3
docker stop docker-nginx
docker rm docker-nginx
docker network rm ${front_net}
docker netowkr rm ${back_net}