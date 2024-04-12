# Stage 1: Install dependencies
FROM node:14 AS dependencies

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm i

# Stage 2: Build the app
FROM dependencies AS build

# Copy the entire application to the working directory
COPY . .

# Run build script
RUN npm run build

# Stage 3: Serve the app using Nginx or your preferred server

# Example with Nginx
FROM nginx:alpine

# Copy built app from previous stage to Nginx's web root directory
COPY --from=build /app/dist/. /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
