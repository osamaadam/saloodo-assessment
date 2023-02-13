FROM node:18

WORKDIR /app/server

RUN npm i -g pnpm@7.26

COPY pnpm-lock.yaml package.json ./

RUN pnpm i

COPY . .

CMD ["pnpm", "start:dev"]
