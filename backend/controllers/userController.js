import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import otpModel from "../models/otpModel.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendOtpOnEmail, sendWelcomeEmail } from "../nodemailer/email.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //otp generation logic
    const otp = generateOtp();

    const otpExpiry = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    const user = await userModel.findOne({ email });
    if (user) {
      //if user exists, update the OTP help of email

      if (user.isVerified) {
        return res.json({ success: false, message: "You are already verify" });
      }

      await otpModel.findOneAndUpdate(
        { email },
        { $set: { otp, expiresAt: otpExpiry } }
      );

      //send OTP to user's email
      await sendOtpOnEmail(email, otp);
      // Generate JWT token
      const tempToken = await jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "2m",
      });

      // Set cookie with tempToken
      return res
        .cookie("tempToken", tempToken, {
          httpOnly: true,
          maxAge: 2 * 60 * 1000,
        })
        .json({ success: true, message: "OTP sent to your email" });
    } else {
      // If user does not exist, create a new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword,
      });

      // Create OTP record
      await otpModel.create({ email, otp, expiresAt: otpExpiry });

      // Generate OTP and send email
      await sendOtpOnEmail(email, otp);
      const tempToken = await jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "2m",
      });

      return res
        .cookie("tempToken", tempToken, {
          httpOnly: true,
          maxAge: 2 * 60 * 1000,
        })
        .json({ success: true, message: "User created and OTP sent to email" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const tempToken = req.cookies.tempToken;

    if (!tempToken || !otp) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
    const email = decoded.email;
    const otpRecord = await otpModel.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
    const user = await userModel.findOne({ email }).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // OTP is valid, create JWT token for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // delete tempToken cookie
    res.clearCookie("tempToken");

    // delete OTP record
    await otpModel.deleteOne({ email, otp });

    // Update user verification status
    user.isVerified = true;
    await user.save();

    await sendWelcomeEmail(email, user?.username);

    // Set token in cookie and respond
    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({ success: true, message: "OTP verified successfully", user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ success: false, message: "User not verified" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //find user without password
    const userWithotPassword = await userModel
      .findOne({ email })
      .select("-password");

    // Set token in cookie and respond
    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        success: true,
        message: "Login successful",
        user: userWithotPassword,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token");
    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAdminUser = async (req, res) => {
  try {
    const admin = await userModel
      .findOne({ isAdmin: true })
      .select("-password");
    if (!admin) {
      return res
        .status(500)
        .json({ success: false, message: "Admin Not Found" });
    }
    return res.json({
      success: true,
      message: "Get Admin successfully",
      admin,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { contactNumber, username } = req.body;

    if (!contactNumber && !username) {
      return res.status(400).json({
        success: false,
        message: "At least contactNumber or username is required",
      });
    }

    // Create dynamic update object
    const updateData = {};
    if (contactNumber) updateData.contactNumber = contactNumber;
    if (username) updateData.username = username;

    const admin = await userModel.findOneAndUpdate(
      { isAdmin: true },
      { $set: updateData },
      { new: true } // returns updated document
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin Not Found",
      });
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
      admin,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
