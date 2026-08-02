import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OTPVerification() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const mobile = localStorage.getItem("mobile");

  const handleVerify = () => {
    const savedOTP = localStorage.getItem("otp");

    if (otp === savedOTP) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/verify-age");
    } else {
      alert("Invalid OTP. Please enter 123456");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="bg-zinc-900 border border-yellow-500 rounded-2xl shadow-2xl w-full max-w-md p-8">

        {/* Logo */}
        <div className="text-center">
          <div className="text-6xl">📱</div>

          <h1 className="text-3xl font-bold text-yellow-400 mt-4">
            OTP Verification
          </h1>

          <p className="text-gray-400 mt-2">
            OTP sent to
          </p>

          <p className="text-white font-semibold mt-2">
            +91 {mobile}
          </p>
        </div>

        {/* OTP Input */}
        <div className="mt-8">
          <input
            type="text"
            placeholder="Enter 6 Digit OTP"
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
            className="w-full bg-zinc-800 text-white rounded-xl px-4 py-4 border border-zinc-700 focus:border-yellow-400 focus:outline-none text-center text-2xl placeholder:text-lg placeholder:tracking-normal tracking-[6px]"
          />
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full mt-8 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg transition"
        >
          Verify OTP
        </button>

        {/* Demo OTP */}
        <div className="mt-6 text-center text-gray-400">
          Demo OTP :
          <span className="text-yellow-400 font-bold"> 123456</span>
        </div>

      </div>
    </div>
  );
}

export default OTPVerification;