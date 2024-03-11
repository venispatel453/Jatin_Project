// Importing required modules and controllers
const express = require("express");
const router = express.Router();
const {
  // Importing controller functions for handling project data
  getProjectDetails,
  getAuditHistory,
  getEscalationMatrix,
  getPhases,
  getRiskProfiling,
  getSprintDetails,
  getStakeholders,
  getVersionHistory,
  alterProjectDetails,
  alterEscalationMatrix,
  alterAuditHistory,
  alterPhases,
  alterRiskProfiling,
  alterSprintDetails,
  alterStakeholders,
  alterVersionHistory,
  getAllProjects,
} = require("./Controller/Project.js");

const { generatePDF } = require("./Controller/genPDF.js"); // Importing function for generating PDF files
const { sendMail } = require("./Controller/email.js"); // Importing function for sending emails

// Routes for handling project-related data

router.route("/projects").get(getAllProjects);

// Route for fetching or altering project details
router
  .route("/project/project_details")
  .get(getProjectDetails) // GET request to fetch project details
  .post(alterProjectDetails); // POST request to alter project details

// Route for fetching or altering audit history
router
  .route("/project/audit_history")
  .get(getAuditHistory) // GET request to fetch audit history
  .post(alterAuditHistory); // POST request to alter audit history

// Route for fetching or altering escalation matrix
router
  .route("/project/escalation_matrix")
  .get(getEscalationMatrix) // GET request to fetch escalation matrix
  .post(alterEscalationMatrix); // POST request to alter escalation matrix

// Route for fetching or altering project phases
router
  .route("/project/phases")
  .get(getPhases) // GET request to fetch project phases
  .post(alterPhases); // POST request to alter project phases

// Route for fetching or altering risk profiling data
router
  .route("/project/risk_profiling")
  .get(getRiskProfiling) // GET request to fetch risk profiling data
  .post(alterRiskProfiling); // POST request to alter risk profiling data

// Route for fetching or altering sprint details
router
  .route("/project/sprint_details")
  .get(getSprintDetails) // GET request to fetch sprint details
  .post(alterSprintDetails); // POST request to alter sprint details

// Route for fetching or altering stakeholders
router
  .route("/project/stakeholders")
  .get(getStakeholders) // GET request to fetch stakeholders
  .post(alterStakeholders); // POST request to alter stakeholders

// Route for fetching or altering version history
router
  .route("/project/version_history")
  .get(getVersionHistory) // GET request to fetch version history
  .post(alterVersionHistory); // POST request to alter version history

// Route for sending emails
router.route("/project/sendEmail").post(sendMail);

// Route for generating PDF files
router.route("/project/genPDF").get(generatePDF);

// Exporting the router module
module.exports = router;
