# Multi-stage build: build React app then serve with nginx
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
COPY public ./public
COPY src ./src
RUN npm ci --silent && npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# remove default config and add a basic one that enables SPA routing
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
