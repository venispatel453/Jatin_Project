const { jsPDF } = require("jspdf");
const path = require("path");
const fs = require("fs");
require("jspdf-autotable");
const { formatColumnName } = require("../Utilities/utility.js");

const addProjectDetailsPage = async (filename, doc) => {
  try {
    let response = await fetch(`http:localhost:8000/project/project_details`);
    let { data } = await response.json();
    data = data[0];

    const html = `
      Project Details
      Overview:
      ${data.overview}
      Budget:
      ${
        data.budget.type === "monthly"
          ? `Budget Type: ${data.budget.type}
      Projected Hours: ${data.budget.type_value}`
          : `Budget Type: ${data.budget.type}
      Duration(in Months): ${data.budget.type_value}`
      }
      Timeline:
      ${data.timeline}
      Stack:
      ${data.stack.label}
      Scope:
      ${data.scope}
    `;

    doc.text(html, 10, 10);
    doc.addPage();
  } catch (error) {
    throw error;
  }
};

const addProjectTablesPage = async (filename, doc) => {
  try {
    let routes = [
      "project/escalation_matrix",
      "project/version_history",
      "project/stakeholders",
      "project/sprint_details",
      "project/risk_profiling",
      "project/audit_history",
    ];

    for (const route of routes) {
      let response = await fetch(`http:localhost:8000/${route}`);
      let { data } = await response.json();
      let invalidColumns = ["_id", "__v", "project_id"];
      let objKeys = Object.keys(data[0]).filter(
        (column) => !invalidColumns.includes(column)
      );
      let objValues = [];

      data.forEach((record) => {
        let row = [];
        objKeys.forEach((col) => {
          row.push(record[col]);
        });
        objValues.push(row);
      });

      doc.text(`${formatColumnName(route.split("/")[1])} Table`, 10, 10);
      objKeys = objKeys.map((key) => formatColumnName(key));

      await doc.autoTable({
        head: [objKeys],
        body: objValues,
      });

      doc.addPage();
    }
  } catch (error) {
    throw error;
  }
};

const generatePDF = async (req, res) => {
  try {
    let filename = Date.now();
    const doc = new jsPDF();
    await addProjectDetailsPage(filename, doc);
    await addProjectTablesPage(filename, doc);

    const filePath = path.join(__dirname, "../", `${filename}.pdf`);
    doc.save(filePath);

    return res.download(filePath, `${filename}.pdf`, () => {
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    res.json({ status: "error", msg: error });
  }
};

module.exports = { generatePDF };
