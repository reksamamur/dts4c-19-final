FROM node:latest AS builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY .env .
RUN npm install 
COPY . .
RUN npm run build

FROM nginx:latest as production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]