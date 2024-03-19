FROM node AS Frontend
WORKDIR /usr/src/app/Frontend
COPY Frontend/package*.json ./
RUN npm install 
COPY client/ .

EXPOSE 3000 
CMD ["npm","start"]