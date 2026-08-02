import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MobileLogin() {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = () => {
    // Only valid Indian mobile numbers (Starts with 6,7,8,9)
    const indianMobileRegex = /^[6-9]\d{9}$/;

    if (!indianMobileRegex.test(mobile)) {
      alert("Please enter a valid Indian Mobile Number");
      return;
    }

    // Demo OTP
    localStorage.setItem("mobile", mobile);
    localStorage.setItem("otp", "123456");

    navigate("/otp");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="bg-zinc-900 border border-yellow-500 rounded-2xl shadow-2xl w-full max-w-md p-8">

        {/* Logo */}
        <div className="text-center">
          <div className="text-7xl">🍾</div>

          <h1 className="text-4xl font-bold text-yellow-400 mt-4">
            BottleHub
          </h1>

          <p className="text-gray-400 mt-2">
            Premium Spirits Collection
          </p>
        </div>

        {/* Mobile Number */}
        <div className="mt-10">
          <label className="text-white block mb-2">
            Mobile Number
          </label>

          <div className="flex">
            <div className="bg-zinc-800 border border-zinc-700 border-r-0 rounded-l-lg px-4 flex items-center text-white font-semibold">
              +91
            </div>

            <input
              type="tel"
              placeholder="Enter Mobile Number"
              maxLength={10}
              value={mobile}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  setMobile(value);
                }
              }}
              className="w-full bg-zinc-800 text-white rounded-r-lg px-4 py-3 outline-none border border-zinc-700 focus:border-yellow-400"
            />
          </div>
        </div>

        {/* Send OTP */}
        <button
          onClick={handleSendOTP}
          className="w-full mt-8 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg transition duration-300"
        >
          Send OTP
        </button>

        {/* Demo OTP */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          Demo OTP :
          <span className="text-yellow-400 font-bold"> 123456</span>
        </div>

      </div>
    </div>
  );
}

export default MobileLogin;