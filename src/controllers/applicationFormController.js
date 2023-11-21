const transporter = require("../config/mailConfig");

exports.postApplicationForm = async (req, res) => {
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
      file,
    } = req.body;

    const mailData = {
      from: email,
      to: "careers@antixxtechhub.com",
      subject: `Application for ${application}`,
      html: `<p>Hello,</p> <p>You received a new application from <b>${name}</b> for the <b>${application} </b>position. </p><p ><b>Name :</b>${name}<br><b>Email :</b>${email}<br><b>Phone Number :</b> ${number}<br><b>Experience:</b> ${experience}<br><b>Skills:</b> ${skillSet}<br><b>Description:</b> ${description}<br> </p><p>Best wishes,<br>Team Antixx TechHub</p>`,
      attachments: [
        {
          filename: fileName,
          content: file,
          encoding: "base64",
        },
      ],
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
};
