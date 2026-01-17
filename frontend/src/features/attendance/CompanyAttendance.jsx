import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyAttendance } from "./attendanceSlice";

export default function CompanyAttendance() {
  const dispatch = useDispatch();
  const { records } = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(fetchCompanyAttendance());
  }, [dispatch]);

  return (
    <div className="p-6 bg-card border rounded-lg overflow-x-auto">
      <h2 className="font-semibold mb-4">Company Attendance</h2>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Employee</th>
            <th>Date</th>
            <th>Status</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id} className="border-b">
              <td className="p-2">{r.employee?.name}</td>
              <td>{r.date}</td>
              <td>{r.status}</td>
              <td>{r.totalHours || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
