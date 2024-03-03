require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./route");
const connectDB = require("./DB/connect.js");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const startServer = async () => {
  await connectDB(process.env.APP_MONGO_URL);
  console.log("db connected");
  app.listen(8000, () => {
    console.log("server started");
  });
};

startServer();
