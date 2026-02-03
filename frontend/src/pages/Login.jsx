import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "http://localhost:5000/api/users/login",
      { email, password }
    );

    login(data);

    if (data.isAdmin) { navigate("/admin/dashboard"); }
    else {
      console.log("data:",{data})
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col text-center max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <form onSubmit={submitHandler} className="space-y-3">
        <input
          placeholder="Email"
          className="w-full border p-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-black text-white py-2">
          Login
        </button>
      </form>
      <div>
        <h1>OR</h1>
        <p>if you don't have registered</p>
        <Link to="/register" className="text-blue-600 underline hover:bg-black hover:text-white rounded pl-1 pr-1 pb-1">
          signup here
        </Link>
      </div>
    </div>
  );
};

export default Login;
