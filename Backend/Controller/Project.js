const project = require("../Model/Project");
const audit_history = require("../Model/Audit_History");
const version_history = require("../Model/Version_History");
const sprint_details = require("../Model/Sprint_Details");
const stakeholders = require("../Model/Stakeholders");
const phases = require("../Model/Phases");
const escalation_matrix = require("../Model/Escalation_Matrix");
const risk_profiling = require("../Model/Risk_Profiling");

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

const alterProjectDetails = async (req, res) => {
  try {
    console.log("here");
    const response = await project.create({
      overview: "this is view",
      stack: "stack",
      scope: "scope",
      budget: { key: "vlaue" },
      timeline: "ss",
    });
    console.log("after response");
    console.log(response);
    res.json({ msg: "alter project details" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "some error" });
  }
};

const alterVersionHistory = async (req, res) => {
  res.json({ msg: "get version history" });
};

const alterAuditHistory = async (req, res) => {
  res.json({ msg: "get audit history" });
};

const alterStakeholders = async (req, res) => {
  res.json({ msg: "get stakeholders" });
};

const alterEscalationMatrix = async (req, res) => {
  res.json({ msg: "get escalation matrix" });
};

const alterRiskProfiling = async (req, res) => {
  res.json({ msg: "get risk profiling" });
};

const alterPhases = async (req, res) => {
  res.json({ msg: "get phases" });
};

const alterSprintDetails = async (req, res) => {
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
  alterProjectDetails,
  alterVersionHistory,
  alterAuditHistory,
  alterSprintDetails,
  alterPhases,
  alterRiskProfiling,
  alterEscalationMatrix,
  alterStakeholders,
};
