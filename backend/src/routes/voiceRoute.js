import express from "express";
import multer from "multer";
import { voiceAssistantController } from "../controllers/voiceController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("audio"), voiceAssistantController);

export default router;
