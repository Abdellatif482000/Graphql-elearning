FROM node:23.6 as base
WORKDIR /app

# USER node
RUN corepack enable 


FROM base as dev
COPY package.json yarn.lock ./
RUN yarn install

COPY . .
CMD ["yarn" ,"dev"]


FROM base as prod
COPY package.json yarn.lock ./

RUN yarn workspaces focus --production 


COPY . .
RUN yarn build

COPY . .
CMD ["yarn", "start"]