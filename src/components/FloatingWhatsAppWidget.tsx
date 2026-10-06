import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

export const FloatingWhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickQuestions = [
    {
      title: 'Tanya Kuota Antrean Hari Ini',
      text: 'Halo ShoeLab CS, saya mau tanya apakah slot antrean treatment pengerjaan hari ini masih tersedia?'
    },
    {
      title: 'Konsultasi Bahan Suede & Nubuck',
      text: 'Halo, saya punya sneaker bahan Suede yang terkena air hujan & kusam, treatment apa yang paling aman?'
    },
    {
      title: 'Tanya Biaya Unyellowing Sol',
      text: 'Halo ShoeLab, berapa estimasi biaya dan durasi untuk unyellowing sol Jordan/Air Force 1 saya?'
    },
    {
      title: 'Klaim Garansi Pengerjaan 48 Jam',
      text: 'Halo admin, saya ingin klaim garansi bersih 48 jam untuk pesanan saya.'
    }
  ];

  const handleSend = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/6281234567890?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-200">
          {/* Top header */}
          <div className="p-4 bg-[#075e54] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 border border-emerald-400/40 flex items-center justify-center font-bold text-sm">
                SL
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">ShoeLab Live CS</h4>
                <p className="text-[11px] text-emerald-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300"></span> Online • Respon Cepat
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick FAQ buttons */}
          <div className="p-4 bg-[#0b141a] space-y-2.5 max-h-72 overflow-y-auto">
            <p className="text-xs text-neutral-400 mb-2">
              Pilih pertanyaan cepat atau ketik pesan Anda:
            </p>

            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q.text)}
                className="w-full text-left p-2.5 rounded-xl bg-[#111b21] hover:bg-[#182229] border border-[#2a3942] text-xs text-neutral-200 transition-colors flex items-center justify-between group"
              >
                <span className="group-hover:text-amber-400 transition-colors">{q.title}</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400" />
              </button>
            ))}
          </div>

          {/* Bottom input */}
          <div className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ketik pertanyaan Anda..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customMsg.trim()) {
                  handleSend(customMsg);
                  setCustomMsg('');
                }
              }}
              className="flex-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 outline-none focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={() => {
                if (customMsg.trim()) {
                  handleSend(customMsg);
                  setCustomMsg('');
                }
              }}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Circle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-950 border border-emerald-400/30 flex items-center gap-2.5 transition-all active:scale-95"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline text-xs font-bold">
          Chat WhatsApp CS
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 absolute top-1 right-1 animate-ping" />
      </button>
    </div>
  );
};
