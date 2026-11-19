import {
  Code2,
  FolderKanban,
  Workflow,
  BriefcaseBusiness,
  Rocket,
  TrendingUp,
} from 'lucide-react';
import type { DepartmentId } from '../types/foundry';

interface DepartmentIconProps {
  departmentId: DepartmentId;
  className?: string;
}

export function DepartmentIcon({
  departmentId,
  className = 'w-5 h-5',
}: DepartmentIconProps) {
  switch (departmentId) {
    case 'ai-coding-lab':
      return <Code2 className={className} aria-hidden="true" />;
    case 'build-library':
      return <FolderKanban className={className} aria-hidden="true" />;
    case 'automation-lab':
      return <Workflow className={className} aria-hidden="true" />;
    case 'business-launchpad':
      return <BriefcaseBusiness className={className} aria-hidden="true" />;
    case 'deployment-academy':
      return <Rocket className={className} aria-hidden="true" />;
    case 'growth-engine':
      return <TrendingUp className={className} aria-hidden="true" />;
  }
}
