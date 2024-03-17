// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Project collection
const ProjectSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
    default: "",
  },
  associated_manager: {
    type: Object,
  },
  // Overview of the project
  overview: {
    type: String,
    default: "",
  },
  // Budget details of the project
  budget: {
    type: Object,
    default: { type: "", type_value: "" },
  },
  // Timeline information of the project
  timeline: {
    type: String,
    default: "",
  },
  // Technology stack used in the project
  stack: {
    type: Object,
    default: "",
  },
  // Scope of the project
  scope: {
    type: String,
    default: "",
  },
  start_date: {
    type: String,
  },
  status: {
    type: String,
    default: "On-going",
  },
});

// Exporting the Project model, using the defined schema, as a Mongoose model named "Project"
module.exports = mongoose.model("Project", ProjectSchema);
