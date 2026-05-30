export interface AgentStep {
  id: string;
  agentName: 'PlanningAgent' | 'DataAgent' | 'Harness' | 'Router';
  status: 'pending' | 'running' | 'success' | 'failed';
  message: string;
  timestamp: string;
  tokenCost?: number;
  reasoning?: string;
  outputData?: any;
}

export interface MentalPlan {
  directive: string;
  targetStateSpec: string;
  steps: {
    id: string;
    description: string;
    dependencies: string[];
    validationCriteria: string;
  }[];
}

export interface MemorySegment {
  id: string;
  key: string;
  value: string;
  type: 'episodic' | 'working' | 'semantic';
  syncedAt: string;
}

export interface DatabaseFork {
  id: string;
  status: 'active' | 'promoting' | 'discarded';
  forkedFrom: string;
  createdAt: string;
  queriesRun: number;
}
