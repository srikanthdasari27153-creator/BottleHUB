import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

function ForgotPassword() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    if (!mobile || !newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Please enter a valid Mobile Number");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const q = query(
        collection(db, "users"),
        where("mobile", "==", mobile)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("Account not found");
        return;
      }

      const userDocId = snapshot.docs[0].id;
      await updateDoc(doc(db, "users", userDocId), {
        password: newPassword,
      });

      alert("Password Updated Successfully");
      navigate("/login");

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="bg-zinc-900 border border-yellow-500 rounded-2xl shadow-2xl w-full max-w-lg p-8">

        <h1 className="text-4xl font-bold text-yellow-400 text-center">
          Forgot Password
        </h1>

        <p className="text-center text-gray-400 mt-2">
          Reset your account password
        </p>

        <div className="mt-8 space-y-5">

          <input
            type="tel"
            placeholder="Registered Mobile Number"
            maxLength={10}
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value.replace(/\D/g, ""))
            }
            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 outline-none focus:border-yellow-400"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 outline-none focus:border-yellow-400"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 outline-none focus:border-yellow-400"
          />

          <button
            onClick={handleResetPassword}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg"
          >
            Update Password
          </button>

        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;