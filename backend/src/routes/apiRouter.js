import express from "express";

import appointmentRoute from "./appointmentRoute.js";
import voiceRoute from "./voiceRoute.js";

const router = express.Router();

router.use("/appointments", appointmentRoute);
router.use("/voice", voiceRoute);

export default router;
