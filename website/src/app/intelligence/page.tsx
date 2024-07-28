import Link from 'next/link';
import { PILLARS } from '@/lib/content';

export const metadata = { title: 'Local Intelligence — KA3L' };

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

export default function IntelligencePage() {
  const pillar = PILLARS[0];

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: 'var(--bg-deep)' }}>

      {/* HERO */}
      <div style={{ padding: '4rem 2rem 3rem', maxWidth: '900px', margin: '0 auto' }}>
        <p className="text-label" style={{ marginBottom: '1rem' }}>01 — LOCAL INTELLIGENCE</p>
        <div style={{ width: '2rem', height: '2px', background: 'var(--accent)', marginBottom: '1.5rem' }} />
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
          The machine knows itself.
        </h1>
        <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
          Not the internet. Not the world. Itself.
        </p>
      </div>

      {/* Section: What it means */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>What it means</h2>
          </div>
          <p style={{ maxWidth: '680px', color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '1rem' }}>
            {pillar.detail}
          </p>
        </section>

        {/* Section: The yogi, not the scientist */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>The yogi, not the scientist</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {/* Left box */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', padding: '1.5rem' }}>
              <p className="text-label" style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>GPT / Claude</p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Trained on the breadth of human knowledge. Encyclopedic. Can discuss any topic. Universal scope.
              </p>
            </div>
            {/* Right box */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', padding: '1.5rem' }}>
              <p className="text-label" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>KA3L LOCAL AGENT</p>
              <p style={{ color: 'var(--text-primary)', lineHeight: 1.65 }}>
                Knows its own machine deeply and accurately. Filesystem, hardware, state. No internet required. Machine scope.
              </p>
            </div>
          </div>
          <blockquote style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '1.1rem', lineHeight: 1.7 }}>
            Its first responsibility is to understand and operate its own machine.
          </blockquote>
        </section>
      </div>

      {/* Section: What the agent knows — full-width background */}
      <div style={{ background: 'var(--bg-mid)', padding: '3rem 2rem', marginBottom: '0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <section style={{ marginBottom: '0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>What the agent knows</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0' }}>
              {[
                'Hardware inventory (CPU, GPU, memory, peripherals)',
                'Operating system and kernel state',
                'Filesystem structure and file metadata',
                'Installed software and versions',
                'Local content (photos, documents, music, projects)',
                'Live process state and resource usage',
                'Machine capabilities and their availability',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.65rem 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 600, flexShrink: 0 }}>—</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Section: Local first, externally extensible */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
        <section style={{ marginBottom: '4rem', marginTop: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>Local first, externally extensible</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {/* Offline card */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', padding: '1.5rem' }}>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Offline</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1rem' }}>
                Self-aware. The agent operates using its machine knowledge and local capabilities.
              </p>
              <span className="cap-tag">No internet required</span>
            </div>
            {/* Online card */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderLeft: '3px solid var(--accent)', padding: '1.5rem' }}>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Online</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1rem' }}>
                Expanded intelligence. Optional access to external models and services adds broader reasoning.
              </p>
              <span className="cap-tag">External is optional</span>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
            The machine should not need to ask the internet what software it has installed.
          </p>
        </section>

        {/* Section: Current capabilities */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>Current capabilities</h2>
          </div>
          <div>
            {pillar.capabilities.map((cap) => (
              <div key={cap.name} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderBottom: '1px solid var(--border-light)', padding: '0.75rem 0' }}>
                <span style={{ fontFamily: 'var(--font-geist-mono), monospace', color: 'var(--steel-light)', fontSize: '0.85rem', minWidth: '160px' }}>
                  {cap.name}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1 }}>{cap.description}</span>
                <StatusBadge status={cap.status} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer nav */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', padding: '2rem 0' }}>
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← Back to home
          </Link>
          <Link href="/capabilities" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
            Unified Capability Layer →
          </Link>
        </div>
      </div>

    </div>
  );
}
