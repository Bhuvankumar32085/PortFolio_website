import linkModel from "../models/linkModel.js";
import userModel from "../models/userModel.js";
import { receiveMessage } from "../nodemailer/email.js";

export const uploadLink = async (req, res) => {
  try {
    const user = await userModel.findOne({ isAdmin: true });
    const { github, linkedin, twitter, instagram, facebook } = req.body;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin user not found",
      });
    }

    const existingLinks = await linkModel.findOne({ userId: user._id });

    if (!existingLinks) {
      // Create new links
      const links = await linkModel.create({
        userId: user._id,
        github,
        linkedin,
        twitter,
        instagram,
        facebook,
      });
      return res.status(200).json({
        success: true,
        message: "Links created successfully",
        links,
      });
    } else {
      // Update existing links
      if (!github && !linkedin && !twitter && !instagram && !facebook) {
        return res.status(500).json({
          success: false,
          message: "At least one field is required to update ",
        });
      }

      const updatedLinks = await linkModel.findOneAndUpdate(
        { userId: user._id },
        {
          $set: {
            ...(github && { github }),
            ...(linkedin && { linkedin }),
            ...(twitter && { twitter }),
            ...(instagram && { instagram }),
            ...(facebook && { facebook }),
          },
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Links updated successfully",
        links: updatedLinks,
      });
    }
  } catch (error) {
    console.error("Upload Link Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getLinks = async (req, res) => {
  try {
    const user = await userModel.findOne({ isAdmin: true });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin user not found",
      });
    }

    const links = await linkModel.findOne({ userId: user._id });

    if (!links) {
      return res.status(404).json({
        success: false,
        message: "Links not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Links fetched successfully",
      links,
    });
  } catch (error) {
    console.error("Get Links Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const sendEmail = async (req, res) => {
  const { senderName, senderEmail, message } = req.body;
  
  try {
    await receiveMessage(senderName, senderEmail, message)
    return res.status(200).json({
      success:true,
      message:"Send Message Successfully"
    })
  } catch (error) {
    console.error("send message Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
