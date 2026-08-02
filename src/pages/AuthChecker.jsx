import { Navigate } from "react-router-dom";

function AuthChecker() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    return <Navigate to="/home" replace />;
  }

  return <Navigate to="/login" replace />;
}

export default AuthChecker;