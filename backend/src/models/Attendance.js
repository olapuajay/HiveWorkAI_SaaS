import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
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

  date: {
    type: String,
    required: true
  },

  clockIn: { type: Date },
  clockOut: { type: Date },

  totalHours: { type: Number, default: 0 },

  status: {
    type: String,
    enum: ["PRESENT", "ABSENT", "LATE"],
    default: "PRESENT"
  }
}, { timestamps: true });

attendanceSchema.index({ company: 1, employee: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);