import React from "react";
import { useSelector } from "react-redux";

function Dashboard() {
  const role = useSelector((state) => state.auth.user?.role);
  console.log(role);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="p-6 bg-card border rounded-lg">
        <p className="text-textSecondary">
          Welcome to your {role} dashboard.
        </p>
      </div>

      {role === "EMPLOYEE" && (
        <div className="p-6 bg-card border rounded-lg">
          <h2 className="font-semibold">Employee Overview</h2>
          <p className="text-sm text-textSecondary mt-2">
            Attendance, leaves, payslips and performance insights.
          </p>
        </div>
      )}

      {(role === "HR" || role === "ADMIN") && (
        <div className="p-6 bg-card border rounded-lg">
          <h2 className="font-semibold">HR Management</h2>
          <p className="text-sm text-textSecondary mt-2">
            Manage employees, attendance, payroll, and analytics
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
