# nginx state for serving content
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Port 8080 of the container will be exposed and then mapped to port
# 8080 of our host machine via Compose. This way we'll be able to
# access the server via localhost:8080 on our host.
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]