import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from './BiolumSkeleton';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error';
  content: string;
}

export function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: 'init-1', type: 'output', content: 'MYCELIA OS v4.0.2 [BIOS_ROOT_ACCESS]' },
    { id: 'init-2', type: 'output', content: 'Type "help" to view available neural pathways...' }
  ]);
  const [typingId, setTypingId] = useState<string | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Ctrl+K or Cmd+K or Backquote (`) or Ctrl+N (for navigation)
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'n')) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === '`') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  // Scroll to bottom when history changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const addLine = (content: string, type: 'input' | 'output' | 'error' = 'output') => {
    const id = Math.random().toString(36).substring(2, 9);
    setHistory(prev => [...prev, { id, type, content }]);
    if (type !== 'input') {
      setTypingId(id);
    }
  };

  const handleCommand = (cmd: string) => {
    const normalized = cmd.trim().toLowerCase();
    
    if (normalized === 'help') {
      addLine('AVAILABLE_PATHWAYS:');
      setTimeout(() => addLine('  cd nexus        [ TELEMETRY ]'), 100);
      setTimeout(() => addLine('  cd anomaly      [ SIGNAL ]'), 200);
      setTimeout(() => addLine('  cd ledger       [ GROWTH ]'), 300);
      setTimeout(() => addLine('  cd mutation     [ MUTATION ]'), 400);
      setTimeout(() => addLine('  cd intelligence [ INTELLIGENCE ]'), 500);
      setTimeout(() => addLine('  cd reflex       [ REFLEX ]'), 600);
      setTimeout(() => addLine('  exit            [ CLOSE_TERMINAL ]'), 700);
      setTimeout(() => addLine('  clear           [ PURGE_HISTORY ]'), 800);
    } else if (normalized.startsWith('cd ')) {
      const target = normalized.split(' ')[1];
      const routes: Record<string, string> = {
        nexus: '/nexus',
        anomaly: '/anomaly',
        ledger: '/ledger',
        mutation: '/mutation',
        intelligence: '/intelligence',
        reflex: '/reflex',
        root: '/'
      };
      
      if (routes[target]) {
        addLine(`Routing synapses to [${target.toUpperCase()}]...`);
        // Dispatch event for sys log visibility
        window.dispatchEvent(new CustomEvent('sys_log', { detail: { message: `NAV_INIT: ${target.toUpperCase()}` } }));
        
        setTimeout(() => {
          navigate(routes[target]);
          setIsOpen(false);
          addLine('Rerouting successful.', 'output');
        }, 800);
      } else {
        addLine(`UNKNOWN_NODE: ${target}. Cannot establish link.`, 'error');
      }
    } else if (normalized === 'exit') {
      addLine('Terminating session...');
      setTimeout(() => setIsOpen(false), 300);
    } else if (normalized === 'clear') {
      setHistory([]);
    } else if (normalized !== '') {
      addLine(`UNRECOGNIZED_COMMAND: ${normalized}. Type "help" for syntax.`, 'error');
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    addLine(`> ${input}`, 'input');
    handleCommand(input);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-loam-black/95 backdrop-blur-md flex flex-col p-lg md:p-xxl">
      {/* Scanline effect over terminal */}
      <div className="scanline"></div>
      
      <div className="flex justify-between items-center border-b border-primary/30 pb-sm shrink-0 mb-md">
        <div className="flex justify-between items-center w-full">
           <div className="flex items-center gap-sm">
             <span className="material-symbols-outlined text-primary pulse-animation">terminal</span>
             <span className="text-display-sm font-display-sm uppercase tracking-tight text-primary">ROOT_TERMINAL</span>
           </div>
           <button 
             onClick={() => setIsOpen(false)}
             className="text-primary hover:text-bone-spore transition-colors cursor-pointer"
           >
             <span className="material-symbols-outlined">close</span>
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto font-data-mono text-sm space-y-xs pb-xl relative">
        {history.map((line) => (
          <TypewriterLine 
            key={line.id} 
            line={line} 
            isTyping={typingId === line.id} 
            onComplete={() => setTypingId(null)} 
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={onSubmit} className="shrink-0 flex items-center gap-sm border-t border-primary/30 pt-sm mt-auto relative z-10">
        <span className="text-primary font-bold">{'>'}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-primary font-data-mono uppercase selection:bg-primary selection:text-loam-black placeholder:text-primary/30"
          placeholder="AWAITING_INPUT..."
          autoComplete="off"
          spellCheck="false"
        />
        <div className="text-[10px] text-outline uppercase">Press Enter</div>
      </form>
    </div>
  );
}

function TypewriterLine({ line, isTyping, onComplete }: { line: TerminalLine, isTyping: boolean, onComplete: () => void }) {
  const [displayedContent, setDisplayedContent] = useState(isTyping ? '' : line.content);

  useEffect(() => {
    if (!isTyping) {
      setDisplayedContent(line.content);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= line.content.length) {
        setDisplayedContent(line.content.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 15); // typing speed

    return () => clearInterval(interval);
  }, [line.content, isTyping, onComplete]);

  return (
    <div className={cn(
      "font-data-mono whitespace-pre-wrap leading-relaxed",
      line.type === 'input' && "text-outline-variant",
      line.type === 'output' && "text-bone-spore",
      line.type === 'error' && "text-error drop-shadow-[0_0_4px_var(--color-error)]"
    )}>
      {displayedContent}
      {isTyping && <span className="bg-primary w-2 h-4 inline-block ml-1 animate-pulse align-middle"></span>}
    </div>
  );
}
