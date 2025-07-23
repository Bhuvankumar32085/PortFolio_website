import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadFields = upload.fields([
  { name: "marksheet10th", maxCount: 1 },
  { name: "marksheet12th", maxCount: 1 },
  { name: "graduationMarksheet", maxCount: 1 },
  { name: "profilePicture", maxCount: 1 },
]);
