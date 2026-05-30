'use client';

import React from 'react';
import { AgentStep, MentalPlan } from '@/types';
import { Shield, CheckCircle, Hourglass, HelpCircle, Activity, Cpu } from 'lucide-react';

interface TraceViewerProps {
  steps: AgentStep[];
  plan: MentalPlan | null;
  isRunning: boolean;
}

export const TraceViewer: React.FC<TraceViewerProps> = ({ steps, plan, isRunning }) => {
  const getAgentColor = (name: string) => {
    switch (name) {
      case 'Router': return 'text-sky-400 bg-sky-950/40 border-sky-800/40';
      case 'PlanningAgent': return 'text-violet-400 bg-violet-950/40 border-violet-800/40';
      case 'DataAgent': return 'text-amber-400 bg-amber-950/40 border-amber-800/40';
      case 'Harness': return 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40';
      default: return 'text-neutral-400 bg-neutral-950 border-neutral-800';
    }
  };

  const getStatusIcon = (status: AgentStep['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-400 fill-emerald-950/40" />;
      case 'failed':
        return <Activity className="w-4 h-4 text-rose-400" />;
      case 'running':
        return <div className="w-4 h-4 border-2 border-violet-500/30 border-t-violet-400 rounded-full animate-spin" />;
      default:
        return <Hourglass className="w-4 h-4 text-neutral-500" />;
    }
  };

  const totalTokensUsed = steps.reduce((sum, s) => sum + (s.tokenCost || 0), 0);

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-950/50 border border-emerald-800/50 rounded-lg text-emerald-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-neutral-100">Hecatoncheires Trace Viewer</h2>
            <p className="text-xs text-neutral-400">Real-time reasoning steps and streaming tokens</p>
          </div>
        </div>
        
        {totalTokensUsed > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-violet-950/30 border border-violet-900/50 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-[11px] font-mono font-medium text-violet-300">
              {totalTokensUsed.toLocaleString()} tokens
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto pr-1 max-h-[500px]">
        {/* Planning Prototyping Section */}
        {plan && (
          <div className="bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-violet-400 text-xs font-semibold uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              Nikola Tesla Mental Spec
            </div>
            <div className="text-xs text-neutral-300 bg-neutral-900 p-2.5 rounded-lg border border-neutral-800/50 font-mono">
              <div className="text-violet-400 mb-1">target_state:</div>
              {plan.targetStateSpec}
            </div>
            <div className="space-y-2">
              {plan.steps.map((pStep, index) => (
                <div key={pStep.id} className="flex items-start gap-2.5 text-[11px] text-neutral-400">
                  <span className="bg-neutral-850 px-1.5 py-0.5 rounded text-neutral-300 font-mono text-[9px]">
                    Step {index + 1}
                  </span>
                  <div className="flex-1">
                    <span className="text-neutral-200 font-medium">{pStep.description}</span>
                    <div className="text-[10px] text-neutral-500 mt-0.5">
                      <span className="text-violet-400/80">validation_criteria:</span> {pStep.validationCriteria}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Steps trace */}
        <div className="space-y-4">
          {steps.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-center p-4">
              <HelpCircle className="w-10 h-10 text-neutral-700 mb-2" />
              <p className="text-sm text-neutral-500">No active process traces</p>
              <p className="text-xs text-neutral-600 mt-1">Initiate a directive to watch the closed loop</p>
            </div>
          ) : (
            steps.map((step) => (
              <div key={step.id} className="border border-neutral-800/60 rounded-xl bg-neutral-950/40 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getAgentColor(step.agentName)}`}>
                      {step.agentName}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {new Date(step.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {step.tokenCost && (
                      <span className="text-[9px] font-mono text-neutral-500">
                        cost: {step.tokenCost} tokens
                      </span>
                    )}
                    {getStatusIcon(step.status)}
                  </div>
                </div>

                <p className="text-xs text-neutral-200 leading-relaxed font-medium">
                  {step.message}
                </p>

                {step.reasoning && (
                  <div className="text-[10px] text-neutral-400 bg-neutral-950 p-2.5 rounded-lg border border-neutral-850 font-mono leading-normal">
                    <div className="text-[9px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                      Reasoning Trace:
                    </div>
                    {step.reasoning}
                  </div>
                )}

                {step.outputData && (
                  <div className="text-[10px] text-amber-400/90 bg-neutral-950 p-2.5 rounded-lg border border-neutral-850 font-mono overflow-x-auto">
                    <div className="text-[9px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                      Data Payload:
                    </div>
                    <pre>{JSON.stringify(step.outputData, null, 2)}</pre>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
