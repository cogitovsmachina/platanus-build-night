'use client';

import React from 'react';
import { DatabaseFork } from '@/types';
import { Database, Terminal, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ghostClient } from '@/lib/ghost';

interface SandboxDBPanelProps {
  forks: DatabaseFork[];
  onRefresh: () => void;
  isLoading: boolean;
}

export const SandboxDBPanel: React.FC<SandboxDBPanelProps> = ({ forks, onRefresh, isLoading }) => {
  const [activeForkId, setActiveForkId] = React.useState<string>('');
  const [sqlQuery, setSqlQuery] = React.useState('SELECT * FROM users;');
  const [queryResult, setQueryResult] = React.useState<any>(null);
  const [queryLoading, setQueryLoading] = React.useState(false);
  const [queryError, setQueryError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (forks.length > 0 && !activeForkId) {
      setActiveForkId(forks[0].id);
    }
  }, [forks, activeForkId]);

  const handleRunQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeForkId || !sqlQuery.trim()) return;

    setQueryLoading(true);
    setQueryError(null);
    setQueryResult(null);

    try {
      const res = await ghostClient.executeQuery(activeForkId, sqlQuery);
      if (res.success) {
        setQueryResult(res);
      } else {
        setQueryError(res.error || 'Failed to execute query');
      }
    } catch (err: any) {
      setQueryError(err.message || 'An error occurred');
    } finally {
      setQueryLoading(false);
      onRefresh();
    }
  };

  const handlePromoteFork = async (forkId: string) => {
    if (confirm('Are you sure you want to promote this sandbox fork to production?')) {
      await ghostClient.promoteFork(forkId);
      onRefresh();
    }
  };

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-950/50 border border-amber-800/50 rounded-lg text-amber-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-neutral-100">Database Sandboxing</h2>
            <p className="text-xs text-neutral-400">ghost.build disposable forks & MCP tools</p>
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

      <div className="space-y-6 flex-1 flex flex-col justify-between">
        {/* Forks listing */}
        <div>
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
            Active Postgres Forks
          </h3>
          {forks.length === 0 ? (
            <div className="h-16 flex items-center justify-center border border-dashed border-neutral-850 rounded-xl">
              <span className="text-xs text-neutral-500 font-mono">No active database sandboxes.</span>
            </div>
          ) : (
            <div className="space-y-3">
              {forks.map((fork) => (
                <div key={fork.id} className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-neutral-200 font-mono">{fork.id}</span>
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-mono border text-amber-400 bg-amber-950/30 border-amber-900/40 uppercase">
                        {fork.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-400">
                      Forked from: <span className="font-mono text-neutral-300">{fork.forkedFrom}</span> • Queries run: <span className="font-mono text-neutral-300">{fork.queriesRun}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePromoteFork(fork.id)}
                      className="px-2.5 py-1 text-[10px] font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded transition"
                    >
                      Promote to Prod
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sandbox Query Runner */}
        {forks.length > 0 && (
          <div className="border border-neutral-800 rounded-xl bg-neutral-950 p-4 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              SQL Sandbox Explorer
            </div>

            <form onSubmit={handleRunQuery} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  placeholder="Enter SQL (e.g. SELECT * FROM users;)"
                  className="flex-1 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-300 font-mono focus:outline-none focus:border-amber-600"
                />
                <button
                  type="submit"
                  disabled={queryLoading || !activeForkId}
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded text-xs transition disabled:opacity-50"
                >
                  {queryLoading ? 'Running...' : 'Execute'}
                </button>
              </div>
            </form>

            {queryError && (
              <div className="p-3 bg-red-950/30 border border-red-900/40 rounded-lg flex gap-2.5 items-start">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span className="text-[11px] text-red-300 font-mono leading-normal">
                  {queryError}
                </span>
              </div>
            )}

            {queryResult && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Query executed successfully ({queryResult.rowsAffected} rows affected)
                </div>
                {queryResult.result && (
                  <pre className="p-3 bg-neutral-900 border border-neutral-850 rounded-lg text-[10px] text-neutral-300 font-mono overflow-x-auto max-h-[120px]">
                    {JSON.stringify(queryResult.result, null, 2)}
                  </pre>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
