import Link from 'next/link';
import { BLACKBOX } from '@/lib/content';

export const metadata = { title: 'BLACKBOX — KA3L' };

export default function BlackboxPage() {
  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: 'var(--bg-deep)' }}>
      {/* HERO */}
      <div
        style={{
          padding: '5rem 2rem 4rem',
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <span className="text-label" style={{ color: 'var(--accent)', letterSpacing: '0.2em' }}>
          THE BACKBONE ARCHITECTURE
        </span>
        <h1
          style={{
            fontSize: 'clamp(3.5rem, 9vw, 7rem)',
            fontWeight: 800,
            letterSpacing: '0.04em',
            lineHeight: 1,
            color: 'var(--text-primary)',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          BLACKBOX
        </h1>
        <div
          style={{
            height: '2px',
            width: '6rem',
            background: 'var(--accent)',
            margin: '0 auto 1.5rem',
          }}
        />
        <p
          style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
            fontStyle: 'italic',
            color: 'var(--text-secondary)',
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          {BLACKBOX.tagline}
        </p>

        <div style={{ marginTop: '2rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '0.75rem',
              color: 'var(--accent)',
              border: '1px solid var(--accent-dim)',
              padding: '0.35rem 0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'var(--bg-surface)',
            }}
          >
            ⬡ {BLACKBOX.status}
          </span>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        {/* Section: What it is */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>
              Independent Trust Boundary
            </h2>
          </div>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              fontSize: '1.05rem',
              marginBottom: '1.5rem',
            }}
          >
            {BLACKBOX.description}
          </p>
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              borderLeft: '4px solid var(--accent)',
              padding: '1.5rem',
              color: 'var(--text-primary)',
              lineHeight: 1.7,
            }}
          >
            <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              The Core Problem of Modern OS Security
            </strong>
            The operating system controls its own execution and kernel privilege boundaries. If the primary OS or an agent with elevated privileges is compromised, every audit record and security check running within that OS is inherently untrusted. BLACKBOX removes the root of trust from software alone.
          </div>
        </section>

        {/* Section: Architectural Positioning */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>
              Architectural Position
            </h2>
          </div>
          <pre
            style={{
              background: 'var(--bg-mid)',
              border: '1px solid var(--border-light)',
              padding: '2rem',
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '0.8rem',
              color: 'var(--steel-light)',
              overflowX: 'auto',
              lineHeight: 1.8,
            }}
          >
{`  ┌────────────────────────────────────────────────────────┐
  │                    KA3L HOST SYSTEM                     │
  │                                                        │
  │   [ Intent & Agent Layer ] → [ Unified Capability ]    │
  │                                    │                   │
  │                              Policy Evaluation         │
  │                                    │                   │
  │                             [ Execution Engine ]       │
  │                                    │                   │
  │                             Linux Kernel / HW          │
  └────────────────────────────────────┬───────────────────┘
                                       │ 
                     Hardware Telemetry & Veto Bus
                                       │
  ╔════════════════════════════════════▼═══════════════════╗
  ║                 BLACKBOX MODULE                        ║
  ║                                                        ║
  ║  • Isolated Co-Processor & Tamper-Evident Storage     ║
  ║  • Independent Hardware Activity Observer              ║
  ║  • Hardware Veto Interlock: can kill unauthorized task ║
  ║  • Immutable Cryptographic Audit Log                   ║
  ╚════════════════════════════════════════════════════════╝`}
          </pre>
        </section>

        {/* Section: Core Principles */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>
              Core Principles
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {BLACKBOX.principles.map((principle, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono), monospace',
                    color: 'var(--accent)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    minWidth: '1.5rem',
                  }}
                >
                  0{index + 1}
                </span>
                <span style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  {principle}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Roadmap & Progression */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>
              Implementation Path
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', padding: '1.5rem' }}>
              <div className="text-label" style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>PHASE 1 (ACTIVE)</div>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                Software Enforcement
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                Strict software authorization boundaries, capability schemas, policy engine verification, and append-only audit trail inside <code>ka3ld</code>.
              </p>
            </div>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', padding: '1.5rem' }}>
              <div className="text-label" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>PHASE 2</div>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                Isolated Secure Enclave
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                Execution of audit evaluation inside a hardware-isolated environment (TPM / ARM TrustZone / RISC-V enclave) separate from main OS userspace.
              </p>
            </div>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', padding: '1.5rem' }}>
              <div className="text-label" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>PHASE 3</div>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                Dedicated Hardware Peripheral
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                Physical BLACKBOX hardware device over secure serial/PCIe/USB bus with independent power, flash storage, and physical veto interlock.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation back / forward */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--border-light)',
            paddingTop: '2rem',
          }}
        >
          <Link href="/capabilities" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← Unified Capabilities
          </Link>
          <Link href="/architecture" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
            Full Architecture →
          </Link>
        </div>
      </div>
    </div>
  );
}

