FROM node AS Frontend
WORKDIR /usr/src/app/Frontend
COPY Frontend/package*.json ./
RUN npm install 
COPY Frontend/ .

EXPOSE 3000 
CMD ["npm","start"]
