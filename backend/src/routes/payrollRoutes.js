import express from "express";
import { generatePayroll, getMyPayroll, getCompanyPayroll } from "../controllers/payrollController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";

const router = express.Router();

router.use(authMiddleware, tenantMiddleware);

router.post("/generate", roleMiddleware("ADMIN", "HR"), generatePayroll);
router.get("/", roleMiddleware("ADMIN", "HR"), getCompanyPayroll);
router.get("/me", roleMiddleware("EMPLOYEE"), getMyPayroll);

export default router;