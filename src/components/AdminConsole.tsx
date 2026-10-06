import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, MessageSquare, Plus, Search, 
  CheckCircle2, Clock, User, Phone, MapPin, Edit3, ArrowUpRight, 
  TrendingUp, Layers, Check, MessageCircle, FileText, ChevronRight, X, 
  Download, LogOut, ShieldCheck, Truck, Star, AlertCircle, RefreshCw,
  Sliders, Calendar, ArrowLeft, Eye
} from 'lucide-react';
import { OrderItem, OrderStatus, ServiceItem, CareProductItem, ReviewItem, TimelineLog } from '../types';
import { getStatusLabel, generateWhatsAppMessage, buildWhatsAppUrl, ADMIN_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface AdminConsoleProps {
  orders: OrderItem[];
  services: ServiceItem[];
  careProducts: CareProductItem[];
  reviews: ReviewItem[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onOpenWhatsAppModal: (order: OrderItem, targetStage?: OrderStatus) => void;
  onOpenReceipt: (order: OrderItem) => void;
  onAddNewOrder: (order: OrderItem) => void;
  onUpdateProductStock: (productId: string, newStock: number) => void;
  onAddReviewReply: (reviewId: string, reply: string) => void;
  onExitAdmin: () => void;
}

const ALL_STATUSES: { key: OrderStatus; label: string }[] = [
  { key: 'BOOKING_CONFIRMED', label: 'Terkonfirmasi' },
  { key: 'SHOES_RECEIVED', label: 'Diterima Studio' },
  { key: 'IN_TREATMENT', label: 'Proses Pengerjaan' },
  { key: 'DRYING_DETAILING', label: 'Pengeringan & QC' },
  { key: 'READY_PICKUP_DELIVERY', label: 'Siap Diambil/Kirim' },
  { key: 'COMPLETED', label: 'Selesai' }
];

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  orders,
  services,
  careProducts,
  reviews,
  onUpdateOrderStatus,
  onOpenWhatsAppModal,
  onOpenReceipt,
  onAddNewOrder,
  onUpdateProductStock,
  onAddReviewReply,
  onExitAdmin
}) => {
  const [activeMenu, setActiveMenu] = useState<'overview' | 'queue' | 'inventory' | 'logistics' | 'whatsapp' | 'reviews'>('queue');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(true);

  // Walk-in order modal state
  const [isAddWalkInOpen, setIsAddWalkInOpen] = useState(false);
  const [walkInName, setWalkInName] = useState('');
  const [walkInPhone, setWalkInPhone] = useState('');
  const [walkInShoeBrand, setWalkInShoeBrand] = useState('Nike');
  const [walkInShoeModel, setWalkInShoeModel] = useState('');
  const [walkInServiceId, setWalkInServiceId] = useState(services[0]?.id || '');

  // Review reply state
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Selected Order for quick inspection modal
  const [inspectOrder, setInspectOrder] = useState<OrderItem | null>(null);

  // Metrics
  const totalOrders = orders.length;
  const activeQueue = orders.filter(o => o.status !== 'COMPLETED' && o.status !== 'CANCELLED').length;
  const completedOrders = orders.filter(o => o.status === 'COMPLETED').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'PAID' ? o.totalPrice : 0), 0);
  const pickupDeliveryOrders = orders.filter(o => o.deliveryMethod === 'pickup_delivery');

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.whatsapp.includes(searchQuery) ||
      o.shoe.model.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = ['Order Number', 'Date', 'Customer Name', 'WhatsApp', 'Primary Shoe', 'Total Shoes', 'Service', 'Total Price', 'Status', 'Payment Status'];
    const rows = orders.map(o => [
      o.orderNumber,
      o.createdAt,
      `"${o.customer.name.replace(/"/g, '""')}"`,
      `"${o.customer.whatsapp}"`,
      `"${o.shoe.brand} ${o.shoe.model}"`,
      1 + (o.additionalShoes?.length || 0),
      `"${o.serviceName}"`,
      o.totalPrice,
      o.status,
      o.paymentStatus
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `shoelab_antrean_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWalkInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkInName || !walkInPhone) return;

    const srv = services.find(s => s.id === walkInServiceId) || services[0];
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `SC-2026-${randomId}`;
    const now = new Date();
    const formattedNow = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: formattedNow,
      serviceId: srv.id,
      serviceName: srv.name,
      servicePrice: srv.price,
      addOns: [],
      purchasedProducts: [],
      totalPrice: srv.price,
      shoe: {
        brand: walkInShoeBrand,
        model: walkInShoeModel || 'Sneakers Walk-In',
        color: 'Sesuai Fisik',
        material: 'Leather',
        conditionNote: 'Diterima langsung di kasir studio.'
      },
      customer: {
        name: walkInName,
        whatsapp: walkInPhone,
        email: ''
      },
      deliveryMethod: 'drop_off',
      scheduledDate: formattedNow.split(' ')[0],
      scheduledTimeSlot: 'Drop-off Langsung',
      status: 'SHOES_RECEIVED',
      paymentStatus: 'PAID',
      paymentMethod: 'cash_on_store',
      paymentTime: formattedNow,
      technicianName: 'Bima Santoso (Lead Specialist)',
      estimatedCompletion: '2 hari kerja',
      timeline: [
        {
          status: 'SHOES_RECEIVED',
          title: 'Sepatu Diterima di Studio (Walk-in)',
          description: 'Pelanggan datang langsung ke kasir ShoeLab Studio Senopati.',
          timestamp: formattedNow,
          updatedBy: 'Kasir Studio'
        }
      ],
      waNotificationHistory: [
        {
          timestamp: formattedNow,
          stage: 'SHOES_RECEIVED',
          recipient: walkInPhone,
          messageSnippet: 'Sepatu telah kami terima di Studio ShoeLab...'
        }
      ]
    };

    onAddNewOrder(newOrder);
    setIsAddWalkInOpen(false);
    setWalkInName('');
    setWalkInPhone('');
    setWalkInShoeModel('');
  };

  const handleSaveReviewReply = (reviewId: string) => {
    if (!replyText.trim()) return;
    onAddReviewReply(reviewId, replyText.trim());
    setReplyingReviewId(null);
    setReplyText('');
  };

  const handleSendDailySummaryToAdminWA = () => {
    const summaryText = 
`*📊 REKAP LAPORAN HARIAN WORKSHOP*
*SHOELAB STUDIO - SENT TO ADMIN (${ADMIN_WHATSAPP_NUMBER})*
━━━━━━━━━━━━━━━━━━
Halo Admin ShoeLab, berikut rangkuman operasional workshop hari ini:

📌 *Ringkasan KPI:*
• Total Antrean Berjalan: *${activeQueue} Pasang*
• Selesai Lolos QC: *${completedOrders} Pasang*
• Total Omzet Terdata: *Rp ${totalRevenue.toLocaleString('id-ID')}*
• Pesanan Antar-Jemput: *${pickupDeliveryOrders.length} Order*

📊 *Rincian Status:*
${ALL_STATUSES.map(s => `• ${s.label}: ${orders.filter(o => o.status === s.key).length} pasang`).join('\n')}

_Laporan otomatis dikirim dari Console Admin Workshop._`;

    const url = buildWhatsAppUrl(ADMIN_WHATSAPP_NUMBER, summaryText);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col md:flex-row font-sans selection:bg-amber-400 selection:text-neutral-950">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col justify-between p-4 flex-shrink-0">
        <div className="space-y-6">
          {/* Logo & Portal Identity */}
          <div className="px-2 pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-black text-sm shadow-md">
                SL
              </div>
              <div>
                <h2 className="font-extrabold text-sm text-white tracking-tight flex items-center gap-1.5">
                  SHOELAB <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono">STAFF</span>
                </h2>
                <p className="text-[10px] text-neutral-400 font-mono">
                  WORKSHOP CONSOLE
                </p>
              </div>
            </div>
          </div>

          {/* Active Branch info card */}
          <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-neutral-500">Cabang Workshop</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="font-bold text-neutral-200">Senopati HQ (Jaksel)</div>
            <div className="text-[11px] text-neutral-400 flex items-center justify-between pt-1">
              <span>Status Toko:</span>
              <button
                type="button"
                onClick={() => setIsWorkshopOpen(!isWorkshopOpen)}
                className={`text-[10px] px-2 py-0.5 rounded font-bold transition-colors ${
                  isWorkshopOpen ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}
              >
                {isWorkshopOpen ? 'Buka (Open)' : 'Tutup Sementara'}
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1 text-xs font-medium">
            <button
              onClick={() => setActiveMenu('queue')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeMenu === 'queue'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/10'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4" />
                <span>Antrean Pengerjaan</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold ${
                activeMenu === 'queue' ? 'bg-neutral-950 text-amber-300' : 'bg-neutral-800 text-neutral-300'
              }`}>
                {activeQueue}
              </span>
            </button>

            <button
              onClick={() => setActiveMenu('overview')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all ${
                activeMenu === 'overview'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/10'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Ringkasan & KPI Omzet</span>
            </button>

            <button
              onClick={() => setActiveMenu('inventory')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all ${
                activeMenu === 'inventory'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/10'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Katalog & Stok Bahan</span>
            </button>

            <button
              onClick={() => setActiveMenu('logistics')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeMenu === 'logistics'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/10'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4" />
                <span>Kurir & Penjemputan</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
                activeMenu === 'logistics' ? 'bg-neutral-950 text-amber-300' : 'bg-neutral-800 text-neutral-400'
              }`}>
                {pickupDeliveryOrders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveMenu('whatsapp')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all ${
                activeMenu === 'whatsapp'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/10'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Log WhatsApp Alert</span>
            </button>

            <button
              onClick={() => setActiveMenu('reviews')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeMenu === 'reviews'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/10'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4" />
                <span>Moderasi Ulasan</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
                activeMenu === 'reviews' ? 'bg-neutral-950 text-amber-300' : 'bg-neutral-800 text-neutral-400'
              }`}>
                {reviews.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Bottom Sidebar Controls */}
        <div className="pt-4 border-t border-neutral-800 space-y-3">
          <div className="px-2 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs">
              BS
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-neutral-200 truncate">Bima Santoso</div>
              <div className="text-[10px] text-neutral-400 truncate">Head of Workshop Master</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onExitAdmin}
            className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
            <span>Kembali ke Website Pelanggan</span>
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 px-6 bg-neutral-900/80 border-b border-neutral-800 flex items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400">Console Workshop</span>
            <span className="text-neutral-600">/</span>
            <span className="text-xs font-bold text-white capitalize">
              {activeMenu === 'queue' ? 'Antrean Pengerjaan & Live Status' :
               activeMenu === 'overview' ? 'Ringkasan Eksekutif & Omzet' :
               activeMenu === 'inventory' ? 'Katalog Layanan & Stok Bahan' :
               activeMenu === 'logistics' ? 'Kurir Antar-Jemput' :
               activeMenu === 'whatsapp' ? 'Riwayat Notifikasi WhatsApp' : 'Moderasi Ulasan'}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSendDailySummaryToAdminWA}
              className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              title="Kirim Ringkasan Operasional Hari ini ke WhatsApp Admin (08814519955)"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Rekap ke WA Admin ({ADMIN_WHATSAPP_NUMBER})</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              title="Unduh Laporan Antrean & Omzet Format CSV"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={() => setIsAddWalkInOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Input Order Kasir</span>
            </button>
          </div>
        </header>

        {/* View Content Area */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* TAB 1: QUEUE MANAGEMENT */}
          {activeMenu === 'queue' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* WhatsApp Notification Routing Notice */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-emerald-300">Pengiriman Notifikasi Live ke Pelanggan:</span>
                    <span className="text-neutral-300 ml-1.5">
                      Setiap update status pengerjaan yang diubah admin/staff akan disiapkan untuk dikirimkan langsung ke nomor WhatsApp Pelanggan terkait.
                    </span>
                  </div>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold whitespace-nowrap self-start sm:self-auto border border-emerald-500/30">
                  NOTIF LIVE: WA PELANGGAN
                </span>
              </div>

              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Cari Resi, Nama Customer, No WA, atau Sepatu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 placeholder:text-neutral-500 outline-none focus:border-amber-400"
                  />
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                      statusFilter === 'all'
                        ? 'bg-neutral-800 text-white font-bold'
                        : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Semua ({orders.length})
                  </button>
                  {ALL_STATUSES.map(s => (
                    <button
                      key={s.key}
                      onClick={() => setStatusFilter(s.key)}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                        statusFilter === s.key
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold'
                          : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-neutral-300">
                    <thead className="bg-neutral-950 text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                      <tr>
                        <th className="py-3 px-4">No. Resi Order</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Detail Sepatu</th>
                        <th className="py-3 px-4">Treatment & Biaya</th>
                        <th className="py-3 px-4">Ubah Status (Auto-Trigger WA)</th>
                        <th className="py-3 px-4 text-right">Aksi Cepat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/80">
                      {filteredOrders.map((ord) => {
                        const statusInfo = getStatusLabel(ord.status);
                        return (
                          <tr key={ord.id} className="hover:bg-neutral-800/40 transition-colors">
                            {/* Resi & Time */}
                            <td className="py-3.5 px-4 font-mono">
                              <span className="font-bold text-neutral-100 block">{ord.orderNumber}</span>
                              <span className="text-[10px] text-neutral-500">{ord.createdAt}</span>
                            </td>

                            {/* Customer */}
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-neutral-200">{ord.customer.name}</div>
                              <div className="text-[11px] text-neutral-400 font-mono flex items-center gap-1">
                                <Phone className="w-3 h-3 text-emerald-400" />
                                {ord.customer.whatsapp}
                              </div>
                            </td>

                            {/* Shoe */}
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-neutral-200 flex items-center gap-1.5 flex-wrap">
                                <span>{ord.shoe.brand} {ord.shoe.model}</span>
                                {ord.additionalShoes && ord.additionalShoes.length > 0 && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                                    +{ord.additionalShoes.length} Pasang
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-neutral-500">{ord.shoe.material} · {ord.shoe.color}</div>
                            </td>

                            {/* Treatment & Total */}
                            <td className="py-3.5 px-4">
                              <div className="text-[11px] text-amber-400/90 font-medium">{ord.serviceName}</div>
                              <div className="font-mono font-bold text-neutral-200">
                                Rp {ord.totalPrice.toLocaleString('id-ID')}
                              </div>
                              <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                                ord.paymentStatus === 'PAID' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                              }`}>
                                {ord.paymentStatus === 'PAID' ? 'Lunas' : 'Belum Bayar'}
                              </span>
                            </td>

                            {/* 1-Click Status Updater */}
                            <td className="py-3.5 px-4">
                              <select
                                value={ord.status}
                                onChange={(e) => {
                                  const newStat = e.target.value as OrderStatus;
                                  onUpdateOrderStatus(ord.id, newStat);
                                  onOpenWhatsAppModal(ord, newStat);
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs font-semibold focus:border-amber-400 outline-none cursor-pointer"
                              >
                                {ALL_STATUSES.map((st) => (
                                  <option key={st.key} value={st.key}>
                                    {st.label}
                                  </option>
                                ))}
                              </select>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setInspectOrder(ord)}
                                  className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                                  title="Lihat Detail Pesanan"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => onOpenWhatsAppModal(ord)}
                                  className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 transition-colors"
                                  title={`Kirim Notifikasi Live ke WA Pelanggan (${ord.customer.name} - ${ord.customer.whatsapp})`}
                                >
                                  <MessageCircle className="w-4 h-4" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => onOpenReceipt(ord)}
                                  className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
                                  title="Cetak Tanda Terima Struk"
                                >
                                  <FileText className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredOrders.length === 0 && (
                  <div className="py-12 text-center text-neutral-500 text-xs">
                    Tidak ada pesanan yang sesuai dengan kriteria filter pencarian.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: OVERVIEW & KPI ANALYTICS */}
          {activeMenu === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-neutral-400 text-xs">
                    <span>Total Antrean Aktif</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-white">
                    {activeQueue} <span className="text-xs font-normal text-neutral-400">Pasang</span>
                  </div>
                  <p className="text-[11px] text-amber-400/90">Workshop capacity normal</p>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-neutral-400 text-xs">
                    <span>Selesai Dikerjakan</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-white">
                    {completedOrders} <span className="text-xs font-normal text-neutral-400">Pasang</span>
                  </div>
                  <p className="text-[11px] text-emerald-400/90">Lolos QC 100%</p>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-neutral-400 text-xs">
                    <span>Total Omzet Studio</span>
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-amber-400">
                    Rp {totalRevenue.toLocaleString('id-ID')}
                  </div>
                  <p className="text-[11px] text-neutral-400">Termasuk QRIS, VA, dan Kasir</p>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-neutral-400 text-xs">
                    <span>Otomasi WhatsApp</span>
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-white">
                    100% <span className="text-xs font-normal text-neutral-400">Terkirim</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">Real-time status tracking</p>
                </div>
              </div>

              {/* Status Breakdown Distribution */}
              <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                <h4 className="font-bold text-sm text-white">Distribusi Beban Kerja Antrean Studio</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {ALL_STATUSES.map(st => {
                    const count = orders.filter(o => o.status === st.key).length;
                    return (
                      <div key={st.key} className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1">
                        <span className="text-neutral-400 block text-[11px] truncate">{st.label}</span>
                        <div className="font-mono font-bold text-lg text-amber-400">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INVENTORY & SERVICES */}
          {activeMenu === 'inventory' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
                <h3 className="font-bold text-white text-sm">
                  Daftar Layanan Treatment Sepatu ({services.length} Treatment)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {services.map(srv => (
                    <div key={srv.id} className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2 text-xs">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-neutral-200">{srv.name}</span>
                        <span className="font-mono text-amber-400 font-bold">
                          Rp {srv.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        Durasi SLA: {srv.durationHours} Jam · {srv.warranty}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Products Stock Adjuster */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
                <h3 className="font-bold text-white text-sm">
                  Stok Produk Perawatan & Chemical (Real-time Inventory)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {careProducts.map(p => (
                    <div key={p.id} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <div className="font-bold text-neutral-200">{p.name}</div>
                          <span className="font-mono text-amber-400">Rp {p.price.toLocaleString('id-ID')}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-neutral-900">
                        <span className="text-neutral-400">Sisa Stok:</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onUpdateProductStock(p.id, Math.max(0, p.stock - 1))}
                            className="w-6 h-6 rounded bg-neutral-800 text-neutral-200 font-bold hover:bg-neutral-700 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="font-mono font-bold text-white text-sm px-1.5">{p.stock}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateProductStock(p.id, p.stock + 1)}
                            className="w-6 h-6 rounded bg-neutral-800 text-neutral-200 font-bold hover:bg-neutral-700 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LOGISTICS & COURIER */}
          {activeMenu === 'logistics' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm">
                      Daftar Penjemputan & Pengantaran Sepatu (Pickup & Delivery)
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Pantau rute kurir dan status serah terima sepatu ke alamat pelanggan.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-neutral-950 px-3 py-1 rounded-xl border border-neutral-800">
                    Total: {pickupDeliveryOrders.length} Penjemputan
                  </span>
                </div>

                <div className="space-y-3">
                  {pickupDeliveryOrders.map((ord) => (
                    <div key={ord.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-400">{ord.orderNumber}</span>
                          <span className="font-bold text-white">{ord.customer.name}</span>
                          <span className="text-neutral-500 font-mono">({ord.customer.whatsapp})</span>
                        </div>
                        <div className="text-neutral-400 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
                          <span>{ord.pickupAddress || ord.customer.address || 'Alamat Penjemputan'}</span>
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Jadwal: {ord.scheduledDate} ({ord.scheduledTimeSlot}) · Driver: {ord.courierTracking?.driverName || 'Pak Hendra (0812-9988-1122)'}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${ord.customer.whatsapp}?text=${encodeURIComponent(`Halo Kak ${ord.customer.name}, kurir ShoeLab sedang menuju alamat untuk penjemputan sepatu ${ord.orderNumber}. Mohon bersiap ya!`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 font-semibold text-xs flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Chat Customer
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: WHATSAPP AUDIT TRAIL */}
          {activeMenu === 'whatsapp' && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-5 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                    <span>Log & Pengiriman Notifikasi Live ke Pelanggan</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Pusat pengiriman notifikasi pembaruan status pengerjaan sepatu langsung ke nomor WhatsApp Pelanggan.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-xl bg-neutral-950 border border-neutral-800 text-emerald-400 font-bold">
                    Target: WhatsApp Customer
                  </span>
                </div>
              </div>

              {/* Status summary banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-500">Penerima Notifikasi Live</span>
                  <div className="font-bold text-sm text-white">Nomor WA Masing-masing Pelanggan</div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Terhubung Otomatis
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-500">Aksi Admin Staff</span>
                  <div className="font-semibold text-xs text-amber-300">1-Klik Kirim via WhatsApp Web/App</div>
                  <div className="text-[11px] text-neutral-400">Pesan otomatis terformat rapi</div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-500">Total Log Notifikasi</span>
                  <div className="font-mono font-bold text-base text-white">
                    {orders.reduce((sum, o) => sum + o.waNotificationHistory.length, 0)} Notifikasi
                  </div>
                  <div className="text-[11px] text-neutral-400">Audit trail riwayat update</div>
                </div>
              </div>

              {/* Log stream */}
              <div className="space-y-2.5 max-h-[550px] overflow-y-auto pr-1">
                {orders.flatMap(o => o.waNotificationHistory.map((log, i) => ({ 
                  ...log, 
                  order: o,
                  orderNumber: o.orderNumber, 
                  customerName: o.customer.name, 
                  customerPhone: o.customer.whatsapp,
                  id: `${o.id}-${i}` 
                }))).map((n) => (
                  <div key={n.id} className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-neutral-700 transition-colors">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-amber-400">{n.orderNumber}</span>
                        <span className="text-neutral-200 font-semibold">{n.customerName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                          {n.stage}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono border border-neutral-700">
                          Tujuan: WA Pelanggan ({n.customerPhone})
                        </span>
                      </div>
                      <p className="text-neutral-400 text-[11px] italic">&ldquo;{n.messageSnippet}&rdquo;</p>
                      <div className="text-[10px] text-neutral-500 font-mono">
                        {n.timestamp}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => onOpenWhatsAppModal(n.order, n.stage as OrderStatus)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-emerald-500/30"
                        title={`Buka & Kirim Notif Live ke WA Pelanggan (${n.customerPhone})`}
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Kirim ke {n.customerPhone}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: REVIEWS MODERATION */}
          {activeMenu === 'reviews' && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4 animate-in fade-in duration-150">
              <h3 className="font-bold text-white text-sm">
                Moderasi & Balasan Ulasan Pelanggan ({reviews.length})
              </h3>
              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{rev.customerName}</span>
                          <span className="font-mono text-neutral-500 text-[11px]">({rev.orderNumber})</span>
                        </div>
                        <div className="text-neutral-400 text-[11px]">
                          {rev.shoeModel} · {rev.serviceName}
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-neutral-300 italic">&ldquo;{rev.comment}&rdquo;</p>

                    {rev.replyFromAdmin ? (
                      <div className="p-2.5 rounded-lg bg-neutral-900 text-[11px] text-neutral-400 border border-neutral-800">
                        <span className="font-bold text-amber-400">Balasan Studio: </span>
                        <span>{rev.replyFromAdmin}</span>
                      </div>
                    ) : (
                      <div>
                        {replyingReviewId === rev.id ? (
                          <div className="flex gap-2 pt-1">
                            <input
                              type="text"
                              placeholder="Tulis balasan resmi studio..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveReviewReply(rev.id)}
                              className="px-3 py-1.5 rounded-lg bg-amber-400 text-neutral-950 font-bold text-xs"
                            >
                              Kirim
                            </button>
                            <button
                              type="button"
                              onClick={() => setReplyingReviewId(null)}
                              className="px-2 py-1.5 rounded-lg bg-neutral-800 text-neutral-400 text-xs"
                            >
                              Batal
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setReplyingReviewId(rev.id);
                              setReplyText('');
                            }}
                            className="text-[11px] font-semibold text-amber-400 hover:underline"
                          >
                            + Beri Balasan Resmi Studio
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Walk-in Order Modal */}
      {isAddWalkInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
              <h3 className="font-bold text-white text-base">
                Input Order Walk-in (Kasir Studio)
              </h3>
              <button
                onClick={() => setIsAddWalkInOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleWalkInSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-300 block mb-1">Nama Customer *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap"
                  value={walkInName}
                  onChange={(e) => setWalkInName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">No. WhatsApp Customer *</label>
                <input
                  type="tel"
                  required
                  placeholder="08xxxxxxxxxx"
                  value={walkInPhone}
                  onChange={(e) => setWalkInPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white outline-none font-mono focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1">Merk Sepatu</label>
                  <input
                    type="text"
                    value={walkInShoeBrand}
                    onChange={(e) => setWalkInShoeBrand(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">Model Sepatu</label>
                  <input
                    type="text"
                    placeholder="Contoh: Air Max 97"
                    value={walkInShoeModel}
                    onChange={(e) => setWalkInShoeModel(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Pilihan Layanan</label>
                <select
                  value={walkInServiceId}
                  onChange={(e) => setWalkInServiceId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white outline-none focus:border-amber-400"
                >
                  {services.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} - Rp {s.price.toLocaleString('id-ID')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddWalkInOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold"
                >
                  Simpan & Terbitkan Resi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Order Modal */}
      {inspectOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
              <span className="font-mono font-bold text-amber-400 text-base">{inspectOrder.orderNumber}</span>
              <button onClick={() => setInspectOrder(null)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs space-y-2 text-neutral-300">
              <p><strong>Customer:</strong> {inspectOrder.customer.name} ({inspectOrder.customer.whatsapp})</p>
              <p><strong>Sepatu:</strong> {inspectOrder.shoe.brand} {inspectOrder.shoe.model} ({inspectOrder.shoe.material})</p>
              <p><strong>Layanan:</strong> {inspectOrder.serviceName}</p>
              <p><strong>Catatan Awal:</strong> {inspectOrder.shoe.conditionNote}</p>
              <p><strong>Teknisi:</strong> {inspectOrder.technicianName}</p>
              <p><strong>Metode:</strong> {inspectOrder.deliveryMethod === 'drop_off' ? 'Drop-off Studio' : 'Pickup & Delivery'}</p>
              <p><strong>Total:</strong> Rp {inspectOrder.totalPrice.toLocaleString('id-ID')} ({inspectOrder.paymentStatus})</p>
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  const o = inspectOrder;
                  setInspectOrder(null);
                  onOpenReceipt(o);
                }}
                className="px-3.5 py-2 rounded-xl bg-neutral-800 text-neutral-200 text-xs font-semibold"
              >
                Lihat Struk Digital
              </button>
              <button
                type="button"
                onClick={() => {
                  const o = inspectOrder;
                  setInspectOrder(null);
                  onOpenWhatsAppModal(o);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
              >
                Kirim Notif ke WA Pelanggan ({inspectOrder.customer.whatsapp})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
