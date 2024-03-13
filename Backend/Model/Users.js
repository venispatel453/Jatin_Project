const mongoose = require("mongoose");

const Users_Schema = new mongoose.Schema({
  project_id: {
    type: String,
  },
  _id: {
    type: "String",
  },

  name: {
    type: String,
    required: [true, "please provide title"],
  },
  email: {
    type: String,
  },

  role: {
    type: String,
    required: [true, "please provide name"],
  },
});

// Exporting the Stakeholders model, using the defined schema, as a Mongoose model named "Stakeholders"
module.exports = mongoose.model("Users", Users_Schema);
