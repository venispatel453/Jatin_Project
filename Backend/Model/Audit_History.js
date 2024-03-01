const mongoose = require("mongoose");

const Audit_History_Schema = new mongoose.Schema({
  project_id: {
    type: String,
    required: [true, "please provide project id"],
  },
  data: {
    type: Object,
    required: [true, "please provide data of audit"],
  },
});

module.exports = mongoose.model("Audit_History", Audit_History_Schema);
