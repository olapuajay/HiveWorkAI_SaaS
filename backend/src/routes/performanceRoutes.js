import express from "express";
import {
  upsertPerformanceReview,
  getMyPerformance,
  getCompanyPerformance,
} from "../controllers/performanceController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";

const router = express.Router();

router.use(authMiddleware, tenantMiddleware);

router.post("/review", roleMiddleware("ADMIN", "HR"), upsertPerformanceReview);
router.get("/", roleMiddleware("ADMIN", "HR"), getCompanyPerformance);
router.get("/me", roleMiddleware("EMPLOYEE"), getMyPerformance);

export default router;
