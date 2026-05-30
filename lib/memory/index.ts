import { MemorySegment } from '@/types';

// In-memory simulation of memory.build API client
class MemoryBuildClient {
  private memoryStore: MemorySegment[] = [
    {
      id: "mem_1",
      key: "company_mission",
      value: "Deliver next-gen open-source agentic operations to LatAm SMBs.",
      type: "semantic",
      syncedAt: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      id: "mem_2",
      key: "primary_database_schema",
      value: "Tables: users (id, email), tenants (id, name, plan), billing (id, tenant_id, amount_cents)",
      type: "semantic",
      syncedAt: new Date(Date.now() - 3600000 * 12).toISOString()
    }
  ];

  async retrieveContext(query: string): Promise<MemorySegment[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Filter segments based on keyword match
    const keywords = query.toLowerCase().split(/\s+/);
    return this.memoryStore.filter(segment => 
      keywords.some(kw => 
        segment.key.toLowerCase().includes(kw) || 
        segment.value.toLowerCase().includes(kw)
      )
    );
  }

  async syncSegment(key: string, value: string, type: 'episodic' | 'working' = 'working'): Promise<MemorySegment> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newSegment: MemorySegment = {
      id: `mem_${Math.random().toString(36).substr(2, 9)}`,
      key,
      value,
      type,
      syncedAt: new Date().toISOString()
    };
    
    this.memoryStore.unshift(newSegment);
    return newSegment;
  }

  async getFullHistory(): Promise<MemorySegment[]> {
    return this.memoryStore;
  }
}

export const memoryClient = new MemoryBuildClient();
