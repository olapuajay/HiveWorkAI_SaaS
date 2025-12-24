import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  type: {
    type: String,
    enum: ["CASUAL", "SICK", "PAID", "UNPAID"],
    required: true
  },

  reason: { type: String },

  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },

  totalDays: { type: Number, requierd: true },

  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  },

  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("Leave", leaveSchema);