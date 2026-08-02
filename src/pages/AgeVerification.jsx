import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AgeVerification() {
  const navigate = useNavigate();

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1949 },
    (_, i) => currentYear - i
  );

  const handleEnter = () => {
    if (!month || !day || !year) {
      alert("Please select your Date of Birth");
      return;
    }

    const birthDate = new Date(
      year,
      months.indexOf(month),
      Number(day)
    );

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age >= 21) {
      navigate("/home");
    } else {
      navigate("/access-denied");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-lg bg-zinc-900 border border-yellow-600 rounded-2xl p-10 shadow-2xl">

        <div className="text-center">

          <div className="text-6xl mb-4">🍾</div>

          <p className="text-gray-400 tracking-[6px] text-sm">
            EST. 2026
          </p>

          <h1 className="text-yellow-400 text-4xl font-bold mt-5">
            WELCOME TO
          </h1>

          <h2 className="text-yellow-500 text-5xl font-bold">
            BOTTLE HUB
          </h2>

          <p className="text-gray-300 mt-6">
            You must be of legal drinking age
            <br />
            to enter our private cellar.
          </p>

          <div className="mt-10">

            <h3 className="text-white mb-4">
              Please verify your date of birth
            </h3>

            <div className="grid grid-cols-3 gap-3">

              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="bg-black border border-gray-600 rounded-lg p-3 text-white"
              >
                <option value="">Month</option>

                {months.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>

              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="bg-black border border-gray-600 rounded-lg p-3 text-white"
              >
                <option value="">Day</option>

                {days.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>

              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-black border border-gray-600 rounded-lg p-3 text-white"
              >
                <option value="">Year</option>

                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>

            </div>

          </div>

          <button
            onClick={handleEnter}
            className="mt-8 w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl"
          >
            ENTER BOTTLE HUB →
          </button>

        </div>

      </div>

    </div>
  );
}

export default AgeVerification;