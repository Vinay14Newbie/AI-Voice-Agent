import express from "express";
import {
  getAvailabilityController,
  bookController,
  cancelController,
  rescheduleController,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/availability", getAvailabilityController);
router.post("/book", bookController);
router.post("/cancel", cancelController);
router.post("/reschedule", rescheduleController);

export default router;
