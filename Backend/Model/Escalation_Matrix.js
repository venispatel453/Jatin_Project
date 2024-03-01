const mongoose = require("mongoose");

const Escalation_Matrix_Schema = new mongoose.Schema({
  project_id: {
    type: String,
    required: [true, "please provide project id"],
  },
  data: {
    type: Array,
    required: [true, "please provide data of escalation matrix"],
  },
});

module.exports = mongoose.model("Escalation_Matrix", Escalation_Matrix_Schema);
