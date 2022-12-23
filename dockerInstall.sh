#!/bin/bash
docker image build -t ui-tfm:latest .
docker stop ui-tfm
docker rm ui-tfm
docker run --name ui-tfm -d --restart unless-stopped -p80:80 ui-tfm:latest 