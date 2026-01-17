import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyLeaves, reviewLeave } from "./leaveSlice";

function CompanyLeaves() {
  const dispatch = useDispatch();
  const { records } = useSelector((state) => state.leave);

  useEffect(() => {
    dispatch(fetchCompanyLeaves());
  }, [dispatch]);

  return (
    <div className="p-6 bg-card border rounded-lg overflow-x-auto">
      <h2 className="font-semibold mb-4">Leave Requests</h2>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Employee</th>
            <th>Dates</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((l) => (
            <tr key={l._id} className="border-b">
              <td className="p-2">{l.employee?.name}</td>
              <td>
                {l.from} → {l.to}
              </td>
              <td>{l.status}</td>
              <td className="space-x-2">
                <button
                  onClick={() =>
                    dispatch(reviewLeave({ id: l._id, status: "APPROVED" }))
                  }
                  className="text-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    dispatch(reviewLeave({ id: l._id, status: "REJECTED" }))
                  }
                  className="text-red-500"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompanyLeaves;
