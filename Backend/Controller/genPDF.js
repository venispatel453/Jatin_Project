const { jsPDF } = require("jspdf");
const path = require("path");
require("jspdf-autotable");

const doc = new jsPDF();

const formatColumnName = (column_name) => {
  let name_arr = column_name.split("_");
  name_arr = name_arr.map((name) => {
    return `${name[0].toUpperCase() + name.substring(1)}`;
  });
  return name_arr.join(" ");
};

const addProjectDetailsPage = async () => {
  let response = await fetch(`http:localhost:8000/project/project_details`);
  let { data } = await response.json();
  data = data[0];
  // console.log("response", response);
  // console.log("data ", data);
  const html = `
  Project Details

    Overview:
    ${data.overview}

    Budget:
    ${
      data.budget.type === "monthly"
        ? `Budget Type:${data.budget.type}
    Projected Hours:${data.budget.type_value}`
        : `Budget Type:${data.budget.type}
    Duration(in Months):${data.budget.type_value}`
    }

    Timeline:
    ${data.timeline}

    Stack:
    ${data.stack}

    Scope:
    ${data.scope}

  `;

  doc.text(html, 10, 10);
  doc.save("report.pdf");

  doc.addPage();
};

const generatePDF = async (req, res) => {
  try {
    addProjectDetailsPage();
    let routes = [
      "project/escalation_matrix",
      "project/version_history",
      "project/stakeholders",
      "project/sprint_details",
      "project/risk_profiling",
      "project/audit_history",
    ];

    routes.forEach(async (path) => {
      let response = await fetch(`http:localhost:8000/${path}`);
      let { data } = await response.json();
      let invalidColumns = ["_id", "__v", "project_id"];
      let objKeys = Object.keys(data[0]).filter(
        (column) => !invalidColumns.includes(column)
      );

      let objValues = [];

      data.map((record) => {
        let row = [];
        objKeys.map((col) => {
          row.push(record[col]);
        });
        objValues.push(row);
      });

      doc.text(`${formatColumnName(path.split("/")[1])} Table`, 10, 10);

      objKeys = objKeys.map((key) => {
        return formatColumnName(key);
      });

      doc.autoTable({
        head: [objKeys],
        body: objValues,
      });

      doc.save("report.pdf");
      doc.addPage();
      console.log("./report.pdf generated");
    });
    res.download(path.join(__dirname, "../", "report.pdf"));
  } catch (error) {
    console.log(error);
    res.json({ msg: "generated" });
  }
};

module.exports = { generatePDF };
