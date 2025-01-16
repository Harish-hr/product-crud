# Step 1: Use a Node.js image to build the Angular app
FROM node:18 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the Angular app's source code
COPY . .

# Build the app
RUN npm run build --prod

# Step 2: Use an Nginx image to serve the Angular app
FROM nginx:alpine

# Copy built files from the previous stage
COPY --from=build /app/dist/product-eval /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]