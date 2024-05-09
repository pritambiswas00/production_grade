FROM node:latest AS build-stage

WORKDIR /app/ui

RUN npm install -g pnpm

COPY package.json .


RUN pnpm install


COPY . .


RUN pnpm build


FROM busybox:1.35

RUN adduser -D static

USER static

WORKDIR /home/static


COPY --from=build-stage /app/dist .


CMD ["busybox", "httpd", "-f", "-v", "-p", "3000"]