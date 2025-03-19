FROM node:18

#Create a app directory
WORKDIR /app

#Install app dependencies
COPY package*.json /app/

#Bundle app source
# COPY . .
COPY . /app/

#Run npm install
RUN npm install

EXPOSE 8080

CMD ["npm", "start"]