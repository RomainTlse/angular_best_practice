
# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:16.14.0-alpine as build

# Set the working directory
WORKDIR /usr/src/app

# Add the source code to app
COPY . .

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build:docker


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:1.21-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/src/app/dist/angular_best_practice /usr/share/nginx/html

# Expose port 80
EXPOSE 80
