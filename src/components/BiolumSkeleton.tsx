import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-outline-variant/30 bg-surface-container-low/30",
        className
      )}
      {...props}
    >
      {/* Subtle base pulse */}
      <div className="absolute inset-0 bg-primary/5 animate-pulse" style={{ animationDuration: '3s' }}></div>
      
      {/* Bioluminescent sweep/shimmer */}
      <div 
        className="absolute inset-0 -translate-x-full w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        style={{ animation: 'shimmer 2s infinite' }}
      />
    </div>
  );
}

export function LoadingOverlay({ text = "SEQUENCING_GENOME", className }: { text?: string, className?: string }) {
  return (
    <div className={cn("absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm border border-primary/20", className)}>
      {/* Organic/network pulse aesthetic */}
      <div className="flex flex-col items-center gap-lg">
        <div className="relative flex items-center justify-center w-16 h-16">
           {/* Concentric pulsing rings simulating mycelium expansion */}
           <div className="absolute inset-0 border border-primary/30 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
           <div className="absolute inset-2 border border-primary/50 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ animationDelay: '400ms'}}></div>
           <div className="w-3 h-3 bg-primary shadow-[0_0_12px_var(--color-primary)]"></div>
        </div>
        
        <div className="flex items-center gap-sm">
          <span className="w-2 h-2 bg-primary inline-block shadow-[0_0_8px_var(--color-primary)] animate-pulse"></span>
          <span className="text-primary font-data-mono text-[10px] tracking-widest uppercase animate-pulse">{text}...</span>
        </div>
      </div>
    </div>
  );
}
