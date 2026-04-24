/* =============================================================
   LILAAS – ClientsSection: Trusted partners & certifications
   ============================================================= */
import { useEffect, useRef } from "react";

const partners = [
  { name: "Kongsberg Maritime", type: "Strategic Partner" },
  { name: "Wärtsilä", type: "OEM Partner" },
  { name: "Rolls-Royce Marine", type: "Integration Partner" },
  { name: "CERN", type: "Research Partner" },
  { name: "DNV GL", type: "Certification Body" },
  { name: "Stena Line", type: "Ferry Operator" },
  { name: "Hurtigruten", type: "Cruise Line" },
  { name: "Equinor", type: "Offshore Operator" },
];

const certifications = [
  { code: "DNV GL", desc: "Marine Type Approval" },
  { code: "ISO 9001", desc: "Quality Management" },
  { code: "NS-EN", desc: "Norwegian Standard" },
  { code: "IEC 60945", desc: "Maritime Navigation" },
];

export default function ClientsSection() {
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
        background: "var(--lilaas-navy)",
        padding: "6rem 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Trusted by */}
        <div className="reveal" style={{ marginBottom: "3.5rem", textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: "1rem" }}>
            Trusted By
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            color: "white",
            margin: 0,
          }}>
            World-Class Partners & Customers
          </h2>
        </div>

        {/* Partners grid */}
        <div className="reveal" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.06)",
          marginBottom: "4rem",
        }}>
          {partners.map((p, i) => (
            <div
              key={p.name}
              style={{
                transitionDelay: `${i * 0.06}s`,
                background: "var(--lilaas-navy)",
                padding: "2rem 1.5rem",
                textAlign: "center",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,140,0,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "var(--lilaas-navy)";
              }}
            >
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "rgba(255,255,255,0.75)",
                marginBottom: "0.35rem",
              }}>
                {p.name}
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
              }}>
                {p.type}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="reveal" style={{ marginBottom: "1rem" }}>
          <div className="section-label" style={{ marginBottom: "2rem" }}>Certifications & Standards</div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}>
            {certifications.map((cert) => (
              <div key={cert.code} style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1.25rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "2px",
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(255,140,0,0.1)",
                  border: "1px solid rgba(255,140,0,0.25)",
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.6rem",
                    color: "var(--lilaas-orange)",
                    letterSpacing: "0.05em",
                    textAlign: "center",
                  }}>
                    {cert.code}
                  </span>
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    color: "white",
                    marginBottom: "2px",
                  }}>
                    {cert.code}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.45)",
                  }}>
                    {cert.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
