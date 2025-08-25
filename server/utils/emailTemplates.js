// utils/emailTemplates.js
export const otpTemplate = (otp, name, type = "verification") => {
  let title =
    type === "reset" ? "Password Reset OTP" : "Account Verification OTP";
  let message =
    type === "reset"
      ? "Use the following OTP to reset your password."
      : "Use the following OTP to verify your account.";

  return `
  <div style="font-family: Arial, sans-serif; padding:20px; border:1px solid #eee; border-radius:10px;">
    <h2 style="color:#4CAF50;">${title}</h2>
    <p>Hi <b>${name || "User"}</b>,</p>
    <p>${message}</p>
    <h1 style="color:#333; letter-spacing:3px;">${otp}</h1>
    <p>This OTP will expire soon. Please do not share it with anyone.</p>
    <br/>
    <p>Best Regards,<br/><b>Banklytix  Team</b></p>
  </div>
  `;
};

export const welcomeTemplate = (name, email) => {
  return `
  <div style="font-family: Arial, sans-serif; padding:20px; border:1px solid #eee; border-radius:10px;">
    <h2 style="color:#4CAF50;">Welcome to Our Platform 🎉</h2>
    <p>Hi <b>${name}</b>,</p>
    <p>Your account has been created successfully with email: <b>${email}</b></p>
    <p>We’re glad to have you onboard.</p>
    <br/>
    <p>Best Regards,<br/><b>Banklytix Team</b></p>
  </div>
  `;
};
