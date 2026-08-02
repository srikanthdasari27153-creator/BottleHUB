import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      setFormData({
        ...formData,
        mobile: value.replace(/\D/g, ""),
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    const {
      name,
      email,
      mobile,
      password,
      confirmPassword,
      city,
    } = formData;

    if (
      !name ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword ||
      !city
    ) {
      alert("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid Email");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Please enter a valid Mobile Number");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const q = query(
      collection(db, "users"),
      where("mobile", "==", mobile)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      alert("Account already exists. Please Login.");
      navigate("/login");
      return;
    }
    try {
      const user = {
        name,
        email,
        mobile,
        password,
        city,
      };

      // Save user in Firestore
      await addDoc(collection(db, "users"), user);

      // Save current user locally
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");

      alert("Registration Successful!");

      navigate("/home");

    } catch (error) {
      console.error(error);
      alert("Registration Failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="bg-zinc-900 border border-yellow-500 rounded-2xl shadow-2xl w-full max-w-lg p-8">

        <div className="text-center">
          <div className="text-6xl">🍾</div>

          <h1 className="text-4xl font-bold text-yellow-400 mt-4">
            Create Account
          </h1>

          <p className="text-gray-400 mt-2">
            Register to continue
          </p>
        </div>

        <div className="mt-8 space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 outline-none focus:border-yellow-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 outline-none focus:border-yellow-400"
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Indian Mobile Number"
            maxLength={10}
            value={formData.mobile}
            onChange={handleChange}
            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 outline-none focus:border-yellow-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 outline-none focus:border-yellow-400"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 outline-none focus:border-yellow-400"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 outline-none focus:border-yellow-400"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg transition duration-300"
          >
            Register
          </button>

        </div>

      </div>
    </div>
  );
}

export default Register;