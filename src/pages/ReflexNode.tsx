import React, { useState } from 'react';
import { LoadingOverlay } from '../components/BiolumSkeleton';

export default function ReflexNode() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRun = async () => {
    if (!prompt) return;
    setIsProcessing(true);
    setResponse('');
    try {
      const res = await fetch('/api/reflex-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResponse(data.text);
    } catch (e: any) {
      setResponse(`[SYS_ERR]: ${e.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-loam-black p-xl text-on-surface relative">
      {isProcessing && <LoadingOverlay text="STIMULATING_SYNAPSES" />}
      
      <div className="flex items-center gap-md mb-xl border-b border-outline-variant/30 pb-sm">
        <span className="material-symbols-outlined text-primary text-4xl">bolt</span>
        <div>
          <h1 className="text-display-sm font-display-sm uppercase tracking-tight text-bone-spore">Reflex Node</h1>
          <p className="text-label-caps font-label-caps text-on-surface-variant tracking-widest mt-xs">LOW_LATENCY_RESPONSE_SYSTEM // ACTIVE</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-xl min-h-0">
        <div className="flex-1 flex flex-col gap-md">
          <label className="text-label-caps font-label-caps text-primary uppercase">Direct Input Feed</label>
          <textarea
            className="w-full flex-1 bg-surface-container-low border border-wet-clay text-body-md text-on-surface p-md focus:border-primary outline-none focus:ring-0 resize-none transition-colors"
            placeholder="Introduce stimuli..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <button 
            onClick={handleRun}
            disabled={isProcessing}
            className="concrete-button py-md text-headline-sm font-display-sm text-primary uppercase tracking-widest hover:brightness-110 disabled:opacity-50"
          >
            Trigger Reflex
          </button>
        </div>
        
        <div className="flex-1 flex flex-col gap-md">
          <label className="text-label-caps font-label-caps text-teal-lumin uppercase block flex justify-between">
            <span>Synaptic Output</span>
            <span className="text-outline-variant">T ~ 0.0ms</span>
          </label>
          <div className="flex-1 bg-surface-container border border-outline-variant p-md overflow-y-auto text-data-mono font-data-mono brutalist-border relative">
            {!response && !isProcessing && <span className="opacity-30">Awaiting stimuli...</span>}
            <div className="whitespace-pre-wrap">{response}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
