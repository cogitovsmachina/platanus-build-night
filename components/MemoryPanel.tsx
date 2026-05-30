'use client';

import React from 'react';
import { MemorySegment } from '@/types';
import { Database, Link2, RefreshCw, Key } from 'lucide-react';

interface MemoryPanelProps {
  memorySegments: MemorySegment[];
  onRefresh: () => void;
  isLoading: boolean;
}

export const MemoryPanel: React.FC<MemoryPanelProps> = ({ memorySegments, onRefresh, isLoading }) => {
  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-950/50 border border-violet-800/50 rounded-lg text-violet-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-neutral-100">Institutional Memory</h2>
            <p className="text-xs text-neutral-400">memory.build episodic context layer</p>
          </div>
        </div>

        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2 text-neutral-400 hover:text-neutral-200 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto max-h-[350px] pr-1">
        {memorySegments.length === 0 ? (
          <div className="h-32 flex flex-col items-center justify-center text-center p-4">
            <p className="text-xs text-neutral-500 font-mono">No memory nodes allocated.</p>
          </div>
        ) : (
          memorySegments.map((segment) => (
            <div key={segment.id} className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 flex gap-3 items-start transition hover:border-violet-900/50">
              <div className={`p-2 rounded-lg mt-0.5 ${
                segment.type === 'episodic' 
                  ? 'bg-blue-950/50 border border-blue-900/50 text-blue-400' 
                  : 'bg-emerald-950/50 border border-emerald-900/50 text-emerald-400'
              }`}>
                {segment.type === 'episodic' ? <Link2 className="w-4 h-4" /> : <Key className="w-4 h-4" />}
              </div>

              <div className="flex-1 space-y-1.5 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-neutral-200 truncate">
                    {segment.key}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono border uppercase ${
                    segment.type === 'episodic' 
                      ? 'text-blue-400 bg-blue-950/30 border-blue-900/40' 
                      : 'text-emerald-400 bg-emerald-950/30 border-emerald-900/40'
                  }`}>
                    {segment.type}
                  </span>
                </div>
                
                <p className="text-xs text-neutral-400 font-mono leading-normal break-words">
                  {segment.value}
                </p>

                <div className="text-[9px] text-neutral-600 font-mono">
                  Synced: {new Date(segment.syncedAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
