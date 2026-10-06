import React, { useState } from 'react';
import { 
  Sparkles, Clock, ShieldCheck, Check, ShoppingBag, 
  ArrowRight, Star, Info, X, Wrench, Droplets, Layers,
  CheckCircle2, Flame, HeartHandshake, Eye
} from 'lucide-react';
import { ServiceItem, CareProductItem } from '../types';

interface CatalogSectionProps {
  services: ServiceItem[];
  careProducts: CareProductItem[];
  onBookService: (serviceId: string) => void;
  onBuyProduct: (product: CareProductItem) => void;
  onOpenDiagnostic?: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  services,
  careProducts,
  onBookService,
  onBuyProduct,
  onOpenDiagnostic
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'products'>('services');
  
  // Service focus filter: 'all' | 'repair' | 'cleaning'
  const [serviceFocus, setServiceFocus] = useState<'all' | 'repair' | 'cleaning'>('all');
  const [serviceTagFilter, setServiceTagFilter] = useState<string>('all');

  // Product focus filter: 'all' | 'repair' | 'cleaning'
  const [productFocus, setProductFocus] = useState<'all' | 'repair' | 'cleaning'>('all');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');

  const [activeDetailService, setActiveDetailService] = useState<ServiceItem | null>(null);

  // Filter services
  const repairServicesCount = services.filter(s => s.category === 'repair' || s.focusType === 'repair').length;
  const cleaningServicesCount = services.filter(s => s.category === 'cleaning' || s.focusType === 'cleaning').length;

  const filteredServices = services.filter((srv) => {
    // Primary focus filter
    if (serviceFocus === 'repair' && srv.category !== 'repair' && srv.focusType !== 'repair') return false;
    if (serviceFocus === 'cleaning' && srv.category !== 'cleaning' && srv.focusType !== 'cleaning') return false;

    // Sub-tag filter
    if (serviceTagFilter !== 'all') {
      const matchName = srv.name.toLowerCase().includes(serviceTagFilter.toLowerCase());
      const matchDesc = srv.description.toLowerCase().includes(serviceTagFilter.toLowerCase());
      const matchBadge = srv.badge?.toLowerCase().includes(serviceTagFilter.toLowerCase());
      if (!matchName && !matchDesc && !matchBadge) return false;
    }

    return true;
  });

  // Filter products
  const repairProductsCount = careProducts.filter(p => p.category === 'repair' || p.focusType === 'repair').length;
  const cleaningProductsCount = careProducts.filter(p => p.category !== 'repair' || p.focusType === 'cleaning').length;

  const filteredProducts = careProducts.filter((prod) => {
    // Primary focus filter
    if (productFocus === 'repair' && prod.category !== 'repair' && prod.focusType !== 'repair') return false;
    if (productFocus === 'cleaning' && prod.category === 'repair' && prod.focusType !== 'cleaning') return false;

    // Category sub-filter
    if (productCategoryFilter !== 'all') {
      if (productCategoryFilter === 'cleaner' && prod.category !== 'cleaner') return false;
      if (productCategoryFilter === 'brush' && prod.category !== 'brush') return false;
      if (productCategoryFilter === 'spray' && prod.category !== 'spray') return false;
      if (productCategoryFilter === 'repair' && prod.category !== 'repair') return false;
    }

    return true;
  });

  return (
    <section id="catalog" className="py-16 px-4 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Spesialisasi 2 Pilar Utama
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
              🛠️ Perbaikan Lengkap
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              ✨ Pembersihan Mendalam
            </span>
            {onOpenDiagnostic && (
              <button
                type="button"
                onClick={onOpenDiagnostic}
                className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400/20 font-bold transition-colors ml-auto md:ml-0"
              >
                🩺 Diagnosa Sepatu Kamu
              </button>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
            Katalog Layanan & Produk Perawatan
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
            Fokus tuntas pada dua keahlian utama kami: <strong className="text-neutral-200">Perbaikan Lengkap</strong> (lem sol copot heat-press, jahit 360°, heel drag rebuild, sole swap, repaint kulit retak) dan <strong className="text-neutral-200">Pembersihan</strong> (deep clean 360°, unyellowing sol kuning, canvas whitening, spa kulit formal).
          </p>
        </div>

        {/* Main Tab Switcher: Layanan vs Produk */}
        <div className="flex p-1 bg-neutral-900 border border-neutral-800 rounded-2xl w-fit flex-shrink-0 shadow-lg">
          <button
            onClick={() => {
              setActiveTab('services');
              setServiceFocus('all');
              setServiceTagFilter('all');
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'services'
                ? 'bg-amber-400 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Layanan Treatment ({services.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('products');
              setProductFocus('all');
              setProductCategoryFilter('all');
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-amber-400 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Produk Perawatan ({careProducts.length})
          </button>
        </div>
      </div>

      {/* =========================================================================
          PRIMARY FOCUS SELECTOR (Perbaikan Lengkap VS Pembersihan)
          ========================================================================= */}
      {activeTab === 'services' ? (
        <div className="space-y-4 mb-8">
          {/* Main 2-Pillar Switch Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => {
                setServiceFocus('all');
                setServiceTagFilter('all');
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                serviceFocus === 'all'
                  ? 'bg-neutral-800/90 border-amber-400 text-white shadow-md'
                  : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                  serviceFocus === 'all' ? 'bg-amber-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">Semua Layanan</div>
                  <div className="text-[11px] text-neutral-500">Perbaikan & Pembersihan</div>
                </div>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-neutral-950/80 text-amber-400 border border-neutral-800">
                {services.length} Paket
              </span>
            </button>

            <button
              onClick={() => {
                setServiceFocus('repair');
                setServiceTagFilter('all');
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                serviceFocus === 'repair'
                  ? 'bg-blue-950/40 border-blue-400 text-white shadow-md shadow-blue-950/50'
                  : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-blue-900 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                  serviceFocus === 'repair' ? 'bg-blue-500 text-white' : 'bg-neutral-800 text-blue-400'
                }`}>
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-blue-300">Perbaikan Lengkap & Reparasi</div>
                  <div className="text-[11px] text-neutral-400">Reglue, Jahit, Swap Sol, Filler Kulit</div>
                </div>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-neutral-950/80 text-blue-400 border border-blue-900/50">
                {repairServicesCount} Layanan
              </span>
            </button>

            <button
              onClick={() => {
                setServiceFocus('cleaning');
                setServiceTagFilter('all');
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                serviceFocus === 'cleaning'
                  ? 'bg-emerald-950/40 border-emerald-400 text-white shadow-md shadow-emerald-950/50'
                  : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-emerald-900 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                  serviceFocus === 'cleaning' ? 'bg-emerald-500 text-white' : 'bg-neutral-800 text-emerald-400'
                }`}>
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-emerald-300">Pembersihan Mendalam & Spa</div>
                  <div className="text-[11px] text-neutral-400">Deep Clean, Unyellowing, UV Steril</div>
                </div>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-neutral-950/80 text-emerald-400 border border-emerald-900/50">
                {cleaningServicesCount} Layanan
              </span>
            </button>
          </div>

          {/* Quick Sub-Filter Tags */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
            <span className="text-[11px] text-neutral-500 uppercase font-mono mr-1 flex-shrink-0">Filter Spesifik:</span>
            {[
              { id: 'all', label: 'Tampilkan Semua' },
              ...(serviceFocus === 'all' || serviceFocus === 'repair' ? [
                { id: 'reglue', label: 'Lem Sol Copot & Reglue' },
                { id: 'jahit', label: 'Jahit Sol 360° & Upper' },
                { id: 'heel', label: 'Heel Drag & Tambal Tumit' },
                { id: 'swap', label: 'Sole Swap & Sol Remuk' },
                { id: 'repaint', label: 'Repaint & Kulit Retak' },
                { id: 'protector', label: 'Sole Protector 3M' }
              ] : []),
              ...(serviceFocus === 'all' || serviceFocus === 'cleaning' ? [
                { id: 'deep clean', label: 'Deep Clean 360°' },
                { id: 'fast clean', label: 'Fast Clean Express 24h' },
                { id: 'unyellowing', label: 'Unyellowing Sol Kuning' },
                { id: 'canvas', label: 'Canvas Whitening' },
                { id: 'leather spa', label: 'Leather & Suede Spa' },
                { id: 'ozon', label: 'Sterilisasi Ozon & UV' }
              ] : [])
            ].map((tag) => (
              <button
                key={tag.id}
                onClick={() => setServiceTagFilter(tag.id)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-medium transition-all whitespace-nowrap ${
                  serviceTagFilter === tag.id
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* PRODUCT FOCUS & CATEGORY SELECTOR */
        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => {
                setProductFocus('all');
                setProductCategoryFilter('all');
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                productFocus === 'all'
                  ? 'bg-neutral-800/90 border-amber-400 text-white shadow-md'
                  : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                  productFocus === 'all' ? 'bg-amber-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">Semua Produk Perawatan</div>
                  <div className="text-[11px] text-neutral-500">Perbaikan & Pembersih</div>
                </div>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-neutral-950/80 text-amber-400 border border-neutral-800">
                {careProducts.length} Produk
              </span>
            </button>

            <button
              onClick={() => {
                setProductFocus('repair');
                setProductCategoryFilter('all');
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                productFocus === 'repair'
                  ? 'bg-blue-950/40 border-blue-400 text-white shadow-md shadow-blue-950/50'
                  : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-blue-900 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                  productFocus === 'repair' ? 'bg-blue-500 text-white' : 'bg-neutral-800 text-blue-400'
                }`}>
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-blue-300">Produk Perbaikan Lengkap</div>
                  <div className="text-[11px] text-neutral-400">Lem PU, Leather Filler, Sole Guard, Shield</div>
                </div>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-neutral-950/80 text-blue-400 border border-blue-900/50">
                {repairProductsCount} Produk
              </span>
            </button>

            <button
              onClick={() => {
                setProductFocus('cleaning');
                setProductCategoryFilter('all');
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                productFocus === 'cleaning'
                  ? 'bg-emerald-950/40 border-emerald-400 text-white shadow-md shadow-emerald-950/50'
                  : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-emerald-900 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                  productFocus === 'cleaning' ? 'bg-emerald-500 text-white' : 'bg-neutral-800 text-emerald-400'
                }`}>
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-emerald-300">Produk Pembersihan & Spa</div>
                  <div className="text-[11px] text-neutral-400">Starter Kit, Foam, Unyellowing, Sikat</div>
                </div>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-neutral-950/80 text-emerald-400 border border-emerald-900/50">
                {cleaningProductsCount} Produk
              </span>
            </button>
          </div>

          {/* Product Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
            <span className="text-[11px] text-neutral-500 uppercase font-mono mr-1 flex-shrink-0">Kategori:</span>
            {[
              { id: 'all', label: 'Semua Kategori' },
              { id: 'cleaner', label: 'Foam Cleaner & Kit Starter' },
              { id: 'repair', label: 'Bahan Reparasi & Lem' },
              { id: 'brush', label: 'Sikat Detailing & Bulu Kuda' },
              { id: 'spray', label: 'Waterproof Spray & Nano' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setProductCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-medium transition-all whitespace-nowrap ${
                  productCategoryFilter === cat.id
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          GRID: SERVICES VIEW
          ========================================================================= */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv) => {
            const isRepair = srv.category === 'repair' || srv.focusType === 'repair';

            return (
              <div
                key={srv.id}
                className="group bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-amber-500/5"
              >
                <div>
                  {/* Image header */}
                  <div className="relative h-52 overflow-hidden bg-neutral-950">
                    <img
                      src={srv.imageUrl}
                      alt={srv.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

                    {/* Focus Pillar Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full backdrop-blur-md border ${
                        isRepair
                          ? 'bg-blue-950/85 text-blue-300 border-blue-500/40 shadow-sm'
                          : 'bg-emerald-950/85 text-emerald-300 border-emerald-500/40 shadow-sm'
                      }`}>
                        {isRepair ? '🛠️ PERBAIKAN LENGKAP' : '✨ PEMBERSIHAN MENDALAM'}
                      </span>

                      {srv.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/75 text-amber-300 border border-amber-400/30 backdrop-blur-sm">
                          {srv.badge}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300">
                      <span className="flex items-center gap-1 font-mono text-[11px] bg-black/70 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        SLA: {srv.durationHours} Jam
                      </span>
                      <span className="flex items-center gap-1 text-[11px] bg-black/70 px-2 py-0.5 rounded-md text-emerald-400 backdrop-blur-sm">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {srv.warranty}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {srv.name}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {srv.description}
                    </p>

                    {/* Key Benefits mini list */}
                    <div className="space-y-1.5 pt-2 border-t border-neutral-800/80 text-xs text-neutral-300">
                      {srv.benefits.slice(0, 2).map((b, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1 text-[11px]">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & Booking CTA */}
                <div className="p-5 pt-0">
                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Estimasi Biaya</span>
                      <span className="font-mono text-lg font-extrabold text-amber-400">
                        Rp {srv.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveDetailService(srv)}
                        className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                        title="Detail Lengkap & Garansi"
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onBookService(srv.id)}
                        className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-400/20 active:scale-95"
                      >
                        Booking Antrean
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================================================
          GRID: CARE PRODUCTS VIEW
          ========================================================================= */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => {
            const isRepairProd = prod.category === 'repair' || prod.focusType === 'repair';

            return (
              <div
                key={prod.id}
                className="group bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-amber-500/5"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-neutral-950">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />

                    {/* Product Focus Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full backdrop-blur-md border ${
                        isRepairProd
                          ? 'bg-blue-950/85 text-blue-300 border-blue-500/40 shadow-sm'
                          : 'bg-emerald-950/85 text-emerald-300 border-emerald-500/40 shadow-sm'
                      }`}>
                        {isRepairProd ? '🛠️ PRODUK PERBAIKAN' : '✨ PRODUK PEMBERSIHAN'}
                      </span>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-900/80 text-neutral-300 border border-neutral-800 backdrop-blur-sm">
                        {prod.volumeOrSpec}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-[11px] bg-black/75 px-2 py-0.5 rounded-md text-amber-400 font-bold backdrop-blur-sm">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {prod.rating} ({prod.salesCount}+ terjual)
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Stok: {prod.stock} unit
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>
                </div>

                {/* Footer: Price & Order Action */}
                <div className="p-5 pt-0">
                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Harga Satuan</span>
                      <span className="font-mono text-lg font-extrabold text-amber-400">
                        Rp {prod.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onBuyProduct(prod)}
                      className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 hover:border-amber-400/50"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                      Beli Produk
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {activeTab === 'services' && filteredServices.length === 0 && (
        <div className="py-16 text-center text-neutral-500 text-xs">
          Tidak ada layanan treatment yang cocok dengan filter yang dipilih.
        </div>
      )}
      {activeTab === 'products' && filteredProducts.length === 0 && (
        <div className="py-16 text-center text-neutral-500 text-xs">
          Tidak ada produk perawatan yang cocok dengan filter yang dipilih.
        </div>
      )}

      {/* Service Detail Modal */}
      {activeDetailService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    activeDetailService.category === 'repair' || activeDetailService.focusType === 'repair'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}>
                    {activeDetailService.category === 'repair' || activeDetailService.focusType === 'repair' ? '🛠️ Perbaikan Lengkap' : '✨ Pembersihan Mendalam'}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    SLA: {activeDetailService.durationHours} Jam
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1.5">
                  {activeDetailService.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveDetailService(null)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              {activeDetailService.description}
            </p>

            {/* Benefits */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-neutral-200 block">Kelebihan & Prosedur Pengerjaan:</span>
              {activeDetailService.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Recommended For */}
            <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800 text-xs space-y-1">
              <span className="font-bold text-neutral-300">Direkomendasikan Untuk:</span>
              <p className="text-neutral-400">
                {activeDetailService.recommendedFor.join(', ')}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-neutral-800">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Harga Layanan</span>
                <span className="font-mono text-xl font-bold text-amber-400">
                  Rp {activeDetailService.price.toLocaleString('id-ID')}
                </span>
              </div>

              <button
                onClick={() => {
                  const srvId = activeDetailService.id;
                  setActiveDetailService(null);
                  onBookService(srvId);
                }}
                className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95"
              >
                Booking Layanan Ini Sekarang
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
