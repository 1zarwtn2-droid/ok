import React, { useState, useRef, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'SEBELUM (BEFORE)',
  afterLabel = 'HASIL (AFTER)',
  title
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="space-y-2 select-none">
      {title && (
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-neutral-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {title}
          </span>
          <span className="text-[11px] text-neutral-400">Geser slider untuk melihat perbandingan</span>
        </div>
      )}

      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 cursor-ew-resize shadow-xl"
      >
        {/* AFTER Image (Full background) */}
        <img
          src={afterImage}
          alt="After Treatment"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* BEFORE Image (Clipped with slider position) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Before Treatment"
            className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
            style={{
              width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
              height: '100%'
            }}
          />
        </div>

        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Handle Knob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-900 border-2 border-white shadow-2xl flex items-center justify-center text-white text-[11px] font-bold">
            ⇄
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-black/75 text-neutral-200 backdrop-blur-md border border-neutral-700/60 shadow">
            {beforeLabel}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 pointer-events-none">
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-emerald-600/90 text-white backdrop-blur-md border border-emerald-400/40 shadow">
            {afterLabel}
          </span>
        </div>
      </div>
    </div>
  );
};
