import React, { useState } from 'react';
import { Sparkles, Calendar, Search, ShieldCheck, Menu, X, Shield, MessageCircle, Layers, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  activeOrdersCount: number;
  onQuickTrack: (orderNumber: string) => void;
  onRequestAdminAccess: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  activeOrdersCount,
  onQuickTrack,
  onRequestAdminAccess
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickTrackInput, setQuickTrackInput] = useState('');

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTrackInput.trim()) return;
    onQuickTrack(quickTrackInput.trim());
    setQuickTrackInput('');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-black text-base shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              SL
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
                SHOELAB <span className="text-amber-400 font-semibold">STUDIO</span>
              </div>
              <div className="text-[10px] text-neutral-400 font-mono tracking-wider">
                PREMIUM SNEAKER CARE
              </div>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links for Customers */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-neutral-300">
          <a href="#catalog" className="hover:text-amber-400 transition-colors">
            Katalog Layanan
          </a>
          <a href="#tracking" className="hover:text-amber-400 transition-colors">
            Lacak Sepatu
          </a>
          <a href="#reviews" className="hover:text-amber-400 transition-colors">
            Ulasan Pelanggan
          </a>
          <a href="#about" className="hover:text-amber-400 transition-colors">
            Garansi & Lokasi
          </a>
        </nav>

        {/* Live Workshop Queue Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-neutral-400 text-[11px]">
            Workshop Aktif: <strong className="text-neutral-200">{activeOrdersCount} Pasang</strong> dalam antrean
          </span>
        </div>

        {/* Right Actions: Staff Portal Access & Booking CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dedicated Staff Access Link */}
          <button
            type="button"
            onClick={onRequestAdminAccess}
            className="px-3 py-1.5 rounded-xl border border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-amber-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
            title="Masuk ke Console Staff & Admin Workshop"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Portal Staff</span>
          </button>

          {/* Booking CTA Button */}
          <button
            onClick={onOpenBooking}
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-400/20 transition-all active:scale-95 whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Booking Antrean</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-5 bg-neutral-950 border-b border-neutral-800 space-y-4 animate-in slide-in-from-top duration-150">
          {/* Quick Resi Search on Mobile */}
          <form onSubmit={handleQuickTrackSubmit} className="relative">
            <input
              type="text"
              placeholder="Lacak No. Resi..."
              value={quickTrackInput}
              onChange={(e) => setQuickTrackInput(e.target.value)}
              className="w-full pl-9 pr-16 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder:text-neutral-500"
            />
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 px-3 py-1 bg-amber-400 text-neutral-950 rounded-lg text-[10px] font-bold"
            >
              Cari
            </button>
          </form>

          <nav className="flex flex-col gap-2 text-xs font-medium text-neutral-300">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-neutral-900"
            >
              Katalog Layanan & Treatment
            </a>
            <a
              href="#tracking"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-neutral-900"
            >
              Lacak Sepatu Real-time
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-neutral-900"
            >
              Ulasan Pelanggan Terverifikasi
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-neutral-900"
            >
              Garansi & Lokasi Studio
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestAdminAccess();
              }}
              className="p-2 text-left rounded-lg text-amber-300 font-semibold bg-neutral-900 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                Portal Staff & Admin Workshop
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
