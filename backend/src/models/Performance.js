import { compare } from "bcryptjs";
import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    period: {
      type: String,
      enum: ["MONTHLY", "QUARTERLY"],
      required: true,
    },

    month: { type: Number },
    year: { type: Number, required: true },

    metrics: {
      attendanceScore: { type: Number, min: 0, max: 10 },
      taskCompletionScore: { type: Number, min: 0, max: 10 },
      punctualityScore: { type: Number, min: 0, max: 10 },
      teamworkScore: { type: Number, min: 0, max: 10 },
    },

    overallScore: { type: Number, min: 0, max: 10 },

    feedback: { type: String },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

performanceSchema.index(
  { company: 1, employee: 1, period: 1, month: 1, year: 1 },
  { unique: true }
);

export default mongoose.model("Performance", performanceSchema);
