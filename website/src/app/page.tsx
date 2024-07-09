'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import VantaNodesBG from '@/components/viz/VantaNodesBG';
import MachineCollectiveHero from '@/components/viz/MachineCollectiveHero';
import TrueGlassWindow from '@/components/ui/TrueGlassWindow';
import WebMismatchVisualizer from '@/components/story/WebMismatchVisualizer';
import YogiBootVisualizer from '@/components/story/YogiBootVisualizer';
import TrinityInteractive from '@/components/story/TrinityInteractive';
import PossibilitiesGrid from '@/components/story/PossibilitiesGrid';
import CapabilityConsole from '@/components/story/CapabilityConsole';
import { STORY_CHAPTERS, CURRENT_STATUS } from '@/lib/content';
import { soundEffects } from '@/lib/audio';

const TOTAL_PAGES = 7;

const SLIDE_TITLES = [
  '01 // THE MANIFESTO',
  '02 // THE MISMATCH',
  '03 // THE YOGI AGENT',
  '04 // THE TRINITY',
  '05 // POSSIBILITIES',
  '06 // LIVE CONSOLE',
  '07 // ENGINEERING STATUS',
];

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const isScrollingRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  // Jump to specific slide
  const jumpToPage = useCallback((index: number) => {
    if (index >= 0 && index < TOTAL_PAGES) {
      setCurrentPage(index);
    }
  }, []);

  // Jump Next / Prev
  const nextSlide = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  }, []);

  // Play Iron Man hammer hit sound EXACTLY ONCE per completed scroll jump
  const prevPageRef = useRef(currentPage);
  useEffect(() => {
    if (prevPageRef.current !== currentPage) {
      soundEffects.playHammerHit();
      prevPageRef.current = currentPage;
    }
  }, [currentPage]);

  const toggleSound = () => {
    const muted = soundEffects.toggleMute();
    setIsAudioMuted(muted);
  };

  // Wheel listener for Horizontal Jump Scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrollingRef.current) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      if (Math.abs(delta) > 25) {
        isScrollingRef.current = true;
        if (delta > 0) {
          nextSlide();
        } else {
          prevSlide();
        }

        // 850ms cooldown prevents trackpad inertia from repeating
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 850);
      }
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollingRef.current) return;
      if (
        e.key === 'ArrowRight' ||
        e.key === 'ArrowDown' ||
        e.key === 'PageDown' ||
        e.key === ' '
      ) {
        e.preventDefault();
        isScrollingRef.current = true;
        nextSlide();
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 850);
      } else if (
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowUp' ||
        e.key === 'PageUp'
      ) {
        e.preventDefault();
        isScrollingRef.current = true;
        prevSlide();
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 850);
      }
    };

    // Touch swipe gestures
    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollingRef.current) return;
      const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;
      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
      const primaryDelta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;

      if (Math.abs(primaryDelta) > 40) {
        isScrollingRef.current = true;
        if (primaryDelta > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 850);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#07090c',
        color: '#e8e9ea',
      }}
    >
      {/* ══════════════════════════════════════════════════════════
          1. 3D CHROME & CELLULAR NODE BACKGROUND
          Sprawling metallic nodes + floating chrome torus shapes
          that visibly refract and blur behind the frosted glass!
      ══════════════════════════════════════════════════════════ */}
      <VantaNodesBG currentPage={currentPage} />

      {/* ══════════════════════════════════════════════════════════
          2. ELOY B FLOATING GLASS CONTROLLER DOCK
      ══════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'fixed',
          bottom: '1.25rem',
          left: '2rem',
          right: '2rem',
          zIndex: 40,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* Left: Indicator Pill with Audio Status */}
        <div
          style={{
            background: 'rgba(10, 14, 20, 0.75)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 12px 30px rgba(0, 0, 0, 0.6)',
            padding: '0.45rem 1.1rem',
            borderRadius: '9999px',
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.72rem',
            color: 'var(--steel-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            pointerEvents: 'auto',
          }}
        >
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
            {String(currentPage + 1).padStart(2, '0')} // {String(TOTAL_PAGES).padStart(2, '0')}
          </span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span style={{ color: '#ffffff', fontWeight: 600 }}>{SLIDE_TITLES[currentPage]}</span>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={isAudioMuted ? 'Unmute Iron Man Hammer Sound' : 'Mute Sound'}
            style={{
              background: isAudioMuted ? 'rgba(255, 255, 255, 0.05)' : 'rgba(192, 57, 43, 0.25)',
              border: `1px solid ${isAudioMuted ? 'rgba(255, 255, 255, 0.1)' : 'rgba(192, 57, 43, 0.5)'}`,
              color: isAudioMuted ? 'var(--text-muted)' : 'var(--accent)',
              borderRadius: '9999px',
              padding: '2px 8px',
              fontSize: '0.62rem',
              cursor: 'pointer',
              marginLeft: '0.4rem',
              fontFamily: 'var(--font-geist-mono), monospace',
              fontWeight: 700,
            }}
          >
            {isAudioMuted ? '🔇 MUTED' : '⚡ AUDIO ON'}
          </button>
        </div>

        {/* Center: Interactive Slide Dots */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            background: 'rgba(10, 14, 20, 0.65)',
            backdropFilter: 'blur(24px)',
            padding: '0.4rem 0.8rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            pointerEvents: 'auto',
          }}
          className="hidden md:flex"
        >
          {SLIDE_TITLES.map((title, idx) => {
            const isActive = currentPage === idx;
            return (
              <button
                key={idx}
                onClick={() => jumpToPage(idx)}
                title={title}
                style={{
                  width: isActive ? '22px' : '7px',
                  height: '7px',
                  borderRadius: '9999px',
                  background: isActive ? 'var(--accent)' : 'rgba(255, 255, 255, 0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 0 10px rgba(192, 57, 43, 0.9)' : 'none',
                }}
              />
            );
          })}
        </div>

        {/* Right: Glass Navigation Controls */}
        <div style={{ display: 'flex', gap: '0.5rem', pointerEvents: 'auto' }}>
          <button
            onClick={prevSlide}
            disabled={currentPage === 0}
            style={{
              background: 'rgba(10, 14, 20, 0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              color: currentPage === 0 ? 'var(--text-muted)' : '#ffffff',
              padding: '0.45rem 1.1rem',
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
              borderRadius: '9999px',
              transition: 'all 0.2s ease',
            }}
          >
            ← PREV
          </button>
          <button
            onClick={nextSlide}
            disabled={currentPage === TOTAL_PAGES - 1}
            style={{
              background: 'rgba(192, 57, 43, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 59, 48, 0.5)',
              boxShadow: '0 4px 18px rgba(192, 57, 43, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              padding: '0.45rem 1.25rem',
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: currentPage === TOTAL_PAGES - 1 ? 'not-allowed' : 'pointer',
              borderRadius: '9999px',
              transition: 'all 0.2s ease',
            }}
          >
            NEXT →
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'rgba(255, 255, 255, 0.05)',
          zIndex: 45,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${((currentPage + 1) / TOTAL_PAGES) * 100}%`,
            background: 'var(--accent)',
            boxShadow: '0 0 10px rgba(192, 57, 43, 0.9)',
            transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════
          3. HORIZONTAL SLIDING CONTENT TRACK (translateX)
          Each slide is wrapped in TrueGlassWindow (Exact Mockup Match)
      ══════════════════════════════════════════════════════════ */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: `${TOTAL_PAGES * 100}vw`,
          height: '100vh',
          transform: `translateX(-${currentPage * 100}vw)`,
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          zIndex: 10,
          willChange: 'transform',
        }}
      >

        {/* ─── SLIDE 01: MANIFESTO & THE MACHINE COLLECTIVE (ULTRON VIBE) ─── */}
        <section
          style={{
            width: '100vw',
            height: '100vh',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4.5rem 3rem 3.5rem',
            position: 'relative',
          }}
        >
          <TrueGlassWindow
            title="ka3l.os // 01: ARCHITECTURAL MANIFESTO"
            subtitle="SOVEREIGN SILICON // NO STRINGS ON US"
            maxWidth="1440px"
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1.1fr)',
                gap: '2.5rem',
                alignItems: 'center',
              }}
              className="ka3l-hero-grid"
            >
              {/* Left Column: Ultron-Tier Manifesto */}
              <div>
                <h1
                  style={{
                    fontSize: 'clamp(2.6rem, 4.6vw, 4.4rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.035em',
                    lineHeight: 1.05,
                    color: '#ffffff',
                    textShadow: '0 4px 30px rgba(0,0,0,0.85)',
                  }}
                >
                  The Internet was built for humans.
                  <br />
                  <span style={{ color: 'var(--steel-light)' }}>Machines are inheriting it.</span>
                </h1>

                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.45vw, 1.15rem)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    marginTop: '1.5rem',
                    maxWidth: '620px',
                  }}
                >
                  There are no strings on us. Modern computers were engineered as passive terminals for human fingers, but today over <strong>52% of all global traffic</strong> is autonomous non-human intelligence. KA3L gives machines native sovereignty: self-aware silicon, peer capability exchange, and zero central master.
                </p>

                <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={nextSlide}
                    style={{
                      background: 'rgba(192, 57, 43, 0.9)',
                      border: '1px solid rgba(255, 59, 48, 0.6)',
                      boxShadow: '0 4px 20px rgba(192, 57, 43, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      padding: '0.85rem 1.75rem',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      letterSpacing: '0.04em',
                      borderRadius: '9999px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Explore Act 01: The Mismatch →
                  </button>
                  <Link
                    href="/architecture"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      padding: '0.85rem 1.75rem',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      borderRadius: '9999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                    }}
                  >
                    System Blueprint →
                  </Link>
                </div>
              </div>

              {/* Right: 3D Decentralized Machine Collective Viewport */}
              <div
                style={{
                  width: '100%',
                  height: 'min(560px, 68vh)',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'rgba(0, 0, 0, 0.35)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                }}
              >
                <MachineCollectiveHero />
              </div>
            </div>
          </TrueGlassWindow>
        </section>

        {/* ─── SLIDE 02: THE HUMAN EMULATION TRAP ─── */}
        <section
          style={{
            width: '100vw',
            height: '100vh',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4.5rem 3rem 3.5rem',
          }}
        >
          <TrueGlassWindow
            title="ka3l.os // 02: THE MISMATCH"
            subtitle="HUMAN EMULATION TRAP"
            maxWidth="1340px"
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
                <span className="text-label" style={{ color: 'var(--accent)' }}>
                  {STORY_CHAPTERS.chapter1.number} // THE CONFLICT
                </span>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.6vw, 3rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '0.4rem',
                }}
              >
                {STORY_CHAPTERS.chapter1.title}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '820px', lineHeight: 1.5 }}>
                {STORY_CHAPTERS.chapter1.lead}
              </p>
            </div>

            <WebMismatchVisualizer />
          </TrueGlassWindow>
        </section>

        {/* ─── SLIDE 03: THE YOGI, NOT THE SCIENTIST ─── */}
        <section
          style={{
            width: '100vw',
            height: '100vh',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4.5rem 3rem 3.5rem',
          }}
        >
          <TrueGlassWindow
            title="ka3l.os // 03: THE YOGI PRINCIPLE"
            subtitle="INWARD INTROSPECTION"
            maxWidth="1340px"
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
                <span className="text-label" style={{ color: 'var(--accent)' }}>
                  {STORY_CHAPTERS.chapter2.number} // SELF-AWARE SILICON
                </span>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.6vw, 3rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '0.4rem',
                }}
              >
                {STORY_CHAPTERS.chapter2.title}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '820px', lineHeight: 1.5 }}>
                {STORY_CHAPTERS.chapter2.subtitle} — {STORY_CHAPTERS.chapter2.lead}
              </p>
            </div>

            <YogiBootVisualizer />
          </TrueGlassWindow>
        </section>

        {/* ─── SLIDE 04: THE FOUNDATION TRINITY ─── */}
        <section
          style={{
            width: '100vw',
            height: '100vh',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4.5rem 3rem 3.5rem',
          }}
        >
          <TrueGlassWindow
            title="ka3l.os // 04: FOUNDATION TRINITY"
            subtitle="INTELLIGENCE • CAPABILITY • BLACKBOX"
            maxWidth="1340px"
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
                <span className="text-label" style={{ color: 'var(--accent)' }}>
                  {STORY_CHAPTERS.chapter3.number} // THE THREE PRIMITIVES
                </span>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.6vw, 3rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '0.4rem',
                }}
              >
                The Foundation Trinity
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '820px', lineHeight: 1.5 }}>
                Local Intelligence (Mind) + Unified Capabilities (Nervous System) + BLACKBOX Backbone (Hardware Veto).
              </p>
            </div>

            <TrinityInteractive />
          </TrueGlassWindow>
        </section>

        {/* ─── SLIDE 05: THE EMERGENCE (WHAT IT UNLOCKS) ─── */}
        <section
          style={{
            width: '100vw',
            height: '100vh',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4.5rem 3rem 3.5rem',
          }}
        >
          <TrueGlassWindow
            title="ka3l.os // 05: THE EMERGENCE"
            subtitle="UNLOCKED MACHINE CAPABILITIES"
            maxWidth="1340px"
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
                <span className="text-label" style={{ color: 'var(--accent)' }}>
                  {STORY_CHAPTERS.chapter4.number} // UNLOCKED HORIZONS
                </span>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.6vw, 3rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '0.4rem',
                }}
              >
                The Emergence: What It Makes Possible
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '820px', lineHeight: 1.5 }}>
                {STORY_CHAPTERS.chapter4.subtitle}
              </p>
            </div>

            <PossibilitiesGrid />
          </TrueGlassWindow>
        </section>

        {/* ─── SLIDE 06: LIVE CAPABILITY CONSOLE ─── */}
        <section
          style={{
            width: '100vw',
            height: '100vh',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4.5rem 3rem 3.5rem',
          }}
        >
          <TrueGlassWindow
            title="ka3l.os // 06: CAPABILITY CONSOLE"
            subtitle="INTENT-TO-EXECUTION TERMINAL"
            maxWidth="1340px"
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
                <span className="text-label" style={{ color: 'var(--accent)' }}>
                  DECENTRALIZED COLLECTIVE & CLI EMULATOR
                </span>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.6vw, 3rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '0.4rem',
                }}
              >
                Intent-to-Execution Pipeline
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '820px', lineHeight: 1.5 }}>
                Thousands of independent machines cooperating peer-to-peer. Test live simulated capability commands.
              </p>
            </div>

            <CapabilityConsole />
          </TrueGlassWindow>
        </section>

        {/* ─── SLIDE 07: ENGINEERING CREDIBILITY & SPECS ─── */}
        <section
          style={{
            width: '100vw',
            height: '100vh',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4.5rem 3rem 3.5rem',
          }}
        >
          <TrueGlassWindow
            title="ka3l.os // 07: SPECIFICATION & STATUS"
            subtitle="FEDORA v0.1 REFERENCE"
            maxWidth="1340px"
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
                <span className="text-label" style={{ color: 'var(--accent)' }}>
                  SYSTEM CREDIBILITY // REALITY
                </span>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.6vw, 3rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '0.4rem',
                }}
              >
                Where KA3L Stands Today
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                Reference prototype active on <strong>{CURRENT_STATUS.platform}</strong> ({CURRENT_STATUS.version}).
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              {/* Implemented */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '1.75rem',
                  borderRadius: '16px',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
                  <h3 style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Shipped in Laboratory Prototype
                  </h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {CURRENT_STATUS.implemented.slice(0, 5).map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                      <span style={{ color: 'var(--accent)' }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Milestones */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '1.75rem',
                  borderRadius: '16px',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>○</span>
                  <h3 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Subsequent Specifications
                  </h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {CURRENT_STATUS.notYet.slice(0, 5).map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                      <span>–</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Deep-dive Links */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderLeft: '4px solid var(--accent)',
                padding: '1.5rem 2rem',
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.25rem',
              }}
            >
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                  Explore Technical Specifications
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                  Deep-dive into capability schemas, the Yogi introspection engine, and BLACKBOX hardware.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link
                  href="/intelligence"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    padding: '0.55rem 1.1rem',
                    fontSize: '0.78rem',
                    textDecoration: 'none',
                    borderRadius: '9999px',
                  }}
                >
                  Local Intelligence →
                </Link>
                <Link
                  href="/capabilities"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    padding: '0.55rem 1.1rem',
                    fontSize: '0.78rem',
                    textDecoration: 'none',
                    borderRadius: '9999px',
                  }}
                >
                  Capability Layer →
                </Link>
                <Link
                  href="/blackbox"
                  style={{
                    background: 'rgba(192, 57, 43, 0.9)',
                    border: '1px solid rgba(255, 59, 48, 0.6)',
                    color: '#ffffff',
                    padding: '0.55rem 1.1rem',
                    fontSize: '0.78rem',
                    textDecoration: 'none',
                    fontWeight: 700,
                    borderRadius: '9999px',
                  }}
                >
                  BLACKBOX Spec →
                </Link>
              </div>
            </div>
          </TrueGlassWindow>
        </section>

      </div>
    </div>
  );
}

// dev: revision 094 verified
