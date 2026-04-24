/* =============================================================
   LILAAS – StatsSection: Animated counters with intersection observer
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 60, suffix: "+", label: "Years of Excellence", sublabel: "Founded 1961 in Horten, Norway" },
  { value: 60, suffix: "", label: "Expert Engineers", sublabel: "In-house design, production & testing" },
  { value: 50, suffix: "%", label: "Products Exported", sublabel: "Vessels worldwide across all oceans" },
  { value: 100, suffix: "%", label: "In-House Production", sublabel: "CNC, assembly, software & testing" },
];

// Preload: show target immediately if already scrolled past
const isAlreadyVisible = () => {
  if (typeof window === 'undefined') return false;
  return window.scrollY > 100;
};

function StatItem({ value, suffix, label, sublabel, start }: {
  value: number; suffix: string; label: string; sublabel: string; start: boolean;
}) {
  const count = useCountUp(value, 2200, start);
  return (
    <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
      <div className="stat-number">
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 600,
        fontSize: "1rem",
        color: "white",
        marginTop: "0.5rem",
        marginBottom: "0.25rem",
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.8rem",
        color: "rgba(255,255,255,0.45)",
        letterSpacing: "0.02em",
      }}>
        {sublabel}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(isAlreadyVisible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(135deg, var(--lilaas-steel) 0%, var(--lilaas-navy) 100%)",
        borderTop: "1px solid rgba(255,140,0,0.15)",
        borderBottom: "1px solid rgba(255,140,0,0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(255,140,0,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "0",
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}>
              <StatItem {...s} start={started} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
