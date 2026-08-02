import { useNavigate } from "react-router-dom";

function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-900 p-10 rounded-xl border border-red-600 text-center">
        <h1 className="text-5xl mb-4">🚫</h1>

        <h2 className="text-3xl text-red-500 font-bold">
          Access Denied
        </h2>

        <p className="text-gray-300 mt-4">
          Sorry, you must be at least 21 years old to enter BottleHub.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default AccessDenied;