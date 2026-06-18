import { useState, useEffect } from 'react';
import { Skeleton } from '../components/BiolumSkeleton';

const GENOMES = ['AMANI_MUSC_V2', 'PSIL_CYAN_09', 'TRIC_REES_X', 'LYCO_PERL_M', 'CORD_MILI_Z', 'PLEU_OSTR_44'];
const STATUSES = ['FERMENTING', 'DORMANT', 'FERMENTING', 'DECAY_DETECTED'];

export default function LivingLedger() {
  const [rows, setRows] = useState<any[] | null>(null);

  useEffect(() => {
    let timeoutId: number;
    let initialFetchId: number;
    
    initialFetchId = window.setTimeout(() => {
      setRows([
        {
          id: '0xFD22...9A1B',
          timestamp: '14:02:11:882',
          genome: 'AMANI_MUSC_V2',
          metabolic: '12.44 mEq/s',
          status: 'FERMENTING'
        },
        {
          id: '0xAE99...C042',
          timestamp: '14:02:08:441',
          genome: 'PSIL_CYAN_09',
          metabolic: '0.82 mEq/s',
          status: 'DORMANT'
        },
        {
          id: '0xBC23...FF11',
          timestamp: '14:01:55:012',
          genome: 'TRIC_REES_X',
          metabolic: '241.09 mEq/s',
          status: 'FERMENTING'
        },
        {
          id: '0x8841...B288',
          timestamp: '14:01:30:221',
          genome: 'LYCO_PERL_M',
          metabolic: '4.12 mEq/s',
          status: 'DECAY_DETECTED'
        }
      ]);

      const addRow = () => {
        const now = new Date();
        const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}:${now.getMilliseconds().toString().padStart(3, '0')}`;
        const txId = '0x' + Math.random().toString(16).substring(2, 6).toUpperCase() + '...' + Math.random().toString(16).substring(2, 6).toUpperCase();
        const genome = GENOMES[Math.floor(Math.random() * GENOMES.length)];
        const metabolic = (Math.random() * 20).toFixed(2) + ' mEq/s';
        const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];

        setRows(prev => {
          if (!prev) return prev;
          const next = [{ id: txId, timestamp, genome, metabolic, status }, ...prev];
          if (next.length > 50) next.pop();
          return next;
        });

        timeoutId = window.setTimeout(addRow, Math.random() * 4000 + 3000);
      };

      timeoutId = window.setTimeout(addRow, 2000);
    }, 2500); // simulate 2.5s data fetch

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialFetchId);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full relative">
      {/* Header Section */}
      <header className="w-full px-xxl py-xl flex justify-between items-end border-b border-outline-variant/20 shrink-0">
        <div>
          <h2 className="text-display-sm font-display-sm text-on-surface uppercase tracking-tight">The Living Ledger</h2>
          <p className="text-label-caps font-label-caps text-secondary tracking-[0.2em] mt-sm opacity-80 uppercase">Stratified Transaction Log // Sub-Sector G</p>
        </div>
        {/* Spore Filter */}
        <div className="w-80 relative hidden md:block">
          <label className="text-[10px] font-data-mono text-on-surface-variant mb-xs block">SPORE_FILTER</label>
          <div className="flex items-center border-b border-outline-variant group focus-within:border-primary transition-colors bg-surface-container-lowest/50 px-sm">
            <span className="material-symbols-outlined text-outline text-sm">search</span>
            <input 
              className="bg-transparent border-none text-data-mono text-on-surface placeholder:text-outline-variant w-full focus:ring-0 py-sm outline-none" 
              placeholder="SEARCH_GENOME_HASH..." 
              type="text"
            />
          </div>
        </div>
      </header>

      {/* Data Grid */}
      <section className="flex-1 overflow-auto px-xxl py-xl">
        <div className="border border-outline-variant overflow-hidden flex flex-col min-h-0 relative z-10 bg-background/50 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left font-data-mono text-data-mono relative">
              <thead className="bg-surface-container-high sticky top-0 z-20">
                <tr className="border-b border-outline-variant shadow-sm">
                  <th className="px-md py-md font-bold text-on-surface-variant uppercase border-r border-outline-variant whitespace-nowrap">Timestamp</th>
                  <th className="px-md py-md font-bold text-on-surface-variant uppercase border-r border-outline-variant whitespace-nowrap">Transaction_ID</th>
                  <th className="px-md py-md font-bold text-on-surface-variant uppercase border-r border-outline-variant whitespace-nowrap">Spore_Genome</th>
                  <th className="px-md py-md font-bold text-on-surface-variant uppercase border-r border-outline-variant text-right whitespace-nowrap">Metabolic_Rate</th>
                  <th className="px-md py-md font-bold text-on-surface-variant uppercase whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows === null ? (
                  // Skeleton state
                  Array.from({ length: 15 }).map((_, i) => (
                    <tr key={`skel-${i}`} className="border-b border-outline-variant/30">
                      <td className="px-md py-sm border-r border-outline-variant/30"><Skeleton className="h-5 w-24" /></td>
                      <td className="px-md py-sm border-r border-outline-variant/30"><Skeleton className="h-5 w-32" /></td>
                      <td className="px-md py-sm border-r border-outline-variant/30"><Skeleton className="h-5 w-28" /></td>
                      <td className="px-md py-sm border-r border-outline-variant/30"><div className="flex justify-end"><Skeleton className="h-5 w-20" /></div></td>
                      <td className="px-md py-sm"><Skeleton className="h-5 w-28" /></td>
                    </tr>
                  ))
                ) : (
                  rows.map((row) => (
                    <tr key={row.timestamp + row.id} className="border-b border-outline-variant hover:bg-surface-variant hover:text-primary transition-colors cursor-pointer group">
                      <td className="px-md py-sm border-r border-outline-variant opacity-70 whitespace-nowrap">{row.timestamp}</td>
                      <td className="px-md py-sm border-r border-outline-variant text-secondary whitespace-nowrap">{row.id}</td>
                      <td className="px-md py-sm border-r border-outline-variant whitespace-nowrap">{row.genome}</td>
                      <td className="px-md py-sm border-r border-outline-variant text-right whitespace-nowrap">{row.metabolic}</td>
                      <td className="px-md py-sm flex items-center gap-sm whitespace-nowrap">
                        {row.status === 'FERMENTING' && (
                          <>
                            <div className="w-2 h-2 bg-primary biolum-dot pulse-animation"></div>
                            <span className="text-primary font-bold">FERMENTING</span>
                          </>
                        )}
                        {row.status === 'DECAY_DETECTED' && (
                          <>
                            <div className="w-2 h-2 bg-error"></div>
                            <span className="text-error uppercase">Decay_Detected</span>
                          </>
                        )}
                        {row.status === 'DORMANT' && (
                          <>
                            <div className="w-2 h-2 bg-outline-variant"></div>
                            <span className="text-on-surface-variant">DORMANT</span>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer/Bottom Status Bar */}
      <footer className="w-full h-12 flex justify-between items-center px-gutter bg-surface-container-lowest border-t border-outline-variant shrink-0 mt-auto z-30 relative">
        <div className="flex items-center gap-md sm:gap-xl">
          <span className="text-label-caps font-label-caps text-on-surface-variant hidden sm:inline">© 2024 MYCELIA PROTOCOL | SYNTHETIC MYCORRHIZAL CONSCIOUSNESS</span>
          <span className="text-label-caps font-label-caps text-on-surface-variant sm:hidden">© 2024 MYCELIA PROTOCOL</span>
          
          <div className="h-4 w-px bg-outline-variant hidden sm:block"></div>
          <span className="text-data-mono text-[10px] text-primary">SUBSTRATE: STABLE</span>
        </div>
        <div className="flex items-center gap-lg">
          <div className="hidden md:flex gap-md">
            <a className="text-label-caps font-label-caps text-on-surface-variant hover:text-tertiary-fixed-dim transition-colors" href="#">TERMINAL</a>
            <a className="text-label-caps font-label-caps text-on-surface-variant hover:text-tertiary-fixed-dim transition-colors" href="#">ERRORS</a>
            <a className="text-label-caps font-label-caps text-on-surface-variant hover:text-tertiary-fixed-dim transition-colors" href="#">LOGS</a>
            <a className="text-label-caps font-label-caps text-on-surface-variant hover:text-tertiary-fixed-dim transition-colors" href="#">NODES</a>
          </div>
          <div className="h-4 w-px bg-outline-variant hidden md:block"></div>
          <span className="text-data-mono text-[10px] text-on-surface-variant uppercase">Protocol V.4.0.2</span>
        </div>
      </footer>

      {/* Floating Decorative Element: Mycelial Connector */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-xs pointer-events-none opacity-40 pr-4 z-0">
        <div className="w-px h-32 bg-outline-variant"></div>
        <div className="w-2 h-2 border border-primary rotate-45"></div>
        <div className="w-px h-64 bg-outline-variant"></div>
        <div className="w-2 h-2 border border-primary rotate-45"></div>
        <div className="w-px h-32 bg-outline-variant"></div>
      </div>
    </div>
  );
}
