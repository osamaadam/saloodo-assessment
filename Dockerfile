FROM node:18

WORKDIR /usr/src/app

RUN npm i -g pnpm@7.26

COPY pnpm-lock.yaml package.json server/package.json client/package.json ./

RUN pnpm i

COPY . .

CMD ["pnpm", "dev"]
