import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { applyLeave } from "./leaveSlice";

function ApplyLeave() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const submit = (e) => {
    e.preventDefault();
    dispatch(applyLeave(form));
    setForm({ from: "", to: "", reason: "" });
  };

  return (
    <div className="p-6 bg-card border rounded-lg">
      <h2 className="font-semibold mb-4">Apply Leave</h2>
      <form className="space-y-4" onSubmit={submit}>
        <select
          className="w-full p-3 border rounded-md"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="">Select Leave Type</option>
          <option value="CASUAL">Casual</option>
          <option value="SICK">Sick</option>
          <option value="PAID">Paid</option>
          <option value="UNPAID">Unpaid</option>
        </select>

        <input
          type="date"
          className="w-full p-3 border rounded-md"
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        />
        <input
          type="date"
          className="w-full p-3 border rounded-md"
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        />
        <textarea
          placeholder="Reason"
          className="w-full p-3 border rounded-md"
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />

        <button className="px-4 py-2 bg-primary text-white rounded-md">
          Submit Leave
        </button>
      </form>
    </div>
  );
}

export default ApplyLeave;
