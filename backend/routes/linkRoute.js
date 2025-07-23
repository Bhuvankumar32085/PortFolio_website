import express from "express";
import { verifyUser } from "../middleware.js/verifyUser.js";
import { getLinks, sendEmail, uploadLink } from "../controllers/linkController.js";

const router = express.Router();

router.post("/upload-link", verifyUser,uploadLink);
router.get("/get-link",getLinks);
router.post("/sendEmail", verifyUser,sendEmail);

export default router;
