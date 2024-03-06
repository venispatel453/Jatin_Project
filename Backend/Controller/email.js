const nodemailer = require("nodemailer");
const { formatColumnName } = require("../Utilities/utility.js");

const generateEmailTemplate = (stakeholder_name, audit_history) => {
  const invalid_column = ["project_id", "__v", "_id", "action"];
  let table_columns = Object.keys(audit_history[0]).filter(
    (column) => !invalid_column.includes(column)
  );

  let email_template = `
  <html>
    
    <body>
    
    <h2>Hello ${stakeholder_name},</h2>
    <p>
      Please note that audit has been completed and here are the updated audit records:
    </p>
    <br />
    <Table style="border-collapse: collapse; padding: 10px; border: 1px solid black">
    <tr style="border-collapse: collapse; padding: 10px; border: 1px solid black">
    ${table_columns
      .map((column) => {
        return `<th style="border-collapse: collapse; padding: 10px; border: 1px solid black">${formatColumnName(
          column
        )}</th>`;
      })
      .join("")}
    </tr>
    
    ${audit_history.map((row) => {
      return `
      <tr style="border-collapse: collapse; padding: 10px; border: 1px solid black">
      ${table_columns
        .map((column) => {
          return `<td style="border-collapse: collapse; padding: 10px; border: 1px solid black">${row[column]}</td>`;
        })
        .join("")}
      </tr>
      `;
    })}
    
    </Table>
    <br />
    <h3>Thanks and Regards,</h3>
    <h3>Promact Infotech Pvt Ltd</h3>

    </body>
    
    </html>
  
  `;

  return email_template;
};

const sendMail = async (req, res) => {
  try {
    const response = await fetch("http:localhost:8000/project/stakeholders");
    const { data } = await response.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "no.reply.domain11@gmail.com",
        pass: "zdki kqhb kkzq uewu",
      },
    });

    async function main() {
      data.map(async (stakeholder) => {
        const info = await transporter.sendMail({
          from: {
            name: "Project Update",
            address: "no.reply.domain11@gmail.com",
          },
          to: `${stakeholder.contact}`,
          subject: "Audit History of Project has been Updated",
          html: generateEmailTemplate(stakeholder.name, req.body),
        });
      });
    }
    main().catch(console.error);
    res.json({ status: "success", msg: "Emails sent successfully" });
  } catch (error) {
    res.json({ status: "error", msg: "Some Error Occurred" });
  }
};

module.exports = { sendMail };
