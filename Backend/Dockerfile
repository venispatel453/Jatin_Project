FROM node AS Backend
WORKDIR /usr/src/app/Backend
COPY Backend/package*.json ./
RUN npm install
COPY Backend/ .
EXPOSE 8000
CMD ["node", "server.js"]
