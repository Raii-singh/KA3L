'use client';

import { useState } from 'react';
import { STORY_CHAPTERS } from '@/lib/content';

export default function PossibilitiesGrid() {
  const [selectedId, setSelectedId] = useState('remote-intent');
  const items = STORY_CHAPTERS.chapter4.possibilities;
  const current = items.find((p) => p.id === selectedId) || items[0];

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
      {/* Selector Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          background: 'rgba(0, 0, 0, 0.25)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {items.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              style={{
                padding: '1.25rem 1rem',
                background: isSelected ? 'rgba(255, 255, 255, 0.07)' : 'transparent',
                border: 'none',
                borderBottom: isSelected ? '3px solid var(--accent)' : '3px solid transparent',
                borderRight: '1px solid rgba(255, 255, 255, 0.06)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                backdropFilter: isSelected ? 'blur(16px)' : 'none',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-geist-mono), monospace',
                  color: isSelected ? 'var(--accent)' : 'var(--text-muted)',
                  marginBottom: '0.3rem',
                  letterSpacing: '0.08em',
                  fontWeight: 600,
                }}
              >
                {item.badge}
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  lineHeight: 1.3,
                }}
              >
                {item.title.split('(')[0].trim()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail Pane with Animated Workflow */}
      <div style={{ padding: '2.5rem', background: 'transparent' }}>
        <div style={{ maxWidth: '940px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontFamily: 'var(--font-geist-mono), monospace',
                color: 'var(--accent)',
                border: '1px solid rgba(192, 57, 43, 0.4)',
                background: 'rgba(192, 57, 43, 0.1)',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                fontWeight: 600,
              }}
            >
              EMERGENT ARCHITECTURE
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Requires: Local Intelligence + Capabilities + BLACKBOX
            </span>
          </div>

          <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
            {current.title}
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            {current.desc}
          </p>

          {/* Workflow Steps Visualizer */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.025)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '1.5rem',
              borderRadius: '16px',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
            }}
          >
            <div
              style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-geist-mono), monospace',
                color: 'var(--text-muted)',
                marginBottom: '1.25rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              System Execution Chain (Zero Human Manual Configuration)
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
              }}
            >
              {current.steps.map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderTop: '2px solid var(--accent)',
                    padding: '1.15rem 1rem',
                    borderRadius: '12px',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 16px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-geist-mono), monospace',
                      fontSize: '0.7rem',
                      color: 'var(--accent)',
                      fontWeight: 700,
                      marginBottom: '0.6rem',
                    }}
                  >
                    PHASE 0{idx + 1}
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// dev: revision 050 verified
