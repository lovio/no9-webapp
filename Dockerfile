FROM node:6.10-alpine

# PID1 use https://github.com/Yelp/dumb-init
RUN wget -O /usr/local/bin/dumb-init http://code.smartstudy.com/liuqi/static-files/raw/master/dumb-init_1.2.0_amd64 \
  && chmod +x /usr/local/bin/dumb-init

ENV WORKDIR=/www NPM_CONFIG_REGISTRY=https://registry.npm.taobao.org PORT=20000

# need to download repos from github
WORKDIR ${WORKDIR}
COPY package.json yarn.lock .npmrc ./
COPY tools/nodeVersionCheck.js ./tools/nodeVersionCheck.js
RUN yarn --force
COPY . .
RUN yarn run gen:config && yarn run build
EXPOSE ${PORT}
ENV NODE_ENV=production
ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
CMD ["node", "server.js"]
