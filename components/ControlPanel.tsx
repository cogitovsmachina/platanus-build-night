'use client';

import React from 'react';
import { Play, Sparkles, AlertCircle, Database, FileText } from 'lucide-react';

interface ControlPanelProps {
  onRunDirective: (directive: string) => void;
  isRunning: boolean;
}

const PRESETS = [
  {
    title: "Setup Inventory Sync & DB Fork",
    description: "Fork PostgreSQL on ghost.build and test schema for stock management, then sync endpoints.",
    directive: "Create stock_items table (id, name, quantity) in Ghost DB, run test SELECT, and sync outcome to memory.build."
  },
  {
    title: "LatAm Invoice System Audit",
    description: "Check transaction history within memory.build and mock-verify invoice parser via Osmani Harness.",
    directive: "Analyze active invoice schemas, perform schema validation on billing fork, and query test records."
  },
  {
    title: "Clean Context & Discard Sandboxes",
    description: "Clean contextual token buffers and discard active DB forks to save token costs.",
    directive: "Discard active postgres database forks and clean working memory nodes from memory.build."
  }
];

export const ControlPanel: React.FC<ControlPanelProps> = ({ onRunDirective, isRunning }) => {
  const [customDirective, setCustomDirective] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customDirective.trim() && !isRunning) {
      onRunDirective(customDirective.trim());
    }
  };

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-violet-950/50 border border-violet-800/50 rounded-lg text-violet-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-neutral-100">Closed-Loop Controller</h2>
          <p className="text-xs text-neutral-400">Input instructions or run pre-made LatAm SMB templates</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
            AI Agent Directive
          </label>
          <textarea
            value={customDirective}
            onChange={(e) => setCustomDirective(e.target.value)}
            disabled={isRunning}
            placeholder="Type your autonomous company objective (e.g., 'Verify client schema updates on Ghost DB and update episodic memory')..."
            className="w-full h-24 px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition disabled:opacity-50 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isRunning || !customDirective.trim()}
          className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-violet-950/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRunning ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Agent Core Executing...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              Initiate Closed-Loop
            </>
          )}
        </button>
      </form>

      <div>
        <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
          SMB Operational Templates
        </h3>
        <div className="space-y-3">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isRunning}
              onClick={() => {
                setCustomDirective(preset.directive);
                onRunDirective(preset.directive);
              }}
              className="w-full text-left p-3.5 bg-neutral-950 hover:bg-neutral-800/50 border border-neutral-800/80 rounded-xl transition flex flex-col gap-1 group disabled:opacity-50 disabled:hover:bg-neutral-950"
            >
              <span className="text-xs font-semibold text-neutral-200 group-hover:text-violet-400 transition flex items-center gap-1.5">
                {idx === 0 && <Database className="w-3.5 h-3.5 text-blue-400" />}
                {idx === 1 && <AlertCircle className="w-3.5 h-3.5 text-yellow-400" />}
                {idx === 2 && <FileText className="w-3.5 h-3.5 text-red-400" />}
                {preset.title}
              </span>
              <span className="text-[11px] text-neutral-400 leading-normal">
                {preset.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
