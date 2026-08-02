import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const q = query(
      collection(db, "orders"),
      where("mobile", "==", user.mobile)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);
    });

    return () => unsubscribe();
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-yellow-400 mb-8">
          My Profile
        </h1>

        <div className="bg-zinc-900 border border-yellow-500 rounded-xl p-6">

          <h2 className="text-3xl font-bold">
            {user?.name}
          </h2>

          <p className="mt-3">
            📱 {user?.mobile}
          </p>

          <p>
            📧 {user?.email}
          </p>

          <p>
            📍 {user?.city}
          </p>

        </div>

        <h2 className="text-3xl font-bold text-yellow-400 mt-10 mb-5">
          My Orders
        </h2>

        {orders.length === 0 ? (

          <div className="bg-zinc-900 rounded-xl p-6">
            No Orders Found
          </div>

        ) : (

          <div className="space-y-5">{orders.map((order) => (
              <div
                key={order.id}
                className="bg-zinc-900 border border-yellow-500 rounded-xl p-6"
              >
                <div className="flex justify-between items-center">

                  <h3 className="text-2xl font-bold text-yellow-400">
                    Order #{order.id}
                  </h3>

                  <span
                    className={`font-bold ${
                      order.status === "Pending"
                        ? "text-yellow-400"
                        : order.status === "Accepted"
                        ? "text-green-400"
                        : order.status === "Packed"
                        ? "text-blue-400"
                        : order.status === "Out For Delivery"
                        ? "text-purple-400"
                        : order.status === "Delivered"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </span>

                </div>

                <p className="mt-3">
                  <b>Total:</b> ₹{order.total}
                </p>

                <p>
                  <b>Date:</b>{" "}
                  {order.createdAt?.toDate
                    ? order.createdAt
                        .toDate()
                        .toLocaleString()
                    : "-"}
                </p>

                <div className="mt-5">

                  <h4 className="font-bold text-yellow-400 mb-2">
                    Ordered Items
                  </h4>

                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b border-zinc-700 py-2"
                    >
                      <span>
                        {item.name}
                        {item.selectedSize &&
                          ` (${item.selectedSize})`}
                      </span>

                      <span>
                        × {item.quantity}
                      </span>
                    </div>
                  ))}

                </div>

              </div>
            ))}
          </div>
        )}<div className="mt-10 flex justify-center">

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-bold"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default Profile;
