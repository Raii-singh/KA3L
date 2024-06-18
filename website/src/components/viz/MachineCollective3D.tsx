'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';

export interface MachineNodeData {
  id: string;
  name: string;
  cluster: string;
  role: 'workstation' | 'compute' | 'edge' | 'storage' | 'gateway';
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  capabilities: string[];
  peerCount: number;
  status: 'active' | 'sharing' | 'idle' | 'enforcing' | 'active_task';
  color: THREE.Color;
  basePos: THREE.Vector3;
  pos: THREE.Vector3;
  scale: number;
  phase: number;
}

interface Packet {
  startPos: THREE.Vector3;
  endPos: THREE.Vector3;
  progress: number;
  speed: number;
  payload: string;
  isCrimson: boolean;
}

const CLUSTERS = [
  { name: 'Compute Cluster (Tensor Mesh)', center: new THREE.Vector3(7.5, 3.5, -2.5), count: 48, role: 'compute' as const },
  { name: 'Workstation Constellation', center: new THREE.Vector3(-6.5, 2.0, 3.0), count: 44, role: 'workstation' as const },
  { name: 'Edge & Mobile Fabric', center: new THREE.Vector3(-4.5, -4.0, -1.0), count: 42, role: 'edge' as const },
  { name: 'Storage Vaults (ZFS Array)', center: new THREE.Vector3(6.0, -3.5, 4.0), count: 46, role: 'storage' as const },
  { name: 'Autonomous Gateway Fabric', center: new THREE.Vector3(0.5, 5.0, -4.5), count: 40, role: 'gateway' as const },
];

const CPU_OPTIONS = [
  'Ryzen 9 7950X (16c/32t)',
  'EPYC 9654 (96c/192t)',
  'Ryzen 7 7800X3D (8c/16t)',
  'ARM Cortex-A78 (8c)',
  'Apple M3 Max (16c)',
  'Xeon Platinum 8480+ (56c)',
  'RISC-V SiFive P550',
];

const GPU_OPTIONS = [
  'RTX 4090 24GB GDDR6X',
  '4x NVIDIA H100 80GB SXM',
  'RTX 4070 12GB',
  'Integrated Metal GPU (40c)',
  'Qualcomm Hexagon NPU',
  'None (Headless Storage)',
  '2x RTX 6000 Ada 48GB',
];

export default function MachineCollective3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<MachineNodeData | null>(null);
  const [selectedNode, setSelectedNode] = useState<MachineNodeData | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Generate node metadata (deterministic, decentralized mesh with NO central node)
  const nodes = useMemo<MachineNodeData[]>(() => {
    const list: MachineNodeData[] = [];
    let globalIndex = 0;

    CLUSTERS.forEach((cluster) => {
      for (let i = 0; i < cluster.count; i++) {
        // Distribute within cluster ellipsoid
        const radius = 2.4 + Math.random() * 2.8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        const x = cluster.center.x + radius * Math.sin(phi) * Math.cos(theta);
        const y = cluster.center.y + radius * Math.sin(phi) * Math.sin(theta) * 0.75;
        const z = cluster.center.z + radius * Math.cos(phi);

        const isCrimson = Math.random() < 0.12; // 12% nodes active/enforcing KA3L policy
        const isTitanium = Math.random() < 0.5;

        let color = new THREE.Color(0x9ca3af); // Titanium steel
        if (isCrimson) {
          color = new THREE.Color(0xc0392b); // Restrained KA3L crimson
        } else if (isTitanium) {
          color = new THREE.Color(0xd1d5db); // Cold titanium
        } else {
          color = new THREE.Color(0x4b5563); // Dark graphite
        }

        const idNum = String(globalIndex + 1).padStart(3, '0');
        const role = cluster.role;

        let capabilities: string[] = ['system.info'];
        if (role === 'compute') capabilities = ['workload.create', 'process.manage', 'tensor.dispatch', 'system.info'];
        if (role === 'workstation') capabilities = ['workload.create', 'storage.search', 'intent.execute', 'system.info'];
        if (role === 'storage') capabilities = ['storage.allocate', 'storage.search', 'zfs.snapshot', 'system.info'];
        if (role === 'edge') capabilities = ['intent.sign', 'crypto.verify', 'system.info'];
        if (role === 'gateway') capabilities = ['network.route', 'capability.negotiate', 'system.info'];

        list.push({
          id: `node-${idNum}`,
          name: `${role}-peer-${idNum}`,
          cluster: cluster.name,
          role,
          cpu: CPU_OPTIONS[globalIndex % CPU_OPTIONS.length],
          gpu: GPU_OPTIONS[globalIndex % GPU_OPTIONS.length],
          ram: role === 'compute' ? '256GB ECC DDR5' : role === 'storage' ? '128GB ECC' : '32GB DDR5',
          storage: role === 'storage' ? '64TB ZFS Pool (NVMe)' : '2TB Gen5 NVMe',
          capabilities,
          peerCount: 4 + Math.floor(Math.random() * 8),
          status: isCrimson ? 'active_task' : 'idle',
          color,
          basePos: new THREE.Vector3(x, y, z),
          pos: new THREE.Vector3(x, y, z),
          scale: 0.85 + Math.random() * 0.45,
          phase: Math.random() * Math.PI * 2,
        });

        globalIndex++;
      }
    });

    return list;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0d10, 0.016);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- 2. Lighting (Controlled Metallic Highlights) ---
    const ambientLight = new THREE.AmbientLight(0x1a212d, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf3f4f6, 2.5);
    keyLight.position.set(12, 18, 15);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x374151, 1.2);
    fillLight.position.set(-15, -10, -10);
    scene.add(fillLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // --- 3. Instanced Machine Chassis Nodes ---
    // High-performance single draw call for all ~220 nodes
    const nodeCount = nodes.length;
    const boxGeo = new THREE.BoxGeometry(0.38, 0.22, 0.48); // Micro-chassis server module

    const nodeMat = new THREE.MeshStandardMaterial({
      roughness: 0.35,
      metalness: 0.82,
    });

    const instancedMesh = new THREE.InstancedMesh(boxGeo, nodeMat, nodeCount);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < nodeCount; i++) {
      dummy.position.copy(nodes[i].pos);
      dummy.scale.setScalar(nodes[i].scale);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
      instancedMesh.setColorAt(i, nodes[i].color);
    }
    instancedMesh.instanceColor!.needsUpdate = true;
    instancedMesh.instanceMatrix.needsUpdate = true;
    rootGroup.add(instancedMesh);

    // --- 4. Peer Connection Lines (Decentralized Mesh, No Central Hub) ---
    const linePairs: Array<[number, number]> = [];
    const maxIntraDist = 3.6;

    // A) Connect nearest peers within each cluster
    for (let i = 0; i < nodeCount; i++) {
      let connections = 0;
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].cluster === nodes[j].cluster) {
          const d = nodes[i].basePos.distanceTo(nodes[j].basePos);
          if (d < maxIntraDist && connections < 4) {
            linePairs.push([i, j]);
            connections++;
          }
        }
      }
    }

    // B) Inter-cluster peer bridges (Decentralized Multi-Path Fabric)
    const clusterCentroids = CLUSTERS.map((c) => c.center);
    for (let c1 = 0; c1 < clusterCentroids.length; c1++) {
      for (let c2 = c1 + 1; c2 < clusterCentroids.length; c2++) {
        // Find 2-3 closest node pairs between these two clusters
        const candidates: Array<{ i: number; j: number; d: number }> = [];
        for (let i = 0; i < nodeCount; i++) {
          if (nodes[i].cluster !== CLUSTERS[c1].name) continue;
          for (let j = 0; j < nodeCount; j++) {
            if (nodes[j].cluster !== CLUSTERS[c2].name) continue;
            const dist = nodes[i].basePos.distanceTo(nodes[j].basePos);
            candidates.push({ i, j, d: dist });
          }
        }
        candidates.sort((a, b) => a.d - b.d);
        // Add top 2 bridge links
        candidates.slice(0, 2).forEach((c) => linePairs.push([c.i, c.j]));
      }
    }

    const linePositions = new Float32Array(linePairs.length * 6);
    const lineColors = new Float32Array(linePairs.length * 6);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    rootGroup.add(lineSegments);

    // --- 5. Data Packets Gliding Across Selected Connections ---
    const PACKET_COUNT = 24;
    const packets: Packet[] = [];
    const payloads = [
      'workload.create',
      'capability.invoke',
      'storage.index',
      'crypto.verify',
      'policy.veto.eval',
      'p2p.ping',
    ];

    for (let p = 0; p < PACKET_COUNT; p++) {
      const pair = linePairs[Math.floor(Math.random() * linePairs.length)];
      const isCrimson = Math.random() < 0.25;
      packets.push({
        startPos: nodes[pair[0]].pos,
        endPos: nodes[pair[1]].pos,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
        payload: payloads[p % payloads.length],
        isCrimson,
      });
    }

    const packetPositions = new Float32Array(PACKET_COUNT * 3);
    const packetColors = new Float32Array(PACKET_COUNT * 3);
    const packetGeo = new THREE.BufferGeometry();
    packetGeo.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
    packetGeo.setAttribute('color', new THREE.BufferAttribute(packetColors, 3));

    const packetMat = new THREE.PointsMaterial({
      size: 0.32,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const packetPoints = new THREE.Points(packetGeo, packetMat);
    rootGroup.add(packetPoints);

    // --- 6. Raycasting for Node Hover and Click ---
    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2(-999, -999);
    let targetRotX = 0;
    let targetRotY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });

      mouseNorm.x = (x / rect.width) * 2 - 1;
      mouseNorm.y = -(y / rect.height) * 2 + 1;

      targetRotY = mouseNorm.x * 0.22;
      targetRotX = -mouseNorm.y * 0.14;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouseNorm, camera);
      const intersects = raycaster.intersectObject(instancedMesh);
      if (intersects.length > 0 && intersects[0].instanceId !== undefined) {
        const id = intersects[0].instanceId;
        setSelectedNode(nodes[id]);
      } else {
        setSelectedNode(null);
      }
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('click', onClick);

    // --- 7. Animation Loop ---
    let animId: number;
    let time = 0;
    let hoveredInstanceId = -1;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.008;

      // Gentle camera parallax
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.04;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.04;

      // Majestic continuous drift (Nodes gently breathe, NO chaotic spin)
      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        n.pos.x = n.basePos.x + Math.sin(time + n.phase) * 0.12;
        n.pos.y = n.basePos.y + Math.cos(time * 0.8 + n.phase) * 0.12;
        n.pos.z = n.basePos.z + Math.sin(time * 0.5 + n.phase) * 0.08;

        dummy.position.copy(n.pos);
        dummy.scale.setScalar(i === hoveredInstanceId ? n.scale * 1.35 : n.scale);
        dummy.rotation.y = time * 0.2 + n.phase;
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      }
      instancedMesh.instanceMatrix.needsUpdate = true;

      // Update lines
      let lIdx = 0;
      let cIdx = 0;
      for (let k = 0; k < linePairs.length; k++) {
        const [a, b] = linePairs[k];
        const p1 = nodes[a].pos;
        const p2 = nodes[b].pos;

        linePositions[lIdx++] = p1.x;
        linePositions[lIdx++] = p1.y;
        linePositions[lIdx++] = p1.z;
        linePositions[lIdx++] = p2.x;
        linePositions[lIdx++] = p2.y;
        linePositions[lIdx++] = p2.z;

        const isCrimson = nodes[a].status === 'active_task' || nodes[b].status === 'active_task';
        const r = isCrimson ? 0.75 : 0.42;
        const g = isCrimson ? 0.18 : 0.45;
        const bCol = isCrimson ? 0.15 : 0.48;

        lineColors[cIdx++] = r;
        lineColors[cIdx++] = g;
        lineColors[cIdx++] = bCol;
        lineColors[cIdx++] = r;
        lineColors[cIdx++] = g;
        lineColors[cIdx++] = bCol;
      }
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      // Update Data Packets
      const packetPosArray = packetGeo.attributes.position.array as Float32Array;
      const packetColArray = packetGeo.attributes.color.array as Float32Array;

      for (let p = 0; p < PACKET_COUNT; p++) {
        const pkt = packets[p];
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1.0) {
          pkt.progress = 0;
          // Switch to another random line link
          const nextPair = linePairs[Math.floor(Math.random() * linePairs.length)];
          pkt.startPos = nodes[nextPair[0]].pos;
          pkt.endPos = nodes[nextPair[1]].pos;
        }

        const px = THREE.MathUtils.lerp(pkt.startPos.x, pkt.endPos.x, pkt.progress);
        const py = THREE.MathUtils.lerp(pkt.startPos.y, pkt.endPos.y, pkt.progress);
        const pz = THREE.MathUtils.lerp(pkt.startPos.z, pkt.endPos.z, pkt.progress);

        packetPosArray[p * 3] = px;
        packetPosArray[p * 3 + 1] = py;
        packetPosArray[p * 3 + 2] = pz;

        if (pkt.isCrimson) {
          packetColArray[p * 3] = 1.0;
          packetColArray[p * 3 + 1] = 0.23;
          packetColArray[p * 3 + 2] = 0.19;
        } else {
          packetColArray[p * 3] = 0.95;
          packetColArray[p * 3 + 1] = 0.96;
          packetColArray[p * 3 + 2] = 0.98;
        }
      }
      packetGeo.attributes.position.needsUpdate = true;
      packetGeo.attributes.color.needsUpdate = true;

      // Raycast for hover
      raycaster.setFromCamera(mouseNorm, camera);
      const intersects = raycaster.intersectObject(instancedMesh);
      if (intersects.length > 0 && intersects[0].instanceId !== undefined) {
        const id = intersects[0].instanceId;
        if (hoveredInstanceId !== id) {
          hoveredInstanceId = id;
          setHoveredNode(nodes[id]);
        }
      } else {
        if (hoveredInstanceId !== -1) {
          hoveredInstanceId = -1;
          setHoveredNode(null);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [nodes]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '520px',
        overflow: 'hidden',
        cursor: 'crosshair',
      }}
    >
      {/* ─── HOVER TOOLTIP (Follows cursor, minimal industrial HUD) ─── */}
      {hoveredNode && !selectedNode && (
        <div
          style={{
            position: 'absolute',
            left: `${mousePos.x + 16}px`,
            top: `${mousePos.y + 16}px`,
            pointerEvents: 'none',
            zIndex: 30,
            background: 'rgba(14, 18, 23, 0.92)',
            border: '1px solid var(--border-light)',
            borderLeft: `3px solid ${hoveredNode.status === 'active_task' ? 'var(--accent)' : 'var(--steel-light)'}`,
            padding: '0.45rem 0.8rem',
            borderRadius: '2px',
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.68rem',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div style={{ color: '#ffffff', fontWeight: 700 }}>{hoveredNode.name}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.62rem' }}>
            {hoveredNode.cluster} • {hoveredNode.peerCount} Peers
          </div>
          <div style={{ color: 'var(--accent)', marginTop: '0.2rem', fontSize: '0.62rem' }}>
            CLICK TO INSPECT SILICON
          </div>
        </div>
      )}

      {/* ─── SELECTED NODE INSPECTOR PANEL (Opens on Click) ─── */}
      {selectedNode && (
        <div
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: 'min(360px, 90%)',
            background: 'rgba(14, 18, 23, 0.95)',
            border: '1px solid var(--border-light)',
            borderTop: '3px solid var(--accent)',
            padding: '1.25rem',
            borderRadius: '2px',
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.75rem',
            zIndex: 40,
            backdropFilter: 'blur(12px)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div>
              <div style={{ color: 'var(--accent)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                AUTONOMOUS PEER NODE
              </div>
              <div style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800 }}>
                {selectedNode.name}
              </div>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '1rem',
                padding: '2px 6px',
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ color: 'var(--steel-light)', fontSize: '0.68rem', marginBottom: '1rem' }}>
            {selectedNode.cluster} • Decentralized Mesh (No Central Master)
          </div>

          {/* Hardware Specs */}
          <div style={{ background: 'rgba(22, 27, 34, 0.8)', padding: '0.75rem', borderRadius: '2px', marginBottom: '0.75rem' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.62rem', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Local Silicon Profile (The Yogi)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.7rem' }}>
              <div>CPU: <strong style={{ color: '#ffffff' }}>{selectedNode.cpu}</strong></div>
              <div>GPU: <strong style={{ color: 'var(--steel-light)' }}>{selectedNode.gpu}</strong></div>
              <div>RAM: <strong style={{ color: '#ffffff' }}>{selectedNode.ram}</strong></div>
              <div>STORAGE: <strong style={{ color: 'var(--steel-light)' }}>{selectedNode.storage}</strong></div>
            </div>
          </div>

          {/* Exposed Capabilities */}
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.62rem', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Exposed Capability Schemas
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {selectedNode.capabilities.map((cap) => (
                <span
                  key={cap}
                  style={{
                    background: 'rgba(10, 13, 16, 0.8)',
                    border: '1px solid var(--border-light)',
                    color: '#e8e9ea',
                    fontSize: '0.65rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '2px',
                  }}
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Mesh Telemetry */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)', paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
            <span>PEER CONNECTIONS: <strong style={{ color: '#ffffff' }}>{selectedNode.peerCount} P2P LINKS</strong></span>
            <span>POLICY: <strong style={{ color: 'var(--accent)' }}>VETO ARMED</strong></span>
          </div>
        </div>
      )}

      {/* ─── BOTTOM SUBTLE LEGEND (Decentralized Mesh) ─── */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1.25rem',
          right: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          fontFamily: 'var(--font-geist-mono), monospace',
          fontSize: '0.68rem',
          color: 'var(--steel-light)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
          <span>DECENTRALIZED PEER MESH // 220 INDEPENDENT SILICON NODES</span>
        </div>
        <div className="hidden sm:inline" style={{ color: 'var(--text-muted)' }}>
          HOVER OR CLICK ANY MACHINE TO INSPECT LOCAL CAPABILITIES
        </div>
      </div>
    </div>
  );
}

// dev: revision 072 verified
