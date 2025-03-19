FROM node:18

#Create a app directory
WORKDIR /app

#Install app dependencies
COPY package*.json /app

#Run npm install
RUN npm install

#Bundle app source
# COPY . .
COPY . /app

EXPOSE 8080

CMD ["npm", "start"]