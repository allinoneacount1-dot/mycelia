import React, { useState, useRef, useEffect } from 'react';
import { LoadingOverlay } from '../components/BiolumSkeleton';

export default function MutationChamber() {
  const [activeTab, setActiveTab] = useState<'IMAGE' | 'VIDEO'>('IMAGE');
  
  // Image Gen State
  const [imgPrompt, setImgPrompt] = useState('');
  const [imgSize, setImgSize] = useState('1K');
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  
  // Video Gen State
  const [vidSrcImage, setVidSrcImage] = useState<string | null>(null);
  const [vidSrcBase64, setVidSrcBase64] = useState<string | null>(null);
  const [vidAspectRatio, setVidAspectRatio] = useState('16:9');
  const [vidPrompt, setVidPrompt] = useState('');
  const [generatedVidUrl, setGeneratedVidUrl] = useState<string | null>(null);
  const [vidStatus, setVidStatus] = useState<string | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageGen = async () => {
    if (!imgPrompt) return;
    setIsProcessing(true);
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: imgPrompt, size: imgSize })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setGeneratedImg(data.image);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setVidSrcImage(result);
      // Remove data:image/...;base64, prefix for API
      const base64 = result.split(',')[1];
      setVidSrcBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleVideoGen = async () => {
    if (!vidSrcBase64) {
      alert("Must upload a source image for mutation.");
      return;
    }
    setIsProcessing(true);
    setVidStatus('INCUBATING_MUTATION');
    try {
      // 1. Start operation
      const startRes = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          imageBytes: vidSrcBase64, 
          prompt: vidPrompt,
          aspectRatio: vidAspectRatio 
        })
      });
      const startData = await startRes.json();
      if (startData.error) throw new Error(startData.error);
      const { operationName } = startData;

      // 2. Poll status
      let done = false;
      while (!done) {
        setVidStatus('AWAITING_CELLULAR_DIVISION...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        const statusRes = await fetch('/api/video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName })
        });
        const statusData = await statusRes.json();
        if (statusData.error) throw new Error(statusData.error);
        done = statusData.done;
      }

      setVidStatus('FETCHING_FINAL_ORGANISM');
      // 3. Download
      const downloadRes = await fetch('/api/video-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName })
      });
      if (!downloadRes.ok) throw new Error("Failed to download video blob");
      const blob = await downloadRes.blob();
      const url = URL.createObjectURL(blob);
      setGeneratedVidUrl(url);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsProcessing(false);
      setVidStatus(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-loam-black p-xl text-on-surface relative overflow-y-auto">
      {isProcessing && <LoadingOverlay text={vidStatus || "MUTATING_PIXELS"} />}
      
      <div className="flex items-center justify-between mb-xl border-b border-primary/30 pb-sm shrink-0">
        <div className="flex items-center gap-md">
          <span className="material-symbols-outlined text-primary text-4xl">movie</span>
          <div>
            <h1 className="text-display-sm font-display-sm uppercase tracking-tight text-bone-spore">Mutation Chamber</h1>
            <p className="text-label-caps font-label-caps text-on-surface-variant tracking-widest mt-xs">GENERATIVE_SYNTHESIS_HUB</p>
          </div>
        </div>
        <div className="flex bg-surface-container-low border border-wet-clay text-[10px] uppercase font-data-mono">
          <button 
            className={`px-lg py-xs transition-colors cursor-pointer ${activeTab === 'IMAGE' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}
            onClick={() => setActiveTab('IMAGE')}
          >
            IMAGE_SPORES
          </button>
          <div className="w-[1px] bg-wet-clay"></div>
          <button 
            className={`px-lg py-xs transition-colors cursor-pointer ${activeTab === 'VIDEO' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}
            onClick={() => setActiveTab('VIDEO')}
          >
            VIDEO_ORGANISMS
          </button>
        </div>
      </div>

      {activeTab === 'IMAGE' && (
        <div className="flex-1 flex justify-center items-start min-h-0 w-full max-w-5xl mx-auto">
          <div className="flex-1 flex flex-col gap-lg mr-xl max-w-sm shrink-0">
            <div>
              <label className="text-label-caps font-label-caps text-primary uppercase block mb-xs">Spore Specification</label>
              <textarea
                className="w-full bg-surface-container-lowest border border-wet-clay p-sm font-body-md text-on-surface focus:border-primary outline-none focus:ring-0 resize-none h-32"
                placeholder="Describe the desired fungal structure..."
                value={imgPrompt}
                onChange={e => setImgPrompt(e.target.value)}
              />
            </div>
            
            <div>
               <label className="text-label-caps font-label-caps text-primary uppercase block mb-xs">Growth Density</label>
               <div className="flex gap-sm">
                 {['1K', '2K', '4K'].map(s => (
                   <button
                     key={s}
                     onClick={() => setImgSize(s)}
                     className={`flex-1 py-xs text-label-caps font-label-caps border transition-all cursor-pointer ${imgSize === s ? 'border-primary bg-primary/20 text-primary' : 'border-outline-variant text-on-surface-variant hover:border-primary/50'}`}
                   >
                     {s}
                   </button>
                 ))}
               </div>
            </div>

            <button 
              onClick={handleImageGen}
              disabled={isProcessing || !imgPrompt}
              className="mt-xl concrete-button py-md text-headline-sm font-display-sm text-bone-spore uppercase tracking-widest hover:brightness-110 disabled:opacity-50"
            >
              Incubate Spore
            </button>
          </div>
          
          <div className="flex-1 flex flex-col h-[500px] border border-outline-variant bg-surface-container-lowest brutalist-border relative items-center justify-center overflow-hidden">
            <span className="absolute top-2 left-2 text-[10px] font-data-mono text-outline uppercase z-10">OUTPUT_MONITOR</span>
            {generatedImg ? (
              <img src={generatedImg} alt="Generated organism" className="w-full h-full object-contain" />
            ) : (
              <div className="opacity-20 flex flex-col items-center gap-sm">
                 <span className="material-symbols-outlined text-6xl">image</span>
                 <span className="font-data-mono text-sm uppercase text-center block max-w-xs">Awaiting structural definition sequence...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'VIDEO' && (
        <div className="flex-1 flex justify-center items-start min-h-0 w-full max-w-6xl mx-auto flex-col lg:flex-row">
          <div className="flex-1 flex flex-col gap-lg mr-xl max-w-md shrink-0 w-full">
            <div>
              <label className="text-label-caps font-label-caps text-primary uppercase block mb-xs">Source DNA (Base Image)</label>
              <div 
                className="w-full h-40 border-2 border-dashed border-outline-variant hover:border-primary transition-colors flex items-center justify-center relative cursor-pointer overflow-hidden bg-surface-container-lowest"
                onClick={() => fileInputRef.current?.click()}
              >
                {vidSrcImage ? (
                  <img src={vidSrcImage} alt="Base specimen" className="w-full h-full object-cover opacity-80" />
                ) : (
                  <div className="flex flex-col items-center opacity-60">
                    <span className="material-symbols-outlined text-3xl mb-xs">upload</span>
                    <span className="text-xs font-data-mono uppercase">Provide Cellular Base</span>
                  </div>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload}/>
              </div>
            </div>

            <div>
              <label className="text-label-caps font-label-caps text-primary uppercase block mb-xs">Evolution Context (Optional)</label>
              <textarea
                className="w-full bg-surface-container-lowest border border-wet-clay p-sm font-body-md text-on-surface focus:border-primary outline-none focus:ring-0 resize-none h-24"
                placeholder="Describe movement or changes over time..."
                value={vidPrompt}
                onChange={e => setVidPrompt(e.target.value)}
              />
            </div>
            
            <div>
               <label className="text-label-caps font-label-caps text-primary uppercase block mb-xs">Cultivation Frame Ratio</label>
               <div className="flex gap-sm">
                 {['16:9', '9:16'].map(ratio => (
                   <button
                     key={ratio}
                     onClick={() => setVidAspectRatio(ratio)}
                     className={`flex-1 py-xs text-label-caps font-label-caps border transition-all cursor-pointer ${vidAspectRatio === ratio ? 'border-primary bg-primary/20 text-primary' : 'border-outline-variant text-on-surface-variant hover:border-primary/50'}`}
                   >
                     {ratio}
                   </button>
                 ))}
               </div>
            </div>

            <button 
              onClick={handleVideoGen}
              disabled={isProcessing || !vidSrcBase64}
              className="mt-sm concrete-button py-md text-headline-sm font-display-sm text-bone-spore uppercase tracking-widest hover:brightness-110 disabled:opacity-50"
            >
              Trigger Evolution
            </button>
          </div>
          
          <div className={`flex flex-col border border-outline-variant bg-surface-container-lowest brutalist-border relative items-center justify-center overflow-hidden shrink-0 mx-auto w-full max-w-[800px] mt-xl lg:mt-0 ${vidAspectRatio === '16:9' ? 'aspect-video' : 'aspect-[9/16] h-[600px] w-auto'}`}>
            <span className="absolute top-2 left-2 text-[10px] font-data-mono text-outline uppercase z-10 bg-loam-black/50 px-1">CULTURE_MONITOR</span>
            {generatedVidUrl ? (
              <video src={generatedVidUrl} controls autoPlay loop className="w-full h-full object-contain" />
            ) : (
              <div className="opacity-20 flex flex-col items-center gap-sm">
                 <span className="material-symbols-outlined text-6xl">movie</span>
                 <span className="font-data-mono text-sm uppercase text-center block p-4">Requires stable DNA sample before animation sequence.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
