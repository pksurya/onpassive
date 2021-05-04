FROM python:alpine
FROM node:alpine AS builder

WORKDIR /demoweb

COPY . .
RUN apk add --no-cache git
RUN npm install -g npm@latest
RUN npm install --force --legacy-peer-deps
RUN npm --depth 20 update caniuse-lite browserslist 
RUN npm run build



FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /demoweb/build .
RUN chown nginx:nginx /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

