const Nodemailer = require("../utills/nodemailer");

const emailTemplate = (data) => {
  Nodemailer.sendEmail({
    to: data.to, // list of receivers
    subject: data.subject, // Subject line

    html: `<div> <h1>${data.email} </h1> </div>`,
  });
};
module.exports = emailTemplate;
