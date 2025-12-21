import express from "express";
import {
  createEmployee,
  getEmployee,
  getEmployeeById,
  updateEmployee,
  deactivateEmployee,
  getMyProfile,
} from "../controllers/employeeController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";

const router = express.Router();

router.use(authMiddleware, tenantMiddleware);

router.post("/", roleMiddleware("ADMIN", "HR"), createEmployee);
router.get("/", roleMiddleware("ADMIN", "HR"), getEmployee);
router.get("/:id", roleMiddleware("ADMIN", "HR"), getEmployeeById);
router.put("/:id", roleMiddleware("ADMIN", "HR"), updateEmployee);
router.delete("/:id", roleMiddleware("ADMIN"), deactivateEmployee);

router.get("/me/profile", roleMiddleware("EMPLOYEE"), getMyProfile);

export default router;
