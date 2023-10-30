const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 5001;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://antixxtechhub.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json({
  limit: "50mb"
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.post('/send-email', async (req, res) => {
  try {
    const {
      email,
      name,
      number,
      experience,
      skillSet,
      description,
      application,
      fileName,
      file } = req.body;

    const mailData = {
      from: email,
      to: "careers@antixxtechhub.com",
      subject: `Application for ${application}`,
      html: `<p>Hello,</p> <p>You received a new application from <b>${name}</b> for the <b>${application} </b>position. </p><p ><b>Name :</b>${name}<br><b>Email :</b>${email}<br><b>Phone Number :</b> ${number}<br><b>Experience:</b> ${experience}<br><b>Skills:</b> ${skillSet}<br><b>Description:</b> ${description}<br> </p><p>Best wishes,<br>Team Antixx TechHub</p>`,
      attachments: [{
        filename: fileName,
        content: file,
        encoding: 'base64'
      }],
    };
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(info);
          res.status(200).json({ message: "Email sent", info });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/send-contact-email', async (req, res) => {
  try {
    const {
      name,
      email,
      phone_number,
      msg_subject,
       country,
      companyName,
      message } = req.body;

    const mailData = {
      from: email,
      to: "info@antixxtechhub.com",
      subject: `${msg_subject}`,
      html: `<p>Hello,</p> <p>You received a new application from <b>${name}</b> for the <b>${companyName} </b>position. </p>${msg_subject}<p ><b>Name :</b>${name}<br><b>Email :</b>${email}<br><b>Phone Number :</b> ${phone_number}<br><b>Country:</b> ${country}<br><b>Company Name:</b> ${companyName}<br><b>Message:</b> ${message}<br> </p><p>Best wishes,<br>Team Antixx TechHub</p>`,
    };
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(info);
          res.status(200).json({ message: "Email sent", info });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});