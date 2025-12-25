import Payroll from "../models/Payroll.js";
import Payslip from "../models/Payslip.js";
import User from "../models/User.js";
import { calculateGrossSalary, calculateLOPDays } from "../services/payrollService.js";
import { generatePayslipPDF } from "../services/pdfService.js";

export const generatePayroll = async (req, res, next) => {
  try {
    const { employeeId, month, year } = req.body;

    const employee = await User.findById(employeeId);
    if(!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const grossSalary = calculateGrossSalary(employee.salary);
    const lopDays = await calculateLOPDays(employeeId, req.company._id, month, year);

    const dailySalary = grossSalary / 30;
    const deductions = lopDays * dailySalary;
    const netSalary = grossSalary - deductions;

    const payroll = await Payroll.create({
      employee: employeeId,
      company: req.company._id,
      month,
      year,
      grossSalary,
      deductions,
      netSalary,
      lopDays
    });

    const pdfPath = await generatePayslipPDF({
      employeeId,
      name: employee.name,
      month,
      year,
      grossSalary,
      deductions,
      netSalary
    });

    const payslip = await Payslip.create({
      payroll: payroll._id,
      pdfUrl: pdfPath
    });

    res.status(201).json({ success: true, payroll, payslip });
  } catch (error) {
    next(error);
  }
};

export const getMyPayroll = async (req, res, next) => {
  try {
    const payrolls = await Payroll.find({
      employee: req.user.userId,
      company: req.company._id
    }).sort({ createdAt: -1 });

    res.json({ success: true, payrolls });
  } catch (error) {
    next(error);
  }
};

export const getCompanyPayroll = async (req, res, next) => {
  try {
    const payrolls = await Payroll.find({
      company: req.company._id
    }).populate("employee", "name department");

    res.json({ success: true, payrolls });
  } catch (error) {
    next(error);
  }
};