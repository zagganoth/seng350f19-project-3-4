FROM node:10

WORKDIR /usr/src/app

COPY ./GradeAchiever/package*.json ./

RUN npm install

RUN tsc

EXPOSE 3000

CMD ["./bin/www"]