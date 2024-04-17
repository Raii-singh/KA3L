import Link from 'next/link';

const FOOTER_LINKS = [
  { label: 'Architecture', href: '/architecture' },
  { label: 'Intelligence', href: '/intelligence' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'BLACKBOX', href: '/blackbox' },
  { label: 'Development', href: '/development' },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--border-light)',
        padding: '3rem 2rem',
      }}
    >
      {/* Row 1 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        {/* Left: brand */}
        <div>
          <span
            style={{
              fontWeight: 800,
              letterSpacing: '0.15em',
              color: 'var(--text-primary)',
              fontSize: '1rem',
            }}
          >
            KA3L
          </span>
          <span
            style={{
              marginLeft: '0.75rem',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              letterSpacing: '0.04em',
            }}
          >
            Open Machine Architecture
          </span>
          <div
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              marginTop: '0.4rem',
              maxWidth: '380px',
            }}
          >
            Machines and AI as first-class operators. Decentralized collective, independent peer nodes, zero central master.
          </div>
        </div>

        {/* Right: links */}
        <nav
          style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
          aria-label="Footer navigation"
        >
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="ka3l-footer-link"
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                transition: 'color 0.15s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Row 2 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          borderTop: '1px solid var(--border-light)',
          paddingTop: '1.5rem',
        }}
      >
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            lineHeight: 1.6,
          }}
        >
          Architecture specification & prototype. Reference implementation: Fedora Linux (KA3L-LAB).
        </p>
        <span
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.7rem',
            color: 'var(--steel-mid)',
          }}
        >
          Strictly No Cloud Lock-in • Cryptographically Governed
        </span>
      </div>
    </footer>
  );
}

// dev: revision 011 verified
