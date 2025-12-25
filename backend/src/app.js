import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";
import morgan from "morgan";

dotenv.config();

import authRoutes from "../src/routes/authRoutes.js";
import employeeRoutes from "../src/routes/employeeRoutes.js";
import attendanceRoutes from "../src/routes/attendanceRoutes.js";
import leaveRoutes from "../src/routes/leaveRoutes.js";
import payrollRoutes from "../src/routes/payrollRoutes.js";
import performanceRoutes from "../src/routes/performanceRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ success: true, message: "HiveWorkAI API Running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/performance", performanceRoutes);

app.use(errorHandler);

export default app;
