import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "5215512345678"; // Replace with actual WhatsApp number
  const message = "Hola, me gustaría recibir más información sobre Venezia Tower House.";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lift flex items-center justify-center transition-smooth animate-pulse-opacity group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} className="group-hover:scale-110 transition-smooth" />
    </button>
  );
};

export default WhatsAppButton;
