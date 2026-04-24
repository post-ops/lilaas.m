/* =============================================================
   LILAAS – HeroCanvas: Three.js 3D animated background
   Features: particle ocean, rotating wireframe control lever,
   floating grid lines, orange glow effects
   ============================================================= */
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setClearColor(0x000000, 0);

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.offsetWidth / canvas.offsetHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // --- Particle Field ---
    const particleCount = 1800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const orangeColor = new THREE.Color("#FF8C00");
    const blueColor = new THREE.Color("#1a4a7a");
    const whiteColor = new THREE.Color("#ffffff");

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const rand = Math.random();
      let c: THREE.Color;
      if (rand < 0.08) c = orangeColor;
      else if (rand < 0.3) c = blueColor;
      else c = whiteColor;

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Wireframe Torus Knot (representing precision mechanics) ---
    const torusGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 120, 16, 2, 3);
    const torusMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF8C00"),
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(3.5, 0, -2);
    scene.add(torusMesh);

    // --- Wireframe Sphere (globe/world reach) ---
    const sphereGeo = new THREE.SphereGeometry(1.8, 24, 16);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#1a4a7a"),
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(-4, -1, -3);
    scene.add(sphereMesh);

    // --- Floating Grid Plane ---
    const gridHelper = new THREE.GridHelper(30, 30, 0x1a3a5a, 0x0d2030);
    gridHelper.position.y = -3;
    gridHelper.rotation.x = 0;
    scene.add(gridHelper);

    // --- Orange Ring ---
    const ringGeo = new THREE.TorusGeometry(2.5, 0.02, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF8C00"),
      transparent: true,
      opacity: 0.3,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(3.5, 0, -2);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    // --- Second smaller ring ---
    const ring2Geo = new THREE.TorusGeometry(1.5, 0.015, 8, 60);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF8C00"),
      transparent: true,
      opacity: 0.2,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.position.set(3.5, 0, -2);
    ring2Mesh.rotation.y = Math.PI / 4;
    scene.add(ring2Mesh);

    // --- Connecting Lines (tech network) ---
    const lineGroup = new THREE.Group();
    const linePoints: THREE.Vector3[] = [];
    for (let i = 0; i < 12; i++) {
      linePoints.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4
        )
      );
    }
    for (let i = 0; i < linePoints.length - 1; i++) {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        linePoints[i],
        linePoints[i + 1],
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x1a3a5a,
        transparent: true,
        opacity: 0.4,
      });
      lineGroup.add(new THREE.Line(lineGeo, lineMat));
    }
    scene.add(lineGroup);

    // --- Mouse parallax ---
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- Resize ---
    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // --- Animation Loop ---
    let frame = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame += 0.005;

      // Rotate particles slowly
      particles.rotation.y = frame * 0.06;
      particles.rotation.x = Math.sin(frame * 0.3) * 0.05;

      // Rotate torus knot
      torusMesh.rotation.x = frame * 0.4;
      torusMesh.rotation.y = frame * 0.25;
      torusMesh.rotation.z = frame * 0.15;

      // Rotate sphere
      sphereMesh.rotation.y = frame * 0.2;
      sphereMesh.rotation.x = frame * 0.1;

      // Pulse rings
      ringMesh.rotation.z = frame * 0.3;
      ring2Mesh.rotation.x = frame * 0.5;

      // Camera parallax
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      // Floating grid
      gridHelper.position.y = -3 + Math.sin(frame * 0.5) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
