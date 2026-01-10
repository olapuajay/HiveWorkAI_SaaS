import express from "express";
import { aiAttendanceSummary, aiPayslipExplanation, aiPerformanceInsights } from "../controllers/aiController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";

const router = express.Router();

router.use(authMiddleware, tenantMiddleware);

router.get("/attendance-summary", roleMiddleware("EMPLOYEE"), aiAttendanceSummary);
router.get("/payslip/:id/explain", roleMiddleware("EMPLOYEE"), aiPayslipExplanation);
router.get("/performance-insights", roleMiddleware("HR", "ADMIN"), aiPerformanceInsights);

export default router;
