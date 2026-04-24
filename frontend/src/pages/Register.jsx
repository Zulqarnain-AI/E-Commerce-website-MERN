import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validation";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
    adminSecret: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(form.email)) {
      alert("Enter a valid email address");
      return;
    }

    if (!validatePassword(form.password)) {
      alert("Password must be at least 8 characters long");
      return;
    }

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        isAdmin: form.isAdmin,
        adminSecret: form.isAdmin ? form.adminSecret : undefined,
      };

      const { data } = await api.post("/api/users/register", payload);

      // Auto login after register
      login(data);

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Create your account</h1>
      <p className="mt-2 text-sm text-slate-600">Set up access to checkout, tracking, and saved items.</p>

      <form onSubmit={submitHandler} className="mt-8 space-y-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <input
          name="name"
          placeholder="Full Name"
          required
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
          onChange={handleChange}
        />

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            name="isAdmin"
            type="checkbox"
            checked={form.isAdmin}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300"
          />
          Register this account as admin
        </label>

        {form.isAdmin && (
          <input
            name="adminSecret"
            type="password"
            placeholder="Admin registration secret"
            required
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
            onChange={handleChange}
          />
        )}

        <button className="w-full rounded-2xl bg-slate-950 py-3 font-semibold text-white transition hover:bg-slate-800">
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-emerald-700 underline-offset-4 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
