FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN yarn install --only=production
RUN yarn install && yarn cache clean

# Copy all local files into the image.
COPY . .

# Build for production.
RUN yarn build

CMD [ "yarn", "start" ]