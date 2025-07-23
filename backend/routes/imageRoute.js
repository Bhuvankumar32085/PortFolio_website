import express from "express";
import { uploadFields } from "../services/multer.js";
import { verifyUser } from "../middleware.js/verifyUser.js";
import { getImage, uploadImages } from "../controllers/imageController.js";
const router = express.Router();

router.post("/upload-images", verifyUser, uploadFields, uploadImages);
router.get("/get-images", getImage);

export default router;

// req.userId={ id: '687bec52b26f08b35bdbdb86', iat: 1752990499, exp: 1753076899 }