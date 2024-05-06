'use client';

import { useState } from 'react';

export default function WebMismatchVisualizer() {
  const [activeTab, setActiveTab] = useState<'comparison' | 'metrics'>('comparison');

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
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          background: 'rgba(0, 0, 0, 0.25)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 8px rgba(192, 57, 43, 0.8)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '0.8rem',
              color: '#ffffff',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Architectural Audit: The Machine Operating Paradigm
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('comparison')}
            style={{
              background: activeTab === 'comparison' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              color: activeTab === 'comparison' ? '#ffffff' : 'var(--text-muted)',
              border: '1px solid',
              borderColor: activeTab === 'comparison' ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
              padding: '0.35rem 0.9rem',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-geist-mono), monospace',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
            }}
          >
            Workflow Trace
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            style={{
              background: activeTab === 'metrics' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              color: activeTab === 'metrics' ? '#ffffff' : 'var(--text-muted)',
              border: '1px solid',
              borderColor: activeTab === 'metrics' ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
              padding: '0.35rem 0.9rem',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-geist-mono), monospace',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
            }}
          >
            Efficiency Metrics
          </button>
        </div>
      </div>

      {activeTab === 'comparison' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          }}
        >
          {/* LEFT: TODAY'S BROKEN PARADIGM */}
          <div
            style={{
              padding: '2rem',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(14, 18, 24, 0.35)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--steel-mid)', fontSize: '1rem' }}>✗</span>
              <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Today: The Human Emulation Trap
              </h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              We give an autonomous agent an intent, but force it to pretend to be a human with eyes and hands staring at a glass display.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontFamily: 'var(--font-geist-mono), monospace', fontSize: '0.75rem' }}>
              {[
                { step: '01', text: 'Launch headless Chromium instance (850MB RAM)', status: 'HIGH OVERHEAD' },
                { step: '02', text: 'Download 14MB HTML/JS bundle & wait for React hydrate', status: 'FRAGILE' },
                { step: '03', text: 'OCR visual screen & guess button (x:412, y:882)', status: 'NON-DETERMINISTIC' },
                { step: '04', text: 'Anti-bot Cloudflare challenge intercepted', status: 'TASK FAILED' },
                { step: '05', text: 'Burn 4,800 LLM tokens parsing raw DOM clutter', status: '$0.08 / RUN' },
              ].map((item) => (
                <div
                  key={item.step}
                  style={{
                    padding: '0.8rem 1rem',
                    background: 'rgba(255, 255, 255, 0.035)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{item.step}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', flexShrink: 0 }}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: KA3L MACHINE-NATIVE */}
          <div
            style={{
              padding: '2rem',
              background: 'rgba(192, 57, 43, 0.06)',
              backdropFilter: 'blur(16px)',
              borderLeft: '2px solid rgba(192, 57, 43, 0.6)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--accent)', fontSize: '1rem' }}>✓</span>
              <h3 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                KA3L: Machine-Native Execution
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Machines communicate with machines through structured, typed, discoverable capabilities with cryptographic governance.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontFamily: 'var(--font-geist-mono), monospace', fontSize: '0.75rem' }}>
              {[
                { step: '01', text: 'Receive structured intent schema payload', status: 'ZERO TOKENS WASTED' },
                { step: '02', text: 'Query local capability index (workload.create)', status: 'INSTANT (0.8ms)' },
                { step: '03', text: 'Kernel policy check & identity verification', status: 'STRICT GOVERNANCE' },
                { step: '04', text: 'Spawn isolated cgroup container on local GPU', status: 'DETERMINISTIC' },
                { step: '05', text: 'Cryptographic execution hash committed to audit', status: 'HARDWARE LOGGED' },
              ].map((item) => (
                <div
                  key={item.step}
                  style={{
                    padding: '0.8rem 1rem',
                    background: 'rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(192, 57, 43, 0.25)',
                    borderLeft: '2px solid var(--accent)',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{item.step}</span>
                    <span style={{ color: '#ffffff' }}>{item.text}</span>
                  </div>
                  <span style={{ color: 'var(--accent)', fontSize: '0.65rem', flexShrink: 0, fontWeight: 600 }}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* METRICS TAB */
        <div style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {[
            { metric: 'Task Latency', traditional: '14,200 ms', ka3l: '12 ms', delta: '1180x Faster' },
            { metric: 'Memory Footprint', traditional: '1,200 MB', ka3l: '18 MB', delta: '66x Leaner' },
            { metric: 'DOM / Token Overhead', traditional: '4,800 Tokens', ka3l: '0 Tokens', delta: 'Zero Waste' },
            { metric: 'Reliability Rate', traditional: '41% (flaky DOM)', ka3l: '99.99% (Typed)', delta: 'Deterministic' },
          ].map((item) => (
            <div
              key={item.metric}
              style={{
                background: 'rgba(255, 255, 255, 0.035)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1.5rem',
                borderRadius: '14px',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-geist-mono), monospace', textTransform: 'uppercase' }}>
                {item.metric}
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>DOM SCRAPING</div>
                  <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>{item.traditional}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>KA3L NATIVE</div>
                  <div style={{ fontSize: '1.3rem', color: '#ffffff', fontWeight: 700 }}>{item.ka3l}</div>
                </div>
              </div>
              <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 600 }}>
                {item.delta}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer callout */}
      <div
        style={{
          padding: '1rem 1.5rem',
          background: 'rgba(0, 0, 0, 0.2)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem',
        }}
      >
        <span style={{ color: 'var(--text-secondary)' }}>
          Over 52% of web traffic is non-human. Operating through visual browser widgets is an evolutionary bottleneck.
        </span>
        <span style={{ color: 'var(--steel-light)', fontFamily: 'var(--font-geist-mono), monospace' }}>
          KA3L Capability Standard v0.1
        </span>
      </div>
    </div>
  );
}

// dev: revision 029 verified
