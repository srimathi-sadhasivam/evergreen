# Use Node.js 18 as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application files
COPY . .

# Expose port 8080
EXPOSE 8080

# Set the start command
CMD ["node", "server.js"]
