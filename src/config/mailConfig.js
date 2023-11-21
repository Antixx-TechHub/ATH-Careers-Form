
const nodemailer = require("nodemailer");

 const transporter = nodemailer.createTransport({
    port: 465,
    host: "mail.antixxtechhub.com",
    auth: {
      user: "careers@antixxtechhub.com",
      pass: "2]6!NK{lo3SJ",
    },
    secure: true,
    tls: { rejectUnauthorized: false },
    debug: true
});


module.exports = transporter;