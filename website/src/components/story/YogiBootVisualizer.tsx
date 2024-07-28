'use client';

import { useState } from 'react';

const BOOT_STAGES = [
  {
    step: 1,
    title: 'Silicon & Hardware Discovery',
    command: 'ka3ld::hw_scan()',
    output: [
      'CPU: AMD Ryzen 7 7800X3D (8 Cores, 16 Threads) @ 5.0 GHz',
      'GPU: NVIDIA GeForce RTX 4070 (8192 MB GDDR6X, 5888 CUDA Cores)',
      'MEM: 32768 MB DDR5-6000 ECC Dual-Channel',
      'BUS: PCIe Gen 4 x16 link verified',
    ],
  },
  {
    step: 2,
    title: 'Operating System & Kernel Substrate',
    command: 'ka3ld::os_introspect()',
    output: [
      'OS: Fedora Linux 44 (Server Edition)',
      'KERNEL: Linux 6.12.1-ka3l-custom #1 SMP PREEMPT_DYNAMIC',
      'CGROUPS: Unified cgroup v2 hierarchy active',
      'DAEMON: ka3ld running on PID 412 (listening on /run/ka3l/socket)',
    ],
  },
  {
    step: 3,
    title: 'Local Content & Inode Indexing',
    command: 'ka3ld::storage_index(/home/rai)',
    output: [
      'INDEXED: 148,290 files across 12,410 directories',
      'PROJECTS: 18 Git repos discovered (/home/rai/Projects/*)',
      'LOCAL MEDIA: 4,120 photos tagged with date/EXIF metadata (/Photos/2026/*)',
      'SECURITY: Zero user data transmitted outside local memory',
    ],
  },
  {
    step: 4,
    title: 'Capability Interface Export',
    command: 'ka3ld::export_capabilities()',
    output: [
      'EXPORTED: system.info (v1), workload.create (v1), storage.search (v1)',
      'POLICY: Strict local token verification required for execution',
      'BLACKBOX: Hardware watchdog pinged on /dev/blackbox0 [OK]',
      'STATUS: SELF-AWARENESS COMPLETE (0 bytes sent to internet)',
    ],
  },
];

export default function YogiBootVisualizer() {
  const [activeStep, setActiveStep] = useState(4);
  const [queryInput, setQueryInput] = useState('');
  const [queryResult, setQueryResult] = useState<string | null>(null);

  const handleTestQuery = (query: string) => {
    setQueryInput(query);
    if (query.toLowerCase().includes('paris')) {
      setQueryResult('FOUND: /home/rai/Photos/2026/Paris_Tour/ [142 Photos • 8.4 GB] — Matched by local EXIF GPS & metadata. (Latency: 2.1ms • Network: 0 bytes)');
    } else if (query.toLowerCase().includes('gpu') || query.toLowerCase().includes('hardware')) {
      setQueryResult('HARDWARE: RTX 4070 (8GB VRAM) • 83% VRAM free • CUDA 12.4 active. (Latency: 0.6ms • Network: 0 bytes)');
    } else if (query.toLowerCase().includes('president') || query.toLowerCase().includes('trivia')) {
      setQueryResult('YOGI SCOPE BOUNDARY: General world political trivia is not in local self-awareness. Connect external intelligence module to search public internet.');
    } else {
      setQueryResult(`LOCAL INDEX: Evaluated "${query}" against local file & process registry. Found 3 matching system resources. (Latency: 1.4ms • Offline)`);
    }
  };

  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          padding: '1rem 1.5rem',
          background: 'rgba(0, 0, 0, 0.25)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <span className="text-label" style={{ color: 'var(--accent)' }}>THE YOGI PRINCIPLE</span>
          <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginTop: '0.2rem' }}>
            Machine Self-Awareness on Boot (Zero Internet Required)
          </h4>
        </div>

        {/* Step Selector */}
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {BOOT_STAGES.map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              style={{
                background: activeStep === s.step ? 'rgba(192, 57, 43, 0.9)' : 'rgba(255, 255, 255, 0.06)',
                color: activeStep === s.step ? '#fff' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: activeStep === s.step ? 'rgba(255, 59, 48, 0.6)' : 'rgba(255, 255, 255, 0.08)',
                padding: '0.35rem 0.85rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-geist-mono), monospace',
                cursor: 'pointer',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              Stage 0{s.step}
            </button>
          ))}
        </div>
      </div>

      {/* Main Terminal Body */}
      <div style={{ padding: '1.5rem 2rem', background: 'transparent' }}>
        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>
            $ {BOOT_STAGES[activeStep - 1].command}
          </span>
          <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            STAGE {activeStep} / 4 — {BOOT_STAGES[activeStep - 1].title.toUpperCase()}
          </span>
        </div>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.035)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '1.25rem 1.5rem',
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.8rem',
            color: 'var(--steel-light)',
            lineHeight: 1.8,
            minHeight: '140px',
            borderRadius: '14px',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
          }}
        >
          {BOOT_STAGES[activeStep - 1].output.map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>&gt;</span>
              <span style={{ color: line.includes('COMPLETE') || line.includes('CUDA') ? '#ffffff' : 'var(--steel-light)' }}>
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* Live Yogi Query Sandbox */}
        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Test The Yogi Agent's Introspective Mind:
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono), monospace' }}>
              Offline Query Sandbox
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {['Find pictures from my Paris tour', 'Inspect local GPU VRAM status', 'Who was the 14th US President?'].map((q) => (
              <button
                key={q}
                onClick={() => handleTestQuery(q)}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '0.4rem 0.9rem',
                  color: 'var(--steel-light)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-geist-mono), monospace',
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                }}
              >
                &ldquo;{q}&rdquo;
              </button>
            ))}
          </div>

          {queryResult && (
            <div
              style={{
                background: 'rgba(192, 57, 43, 0.08)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(192, 57, 43, 0.3)',
                borderLeft: '4px solid var(--accent)',
                padding: '1.1rem 1.25rem',
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: '0.8rem',
                color: '#ffffff',
                lineHeight: 1.6,
                borderRadius: '12px',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ color: 'var(--accent)', fontSize: '0.7rem', marginBottom: '0.3rem', fontWeight: 600 }}>
                LOCAL AGENT RESOLUTION (ZERO EXTERNAL HTTP REQUESTS):
              </div>
              {queryResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
