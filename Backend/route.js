const express = require("express");
const router = express.Router();
const {
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
} = require("./Controller/Project.js");

const { generatePDF } = require("./Controller/genPDF.js");
const { sendMail } = require("./Controller/email.js");

router
  .route("/project/project_details")
  .get(getProjectDetails)
  .post(alterProjectDetails);

router
  .route("/project/audit_history")
  .get(getAuditHistory)
  .post(alterAuditHistory);

router
  .route("/project/escalation_matrix")
  .get(getEscalationMatrix)
  .post(alterEscalationMatrix);

router.route("/project/phases").get(getPhases).post(alterPhases);
router
  .route("/project/risk_profiling")
  .get(getRiskProfiling)
  .post(alterRiskProfiling);
router
  .route("/project/sprint_details")
  .get(getSprintDetails)
  .post(alterSprintDetails);
router
  .route("/project/stakeholders")
  .get(getStakeholders)
  .post(alterStakeholders);
router
  .route("/project/version_history")
  .get(getVersionHistory)
  .post(alterVersionHistory);

router.route("/project/sendEmail").post(sendMail);

router.route("/project/genPDF").get(generatePDF);

module.exports = router;
