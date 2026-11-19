import type { Department, ResourceItem } from '../types/foundry';

export const HERO_IMAGE_URL =
  '/src/assets/images/hero_foundry_studio_1795095466211.jpg';

export const DEPARTMENTS: Department[] = [
  {
    id: 'ai-coding-lab',
    name: 'AI Coding Lab',
    shortName: 'Coding Lab',
    summary:
      'Structured prompt specs, component briefs, and debugging workflows tailored for non-technical builders.',
    outcome: 'Turn plain-English product ideas into clean, predictable software.',
  },
  {
    id: 'build-library',
    name: 'Build Library',
    shortName: 'Build Library',
    summary:
      'Complete, step-by-step micro-SaaS and client portal blueprints ready to customize and ship.',
    outcome: 'Launch proven software products in a weekend instead of starting blank.',
  },
  {
    id: 'automation-lab',
    name: 'Automation Lab',
    shortName: 'Automation Lab',
    summary:
      'No-code webhook pipelines, CRM routing blueprints, and automated customer onboarding sequences.',
    outcome: 'Eliminate manual busywork across leads, billing notifications, and support.',
  },
  {
    id: 'business-launchpad',
    name: 'Business Launchpad',
    shortName: 'Launchpad',
    summary:
      'Offer validation scripts, transparent pricing matrices, and pre-launch operational checklists.',
    outcome: 'Validate demand before overbuilding and prepare clean business operations.',
  },
  {
    id: 'deployment-academy',
    name: 'Deployment Academy',
    shortName: 'Deployment',
    summary:
      'Plain-language guides for custom domains, SSL certificates, environment secrets, and safe releases.',
    outcome: 'Ship confidently to production without breaking live customer access.',
  },
  {
    id: 'growth-engine',
    name: 'Growth Engine',
    shortName: 'Growth Engine',
    summary:
      'Repeatable acquisition playbooks, cold outreach sequences, and onboarding retention loops.',
    outcome: 'Win your first 25 paying customers with clear, measurable outreach.',
  },
];

export const INITIAL_COMPLETED_STEPS: string[] = [
  'acl-prd-step-1',
  'acl-prd-step-2',
  'bl-invoice-step-1',
];

export const RESOURCES: ResourceItem[] = [
  // ===========================================================================
  // 1. AI CODING LAB
  // ===========================================================================
  {
    id: 'acl-prd-prompt-spec',
    departmentId: 'ai-coding-lab',
    title: 'Plain-English PRD to Build Spec',
    subtitle:
      'Convert a rough product idea into a single structured specification AI coding tools execute reliably.',
    category: 'Prompt Pack',
    difficulty: 'Beginner',
    estimatedTime: '25 min',
    stackLabel: 'Markdown Spec + AI IDE',
    overview:
      'Most non-technical founders get stuck when they ask an AI builder for "a whole SaaS app" in one vague sentence. This 4-part specification template breaks your idea into screens, user actions, data shapes, and edge states so every build pass stays accurate.',
    outcomes: [
      'A one-page product scope with zero technical ambiguity',
      'Explicit screen list and mobile navigation rules',
      'Copy-ready prompt block for Cursor, Windsurf, or Bolt',
    ],
    steps: [
      {
        id: 'acl-prd-step-1',
        title: 'Define the single core job-to-be-done',
        duration: '5 min',
        detail:
          'Write one sentence naming the customer, their painful manual task, and the measurable result your app produces in under 3 minutes.',
      },
      {
        id: 'acl-prd-step-2',
        title: 'List your 3 primary screens and their actions',
        duration: '10 min',
        detail:
          'Keep v1 tight: list only the entry screen, the active workspace screen, and the detail/export view. Defer settings and admin panels until after first revenue.',
        snippet: {
          label: 'Screen Specification Prompt',
          language: 'markdown',
          content: `Build a responsive web app for [TARGET CUSTOMER] that solves [CORE PROBLEM].
Screens required:
1. Overview: shows active projects, quick filter, and primary "Create" action.
2. Workspace: interactive editor/table with instant client-side search.
3. Export View: clean summary and download/share action.
Constraints: mobile-first 390px layout, high-contrast dark UI, no placeholder buttons.`,
        },
      },
      {
        id: 'acl-prd-step-3',
        title: 'Specify empty, loading, and error states upfront',
        duration: '5 min',
        detail:
          'Explicitly instruct your AI coding tool what the user sees when there are zero items or an invalid form submission so broken blank screens never appear.',
      },
      {
        id: 'acl-prd-step-4',
        title: 'Run a 2-minute scope trim before building',
        duration: '5 min',
        detail:
          'Remove any feature that requires third-party OAuth or custom billing in your first weekend test unless customers have already confirmed willingness to pay.',
      },
    ],
    downloads: [
      {
        id: 'dl-prd-template',
        fileName: 'foundry-prd-spec-template.md',
        format: 'MD',
        sizeLabel: '3.2 KB',
        description: 'Fill-in-the-blank PRD specification prompt for AI builders.',
        content: `# AI FOUNDRY — Plain-English PRD Specification\n\n## 1. Product Promise\n- Customer: [Who pays for this?]\n- Painful workflow today: [Spreadsheet / email / manual PDF]\n- Time saved per run: [e.g., 45 minutes]\n\n## 2. Core Screens (Max 3)\n1. Dashboard / List View\n2. Primary Builder / Editor\n3. Share / Export View\n\n## 3. Non-Negotiable Rules\n- Mobile viewport 390px works one-handed\n- All buttons trigger visible state updates\n- Clear inline validation on required fields\n`,
      },
    ],
  },
  {
    id: 'acl-ui-polish-protocol',
    departmentId: 'ai-coding-lab',
    title: 'Design Guardrails for Non-Designers',
    subtitle:
      'Eliminate generic AI templates with exact spacing, typography, and dark-mode contrast instructions.',
    category: 'Playbook',
    difficulty: 'Beginner',
    estimatedTime: '20 min',
    stackLabel: 'Tailwind CSS + UI Prompt',
    overview:
      'Default AI-generated interfaces often suffer from cramped cards, unreadable muted text, and inconsistent button sizing. Drop this visual constitution prompt into your coding session to enforce a clean SaaS layout on the first try.',
    outcomes: [
      'Consistent 60-30-10 dark graphite and accent color balance',
      '44px minimum touch targets for Android and iOS browsers',
      'Clean typography hierarchy without pill clutter',
    ],
    steps: [
      {
        id: 'acl-ui-step-1',
        title: 'Lock in your 2-font pairing and color tokens',
        duration: '5 min',
        detail:
          'Pair Plus Jakarta Sans for headings with DM Sans for body copy, and pair JetBrains Mono for prices, metrics, and code blocks.',
        snippet: {
          label: 'Visual System Prompt Block',
          language: 'text',
          content: `Use a dark graphite palette (#0E1014 canvas, #161920 cards, 1px border rgba(255,255,255,0.08)).
Accent color: electric violet (#7C3AED) strictly for primary actions and active tabs.
Typography: Plus Jakarta Sans headings, DM Sans body, tabular-nums on all metrics.
Mobile ergonomics: 44px minimum button height, zero horizontal scroll at 390px.`,
        },
      },
      {
        id: 'acl-ui-step-2',
        title: 'Audit cards for redundant badges and borders',
        duration: '10 min',
        detail:
          'Replace stacks of colored pill badges on top of cards with a single quiet line of text separated by middots (·).',
      },
      {
        id: 'acl-ui-step-3',
        title: 'Test on a 390px mobile viewport',
        duration: '5 min',
        detail:
          'Verify navigation collapses cleanly, search inputs remain full-width, and primary CTAs stay easy to tap with one thumb.',
      },
    ],
    downloads: [
      {
        id: 'dl-ui-tokens',
        fileName: 'graphite-ui-tokens.json',
        format: 'JSON',
        sizeLabel: '1.8 KB',
        description: 'Color, radius, and typography tokens for Tailwind projects.',
        content: JSON.stringify(
          {
            theme: 'dark-graphite',
            canvas: '#0E1014',
            surface: '#161920',
            surfaceElevated: '#1D212B',
            accentPrimary: '#7C3AED',
            accentSecondary: '#3B82F6',
            textPrimary: '#F3F4F6',
            textSecondary: '#A1A8B8',
          },
          null,
          2
        ),
      },
    ],
  },
  {
    id: 'acl-debug-triage',
    departmentId: 'ai-coding-lab',
    title: 'Zero-Panic Bug Triage Prompts',
    subtitle:
      'Diagnose console errors, broken mobile layouts, and state bugs without reading complex code.',
    category: 'Checklist',
    difficulty: 'Guided',
    estimatedTime: '15 min',
    stackLabel: 'Browser DevTools + Prompts',
    overview:
      'When something breaks, pasting "it does not work" makes AI rewrite working files unnecessarily. Use this structured triage checklist to isolate the exact issue in 60 seconds.',
    outcomes: [
      'Targeted surgical fixes instead of full-file rewrites',
      'Repeatable way to capture console & layout bugs',
    ],
    steps: [
      {
        id: 'acl-dbg-step-1',
        title: 'Describe expected vs. actual behavior in two lines',
        duration: '5 min',
        detail:
          'State what you clicked, what you expected to see, and what appeared instead. Never omit the exact button label.',
      },
      {
        id: 'acl-dbg-step-2',
        title: 'Copy only the first red error line from Console',
        duration: '5 min',
        detail:
          'Subsequent errors are usually ripple effects. Fixing the very first error resolves 80% of cascade failures.',
      },
      {
        id: 'acl-dbg-step-3',
        title: 'Request a surgical edit with regression guard',
        duration: '5 min',
        detail:
          'Instruct your AI tool to change only the broken handler and leave unrelated components untouched.',
      },
    ],
    downloads: [
      {
        id: 'dl-triage-checklist',
        fileName: 'bug-triage-prompts.md',
        format: 'MD',
        sizeLabel: '1.5 KB',
        description: 'Three copy-paste prompts for debugging UI and state issues.',
        content: `# Zero-Panic Bug Triage\n\n1. State what I clicked: [Button/Tab]\n2. Expected result: [What should change]\n3. Actual result: [What happened]\n4. First console error: [Paste line 1]\n\nInstruction: Make the smallest possible surgical fix without refactoring working screens.`,
      },
    ],
  },

  // ===========================================================================
  // 2. BUILD LIBRARY (3 Sample Project Cards!)
  // ===========================================================================
  {
    id: 'bl-invoice-proposal-portal',
    departmentId: 'build-library',
    title: 'Client Proposal & Invoice Portal',
    subtitle:
      'A sleek branded portal for agencies and freelancers to send interactive scopes, track approvals, and export invoices.',
    category: 'Project Blueprint',
    difficulty: 'Beginner',
    estimatedTime: '90 min',
    stackLabel: 'React + Tailwind + JSON Export',
    imageUrl: '/src/assets/images/project_invoice_portal_1795095466400.jpg',
    imageAlt:
      'Laptop on dark stone surface showing a dark-mode client proposal and invoice dashboard',
    overview:
      'Independent consultants lose deals when proposals arrive as clunky attachments. This Build Library blueprint walks you through creating a clean client portal with line-item scopes, status tracking (Draft, Sent, Approved, Paid), and print-ready invoice summaries.',
    outcomes: [
      'Interactive proposal & invoice ledger with tabular pricing totals',
      'Client-facing summary view ready for instant share links',
      'JSON + Markdown export kit for rapid customization',
    ],
    steps: [
      {
        id: 'bl-invoice-step-1',
        title: 'Set up the Proposal & Line-Item data structure',
        duration: '20 min',
        detail:
          'Define client name, project title, milestone line items, due date, and status (Draft, Sent, Approved, Paid). Keep totals computed automatically so manual math mistakes are impossible.',
        snippet: {
          label: 'Sample Proposal Data Schema',
          language: 'json',
          content: `{
  "id": "INV-1042",
  "client": "Northstar Advisory",
  "project": "Q4 Brand & Web Refresh",
  "status": "Sent",
  "dueDate": "2026-12-01",
  "lineItems": [
    { "label": "Discovery & Wireframes", "amount": 1800 },
    { "label": "Production Build & QA", "amount": 2700 }
  ]
}`,
        },
      },
      {
        id: 'bl-invoice-step-2',
        title: 'Build the filterable Invoice Overview table',
        duration: '25 min',
        detail:
          'Render clean rows with status labels, client names, and right-aligned tabular currency totals. Add filter tabs for All, Pending, and Paid.',
      },
      {
        id: 'bl-invoice-step-3',
        title: 'Create the "New Proposal" drawer with live total calculation',
        duration: '25 min',
        detail:
          'Allow founders to add or remove line items dynamically and preview the formatted client view before marking a proposal as Sent.',
      },
      {
        id: 'bl-invoice-step-4',
        title: 'Add print-friendly invoice export and share link copy',
        duration: '20 min',
        detail:
          'Include a one-click "Download Summary" action and clean print styling so clients can save a crisp PDF for their accounting team.',
      },
    ],
    downloads: [
      {
        id: 'dl-invoice-blueprint',
        fileName: 'invoice-portal-blueprint.md',
        format: 'MD',
        sizeLabel: '4.1 KB',
        description: 'Complete build guide, prompts, and component breakdown.',
        content: `# Build Blueprint: Client Proposal & Invoice Portal\n\n## Core Components\n- OverviewMetrics: Total Sent, Pending Revenue, Paid This Month\n- ProposalTable: Searchable + Status-filtered table with tabular-nums\n- ProposalEditorModal: Dynamic line items with live sum\n\n## Customization Ideas\n- Add retainer billing cadence (Monthly / One-Time)\n- Connect Stripe payment link URL per invoice\n`,
      },
      {
        id: 'dl-invoice-seed',
        fileName: 'invoice-portal-seed.json',
        format: 'JSON',
        sizeLabel: '2.4 KB',
        description: 'Realistic starter dataset for proposals and line items.',
        content: JSON.stringify(
          {
            invoices: [
              {
                id: 'INV-1041',
                client: 'Meridian Logistics',
                amount: 4500,
                status: 'Paid',
                dueDate: '2026-11-10',
              },
              {
                id: 'INV-1042',
                client: 'Northstar Advisory',
                amount: 4500,
                status: 'Sent',
                dueDate: '2026-12-01',
              },
              {
                id: 'INV-1043',
                client: 'Kestrel Studio',
                amount: 2250,
                status: 'Draft',
                dueDate: '2026-12-15',
              },
            ],
          },
          null,
          2
        ),
      },
    ],
  },
  {
    id: 'bl-niche-booking-engine',
    departmentId: 'build-library',
    title: 'Niche Service Booking Engine',
    subtitle:
      'A mobile-first appointment scheduler built for local studios, coaches, and specialized service businesses.',
    category: 'Project Blueprint',
    difficulty: 'Guided',
    estimatedTime: '110 min',
    stackLabel: 'React + Calendar State + Webhook',
    imageUrl: '/src/assets/images/project_booking_engine_1795095466846.jpg',
    imageAlt:
      'Dark-bezel tablet showing a dark-mode weekly appointment scheduling calendar grid',
    overview:
      'Generic calendar links feel impersonal and lose local service customers on mobile. This blueprint builds an industry-specific booking flow where visitors pick a service tier, select an available time slot in two taps, and receive an instant confirmation summary.',
    outcomes: [
      'Two-tap mobile time-slot selector built for Android thumb reach',
      'Service duration & deposit rules configured via simple JSON',
      'Booking confirmation webhook payload ready for calendar sync',
    ],
    steps: [
      {
        id: 'bl-book-step-1',
        title: 'Configure service packages and buffer times',
        duration: '20 min',
        detail:
          'Store each service name, duration in minutes, and base price in a clean configuration file so non-technical owners can edit offerings easily.',
      },
      {
        id: 'bl-book-step-2',
        title: 'Build the horizontal day picker & available slot grid',
        duration: '35 min',
        detail:
          'Render 5 upcoming days in a horizontal thumb-friendly strip and display open 30-minute or 60-minute blocks without cramped calendar clutter.',
        snippet: {
          label: 'Booking Slot Generator Prompt',
          language: 'text',
          content: `Create a responsive appointment picker:
- Step 1: Select service card (30 min Consult, 60 min Strategy Session, 90 min Audit)
- Step 2: Horizontal date strip + 2-column grid of available time slots (44px min height)
- Step 3: Name, email, and optional project note with inline validation and instant booking summary.`,
        },
      },
      {
        id: 'bl-book-step-3',
        title: 'Prevent double-booking in local state',
        duration: '25 min',
        detail:
          'Mark confirmed slots as reserved immediately upon booking and provide a reschedule/cancel toggle in the management drawer.',
      },
      {
        id: 'bl-book-step-4',
        title: 'Add webhook trigger for confirmation emails',
        duration: '30 min',
        detail:
          'Emit a structured JSON payload whenever a booking is confirmed so Automation Lab workflows can send SMS or email reminders.',
      },
    ],
    downloads: [
      {
        id: 'dl-booking-guide',
        fileName: 'booking-engine-blueprint.md',
        format: 'MD',
        sizeLabel: '3.8 KB',
        description: 'Full UI layout guide and mobile ergonomics checklist.',
        content: `# Build Blueprint: Niche Service Booking Engine\n\n## Mobile Ergonomics\n- Minimum 44x44px tap targets on all time-slot buttons\n- Sticky confirmation summary bar on mobile\n\n## Included Flows\n1. Service selection\n2. Date & slot availability check\n3. Customer contact validation\n`,
      },
      {
        id: 'dl-booking-config',
        fileName: 'booking-services-sample.json',
        format: 'JSON',
        sizeLabel: '1.6 KB',
        description: 'Sample service catalog and weekday availability hours.',
        content: JSON.stringify(
          {
            timezone: 'America/New_York',
            services: [
              { id: 'consult-30', name: 'Discovery Audit', durationMin: 30, priceUsd: 75 },
              { id: 'session-60', name: 'Deep-Dive Build Session', durationMin: 60, priceUsd: 180 },
            ],
            hours: { start: '09:00', end: '17:00', intervalMin: 30 },
          },
          null,
          2
        ),
      },
    ],
  },
  {
    id: 'bl-client-intake-crm',
    departmentId: 'build-library',
    title: 'Client Intake & Onboarding CRM',
    subtitle:
      'Replace messy email threads with a structured intake pipeline, milestone checklist, and client status tracker.',
    category: 'Project Blueprint',
    difficulty: 'Intermediate',
    estimatedTime: '120 min',
    stackLabel: 'React + Pipeline State + CSV Export',
    imageUrl: '/src/assets/images/project_intake_crm_1795095466276.jpg',
    imageAlt:
      'Desktop monitor on dark desk displaying a structured client intake workflow checklist',
    overview:
      'Service founders often drop the ball right after a client says yes. This Build Library project gives you a focused intake CRM where new clients move cleanly from Intake Submitted -> Kickoff Scheduled -> Assets Received -> Active Delivery.',
    outcomes: [
      'Stage-based client pipeline with instant search and status filter',
      'Per-client onboarding checklist with completion percentage',
      'One-click CSV export for weekly founder reviews',
    ],
    steps: [
      {
        id: 'bl-crm-step-1',
        title: 'Design the 4-stage client onboarding model',
        duration: '20 min',
        detail:
          'Limit pipeline stages to 4 clear operational states so every team member knows the exact next action for each client.',
      },
      {
        id: 'bl-crm-step-2',
        title: 'Build the split-pane client list & milestone checklist',
        duration: '40 min',
        detail:
          'Show clients on the left (or top selector on mobile) and display each client’s checklist, due dates, and owner on the right.',
        snippet: {
          label: 'Checklist Progress Formula',
          language: 'text',
          content: `For each client record:
- checklist: Array<{ id, task, completed, dueDate, assignee }>
- completionPct = Math.round((completedCount / checklist.length) * 100)
Display completionPct with tabular-nums beside client name.`,
        },
      },
      {
        id: 'bl-crm-step-3',
        title: 'Add a quick "Add Client" intake form',
        duration: '30 min',
        detail:
          'Validate company name, primary email, and package tier, then auto-populate the standard 5-step onboarding checklist.',
      },
      {
        id: 'bl-crm-step-4',
        title: 'Wire CSV export for weekly reporting',
        duration: '30 min',
        detail:
          'Generate a clean CSV file containing client name, stage, completion percentage, and target launch date.',
      },
    ],
    downloads: [
      {
        id: 'dl-crm-blueprint',
        fileName: 'intake-crm-blueprint.md',
        format: 'MD',
        sizeLabel: '3.9 KB',
        description: 'Architecture guide and onboarding checklist templates.',
        content: `# Build Blueprint: Client Intake & Onboarding CRM\n\n## Default Onboarding Checklist\n1. Contract signed & deposit logged\n2. Kickoff call scheduled\n3. Brand assets & access credentials collected\n4. First milestone preview delivered\n5. Final sign-off completed\n`,
      },
      {
        id: 'dl-crm-seed',
        fileName: 'intake-crm-clients.json',
        format: 'JSON',
        sizeLabel: '2.0 KB',
        description: 'Sample client pipeline records for immediate testing.',
        content: JSON.stringify(
          {
            clients: [
              { id: 'c1', name: 'Orion Tech', stage: 'Active Delivery', progressPct: 80 },
              { id: 'c2', name: 'Nova Group', stage: 'Assets Received', progressPct: 60 },
              { id: 'c3', name: 'Apex Solutions', stage: 'Kickoff Scheduled', progressPct: 40 },
            ],
          },
          null,
          2
        ),
      },
    ],
  },

  // ===========================================================================
  // 3. AUTOMATION LAB
  // ===========================================================================
  {
    id: 'auto-lead-webhook-pipeline',
    departmentId: 'automation-lab',
    title: 'Lead Capture to CRM Webhook Flow',
    subtitle:
      'Route website inquiries into your tracker, qualify budget fit, and send an instant founder alert.',
    category: 'Automation',
    difficulty: 'Beginner',
    estimatedTime: '35 min',
    stackLabel: 'Webhook + Make / Zapier + Email',
    overview:
      'Manual copy-pasting from contact forms causes slow replies and lost leads. This blueprint connects any landing page form to a clean webhook pipeline that normalizes fields, logs the lead, and triggers a personalized reply within 60 seconds.',
    outcomes: [
      'Zero manual lead entry from website forms',
      'Instant mobile alert when high-fit prospects submit',
    ],
    steps: [
      {
        id: 'auto-lead-step-1',
        title: 'Standardize your form JSON payload',
        duration: '10 min',
        detail:
          'Always send consistent keys: fullName, email, company, budgetTier, and projectSummary.',
        snippet: {
          label: 'Standard Lead Webhook Payload',
          language: 'json',
          content: `{
  "fullName": "Jordan Vance",
  "email": "jordan@company.com",
  "budgetTier": "$2k-$5k",
  "source": "landing-hero",
  "submittedAt": "2026-11-19T14:20:00Z"
}`,
        },
      },
      {
        id: 'auto-lead-step-2',
        title: 'Add email validation and duplicate check',
        duration: '15 min',
        detail:
          'Search existing rows by email before creating a new CRM entry so repeat submissions update the existing lead record.',
      },
      {
        id: 'auto-lead-step-3',
        title: 'Configure instant mobile notification & auto-reply',
        duration: '10 min',
        detail:
          'Send a plain-text confirmation email setting clear expectations ("We review every brief within 1 business day").',
      },
    ],
    downloads: [
      {
        id: 'dl-auto-lead',
        fileName: 'lead-webhook-spec.json',
        format: 'JSON',
        sizeLabel: '1.5 KB',
        description: 'Sample webhook schema and field mapping reference.',
        content: JSON.stringify(
          {
            trigger: 'POST /webhooks/lead-capture',
            requiredFields: ['fullName', 'email', 'projectSummary'],
            actions: ['validateEmail', 'upsertLeadSheet', 'sendFounderNotification'],
          },
          null,
          2
        ),
      },
    ],
  },
  {
    id: 'auto-onboarding-sequence',
    departmentId: 'automation-lab',
    title: 'Zero-Touch Customer Onboarding Flow',
    subtitle:
      'Automatically send welcome instructions, intake forms, and calendar links the moment a customer joins.',
    category: 'Automation',
    difficulty: 'Guided',
    estimatedTime: '45 min',
    stackLabel: 'Trigger Event + Email + Docs',
    overview:
      'First impressions shape churn and refunds. Set up a reliable 3-step onboarding sequence that delivers workspace instructions cleanly without manual founder intervention.',
    outcomes: [
      'Consistent welcome experience for every new customer',
      'Automated Day 3 check-in to catch stalled setups early',
    ],
    steps: [
      {
        id: 'auto-onb-step-1',
        title: 'Draft the Day 0 Welcome & Quickstart email',
        duration: '15 min',
        detail:
          'Keep it under 120 words with one clear link to start their first 15-minute build.',
      },
      {
        id: 'auto-onb-step-2',
        title: 'Create the Day 3 Milestone Check-in',
        duration: '15 min',
        detail:
          'Ask one direct question: "Which department did you start with, and where did you hit friction?"',
      },
      {
        id: 'auto-onb-step-3',
        title: 'Test end-to-end with a sandbox address',
        duration: '15 min',
        detail:
          'Verify link formatting on Android mobile mail apps before turning the automation live.',
      },
    ],
    downloads: [
      {
        id: 'dl-auto-onb',
        fileName: 'onboarding-email-sequence.md',
        format: 'MD',
        sizeLabel: '2.1 KB',
        description: 'Day 0, Day 3, and Day 7 plain-text customer onboarding emails.',
        content: `# Customer Onboarding Sequence\n\n## Email 1 (Immediate)\nSubject: Your AI FOUNDRY workspace is ready\nBody: Start inside AI Coding Lab -> Plain-English PRD to Build Spec (25 min).\n\n## Email 2 (Day 3)\nSubject: Quick check on your first build\nBody: Reply with the 1 screen you are building this week.\n`,
      },
    ],
  },
  {
    id: 'auto-support-triage',
    departmentId: 'automation-lab',
    title: 'Support Inbox Triage & Weekly Digest',
    subtitle:
      'Classify incoming customer questions into Billing, Bug, or Feature Request and summarize weekly trends.',
    category: 'Playbook',
    difficulty: 'Guided',
    estimatedTime: '30 min',
    stackLabel: 'Inbox Filter + Structured Summary',
    overview:
      'Solo founders cannot afford to lose product focus to inbox noise. This workflow labels support threads automatically and compiles a Friday 5-bullet product digest.',
    outcomes: [
      'Clear separation between urgent bugs and feature ideas',
      'Weekly product backlog driven by real user friction',
    ],
    steps: [
      {
        id: 'auto-sup-step-1',
        title: 'Define 3 strict triage buckets',
        duration: '10 min',
        detail:
          'Use only Bug / Access Issue, Billing Question, and Feature Request—never 15 confusing tags.',
      },
      {
        id: 'auto-sup-step-2',
        title: 'Write saved reply snippets for top 5 questions',
        duration: '10 min',
        detail:
          'Draft concise, human replies for password resets, invoice copies, and domain setup questions.',
      },
      {
        id: 'auto-sup-step-3',
        title: 'Schedule a 15-minute Friday pattern review',
        duration: '10 min',
        detail:
          'Pick the #1 recurring friction point each Friday and turn it into next week’s product improvement.',
      },
    ],
    downloads: [
      {
        id: 'dl-auto-sup',
        fileName: 'support-triage-playbook.md',
        format: 'MD',
        sizeLabel: '1.7 KB',
        description: 'Triage categories and saved response templates.',
        content: `# Support Triage Playbook\n\n## Categories\n1. Urgent Access / Bug (Reply < 4 hrs)\n2. Billing / Receipt (Reply < 24 hrs)\n3. Feature Idea (Log to Friday digest)\n`,
      },
    ],
  },

  // ===========================================================================
  // 4. BUSINESS LAUNCHPAD
  // ===========================================================================
  {
    id: 'biz-offer-validation',
    departmentId: 'business-launchpad',
    title: '48-Hour Offer Validation Script',
    subtitle:
      'Confirm people will pay for your product idea using a crisp 1-page pitch before building complex features.',
    category: 'Playbook',
    difficulty: 'Beginner',
    estimatedTime: '40 min',
    stackLabel: 'Customer Discovery + Landing Copy',
    overview:
      'Building in isolation for months is the biggest risk for new founders. Use this structured 48-hour validation script to test your headline, price point, and core promise with 10 real target buyers.',
    outcomes: [
      'Non-leading interview questions that reveal real budget',
      'Clear go/no-go threshold before committing weeks of work',
    ],
    steps: [
      {
        id: 'biz-val-step-1',
        title: 'Write a 3-sentence value hypothesis',
        duration: '10 min',
        detail:
          'Specify who the product is for, what expensive tool or manual spreadsheet it replaces, and the target monthly or one-time price.',
      },
      {
        id: 'biz-val-step-2',
        title: 'Run 5 structured problem-first conversations',
        duration: '20 min',
        detail:
          'Ask how they solved the problem last week—not whether they "like" your idea. Look for workarounds they already pay for.',
      },
      {
        id: 'biz-val-step-3',
        title: 'Test a concrete Founding Member offer',
        duration: '10 min',
        detail:
          'Present a clear early-access price ($29–$79) with a specific delivery date and measure real intent.',
      },
    ],
    downloads: [
      {
        id: 'dl-biz-val',
        fileName: '48h-validation-script.md',
        format: 'MD',
        sizeLabel: '2.3 KB',
        description: 'Outreach messages and 5 discovery questions.',
        content: `# 48-Hour Offer Validation Script\n\n## Core Questions\n1. Walk me through the last time you had to do [task].\n2. Which step took the longest or caused mistakes?\n3. What tools or spreadsheets are you using right now?\n4. If a tool solved that in 5 minutes, what would it replace?\n`,
      },
    ],
  },
  {
    id: 'biz-pricing-architecture',
    departmentId: 'business-launchpad',
    title: 'Founder Pricing & Tier Matrix',
    subtitle:
      'Choose between one-time Founder Editions, retainers, and SaaS tiers with simple unit economics.',
    category: 'Playbook',
    difficulty: 'Beginner',
    estimatedTime: '30 min',
    stackLabel: 'Pricing Strategy + Unit Math',
    overview:
      'Underpricing kills momentum faster than low traffic. Learn why starting with a clean $39–$79 Founder’s Edition or a $29/mo core plan beats complicated 4-tier matrices.',
    outcomes: [
      'Simple 1- or 2-option pricing structure that converts',
      'Clear refund and scope boundaries written in plain English',
    ],
    steps: [
      {
        id: 'biz-prc-step-1',
        title: 'Anchor price to hours saved, not feature count',
        duration: '10 min',
        detail:
          'If your tool saves a freelancer 3 hours a month, a $39 edition pays for itself on day one.',
      },
      {
        id: 'biz-prc-step-2',
        title: 'Eliminate ambiguous checkmark tables',
        duration: '10 min',
        detail:
          'List concrete deliverables (number of blueprints, templates, setup guides) instead of vague adjectives.',
      },
      {
        id: 'biz-prc-step-3',
        title: 'Write a fair, unambiguous terms summary',
        duration: '10 min',
        detail:
          'State clearly what is included today vs. upcoming updates so buyers trust your product immediately.',
      },
    ],
    downloads: [
      {
        id: 'dl-biz-pricing',
        fileName: 'pricing-matrix-worksheet.json',
        format: 'JSON',
        sizeLabel: '1.4 KB',
        description: 'Structured pricing comparison template.',
        content: JSON.stringify(
          {
            recommendedModel: 'Founders Edition One-Time',
            entryPriceUsd: 39,
            breakEvenSalesFor1kGoal: 26,
            deliverables: ['6 Core Playbooks', '3 Project Blueprints', 'Launch Checklists'],
          },
          null,
          2
        ),
      },
    ],
  },
  {
    id: 'biz-launch-readiness',
    departmentId: 'business-launchpad',
    title: 'Pre-Launch Operational Checklist',
    subtitle:
      'Verify terms, privacy notice, support email, and analytics basics before sharing your public link.',
    category: 'Checklist',
    difficulty: 'Beginner',
    estimatedTime: '20 min',
    stackLabel: 'Operations + Compliance Basics',
    overview:
      'A quick final sweep ensuring your product looks credible to paying customers on day one without getting bogged down in premature paperwork.',
    outcomes: [
      'Dedicated support alias and clear contact path',
      'Clean privacy & refund summary linked in footer',
    ],
    steps: [
      {
        id: 'biz-ops-step-1',
        title: 'Set up a dedicated support email address',
        duration: '5 min',
        detail:
          'Route support@yourdomain.com to your primary inbox so customer trust stays high.',
      },
      {
        id: 'biz-ops-step-2',
        title: 'Verify mobile checkout or signup flow end-to-end',
        duration: '10 min',
        detail:
          'Test every link, button, and form field on an actual Android or iOS browser before posting publicly.',
      },
      {
        id: 'biz-ops-step-3',
        title: 'Prepare your Day 1 feedback form',
        duration: '5 min',
        detail:
          'Link a simple 2-question feedback form inside your workspace header.',
      },
    ],
    downloads: [
      {
        id: 'dl-biz-ops',
        fileName: 'launch-readiness-checklist.md',
        format: 'MD',
        sizeLabel: '1.3 KB',
        description: '10-point operational launch verification checklist.',
        content: `# Pre-Launch Checklist\n- [ ] Custom domain resolves over HTTPS\n- [ ] Support email active and tested\n- [ ] Mobile layout verified at 390px width\n- [ ] Pricing and deliverables clearly stated\n`,
      },
    ],
  },

  // ===========================================================================
  // 5. DEPLOYMENT ACADEMY
  // ===========================================================================
  {
    id: 'dep-domain-dns-guide',
    departmentId: 'deployment-academy',
    title: 'Custom Domain, DNS & SSL Setup',
    subtitle:
      'Connect your .com or .ai domain to modern hosting in 15 minutes without breaking email records.',
    category: 'Playbook',
    difficulty: 'Beginner',
    estimatedTime: '25 min',
    stackLabel: 'DNS Records + HTTPS',
    overview:
      'DNS settings intimidate non-technical founders because terminology like A records and CNAMEs feels cryptic. This visual walkthrough explains the exact 2 records you need and how to verify HTTPS.',
    outcomes: [
      'Live HTTPS custom domain with automatic SSL renewal',
      'Zero accidental disruption to existing MX email records',
    ],
    steps: [
      {
        id: 'dep-dns-step-1',
        title: 'Never delete existing MX or TXT email records',
        duration: '5 min',
        detail:
          'Only add or update the root A record (@) and the www CNAME record provided by your host.',
      },
      {
        id: 'dep-dns-step-2',
        title: 'Configure apex (@) and www redirect cleanly',
        duration: '10 min',
        detail:
          'Point @ to your host IP and redirect www -> root domain so visitors never land on mismatched URLs.',
      },
      {
        id: 'dep-dns-step-3',
        title: 'Verify SSL padlock & mobile load speed',
        duration: '10 min',
        detail:
          'Check propagation over cellular data (not just office Wi-Fi) to confirm SSL is live globally.',
      },
    ],
    downloads: [
      {
        id: 'dl-dep-dns',
        fileName: 'dns-setup-cheatsheet.md',
        format: 'MD',
        sizeLabel: '1.6 KB',
        description: 'Plain-English DNS record reference for founders.',
        content: `# DNS Setup Cheat Sheet\n\n- Type A | Name: @ | Value: Host IPv4\n- Type CNAME | Name: www | Value: yourdomain.com\n- Leave MX records untouched to keep email working.\n`,
      },
    ],
  },
  {
    id: 'dep-env-secrets-safety',
    departmentId: 'deployment-academy',
    title: 'Environment Variables & Secrets Safety',
    subtitle:
      'Keep API keys and credentials safely out of browser code and public repositories.',
    category: 'Checklist',
    difficulty: 'Guided',
    estimatedTime: '20 min',
    stackLabel: '.env + Server Proxy Pattern',
    overview:
      'One of the easiest mistakes in AI-assisted coding is pasting a private key inside frontend React files. Follow this 3-step safety checklist before every deployment.',
    outcomes: [
      'Clean separation between public client vars and server secrets',
      'Automated .gitignore verification prior to pushing code',
    ],
    steps: [
      {
        id: 'dep-sec-step-1',
        title: 'Confirm .env is listed in .gitignore',
        duration: '5 min',
        detail:
          'Only .env.example (with placeholder values) should ever exist in version control.',
      },
      {
        id: 'dep-sec-step-2',
        title: 'Keep secret keys strictly on the backend',
        duration: '10 min',
        detail:
          'Any key without a public prefix must only run inside server routes (/api/*), never in client-side src/components.',
      },
      {
        id: 'dep-sec-step-3',
        title: 'Audit build output for leaked strings',
        duration: '5 min',
        detail:
          'Run a production build and confirm no private tokens appear inside the client bundle.',
      },
    ],
    downloads: [
      {
        id: 'dl-dep-env',
        fileName: 'env-safety-checklist.md',
        format: 'MD',
        sizeLabel: '1.2 KB',
        description: 'Pre-deploy secrets hygiene checklist.',
        content: `# Secrets Safety Checklist\n1. .env is gitignored.\n2. .env.example contains placeholder keys only.\n3. Third-party API keys stay behind /api/* server routes.\n`,
      },
    ],
  },
  {
    id: 'dep-release-runbook',
    departmentId: 'deployment-academy',
    title: 'Production Release & Rollback Runbook',
    subtitle:
      'A calm, 10-minute ritual for shipping updates cleanly and rolling back instantly if something breaks.',
    category: 'Checklist',
    difficulty: 'Guided',
    estimatedTime: '15 min',
    stackLabel: 'Build Check + Smoke Test',
    overview:
      'Shipping shouldn’t feel like gambling. Follow this compact release runbook before deploying updates to paying users.',
    outcomes: [
      'Zero broken production builds',
      'Repeatable 3-minute post-deploy smoke test on desktop and Android',
    ],
    steps: [
      {
        id: 'dep-rel-step-1',
        title: 'Run production typecheck and build locally',
        duration: '5 min',
        detail:
          'Execute npm run build before pushing so TypeScript or bundling issues never surprise you in production.',
      },
      {
        id: 'dep-rel-step-2',
        title: 'Test the top 3 user actions on live URL',
        duration: '5 min',
        detail:
          'Verify landing CTA, search filter, and primary form/detail screen immediately after deploy.',
      },
      {
        id: 'dep-rel-step-3',
        title: 'Bookmark one-click rollback in your host dashboard',
        duration: '5 min',
        detail:
          'Know exactly where the "Restore previous deployment" button lives before you ever need it.',
      },
    ],
    downloads: [
      {
        id: 'dl-dep-runbook',
        fileName: 'release-runbook.md',
        format: 'MD',
        sizeLabel: '1.4 KB',
        description: 'Step-by-step release & rollback procedure.',
        content: `# Release Runbook\n- Run npm run build\n- Verify desktop 1440px & mobile 390px\n- Confirm zero console errors\n`,
      },
    ],
  },

  // ===========================================================================
  // 6. GROWTH ENGINE
  // ===========================================================================
  {
    id: 'gro-first-25-customers',
    departmentId: 'growth-engine',
    title: 'First 25 Customers Outreach System',
    subtitle:
      'Direct, zero-spam outreach templates and tracking cadence to close your initial paying cohort.',
    category: 'Playbook',
    difficulty: 'Beginner',
    estimatedTime: '45 min',
    stackLabel: 'Direct Outreach + Daily Cadence',
    overview:
      'Paid ads burn cash when messaging isn’t proven. This system focuses on 20 hyper-targeted founder conversations per week using concrete pain-point teardowns.',
    outcomes: [
      '3 non-pushy outreach scripts tailored to LinkedIn and email',
      'Simple daily 30-minute outreach scoreboard',
    ],
    steps: [
      {
        id: 'gro-25-step-1',
        title: 'Build a clean list of 50 ideal-fit prospects',
        duration: '15 min',
        detail:
          'Pick founders or operators who actively discuss the exact workflow bottleneck your product eliminates.',
      },
      {
        id: 'gro-25-step-2',
        title: 'Send a 60-second Loom or 3-line teardown',
        duration: '20 min',
        detail:
          'Lead by showing one specific improvement to their workflow instead of pitching generic software features.',
        snippet: {
          label: '3-Line Cold Outreach Template',
          language: 'text',
          content: `Hi [Name], noticed [specific workflow observation].
I built a lightweight tool that turns [manual task] into [concrete result] in ~10 minutes.
Happy to send you the link to try on your next client project — worth a quick look?`,
        },
      },
      {
        id: 'gro-25-step-3',
        title: 'Follow up once at Day 4 with a helpful asset',
        duration: '10 min',
        detail:
          'Share a checklist or sample template instead of "just bumping this up".',
      },
    ],
    downloads: [
      {
        id: 'dl-gro-outreach',
        fileName: 'first-25-customers-scripts.md',
        format: 'MD',
        sizeLabel: '2.2 KB',
        description: 'Email, DM, and follow-up templates.',
        content: `# First 25 Customers Outreach\n\n## Template A: Workflow Observation\nKeep under 65 words. Reference one real detail from their site.\n`,
      },
    ],
  },
  {
    id: 'gro-launch-directory-sequence',
    departmentId: 'growth-engine',
    title: 'Product Launch & Directory Sequence',
    subtitle:
      'A coordinated 7-day launch calendar across communities, founder directories, and social channels.',
    category: 'Playbook',
    difficulty: 'Guided',
    estimatedTime: '35 min',
    stackLabel: 'Launch Calendar + Copy Kit',
    overview:
      'Turn launch day into a week-long momentum wave with ready-to-edit screenshots, founder story framing, and community submission timing.',
    outcomes: [
      'Day-by-day 7-day launch checklist',
      'Clean product gallery caption formula',
    ],
    steps: [
      {
        id: 'gro-dir-step-1',
        title: 'Prepare 3 crisp product screenshots without clutter',
        duration: '15 min',
        detail:
          'Capture Hero, Core Workspace, and Output/Export view at 1440px and 390px.',
      },
      {
        id: 'gro-dir-step-2',
        title: 'Write your 1-paragraph Maker Story',
        duration: '10 min',
        detail:
          'Explain why you built it, who it saves time for, and the honest trade-offs in v1.',
      },
      {
        id: 'gro-dir-step-3',
        title: 'Schedule community threads across Tuesday–Thursday',
        duration: '10 min',
        detail:
          'Reply thoughtfully to every single comment within the first 2 hours.',
      },
    ],
    downloads: [
      {
        id: 'dl-gro-launch',
        fileName: '7-day-launch-calendar.json',
        format: 'JSON',
        sizeLabel: '1.5 KB',
        description: 'Structured 7-day launch schedule.',
        content: JSON.stringify(
          {
            day1: 'Soft launch to early waitlist & beta contacts',
            day2: 'Founder community demo post + 90s walkthrough',
            day4: 'Case study breakdown of first user build',
            day7: 'Weekly recap & testimonial capture',
          },
          null,
          2
        ),
      },
    ],
  },
  {
    id: 'gro-retention-loop',
    departmentId: 'growth-engine',
    title: 'Activation & Word-of-Mouth Loop',
    subtitle:
      'Help customers reach their first visible win in 15 minutes so referrals happen naturally.',
    category: 'Checklist',
    difficulty: 'Intermediate',
    estimatedTime: '25 min',
    stackLabel: 'Activation Metrics + Referral Ask',
    overview:
      'Growth compounds when customers finish their first project quickly. Identify your activation milestone and prompt happy users to share what they shipped.',
    outcomes: [
      'Defined "First Win" metric inside your product',
      'Natural post-completion referral prompt',
    ],
    steps: [
      {
        id: 'gro-ret-step-1',
        title: 'Define your product’s 15-minute First Win',
        duration: '10 min',
        detail:
          'Example: generating a proposal, publishing a booking page, or exporting a workflow spec.',
      },
      {
        id: 'gro-ret-step-2',
        title: 'Remove unnecessary setup steps before First Win',
        duration: '10 min',
        detail:
          'Pre-populate sample templates so users edit something real instead of staring at empty forms.',
      },
      {
        id: 'gro-ret-step-3',
        title: 'Ask for a concrete testimonial right after completion',
        duration: '5 min',
        detail:
          'Ask: "What did you build today and how long did it take?"',
      },
    ],
    downloads: [
      {
        id: 'dl-gro-retention',
        fileName: 'activation-loop-checklist.md',
        format: 'MD',
        sizeLabel: '1.4 KB',
        description: 'Activation audit and testimonial prompt questions.',
        content: `# Activation & Referral Checklist\n- First Win reachable in < 15 minutes\n- Pre-loaded realistic sample data\n- Post-milestone testimonial ask\n`,
      },
    ],
  },
];
