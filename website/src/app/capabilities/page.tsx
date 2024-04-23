import Link from 'next/link';
import { PILLARS } from '@/lib/content';

export const metadata = { title: 'Capability Layer — KA3L' };

const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'implemented') {
    return (
      <span style={{ fontSize: '0.65rem', color: 'var(--accent)', border: '1px solid var(--accent-dim)', padding: '0.1rem 0.4rem' }}>
        implemented
      </span>
    );
  }
  if (status === 'planned') {
    return (
      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', border: '1px solid var(--border-light)', padding: '0.1rem 0.4rem' }}>
        planned
      </span>
    );
  }
  return (
    <span style={{ fontSize: '0.65rem', color: 'var(--steel-dark)', border: '1px solid var(--border-light)', padding: '0.1rem 0.4rem' }}>
      concept
    </span>
  );
};

export default function CapabilitiesPage() {
  const intelligencePillar = PILLARS[0];
  const capabilitiesPillar = PILLARS[1];
  const allCapabilities = [...intelligencePillar.capabilities, ...capabilitiesPillar.capabilities];

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: 'var(--bg-deep)' }}>

      {/* HERO */}
      <div style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <p className="text-label" style={{ marginBottom: '1rem' }}>02 — UNIFIED CAPABILITY LAYER</p>
        <div style={{ width: '2rem', height: '2px', background: 'var(--accent)', marginBottom: '1.5rem' }} />
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
          One interface. Every function.
        </h1>
        <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
          The same underlying operation — however you invoke it.
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Section: The problem today */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>The problem today</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            {['A graphical button.', 'A shell command.', 'A Docker flag.'].map((item) => (
              <div key={item} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', padding: '0.75rem 1.25rem', fontFamily: 'var(--font-geist-mono), monospace', fontSize: '0.85rem', color: 'var(--steel-light)' }}>
                {item}
              </div>
            ))}
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.7 }}>
            Three different implementations. Same operation. No shared governance.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            KA3L replaces this with a single capability that all interfaces reach.
          </p>
        </section>

        {/* Section: The KA3L model */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>The KA3L model</h2>
          </div>
          <pre style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', padding: '2rem', fontFamily: 'var(--font-geist-mono), monospace', fontSize: '0.8rem', color: 'var(--steel-light)', overflowX: 'auto', lineHeight: 1.8 }}>
{`  GUI Application      ─┐
  CLI (ka3l shell)     ─┤
  Local Agent          ─┼─→ [ capability.name ] → Policy Check → OS Operation
  Phone (remote)       ─┤                              ↓
  Remote Machine       ─┘                          Audit Record`}
          </pre>
        </section>

        {/* Section: Capability anatomy */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>Capability anatomy</h2>
          </div>
          <div>
            {[
              { label: 'Name', explanation: 'A unique, namespaced identifier. e.g. workload.create' },
              { label: 'Inputs', explanation: 'Defined parameters with types and constraints' },
              { label: 'Permissions', explanation: 'Which identities and roles may invoke it' },
              { label: 'Audit output', explanation: 'What is recorded about every invocation' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid var(--border-light)', padding: '1rem 0', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-geist-mono), monospace', color: 'var(--accent)', fontSize: '0.85rem', minWidth: '120px', flexShrink: 0 }}>
                  {item.label}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                  {item.explanation}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Current capabilities */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>Current capabilities</h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
                <th style={{ textAlign: 'left', padding: '0.75rem 0', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.08em', fontSize: '0.7rem', textTransform: 'uppercase' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.08em', fontSize: '0.7rem', textTransform: 'uppercase' }}>Description</th>
                <th style={{ textAlign: 'right', padding: '0.75rem 0', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.08em', fontSize: '0.7rem', textTransform: 'uppercase' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {allCapabilities.map((cap) => (
                <tr key={cap.name} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '0.75rem 0', fontFamily: 'var(--font-geist-mono), monospace', color: 'var(--steel-light)' }}>
                    {cap.name}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>
                    {cap.description}
                  </td>
                  <td style={{ padding: '0.75rem 0', textAlign: 'right' }}>
                    <StatusBadge status={cap.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Quote */}
        <section style={{ marginBottom: '4rem' }}>
          <blockquote style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '1.15rem', lineHeight: 1.7, maxWidth: '680px' }}>
            Interfaces may differ, but the underlying machine capability must remain consistent.
          </blockquote>
        </section>

        {/* Footer nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', padding: '2rem 0' }}>
          <Link href="/intelligence" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← Local Intelligence
          </Link>
          <Link href="/blackbox" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
            BLACKBOX →
          </Link>
        </div>

      </div>
    </div>
  );
}

// dev: revision 016 verified
