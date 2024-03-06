const mongoose = require("mongoose");

const Risk_Profiling_Schema = new mongoose.Schema({
  _id: {
    type: "String",
  },
  project_id: {
    type: String,
    required: [true, "please provide project id"],
  },
  risk_type: {
    type: String,
    required: [true, "please provide risk type"],
  },
  description: {
    type: String,
    required: [true, "please provide description"],
  },
  severity: {
    type: String,
    required: [true, "please provide severity"],
  },
  impact: {
    type: String,
    required: [true, "please provide impact"],
  },
  remedial_steps: {
    type: String,
    required: [true, "please provide remedial steps"],
  },
  status: {
    type: String,
    required: [true, "please provide status"],
  },
  closure_date: {
    type: String,
    required: [true, "please provide closure date"],
  },
});

module.exports = mongoose.model("Risk_Profiling", Risk_Profiling_Schema);
