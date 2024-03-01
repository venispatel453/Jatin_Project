const mongoose = require("mongoose");

const Phases_Schema = new mongoose.Schema({
  project_id: {
    type: String,
    required: [true, "please provide project id"],
  },
  data: {
    type: Array,
    required: [true, "please provide data of phases"],
  },
});

module.exports = mongoose.model("Phases", Phases_Schema);
