import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema(
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

    month: { type: Number, required: true },
    year: { type: Number, required: true },

    grossSalary: { type: Number, required: true },
    deductions: { type: Number, default: 0 },
    netSalary: { type: Number, required: true },

    lopDays: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["GENERATED", "PAID"],
      default: "GENERATED",
    },
  },
  { timestamps: true }
);

payrollSchema.index(
  { company: 1, employee: 1, month: 1, year: 1 },
  { unique: true }
);

export default mongoose.model("Payroll", payrollSchema);
