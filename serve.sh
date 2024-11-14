#!/bin/bash

# Create docker network if it does not exist
if ! docker network inspect nginx_network >/dev/null 2>&1; then
  docker network create nginx_network
fi

npm run docker:start

docker ps
