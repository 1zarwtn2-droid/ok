import React, { useState } from 'react';
import { Sparkles, X, Check, ArrowRight, ShieldCheck, Clock, Calculator } from 'lucide-react';
import { ServiceItem } from '../types';

interface ShoeDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  onSelectTreatment: (serviceId: string) => void;
}

interface IssueOption {
  id: string;
  title: string;
  desc: string;
  icon: string;
  recommendedServiceId: string;
  recommendedAddonName: string;
}

const COMMON_ISSUES: IssueOption[] = [
  {
    id: 'issue-yellowing',
    title: 'Sol Kuning / Oksidasi UV',
    desc: 'Midsole karet putih atau sol transparan (boost/icy sole) berubah menjadi kuning kusam akibat sinar matahari.',
    icon: '☀️',
    recommendedServiceId: 'srv-unyellowing',
    recommendedAddonName: 'Nano Shield Water Repellent'
  },
  {
    id: 'issue-dirty',
    title: 'Noda Berat, Lumpur & Bau Apek',
    desc: 'Sepatu kotor terkena hujan/lumpur, insole berbau apek, tali berdebu tebal.',
    icon: '🫧',
    recommendedServiceId: 'srv-deep-clean',
    recommendedAddonName: 'Antibacterial Deep Deodorizer'
  },
  {
    id: 'issue-canvas-white',
    title: 'Kanvas Putih Belang / Kuning Residu',
    desc: 'Sepatu Converse/Vans putih yang menguning setelah dicuci sendiri di rumah akibat sisa busa deterjen.',
    icon: '👟',
    recommendedServiceId: 'srv-canvas-whitening',
    recommendedAddonName: 'Antibacterial Deep Deodorizer'
  },
  {
    id: 'issue-sole-detached',
    title: 'Sol Terbuka / Menganga / Jebol',
    desc: 'Lem sol lepas karena umur sepatu atau sering terkena air saat olahraga futsal/basket.',
    icon: '🔧',
    recommendedServiceId: 'srv-reglue',
    recommendedAddonName: 'Shoe Tree Pelindung Bentuk'
  },
  {
    id: 'issue-leather-dry',
    title: 'Kulit Kering, Kusam / Goresan',
    desc: 'Sepatu kulit formal/boots kusam kehilangan kilap dan mulai muncul retakan halus.',
    icon: '👞',
    recommendedServiceId: 'srv-leather-spa',
    recommendedAddonName: 'Wax Buffing Mirror Polish'
  },
  {
    id: 'issue-sole-wear',
    title: 'Sneaker Mahal Ingin Dijaga Anti-Aus',
    desc: 'Sneaker koleksi Jordan/Dunk/Yeezy baru yang ingin dipakai jalan tanpa merusak tapak sol bawah.',
    icon: '🛡️',
    recommendedServiceId: 'srv-sole-protector',
    recommendedAddonName: 'Water Repellent Nano Shield'
  }
];

export const ShoeDiagnosticModal: React.FC<ShoeDiagnosticModalProps> = ({
  isOpen,
  onClose,
  services,
  onSelectTreatment
}) => {
  const [selectedIssueId, setSelectedIssueId] = useState<string>(COMMON_ISSUES[0].id);

  if (!isOpen) return null;

  const currentIssue = COMMON_ISSUES.find(i => i.id === selectedIssueId) || COMMON_ISSUES[0];
  const recommendedService = services.find(s => s.id === currentIssue.recommendedServiceId) || services[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                Shoe Doctor & Diagnostic Tool
              </span>
              <h3 className="font-bold text-white text-base">
                Kalkulator Diagnosa Masalah Sepatu
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <label className="text-xs font-semibold text-neutral-300 block mb-2">
              Pilih Gejala atau Kondisi Sepatu Anda Saat Ini:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {COMMON_ISSUES.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() => setSelectedIssueId(issue.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    selectedIssueId === issue.id
                      ? 'border-amber-400 bg-amber-400/10 shadow-sm'
                      : 'border-neutral-800 bg-neutral-950/60 hover:border-neutral-700'
                  }`}
                >
                  <span className="text-2xl">{issue.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-xs text-white">{issue.title}</h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-2">
                      {issue.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Result & Prescription Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-neutral-950 to-neutral-900 border border-amber-400/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-xs text-amber-300 uppercase tracking-wide">
                  Rekomendasi Treatment Teknisi Spesialis:
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Akurasi Diagnosa 99%
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-extrabold text-white">
                  {recommendedService.name}
                </h4>
                <p className="text-xs text-neutral-300 mt-1 max-w-md leading-relaxed">
                  {recommendedService.description}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-neutral-400">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> SLA: {recommendedService.durationHours} Jam
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" /> {recommendedService.warranty}
                  </span>
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-neutral-800 sm:pl-5">
                <span className="text-[10px] text-neutral-500 block uppercase">Estimasi Biaya</span>
                <span className="text-xl font-mono font-black text-amber-400">
                  Rp {recommendedService.price.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white"
          >
            Tutup
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectTreatment(recommendedService.id);
            }}
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all active:scale-95"
          >
            Pilih Paket Ini & Lanjut Booking Antrean
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
