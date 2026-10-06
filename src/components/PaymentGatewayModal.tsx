import React, { useState, useEffect } from 'react';
import { X, QrCode, CreditCard, Wallet, Store, ShieldCheck, CheckCircle2, Copy, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { PaymentMethodType } from '../types';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  amount: number;
  customerName: string;
  onPaymentSuccess: (method: PaymentMethodType) => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  orderNumber,
  amount,
  customerName,
  onPaymentSuccess
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('qris');
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(899); // 14 mins 59 secs
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedVA, setCopiedVA] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const vaNumber = selectedMethod === 'va_bca' 
    ? '8277 0812 9941 2001'
    : selectedMethod === 'va_mandiri'
    ? '8932 1004 8812 9941'
    : '1099 2200 8812 9411';

  const handleCopyVA = () => {
    navigator.clipboard.writeText(vaNumber.replace(/\s/g, ''));
    setCopiedVA(true);
    setTimeout(() => setCopiedVA(false), 2000);
  };

  const handleSimulateSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(selectedMethod);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
              PAY
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-amber-400">
                Payment Gateway Digital
              </div>
              <h3 className="font-semibold text-neutral-100 text-sm">
                Selesaikan Pembayaran Layanan
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{formattedTime}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Summary Banner */}
        <div className="px-6 py-3.5 bg-neutral-950/60 border-b border-neutral-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-neutral-400">No. Order: </span>
            <span className="font-mono font-bold text-neutral-200">{orderNumber}</span>
            <span className="mx-2 text-neutral-600">·</span>
            <span className="text-neutral-400">Atas Nama: </span>
            <span className="text-neutral-200 font-medium">{customerName}</span>
          </div>
          <div>
            <span className="text-neutral-400 mr-1.5">Total Bayar:</span>
            <span className="text-base font-bold font-mono text-amber-400">
              Rp {amount.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Main Content: Tabs and Instructions */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Method Selector Tabs */}
          <div>
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2.5">
              Pilih Metode Pembayaran Digital
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMethod('qris')}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  selectedMethod === 'qris'
                    ? 'border-amber-400/80 bg-amber-400/10 text-white shadow-sm'
                    : 'border-neutral-800 bg-neutral-950/80 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <QrCode className="w-5 h-5 text-amber-400" />
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">0% Fee</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-100">QRIS Instan</div>
                  <div className="text-[10px] text-neutral-400">BCA, GoPay, OVO</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('va_bca')}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  selectedMethod === 'va_bca'
                    ? 'border-amber-400/80 bg-amber-400/10 text-white shadow-sm'
                    : 'border-neutral-800 bg-neutral-950/80 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-blue-400 mb-2" />
                <div>
                  <div className="text-xs font-bold text-neutral-100">BCA VA</div>
                  <div className="text-[10px] text-neutral-400">Virtual Account</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('va_mandiri')}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  selectedMethod === 'va_mandiri'
                    ? 'border-amber-400/80 bg-amber-400/10 text-white shadow-sm'
                    : 'border-neutral-800 bg-neutral-950/80 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-indigo-400 mb-2" />
                <div>
                  <div className="text-xs font-bold text-neutral-100">Mandiri VA</div>
                  <div className="text-[10px] text-neutral-400">Livin Mandiri</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('gopay')}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  selectedMethod === 'gopay'
                    ? 'border-amber-400/80 bg-amber-400/10 text-white shadow-sm'
                    : 'border-neutral-800 bg-neutral-950/80 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <Wallet className="w-5 h-5 text-teal-400 mb-2" />
                <div>
                  <div className="text-xs font-bold text-neutral-100">E-Wallet</div>
                  <div className="text-[10px] text-neutral-400">GoPay / Shopee</div>
                </div>
              </button>
            </div>
          </div>

          {/* Payment Detail Display */}
          {selectedMethod === 'qris' && (
            <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-5 flex flex-col items-center text-center">
              <div className="text-xs text-neutral-400 mb-3">
                Scan kode QRIS di bawah ini dengan aplikasi m-Banking atau E-Wallet apa saja
              </div>

              {/* Dynamic QR Code Box */}
              <div className="bg-white p-4 rounded-2xl shadow-xl flex flex-col items-center max-w-[220px] w-full border-4 border-amber-400/40">
                <div className="w-full flex items-center justify-between pb-2 border-b border-neutral-200 text-neutral-800 text-[10px] font-bold">
                  <span>QRIS STANDAR</span>
                  <span>GPN</span>
                </div>
                
                {/* SVG QR Code Simulation */}
                <div className="my-3 p-2 bg-neutral-100 rounded-xl">
                  <svg className="w-36 h-36" viewBox="0 0 100 100" fill="currentColor">
                    <rect width="100" height="100" fill="white" />
                    {/* Corners */}
                    <rect x="5" y="5" width="28" height="28" fill="#111" />
                    <rect x="9" y="9" width="20" height="20" fill="white" />
                    <rect x="13" y="13" width="12" height="12" fill="#111" />

                    <rect x="67" y="5" width="28" height="28" fill="#111" />
                    <rect x="71" y="9" width="20" height="20" fill="white" />
                    <rect x="75" y="13" width="12" height="12" fill="#111" />

                    <rect x="5" y="67" width="28" height="28" fill="#111" />
                    <rect x="9" y="71" width="20" height="20" fill="white" />
                    <rect x="13" y="75" width="12" height="12" fill="#111" />

                    {/* Data patterns */}
                    <rect x="37" y="10" width="8" height="8" fill="#111" />
                    <rect x="49" y="15" width="10" height="6" fill="#111" />
                    <rect x="37" y="25" width="12" height="8" fill="#111" />
                    <rect x="53" y="27" width="8" height="14" fill="#111" />
                    <rect x="10" y="39" width="14" height="6" fill="#111" />
                    <rect x="28" y="42" width="18" height="8" fill="#111" />
                    <rect x="40" y="45" width="20" height="10" fill="#111" />
                    <rect x="68" y="39" width="10" height="14" fill="#111" />
                    <rect x="82" y="45" width="10" height="10" fill="#111" />
                    <rect x="37" y="62" width="14" height="14" fill="#111" />
                    <rect x="57" y="65" width="18" height="8" fill="#111" />
                    <rect x="80" y="62" width="12" height="14" fill="#111" />
                    <rect x="45" y="80" width="16" height="10" fill="#111" />
                    <rect x="68" y="82" width="15" height="10" fill="#111" />
                  </svg>
                </div>

                <div className="w-full pt-2 border-t border-neutral-200 text-neutral-600 text-[10px] font-mono font-medium">
                  NMID: ID1029384729101
                </div>
              </div>

              <p className="text-xs text-neutral-400 mt-3 max-w-sm">
                Mendukung: BCA Mobile, Livin Mandiri, GoPay, OVO, ShopeePay, Dana, LinkAja.
              </p>
            </div>
          )}

          {(selectedMethod === 'va_bca' || selectedMethod === 'va_mandiri') && (
            <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-neutral-400">Nomor Virtual Account:</div>
                  <div className="font-mono text-lg font-bold text-amber-400 mt-0.5 tracking-wider">
                    {vaNumber}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyVA}
                  className="px-3 py-1.5 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedVA ? 'Tersalin!' : 'Salin VA'}
                </button>
              </div>

              <div className="p-3 bg-neutral-900 rounded-xl text-xs text-neutral-400 space-y-1">
                <p className="font-semibold text-neutral-300">Panduan Pembayaran Virtual Account:</p>
                <p>1. Buka m-Banking atau ATM dan pilih menu Transfer &gt; Virtual Account.</p>
                <p>2. Masukkan nomor VA di atas. Nama penerima: <strong>SHOELAB - {customerName}</strong>.</p>
                <p>3. Masukkan nominal tepat sejumlah Rp {amount.toLocaleString('id-ID')}.</p>
                <p>4. Transaksi akan terverifikasi otomatis dalam 10 detik tanpa upload bukti transfer.</p>
              </div>
            </div>
          )}

          {selectedMethod === 'gopay' && (
            <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-5 space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mx-auto">
                <Wallet className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-neutral-200">
                Direct Pay E-Wallet
              </h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Notifikasi pop-up pembayaran akan dikirimkan langsung ke aplikasi E-Wallet terdaftar pada nomor WhatsApp Anda.
              </p>
            </div>
          )}

          {/* Security note */}
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Enkripsi 256-Bit SSL Terproteksi • Transaksi Aman & Terverifikasi Otomatis</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-5 border-t border-neutral-800 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-medium transition-colors"
          >
            Batal
          </button>

          <button
            type="button"
            disabled={isProcessing}
            onClick={handleSimulateSuccess}
            className="w-full sm:w-auto flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-[0.99] disabled:opacity-70"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                <span>Memverifikasi Pembayaran...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulasi Bayar Berhasil (Instant Callback)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
