FROM node:20.14.0-alpine3.20
RUN mkdir home/app 
WORKDIR /home/app
EXPOSE 3000
CMD [ "sh", "-c", "npm install && npm start" ]