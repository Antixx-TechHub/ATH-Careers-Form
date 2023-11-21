
const transporter = require("../config/mailConfig");

exports.postTrialDemoForm = async (req, res) => {
    try {
        const {
        name,
        email,
        phone_number,
        msg_subject,
        country,
        companyName,
        message,
        } = req.body;
    
        const mailData = {
        from: email,
        to: "contacts@antixxtechhub.com",
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }};