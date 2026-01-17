import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clockIn, clockOut, fetchMyAttendance } from "./attendanceSlice";

function AttendanceWidget() {
  const dispatch = useDispatch();
  const { records } = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(fetchMyAttendance());
  }, [dispatch]);

  const today = records?.[0];

  return (
    <div className="p-6 bg-card border rounded-lg space-y-4">
      <h2 className="text-lg font-semibold">Attendance</h2>

      <div className="flex gap-4">
        <button
          onClick={() => dispatch(clockIn())}
          disabled={today?.clockIn}
          className="px-4 py-2 bg-accent text-white rounded-md disabled:opacity-50"
        >
          Clock In
        </button>

        <button
          onClick={() => dispatch(clockOut())}
          disabled={!today?.clockIn || today?.clockOut}
          className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
        >
          Clock Out
        </button>
      </div>

      {today && (
        <p className="text-sm text-textSecondary">
          Status: {today.status || "—"} | Hours: {today.totalHours || "—"}
        </p>
      )}
    </div>
  );
}

export default AttendanceWidget;
