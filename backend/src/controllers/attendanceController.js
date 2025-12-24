import Attendance from "../models/Attendance.js";
import User from "../models/User.js";
import { calculateHours, detectLate } from "../services/attendanceService.js";
import { getIO } from "../config/socket.js";

export const clockIn = async (req, res, next) => {
  try {
    const employee = await User.findById(req.user.userId);
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const existing = await Attendance.findOne({
      employee: employee._id,
      company: req.company._id,
      date: today,
    });

    if (existing && existing.clockIn) {
      return res.status(400).json({ message: "Already clocked in" });
    }

    const clockInTime = new Date();

    const attendance = await Attendance.create({
      employee: employee._id,
      company: req.company._id,
      date: today,
      clockIn: clockInTime,
      status: detectLate(clockInTime, employee.shift?.startTime)
        ? "LATE"
        : "PRESENT",
    });

    getIO().emit("attendance:clockIn", {
      employeeId: employee._id,
      name: employee.name,
    });

    res.json({
      success: true,
      attendance,
    });
  } catch (error) {
    next(error);
  }
};

export const clockOut = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({
      employee: req.user.userId,
      company: req.company._id,
      date: today,
    });

    if (!attendance || attendance.clockOut) {
      return res.status(400).json({ message: "Invalid clock-out" });
    }

    attendance.clockOut = new Date();
    attendance.totalHours = calculateHours(
      attendance.clockIn,
      attendance.clockOut
    );

    await attendance.save();

    getIO().emit("attendance:clockOut", {
      employeeId: req.user.userId,
      hours: attendance.totalHours,
    });

    res.json({
      success: true,
      attendance,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyAttendance = async (req, res, next) => {
  try {
    const records = await Attendance.find({
      employee: req.user.userId,
      company: req.company._id,
    }).sort({ date: -1 });

    res.json({ success: true, records });
  } catch (error) {
    next(error);
  }
};

export const getCompanyAttendance = async (req, res, next) => {
  try {
    const records = await Attendance.find({ company: req.company._id })
      .populate("employee", "name department")
      .sort({ date: -1 });

    res.json({ success: true, records });
  } catch (error) {
    next(error);
  }
};
