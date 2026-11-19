export type DepartmentId =
  | 'ai-coding-lab'
  | 'build-library'
  | 'automation-lab'
  | 'business-launchpad'
  | 'deployment-academy'
  | 'growth-engine';

export type ResourceCategory =
  | 'Project Blueprint'
  | 'Prompt Pack'
  | 'Automation'
  | 'Playbook'
  | 'Checklist';

export type DifficultyLevel = 'Beginner' | 'Guided' | 'Intermediate';

export interface Department {
  id: DepartmentId;
  name: string;
  shortName: string;
  summary: string;
  outcome: string;
}

export interface InstructionStep {
  id: string;
  title: string;
  detail: string;
  duration: string;
  snippet?: {
    label: string;
    language: 'markdown' | 'json' | 'bash' | 'text';
    content: string;
  };
}

export interface DownloadArtifact {
  id: string;
  fileName: string;
  format: 'MD' | 'JSON' | 'TXT';
  sizeLabel: string;
  description: string;
  content: string;
}

export interface ResourceItem {
  id: string;
  departmentId: DepartmentId;
  title: string;
  subtitle: string;
  category: ResourceCategory;
  difficulty: DifficultyLevel;
  estimatedTime: string;
  stackLabel: string;
  imageUrl?: string;
  imageAlt?: string;
  overview: string;
  outcomes: string[];
  steps: InstructionStep[];
  downloads: DownloadArtifact[];
}

export interface FilterCriteria {
  departmentId?: DepartmentId | 'all';
  category?: ResourceCategory | 'All';
  searchQuery?: string;
}

export interface ProgressStats {
  completed: number;
  total: number;
  percentage: number;
}
