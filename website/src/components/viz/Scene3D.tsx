'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Scene3DProps {
  scrollProgress: number; // 0 to 1
  activeMode?: 'collective' | 'ecosystem' | 'yogi';
}

export default function Scene3D({ scrollProgress, activeMode = 'collective' }: Scene3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNodeInfo, setHoveredNodeInfo] = useState<{
    name: string;
    role: string;
    specs: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0d10, 0.018);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 28);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- Lighting (Cinematic Industrial, NO BLUE / NO PURPLE) ---
    // Warm key light, sharp white rim light, deep red fill light
    const ambientLight = new THREE.AmbientLight(0x22262b, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 3.5);
    keyLight.position.set(20, 30, 20);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xdde3ea, 2.8);
    rimLight.position.set(-25, -15, -20);
    scene.add(rimLight);

    const accentRedLight = new THREE.PointLight(0xc0392b, 4.5, 40);
    accentRedLight.position.set(0, -2, 5);
    scene.add(accentRedLight);

    // --- 3D DECENTRALIZED MESH (TORUS / GEODESIC LATTICE) ---
    // Directly inspired by User Inspo Image 3 & Image 4!
    // No central master node. A self-supporting ring/torus of metallic nodes connected by struts.
    const group = new THREE.Group();
    scene.add(group);

    const NODE_COUNT = 96;
    const torusRadius = 9.5;
    const tubeRadius = 3.6;

    interface NodeData {
      pos: THREE.Vector3;
      homePos: THREE.Vector3;
      ecosystemPos: THREE.Vector3;
      name: string;
      role: string;
      specs: string;
    }

    const nodeDataArray: NodeData[] = [];
    const positions: THREE.Vector3[] = [];

    // Names for nodes
    const NODE_TYPES = [
      { name: 'lab-workstation', role: 'Host Silicon', specs: 'Ryzen 7 • RTX 4070 (8GB) • 32GB' },
      { name: 'edge-gateway-01', role: 'Network Fabric', specs: 'ARM Cortex-A76 • 8GB • Low Latency' },
      { name: 'tensor-node-04', role: 'Compute Node', specs: 'EPYC 64c • 4x A100 • 256GB' },
      { name: 'storage-vault-zfs', role: 'Storage Node', specs: '48TB ZFS Pool • NVMe Inodes' },
      { name: 'mobile-client-rai', role: 'Remote Intent', specs: 'Authenticated ECDSA Gateway' },
      { name: 'watch-notify-01', role: 'Peripheral Ping', specs: 'Push Notification Target' },
    ];

    // Compute Torus coordinates
    for (let i = 0; i < NODE_COUNT; i++) {
      const u = (i / NODE_COUNT) * Math.PI * 2 * 3; // multiple wraps around torus
      const v = (i / NODE_COUNT) * Math.PI * 2;
      const x = (torusRadius + tubeRadius * Math.cos(u)) * Math.cos(v);
      const y = (torusRadius + tubeRadius * Math.cos(u)) * Math.sin(v);
      const z = tubeRadius * Math.sin(u) + (Math.random() - 0.5) * 0.8;

      const pos = new THREE.Vector3(x, y, z);
      positions.push(pos);

      // Ecosystem arrangement positions (grouped into a home constellation)
      const angle = (i / NODE_COUNT) * Math.PI * 2;
      const r = 5 + (i % 4) * 2.5;
      const ecoX = Math.cos(angle) * r;
      const ecoY = Math.sin(angle) * r * 0.7;
      const ecoZ = ((i % 5) - 2) * 2;

      const template = NODE_TYPES[i % NODE_TYPES.length];
      nodeDataArray.push({
        pos: pos.clone(),
        homePos: pos.clone(),
        ecosystemPos: new THREE.Vector3(ecoX, ecoY, ecoZ),
        name: `${template.name}-${(i % 16) + 1}`,
        role: template.role,
        specs: template.specs,
      });
    }

    // Node Mesh using InstancedMesh for silky 60fps rendering
    const sphereGeo = new THREE.SphereGeometry(0.38, 24, 24);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0x9ba1ab,
      metalness: 0.88,
      roughness: 0.18,
      envMapIntensity: 1.5,
    });
    const instancedNodes = new THREE.InstancedMesh(sphereGeo, nodeMaterial, NODE_COUNT);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < NODE_COUNT; i++) {
      dummy.position.copy(positions[i]);
      // Slight variation in node scales
      const s = i % 5 === 0 ? 1.25 : i % 3 === 0 ? 1.05 : 0.85;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      instancedNodes.setMatrixAt(i, dummy.matrix);
    }
    instancedNodes.instanceMatrix.needsUpdate = true;
    group.add(instancedNodes);

    // Highlighted Core Nodes (Special Accent Red Nodes)
    const highlightGeo = new THREE.SphereGeometry(0.42, 24, 24);
    const highlightMat = new THREE.MeshStandardMaterial({
      color: 0xc0392b,
      emissive: 0x8b2520,
      emissiveIntensity: 0.8,
      metalness: 0.5,
      roughness: 0.2,
    });
    const highlightGroup = new THREE.Group();
    group.add(highlightGroup);

    [12, 34, 58, 77, 89].forEach((idx) => {
      const m = new THREE.Mesh(highlightGeo, highlightMat);
      m.position.copy(positions[idx]);
      highlightGroup.add(m);
    });

    // --- Interconnecting Struts / Filaments (The Mesh Backbone) ---
    const linePositions: number[] = [];
    const MAX_DIST = 4.2;

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const d = positions[i].distanceTo(positions[j]);
        if (d < MAX_DIST) {
          linePositions.push(
            positions[i].x, positions[i].y, positions[i].z,
            positions[j].x, positions[j].y, positions[j].z
          );
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x565e6b,
      transparent: true,
      opacity: 0.35,
    });
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    group.add(linesMesh);

    // --- Orbital Telemetry Rings (Inspired by NASA / Zajno Image 2) ---
    const ringGroup = new THREE.Group();
    group.add(ringGroup);

    const makeRing = (radius: number, rotX: number, rotY: number, colorHex: number, opacity: number) => {
      const ringGeo = new THREE.BufferGeometry();
      const pts: number[] = [];
      const segments = 120;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        pts.push(Math.cos(theta) * radius, Math.sin(theta) * radius, 0);
      }
      ringGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      const rMat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: opacity,
      });
      const ring = new THREE.Line(ringGeo, rMat);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      return ring;
    };

    const ring1 = makeRing(14.5, Math.PI / 3, 0.4, 0xc0392b, 0.45);
    const ring2 = makeRing(16.0, -Math.PI / 4, -0.3, 0x8b939e, 0.25);
    const ring3 = makeRing(17.5, Math.PI / 2.2, 0.8, 0x565e6b, 0.2);
    ringGroup.add(ring1);
    ringGroup.add(ring2);
    ringGroup.add(ring3);

    // --- Orbiting Energy Packets (Laser / Signal pulses) ---
    const packetGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xff3b30 });
    const packetCount = 12;
    const packetMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < packetCount; i++) {
      const pm = new THREE.Mesh(packetGeo, packetMat);
      group.add(pm);
      packetMeshes.push(pm);
    }

    // Packet paths
    const packetTrajectories: { from: number; to: number; progress: number; speed: number }[] = [];
    for (let i = 0; i < packetCount; i++) {
      const from = Math.floor(Math.random() * NODE_COUNT);
      let to = (from + 3 + Math.floor(Math.random() * 5)) % NODE_COUNT;
      packetTrajectories.push({
        from,
        to,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.008,
      });
    }

    // --- Background Volumetric Dust Particles ---
    const starGeo = new THREE.BufferGeometry();
    const starCount = 350;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 80;
      starPositions[i + 1] = (Math.random() - 0.5) * 80;
      starPositions[i + 2] = (Math.random() - 0.5) * 80;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x9ba1ab,
      size: 0.15,
      transparent: true,
      opacity: 0.45,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // --- Mouse Interaction & Raycasting ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        group.rotation.y += deltaX * 0.006;
        group.rotation.x += deltaY * 0.006;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Render Loop with Scroll Choreography ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle ambient rotation
      if (!isDragging) {
        group.rotation.y += 0.0025;
        group.rotation.x = Math.sin(elapsedTime * 0.2) * 0.12;
      }

      // Rotate orbital rings
      ring1.rotation.z += 0.004;
      ring2.rotation.z -= 0.003;
      ring3.rotation.z += 0.002;

      // Update energy packets
      for (let i = 0; i < packetCount; i++) {
        const traj = packetTrajectories[i];
        traj.progress += traj.speed;
        if (traj.progress >= 1) {
          traj.progress = 0;
          traj.from = traj.to;
          traj.to = (traj.to + 3 + Math.floor(Math.random() * 7)) % NODE_COUNT;
        }
        const p1 = positions[traj.from];
        const p2 = positions[traj.to];
        if (p1 && p2) {
          packetMeshes[i].position.lerpVectors(p1, p2, traj.progress);
        }
      }

      // Scroll-driven camera choreography
      // Progress from 0 (Hero) to 1 (End of page)
      const targetZ = 28 - scrollProgress * 10;
      const targetY = 4 + Math.sin(scrollProgress * Math.PI * 2) * 3;
      const targetX = Math.cos(scrollProgress * Math.PI) * 4;

      camera.position.z += (targetZ - camera.position.z) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.lookAt(0, 0, 0);

      // Raycasting for interactive hover
      raycaster.setFromCamera(mouse, camera);
      let found: NodeData | null = null;
      let closestDist = Infinity;

      for (let i = 0; i < NODE_COUNT; i++) {
        const worldPos = positions[i].clone().applyMatrix4(group.matrixWorld);
        const screenPos = worldPos.clone().project(camera);
        const dx = screenPos.x - mouse.x;
        const dy = screenPos.y - mouse.y;
        const d = dx * dx + dy * dy;

        if (d < 0.0025 && worldPos.z < closestDist) {
          closestDist = worldPos.z;
          const rect = container.getBoundingClientRect();
          const screenX = ((screenPos.x + 1) * rect.width) / 2;
          const screenY = ((-screenPos.y + 1) * rect.height) / 2;
          found = {
            ...nodeDataArray[i],
            pos: new THREE.Vector3(screenX, screenY, 0),
          };
        }
      }

      if (found) {
        setHoveredNodeInfo({
          name: found.name,
          role: found.role,
          specs: found.specs,
          x: found.pos.x,
          y: found.pos.y,
        });
      } else {
        setHoveredNodeInfo(null);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'auto',
        overflow: 'hidden',
      }}
    >
      {/* 3D Node Telemetry Tooltip when user hovers a real 3D node */}
      {hoveredNodeInfo && (
        <div
          style={{
            position: 'absolute',
            left: `${hoveredNodeInfo.x + 15}px`,
            top: `${hoveredNodeInfo.y - 30}px`,
            pointerEvents: 'none',
            background: 'rgba(14, 18, 23, 0.95)',
            border: '1px solid var(--border-light)',
            borderLeft: '3px solid var(--accent)',
            padding: '0.65rem 0.9rem',
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.72rem',
            zIndex: 100,
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            minWidth: '200px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{hoveredNodeInfo.name}</span>
            <span style={{ color: 'var(--accent)', fontSize: '0.65rem' }}>{hoveredNodeInfo.role}</span>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
            {hoveredNodeInfo.specs}
          </div>
          <div style={{ marginTop: '0.4rem', color: 'var(--text-muted)', fontSize: '0.62rem' }}>
            STATUS: PEER VERIFIED • ZERO CENTRAL MASTER
          </div>
        </div>
      )}
    </div>
  );
}


// dev: revision 069 verified
