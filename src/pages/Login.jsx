import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import bh from "../assets/images/bh.png";

function Login() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  // Already Logged In
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const currentUser = localStorage.getItem("currentUser");

    if (isLoggedIn === "true") {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async () => {

    if (!mobile || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const q = query(
        collection(db, "users"),
        where("mobile", "==", mobile)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("User not found. Please Register.");
        navigate("/register");
        return;
      }

      const user = snapshot.docs[0].data();

      if (user.password !== password) {
        alert("Invalid Password");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");

       // Save user for entire app
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("currentUser", JSON.stringify(user));

      alert("Login Successful");
     navigate("/home");

    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${bh})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Glass Card */}
      <div className="relative z-10 w-[470px] rounded-3xl bg-black/35 backdrop-blur-xl border border-white/20 shadow-2xl p-10">

        {/* Logo */}
        <div className="text-center">
          <div className="text-7xl">🍾</div>

          <h1 className="text-5xl font-bold text-yellow-400 mt-3">
            BottleHub
          </h1>

          <p className="text-gray-200 mt-2">
            Premium Liquor Store
          </p>
        </div>

        {/* Mobile */}
        <div className="mt-10">
          <label className="text-white font-semibold text-lg">
            Mobile Number
          </label>

          <input
            type="tel"
            maxLength={10}
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value.replace(/\D/g, ""))
            }
            placeholder="Enter Mobile Number"
            className="w-full mt-3 bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-lg text-white placeholder:text-gray-300 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Password */}
        <div className="mt-7">
          <label className="text-white font-semibold text-lg">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full mt-3 bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-lg text-white placeholder:text-gray-300 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full mt-10 py-4 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black text-xl font-bold transition"
        >
          Sign In
        </button>

        {/* Bottom Links */}
        <div className="flex justify-between mt-8 text-sm">
          <Link
            to="/register"
            className="text-yellow-300 hover:text-yellow-400 font-semibold"
          >
            Don't have an account?
          </Link>

          <Link
            to="/forgot-password"
            className="text-yellow-300 hover:text-yellow-400 font-semibold"
          >
            Forgot Password?
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;