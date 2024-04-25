import Link from 'next/link';
import { CURRENT_STATUS } from '@/lib/content';

export const metadata = { title: 'Development Status — KA3L' };

const ROADMAP_STEPS = [
  {
    step: '01',
    title: 'Core Prototype (Active)',
    desc: 'Functional ka3ld daemon on Fedora Linux, local inventory agent, basic capability schema, intent parsing, containerized workload execution, and audit logging.',
    status: 'ACTIVE',
  },
  {
    step: '02',
    title: 'KA3L Runtime & OS Specification',
    desc: 'Standardized capability schemas, typed IPC protocols, kernel-level eBPF observation hooks, and policy enforcement engine.',
    status: 'NEXT',
  },
  {
    step: '03',
    title: 'Hardware Boundary Prototype (BLACKBOX v1)',
    desc: 'Offloaded audit recorder running on dedicated micro-controller/enclave with tamper-evident cryptographic log generation.',
    status: 'PLANNED',
  },
  {
    step: '04',
    title: 'Remote Intent & Device Gateway',
    desc: 'End-to-end authenticated intent submission across authenticated client devices (mobile, watch, remote terminal) to host machine.',
    status: 'PLANNED',
  },
  {
    step: '05',
    title: 'Decentralized Machine Federation',
    desc: 'Peer-to-peer capability discovery and discretionary compute/storage sharing across verified independent machines without a central coordinator.',
    status: 'RESEARCH',
  },
  {
    step: '06',
    title: 'Developer SDK & Conformance Suite',
    desc: 'Open specification test suite enabling 3rd-party operating systems and device manufacturers to build KA3L-compatible runtimes.',
    status: 'RESEARCH',
  },
];

export default function DevelopmentPage() {
  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: 'var(--bg-deep)' }}>
      {/* HERO */}
      <div style={{ padding: '4rem 2rem 3rem', maxWidth: '1000px', margin: '0 auto' }}>
        <p className="text-label" style={{ marginBottom: '1rem' }}>ENGINEERING & ROADMAP</p>
        <div style={{ width: '2rem', height: '2px', background: 'var(--accent)', marginBottom: '1.5rem' }} />
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
          }}
        >
          Development Status
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '0.8rem',
              color: 'var(--accent)',
              border: '1px solid var(--accent-dim)',
              padding: '0.3rem 0.8rem',
              background: 'var(--bg-surface)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {CURRENT_STATUS.version}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Reference Host: <strong>{CURRENT_STATUS.platform}</strong>
          </span>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem 6rem' }}>
        {/* Discipline Callout */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderLeft: '4px solid var(--accent)',
            padding: '1.5rem 2rem',
            marginBottom: '4rem',
          }}
        >
          <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
            Engineering Credibility Principle
          </strong>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Ten percent of the full vision built correctly and verified against real system primitives is infinitely more valuable than one hundred percent claimed in speculative slides. KA3L explicitly demarcates what is running software today versus what remains architectural specification.
          </p>
        </div>

        {/* Section: Status Matrix */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>
              Implementation Matrix
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* Implemented */}
            <div
              style={{
                background: 'var(--bg-mid)',
                border: '1px solid var(--border-light)',
                padding: '2rem',
                borderRadius: '2px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                  }}
                />
                <h3
                  style={{
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 700,
                  }}
                >
                  Shipped in v0.1 Prototype
                </h3>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {CURRENT_STATUS.implemented.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid var(--border-light)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Planned */}
            <div
              style={{
                background: 'var(--bg-mid)',
                border: '1px solid var(--border-light)',
                padding: '2rem',
                borderRadius: '2px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--text-muted)',
                  }}
                />
                <h3
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 700,
                  }}
                >
                  Subsequent Milestones
                </h3>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {CURRENT_STATUS.notYet.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid var(--border-light)',
                      color: 'var(--text-muted)',
                      fontSize: '0.875rem',
                      lineHeight: 1.5,
                    }}
                  >
                    <span>○</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Progression Roadmap */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>
              Architecture Progression
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {ROADMAP_STEPS.map((step) => {
              const isActive = step.status === 'ACTIVE';
              return (
                <div
                  key={step.step}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    borderLeft: isActive ? '4px solid var(--accent)' : '1px solid var(--border-light)',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-geist-mono), monospace',
                          color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                        }}
                      >
                        {step.step}
                      </span>
                      <h4
                        style={{
                          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                        }}
                      >
                        {step.title}
                      </h4>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-geist-mono), monospace',
                        fontSize: '0.65rem',
                        color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                        border: '1px solid var(--border-light)',
                        padding: '0.2rem 0.5rem',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {step.status}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: KA3L-LAB Reference Environment */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>
              Laboratory Reference Setup
            </h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Development occurs in the <code>KA3L-LAB</code> isolated Fedora Server environment to ensure system isolation and reproducible kernel behavior without endangering daily driver machines.
          </p>

          <pre
            style={{
              background: 'var(--bg-mid)',
              border: '1px solid var(--border-light)',
              padding: '1.5rem',
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '0.8rem',
              color: 'var(--steel-light)',
              overflowX: 'auto',
              lineHeight: 1.7,
            }}
          >
{`# System Environment Inspection
$ uname -srm
Linux 6.12.x86_64

# Start KA3L Daemon
$ ka3ld --config /etc/ka3l/ka3ld.conf --lab-mode
[INFO] ka3ld initialized: listening on /run/ka3l/daemon.sock
[INFO] Refreshing local machine inventory...
[INFO] Indexed 8 CPU cores, 1x NVIDIA GPU, 32GB RAM, 487GB NVMe storage
[INFO] Loaded 5 capability schemas: system.*, storage.*, workload.*
[INFO] Policy engine: active (strict mode)`}
          </pre>
        </section>

        {/* Footer nav */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--border-light)',
            paddingTop: '2rem',
          }}
        >
          <Link href="/architecture" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← Architecture
          </Link>
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
            Back to Homepage →
          </Link>
        </div>
      </div>
    </div>
  );
}


// dev: revision 019 verified
