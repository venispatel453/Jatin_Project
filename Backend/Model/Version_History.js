// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Version_History collection
const Version_History_Schema = new mongoose.Schema({
  // Unique identifier for the version history record
  _id: {
    type: "String",
  },

  // Version number of the project
  version: {
    type: String,
    // Validation rule: Version number is required
    required: [true, "please provide version"],
  },
  // Type of version (e.g., major, minor)
  type: {
    type: String,
    // Validation rule: Type of version is required
    required: [true, "please provide type of version"],
  },
  // Description of the change made in this version
  change: {
    type: String,
    // Validation rule: Change description is required
    required: [true, "please provide change"],
  },
  // Reason for the change made in this version
  change_reason: {
    type: String,
    // Validation rule: Change reason is required
    required: [true, "please provide change reason"],
  },
  // User who created this version
  created_by: {
    type: String,
    // Validation rule: Creator information is required
    required: [true, "please provide created_by"],
  },
  // Date of revision for this version
  revision_date: {
    type: String,
    // Validation rule: Revision date is required
    required: [true, "please provide revision_date"],
  },
  // Date of approval for this version
  approval_date: {
    type: String,
    // Validation rule: Approval date is required
    required: [true, "please provide approval_date"],
  },
  // User who approved this version
  approved_by: {
    type: String,
    // Validation rule: Approver information is required
    required: [true, "please provide approved_by"],
  },
});

// Exporting the Version_History model, using the defined schema, as a Mongoose model named "Version_History"
module.exports = mongoose.model("Version_History", Version_History_Schema);
