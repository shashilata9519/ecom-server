const Nodemailer = require("../utills/nodemailer");

const otpTemplate = (data) => {
  Nodemailer.sendEmail({
    to: data.to, // list of receivers
    subject: data.subject, // Subject line

    html: `<div> <h1>${data.otp} </h1> </div>`,
  });
};
module.exports = otpTemplate;
