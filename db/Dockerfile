# version: '3.8'

# services:
#   database:
#     image: mysql:8.0-debian
#     command:
#       - --character-set-server=utf8mb4
#       - --collation-server=utf8mb4_unicode_ci
#     container_name: mysql
#     restart: always
#     environment:
#       - MYSQL_USER=docker
#       - MYSQL_PASSWORD=docker
#       - MYSQL_DATABASE=docker
#       - MYSQL_ROOT_PASSWORD=docker
#       - TZ=Asia/Seoul
#     ports:
#       - 3306:3306
#     volumes:
#       - ./mysql/db:/var/lib/mysql
#       - /etc/localtime:/etc/localtime:ro
#       - ./mysql/initdb.d:/docker-entrypoint-initdb.d
#       - ./mysql/conf.d:/etc/mysql/conf.d

FROM mysql:8.0-debian

LABEL developer="kijungle" \
        email="kijung982@gmail.com" \
        name="kj2"

ENV MYSQL_USER=docker \
        MYSQL_PASSWORD=docker \
        MYSQL_DATABASE=docker \
        MYSQL_ROOT_PASSWORD=docker \
        TZ=Asia/Seoul

COPY ./initdb.d /docker-entrypoint-initdb.d
COPY ./conf.d /etc/mysql/conf.d

EXPOSE 3306

VOLUME ./db:/var/lib/mysql \
        /etc/localtime:/etc/localtime:ro

CMD ["--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]

