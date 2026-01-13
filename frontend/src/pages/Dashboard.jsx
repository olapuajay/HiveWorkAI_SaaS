import React from "react";
import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  console.log(user?.role)

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-textSecondary">
        Logged in as <strong>{user?.role}</strong>
      </p>
    </div>
  );
}

export default Dashboard;
