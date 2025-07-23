import { generateWelcomeEmailHtml, htmlContent, receiveMessageHtml } from "./htmlEmial.js";
import transporter  from "./nodemailer.js";

const FROM_EMAIL = '"Bhuvan-Portfolio-App" <no-reply@pateleats.com>';

export const sendOtpOnEmail = async (email, otp) => {
  const html = htmlContent.replace("{verificationToken}", otp);

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: "Verify your email",
      html,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email verification");
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const html = generateWelcomeEmailHtml(name);

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: "Welcome to Bhuvan-Food-App",
      html,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send welcome email");
  }
};

export const receiveMessage = async (senderName, senderEmail, message) => {
  const html = receiveMessageHtml(message,senderName,senderEmail);

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: 'bhuvankumar66666@gmail.com',
      subject: "Welcome to Bhuvan-Food-App",
      html,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send welcome email");
  }
};