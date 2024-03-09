# Stage 1: Build Angular application
FROM node:latest AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Stage 2: Serve Angular application with NGINX
FROM nginx:alpine

COPY --from=builder /app/dist/soslifestylefrontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
