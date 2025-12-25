import mongoose from "mongoose";

const payslipSchema = new mongoose.Schema(
  {
    payroll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payroll",
      required: true,
    },
    pdfUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Payslip", payslipSchema);
