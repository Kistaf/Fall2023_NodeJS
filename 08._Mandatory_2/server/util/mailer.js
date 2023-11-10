import nodemailer from "nodemailer";

const createTransporter = async () => {
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

async function sendWelcomeMail({ email, subject, text }) {
  const transporter = await createTransporter();
  const info = await transporter.sendMail({
    from: `Mandatory 2 <example@email.com>`,
    to: email,
    subject: subject,
    text: text,
  });
  console.log(`Email sent, preview: ${nodemailer.getTestMessageUrl(info)}`);
}

export default sendWelcomeMail;
