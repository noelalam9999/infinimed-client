# Dockerfile
 
# Use an existing node alpine image as a base image.
FROM node:19-alpine
 
# Set the working directory.
WORKDIR /
 
# Copy the package.json file.
COPY package.json .
 
# Install application dependencies.
RUN npm install
 
# Copy the rest of the application files.
COPY . .
 
# Expose the port.
EXPOSE 3000
 
# Run the application.
CMD ["npm","run","dev"]


