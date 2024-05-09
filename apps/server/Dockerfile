# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app/server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install pnpm globally
RUN npm install -g pnpm

#Install Dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Transpile TypeScript to JavaScript
RUN pnpm build

# Expose port 8080 (assuming your Express server listens on this port)
EXPOSE 8080

# Command to run the server
CMD ["node", "dist/src/index.js"]
