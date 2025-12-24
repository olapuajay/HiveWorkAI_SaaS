import express from "express";
import {
  clockIn,
  clockOut,
  getMyAttendance,
  getCompanyAttendance,
} from "../controllers/attendanceController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";

const router = express.Router();

router.use(authMiddleware, tenantMiddleware);

router.post("/clock-in", roleMiddleware("EMPLOYEE"), clockIn);
router.post("/clock-out", roleMiddleware("EMPLOYEE"), clockOut);
router.get("/me", roleMiddleware("EMPLOYEE"), getMyAttendance);

router.get("/", roleMiddleware("HR", "ADMIN"), getCompanyAttendance);

export default router;
