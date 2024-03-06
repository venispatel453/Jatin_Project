// Importing the mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Function to establish connection with the MongoDB database
const connectDB = (url) => {
  // Returns a promise that connects to the provided MongoDB URL
  return mongoose.connect(url);
};

// Exporting the connectDB function to be used elsewhere in the application
module.exports = connectDB;
