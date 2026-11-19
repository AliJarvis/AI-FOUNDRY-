import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { DEPARTMENTS, RESOURCES } from '../data/foundryData';
import type { DepartmentId, ResourceCategory, ResourceItem } from '../types/foundry';
import {
  RESOURCE_CATEGORIES,
  calculateDepartmentProgress,
  calculateOverallProgress,
  calculateResourceProgress,
  filterResources,
} from '../utils/foundryLogic';
import { DepartmentIcon } from './DepartmentIcon';
import { SmartImage } from './SmartImage';

interface DashboardOverviewProps {
  searchQuery: string;
  selectedCategory: ResourceCategory | 'All';
  onCategoryChange: (cat: ResourceCategory | 'All') => void;
  onClearFilters: () => void;
  completedStepIds: string[];
  onSelectDepartment: (dept: DepartmentId) => void;
  onSelectResource: (resource: ResourceItem) => void;
}

export function DashboardOverview({
  searchQuery,
  selectedCategory,
  onCategoryChange,
  onClearFilters,
  completedStepIds,
  onSelectDepartment,
  onSelectResource,
}: DashboardOverviewProps) {
  const overall = calculateOverallProgress(RESOURCES, completedStepIds);
  const buildLibraryProjects = RESOURCES.filter(
    (item) => item.departmentId === 'build-library'
  );

  const isFiltering =
    searchQuery.trim().length > 0 || selectedCategory !== 'All';

  const matchingResources = filterResources(RESOURCES, {
    departmentId: 'all',
    category: selectedCategory,
    searchQuery,
  });

  return (
    <div className="space-y-10">
      {/* Workspace Header & Progress Summary */}
      <section className="rounded-2xl bg-[#161920] border border-white/[0.08] p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-[#93C5FD]">
              Founder’s Edition workspace
            </p>
            <h1 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Welcome to your AI FOUNDRY workspace
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#A1A8B8] max-w-2xl">
              Navigate across six departments, filter blueprints by format, and track your launch checklist progress locally in your browser.
            </p>
          </div>

          <div className="lg:w-72 shrink-0 pt-5 border-t border-white/[0.08] lg:pt-0 lg:border-t-0 lg:border-l lg:pl-7">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#A1A8B8]">Overall Completion</span>
              <span className="font-mono font-semibold text-white tabular-nums">
                {overall.percentage}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/[0.08] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] transition-all duration-200"
                style={{ width: `${overall.percentage}%` }}
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between text-xs text-[#717A8C] tabular-nums">
              <span>
                {overall.completed}/{overall.total} steps
              </span>
              <span>
                {overall.completedResources}/{overall.totalResources} kits done
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter Segmented Bar */}
        <div className="mt-6 pt-6 border-t border-white/[0.07] flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#717A8C] mr-1">Filter all kits:</span>
          {RESOURCE_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#7C3AED] text-white'
                    : 'bg-[#111318] text-[#A1A8B8] hover:text-white border border-white/[0.08]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Search / Filter Results View */}
      {isFiltering ? (
        <section>
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="font-display text-lg font-semibold text-white tabular-nums">
              Matching resources ({matchingResources.length})
            </h2>
            <button
              type="button"
              onClick={onClearFilters}
              className="text-xs font-medium text-[#A78BFA] hover:text-white cursor-pointer"
            >
              Reset filters
            </button>
          </div>

          {matchingResources.length === 0 ? (
            <div className="rounded-xl bg-[#161920] border border-white/[0.08] p-10 text-center">
              <p className="font-display text-base font-semibold text-white">
                No resources match your search
              </p>
              <p className="mt-1.5 text-sm text-[#A1A8B8]">
                Try clearing your filter or searching for terms like &ldquo;invoice&rdquo;, &ldquo;webhook&rdquo;, or &ldquo;DNS&rdquo;.
              </p>
              <button
                type="button"
                onClick={onClearFilters}
                className="mt-5 min-h-[44px] px-4 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium cursor-pointer"
              >
                Show all resources
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {matchingResources.map((item) => {
                const progress = calculateResourceProgress(item, completedStepIds);
                const dept = DEPARTMENTS.find((d) => d.id === item.departmentId);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectResource(item)}
                    className="text-left rounded-xl bg-[#161920] hover:bg-[#1B1F28] border border-white/[0.08] hover:border-[#7C3AED]/50 p-5 flex flex-col justify-between gap-4 transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#717A8C] mb-2">
                        <span>{dept?.shortName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{item.estimatedTime}</span>
                      </div>
                      <h3 className="font-display text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-[#A1A8B8] line-clamp-2">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                      <span className="font-mono text-[#93C5FD] tabular-nums">
                        {progress.completed}/{progress.total} steps
                      </span>
                      <span className="text-[#A78BFA] inline-flex items-center gap-1 font-medium">
                        Open <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Six Departments Grid */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-semibold text-white">
                Six Departments
              </h2>
              <span className="text-xs text-[#717A8C] tabular-nums">
                6 active tracks
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {DEPARTMENTS.map((dept) => {
                const stats = calculateDepartmentProgress(
                  RESOURCES,
                  dept.id,
                  completedStepIds
                );
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => onSelectDepartment(dept.id)}
                    className="group text-left rounded-xl bg-[#161920] hover:bg-[#1B1F28] border border-white/[0.08] hover:border-[#7C3AED]/50 p-5 sm:p-6 flex flex-col justify-between gap-5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#1D212B] border border-white/[0.08] flex items-center justify-center text-[#A78BFA] group-hover:bg-[#7C3AED]/20 group-hover:text-white transition-colors">
                          <DepartmentIcon departmentId={dept.id} />
                        </div>
                        <span className="text-xs font-mono text-[#A1A8B8] tabular-nums">
                          {stats.totalResources} kits
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-white">
                        {dept.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-[#A1A8B8] leading-relaxed">
                        {dept.summary}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-[#717A8C] tabular-nums">
                          {stats.completed}/{stats.total} steps
                        </span>
                        <span className="font-mono text-[#93C5FD] tabular-nums">
                          {stats.percentage}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/[0.07] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] transition-all duration-200"
                          style={{ width: `${stats.percentage}%` }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Build Library Featured 3 Sample Project Cards */}
          <section>
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="font-display text-xl font-semibold text-white">
                  Build Library: Featured Project Blueprints
                </h2>
                <p className="text-sm text-[#A1A8B8] mt-1">
                  Three complete business apps with step-by-step build instructions and starter kits.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectDepartment('build-library')}
                className="min-h-[40px] px-3 py-1.5 text-xs font-medium text-[#A78BFA] hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
              >
                Open Build Library →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {buildLibraryProjects.map((project) => {
                const progress = calculateResourceProgress(
                  project,
                  completedStepIds
                );
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => onSelectResource(project)}
                    className="group text-left rounded-xl overflow-hidden bg-[#161920] hover:bg-[#1B1F28] border border-white/[0.08] hover:border-[#7C3AED]/50 flex flex-col transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#0E1014] border-b border-white/[0.08]">
                      <SmartImage
                        src={project.imageUrl}
                        alt={project.imageAlt ?? project.title}
                        fallbackTitle={project.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#717A8C] mb-2">
                          <span>{project.difficulty}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{project.estimatedTime}</span>
                        </div>
                        <h3 className="font-display text-base font-semibold text-white">
                          {project.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-[#A1A8B8] leading-relaxed">
                          {project.subtitle}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[#93C5FD] tabular-nums">
                          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                          {progress.completed}/{progress.total} steps
                        </span>
                        <span className="text-[#A78BFA] font-medium">
                          View kit →
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
