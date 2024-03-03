const mongoose = require("mongoose");

const Version_History_Schema = new mongoose.Schema({
  _id: {
    type: "String",
  },
  project_id: {
    type: String,
    required: [true, "please provide project id"],
  },
  version: {
    type: String,
    required: [true, "please provide version"],
  },
  type: {
    type: String,
    required: [true, "please provide type of version"],
  },
  change: {
    type: String,
    required: [true, "please provide change"],
  },
  change_reason: {
    type: String,
    required: [true, "please provide change reason"],
  },
  created_by: {
    type: String,
    required: [true, "please provide created_by"],
  },
  revision_date: {
    type: String,
    required: [true, "please provide revision_date"],
  },
  approval_date: {
    type: String,
    required: [true, "please provide approval_date"],
  },
  approved_by: {
    type: String,
    required: [true, "please provide approved_by"],
  },
});

module.exports = mongoose.model("Version_History", Version_History_Schema);

// const default_version_history = {
//   project_id: "",
//   version: "",
//   type: "",
//   change: "",
//   change_reason: "",
//   created_by: "",
//   revision_date: "",
//   approval_date: "",
//   approved_by: "",
// };
