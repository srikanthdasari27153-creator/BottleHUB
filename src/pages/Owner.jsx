import owner from "../assets/Owner.jpg";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";

function Owner() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">

      <div className="max-w-4xl w-full bg-zinc-900 border border-yellow-500 rounded-3xl p-10 shadow-[0_0_40px_rgba(255,193,7,.25)]">

        <div className="flex flex-col md:flex-row items-center gap-10">

          {/* Owner Image */}
          <img
            src={owner}
            alt="Owner"
            className="w-64 h-64 rounded-full object-cover border-4 border-yellow-400 shadow-xl"
          />

          {/* Details */}
          <div className="flex-1">

            <h1 className="text-4xl font-bold text-yellow-400">
              D.V. Srikanth
            </h1>

            <p className="text-xl text-gray-300 mt-2">
              Founder & CEO
            </p>

            <p className="text-gray-400 mt-6 leading-8">
              Welcome to BottleHub. Our mission is to provide a premium
              online shopping experience with high-quality products,
              excellent customer service, and a modern user-friendly
              platform.
            </p>

            {/* Contact Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-8">

              <a
                href="tel:+918309467690"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl flex justify-center items-center gap-2"
              >
                <FaPhoneAlt />
                Call
              </a>

              <a
                href="mailto:bottlehub57254@gmail.com"
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2"
              >
                <FaEnvelope />
                Email
              </a>

              <a
                href="https://wa.me/918309467690"
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2"
              >
                <FaWhatsapp />
                WhatsApp
              </a>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2"
              >
                <FaMapMarkerAlt />
                Maps
              </a>

            </div>

            {/* Social Icons */}
            <div className="flex gap-5 mt-8 text-3xl">

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-pink-500 hover:scale-125 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:scale-125 transition"
              >
                <FaFacebook />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:scale-125 transition"
              >
                <FaLinkedin />
              </a>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Owner;