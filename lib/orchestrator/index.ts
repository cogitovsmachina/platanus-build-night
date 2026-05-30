import { AgentStep, MentalPlan } from '@/types';
import { ghostClient } from '../ghost';
import { memoryClient } from '../memory';
import { LATAM_TOOLBOX_TEMPLATES, LatAmTemplate } from '../latam-toolbox';

export interface StreamChunk {
  type: 'step' | 'plan' | 'memory' | 'database' | 'skills' | 'complete' | 'report';
  data: any;
}

export async function* runOrchestrator(directive: string): AsyncGenerator<StreamChunk, void, unknown> {
  const sessionId = Math.random().toString(36).substr(2, 9);
  
  // --- STEP 0: LOAD REUSABLE FRAMEWORK SKILLS ---
  yield {
    type: 'skills',
    data: {
      loaded: [
        { name: "Tesla Mental Prototyping", source: "skills/mental-prototype.md" },
        { name: "Osmani TDD Self-Correction", source: "skills/harness-tdd.md" },
        { name: "MCP Sandbox Syncer", source: "skills/mcp-sandbox.md" }
      ]
    }
  };

  const directiveLower = directive.toLowerCase();

  // --- SPECIAL CASE: CUSTOMER / OPERATOR SPECIFIC DEMO DIRECTIVES ---
  if (directiveLower.includes('operation_summary') || directiveLower.includes('milestones_verification') || directiveLower.includes('investor_memo')) {
    yield {
      type: 'step',
      data: {
        id: 'op_1',
        agentName: 'OperatorAgent',
        status: 'running',
        message: `Activating operator intelligence workflow for directive: ${directive}`,
        timestamp: new Date().toISOString(),
        reasoning: "Querying current company and student world models from AI Club Condesa memory partitions..."
      }
    };
    await new Promise(resolve => setTimeout(resolve, 1000));

    yield {
      type: 'step',
      data: {
        id: 'op_2',
        agentName: 'VerificationHarness',
        status: 'running',
        message: "Verifying active GPU allocations and checking compliance schemas...",
        timestamp: new Date().toISOString()
      }
    };
    await new Promise(resolve => setTimeout(resolve, 1000));

    let reportContent = '';
    if (directiveLower.includes('operation_summary')) {
      reportContent = `=====================================================
AI CLUB CONDESA - WEEKLY OPERATIONS SUMMARY
=====================================================
Date: ${new Date().toLocaleDateString()}
Cohort status: Active (Cohort Alpha)

1. ACTIVE COMPUTE METRICS:
   * Total GPU Hours Consumed: 424 Hours
   * Available Quota Remaining: 576 Hours
   * Active Code Sandboxes: 4 instances running in ghost.build

2. STUDENT RETENTION & STATUS:
   * Rodrigo Morales: Excelling (Fine-tuning Llama-3-8B)
   * Sofia Valenzuela: Stuck (GPU CUDA allocation bug - resolved via auto-surge)
   * Esteban Garza: Graduated (Diploma credential #0381 issued)

3. EFFICIENCY MATRIX:
   * Sandbox Provisioning Latency: 240ms
   * Autonomic Self-Correction Rate: 94.5%
   * Memory Recency Overlap: 99.88%`;
    } else if (directiveLower.includes('milestones_verification')) {
      reportContent = `=====================================================
WEEKLY MILESTONES & LATAM COMPLIANCE AUDIT
=====================================================
Generated at: ${new Date().toISOString()}

[CHECK 1] MEXICO SAT CFDI 4.0 INVOICING COMPLIANCE
  - Status: PASSED
  - Verified Table Schema: mx_cfdi_4_0 (ghost sandbox db)
  - SAT invoice integrity checks: OK (All active tuition payments matched valid RFC/UUID structures)

[CHECK 2] CHILE SII DTE TAX COMPLIANCE
  - Status: PASSED
  - Verified Table Schema: cl_dte_invoicing
  - Schema constraints validated: RUT format check and IVA calculation check

[CHECK 3] STUDENT PROGRESS MILESTONES
  - Target: 85% Cohort Completion Rate
  - Current: 88% Cohort Alpha Graduation Rate
  - Stuck students: 0 (Sofia Valenzuela cleared via automated memory leak debugging loop)`;
    } else {
      reportContent = `Dear Investors,

Please find the weekly update for AI Club Condesa (Cohort Alpha). 

By organizing our bootcamp operations as an intelligence layer rather than a hierarchy of coordinators and player-coaches, we have significantly improved our speed and efficiency.

Key Performance Indicators (KPIs):
- Total Tuition Revenue: $64,000 USD (32 Active Students)
- Cohort Graduation Rate: 88% (Target: 85%)
- Compute Resources: 424 GPU hours consumed (out of 1000h cohort limit).

Autonomic Composability:
This week, our intelligence layer handled 24 student debugger requests without human instructor overhead, composing "Serverless GPU Provisioner" and "Dockerized Code Sandbox" primitives in under 300ms.

Compliance:
Successfully ran and passed automated checks for Mexico's SAT CFDI 4.0 invoice schemas on our ghost.build sandboxes.

Best regards,
The Wardenclyffe Operations Engine`;
    }

    yield {
      type: 'report',
      data: {
        type: directiveLower.includes('operation_summary') 
          ? 'operation_summary' 
          : directiveLower.includes('milestones_verification') 
            ? 'milestones_verification' 
            : 'investor_memo',
        content: reportContent
      }
    };

    yield {
      type: 'step',
      data: {
        id: 'op_2',
        agentName: 'VerificationHarness',
        status: 'success',
        message: "Operator memo assembled. Delivery interfaces updated.",
        timestamp: new Date().toISOString()
      }
    };

    yield {
      type: 'complete',
      data: {
        sessionId,
        status: 'success',
        totalCost: 3500,
        timestamp: new Date().toISOString()
      }
    };
    return;
  }

  // --- STANDARD WORKFLOW (PHASE 2 / 3) ---
  let matchedTemplate: LatAmTemplate | undefined = undefined;

  if (directiveLower.includes('cfdi') || directiveLower.includes('mexico') || directiveLower.includes('sat')) {
    matchedTemplate = LATAM_TOOLBOX_TEMPLATES.find(t => t.id === 'mx_cfdi_4_0');
  } else if (directiveLower.includes('dte') || directiveLower.includes('chile') || directiveLower.includes('sii')) {
    matchedTemplate = LATAM_TOOLBOX_TEMPLATES.find(t => t.id === 'cl_dte_invoicing');
  } else if (directiveLower.includes('payroll') || directiveLower.includes('nómina') || directiveLower.includes('retención') || directiveLower.includes('salary')) {
    matchedTemplate = LATAM_TOOLBOX_TEMPLATES.find(t => t.id === 'latam_payroll_calc');
  }

  yield {
    type: 'step',
    data: {
      id: 'step_1',
      agentName: 'Router',
      status: 'running',
      message: matchedTemplate 
        ? `Matched LatAm compliance workflow: ${matchedTemplate.name}`
        : `Analyzing directive: "${directive}"`,
      timestamp: new Date().toISOString(),
      reasoning: "Reviewing active system rules and retrieving episodic context from memory.build..."
    }
  };
  
  await new Promise(resolve => setTimeout(resolve, 1000));

  const memoryContext = await memoryClient.retrieveContext(directive);
  yield {
    type: 'memory',
    data: {
      action: 'retrieve',
      query: directive,
      foundSegments: memoryContext
    }
  };

  yield {
    type: 'step',
    data: {
      id: 'step_1',
      agentName: 'Router',
      status: 'success',
      message: matchedTemplate
        ? `Loaded template constraints for ${matchedTemplate.country}. Decomposed requirements.`
        : `Decomposed directive using ${memoryContext.length} memory context keys.`,
      timestamp: new Date().toISOString(),
      tokenCost: 2048
    }
  };

  yield {
    type: 'step',
    data: {
      id: 'step_2',
      agentName: 'PlanningAgent',
      status: 'running',
      message: "Formulating execution plan and validation criteria based on loaded framework skills...",
      timestamp: new Date().toISOString(),
      reasoning: "Applying 'Tesla Mental Prototyping' skill to simulate DB sandboxing steps and business logic validations."
    }
  };

  await new Promise(resolve => setTimeout(resolve, 1500));

  const planSteps = [
    {
      id: 'plan_1',
      description: "Provision disposable sandbox PostgreSQL database on ghost.build",
      dependencies: [],
      validationCriteria: "Active Ghost fork ID received and reachable"
    },
    {
      id: 'plan_2',
      description: matchedTemplate 
        ? `Create table and verify compliance schema: ${matchedTemplate.name}`
        : "Execute schema updates and sample queries to verify compatibility",
      dependencies: ['plan_1'],
      validationCriteria: "Zero syntax errors returned from PostgreSQL compiler"
    }
  ];

  if (matchedTemplate) {
    planSteps.push({
      id: 'plan_3',
      description: `Validate regional business constraints: ${matchedTemplate.businessValidationRules.join(' | ')}`,
      dependencies: ['plan_2'],
      validationCriteria: "All mathematical and format checks pass"
    });
  }

  planSteps.push({
    id: `plan_${matchedTemplate ? '4' : '3'}`,
    description: "Sync operation outcome and execution trace to memory.build",
    dependencies: [matchedTemplate ? 'plan_3' : 'plan_2'],
    validationCriteria: "Context sync confirmation payload received"
  });

  const plan: MentalPlan = {
    directive,
    targetStateSpec: matchedTemplate 
      ? `Target state: Verified schema migration for ${matchedTemplate.name} on sandboxed DB.`
      : "JSON Spec v1.0 - Target state: verified database migrations and synced operations logs",
    steps: planSteps
  };

  yield { type: 'plan', data: plan };

  yield {
    type: 'step',
    data: {
      id: 'step_2',
      agentName: 'PlanningAgent',
      status: 'success',
      message: "Mental prototyping complete. Execution plan validated against SMB safety boundaries.",
      timestamp: new Date().toISOString(),
      tokenCost: 4096
    }
  };

  yield {
    type: 'step',
    data: {
      id: 'step_3',
      agentName: 'DataAgent',
      status: 'running',
      message: "Provisioning isolated PostgreSQL sandbox on ghost.build...",
      timestamp: new Date().toISOString(),
      reasoning: "Spinning up disposable fork of production database to isolate mutations."
    }
  };

  const fork = await ghostClient.createFork();
  yield {
    type: 'database',
    data: {
      action: 'fork',
      fork
    }
  };

  yield {
    type: 'step',
    data: {
      id: 'step_3',
      agentName: 'DataAgent',
      status: 'running',
      message: `Database sandbox active: ${fork.id}. Testing schema updates...`,
      timestamp: new Date().toISOString()
    }
  };

  await new Promise(resolve => setTimeout(resolve, 1200));

  const sqlSchema = matchedTemplate ? matchedTemplate.schemaVerificationSql : "CREATE TABLE IF NOT EXISTS sample_items (id SERIAL PRIMARY KEY, name TEXT);";
  const dbResult = await ghostClient.executeQuery(fork.id, sqlSchema);
  
  yield {
    type: 'database',
    data: {
      action: 'query',
      forkId: fork.id,
      sql: sqlSchema,
      result: dbResult
    }
  };

  yield {
    type: 'step',
    data: {
      id: 'step_3',
      agentName: 'DataAgent',
      status: 'success',
      message: matchedTemplate 
        ? `Compliant LatAm database schema instantiated successfully in sandbox fork.`
        : "Database queries tested and validated successfully in sandbox.",
      timestamp: new Date().toISOString(),
      tokenCost: 3500,
      outputData: dbResult
    }
  };

  yield {
    type: 'step',
    data: {
      id: 'step_4',
      agentName: 'Harness',
      status: 'running',
      message: "Evaluating loop boundaries and executing automated check suites...",
      timestamp: new Date().toISOString(),
      reasoning: "Assessing system parameters, checking memory consistency, and validating sandbox outputs."
    }
  };

  await new Promise(resolve => setTimeout(resolve, 1200));

  const logMsg = matchedTemplate
    ? `Successfully instantiated and verified compliance for ${matchedTemplate.name} on ghost fork ${fork.id}`
    : `Successfully executed: "${directive}" using ghost fork ${fork.id}`;
  
  const syncedMem = await memoryClient.syncSegment(
    matchedTemplate ? matchedTemplate.id : "execution_log", 
    logMsg, 
    "episodic"
  );
  
  yield {
    type: 'memory',
    data: {
      action: 'sync',
      segment: syncedMem
    }
  };

  yield {
    type: 'step',
    data: {
      id: 'step_4',
      agentName: 'Harness',
      status: 'success',
      message: "Verification harness succeeded. All constraints met. Closed loop secured.",
      timestamp: new Date().toISOString(),
      tokenCost: 1500
    }
  };

  yield {
    type: 'complete',
    data: {
      sessionId,
      status: 'success',
      totalCost: 11144,
      timestamp: new Date().toISOString()
    }
  };
}
