import { OrderItem, OrderStatus } from '../types';

export const ADMIN_WHATSAPP_NUMBER = '08814519955';

/**
 * Normalizes an Indonesian phone number to international 62 format
 */
export function formatPhoneNumberForWhatsApp(phone: string): string {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8')) {
    cleaned = '62' + cleaned;
  }
  return cleaned;
}

/**
 * Builds direct WhatsApp URL for Admin Workshop (08814519955)
 */
export function buildAdminWhatsAppUrl(message: string): string {
  return buildWhatsAppUrl(ADMIN_WHATSAPP_NUMBER, message);
}

/**
 * Returns a human-friendly Indonesian label for the order status
 */
export function getStatusLabel(status: OrderStatus): { label: string; color: string; badgeText: string } {
  switch (status) {
    case 'PENDING_PAYMENT':
      return { label: 'Menunggu Pembayaran', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10', badgeText: 'Menunggu Pembayaran' };
    case 'BOOKING_CONFIRMED':
      return { label: 'Jadwal Antrean Dikonfirmasi', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10', badgeText: 'Terkonfirmasi' };
    case 'SHOES_RECEIVED':
      return { label: 'Sepatu Tiba di Workshop', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10', badgeText: 'Diterima Studio' };
    case 'IN_TREATMENT':
      return { label: 'Sedang Dikerjakan Teknisi', color: 'text-violet-400 border-violet-500/30 bg-violet-500/10', badgeText: 'Proses Cuci & Detailing' };
    case 'DRYING_DETAILING':
      return { label: 'Pengeringan & QC Finishing', color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10', badgeText: 'Pengeringan & QC' };
    case 'READY_PICKUP_DELIVERY':
      return { label: 'Selesai & Siap Diambil/Kirim', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10', badgeText: 'Siap Diambil' };
    case 'COMPLETED':
      return { label: 'Pengerjaan Tuntas', color: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/20', badgeText: 'Selesai' };
    case 'CANCELLED':
      return { label: 'Dibatalkan', color: 'text-rose-400 border-rose-500/30 bg-rose-500/10', badgeText: 'Dibatalkan' };
    default:
      return { label: 'Status Tidak Diketahui', color: 'text-neutral-400 border-neutral-700 bg-neutral-800', badgeText: 'Diproses' };
  }
}

/**
 * Generates official formatted WhatsApp notification message for Customer (or Admin report if forAdmin is true)
 */
export function generateWhatsAppMessage(order: OrderItem, currentStage?: OrderStatus, forAdmin: boolean = false): string {
  const stage = currentStage || order.status;
  const storeName = 'SHOELAB PREMIUM STUDIO';
  const trackingUrl = `${window.location.origin}/?track=${order.orderNumber}`;

  let headerTitle = '';
  let statusDetail = '';
  let nextAction = '';

  switch (stage) {
    case 'PENDING_PAYMENT':
      headerTitle = '📋 INVOICE & RESERVASI ANTREAN';
      statusDetail = `Pesanan berhasil dicatat dan sedang menunggu verifikasi pembayaran digital sejumlah *Rp ${order.totalPrice.toLocaleString('id-ID')}*.`;
      nextAction = `Menunggu customer menyelesaikan pembayaran.`;
      break;

    case 'BOOKING_CONFIRMED':
      headerTitle = '✨ KONFIRMASI JADWAL ANTREAN';
      statusDetail = `Reservasi antrean pengerjaan telah *DIKONFIRMASI*. Slot pengerjaan diamankan untuk tanggal *${order.scheduledDate}* pada sesi *${order.scheduledTimeSlot}*.`;
      nextAction = order.deliveryMethod === 'drop_off'
        ? `📍 Customer memilih Drop-off langsung ke Studio.`
        : `🛵 Dijadwalkan penjemputan ke alamat customer: *${order.pickupAddress || order.customer.address || 'Alamat Penjemputan'}*.`;
      break;

    case 'SHOES_RECEIVED':
      headerTitle = '👟 SEPATU TELAH TIBA DI WORKSHOP';
      statusDetail = `Sepatu *${order.shoe.brand} ${order.shoe.model}* telah diterima di Studio dan telah melewati tahap initial inspection (pemeriksaan fisik).`;
      nextAction = `Teknisi penanggung jawab: *${order.technicianName}*.\nCatatan: _${order.shoe.conditionNote}_.`;
      break;

    case 'IN_TREATMENT':
      headerTitle = '🫧 PROSES PENGERJAAN DIMULAI';
      statusDetail = `Sepatu sedang dalam proses pengerjaan *${order.serviceName}* oleh Master Technician (${order.technicianName}).`;
      nextAction = `Proses deep cleaning, deoksidasi, atau repair sedang berlangsung di workstation teknisi.`;
      break;

    case 'DRYING_DETAILING':
      headerTitle = '🌬️ PENGERINGAN & QC FINAL';
      statusDetail = `Pencucian selesai! Sepatu sedang dalam ruang pengeringan bersuhu sejuk steril UV dan aplikasi finishing protector.`;
      nextAction = `Estimasi siap: *${order.estimatedCompletion}*.`;
      break;

    case 'READY_PICKUP_DELIVERY':
      headerTitle = '🎉 SEPATU SELESAI & SIAP DIAMBIL/KIRIM';
      statusDetail = `Sepatu *${order.shoe.brand} ${order.shoe.model}* sudah 100% bersih, wangi, dan lolos Quality Control (QC) ShoeLab!`;
      nextAction = order.deliveryMethod === 'drop_off'
        ? `Siap diserahkan saat customer datang ke kasir studio.`
        : `Siap diserahkan ke kurir untuk pengantaran ke alamat customer.`;
      break;

    case 'COMPLETED':
      headerTitle = '🙏 TRANSAKSI PENGERJAAN TUNTAS';
      statusDetail = `Pengerjaan pesanan *${order.orderNumber}* telah tuntas diserahkan kepada customer. Garansi kepuasan 48 jam aktif.`;
      nextAction = `Status pesanan ditandai COMPLETED di database studio.`;
      break;

    case 'CANCELLED':
      headerTitle = '⚠️ PEMBATALAN PESANAN';
      statusDetail = `Pesanan antrean *${order.orderNumber}* telah dibatalkan.`;
      nextAction = `Data antrean telah diperbarui.`;
      break;
  }

  if (forAdmin) {
    return `*🔔 UPDATE STATUS OPERASIONAL WORKSHOP*
*${storeName} (ADMIN REPORT)*
━━━━━━━━━━━━━━━━━━
Halo Tim Admin & Workshop,

Terdapat pembaruan status pengerjaan sepatu berikut:

📌 *Detail Pesanan:*
• No. Resi: *${order.orderNumber}*
• Status Terkini: *${headerTitle}*
• Customer: *${order.customer.name}* (WA: ${order.customer.whatsapp})
• Sepatu: *${order.shoe.brand} ${order.shoe.model}* (${order.shoe.material})
• Layanan: *${order.serviceName}*
• Metode: *${order.deliveryMethod === 'drop_off' ? 'Drop-off Studio' : 'Pickup & Delivery'}*
• Total Biaya: *Rp ${order.totalPrice.toLocaleString('id-ID')}* (${order.paymentStatus === 'PAID' ? '✅ Lunas' : '⏳ Belum Lunas'})
• Teknisi: *${order.technicianName}*
• Estimasi Selesai: *${order.estimatedCompletion}*

📝 *Keterangan Progres:*
${statusDetail}
${nextAction}

🔍 *Lacak Detail Order & Foto QC:*
${trackingUrl}

_Pesan otomatis sistem operasional ShoeLab Studio._`;
  }

  return `*${headerTitle}*
*${storeName}*
━━━━━━━━━━━━━━━━━━
Halo Kak *${order.customer.name}*,

${statusDetail}

📌 *Detail Pesanan:*
• No. Resi: *${order.orderNumber}*
• Sepatu: *${order.shoe.brand} ${order.shoe.model}* (${order.shoe.material})
• Layanan: *${order.serviceName}*
• Metode: *${order.deliveryMethod === 'drop_off' ? 'Drop-off di Studio' : 'Pickup & Delivery'}*
• Status Pembayaran: *${order.paymentStatus === 'PAID' ? '✅ Lunas (Rp ' + order.totalPrice.toLocaleString('id-ID') + ')' : '⏳ Belum Dibayar'}*
• Teknisi: *${order.technicianName}*
• Estimasi Selesai: *${order.estimatedCompletion}*

${nextAction}

🔍 *Lacak Progres Real-Time & Foto Before/After:*
${trackingUrl}

Ada pertanyaan? Balas pesan ini kapan saja.
_Pelayanan terbaik untuk sepatu kesayangan Anda._ ✨`;
}

/**
 * Builds direct WhatsApp URL (wa.me link)
 */
export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const formattedPhone = formatPhoneNumberForWhatsApp(phoneNumber);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedText}`;
}
