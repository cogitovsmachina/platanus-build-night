# Enrique Diaz Solano — Platanus Build Night — Ciudad de México Project

**Current project logo:** project-logo.png

<img src="./project-logo.png" alt="Project Logo" width="200" />

Hacker:
- Enrique Diaz Solano ([@cogitovsmachina](https://github.com/cogitovsmachina))

---

# Wardenclyffe: Design Document

## 1. Overview & Vision
Wardenclyffe is an open-source, AI-native agentic framework serving as the operating system for small and medium-sized businesses (SMBs) in Latin America.

By leveraging powerful open-weight AI models, Wardenclyffe transforms standard business operations into an intelligent, self-regulating "Closed Loop." The framework is built natively on a Next.js / TypeScript stack optimized for Vercel deployment, ensuring that operators get enterprise-grade performance, serverless scaling, and an intuitive frontend out of the box.

**Core Mission:** Make deploying an AI-native company architecture as simple as clicking "Deploy to Vercel."

## 2. Core Philosophy
Wardenclyffe synthesizes frontier AI engineering into four pillars:

- **Mental Prototyping (Nikola Tesla):** The system designs and validates execution plans in a strict "mental model" before execution.
- **Hierarchical Pattern Recognition (Ray Kurzweil):** High-level goals are decomposed into recognizable patterns that specialized agents can execute.
- **Agent Harness Engineering (Addy Osmani):** Agents are bound by strict, deterministic Next.js API routes. Success is silent; failures automatically loop back to the model.
- **Persistent Institutional Memory:** Utilizing modern memory architecture so the intelligence layer continuously learns from daily operations without collapsing context windows.

## 3. System Architecture
The framework follows the **"Hecatoncheires"** architecture: a unified React-based "Mind" (Frontend/Orchestration) coordinating sandboxed "Hands" (Backend Agents) connected to dynamic databases.

### A. The Meta-Framework Layer (Vercel + Next.js)
- **TypeScript Foundation:** The entire framework is strictly typed, ensuring reliable data contracts between the frontend dashboards, the orchestrator, and the backend agents.
- **Serverless Orchestration (Next.js App Router):** The Planning Agent and Router live in edge-optimized Next.js API routes. When an SMB owner inputs a directive via the frontend, the Route Handlers act as the "Mind," writing a strict JSON specification and delegating it to specialized execution pods.
- **Vercel AI SDK Integration:** Wardenclyffe utilizes the Vercel AI SDK to stream agent reasoning back to the user interface in real-time, providing transparency into the closed loop.

### B. The Memory Layer (memory.build)
Institutional amnesia kills startups. Wardenclyffe delegates the heavy lifting of context management to `memory.build`.
- **Working & Episodic Memory:** Instead of manually managing vector embeddings and chunking, `memory.build` acts as the persistent contextual layer.
- **State Across Sessions:** As agents process PRs, Slack messages, or customer support emails, the context is extracted and synced. When a new session starts, Wardenclyffe fetches the exact necessary context from `memory.build` to inject into the prompt, ensuring the open-source models stay within their optimal token limits while "remembering" past company decisions.

### C. The Execution & Database Layer (Ghost.build)
Traditional managed databases are too rigid for autonomous agents. Wardenclyffe utilizes Ghost (`ghost.build`) as its agent-first database backend.
- **Disposable Sandboxes:** When an execution agent (the "Hand") needs to test a feature, run a data migration, or analyze sales metrics, it spins up a disposable, on-demand PostgreSQL instance via Ghost.
- **MCP Integration:** Ghost's native Model Context Protocol (MCP) server allows Wardenclyffe's agents to directly fork, inspect, query, and manipulate databases without relying on manual connection strings or hallucinated schema guesses.
- **Deterministic Evaluation:** Agents run their SQL or schema changes against the Ghost fork. If tests pass, the changes are routed back to the orchestrator for merge approval.

## 4. LatAm Optimization: Token Maxing
To reduce overhead for LatAm SMBs, Wardenclyffe is optimized for local or affordable cloud compute.
- **Open-Weight Focus:** The orchestration layer seamlessly interfaces with Ollama or vLLM to run Llama 3 or Mistral.
- **Cost-Efficient Serverless:** By relying on Vercel's serverless edge and Ghost's highly efficient fork-and-discard DB architecture, an SMB only pays for the exact compute used during active agent execution.

## 5. Directory Structure
```plaintext
wardenclyffe/
├── app/                     # Next.js App Router (Frontend Dashboards & API Routes)
│   ├── api/                 # Serverless endpoints for agent communication
│   └── dashboard/           # Real-time visualization of the Closed Loop
├── lib/
│   ├── wardenclyffe.ts      # Core orchestration and routing logic
│   ├── memory.ts            # Integration with memory.build API
│   └── db.ts                # Integration with ghost.build (MCP server hooks)
├── agents/                  # Specialized TypeScript execution agents
│   ├── PlanningAgent.ts
│   ├── DataAgent.ts         # Agent equipped with Ghost DB access
│   └── Harness.ts           # Addy Osmani deterministic evaluation loops
├── wardenclyffe.config.ts   # Core company truths, boundaries, and tool registries
├── package.json
└── tsconfig.json
```

---
