'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, ShieldCheck, Zap, Database, GitPullRequest, HelpCircle, Check, Sparkles, MessageSquare, Terminal } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans selection:bg-violet-900/40 selection:text-white">
      {/* Header */}
      <header className="border-b border-neutral-900 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-900/30">
              <span className="font-mono font-bold text-base text-white">W</span>
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
              Wardenclyffe
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-400 font-medium">
            <a href="#features" className="hover:text-neutral-100 transition">Features</a>
            <a href="#organization" className="hover:text-neutral-100 transition">Agent Org</a>
            <a href="#sandbox" className="hover:text-neutral-100 transition">Sandboxing</a>
            <a href="#pricing" className="hover:text-neutral-100 transition">Pricing</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-xs font-semibold bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-xl transition text-neutral-200"
            >
              Log In
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-xs font-semibold bg-gradient-to-r from-violet-650 to-indigo-650 hover:from-violet-600 hover:to-indigo-600 text-white rounded-xl transition shadow-lg shadow-violet-900/20 flex items-center gap-1 group"
            >
              Enter Console
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 border-b border-neutral-900">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-900/50 bg-violet-950/20 text-[10px] text-violet-400 font-mono tracking-wide uppercase">
            <Sparkles className="w-3 h-3 text-violet-400 animate-pulse" />
            The AI-Native OS for LatAm Companies
          </div>
          
          <h1 className="text-5xl sm:text-8xl lg:text-[110px] font-extrabold tracking-tight text-white leading-[1.05] max-w-5xl mx-auto">
            The Agentic framework that makes your company autonomous
          </h1>
          
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed font-mono">
            Wardenclyffe stacks autonomous agents, persistent episodic memory, and isolated database sandboxes to automate 50% of your Latin American SMB operations.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold bg-white hover:bg-neutral-100 text-black rounded-xl transition flex items-center justify-center gap-1.5 shadow-xl shadow-white/5"
            >
              Try for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 rounded-xl transition text-neutral-200"
            >
              Launch Operator View
            </Link>
          </div>

          <div className="text-[10px] text-neutral-500 font-mono flex items-center justify-center gap-4 pt-1">
            <span>No credit card required</span>
            <span>•</span>
            <span>Deployable in one click to Vercel</span>
          </div>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="max-w-5xl mx-auto px-6 mt-16 md:mt-24">
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-3.5 backdrop-blur-md shadow-2xl shadow-violet-950/20 relative">
            <div className="flex items-center gap-1.5 border-b border-neutral-800 pb-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[10px] text-neutral-500 font-mono ml-2">wardenclyffe-operator-console // active</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: Operations summary */}
              <div className="bg-neutral-950/80 border border-neutral-850 rounded-xl p-4 space-y-3 font-mono">
                <div className="text-[9px] uppercase tracking-wider text-violet-400 font-bold">
                  Weekly Briefing
                </div>
                <div className="text-[11px] text-neutral-300 leading-normal space-y-1">
                  <div>· Revenue: <span className="text-emerald-400">$64,000 USD</span></div>
                  <div>· Compute Load: <span className="text-neutral-400">424h GPU (42.4%)</span></div>
                  <div>· Invoicing: <span className="text-emerald-450">CFDI 4.0 SAT Validated</span></div>
                </div>
              </div>

              {/* Box 2: Autonomous Composition */}
              <div className="bg-neutral-950/80 border border-neutral-850 rounded-xl p-4 space-y-2.5 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider text-violet-400 font-bold">
                    Autonomic Layer
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-[10px] text-neutral-450">
                  Composed solution for Sofia Valenzuela stuck on CUDA:
                </div>
                <div className="text-[9px] bg-neutral-900 border border-neutral-800 p-1.5 rounded text-neutral-400 truncate">
                  Compute + Code Sandbox + Memory Search
                </div>
              </div>

              {/* Box 3: Live Channels */}
              <div className="bg-neutral-950/80 border border-neutral-850 rounded-xl p-4 space-y-2 font-mono">
                <div className="text-[9px] uppercase tracking-wider text-violet-400 font-bold">
                  Delivery Interfaces
                </div>
                <div className="space-y-1 text-[10px] text-neutral-405">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400">#</span> slack-notification-channel
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-violet-400">#</span> discord-mentor-alerts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: An entire org working for you */}
      <section id="organization" className="py-20 max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-neutral-100">An entire org working for you</h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            Deploy specialized agent clusters structured into dedicated functional layers, running 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Growth */}
          <div className="bg-neutral-950 border border-neutral-850 p-6 rounded-2xl space-y-4">
            <div className="p-2.5 bg-violet-950/50 border border-violet-900/30 text-violet-400 rounded-xl w-fit">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-100">Growth Agents</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-mono">
              Composes copywriters, social media managers, and ad budget allocators. They monitor market trends and target LatAm audiences natively in Spanish and Portuguese.
            </p>
            <div className="space-y-2 border-t border-neutral-900 pt-4">
              <div className="flex items-center gap-2 text-[11px] text-neutral-300 font-mono">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Copywriter & SEO Builder
              </div>
              <div className="flex items-center gap-2 text-[11px] text-neutral-300 font-mono">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Social Outreach Agent
              </div>
            </div>
          </div>

          {/* Card 2: Engineering */}
          <div className="bg-neutral-950 border border-neutral-850 p-6 rounded-2xl space-y-4">
            <div className="p-2.5 bg-indigo-950/50 border border-indigo-900/30 text-indigo-400 rounded-xl w-fit">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-100">Engineering Agents</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-mono">
              Launches temporary PostgreSQL sandbox databases using ghost.build, compiles code syntax, and executes tests with zero manual infrastructure overhead.
            </p>
            <div className="space-y-2 border-t border-neutral-900 pt-4">
              <div className="flex items-center gap-2 text-[11px] text-neutral-300 font-mono">
                <Check className="w-3.5 h-3.5 text-indigo-400" /> Sandbox Database Provisioner
              </div>
              <div className="flex items-center gap-2 text-[11px] text-neutral-300 font-mono">
                <Check className="w-3.5 h-3.5 text-indigo-400" /> Automated QA Harness
              </div>
            </div>
          </div>

          {/* Card 3: Operations */}
          <div className="bg-neutral-950 border border-neutral-850 p-6 rounded-2xl space-y-4">
            <div className="p-2.5 bg-emerald-950/50 border border-emerald-900/30 text-emerald-400 rounded-xl w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-100">Operations & Tax</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-mono">
              Ensures compliance with Mexico's SAT (CFDI 4.0 invoicing) and Chile's SII (DTE tax documents). Automates regional payroll and ledger auditing.
            </p>
            <div className="space-y-2 border-t border-neutral-900 pt-4">
              <div className="flex items-center gap-2 text-[11px] text-neutral-300 font-mono">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> CFDI 4.0 Invoicing Validator
              </div>
              <div className="flex items-center gap-2 text-[11px] text-neutral-300 font-mono">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> SII Chile Tax Compiler
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Naturally works as you'd expect */}
      <section id="features" className="py-20 border-t border-neutral-900 bg-neutral-950/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Naturally works as you'd expect
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono leading-relaxed">
              Wardenclyffe comes loaded with the primitives needed to organize a company as an intelligence loop.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-xl text-violet-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-25">Markdown-Configured</h4>
                  <p className="text-xs text-neutral-450 font-mono leading-relaxed mt-1">
                    Define agent rules, behavior, and quality validation criteria in plain .md files (e.g. mental-prototype.md) that you control.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-xl text-violet-400">
                  <GitPullRequest className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-25">Context-Aware Memory</h4>
                  <p className="text-xs text-neutral-450 font-mono leading-relaxed mt-1">
                    Continuous cross-session history sync through memory.build vectors. Agents learn from past actions, templates, and executions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-xl text-violet-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-25">Isolated Sandboxes</h4>
                  <p className="text-xs text-neutral-450 font-mono leading-relaxed mt-1">
                    Every database execution takes place inside a disposable postgres sandbox fork provisioned dynamically via ghost.build.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-950 border border-neutral-850 rounded-3xl p-6 space-y-6">
            <h3 className="text-sm font-bold text-neutral-200 flex items-center gap-1.5 uppercase font-mono">
              <MessageSquare className="w-4 h-4 text-violet-400" />
              Slack/Discord Active Logs
            </h3>
            <div className="bg-black border border-neutral-900 rounded-xl p-4 font-mono text-[11px] leading-relaxed space-y-4 text-neutral-400">
              <div>
                <span className="text-violet-400">08:00 AM</span> <span className="text-white font-bold">#briefing</span>
                <p className="text-neutral-300 mt-1 pl-4 border-l border-neutral-800">
                  Good morning. Here's Condesa AI Bootcamp status:
                  <br />• Students: 32 Active
                  <br />• Grade Avg: 86.9%
                  <br />• Compute: GPU quota optimized at 424h
                  <br />• Task: 1 stuck state detected on Sofia Valenzuela (CUDA out of memory). Auxiliary node composed.
                </p>
              </div>
              <div className="border-t border-neutral-900 pt-3">
                <span className="text-indigo-400">08:12 AM</span> <span className="text-neutral-500 font-bold">eng/sandbox</span>
                <p className="text-neutral-350 mt-1 pl-4">
                  Successfully ran validation testing. Mapped mx_cfdi_4_0 schema and synced logs to memory.build episodic layer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / CTA Section */}
      <section id="pricing" className="py-20 md:py-28 text-center relative overflow-hidden border-t border-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-2xl mx-auto px-6 space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Make your company autonomous
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono leading-relaxed">
            Onboard your AI cofounder now. Deploy in minutes to Vercel and secure your LatAm operations.
          </p>
          <div className="pt-4">
            <Link
              href="/dashboard"
              className="inline-flex px-8 py-4 text-sm font-semibold bg-white hover:bg-neutral-100 text-black rounded-xl transition items-center gap-1.5 shadow-xl shadow-white/5"
            >
              Try for free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="text-[10px] text-neutral-500 font-mono flex items-center justify-center gap-3">
            <span>No credit card required</span>
            <span>•</span>
            <span>$100 free sandbox credits</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-950 py-10 bg-black text-center text-xs text-neutral-500 font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>Wardenclyffe is open-source under the MIT License</span>
          <div className="flex gap-4">
            <a href="https://github.com/platanus-build-night/platanus-build-night-26-mx-cogitovsmachina" className="hover:text-neutral-350 transition">GitHub</a>
            <a href="https://vercel.com" className="hover:text-neutral-350 transition">Vercel</a>
            <Link href="/dashboard" className="hover:text-neutral-350 transition">Console</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
