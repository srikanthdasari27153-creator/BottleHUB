import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "BottleHub@123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="bg-zinc-900 border border-yellow-500 rounded-2xl p-8 w-105">

        <h1 className="text-4xl text-yellow-400 font-bold text-center">
          BottleHub Admin
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full mt-8 bg-zinc-800 text-white p-3 rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mt-5 bg-zinc-800 text-white p-3 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full mt-8 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default AdminLogin;