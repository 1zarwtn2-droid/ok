import React, { useState } from 'react';
import { 
  X, Check, ChevronRight, ChevronLeft, Sparkles, Clock, Calendar, 
  MapPin, Shield, MessageCircle, FileText, ArrowRight,
  Upload, Tag, AlertCircle, Plus, Trash2, Gift
} from 'lucide-react';
import { ServiceItem, CareProductItem, OrderItem, PaymentMethodType, QueueSlot, ShoeDetails } from '../types';
import { PROMO_VOUCHERS } from '../data/mockData';
import { PaymentGatewayModal } from './PaymentGatewayModal';
import { ADMIN_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  careProducts: CareProductItem[];
  queueSlots: QueueSlot[];
  onOrderCreated: (newOrder: OrderItem) => void;
  onViewReceipt: (order: OrderItem) => void;
  onTrackOrder: (orderNumber: string) => void;
  preselectedServiceId?: string;
}

const AVAILABLE_ADDONS = [
  { id: 'addon-deodorant', name: 'Antibacterial Deep Deodorizer & Sanitizer', price: 15000, desc: 'Membunuh 99.9% bakteri bau apek & jamur sol' },
  { id: 'addon-repellent', name: 'Water Repellent Nano Coating (90D)', price: 25000, desc: 'Lapisan anti-air & lumpur tahan hingga 3 bulan' },
  { id: 'addon-express', name: 'Express Prioritas (24 Jam Jadi)', price: 35000, desc: 'Antrean pengerjaan jalur cepat oleh teknisi senior' },
  { id: 'addon-shoetree', name: 'Shoe Tree Pelindung Bentuk Sepatu', price: 20000, desc: 'Menjaga bentuk lekuk toe box agar tidak kempis' },
  { id: 'addon-uvc', name: 'Sterilisasi Chamber Ozon & UV-C Medis', price: 30000, desc: 'Membasmi jamur tinea pedis mikroskopis di insole' }
];

const SHOE_BRANDS = [
  'Nike', 'Adidas', 'Air Jordan', 'New Balance', 'Converse', 
  'Vans', 'Puma', 'Asics', 'Dr. Martens', 'Salomon', 'Compass', 'Ventela', 'Lainnya'
];

const SHOE_MATERIALS = ['Canvas', 'Leather', 'Suede', 'Nubuck', 'Mesh/Knit', 'Mixed'] as const;

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  careProducts,
  queueSlots,
  onOrderCreated,
  onViewReceipt,
  onTrackOrder,
  preselectedServiceId
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1: Primary Service & Addons
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId || services[0]?.id || ''
  );
  const [serviceFocusTab, setServiceFocusTab] = useState<'all' | 'repair' | 'cleaning'>('all');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<{ id: string; quantity: number }[]>([]);

  // Step 2: Primary Shoe Details
  const [brand, setBrand] = useState('Nike');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [material, setMaterial] = useState<typeof SHOE_MATERIALS[number]>('Leather');
  const [conditionNote, setConditionNote] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string>(
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
  );

  // Multi-Pair Shoe State (Additional Shoes)
  const [additionalShoes, setAdditionalShoes] = useState<ShoeDetails[]>([]);
  const [showAddShoeForm, setShowAddShoeForm] = useState(false);
  const [secondBrand, setSecondBrand] = useState('Adidas');
  const [secondModel, setSecondModel] = useState('');
  const [secondMaterial, setSecondMaterial] = useState<typeof SHOE_MATERIALS[number]>('Canvas');
  const [secondServiceId, setSecondServiceId] = useState<string>(services[0]?.id || '');

  // Step 3: Schedule & Delivery
  const [deliveryMethod, setDeliveryMethod] = useState<'drop_off' | 'pickup_delivery'>('drop_off');
  const [scheduledDate, setScheduledDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(queueSlots[0]?.time || '09:00 - 12:00 WIB');

  // Step 4: Customer Contact & Voucher
  const [customerName, setCustomerName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [voucherCodeInput, setVoucherCodeInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; discount: number; desc: string } | null>(null);
  const [voucherError, setVoucherError] = useState('');

  // Payment Modal & Result
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<OrderItem | null>(null);

  if (!isOpen) return null;

  const currentService = services.find(s => s.id === selectedServiceId) || services[0];

  // Price calculations
  const servicePrice = currentService?.price || 0;
  
  // Calculate additional shoes price (with 10% bundle discount on the second pairs)
  const additionalShoesTotal = additionalShoes.reduce((sum, s) => {
    const srv = services.find(x => x.name === s.treatmentName) || currentService;
    return sum + (srv.price * 0.9); // 10% discount on additional shoes
  }, 0);

  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const found = AVAILABLE_ADDONS.find(a => a.id === addonId);
    return acc + (found?.price || 0);
  }, 0);

  const productsTotal = selectedProducts.reduce((acc, p) => {
    const found = careProducts.find(item => item.id === p.id);
    return acc + ((found?.price || 0) * p.quantity);
  }, 0);

  const deliveryFee = deliveryMethod === 'pickup_delivery' ? 20000 : 0;
  const subtotalBeforeVoucher = servicePrice + additionalShoesTotal + addonsTotal + productsTotal + deliveryFee;
  const discountAmount = appliedVoucher ? appliedVoucher.discount : 0;
  const grandTotal = Math.max(0, subtotalBeforeVoucher - discountAmount);

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError('');
    const cleanCode = voucherCodeInput.trim().toUpperCase();
    const found = PROMO_VOUCHERS.find(v => v.code === cleanCode);

    if (!found) {
      setVoucherError('Kode voucher tidak valid atau telah kadaluarsa.');
      return;
    }

    if (subtotalBeforeVoucher < found.minSpend) {
      setVoucherError(`Minimum transaksi untuk voucher ${cleanCode} adalah Rp ${found.minSpend.toLocaleString('id-ID')}`);
      return;
    }

    let discount = 0;
    if (found.discountFixed) {
      discount = found.discountFixed;
    } else if (found.discountPercent) {
      discount = Math.round((subtotalBeforeVoucher * found.discountPercent) / 100);
    }

    setAppliedVoucher({
      code: found.code,
      discount,
      desc: found.description
    });
  };

  const handleAddSecondShoe = () => {
    if (!secondModel.trim()) {
      alert('Mohon isi model sepatu tambahan.');
      return;
    }
    const srv = services.find(s => s.id === secondServiceId) || currentService;
    const newShoe: ShoeDetails = {
      brand: secondBrand,
      model: secondModel,
      color: 'Warna Sepatu #2',
      material: secondMaterial,
      conditionNote: 'Sepatu kedua (Paket Duo Pasang)',
      treatmentName: srv.name,
      treatmentPrice: Math.round(srv.price * 0.9)
    };

    setAdditionalShoes(prev => [...prev, newShoe]);
    setShowAddShoeForm(false);
    setSecondModel('');
  };

  const handleRemoveSecondShoe = (index: number) => {
    setAdditionalShoes(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateOrder = (paymentMethod: PaymentMethodType) => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `SC-2026-${randomId}`;
    const now = new Date();
    const formattedNow = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: formattedNow,
      serviceId: currentService.id,
      serviceName: currentService.name,
      servicePrice: currentService.price,
      addOns: selectedAddons.map(id => {
        const found = AVAILABLE_ADDONS.find(a => a.id === id)!;
        return { id: found.id, name: found.name, price: found.price };
      }),
      purchasedProducts: selectedProducts.map(p => {
        const found = careProducts.find(item => item.id === p.id)!;
        return { id: found.id, name: found.name, price: found.price, quantity: p.quantity };
      }),
      additionalShoes: additionalShoes.length > 0 ? additionalShoes : undefined,
      voucherCode: appliedVoucher?.code,
      discountAmount,
      totalPrice: grandTotal,
      shoe: {
        brand,
        model: model || 'Sneakers Utama',
        color: color || 'Multi-color',
        material,
        conditionNote: conditionNote || 'Perlu pembersihan standar dan perawatan bahan.',
        photoBeforeUrl: photoPreview,
        photoAfterUrl: undefined
      },
      customer: {
        name: customerName || 'Pelanggan ShoeLab',
        whatsapp: whatsapp || '081234567890',
        email: email || 'customer@shoelab.id',
        address: address,
        notes: customerNotes
      },
      deliveryMethod,
      pickupAddress: deliveryMethod === 'pickup_delivery' ? address : undefined,
      scheduledDate,
      scheduledTimeSlot: selectedTimeSlot,
      status: 'BOOKING_CONFIRMED',
      paymentStatus: 'PAID',
      paymentMethod,
      paymentTime: formattedNow,
      technicianName: 'Bima Santoso (Lead Specialist)',
      estimatedCompletion: `${scheduledDate} 18:00 WIB`,
      courierTracking: deliveryMethod === 'pickup_delivery' ? {
        courierName: 'ShoeLab Express Courier',
        driverName: 'Pak Hendra (0812-9988-1122)',
        trackingCode: `KURIR-${orderNumber}`,
        status: 'Kurir dijadwalkan menjemput sesuai slot'
      } : undefined,
      timeline: [
        {
          status: 'BOOKING_CONFIRMED',
          title: 'Reservasi Antrean Dikonfirmasi',
          description: `Antrean terverifikasi untuk sesi ${selectedTimeSlot}. Pembayaran lunas via ${paymentMethod.toUpperCase()}${appliedVoucher ? ` (Hemat Rp ${discountAmount.toLocaleString('id-ID')})` : ''}.`,
          timestamp: formattedNow,
          updatedBy: 'Sistem Pembayaran Terpadu'
        }
      ],
      waNotificationHistory: [
        {
          timestamp: formattedNow,
          stage: 'BOOKING_CONFIRMED',
          recipient: whatsapp || '081234567890',
          messageSnippet: `Jadwal reservasi antrean pesanan ${orderNumber} telah terkonfirmasi dan diamankan...`
        }
      ]
    };

    onOrderCreated(newOrder);
    setCreatedOrder(newOrder);
    setShowPaymentModal(false);
    setCurrentStep(5);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-amber-400">
                Shoe Care Appointment Engine
              </div>
              <h2 className="text-base font-bold text-neutral-100">
                Booking Antrean & Reservasi Treatment Sepatu
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        {currentStep < 5 && (
          <div className="px-6 py-3 bg-neutral-950/70 border-b border-neutral-800/80">
            <div className="flex items-center justify-between max-w-lg mx-auto text-xs">
              <div className={`flex items-center gap-1.5 ${currentStep >= 1 ? 'text-amber-400 font-semibold' : 'text-neutral-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 1 ? 'bg-amber-400 text-neutral-950 font-bold' : 'bg-neutral-800 text-neutral-400'}`}>1</span>
                <span>Layanan</span>
              </div>
              <span className="text-neutral-700">·</span>

              <div className={`flex items-center gap-1.5 ${currentStep >= 2 ? 'text-amber-400 font-semibold' : 'text-neutral-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 2 ? 'bg-amber-400 text-neutral-950 font-bold' : 'bg-neutral-800 text-neutral-400'}`}>2</span>
                <span>Sepatu ({1 + additionalShoes.length} Pasang)</span>
              </div>
              <span className="text-neutral-700">·</span>

              <div className={`flex items-center gap-1.5 ${currentStep >= 3 ? 'text-amber-400 font-semibold' : 'text-neutral-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 3 ? 'bg-amber-400 text-neutral-950 font-bold' : 'bg-neutral-800 text-neutral-400'}`}>3</span>
                <span>Jadwal</span>
              </div>
              <span className="text-neutral-700">·</span>

              <div className={`flex items-center gap-1.5 ${currentStep >= 4 ? 'text-amber-400 font-semibold' : 'text-neutral-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 4 ? 'bg-amber-400 text-neutral-950 font-bold' : 'bg-neutral-800 text-neutral-400'}`}>4</span>
                <span>Voucher & Bayar</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* STEP 1: PILIH LAYANAN & ADD-ONS */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
                    1. Pilih Treatment Utama Sepatu
                  </label>
                  {/* Focus Pill Switcher */}
                  <div className="flex p-0.5 bg-neutral-900 border border-neutral-800 rounded-xl text-[11px] w-fit">
                    <button
                      type="button"
                      onClick={() => setServiceFocusTab('all')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                        serviceFocusTab === 'all'
                          ? 'bg-amber-400 text-neutral-950 shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Semua ({services.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceFocusTab('repair')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                        serviceFocusTab === 'repair'
                          ? 'bg-blue-500 text-white shadow-sm'
                          : 'text-neutral-400 hover:text-blue-300'
                      }`}
                    >
                      🛠️ Perbaikan ({services.filter(s => s.category === 'repair' || s.focusType === 'repair').length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceFocusTab('cleaning')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                        serviceFocusTab === 'cleaning'
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : 'text-neutral-400 hover:text-emerald-300'
                      }`}
                    >
                      ✨ Pembersihan ({services.filter(s => s.category === 'cleaning' || s.focusType === 'cleaning').length})
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
                  {services
                    .filter(s => {
                      if (serviceFocusTab === 'repair') return s.category === 'repair' || s.focusType === 'repair';
                      if (serviceFocusTab === 'cleaning') return s.category === 'cleaning' || s.focusType === 'cleaning';
                      return true;
                    })
                    .map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                        selectedServiceId === srv.id
                          ? 'border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-500/5'
                          : 'border-neutral-800 bg-neutral-950/60 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <h4 className="font-bold text-neutral-100 text-sm leading-tight">{srv.name}</h4>
                        {srv.badge && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-neutral-800 text-amber-300 font-medium whitespace-nowrap">
                            {srv.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 mb-3">
                        {srv.description}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80 text-xs">
                        <span className="font-mono font-bold text-amber-400">
                          Rp {srv.price.toLocaleString('id-ID')}
                        </span>
                        <span className="text-neutral-500 flex items-center gap-1 text-[11px]">
                          <Clock className="w-3.5 h-3.5" /> {srv.durationHours} Jam
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                  2. Tambahan Treatment Perawatan Khusus (Opsional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {AVAILABLE_ADDONS.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'border-emerald-500/70 bg-emerald-500/10'
                            : 'border-neutral-800 bg-neutral-950/40 hover:border-neutral-700'
                        }`}
                      >
                        <div className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center text-xs font-bold ${
                          isSelected ? 'bg-emerald-500 text-neutral-950' : 'border border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-neutral-200">{addon.name}</span>
                            <span className="font-mono text-emerald-400 font-semibold">
                              +Rp {addon.price.toLocaleString('id-ID')}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400 mt-0.5">
                            {addon.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DETAIL SEPATU + MULTI-PAIR OPTION */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Primary Shoe Card */}
              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                    Sepatu Utama #1 ({currentService.name})
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    Rp {servicePrice.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Merk Sepatu
                    </label>
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 text-sm focus:border-amber-400 outline-none"
                    >
                      {SHOE_BRANDS.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Model / Seri Sepatu
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Air Jordan 1 Low / Sambas / Chuck 70"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 text-sm focus:border-amber-400 outline-none placeholder:text-neutral-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Warna Dominan
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Putih, Hitam, Grey / Navy"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 text-sm focus:border-amber-400 outline-none placeholder:text-neutral-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Material / Bahan Sepatu
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {SHOE_MATERIALS.map(mat => (
                        <button
                          key={mat}
                          type="button"
                          onClick={() => setMaterial(mat)}
                          className={`py-2 px-2 text-xs rounded-xl border text-center transition-all ${
                            material === mat
                              ? 'border-amber-400 bg-amber-400/20 text-white font-bold'
                              : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {mat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    Catatan Kondisi / Noda Khusus
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ceritakan noda atau kendala, misal: 'Sol menguning akibat pemakaian 1 tahun, ada bekas lumpur di toe box'"
                    value={conditionNote}
                    onChange={(e) => setConditionNote(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs focus:border-amber-400 outline-none placeholder:text-neutral-600"
                  />
                </div>
              </div>

              {/* Additional Shoes Section (Multi-Pair) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-neutral-200 block">
                      Cuci Lebih dari 1 Pasang? (Duo / Multi-Pair)
                    </label>
                    <span className="text-[11px] text-emerald-400">
                      ✨ Dapatkan diskon 10% untuk setiap pasang tambahan!
                    </span>
                  </div>

                  {!showAddShoeForm && (
                    <button
                      type="button"
                      onClick={() => setShowAddShoeForm(true)}
                      className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-neutral-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      + Tambah Pasang Sepatu
                    </button>
                  )}
                </div>

                {/* Additional Shoes List */}
                {additionalShoes.map((extraShoe, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-neutral-950 border border-emerald-500/30 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>Sepatu #{idx + 2}: {extraShoe.brand} {extraShoe.model}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Diskon 10% Bundle</span>
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        {extraShoe.treatmentName} ({extraShoe.material})
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-emerald-400 font-bold">
                        Rp {extraShoe.treatmentPrice?.toLocaleString('id-ID')}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSecondShoe(idx)}
                        className="text-neutral-500 hover:text-rose-400 p-1"
                        title="Hapus sepatu ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Inline Form to add additional shoe */}
                {showAddShoeForm && (
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-amber-400/40 space-y-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-amber-400">Tambah Detail Sepatu #{additionalShoes.length + 2}</span>
                      <button
                        type="button"
                        onClick={() => setShowAddShoeForm(false)}
                        className="text-neutral-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-neutral-300 block mb-1">Merk</label>
                        <select
                          value={secondBrand}
                          onChange={(e) => setSecondBrand(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                        >
                          {SHOE_BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-neutral-300 block mb-1">Model Sepatu</label>
                        <input
                          type="text"
                          placeholder="Misal: Converse 70s / Dunk"
                          value={secondModel}
                          onChange={(e) => setSecondModel(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-neutral-300 block mb-1">Material</label>
                        <select
                          value={secondMaterial}
                          onChange={(e) => setSecondMaterial(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                        >
                          {SHOE_MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-neutral-300 block mb-1">Pilihan Layanan</label>
                        <select
                          value={secondServiceId}
                          onChange={(e) => setSecondServiceId(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                        >
                          {services.map(s => (
                            <option key={s.id} value={s.id}>
                              {s.name} (Rp {Math.round(s.price * 0.9).toLocaleString('id-ID')})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="pt-1 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddShoeForm(false)}
                        className="px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={handleAddSecondShoe}
                        className="px-4 py-1.5 rounded-lg bg-amber-400 text-neutral-950 font-bold"
                      >
                        Simpan Sepatu Tambahan
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: JADWAL & METODE */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Delivery method */}
              <div>
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                  Metode Serah Terima Sepatu
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setDeliveryMethod('drop_off')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      deliveryMethod === 'drop_off'
                        ? 'border-amber-400 bg-amber-400/10'
                        : 'border-neutral-800 bg-neutral-950/60 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-sm text-neutral-100">Drop-off di Studio</span>
                    </div>
                    <p className="text-xs text-neutral-400 mb-2">
                      Bawa sepatu langsung ke Studio ShoeLab Senopati Jakarta Selatan. Bebas biaya antar.
                    </p>
                    <span className="text-xs font-bold text-emerald-400">Gratis (Rp 0)</span>
                  </div>

                  <div
                    onClick={() => setDeliveryMethod('pickup_delivery')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      deliveryMethod === 'pickup_delivery'
                        ? 'border-amber-400 bg-amber-400/10'
                        : 'border-neutral-800 bg-neutral-950/60 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-sm text-neutral-100">Antar-Jemput (Pickup & Delivery)</span>
                    </div>
                    <p className="text-xs text-neutral-400 mb-2">
                      Kurir kami menjemput dan mengantar kembali ke rumah/kantor Anda dengan pelacakan live.
                    </p>
                    <span className="text-xs font-mono font-bold text-amber-400">+Rp 20.000 (PP)</span>
                  </div>
                </div>
              </div>

              {/* Schedule slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    Pilih Tanggal Reservasi
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    Slot Waktu Antrean (Real-time Quota)
                  </label>
                  <div className="space-y-2">
                    {queueSlots.map((slot) => (
                      <div
                        key={slot.time}
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`px-3 py-2 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                          selectedTimeSlot === slot.time
                            ? 'border-amber-400 bg-amber-400/20 text-white font-bold'
                            : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{slot.time}</span>
                        </div>
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-900 text-emerald-400 font-mono">
                          Sisa {slot.availableCount} Slot
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: KONTAK, VOUCHER & RINGKASAN */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <MessageCircle className="w-4 h-4" />
                  <span>Informasi Kontak & Notifikasi WhatsApp</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Semua pembaruan pengerjaan, foto inspeksi teknisi, dan konfirmasi jadwal akan dikirimkan otomatis via WhatsApp.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1 font-medium">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-300 block mb-1 font-medium">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm focus:border-amber-400 outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm focus:border-amber-400 outline-none"
                    />
                  </div>

                  {deliveryMethod === 'pickup_delivery' && (
                    <div>
                      <label className="text-xs text-neutral-300 block mb-1 font-medium">
                        Alamat Lengkap Penjemputan *
                      </label>
                      <input
                        type="text"
                        placeholder="Alamat rumah/apartemen/kantor"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm focus:border-amber-400 outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Promo Voucher Input Box */}
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-2">
                <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-amber-400" />
                  Kupon / Kode Voucher Diskon
                </span>
                
                <form onSubmit={handleApplyVoucher} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Contoh: BERSIHBARU / SNEAKERHEAD"
                    value={voucherCodeInput}
                    onChange={(e) => setVoucherCodeInput(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs font-mono uppercase text-white outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs font-bold transition-colors"
                  >
                    Gunakan
                  </button>
                </form>

                {appliedVoucher && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-400">
                    <span>✅ Voucher <strong>{appliedVoucher.code}</strong> diterapkan: Hemat Rp {appliedVoucher.discount.toLocaleString('id-ID')}</span>
                    <button
                      type="button"
                      onClick={() => setAppliedVoucher(null)}
                      className="text-neutral-400 hover:text-white text-[10px] underline"
                    >
                      Hapus
                    </button>
                  </div>
                )}

                {voucherError && (
                  <p className="text-[11px] text-rose-400">{voucherError}</p>
                )}

                {/* Available voucher suggestions */}
                <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-400 flex-wrap">
                  <span className="text-neutral-500">Coba Voucher:</span>
                  <button
                    type="button"
                    onClick={() => setVoucherCodeInput('BERSIHBARU')}
                    className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-amber-300 font-mono"
                  >
                    BERSIHBARU (-20rb)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVoucherCodeInput('SNEAKERHEAD')}
                    className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-amber-300 font-mono"
                  >
                    SNEAKERHEAD (-15%)
                  </button>
                </div>
              </div>

              {/* Order Cost Breakdown Box */}
              <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-2.5">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
                  Ringkasan Rincian Biaya
                </span>

                <div className="flex justify-between text-xs text-neutral-300">
                  <span>Sepatu #1: {currentService.name}</span>
                  <span className="font-mono">Rp {servicePrice.toLocaleString('id-ID')}</span>
                </div>

                {additionalShoes.map((extra, i) => (
                  <div key={i} className="flex justify-between text-xs text-emerald-400">
                    <span>+ Sepatu #{i + 2}: {extra.brand} {extra.model} ({extra.treatmentName})</span>
                    <span className="font-mono">Rp {extra.treatmentPrice?.toLocaleString('id-ID')}</span>
                  </div>
                ))}

                {selectedAddons.map(id => {
                  const item = AVAILABLE_ADDONS.find(a => a.id === id);
                  return (
                    <div key={id} className="flex justify-between text-xs text-neutral-400">
                      <span>+ {item?.name}</span>
                      <span className="font-mono">Rp {item?.price.toLocaleString('id-ID')}</span>
                    </div>
                  );
                })}

                {deliveryMethod === 'pickup_delivery' && (
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>+ Layanan Antar-Jemput (Pickup & Delivery PP)</span>
                    <span className="font-mono">Rp 20.000</span>
                  </div>
                )}

                {discountAmount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-400 font-bold">
                    <span>Potongan Diskon Voucher ({appliedVoucher?.code})</span>
                    <span className="font-mono">-Rp {discountAmount.toLocaleString('id-ID')}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-neutral-800 flex justify-between items-center text-sm">
                  <span className="font-bold text-white">TOTAL BIAYA RESERVASI</span>
                  <span className="font-mono text-lg font-bold text-amber-400">
                    Rp {grandTotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: BOOKING SUKSES */}
          {currentStep === 5 && createdOrder && (
            <div className="space-y-6 text-center py-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  RESERVASI BERHASIL
                </span>
                <h3 className="text-xl font-bold text-white mt-2">
                  Antrean Perawatan Sepatu Terkonfirmasi!
                </h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
                  Pembayaran lunas dan slot jadwal teknisi Anda telah diamankan. Nomor resi unik Anda adalah:
                </p>
                <div className="mt-3 inline-block px-5 py-2.5 rounded-2xl bg-neutral-950 border border-amber-400/40 text-amber-400 font-mono text-lg font-bold tracking-wider">
                  {createdOrder.orderNumber}
                </div>
              </div>

              {/* Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left">
                <button
                  onClick={() => {
                    onViewReceipt(createdOrder);
                  }}
                  className="p-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-neutral-950 flex items-center gap-3 transition-colors shadow-lg shadow-amber-400/20"
                >
                  <FileText className="w-6 h-6 flex-shrink-0 text-neutral-950" />
                  <div className="text-xs">
                    <div className="font-extrabold text-sm">Lihat Struk Digital</div>
                    <div className="text-neutral-800 text-[11px]">Cetak atau simpan bukti reservasi</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onTrackOrder(createdOrder.orderNumber);
                  }}
                  className="p-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 flex items-center gap-3 transition-colors border border-neutral-700"
                >
                  <Sparkles className="w-6 h-6 flex-shrink-0 text-amber-400" />
                  <div className="text-xs">
                    <div className="font-bold text-sm">Lacak Status Sepatu</div>
                    <div className="text-neutral-400 text-[11px]">Pantau progres pengerjaan teknisi</div>
                  </div>
                </button>
              </div>

              <div className="pt-2">
                <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Data antrean Anda telah masuk ke sistem operasional workshop. Tim teknisi akan memulai treatment sesuai jadwal slot.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {currentStep < 5 && (
          <div className="px-6 py-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
                className="px-4 py-2 rounded-xl border border-neutral-700 bg-neutral-900 text-neutral-300 text-xs font-medium hover:bg-neutral-800 flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Kembali
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev + 1) as any)}
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-400/20"
              >
                Lanjutkan
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (!customerName || !whatsapp) {
                    alert('Mohon lengkapi Nama Lengkap dan Nomor WhatsApp aktif terlebih dahulu.');
                    return;
                  }
                  setShowPaymentModal(true);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
              >
                Bayar & Amankan Slot Antrean
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Payment Gateway Child Modal */}
      <PaymentGatewayModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        orderNumber="SC-2026-TEMP"
        amount={grandTotal}
        customerName={customerName || 'Pelanggan ShoeLab'}
        onPaymentSuccess={(method) => handleCreateOrder(method)}
      />
    </div>
  );
};
