import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generatePayslipPDF = async (data) => {
  const doc = new PDFDocument();
  const filePath = path.join("uploads", `payslip-${data.employeeId}-${Date.now()}.pdf`);

  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(18).text("Payslip", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Employee: ${data.name}`);
  doc.text(`Month: ${data.month}/${data.year}`);
  doc.text(`Gross Salary: ₹${data.grossSalary}`);
  doc.text(`Deductions: ₹${data.deductions}`);
  doc.text(`Net Salary: ₹${data.netSalary}`);

  doc.end();

  return filePath;
};