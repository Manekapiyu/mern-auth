import transporter from "../config/nodemailer.js";
import { otpTemplate, welcomeTemplate } from "./emailTemplates.js";

export const sendOtpEmail = async (type, email, otp, name = "User") => {
  let subject, html;

  if (type === "welcome") {
    subject = "Welcome to Our Platform 🎉";
    html = welcomeTemplate(name, email);
  } else {
    subject =
      type === "reset" ? "Password Reset OTP" : "Account Verification OTP";
    html = otpTemplate(otp, name, type);
  }

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
