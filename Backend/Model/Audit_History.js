const mongoose = require("mongoose");

const Audit_History_Schema = new mongoose.Schema({
  _id: {
    type: "String",
  },
  project_id: {
    type: String,
    required: [true, "please provide project id"],
  },
  date_of_audit: {
    type: String,
    required: [true, "please provide date of audit"],
  },
  reviewed_by: {
    type: String,
    required: [true, "please provide date of audit"],
  },
  status: {
    type: String,
    required: [true, "please provide status"],
  },
  reviewed_section: {
    type: String,
    required: [true, "please provide reviewed section"],
  },
  comment: {
    type: String,
    required: [true, "please provide comment"],
  },
  action_item: {
    type: String,
    required: [true, "please provide action_item"],
  },
});

module.exports = mongoose.model("Audit_History", Audit_History_Schema);