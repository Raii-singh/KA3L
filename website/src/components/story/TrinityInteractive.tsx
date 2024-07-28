'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TrinityInteractive() {
  const [selectedPillar, setSelectedPillar] = useState<'intelligence' | 'capabilities' | 'blackbox'>('intelligence');

  const contentMap = {
    intelligence: {
      num: '01',
      title: 'Local Intelligence',
      tagline: 'The Introspective Mind',
      role: 'Self-Awareness',
      desc: 'The machine is aware of its own physical and logical existence. It knows its CPU topology, GPU memory buffers, storage partitions, installed compilers, and user files. It does not look outward to California servers to understand what is on its own hard drive.',
      specs: [
        'Boot-time hardware & inode indexing',
        'Offline semantic vector search of local assets',
        'Kernel state & active cgroup monitoring',
        'Zero telemetry exfiltration',
      ],
      link: '/intelligence',
      linkText: 'Explore Local Intelligence Spec →',
    },
    capabilities: {
      num: '02',
      title: 'Unified Capability Layer',
      tagline: 'The Structured Nervous System',
      role: 'Machine-Native Interfaces',
      desc: 'Replaces human-centric GUI clicking and fragmented shell scripts with typed, discoverable machine capabilities. Whether a request originates from an on-device agent, a developer CLI, a mobile phone, or a remote peer node, it targets the exact same capability schema.',
      specs: [
        'Strict JSON/Protobuf typed interfaces',
        'Automatic capability discovery protocol',
        'Unified privilege & policy evaluation',
        'Native lifecycle management for containers',
      ],
      link: '/capabilities',
      linkText: 'Explore Capability Layer Spec →',
    },
    blackbox: {
      num: '03',
      title: 'BLACKBOX (The Backbone)',
      tagline: 'The Independent Hardware Veto',
      role: 'Root of Trust',
      desc: 'The critical backbone of the architecture. An isolated hardware co-processor operating completely outside the primary OS trust boundary. If the host kernel is rooted or an agent becomes malicious, BLACKBOX observes the physical bus, maintains tamper-evident audit logs, and can pull the plug on rogue operations.',
      specs: [
        'Physically isolated execution environment',
        'Hardware interlock with execution veto authority',
        'Cryptographically immutable audit append-bus',
        'Cannot be bypassed by software or kernel rootkits',
      ],
      link: '/blackbox',
      linkText: 'Explore BLACKBOX Hardware Spec →',
    },
  };

  const active = contentMap[selectedPillar];

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
      {/* 3 Pillar Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        {(['intelligence', 'capabilities', 'blackbox'] as const).map((key) => {
          const item = contentMap[key];
          const isSelected = selectedPillar === key;
          const isBlackbox = key === 'blackbox';
          return (
            <button
              key={key}
              onClick={() => setSelectedPillar(key)}
              style={{
                padding: '1.25rem 1rem',
                background: isSelected ? 'rgba(255, 255, 255, 0.07)' : 'transparent',
                border: 'none',
                borderBottom: isSelected ? '3px solid var(--accent)' : '3px solid transparent',
                borderRight: key !== 'blackbox' ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                backdropFilter: isSelected ? 'blur(16px)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono), monospace',
                    fontSize: '0.75rem',
                    color: isSelected ? 'var(--accent)' : 'var(--text-muted)',
                    fontWeight: 700,
                  }}
                >
                  {item.num}
                </span>
                {isBlackbox && (
                  <span
                    style={{
                      fontSize: '0.65rem',
                      color: 'var(--accent)',
                      background: 'rgba(192, 57, 43, 0.15)',
                      border: '1px solid rgba(192, 57, 43, 0.4)',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-geist-mono), monospace',
                      fontWeight: 700,
                    }}
                  >
                    BACKBONE
                  </span>
                )}
              </div>
              <div
                style={{
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}
              >
                {item.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Pane */}
      <div style={{ padding: '2.5rem', background: 'transparent' }}>
        <div style={{ maxWidth: '880px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: '1.2rem',
                color: 'var(--accent)',
                fontWeight: 700,
              }}
            >
              {active.num}
            </span>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, color: '#ffffff' }}>
              {active.title}
            </h3>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
              — {active.tagline}
            </span>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {active.desc}
          </p>

          {/* Specs list */}
          <div
            style={{
              marginTop: '2rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
            }}
          >
            {active.specs.map((spec, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.035)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                }}
              >
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>•</span>
                <span style={{ color: '#ffffff', fontSize: '0.85rem' }}>{spec}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <Link
              href={active.link}
              style={{
                color: 'var(--accent)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              {active.linkText}
            </Link>

            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono), monospace' }}>
              Pillar {active.num} of 03 • Integral to KA3L Specification
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
