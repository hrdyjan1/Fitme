import nodemailer from 'nodemailer';

const EMAIL = {
  header: '"Fit me 🥇" <email.fit.me@gmail.com>',
};

const sendEmail = async (from, to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    auth: {
      user: 'email.fit.me@gmail.com',
      pass: process.env.EMAIL_SERVER_PASS,
    },
  });

  return await transporter.sendMail({ from, to, subject, text });
};

export { sendEmail, EMAIL };
