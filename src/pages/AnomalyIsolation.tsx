import React, { useEffect, useState } from 'react';
import { LoadingOverlay } from '../components/BiolumSkeleton';

export default function AnomalyIsolation() {
  const [pulse, setPulse] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchTimeout = setTimeout(() => setIsFetching(false), 3000);
    const interval = setInterval(() => {
      setPulse(Math.random() > 0.9);
    }, 2000);
    return () => {
      clearInterval(interval);
      clearTimeout(fetchTimeout);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full relative">
      {/* TopNavBar */}
      <header className="flex justify-between items-center w-full px-gutter h-16 bg-surface border-b border-outline-variant shrink-0 relative z-30">
        <div className="text-display-sm font-display-sm text-primary tracking-tighter">MYCELIA</div>
        <nav className="hidden lg:flex items-center gap-xl h-full">
          <a className="text-label-caps font-label-caps text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">NETWORK</a>
          <a className="text-label-caps font-label-caps text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">COLONIES</a>
          <a className="text-label-caps font-label-caps text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">SPORES</a>
          <a className="text-label-caps font-label-caps text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">CULTURE</a>
        </nav>
        <div className="flex items-center gap-md">
          <div className="hidden md:flex items-center bg-surface-container-high border-b border-outline-variant px-sm py-1">
            <span className="material-symbols-outlined text-on-surface-variant text-sm">search</span>
            <input className="bg-transparent border-none focus:ring-0 outline-none text-data-mono text-xs text-primary w-32 placeholder:text-outline-variant" placeholder="QUERY_SPORE_ID" type="text" />
          </div>
          <span className="material-symbols-outlined text-primary cursor-pointer hover:rotate-90 transition-transform">sensors</span>
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">biotech</span>
        </div>
      </header>

      <div className="flex-grow overflow-y-auto bg-background p-md md:p-xl scroll-smooth relative z-10">
        <div className="max-w-[1200px] mx-auto space-y-xl">
          {/* Title Block */}
          <div className="border-l-4 border-primary pl-md space-y-xs">
            <h1 className="text-display-sm font-display-sm text-on-surface uppercase tracking-tight flex flex-wrap gap-2 items-center">
              MYCELIA // ANOMALY ISOLATION <span className="text-primary">[PHASE_8_ACTIVE]</span>
            </h1>
            <p className="text-label-caps font-label-caps text-on-surface-variant">
              SUB-STRATA TRIAGE // SECTOR G-9 // COORDINATES: 48.8584° N, 2.2945° E
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-md">
            {/* Critical Alerts Table */}
            <div className="lg:col-span-8 border border-outline-variant bg-surface-container-low p-md flex flex-col min-h-[400px]">
              <div className="flex justify-between items-center mb-md border-b border-outline-variant pb-sm">
                <h2 className="text-headline-sm font-headline-sm text-primary uppercase">CRITICAL_ALERTS</h2>
                <div className="flex items-center gap-sm">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pulse ? '#ffb4ab' : '#64fdcb', transition: 'background-color 0.15s ease' }}></span>
                  <span className="text-label-caps font-label-caps text-primary">LIVE MONITORING</span>
                </div>
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-label-caps font-label-caps text-on-surface-variant bg-surface-variant/50">
                      <th className="p-sm">GENOME_HASH</th>
                      <th className="p-sm">STATUS</th>
                      <th className="p-sm">ANOMALY_TYPE</th>
                      <th className="p-sm text-right">DRIFT_VAL</th>
                    </tr>
                  </thead>
                  <tbody className="text-data-mono font-data-mono">
                    <tr className="border-b border-outline-variant/30 hover:bg-surface-variant/30 transition-colors cursor-pointer group">
                      <td className="p-sm text-primary">0x8F22...4A2D</td>
                      <td className="p-sm"><span className="px-xs bg-error-container text-on-error-container">DECAY_DETECTED</span></td>
                      <td className="p-sm">IRREGULAR_METABOLISM</td>
                      <td className="p-sm text-right text-error">+42.8%</td>
                    </tr>
                    <tr className="border-b border-outline-variant/30 hover:bg-surface-variant/30 transition-colors cursor-pointer group">
                      <td className="p-sm text-primary">0x11D9...9B92</td>
                      <td className="p-sm"><span className="px-xs bg-error-container text-on-error-container">SIGNAL_LOSS</span></td>
                      <td className="p-sm">GENOMIC_DRIFT</td>
                      <td className="p-sm text-right text-error">+18.2%</td>
                    </tr>
                    <tr className="border-b border-outline-variant/30 hover:bg-surface-variant/30 transition-colors cursor-pointer group">
                      <td className="p-sm text-primary">0x4E77...F310</td>
                      <td className="p-sm"><span className="px-xs bg-tertiary-container text-on-tertiary-container">WARNING</span></td>
                      <td className="p-sm">SPORE_INERTIA</td>
                      <td className="p-sm text-right text-tertiary-fixed-dim">+5.4%</td>
                    </tr>
                    <tr className="border-b border-outline-variant/30 hover:bg-surface-variant/30 transition-colors cursor-pointer group">
                      <td className="p-sm text-primary">0xBC88...2211</td>
                      <td className="p-sm"><span className="px-xs bg-primary/20 text-primary">STABLE</span></td>
                      <td className="p-sm">N/A</td>
                      <td className="p-sm text-right">0.0%</td>
                    </tr>
                    <tr className="border-b border-outline-variant/30 hover:bg-surface-variant/30 transition-colors cursor-pointer group">
                      <td className="p-sm text-primary">0xAA12...CC33</td>
                      <td className="p-sm"><span className="px-xs bg-error-container text-on-error-container">DECAY_DETECTED</span></td>
                      <td className="p-sm">MEMBRANE_FAILURE</td>
                      <td className="p-sm text-right text-error">+91.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-auto pt-md flex justify-between items-center text-[10px] font-data-mono text-on-surface-variant shrink-0">
                <div>PAGE 01 / 88</div>
                <div className="flex gap-md">
                  <button className="hover:text-primary transition-colors cursor-pointer">PREV</button>
                  <button className="hover:text-primary transition-colors cursor-pointer">NEXT</button>
                </div>
              </div>
            </div>

            {/* Telemetry & Visualizer Sidebar */}
            <div className="lg:col-span-4 space-y-md">
              {/* Telemetry Card */}
              <div className="border border-outline-variant p-md space-y-md">
                <h3 className="text-label-caps font-label-caps text-on-surface-variant">TELEMETRY_STREAM</h3>
                <div className="space-y-sm">
                  <div className="flex justify-between text-label-caps font-label-caps">
                    <span>DECAY_RATE</span>
                    <span className="text-error">0.88%/HR</span>
                  </div>
                  <div className="h-1 bg-surface-variant">
                    <div className="h-full bg-error transition-all" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div className="space-y-sm">
                  <div className="flex justify-between text-label-caps font-label-caps">
                    <span>HYPHAE_HEALTH</span>
                    <span className="text-primary">92.4%</span>
                  </div>
                  <div className="h-1 bg-surface-variant">
                    <div className="h-full bg-primary transition-all" style={{ width: '92.4%' }}></div>
                  </div>
                </div>
              </div>

              {/* Bio-Visualizer */}
              <div className="border border-outline-variant h-64 bg-surface-container-lowest relative overflow-hidden flex items-center justify-center pointer-events-none">
                {isFetching && <LoadingOverlay text="ESTABLISHING_FEED" />}
                <img 
                  className={`w-full h-full object-cover transition-opacity duration-1000 ${isFetching ? 'opacity-0' : 'opacity-60'}`} 
                  alt="A complex 3D digital visualization of a mycelial network structure" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcHfeeU73uTJAqybqJSeB6kssqP152M4vgv_Zdwo9IRd7sekFvuPtb26mY-7XHzVGi8ygwF0K-JIwiTJygLeyRqNsr_iCiRSRwrYXMl6l_qF2KWLTnKfGvef0TK0lDEJlo4T3wNfVeWwS2yx32wPXYZO82Myeeky5uIon0Bow9I7HJkjTi-jg-w1snbwv53h-Rdp0uQd1yzb18L5r5GQE5v-HN4MP0l8OOq4i0s7-h0KuRR9HGlL0FYXT4E_GDUlnJxErc8wJx4c-G" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                <div className="absolute top-2 left-2 px-xs bg-background/80 text-[10px] font-data-mono text-primary border border-primary">LIVE_VISUAL_FEED</div>
                <span className="material-symbols-outlined text-primary text-6xl opacity-20 absolute" style={{ fontVariationSettings: "'FILL' 0" }}>grid_view</span>
              </div>

              {/* Rapid Actions */}
              <div className="space-y-xs pt-2">
                <button className="w-full p-md bg-error-container text-on-error-container font-display-sm text-sm text-left flex justify-between items-center group hover:brightness-110 cursor-pointer">
                  PURGE_CORRUPTED_SPORE
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">delete_forever</span>
                </button>
                <button className="w-full p-md border border-outline-variant text-on-surface font-display-sm text-sm text-left flex justify-between items-center group hover:bg-surface-variant cursor-pointer">
                  ISOLATE_NODE
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">security</span>
                </button>
                <button className="w-full p-md border-2 border-primary text-primary font-display-sm text-sm text-left flex justify-between items-center group bioluminescence-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer">
                  REGENERATE_SUBSTRATE
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">auto_fix_high</span>
                </button>
              </div>
            </div>
          </div>

          {/* Historical Context Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md pb-md">
            <div className="p-md border border-outline-variant bg-surface-container-lowest flex gap-md items-start">
              <span className="material-symbols-outlined text-primary text-4xl shrink-0">history_edu</span>
              <div>
                <h4 className="text-label-caps font-label-caps text-on-surface">DRIFT_LOG_01</h4>
                <p className="text-body-md font-body-md text-on-surface-variant leading-tight mt-sm">First instances of genomic drift observed in sub-strata G-9. Initial theories suggest industrial interference.</p>
              </div>
            </div>
            <div className="p-md border border-outline-variant bg-surface-container-lowest flex gap-md items-start">
              <span className="material-symbols-outlined text-tertiary text-4xl shrink-0">microbiology</span>
              <div>
                <h4 className="text-label-caps font-label-caps text-on-surface">BIO_SPECIMEN_404</h4>
                <p className="text-body-md font-body-md text-on-surface-variant leading-tight mt-sm">Specimen removed for isolation. Metabolism rate exceeds safety thresholds by 300%.</p>
              </div>
            </div>
            <div className="p-md border border-outline-variant bg-surface-container-lowest flex gap-md items-start border-l-primary">
              <span className="material-symbols-outlined text-primary text-4xl shrink-0">hub</span>
              <div>
                <h4 className="text-label-caps font-label-caps text-on-surface">NETWORK_INTEGRITY</h4>
                <p className="text-body-md font-body-md text-on-surface-variant leading-tight mt-sm">Global mycelia mesh remaining at 98.4% cohesion despite local isolation events.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant shrink-0 relative z-30">
        <div className="w-full py-md px-gutter flex flex-col md:flex-row justify-between items-center max-w-[1440px] mx-auto gap-4 md:gap-0">
          <div className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest text-center md:text-left">
            © 2024 MYCELIA PROTOCOL | SYNTHETIC MYCORRHIZAL CONSCIOUSNESS
          </div>
          <div className="flex gap-lg flex-wrap justify-center">
            <a className="text-data-mono font-data-mono text-on-surface-variant hover:text-tertiary-fixed-dim transition-colors" href="#">TERMINAL</a>
            <a className="text-data-mono font-data-mono text-on-surface-variant hover:text-tertiary-fixed-dim transition-colors" href="#">ERRORS</a>
            <a className="text-data-mono font-data-mono text-on-surface-variant hover:text-tertiary-fixed-dim transition-colors" href="#">LOGS</a>
            <a className="text-data-mono font-data-mono text-on-surface-variant hover:text-tertiary-fixed-dim transition-colors" href="#">NODES</a>
          </div>
          <div className="hidden lg:flex items-center gap-xs ml-lg">
            <div className="w-2 h-2 bg-primary animate-pulse"></div>
            <div className="text-data-mono font-data-mono text-[10px] text-primary">SYSTEM_STABLE_G9</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
