const nodemailer = require("nodemailer");
const stakeholders = require("../Model/Stakeholders");

const sendMail = async (req, res) => {
  try {
    console.log("here");
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
          html: "<b>Hello world?</b>", // html body
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
