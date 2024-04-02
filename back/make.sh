if docker ps -a | grep -q "flask"; then
    docker stop flask
    docker rm flask

fi

if docker images | grep -q "flask-seon"; then
    tag=$(docker images --format "{{.Tag}}" flask-seon | sort -r | head -n 1)
    tag=$(echo "$tag + 1" | bc)
else
    tag=1.0
fi

docker build -f Dockerfile-back -t flask-seon:${tag} .
docker image tag flask-seon:${tag} docker-flask:latest