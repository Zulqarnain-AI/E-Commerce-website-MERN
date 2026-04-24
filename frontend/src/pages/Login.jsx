import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validation";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      alert("Password must be at least 8 characters long");
      return;
    }

    try {
      const { data } = await api.post("/api/users/login", { email, password });

      login(data);

      if (data.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md flex-col justify-center px-4 py-12 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Welcome back</h1>
      <p className="mt-2 text-sm text-slate-600">Sign in to continue to your orders and profile.</p>

      <form onSubmit={submitHandler} className="mt-8 space-y-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <input
          name="email"
          value={email}
          placeholder="Email"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          value={password}
          placeholder="Password"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full rounded-2xl bg-slate-950 py-3 font-semibold text-white transition hover:bg-slate-800">
          Login
        </button>
      </form>
      <div className="mt-6 text-sm text-slate-600">
        <p>New here?</p>
        <Link to="/register" className="font-semibold text-emerald-700 underline-offset-4 hover:underline">
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default Login;
