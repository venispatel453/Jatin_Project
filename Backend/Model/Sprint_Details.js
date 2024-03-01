const mongoose = require("mongoose");

const Sprint_Details_Schema = new mongoose.Schema({
  project_id: {
    type: String,
    required: [true, "please provide project id"],
  },
  data: {
    type: Array,
    required: [true, "please provide data of sprint details"],
  },
});

module.exports = mongoose.model("Sprint_Details", Sprint_Details_Schema);
