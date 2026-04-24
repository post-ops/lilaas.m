/* =============================================================
   LILAAS – GlobalReachSection: 3D Globe + global presence stats
   ============================================================= */
import { useEffect, useRef } from "react";
import Globe3D from "./Globe3D";

const locations = [
  { city: "Horten, Norway", role: "HQ & Manufacturing", color: "#FF8C00" },
  { city: "Rotterdam, Netherlands", role: "Maritime Hub", color: "#4a9eff" },
  { city: "Singapore", role: "Asia Pacific", color: "#4a9eff" },
  { city: "Houston, USA", role: "Offshore Americas", color: "#4a9eff" },
  { city: "Geneva (CERN)", role: "Scientific Partner", color: "#00d4aa" },
  { city: "Dubai, UAE", role: "Middle East", color: "#4a9eff" },
];

export default function GlobalReachSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal").forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(180deg, var(--lilaas-navy) 0%, var(--lilaas-steel) 100%)",
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blueprint grid */}
      <div className="blueprint-grid" style={{
        position: "absolute",
        inset: 0,
        opacity: 0.3,
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
          className="global-grid"
        >
          {/* Left: Text content */}
          <div>
            <div className="section-label reveal" style={{ marginBottom: "1.5rem" }}>Global Presence</div>
            <h2 className="reveal" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              color: "white",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}>
              Precision Technology<br />
              <span style={{ color: "var(--lilaas-orange)" }}>Sailing Every Ocean</span>
            </h2>
            <p className="reveal" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}>
              From our factory in Horten, Norway, Lilaas products are exported to maritime operators, offshore platforms, and research institutions worldwide. Over 50% of our production ships directly to international customers.
            </p>

            {/* Location list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {locations.map((loc, i) => (
                <div
                  key={loc.city}
                  className="reveal"
                  style={{
                    transitionDelay: `${i * 0.08}s`,
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.75rem 1rem",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "2px",
                    borderLeft: `3px solid ${loc.color}`,
                  }}
                >
                  <div style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: loc.color,
                    flexShrink: 0,
                    boxShadow: `0 0 8px ${loc.color}`,
                  }} />
                  <div>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: "white",
                    }}>
                      {loc.city}
                    </div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.35)",
                      textTransform: "uppercase",
                    }}>
                      {loc.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3D Globe */}
          <div className="reveal" style={{
            position: "relative",
            height: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {/* Glow behind globe */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "400px",
              height: "400px",
              background: "radial-gradient(circle, rgba(255,140,0,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }} />
            <div style={{
              position: "relative",
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}>
              <Globe3D />
            </div>
            {/* Label overlay */}
            <div style={{
              position: "absolute",
              bottom: "1rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
              display: "flex",
              gap: "1.5rem",
              pointerEvents: "none",
            }}>
              {[
                { color: "#FF8C00", label: "Horten HQ" },
                { color: "#4a9eff", label: "Customers" },
                { color: "#00d4aa", label: "Research Partners" },
              ].map(({ color, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <div style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: color,
                  }} />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .global-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
