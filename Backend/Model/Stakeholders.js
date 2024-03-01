const mongoose = require("mongoose");

const Stakeholders_Schema = new mongoose.Schema({
  project_id: {
    type: String,
    required: [true, "please provide project id"],
  },
  stakeholders: {
    type: Array,
    required: [true, "please provide stakeholders"],
  },
});

module.exports = mongoose.model("Stakeholders", Stakeholders_Schema);
