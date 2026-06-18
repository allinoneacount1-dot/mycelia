import React, { useState, useEffect } from 'react';

interface LogMessage {
  id: string;
  text: string;
  timestamp: number;
}

export function SystemLog() {
  const [logs, setLogs] = useState<LogMessage[]>([]);

  useEffect(() => {
    // Add random logs periodically just for aesthetic
    const ambientLogs = [
      "SYNCHRONIZING_CORE_NODES",
      "CHECKING_HYPHAE_INTEGRITY",
      "SPORE_COUNT_NOMINAL",
      "LATENCY_SPIKE_DETECTED_SECTOR_7G",
      "RECALIBRATING_ROOT_NETWORK",
      "SUBSTRATE_FERMENTATION_ACTIVE",
      "AWAITING_INPUT_COMMANDS",
      "QUANTUM_NUTRIENT_FLOW_STABLE"
    ];

    const generateAmbientLog = () => {
      if (Math.random() > 0.6) {
        addLog(ambientLogs[Math.floor(Math.random() * ambientLogs.length)]);
      }
    };

    const interval = setInterval(generateAmbientLog, 3500);

    // Listen to custom events
    const handleCustomLog = (e: CustomEvent<{ message: string }>) => {
      addLog(e.detail.message);
    };

    window.addEventListener('sys_log' as any, handleCustomLog);

    return () => {
      clearInterval(interval);
      window.removeEventListener('sys_log' as any, handleCustomLog);
    };
  }, []);

  const addLog = (message: string) => {
    const newLog = {
      id: Math.random().toString(36).substring(2, 9),
      text: message,
      timestamp: Date.now()
    };
    
    setLogs(prev => {
      const updated = [...prev, newLog];
      // Keep only last 5 logs max
      if (updated.length > 5) return updated.slice(-5);
      return updated;
    });

    // Remove log after 4 seconds
    setTimeout(() => {
      setLogs(prev => prev.filter(l => l.id !== newLog.id));
    }, 4000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-2 pointer-events-none w-80">
      {logs.map((log) => (
        <div 
          key={log.id} 
          className="font-data-mono text-[10px] text-primary bg-surface-container-lowest/80 border border-primary/20 px-3 py-1.5 uppercase tracking-widest backdrop-blur-sm animate-slide-in-right bioluminescence-shadow"
        >
          {`>`} {log.text}
        </div>
      ))}
    </div>
  );
}

export const emitSysLog = (message: string) => {
  window.dispatchEvent(new CustomEvent('sys_log', { detail: { message } }));
};
