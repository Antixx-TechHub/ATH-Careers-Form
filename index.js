
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const port =process.env.PORT || 5001;

const corsOptions ={
  origin:['https://d1jyjc4ib07tgv.cloudfront.net','http://d1jyjc4ib07tgv.cloudfront.net'], 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: "mail.antixxtechhub.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "careers@antixxtechhub.com",
    pass: "2]6!NK{lo3SJ",
  },
});

// Send email function
const sendEmailVa = (to, subject, text,attachments) => {
  const mailOptions = {
    from: 'careers@antixxtechhub.com',
    to,
    subject,
    text,
    attachments
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// Example usage
app.get('/send-email', (req, res) => {
  const to = 'shrimalavekar@gmail.com';
  const subject = 'Test email';
  const text = 'This is a test email sent using nodemailer and sendgrid';
const attachments = [{   // utf-8 string as an attachment
  name: "Demo.pdf",
  lastModified: 1698039160185,
  lastModifiedDate:" Mon Oct 23 2023 11:02:40 GMT+0530 (India Standard Time)",
  webkitRelativePath: "",
  size: 4024175,
  type: "application/pdf",
},]
  sendEmailVa(to, subject, text,attachments);

  res.send('Email sent successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
