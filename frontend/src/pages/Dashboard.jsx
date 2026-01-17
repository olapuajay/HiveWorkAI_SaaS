import React from "react";
import { useSelector } from "react-redux";
import AttendanceWidget from "../features/attendance/AttendanceWidget";
import CompanyAttendance from "../features/attendance/CompanyAttendance";
import ApplyLeave from "../features/leave/ApplyLeave";
import MyLeaves from "../features/leave/MyLeaves";
import CompanyLeaves from "../features/leave/CompanyLeaves";

function Dashboard() {
  const role = useSelector((state) => state.auth.user?.role);
  console.log(role);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="p-6 bg-card border rounded-lg">
        <p className="text-textSecondary">Welcome to your {role} dashboard.</p>
      </div>

      {role === "EMPLOYEE" && 
        <>
          <AttendanceWidget />
          <ApplyLeave />
          <MyLeaves />
        </>
      }

      {(role === "HR" || role === "ADMIN") && (
        <>
          <CompanyAttendance />
          <CompanyLeaves />
        </>
      )}
    </div>
  );
}

export default Dashboard;
