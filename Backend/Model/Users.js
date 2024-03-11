// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Stakeholders collection
const Users_Schema = new mongoose.Schema({
  // Unique identifier for the stakeholder record
  _id: {
    type: "String",
  },
  // Title or role of the stakeholder
  name: {
    type: String,
    // Validation rule: Title is required
    required: [true, "please provide title"],
  },
  // Name of the stakeholder
  designation: {
    type: String,
    // Validation rule: Name is required
    required: [true, "please provide name"],
  },
});

// Exporting the Stakeholders model, using the defined schema, as a Mongoose model named "Stakeholders"
module.exports = mongoose.model("Users", Users_Schema);
