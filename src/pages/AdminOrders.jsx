import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(data);
      }
    );

    return () => unsubscribe();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "orders", id), {
        status,
      });
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    }
  };

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

          <div className="bg-yellow-500 text-black rounded-lg p-3 font-bold">
            📦 Orders
          </div>

          <button
            onClick={() => navigate("/admin-products")}
            className="w-full text-left hover:text-yellow-400"
          >
            🍾 Products
          </button>

          <button
            onClick={() => navigate("/admin-customers")}
            className="w-full text-left hover:text-yellow-400"
          >
            👥 Customers
          </button>

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
          Orders
        </h1>

        {orders.length === 0 ? (
          <h2 className="text-center text-2xl text-gray-400">
            No Orders Found
          </h2>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-zinc-900 p-6 rounded-xl mb-6 border border-yellow-500"
            >
              <h2 className="text-2xl font-bold text-yellow-400">
                {order.customer || "Customer"}
              </h2>

              <p className="mt-2">
                📞 {order.mobile || "-"}
              </p>

              <p>
                📧 {order.email || "-"}
              </p>

              <p>
                📍 {order.address || "-"}
              </p>

              <p className="mt-3 text-yellow-400 font-bold">
                Total : ₹{order.total || 0}
              </p>

              <p className="mt-2">
                Payment :
                <span
                  className={`ml-2 font-bold ${
                    order.paymentStatus === "Paid"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {order.paymentStatus || "Pending"}
                </span>
              </p>

              {order.paymentId && (
                <p className="mt-1 text-sm text-gray-400 break-all">
                  Payment ID : {order.paymentId}
                </p>
              )}

              <p className="mt-2">
                Status :
                <span
                  className={`ml-2 font-bold ${
                    order.status === "Delivered"
                      ? "text-green-400"
                      : order.status === "Cancelled"
                      ? "text-red-400"
                      : order.status === "Out For Delivery"
                      ? "text-blue-400"
                      : "text-yellow-400"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </p>

              <p className="mt-2 text-gray-400">
                Date :
                {" "}
                {order.createdAt?.toDate
                  ? order.createdAt.toDate().toLocaleString()
                  : "-"}
              </p>

              {order.googleMapsUrl && (
                <a
                  href={order.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  🗺️ Open in Google Maps
                </a>
              )}

              <div className="mt-5">
                <h3 className="font-bold text-lg mb-3 text-yellow-400">
                  Ordered Items
                </h3>

                {order.items?.length > 0 ? (
                  order.items.map((item, index) => (
                    <div
                      key={index}
                      className="border-b border-zinc-700 py-3"
                    >
                      <p className="font-bold">
                        {item.name}
                      </p>

                      <p>
                        Size : {item.selectedSize || "-"}
                      </p>

                      <p>
                        Quantity : {item.quantity || 1}
                      </p>

                      <p className="text-yellow-400">
                        ₹{item.price || 0}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No Items Found</p>
                )}
              </div>

              <div className="mt-6">
                <label className="block mb-2 font-bold text-yellow-400">
                  Update Order Status
                </label>

                <select
                  className="w-full bg-black border border-yellow-500 p-3 rounded-lg"
                  value={order.status || "Pending"}
                  onChange={(e) =>
                    changeStatus(order.id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Packed">Packed</option>
                  <option value="Out For Delivery">
                    Out For Delivery
                  </option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default AdminOrders;