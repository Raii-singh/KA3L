'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface VantaHybridBGProps {
  currentPage: number; // 0 to 7
}

export default function VantaHybridBG({ currentPage }: VantaHybridBGProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0d10, 0.012);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 34);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // --- 1. AMBIENT NET NODES & LINES (Subtle, Clean, No Clutter) ---
    const NODE_COUNT = 36;
    const bounds = { x: 44, y: 22, z: 18 };

    interface NodePoint {
      pos: THREE.Vector3;
      vel: THREE.Vector3;
      isAccent: boolean;
    }

    const nodes: NodePoint[] = [];
    const pointPositions = new Float32Array(NODE_COUNT * 3);
    const pointColors = new Float32Array(NODE_COUNT * 3);

    for (let i = 0; i < NODE_COUNT; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * bounds.x,
        (Math.random() - 0.5) * bounds.y,
        (Math.random() - 0.5) * bounds.z - 4 // Push slightly into background
      );
      const isAccent = i % 6 === 0;

      nodes.push({
        pos,
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
        isAccent,
      });

      pointPositions[i * 3] = pos.x;
      pointPositions[i * 3 + 1] = pos.y;
      pointPositions[i * 3 + 2] = pos.z;

      // Titanium Cold White or Crimson Accent
      if (isAccent) {
        pointColors[i * 3] = 0.9;
        pointColors[i * 3 + 1] = 0.23;
        pointColors[i * 3 + 2] = 0.19;
      } else {
        pointColors[i * 3] = 0.6;
        pointColors[i * 3 + 1] = 0.63;
        pointColors[i * 3 + 2] = 0.67;
      }
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    pointsGeo.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    rootGroup.add(pointsMesh);

    // Connecting Net Lines (Vanta.NET style — faint & elegant)
    const maxDistance = 10.0;
    const maxLines = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    rootGroup.add(lineSegments);

    // --- 2. VANTA.RINGS: Concentric Gyroscopic Rings in Background ---
    const ringsGroup = new THREE.Group();
    rootGroup.add(ringsGroup);

    interface RingDef {
      mesh: THREE.Line;
      axis: THREE.Vector3;
      speed: number;
    }

    const rings: RingDef[] = [];
    const ringConfigs = [
      { radius: 12.0, color: 0xc0392b, rotSpeed: 0.002, segs: 100 }, // Crimson Red
      { radius: 16.0, color: 0x4a525d, rotSpeed: -0.0015, segs: 110 }, // Steel
      { radius: 20.0, color: 0x9ba1ab, rotSpeed: 0.001, segs: 130 }, // Light Titanium
      { radius: 24.0, color: 0x8b2520, rotSpeed: -0.0018, segs: 140 }, // Muted Crimson
    ];

    ringConfigs.forEach((cfg, idx) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= cfg.segs; i++) {
        const theta = (i / cfg.segs) * Math.PI * 2;
        if ((i % 14) < 9) {
          pts.push(new THREE.Vector3(Math.cos(theta) * cfg.radius, Math.sin(theta) * cfg.radius, 0));
        }
      }
      const rGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const rMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: idx === 0 ? 0.35 : 0.2,
      });
      const rMesh = new THREE.Line(rGeo, rMat);
      rMesh.rotation.x = Math.PI / (3 + idx);
      rMesh.rotation.y = (idx * Math.PI) / 4;
      ringsGroup.add(rMesh);

      rings.push({
        mesh: rMesh,
        axis: new THREE.Vector3(Math.sin(idx), Math.cos(idx), 0.5).normalize(),
        speed: cfg.rotSpeed,
      });
    });

    // --- 3. Mouse Tilt Interaction ---
    let targetRotX = 0;
    let targetRotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = x * 0.25;
      targetRotX = -y * 0.15;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // --- 4. Render Loop ---
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Mouse smoothing
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.03;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.03;

      // Rotate Vanta Rings
      rings.forEach((r) => {
        r.mesh.rotateOnAxis(r.axis, r.speed);
      });

      // Camera choreography along the X-AXIS based on horizontal slide index!
      // This synchronizes the 3D world with horizontal scrolling
      const targetCamX = (currentPage - 3.5) * 3.5;
      const targetCamZ = 34 + Math.sin(currentPage * 0.5) * 2;
      camera.position.x += (targetCamX - camera.position.x) * 0.06;
      camera.position.z += (targetCamZ - camera.position.z) * 0.06;
      camera.lookAt(targetCamX * 0.3, 0, 0);

      // Update Net Node Points
      const posArray = pointsGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i];
        n.pos.add(n.vel);

        if (n.pos.x < -bounds.x / 2 || n.pos.x > bounds.x / 2) n.vel.x *= -1;
        if (n.pos.y < -bounds.y / 2 || n.pos.y > bounds.y / 2) n.vel.y *= -1;
        if (n.pos.z < -bounds.z / 2 || n.pos.z > bounds.z / 2) n.vel.z *= -1;

        posArray[i * 3] = n.pos.x;
        posArray[i * 3 + 1] = n.pos.y;
        posArray[i * 3 + 2] = n.pos.z;
      }
      pointsGeo.attributes.position.needsUpdate = true;

      // Update Net Lines
      let vertexIdx = 0;
      let colorIdx = 0;
      const linePosArray = lineGeo.attributes.position.array as Float32Array;
      const lineColArray = lineGeo.attributes.color.array as Float32Array;

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = nodes[i].pos.x - nodes[j].pos.x;
          const dy = nodes[i].pos.y - nodes[j].pos.y;
          const dz = nodes[i].pos.z - nodes[j].pos.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            const alpha = 1.0 - dist / maxDistance;

            linePosArray[vertexIdx++] = nodes[i].pos.x;
            linePosArray[vertexIdx++] = nodes[i].pos.y;
            linePosArray[vertexIdx++] = nodes[i].pos.z;
            linePosArray[vertexIdx++] = nodes[j].pos.x;
            linePosArray[vertexIdx++] = nodes[j].pos.y;
            linePosArray[vertexIdx++] = nodes[j].pos.z;

            const isRed = nodes[i].isAccent || nodes[j].isAccent;
            const r = isRed ? 0.7 * alpha : 0.45 * alpha;
            const g = isRed ? 0.15 * alpha : 0.48 * alpha;
            const b = isRed ? 0.12 * alpha : 0.52 * alpha;

            lineColArray[colorIdx++] = r;
            lineColArray[colorIdx++] = g;
            lineColArray[colorIdx++] = b;
            lineColArray[colorIdx++] = r;
            lineColArray[colorIdx++] = g;
            lineColArray[colorIdx++] = b;
          }
        }
      }

      for (let i = vertexIdx; i < maxLines * 6; i++) {
        linePosArray[i] = 0;
      }
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [currentPage]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.6,
      }}
    />
  );
}
