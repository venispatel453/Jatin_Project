const nodemailer = require("nodemailer");
const stakeholders = require("../Model/Stakeholders");

const sendMail = (req, res) => {
  try {
    console.log("here");
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
      const info = await transporter.sendMail({
        from: {
          name: "Project Update",
          address: "no.reply.domain11@gmail.com",
        }, // sender address
        to: "jatinramchandani15@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMail };
