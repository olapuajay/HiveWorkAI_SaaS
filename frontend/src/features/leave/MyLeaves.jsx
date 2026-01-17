import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyLeaves } from "./leaveSlice";

function MyLeaves() {
  const dispatch = useDispatch();
  const { records } = useSelector((state) => state.leave);

  useEffect(() => {
    dispatch(fetchMyLeaves());
  }, [dispatch]);

  return (
    <div className="p-6 bg-card border rounded-lg">
      <h2 className="font-semibold mb-4">My Leaves</h2>

      <ul className="space-y-3 text-sm">
        {records.map((l) => (
          <li
            key={l._id}
            className="border p-3 rounded-md flex justify-between"
          >
            <span>
              {l.startDate} - {l.endDate}
            </span>
            <span className="font-medium">{l.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyLeaves;
