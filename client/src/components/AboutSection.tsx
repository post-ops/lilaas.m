/* =============================================================
   LILAAS – AboutSection: Company story, values, and factory
   Asymmetric layout with diagonal divider
   ============================================================= */
import { useEffect, useRef } from "react";
import { Shield, Zap, Globe, Award } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Precision & Reliability",
    desc: "Every product is tested before leaving the factory. Our components meet the most rigorous maritime and industrial standards.",
  },
  {
    icon: Zap,
    title: "In-House Innovation",
    desc: "We design, engineer, and produce everything internally — mechanics, software, assembly, and testing under one roof.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "50% of our products are exported directly. Our technology sails on vessels across every ocean on the planet.",
  },
  {
    icon: Award,
    title: "Certified Excellence",
    desc: "DNV GL certified products and NS-EN ISO 9001-2015 certification. Trusted by Kongsberg Maritime and Wärtsilä.",
  },
];

const industries = [
  "Maritime & Offshore",
  "Defence",
  "Aerospace",
  "Medicine",
  "Rail & Train",
  "Robotics",
  "Scientific Research",
  "CERN / Particle Physics",
];

export default function AboutSection() {
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
      id="about"
      ref={ref}
      style={{
        background: "var(--lilaas-navy)",
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orange glow */}
      <div style={{
        position: "absolute",
        bottom: "-200px",
        right: "-200px",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(255,140,0,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Top: Story */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
          marginBottom: "6rem",
        }}
          className="grid-cols-story"
        >
          {/* Left: Text */}
          <div>
            <div className="section-label reveal" style={{ marginBottom: "1.5rem" }}>Our Story</div>
            <h2 className="reveal" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "white",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}>
              60+ Years of<br />
              <span style={{ color: "var(--lilaas-orange)" }}>Precision at Sea</span><br />
              and Beyond
            </h2>
            <p className="reveal" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.8,
              marginBottom: "1.25rem",
            }}>
              Founded in 1961 by Jan Lillaas in Horten, Norway, Lilaas AS began as a small precision machining workshop. Over six decades, it has evolved into a world-leading manufacturer of control levers, joysticks, and precision components for the most demanding industries on earth.
            </p>
            <p className="reveal" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}>
              Today, under CEO Espen Hoff, our 60-person team designs, engineers, and produces everything in-house — from maritime control systems installed on ferries and offshore vessels, to ultra-precision components for CERN's Large Hadron Collider, accurate to hundredths of a millimetre.
            </p>

            {/* Quote */}
            <div className="reveal" style={{
              borderLeft: "3px solid var(--lilaas-orange)",
              paddingLeft: "1.5rem",
              marginBottom: "2rem",
            }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontStyle: "italic",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.7,
                margin: "0 0 0.5rem 0",
              }}>
                "We are known for solving technically difficult problems. Precision, flexibility, and competence have been at the core of our values from the very beginning."
              </p>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--lilaas-orange)",
                letterSpacing: "0.05em",
              }}>
                — Espen Hoff, Managing Director
              </span>
            </div>

            <a
              href="https://lilaas.no"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-orange reveal"
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              Visit Official Site
            </a>
          </div>

          {/* Right: Factory image */}
          <div className="reveal" style={{ position: "relative" }}>
            <div style={{
              position: "relative",
              borderRadius: "2px",
              overflow: "hidden",
              aspectRatio: "4/3",
            }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663594364321/cSwtBs32Y4mwtMGtDapFRB/lilaas_horten_factory-oE5eYckJRjFfBB59StTuFg.webp"
                alt="Lilaas factory in Horten, Norway"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* Overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(13,21,32,0.3) 0%, transparent 60%)",
              }} />
            </div>
            {/* Floating badge */}
            <div style={{
              position: "absolute",
              bottom: "-1.5rem",
              left: "-1.5rem",
              background: "var(--lilaas-orange)",
              padding: "1.25rem 1.5rem",
              clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
              zIndex: 2,
            }}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "1.8rem",
                color: "#0d1520",
                lineHeight: 1,
              }}>1961</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                color: "rgba(13,21,32,0.7)",
                marginTop: "2px",
              }}>Founded in Horten</div>
            </div>
            {/* Corner accent */}
            <div style={{
              position: "absolute",
              top: "-1rem",
              right: "-1rem",
              width: "60px",
              height: "60px",
              borderTop: "2px solid var(--lilaas-orange)",
              borderRight: "2px solid var(--lilaas-orange)",
            }} />
          </div>
        </div>

        {/* Values grid */}
        <div>
          <div className="section-label reveal" style={{ marginBottom: "2.5rem" }}>Core Values</div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}>
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="steel-card reveal" style={{
                  padding: "1.75rem",
                  borderRadius: "2px",
                  transitionDelay: `${i * 0.1}s`,
                }}>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    background: "rgba(255,140,0,0.1)",
                    border: "1px solid rgba(255,140,0,0.2)",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}>
                    <Icon size={20} color="var(--lilaas-orange)" />
                  </div>
                  <h4 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "white",
                    marginBottom: "0.6rem",
                  }}>
                    {v.title}
                  </h4>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Industries served */}
        <div style={{ marginTop: "5rem" }}>
          <div className="section-label reveal" style={{ marginBottom: "1.5rem" }}>Industries Served</div>
          <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {industries.map((ind) => (
              <span key={ind} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.6)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "0.4rem 1rem",
                borderRadius: "2px",
                textTransform: "uppercase",
              }}>
                {ind}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .grid-cols-story {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
