import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/auth/login", {
        email,
        password
      });
      console.log(res)

      login(res.data);
      navigate("/profile");

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  
  <div className="bg-white p-8 rounded-xl shadow-lg w-80">
    
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
      Login
    </h2>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
      >
        Login
      </button>

    </form>
  </div>

</div>
  );
}

export default Login;