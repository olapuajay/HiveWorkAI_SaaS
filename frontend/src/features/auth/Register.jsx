import { useState } from "react";
import { registerCompany } from "../../api/auth.api";

function Register() {
  const [form, setForm] = useState({
    companyName: "",
    domain: "",
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerCompany(form);
    alert("Company registered! Please login");
  };

  return (
    <>
      <h2 className="text-2xl font-bold">Register Company</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Company Name"
          className="w-full p-3 border rounded-md"
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company Domain (e.g. hivework.ai)"
          className="w-full p-3 border rounded-md"
          onChange={(e) => setForm({ ...form, domain: e.target.value })}
        />
        <input
          type="text"
          placeholder="Admin Name"
          className="w-full p-3 border rounded-md"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Admin Email"
          className="w-full p-3 border rounded-md"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-md"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full py-3 bg-primary text-white rounded-md hover:bg-secondary transition">
          Register
        </button>
      </form>
    </>
  );
}

export default Register;
