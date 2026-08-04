import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import OTPVerification from "./pages/OTPVerification";
import AgeVerification from "./pages/AgeVerification";
import AccessDenied from "./pages/AccessDenied";

import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import About from "./pages/About";
import Owner from "./pages/Owner";
import FloatingButtons from "./components/FloatingButtons";
import DeliveryTracking from "./pages/DeliveryTracking";
import AdminCustomers from "./pages/AdminCustomers";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn === "true"
    ? children
    : <Navigate to="/login" replace />;
}

function AdminProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem("isAdmin");

  return isAdmin === "true"
    ? children
    : <Navigate to="/admin-login" replace />;
}

function App() {
  const location = useLocation();

  const hideLayout = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/otp",
  "/verify-age",
  "/access-denied",
  "/admin-login",
  "/admin",
  "/admin-products",
  "/admin-orders",
  "/admin-customers",
].includes(location.pathname);
  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<SplashScreen />} />

        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OTPVerification />} />
        <Route path="/verify-age" element={<AgeVerification />} />
        <Route path="/access-denied" element={<AccessDenied />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/about" element={<About />} />
        <Route path="/owner" element={<Owner />} />

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <Admin />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin-products"
          element={
            <AdminProtectedRoute>
              <AdminProducts />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin-orders"
          element={
            <AdminProtectedRoute>
              <AdminOrders />
            </AdminProtectedRoute>
          }
        />
        <Route
  path="/admin-customers"
  element={
    <AdminProtectedRoute>
      <AdminCustomers />
    </AdminProtectedRoute>
  }
/>

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:category"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
           path="/tracking"
           element={
            <ProtectedRoute>
              <DeliveryTracking />
            </ProtectedRoute>
            }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideLayout && <Footer />}
      {!hideLayout && <FloatingButtons />}
    </>
  );
}

export default App;