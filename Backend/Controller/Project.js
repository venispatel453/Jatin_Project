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
  try {
    const default_version_history = [
      {
        project_id: "",
        version: "",
        type: "",
        change: "",
        change_reason: "",
        created_by: "",
        revision_date: "",
        approval_date: "",
        approved_by: "",
      },
    ];

    let data = await version_history.find();

    if (data.length === 0) {
      data = default_version_history;
    }
    console.log(data);
    res.json({ status: "success", data: data });
  } catch (error) {
    res.json({ status: "error", msg: error });
  }
};

const getAuditHistory = async (req, res) => {
  try {
    const default_audit_history = [
      {
        project_id: "",
        date_of_audit: "",
        reviewed_by: "",
        status: "",
        reviewed_section: "",
        comment: "",
        action_item: "",
      },
    ];

    let data = await audit_history.find();
    if (data.length == 0) {
      data = default_audit_history;
    }
    console.log(data);
    res.json({ status: "success", data: data });
  } catch (error) {
    res.json({ status: "error", msg: error });
  }
};

const getStakeholders = async (req, res) => {
  try {
    const default_stakeholders = [
      {
        project_id: "",
        title: "",
        name: "",
        contact: "",
      },
    ];

    let data = await stakeholders.find();

    if (data.length == 0) {
      data = default_stakeholders;
    }

    res.json({ status: "success", data: data });
  } catch (error) {
    res.json({ status: "error", msg: error });
  }
};

const getEscalationMatrix = async (req, res) => {
  try {
    const default_escalation_matrix = [
      {
        project_id: "",
        level: "",
        escalation_type: "",
        member: "",
        designation: "",
      },
    ];
    //console.log("in get escalation matrix");
    let data = await escalation_matrix.find();

    if (data.length == 0) {
      data = default_escalation_matrix;
    }
    res.json({ status: "success", data: data });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", msg: error });
  }
};

const getRiskProfiling = async (req, res) => {
  try {
    const default_risk_profiling = [
      {
        project_id: "",
        risk_type: "",
        description: "",
        severity: "",
        impact: "",
        remedial_steps: "",
        status: "",
        closure_date: "",
      },
    ];

    let data = await risk_profiling.find();

    if (data.length == 0) {
      data = default_risk_profiling;
    }
    res.json({ status: "success", data: data });
  } catch (error) {
    res.json({ status: "error", msg: error });
  }
};

const getPhases = async (req, res) => {
  try {
    const defaultPhase = [
      {
        project_id: "",
        title: "",
        start_date: "",
        completion_date: "",
        approval_date: "",
        status: "",
        revised_completion_date: "",
        comments: "",
      },
    ];
    console.log("here");
    let data = await phases.find();
    console.log(data);

    if (data.length == 0) {
      data = defaultPhase;
    }
    res.json({ status: "success", data: data });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", msg: error });
  }
};

const getSprintDetails = async (req, res) => {
  try {
    const default_sprint_details = [
      {
        project_id: "",
        sprint: "",
        start_date: "",
        end_date: "",
        status: "",
        comments: "",
      },
    ];
    let data = await sprint_details.find();

    if (data.length == 0) {
      data = default_sprint_details;
    }

    res.json({ status: "success", data: data });
  } catch (error) {
    res.json({ status: "error", msg: error });
  }
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
  try {
    console.log("here", req.body);
    const arr = req.body;
    const operations = arr.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id },
        update: { $set: obj },
        upsert: true,
      },
    }));
    const result = await version_history.bulkWrite(operations);
    console.log(result);
    res.json({ status: "success", msg: "Data updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", msg: error });
  }
};

const alterAuditHistory = async (req, res) => {
  try {
    console.log("here", req.body);
    const arr = req.body;
    const operations = arr.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id },
        update: { $set: obj },
        upsert: true,
      },
    }));
    const result = await audit_history.bulkWrite(operations);
    console.log(result);
    res.json({ status: "success", msg: "Data updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", msg: error });
  }
};

const alterStakeholders = async (req, res) => {
  try {
    console.log("here", req.body);
    const arr = req.body;
    const operations = arr.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id },
        update: { $set: obj },
        upsert: true,
      },
    }));
    const result = await stakeholders.bulkWrite(operations);
    console.log(result);
    res.json({ status: "success", msg: "Data updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", msg: error });
  }
};

const alterEscalationMatrix = async (req, res) => {
  try {
    console.log("here", req.body);
    const arr = req.body;
    const operations = arr.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id },
        update: { $set: obj },
        upsert: true,
      },
    }));
    const result = await escalation_matrix.bulkWrite(operations);
    console.log(result);
    res.json({ status: "success", msg: "Data updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", msg: error });
  }
};

const alterRiskProfiling = async (req, res) => {
  try {
    console.log("here", req.body);
    const arr = req.body;
    const operations = arr.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id },
        update: { $set: obj },
        upsert: true,
      },
    }));
    const result = await risk_profiling.bulkWrite(operations);
    console.log(result);
    res.json({ status: "success", msg: "Data updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", msg: error });
  }
};

const alterPhases = async (req, res) => {
  try {
    console.log("here", req.body);
    const arr = req.body;
    const operations = arr.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id },
        update: { $set: obj },
        upsert: true,
      },
    }));
    const result = await phases.bulkWrite(operations);
    console.log(result);
    res.json({ status: "success", msg: "Data updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", msg: error });
  }
};

const alterSprintDetails = async (req, res) => {
  try {
    console.log("here", req.body);
    const arr = req.body;
    const operations = arr.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id },
        update: { $set: obj },
        upsert: true,
      },
    }));
    const result = await sprint_details.bulkWrite(operations);
    console.log(result);
    res.json({ status: "success", msg: "Data updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", msg: error });
  }
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
