const mongoose = require("mongoose");

const Risk_Profiling_Schema = new mongoose.Schema({
  project_id: {
    type: String,
    required: [true, "please provide project id"],
  },
  data: {
    type: Array,
    required: [true, "please provide data of risk Profiling"],
  },
});

module.exports = mongoose.model("Risk_Profiling", Risk_Profiling_Schema);
