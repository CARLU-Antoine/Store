FROM node:18 AS build
WORKDIR /app
COPY store-app/ .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/store-app/browser/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
