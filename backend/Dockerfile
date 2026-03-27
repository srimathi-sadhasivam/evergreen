# Use Node.js 18 as the base image
FROM node:18

WORKDIR /app

# Dependency installation
COPY package*.json ./
RUN npm install

COPY . .

# Render usually expects port 10000 or it dynamically assigns one
# 8080-ku badhula 10000 use pandradhu safe
EXPOSE 10000

# Server run panna
CMD ["node", "server.js"]