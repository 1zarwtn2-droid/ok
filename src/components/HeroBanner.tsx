import React, { useState } from 'react';
import { 
  Sparkles, Calendar, Search, ShieldCheck, MessageCircle, 
  ArrowRight, CheckCircle2, Zap, Clock, Smartphone 
} from 'lucide-react';

interface HeroBannerProps {
  onOpenBooking: () => void;
  onQuickTrack: (orderNumber: string) => void;
  activeOrdersCount: number;
  onOpenDiagnostic?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenBooking,
  onQuickTrack,
  activeOrdersCount,
  onOpenDiagnostic
}) => {
  const [resiQuery, setResiQuery] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resiQuery.trim()) return;
    onQuickTrack(resiQuery.trim());
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-neutral-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950">
      {/* Subtle grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#26262615_1px,transparent_1px),linear-gradient(to_bottom,#26262615_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Live Pill Announcement */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-amber-400 font-bold font-mono">LIVE UPDATE</span>
              <span className="text-neutral-500">·</span>
              <span>Sistem Notifikasi WhatsApp Aktif & Antrean Terbuka</span>
              {onOpenDiagnostic && (
                <button
                  type="button"
                  onClick={onOpenDiagnostic}
                  className="ml-2 text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold hover:bg-amber-400/30 transition-colors"
                >
                  🩺 Cek Diagnosa Sepatu
                </button>
              )}
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Servis Sepatu Premium dengan{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                Notifikasi WhatsApp Real-Time
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
              Platform perawatan dan restorasi sneaker terlengkap. Reservasi antrean tanpa antre di toko, pelacakan live status pengerjaan, foto QC before/after, pembayaran digital terintegrasi, dan garansi bersih 48 jam.
            </p>

            {/* Action Buttons & Resi Search */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-400/20 transition-all active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4" />
                  Booking Antrean Sekarang
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#catalog"
                  className="px-6 py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Lihat Katalog Treatment
                </a>
              </div>

              {/* Quick Tracking input in hero */}
              <form onSubmit={handleTrackSubmit} className="pt-2 max-w-md">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={resiQuery}
                    onChange={(e) => setResiQuery(e.target.value)}
                    placeholder="Punya Nomor Resi? Contoh: SC-2026-9411"
                    className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-200 placeholder:text-neutral-500 focus:border-amber-400 outline-none shadow-sm font-mono"
                  />
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3 pointer-events-none" />
                  <button
                    type="submit"
                    className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-bold text-xs transition-colors"
                  >
                    Lacak Live
                  </button>
                </div>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-neutral-900 grid grid-cols-3 gap-3 text-left">
              <div>
                <div className="font-mono font-extrabold text-base sm:text-xl text-white">14.800+</div>
                <div className="text-[11px] text-neutral-500">Sepatu Dibersihkan</div>
              </div>
              <div>
                <div className="font-mono font-extrabold text-base sm:text-xl text-amber-400">4.9 / 5.0</div>
                <div className="text-[11px] text-neutral-500">Tingkat Kepuasan</div>
              </div>
              <div>
                <div className="font-mono font-extrabold text-base sm:text-xl text-emerald-400">48 Jam</div>
                <div className="text-[11px] text-neutral-500">Garansi Bersih Ulang</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Live WhatsApp Simulation & Sneaker Inspection */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 shadow-2xl backdrop-blur-sm space-y-4">
              {/* Top tag */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-neutral-200">Live Workshop Cam & Tracker</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-amber-400">
                  SL-STATION #02
                </span>
              </div>

              {/* Sneaker Visual Before-After Card */}
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 aspect-[16/10]">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
                  alt="Sneaker Care Inspection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="font-bold text-white bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                    Nike Air Jordan 1 Chicago
                  </span>
                  <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-lg">
                    Deep Clean & Unyellowing
                  </span>
                </div>
              </div>

              {/* Simulated Floating WhatsApp Notification Alert */}
              <div className="bg-[#111b21] p-3.5 rounded-2xl border border-[#2a3942] space-y-2 shadow-xl">
                <div className="flex items-center justify-between text-[11px] text-[#8696a0]">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Notification System</span>
                  </div>
                  <span>Baru Saja</span>
                </div>

                <div className="bg-[#005c4b] p-3 rounded-xl rounded-tl-sm text-xs text-[#e9edef] space-y-1">
                  <p className="font-bold text-white text-[11px]">
                    ✨ SEPATU SELESAI & LOLOS QUALITY CONTROL
                  </p>
                  <p className="text-[11px] text-neutral-200 leading-relaxed">
                    Halo Kak Rizky, sepatu <strong>Air Jordan 1</strong> Anda telah selesai dikeringkan dan wangi. Siap diambil di studio!
                  </p>
                  <div className="text-[10px] text-emerald-200/80 pt-1 font-mono">
                    Lacak detail: shoelab.id/track?id=SC-2026-9411
                  </div>
                </div>
              </div>

              {/* Bottom Feature Badges */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2 text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-[11px]">Formula Aman Serat</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2 text-neutral-300">
                  <Smartphone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="text-[11px]">QRIS Instan Otomatis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
