import Attendance from "../models/Attendance.js";

export const calculateHours = (clockIn, clockOut) => {
  const diff = (clockOut - clockIn) / (1000 * 60 * 60);
  return Math.round(diff * 100) / 100;
};

export const detectLate = (clockIn, shiftStart) => {
  if (!shiftStart) return false;
  const [h, m] = shiftStart.split(":").map(Number);
  const shiftTime = new Date(clockIn);
  shiftTime.setHours(h, m, 0, 0);

  return clockIn > shiftTime;
};
