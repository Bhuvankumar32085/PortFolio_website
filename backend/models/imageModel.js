import mongoose from "mongoose";

const imageModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  marksheet10th: {
    url: { type: String, default: "none" },
    public_id: { type: String, default: "none" },
  },
  marksheet12th: {
    url: { type: String, default: "none" },
    public_id: { type: String, default: "none" },
  },
  graduationMarksheet: {
    url: { type: String, default: "none" },
    public_id: { type: String, default: "none" },
  },
  profilePicture: {
    url: { type: String, default: "none" },
    public_id: { type: String, default: "none" },
  },
}, { timestamps: true });

export default mongoose.model("Image", imageModel);
