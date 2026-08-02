import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function AdminDashboard() {
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

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const customers = new Set(
    orders.map((order) => order.mobile)
  ).size;

  const revenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const paidOrders = orders.filter(
    (order) => order.paymentStatus === "Paid"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold text-red-500 mb-8">
         THIS IS MY NEW Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-zinc-900 border border-yellow-500 rounded-xl p-6">
          <h3 className="text-gray-400">Total Orders</h3>
          <p className="text-5xl text-yellow-400 font-bold mt-3">
            {totalOrders}
          </p>
        </div>

        <div className="bg-zinc-900 border border-yellow-500 rounded-xl p-6">
          <h3 className="text-gray-400">Customers</h3>
          <p className="text-5xl text-yellow-400 font-bold mt-3">
            {customers}
          </p>
        </div>

        <div className="bg-zinc-900 border border-orange-500 rounded-xl p-6">
          <h3 className="text-gray-400">Pending Orders</h3>
          <p className="text-5xl text-orange-400 font-bold mt-3">
            {pendingOrders}
          </p>
        </div>

        <div className="bg-zinc-900 border border-green-500 rounded-xl p-6">
          <h3 className="text-gray-400">Revenue</h3>
          <p className="text-5xl text-green-400 font-bold mt-3">
            ₹{revenue}
          </p>
        </div>

        <div className="bg-zinc-900 border border-green-500 rounded-xl p-6">
          <h3 className="text-gray-400">Paid Orders</h3>
          <p className="text-5xl text-green-400 font-bold mt-3">
            {paidOrders}
          </p>
        </div>

        <div className="bg-zinc-900 border border-blue-500 rounded-xl p-6">
          <h3 className="text-gray-400">Delivered</h3>
          <p className="text-5xl text-blue-400 font-bold mt-3">
            {deliveredOrders}
          </p>
        </div>

        <div className="bg-zinc-900 border border-red-500 rounded-xl p-6">
          <h3 className="text-gray-400">Cancelled</h3>
          <p className="text-5xl text-red-400 font-bold mt-3">
            {cancelledOrders}
          </p>
        </div>

      </div>

      <h2 className="text-3xl text-yellow-400 mt-12 mb-6">
        Recent Orders
      </h2>

      {orders.length === 0 ? (
        <div className="bg-zinc-900 p-8 rounded-xl text-center text-gray-400">
          No Orders Available
        </div>
      ) : (
        <div className="space-y-4">

          {orders.slice().reverse().map((order) => (
            <div
              key={order.id}
              className="bg-zinc-900 border border-yellow-500 rounded-xl p-5"
            >
              <h3 className="text-xl font-bold text-yellow-400">
                {order.customer || "Customer"}
              </h3>

              <p>📞 {order.mobile || "-"}</p>

              <p>₹{order.total || 0}</p>

              <p>
                Status :
                <span className="ml-2 text-yellow-400">
                  {order.status || "Pending"}
                </span>
              </p>

              <p>
                Payment :
                <span
                  className={`ml-2 ${
                    order.paymentStatus === "Paid"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {order.paymentStatus || "Pending"}
                </span>
              </p>

              {order.paymentId && (
                <p className="text-xs text-gray-400 break-all mt-1">
                  Payment ID : {order.paymentId}
                </p>
              )}
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default AdminDashboard;