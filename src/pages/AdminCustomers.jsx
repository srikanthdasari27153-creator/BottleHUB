import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function AdminCustomers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      (snapshot) => {
        const orders = snapshot.docs.map((doc) => doc.data());

        const uniqueCustomers = [];

        orders.forEach((order) => {
          const exists = uniqueCustomers.find(
            (c) => c.mobile === order.mobile
          );

          if (!exists) {
            uniqueCustomers.push({
              customer: order.customer,
              mobile: order.mobile,
              email: order.email,
              address: order.address,
            });
          }
        });

        setCustomers(uniqueCustomers);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 border-r border-yellow-500 p-6">
        <h1 className="text-3xl font-bold text-yellow-400">
          🍾 BottleHub
        </h1>

        <p className="text-gray-400 mt-2 text-sm">
          Admin Panel
        </p>

        <div className="mt-10 space-y-5">

          <button
            onClick={() => navigate("/admin")}
            className="w-full text-left hover:text-yellow-400"
          >
            📊 Dashboard
          </button>

          <button
            onClick={() => navigate("/admin-orders")}
            className="w-full text-left hover:text-yellow-400"
          >
            📦 Orders
          </button>

          <button
            onClick={() => navigate("/admin-products")}
            className="w-full text-left hover:text-yellow-400"
          >
            🍾 Products
          </button>

          <div className="bg-yellow-500 text-black rounded-lg p-3 font-bold">
            👥 Customers
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-left text-red-400 hover:text-red-500"
          >
            🚪 Logout
          </button>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-yellow-400 mb-8">
          Customers
        </h1>

        <div className="grid gap-5">
          {customers.length === 0 ? (
            <div className="bg-zinc-900 p-6 rounded-xl">
              No Customers Found
            </div>
          ) : (
            customers.map((customer, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-yellow-500 rounded-xl p-6"
              >
                <h2 className="text-2xl font-bold text-yellow-400">
                  {customer.customer}
                </h2>

                <p className="mt-2">
                  📞 {customer.mobile || "-"}
                </p>

                <p>
                  📧 {customer.email || "-"}
                </p>

                <p>
                  📍 {customer.address || "-"}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default AdminCustomers;