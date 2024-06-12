'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface DeviceNode {
  id: string;
  name: string;
  type: 'workstation' | 'phone' | 'watch' | 'storage' | 'edge';
  pos: THREE.Vector3;
  color: number;
  specs: string;
  role: string;
}

export default function HomeEcosystem3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [flowRunning, setFlowRunning] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<DeviceNode | null>(null);

  const steps = [
    { label: '01. Intent Dispatched', desc: 'Phone signs ECDSA intent: "Transcode Paris media & ping watch"' },
    { label: '02. Peer Discovery', desc: 'Phone discovers local Workstation via authenticated capability bus' },
    { label: '03. Isolated Execution', desc: 'Workstation allocates 8GB GPU VRAM in sandboxed cgroup container' },
    { label: '04. Audit & Notification', desc: 'BLACKBOX hardware records signature; completion beacon pings watch' },
  ];

  const triggerFlow = () => {
    setFlowRunning(true);
    setActiveStep(1);
    setTimeout(() => setActiveStep(2), 1400);
    setTimeout(() => setActiveStep(3), 2800);
    setTimeout(() => {
      setActiveStep(4);
      setFlowRunning(false);
    }, 4200);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 10, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x2d343f, 2.0);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 3.0);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Devices in the Home Ecosystem Constellation
    const devices: DeviceNode[] = [
      {
        id: 'workstation',
        name: 'KA3L Workstation',
        type: 'workstation',
        pos: new THREE.Vector3(0, 0, 0),
        color: 0xc0392b, // Accent red
        specs: 'Ryzen 7 7800X3D • RTX 4070 (8GB) • 32GB RAM',
        role: 'Primary Local Silicon Compute',
      },
      {
        id: 'phone',
        name: 'Mobile Intent Client',
        type: 'phone',
        pos: new THREE.Vector3(-6.5, 1.5, 4),
        color: 0x9ba1ab,
        specs: 'Secure Enclave • ECDSA Signer • Mobile UI',
        role: 'Remote Intent Origin',
      },
      {
        id: 'watch',
        name: 'Wearable Terminal',
        type: 'watch',
        pos: new THREE.Vector3(6.5, 2, 4),
        color: 0x9ba1ab,
        specs: 'Ultra-low Power • Haptic Feedback • Push Bus',
        role: 'Instant Notification Target',
      },
      {
        id: 'storage',
        name: 'Home Storage Vault',
        type: 'storage',
        pos: new THREE.Vector3(5, -1.5, -5),
        color: 0x6e7681,
        specs: '16TB NVMe Pool • Inode Index • ZFS',
        role: 'Local Content Repository',
      },
      {
        id: 'edge',
        name: 'Living Room Edge Node',
        type: 'edge',
        pos: new THREE.Vector3(-5, -2, -4),
        color: 0x6e7681,
        specs: 'Ambient Screen • Home Assistant Interface',
        role: 'Smart Living Display',
      },
    ];

    // Build 3D models for devices
    const deviceMeshes: THREE.Mesh[] = [];

    devices.forEach((dev) => {
      let geo: THREE.BufferGeometry;
      if (dev.type === 'workstation') {
        geo = new THREE.BoxGeometry(1.6, 2.2, 1.8);
      } else if (dev.type === 'phone') {
        geo = new THREE.BoxGeometry(1.0, 1.9, 0.15);
      } else if (dev.type === 'watch') {
        geo = new THREE.CylinderGeometry(0.7, 0.7, 0.35, 24);
      } else if (dev.type === 'storage') {
        geo = new THREE.CylinderGeometry(1.2, 1.2, 1.6, 24);
      } else {
        geo = new THREE.BoxGeometry(2.2, 1.4, 0.2);
      }

      const mat = new THREE.MeshStandardMaterial({
        color: dev.color,
        metalness: 0.8,
        roughness: 0.25,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(dev.pos);
      rootGroup.add(mesh);
      deviceMeshes.push(mesh);

      // Orbital glow ring around device
      const ringGeo = new THREE.RingGeometry(1.4, 1.48, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: dev.color === 0xc0392b ? 0xc0392b : 0x565e6b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.copy(dev.pos);
      ring.position.y -= 0.8;
      rootGroup.add(ring);
    });

    // Connecting Beams (Home Ecosystem Mesh)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x565e6b, transparent: true, opacity: 0.4 });
    const beamLines: THREE.Line[] = [];

    const connect = (p1: THREE.Vector3, p2: THREE.Vector3) => {
      const g = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const l = new THREE.Line(g, lineMat);
      rootGroup.add(l);
      beamLines.push(l);
    };

    connect(devices[1].pos, devices[0].pos); // Phone -> Workstation
    connect(devices[0].pos, devices[2].pos); // Workstation -> Watch
    connect(devices[0].pos, devices[3].pos); // Workstation -> Storage
    connect(devices[0].pos, devices[4].pos); // Workstation -> Edge
    connect(devices[1].pos, devices[4].pos); // Phone -> Edge

    // Laser Packet traveling during trigger flow
    const packetGeo = new THREE.SphereGeometry(0.25, 16, 16);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xff3b30 });
    const packet = new THREE.Mesh(packetGeo, packetMat);
    packet.visible = false;
    rootGroup.add(packet);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(30, 30, 0x565e6b, 0x1e252e);
    gridHelper.position.y = -3;
    rootGroup.add(gridHelper);

    // Mouse Controls
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        rootGroup.rotation.y += dx * 0.005;
        rootGroup.rotation.x += dy * 0.005;
        prevX = e.clientX;
        prevY = e.clientY;
      }
    };

    const onUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onDown);
    container.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Render loop
    let animId: number;
    let t = 0;

    const animate = () => {
      t += 0.015;
      if (!isDragging) {
        rootGroup.rotation.y += 0.002;
      }

      // Animate devices gently floating
      deviceMeshes.forEach((m, idx) => {
        m.position.y = devices[idx].pos.y + Math.sin(t + idx * 1.2) * 0.12;
      });

      // Flow step animation for the packet
      if (flowRunning) {
        packet.visible = true;
        if (activeStep === 1 || activeStep === 2) {
          // Travel from Phone to Workstation
          const p = (Math.sin(t * 4) + 1) / 2;
          packet.position.lerpVectors(devices[1].pos, devices[0].pos, p);
        } else if (activeStep === 3) {
          // Travel inside Workstation (pulsing)
          packet.position.copy(devices[0].pos);
          packet.scale.setScalar(1 + Math.sin(t * 8) * 0.4);
        } else if (activeStep === 4) {
          // Travel from Workstation to Watch
          const p = (Math.sin(t * 4) + 1) / 2;
          packet.position.lerpVectors(devices[0].pos, devices[2].pos, p);
        }
      } else {
        packet.visible = false;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousedown', onDown);
      container.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [activeStep, flowRunning]);

  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-light)',
        borderRadius: '2px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* 3D Header HUD */}
      <div
        style={{
          padding: '1rem 1.5rem',
          background: 'var(--bg-mid)',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          zIndex: 10,
          position: 'relative',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
            <span
              style={{
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: '0.8rem',
                color: 'var(--text-primary)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              3D Personal Ecosystem: Unified Machine Intelligence
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.2rem' }}>
            One environment across your Phone, Workstation, Storage Vault, and Watch without third-party cloud lock-in.
          </p>
        </div>

        <button
          onClick={triggerFlow}
          disabled={flowRunning}
          style={{
            background: flowRunning ? 'var(--bg-raised)' : 'var(--accent)',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1.25rem',
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: flowRunning ? 'wait' : 'pointer',
            letterSpacing: '0.05em',
            borderRadius: '2px',
          }}
        >
          {flowRunning ? 'Executing Pipeline...' : '▶ Simulate Remote Intent Flow'}
        </button>
      </div>

      {/* 3D Canvas Box */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '460px',
          background: 'radial-gradient(circle at center, #161b22 0%, #0e1115 100%)',
          position: 'relative',
          cursor: 'grab',
        }}
      >
        {/* Floating NASA-style HUD Coordinates */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1.25rem',
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.7rem',
            color: 'var(--steel-light)',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          <span>SYSTEM: KA3L-HOME-FABRIC // ACTIVE</span>
          <span>NODES: 5 VERIFIED PEERS • MESH LATENCY: 0.4ms</span>
          <span>BLACKBOX BUS: /dev/blackbox0 [ARMED]</span>
        </div>

        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1.25rem',
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            pointerEvents: 'none',
            textAlign: 'right',
          }}
        >
          <span>ORBIT CAMERA: DRAG TO ROTATE 3D PERSPECTIVE</span>
        </div>

        {/* Dynamic Execution Pipeline Bar */}
        {activeStep > 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: '1.25rem',
              left: '1.25rem',
              right: '1.25rem',
              background: 'rgba(14, 17, 21, 0.92)',
              border: '1px solid var(--border-light)',
              borderLeft: '4px solid var(--accent)',
              padding: '0.85rem 1.25rem',
              backdropFilter: 'blur(8px)',
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '0.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <div>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
                {steps[activeStep - 1]?.label}:
              </span>{' '}
              <span style={{ color: 'var(--text-primary)' }}>{steps[activeStep - 1]?.desc}</span>
            </div>
            <span style={{ color: 'var(--steel-light)', fontSize: '0.7rem' }}>
              PHASE {activeStep} OF 4
            </span>
          </div>
        )}
      </div>

      {/* Bottom Breakdown Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          background: 'var(--bg-mid)',
          borderTop: '1px solid var(--border-light)',
        }}
      >
        {[
          { label: 'Workstation', role: 'Main GPU/CPU Compute', badge: 'HOST SILICON' },
          { label: 'Mobile Device', role: 'Signed Intent Origin', badge: 'REMOTE INTENT' },
          { label: 'Watch / Wearable', role: 'Push Verification', badge: 'PERIPHERAL' },
          { label: 'Storage Vault', role: 'Offline Inode Index', badge: 'ZFS STORAGE' },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: '1.25rem',
              borderRight: '1px solid var(--border-light)',
            }}
          >
            <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-geist-mono), monospace', color: 'var(--accent)', marginBottom: '0.2rem' }}>
              {item.badge}
            </div>
            <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
              {item.label}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              {item.role}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// dev: revision 067 verified
