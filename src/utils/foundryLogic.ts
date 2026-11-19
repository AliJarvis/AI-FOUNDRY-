import type {
  DepartmentId,
  DownloadArtifact,
  FilterCriteria,
  ProgressStats,
  ResourceCategory,
  ResourceItem,
} from '../types/foundry';

export const RESOURCE_CATEGORIES: Array<ResourceCategory | 'All'> = [
  'All',
  'Project Blueprint',
  'Prompt Pack',
  'Automation',
  'Playbook',
  'Checklist',
];

export function filterResources(
  resources: ResourceItem[],
  criteria: FilterCriteria
): ResourceItem[] {
  const query = (criteria.searchQuery ?? '').trim().toLowerCase();

  return resources.filter((item) => {
    if (
      criteria.departmentId &&
      criteria.departmentId !== 'all' &&
      item.departmentId !== criteria.departmentId
    ) {
      return false;
    }

    if (
      criteria.category &&
      criteria.category !== 'All' &&
      item.category !== criteria.category
    ) {
      return false;
    }

    if (query.length > 0) {
      const searchable = [
        item.title,
        item.subtitle,
        item.category,
        item.stackLabel,
        item.overview,
      ]
        .join(' ')
        .toLowerCase();

      if (!searchable.includes(query)) {
        return false;
      }
    }

    return true;
  });
}

export function calculateResourceProgress(
  resource: ResourceItem,
  completedStepIds: Set<string> | string[]
): ProgressStats {
  const completedSet =
    completedStepIds instanceof Set
      ? completedStepIds
      : new Set(completedStepIds);

  const total = resource.steps.length;
  if (total === 0) {
    return { completed: 0, total: 0, percentage: 0 };
  }

  const completed = resource.steps.reduce(
    (count, step) => (completedSet.has(step.id) ? count + 1 : count),
    0
  );

  return {
    completed,
    total,
    percentage: Math.round((completed / total) * 100),
  };
}

export function calculateDepartmentProgress(
  resources: ResourceItem[],
  departmentId: DepartmentId,
  completedStepIds: Set<string> | string[]
): ProgressStats & { completedResources: number; totalResources: number } {
  const deptResources = resources.filter(
    (item) => item.departmentId === departmentId
  );

  let completedSteps = 0;
  let totalSteps = 0;
  let completedResources = 0;

  for (const res of deptResources) {
    const stats = calculateResourceProgress(res, completedStepIds);
    completedSteps += stats.completed;
    totalSteps += stats.total;
    if (stats.total > 0 && stats.completed === stats.total) {
      completedResources += 1;
    }
  }

  return {
    completed: completedSteps,
    total: totalSteps,
    percentage: totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0,
    completedResources,
    totalResources: deptResources.length,
  };
}

export function calculateOverallProgress(
  resources: ResourceItem[],
  completedStepIds: Set<string> | string[]
): ProgressStats & { completedResources: number; totalResources: number } {
  let completedSteps = 0;
  let totalSteps = 0;
  let completedResources = 0;

  for (const res of resources) {
    const stats = calculateResourceProgress(res, completedStepIds);
    completedSteps += stats.completed;
    totalSteps += stats.total;
    if (stats.total > 0 && stats.completed === stats.total) {
      completedResources += 1;
    }
  }

  return {
    completed: completedSteps,
    total: totalSteps,
    percentage: totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0,
    completedResources,
    totalResources: resources.length,
  };
}

export function toggleStepCompletion(
  currentStepIds: string[],
  stepId: string
): string[] {
  if (currentStepIds.includes(stepId)) {
    return currentStepIds.filter((id) => id !== stepId);
  }
  return [...currentStepIds, stepId];
}

export function buildSampleDownloadPayload(
  resource: ResourceItem,
  artifact: DownloadArtifact
): string {
  const header = [
    `AI FOUNDRY — Prototype Sample Artifact`,
    `Resource: ${resource.title}`,
    `File: ${artifact.fileName}`,
    `Note: Local sample data provided for prototype exploration.`,
    `------------------------------------------------------------`,
  ].join('\n');

  if (artifact.format === 'JSON') {
    try {
      const parsed = JSON.parse(artifact.content) as Record<string, unknown>;
      return JSON.stringify(
        {
          _prototypeNotice: 'AI FOUNDRY local sample kit artifact',
          resourceTitle: resource.title,
          ...parsed,
        },
        null,
        2
      );
    } catch {
      return artifact.content;
    }
  }

  return `${header}\n\n${artifact.content}`;
}
