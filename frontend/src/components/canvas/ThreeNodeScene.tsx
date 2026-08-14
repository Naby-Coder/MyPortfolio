'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeNodeSceneProps {
  className?: string;
}

export function ThreeNodeScene({ className = 'w-full h-full min-h-[220px]' }: ThreeNodeSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 220;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Rotating wireframe node structure (Icosahedron)
    const geometry = new THREE.IcosahedronGeometry(1.5, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x6366f1, // Indigo/Violet
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      emissive: 0x312e81,
      emissiveIntensity: 0.5,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Adding data nodes at vertices
    const nodeGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xa5b4fc });

    const posAttribute = geometry.attributes.position;
    for (let i = 0; i < posAttribute.count; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const pos = new THREE.Vector3();
      pos.fromBufferAttribute(posAttribute, i);
      node.position.copy(pos);
      mesh.add(node);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 2, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    camera.position.z = 3.8;

    let animationFrameId: number;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      mesh.rotation.y += 0.002;
      mesh.rotation.x += 0.001;

      // Breathing effect
      const scale = 1 + Math.sin(Date.now() * 0.001) * 0.04;
      mesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 220;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
