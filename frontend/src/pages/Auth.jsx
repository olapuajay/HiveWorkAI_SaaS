import { useState } from "react";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

function Auth() {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 border rounded-lg bg-card">
        {mode === "login" ? <Login /> : <Register />}

        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="mt-4 text-sm text-primary"
        >
          {mode === "login" ? "Create a company account" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  )
}

export default Auth;
