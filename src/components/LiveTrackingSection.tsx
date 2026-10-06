import React, { useState } from 'react';
import { 
  Search, CheckCircle2, Clock, MapPin, User, MessageCircle, 
  FileText, Star, AlertCircle, ArrowRight, ShieldCheck, Sparkles, ExternalLink
} from 'lucide-react';
import { OrderItem, OrderStatus } from '../types';
import { getStatusLabel, buildWhatsAppUrl, generateWhatsAppMessage } from '../utils/whatsapp';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface LiveTrackingSectionProps {
  orders: OrderItem[];
  selectedOrderNumber?: string;
  onOpenReceipt: (order: OrderItem) => void;
  onOpenWhatsAppModal: (order: OrderItem) => void;
  onOpenReviewModal: (order: OrderItem) => void;
}

const ORDER_STAGES: { key: OrderStatus; title: string; subtitle: string }[] = [
  { key: 'BOOKING_CONFIRMED', title: 'Booking Dikonfirmasi', subtitle: 'Slot antrean terdaftar' },
  { key: 'SHOES_RECEIVED', title: 'Tiba di Workshop', subtitle: 'Inspeksi & QC material awal' },
  { key: 'IN_TREATMENT', title: 'Pengerjaan Treatment', subtitle: 'Proses cuci / restorasi aktif' },
  { key: 'DRYING_DETAILING', title: 'Pengeringan & QC', subtitle: 'Sterilisasi & final touch' },
  { key: 'READY_PICKUP_DELIVERY', title: 'Siap Diambil / Kirim', subtitle: 'Sepatu 100% bersih & wangi' }
];

export const LiveTrackingSection: React.FC<LiveTrackingSectionProps> = ({
  orders,
  selectedOrderNumber,
  onOpenReceipt,
  onOpenWhatsAppModal,
  onOpenReviewModal
}) => {
  const [searchInput, setSearchInput] = useState(selectedOrderNumber || '');
  const [searchedId, setSearchedId] = useState(selectedOrderNumber || orders[0]?.orderNumber || '');

  // Synchronize if selectedOrderNumber changes from outside
  React.useEffect(() => {
    if (selectedOrderNumber) {
      setSearchInput(selectedOrderNumber);
      setSearchedId(selectedOrderNumber);
    }
  }, [selectedOrderNumber]);

  const currentOrder = orders.find(
    o => o.orderNumber.toLowerCase() === searchedId.trim().toLowerCase()
  ) || orders[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setSearchedId(searchInput.trim());
  };

  const getStageIndex = (status: OrderStatus) => {
    if (status === 'COMPLETED') return 5;
    const idx = ORDER_STAGES.findIndex(s => s.key === status);
    return idx >= 0 ? idx : 0;
  };

  const currentStageIndex = currentOrder ? getStageIndex(currentOrder.status) : 0;
  const statusInfo = currentOrder ? getStatusLabel(currentOrder.status) : null;

  return (
    <section id="tracking" className="py-16 px-4 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
          Live Service Tracking Engine
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Pelacakan Otomatis Status Sepatu
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2">
          Pantau setiap tahapan pengerjaan sepatu Anda secara transparan dari inspeksi awal, proses pencucian, hingga siap dikirim kembali.
        </p>
      </div>

      {/* Tracking Search Bar */}
      <div className="max-w-xl mx-auto mb-10">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Masukkan Nomor Resi Anda (Contoh: SC-2026-9411)"
            className="w-full pl-12 pr-32 py-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-500 text-sm focus:border-amber-400 focus:outline-none shadow-xl"
          />
          <Search className="w-5 h-5 text-neutral-400 absolute left-4 pointer-events-none" />
          <button
            type="submit"
            className="absolute right-2 px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-colors shadow-md"
          >
            Lacak
          </button>
        </form>

        {/* Quick select pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mt-3 text-xs text-neutral-400">
          <span className="text-[11px] text-neutral-500">Coba Resi Demo:</span>
          {orders.slice(0, 3).map((ord) => (
            <button
              key={ord.id}
              onClick={() => {
                setSearchInput(ord.orderNumber);
                setSearchedId(ord.orderNumber);
              }}
              className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-[11px] font-mono transition-colors"
            >
              {ord.orderNumber} ({ord.shoe.brand})
            </button>
          ))}
        </div>
      </div>

      {/* Active Order Tracking Display */}
      {currentOrder ? (
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          {/* Top Order Information */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-mono font-bold text-white tracking-wide">
                  {currentOrder.orderNumber}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${statusInfo?.color}`}>
                  {statusInfo?.badgeText}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                <span>Pelanggan: <strong className="text-neutral-200">{currentOrder.customer.name}</strong></span>
                <span>·</span>
                <span>Masuk: {currentOrder.createdAt}</span>
                <span>·</span>
                <span className="text-emerald-400">
                  {currentOrder.paymentStatus === 'PAID' ? 'Lunas Terverifikasi' : 'Menunggu Bayar'}
                </span>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2.5">
              <button
                onClick={() => onOpenWhatsAppModal(currentOrder)}
                className="px-4 py-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                Kirim Update via WhatsApp
              </button>

              <button
                onClick={() => onOpenReceipt(currentOrder)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-neutral-700"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                Struk Digital
              </button>

              {currentOrder.status === 'COMPLETED' && (
                <button
                  onClick={() => onOpenReviewModal(currentOrder)}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <Star className="w-4 h-4 fill-neutral-950" />
                  Beri Ulasan
                </button>
              )}
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="py-8">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative">
              {ORDER_STAGES.map((stage, index) => {
                const isPassed = index <= currentStageIndex;
                const isCurrent = index === currentStageIndex;

                return (
                  <div key={stage.key} className="flex flex-col items-center text-center relative z-10">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs transition-all ${
                        isCurrent
                          ? 'bg-amber-400 text-neutral-950 ring-4 ring-amber-400/20 shadow-lg shadow-amber-400/30'
                          : isPassed
                          ? 'bg-emerald-500 text-neutral-950'
                          : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                    </div>

                    <div className="mt-3">
                      <div className={`text-xs font-bold ${isPassed ? 'text-neutral-100' : 'text-neutral-500'}`}>
                        {stage.title}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                        {stage.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Content Columns: Shoe Details & Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-neutral-800">
            {/* Column 1: Shoe & Service Info */}
            <div className="space-y-4">
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800/90 space-y-3">
                <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400 block">
                  Detail Sepatu Pelanggan
                </span>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 flex-shrink-0">
                    <img
                      src={currentOrder.shoe.photoBeforeUrl || currentOrder.shoe.photoAfterUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80'}
                      alt={currentOrder.shoe.model}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">
                      {currentOrder.shoe.brand} {currentOrder.shoe.model}
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Material: <span className="text-neutral-200">{currentOrder.shoe.material}</span>
                    </p>
                    <p className="text-xs text-neutral-400">
                      Warna: <span className="text-neutral-200">{currentOrder.shoe.color}</span>
                    </p>
                  </div>
                </div>

                {currentOrder.shoe.conditionNote && (
                  <div className="p-2.5 rounded-xl bg-neutral-900 text-xs text-neutral-400 border border-neutral-800">
                    <span className="font-semibold text-neutral-300">Catatan Kondisi Awal:</span>
                    <p className="italic mt-0.5">&ldquo;{currentOrder.shoe.conditionNote}&rdquo;</p>
                  </div>
                )}
              </div>

              {/* Technician assigned */}
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800/90 space-y-2">
                <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400 block">
                  Teknisi Penanggung Jawab
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-neutral-100">{currentOrder.technicianName}</h5>
                    <p className="text-xs text-neutral-400">Master Shoe Care Specialist</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-900">
                  <span>Estimasi Selesai:</span>
                  <span className="font-semibold text-neutral-200">{currentOrder.estimatedCompletion}</span>
                </div>
              </div>
            </div>

            {/* Column 2: Before & After Inspection Photo Gallery with Interactive Slider */}
            <div className="space-y-4">
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800/90 space-y-3">
                <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400 block">
                  Dokumentasi QC Interaktif (Before & After Slider)
                </span>

                <BeforeAfterSlider
                  beforeImage={currentOrder.shoe.photoBeforeUrl || 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80'}
                  afterImage={currentOrder.shoe.photoAfterUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'}
                  beforeLabel="SEBELUM CUCI"
                  afterLabel="HASIL FINISHING"
                />

                {currentOrder.courierTracking && (
                  <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-emerald-400 font-bold text-[11px]">
                      <span>🛵 {currentOrder.courierTracking.courierName}</span>
                      <span className="font-mono text-neutral-400">{currentOrder.courierTracking.trackingCode}</span>
                    </div>
                    <p className="text-neutral-300 text-[11px]">
                      Driver: {currentOrder.courierTracking.driverName}
                    </p>
                    <p className="text-neutral-500 text-[10px]">
                      Status: {currentOrder.courierTracking.status}
                    </p>
                  </div>
                )}
              </div>

              {/* Treatment and price overview */}
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800/90 text-xs space-y-1.5">
                <div className="flex justify-between text-neutral-300">
                  <span className="font-semibold">{currentOrder.serviceName}</span>
                  <span className="font-mono">Rp {currentOrder.servicePrice.toLocaleString('id-ID')}</span>
                </div>
                {currentOrder.additionalShoes && currentOrder.additionalShoes.map((extra, i) => (
                  <div key={i} className="flex justify-between text-emerald-400">
                    <span>+ Pasang #{i + 2}: {extra.brand} {extra.model}</span>
                    <span className="font-mono">Rp {extra.treatmentPrice?.toLocaleString('id-ID')}</span>
                  </div>
                ))}
                {currentOrder.addOns.map(a => (
                  <div key={a.id} className="flex justify-between text-neutral-400">
                    <span>+ {a.name}</span>
                    <span className="font-mono">Rp {a.price.toLocaleString('id-ID')}</span>
                  </div>
                ))}
                {currentOrder.discountAmount && currentOrder.discountAmount > 0 ? (
                  <div className="flex justify-between text-emerald-400">
                    <span>Voucher ({currentOrder.voucherCode})</span>
                    <span className="font-mono">-Rp {currentOrder.discountAmount.toLocaleString('id-ID')}</span>
                  </div>
                ) : null}
                <div className="pt-2 border-t border-neutral-800 flex justify-between items-center font-bold text-white">
                  <span>Total Tagihan:</span>
                  <span className="font-mono text-amber-400 text-sm">Rp {currentOrder.totalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            {/* Column 3: Live Activity Log */}
            <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800/90 flex flex-col">
              <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400 block mb-3">
                Log Riwayat Pengerjaan Live
              </span>

              <div className="flex-1 space-y-4 overflow-y-auto max-h-[300px] pr-1">
                {currentOrder.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-3 text-xs">
                    <div className="relative flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1" />
                      {idx !== currentOrder.timeline.length - 1 && (
                        <div className="w-0.5 flex-1 bg-neutral-800 my-1" />
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <div className="font-bold text-neutral-200">{item.title}</div>
                      <p className="text-neutral-400 text-[11px] leading-relaxed">
                        {item.description}
                      </p>
                      <div className="text-[10px] text-neutral-500 font-mono">
                        {item.timestamp} · oleh {item.updatedBy}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct WhatsApp help link */}
              <div className="pt-3 border-t border-neutral-900 mt-3">
                <a
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo CS ShoeLab, saya ingin menanyakan pesanan saya dengan nomor resi ${currentOrder.orderNumber}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-neutral-800"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Chat Langsung dengan CS / Teknisi
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-neutral-500 text-sm">
          Nomor resi tidak ditemukan. Silakan periksa kembali nomor pesanan Anda.
        </div>
      )}
    </section>
  );
};
