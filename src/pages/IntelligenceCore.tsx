import React, { useState } from 'react';
import { LoadingOverlay } from '../components/BiolumSkeleton';

export default function IntelligenceCore() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConsult = async () => {
    if (!prompt) return;
    setIsProcessing(true);
    setResponse('');
    try {
      const res = await fetch('/api/intelligence-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResponse(data.text);
    } catch (e: any) {
      setResponse(`[FATAL_EXCEPTION_LOG]: ${e.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-loam-black p-xl text-on-surface relative">
      {isProcessing && <LoadingOverlay text="CEREBRAL_PROCESSING" />}
      
      <div className="flex items-center justify-between mb-xl border-b border-tertiary-fixed-dim/30 pb-sm">
        <div className="flex items-center gap-md">
          <span className="material-symbols-outlined text-tertiary-fixed-dim text-4xl pulse-animation">network_intelligence</span>
          <div>
            <h1 className="text-display-sm font-display-sm uppercase tracking-tight text-bone-spore">Intelligence Core</h1>
            <p className="text-label-caps font-label-caps text-on-surface-variant tracking-widest mt-xs">DEEP_COGNITION_PHASE // HIGH_THINKING_LEVEL</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-lg min-h-0">
        <div className="flex flex-col gap-sm shrink-0">
          <label className="text-label-caps font-label-caps text-tertiary-fixed-dim uppercase">High-Density Inquiry</label>
          <div className="relative">
             <textarea
              className="w-full h-32 bg-surface-container-low border border-wet-clay text-body-md text-on-surface p-md focus:border-tertiary-fixed-dim outline-none focus:ring-0 resize-none transition-colors"
              placeholder="Inject complex logic matrix..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
            />
            <div className="absolute right-0 bottom-0 p-xs text-outline pointer-events-none text-[10px] uppercase block">
              COGNITIVE_LOAD: HIGH
            </div>
          </div>
          <button 
            onClick={handleConsult}
            disabled={isProcessing}
            className="w-48 self-end border border-tertiary-fixed-dim text-tertiary-fixed-dim hover:bg-tertiary-fixed-dim/20 py-sm text-label-caps font-label-caps uppercase tracking-widest disabled:opacity-50 transition-colors cursor-pointer block"
          >
            INITIATE THOUGHT
          </button>
        </div>
        
        <div className="flex-1 flex flex-col gap-sm">
          <label className="text-label-caps font-label-caps text-on-surface uppercase border-b border-outline-variant pb-xs">
            Synthesized Paradigm
          </label>
          <div className="flex-1 bg-surface-container-highest p-lg overflow-y-auto font-body-md text-bone-spore leading-relaxed brutalist-border relative">
            {!response && !isProcessing && <div className="absolute inset-0 flex items-center justify-center opacity-20 font-display-lg text-6xl pointer-events-none select-none glitch-text">DORMANT</div>}
            <div className="whitespace-pre-wrap">{response}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
