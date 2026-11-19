import { useState } from 'react';
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  Eye,
  FileCode2,
  FileText,
} from 'lucide-react';
import type {
  Department,
  DownloadArtifact,
  ResourceItem,
} from '../types/foundry';
import {
  buildSampleDownloadPayload,
  calculateResourceProgress,
} from '../utils/foundryLogic';
import { SmartImage } from './SmartImage';

interface ResourceDetailViewProps {
  resource: ResourceItem;
  department: Department;
  completedStepIds: string[];
  onToggleStep: (stepId: string) => void;
  onBack: () => void;
}

export function ResourceDetailView({
  resource,
  department,
  completedStepIds,
  onToggleStep,
  onBack,
}: ResourceDetailViewProps) {
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);
  const [previewArtifactId, setPreviewArtifactId] = useState<string | null>(null);

  const progress = calculateResourceProgress(resource, completedStepIds);

  const handleCopySnippet = async (stepId: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSnippetId(stepId);
      setTimeout(() => setCopiedSnippetId(null), 1800);
    } catch {
      // Fallback silent if clipboard blocked in headless context
      setCopiedSnippetId(stepId);
      setTimeout(() => setCopiedSnippetId(null), 1800);
    }
  };

  const handleDownloadSample = (artifact: DownloadArtifact) => {
    const payload = buildSampleDownloadPayload(resource, artifact);
    const mimeType =
      artifact.format === 'JSON' ? 'application/json' : 'text/markdown';
    const blob = new Blob([payload], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = artifact.fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setDownloadedId(artifact.id);
    setTimeout(() => setDownloadedId(null), 2400);
  };

  return (
    <div className="space-y-8">
      {/* Back Action */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="min-h-[44px] px-3.5 py-2 rounded-lg bg-[#161920] hover:bg-[#1D212B] border border-white/[0.08] text-sm font-medium text-[#E5E7EB] inline-flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to {department.name}</span>
        </button>
      </div>

      {/* Resource Hero Card */}
      <section className="rounded-2xl bg-[#161920] border border-white/[0.08] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div
            className={`p-6 sm:p-8 flex flex-col justify-between gap-6 ${
              resource.imageUrl ? 'lg:col-span-7' : 'lg:col-span-12'
            }`}
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#93C5FD] mb-3">
                <span>{department.name}</span>
                <span aria-hidden="true">·</span>
                <span>{resource.category}</span>
                <span aria-hidden="true">·</span>
                <span>{resource.difficulty}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{resource.estimatedTime}</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
                {resource.title}
              </h1>
              <p className="mt-3 text-base text-[#A1A8B8] leading-relaxed">
                {resource.overview}
              </p>

              {/* Deliverables */}
              <div className="mt-6 pt-5 border-t border-white/[0.07]">
                <h2 className="text-xs font-medium text-[#93C5FD] mb-3">
                  What you build in this kit
                </h2>
                <ul className="space-y-2">
                  {resource.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex items-start gap-2.5 text-sm text-[#D1D5DB]"
                    >
                      <Check
                        className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="pt-5 border-t border-white/[0.08]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#A1A8B8] font-medium">
                  Checklist Progress ({resource.stackLabel})
                </span>
                <span className="font-mono text-white tabular-nums">
                  {progress.completed}/{progress.total} steps ({progress.percentage}%)
                </span>
              </div>
              <div
                className="h-2 w-full rounded-full bg-white/[0.08] overflow-hidden"
                role="progressbar"
                aria-valuenow={progress.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] transition-all duration-200"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          </div>

          {resource.imageUrl && (
            <div className="lg:col-span-5 bg-[#0E1014] border-t lg:border-t-0 lg:border-l border-white/[0.08] aspect-[4/3] lg:aspect-auto">
              <SmartImage
                src={resource.imageUrl}
                alt={resource.imageAlt ?? resource.title}
                fallbackTitle={resource.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Step-by-Step Instructions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-white">
            Step-by-Step Instructions
          </h2>
          <span className="text-xs text-[#717A8C]">
            Click any step to mark complete
          </span>
        </div>

        <div className="space-y-4">
          {resource.steps.map((step, idx) => {
            const isDone = completedStepIds.includes(step.id);
            const stepNumber = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={step.id}
                className={`rounded-xl border p-5 sm:p-6 transition-colors ${
                  isDone
                    ? 'bg-[#131722] border-[#7C3AED]/45'
                    : 'bg-[#161920] border-white/[0.08]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={isDone}
                    aria-label={`Mark step ${idx + 1} (${step.title}) as ${
                      isDone ? 'incomplete' : 'complete'
                    }`}
                    onClick={() => onToggleStep(step.id)}
                    className={`mt-0.5 w-7 h-7 min-w-[28px] rounded-lg border flex items-center justify-center transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${
                      isDone
                        ? 'bg-[#7C3AED] border-[#7C3AED] text-white'
                        : 'bg-[#111318] border-white/[0.2] text-transparent hover:border-[#8B5CF6]'
                    }`}
                  >
                    <Check className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onToggleStep(step.id)}
                        className="text-left font-display text-base sm:text-lg font-semibold text-white hover:text-[#A78BFA] transition-colors cursor-pointer"
                      >
                        <span className="font-mono text-xs text-[#93C5FD] mr-2 tabular-nums">
                          {stepNumber}.{' '}
                        </span>
                        <span className={isDone ? 'line-through text-[#A1A8B8]' : ''}>
                          {step.title}
                        </span>
                      </button>
                      <span className="text-xs font-mono text-[#717A8C] tabular-nums">
                        {step.duration}
                      </span>
                    </div>

                    <p className="mt-2 text-sm sm:text-base text-[#A1A8B8] leading-relaxed">
                      {step.detail}
                    </p>

                    {step.snippet && (
                      <div className="mt-4 rounded-xl bg-[#0B0D10] border border-white/[0.08] overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-white/[0.08] flex items-center justify-between gap-3">
                          <span className="text-xs font-mono text-[#A1A8B8]">
                            {step.snippet.label}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopySnippet(step.id, step.snippet!.content)
                            }
                            className="min-h-[32px] px-2.5 py-1 rounded-md bg-[#161920] hover:bg-[#1D212B] border border-white/[0.08] text-xs font-medium text-[#E5E7EB] inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            {copiedSnippetId === step.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-[#60A5FA]" aria-hidden="true" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-xs font-mono text-[#D1D5DB] overflow-x-auto leading-relaxed whitespace-pre-wrap">
                          {step.snippet.content}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Download Area */}
      <section className="rounded-2xl bg-[#161920] border border-white/[0.08] p-6 sm:p-8 space-y-5">
        <div>
          <h2 className="font-display text-xl font-semibold text-white">
            Download Area
          </h2>
          <p className="mt-1 text-sm text-[#A1A8B8]">
            Prototype starter artifacts generated locally in your browser from sample data (no cloud storage or gated downloads active).
          </p>
        </div>

        <div className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
          {resource.downloads.map((artifact) => {
            const isPreviewOpen = previewArtifactId === artifact.id;
            const isJustDownloaded = downloadedId === artifact.id;

            return (
              <div key={artifact.id} className="py-4 sm:py-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#1D212B] border border-white/[0.08] flex items-center justify-center text-[#93C5FD] shrink-0">
                      {artifact.format === 'JSON' ? (
                        <FileCode2 className="w-5 h-5" aria-hidden="true" />
                      ) : (
                        <FileText className="w-5 h-5" aria-hidden="true" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-sm font-medium text-white truncate">
                        {artifact.fileName}
                      </p>
                      <p className="mt-0.5 text-xs text-[#A1A8B8]">
                        {artifact.format} · <span className="tabular-nums">{artifact.sizeLabel}</span> · {artifact.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewArtifactId(isPreviewOpen ? null : artifact.id)
                      }
                      className="min-h-[44px] px-3.5 py-2 rounded-lg border border-white/[0.1] bg-[#111318] hover:bg-[#1D212B] text-xs font-medium text-[#E5E7EB] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" aria-hidden="true" />
                      <span>{isPreviewOpen ? 'Hide Preview' : 'Preview'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadSample(artifact)}
                      className="min-h-[44px] px-4 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      {isJustDownloaded ? (
                        <>
                          <Check className="w-4 h-4" aria-hidden="true" />
                          <span>Saved Sample</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" aria-hidden="true" />
                          <span>Download Sample</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {isPreviewOpen && (
                  <pre className="p-4 rounded-lg bg-[#0B0D10] border border-white/[0.08] text-xs font-mono text-[#D1D5DB] overflow-x-auto whitespace-pre-wrap">
                    {buildSampleDownloadPayload(resource, artifact)}
                  </pre>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
