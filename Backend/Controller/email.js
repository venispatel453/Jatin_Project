const nodemailer = require("nodemailer");
const stakeholders = require("../Model/Stakeholders");
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
    <br />
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
    <h4>Thanks and Regards,</h4>
    <h4>Promact Infotech Pvt Ltd</h4>

    </body>
    
    </html>
  
  `;
  console.log(email_template);
  return email_template;
};

const sendMail = async (req, res) => {
  try {
    console.log("here in send mail");
    //generateEmailTemplate("jatin", req.body);
    console.log(req.body);
    const response = await fetch("http:localhost:8000/project/stakeholders");
    const { data } = await response.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "no.reply.domain11@gmail.com",
        pass: "zdki kqhb kkzq uewu",
      },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
      data.map(async (stakeholder) => {
        const info = await transporter.sendMail({
          from: {
            name: "Project Update",
            address: "no.reply.domain11@gmail.com",
          }, // sender address
          to: `${stakeholder.contact}`, // list of receivers
          subject: "Audit History of Project has been Updated", // Subject line
          html: generateEmailTemplate(stakeholder.name, req.body), // html body
        });

        console.log("Message sent: %s", info.messageId);
      });
    }
    main().catch(console.error);
    res.json({ status: "success", msg: "Emails sent successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMail };
