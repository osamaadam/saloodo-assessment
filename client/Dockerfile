FROM node:18

WORKDIR /app/client

RUN npm i -g pnpm@7.26

COPY pnpm-lock.yaml package.json ./

RUN pnpm i

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
