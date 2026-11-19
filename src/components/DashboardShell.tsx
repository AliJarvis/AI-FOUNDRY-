import { useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  FolderKanban,
  LayoutGrid,
  Menu,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { DEPARTMENTS, RESOURCES } from '../data/foundryData';
import type { DepartmentId } from '../types/foundry';
import {
  calculateDepartmentProgress,
  calculateOverallProgress,
} from '../utils/foundryLogic';
import { DepartmentIcon } from './DepartmentIcon';

interface DashboardShellProps {
  activeDepartment: DepartmentId | 'overview';
  activeResourceTitle?: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectDepartment: (dept: DepartmentId | 'overview') => void;
  onBackToLanding: () => void;
  onResetProgress: () => void;
  completedStepIds: string[];
  children: ReactNode;
}

export function DashboardShell({
  activeDepartment,
  activeResourceTitle,
  searchQuery,
  onSearchChange,
  onSelectDepartment,
  onBackToLanding,
  onResetProgress,
  completedStepIds,
  children,
}: DashboardShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const overall = calculateOverallProgress(RESOURCES, completedStepIds);
  const currentDeptObj =
    activeDepartment === 'overview'
      ? null
      : DEPARTMENTS.find((d) => d.id === activeDepartment) ?? null;

  const handleNavClick = (dept: DepartmentId | 'overview') => {
    onSelectDepartment(dept);
    setDrawerOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#111318] border-r border-white/[0.08]">
      {/* Brand Header */}
      <div className="h-14 px-5 border-b border-white/[0.08] flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={() => handleNavClick('overview')}
          className="font-display text-base font-bold tracking-tight text-white hover:text-[#A78BFA] transition-colors cursor-pointer whitespace-nowrap"
        >
          AI FOUNDRY
        </button>
        <button
          type="button"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close sidebar navigation"
          className="lg:hidden min-h-[44px] min-w-[44px] -mr-2 flex items-center justify-center text-[#A1A8B8] hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {/* Overall Progress Summary inside Sidebar */}
      <div className="px-4 py-4 border-b border-white/[0.08]">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-[#A1A8B8] font-medium">Founder Progress</span>
          <span className="font-mono text-white tabular-nums">
            {overall.percentage}%
          </span>
        </div>
        <div
          className="h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden"
          role="progressbar"
          aria-valuenow={overall.percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Overall workspace progress"
        >
          <div
            className="h-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] transition-all duration-200"
            style={{ width: `${overall.percentage}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] text-[#717A8C] tabular-nums">
          {overall.completed} of {overall.total} steps completed
        </p>
      </div>

      {/* Department Navigation */}
      <nav
        aria-label="Workspace Departments"
        className="flex-1 overflow-y-auto px-3 py-4 space-y-1"
      >
        <button
          type="button"
          onClick={() => handleNavClick('overview')}
          className={`w-full min-h-[44px] px-3 py-2.5 rounded-lg flex items-center justify-between gap-3 text-sm font-medium transition-colors cursor-pointer ${
            activeDepartment === 'overview' && !activeResourceTitle
              ? 'bg-[#7C3AED]/18 text-white border border-[#7C3AED]/40'
              : 'text-[#A1A8B8] hover:text-white hover:bg-white/[0.04] border border-transparent'
          }`}
        >
          <span className="flex items-center gap-3 truncate">
            <LayoutGrid className="w-4 h-4 shrink-0 text-[#A78BFA]" aria-hidden="true" />
            <span className="truncate">Workspace Overview</span>
          </span>
          <span className="text-xs font-mono text-[#717A8C] tabular-nums">
            {RESOURCES.length}
          </span>
        </button>

        <div className="pt-4 pb-1.5 px-3">
          <p className="text-xs font-medium text-[#717A8C]">
            Departments
          </p>
        </div>

        {DEPARTMENTS.map((dept) => {
          const stats = calculateDepartmentProgress(
            RESOURCES,
            dept.id,
            completedStepIds
          );
          const isActive = activeDepartment === dept.id;

          return (
            <button
              key={dept.id}
              type="button"
              onClick={() => handleNavClick(dept.id)}
              className={`w-full min-h-[44px] px-3 py-2.5 rounded-lg flex items-center justify-between gap-3 text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#7C3AED]/18 text-white border border-[#7C3AED]/40'
                  : 'text-[#A1A8B8] hover:text-white hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              <span className="flex items-center gap-3 min-w-0">
                <DepartmentIcon
                  departmentId={dept.id}
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-[#A78BFA]' : 'text-[#717A8C]'
                  }`}
                />
                <span className="truncate">{dept.name}</span>
              </span>
              <span className="text-xs font-mono text-[#717A8C] tabular-nums shrink-0">
                {stats.percentage}%
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Utility Actions */}
      <div className="p-3 border-t border-white/[0.08] space-y-1">
        <button
          type="button"
          onClick={onResetProgress}
          className="w-full min-h-[44px] px-3 py-2 rounded-lg text-xs font-medium text-[#A1A8B8] hover:text-white hover:bg-white/[0.04] flex items-center gap-2.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>Reset Demo Progress</span>
        </button>
        <button
          type="button"
          onClick={onBackToLanding}
          className="w-full min-h-[44px] px-3 py-2 rounded-lg text-xs font-medium text-[#A1A8B8] hover:text-white hover:bg-white/[0.04] flex items-center gap-2.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>Back to Landing Page</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0E1014] text-[#F3F4F6] flex">
      {/* Desktop Fixed Sidebar (264px) */}
      <aside className="hidden lg:block w-[264px] shrink-0 sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {drawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
          aria-label="Workspace Navigation"
        >
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative z-10 w-[280px] max-w-[85vw] h-full">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col pb-16 lg:pb-0">
        {/* Sticky Top Header (52px on mobile, 56px on desktop) */}
        <header className="sticky top-0 z-30 h-[52px] lg:h-14 bg-[#0E1014]/90 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Left: Mobile Menu + Contextual Breadcrumb */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open departments menu"
              className="lg:hidden min-h-[44px] min-w-[44px] -ml-2 flex items-center justify-center rounded-lg text-[#E5E7EB] hover:bg-white/[0.06] cursor-pointer shrink-0"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>

            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm min-w-0">
              <button
                type="button"
                onClick={() => onSelectDepartment('overview')}
                className="text-[#A1A8B8] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Dashboard
              </button>
              {currentDeptObj && (
                <>
                  <span className="text-[#4B5563] shrink-0" aria-hidden="true">
                    /
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectDepartment(currentDeptObj.id)}
                    className={`truncate cursor-pointer transition-colors ${
                      activeResourceTitle
                        ? 'text-[#A1A8B8] hover:text-white'
                        : 'text-white font-medium'
                    }`}
                  >
                    {currentDeptObj.shortName}
                  </button>
                </>
              )}
              {activeResourceTitle && (
                <>
                  <span className="hidden sm:inline text-[#4B5563] shrink-0" aria-hidden="true">
                    /
                  </span>
                  <span className="hidden sm:inline text-white font-medium truncate max-w-[240px]">
                    {activeResourceTitle}
                  </span>
                </>
              )}
            </nav>
          </div>

          {/* Right: Search Input (Desktop) + Landing Shortcut */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center relative w-64 md:w-72">
              <Search
                className="w-4 h-4 text-[#717A8C] absolute left-3 pointer-events-none"
                aria-hidden="true"
              />
              <label htmlFor="workspace-search-desktop" className="sr-only">
                Search resources across departments
              </label>
              <input
                id="workspace-search-desktop"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search blueprints, prompts..."
                className="w-full h-9 pl-9 pr-8 rounded-lg bg-[#161920] border border-white/[0.08] text-sm text-white placeholder-[#717A8C] focus:outline-none focus:border-[#8B5CF6] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search query"
                  className="absolute right-2 text-[#717A8C] hover:text-white p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={onBackToLanding}
              className="min-h-[36px] px-3 py-1.5 rounded-lg border border-white/[0.1] bg-[#161920] hover:bg-[#1D212B] text-xs font-medium text-[#E5E7EB] whitespace-nowrap shrink-0 cursor-pointer transition-colors"
            >
              Landing Page
            </button>
          </div>
        </header>

        {/* Mobile Search Bar (directly inside scroll flow, never sticky so sticky cap stays <= 15%) */}
        <div className="sm:hidden px-4 pt-3">
          <div className="relative flex items-center">
            <Search
              className="w-4 h-4 text-[#717A8C] absolute left-3.5 pointer-events-none"
              aria-hidden="true"
            />
            <label htmlFor="workspace-search-mobile" className="sr-only">
              Search resources
            </label>
            <input
              id="workspace-search-mobile"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search blueprints, prompts, guides..."
              className="w-full min-h-[44px] pl-10 pr-10 rounded-xl bg-[#161920] border border-white/[0.08] text-sm text-white placeholder-[#717A8C] focus:outline-none focus:border-[#8B5CF6]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search query"
                className="absolute right-1.5 min-h-[40px] min-w-[40px] flex items-center justify-center text-[#A1A8B8] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Main Viewport */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>
      </div>

      {/* Android / Mobile Thumb Bottom Bar (56px height) */}
      <nav
        aria-label="Mobile Quick Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-[#111318]/95 backdrop-blur-md border-t border-white/[0.08] grid grid-cols-4 items-center"
      >
        <button
          type="button"
          onClick={() => handleNavClick('overview')}
          className={`h-full flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
            activeDepartment === 'overview'
              ? 'text-[#A78BFA]'
              : 'text-[#A1A8B8] hover:text-white'
          }`}
        >
          <LayoutGrid className="w-5 h-5" aria-hidden="true" />
          <span className="text-[10px] font-medium">Overview</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('build-library')}
          className={`h-full flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
            activeDepartment === 'build-library'
              ? 'text-[#A78BFA]'
              : 'text-[#A1A8B8] hover:text-white'
          }`}
        >
          <FolderKanban className="w-5 h-5" aria-hidden="true" />
          <span className="text-[10px] font-medium">Library</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('ai-coding-lab')}
          className={`h-full flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
            activeDepartment === 'ai-coding-lab'
              ? 'text-[#A78BFA]'
              : 'text-[#A1A8B8] hover:text-white'
          }`}
        >
          <Sparkles className="w-5 h-5" aria-hidden="true" />
          <span className="text-[10px] font-medium">Coding Lab</span>
        </button>

        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="h-full flex flex-col items-center justify-center gap-0.5 text-[#A1A8B8] hover:text-white cursor-pointer"
        >
          <Menu className="w-5 h-5" aria-hidden="true" />
          <span className="text-[10px] font-medium">All 6</span>
        </button>
      </nav>
    </div>
  );
}
