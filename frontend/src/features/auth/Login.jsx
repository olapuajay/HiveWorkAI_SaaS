import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(form));
    navigate("/app");
  };

  return (
    <>
      <h2 className="text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded-md"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border rounded-md"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full py-3 bg-primary text-white rounded-md hover:bg-secondary transition">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
