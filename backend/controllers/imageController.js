import imageModel from "../models/imageModel.js";
import userModel from "../models/userModel.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../services/cloudinary.js";

export const uploadImages = async (req, res) => {
  const userId = req.userId.id;
  const files = req.files;

  if (Object.keys(files).length == 0) {
    return res
      .status(500)
      .json({ success: false, message: "image are require" });
  }

  try {
    const existing = await imageModel.findOne({ userId });
    const fields = [
      "marksheet10th",
      "marksheet12th",
      "graduationMarksheet",
      "profilePicture",
    ];
    const newData = {};

    for (let field of fields) {
      if (files[field]) {
        const file = files[field][0];

        // Delete old photo from Cloudinary if exists
        if (
          existing &&
          existing[field]?.public_id &&
          existing[field].public_id !== "none"
        ) {
          await deleteFromCloudinary(existing[field].public_id);
        }

        // Upload new photo
        const uploaded = await uploadToCloudinary(file, "portfolio-images");

        newData[field] = {
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        };
      }
    }

    if (existing) {
      await imageModel.findOneAndUpdate(
        { userId },
        { $set: newData },
        { new: true }
      );
    } else {
      await imageModel.create({ userId, ...newData });
    }

    return res
      .status(200)
      .json({ success: true, message: "Images uploaded and updated!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getImage = async (req, res) => {
  try {
    const user = await userModel.findOne({isAdmin:true});
    const image=await imageModel.findOne({userId:user._id})
    return res.status(200).json({
      success: true,
      message: "image Get Successfully",
      image
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      success: false,
      message: "image Not Found",
    });
  }
};
