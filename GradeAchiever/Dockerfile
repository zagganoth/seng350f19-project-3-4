# Set version of node
FROM node:10

# Set working directory
WORKDIR /usr/src/app

# Copy over the package.json and package-lock.json for npm install
COPY package*.json ./

# The second npm install for typescript seems to be necessary.
# Even though it is properly defined in the package.json
# tsc does not work without the explicit install
RUN npm install
RUN npm install -g typescript 
RUN npm install -g @lhci/cli@0.3.x
# Pull over rest of source files
ADD . /usr/src/app

# Compile typescript
RUN tsc

# Expose port which will be listening
EXPOSE 3000

# Start server
CMD ["./bin/www"]