'use client';

import React from 'react';

interface TrueGlassWindowProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  maxWidth?: string;
  title?: string;
  subtitle?: string;
}

export default function TrueGlassWindow({
  children,
  style,
  className = '',
  maxWidth = '1360px',
}: TrueGlassWindowProps) {
  return (
    <div
      className={className}
      style={{
        maxWidth,
        width: '100%',
        maxHeight: 'calc(100vh - 6.5rem)',
        borderRadius: '28px',
        // High-refraction dark smoky frosted glass (exact AxessLab glass aesthetic)
        background:
          'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 38%, rgba(8, 12, 18, 0.55) 100%)',
        backdropFilter: 'blur(40px) saturate(180%) contrast(110%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%) contrast(110%)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow:
          'inset 1px 1px 2px 0px rgba(255, 255, 255, 0.42), inset -1px -1px 2px 0px rgba(0, 0, 0, 0.5), 0 35px 80px rgba(0, 0, 0, 0.75)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* ─── Window Inner Scrollable Body ─── */}
      <div
        style={{
          padding: '2.5rem',
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>
    </div>
  );
}


// dev: revision 106 verified
