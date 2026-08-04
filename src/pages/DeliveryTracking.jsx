import { useState, useEffect } from "react";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaTruck,
  FaHome,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function DeliveryTracking() {
  const [progress, setProgress] = useState(20);
  const [status, setStatus] = useState("Order Confirmed");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(40);
      setStatus("Packed");
    }, 3000);

    const timer2 = setTimeout(() => {
      setProgress(70);
      setStatus("Out For Delivery");
    }, 6000);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatus("Delivered");
    }, 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-10 px-5">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold text-yellow-400 text-center">
          🚚 Live Order Tracking
        </h1>

        <p className="text-center text-gray-400 mt-4">
          Track your BottleHub Order
        </p>

        {/* Order Card */}
        <div className="bg-zinc-900 mt-10 rounded-3xl border border-yellow-500 p-8 shadow-xl">

          <div className="flex flex-col md:flex-row justify-between gap-6">

            <div>
              <p className="text-gray-400">Order ID</p>
              <h2 className="text-2xl font-bold">
                BH20260001
              </h2>
            </div>

            <div>
              <p className="text-gray-400">
                Estimated Delivery
              </p>

              <h2 className="text-2xl text-green-400 font-bold">
                Today • 6:30 PM
              </h2>
            </div>

          </div>

          {/* Progress Bar */}

          <div className="mt-10">

            <div className="w-full h-5 rounded-full bg-zinc-700 overflow-hidden">

              <div
                className="h-full bg-yellow-500 transition-all duration-1000"
                style={{
                  width: `${progress}%`,
                }}
              ></div>

            </div>

            <p className="mt-5 text-center text-xl font-bold text-yellow-400">
              {status}
            </p>

          </div>

          {/* Timeline */}

          <div className="grid grid-cols-4 gap-5 mt-14 text-center">

            <div>
              <FaCheckCircle
                className={`mx-auto text-4xl ${
                  progress >= 20
                    ? "text-green-400"
                    : "text-gray-600"
                }`}
              />
              <p className="mt-3">
                Confirmed
              </p>
            </div>

            <div>
              <FaBoxOpen
                className={`mx-auto text-4xl ${
                  progress >= 40
                    ? "text-yellow-400"
                    : "text-gray-600"
                }`}
              />
              <p className="mt-3">
                Packed
              </p>
            </div>

            <div>
              <FaTruck
                className={`mx-auto text-4xl ${
                  progress >= 70
                    ? "text-blue-400"
                    : "text-gray-600"
                }`}
              />
              <p className="mt-3">
                Out For Delivery
              </p>
            </div>

            <div>
              <FaHome
                className={`mx-auto text-4xl ${
                  progress >= 100
                    ? "text-green-400"
                    : "text-gray-600"
                }`}
              />
              <p className="mt-3">
                Delivered
              </p>
            </div>

          </div>

        </div>

        {/* Delivery Boy */}

        <div className="bg-zinc-900 border border-yellow-500 rounded-3xl mt-10 p-8">

          <h2 className="text-3xl text-yellow-400 font-bold mb-6">
            Delivery Partner
          </h2>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8">

            <div>

              <h3 className="text-2xl font-bold">
                Muni Madhav
              </h3>

              <p className="text-gray-400 mt-2">
                BottleHub Delivery Executive
              </p>

              <p className="text-green-400 mt-4">
                Vehicle : AP16CW2780
              </p>

            </div>

            <div className="flex gap-4 flex-wrap">

              <a
                href="tel:+919154694920"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl flex items-center gap-2 font-bold"
              >
                <FaPhoneAlt />
                Call
              </a>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl flex items-center gap-2 font-bold"
              >
                <FaMapMarkerAlt />
                Live Map
              </a>

            </div>

          </div>

        </div>

        {/* Status Box */}

        <div className="bg-linear-to-r from-yellow-500 to-orange-500 rounded-3xl mt-10 p-8 text-center">

          <h2 className="text-4xl font-bold text-black">
            {status}
          </h2>

          <p className="text-black mt-4 text-lg">
            Thank you for shopping with BottleHub ❤️
          </p>

        </div>

      </div>
    </div>
  );
}

export default DeliveryTracking;