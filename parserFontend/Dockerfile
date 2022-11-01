FROM node:16-alpine3.15
ENV PYTHONUNBUFFERED=1
RUN mkdir -p /usr/src/app-frontend
WORKDIR /usr/src/app-frontend
COPY package*.json  /usr/src/app-frontend/

RUN npm install --legacy-peer-deps

COPY ./ /usr/src/app-frontend/

RUN npm run build -- --output-path=./dist/parser-fontend --configuration

RUN npm install @angular/cli --legacy-peer-deps


EXPOSE 8081
CMD ["ng","serve","--host", "0.0.0.0"]
