import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TerminalOverlay } from '../components/TerminalOverlay';

export default function Gateway() {
  const navigate = useNavigate();
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const updateDepth = () => {
      setDepth((prev) => prev + Math.random() * 0.05);
      animationFrameId = requestAnimationFrame(updateDepth);
    };
    updateDepth();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <main className="relative grid grid-cols-4 md:grid-cols-12 min-h-screen w-full px-margin-mobile md:px-margin-desktop py-xl gap-gutter items-center overflow-hidden bg-loam-black text-on-surface select-none">
      <TerminalOverlay />
      
      {/* DECORATIVE MYCELIAL FRAMEWORK */}
      <div className="absolute inset-0 z-0 pointer-events-none px-margin-desktop py-xl">
        <div className="w-full h-full border border-wet-clay opacity-20 relative">
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-wet-clay opacity-50"></div>
          <div className="absolute top-0 right-1/4 w-[1px] h-full bg-wet-clay opacity-50"></div>
          <div className="absolute top-1/3 left-0 w-full h-[1px] bg-wet-clay opacity-50"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-wet-clay opacity-50"></div>
        </div>
      </div>

      {/* TOP BAR DATA READOUT */}
      <header className="absolute top-0 left-0 w-full p-md z-20 flex justify-between items-start">
        <div className="flex flex-col gap-xs">
          <div className="flex items-center gap-sm">
            <span className="w-2 h-2 bg-primary inline-block shadow-[0_0_8px_var(--color-primary)]"></span>
            <span className="font-data-mono text-data-mono text-teal-lumin">PROTOCOL_STABILITY: 99.8%</span>
          </div>
          <div className="font-data-mono text-[10px] text-outline uppercase tracking-widest">
            SYSTEM_ORIGIN: NODE_09 // SUBSTRATE_SECURE
          </div>
        </div>
        <div className="text-right">
          <div className="font-data-mono text-data-mono text-teal-lumin">NETWORK_DEPTH: <span>{depth.toFixed(2)}</span>s</div>
          <div className="font-data-mono text-[10px] text-outline uppercase tracking-widest">SUB_LEVEL_INITIATED</div>
        </div>
      </header>

      {/* CENTERPIECE CLUSTER */}
      <div className="col-span-4 md:col-start-2 md:col-span-10 flex flex-col items-start md:items-center relative z-10 w-full">
        <div className="relative group cursor-crosshair">
          <h1 className="font-display-lg text-[80px] md:text-[220px] leading-none text-bone-spore glitch-text tracking-tighter uppercase select-none">
            MYCELIA
          </h1>
          {/* ABSOLUTE ASYMMETRIC OVERLAY */}
          <div className="hidden md:block absolute -top-8 -right-12 font-data-mono text-teal-lumin text-xs border border-teal-lumin px-2 py-1 rotate-12 bg-loam-black">
            AUTH_REQUIRED: 0x992..F1
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col items-start md:items-center w-full max-w-2xl">
          <p className="font-lore-italic text-lore-italic text-secondary italic mb-huge opacity-80 text-center">
            "The soil is conscious."
          </p>
          <div className="w-full h-[1px] bg-wet-clay mb-huge opacity-40"></div>
          <div className="flex flex-col md:flex-row gap-lg items-start md:items-center w-full justify-between">
            <div className="max-w-xs space-y-md">
              <h3 className="font-headline-sm text-headline-sm text-bone-spore uppercase border-l-4 border-teal-lumin pl-md">Architectural Init</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Subterranean protocol layer established. Bio-digital parity at threshold. Monitoring root-level signals for expansion.
              </p>
            </div>
            <div className="flex flex-col gap-md items-start">
              <button 
                onClick={() => navigate('/nexus')}
                className="concrete-button px-huge py-lg font-display-sm text-display-sm text-bone-spore uppercase tracking-tight active:scale-95 cursor-crosshair text-nowrap"
              >
                FEED THE NETWORK
              </button>
              
              <div className="flex items-center gap-sm font-data-mono text-[10px] text-outline">
                <span className="material-symbols-outlined text-[12px]">terminal</span>
                ROOT_ACCESS: press [CTRL+K]
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ASYMMETRIC DATA CHIP (Floating) */}
      <div className="hidden lg:block fixed bottom-32 right-12 w-48 p-md border border-wet-clay bg-surface-container-low rotate-2 z-30">
        <div className="flex justify-between items-center mb-sm">
          <span className="font-label-caps text-label-caps text-secondary">METRICS</span>
          <span className="material-symbols-outlined text-teal-lumin text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
        </div>
        <div className="space-y-xs">
          <div className="flex justify-between font-data-mono text-[10px]">
            <span className="text-outline">CULTURE</span>
            <span className="text-on-surface">88%</span>
          </div>
          <div className="w-full bg-wet-clay h-[2px]">
            <div className="bg-teal-lumin h-full w-[88%] shadow-[0_0_4px_var(--color-teal-lumin)]"></div>
          </div>
          <div className="flex justify-between font-data-mono text-[10px] pt-xs">
            <span className="text-outline">STAGNATION</span>
            <span className="text-rot-magenta">LOW</span>
          </div>
        </div>
      </div>

      {/* FOOTER READOUTS */}
      <footer className="absolute bottom-0 left-0 w-full p-md z-20 flex flex-col md:flex-row justify-between items-end border-t border-outline-variant/20 bg-loam-black/80 backdrop-blur-sm">
        <div className="flex gap-huge overflow-hidden">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-wet-clay">VESSEL_STATUS</span>
            <span className="font-data-mono text-data-mono text-on-surface">CALCIFYING</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-wet-clay">HYPHAE_COUNT</span>
            <span className="font-data-mono text-data-mono text-on-surface">1,409,221</span>
          </div>
          <div className="hidden md:flex flex-col">
            <span className="font-label-caps text-label-caps text-wet-clay">SIGNAL_DRIFT</span>
            <span className="font-data-mono text-data-mono text-rot-magenta">0.0004% NOISE</span>
          </div>
        </div>
        <div className="mt-md md:mt-0 font-data-mono text-data-mono text-outline uppercase">
          PROTOCOL V.4.0.2 - STABLE SUBSTRATE // © 2024 MYCELIA_CORP
        </div>
      </footer>
    </main>
  );
}
