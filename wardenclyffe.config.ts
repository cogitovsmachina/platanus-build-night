export const wardenclyffeConfig = {
  companyName: "Wardenclyffe SMB Operating System",
  region: "Latin America (LatAm)",
  version: "1.0.0",
  
  // Safety boundaries for autonomous agents
  safetyLimits: {
    maxTokenBudgetPerSession: 500000,
    maxDbForksPerDay: 50,
    humanInTheLoopTriggers: [
      "schema_change_production",
      "transaction_value_gt_500usd",
      "critical_system_override"
    ]
  },

  // Allowed tools registry for open-weight agents
  toolRegistry: [
    {
      name: "ghost_fork_db",
      description: "Creates an isolated, disposable PostgreSQL database fork via ghost.build",
      parameters: { type: "object", properties: { sourceDb: { type: "string" } } }
    },
    {
      name: "ghost_run_sql",
      description: "Executes a SQL query or migration script against a sandboxed Ghost fork",
      parameters: { type: "object", properties: { forkId: { type: "string" }, sql: { type: "string" } } }
    },
    {
      name: "memory_sync",
      description: "Persists working memory segments into memory.build episodic memory",
      parameters: { type: "object", properties: { key: { type: "string" }, value: { type: "string" } } }
    },
    {
      name: "memory_retrieve",
      description: "Retrieves contextually relevant episodic memory blocks from memory.build",
      parameters: { type: "object", properties: { query: { type: "string" } } }
    }
  ],

  // Institutional operational truths (core prompts and rules)
  operationalTruths: [
    "Verify all database schema updates in an ephemeral fork before proposing merges.",
    "Failures should trigger the deterministic self-correction loop in the harness.",
    "Strictly prioritize cost-efficient token-maxing for local LLM engines (Ollama/vLLM)."
  ]
};
