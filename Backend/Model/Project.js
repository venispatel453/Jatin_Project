const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  overview: {
    type: String,
    required: [true, "please provide Description of Project"],
  },
  budget: {
    type: Object,
    required: [true, "please give the budget information of project"],
  },
  timeline: {
    type: String,
    required: [true, "please give the timeline of project"],
  },
  stack: {
    type: String,
    required: [true, "please give project tech stack"],
  },
  scope: {
    type: String,
    required: [true, "please give project scope"],
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
