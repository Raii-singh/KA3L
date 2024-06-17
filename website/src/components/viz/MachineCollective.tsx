'use client';

import { useEffect, useRef, useState } from 'react';

interface MachineNode {
  id: string;
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  capabilities: string[];
  role: 'workstation' | 'edge' | 'server' | 'storage';
  pulse: number;
}

interface Packet {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  payload: string;
}

const MACHINE_TEMPLATES = [
  {
    name: 'lab-fedora-host',
    cpu: 'Ryzen 7 7800X3D (8c/16t)',
    gpu: 'RTX 4070 8GB',
    ram: '32GB DDR5',
    storage: '487GB NVMe',
    capabilities: ['workload.create', 'system.info', 'storage.search'],
    role: 'workstation' as const,
  },
  {
    name: 'edge-gateway-01',
    cpu: 'ARM Cortex-A76 (4c)',
    gpu: 'Integrated NPU',
    ram: '8GB LPDDR4',
    storage: '64GB eMMC',
    capabilities: ['network.configure', 'system.info'],
    role: 'edge' as const,
  },
  {
    name: 'compute-tensor-node',
    cpu: 'EPYC 7763 (64c)',
    gpu: '4x A100 80GB',
    ram: '256GB ECC',
    storage: '3.8TB U.2 NVMe',
    capabilities: ['workload.create', 'process.manage'],
    role: 'server' as const,
  },
  {
    name: 'storage-vault-west',
    cpu: 'Xeon Silver 4314',
    gpu: 'None',
    ram: '64GB ECC',
    storage: '48TB ZFS Pool',
    capabilities: ['storage.allocate', 'storage.search'],
    role: 'storage' as const,
  },
  {
    name: 'lab-vm-evaluator',
    cpu: 'Virtual x86_64 (4 vCPU)',
    gpu: 'vGPU Passthrough',
    ram: '16GB Virtual',
    storage: '120GB qcow2',
    capabilities: ['workload.create', 'policy.check'],
    role: 'workstation' as const,
  },
];

export default function MachineCollective() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<MachineNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<MachineNode | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate decentralized mesh of nodes - strictly NO single center node
    const nodeCount = Math.min(Math.floor((width * height) / 12000), 55);
    const nodes: MachineNode[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const template = MACHINE_TEMPLATES[i % MACHINE_TEMPLATES.length];
      nodes.push({
        id: `node-${i + 1}`,
        name: `${template.name}-${i + 1}`,
        x: Math.random() * (width - 60) + 30,
        y: Math.random() * (height - 60) + 30,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: template.role === 'server' ? 5 : template.role === 'workstation' ? 4 : 3,
        cpu: template.cpu,
        gpu: template.gpu,
        ram: template.ram,
        storage: template.storage,
        capabilities: template.capabilities,
        role: template.role,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Packets moving peer-to-peer
    const packets: Packet[] = [];
    const MAX_PACKETS = 8;

    let mouseX = -999;
    let mouseY = -999;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      let found: MachineNode | null = null;
      for (const node of nodes) {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        if (dx * dx + dy * dy < 250) {
          found = node;
          break;
        }
      }
      setHoveredNode(found);
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      for (const node of nodes) {
        const dx = node.x - cx;
        const dy = node.y - cy;
        if (dx * dx + dy * dy < 300) {
          setSelectedNode(node);
          return;
        }
      }
      setSelectedNode(null);
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onClick);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(92, 100, 112, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update node positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;

        if (node.x < 20 || node.x > width - 20) node.vx *= -1;
        if (node.y < 20 || node.y > height - 20) node.vy *= -1;
      }

      // Draw mesh links between nearby peers
      const linkDist = 130;
      const activeLinks: [number, number][] = [];

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < linkDist) {
            activeLinks.push([i, j]);
            const alpha = (1 - dist / linkDist) * 0.22;
            ctx.strokeStyle = `rgba(174, 183, 194, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Spawn packets along active links
      if (activeLinks.length > 0 && packets.length < MAX_PACKETS && Math.random() < 0.04) {
        const link = activeLinks[Math.floor(Math.random() * activeLinks.length)];
        const from = Math.random() < 0.5 ? link[0] : link[1];
        const to = from === link[0] ? link[1] : link[0];
        const payloads = ['capability.sync', 'intent.eval', 'audit.hash', 'workload.ping'];
        packets.push({
          fromNode: from,
          toNode: to,
          progress: 0,
          speed: 0.008 + Math.random() * 0.012,
          payload: payloads[Math.floor(Math.random() * payloads.length)],
        });
      }

      // Update and draw packets (muted red accent)
      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const nFrom = nodes[pkt.fromNode];
        const nTo = nodes[pkt.toNode];
        if (!nFrom || !nTo) {
          packets.splice(p, 1);
          continue;
        }

        const px = nFrom.x + (nTo.x - nFrom.x) * pkt.progress;
        const py = nFrom.y + (nTo.y - nFrom.y) * pkt.progress;

        // Packet dot in muted red
        ctx.fillStyle = '#C0392B';
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const isHovered = hoveredNode?.id === node.id;
        const isSelected = selectedNode?.id === node.id;

        // Outer pulse ring
        const ringRadius = node.radius + 3 + Math.sin(node.pulse) * 1.5;
        ctx.strokeStyle = isSelected
          ? 'rgba(192, 57, 43, 0.7)'
          : isHovered
          ? 'rgba(174, 183, 194, 0.6)'
          : 'rgba(92, 100, 112, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Node center
        ctx.fillStyle = isSelected
          ? '#C0392B'
          : isHovered
          ? '#E8E9EA'
          : '#AEB7C2';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Node tiny label for major nodes or hovered
        if (isHovered || isSelected || node.role === 'server') {
          ctx.fillStyle = isSelected ? '#C0392B' : '#9BA3AE';
          ctx.font = '9px monospace';
          ctx.fillText(node.name, node.x + 8, node.y + 3);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('click', onClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hoveredNode?.id, selectedNode?.id]);

  const activeNode = selectedNode || hoveredNode;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '420px',
        background: 'var(--bg-deep)',
        border: '1px solid var(--border-light)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}
    >
      {/* Top Header overlay */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          right: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Machine Collective Mesh (Decentralized Peer Fabric)
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
          }}
        >
          No Central Master Node
        </span>
      </div>

      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: 'crosshair',
        }}
      />

      {/* Live Node Telemetry Panel */}
      {activeNode && (
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            background: 'rgba(22, 27, 34, 0.94)',
            backdropFilter: 'blur(6px)',
            border: '1px solid var(--border-light)',
            borderLeft: '3px solid var(--accent)',
            padding: '1rem',
            borderRadius: '2px',
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.75rem',
            maxWidth: '300px',
            zIndex: 15,
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{activeNode.name}</span>
            <span style={{ color: 'var(--accent)' }}>PEER NODE</span>
          </div>
          <div style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
            <div>CPU: <span style={{ color: 'var(--steel-light)' }}>{activeNode.cpu}</span></div>
            <div>GPU: <span style={{ color: 'var(--steel-light)' }}>{activeNode.gpu}</span></div>
            <div>RAM: <span style={{ color: 'var(--steel-light)' }}>{activeNode.ram}</span></div>
            <div>DISK: <span style={{ color: 'var(--steel-light)' }}>{activeNode.storage}</span></div>
          </div>
          <div style={{ marginTop: '0.6rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>OFFERED CAPABILITIES:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.3rem' }}>
              {activeNode.capabilities.map((c) => (
                <span
                  key={c}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    padding: '0.15rem 0.4rem',
                    fontSize: '0.65rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          fontSize: '0.7rem',
          fontFamily: 'var(--font-geist-mono), monospace',
          color: 'var(--text-muted)',
          pointerEvents: 'none',
        }}
      >
        Hover or click nodes to inspect machine telemetry & capabilities
      </div>
    </div>
  );
}


// dev: revision 071 verified
