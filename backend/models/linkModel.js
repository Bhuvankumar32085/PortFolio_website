import mongoose from "mongoose";

const linkModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    github: {
      type: String,
      default: "none",
    },
    linkedin: {
      type: String,
      default: "none",
    },
    twitter: {
      type: String,
      default: "none",
    },
    instagram: {
      type: String,
      default: "none",
    },
    facebook: {
      type: String,
      default: "none",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Link", linkModel);
