import { MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK } from '../../../utils/constants';

const WhatsAppFloat = () => {
  return (
    <a
      href={WHATSAPP_LINK()}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-50 inline-flex size-13 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-xl transition hover:bg-[#26594c] sm:bottom-6 sm:right-6 sm:size-14"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
};

export default WhatsAppFloat;
