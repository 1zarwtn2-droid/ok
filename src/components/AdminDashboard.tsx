import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, MessageSquare, Plus, Search, 
  CheckCircle2, Clock, User, Phone, MapPin, Edit3, ArrowUpRight, 
  TrendingUp, Layers, Check, MessageCircle, FileText, ChevronRight, X, Download
} from 'lucide-react';
import { OrderItem, OrderStatus, ServiceItem, CareProductItem, TimelineLog } from '../types';
import { getStatusLabel, generateWhatsAppMessage, buildWhatsAppUrl } from '../utils/whatsapp';

interface AdminDashboardProps {
  orders: OrderItem[];
  services: ServiceItem[];
  careProducts: CareProductItem[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onOpenWhatsAppModal: (order: OrderItem, targetStage?: OrderStatus) => void;
  onOpenReceipt: (order: OrderItem) => void;
  onAddNewOrder: (order: OrderItem) => void;
  onUpdateProductStock: (productId: string, newStock: number) => void;
}

const ALL_STATUSES: { key: OrderStatus; label: string }[] = [
  { key: 'BOOKING_CONFIRMED', label: 'Terkonfirmasi' },
  { key: 'SHOES_RECEIVED', label: 'Diterima Studio' },
  { key: 'IN_TREATMENT', label: 'Proses Pengerjaan' },
  { key: 'DRYING_DETAILING', label: 'Pengeringan & QC' },
  { key: 'READY_PICKUP_DELIVERY', label: 'Siap Diambil/Kirim' },
  { key: 'COMPLETED', label: 'Selesai' }
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders,
  services,
  careProducts,
  onUpdateOrderStatus,
  onOpenWhatsAppModal,
  onOpenReceipt,
  onAddNewOrder,
  onUpdateProductStock
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'notifications'>('orders');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  // New Walk-in Order Modal
  const [isAddWalkInOpen, setIsAddWalkInOpen] = useState(false);
  const [walkInName, setWalkInName] = useState('');
  const [walkInPhone, setWalkInPhone] = useState('');
  const [walkInShoeBrand, setWalkInShoeBrand] = useState('Nike');
  const [walkInShoeModel, setWalkInShoeModel] = useState('');
  const [walkInServiceId, setWalkInServiceId] = useState(services[0]?.id || '');

  // Calculate Metrics
  const totalOrders = orders.length;
  const activeQueue = orders.filter(o => o.status !== 'COMPLETED' && o.status !== 'CANCELLED').length;
  const completedOrders = orders.filter(o => o.status === 'COMPLETED').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'PAID' ? o.totalPrice : 0), 0);

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
        conditionNote: 'Diterima langsung di kasir toko (Walk-in studio).'
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
          description: 'Pelanggan datang langsung ke kasir ShoeLab Studio.',
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

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Banner & KPI Cards */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Workshop Operations Console
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              Dashboard Admin & Antrean Studio
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Kelola status pengerjaan sepatu, pemicu pesan WhatsApp otomatis, stok produk, dan log transaksi secara terpusat.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              title="Unduh Laporan Antrean & Omzet Format CSV"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setIsAddWalkInOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Input Order Walk-In Kasir
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Total Antrean Aktif</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-white">
              {activeQueue} <span className="text-xs font-normal text-neutral-400">Pasang</span>
            </div>
            <p className="text-[11px] text-amber-400/90">Sedang dalam proses pengerjaan</p>
          </div>

          <div className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Selesai Dikerjakan</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-white">
              {completedOrders} <span className="text-xs font-normal text-neutral-400">Pasang</span>
            </div>
            <p className="text-[11px] text-emerald-400/90">Siap diambil atau sudah diserahkan</p>
          </div>

          <div className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Total Pendapatan</span>
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-amber-400">
              Rp {totalRevenue.toLocaleString('id-ID')}
            </div>
            <p className="text-[11px] text-neutral-400">Transaksi lunas via Digital & Cash</p>
          </div>

          <div className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Efisiensi WhatsApp</span>
              <MessageCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-white">
              100% <span className="text-xs font-normal text-neutral-400">Automated</span>
            </div>
            <p className="text-[11px] text-neutral-400">Notifikasi status terkirim real-time</p>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-neutral-800 text-amber-400 border border-amber-400/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            Manajemen Antrean & Order ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
              activeTab === 'inventory'
                ? 'bg-neutral-800 text-amber-400 border border-amber-400/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Katalog Layanan & Stok Produk
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
              activeTab === 'notifications'
                ? 'bg-neutral-800 text-amber-400 border border-amber-400/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Riwayat Notifikasi WhatsApp
          </button>
        </div>
      </div>

      {/* TAB 1: ORDER MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Cari Order ID, Nama Customer, No WA, atau Sepatu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 placeholder:text-neutral-500 outline-none focus:border-amber-400"
              />
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            </div>

            {/* Status pills */}
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

          {/* Table Container */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-neutral-950 text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                  <tr>
                    <th className="py-3 px-4">No. Order & Waktu</th>
                    <th className="py-3 px-4">Pelanggan</th>
                    <th className="py-3 px-4">Sepatu & Layanan</th>
                    <th className="py-3 px-4">Status Pengerjaan (Ubah 1-Klik)</th>
                    <th className="py-3 px-4">Total & Bayar</th>
                    <th className="py-3 px-4 text-right">Aksi WhatsApp & Struk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80">
                  {filteredOrders.map((ord) => {
                    const statusInfo = getStatusLabel(ord.status);
                    return (
                      <tr key={ord.id} className="hover:bg-neutral-800/40 transition-colors">
                        {/* Order & Time */}
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

                        {/* Shoe & Service */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-neutral-200 flex items-center gap-1.5 flex-wrap">
                            <span>{ord.shoe.brand} {ord.shoe.model}</span>
                            {ord.additionalShoes && ord.additionalShoes.length > 0 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                                +{ord.additionalShoes.length} Pasang Ekstra
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-amber-400/90">{ord.serviceName}</div>
                          <div className="text-[10px] text-neutral-500">Teknisi: {ord.technicianName}</div>
                        </td>

                        {/* 1-Click Status Updater */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <select
                              value={ord.status}
                              onChange={(e) => {
                                const newStat = e.target.value as OrderStatus;
                                onUpdateOrderStatus(ord.id, newStat);
                                // Show instant WhatsApp notification trigger
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
                          </div>
                          <span className="text-[10px] text-neutral-500 mt-0.5 block">
                            *Pilih untuk trigger WA otomatis
                          </span>
                        </td>

                        {/* Price & Payment */}
                        <td className="py-3.5 px-4">
                          <div className="font-mono font-bold text-neutral-200">
                            Rp {ord.totalPrice.toLocaleString('id-ID')}
                          </div>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                            ord.paymentStatus === 'PAID'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {ord.paymentStatus === 'PAID' ? 'Lunas' : 'Belum Bayar'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => onOpenWhatsAppModal(ord)}
                              className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 transition-colors"
                              title="Buka Chat WhatsApp"
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
                Tidak ada pesanan yang sesuai dengan filter pencarian.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: INVENTORY & SERVICES */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          {/* Services list */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 space-y-4">
            <h3 className="font-bold text-white text-sm">
              Katalog Paket Treatment & SLA Durasi
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
                    Durasi: {srv.durationHours} Jam · {srv.warranty}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products Stock Adjuster */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 space-y-4">
            <h3 className="font-bold text-white text-sm">
              Stok Produk Perawatan (Real-time Inventory)
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

      {/* TAB 3: NOTIFICATIONS LOG */}
      {activeTab === 'notifications' && (
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-white text-sm">
            Log Riwayat Notifikasi WhatsApp Otomatis
          </h3>
          <p className="text-xs text-neutral-400">
            Daftar pesan notifikasi otomatis yang telah dikirimkan ke nomor WhatsApp customer.
          </p>

          <div className="space-y-3 pt-2">
            {orders.flatMap(o => o.waNotificationHistory.map((log, i) => ({ ...log, orderNumber: o.orderNumber, customerName: o.customer.name, id: `${o.id}-${i}` }))).map((n) => (
              <div key={n.id} className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400">{n.orderNumber}</span>
                    <span className="text-neutral-300 font-semibold">{n.customerName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                      {n.stage}
                    </span>
                  </div>
                  <p className="text-neutral-400 text-[11px] italic">&ldquo;{n.messageSnippet}&rdquo;</p>
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">
                  {n.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
    </div>
  );
};
