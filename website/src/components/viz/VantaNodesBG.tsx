'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface VantaNodesBGProps {
  currentPage: number; // 0 to 6
}

export default function VantaNodesBG({ currentPage }: VantaNodesBGProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06080b, 0.015);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 32);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // --- 2. Lighting for Chrome Specular Reflections ---
    const ambientLight = new THREE.AmbientLight(0x18202a, 1.8);
    scene.add(ambientLight);

    // Key bright light for sharp chrome reflections through frosted glass
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(16, 20, 20);
    scene.add(keyLight);

    const redRimLight = new THREE.DirectionalLight(0xff3b30, 2.0);
    redRimLight.position.set(-18, -12, 10);
    scene.add(redRimLight);

    const fillLight = new THREE.PointLight(0xa0aec0, 2.5, 60);
    fillLight.position.set(0, 5, 10);
    scene.add(fillLight);

    // --- 3. Chrome Torus & Spheres (The Objects seen behind Glass in Image 1) ---
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.94,
      roughness: 0.14,
    });

    const crimsonChromeMat = new THREE.MeshStandardMaterial({
      color: 0xc0392b,
      metalness: 0.88,
      roughness: 0.22,
    });

    // Large floating chrome torus ring (like in the AxessLab glass mockup)
    const torusGeo = new THREE.TorusGeometry(9.0, 2.2, 32, 120);
    const torusMesh = new THREE.Mesh(torusGeo, chromeMat);
    torusMesh.position.set(6, -2, -6);
    torusMesh.rotation.x = 1.1;
    torusMesh.rotation.y = 0.4;
    rootGroup.add(torusMesh);

    // Secondary chrome torus
    const torusGeo2 = new THREE.TorusGeometry(6.5, 1.4, 28, 90);
    const torusMesh2 = new THREE.Mesh(torusGeo2, crimsonChromeMat);
    torusMesh2.position.set(-12, 4, -10);
    torusMesh2.rotation.x = -0.7;
    torusMesh2.rotation.y = 0.8;
    rootGroup.add(torusMesh2);

    // Chrome spherical orbs (as seen in the mockup glass backdrop)
    const spherePositions = [
      { x: 12, y: 7, z: -4, r: 2.8, mat: chromeMat },
      { x: -14, y: -6, z: -5, r: 3.4, mat: chromeMat },
      { x: 18, y: -8, z: -8, r: 2.2, mat: crimsonChromeMat },
      { x: -6, y: 9, z: -12, r: 2.0, mat: chromeMat },
    ];

    const sphereMeshes: THREE.Mesh[] = [];
    spherePositions.forEach((sp) => {
      const sGeo = new THREE.SphereGeometry(sp.r, 32, 32);
      const sMesh = new THREE.Mesh(sGeo, sp.mat);
      sMesh.position.set(sp.x, sp.y, sp.z);
      rootGroup.add(sMesh);
      sphereMeshes.push(sMesh);
    });

    // --- 4. Vanta-style Organic Node Lattice (Image 2 Vanta.CELLS transformed into nodes) ---
    const NODE_COUNT = 90;
    const bounds = { x: 70, y: 35, z: 24 };

    interface CellNode {
      pos: THREE.Vector3;
      vel: THREE.Vector3;
      basePos: THREE.Vector3;
      isRed: boolean;
      phase: number;
    }

    const cellNodes: CellNode[] = [];
    const nodeInstancedGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const nodeInstancedMat = new THREE.MeshStandardMaterial({
      metalness: 0.9,
      roughness: 0.2,
    });
    const nodeInstancedMesh = new THREE.InstancedMesh(nodeInstancedGeo, nodeInstancedMat, NODE_COUNT);
    nodeInstancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < NODE_COUNT; i++) {
      const isRed = i % 7 === 0;
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * bounds.x,
        (Math.random() - 0.5) * bounds.y,
        (Math.random() - 0.5) * bounds.z - 4
      );

      cellNodes.push({
        pos: pos.clone(),
        basePos: pos.clone(),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.012
        ),
        isRed,
        phase: Math.random() * Math.PI * 2,
      });

      dummy.position.copy(pos);
      dummy.updateMatrix();
      nodeInstancedMesh.setMatrixAt(i, dummy.matrix);
      nodeInstancedMesh.setColorAt(
        i,
        isRed ? new THREE.Color(0xc0392b) : new THREE.Color(0xd1d5db)
      );
    }
    nodeInstancedMesh.instanceColor!.needsUpdate = true;
    nodeInstancedMesh.instanceMatrix.needsUpdate = true;
    rootGroup.add(nodeInstancedMesh);

    // Connecting Cellular Struts (Voronoi-like web of fine lines)
    const maxLinkDist = 9.5;
    const linePairs: Array<[number, number]> = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      let connections = 0;
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const d = cellNodes[i].basePos.distanceTo(cellNodes[j].basePos);
        if (d < maxLinkDist && connections < 4) {
          linePairs.push([i, j]);
          connections++;
        }
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
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
    });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    rootGroup.add(lineSegments);

    // --- 5. Mouse Parallax & Responsive Handling ---
    let targetRotY = 0;
    let targetRotX = 0;

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

    // --- 6. Animation Loop ---
    let animId: number;
    let time = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.007;

      // Mouse Parallax Damping
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.035;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.035;

      // Rotate Large Chrome Torus Shapes (creating moving specular reflections behind glass!)
      torusMesh.rotation.z += 0.002;
      torusMesh.rotation.y += 0.003;
      torusMesh2.rotation.z -= 0.0025;
      torusMesh2.rotation.x += 0.002;

      // Camera Horizontal Tracking across Slides
      // As user scrolls horizontally, camera sweeps through the 3D chrome & node universe!
      const targetCamX = (currentPage - 3) * 5.5;
      const targetCamZ = 32 + Math.sin(currentPage * 0.6) * 3;
      camera.position.x += (targetCamX - camera.position.x) * 0.055;
      camera.position.z += (targetCamZ - camera.position.z) * 0.055;
      camera.lookAt(targetCamX * 0.35, 0, 0);

      // Float Chrome Spheres gently
      sphereMeshes.forEach((sm, idx) => {
        sm.position.y += Math.sin(time + idx) * 0.015;
      });

      // Update Vanta Node Grid
      for (let i = 0; i < NODE_COUNT; i++) {
        const cn = cellNodes[i];
        cn.pos.x = cn.basePos.x + Math.sin(time + cn.phase) * 0.35;
        cn.pos.y = cn.basePos.y + Math.cos(time * 0.8 + cn.phase) * 0.35;
        cn.pos.z = cn.basePos.z + Math.sin(time * 0.5 + cn.phase) * 0.25;

        dummy.position.copy(cn.pos);
        dummy.updateMatrix();
        nodeInstancedMesh.setMatrixAt(i, dummy.matrix);
      }
      nodeInstancedMesh.instanceMatrix.needsUpdate = true;

      // Update Lines
      let lIdx = 0;
      let cIdx = 0;
      for (let k = 0; k < linePairs.length; k++) {
        const [a, b] = linePairs[k];
        const p1 = cellNodes[a].pos;
        const p2 = cellNodes[b].pos;

        linePositions[lIdx++] = p1.x;
        linePositions[lIdx++] = p1.y;
        linePositions[lIdx++] = p1.z;
        linePositions[lIdx++] = p2.x;
        linePositions[lIdx++] = p2.y;
        linePositions[lIdx++] = p2.z;

        const isRed = cellNodes[a].isRed || cellNodes[b].isRed;
        const r = isRed ? 0.75 : 0.45;
        const g = isRed ? 0.18 : 0.48;
        const bCol = isRed ? 0.15 : 0.52;

        lineColors[cIdx++] = r;
        lineColors[cIdx++] = g;
        lineColors[cIdx++] = bCol;
        lineColors[cIdx++] = r;
        lineColors[cIdx++] = g;
        lineColors[cIdx++] = bCol;
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
      }}
    />
  );
}


// dev: revision 088 verified
