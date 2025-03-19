FROM node:18

#Create a app directory
WORKDIR /app/

#Install app dependencies
COPY package*.json ./

#Run npm install
RUN npm install

#Bundle app source
# COPY . .
COPY . .

EXPOSE 8080

CMD ["node", "server.js"]