import { useEffect, useState } from 'react';
import { DashboardOverview } from './components/DashboardOverview';
import { DashboardShell } from './components/DashboardShell';
import { DepartmentView } from './components/DepartmentView';
import { LandingPage } from './components/LandingPage';
import { ResourceDetailView } from './components/ResourceDetailView';
import {
  DEPARTMENTS,
  INITIAL_COMPLETED_STEPS,
  RESOURCES,
} from './data/foundryData';
import type {
  DepartmentId,
  ResourceCategory,
  ResourceItem,
} from './types/foundry';
import { toggleStepCompletion } from './utils/foundryLogic';

const STORAGE_KEY = 'ai-foundry-completed-steps-v1';

type AppScreen = 'landing' | 'workspace';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        return 'workspace';
      }
    }
    return 'landing';
  });

  const [activeDepartment, setActiveDepartment] = useState<
    DepartmentId | 'overview'
  >('overview');
  const [activeResourceId, setActiveResourceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    ResourceCategory | 'All'
  >('All');

  const [completedStepIds, setCompletedStepIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') {
      return INITIAL_COMPLETED_STEPS;
    }
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage errors
    }
    return INITIAL_COMPLETED_STEPS;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(completedStepIds)
      );
    } catch {
      // Ignore storage errors
    }
  }, [completedStepIds]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleEnterWorkspace = (
    departmentId?: DepartmentId,
    resourceId?: string
  ) => {
    setScreen('workspace');
    setSearchQuery('');
    setSelectedCategory('All');
    if (resourceId) {
      const res = RESOURCES.find((r) => r.id === resourceId);
      setActiveDepartment(res ? res.departmentId : departmentId ?? 'overview');
      setActiveResourceId(resourceId);
    } else if (departmentId) {
      setActiveDepartment(departmentId);
      setActiveResourceId(null);
    } else {
      setActiveDepartment('overview');
      setActiveResourceId(null);
    }
    scrollToTop();
  };

  const handleSelectDepartment = (dept: DepartmentId | 'overview') => {
    setActiveDepartment(dept);
    setActiveResourceId(null);
    setSelectedCategory('All');
    scrollToTop();
  };

  const handleSelectResource = (resource: ResourceItem) => {
    setActiveDepartment(resource.departmentId);
    setActiveResourceId(resource.id);
    scrollToTop();
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (activeResourceId && value.trim().length > 0) {
      setActiveResourceId(null);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const handleToggleStep = (stepId: string) => {
    setCompletedStepIds((prev) => toggleStepCompletion(prev, stepId));
  };

  const handleResetProgress = () => {
    setCompletedStepIds(INITIAL_COMPLETED_STEPS);
  };

  if (screen === 'landing') {
    return <LandingPage onEnterWorkspace={handleEnterWorkspace} />;
  }

  const activeResource = activeResourceId
    ? RESOURCES.find((r) => r.id === activeResourceId) ?? null
    : null;

  const currentDeptObj =
    activeDepartment === 'overview'
      ? null
      : DEPARTMENTS.find((d) => d.id === activeDepartment) ?? null;

  return (
    <DashboardShell
      activeDepartment={activeDepartment}
      activeResourceTitle={activeResource?.title}
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
      onSelectDepartment={handleSelectDepartment}
      onBackToLanding={() => {
        setScreen('landing');
        scrollToTop();
      }}
      onResetProgress={handleResetProgress}
      completedStepIds={completedStepIds}
    >
      {activeResource && currentDeptObj ? (
        <ResourceDetailView
          resource={activeResource}
          department={currentDeptObj}
          completedStepIds={completedStepIds}
          onToggleStep={handleToggleStep}
          onBack={() => {
            setActiveResourceId(null);
            scrollToTop();
          }}
        />
      ) : currentDeptObj ? (
        <DepartmentView
          department={currentDeptObj}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onClearFilters={handleClearFilters}
          completedStepIds={completedStepIds}
          onSelectResource={handleSelectResource}
        />
      ) : (
        <DashboardOverview
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onClearFilters={handleClearFilters}
          completedStepIds={completedStepIds}
          onSelectDepartment={(dept) => handleSelectDepartment(dept)}
          onSelectResource={handleSelectResource}
        />
      )}
    </DashboardShell>
  );
}
