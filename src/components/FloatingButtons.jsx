import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

function FloatingButtons() {
  return (
    <>
      {/* Call */}
      <a
        href="tel:+918309467690"
        className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition animate-bounce"
      >
        <FaPhoneAlt className="text-white text-2xl" />
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/918309467690"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition animate-bounce"
      >
        <FaWhatsapp className="text-white text-3xl" />
      </a>
    </>
  );
}

export default FloatingButtons;