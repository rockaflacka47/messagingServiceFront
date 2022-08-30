#!/usr/bin/env bash

pm2 delete react-app

sudo rm -rf ../build

npm run build

pm2 start /home/ubuntu/messagingServiceFront/front-end/node_modules/react-scripts/scripts/start.js --name "react-app"


