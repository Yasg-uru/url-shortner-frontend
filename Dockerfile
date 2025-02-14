# Stage 1: Build the React app
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy built React app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
