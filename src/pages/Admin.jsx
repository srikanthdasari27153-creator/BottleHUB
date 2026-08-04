import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

function Admin() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

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

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const totalCustomers = new Set(
    orders.map((order) => order.mobile)
  ).size;
  const paidOrders = orders.filter(
  (order) => order.paymentStatus === "Paid"
).length;

const deliveredOrders = orders.filter(
  (order) => order.status === "Delivered"
).length;

const cancelledOrders = orders.filter(
  (order) => order.status === "Cancelled"
).length;

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "orders", id), {
      status,
    });
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
          <div className="bg-yellow-500 text-black rounded-lg p-3 font-bold">
            📊 Dashboard
          </div>

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

      {/* Main */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-yellow-400">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome Admin 👋
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <div className="bg-zinc-900 border border-yellow-500 rounded-xl p-6">
            <p className="text-gray-400">Total Orders</p>
            <h2 className="text-4xl mt-3 font-bold text-yellow-400">
              {orders.length}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-yellow-500 rounded-xl p-6">
            <p className="text-gray-400">Customers</p>
            <h2 className="text-4xl mt-3 font-bold text-yellow-400">
              {totalCustomers}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-yellow-500 rounded-xl p-6">
            <p className="text-gray-400">Pending Orders</p>
            <h2 className="text-4xl mt-3 font-bold text-yellow-400">
              {
                orders.filter(
                  (o) => o.status === "Pending"
                ).length
              }
            </h2>
          </div>

          <div className="bg-zinc-900 border border-yellow-500 rounded-xl p-6">
            <p className="text-gray-400">Revenue</p>
            <h2 className="text-4xl mt-3 font-bold text-green-400">
              ₹{totalRevenue}
            </h2>
          </div>
          <div className="bg-zinc-900 border border-green-500 rounded-xl p-6">
  <p className="text-gray-400">Paid Orders</p>
  <h2 className="text-4xl mt-3 font-bold text-green-400">
    {paidOrders}
  </h2>
</div>

<div className="bg-zinc-900 border border-blue-500 rounded-xl p-6">
  <p className="text-gray-400">Delivered</p>
  <h2 className="text-4xl mt-3 font-bold text-blue-400">
    {deliveredOrders}
  </h2>
</div>

<div className="bg-zinc-900 border border-red-500 rounded-xl p-6">
  <p className="text-gray-400">Cancelled</p>
  <h2 className="text-4xl mt-3 font-bold text-red-400">
    {cancelledOrders}
  </h2>
</div>
        </div>

        {/* Orders */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-yellow-400 mb-5">
            Recent Orders
          </h2>

          {orders.length === 0 ? (
            <div className="bg-zinc-900 rounded-xl p-8 text-center text-gray-400">
              No Orders Available
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl">
              <table className="w-full bg-zinc-900">
                <thead className="bg-yellow-500 text-black">
                  <tr>
                    <th className="p-4">Customer</th>
                    <th>Mobile</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="text-center border-b border-zinc-700"
                    >
                      <td className="p-4">
                        {order.customer}
                      </td>

                      <td>{order.mobile}</td>

                      <td>₹{order.total}</td>

                      <td>
                        <span className="text-yellow-400 font-bold">
                          {order.status}
                        </span>
                      </td>
                      <td>
   <span
    className={ 
      order.paymentStatus === "Paid"
        ? "text-green-400 font-bold"
        : "text-red-400 font-bold"
    }
  >
    {order.paymentStatus || "Pending"}
  </span>
</td>

                      <td>
                        {order.createdAt?.toDate
                          ? order.createdAt
                              .toDate()
                              .toLocaleString()
                          : "-"}
                      </td>

                      <td>
                        <select
                          className="bg-black border border-yellow-500 rounded p-2"
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(
                              order.id,
                              e.target.value
                            )
                          }
                        >
                          <option>Pending</option>
                          <option>Accepted</option>
                          <option>Packed</option>
                          <option>Out For Delivery</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;