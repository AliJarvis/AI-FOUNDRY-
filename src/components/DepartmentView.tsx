import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { RESOURCES } from '../data/foundryData';
import type { Department, ResourceCategory, ResourceItem } from '../types/foundry';
import {
  RESOURCE_CATEGORIES,
  calculateDepartmentProgress,
  calculateResourceProgress,
  filterResources,
} from '../utils/foundryLogic';
import { DepartmentIcon } from './DepartmentIcon';
import { SmartImage } from './SmartImage';

interface DepartmentViewProps {
  department: Department;
  searchQuery: string;
  selectedCategory: ResourceCategory | 'All';
  onCategoryChange: (cat: ResourceCategory | 'All') => void;
  onClearFilters: () => void;
  completedStepIds: string[];
  onSelectResource: (resource: ResourceItem) => void;
}

export function DepartmentView({
  department,
  searchQuery,
  selectedCategory,
  onCategoryChange,
  onClearFilters,
  completedStepIds,
  onSelectResource,
}: DepartmentViewProps) {
  const deptStats = calculateDepartmentProgress(
    RESOURCES,
    department.id,
    completedStepIds
  );

  const filtered = filterResources(RESOURCES, {
    departmentId: department.id,
    category: selectedCategory,
    searchQuery,
  });

  // Categories actually present in this department (plus 'All')
  const deptCategories = RESOURCE_CATEGORIES.filter((cat) => {
    if (cat === 'All') return true;
    return RESOURCES.some(
      (r) => r.departmentId === department.id && r.category === cat
    );
  });

  return (
    <div className="space-y-8">
      {/* Department Header & Progress */}
      <section className="rounded-2xl bg-[#161920] border border-white/[0.08] p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1D212B] border border-white/[0.08] flex items-center justify-center text-[#A78BFA] shrink-0">
              <DepartmentIcon departmentId={department.id} className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {department.name}
              </h1>
              <p className="mt-1.5 text-sm sm:text-base text-[#A1A8B8] max-w-2xl">
                {department.summary}
              </p>
              <p className="mt-2 text-xs text-[#93C5FD]">
                Target outcome: {department.outcome}
              </p>
            </div>
          </div>

          <div className="lg:w-64 shrink-0 pt-5 border-t border-white/[0.08] lg:pt-0 lg:border-t-0 lg:border-l lg:pl-6">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#A1A8B8]">Department Progress</span>
              <span className="font-mono font-semibold text-white tabular-nums">
                {deptStats.percentage}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/[0.08] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] transition-all duration-200"
                style={{ width: `${deptStats.percentage}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-[#717A8C] tabular-nums">
              {deptStats.completed} of {deptStats.total} steps completed
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        {deptCategories.length > 2 && (
          <div className="mt-6 pt-5 border-t border-white/[0.07] flex flex-wrap items-center gap-2">
            {deptCategories.map((category) => {
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
        )}
      </section>

      {/* Resource Grid or Empty State */}
      {filtered.length === 0 ? (
        <div className="rounded-xl bg-[#161920] border border-white/[0.08] p-10 text-center">
          <p className="font-display text-base font-semibold text-white">
            No items found in {department.name}
          </p>
          <p className="mt-1.5 text-sm text-[#A1A8B8]">
            Adjust your search text or reset the category filter to view all resources in this department.
          </p>
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-5 min-h-[44px] px-4 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const progress = calculateResourceProgress(item, completedStepIds);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectResource(item)}
                className="group text-left rounded-xl overflow-hidden bg-[#161920] hover:bg-[#1B1F28] border border-white/[0.08] hover:border-[#7C3AED]/50 flex flex-col transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
              >
                {item.imageUrl && (
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#0E1014] border-b border-white/[0.08]">
                    <SmartImage
                      src={item.imageUrl}
                      alt={item.imageAlt ?? item.title}
                      fallbackTitle={item.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                    />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#717A8C] mb-2">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.difficulty}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{item.estimatedTime}</span>
                    </div>
                    <h2 className="font-display text-lg font-semibold text-white">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#A1A8B8] leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-[#717A8C] font-mono">
                          {item.stackLabel}
                        </span>
                        <span className="font-mono text-[#93C5FD] tabular-nums">
                          {progress.percentage}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/[0.07] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] transition-all duration-200"
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-medium">
                      <span className="inline-flex items-center gap-1.5 text-[#A1A8B8] tabular-nums">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#60A5FA]" aria-hidden="true" />
                        {progress.completed}/{progress.total} steps
                      </span>
                      <span className="text-[#A78BFA] inline-flex items-center gap-1">
                        Open instructions
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
