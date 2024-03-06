const mongoose = require("mongoose");

const Sprint_Details_Schema = new mongoose.Schema({
  _id: {
    type: "String",
  },
  project_id: {
    type: String,
    required: [true, "please provide project id"],
  },
  sprint: {
    type: String,
    required: [true, "please provide sprint"],
  },
  start_date: {
    type: String,
    required: [true, "please provide start_date"],
  },
  end_date: {
    type: String,
    required: [true, "please provide end_date"],
  },
  status: {
    type: String,
    required: [true, "please provide status"],
  },
  comments: {
    type: String,
    required: [true, "please provide comments"],
  },
});

module.exports = mongoose.model("Sprint_Details", Sprint_Details_Schema);