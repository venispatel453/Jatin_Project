// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Stakeholders collection
const Stakeholders_Schema = new mongoose.Schema({
  // Unique identifier for the stakeholder record
  _id: {
    type: "String",
  },
  // Title or role of the stakeholder
  title: {
    type: String,
    // Validation rule: Title is required
    required: [true, "please provide title"],
  },
  // Name of the stakeholder
  name: {
    type: String,
    // Validation rule: Name is required
    required: [true, "please provide name"],
  },
  // Contact information of the stakeholder
  contact: {
    type: String,
    // Validation rule: Contact information is required
    required: [true, "please provide contact"],
  },
});

// Exporting the Stakeholders model, using the defined schema, as a Mongoose model named "Stakeholders"
module.exports = mongoose.model("Stakeholders", Stakeholders_Schema);
