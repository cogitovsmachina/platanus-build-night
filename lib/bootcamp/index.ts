export interface Capability {
  id: string;
  name: string;
  type: 'compute' | 'sandbox' | 'memory' | 'assessment' | 'credential';
  reliability: string; // e.g. "99.9%"
  status: 'active' | 'degraded' | 'offline';
  description: string;
}

export interface CompanyWorldModel {
  cohortName: string;
  totalStudents: number;
  graduationRate: number;
  totalGpuHoursUsed: number;
  gpuLimitHours: number;
  activeSandboxes: number;
  tuitionRevenue: number;
}

export interface StudentWorldModel {
  id: string;
  name: string;
  email: string;
  gpuHoursConsumed: number;
  gradeAverage: number;
  currentProject: string;
  status: 'excelling' | 'stuck' | 'graduated' | 'normal';
  lastSubmissionTime: string;
}

export interface ComposedSolution {
  id: string;
  triggerEvent: string;
  targetStudent: string;
  composedCapabilities: string[];
  actionTaken: string;
  surfacedInterface: string;
  timestamp: string;
}

// Initial state of the AI Bootcamp
class AiBootcampEcosystem {
  public capabilities: Capability[] = [
    {
      id: "cap_gpu_alloc",
      name: "Serverless GPU Provisioner",
      type: "compute",
      reliability: "99.98%",
      status: "active",
      description: "Allocates high-performance Lambda Labs/RunPod GPU runtimes on-demand."
    },
    {
      id: "cap_sandbox",
      name: "Dockerized Code Sandbox",
      type: "sandbox",
      reliability: "99.95%",
      status: "active",
      description: "Runs untrusted Python/PyTorch submissions within isolated micro-containers."
    },
    {
      id: "cap_episodic_mem",
      name: "Episodic Knowledge Store",
      type: "memory",
      reliability: "99.99%",
      status: "active",
      description: "Saves code traces, logs, and contextual student metadata into memory.build."
    },
    {
      id: "cap_grading",
      name: "Harness Grading Engine",
      type: "assessment",
      reliability: "99.90%",
      status: "active",
      description: "Determines schema alignment, code completeness, and execution performance."
    },
    {
      id: "cap_nft_creds",
      name: "Diplomas & NFT Credentials",
      type: "credential",
      reliability: "100.0%",
      status: "active",
      description: "Mints ERC-721 diplomas and verifiable cryptographic competence certificates."
    }
  ];

  public companyModel: CompanyWorldModel = {
    cohortName: "AI Club Condesa - Cohort Alpha",
    totalStudents: 32,
    graduationRate: 88,
    totalGpuHoursUsed: 420,
    gpuLimitHours: 1000,
    activeSandboxes: 4,
    tuitionRevenue: 64000
  };

  public studentModels: StudentWorldModel[] = [
    {
      id: "std_1",
      name: "Rodrigo Morales",
      email: "rodrigo@condesa.ai",
      gpuHoursConsumed: 22.4,
      gradeAverage: 94.5,
      currentProject: "Fine-tuning Llama-3-8B on Mexican Tax Code",
      status: "excelling",
      lastSubmissionTime: new Date(Date.now() - 1000 * 60 * 15).toISOString()
    },
    {
      id: "std_2",
      name: "Sofia Valenzuela",
      email: "sofia@condesa.ai",
      gpuHoursConsumed: 18.2,
      gradeAverage: 68.0,
      currentProject: "Multi-Agent Customer Support System",
      status: "stuck",
      lastSubmissionTime: new Date(Date.now() - 1000 * 60 * 45).toISOString()
    },
    {
      id: "std_3",
      name: "Esteban Garza",
      email: "esteban@condesa.ai",
      gpuHoursConsumed: 35.0,
      gradeAverage: 98.2,
      currentProject: "Local vLLM Orchestration on Edge Node",
      status: "graduated",
      lastSubmissionTime: new Date(Date.now() - 1000 * 60 * 120).toISOString()
    }
  ];

  public compositions: ComposedSolution[] = [
    {
      id: "comp_1",
      triggerEvent: "Student Esteban Garza achieved 98% grade and passed final project evaluation",
      targetStudent: "Esteban Garza",
      composedCapabilities: ["Serverless GPU Provisioner", "Diplomas & NFT Credentials"],
      actionTaken: "Deallocated active GPU sandbox and minted Verifiable Credential ID #0381",
      surfacedInterface: "Student Console + Email Delivery",
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
    }
  ];

  // Composes solution dynamically based on a student state trigger
  async handleTriggerEvent(studentId: string, eventType: 'stuck_debugging' | 'complete_project' | 'gpu_surge'): Promise<ComposedSolution> {
    const student = this.studentModels.find(s => s.id === studentId);
    if (!student) throw new Error("Student not found");

    await new Promise(resolve => setTimeout(resolve, 800));

    const compositionId = `comp_${Math.random().toString(36).substr(2, 9)}`;
    let composition: ComposedSolution;

    if (eventType === 'stuck_debugging') {
      student.status = 'stuck';
      student.gradeAverage = Math.max(50, student.gradeAverage - 5);
      
      composition = {
        id: compositionId,
        triggerEvent: `Student ${student.name} runtime error: 'CUDA out of memory' during training loop`,
        targetStudent: student.name,
        composedCapabilities: ["Serverless GPU Provisioner", "Dockerized Code Sandbox", "Episodic Knowledge Store"],
        actionTaken: "Provisioned auxiliary GPU node (+12GB VRAM), executed automated stacktrace debugging sandbox, and retrieved memory.build context for CUDA memory leaks.",
        surfacedInterface: "Student Discord Notification + Mentor Dashboard",
        timestamp: new Date().toISOString()
      };
      
      this.companyModel.totalGpuHoursUsed += 4;
      this.companyModel.activeSandboxes += 1;
    } else if (eventType === 'complete_project') {
      student.status = 'graduated';
      student.gradeAverage = Math.min(100, student.gradeAverage + 3);
      
      composition = {
        id: compositionId,
        triggerEvent: `Student ${student.name} submitted final project: 'vLLM API deployment script'`,
        targetStudent: student.name,
        composedCapabilities: ["Harness Grading Engine", "Diplomas & NFT Credentials"],
        actionTaken: "Ran code parsing tests (all passed), calculated latency benchmarks (top 10%), and minted diploma to polygon address.",
        surfacedInterface: "Student Console",
        timestamp: new Date().toISOString()
      };
      
      this.companyModel.graduationRate = Math.round(
        ((this.studentModels.filter(s => s.status === 'graduated').length) / this.studentModels.length) * 100
      );
    } else {
      student.gpuHoursConsumed += 10;
      
      composition = {
        id: compositionId,
        triggerEvent: `Student ${student.name} requested large training run`,
        targetStudent: student.name,
        composedCapabilities: ["Serverless GPU Provisioner", "Episodic Knowledge Store"],
        actionTaken: "Increased quota buffer limits and registered operation signature to memory logs.",
        surfacedInterface: "Student Console",
        timestamp: new Date().toISOString()
      };
      
      this.companyModel.totalGpuHoursUsed += 10;
    }

    this.compositions.unshift(composition);
    return composition;
  }

  getEcosystemState() {
    return {
      capabilities: this.capabilities,
      companyModel: this.companyModel,
      studentModels: this.studentModels,
      compositions: this.compositions
    };
  }
}

export const bootcampEcosystem = new AiBootcampEcosystem();
