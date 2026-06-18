import React, { useEffect, useState } from 'react';
import { LoadingOverlay } from '../components/BiolumSkeleton';
import { emitSysLog } from '../components/SystemLog';

const ALERTS_DATA = [
  { hash: '0x8F22...4A2D', status: 'DECAY_DETECTED', anomaly: 'IRREGULAR_METABOLISM', drift: '+42.8%', driftClass: 'text-error' },
  { hash: '0x11D9...9B92', status: 'SIGNAL_LOSS', anomaly: 'GENOMIC_DRIFT', drift: '+18.2%', driftClass: 'text-error' },
  { hash: '0x4E77...F310', status: 'WARNING', anomaly: 'SPORE_INERTIA', drift: '+5.4%', driftClass: 'text-tertiary-fixed-dim' },
  { hash: '0xBC88...2211', status: 'STABLE', anomaly: 'N/A', drift: '0.0%', driftClass: '' },
  { hash: '0xAA12...CC33', status: 'DECAY_DETECTED', anomaly: 'MEMBRANE_FAILURE', drift: '+91.0%', driftClass: 'text-error' },
];

export default function AnomalyIsolation() {
  const [pulse, setPulse] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [actionLog, setActionLog] = useState<string[]>([]);
  const rowsPerPage = 10;

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

  // Filter alerts based on search
  const filteredAlerts = ALERTS_DATA.filter(alert => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return alert.hash.toLowerCase().includes(q) ||
           alert.status.toLowerCase().includes(q) ||
           alert.anomaly.toLowerCase().includes(q);
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredAlerts.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedAlerts = filteredAlerts.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);

  const handlePrevPage = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));

  const addActionLog = (msg: string) => {
    setActionLog(prev => [msg, ...prev].slice(0, 5));
    emitSysLog(msg);
  };

  const handlePurge = () => {
    addActionLog('PURGE_INITIATED: Corrupted spores marked for deletion');
  };

  const handleIsolate = () => {
    addActionLog('ISOLATION_PROTOCOL: Node quarantine engaged');
  };

  const handleRegenerate = () => {
    addActionLog('REGENERATION: Substrate reconstruction started');
  };

  const handleNavClick = (section: string) => {
    addActionLog(`NAV_ACCESS: ${section} module requested`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex-1 flex flex-col h-full relative">
      {/* TopNavBar */}
      <header className="flex justify-between items-center w-full px-gutter h-16 bg-surface border-b border-outline-variant shrink-0 relative z-30">
        <div className="text-display-sm font-display-sm text-primary tracking-tighter">MYCELIA</div>
        <nav className="hidden lg:flex items-center gap-xl h-full">
          <a className="text-label-caps font-label-caps text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer" onClick={() => handleNavClick('NETWORK')}>NETWORK</a>
          <a className="text-label-caps font-label-caps text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer" onClick={() => handleNavClick('COLONIES')}>COLONIES</a>
          <a className="text-label-caps font-label-caps text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer" onClick={() => handleNavClick('SPORES')}>SPORES</a>
          <a className="text-label-caps font-label-caps text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer" onClick={() => handleNavClick('CULTURE')}>CULTURE</a>
        </nav>
        <div className="flex items-center gap-md">
          <div className="hidden md:flex items-center bg-surface-container-high border-b border-outline-variant px-sm py-1">
            <span className="material-symbols-outlined text-on-surface-variant text-sm">search</span>
            <input className="bg-transparent border-none focus:ring-0 outline-none text-data-mono text-xs text-primary w-32 placeholder:text-outline-variant" placeholder="QUERY_SPORE_ID" type="text" value={searchQuery} onChange={handleSearchChange} />
          </div>
          <span className="material-symbols-outlined text-primary cursor-pointer hover:rotate-90 transition-transform" onClick={() => addActionLog('SENSORS: Calibration initiated')}>sensors</span>
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors" onClick={() => addActionLog('BIOTECH: Module accessed')}>biotech</span>
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

          {/* Action Log Toast */}
          {actionLog.length > 0 && (
            <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none">
              {actionLog.map((log, i) => (
                <div key={i} className="font-data-mono text-[10px] text-primary bg-surface-container-lowest/90 border border-primary/30 px-3 py-2 backdrop-blur-sm animate-slide-in-right">
                  {'>'} {log}
                </div>
              ))}
            </div>
          )}

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
                    {paginatedAlerts.map((alert) => (
                      <tr key={alert.hash} className="border-b border-outline-variant/30 hover:bg-surface-variant/30 transition-colors cursor-pointer group">
                        <td className="p-sm text-primary">{alert.hash}</td>
                        <td className="p-sm">
                          {alert.status === 'DECAY_DETECTED' && <span className="px-xs bg-error-container text-on-error-container">{alert.status}</span>}
                          {alert.status === 'SIGNAL_LOSS' && <span className="px-xs bg-error-container text-on-error-container">{alert.status}</span>}
                          {alert.status === 'WARNING' && <span className="px-xs bg-tertiary-container text-on-tertiary-container">{alert.status}</span>}
                          {alert.status === 'STABLE' && <span className="px-xs bg-primary/20 text-primary">{alert.status}</span>}
                        </td>
                        <td className="p-sm">{alert.anomaly}</td>
                        <td className={`p-sm text-right ${alert.driftClass}`}>{alert.drift}</td>
                      </tr>
                    ))}
                    {paginatedAlerts.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-sm text-center text-on-surface-variant">NO_ALERTS_FOUND "{searchQuery}"</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-auto pt-md flex justify-between items-center text-[10px] font-data-mono text-on-surface-variant shrink-0">
                <div>PAGE {safePage.toString().padStart(2, '0')} / {totalPages.toString().padStart(2, '0')}</div>
                <div className="flex gap-md">
                  <button onClick={handlePrevPage} disabled={safePage <= 1} className="hover:text-primary transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">PREV</button>
                  <button onClick={handleNextPage} disabled={safePage >= totalPages} className="hover:text-primary transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">NEXT</button>
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
                <button onClick={handlePurge} className="w-full p-md bg-error-container text-on-error-container font-display-sm text-sm text-left flex justify-between items-center group hover:brightness-110 cursor-pointer">
                  PURGE_CORRUPTED_SPORE
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">delete_forever</span>
                </button>
                <button onClick={handleIsolate} className="w-full p-md border border-outline-variant text-on-surface font-display-sm text-sm text-left flex justify-between items-center group hover:bg-surface-variant cursor-pointer">
                  ISOLATE_NODE
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">security</span>
                </button>
                <button onClick={handleRegenerate} className="w-full p-md border-2 border-primary text-primary font-display-sm text-sm text-left flex justify-between items-center group bioluminescence-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer">
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
            <a className="text-data-mono font-data-mono text-on-surface-variant hover:text-tertiary-fixed-dim transition-colors cursor-pointer" onClick={() => addActionLog('TERMINAL_ACCESS: REQUESTED')}>TERMINAL</a>
            <a className="text-data-mono font-data-mono text-on-surface-variant hover:text-tertiary-fixed-dim transition-colors cursor-pointer" onClick={() => addActionLog('ERROR_LOG: ACCESSED')}>ERRORS</a>
            <a className="text-data-mono font-data-mono text-on-surface-variant hover:text-tertiary-fixed-dim transition-colors cursor-pointer" onClick={() => addActionLog('SYSTEM_LOGS: OPENED')}>LOGS</a>
            <a className="text-data-mono font-data-mono text-on-surface-variant hover:text-tertiary-fixed-dim transition-colors cursor-pointer" onClick={() => addActionLog('NODE_MAP: LOADED')}>NODES</a>
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
