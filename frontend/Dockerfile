# Use a base image with Node.js and npm pre-installed
FROM node:20

# Set the working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json to the container
COPY ./react/package*.json ./

# Copy SSL certificat to the container
# COPY ./ssl/mycert.crt ./
# COPY ./ssl/mycert.key ./

# Install dependencies
RUN npm install

# # Copy the rest of the application files
COPY ./react/src/ ./src
COPY ./react/public/ ./public
# COPY . ./

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
