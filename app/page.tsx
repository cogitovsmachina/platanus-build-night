'use client';

import React from 'react';
import { ControlPanel } from '@/components/ControlPanel';
import { TraceViewer } from '@/components/TraceViewer';
import { MemoryPanel } from '@/components/MemoryPanel';
import { SandboxDBPanel } from '@/components/SandboxDBPanel';
import { McpSkillsPanel } from '@/components/McpSkillsPanel';
import { LatAmToolboxPanel } from '@/components/LatAmToolboxPanel';
import { BootcampPanel } from '@/components/BootcampPanel';
import { OperatorConsole } from '@/components/OperatorConsole';
import { AgentStep, MentalPlan, MemorySegment, DatabaseFork } from '@/types';
import { memoryClient } from '@/lib/memory';
import { ghostClient } from '@/lib/ghost';
import { Info, Globe, HardDrive, ShieldAlert, Cpu } from 'lucide-react';

interface LoadedSkill {
  name: string;
  source: string;
}

export default function Home() {
  const [isDevMode, setIsDevMode] = React.useState(false);
  const [isRunning, setIsRunning] = React.useState(false);
  const [steps, setSteps] = React.useState<AgentStep[]>([]);
  const [plan, setPlan] = React.useState<MentalPlan | null>(null);
  const [memorySegments, setMemorySegments] = React.useState<MemorySegment[]>([]);
  const [activeForks, setActiveForks] = React.useState<DatabaseFork[]>([]);
  const [loadedSkills, setLoadedSkills] = React.useState<LoadedSkill[]>([]);
  
  // Operator-focused report output
  const [activeReport, setActiveReport] = React.useState<{
    type: 'operation_summary' | 'milestones_verification' | 'investor_memo' | null;
    content: string;
  } | null>(null);

  // Bootcamp initial mock state
  const [bootcampData, setBootcampData] = React.useState<any>({
    capabilities: [],
    companyModel: { cohortName: '', totalStudents: 0, graduationRate: 0, totalGpuHoursUsed: 0, gpuLimitHours: 0, activeSandboxes: 0, tuitionRevenue: 0 },
    studentModels: [],
    compositions: []
  });
  
  const [systemLoading, setSystemLoading] = React.useState(true);

  // Load initial data
  const loadSystemState = React.useCallback(async () => {
    try {
      const [mem, db, bootcampRes] = await Promise.all([
        memoryClient.getFullHistory(),
        ghostClient.getActiveForks(),
        fetch('/api/bootcamp').then(r => r.json())
      ]);
      setMemorySegments(mem);
      setActiveForks(db);
      setBootcampData(bootcampRes);
    } catch (e) {
      console.error("Failed to load states:", e);
    } finally {
      setSystemLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadSystemState();
  }, [loadSystemState]);

  const handleRunDirective = async (directive: string) => {
    setIsRunning(true);
    setSteps([]);
    setPlan(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ directive })
      });

      if (!response.body) throw new Error("No readable stream received.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const chunk = JSON.parse(line);
            
            if (chunk.type === 'step') {
              const stepData = chunk.data as AgentStep;
              setSteps(prev => {
                const existingIdx = prev.findIndex(s => s.id === stepData.id);
                if (existingIdx >= 0) {
                  const updated = [...prev];
                  updated[existingIdx] = stepData;
                  return updated;
                }
                return [...prev, stepData];
              });
            } else if (chunk.type === 'plan') {
              setPlan(chunk.data as MentalPlan);
            } else if (chunk.type === 'skills') {
              setLoadedSkills(chunk.data.loaded as LoadedSkill[]);
            } else if (chunk.type === 'report') {
              setActiveReport(chunk.data);
            } else if (chunk.type === 'memory' || chunk.type === 'database') {
              await loadSystemState();
            }
          } catch (e) {
            console.error("Error decoding chunk line:", e);
          }
        }
      }
    } catch (err) {
      console.error("Streaming error:", err);
    } finally {
      setIsRunning(false);
      await loadSystemState();
    }
  };

  const handleRunOperatorAction = (actionType: 'operation_summary' | 'milestones_verification' | 'investor_memo') => {
    setActiveReport(null);
    handleRunDirective(actionType);
  };

  if (systemLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-neutral-400 font-mono text-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-violet-600/30 border-t-violet-500 rounded-full animate-spin" />
          Powering up Wardenclyffe orchestrator...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-neutral-100 flex flex-col selection:bg-violet-900/40 font-sans">
      {/* Top Banner / Navigation */}
      <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-55">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-900/30">
              <span className="font-mono font-bold text-lg text-white">W</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-neutral-50 bg-gradient-to-r from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
                  Wardenclyffe Console
                </h1>
                <span className="px-1.5 py-0.5 rounded bg-violet-950/50 border border-violet-800/40 text-[9px] text-violet-400 font-mono">
                  v2.2.0-edge
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                AI-Native Agentic Framework with Persistent Sandboxes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* View Mode Switcher */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-full p-1 flex items-center gap-1">
              <button
                onClick={() => setIsDevMode(false)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition ${!isDevMode ? 'bg-indigo-650 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200'}`}
              >
                Operator Mode
              </button>
              <button
                onClick={() => setIsDevMode(true)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition flex items-center gap-1 ${isDevMode ? 'bg-violet-650 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200'}`}
              >
                Developer Mode
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-neutral-400 border-l border-neutral-800 pl-6">
              <div className="flex items-center gap-1.5 font-sans">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>LatAm Dev</span>
              </div>
              <div className="flex items-center gap-1.5 font-sans">
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                <span>Vercel Edge</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        
        {/* Banner Alert */}
        <div className="bg-gradient-to-r from-violet-950/15 via-indigo-950/15 to-neutral-950/20 border border-violet-900/30 rounded-2xl p-4 flex gap-3.5 items-start">
          <div className="p-2 bg-violet-900/20 border border-violet-800/30 rounded-lg text-violet-400">
            <Info className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-neutral-200">
              {isDevMode ? "Developer Mode Active" : "Operator Mode Active"}
            </h4>
            <p className="text-[11px] text-neutral-400 leading-normal">
              {isDevMode 
                ? "Showing full developer outputs, JSON-RPC 2.0 trace payloads, active database forks, and episodic memory segment maps."
                : "A polished dashboard simulating Jack Dorsey's 'Hierarchy to Intelligence' ecosystem. Run weekly milestone checks or generate investor reports with no verbose logs."}
            </p>
          </div>
        </div>

        {!isDevMode ? (
          /* OPERATOR MODE INTERFACE */
          <div className="space-y-6">
            <OperatorConsole
              onRunAction={handleRunOperatorAction}
              isRunning={isRunning}
              activeResult={activeReport}
            />
            <BootcampPanel initialData={bootcampData} />
          </div>
        ) : (
          /* DEVELOPER MODE INTERFACE */
          <div className="space-y-6">
            {/* Console Core */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-4 flex flex-col">
                <ControlPanel onRunDirective={handleRunDirective} isRunning={isRunning} />
              </div>
              <div className="lg:col-span-8 flex flex-col">
                <TraceViewer steps={steps} plan={plan} isRunning={isRunning} />
              </div>
            </div>

            {/* AI Bootcamp Panel */}
            <BootcampPanel initialData={bootcampData} />

            {/* LatAm & MCP Toolsets */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LatAmToolboxPanel onRunTemplate={handleRunDirective} isRunning={isRunning} />
              <McpSkillsPanel loadedSkills={loadedSkills} mcpUrl="/api/mcp" />
            </div>

            {/* Sub-layers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MemoryPanel
                memorySegments={memorySegments}
                onRefresh={loadSystemState}
                isLoading={isRunning}
              />
              <SandboxDBPanel
                forks={activeForks}
                onRefresh={loadSystemState}
                isLoading={isRunning}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500 font-mono">
        Wardenclyffe is open-source under the MIT License • Built for Platanus Build Night 2026
      </footer>
    </main>
  );
}
