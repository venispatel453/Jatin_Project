// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Stakeholders collection
const Stakeholders_Schema = new mongoose.Schema({
  // Unique identifier for the stakeholder record
  project_id: {
    type: String,
  },
  _id: {
    type: "String",
  },
  // Name of the stakeholder
  name: {
    type: String,
    // Validation rule: Name is required
    required: [true, "please provide name"],
  },
  // Contact information of the stakeholder
  email: {
    type: String,
    // Validation rule: Contact information is required
    required: [true, "please provide contact"],
  },
});

// Exporting the Stakeholders model, using the defined schema, as a Mongoose model named "Stakeholders"
module.exports = mongoose.model("Stakeholders", Stakeholders_Schema);
