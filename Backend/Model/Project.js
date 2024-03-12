// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Project collection
const ProjectSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  associated_members: {
    type: Object,
  },
  // Overview of the project
  overview: {
    type: String,
  },
  // Budget details of the project
  budget: {
    type: Object,
  },
  // Timeline information of the project
  timeline: {
    type: String,
  },
  // Technology stack used in the project
  stack: {
    type: Object,
  },
  // Scope of the project
  scope: {
    type: String,
  },
  start_date: {
    type: String,
  },
  status: {
    type: String,
  },
});

// Exporting the Project model, using the defined schema, as a Mongoose model named "Project"
module.exports = mongoose.model("Project", ProjectSchema);
