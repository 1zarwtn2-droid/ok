import React from 'react';
import { X, Printer, Share2, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';
import { OrderItem } from '../types';
import { getStatusLabel, buildWhatsAppUrl, generateWhatsAppMessage } from '../utils/whatsapp';

interface DigitalReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderItem | null;
}

export const DigitalReceiptModal: React.FC<DigitalReceiptModalProps> = ({
  isOpen,
  onClose,
  order
}) => {
  if (!isOpen || !order) return null;

  const statusInfo = getStatusLabel(order.status);

  const handlePrint = () => {
    window.print();
  };

  const handleShareWA = () => {
    const text = generateWhatsAppMessage(order, order.status);
    window.open(buildWhatsAppUrl(order.customer.whatsapp, text), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top actions bar (hidden during print) */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-800 bg-neutral-900 print:hidden">
          <span className="text-xs font-medium text-neutral-400">Tanda Terima & Struk Digital</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              title="Cetak Tanda Terima"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleShareWA}
              className="p-1.5 text-emerald-400 hover:text-emerald-300 rounded-lg hover:bg-neutral-800 transition-colors"
              title="Kirim ke WhatsApp"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Ticket Receipt Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-white text-neutral-900 font-sans print:p-2">
          {/* Header Store */}
          <div className="text-center pb-4 border-b border-dashed border-neutral-300">
            <div className="inline-block p-2 rounded-xl bg-neutral-900 text-white mb-2 font-mono font-bold text-base tracking-wider">
              SHOELAB STUDIO
            </div>
            <h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wide">
              Layanan Cuci & Restorasi Sepatu
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan
            </p>
            <p className="text-xs text-neutral-500">
              Hotline: 0812-3456-7890 | IG: @shoelab.studio
            </p>
          </div>

          {/* Receipt Meta */}
          <div className="py-3 border-b border-dashed border-neutral-300 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-neutral-500">No. Resi Order:</span>
              <span className="font-mono font-bold text-neutral-900">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Tanggal Transaksi:</span>
              <span>{order.createdAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Pelanggan:</span>
              <span className="font-semibold">{order.customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">No. WhatsApp:</span>
              <span className="font-mono">{order.customer.whatsapp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Metode Serah Terima:</span>
              <span className="font-medium">
                {order.deliveryMethod === 'drop_off' ? 'Drop-off di Studio' : 'Pickup & Delivery'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Jadwal Slot:</span>
              <span>{order.scheduledDate} ({order.scheduledTimeSlot})</span>
            </div>
          </div>

          {/* Shoe Identification */}
          <div className="py-3 border-b border-dashed border-neutral-300 text-xs">
            <span className="text-neutral-500 uppercase font-semibold text-[10px] tracking-wider block mb-1">
              Data Sepatu Pelanggan
            </span>
            <div className="bg-neutral-100 p-2.5 rounded-lg space-y-1">
              <div className="flex justify-between font-bold text-neutral-800">
                <span>{order.shoe.brand} {order.shoe.model}</span>
                <span className="text-neutral-600 font-normal">{order.shoe.material}</span>
              </div>
              <div className="text-[11px] text-neutral-600">
                Warna: {order.shoe.color}
              </div>
              {order.shoe.conditionNote && (
                <div className="text-[11px] text-neutral-500 italic">
                  Catatan Awal: &ldquo;{order.shoe.conditionNote}&rdquo;
                </div>
              )}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="py-3 border-b border-dashed border-neutral-300 text-xs space-y-2">
            <span className="text-neutral-500 uppercase font-semibold text-[10px] tracking-wider block">
              Rincian Biaya Layanan & Produk
            </span>

            {/* Main Service */}
            <div className="flex justify-between">
              <div>
                <p className="font-medium text-neutral-800">{order.serviceName}</p>
                <span className="text-[11px] text-neutral-500">Sepatu Utama #1 ({order.shoe.brand} {order.shoe.model})</span>
              </div>
              <span className="font-mono font-medium">Rp {order.servicePrice.toLocaleString('id-ID')}</span>
            </div>

            {/* Additional Shoes if any */}
            {order.additionalShoes && order.additionalShoes.map((extra, idx) => (
              <div key={idx} className="flex justify-between text-neutral-800">
                <div>
                  <p className="font-medium">{extra.treatmentName}</p>
                  <span className="text-[11px] text-neutral-500">Sepatu Tambahan #{idx + 2} ({extra.brand} {extra.model})</span>
                </div>
                <span className="font-mono">Rp {extra.treatmentPrice?.toLocaleString('id-ID')}</span>
              </div>
            ))}

            {/* Add ons */}
            {order.addOns.map((addon) => (
              <div key={addon.id} className="flex justify-between text-neutral-700">
                <span>+ {addon.name}</span>
                <span className="font-mono">Rp {addon.price.toLocaleString('id-ID')}</span>
              </div>
            ))}

            {/* Products */}
            {order.purchasedProducts.map((p) => (
              <div key={p.id} className="flex justify-between text-neutral-700">
                <span>+ {p.name} (x{p.quantity})</span>
                <span className="font-mono">Rp {(p.price * p.quantity).toLocaleString('id-ID')}</span>
              </div>
            ))}

            {/* Discount if present */}
            {order.discountAmount && order.discountAmount > 0 ? (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Diskon Kupon Promo ({order.voucherCode})</span>
                <span className="font-mono">-Rp {order.discountAmount.toLocaleString('id-ID')}</span>
              </div>
            ) : null}

            {/* Total */}
            <div className="pt-2 border-t border-neutral-200 flex justify-between items-center text-sm font-bold text-neutral-900">
              <span>TOTAL PEMBAYARAN</span>
              <span className="font-mono text-base text-neutral-950">
                Rp {order.totalPrice.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Payment Status & Method */}
          <div className="py-3 border-b border-dashed border-neutral-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>STATUS: LUNAS ({order.paymentMethod?.toUpperCase() || 'QRIS'})</span>
            </div>
            <span className="text-neutral-500">{order.paymentTime || 'Terverifikasi Otomatis'}</span>
          </div>

          {/* QR Code Verification Box */}
          <div className="py-4 text-center">
            <div className="inline-flex p-3 bg-neutral-100 rounded-xl border border-neutral-200 items-center justify-center mb-1.5">
              <QrCode className="w-20 h-20 text-neutral-800" />
            </div>
            <p className="text-[10px] text-neutral-500 font-mono">
              Scan untuk Lacak Status Real-Time ({order.orderNumber})
            </p>
          </div>

          {/* Guarantee & Terms */}
          <div className="pt-1 text-[10px] text-neutral-500 text-center leading-relaxed border-t border-dashed border-neutral-300">
            <div className="flex items-center justify-center gap-1 text-neutral-700 font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Garansi Kebersihan 48 Jam & Garansi Rekat Sol 30 Hari</span>
            </div>
            Simpan struk digital ini sebagai bukti klaim garansi. Terima kasih atas kepercayaan Anda mempercayakan sepatu kesayangan kepada ShoeLab Studio.
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center justify-end gap-2 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors"
          >
            Tutup Struk
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-medium text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Cetak / Simpan PDF
          </button>
        </div>
      </div>
    </div>
  );
};
