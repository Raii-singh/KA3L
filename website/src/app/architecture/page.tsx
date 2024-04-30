import Link from 'next/link';
import { PILLARS, BLACKBOX, ARCHITECTURE_LAYERS, SITE_META } from '@/lib/content';

export const metadata = { title: 'Architecture — KA3L' };

export default function ArchitecturePage() {
  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: 'var(--bg-deep)' }}>
      {/* HERO */}
      <div style={{ padding: '4rem 2rem 3rem', maxWidth: '1000px', margin: '0 auto' }}>
        <p className="text-label" style={{ marginBottom: '1rem' }}>SYSTEM BLUEPRINT</p>
        <div style={{ width: '2rem', height: '2px', background: 'var(--accent)', marginBottom: '1.5rem' }} />
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
          }}
        >
          Open Machine Architecture
        </h1>
        <blockquote
          style={{
            borderLeft: '3px solid var(--accent)',
            paddingLeft: '1.5rem',
            color: 'var(--text-secondary)',
            fontStyle: 'italic',
            fontSize: '1.15rem',
            lineHeight: 1.7,
            maxWidth: '800px',
          }}
        >
          {SITE_META.tagline}
        </blockquote>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem 6rem' }}>
        {/* Section: Architectural Layers */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>
              Execution Stack
            </h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '750px' }}>
            Traditional computing forces agents to imitate humans interacting with visual widgets or shell syntax. KA3L establishes a vertical stack where intent translates directly into governed, discoverable capabilities.
          </p>

          <div
            style={{
              background: 'var(--bg-mid)',
              border: '1px solid var(--border-light)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            {ARCHITECTURE_LAYERS.map((layer) => {
              const isCore = layer.level >= 2 && layer.level <= 4;
              return (
                <div
                  key={layer.level}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1.1rem 1.5rem',
                    borderBottom: '1px solid var(--border-light)',
                    background: isCore ? 'var(--bg-surface)' : 'transparent',
                    gap: '1.5rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-geist-mono), monospace',
                      fontSize: '0.75rem',
                      color: isCore ? 'var(--accent)' : 'var(--text-muted)',
                      minWidth: '2.5rem',
                      fontWeight: 600,
                    }}
                  >
                    L{layer.level}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        color: 'var(--text-primary)',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                      }}
                    >
                      {layer.label}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                      {layer.sublabel}
                    </div>
                  </div>
                  {isCore && (
                    <span
                      style={{
                        fontFamily: 'var(--font-geist-mono), monospace',
                        fontSize: '0.65rem',
                        color: 'var(--accent)',
                        border: '1px solid var(--accent-dim)',
                        padding: '0.2rem 0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      KA3L Core
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div
            style={{
              marginTop: '1.5rem',
              padding: '1.25rem 1.5rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              borderLeft: '4px solid var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem', display: 'block' }}>
                Optional Security Bus: BLACKBOX
              </strong>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Independent hardware monitoring and veto authority operates alongside L3, L4, and L5.
              </span>
            </div>
            <Link
              href="/blackbox"
              style={{
                color: 'var(--accent)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-geist-mono), monospace',
              }}
            >
              Examine BLACKBOX →
            </Link>
          </div>
        </section>

        {/* Section: The Pillars */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>
              Foundational Pillars
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                id={pillar.id}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  padding: '2rem',
                  borderRadius: '2px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-geist-mono), monospace',
                      fontSize: '1rem',
                      color: 'var(--accent)',
                      fontWeight: 700,
                    }}
                  >
                    {pillar.number}
                  </span>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600 }}>
                    {pillar.title}
                  </h3>
                </div>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontStyle: 'italic',
                    fontSize: '0.95rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  {pillar.tagline}
                </p>

                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                  {pillar.detail}
                </p>

                {pillar.capabilities && pillar.capabilities.length > 0 && (
                  <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
                    <div className="text-label" style={{ marginBottom: '0.75rem' }}>SAMPLE CAPABILITIES</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {pillar.capabilities.map((cap) => (
                        <span
                          key={cap.name}
                          style={{
                            fontFamily: 'var(--font-geist-mono), monospace',
                            fontSize: '0.75rem',
                            padding: '0.3rem 0.6rem',
                            background: 'var(--bg-mid)',
                            border: '1px solid var(--border-light)',
                            color: 'var(--steel-light)',
                          }}
                        >
                          {cap.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {pillar.href && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <Link
                      href={pillar.href}
                      style={{
                        color: 'var(--accent)',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                      }}
                    >
                      Explore {pillar.title} in detail →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section: What KA3L is NOT */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '2px', background: 'var(--accent)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600, color: 'var(--text-primary)' }}>
              Explicit Architectural Boundaries
            </h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
            To avoid generic AI marketing ambiguity, KA3L defines what it explicitly is not:
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
            }}
          >
            {[
              {
                title: 'Not a General-Knowledge Chatbot',
                desc: 'The native agent does not train on world trivia or internet culture. It is specialized strictly in self-awareness of its own hardware, filesystem, and software.',
              },
              {
                title: 'Not a Linux Replacement',
                desc: 'KA3L does not require replacing existing operating systems. It initiates as a userspace and orchestration architecture above proven OS kernels.',
              },
              {
                title: 'Not a Centralized Master Brain',
                desc: 'No single God-node controls connected machines. Nodes participate as equal, autonomous peers with local ownership, quotas, and discretionary sharing.',
              },
              {
                title: 'Not GUI Screen Scraping',
                desc: 'We reject forcing agents to simulate mouse clicks and OCR visual screens. Operations are invoked through structured, auditable capability schemas.',
              },
              {
                title: 'Not Vaporware Speculation',
                desc: 'The architecture maintains strict honesty: a functional v0.1 Linux reference prototype exists today, while distributed consensus and hardware modules remain roadmapped.',
              },
              {
                title: 'Not a Proprietary Vendor Lock',
                desc: 'KA3L is published as an open computing standard. Any hardware vendor, cloud provider, or OS distribution can implement KA3L conformance.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  padding: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✗</span>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600 }}>{item.title}</h4>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
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
          <Link href="/blackbox" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← BLACKBOX
          </Link>
          <Link href="/development" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
            Development Status →
          </Link>
        </div>
      </div>
    </div>
  );
}


// dev: revision 023 verified
