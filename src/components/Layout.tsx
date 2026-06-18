import { Link, Outlet, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TerminalOverlay } from './TerminalOverlay';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { name: 'TELEMETRY', icon: 'analytics', path: '/nexus' },
    { name: 'SIGNAL', icon: 'wifi_tethering', path: '/anomaly' },
    { name: 'GROWTH', icon: 'query_stats', path: '/ledger' },
    { name: 'MUTATION', icon: 'movie', path: '/mutation' },
    { name: 'INTELLIGENCE', icon: 'network_intelligence', path: '/intelligence' },
    { name: 'REFLEX', icon: 'bolt', path: '/reflex' },
    { name: 'DECAY', icon: 'coronavirus', path: '/' },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden w-full bg-background text-on-surface select-none">
      <div className="flex flex-1 overflow-hidden">
        {/* SideNavBar */}
        <aside className="hidden md:flex flex-col h-full py-lg border-r border-outline-variant bg-surface-container-low w-64 shrink-0 z-50">
          <div className="px-md mb-huge flex justify-between items-start">
            <div>
              <h1 className="text-headline-lg font-headline-lg text-primary tracking-tighter">NODE_09</h1>
              <p className="text-label-caps font-label-caps text-on-surface-variant tracking-widest mt-xs uppercase opacity-70">
                SUBTERRANEAN STATUS: ACTIVE
              </p>
            </div>
          </div>
          <nav className="flex-1 space-y-xs px-xs">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-md px-md py-sm font-label-caps text-label-caps transition-all group',
                    isActive
                      ? 'bg-primary text-on-primary font-bold shadow-[4px_0_0_0_var(--color-primary)] translate-x-1 duration-150'
                      : 'text-on-surface-variant hover:bg-surface-container-highest'
                  )}
                >
                  <span
                    className={cn(
                      'material-symbols-outlined',
                      !isActive && 'group-hover:text-primary'
                    )}
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-loam-black shadow-[0_0_6px_var(--color-primary)] pulse-lumin ml-auto" />
                  )}
                </Link>
              );
            })}
          </nav>
          
          <div className="px-md mt-auto pt-lg border-t border-outline-variant/30 space-y-md">
            {/* Terminal Hint */}
            <div className="flex justify-between items-center text-[10px] font-data-mono border border-primary/20 p-sm text-outline-variant">
              <span>ROOT_OVERRIDE</span>
              <div className="flex items-center gap-1 border border-outline px-1 rounded-sm bg-surface-container-highest">
                <span className="text-primary font-bold">CTRL</span><span>+</span><span className="text-primary font-bold">K</span>
              </div>
            </div>

            <div className="flex items-center gap-sm">
              <div className="w-10 h-10 border border-primary p-0.5 relative">
                <img
                  className="w-full h-full object-cover"
                  alt="A macro photography shot of an glowing, bioluminescent organic interface"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB19vv0yLAR_2roQuRAdWvI6PYXFLvOU4gxa8qkqzFIobh1vIuPg5cE4zKXisdIBkWJ10esx2KwXdvKBP19eukmLze9J4JiKeHwjQ6ab9GG1pTIYj6JtmG_gd6NG-brS_3U_I9iLix5qqwBkdU6aT6rVx4cyDIQo-ExSk1t-E_K60IllYNXsVMi7wl5z1LkMQewkicpUCKzi2BQDBoYtCSKFgCRnxdWVHn4ggnL-ja9zWnL5RcP3bvXhJ1pHvA30dounVNtLXu8oPqK"
                />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary"></div>
              </div>
              <div>
                <p className="text-label-caps font-label-caps text-primary leading-none">NODE_09_BIO</p>
                <p className="text-[10px] font-data-mono text-on-surface-variant">LEVEL_5_CONSCIOUSNESS</p>
              </div>
            </div>
            <button 
              className="w-full py-sm bg-primary text-on-primary font-display-sm text-[14px] active:scale-95 transition-transform hover:brightness-110 tracking-widest uppercase"
              onClick={() => window.dispatchEvent(new CustomEvent('sys_log', { detail: { message: 'CONSCIOUSNESS_SYNC: Initiated by NODE_09_BIO' } }))}
            >
              SYNC CONSCIOUSNESS
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col bg-background overflow-hidden relative min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Global Overlays */}
      <TerminalOverlay />
    </div>
  );
}
