'use client';

import dynamic from 'next/dynamic';

const DynamicMachineCollective = dynamic(
  () => import('./MachineCollective3D'),
  {
    ssr: false,
    loading: () => <MachineCollectiveFallback />,
  }
);

function MachineCollectiveFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '520px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0d10',
        border: '1px solid var(--border-light)',
        fontFamily: 'var(--font-geist-mono), monospace',
        color: 'var(--steel-light)',
        borderRadius: '2px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--accent)',
            boxShadow: '0 0 10px rgba(192, 57, 43, 0.8)',
          }}
        />
        <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: '#ffffff', fontWeight: 700 }}>
          CONNECTING MACHINE COLLECTIVE FABRIC...
        </span>
      </div>
      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
        220 DECENTRALIZED SILICON PEERS • ZERO CENTRAL MASTER NODE
      </div>
    </div>
  );
}

export default function MachineCollectiveHero() {
  return <DynamicMachineCollective />;
}

