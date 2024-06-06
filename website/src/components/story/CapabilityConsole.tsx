'use client';

import { useState } from 'react';

const PRESET_COMMANDS = [
  {
    cmd: 'ka3l intent "Render 4K timeline on workstation GPU & ping watch"',
    output: [
      '[INTENT] Parsed desired outcome: video.render -> target: local_gpu -> notify: user_watch',
      '[DISCOVERY] Located capabilities: workload.create (v1), notification.push (v1)',
      '[POLICY] Identity "rai_mobile_device" verified via ECDSA signature',
      '[SCHEDULER] Allocated NVIDIA RTX 4070 (8GB VRAM) via cgroup container #882',
      '[EXECUTION] 4K render finished in 4.2s (status: 0)',
      '[BLACKBOX] Hardware audit hash recorded: 0x8f2a4e91... [VERIFIED IMMUTABLE]',
      '[NOTIFY] Push notification dispatched to Apple Watch / WearOS: "Task Completed"',
    ],
  },
  {
    cmd: 'ka3l system.info --introspect',
    output: [
      '[YOGI] Host: fedora-ka3l-lab (uptime: 4d 18h)',
      '[SILICON] AMD Ryzen 7 7800X3D (8c/16t) | RTX 4070 (8GB VRAM) | 32GB DDR5',
      '[STORAGE] 487GB NVMe free | 148,290 files indexed in local SQLite FTS5',
      '[NETWORK] Offline mode capable (zero internet dependency for local capabilities)',
      '[DAEMON] ka3ld active on /run/ka3l/socket (version: 0.1.2-alpha)',
    ],
  },
  {
    cmd: 'ka3l blackbox audit --verify',
    output: [
      '[BLACKBOX] Connecting to isolated hardware bus /dev/blackbox0...',
      '[SECURITY] Independent Co-Processor Ping: 0.3ms [AUTHENTIC]',
      '[TAMPER] Hardware flash hash tree: MATCH (12,410 operations logged)',
      '[VETO STATUS] Active interlock armed — zero unauthorized kernel bypasses detected',
      '[TRUST] Hardware Root of Trust verified outside OS kernel memory',
    ],
  },
  {
    cmd: 'ka3l collective status',
    output: [
      '[MESH] Decentralized Machine Collective (Zero Central Coordinator)',
      '[PEERS] 14 verified nodes connected across local/peer overlay',
      '[ADVERTISED] 4x GPU compute nodes, 2x ZFS storage vaults, 8x edge devices',
      '[SHARING] Opt-in compute renting: ACTIVE (Earned 42 compute-credits last 24h)',
    ],
  },
];

export default function CapabilityConsole() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        overflow: 'hidden',
        fontFamily: 'var(--font-geist-mono), monospace',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Console Header */}
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.25)',
          padding: '0.85rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 6px rgba(192, 57, 43, 0.8)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
            ka3l-cli interactive emulator v0.1
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {PRESET_COMMANDS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              style={{
                background: activeIdx === idx ? 'rgba(192, 57, 43, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                color: activeIdx === idx ? '#ffffff' : 'var(--text-muted)',
                border: '1px solid',
                borderColor: activeIdx === idx ? 'rgba(192, 57, 43, 0.5)' : 'rgba(255, 255, 255, 0.08)',
                padding: '0.3rem 0.75rem',
                fontSize: '0.7rem',
                cursor: 'pointer',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
              }}
            >
              Demo 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal View */}
      <div
        style={{
          padding: '1.75rem 2rem',
          minHeight: '220px',
          fontSize: '0.8rem',
          lineHeight: 1.8,
          background: 'rgba(0, 0, 0, 0.15)',
        }}
      >
        <div style={{ color: 'var(--steel-light)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>$</span>
          <span style={{ color: '#ffffff', fontWeight: 600 }}>{PRESET_COMMANDS[activeIdx].cmd}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {PRESET_COMMANDS[activeIdx].output.map((line, i) => {
            const isImportant = line.includes('[BLACKBOX]') || line.includes('[INTENT]') || line.includes('[VERIFIED');
            return (
              <div
                key={i}
                style={{
                  color: isImportant ? '#ffffff' : 'var(--text-secondary)',
                  padding: '0.15rem 0',
                }}
              >
                {line}
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          padding: '0.75rem 1.5rem',
          background: 'rgba(0, 0, 0, 0.25)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>KA3L Intent-to-Execution Pipeline</span>
        <span>Reference Implementation: Fedora Server 44 (KA3L-LAB)</span>
      </div>
    </div>
  );
}

// dev: revision 061 verified
