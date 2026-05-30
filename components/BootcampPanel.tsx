'use client';

import React from 'react';
import { Capability, CompanyWorldModel, StudentWorldModel, ComposedSolution } from '@/lib/bootcamp';
import { Layers, Activity, Brain, Monitor, Cpu, Sparkles, ChevronRight } from 'lucide-react';

interface BootcampPanelProps {
  initialData: {
    capabilities: Capability[];
    companyModel: CompanyWorldModel;
    studentModels: StudentWorldModel[];
    compositions: ComposedSolution[];
  };
}

export const BootcampPanel: React.FC<BootcampPanelProps> = ({ initialData }) => {
  const [data, setData] = React.useState(initialData);
  const [loadingMap, setLoadingMap] = React.useState<Record<string, boolean>>({});

  const handleAction = async (studentId: string, eventType: 'stuck_debugging' | 'complete_project' | 'gpu_surge') => {
    const key = `${studentId}-${eventType}`;
    setLoadingMap(prev => ({ ...prev, [key]: true }));

    try {
      const res = await fetch('/api/bootcamp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, eventType })
      });
      const result = await res.json();
      if (result.success) {
        setData(result.updatedState);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMap(prev => ({ ...prev, [key]: false }));
    }
  };

  const getStatusColor = (status: StudentWorldModel['status']) => {
    switch (status) {
      case 'excelling': return 'text-emerald-400 bg-emerald-950/40 border-emerald-900/50';
      case 'stuck': return 'text-rose-400 bg-rose-950/40 border-rose-900/50';
      case 'graduated': return 'text-violet-400 bg-violet-950/40 border-violet-800/50';
      default: return 'text-sky-400 bg-sky-950/40 border-sky-900/50';
    }
  };

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 backdrop-blur-md space-y-8">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl text-white">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-100">AI Club Condesa Ecosystem</h2>
            <p className="text-xs text-neutral-400">Jack Dorsey's "Hierarchy to Intelligence" corporate model</p>
          </div>
        </div>
        <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest bg-neutral-950 border border-neutral-850 px-3 py-1 rounded-full">
          Four Pillars Active
        </div>
      </div>

      {/* Grid of 4 Pillars */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Pillar 1: Capabilities (Primitives) */}
        <div className="border border-neutral-800/60 rounded-2xl bg-neutral-950/40 p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            1. Primitives & Capabilities
          </div>
          <div className="space-y-3">
            {data.capabilities.map((cap) => (
              <div key={cap.id} className="bg-neutral-950 border border-neutral-850 rounded-xl p-3 flex justify-between items-center gap-4">
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-neutral-200 truncate">{cap.name}</div>
                  <div className="text-[10px] text-neutral-400 truncate leading-relaxed">{cap.description}</div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[9px] font-mono font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-1.5 py-0.5 rounded">
                    {cap.reliability}
                  </span>
                  <div className="text-[8px] text-neutral-500 mt-1 uppercase tracking-wider font-mono">Reliability</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar 2: World Models (Company & Student) */}
        <div className="border border-neutral-800/60 rounded-2xl bg-neutral-950/40 p-5 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Activity className="w-4 h-4" />
              2. World Models (Company & Customer)
            </div>
            
            {/* Company Model Snapshot */}
            <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 space-y-3">
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold font-mono">
                {data.companyModel.cohortName}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-neutral-900 rounded-lg">
                  <div className="text-xs font-bold font-mono text-neutral-200">
                    {data.companyModel.totalStudents}
                  </div>
                  <div className="text-[8px] text-neutral-500 uppercase">Students</div>
                </div>
                <div className="p-2 bg-neutral-900 rounded-lg">
                  <div className="text-xs font-bold font-mono text-neutral-200">
                    {data.companyModel.graduationRate}%
                  </div>
                  <div className="text-[8px] text-neutral-500 uppercase">Grad Rate</div>
                </div>
                <div className="p-2 bg-neutral-900 rounded-lg">
                  <div className="text-xs font-bold font-mono text-neutral-200">
                    {data.companyModel.totalGpuHoursUsed}/{data.companyModel.gpuLimitHours}h
                  </div>
                  <div className="text-[8px] text-neutral-500 uppercase">GPU hours</div>
                </div>
              </div>
            </div>

            {/* Student World Model Actions */}
            <div className="space-y-2.5">
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold font-mono">
                Student Signal Channels (Trigger Simulations)
              </div>
              {data.studentModels.map((student) => (
                <div key={student.id} className="bg-neutral-950 border border-neutral-850 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-neutral-200">{student.name}</span>
                      <span className={`text-[8px] font-semibold border px-1.5 py-0.25 rounded uppercase ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </div>
                    <div className="text-[9px] text-neutral-400 font-mono truncate max-w-[200px] mt-0.5">
                      {student.currentProject}
                    </div>
                  </div>
                  
                  {/* Actions buttons */}
                  <div className="flex gap-1.5 shrink-0">
                    {student.status === 'stuck' ? (
                      <button
                        onClick={() => handleAction(student.id, 'gpu_surge')}
                        disabled={loadingMap[`${student.id}-gpu_surge`]}
                        className="px-2 py-1 text-[9px] font-semibold bg-amber-600 hover:bg-amber-500 text-white rounded transition"
                      >
                        Surge GPU
                      </button>
                    ) : student.status === 'graduated' ? (
                      <span className="text-[9px] text-neutral-500 font-mono">Credentials Mints</span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleAction(student.id, 'stuck_debugging')}
                          disabled={loadingMap[`${student.id}-stuck_debugging`]}
                          className="px-2 py-1 text-[9px] font-semibold bg-rose-600/90 hover:bg-rose-500 text-white rounded transition"
                        >
                          Trigger CUDA Leak
                        </button>
                        <button
                          onClick={() => handleAction(student.id, 'complete_project')}
                          disabled={loadingMap[`${student.id}-complete_project`]}
                          className="px-2 py-1 text-[9px] font-semibold bg-emerald-600/90 hover:bg-emerald-500 text-white rounded transition"
                        >
                          Submit Project
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pillar 3: Intelligence Layer (Compositions) */}
        <div className="border border-neutral-800/60 rounded-2xl bg-neutral-950/40 p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-violet-400 uppercase tracking-wider">
            <Brain className="w-4 h-4" />
            3. Intelligence Composition Layer
          </div>
          <div className="space-y-3 max-h-[310px] overflow-y-auto pr-1">
            {data.compositions.map((comp) => (
              <div key={comp.id} className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 space-y-3 transition hover:border-violet-900/50">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold text-violet-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    SOLUTION COMPOSED
                  </span>
                  <span className="text-[9px] font-mono text-neutral-500">
                    {new Date(comp.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                
                <p className="text-xs text-neutral-300 font-mono leading-normal">
                  <span className="text-neutral-500">Event:</span> {comp.triggerEvent}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {comp.composedCapabilities.map((cap, i) => (
                    <span key={i} className="text-[8px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">
                      {cap}
                    </span>
                  ))}
                </div>

                <div className="text-[10px] bg-neutral-900 p-2 rounded-lg text-neutral-400 border border-neutral-850 font-mono">
                  <span className="text-violet-400">Action:</span> {comp.actionTaken}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar 4: Interfaces (Surfaces) */}
        <div className="border border-neutral-800/60 rounded-2xl bg-neutral-950/40 p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <Monitor className="w-4 h-4" />
              4. Interfaces (Delivery Surfaces)
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-mono">
              The intelligence layer is decoupled from standard user interface roadmaps. Instead, it dynamically relays composed actions to respective edge targets:
            </p>
            <div className="space-y-3">
              <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-3 flex justify-between items-center">
                <div>
                  <div className="text-xs font-semibold text-neutral-200">Student Console API</div>
                  <div className="text-[9px] text-neutral-500 font-mono">https://ai-club-condesa.vercel.app/console</div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-600" />
              </div>
              <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-3 flex justify-between items-center">
                <div>
                  <div className="text-xs font-semibold text-neutral-200">Slack Notification Hook</div>
                  <div className="text-[9px] text-neutral-500 font-mono">Surfaces tutor and GPU allocations</div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-600" />
              </div>
              <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-3 flex justify-between items-center">
                <div>
                  <div className="text-xs font-semibold text-neutral-200">Discord Mentor Bot</div>
                  <div className="text-[9px] text-neutral-500 font-mono">Triggers peer mentoring alerts on channel failures</div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-600" />
              </div>
            </div>
          </div>
          
          <div className="text-[10px] text-neutral-500 font-mono text-center pt-2">
            Value is locked inside the World Model & Primitives. Delivery surfaces act as lean routing shells.
          </div>
        </div>

      </div>
    </div>
  );
};
