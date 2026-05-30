import { DatabaseFork } from '@/types';

class GhostBuildClient {
  private forks: DatabaseFork[] = [
    {
      id: "fork_main_prod_default",
      status: "active",
      forkedFrom: "production_main",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      queriesRun: 12
    }
  ];

  async createFork(sourceDb: string = "production_main"): Promise<DatabaseFork> {
    await new Promise(resolve => setTimeout(resolve, 600)); // DB provisioning takes time
    
    const newFork: DatabaseFork = {
      id: `fork_${Math.random().toString(36).substr(2, 9)}`,
      status: "active",
      forkedFrom: sourceDb,
      createdAt: new Date().toISOString(),
      queriesRun: 0
    };
    
    this.forks.push(newFork);
    return newFork;
  }

  async executeQuery(forkId: string, sql: string): Promise<{ success: boolean; rowsAffected: number; result?: any; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const fork = this.forks.find(f => f.id === forkId);
    if (!fork || fork.status !== 'active') {
      return { success: false, rowsAffected: 0, error: `Fork ${forkId} is not active or does not exist.` };
    }
    
    fork.queriesRun += 1;

    // Basic SQL validation simulation
    const normalizedSql = sql.toLowerCase().trim();
    
    if (normalizedSql.includes('syntax error') || normalizedSql.includes('invalid column')) {
      return {
        success: false,
        rowsAffected: 0,
        error: `PostgreSQL Syntax Error: column "unrecognized_column" does not exist in relation "users"`
      };
    }
    
    if (normalizedSql.startsWith('select')) {
      return {
        success: true,
        rowsAffected: 3,
        result: [
          { id: 1, email: "ceo@latamsmb.co", tenant_id: 101 },
          { id: 2, email: "ops@latamsmb.co", tenant_id: 101 },
          { id: 3, email: "support@latamsmb.co", tenant_id: 102 }
        ]
      };
    }
    
    return {
      success: true,
      rowsAffected: 1,
      result: { message: "Command executed successfully" }
    };
  }

  async discardFork(forkId: string): Promise<boolean> {
    const fork = this.forks.find(f => f.id === forkId);
    if (fork) {
      fork.status = 'discarded';
      return true;
    }
    return false;
  }

  async promoteFork(forkId: string): Promise<boolean> {
    const fork = this.forks.find(f => f.id === forkId);
    if (fork) {
      fork.status = 'promoting';
      // Simulate migration applying to prod
      await new Promise(resolve => setTimeout(resolve, 800));
      fork.status = 'discarded'; // Discarded after merged
      return true;
    }
    return false;
  }

  async getActiveForks(): Promise<DatabaseFork[]> {
    return this.forks.filter(f => f.status === 'active');
  }
}

export const ghostClient = new GhostBuildClient();
