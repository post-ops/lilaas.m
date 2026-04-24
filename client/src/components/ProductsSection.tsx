/* =============================================================
   LILAAS – ProductsSection: Three main product categories
   with hover animations and scroll reveal
   ============================================================= */
import { useEffect, useRef } from "react";
import { ArrowRight, Cpu, Settings, Anchor } from "lucide-react";

const products = [
  {
    id: "control-levers",
    icon: Settings,
    label: "01 / Control Levers",
    title: "Precision Control Levers & Joysticks",
    description:
      "World-class control levers and joysticks engineered for the most demanding marine environments. Our flagship L01 series synchronizes bridge consoles seamlessly, ensuring safety and intuitive operation across all vessel types.",
    features: ["L01 Series with TFT LCD Display", "Multi-axis Joysticks (L04)", "Azimuth Control (LF70)", "Flush-mounted Handles"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663594364321/cSwtBs32Y4mwtMGtDapFRB/lilaas_control_lever_3d-RKNmLZp7o6wH7yG3GV8tFu.webp",
    accent: "#FF8C00",
    href: "https://lilaas.no/control-levers/",
  },
  {
    id: "precision-mechanics",
    icon: Cpu,
    label: "02 / Precision Mechanics",
    title: "High-Precision CNC Manufacturing",
    description:
      "Our modern machine park with CNC lathes, milling machines and robotic automation delivers components accurate to hundredths of a millimetre. Trusted by CERN's Large Hadron Collider and leading global industries.",
    features: ["CNC Lathes & Milling", "24/7 Robotic Production", "ISO 9001-2015 Certified", "DNV GL Approved"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663594364321/cSwtBs32Y4mwtMGtDapFRB/lilaas_precision_machining-5V94hLMSdXUfy4dBjAHBue.webp",
    accent: "#4a9eff",
    href: "https://lilaas.no/precision-mechanics/",
  },
  {
    id: "thruster-control",
    icon: Anchor,
    label: "03 / Thruster Control",
    title: "LTC Modular Thruster Control System",
    description:
      "The Lilaas LTC system provides reliable remote operation of thrusters from any control position. Modular, adaptable, and fuel-saving — compatible with all vessel sizes and configurations.",
    features: ["Modular LTC01 System", "Redundant Network", "Fuel Saving Technology", "Full Automation Interface"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663594364321/cSwtBs32Y4mwtMGtDapFRB/lilaas_ship_bridge-Xk9aN7yXogpRfShnMxGeUF.webp",
    accent: "#00d4aa",
    href: "https://lilaas.no/thruster-control/",
  },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const Icon = product.icon;
  return (
    <div
      id={product.id}
      className="steel-card reveal"
      style={{
        transitionDelay: `${index * 0.15}s`,
        borderRadius: "2px",
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <div className="product-img-wrap" style={{ height: "240px" }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* Label overlay */}
        <div style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          zIndex: 2,
          background: "rgba(13,21,32,0.8)",
          backdropFilter: "blur(8px)",
          border: `1px solid ${product.accent}40`,
          padding: "0.3rem 0.75rem",
          borderRadius: "2px",
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            color: product.accent,
            textTransform: "uppercase",
          }}>
            {product.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{
            width: "40px",
            height: "40px",
            background: `${product.accent}15`,
            border: `1px solid ${product.accent}30`,
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <Icon size={18} color={product.accent} />
          </div>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "white",
            margin: 0,
            lineHeight: 1.3,
          }}>
            {product.title}
          </h3>
        </div>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.9rem",
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.7,
          marginBottom: "1.5rem",
        }}>
          {product.description}
        </p>

        {/* Features */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.75rem" }}>
          {product.features.map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{
                width: "5px",
                height: "5px",
                background: product.accent,
                borderRadius: "50%",
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.65)",
              }}>
                {f}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "0.8rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: product.accent,
            textDecoration: "none",
            borderBottom: `1px solid ${product.accent}40`,
            paddingBottom: "2px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = product.accent;
            (e.currentTarget as HTMLAnchorElement).style.gap = "0.75rem";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = `${product.accent}40`;
            (e.currentTarget as HTMLAnchorElement).style.gap = "0.5rem";
          }}
        >
          Learn More <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}

export default function ProductsSection() {
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
      }}
    >
      {/* Blueprint grid */}
      <div className="blueprint-grid" style={{
        position: "absolute",
        inset: 0,
        opacity: 0.4,
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <div className="reveal" style={{ marginBottom: "4rem" }}>
          <div className="section-label" style={{ marginBottom: "1rem" }}>Our Products</div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "white",
              margin: 0,
              maxWidth: "600px",
              lineHeight: 1.1,
            }}>
              Engineering Excellence<br />
              <span style={{ color: "var(--lilaas-orange)" }}>Across Three Domains</span>
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "360px",
              lineHeight: 1.7,
              margin: 0,
            }}>
              From ship bridges to particle accelerators — Lilaas delivers precision where it matters most.
            </p>
          </div>
        </div>

        {/* Products grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}>
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
