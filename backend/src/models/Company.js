import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    domain: { type: String, required: true, unique: true },

    subscriptionPlan: {
      type: String,
      enum: ["FREE", "PRO", "ENTERPRICE"],
      default: "FREE",
    },

    emailConfig: {
      fromEmail: { type: String, default: null },
      provider: { type: String, default: null },
      isVerified: { type: Boolean, default: false },
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
