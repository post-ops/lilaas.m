/* =============================================================
   LILAAS – Footer
   ============================================================= */
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: "var(--lilaas-navy)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "4rem 0 2rem",
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
          gap: "3rem",
          marginBottom: "3rem",
        }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
              <div style={{
                width: "32px",
                height: "32px",
                background: "var(--lilaas-orange)",
                clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "13px",
                  color: "#0d1520",
                }}>L</span>
              </div>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "1.2rem",
                color: "white",
                letterSpacing: "-0.03em",
              }}>
                lilaas<span style={{ color: "var(--lilaas-orange)" }}>.</span>
              </span>
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: "280px",
              marginBottom: "1.5rem",
            }}>
              World-leading manufacturer of control levers, joysticks, and precision mechanics. Founded 1961, Horten, Norway.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { icon: MapPin, text: "Kongeveien 75, 3188 Horten" },
                { icon: Phone, text: "+47 416 33 000" },
                { icon: Mail, text: "sales@lilaas.no" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Icon size={12} color="var(--lilaas-orange)" />
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.45)",
                  }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "white",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}>Products</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {["Control Levers", "Precision Mechanics", "Thruster Control", "L01 Series", "LTC System"].map((item) => (
                <a key={item} href="https://lilaas.no" target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lilaas-orange)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div>
            <h4 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "white",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}>Industries</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {["Maritime", "Offshore", "Defence", "Aerospace", "Medicine", "Scientific"].map((item) => (
                <span key={item} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.45)",
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "white",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}>Get In Touch</h4>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              marginBottom: "1.25rem",
            }}>
              Ready to discuss your project? Our engineering team is available Monday–Friday, 08:00–16:00.
            </p>
            <a
              href="mailto:sales@lilaas.no"
              className="btn-orange"
              style={{ textDecoration: "none", display: "inline-block", fontSize: "0.75rem" }}
            >
              Contact Sales
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.3)",
          }}>
            © {year} Lilaas AS. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Terms and Conditions", "Transparency Act"].map((item) => (
              <a key={item} href="https://lilaas.no" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.3)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lilaas-orange)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
