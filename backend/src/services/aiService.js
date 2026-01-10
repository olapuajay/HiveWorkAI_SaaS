import { callGemini } from "../config/gemini.js";

export const attendanceSummaryPrompt = (records) => {
  return `
  You are an HR assistant.
  Summarize the following attendance records in simple terms:
  ${JSON.stringify(records)}

  Give insights such as:
  - Attendance consistency
  - Late patterns
  - Overall summary
  `;
};

export const payslipExplanationPrompt = (payroll) => {
  return `
  You are an HR payroll assistant.
  Explain the following payslip in simple language for an employee:
  ${JSON.stringify(payroll)}

  Explain deductions, net salary, and key points clearly.
  `;
};

export const performanceInsightPrompt = (records) => {
  return `
  You are an HR analytics expert.
  Analyze the following employee performance data:
  ${JSON.stringify(records)}

  Provide:
  - Key insights
  - Productivity trends
  - Employees with low performance
  - Improvement suggestions
  `;
};

export const runAI = async (promptBuilder, data) => {
  const prompt = promptBuilder(data);
  return await callGemini(prompt);
};
