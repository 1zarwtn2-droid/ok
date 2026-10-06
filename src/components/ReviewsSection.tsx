import React, { useState } from 'react';
import { Star, MessageSquare, ShieldCheck, CheckCircle2, X, Plus } from 'lucide-react';
import { ReviewItem, OrderItem } from '../types';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  orders: OrderItem[];
  onAddReview: (review: ReviewItem) => void;
  openModalOrder?: OrderItem | null;
  isOpenReviewModal?: boolean;
  onCloseReviewModal?: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  orders,
  onAddReview,
  openModalOrder,
  isOpenReviewModal = false,
  onCloseReviewModal
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [starFilter, setStarFilter] = useState<number | 'all'>('all');

  // Form states
  const [orderNumberInput, setOrderNumberInput] = useState(openModalOrder?.orderNumber || '');
  const [customerName, setCustomerName] = useState(openModalOrder?.customer.name || '');
  const [rating, setRating] = useState(5);
  const [serviceName, setServiceName] = useState(openModalOrder?.serviceName || 'Deep Clean Signature');
  const [shoeModel, setShoeModel] = useState(
    openModalOrder ? `${openModalOrder.shoe.brand} ${openModalOrder.shoe.model}` : 'Nike Air Jordan 1'
  );
  const [comment, setComment] = useState('');

  // Sync when openModalOrder is provided
  React.useEffect(() => {
    if (openModalOrder) {
      setOrderNumberInput(openModalOrder.orderNumber);
      setCustomerName(openModalOrder.customer.name);
      setServiceName(openModalOrder.serviceName);
      setShoeModel(`${openModalOrder.shoe.brand} ${openModalOrder.shoe.model}`);
      setIsFormOpen(true);
    }
  }, [openModalOrder]);

  const showModal = isFormOpen || isOpenReviewModal;

  const handleClose = () => {
    setIsFormOpen(false);
    if (onCloseReviewModal) onCloseReviewModal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !comment) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      orderNumber: orderNumberInput || 'SC-VERIFIED',
      customerName,
      rating,
      serviceName,
      shoeModel,
      comment,
      date: 'Baru saja',
      afterPhotoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
      replyFromAdmin: 'Terima kasih atas ulasannya! Kami senang bisa memberikan hasil terbaik untuk sepatu Anda.'
    };

    onAddReview(newRev);
    handleClose();
    setComment('');
  };

  const filteredReviews = reviews.filter((r) => {
    if (starFilter === 'all') return true;
    return r.rating === starFilter;
  });

  return (
    <section id="reviews" className="py-16 px-4 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            Verified Customer Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Ulasan & Kepuasan Pelanggan
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-xl">
            Hasil pengerjaan nyata tanpa manipulasi. Ribuan pemilik sneaker dan sepatu formal telah mempercayakan perawatannya pada ShoeLab Studio.
          </p>
        </div>

        {/* Aggregate Score Bar & Action */}
        <div className="flex items-center gap-4">
          <div className="bg-neutral-900 border border-neutral-800 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="text-2xl font-extrabold font-mono text-amber-400">4.9</div>
            <div className="text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-neutral-400 text-[11px]">98% Kepuasan (1.2K+ Ulasan)</span>
            </div>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-400/10 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Tulis Ulasan Sepatu
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-8 text-xs">
        <button
          onClick={() => setStarFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
            starFilter === 'all'
              ? 'bg-neutral-800 text-amber-400 border border-amber-400/30'
              : 'bg-neutral-900/60 text-neutral-400 border border-neutral-800'
          }`}
        >
          Semua Ulasan ({reviews.length})
        </button>
        <button
          onClick={() => setStarFilter(5)}
          className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
            starFilter === 5
              ? 'bg-neutral-800 text-amber-400 border border-amber-400/30'
              : 'bg-neutral-900/60 text-neutral-400 border border-neutral-800'
          }`}
        >
          ⭐ 5 Bintang
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-neutral-900/80 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-colors"
          >
            <div className="space-y-3">
              {/* Stars & Date */}
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-neutral-500">{rev.date}</span>
              </div>

              {/* Service & Shoe meta */}
              <div className="text-xs text-neutral-400">
                <strong className="text-neutral-200">{rev.shoeModel}</strong>
                <span className="mx-1.5">·</span>
                <span className="text-amber-400/90">{rev.serviceName}</span>
              </div>

              {/* Comment */}
              <p className="text-xs text-neutral-300 leading-relaxed italic">
                &ldquo;{rev.comment}&rdquo;
              </p>

              {/* After photo preview if present */}
              {rev.afterPhotoUrl && (
                <div className="pt-1">
                  <div className="h-32 rounded-xl overflow-hidden border border-neutral-800">
                    <img
                      src={rev.afterPhotoUrl}
                      alt={rev.shoeModel}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Admin reply */}
              {rev.replyFromAdmin && (
                <div className="p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 text-[11px] text-neutral-400 space-y-1">
                  <span className="font-bold text-amber-400 block">Respon ShoeLab Studio:</span>
                  <p>{rev.replyFromAdmin}</p>
                </div>
              )}
            </div>

            {/* Reviewer Signature */}
            <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-neutral-300 text-[11px]">
                  {rev.customerName.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-neutral-200">{rev.customerName}</div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Terverifikasi
                  </div>
                </div>
              </div>
              <span className="font-mono text-[10px] text-neutral-600">{rev.orderNumber}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
              <h3 className="font-bold text-white text-base">
                Tulis Ulasan Kepuasan Layanan
              </h3>
              <button
                onClick={handleClose}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1 font-medium">Nama Anda *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Lengkap"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1 font-medium">No. Resi Order</label>
                  <input
                    type="text"
                    placeholder="Contoh: SC-2026-9411"
                    value={orderNumberInput}
                    onChange={(e) => setOrderNumberInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white outline-none font-mono focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1 font-medium">Model Sepatu</label>
                  <input
                    type="text"
                    placeholder="Contoh: Air Jordan 1 / Sambas"
                    value={shoeModel}
                    onChange={(e) => setShoeModel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1 font-medium">Rating Bintang</label>
                  <div className="flex items-center gap-1.5 py-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            num <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-neutral-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1 font-medium">
                  Ulasan & Cerita Pengalaman Servis *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Bagaimana hasil kebersihan sepatu Anda? Apakah notifikasi WhatsApp dan estimasi waktu memuaskan?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold"
                >
                  Kirim Ulasan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
