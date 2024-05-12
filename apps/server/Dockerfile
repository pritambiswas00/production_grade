# Use the official Node.js image as the base image
FROM node:latest as buildImage

# Set the working directory inside the container
WORKDIR /app/server

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install pnpm globally
RUN npm install -g pnpm

#Install Dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Transpile TypeScript to JavaScript
RUN pnpm build

#DB MIGRATTION
RUN pnpm db:migrate

RUN export NODE_ENV=production

# Command to run the server
CMD ["node", "dist/src/index.js"]
