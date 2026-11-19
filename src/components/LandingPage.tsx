import { useState } from 'react';
import { ArrowRight, Check, Menu, X } from 'lucide-react';
import { DEPARTMENTS, HERO_IMAGE_URL, RESOURCES } from '../data/foundryData';
import type { DepartmentId } from '../types/foundry';
import { DepartmentIcon } from './DepartmentIcon';
import { SmartImage } from './SmartImage';

interface LandingPageProps {
  onEnterWorkspace: (departmentId?: DepartmentId, resourceId?: string) => void;
}

const BENEFITS = [
  {
    index: '01.',
    title: 'Plain-English Architecture Specs',
    description:
      'Skip vague prompting. Turn a rough business idea into structured screen specs, component boundaries, and mobile layout rules AI tools execute accurately.',
  },
  {
    index: '02.',
    title: 'Weekend-Ready Project Blueprints',
    description:
      'Start from three realistic micro-SaaS and client portal blueprints—complete with data models, step-by-step build instructions, and downloadable kits.',
  },
  {
    index: '03.',
    title: 'Practical Launch & Automation Systems',
    description:
      'Connect lead webhooks, configure custom domains safely, and follow direct customer outreach sequences designed for solo non-technical founders.',
  },
  {
    index: '04.',
    title: 'Built for Phone & Desktop Workflows',
    description:
      'Review playbooks, copy prompt blocks, and track your build milestones cleanly from any Android phone or desktop workstation.',
  },
];

const EDITION_DELIVERABLES = [
  'Full access to all 6 Founder Departments (18 structured resources)',
  '3 complete Build Library blueprints with starter JSON & Markdown kits',
  'Interactive step-by-step milestone checklists with local progress tracking',
  'Automation webhook schemas, DNS guides, and 25-customer outreach scripts',
  'One-time $39 Founder’s Edition price with zero recurring SaaS seat fees',
];

export function LandingPage({ onEnterWorkspace }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const buildLibraryProjects = RESOURCES.filter(
    (item) => item.departmentId === 'build-library'
  );

  return (
    <div className="min-h-screen bg-[#0E1014] text-[#F3F4F6] flex flex-col">
      {/* Top Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 h-14 bg-[#0E1014]/90 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded"
          >
            AI FOUNDRY
          </a>

          {/* Zone 2: 4 concise single-line navigation links */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A1A8B8]"
          >
            <a
              href="#benefits"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Benefits
            </a>
            <a
              href="#departments"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Departments
            </a>
            <a
              href="#projects"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Build Library
            </a>
            <a
              href="#pricing"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Pricing
            </a>
          </nav>

          {/* Zone 3: 1 primary action (+ mobile menu toggle on small screens) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onEnterWorkspace()}
              className="min-h-[40px] px-4 py-2 text-sm font-medium text-white bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-[0.98] rounded-lg transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1014] cursor-pointer"
            >
              Open Workspace
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-white/[0.08] bg-[#161920] text-[#E5E7EB] hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="md:hidden bg-[#13161C] border-b border-white/[0.08] px-4 py-3 flex flex-col gap-1"
          >
            {[
              { href: '#benefits', label: 'Benefits' },
              { href: '#departments', label: 'Six Departments' },
              { href: '#projects', label: 'Build Library' },
              { href: '#pricing', label: "$39 Founder's Edition" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] px-3 flex items-center text-sm font-medium text-[#D1D5DB] hover:text-white hover:bg-white/[0.04] rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-sm font-medium text-[#93C5FD] mb-3">
                Built for non-technical founders
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08] text-white text-balance">
                IDEAS IN. PRODUCTS OUT.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-[#A1A8B8] leading-relaxed max-w-xl">
                AI FOUNDRY gives solo founders a structured workspace to plan, build, automate, and launch real software businesses—using proven blueprints and clear step-by-step instructions instead of guesswork.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => onEnterWorkspace()}
                  className="min-h-[48px] px-6 py-3 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-[0.98] text-white font-medium text-sm sm:text-base inline-flex items-center justify-center gap-2 transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1014]"
                >
                  <span>Explore $39 Founder’s Edition</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <a
                  href="#departments"
                  className="min-h-[44px] px-4 py-2.5 rounded-xl border border-white/[0.1] bg-[#161920] hover:bg-[#1D212B] text-[#E5E7EB] font-medium text-sm inline-flex items-center justify-center transition-colors whitespace-nowrap"
                >
                  Inspect Six Departments
                </a>
              </div>

              <p className="mt-4 text-xs text-[#717A8C]">
                Prototype mode · Instant local workspace preview with sample data and downloadable kits.
              </p>
            </div>

            <div className="lg:col-span-6 flex">
              <div className="w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[#161920] aspect-video lg:aspect-auto lg:h-full">
                <SmartImage
                  src={HERO_IMAGE_URL}
                  alt="AI FOUNDRY dark graphite studio workstation displaying structured interface wireframes"
                  fallbackTitle="AI FOUNDRY Workspace"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Full-width 4-Column Summary Strip below Hero Split */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] border border-white/[0.08] rounded-xl overflow-hidden">
            {[
              { value: '6', label: 'Operating Departments' },
              { value: '18', label: 'Actionable Resources' },
              { value: '3', label: 'Ready App Blueprints' },
              { value: '$39', label: 'One-Time Founder Edition' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#13161C] px-5 py-5 flex flex-col gap-1"
              >
                <span className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-[#A1A8B8]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Product Benefits */}
        <section
          id="benefits"
          className="border-t border-white/[0.07] bg-[#111318] py-16 lg:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
                Everything a non-technical founder needs to ship without getting stuck
              </h2>
              <p className="mt-3 text-base text-[#A1A8B8]">
                Instead of scattered tutorials, AI FOUNDRY organizes the entire product lifecycle into concrete templates, prompts, and launch checklists.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {BENEFITS.map((benefit) => (
                <div
                  key={benefit.index}
                  className="rounded-xl bg-[#161920] border border-white/[0.08] p-6 sm:p-7 flex flex-col gap-3"
                >
                  <span className="font-mono text-xs font-medium text-[#93C5FD] tabular-nums">
                    {benefit.index}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#A1A8B8] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Six Departments Architecture */}
        <section id="departments" className="py-16 lg:py-20 border-t border-white/[0.07]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
                  Six focused departments inside your founder workspace
                </h2>
                <p className="mt-3 text-base text-[#A1A8B8]">
                  Jump directly into any department to browse templates, track milestone completion, and download sample starter files.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onEnterWorkspace()}
                className="min-h-[44px] px-4 py-2 text-sm font-medium text-[#A78BFA] hover:text-white inline-flex items-center gap-1.5 self-start md:self-auto cursor-pointer whitespace-nowrap"
              >
                <span>View Full Dashboard</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DEPARTMENTS.map((dept) => {
                const count = RESOURCES.filter(
                  (r) => r.departmentId === dept.id
                ).length;

                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => onEnterWorkspace(dept.id)}
                    className="group text-left rounded-xl bg-[#161920] hover:bg-[#1B1F28] border border-white/[0.08] hover:border-[#7C3AED]/50 p-6 transition-colors flex flex-col justify-between gap-5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#1D212B] border border-white/[0.08] flex items-center justify-center text-[#A78BFA] group-hover:text-white group-hover:bg-[#7C3AED]/20 transition-colors">
                          <DepartmentIcon departmentId={dept.id} />
                        </div>
                        <span className="text-xs font-mono text-[#717A8C] tabular-nums">
                          {count} resources
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-white">
                        {dept.name}
                      </h3>
                      <p className="mt-2 text-sm text-[#A1A8B8] leading-relaxed">
                        {dept.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-medium text-[#93C5FD]">
                      <span className="truncate pr-2">{dept.outcome}</span>
                      <ArrowRight
                        className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform"
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Build Library Preview */}
        <section
          id="projects"
          className="py-16 lg:py-20 border-t border-white/[0.07] bg-[#111318]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
                Build Library: Three flagship product blueprints included
              </h2>
              <p className="mt-3 text-base text-[#A1A8B8]">
                Each blueprint comes with structured instructions, copyable AI prompts, and downloadable sample JSON and Markdown starter kits.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {buildLibraryProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => onEnterWorkspace('build-library', project.id)}
                  className="group text-left rounded-xl overflow-hidden bg-[#161920] border border-white/[0.08] hover:border-[#7C3AED]/50 transition-colors flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#0E1014] border-b border-white/[0.08]">
                    <SmartImage
                      src={project.imageUrl}
                      alt={project.imageAlt ?? project.title}
                      fallbackTitle={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#717A8C] mb-2">
                        <span>{project.difficulty}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{project.estimatedTime}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.steps.length} steps</span>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-white">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#A1A8B8] leading-relaxed">
                        {project.subtitle}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-[#A78BFA] inline-flex items-center gap-1.5">
                      <span>Open blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* $39 Founder's Edition Pricing */}
        <section id="pricing" className="py-16 lg:py-24 border-t border-white/[0.07]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-[#161920] border border-white/[0.1] p-7 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                <div className="lg:col-span-5">
                  <p className="text-sm font-medium text-[#93C5FD]">
                    Founder’s Edition
                  </p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-5xl font-bold text-white tabular-nums">
                      $39
                    </span>
                    <span className="text-sm text-[#A1A8B8]">one-time access</span>
                  </div>
                  <p className="mt-4 text-sm text-[#A1A8B8] leading-relaxed">
                    Designed for solo builders and non-technical operators launching their first AI-assisted software product or client portal.
                  </p>

                  <button
                    type="button"
                    onClick={() => onEnterWorkspace()}
                    className="mt-7 w-full min-h-[48px] px-5 py-3 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-[0.98] text-white font-medium text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                  >
                    <span>Launch Workspace Preview</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <p className="mt-3 text-xs text-[#717A8C] leading-relaxed">
                    Interactive prototype notice: Workspace access is open immediately with local sample data. Checkout and user authentication are intentionally omitted in this build.
                  </p>
                </div>

                <div className="lg:col-span-7 lg:border-l lg:border-white/[0.08] lg:pl-10">
                  <h3 className="font-display text-base font-semibold text-white mb-4">
                    What you unlock inside AI FOUNDRY
                  </h3>
                  <ul className="space-y-3.5">
                    {EDITION_DELIVERABLES.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-[#D1D5DB]">
                        <Check
                          className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-white/[0.08] bg-[#0B0D10] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#717A8C]">
          <div>
            <span className="font-display font-semibold text-[#E5E7EB]">
              AI FOUNDRY
            </span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>IDEAS IN. PRODUCTS OUT.</span>
          </div>
          <p>
            Prototype preview using local sample data. No live billing or authentication enabled.
          </p>
        </div>
      </footer>
    </div>
  );
}
