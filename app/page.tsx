'use client';

import React from 'react';
import { ControlPanel } from '@/components/ControlPanel';
import { TraceViewer } from '@/components/TraceViewer';
import { MemoryPanel } from '@/components/MemoryPanel';
import { SandboxDBPanel } from '@/components/SandboxDBPanel';
import { McpSkillsPanel } from '@/components/McpSkillsPanel';
import { LatAmToolboxPanel } from '@/components/LatAmToolboxPanel';
import { BootcampPanel } from '@/components/BootcampPanel';
import { AgentStep, MentalPlan, MemorySegment, DatabaseFork } from '@/types';
import { memoryClient } from '@/lib/memory';
import { ghostClient } from '@/lib/ghost';
import { Info, Globe, HardDrive } from 'lucide-react';

interface LoadedSkill {
  name: string;
  source: string;
}

export default function Home() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [steps, setSteps] = React.useState<AgentStep[]>([]);
  const [plan, setPlan] = React.useState<MentalPlan | null>(null);
  const [memorySegments, setMemorySegments] = React.useState<MemorySegment[]>([]);
  const [activeForks, setActiveForks] = React.useState<DatabaseFork[]>([]);
  const [loadedSkills, setLoadedSkills] = React.useState<LoadedSkill[]>([]);
  
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
      <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                  v2.1.0-edge
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                AI-Native Agentic Framework with Persistent Sandboxes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>LatAm Optimized</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              <span>Vercel Edge Stack</span>
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
              Jack Dorsey "From Hierarchy to Intelligence" Integration
            </h4>
            <p className="text-[11px] text-neutral-400 leading-normal">
              Modeling the organizational primitives of the Condesa AI Bootcamp. The intelligence layer dynamically composes serverless compute, memory logs, credentials, and code sandboxes in response to student state metrics without manager mediation.
            </p>
          </div>
        </div>

        {/* Dashboard Grid - Row 1 (Console Core) */}
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

        {/* Dashboard Grid - Row 2 (LatAm & MCP Toolsets) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LatAmToolboxPanel onRunTemplate={handleRunDirective} isRunning={isRunning} />
          <McpSkillsPanel loadedSkills={loadedSkills} mcpUrl="/api/mcp" />
        </div>

        {/* Dashboard Grid - Row 3 (Sub-layers) */}
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

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500 font-mono">
        Wardenclyffe is open-source under the MIT License • Built for Platanus Build Night 2026
      </footer>
    </main>
  );
}
