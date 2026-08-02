import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { GOOGLE_MAPS_API_KEY } from "../config";

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

function Checkout() {
  const { cartItems, total, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [markerPosition, setMarkerPosition] = useState({
    lat: 17.385044,
    lng: 78.486671,
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
    const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log(position);

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);

        setMarkerPosition({
          lat,
          lng,
        });

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
          );

          const data = await response.json();
          console.log(data);

          if (data.status === "OK" && data.results.length > 0) {
            setAddress(data.results[0].formatted_address);
          } else {
            setAddress(`${lat}, ${lng}`);
          }

          alert("✅ Location Captured Successfully");
        } catch (error) {
          console.log(error);
          setAddress(`${lat}, ${lng}`);
        }
      },
      (error) => {
        console.log(error);
        alert("Unable to get your location");
      }
    );
  };

  const handleMarkerDrag = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setLatitude(lat);
    setLongitude(lng);

    setMarkerPosition({
      lat,
      lng,
    });

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
      );

      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      }
    } catch (error) {
      console.log(error);
    }
  };
    const handleOrder = async () => {
    if (!name || !email || !phone || !address) {
      alert("Please fill all details");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Please enter a valid Indian mobile number");
      return;
    }

    const options = {
      key: "rzp_test_TIz9ORPrxNgS5Z",
      amount: total * 100,
      currency: "INR",
      name: "BottleHub",
      description: "Order Payment",

      handler: async function (response) {
        try {
          await addDoc(collection(db, "orders"), {
            customer: name,
            email,
            mobile: phone,
            address,
            latitude,
            longitude,

            googleMapsUrl: `https://www.google.com/maps?q=${latitude},${longitude}`,

            items: cartItems,
            total,

            paymentId: response.razorpay_payment_id,
            paymentStatus: "Paid",

            status: "Pending",
            createdAt: new Date(),
          });

          localStorage.removeItem("cart");

          if (setCart) {
            setCart([]);
          }

          alert("🎉 Payment Successful & Order Placed!");

          navigate("/");
        } catch (error) {
          console.log(error);
          alert("Order Save Failed!");
        }
      },

      prefill: {
        name,
        email,
        contact: phone,
      },

      theme: {
        color: "#EAB308",
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", function () {
      alert("Payment Failed");
    });

    paymentObject.open();
  };

  if (!isLoaded) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading Google Maps...
      </div>
    );
  }
    return (
    <div className="bg-black min-h-screen flex items-center justify-center p-10">
      <div className="bg-zinc-900 p-8 rounded-xl w-full max-w-2xl shadow-lg border border-yellow-500">

        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-8">
          Checkout
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 bg-zinc-800 text-white outline-none"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 bg-zinc-800 text-white outline-none"
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          maxLength={10}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          className="w-full p-3 rounded-lg mb-4 bg-zinc-800 text-white outline-none"
        />

        <button
          onClick={getCurrentLocation}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg mb-4 font-bold"
        >
          📍 Use Current Location
        </button>

        <div className="mb-5">
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "350px",
              borderRadius: "12px",
            }}
            center={markerPosition}
            zoom={16}
          >
            <Marker
              position={markerPosition}
              draggable={true}
              onDragEnd={handleMarkerDrag}
            />
          </GoogleMap>
        </div>

        <textarea
          rows="4"
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 bg-zinc-800 text-white outline-none resize-none"
        />

        <div className="bg-zinc-800 rounded-lg p-4 mb-5">
          <h3 className="text-yellow-400 font-bold mb-2">
            Current Location
          </h3>

          <p className="text-green-400">
            📍 Latitude : {latitude || "-"}
          </p>

          <p className="text-green-400 mt-2">
            📍 Longitude : {longitude || "-"}
          </p>
        </div>

        <div className="flex justify-between items-center text-2xl font-bold text-yellow-400 border-t border-zinc-700 pt-4 mb-6">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={handleOrder}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-lg font-bold text-xl"
        >
          💳 Pay Now
        </button>

      </div>
    </div>
  );
}

export default Checkout;