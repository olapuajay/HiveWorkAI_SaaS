import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import cloudinary from "../config/cloudinary.js";

export const generatePayslipPDF = async (data) => {
  const doc = new PDFDocument();
  const tempPath = path.join("uploads", `payslip-${data.employeeId}-${Date.now()}.pdf`);

  doc.pipe(fs.createWriteStream(tempPath));
  doc.fontSize(18).text("Payslip", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Employee: ${data.name}`);
  doc.text(`Month: ${data.month}/${data.year}`);
  doc.text(`Gross Salary: ₹${data.grossSalary}`);
  doc.text(`Deductions: ₹${data.deductions}`);
  doc.text(`Net Salary: ₹${data.netSalary}`);

  doc.end();

  await new Promise((resolve) => doc.on("end", resolve));

  const uploadResult = await cloudinary.uploader.upload(tempPath, {
    folder: "payslips",
    resource_type: "raw",
    flags: "attachment",
  });

  fs.unlinkSync(tempPath);

  return uploadResult.secure_url;
};