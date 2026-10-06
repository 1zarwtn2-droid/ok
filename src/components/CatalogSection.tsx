import React, { useState } from 'react';
import { 
  Sparkles, Clock, ShieldCheck, Check, ShoppingBag, 
  ArrowRight, Star, Info, X, Zap
} from 'lucide-react';
import { ServiceItem, CareProductItem, ServiceCategory } from '../types';

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
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string>('all');
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>('all');
  const [activeDetailService, setActiveDetailService] = useState<ServiceItem | null>(null);

  const filteredServices = services.filter((s) => {
    if (selectedServiceCategory === 'all') return true;
    return s.category === selectedServiceCategory;
  });

  const filteredProducts = careProducts.filter((p) => {
    if (selectedProductCategory === 'all') return true;
    return p.category === selectedProductCategory;
  });

  return (
    <section id="catalog" className="py-16 px-4 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Real-time Treatment & Product Catalog
            </span>
            {onOpenDiagnostic && (
              <button
                type="button"
                onClick={onOpenDiagnostic}
                className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400/20 font-bold transition-colors"
              >
                🩺 Diagnosa Sepatu Kamu
              </button>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Katalog Layanan & Produk Perawatan
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-xl">
            Pilihan 13+ perawatan sneaker terlengkap: deoksidasi sol kuning, whitening kanvas, sole protector 3M, repair sol lepas, hingga spa kulit formal dengan garansi resmi.
          </p>
        </div>

        {/* Main Tab Switcher */}
        <div className="flex p-1 bg-neutral-900 border border-neutral-800 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'services'
                ? 'bg-amber-400 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Paket Treatment Sepatu ({services.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
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

      {/* Category Pills (Button filters compliant with Zero-Pill rule) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none text-xs">
        {activeTab === 'services' ? (
          <>
            {[
              { id: 'all', label: 'Semua Treatment' },
              { id: 'cleaning', label: 'Deep Clean & Kanvas' },
              { id: 'restoration', label: 'Restorasi Sol & Icy' },
              { id: 'repair', label: 'Reglue & Tambal Sol' },
              { id: 'protection', label: 'Sole Shield & Nano' },
              { id: 'custom', label: 'Glaçage & Semir Paris' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedServiceCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                  selectedServiceCategory === cat.id
                    ? 'bg-neutral-800 text-amber-400 border border-amber-400/30 font-bold'
                    : 'bg-neutral-900/60 text-neutral-400 border border-neutral-800/80 hover:text-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </>
        ) : (
          <>
            {[
              { id: 'all', label: 'Semua Produk' },
              { id: 'cleaner', label: 'Sabun & Foam Cleaner' },
              { id: 'brush', label: 'Sikat Bulu Kuda' },
              { id: 'spray', label: 'Waterproof Spray' },
              { id: 'accessories', label: 'Aksesoris & Shield' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedProductCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                  selectedProductCategory === cat.id
                    ? 'bg-neutral-800 text-amber-400 border border-amber-400/30 font-bold'
                    : 'bg-neutral-900/60 text-neutral-400 border border-neutral-800/80 hover:text-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </>
        )}
      </div>

      {/* Grid: Services View */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="group bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-amber-500/5"
            >
              <div>
                {/* Image header */}
                <div className="relative h-48 overflow-hidden bg-neutral-950">
                  <img
                    src={srv.imageUrl}
                    alt={srv.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />

                  {srv.badge && (
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-neutral-900/90 text-amber-400 border border-amber-400/30 backdrop-blur-sm">
                      {srv.badge}
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300">
                    <span className="flex items-center gap-1 font-mono text-[11px] bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      Estimasi: {srv.durationHours} Jam
                    </span>
                    <span className="flex items-center gap-1 text-[11px] bg-black/60 px-2 py-0.5 rounded-md text-emerald-400 backdrop-blur-sm">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {srv.warranty}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
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
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Harga Paket</span>
                    <span className="font-mono text-lg font-extrabold text-amber-400">
                      Rp {srv.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveDetailService(srv)}
                      className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                      title="Detail Lengkap"
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
          ))}
        </div>
      )}

      {/* Grid: Care Products View */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="group bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-amber-500/5"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-neutral-950">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />

                  <span className="absolute top-3 left-3 text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-900/80 text-neutral-300 border border-neutral-800 backdrop-blur-sm">
                    {prod.volumeOrSpec}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-[11px] bg-black/70 px-2 py-0.5 rounded-md text-amber-400 font-bold backdrop-blur-sm">
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
                  <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              {/* Footer */}
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
                    className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                    Beli Produk
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Service Detail Modal */}
      {activeDetailService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden p-6 space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Detail Treatment Signature
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
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
              <span className="font-bold text-neutral-300">Cocok Untuk Jenis Sepatu:</span>
              <p className="text-neutral-400">
                {activeDetailService.recommendedFor.join(', ')}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
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
                className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-400/20"
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
