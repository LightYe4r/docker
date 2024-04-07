#!/bin/bash

docker login

docker rmi kijung2/docker-run-nginx:latest
docker rmi kijung2/docker-compose-nginx:latest
docker rmi kijung2/docker-nextjs:latest
docker rmi kijung2/docker-mysql:latest
docker rmi seonxx/docker-flask:latest
docker rmi kijung2/docker-run-haproxy:latest
docker rmi kijung2/docker-compose-haproxy:latest


docker pull kijung2/docker-run-nginx:latest
docker pull kijung2/docker-compose-nginx:latest
docker pull kijung2/docker-nextjs:latest
docker pull kijung2/docker-mysql:latest
docker pull seonxx/docker-flask:latest
docker pull kijung2/docker-run-haproxy:latest
docker pull kijung2/docker-compose-haproxy:latest