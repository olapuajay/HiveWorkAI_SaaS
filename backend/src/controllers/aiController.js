import Attendance from "../models/Attendance.js";
import Payroll from "../models/Payroll.js";
import Performance from "../models/Performance.js";
import {
  attendanceSummaryPrompt,
  payslipExplanationPrompt,
  performanceInsightPrompt,
  runAI,
} from "../services/aiService.js";

export const aiAttendanceSummary = async (req, res, next) => {
  try {
    const records = await Attendance.find({
      employee: req.user.userId,
      company: req.company._id,
    });

    const aiResponse = await runAI(attendanceSummaryPrompt, records);

    res.json({ success: true, summary: aiResponse });
  } catch (error) {
    next(error);
  }
};

export const aiPayslipExplanation = async (req, res, next) => {
  try {
    const payroll = await Payroll.findOne({
      _id: req.params.id,
      employee: req.user.userId,
      company: req.company._id,
    });

    if (!payroll) {
      return res.status(404).json({ message: "Payslip not found" });
    }
    const aiResponse = await runAI(payslipExplanationPrompt, payroll);

    res.json({ success: true, explanation: aiResponse });
  } catch (error) {
    next(error);
  }
};

export const aiPerformanceInsights = async (req, res, next) => {
  try {
    const records = await Performance.find({
      company: req.company._id
    }).populate("employee", "name department");

    const aiResponse = await runAI(performanceInsightPrompt, records);

    res.json({ success: true, insights: aiResponse });
  } catch (error) {
    next(error);
  }
}