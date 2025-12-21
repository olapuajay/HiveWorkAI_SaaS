import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    name: { type: String, required: true },
    email: { type: String, required: true },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["EMPLOYEE", "ADMIN", "HR"],
      default: "EMPLOYEE",
    },

    isActive: { type: Boolean, default: true },

    department: { type: String },
    designation: { type: String },

    salary: {
      base: { type: Number, default: 0 },
      hra: { type: Number, default: 0 },
      allowances: { type: Number, default: 0 },
    },

    shift: {
      startTime: String,
      endTime: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
