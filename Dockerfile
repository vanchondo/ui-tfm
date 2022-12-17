FROM node:16  AS build

WORKDIR /app
ADD . .
RUN npm install -g @angular/cli@14.1.1 
RUN npm install 
RUN ng build
COPY . .

FROM nginx:latest
WORKDIR /app
COPY --from=build /app/dist /usr/share/nginx/html