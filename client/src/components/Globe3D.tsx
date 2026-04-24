/* =============================================================
   LILAAS – Globe3D: Three.js rotating globe with connection arcs
   Shows Lilaas' global reach
   ============================================================= */
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Globe3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.offsetWidth;
    const h = mount.offsetHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    // Globe sphere
    const globeGeo = new THREE.SphereGeometry(1.5, 48, 32);
    const globeMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#0d1a2a"),
      transparent: true,
      opacity: 0.9,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#1a3a5a"),
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireGlobe = new THREE.Mesh(globeGeo.clone(), wireMat);
    scene.add(wireGlobe);

    // Outer glow ring
    const ringGeo = new THREE.TorusGeometry(1.65, 0.012, 8, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF8C00"),
      transparent: true,
      opacity: 0.6,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    // Second ring tilted
    const ring2Geo = new THREE.TorusGeometry(1.7, 0.008, 8, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF8C00"),
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.z = Math.PI / 6;
    scene.add(ring2);

    // Location dots (maritime hubs)
    const dotPositions = [
      // Norway (Horten)
      { lat: 59.4, lon: 10.5 },
      // Rotterdam
      { lat: 51.9, lon: 4.5 },
      // Singapore
      { lat: 1.3, lon: 103.8 },
      // Houston
      { lat: 29.7, lon: -95.4 },
      // Dubai
      { lat: 25.2, lon: 55.3 },
      // Tokyo
      { lat: 35.7, lon: 139.7 },
      // Sydney
      { lat: -33.9, lon: 151.2 },
      // Shanghai
      { lat: 31.2, lon: 121.5 },
      // New York
      { lat: 40.7, lon: -74.0 },
      // CERN Geneva
      { lat: 46.2, lon: 6.1 },
    ];

    const dotGroup = new THREE.Group();

    const latLonToVec3 = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    dotPositions.forEach((pos, i) => {
      const vec = latLonToVec3(pos.lat, pos.lon, 1.52);
      const dotGeo = new THREE.SphereGeometry(0.025, 8, 8);
      const isHorten = i === 0;
      const dotMat = new THREE.MeshBasicMaterial({
        color: isHorten ? new THREE.Color("#FF8C00") : new THREE.Color("#4a9eff"),
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(vec);
      dotGroup.add(dot);

      // Pulse ring for Horten
      if (isHorten) {
        const pulseGeo = new THREE.TorusGeometry(0.06, 0.008, 8, 32);
        const pulseMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color("#FF8C00"),
          transparent: true,
          opacity: 0.7,
        });
        const pulse = new THREE.Mesh(pulseGeo, pulseMat);
        pulse.position.copy(vec);
        pulse.lookAt(0, 0, 0);
        dotGroup.add(pulse);
      }
    });

    scene.add(dotGroup);

    // Connection arcs from Horten to other cities
    const hortenVec = latLonToVec3(59.4, 10.5, 1.52);
    const arcGroup = new THREE.Group();

    dotPositions.slice(1).forEach((pos) => {
      const targetVec = latLonToVec3(pos.lat, pos.lon, 1.52);
      const points: THREE.Vector3[] = [];
      const segments = 50;
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const lerped = new THREE.Vector3().lerpVectors(hortenVec, targetVec, t);
        const height = 1.52 + Math.sin(Math.PI * t) * 0.4;
        lerped.normalize().multiplyScalar(height);
        points.push(lerped);
      }
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: new THREE.Color("#FF8C00"),
        transparent: true,
        opacity: 0.25,
      });
      arcGroup.add(new THREE.Line(arcGeo, arcMat));
    });

    scene.add(arcGroup);

    // Atmosphere glow
    const atmGeo = new THREE.SphereGeometry(1.65, 32, 32);
    const atmMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#1a4a7a"),
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(atmGeo, atmMat));

    // Resize handler
    const handleResize = () => {
      if (!mount) return;
      const nw = mount.offsetWidth;
      const nh = mount.offsetHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    // Animation
    let frame = 0;
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame += 0.003;

      globe.rotation.y = frame;
      wireGlobe.rotation.y = frame;
      dotGroup.rotation.y = frame;
      arcGroup.rotation.y = frame;

      ring.rotation.z = frame * 0.5;
      ring2.rotation.z = -frame * 0.3;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
      }}
    />
  );
}
