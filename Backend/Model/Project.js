const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  overview: {
    type: String,
  },
  budget: {
    type: Object,
  },
  timeline: {
    type: String,
  },
  stack: {
    type: Object,
  },
  scope: {
    type: String,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
