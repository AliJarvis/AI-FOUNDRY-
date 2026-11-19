import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildSampleDownloadPayload,
  calculateDepartmentProgress,
  calculateOverallProgress,
  calculateResourceProgress,
  filterResources,
  toggleStepCompletion,
} from './foundryLogic';
import type { ResourceItem } from '../types/foundry';

const sampleResources: ResourceItem[] = [
  {
    id: 'res-1',
    departmentId: 'build-library',
    title: 'Client Proposal & Invoice Portal',
    subtitle: 'Send branded proposals and collect invoices cleanly',
    category: 'Project Blueprint',
    difficulty: 'Beginner',
    estimatedTime: '90 min',
    stackLabel: 'React + Tailwind + Webhook',
    overview: 'Build a client-facing proposal tracker.',
    outcomes: ['Proposal approval flow', 'Invoice PDF view'],
    steps: [
      { id: 's1', title: 'Define data model', detail: 'Outline clients and invoices.', duration: '15 min' },
      { id: 's2', title: 'Generate UI layout', detail: 'Build the dashboard table.', duration: '30 min' },
    ],
    downloads: [
      {
        id: 'd1',
        fileName: 'proposal-schema.json',
        format: 'JSON',
        sizeLabel: '2.1 KB',
        description: 'Sample JSON structure',
        content: '{"entity":"Proposal","fields":["clientName","amount"]}',
      },
    ],
  },
  {
    id: 'res-2',
    departmentId: 'automation-lab',
    title: 'Lead Capture Webhook Flow',
    subtitle: 'Route form leads to CRM and email alerts',
    category: 'Automation',
    difficulty: 'Guided',
    estimatedTime: '45 min',
    stackLabel: 'Make / Zapier + JSON',
    overview: 'Automate inbound leads.',
    outcomes: ['Instant Slack notification', 'Sheet logging'],
    steps: [
      { id: 's3', title: 'Create webhook trigger', detail: 'Listen for POST events.', duration: '15 min' },
      { id: 's4', title: 'Map CRM fields', detail: 'Connect email and company.', duration: '30 min' },
    ],
    downloads: [
      {
        id: 'd2',
        fileName: 'webhook-blueprint.md',
        format: 'MD',
        sizeLabel: '1.4 KB',
        description: 'Webhook mapping instructions',
        content: '# Webhook Setup\nMap email -> lead.email',
      },
    ],
  },
];

test('filterResources filters by department, category, and search query', () => {
  assert.equal(filterResources(sampleResources, { departmentId: 'all' }).length, 2);
  assert.equal(filterResources(sampleResources, { departmentId: 'build-library' }).length, 1);
  assert.equal(filterResources(sampleResources, { category: 'Automation' }).length, 1);
  assert.equal(filterResources(sampleResources, { searchQuery: 'invoice' }).length, 1);
  assert.equal(filterResources(sampleResources, { searchQuery: 'nonexistent' }).length, 0);
});

test('calculateResourceProgress computes exact counts and percentage', () => {
  const empty = calculateResourceProgress(sampleResources[0], []);
  assert.deepEqual(empty, { completed: 0, total: 2, percentage: 0 });

  const half = calculateResourceProgress(sampleResources[0], ['s1']);
  assert.deepEqual(half, { completed: 1, total: 2, percentage: 50 });

  const full = calculateResourceProgress(sampleResources[0], ['s1', 's2']);
  assert.deepEqual(full, { completed: 2, total: 2, percentage: 100 });
});

test('calculateDepartmentProgress and calculateOverallProgress aggregate accurately', () => {
  const dept = calculateDepartmentProgress(sampleResources, 'build-library', ['s1', 's2']);
  assert.equal(dept.completedResources, 1);
  assert.equal(dept.totalResources, 1);
  assert.equal(dept.percentage, 100);

  const overall = calculateOverallProgress(sampleResources, ['s1', 's2', 's3']);
  assert.equal(overall.completed, 3);
  assert.equal(overall.total, 4);
  assert.equal(overall.percentage, 75);
  assert.equal(overall.completedResources, 1);
  assert.equal(overall.totalResources, 2);
});

test('toggleStepCompletion adds and removes step ids cleanly', () => {
  const added = toggleStepCompletion(['s1'], 's2');
  assert.deepEqual(added, ['s1', 's2']);
  const removed = toggleStepCompletion(added, 's1');
  assert.deepEqual(removed, ['s2']);
});

test('buildSampleDownloadPayload formats JSON and Markdown sample artifacts', () => {
  const jsonOut = buildSampleDownloadPayload(sampleResources[0], sampleResources[0].downloads[0]);
  const parsed = JSON.parse(jsonOut);
  assert.equal(parsed.entity, 'Proposal');
  assert.equal(parsed.resourceTitle, 'Client Proposal & Invoice Portal');

  const mdOut = buildSampleDownloadPayload(sampleResources[1], sampleResources[1].downloads[0]);
  assert.ok(mdOut.includes('AI FOUNDRY — Prototype Sample Artifact'));
  assert.ok(mdOut.includes('# Webhook Setup'));
});
