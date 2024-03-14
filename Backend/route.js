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
  getUserProjects,
  addProject,
  getApprovedTeams,
  getClientFeedback,
  getMoMs,
  getProjectUpdates,
  getResources,
  alterResources,
  alterApprovedTeams,
  alterClientFeedback,
  alterMoMs,
  alterProjectUpdates,
} = require("./Controller/Project.js");

const { addUser, getUsers } = require("./Controller/users.js");

const { generatePDF } = require("./Controller/genPDF.js"); // Importing function for generating PDF files
const { sendMail, sendInviteEmail } = require("./Controller/email.js"); // Importing function for sending emails

// Routes for handling project-related data

router.route("/projects").get(getUserProjects);
router.route("/addProject").post(addProject);
// Route for fetching or altering project details
router
  .route("/project/:id/project_details")
  .get(getProjectDetails) // GET request to fetch project details
  .post(alterProjectDetails); // POST request to alter project details

// Route for fetching or altering audit history
router
  .route("/project/:id/audit_history")
  .get(getAuditHistory) // GET request to fetch audit history
  .post(alterAuditHistory); // POST request to alter audit history

// Route for fetching or altering escalation matrix
router
  .route("/project/:id/escalation_matrix")
  .get(getEscalationMatrix) // GET request to fetch escalation matrix
  .post(alterEscalationMatrix); // POST request to alter escalation matrix

// Route for fetching or altering project phases
router
  .route("/project/:id/phases")
  .get(getPhases) // GET request to fetch project phases
  .post(alterPhases); // POST request to alter project phases

// Route for fetching or altering risk profiling data
router
  .route("/project/:id/risk_profiling")
  .get(getRiskProfiling) // GET request to fetch risk profiling data
  .post(alterRiskProfiling); // POST request to alter risk profiling data

// Route for fetching or altering sprint details
router
  .route("/project/:id/sprint_details")
  .get(getSprintDetails) // GET request to fetch sprint details
  .post(alterSprintDetails); // POST request to alter sprint details

// Route for fetching or altering stakeholders
router
  .route("/project/:id/stakeholders")
  .get(getStakeholders) // GET request to fetch stakeholders
  .post(alterStakeholders); // POST request to alter stakeholders

// Route for fetching or altering version history
router
  .route("/project/:id/version_history")
  .get(getVersionHistory) // GET request to fetch version history
  .post(alterVersionHistory); // POST request to alter version history

// Route for sending emails
router.route("/project/:id/sendEmail").post(sendMail);

// Route for generating PDF files
router.route("/project/:id/genPDF").get(generatePDF);

router.route("/addUser").post(addUser);
router.route("/getUsers").get(getUsers);

router.route("/sendEmail/invite").post(sendInviteEmail);

router
  .route("/project/:id/approved_teams")
  .get(getApprovedTeams) // GET request to fetch project details
  .post(alterApprovedTeams); // POST request to alter project details

router
  .route("/project/:id/resources")
  .get(getResources) // GET request to fetch project details
  .post(alterResources); // POST request to alter project details

router
  .route("/project/:id/client_feedback")
  .get(getClientFeedback) // GET request to fetch project details
  .post(alterClientFeedback); // POST request to alter project details

router
  .route("/project/:id/mom")
  .get(getMoMs) // GET request to fetch project details
  .post(alterMoMs); // POST request to alter project details

router
  .route("/project/:id/project_updates")
  .get(getProjectUpdates) // GET request to fetch project details
  .post(alterProjectUpdates); // POST request to alter project details

// Exporting the router module
module.exports = router;
