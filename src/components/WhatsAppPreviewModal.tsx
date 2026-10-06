import React, { useState } from 'react';
import { X, CheckCheck, Send, Copy, ExternalLink, MessageCircle, ShieldCheck, User } from 'lucide-react';
import { OrderItem, OrderStatus } from '../types';
import { generateWhatsAppMessage, buildWhatsAppUrl, getStatusLabel, ADMIN_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface WhatsAppPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderItem | null;
  targetStage?: OrderStatus;
}

export const WhatsAppPreviewModal: React.FC<WhatsAppPreviewModalProps> = ({
  isOpen,
  onClose,
  order,
  targetStage
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !order) return null;

  const currentStage = targetStage || order.status;
  const targetPhone = order.customer.whatsapp;
  const messageText = generateWhatsAppMessage(order, currentStage, false);
  const waUrl = buildWhatsAppUrl(targetPhone, messageText);
  const statusInfo = getStatusLabel(currentStage);

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-100 text-sm flex items-center gap-2">
                Kirim Notifikasi Live ke WhatsApp Pelanggan
              </h3>
              <p className="text-xs text-neutral-400">
                Pembaruan Status: <span className="text-amber-400 font-semibold">{statusInfo.label}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dedicated Customer Recipient Badge */}
        <div className="p-3 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div className="text-[11px] text-neutral-300">
              Penerima Notif: <strong className="text-white">{order.customer.name}</strong> (<span className="font-mono text-emerald-400">{order.customer.whatsapp}</span>)
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold border border-emerald-500/20">
            NOTIFIKASI PELANGGAN
          </span>
        </div>

        {/* WhatsApp Mobile Chat Mockup Body */}
        <div className="flex-1 overflow-y-auto p-4 bg-neutral-950 space-y-3 font-sans">
          {/* Simulated WA Header */}
          <div className="bg-[#1f2c34] px-4 py-2.5 rounded-t-xl flex items-center gap-3 border-b border-[#2a3942]">
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
              {order.customer.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[#e9edef] truncate">
                {order.customer.name} (Pelanggan)
              </div>
              <div className="text-xs text-[#8696a0] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> 
                WhatsApp: {order.customer.whatsapp}
              </div>
            </div>
            <div className="text-[10px] text-[#8696a0] px-2 py-0.5 rounded bg-[#111b21] font-mono">
              Resi: {order.orderNumber}
            </div>
          </div>

          {/* WhatsApp Wallpaper container */}
          <div className="p-4 bg-[#0b141a] rounded-b-xl border border-[#2a3942] relative overflow-hidden">
            <div className="flex justify-center mb-3">
              <span className="px-3 py-1 rounded-md bg-[#182229] text-[10px] text-[#8696a0] font-medium shadow-sm font-mono">
                PESAN NOTIFIKASI LANGSUNG KE PELANGGAN
              </span>
            </div>

            {/* The Chat Bubble */}
            <div className="relative max-w-[96%] bg-[#005c4b] text-[#e9edef] p-3.5 rounded-2xl rounded-tl-sm text-xs leading-relaxed whitespace-pre-wrap font-sans shadow-md border border-[#02735e]/40">
              {messageText}

              <div className="mt-2 pt-2 border-t border-[#02735e]/60 flex items-center justify-end gap-1 text-[10px] text-[#8696a0]">
                <span>Sekarang</span>
                <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Copy className="w-4 h-4 text-neutral-400" />
            {copied ? 'Teks Tersalin!' : 'Salin Format'}
          </button>

          <button
            onClick={handleOpenWhatsApp}
            className="w-full sm:flex-1 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all active:scale-[0.99]"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Notif Live ke WA Pelanggan ({order.customer.whatsapp})</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>
      </div>
    </div>
  );
};
