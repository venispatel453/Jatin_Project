// Importing required modules
require("dotenv").config(); // dotenv module for loading environment variables from a .env file
const express = require("express"); // Express.js framework for building web applications
const cors = require("cors"); // CORS middleware for enabling Cross-Origin Resource Sharing
const app = express(); // Creating an instance of the Express application
const router = require("./route"); // Importing the router module defined in the route.js file
const connectDB = require("./DB/connect.js"); // Function for connecting to the database

// Middleware setup
app.use(
  cors({
    origin: process.env.APP_CLIENT_URL,
    credentials: true,
  })
); // Adding CORS middleware to enable cross-origin requests
app.use(express.json()); // Parsing incoming request bodies in JSON format
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded request bodies

// Mounting the router middleware
app.use(router); // Attaching the router middleware to the Express application

// Function to start the server
const startServer = async () => {
  // Establishing a connection to the MongoDB database
  await connectDB(process.env.APP_MONGO_URL); // Connecting to the MongoDB database using the provided connection URL from the environment variables
  console.log("db connected"); // Logging a message indicating successful database connection

  // Starting the Express server
  app.listen(8000, () => {
    // Listening on port 8000
    console.log("server started"); // Logging a message indicating that the server has started successfully
  });
};

// Calling the startServer function to start the server
startServer();
