# First part: Using the whalesay base image
FROM docker/whalesay:latest
LABEL Name=mongooseproyecto Version=0.0.1

# Install the fortunes package
RUN apt-get -y update && apt-get install -y fortunes

# CMD for whalesay
CMD ["sh", "-c", "/usr/games/fortune -a | cowsay"]

# Second part: Setting up Node.js application
FROM node:latest

# Set the working directory inside the container for Node.js
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if present) to the working directory for Node.js
COPY package*.json ./

# Install application dependencies for Node.js
RUN npm install

# Copy the application source code into the container for Node.js
COPY . .

# Set environment variables for Node.js
ENV PORT=3000
ENV MONGO_URI='mongodb+srv://Vika:Vika1234@cluster0.pu4v6dc.mongodb.net/goIT?retryWrites=true&w=majority'

# Expose the port used by the application for external interaction
EXPOSE 3000

# CMD to start the Node.js application
CMD ["npm", "start"]
