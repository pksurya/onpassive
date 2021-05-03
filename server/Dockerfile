FROM node:alpine

WORKDIR /demoserver

RUN mkdir images

COPY ./ ./

#RUN npm install -g npm@latest

RUN npm install --force --legacy-peer-deps

EXPOSE 4080

CMD ["npm","start"]