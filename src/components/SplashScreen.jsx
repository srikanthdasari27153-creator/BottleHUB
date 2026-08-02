import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if (isLoggedIn === "true") {
        navigate("/home", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col justify-center items-center">
      {/* Bottle */}
      <div className="text-8xl animate-bounce">
        🍾
      </div>

      {/* Logo */}
      <h1 className="text-6xl font-extrabold text-yellow-400 mt-6 tracking-widest">
        BottleHub
      </h1>

      {/* Tagline */}
      <p className="text-gray-300 text-xl mt-4">
        Premium Spirits Collection
      </p>

      {/* Loading Bar */}
      <div className="w-64 h-2 bg-zinc-800 rounded-full mt-10 overflow-hidden">
        <div className="h-full w-full bg-yellow-400 animate-pulse"></div>
      </div>
    </div>
  );
}

export default SplashScreen;