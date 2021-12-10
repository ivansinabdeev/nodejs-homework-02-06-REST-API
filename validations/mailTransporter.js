const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "ivansinabdeev@meta.ua",
    pass: META_PASSWORD,
  },
};

const mailTransporter = nodemailer.createTransport(nodemailerConfig);

const sendLetter = async (data) => {
  const email = { ...data, from: "ivansinabdeev@meta.ua" };
  await mailTransporter.sendMail(email);
  return true;
};

module.exports = sendLetter;
