'use client';

import React from 'react';
import { Send, FileText, Target, Presentation, Copy, Check, Sparkles } from 'lucide-react';

interface OperatorConsoleProps {
  onRunAction: (actionType: 'operation_summary' | 'milestones_verification' | 'investor_memo') => void;
  isRunning: boolean;
  activeResult: {
    type: 'operation_summary' | 'milestones_verification' | 'investor_memo' | null;
    content: string;
  } | null;
}

export const OperatorConsole: React.FC<OperatorConsoleProps> = ({ onRunAction, isRunning, activeResult }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (!activeResult) return;
    navigator.clipboard.writeText(activeResult.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 backdrop-blur-md space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-neutral-805 pb-4">
        <div>
          <h3 className="text-base font-bold text-neutral-105">Operator Command Center</h3>
          <p className="text-[11px] text-neutral-400">Streamline weekly operations and investor reporting</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-450 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-900/40">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          Operator Mode Active
        </div>
      </div>

      {/* Operation Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Action 1: Operations Summary */}
        <button
          onClick={() => onRunAction('operation_summary')}
          disabled={isRunning}
          className="bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 hover:border-violet-900/40 p-4 rounded-2xl text-left flex flex-col justify-between h-40 transition disabled:opacity-50 group"
        >
          <div className="p-2 bg-violet-950/40 border border-violet-900/30 rounded-xl text-violet-400 w-fit">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-neutral-200 group-hover:text-violet-400 transition">
              Weekly Operations Summary
            </h4>
            <p className="text-[10px] text-neutral-405 mt-1 leading-normal">
              Extract cohort data, sandbox execution success rates, and GPU utilization metrics.
            </p>
          </div>
        </button>

        {/* Action 2: Milestones Verification */}
        <button
          onClick={() => onRunAction('milestones_verification')}
          disabled={isRunning}
          className="bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 hover:border-blue-900/40 p-4 rounded-2xl text-left flex flex-col justify-between h-40 transition disabled:opacity-50 group"
        >
          <div className="p-2 bg-blue-950/40 border border-blue-900/30 rounded-xl text-blue-400 w-fit">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-neutral-200 group-hover:text-blue-400 transition">
              Verify Weekly Milestones
            </h4>
            <p className="text-[10px] text-neutral-405 mt-1 leading-normal">
              Run compliance checks, CFDI 4.0 status for LatAm invoices, and check student project timelines.
            </p>
          </div>
        </button>

        {/* Action 3: Investor Memo */}
        <button
          onClick={() => onRunAction('investor_memo')}
          disabled={isRunning}
          className="bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 hover:border-emerald-900/40 p-4 rounded-2xl text-left flex flex-col justify-between h-40 transition disabled:opacity-50 group"
        >
          <div className="p-2 bg-emerald-950/40 border border-emerald-900/30 rounded-xl text-emerald-400 w-fit">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-neutral-200 group-hover:text-emerald-400 transition">
              Generate Investor Memo
            </h4>
            <p className="text-[10px] text-neutral-405 mt-1 leading-normal">
              Compose operational telemetry and student progress into a beautiful markdown report.
            </p>
          </div>
        </button>

      </div>

      {/* Output Screen */}
      {isRunning ? (
        <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-8 flex flex-col items-center justify-center gap-3">
          <div className="w-6 h-6 border-2 border-violet-600/30 border-t-violet-500 rounded-full animate-spin" />
          <span className="text-xs text-neutral-400 font-mono">Assembling operational intelligence...</span>
        </div>
      ) : activeResult ? (
        <div className="bg-neutral-950 border border-neutral-855 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-violet-400">
              Generated Report: {activeResult.type?.replace('_', ' ')}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 p-1 px-2.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-[10px] text-neutral-300 rounded transition font-mono"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy Markdown
                </>
              )}
            </button>
          </div>

          <div className="text-xs leading-relaxed font-mono text-neutral-300 max-h-96 overflow-y-auto whitespace-pre-wrap pr-2">
            {activeResult.content}
          </div>
        </div>
      ) : (
        <div className="bg-neutral-950/40 border border-dashed border-neutral-800 rounded-2xl p-8 text-center">
          <p className="text-xs text-neutral-500 font-mono">
            Select one of the actions above to run the intelligence pipeline.
          </p>
        </div>
      )}
    </div>
  );
};
