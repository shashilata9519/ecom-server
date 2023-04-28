const nodemailer = require("nodemailer");

class Nodemailer {
  static async testAccount() {
    return await nodemailer.createTestAccount();
  }
  static initialize() {
    console.log(Nodemailer.testAccount(), "initializer");
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "shashilata057@gmail.com", // generated ethereal user
        pass: "ilsksieioeqexubt", // generated ethereal password
      },
    });
  }
  static sendEmail({ to, subject, html }) {
    console.log(Nodemailer.initialize(), "send email");
    return Nodemailer.initialize().sendMail({
      from: "shashilata057@gmail.com", // sender address
      to: to, // list of receivers
      subject: subject, // Subject line

      html: html, // html body
    });
  }
}
module.exports = Nodemailer;
