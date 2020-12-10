#!/bin/sh

(yarn check --integrity && yarn check --verify-tree) || yarn install --frozen-lockfile --production=false

# Call command issued to the docker service
exec "$@"
