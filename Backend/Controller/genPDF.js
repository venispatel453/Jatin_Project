const project = require("../Model/Project");
const audit_history = require("../Model/Audit_History");
const version_history = require("../Model/Version_History");
const sprint_details = require("../Model/Sprint_Details");
const stakeholders = require("../Model/Stakeholders");
const phases = require("../Model/Phases");
const escalation_matrix = require("../Model/Escalation_Matrix");
const risk_profiling = require("../Model/Risk_Profiling");
const { response } = require("express");
const { jsPDF } = require("jspdf");
require("jspdf-autotable");

const generatePDF = async (req, res) => {
  try {
    let routes = [
      "project/escalation_matrix",
      "project/version_history",
      "project/stakeholders",
      "project/sprint_details",
      "project/risk_profiling",
      "project/escalation_matrix",
      "project/audit_history",
    ];
    const doc = new jsPDF();
    routes.forEach(async (path) => {
      let response = await fetch(`http:localhost:8000/${path}`);
      let { data } = await response.json();
      let validColumns = ["_id", "__v", "project_id"];
      let objKeys = Object.keys(data[0]).filter(
        (column) => !validColumns.includes(column)
      );

      let objValues = [];

      data.map((record) => {
        let row = [];
        objKeys.map((col) => {
          row.push(record[col]);
        });
        objValues.push(row);
      });

      doc.autoTable({
        head: [objKeys],
        body: objValues,
      });

      doc.save("table.pdf");
      console.log("./table.pdf generated");
    });
    res.json({ msg: "generated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { generatePDF };
