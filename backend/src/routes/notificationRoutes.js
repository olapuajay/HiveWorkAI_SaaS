import express from "express";
import {
  getMyNotifications,
  markAsRead,
} from "../controllers/notificationController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, tenantMiddleware, getMyNotifications);
router.put("/:id/read", authMiddleware, tenantMiddleware, markAsRead);

export default router;
