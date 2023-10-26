
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
// const transporter = nodemailer.createTransport({
//   host: "mail.antixxtechhub.com",
//   port: 465,
//   secure: true,
//   auth: {
//     // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//     user: "careers@antixxtechhub.com",
//     pass: "2]6!NK{lo3SJ",
//   },
// });

// Send email function
// const sendEmailVa = (to, subject, text,attachments) => {
//   const mailOptions = {
//     from: 'careers@antixxtechhub.com',
//     to,
//     subject,
//     text,
//     attachments
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// };

// Example usage
app.get('/send-email', async(req, res) => {
  try {
    // const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "mail.antixxtechhub.com",
      auth: {
        user: "careers@antixxtechhub.com",
        pass: "2]6!NK{lo3SJ",
      },
      secure: true,
    });

    const mailData = {
      from: "careers@antixxtechhub.com",
      to: "shrimalavekar@gmail.com",
      subject: "Message From sfdsf",
      text: "sdfsdffsdfds",
    };
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(info);
          res.status(200).json({ message: "Email sent" ,info});
        }
      });
    });



  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
