const mongoose = require("mongoose");

const Escalation_Matrix_Schema = new mongoose.Schema({
  _id: {
    type: "String",
  },
  project_id: {
    type: String,
    required: [true, "please provide project id"],
  },
  level: {
    type: String,
    required: [true, "please provide level"],
  },
  escalation_type: {
    type: String,
    required: [true, "please provide escalation type"],
  },
  member: {
    type: String,
    required: [true, "please provide selected member"],
  },
  designation: {
    type: String,
    required: [true, "please provide available members"],
  },
});

module.exports = mongoose.model("Escalation_Matrix", Escalation_Matrix_Schema);

// const default_escalation_matrix={
//   project_id:"",
//   level:"",
//   escalation_type:"",
//   member:"",
//   designation:""
// }
