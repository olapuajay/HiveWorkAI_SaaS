import Attendance from "../models/Attendance.js";
import Leave from "../models/Leave.js";

export const calculateGrossSalary = (salary) => {
  return salary.base + salary.hra + salary.allowances;
};

export const calculateLOPDays = async (employeeId, companyId, month, year) => {
  const leaves = await Leave.find({
    employee: employeeId,
    company: companyId,
    status: "APPROVED",
    type: "UNPAID",
    startDate: { $lte: new Date(year, month, 0) },
    endDate: { $gte: new Date(year, month - 1, 1) },
  });

  return leaves.reduce((sum, leave) => sum + leave.totalDays, 0);
};