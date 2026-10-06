import React, { useState } from 'react';
import { ShieldCheck, X, Lock, KeyRound, ArrowRight, Sparkles, UserCheck } from 'lucide-react';

interface StaffAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: () => void;
}

export const StaffAccessModal: React.FC<StaffAccessModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const DEMO_PIN = '8899';

  const handleKeyClick = (num: string) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      setError(false);
      if (nextPin.length === 4) {
        if (nextPin === DEMO_PIN) {
          setTimeout(() => {
            onSuccessLogin();
            setPin('');
          }, 300);
        } else {
          setError(true);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  const handleQuickDemoAccess = () => {
    onSuccessLogin();
    setPin('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden p-6 text-center space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon */}
        <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mx-auto shadow-lg shadow-amber-400/5">
          <ShieldCheck className="w-7 h-7" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
            Internal Staff Only
          </div>
          <h3 className="font-extrabold text-white text-lg">
            Akses Console Workshop
          </h3>
          <p className="text-xs text-neutral-400">
            Masukkan PIN Keamanan 4 digit untuk membuka dashboard operasional teknisi & kasir.
          </p>
        </div>

        {/* PIN Indicators */}
        <div className="flex items-center justify-center gap-3 py-2">
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = pin.length > idx;
            return (
              <div
                key={idx}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                  error
                    ? 'bg-rose-500 scale-110 animate-bounce'
                    : isFilled
                    ? 'bg-amber-400 scale-125 shadow-[0_0_10px_rgba(251,191,36,0.6)]'
                    : 'bg-neutral-800 border border-neutral-700'
                }`}
              />
            );
          })}
        </div>

        {error && (
          <p className="text-xs text-rose-400 font-medium">
            PIN salah. Gunakan PIN demo: <strong className="text-white">8899</strong>
          </p>
        )}

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[240px] mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleKeyClick(digit)}
              className="h-12 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-white font-bold text-base hover:bg-neutral-800 active:scale-95 transition-all"
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPin('')}
            className="h-12 rounded-2xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold hover:bg-neutral-800 active:scale-95 transition-all"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => handleKeyClick('0')}
            className="h-12 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-white font-bold text-base hover:bg-neutral-800 active:scale-95 transition-all"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            className="h-12 rounded-2xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold hover:bg-neutral-800 active:scale-95 transition-all"
          >
            ←
          </button>
        </div>

        {/* Quick Demo Bypass Button */}
        <div className="pt-2 border-t border-neutral-800">
          <button
            type="button"
            onClick={handleQuickDemoAccess}
            className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-2 border border-neutral-700 transition-colors"
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Masuk Cepat Demo (Bypass PIN)</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
          </button>
          <p className="text-[10px] text-neutral-500 mt-2 font-mono">
            PIN Default Demo: 8899 · ShoeLab HQ Senopati
          </p>
        </div>
      </div>
    </div>
  );
};
