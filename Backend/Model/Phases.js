const mongoose = require("mongoose");

const Phases_Schema = new mongoose.Schema({
  _id: {
    type: "String",
  },
  project_id: {
    type: String,
    required: [true, "please provide project id"],
  },
  title: {
    type: String,
    required: [true, "please provide title of phase"],
  },
  start_date: {
    type: String,
    required: [true, "please provide start date of phase"],
  },
  completion_date: {
    type: String,
    required: [true, "please provide completion date of phase"],
  },
  approval_date: {
    type: String,
    required: [true, "please provide approval date of phase"],
  },
  status: {
    type: String,
    required: [true, "please provide status of phase"],
  },
  revised_completion_date: {
    type: String,
    required: [true, "please provide revised completion date of phase"],
  },
  comments: {
    type: String,
    required: [true, "please provide comment"],
  },
});

module.exports = mongoose.model("Phases", Phases_Schema);