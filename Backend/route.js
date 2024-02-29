const express = require("express");
const router = express.Router();
const { getProjectDetails,getAuditHistory,getEscalationMatrix,getPhases,getRiskProfiling,getSprintDetails,getStakeholders,getVersionHistory } = require("./Controller/Project.js");

router.route("/project/project_details").get(getProjectDetails);
router.route("/project/audit_history").get(getAuditHistory);
router.route("/project/escalation_matrix").get(getEscalationMatrix);
router.route("/project/phases").get(getPhases);
router.route("/project/risk_profiling").get(getRiskProfiling);
router.route("/project/sprint_details").get(getSprintDetails);
router.route("/project/stakeholders").get(getStakeholders);
router.route("/project/version_history").get(getVersionHistory);

module.exports = router;
