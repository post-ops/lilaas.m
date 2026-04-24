/* =============================================================
   LILAAS – Navbar: Transparent → solid on scroll
   Dark industrial theme with orange accents
   ============================================================= */
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Control Levers", href: "#control-levers" },
  { label: "Precision Mechanics", href: "#precision-mechanics" },
  { label: "Thruster Control", href: "#thruster-control" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.4s ease",
          background: scrolled
            ? "rgba(13, 21, 32, 0.95)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
            >
              <div style={{
                width: "36px",
                height: "36px",
                background: "var(--lilaas-orange)",
                clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "14px",
                  color: "#0d1520",
                  letterSpacing: "-1px",
                }}>L</span>
              </div>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "1.3rem",
                color: "white",
                letterSpacing: "-0.03em",
              }}>
                lilaas<span style={{ color: "var(--lilaas-orange)" }}>.</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="hidden md:flex">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  className="nav-link"
                  onClick={() => handleNav(link.href)}
                  style={{ background: "none", border: "none", padding: 0 }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <a
                href="mailto:sales@lilaas.no"
                className="btn-orange hidden md:inline-flex"
                style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                Get in Touch
              </a>
              {/* Mobile menu toggle */}
              <button
                className="md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ background: "none", border: "none", color: "white", padding: "4px" }}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: "fixed",
          top: "72px",
          left: 0,
          right: 0,
          background: "rgba(13, 21, 32, 0.98)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,140,0,0.2)",
          zIndex: 999,
          padding: "1.5rem",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.8)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "1rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  textAlign: "left",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                }}
              >
                {link.label}
              </button>
            ))}
            <a
              href="mailto:sales@lilaas.no"
              className="btn-orange"
              style={{ textDecoration: "none", textAlign: "center", marginTop: "0.5rem" }}
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </>
  );
}
