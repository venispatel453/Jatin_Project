const mongoose = require("mongoose");

const Stakeholders_Schema = new mongoose.Schema({
  _id: {
    type: "String",
  },
  project_id: {
    type: String,
    required: [true, "please provide project id"],
  },
  title: {
    type: String,
    required: [true, "please provide title"],
  },
  name: {
    type: String,
    required: [true, "please provide name"],
  },
  contact: {
    type: String,
    required: [true, "please provide contact"],
  },
});

module.exports = mongoose.model("Stakeholders", Stakeholders_Schema);


// const default_stakeholders={
//   project_id:"",
//   title:"",
//   name:"",
//   contact:""
// }