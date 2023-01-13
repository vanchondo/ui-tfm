#!/bin/bash
IMAGE=ui-tfm

# Creates docker image
docker image build -t $IMAGE:latest .

# Upload image to jfrog
docker tag $IMAGE vanchondo.jfrog.io/tfm/$IMAGE
docker push vanchondo.jfrog.io/tfm/$IMAGE

# Stop, remove and start docker container
docker stop $IMAGE
docker rm $IMAGE
docker run --name $IMAGE -d --restart unless-stopped -p80:80 $IMAGE:latest 