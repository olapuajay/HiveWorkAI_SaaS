import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";
import morgan from "morgan";

dotenv.config();

import authRoutes from "../src/routes/authRoutes.js";
import exployeeRoutes from "../src/routes/employeeRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ success: true, message: "WorkHiveAI API Running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/employees", exployeeRoutes);

app.use(errorHandler);

export default app;
