const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_API_USERNAME,
      pass: process.env.SENDGRID_API_KEY
    }
  });
  // 2) Define the email options
  const mailOptions = {
    from: 'thesis@mail.io',
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  // 3) Actually send the email
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendEmail;
