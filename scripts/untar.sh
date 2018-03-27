#!/usr/bin/env sh
set -x

export NODE_ENV=production
export NVM_BIN=$HOME/.nvm/versions/node/v8.9.3/bin

cd ~/hdate && \
tar zxvf package.tgz -C . && \
mv build/package.json . && \
npm install && \
npm run start