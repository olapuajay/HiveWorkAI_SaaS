import express from "express";
import { applyleave, getMyLeaves, getCompanyLeaves, reviewLeave } from "../controllers/leaveController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";

const router = express.Router();

router.use(authMiddleware, tenantMiddleware);

router.post("/", roleMiddleware("EMPLOYEE"), applyleave);
router.get("/me", roleMiddleware("EMPLOYEE"), getMyLeaves);
router.get("/", roleMiddleware("ADMIN", "HR"), getCompanyLeaves);
router.put("/:id/review", roleMiddleware("ADMIN", "HR"), reviewLeave);

export default router;
