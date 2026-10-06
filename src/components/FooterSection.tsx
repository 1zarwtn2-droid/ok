import React from 'react';
import { MapPin, Phone, Clock, ShieldCheck, Mail, Instagram, MessageCircle } from 'lucide-react';
import { ADMIN_WHATSAPP_NUMBER, buildAdminWhatsAppUrl } from '../utils/whatsapp';

interface FooterSectionProps {
  onRequestAdminAccess?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onRequestAdminAccess }) => {
  return (
    <footer id="about" className="bg-neutral-950 border-t border-neutral-900 pt-16 pb-12 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* FAQ Section */}
        <div className="mb-14 pb-12 border-b border-neutral-900">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
              Pertanyaan Umum (FAQ)
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              Informasi Layanan & Prosedur Pengerjaan
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
              <h4 className="font-bold text-neutral-200 text-sm">
                Berapa lama estimasi pengerjaan sepatu?
              </h4>
              <p className="text-neutral-400 leading-relaxed text-xs">
                Layanan Fast Clean Express selesai dalam 24 jam. Deep Clean Signature membutuhkan 48 jam. Khusus unyellowing, repaint, dan reglue sol membutuhkan 72–96 jam demi proses curing dan heat-press maksimal.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
              <h4 className="font-bold text-neutral-200 text-sm">
                Bagaimana sistem notifikasi WhatsApp bekerja?
              </h4>
              <p className="text-neutral-400 leading-relaxed text-xs">
                Setiap kali teknisi kami mengubah status pesanan (sepatu diterima, dicuci, masuk ruang pengeringan, hingga selesai lolos QC), sistem secara otomatis menyiapkan dan mengirimkan update langsung ke WhatsApp Anda.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
              <h4 className="font-bold text-neutral-200 text-sm">
                Bagaimana klaim Garansi Bersih 48 Jam?
              </h4>
              <p className="text-neutral-400 leading-relaxed text-xs">
                Jika Anda merasa noda masih tertinggal atau lem kurang merekat, cukup tunjukkan tanda terima digital dalam 48 jam setelah pengambilan, dan teknisi kami akan mencuci atau merekatkan ulang tanpa biaya tambahan!
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-neutral-900">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-neutral-950 font-black flex items-center justify-center text-sm">
                SL
              </div>
              <span className="font-black text-white text-base tracking-tight">SHOELAB STUDIO</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Jasa servis, cuci, unyellowing, dan restorasi sneaker premium dengan tracking real-time dan notifikasi WhatsApp terpadu.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={buildAdminWhatsAppUrl('Halo Admin ShoeLab Studio, saya ingin menanyakan informasi layanan & operasional workshop.')}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-emerald-400 transition-colors"
                title={`WhatsApp Admin (${ADMIN_WHATSAPP_NUMBER})`}
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Studio Location */}
          <div className="space-y-2">
            <span className="font-bold text-neutral-200 text-xs uppercase tracking-wider block">
              Outlet Workshop
            </span>
            <div className="flex items-start gap-2 text-neutral-400 text-xs">
              <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span>Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 text-xs pt-1">
              <Clock className="w-4 h-4 text-neutral-500 flex-shrink-0" />
              <span>Buka Setiap Hari: 09:00 - 21:00 WIB</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 text-xs">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-mono">0881-4519-955 (WhatsApp Admin)</span>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-2">
            <span className="font-bold text-neutral-200 text-xs uppercase tracking-wider block">
              Layanan Populer
            </span>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Deep Clean Signature 360°</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Unyellowing Midsole Boost & Rubber</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Repaint Upper & Restoration</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Reglue Sol Heat-Press Polyurethane</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Nano Shield Water Repellent</a></li>
            </ul>
          </div>

          {/* Col 4: Guarantees */}
          <div className="space-y-2">
            <span className="font-bold text-neutral-200 text-xs uppercase tracking-wider block">
              Jaminan Layanan
            </span>
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Garansi Bersih 48 Jam</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Pencucian ulang gratis tanpa biaya jika noda masih tampak setelah serah terima.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} ShoeLab Studio. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-neutral-400 transition-colors">Syarat & Ketentuan</a>
            <span>·</span>
            <a href="#" className="hover:text-neutral-400 transition-colors">Kebijakan Privasi</a>
            <span>·</span>
            <a href="#" className="hover:text-neutral-400 transition-colors">SLA Pengerjaan</a>
            {onRequestAdminAccess && (
              <>
                <span>·</span>
                <button
                  type="button"
                  onClick={onRequestAdminAccess}
                  className="hover:text-amber-400 transition-colors text-neutral-500 font-mono"
                >
                  🔒 Console Staff
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
