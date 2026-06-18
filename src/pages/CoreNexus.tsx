import React from 'react';

export default function CoreNexus() {
  return (
    <div className="flex-1 flex flex-col relative bg-loam-black overflow-hidden microscope-grid h-full">
      <style>{`
        .microscope-grid {
          background-size: 40px 40px;
          background-image: 
              linear-gradient(to right, rgba(60, 74, 67, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(60, 74, 67, 0.2) 1px, transparent 1px);
        }
      `}</style>
      
      {/* Header */}
      <header className="flex justify-between items-center px-huge py-lg z-30 shrink-0">
        <div className="flex flex-col">
          <h2 className="font-display-sm text-display-sm text-primary tracking-tighter leading-none">THE CORE NEXUS</h2>
          <div className="flex items-center gap-md mt-sm">
            <span className="text-label-caps font-label-caps text-primary border border-primary/30 px-sm py-xs">LATENCY: 0.04ms</span>
            <span className="text-label-caps font-label-caps text-on-surface-variant">SYMBIONT_STATUS: STABLE</span>
          </div>
        </div>
        <div className="flex gap-md">
          <div className="brutalist-border p-md flex flex-col items-end">
            <span className="text-[10px] font-data-mono text-on-surface-variant">DATA_FERMENTATION</span>
            <span className="text-headline-sm font-headline-sm text-primary">89.4%</span>
          </div>
        </div>
      </header>

      {/* Interactive Zone (Petri Dish Center) */}
      <div className="flex-1 relative flex items-center justify-center p-huge">
        {/* Central Component: FEED THE NETWORK */}
        <div className="relative z-20 w-full md:max-w-xl brutalist-border bg-loam-black/80 backdrop-blur-md p-huge bioluminescence-shadow border-t-4 border-t-primary">
          <div className="flex justify-between items-start mb-xl">
            <div>
              <p className="text-label-caps font-label-caps text-primary mb-xs">INPUT_MODULE_SLIDE_04</p>
              <h3 className="font-headline-lg text-headline-lg text-bone-spore leading-tight">FEED THE NETWORK</h3>
            </div>
            <span className="material-symbols-outlined text-primary text-4xl">sensors</span>
          </div>

          <div className="space-y-xl group/form">
            <div className="relative">
              <label className="text-label-caps font-label-caps text-on-surface-variant block mb-sm">QUANTUM_NUTRIENT_PAYLOAD (DATA/TOKENS)</label>
              <input 
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary outline-none focus:ring-0 text-headline-sm font-data-mono text-primary placeholder:text-outline-variant transition-all pb-md" 
                placeholder="0.0000000_X" 
                type="text" 
              />
              <div className="absolute right-0 bottom-md flex gap-xs pointer-events-none">
                <span className="text-[10px] font-data-mono text-primary px-sm border border-primary pointer-events-auto cursor-pointer">MAX</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-md">
              <div className="p-md brutalist-border bg-surface-container-low/50">
                <p className="text-[10px] font-data-mono text-on-surface-variant">MYCORRHIZAL_YIELD</p>
                <p className="text-body-md font-data-mono text-primary">+12.4%</p>
              </div>
              <div className="p-md brutalist-border bg-surface-container-low/50">
                <p className="text-[10px] font-data-mono text-on-surface-variant">SPORE_DENSITY</p>
                <p className="text-body-md font-data-mono text-primary">0.82 kg/m³</p>
              </div>
            </div>

            <button className="w-full py-xl bg-primary text-on-primary font-display-sm text-headline-sm hover:translate-y-[2px] transition-all brutalist-border cursor-pointer">
              INITIATE FERMENTATION
            </button>
          </div>

          {/* Microscope Slide Aesthetic details */}
          <div className="absolute -top-xs -right-xs w-4 h-4 bg-primary"></div>
          <div className="absolute -bottom-xs -left-xs w-4 h-4 bg-primary"></div>
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-xs">
            <div className="w-6 h-[1px] bg-outline-variant"></div>
            <div className="w-12 h-[1px] bg-primary"></div>
            <div className="w-6 h-[1px] bg-outline-variant"></div>
          </div>
        </div>

        {/* Floating AI Sporeform Cards */}
        <div className="absolute top-20 right-20 w-48 brutalist-border bg-surface-container p-md rotate-2 z-30 transition-transform hover:scale-105">
          <div className="flex justify-between items-start mb-md">
            <div className="w-8 h-8 bg-primary rounded-full pulse-lumin"></div>
            <span className="text-[10px] font-data-mono text-primary">GROWTH_V1</span>
          </div>
          <p className="text-label-caps font-label-caps text-on-surface mb-xs">CAP_SHAPE: CONVEX</p>
          <div className="w-full h-1 bg-outline-variant mb-md">
            <div className="w-3/4 h-full bg-primary"></div>
          </div>
          <p className="text-label-caps font-label-caps text-on-surface mb-xs">TOXICITY: LOW</p>
          <div className="w-full h-1 bg-outline-variant">
            <div className="w-1/4 h-full bg-tertiary-fixed-dim"></div>
          </div>
        </div>

        <div className="absolute bottom-40 left-10 w-56 brutalist-border bg-surface-container p-md -rotate-3 z-30 transition-transform hover:scale-105">
          <p className="text-[10px] font-data-mono text-primary mb-md">SYMBIOSIS_TELEMETRY</p>
          <div className="flex items-center gap-md">
            <div className="flex-1 h-12 bg-outline-variant flex items-end overflow-hidden">
              <div className="w-2 h-[20%] bg-primary mx-[1px] pulse-animation" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-[50%] bg-primary mx-[1px] pulse-animation" style={{ animationDelay: '200ms' }}></div>
              <div className="w-2 h-[80%] bg-primary mx-[1px] pulse-animation" style={{ animationDelay: '400ms' }}></div>
              <div className="w-2 h-[40%] bg-primary mx-[1px] pulse-animation" style={{ animationDelay: '600ms' }}></div>
              <div className="w-2 h-[90%] bg-primary mx-[1px] pulse-animation" style={{ animationDelay: '800ms' }}></div>
            </div>
            <div className="text-headline-sm font-data-mono text-primary">0.92</div>
          </div>
          <p className="text-[10px] font-data-mono text-on-surface-variant mt-sm">STABILITY INDEX: NOMINAL</p>
        </div>
      </div>

      {/* Interactive Mycelial Connector (Visual Element) */}
      <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none opacity-20">
        <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
          <path d="M0,20 Q50,50 100,80 M20,0 Q60,40 100,20 M0,80 Q40,40 80,100" fill="none" stroke="var(--color-teal-lumin)" strokeWidth="0.5"></path>
        </svg>
      </div>

      {/* The Living Ledger: Bottom-docked terminal log */}
      <footer className="h-40 bg-surface-container-lowest border-t border-outline-variant z-40 relative group transition-all duration-500 overflow-hidden shrink-0 mt-auto">
        <div className="flex items-center justify-between px-md py-xs bg-outline-variant/20 border-b border-outline-variant">
          <div className="flex items-center gap-md">
            <span className="text-label-caps font-label-caps text-primary">THE_LIVING_LEDGER</span>
            <span className="text-[10px] font-data-mono text-on-surface-variant">LATEST_ENTRIES: 49,021</span>
          </div>
          <div className="flex gap-md">
            <span className="material-symbols-outlined text-sm text-on-surface-variant cursor-pointer hover:text-primary">keyboard_arrow_up</span>
            <span className="material-symbols-outlined text-sm text-on-surface-variant cursor-pointer hover:text-error">close</span>
          </div>
        </div>
        <div className="p-md font-data-mono text-[11px] leading-relaxed text-on-surface-variant overflow-y-auto h-full space-y-1">
          <p><span className="text-primary">[14:22:01]</span> <span className="text-bone-spore">SYSTEM_SYNC:</span> Mycelial threads extending to Node_12. Bandwidth optimized.</p>
          <p><span className="text-primary">[14:22:09]</span> <span className="text-bone-spore">FERMENTER_04:</span> Nutrient absorption rate increased by 2.4%.</p>
          <p><span className="text-primary">[14:23:14]</span> <span className="text-tertiary-fixed-dim">SIGNAL_WARN:</span> Minor spore interference detected in Sub-Sector G.</p>
          <p><span className="text-primary">[14:24:55]</span> <span className="text-bone-spore">LEDGER_ENTRY:</span> Transaction Hash 0x9f...3e2 confirmed by 12,042 root-validators.</p>
          <p><span className="text-primary">[14:25:30]</span> <span className="text-primary font-bold">CORE_HEARTBEAT:</span> Pulsing at 42Hz. Synchronized.</p>
          <p className="animate-pulse text-primary">_</p>
        </div>
      </footer>
    </div>
  );
}
