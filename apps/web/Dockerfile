FROM node:latest AS build-stage

WORKDIR /app/ui

RUN npm install -g pnpm

COPY package.json .


RUN pnpm install


COPY . .


RUN pnpm build


# Use Nginx as final image
FROM nginx:alpine

# Copy static files from the build stage to Nginx's default public directory
COPY --from=build-stage /app/ui/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]