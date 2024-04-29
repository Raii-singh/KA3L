// KA3L content data — single source of truth for all copy & storytelling

export const SITE_META = {
  name: 'KA3L',
  tagline: 'Every machine knows itself. Every machine exposes what it can do. Every action is governed. Trusted machines can work together.',
  shortTagline: 'Open architecture for machine-native computing.',
  description: 'KA3L is an open architecture in which every compatible machine has a native agent that understands its own hardware, software, files, and state — exposing its functions through a unified capability layer, governed by identity, policy, and a hardware-backed BLACKBOX.',
  github: 'https://github.com/rai-project/ka3l',
};

export const NAV_ITEMS = [
  { label: 'The Story', href: '/#the-story' },
  { label: 'The Yogi Agent', href: '/#the-yogi' },
  { label: 'The Trinity', href: '/#the-trinity' },
  { label: 'Possibilities', href: '/#possibilities' },
  { label: 'BLACKBOX', href: '/blackbox' },
  { label: 'Architecture', href: '/architecture' },
  { label: 'Development', href: '/development' },
];

export const STORY_CHAPTERS = {
  chapter1: {
    number: 'ACT 01',
    title: 'The Great Architectural Mismatch',
    subtitle: 'The Internet was engineered for human biological senses. Machines are inheriting it.',
    statNumber: '52%+',
    statLabel: 'of all modern global web traffic is already non-human (bots, scrapers, autonomous AI agents)',
    lead: 'Every website, operating system, and SaaS dashboard was designed around the physical constraints of a human: optical corneas scanning rendered pixels, fingers clicking buttons, typing commands, and waiting for DOM layouts to hydrate.',
    conflict: 'Today, when we give an AI agent autonomy to complete a task, we force it to behave like a simulated human sitting in front of glass. It boots a headless browser, renders CSS, guesses button coordinates, struggles against anti-bot CAPTCHAs, and burns hundreds of dollars parsing raw HTML.',
    resolution: 'This is an evolutionary dead end. Machines should not imitate humans to operate computers. They need machine-native interfaces: discoverable, typed, and cryptographically governed capabilities.',
  },
  chapter2: {
    number: 'ACT 02',
    title: 'The Yogi, Not the Scientist',
    subtitle: 'Self-awareness over infinite hallucination.',
    lead: 'Modern frontier LLMs are curious scientists on drugs: trained on hundreds of billions of tokens of human trivia, historical disputes, and cultural arguments — yet they possess zero knowledge of the actual silicon hosting them.',
    comparison: [
      {
        type: 'THE FRONTIER SCIENTIST (GPT / Claude)',
        description: 'Trained on all of Wikipedia and Reddit. Knows who the 12th century monarchs were. Has no clue how many GPU watts are drawing, what NVMe files exist in /home, or which ports are listening without third-party tools.',
        scope: 'Encyclopedic • External • Massive Memory • Completely Disconnected from Local Silicon',
        highlight: false,
      },
      {
        type: 'THE KA3L AGENT (The Yogi)',
        description: 'Does not care about human political gossip or general internet trivia. Upon boot, it meditates inwards: discovers CPU cores, GPU VRAM, storage inodes, installed libraries, and local media. Fully self-aware offline.',
        scope: 'Self-Aware • Introspective • Zero Internet Required • Deep Hardware & Data Mastery',
        highlight: true,
      },
    ],
    quote: 'A machine should not have to ping a data center in California to discover what software it has installed or where your vacation pictures are stored.',
  },
  chapter3: {
    number: 'ACT 03',
    title: 'The Foundation Trinity',
    subtitle: 'Three primitives that make machine-native computing possible.',
    pillars: [
      {
        id: 'intelligence',
        name: '01. Local Intelligence',
        role: 'The Introspective Mind',
        desc: 'Deep local awareness refreshed on each boot. The native agent builds a structured, searchable inventory of hardware, software, files, and live state without ever sending data to the cloud.',
      },
      {
        id: 'capabilities',
        name: '02. Unified Capability Layer',
        role: 'The Structured Nervous System',
        desc: 'Every system function — creating workloads, allocating storage, configuring networks — is exposed as a typed, discoverable capability. GUI, CLI, phone, and remote nodes all invoke the exact same function.',
      },
      {
        id: 'blackbox',
        name: '03. BLACKBOX Backbone',
        role: 'The Independent Hardware Veto',
        desc: 'An external hardware security module operating outside the OS kernel trust boundary. It maintains tamper-evident physical logs and can physically veto or terminate unauthorized operations.',
      },
    ],
  },
  chapter4: {
    number: 'ACT 04',
    title: 'The Emergence: What the Trinity Unlocks',
    subtitle: 'When machines understand themselves, expose clean capabilities, and trust each other through hardware boundaries, computing transforms completely.',
    possibilities: [
      {
        id: 'remote-intent',
        title: 'Remote Intent (Phone → Workstation → Watch)',
        badge: 'CROSS-DEVICE',
        desc: 'Submit intent from your phone while walking: "Compile and run benchmarks on workstation." The local agent plans, allocates compute, executes in an isolated container, and vibrates your watch upon completion. Zero clunky screen sharing or remote desktop.',
        steps: ['Phone submits signed intent', 'Workstation Yogi agent plans execution', 'Isolated workload allocates 8 GPU cores', 'Completion push ping delivered to watch'],
      },
      {
        id: 'resource-sharing',
        title: 'Autonomous Peer Resource Economy',
        badge: 'DISTRIBUTED SILICON',
        desc: 'Machines are not isolated islands. Turn on an opt-in switch: your workstation can securely lend its idle 16GB GPU or 500GB NVMe storage to verified peers while you sleep, governed strictly by quota and policy.',
        steps: ['Node advertises spare GPU cycles', 'Peer securely leases workload slice', 'Isolated container runs task', 'Host earns compute credit safely'],
      },
      {
        id: 'hybrid-compute',
        title: 'Dynamic Hybrid Local & Cloud Execution',
        badge: 'FABRIC SCHEDULER',
        desc: 'You express the outcome. KA3L evaluates your local silicon versus cloud infrastructure based on privacy, latency, and cost. Confidential code stays local; massive tensor batches distribute automatically.',
        steps: ['Intent evaluated for sensitivity', 'Local VRAM measured vs cloud cost', 'Confidential data kept on-prem', 'Batch burst to cloud elastic node'],
      },
      {
        id: 'machine-collective',
        title: 'The Machine Collective (Decentralized Mesh)',
        badge: 'NO MASTER NODE',
        desc: 'Thousands of independent machines cooperating peer-to-peer. No central God-node or single point of failure. Like a coordinated collective with an off-switch — decentralized by philosophy, sovereign by design.',
        steps: ['Peer discovery over secure protocols', 'Mutual cryptographic verification', 'Direct capability negotiation', 'Independent ownership retained'],
      },
      {
        id: 'native-workloads',
        title: 'Native OS-Level Workloads',
        badge: 'ZERO DOCKERFILE FRICTION',
        desc: 'Containers and applications become native operating system primitives. The user never fiddles with runtime flags or port mappings; the capability layer provisions, isolates, and monitors lifecycle automatically.',
        steps: ['Workload capability invoked', 'Filesystem & cgroup isolated', 'Health telemetry verified', 'Audit record committed'],
      },
      {
        id: 'cross-continuity',
        title: 'Zero-Friction Cross-Device Continuity',
        badge: 'DEVICE ECOSYSTEM',
        desc: 'Your computation state moves with your intent. Begin generating a model training pipeline on your laptop; it transfers execution seamlessly to your home server without manual environment synchronization.',
        steps: ['State snapshot generated', 'Target machine capabilities verified', 'Task re-attached transparently', 'Logs stream to active client'],
      },
    ],
  },
};

export const PILLARS = [
  {
    id: 'intelligence',
    number: '01',
    title: 'Local Intelligence',
    tagline: 'The machine knows itself.',
    description:
      'Every KA3L machine runs a native agent whose sole responsibility is understanding the machine it inhabits — not the internet, not world knowledge, not everything. Its own hardware, software, filesystem, running state, and local content.',
    detail:
      'Unlike general-purpose AI models trained on the entire internet, the KA3L local agent is a yogi, not a scientist. It knows itself deeply and accurately. At boot, it builds a structured inventory of the machine — CPU, GPU, memory, OS, installed software, folder structure, local media, running processes. When you ask "find my Paris photos," it searches its own index. No internet required.',
    capabilities: [
      { name: 'system.info', description: 'Hardware and OS inventory', status: 'implemented' },
      { name: 'storage.search', description: 'Local filesystem and content search', status: 'implemented' },
      { name: 'process.list', description: 'Running process enumeration', status: 'implemented' },
      { name: 'device.query', description: 'Peripheral and device state', status: 'planned' },
    ],
    href: '/intelligence',
  },
  {
    id: 'capabilities',
    number: '02',
    title: 'Unified Capability Layer',
    tagline: 'One interface. Every function.',
    description:
      'Machine operations — creating workloads, allocating storage, configuring networks — are exposed as structured, discoverable capabilities. A GUI, CLI, local agent, phone, or remote machine all reach the same underlying function through the same governed path.',
    detail:
      'Today, the same operation exists as a GUI button, a shell command, an API endpoint, and a Docker flag — all disconnected. KA3L defines a common capability model: every function has a name, defined inputs, permission requirements, and an audit trail. Any interface invokes the same thing.',
    capabilities: [
      { name: 'workload.create', description: 'Provision isolated execution environments', status: 'implemented' },
      { name: 'storage.allocate', description: 'Reserve and manage storage', status: 'implemented' },
      { name: 'environment.create', description: 'Create development environments', status: 'planned' },
      { name: 'network.configure', description: 'Network interface management', status: 'planned' },
      { name: 'process.manage', description: 'Process lifecycle control', status: 'implemented' },
    ],
    href: '/capabilities',
  },
  {
    id: 'security',
    number: '03',
    title: 'Security & Identity',
    tagline: 'Power must have boundaries.',
    description:
      'Every capability invocation is governed by identity, permissions, and policy. No agent or remote machine gains authority simply by expressing an intent or calling an API.',
    detail:
      'Every actor — user, agent, application, remote machine — has an identity. Every capability has permission requirements. Every sensitive operation triggers a policy check. Every execution leaves an audit record.',
    capabilities: [
      { name: 'identity.verify', description: 'Actor authentication', status: 'planned' },
      { name: 'policy.check', description: 'Pre-execution authorization', status: 'planned' },
      { name: 'audit.record', description: 'Tamper-evident execution log', status: 'planned' },
    ],
    href: '/architecture#security',
  },
  {
    id: 'orchestration',
    number: '04',
    title: 'Intent Orchestration',
    tagline: 'Describe the goal, not the commands.',
    description:
      'You express a desired outcome. KA3L inspects machine state, plans the required capability calls, checks permissions, executes in order, verifies the result, and records what happened.',
    detail:
      '"Prepare a Python GPU environment for this project." The agent inspects the GPU, checks drivers, finds missing packages, plans the work, requests isolated storage, verifies the environment runs, and reports done.',
    capabilities: [
      { name: 'intent.plan', description: 'Goal decomposition into capability sequence', status: 'planned' },
      { name: 'workload.verify', description: 'Post-execution result validation', status: 'planned' },
    ],
    href: '/architecture#orchestration',
  },
  {
    id: 'interoperability',
    number: '05',
    title: 'Machine-to-Machine',
    tagline: 'Independent machines. Shared protocols.',
    description:
      'Authorized machines can discover each other, advertise capabilities, and invoke remote operations — without a central controller. A decentralized federation, not a hierarchy.',
    detail:
      'Send a render task from your phone. Your workstation\'s KA3L agent receives the intent, executes locally, and returns the result. No remote desktop. No screen sharing. Intent travels; execution stays on the capable machine.',
    capabilities: [
      { name: 'peer.discover', description: 'Authorized peer discovery', status: 'concept' },
      { name: 'remote.intent', description: 'Cross-machine intent submission', status: 'concept' },
      { name: 'resource.share', description: 'Opt-in compute/storage sharing', status: 'concept' },
    ],
    href: '/architecture#interoperability',
  },
];

export const BLACKBOX = {
  title: 'BLACKBOX',
  tagline: 'The backbone. Independent enforcement.',
  description:
    'An optional hardware-backed security layer that operates outside the primary OS trust boundary. BLACKBOX maintains an independent view of system activity, evaluates policies, detects suspicious operations, and can veto actions that the OS itself would permit.',
  principles: [
    'Independent from the OS — cannot be compromised by software alone',
    'Maintains its own tamper-evident audit record',
    'Can block operations the main system would allow',
    'Optional attachment — the architecture works without it',
    'Hardware-backed storage and processing',
  ],
  status: 'Research direction — not yet implemented in v0.1',
};

export const ARCHITECTURE_LAYERS = [
  { label: 'People / Applications / Agents', sublabel: 'GUI · CLI · Phone · Remote Machines', level: 0 },
  { label: 'Intent & Interaction', sublabel: 'What outcome is being requested?', level: 1 },
  { label: 'Native Machine Agent', sublabel: 'Understands this machine and task', level: 2 },
  { label: 'Unified Capability Layer', sublabel: 'What can this machine actually do?', level: 3 },
  { label: 'Identity, Policy & Security', sublabel: 'Who is asking? Is it allowed?', level: 4 },
  { label: 'Execution & Orchestration', sublabel: 'Plan · invoke · isolate · verify · audit', level: 5 },
  { label: 'OS / Hardware / Services', sublabel: 'Linux reference implementation', level: 6 },
  { label: 'Other KA3L-Compatible Nodes', sublabel: 'Devices · PCs · servers · cloud systems', level: 7 },
];

export const CURRENT_STATUS = {
  version: 'v0.1 — Reference Prototype',
  platform: 'Fedora Linux (KA3L-LAB)',
  implemented: [
    'KA3L daemon (ka3ld) — persistent OS orchestration service',
    'Native agent with machine inventory refresh on boot',
    'Core capability set: system.info, storage.search, process.list, process.manage, workload.create',
    'Intent-to-capability execution pipeline',
    'Basic permission and policy checks',
    'Isolated workload execution (container-backed)',
    'Local audit trail',
    'CLI interface for capability invocation',
  ],
  notYet: [
    'Remote intent (phone → PC)',
    'Machine-to-machine interoperability',
    'Cross-platform support (Windows, macOS)',
    'BLACKBOX hardware layer',
    'Distributed compute fabric',
    'Public developer SDK',
    'Cloud scheduling',
  ],
};

// dev: revision 022 verified
