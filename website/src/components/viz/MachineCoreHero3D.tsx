'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface TelemetryPoint {
  label: string;
  sub: string;
  status: 'active' | 'idle' | 'enforcing';
  color: string;
  xPct: number;
  yPct: number;
}

export default function MachineCoreHero3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeMode, setActiveMode] = useState<'normal' | 'intent' | 'inspect' | 'veto'>('normal');
  const [telemetryCoords, setTelemetryCoords] = useState({ x: 142.8, y: -84.2, z: 19.5 });
  const [cycleCount, setCycleCount] = useState(2485);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Trigger pulse function exposed to UI buttons
  const triggerPulseRef = useRef<() => void>(() => {});
  const triggerVetoRef = useRef<() => void>(() => {});
  const triggerInspectRef = useRef<() => void>(() => {});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Root Group for Mouse Parallax
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // --- 2. Central BLACKBOX Core (The Hardware Backbone) ---
    // Dark metallic obsidian inner sphere + pulsing crimson wireframe
    const coreGroup = new THREE.Group();
    rootGroup.add(coreGroup);

    const innerSphereGeo = new THREE.SphereGeometry(2.2, 32, 32);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0x07090c,
      wireframe: false,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    coreGroup.add(innerSphere);

    const coreWireGeo = new THREE.IcosahedronGeometry(2.35, 2);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0xc0392b, // Crimson red
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreWire = new THREE.Mesh(coreWireGeo, coreWireMat);
    coreGroup.add(coreWire);

    // --- 3. 3D Cluster of Interconnected Nodes (MiroFish / Hatch Studio Style) ---
    // 44 Nodes distributed spherically around the core with connecting struts
    const NODE_COUNT = 44;
    const nodePositions: THREE.Vector3[] = [];
    const nodeMeshes: THREE.Mesh[] = [];
    const nodeRoles: Array<'host' | 'workstation' | 'phone' | 'storage' | 'blackbox'> = [];

    const sphereRadius = 4.8;
    const phi = Math.PI * (Math.sqrt(5) - 1); // Golden ratio spiral

    // Materials: Titanium Silver, Warm Copper/Bronze, Tactical Crimson Red (NO BLUE, NO PURPLE)
    const copperMat = new THREE.MeshBasicMaterial({ color: 0xc87d55 }); // Warm copper
    const titaniumMat = new THREE.MeshBasicMaterial({ color: 0xe8e9ea }); // Titanium cold white
    const crimsonMat = new THREE.MeshBasicMaterial({ color: 0xff3b30 }); // Crimson red (host / blackbox)
    const steelMat = new THREE.MeshBasicMaterial({ color: 0x6b7280 }); // Dark steel

    const sphereGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const boxGeo = new THREE.BoxGeometry(0.32, 0.32, 0.32);

    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      // Add controlled jitter for natural organic machine cluster
      const jitter = 0.88 + Math.random() * 0.28;
      const x = Math.cos(theta) * radiusAtY * sphereRadius * jitter;
      const yPos = y * sphereRadius * jitter;
      const z = Math.sin(theta) * radiusAtY * sphereRadius * jitter;

      const pos = new THREE.Vector3(x, yPos, z);
      nodePositions.push(pos);

      let mat = copperMat;
      let role: 'host' | 'workstation' | 'phone' | 'storage' | 'blackbox' = 'workstation';

      if (i === 0) {
        mat = crimsonMat;
        role = 'blackbox';
      } else if (i === 1) {
        mat = crimsonMat;
        role = 'host';
      } else if (i % 4 === 0) {
        mat = titaniumMat;
        role = 'phone';
      } else if (i % 5 === 0) {
        mat = steelMat;
        role = 'storage';
      } else {
        mat = i % 2 === 0 ? copperMat : titaniumMat;
        role = 'workstation';
      }

      nodeRoles.push(role);

      // Mix of spheres and micro-chassis cubes
      const mesh = new THREE.Mesh(i % 3 === 0 ? boxGeo : sphereGeo, mat);
      mesh.position.copy(pos);
      rootGroup.add(mesh);
      nodeMeshes.push(mesh);
    }

    // Connecting Struts / Structural Rods (Hatch Studio & Vanta.NET Style)
    const strutPositions: number[] = [];
    const strutColors: number[] = [];
    const maxLinkDist = 3.6;

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const d = nodePositions[i].distanceTo(nodePositions[j]);
        if (d < maxLinkDist) {
          strutPositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );

          // Alpha fade by distance
          const alpha = 1.0 - d / maxLinkDist;
          const isCrimson = nodeRoles[i] === 'blackbox' || nodeRoles[j] === 'blackbox';
          
          if (isCrimson) {
            strutColors.push(0.9 * alpha, 0.2 * alpha, 0.15 * alpha);
            strutColors.push(0.9 * alpha, 0.2 * alpha, 0.15 * alpha);
          } else {
            strutColors.push(0.4 * alpha, 0.42 * alpha, 0.46 * alpha);
            strutColors.push(0.4 * alpha, 0.42 * alpha, 0.46 * alpha);
          }
        }
      }
    }

    const strutGeo = new THREE.BufferGeometry();
    strutGeo.setAttribute('position', new THREE.Float32BufferAttribute(strutPositions, 3));
    strutGeo.setAttribute('color', new THREE.Float32BufferAttribute(strutColors, 3));

    const strutMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const strutLines = new THREE.LineSegments(strutGeo, strutMat);
    rootGroup.add(strutLines);

    // --- 4. NASA / Vanta.RINGS Concentric Orbital Trajectory Rings ---
    // Multiple 3D tilted orbital rings (thin white and red lines with coordinates)
    const ringsGroup = new THREE.Group();
    rootGroup.add(ringsGroup);

    interface RingData {
      line: THREE.Line;
      radius: number;
      speed: number;
      axis: THREE.Vector3;
    }
    const orbitalRings: RingData[] = [];

    const ringDefs = [
      { radius: 6.2, tiltX: 0.65, tiltY: 0.2, color: 0xff3b30, speed: 0.005, dashed: false }, // Crimson Intent Orbit
      { radius: 7.4, tiltX: -0.45, tiltY: 0.7, color: 0xe8e9ea, speed: -0.0035, dashed: true }, // Titanium Capability Ring
      { radius: 8.6, tiltX: 0.15, tiltY: -0.85, color: 0x6b7280, speed: 0.002, dashed: true }, // Steel Peer Mesh Ring
      { radius: 9.8, tiltX: 1.1, tiltY: 0.35, color: 0xc87d55, speed: -0.0018, dashed: true }, // Copper Telemetry Ring
    ];

    ringDefs.forEach((def) => {
      const pts: THREE.Vector3[] = [];
      const segs = 140;
      for (let s = 0; s <= segs; s++) {
        const angle = (s / segs) * Math.PI * 2;
        if (!def.dashed || (s % 10 < 7)) {
          pts.push(new THREE.Vector3(Math.cos(angle) * def.radius, 0, Math.sin(angle) * def.radius));
        }
      }

      const rGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const rMat = new THREE.LineBasicMaterial({
        color: def.color,
        transparent: true,
        opacity: def.color === 0xff3b30 ? 0.85 : 0.45,
      });
      const rLine = new THREE.Line(rGeo, rMat);
      rLine.rotation.x = def.tiltX;
      rLine.rotation.y = def.tiltY;
      ringsGroup.add(rLine);

      orbitalRings.push({
        line: rLine,
        radius: def.radius,
        speed: def.speed,
        axis: new THREE.Vector3(0, 1, 0),
      });
    });

    // Orbiting Intent Pulse Marker (Bright Crimson Sphere gliding along Ring 1)
    const markerGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0xff3b30 });
    const orbitMarker = new THREE.Mesh(markerGeo, markerMat);
    ringsGroup.add(orbitMarker);

    // Orbiting Capability Marker (Titanium White gliding along Ring 2)
    const marker2Geo = new THREE.SphereGeometry(0.18, 16, 16);
    const marker2Mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const orbitMarker2 = new THREE.Mesh(marker2Geo, marker2Mat);
    ringsGroup.add(orbitMarker2);

    // --- 5. Interactive Particle Surge (For "Pulse Intent" / "Hardware Veto") ---
    const SURGE_COUNT = 30;
    const surgeGeo = new THREE.BufferGeometry();
    const surgePositions = new Float32Array(SURGE_COUNT * 3);
    for (let i = 0; i < SURGE_COUNT * 3; i++) surgePositions[i] = 0;
    surgeGeo.setAttribute('position', new THREE.BufferAttribute(surgePositions, 3));

    const surgeMat = new THREE.PointsMaterial({
      color: 0xff3b30,
      size: 0.35,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const surgePoints = new THREE.Points(surgeGeo, surgeMat);
    rootGroup.add(surgePoints);

    let surgeActive = false;
    let surgeProgress = 0;

    triggerPulseRef.current = () => {
      setActiveMode('intent');
      surgeActive = true;
      surgeProgress = 0;
      surgeMat.opacity = 1;
      surgeMat.color.setHex(0xff3b30);

      // randomize surge directions from center
      const arr = surgeGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < SURGE_COUNT; i++) {
        const targetNode = nodePositions[i % NODE_COUNT];
        arr[i * 3] = targetNode.x * 0.1;
        arr[i * 3 + 1] = targetNode.y * 0.1;
        arr[i * 3 + 2] = targetNode.z * 0.1;
      }
      surgeGeo.attributes.position.needsUpdate = true;

      setTimeout(() => {
        setActiveMode('normal');
        surgeActive = false;
        surgeMat.opacity = 0;
      }, 2500);
    };

    triggerVetoRef.current = () => {
      setActiveMode('veto');
      coreWireMat.color.setHex(0xff0000);
      coreWire.scale.set(1.4, 1.4, 1.4);
      setTimeout(() => {
        coreWire.scale.set(1.0, 1.0, 1.0);
        coreWireMat.color.setHex(0xc0392b);
        setActiveMode('normal');
      }, 2200);
    };

    triggerInspectRef.current = () => {
      setActiveMode('inspect');
      setTimeout(() => {
        setActiveMode('normal');
      }, 3000);
    };

    // --- 6. Mouse Parallax & Telemetry Readout ---
    let targetRotY = 0;
    let targetRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const normX = (clientX / rect.width) * 2 - 1;
      const normY = -(clientY / rect.height) * 2 + 1;

      targetRotY = normX * 0.5;
      targetRotX = -normY * 0.35;

      // Update telemetry HUD coordinates
      setTelemetryCoords({
        x: Number((140 + normX * 25).toFixed(1)),
        y: Number((-80 - normY * 20).toFixed(1)),
        z: Number((19.5 + Math.sin(normX * 3) * 5).toFixed(1)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- 7. Animation Loop ---
    let animId: number;
    let time = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.012;

      // Smooth mouse tilt
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.05;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.05;

      // Constant ambient core rotation
      coreGroup.rotation.y += 0.004;
      coreGroup.rotation.x = Math.sin(time * 0.5) * 0.15;

      // Pulse wireframe opacity
      coreWireMat.opacity = 0.3 + Math.sin(time * 2.5) * 0.18;

      // Rotate nodes subtly
      for (let i = 0; i < NODE_COUNT; i++) {
        nodeMeshes[i].rotation.y += 0.01;
        nodeMeshes[i].rotation.x += 0.006;
      }

      // Rotate Orbital Rings
      orbitalRings.forEach((r, idx) => {
        r.line.rotateOnAxis(r.axis, r.speed);
      });

      // Update Orbiting Marker 1 (Crimson Intent along Ring 1)
      const r1 = ringDefs[0];
      const mAngle = time * 0.8;
      orbitMarker.position.set(
        Math.cos(mAngle) * r1.radius,
        Math.sin(mAngle * 0.5) * 1.5,
        Math.sin(mAngle) * r1.radius
      );
      orbitMarker.rotation.y += 0.02;

      // Update Orbiting Marker 2 (Titanium Capability along Ring 2)
      const r2 = ringDefs[1];
      const m2Angle = -time * 0.6 + Math.PI;
      orbitMarker2.position.set(
        Math.cos(m2Angle) * r2.radius * 0.9,
        Math.cos(m2Angle * 0.8) * 2.0,
        Math.sin(m2Angle) * r2.radius * 0.9
      );

      // Handle Particle Surge Animation
      if (surgeActive) {
        surgeProgress += 0.02;
        const arr = surgeGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < SURGE_COUNT; i++) {
          const target = nodePositions[i % NODE_COUNT];
          arr[i * 3] += (target.x - arr[i * 3]) * 0.08;
          arr[i * 3 + 1] += (target.y - arr[i * 3 + 1]) * 0.08;
          arr[i * 3 + 2] += (target.z - arr[i * 3 + 2]) * 0.08;
        }
        surgeGeo.attributes.position.needsUpdate = true;
      }

      // Camera zoom interpolation for Inspect mode
      const targetCamZ = activeMode === 'inspect' ? 9 : 16;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Cycle counter ticker
    const cycleInterval = setInterval(() => {
      setCycleCount((c) => c + 1);
    }, 1800);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 550;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      clearInterval(cycleInterval);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeMode]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '520px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          cursor: 'grab',
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          MINIMAL GLASS HUD CONTROLS (Clean, Uncluttered, Pure Glass)
      ══════════════════════════════════════════════════════════ */}

      {/* Top Subtle Status Indicator */}
      <div
        style={{
          position: 'absolute',
          top: '1.25rem',
          left: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          fontFamily: 'var(--font-geist-mono), monospace',
          fontSize: '0.68rem',
          color: 'var(--steel-light)',
          letterSpacing: '0.08em',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(18, 22, 28, 0.65)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: activeMode === 'veto' ? '#ff3b30' : '#10b981',
              boxShadow: activeMode === 'veto' ? '0 0 8px #ff3b30' : '0 0 6px #10b981',
            }}
          />
          <span style={{ color: '#ffffff', fontWeight: 600 }}>BLACKBOX 3D CORE</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span style={{ color: 'var(--text-muted)' }}>44 NODES</span>
        </div>

        <div
          style={{
            background: 'rgba(18, 22, 28, 0.65)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            color: 'var(--text-muted)',
            fontSize: '0.65rem',
          }}
        >
          <span>CYCLE {cycleCount}</span>
        </div>
      </div>

      {/* Bottom Glass Action Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          pointerEvents: 'auto',
          fontFamily: 'var(--font-geist-mono), monospace',
        }}
      >
        {/* Coordinates readout */}
        <div
          style={{
            background: 'rgba(18, 22, 28, 0.65)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '0.4rem 0.8rem',
            borderRadius: '6px',
            fontSize: '0.65rem',
            color: 'var(--steel-light)',
            display: 'flex',
            gap: '0.6rem',
          }}
        >
          <span>X: <strong style={{ color: 'var(--accent)' }}>{telemetryCoords.x}</strong></span>
          <span>Y: <strong style={{ color: '#e8e9ea' }}>{telemetryCoords.y}</strong></span>
          <span>Z: <strong style={{ color: '#c87d55' }}>+{telemetryCoords.z}</strong></span>
        </div>

        {/* Action Triggers */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => triggerPulseRef.current()}
            className="glass-button"
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.68rem',
              cursor: 'pointer',
              fontWeight: 600,
              background: activeMode === 'intent' ? 'rgba(192, 57, 43, 0.8)' : undefined,
              borderColor: activeMode === 'intent' ? 'rgba(255, 59, 48, 0.5)' : undefined,
            }}
          >
            ⚡ PULSE INTENT
          </button>

          <button
            onClick={() => triggerInspectRef.current()}
            className="glass-button"
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.68rem',
              cursor: 'pointer',
              fontWeight: 600,
              background: activeMode === 'inspect' ? 'rgba(255, 255, 255, 0.15)' : undefined,
            }}
          >
            🔍 ZOOM
          </button>

          <button
            onClick={() => triggerVetoRef.current()}
            className="glass-button"
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.68rem',
              cursor: 'pointer',
              fontWeight: 700,
              color: 'var(--accent)',
              borderColor: 'rgba(192, 57, 43, 0.4)',
              background: activeMode === 'veto' ? 'rgba(192, 57, 43, 0.4)' : undefined,
            }}
          >
            🛡️ VETO
          </button>
        </div>
      </div>
    </div>
  );
}


// dev: revision 066 verified
