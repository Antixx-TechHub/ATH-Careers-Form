
const nodemailer = require("nodemailer");

 const transporter = nodemailer.createTransport({
    port: 465,
    host: "mail.antixxtechhub.com",
    auth: {
      user: "careers@antixxtechhub.com",
      pass: "j_1vQBEg-{xF",
    },
    secure: true,
    tls: { rejectUnauthorized: false },
    debug: true
});


module.exports = transporter;