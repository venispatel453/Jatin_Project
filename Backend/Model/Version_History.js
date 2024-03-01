const mongoose = require("mongoose");

const Version_History_Schema = new mongoose.Schema({
  project_id: {
    type: String,
    required: [true, "please provide project id"],
  },
  data: {
    type: Array,
    required: [true, "please provide data of version history"],
  },
});

module.exports = mongoose.model("Version_History", Version_History_Schema);
