const getProjectDetails = async (req, res) => {
  res.json({ msg: "get project details" });
};

const getVersionHistory = async (req, res) => {
  res.json({ msg: "get version history" });
};

const getAuditHistory = async (req, res) => {
  res.json({ msg: "get audit history" });
};

const getStakeholders = async (req, res) => {
  res.json({ msg: "get stakeholders" });
};

const getEscalationMatrix = async (req, res) => {
  res.json({ msg: "get escalation matrix" });
};

const getRiskProfiling = async (req, res) => {
  res.json({ msg: "get risk profiling" });
};

const getPhases = async (req, res) => {
  res.json({ msg: "get phases" });
};

const getSprintDetails = async (req, res) => {
  res.json({ msg: "get sprint details" });
};

module.exports = {
  getProjectDetails,
  getVersionHistory,
  getAuditHistory,
  getSprintDetails,
  getPhases,
  getRiskProfiling,
  getEscalationMatrix,
  getStakeholders,
};
