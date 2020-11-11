import nodemailer from 'nodemailer';

const EMAIL = {
  header: '"Fit me 🥇" <emai.fit.me@gmail.com>',
};

const sendEmail = async (from, to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    auth: {
      user: 'emai.fit.me@gmail.com',
      pass: '5835125C8A5ED5CACDD56C0E403D6800D2C6',
    },
  });

  return await transporter.sendMail({ from, to, subject, text });
};

export { sendEmail, EMAIL };
