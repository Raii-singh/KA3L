'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: 'Architecture', href: '/architecture' },
    { label: 'Capabilities', href: '/capabilities' },
    { label: 'BLACKBOX', href: '/blackbox' },
    { label: 'Development', href: '/development' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '56px',
        zIndex: 50,
        background: 'rgba(10, 13, 16, 0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2.5rem',
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link
          href="/"
          style={{
            fontWeight: 800,
            letterSpacing: '0.18em',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '1.15rem',
            transition: 'opacity 0.2s ease',
          }}
        >
          KA3L
        </Link>
      </div>

      {/* Primary Links */}
      <div
        style={{
          display: 'flex',
          gap: '1.75rem',
          alignItems: 'center',
        }}
        className="hidden md:flex"
      >
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              color: 'var(--steel-light)',
              textDecoration: 'none',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-geist-mono), monospace',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--steel-light)';
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger Toggle */}
      <button
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMobileOpen((v) => !v)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '6px',
          color: 'var(--text-primary)',
        }}
        className="md:hidden"
      >
        <span style={{ fontSize: '1.2rem' }}>{mobileOpen ? '✕' : '☰'}</span>
      </button>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'absolute',
            top: '56px',
            left: 0,
            right: 0,
            background: 'rgba(10, 13, 16, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-geist-mono), monospace',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

// dev: revision 010 verified
