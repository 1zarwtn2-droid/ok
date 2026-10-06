import { OrderItem, OrderStatus } from '../types';

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
 * Generates official formatted WhatsApp notification message
 */
export function generateWhatsAppMessage(order: OrderItem, currentStage?: OrderStatus): string {
  const stage = currentStage || order.status;
  const storeName = 'SHOELAB PREMIUM STUDIO';
  const trackingUrl = `${window.location.origin}/?track=${order.orderNumber}`;

  let headerTitle = '';
  let statusDetail = '';
  let nextAction = '';

  switch (stage) {
    case 'PENDING_PAYMENT':
      headerTitle = '📋 INVOICE & RESERVASI ANTREAN';
      statusDetail = `Pesanan Anda berhasil dicatat dan sedang menunggu verifikasi pembayaran digital sejumlah *Rp ${order.totalPrice.toLocaleString('id-ID')}*.`;
      nextAction = `Silakan selesaikan pembayaran untuk mengamankan kuota slot antrean pengerjaan teknisi kami.`;
      break;

    case 'BOOKING_CONFIRMED':
      headerTitle = '✨ KONFIRMASI JADWAL ANTREAN';
      statusDetail = `Reservasi antrean pengerjaan Anda telah *DITERIMA & DIKONFIRMASI*. Slot pengerjaan telah diamankan untuk tanggal *${order.scheduledDate}* pada sesi *${order.scheduledTimeSlot}*.`;
      nextAction = order.deliveryMethod === 'drop_off'
        ? `📍 Silakan bawa sepatu Anda ke outlet: *Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan* sebelum batas waktu slot.`
        : `🛵 Kurir kami akan menjemput sepatu di alamat: *${order.pickupAddress || order.customer.address || 'Alamat Penjemputan'}* sesuai jadwal.`;
      break;

    case 'SHOES_RECEIVED':
      headerTitle = '👟 SEPATU TELAH TIBA DI WORKSHOP';
      statusDetail = `Sepatu *${order.shoe.brand} ${order.shoe.model}* telah kami terima di Studio dan telah melewati tahap initial inspection (pemeriksaan kondisi noda, lem, dan bahan).`;
      nextAction = `Teknisi penanggung jawab: *${order.technicianName}*.\nKondisi terdata: _${order.shoe.conditionNote}_.`;
      break;

    case 'IN_TREATMENT':
      headerTitle = '🫧 PROSES PENGERJAAN DIMULAI';
      statusDetail = `Sepatu Anda saat ini sedang dalam proses *${order.serviceName}* oleh Master Technician kami (${order.technicianName}).`;
      nextAction = `Kami menggunakan cairan pembersih formula ramah material dan teknik deep scrubbing aman serat kain.`;
      break;

    case 'DRYING_DETAILING':
      headerTitle = '🌬️ PENGERINGAN & QC FINAL';
      statusDetail = `Pencucian selesai! Sepatu sedang dalam ruang pengeringan bersuhu sejuk (no-direct-UV) serta penyemprotan anti-bakteri deodorizer dan detailing sol.`;
      nextAction = `Estimasi siap: *${order.estimatedCompletion}*.`;
      break;

    case 'READY_PICKUP_DELIVERY':
      headerTitle = '🎉 SEPATU SELESAI & SIAP DIAMBIL!';
      statusDetail = `Kabar gembira! Sepatu *${order.shoe.brand} ${order.shoe.model}* sudah 100% bersih, wangi, dan lolos Quality Control (QC) ShoeLab!`;
      nextAction = order.deliveryMethod === 'drop_off'
        ? `Silakan ambil di outlet kami dengan menunjukkan nomor resi ini kepada kasir studio.`
        : `Kurir kami segera mengantarkan sepatu langsung ke alamat Anda. Pastikan penerima dapat dihubungi.`;
      break;

    case 'COMPLETED':
      headerTitle = '🙏 TERIMA KASIH ATAS KEPERCAYAAN ANDA';
      statusDetail = `Pengerjaan pesanan *${order.orderNumber}* telah tuntas diserahkan. Kami memberikan *Garansi Kepuasan 48 Jam*.`;
      nextAction = `Bagikan ulasan dan foto sepatu bersih Anda untuk mendapatkan voucher potongan 15% pada servis berikutnya!`;
      break;

    case 'CANCELLED':
      headerTitle = '⚠️ PEMBATALAN PESANAN';
      statusDetail = `Pesanan antrean *${order.orderNumber}* telah dibatalkan sesuai permintaan.`;
      nextAction = `Jika ada kekeliruan, silakan hubungi customer support kami.`;
      break;
  }

  const message = 
`*${headerTitle}*
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

  return message;
}

/**
 * Builds direct WhatsApp URL (wa.me link)
 */
export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const formattedPhone = formatPhoneNumberForWhatsApp(phoneNumber);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedText}`;
}
