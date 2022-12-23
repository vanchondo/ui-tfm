FROM node:18  AS build-step

RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app/
RUN npm i --save-dev @types/d3-shape
RUN npm run build --prod

FROM nginx:1.23.3
COPY --from=build-step /app/dist /usr/share/nginx/html